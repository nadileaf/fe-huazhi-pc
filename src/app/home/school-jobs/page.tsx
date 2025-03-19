'use client';
import Loading from '@/components/basic/Loading';
import SchoolJobCard from '@/components/job/SchoolJobCard';
import useSchoolJobs from '@/hooks/useSchoolJobs';
import { Breadcrumbs, BreadcrumbItem, Select, SelectItem } from '@nextui-org/react';
import Pagination from '@/components/basic/Pagination';
import React from 'react';

export default function SchoolJobsPage() {
  const {
    sorts,
    data,
    loading,
    pagesCount,
    currentSort,
    currentPage,
    setCurrentPage,
    handleSelectSort,
    handleClick,
  } = useSchoolJobs();

  return (
    <section className="wrapper pt-10 pb-20">
      <Breadcrumbs>
        <BreadcrumbItem href="/home">首页</BreadcrumbItem>
        <BreadcrumbItem href="/school-jobs">校企岗位</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex items-center justify-between pt-10 mb-14">
        <div className="title">校企岗位</div>
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
      <Loading loading={loading}>
        <div className="grid grid-cols-3 gap-8">
          {data?.data.map((item) => (
            <div key={item.meta.openId} className="px-2.5 py-8">
              <SchoolJobCard data={item} onClick={handleClick} />
            </div>
          ))}
        </div>
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
