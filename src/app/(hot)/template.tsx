'use client';
import React, { type ReactNode } from 'react';
import { Tab, Tabs } from '@nextui-org/react';
import Loading from '@/components/basic/Loading';
import Pagination from '@/components/basic/Pagination';
import NoData from '@/components/basic/NoData';

interface HotTemplateProps {
  children: React.ReactNode;
}

// 创建一个 Context 来传递页面配置
export const HotPageContext = React.createContext<{
  tabs?: string[];
  data?: any;
  loading?: boolean;
  pagesCount?: number;
  currentPage?: number;
  currentTab?: string;
  gridCols?: 'grid-cols-2' | 'grid-cols-3';
  setCurrentPage?: (page: number) => void;
  setCurrentTab?: (tab: string) => void;
  renderCard?: (item: any) => ReactNode;
}>({});

export default function HotTemplate({ children }: HotTemplateProps) {
  return <div className="hot-pages-template">{children}</div>;
}

// 导出一个通用的内容组件，供页面使用
export function HotPageContent({
  tabs,
  data,
  loading,
  pagesCount,
  currentPage,
  currentTab,
  gridCols = 'grid-cols-3',
  setCurrentPage,
  setCurrentTab,
  renderCard,
}: {
  tabs: string[];
  data: any;
  loading: boolean;
  pagesCount: number;
  currentPage: number;
  currentTab: string;
  gridCols?: 'grid-cols-2' | 'grid-cols-3';
  setCurrentPage: (page: number) => void;
  setCurrentTab: (tab: string) => void;
  renderCard: (item: any) => ReactNode;
}) {
  return (
    <>
      <Tabs
        color="primary"
        variant="light"
        size="lg"
        radius="full"
        className="mb-14"
        classNames={{
          tabList: 'gap-6',
          tab: 'h-10 w-28 py-2 px-8 border-1 border-[#CCCCCC] bg-white',
        }}
        onSelectionChange={(v) => setCurrentTab(v.toString())}
      >
        {tabs.map((tab) => (
          <Tab key={tab} title={tab} className="text-base"></Tab>
        ))}
      </Tabs>

      <Loading loading={loading}>
        {data?.data.length ? (
          <div>
            <div className={`grid ${gridCols} gap-8`}>
              {data?.data.map((item: any) => renderCard(item))}
            </div>
            <Pagination
              className="mt-10 w-full flex items-center justify-center"
              total={pagesCount}
              current={currentPage}
              onChange={setCurrentPage}
            />
          </div>
        ) : (
          <NoData className="py-24" />
        )}
      </Loading>
    </>
  );
}
