'use client';

import { useAuthStore } from '@/stores/auth';
import { withCdnPrefix } from '@/utils/file';
import { formatImageUrl } from '@/utils/format';
import { Icon } from '@iconify/react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Input,
} from '@nextui-org/react';
import { useRouter, usePathname } from 'next/navigation';
import { useFilePreview } from '@/components/basic/FilePreview';
import { useCitySelector } from './basic/CitySelector';
import { useDebouncedEffect, useMobile } from '@/hooks/useHooks';
import { useSearch } from '@/hooks/useSearch';
import { QRCodeSVG } from 'qrcode.react';
import { useMessageBoxContext } from '@/providers/MessageBoxProvider';
import { nanoid } from 'nanoid';
import { entityService } from '@/services/entity';
import { useRequest } from '@/hooks/useHooks';
import { useState } from 'react';
import { safeJSONParse } from '@/utils/common';
import { SearchIcon } from 'lucide-react';

type Route = { title: string; href?: string; target?: '_blank'; onClick?: () => void };

export default function Header() {
  const router = useRouter();
  const { user, resume, authRoutes, login, logout, setToken, setUserType, isLogout, initUser } =
    useAuthStore();

  const pathname = usePathname();

  const { inputValue, updateInputValue, handleSearchValueUpdate } = useSearch();

  const { openModal, closeModal } = useMessageBoxContext();

  const [isLoadingLoginC, setIsLoadingLoginC] = useState(false);
  const [isLoadingLoginB, setIsLoadingLoginB] = useState(false);

  const [shortCodeId, setShortCodeId] = useState<string | undefined>(undefined);
  const [shortCodeCreated, setShortCodeCreated] = useState<boolean>(false);

  useDebouncedEffect(
    () => {
      const localToken = process.env.NEXT_PUBLIC_LOCAL_TOKEN;
      console.log('token', localToken);
      if (localToken && !isLogout) {
        setToken(localToken);
        initUser();
      }
    },
    [process.env.NEXT_PUBLIC_LOCAL_TOKEN, isLogout],
    10,
  );

  // pc 用 uuid 去轮询这个实体：如果userType 是 share，就用token直接登录；如果userType 是 business, 则携带 token 跳转到 tip（同一个根域名）登录。
  const { cancel } = useRequest(
    (signal) =>
      entityService.queryDetail({
        entityType: 'ShortCode',
        entityId: shortCodeId,
      }),
    {
      before: () => shortCodeCreated && !!shortCodeId,
      refreshDeps: [shortCodeCreated, shortCodeId],
      pollingInterval: 2000,
      onSuccess: (res) => {
        const content = res.data.standardFields.content;
        if (!content) return;
        const { userType, token } = safeJSONParse(content) || ({} as any);
        if (!token || !userType) return;

        cancel();

        setUserType(userType);
        setToken(token);
        login(userType);

        if (shortCodeId) {
          closeModal(shortCodeId);
        }
      },
    },
  );

  function handleLoadingLogin(type: 'share' | 'business', loading: boolean) {
    if (type === 'share') {
      setIsLoadingLoginC(loading);
    } else {
      setIsLoadingLoginB(loading);
    }
  }

  function resetShortCode() {
    setShortCodeId(undefined);
    setShortCodeCreated(false);
  }

  // 点击登录展示一个二维码弹窗，引导用户微信扫码到小程序注册登录B或者C
  async function handleLogin(type: 'share' | 'business') {
    resetShortCode();

    handleLoadingLogin(type, true);

    // 生成一个唯一id
    const id = nanoid();
    setShortCodeId(id);
    console.log('id', id);

    // 生成二维码，路径为小程序的身份登录页面
    const url = `${process.env.NEXT_PUBLIC_WEIXIN_MP_PATH}?r=${encodeURIComponent(
      `/pages/auth/switch-identity?uuid=${id}`,
    )}`;

    try {
      // 创建一个实体，id为这个 uuid
      await entityService.create({
        entityType: 'ShortCode',
        openId: id,
        data: {
          standardFields: {},
        },
      });
      setShortCodeCreated(true);
    } catch (error) {
      console.error(error);
    } finally {
      handleLoadingLogin(type, false);
    }

    // 小程序身份选择登录,往这个 id 的 ShortCode 实体存 userType 和 token

    console.log('login url', url);
    openModal({
      id,
      body: ({ close }) => (
        <div className="flex flex-col items-center py-10">
          <div className="text-3xl text-black-333">微信扫码，即刻登录</div>
          <div className="pt-8 pb-6">
            <QRCodeSVG value={url} />
          </div>
          <div className="flex gap-1 items-center text-black-666">
            <Icon icon="mdi:line-scan"></Icon>
            <span>微信扫码后，在小程序打开</span>
          </div>
        </div>
      ),
      classNames: {
        base: 'modal-bg',
      },
      onClose: () => {
        cancel();
        setShortCodeId(undefined);
        setShortCodeCreated(false);
      },
      size: 'xl',
    });
  }

  const isActiveRoute = (route: Route) => {
    return pathname === route.href;
  };

  const handleSearch = () => {
    const query = inputValue.trim();
    handleSearchValueUpdate();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <Navbar
      classNames={{
        base: 'bg-white',
        wrapper: 'wrapper p-4',
        content: 'gap-8',
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          'data-[active=true]:font-normal',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-primary',
        ],
      }}
      maxWidth="xl"
    >
      <NavbarContent justify="start" className="gap-20">
        <NavbarBrand className="flex items-center gap-3">
          <img
            src={withCdnPrefix('/custom/huazhi/logo-full.png')}
            alt=""
            className="h-[60px] cursor-pointer"
            onClick={() => router.replace('/')}
          />
        </NavbarBrand>
        <NavbarContent className="max-sm:hidden">
          {authRoutes.map((route, index) => (
            <NavbarItem key={index} isActive={isActiveRoute(route)}>
              {route.href ? (
                <Link href={route.href} target={route.target} className="text-[#000]">
                  {route.title}
                </Link>
              ) : (
                <Link className="cursor-pointer text-[#000]" onClick={route.onClick}>
                  {route.title}
                </Link>
              )}
            </NavbarItem>
          ))}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <div className="flex items-center gap-2 max-w-sm">
            <Input
              value={inputValue}
              onValueChange={updateInputValue}
              placeholder="请输入职位名称"
              startContent={<SearchIcon className="text-gray-400" size={16} />}
              className="w-full"
              size="sm"
              radius="full"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </NavbarItem>
        <NavbarItem>
          {user ? (
            <div className="flex items-center gap-3">
              <Dropdown>
                <DropdownTrigger>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <Avatar
                      src={formatImageUrl(resume?.data.standardFields.humanInfo?.avatar?.key)}
                      className="flex-shrink-0"
                    />
                    <Icon
                      icon="solar:alt-arrow-down-line-duotone"
                      className="text-black-666 text-lg"
                    />
                  </div>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="business"
                    startContent={<Icon icon="ic:baseline-business" />}
                    onClick={() => handleLogin('business')}
                  >
                    切换招聘者
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    color="danger"
                    startContent={<Icon icon="ri:logout-box-r-line" />}
                    onClick={() => {
                      logout();
                      router.push('/');
                    }}
                  >
                    系统退出
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <div className="flex items-center gap-4 max-sm:gap-3">
              <Button
                className="w-[120px]"
                color="primary"
                radius="full"
                variant="ghost"
                isLoading={isLoadingLoginB}
                onClick={() => handleLogin('business')}
              >
                我是企业
              </Button>
              <Button
                className="w-[120px] primary-gradient-button"
                radius="full"
                isLoading={isLoadingLoginC}
                onClick={() => handleLogin('share')}
              >
                我是人才
              </Button>
            </div>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
