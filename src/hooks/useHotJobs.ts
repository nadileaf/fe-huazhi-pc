import { useRequest } from '@/hooks/useHooks';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, useEffect, useMemo, useState } from 'react';
import { entityService } from '@/services/entity';
import { recommendService } from '@/services/recommend';
import { truthy } from '@/utils/types';
import { useAppStore } from '@/stores/app';
import { get } from 'lodash-es';
import { generateUrl } from '@/utils/common';

// huazhi 学生端 职位逻辑
// 1. 未登陆——搜索参数用默认 tags，登陆——搜索参数用简历的
// 2. entityType: Job; query: ''; sort: currentSort.value
// 3. 排序逻辑，匹配度就是没有sort，最近就是 meta.updatedAt:desc

const defaultTabs = ['为您推荐', '技术主管', '国家经理', '市场主管'];

const sorts = [
  { label: '匹配度', value: '' },
  { label: '最新', value: 'meta.updatedAt:desc' },
];

const pageSize = 9;

export default function useHotJobs() {
  const router = useRouter();

  const [currentSort, setCurrentSort] = useState(sorts[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState('为您推荐');

  const [token, userJobs] = useAuthStore((state) => [
    state.token,
    state.resume?.data.standardFields.expectations?.[0]?.jobNames || [],
  ]);

  const tabs = useMemo(() => (token ? userJobs.filter(Boolean) : defaultTabs), [token, userJobs]);

  // useEffect(() => {
  //   console.log('currentTab', currentTab, tabs);
  //   if (tabs.length) {
  //     setCurrentTab(tabs[0]);
  //   }
  // }, [tabs]);

  const { data, loading } = useRequest(() => query(), {
    refreshDeps: [currentPage, currentSort, currentTab],
  });

  const getEntityJobs = (
    pageOptions: Pick<SearchModel.PaginationParams, 'current' | 'pageSize'>,
  ) => {
    return entityService.query({
      entityType: 'Job',
      query: currentTab === '为您推荐' ? '' : currentTab,
      sort: currentSort.value,
      ...pageOptions,
    });
  };

  // 暂无推荐
  // const getRecommendJobs = (
  //   pageOptions: Pick<SearchModel.PaginationParams, 'current' | 'pageSize'>,
  // ) => {
  //   return recommendService.query({
  //     contextEntityType: 'SystemEmployee',
  //     contextOpenIds: user?.userId ? [user.userId] : [],
  //     targetEntityType: 'JobOpportunities',
  //     filters: getFilters(),
  //     ...pageOptions,
  //   });
  // };

  function query() {
    const pageOptions = { pageSize, current: currentPage };
    return getEntityJobs(pageOptions);
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
    router.push(generateUrl(`/entity/Job/${entityId}`, { projectId }));
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
