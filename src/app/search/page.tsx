'use client';

import Loading from '@/components/basic/Loading';
import NoData from '@/components/basic/NoData';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/filter';
import SchoolJobCard from '@/components/job/SchoolJobCard';
import HotJobCard from '@/components/job/HotJobCard';
import CompanyCard from '@/components/company/CompanyCard';
import Pagination from '@/components/basic/Pagination';
import { Button, Tab, Tabs } from '@nextui-org/react';
import { useRequest } from '@/hooks/useHooks';
import { entityService } from '@/services/entity';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { entityConfigMap } from '@/config/entity';
import { type Key, useMemo, useState } from 'react';

const tabs: { label: string; value: EntityModel.BusinessEntityType }[] = [
  {
    label: '搜职位',
    value: 'Job',
  },
  {
    label: '搜公司',
    value: 'Company',
  },
];

const pageSize = 9;

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchText, setSearchText] = useState(searchParams.get('query') || '');

  const [currentTab, setCurrentTab] = useState(
    (searchParams.get('type') || tabs[0].value) as EntityModel.BusinessEntityType,
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [editableFilters, setEditableFilters] = useState<SearchModel.FilterValue[]>([]);

  const queryParams = useMemo(() => {
    return {
      entityType: currentTab,
      query: searchParams.get('query'),
      filters: editableFilters,
      current: currentPage,
    };
  }, [currentPage, currentTab, searchParams, editableFilters]);

  const shouldReturnFilters = currentTab === 'Company';

  const { data, loading } = useRequest(
    () =>
      entityService.query({
        ...(queryParams as any),
        pageSize,
        returnFilters: shouldReturnFilters,
      }),
    {
      refreshDeps: [queryParams],
      debounceOptions: 200,
    },
  );

  const pages = useMemo(() => Math.ceil((data?.total || 0) / pageSize), [data]);

  const filterOptions = useMemo(() => {
    const filterConfig = entityConfigMap.get(currentTab)?.filterOptionConfig || [];
    if (!shouldReturnFilters) return filterConfig;

    const res = filterConfig
      .map((item) => {
        const dataFilters = data?.filters?.find((f) => f.key === item.key);
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
    const filters = [...editableFilters];
    if (index === -1) {
      filters.push({ key, values });
    } else {
      filters[index].values = values;
    }
    setEditableFilters(filters);
    console.log('handleFilterChange', values, filters);
  }

  function handleTabChange(v: Key) {
    setEditableFilters([]);
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', v.toString());
    router.push(`${pathname}?${params.toString()}`);
    setCurrentTab(v as EntityModel.BusinessEntityType);
    if (v.toString() === '') resetPage();
  }

  function handleSearch() {
    const params = new URLSearchParams();
    params.set('query', searchText);
    params.set('type', currentTab);
    router.push(`${pathname}?${params.toString()}`);
  }

  function resetPage() {
    setCurrentPage(1);
  }

  return (
    <div className="wrapper py-8 ">
      <Loading loading={loading} className="">
        <div className="w-full max-w-7xl mx-auto py-10 px-8 bg-white rounded-lg shadow-sm">
          <SearchBar
            inputValue={searchText}
            setInputValue={setSearchText}
            handleSearch={handleSearch}
          ></SearchBar>

          {filterOptions.length ? (
            <div className="pt-4 w-full flex items-center justify-between">
              <div className="flex gap-4 items-center">
                {filterOptions.map((item) => (
                  <Filter
                    key={item.key}
                    config={item}
                    selectedValues={editableFilters.find((f) => f.key === item.key)?.values || []}
                    onChange={(values) => handleFilterChange(values, item)}
                  ></Filter>
                ))}
              </div>
              <div className="">
                <Button
                  size="sm"
                  variant="light"
                  className="text-[#666]"
                  onClick={() => setEditableFilters([])}
                >
                  清空筛选
                </Button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3 my-8">
          <Tabs
            variant="underlined"
            size="lg"
            color="primary"
            selectedKey={currentTab}
            onSelectionChange={handleTabChange}
          >
            {tabs.map((item) => (
              <Tab key={item.value} value={item.value} title={item.label}></Tab>
            ))}
          </Tabs>
        </div>

        {data?.data.length ? (
          <>
            <EntityCardList entityType={currentTab} data={data.data} />
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

  function EntityCardList<T extends EntityModel.BusinessEntityType>({
    entityType,
    data,
  }: {
    entityType: T;
    data: EntityModel.BusinessEntity<T>[];
  }) {
    return (
      <div className={`grid gap-8 pb-5 ${entityType === 'Job' ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {data.map((item) => (
          <EntityCard
            key={item.meta.openId}
            entityType={entityType}
            data={item as unknown as EntityModel.BusinessEntity<T>}
          />
        ))}
      </div>
    );
  }
}

function EntityCard<T extends EntityModel.BusinessEntityType>({
  entityType,
  data,
}: {
  entityType: T;
  data: EntityModel.BusinessEntity<T>;
}) {
  switch (entityType) {
    case 'Job':
      return <SchoolJobCard data={data as JobModel.Job}></SchoolJobCard>;
    case 'Company':
      return <CompanyCard data={data}></CompanyCard>;

    default:
      return <div>todo</div>;
  }
}
