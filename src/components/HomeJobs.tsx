'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import useHotJobs from '@/hooks/useHotJobs';
import HotJobCard from './job/HotJobCard';
import Loading from './basic/Loading';
import NoData from './basic/NoData';
import { useAuthStore } from '@/stores/auth';

export default function HomeJobs() {
  const router = useRouter();

  const token = useAuthStore((state) => state.token);

  const { tabs, sorts, data, loading, currentSort, currentTab, handleSelectSort, setCurrentTab } =
    useHotJobs();

  function handleClickMore() {
    router.push('/hot-jobs');
  }

  return (
    <section>
      <div className="wrapper pb-20">
        <div className="flex items-center justify-between pt-20 mb-20">
          <div className="flex items-center gap-12">
            <div className="title">{!token ? '热门岗位' : '为您推荐'}</div>
            <div className="flex items-center gap-8">
              {tabs.map((tab) => (
                <span
                  key={tab}
                  className={`text-lg text-black cursor-pointer hover:text-primary ${currentTab === tab ? 'text-primary' : ''}`}
                  onClick={() => setCurrentTab(tab)}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between ">
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
            <div className="ml-8 hover:text-primary cursor-pointer" onClick={handleClickMore}>
              更多
            </div>
          </div>
        </div>

        <Loading loading={loading}>
          {data?.data.length ? (
            <div className="grid grid-cols-3 gap-8">
              {data?.data.map((item) => <HotJobCard key={item.meta.openId} data={item} />)}
            </div>
          ) : (
            <NoData className="py-24" />
          )}
        </Loading>
      </div>
    </section>
  );
}
