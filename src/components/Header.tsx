'use client';
import { useMessageBoxContext } from '@/providers/MessageBoxProvider';
import { useAppStore } from '@/stores/app';
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
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useFilePreview } from '@/components/basic/FilePreview';
import { useCitySelector } from './basic/CitySelector';
import { useDebouncedEffect, useMobile } from '@/hooks/useHooks';
import useApplyModal from './unlogin/ApplyModalContent';
import { truthy } from '@/utils/types';

type Route = { title: string; href?: string; target?: '_blank'; onClick?: () => void };

export default function Header() {
  const router = useRouter();
  const { user, resume, login, logout } = useAuthStore();
  const pathname = usePathname();
  const { isMobile } = useMobile();

  const { openModal } = useMessageBoxContext();
  const { openApplyModal } = useApplyModal();

  const routes = useMemo<Route[]>(() => {
    const res = [{ title: '首页', href: '/' }];

    if (user) {
      res.push({ title: '简历', href: '/resume' });
    }

    return res;
  }, [user]);

  const { previewFile } = useFilePreview();
  function handlePrivacy() {
    previewFile([
      { url: withCdnPrefix('/custom/ciickd/exiaoyoucai-privacy.docx'), fileName: '隐私协议' },
    ]);
  }

  const { openCitySelector } = useCitySelector();

  const isActiveRoute = (route: Route) => {
    if (['/home/resume'].includes(pathname)) return route.href === '/home';

    if (['/privacy-policy', '/user-agreement'].includes(pathname))
      return route.href === routes[0].href;

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
          {/* {user ? (
          <>
            {user?.currentTenant?.tenantName && (
              <span className="font-medium">{user?.currentTenant?.tenantName || ''}</span>
            )}
            {['/', '/search'].includes(pathname) && (
              <Button
                variant="light"
                size="sm"
                className="text-default-500 ml-3"
                onClick={() => openCitySelector({ isLocationCity: true })}
              >
                <Icon icon="akar-icons:location" />
                {locationLoading ? '定位中' : currentLocation.city || '全国'}
              </Button>
            )}
          </>
        ) : null} */}
        </NavbarBrand>
        <NavbarContent className="max-sm:hidden">
          {routes.map((route, index) => (
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
        {/* {user && (
          <NavbarItem>
            <SearchInput></SearchInput>
          </NavbarItem>
        )} */}
        <NavbarItem>
          {user && resume ? (
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
                onClick={() => login('business')}
              >
                我是企业
              </Button>
              <Button
                className="w-[120px] primary-gradient-button"
                radius="full"
                onClick={() => login('share')}
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

function SearchInput() {
  const [value, setValue] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSearch() {
    console.log('handleSearch', value);
    const params = new URLSearchParams(searchParams.toString());
    params.set('query', value);
    router.push(`/home/search?${params.toString()}`);
  }

  return (
    <Input
      value={value}
      isClearable
      placeholder="搜索职位并按下回车"
      variant="bordered"
      radius="full"
      startContent={
        <Icon icon="akar-icons:search" className="flex-shrink-0 mx-1 text-base text-default-500 " />
      }
      classNames={{
        inputWrapper: 'group-data-[focus=true]:border-gray-400',
      }}
      onValueChange={setValue}
      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
    />
  );
}
