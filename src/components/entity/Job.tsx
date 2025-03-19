import { useRequest } from '@/hooks/useHooks';
import { taskService } from '@/services/task';
import { useAuthStore } from '@/stores/auth';
import {
  formatFromNow,
  formatLocation,
  formatNumberRange,
  formatSalaryRange,
} from '@/utils/format';
import { Icon } from '@iconify/react';
import { Button, Chip, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { FlowSelector } from '../task/FlowSelector';
import { get } from 'lodash-es';
import { generateUrl } from '@/utils/common';
import LocationDisplay from '@/components/basic/LocationDisplay';

export function JobCard<T extends EntityModel.BusinessEntity<'Job'> | ProjectModel.Project<'Job'>>({
  data,
  mode,
  onClick,
}: {
  data: T;
  mode?: 'simple';
  onClick?: (data: T) => void;
}) {
  const entityId = useMemo(
    () => ('projectPayload' in data ? data.projectPayload?.openId : data.meta.openId),
    [data],
  );

  const projectId = useMemo(() => {
    if (get(data, 'data.standardFields.projectId'))
      return get(data, 'data.standardFields.projectId');
    else if ('projectPayload' in data) return data.meta.openId;
    return undefined;
  }, [data]);

  const taskId = useMemo(() => {
    if (get(data, 'data.standardFields.taskId')) return get(data, 'data.standardFields.taskId');
    else if ('taskPayload' in data) return data.meta.openId;
    return undefined;
  }, [data]);

  const standardFields = useMemo(
    () =>
      'projectPayload' in data
        ? data.projectPayload?.payload?.data.standardFields
        : 'data' in data
          ? data.data.standardFields
          : undefined,
    [data],
  );

  const router = useRouter();
  function handleClick() {
    if (onClick) onClick(data);
    else router.push(generateUrl(`/entity/Job/${entityId}`, { projectId, taskId }));
  }

  return (
    standardFields && (
      <div className="card" onClick={handleClick}>
        {mode === 'simple' ? (
          <>
            <div className="text-default-500 text-xs">{standardFields.company}</div>
            <div className="font-medium  text-base">{standardFields.name}</div>
            <div className="flex items-center gap-2 overflow-hidden">
              {standardFields.benefits?.map((tag, i) => (
                <Chip key={i} color="default" variant="flat" size="sm">
                  {tag}
                </Chip>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1 text-default-500 text-xs">
                <Icon icon="akar-icons:location" className="text-default-500" />
                {formatLocation(standardFields.locations, ['city', 'district'])}
              </span>
              <span className="text-orange-500">
                {formatSalaryRange(standardFields.salaryRange?.[0])}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className="font-medium">{standardFields.name}</div>
              <div className="text-default-500 text-xs">{standardFields.company}</div>
            </div>
            <div className="flex items-center gap-2">
              {standardFields.benefits?.map((tag, i) => (
                <Chip key={i} color="default" variant="flat" size="sm">
                  {tag}
                </Chip>
              ))}
            </div>
            <div className="line-clamp-2 text-default-500 text-xs">
              {standardFields.qualification || standardFields.responsibility}
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1 text-default-500 text-xs">
                <Icon icon="akar-icons:location" className="text-default-500" />
                {formatLocation(standardFields.locations, ['city', 'district'])}
              </span>
              <span className="text-orange-500">
                {formatSalaryRange(standardFields.salaryRange?.[0])}
              </span>
            </div>
          </>
        )}
      </div>
    )
  );
}

export function JobDetail({
  data,
  projectId,
  taskId,
}: {
  data: EntityModel.BusinessEntity<'Job'>;
  projectId?: string;
  taskId?: string;
}) {
  const { user } = useAuthStore();

  const { data: task, run } = useRequest(
    () => taskService.queryTaskByPayloadId(projectId!, user?.userId || ''),
    {
      before: () => !!projectId,
      refreshDeps: [projectId],
    },
  );

  const [loading, setLoading] = useState(false);

  async function handleCreateTask() {
    try {
      if (!projectId) return;
      setLoading(true);
      await taskService.create({
        projectId,
        taskPayloadOpenId: user?.userId || '',
      });
      toast.success('投递成功');
      run();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="wrapper py-20">
        <div className="flex justify-between gap-3 mb-20">
          <div>
            <div className="text-5xl text-black font-bold mb-8">
              {data.data.standardFields.name}
            </div>
            <div className="flex items-center gap-5 text-2xl">
              <span className="">发布者：{data.data.standardFields.company}</span>
              <LocationDisplay locations={data.data.standardFields.locations} />
            </div>
          </div>
          {projectId && (
            <div>
              {!task?.stageId ? (
                <Button
                  className="primary-gradient-button w-[140px]"
                  radius="full"
                  isLoading={loading}
                  onClick={handleCreateTask}
                >
                  前往投递
                </Button>
              ) : (
                <FlowSelector projectId={projectId} taskId={task.taskId} value={task.stageName} />
              )}
            </div>
          )}
        </div>
        <div className="flex items-center flex-wrap gap-2">
          {data.data.standardFields.tags?.map((tag, index) => (
            <div className="tag-default" key={index}>
              {tag.name}
            </div>
          ))}
        </div>
        <div className="flex w-full gap-4 items-center">
          <div className="flex-1 flex flex-col items-center gap-6">
            <span className="text-3xl">
              {data.data.standardFields.degreeRequirement?.map((v) => v.name).join(',') || '不限'}
            </span>
            <span className="text-xl">学历要求</span>
          </div>

          <div className="flex-1 flex flex-col items-center gap-6 border-x border-gray-200">
            <span className="text-3xl">
              {formatNumberRange(data.data.standardFields.workYearsRequirement, '年') || '不限'}
            </span>
            <span className="text-xl">经验要求</span>
          </div>

          <div className="flex-1 flex flex-col items-center gap-6">
            <span className="text-3xl">
              {formatNumberRange(data.data.standardFields.headCountRange, '人') || '-'}
            </span>
            <span className="text-xl">招聘人数</span>
          </div>

          <div className="flex-1 flex flex-col items-center gap-6 border-r border-gray-200">
            <span className="text-3xl">
              {formatLocation(data.data.standardFields.locations, ['city']) || '不限'}
            </span>
            <span className="text-xl">工作地点</span>
          </div>

          <div className="flex-1 flex flex-col items-center gap-6">
            <span className="text-3xl text-primary">
              {formatSalaryRange(data.data.standardFields.salaryRange?.[0], false) || '-'}
            </span>
            <span className="text-xl">元/月</span>
          </div>
        </div>
      </div>
      <div className="bg-white py-28">
        <div className="wrapper">
          <div className="mb-28">
            <div className="text-4xl font-bold mb-20">岗位职责</div>
            <div className="text-2xl whitespace-pre-wrap leading-[1.6]">
              {data.data.standardFields.responsibility?.replace(/^岗位职责[:：]?\n?/, '')}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-20">任职资格</div>
            <div className="text-2xl whitespace-pre-wrap leading-[1.6]">
              {data.data.standardFields.qualification?.replace(/^任职资格[:：]?\n?/, '')}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
