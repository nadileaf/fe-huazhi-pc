'use client';

import { useAuthStore } from '@/stores/auth';
import Link from 'next/link';

export default function FooterLinks() {
  const { authRoutes } = useAuthStore();

  return (
    <>
      {authRoutes.map((link) => (
        <Link key={link.title} href={link.href} className="hover:underline max-sm:text-sm ">
          {link.title}
        </Link>
      ))}
    </>
  );
}
