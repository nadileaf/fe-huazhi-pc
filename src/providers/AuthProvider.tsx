'use client';

import Loading from '@/components/basic/Loading';
import { useDebouncedEffect, useRequest } from '@/hooks/useHooks';
import { authService } from '@/services/auth';
import { useAuthStore } from '@/stores/auth';
import { usePathname } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { aiService } from '@/services/ai';
import { useAIToolsStore } from '@/stores/ai-tools';
import { useAppStore } from '@/stores/app';

const commonPages = ['/privacy-policy', '/user-agreement'];

export default function AuthProvider({
  token: cookieToken,
  children,
}: {
  token?: string;
  children: React.ReactNode;
}) {
  const searchParams =
    typeof window !== 'undefined' ? new URLSearchParams(location.search) : new URLSearchParams();
  const _token = cookieToken || searchParams.get('token');
  const inviterId = searchParams.get('inviterId');

  const { token, user, isLogout, setToken, setInviterId, initUser } = useAuthStore();

  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   const isLoginPage = pathname.includes('home');

  //   if (isLogout && isLoginPage) {
  //     router.replace('/');
  //     return;
  //   }

  //   if (user && !isLoginPage && !commonPages.includes(pathname)) {
  //     router.replace('/home');
  //   }
  //   // if (!user && isLoginPage) {
  //   //   router.replace('/');
  //   // }
  // }, [pathname, user, isLogout]);

  useDebouncedEffect(
    () => {
      console.log('token', token, _token);
      if ((token || _token) && !isLogout) {
        _token && setToken(_token);
        inviterId && setInviterId(inviterId);
        initUser();
      }
    },
    [_token, inviterId],
    10,
  );

  const { setAITools } = useAIToolsStore();

  useRequest(() => aiService.query(), {
    before: () => !!token,
    refreshDeps: [token],
    onSuccess: (data) => {
      setAITools(data);
    },
  });

  const { initLocation } = useAppStore();

  useDebouncedEffect(
    () => {
      if (user) {
        initLocation();
      }
    },
    [user],
    500,
  );

  return (
    <Suspense
      fallback={
        <Loading className="w-screen h-screen flex items-center justify-center" loading={true} />
      }
    >
      {children}
    </Suspense>
  );
}
