'use client';
import useHotCompanies from '@/hooks/useHotCompanies';
import CompanyCard from '@/components/company/CompanyCard';
import { HotPageContent } from '../template';
import React from 'react';

export default function HotCompaniesPage() {
  const {
    tabs,
    data,
    loading,
    pagesCount,
    currentPage,
    currentTab,
    setCurrentPage,
    setCurrentTab,
  } = useHotCompanies();

  return (
    <HotPageContent
      tabs={tabs}
      data={data}
      loading={loading}
      pagesCount={pagesCount}
      currentPage={currentPage}
      currentTab={currentTab}
      gridCols="grid-cols-2"
      setCurrentPage={setCurrentPage}
      setCurrentTab={setCurrentTab}
      renderCard={(item) => <CompanyCard key={item.meta.openId} data={item} />}
    />
  );
}
