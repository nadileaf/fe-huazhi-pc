'use client';

import { mainTabs } from '@/config/tasks';
import { BackgroundCheckCard } from '@/components/entity/BackgroundCheck';
import { JobCard } from '@/components/entity/Job';
import SchoolJobCard from '@/components/job/SchoolJobCard';
import { PinPinCloudEvaluationCard } from '@/components/entity/PinPinCloudEvaluation';
import { TrainingCard } from '@/components/entity/Training';
import { useRequest } from '@/hooks/useHooks';
import { taskService } from '@/services/task';
import { useAuthStore } from '@/stores/auth';
import { Button, cn, Link, Pagination, Tab, Tabs } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import NoData from '@/components/basic/NoData';
import Loading from '@/components/basic/Loading';

export default function Task() {
  const { user } = useAuthStore();
  const searchParams = useSearchParams();

  const [currentTab, setCurrentTab] = useState(
    (searchParams.get('type') as EntityModel.BusinessEntityType) || mainTabs[0].value,
  );
  const currentTabLabel = useMemo(
    () => mainTabs.find((item) => item.value === currentTab)?.label,
    [currentTab],
  );

  const [currentFlow, setCurrentFlow] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const flowParamsMap = useMemo<
    Record<string, Partial<{ params: Partial<SearchModel.SearchEntityParams<'HydrogenTask'>> }>>
  >(
    () => ({
      // Course: ['待学习', '学习中'],
      Training: {
        params: {
          filters: [
            {
              key: 'data.standardFields.channelTemplate.openId',
              values: ['TrainingToSystemEmployee'],
            },
            { key: 'data.standardFields.taskPayload.openId', values: [user?.userId || ''] },
          ],
          pointer:
            '/data/standardFields/project/payload/data/standardFields/projectPayload/payload',
          appendPointer: {
            projectId: '/data/standardFields/project/openId',
            taskId: '/meta/openId',
            examLink: '/data/customFields/examLink',
            reportUrl: '/data/customFields/reportUrl',
          },
          checkPermission: false,
        },
      },
      Job: {
        params: {
          filters: [
            {
              key: 'data.standardFields.channelTemplate.openId',
              values: ['JobToSystemEmployee'],
            },
            { key: 'data.standardFields.taskPayload.openId', values: [user?.userId || ''] },
          ],
          pointer:
            '/data/standardFields/project/payload/data/standardFields/projectPayload/payload',
          appendPointer: {
            projectId: '/data/standardFields/project/openId',
            taskId: '/meta/openId',
          },
          checkPermission: false,
        },
      },
      PinPinCloudEvaluation: {
        params: {
          filters: [
            {
              key: 'data.standardFields.channelTemplate.openId',
              values: ['PinPinCloudEvaluationToSystemEmployee'],
            },
            { key: 'data.standardFields.taskPayload.openId', values: [user?.userId || ''] },
          ],
          pointer:
            '/data/standardFields/project/payload/data/standardFields/projectPayload/payload',
          appendPointer: {
            evaluationReports: '/data/customFields/evaluationReports',
          },
        },
      },
      BackgroundCheck: {
        params: {
          filters: [
            {
              key: 'data.standardFields.channelTemplate.openId',
              values: ['BackgroundCheckToSystemEmployee'],
            },
            { key: 'data.standardFields.taskPayload.openId', values: [user?.userId || ''] },
          ],
          pointer:
            '/data/standardFields/project/payload/data/standardFields/projectPayload/payload',
          appendPointer: {
            backgroundCheckReports: '/data/customFields/backgroundCheckReports',
          },
        },
      },
    }),
    [user],
  );

  const flows = useMemo(
    () =>
      mainTabs.find((item) => item.value === currentTab)?.flows?.map((value) => ({ value })) ?? [],
    [currentTab],
  );

  useEffect(() => {
    flows.length && setCurrentFlow(flows[0].value);
  }, [flows]);

  const taskParams = useMemo<SearchModel.SearchEntityParams<'HydrogenTask'>>(() => {
    const common: SearchModel.SearchEntityParams<'HydrogenTask'> = {
      entityType: 'HydrogenTask',
      ...flowParamsMap[currentTab]?.params,
      filters: [
        ...(flowParamsMap[currentTab]?.params?.filters ?? []),
        { key: 'data.standardFields.current.stageName', values: [currentFlow] },
      ],
    };
    return common;
  }, [flowParamsMap, currentTab, currentFlow]);

  const { data, loading } = useRequest(() => taskService.query(taskParams), {
    refreshDeps: [taskParams],
    debounceOptions: 100,
  });

  const pages = useMemo(() => Math.ceil((data?.total || 0) / 15), [data]);

  function resetPage() {
    setCurrentPage(1);
  }

  const router = useRouter();
  const pathname = usePathname();
  function handleChangeTab(v: EntityModel.BusinessEntityType) {
    setCurrentTab(v);
    resetPage();
    const searchParams = new URLSearchParams();
    searchParams.set('type', v);
    router.replace(pathname + '?' + searchParams.toString());
  }

  const gridClass = useMemo(() => {
    if (['Job', 'Training'].includes(currentTab)) return 'grid-cols-3';
    return 'grid-cols-2';
  }, [currentTab]);

  return (
    <div className="wrapper py-8">
      <div className="flex gap-3 justify-between mb-8">
        <div className="flex flex-col gap-10 w-full">
          <div className="flex items-center justify-between">
            <Tabs
              color="primary"
              variant="light"
              size="lg"
              radius="full"
              classNames={{
                tabList: 'gap-10',
                tab: 'h-12 w-[145px] py-2 px-8 border-1 border-[#CCCCCC] bg-white',
              }}
              selectedKey={currentTab}
              onSelectionChange={(v) => {
                handleChangeTab(v as EntityModel.BusinessEntityType);
              }}
            >
              {mainTabs.map((item) => (
                <Tab key={item.value} value={item.value} title={item.label} />
              ))}
            </Tabs>
            {currentTab === 'PinPinCloudEvaluation' && (
              <Button as={Link} color="primary" href="/home/evaluation">
                进入测评中心
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between">
            <h2 className="title text-4xl">{currentTabLabel}</h2>
            <Tabs
              variant="solid"
              radius="lg"
              color="primary"
              selectedKey={currentFlow}
              onSelectionChange={(v) => {
                setCurrentFlow(v.toString());
                resetPage();
              }}
            >
              {flows.map((item) => (
                <Tab key={item.value} value={item.value} title={item.value} />
              ))}
            </Tabs>
          </div>
        </div>
      </div>
      <Loading loading={loading} className="min-h-[50vh] ">
        {data?.data.length ? (
          <div className={cn('grid gap-6', gridClass)}>
            {data.data.map((item) => (
              <TaskCard
                key={item.meta.openId}
                type={currentTab}
                data={item}
                stageName={currentFlow}
                groups={flows.map((item) => item.value)}
              />
            ))}
          </div>
        ) : (
          !loading && <NoData className="h-[50vh]"></NoData>
        )}
      </Loading>
      {pages > 1 && <Pagination total={pages} page={currentPage} onChange={setCurrentPage} />}
    </div>
  );
}

type TaskCardProps = {
  type: EntityModel.BusinessEntityType;
  data: any;
  stageName: string;
  groups?: string[];
};

function TaskCard({ type, ...props }: TaskCardProps) {
  const cardMap = {
    Job: () => <SchoolJobCard {...props} />,
    Training: () => <TrainingCard {...props} />,
    PinPinCloudEvaluation: () => <PinPinCloudEvaluationCard {...props} />,
    BackgroundCheck: () => <BackgroundCheckCard {...props} />,
  };

  return cardMap[type as keyof typeof cardMap]?.();
}
