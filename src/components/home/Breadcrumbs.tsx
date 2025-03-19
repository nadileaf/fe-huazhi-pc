'use client';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { useAuthStore } from '@/stores/auth';

type Props = {
  position: {
    title: string;
    href: string;
  };
  className?: string;
};
export default function HomeBreadcrumbs({ position, className }: Props) {
  const { user } = useAuthStore();
  return (
    <Breadcrumbs className={className}>
      <BreadcrumbItem href={user ? '/home' : '/'}>首页</BreadcrumbItem>
      <BreadcrumbItem href={position.href}>{position.title}</BreadcrumbItem>
    </Breadcrumbs>
  );
}
