import { useRequest } from '@/hooks/useHooks';
import { projectService } from '@/services/project';
import { recommendService } from '@/services/recommend';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, useMemo, useState } from 'react';
import { get } from 'lodash-es';
import { generateUrl } from '@/utils/common';

export default function useSchoolJobs() {
  const pageSize = 9;
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const sorts = [
    { label: '匹配度', value: '' },
    { label: '最新', value: 'meta.updatedAt:desc' },
  ];
  const [currentSort, setCurrentSort] = useState(sorts[0]);

  const { user } = useAuthStore();
  const { data, loading } = useRequest(() => query(), {
    before: () => !!user,
    refreshDeps: [user, currentSort, currentPage],
  });

  const pagesCount = useMemo(
    () => (data?.total ? Math.ceil(data.total / pageSize) : 1),
    [data?.total],
  );

  const getProjectJobs = (
    pageOptions: Pick<SearchModel.PaginationParams, 'current' | 'pageSize'>,
  ) => {
    return projectService.query({
      channelTemplateId: 'JobToSystemEmployee',
      filters: [
        {
          key: 'data.standardFields.channel.payload.data.standardFields.space.payload.data.standardFields.name',
          values: ['校企合作专区'],
        },
      ],
      ...pageOptions,
    }) as unknown as Promise<SearchModel.SearchResponse<EntityModel.BusinessEntity<'Job'>>>;
  };

  const getRecommendJobs = (
    pageOptions: Pick<SearchModel.PaginationParams, 'current' | 'pageSize'>,
  ) => {
    return recommendService.query({
      contextEntityType: 'SystemEmployee',
      contextOpenIds: user?.userId ? [user.userId] : [],
      targetEntityType: 'Job',
      filters: [{ key: '_exists_', values: ['data.managedFields'] }],
      sort: currentSort.value,
      ...pageOptions,
    });
  };

  function query() {
    const pageOptions = { pageSize, current: currentPage };
    return currentSort.value ? getProjectJobs(pageOptions) : getRecommendJobs(pageOptions);
  }

  function handleSelectSort(e: ChangeEvent<HTMLSelectElement>) {
    const item = sorts.find((sort) => sort.label === e.target.value);
    item && setCurrentSort(item);
  }

  function handleClick(data: any) {
    if (currentSort.value) {
      const entityId = get(data, 'projectPayload.openId');
      const projectId = get(data, 'meta.openId');
      router.push(generateUrl(`/entity/Job/${entityId}`, { projectId }));
    } else {
      const entityId = get(data, 'meta.openId');
      const projectId = get(data, 'data.managedFields.entityRelated.projects[0].projectId');
      router.push(generateUrl(`/entity/Job/${entityId}`, { projectId }));
    }
  }

  return {
    sorts,
    data,
    loading,
    pagesCount,
    currentPage,
    currentSort,
    setCurrentPage,
    handleSelectSort,
    handleClick,
  };
}
