'use client';
import { JobCard } from '@/components/entity/Job';
import { JobOpportunitiesCard } from '@/components/entity/JobOpportunities';
import SearchInput from '@/components/SearchInput';
import SchoolJobCard from '@/components/job/SchoolJobCard';
import HotJobCard from '@/components/job/HotJobCard';
import { useRequest } from '@/hooks/useHooks';
import { useMessageBoxContext } from '@/providers/MessageBoxProvider';
import { type EntityQueryParams, entityService } from '@/services/entity';
import { projectService, type QueryProjectsParams } from '@/services/project';
import { taskService } from '@/services/task';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import { Icon } from '@iconify/react';
import { Button, Tab, Tabs } from '@nextui-org/react';
import Pagination from '@/components/basic/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '@/components/basic/Loading';
import NoData from '@/components/basic/NoData';
import Filter from '@/components/filter';
import { entityConfigMap, type FilterOptionConfig } from '@/config/entity';

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabs = ['我校职位', '全网职位'];
  const [currentTab, setCurrentTab] = useState(searchParams.get('type') || tabs[0]);

  // const [searchText, setSearchText] = useState(searchParams.get('query') || '');

  // function handleChangeSearchText(v: string) {
  //   setSearchText(v);
  //   resetPage();
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.set('query', v);
  //   router.push(`/search?${params.toString()}`);
  // }

  const [currentPage, setCurrentPage] = useState(1);

  const { user } = useAuthStore();

  const [editableFilters, setEditableFilters] = useState<SearchModel.FilterValue[]>([]);

  const queryParams = useMemo(() => {
    switch (currentTab || tabs[0]) {
      case '我校职位':
        return {
          channelTemplateId: 'JobToSystemEmployee',
          query: searchParams.get('query'),
          filters: [
            {
              key: 'data.standardFields.channel.payload.data.standardFields.space.payload.data.standardFields.name',
              values: ['校企合作专区'],
            },
          ],
          current: currentPage,
        } as QueryProjectsParams;
      default:
        return {
          entityType: 'JobOpportunities',
          query: searchParams.get('query'),
          filters: editableFilters,
          current: currentPage,
        } as EntityQueryParams<'JobOpportunities'>;
    }
  }, [currentPage, currentTab, searchParams, editableFilters]);

  useEffect(() => {
    const type = searchParams.get('type');
    type && setCurrentTab(type);
  }, [searchParams]);

  const { data, loading } = useRequest(
    () =>
      // @ts-expect-error fix
      currentTab === '我校职位'
        ? projectService.query(queryParams)
        : entityService.query({ ...(queryParams as any), returnFilters: true }),
    {
      refreshDeps: [queryParams],
      debounceOptions: 200,
    },
  );

  const pages = useMemo(() => Math.ceil((data?.total || 0) / 15), [data]);

  const filterOptions = useMemo(() => {
    if (currentTab === '我校职位' || !data) return [];
    const filterConfig = entityConfigMap.get('JobOpportunities')?.filterOptionConfig || [];
    const res = filterConfig
      .map((item) => {
        const dataFilters = data.filters?.find((f) => f.key === item.key);
        return { ...item, values: dataFilters?.values || item.values || [] };
      })
      .filter((r) => {
        if (r.mode === 'select' || !r.mode) return !!r.values.length;
        return true;
      });

    return res;
  }, [currentTab, data]);

  function handleFilterChange(
    values: SearchModel.FilterValueType[],
    filter: (typeof filterOptions)[number],
  ) {
    const key = filter.key;
    const index = editableFilters.findIndex((f) => f.key === key);
    let filters = [...editableFilters];
    if (index === -1) {
      filters.push({ key, values });
    } else {
      filters[index].values = values;
    }
    setEditableFilters(filters);
    console.log('handleFilterChange', values, filters);
  }

  const selectFilters = filterOptions.filter((item) => item.mode === 'select' || !item.mode);
  const dateRangeFilters = filterOptions.filter((item) => item.mode === 'dateRange');

  function resetPage() {
    setCurrentPage(1);
  }

  const { confirm } = useMessageBoxContext();
  async function handleBatchCreateTasks() {
    await confirm('确定要批量投递当页所有职位吗？', '提示');
    const ids = data?.data.map((item) => item.meta.openId);
    if (ids?.length) {
      const res = await Promise.allSettled(
        ids.map((id) =>
          taskService.create({
            projectPayloadOpenId: id,
            projectPayloadType: 'Job',
            taskPayloadOpenId: user?.userId,
            taskPayloadType: 'SystemEmployee',
          }),
        ),
      );
      res.some((item) => item.status === 'fulfilled')
        ? toast.success('批量投递成功')
        : toast.error('批量投递失败');
    }
  }

  return (
    <div className="wrapper py-8 ">
      {/* <SearchInput
        value={searchText}
        onChange={setSearchText}
        onSearch={handleChangeSearchText}
        className="mb-8"
      /> */}
      <div className="flex items-center justify-between gap-3 mb-12">
        <Tabs
          variant="underlined"
          size="lg"
          color="primary"
          selectedKey={currentTab}
          onSelectionChange={(v) => {
            setEditableFilters([]);
            const params = new URLSearchParams(searchParams.toString());
            params.set('type', v.toString());
            router.push(`/home/search?${params.toString()}`);
            setCurrentTab(v.toString());
            if (v.toString() === '') resetPage();
          }}
        >
          {tabs.map((item) => (
            <Tab key={item} value={item} title={item}></Tab>
          ))}
        </Tabs>
        {currentTab === '我校职位' && (
          <Button
            color="primary"
            size="lg"
            isDisabled={!data?.data.length}
            onClick={handleBatchCreateTasks}
          >
            <Icon icon="iconoir:send-mail-solid" className="text-base" />
            批量投递
          </Button>
        )}
      </div>

      {filterOptions.length ? (
        <div className=" bg-white p-6 rounded">
          <div className="flex items-center flex-wrap gap-8 mb-8">
            {selectFilters.map((item) => (
              <Filter
                key={item.key}
                config={item}
                selectedValues={editableFilters.find((f) => f.key === item.key)?.values || []}
                onChange={(values) => handleFilterChange(values, item)}
              ></Filter>
            ))}
          </div>
          <div className="flex flex-col gap-8">
            {dateRangeFilters.map((item) => (
              <Filter
                key={item.key}
                config={item}
                selectedValues={editableFilters.find((f) => f.key === item.key)?.values || []}
                onChange={(values) => handleFilterChange(values, item)}
              ></Filter>
            ))}
          </div>

          <div className="flex justify-end">
            <Button size="sm" variant="light" onClick={() => setEditableFilters([])}>
              清空筛选
            </Button>
          </div>
        </div>
      ) : null}

      <Loading loading={loading} className="">
        {data?.data.length ? (
          <>
            <div className="grid grid-cols-3 gap-8 py-5">
              {data.data?.map((item) =>
                currentTab === '我校职位' ? (
                  <SchoolJobCard
                    key={item.meta.openId}
                    data={item as unknown as ProjectModel.Project<'Job'>}
                  ></SchoolJobCard>
                ) : (
                  <HotJobCard
                    key={item.meta.openId}
                    data={item as unknown as JobOpportunitiesModel.JobOpportunities}
                  />
                ),
              )}
            </div>
            {pages > 1 && (
              <Pagination
                className="mt-10 w-full flex items-center justify-center"
                total={pages}
                current={currentPage}
                onChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <NoData className="h-[600px] flex items-center justify-center"></NoData>
        )}
      </Loading>
    </div>
  );
}
