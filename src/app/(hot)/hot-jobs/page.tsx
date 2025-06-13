'use client';
import useHotJobs from '@/hooks/useHotJobs';
import HotJobCard from '@/components/job/HotJobCard';
import { HotPageContent } from '../template';
import React from 'react';

export default function HotJobsPage() {
  const {
    tabs,
    data,
    loading,
    pagesCount,
    currentPage,
    currentTab,
    setCurrentPage,
    setCurrentTab,
  } = useHotJobs();

  return (
    <HotPageContent
      tabs={tabs}
      data={data}
      loading={loading}
      pagesCount={pagesCount}
      currentPage={currentPage}
      currentTab={currentTab}
      gridCols="grid-cols-3"
      setCurrentPage={setCurrentPage}
      setCurrentTab={setCurrentTab}
      renderCard={(item) => <HotJobCard key={item.meta.openId} data={item} />}
    />
  );
}
