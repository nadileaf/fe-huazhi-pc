'use client';
import { useAuthStore } from '@/stores/auth';
import Link from 'next/link';
import { useMemo } from 'react';

export default function FooterLinks() {
  const { user } = useAuthStore();

  const links = useMemo(() => {
    const res = [{ title: '首页', href: '/' }];
    if (user) {
      res.push({ title: '简历', href: '/resume' });
    }
    return res;
  }, [user]);

  return (
    <>
      {links.map((link) => (
        <Link key={link.title} href={link.href} className="hover:underline max-sm:text-sm ">
          {link.title}
        </Link>
      ))}
    </>
  );
}
