'use client';
import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

interface HotLayoutProps {
  children: React.ReactNode;
}

export default function HotLayout({ children }: HotLayoutProps) {
  const pathname = usePathname();

  // 根据路径确定页面信息
  const getPageInfo = () => {
    if (pathname === '/hot-jobs') {
      return { title: '热门岗位', breadcrumbLabel: '热门岗位' };
    } else if (pathname === '/hot-companies') {
      return { title: '热门企业', breadcrumbLabel: '热门企业' };
    }
    return { title: '', breadcrumbLabel: '' };
  };

  const { title, breadcrumbLabel } = getPageInfo();

  return (
    <section className="wrapper pt-10 pb-20">
      <Breadcrumbs className="mb-10">
        <BreadcrumbItem href="/">首页</BreadcrumbItem>
        <BreadcrumbItem href={pathname}>{breadcrumbLabel}</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex items-center justify-between mb-10">
        <div className="title">{title}</div>
        {/* 排序选择器可以在这里，如果需要的话 */}
      </div>

      {children}
    </section>
  );
}
