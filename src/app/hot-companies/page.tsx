'use client';
import Loading from '@/components/basic/Loading';
import useHotCompanies from '@/hooks/useHotCompanies';
import CompanyCard from '@/components/company/CompanyCard';
import { Tab, Breadcrumbs, BreadcrumbItem, Select, SelectItem, Tabs } from '@nextui-org/react';
import React from 'react';
import Pagination from '@/components/basic/Pagination';
import NoData from '@/components/basic/NoData';

export default function HotJobsPage() {
  const {
    tabs,
    sorts,
    data,
    loading,
    pagesCount,
    currentPage,
    currentSort,
    currentTab,
    setCurrentPage,
    handleSelectSort,
    setCurrentTab,
  } = useHotCompanies();

  return (
    <section className="wrapper pt-10 pb-20">
      <Breadcrumbs>
        <BreadcrumbItem href="/home">首页</BreadcrumbItem>
        <BreadcrumbItem href="/hot-companies">热门企业</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex items-center justify-between pt-10 mb-14">
        <div className="title">热门企业</div>
        <div className="flex items-center justify-between w-[200px]">
          <Select
            aria-label="label"
            radius="full"
            className="w-36"
            selectedKeys={[currentSort.label]}
            onChange={handleSelectSort}
          >
            {sorts.map((sort) => (
              <SelectItem key={sort.label}>{sort.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <Tabs
        color="primary"
        variant="light"
        size="lg"
        radius="full"
        className="mb-14"
        classNames={{
          tabList: 'gap-9',
          tab: 'h-12 w-[148px] py-2 px-8 border-1 border-[#CCCCCC] bg-white',
        }}
        onSelectionChange={(v) => setCurrentTab(v.toString())}
      >
        {tabs.map((tab) => (
          <Tab key={tab} title={tab} className="text-xl"></Tab>
        ))}
      </Tabs>

      <Loading loading={loading}>
        {data?.data.length ? (
          <div className="grid grid-cols-2 gap-8">
            {data?.data.map((item) => <CompanyCard key={item.meta.openId} data={item} />)}
          </div>
        ) : (
          <NoData className="py-24" />
        )}
        <Pagination
          className="mt-10 w-full flex items-center justify-center"
          total={pagesCount}
          current={currentPage}
          onChange={setCurrentPage}
        />
      </Loading>
    </section>
  );
}
