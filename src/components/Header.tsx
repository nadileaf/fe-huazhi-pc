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
import { useMobile } from '@/hooks/useHooks';
import { QRCodeSVG } from 'qrcode.react';
import { useMessageBoxContext } from '@/providers/MessageBoxProvider';
import { nanoid } from 'nanoid';
import { entityService } from '@/services/entity';
import { useRequest } from '@/hooks/useHooks';
import { useState } from 'react';
import { safeJSONParse } from '@/utils/common';

type Route = { title: string; href?: string; target?: '_blank'; onClick?: () => void };

export default function Header() {
  const router = useRouter();
  const { user, resume, authRoutes, logout, setToken, setUserType } = useAuthStore();
  const pathname = usePathname();

  const { openModal } = useMessageBoxContext();

  const [shortCodeId, setShortCodeId] = useState<string | undefined>(undefined);
  const [shortCodeCreated, setShortCodeCreated] = useState<boolean>(false);

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
        router.replace('/?auth=1');

        const content = res.data.standardFields.content;
        if (!content) return;
        const { userType, token } = safeJSONParse(content) || ({} as any);
        if (!token || !userType) return;

        cancel();
        setUserType(userType);
        setToken(token);
      },
    },
  );

  // 点击登录展示一个二维码弹窗，引导用户微信扫码到小程序注册登录B或者C
  async function handleLogin() {
    // 生成一个唯一id
    const id = nanoid();
    setShortCodeId(id);
    console.log('id', id);
    // 生成二维码，路径为小程序的身份登录页面
    const url = `${process.env.NEXT_PUBLIC_WEIXIN_MP_PATH}?r=${encodeURIComponent(
      `pages/auth/switch-identity?uuid=${id}`,
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
    }

    // 小程序身份选择登录,往这个 id 的 ShortCode 实体存 userType 和 token

    console.log('login url', url);
    openModal({
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

  return (
    <Navbar
      classNames={{
        base: 'bg-white',
        wrapper: 'wrapper p-4',
        content: 'gap-12',
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
            className="max-w-[150px] max-h-[50px]"
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
                    onClick={() => handleLogin()}
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
            <div className="flex items-center gap-10 max-sm:gap-3">
              <Button
                className="w-[120px]"
                color="primary"
                radius="full"
                variant="ghost"
                onClick={() => handleLogin()}
              >
                我是企业
              </Button>
              <Button
                className="w-[120px] primary-gradient-button"
                radius="full"
                onClick={() => handleLogin()}
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
