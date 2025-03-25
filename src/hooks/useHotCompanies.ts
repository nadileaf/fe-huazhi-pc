import { useRequest } from '@/hooks/useHooks';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, useEffect, useMemo, useState } from 'react';
import { entityService } from '@/services/entity';
import { get } from 'lodash-es';
import { generateUrl } from '@/utils/common';

const defaultTabs = ['互联网', '电商', '机械', '金融', '销售'];

const sorts = [
  { label: '匹配度', value: '' },
  { label: '最新', value: 'meta.updatedAt:desc' },
];

const pageSize = 9;

export default function useHotJobs() {
  const router = useRouter();

  const [currentSort, setCurrentSort] = useState(sorts[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState('');

  const [token, userIndustries] = useAuthStore((state) => [
    state.token,
    state.resume?.data.standardFields.expectations?.[0]?.industryNames || [],
  ]);

  const tabs = useMemo(() => (token ? userIndustries : defaultTabs), [token, userIndustries]);

  useEffect(() => {
    console.log('currentTab', currentTab, tabs);
    if (!currentTab && tabs.length) {
      setCurrentTab(tabs[0]);
    }
  }, [tabs, currentTab]);

  const { data, loading } = useRequest(() => query(), {
    refreshDeps: [currentPage, currentSort, currentTab],
  });

  const getEntityCompanies = (
    pageOptions: Pick<SearchModel.PaginationParams, 'current' | 'pageSize'>,
  ) => {
    return entityService.query({
      entityType: 'Company',
      query: currentTab,
      sort: currentSort.value,
      ...pageOptions,
    });
  };

  function query() {
    const pageOptions = { pageSize, current: currentPage };
    return getEntityCompanies(pageOptions);
  }

  const pagesCount = useMemo(
    () => (data?.total ? Math.ceil(data.total / pageSize) : 1),
    [data?.total],
  );

  function handleSelectSort(e: ChangeEvent<HTMLSelectElement>) {
    const item = sorts.find((sort) => sort.label === e.target.value);
    if (item) {
      setCurrentSort(item);
    }
  }

  function handleClick(data: any) {
    const entityId = get(data, 'meta.openId');
    const projectId = get(data, 'data.managedFields.entityRelated.projects[0].projectId');
    router.push(generateUrl(`/home/entity/Company/${entityId}`, { projectId }));
  }

  return {
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
    handleClick,
  };
}
