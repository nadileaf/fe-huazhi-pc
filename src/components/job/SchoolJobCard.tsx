import Tag from '@/components/basic/Tag';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  formatLocation,
  formatNumberRange,
  formatSalaryRange,
  formatStringArray,
} from '@/utils/format';
import { generateUrl } from '@/utils/common';
import { get } from 'lodash-es';
import { Icon } from '@iconify/react';
import { Button } from '@nextui-org/react';
import { FlowSelector } from '../task/FlowSelector';
import LocationDisplay from '@/components/basic/LocationDisplay';

type Props<T extends EntityModel.BusinessEntity<'Job'> | ProjectModel.Project<'Job'>> = {
  data: T;
  stageName?: string;
  groups?: string[];
  onClick?: (data: T) => void;
};

export default function SchoolJobCard<
  T extends EntityModel.BusinessEntity<'Job'> | ProjectModel.Project<'Job'>,
>({ data, stageName, groups, onClick }: Props<T>) {
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

  return standardFields ? (
    <div className="card-v2 h-full py-9 px-7 relative" onClick={handleClick}>
      <div className="font-semibold text-2xl truncate mb-4">{standardFields.name}</div>
      <div className="flex items-center justify-between mb-5">
        <div>{standardFields.tags?.map((tag) => <Tag key={tag.name} text={tag.name} />)}</div>
        <span className="text-black-333 text-2xl">
          {formatSalaryRange(standardFields.salaryRange?.[0]) || '-'}
        </span>
      </div>
      <div className="flex items-center gap-4 mb-4">
        {[
          formatStringArray(standardFields.degreeRequirement?.map((v) => v.name)) || '学历不限',
          formatNumberRange(standardFields.workYearsRequirement, '年') || '经验不限',
        ].map((item) => (
          <div className="tag-default" key={item}>
            {item}
          </div>
        ))}
      </div>

      <div className="text-black-666 text-base line-clamp-3 h-[72px] mb-8">
        {standardFields.responsibility || standardFields.qualification}
      </div>

      <div className="flex items-center gap-5 text-black-666 text-base h-8 mb-5">
        {standardFields.company && <span>{standardFields.company}</span>}
        <LocationDisplay locations={standardFields.locations} />
      </div>

      {groups && stageName && taskId ? (
        <div className="flex justify-end">
          <FlowSelector
            projectId={projectId}
            taskId={taskId}
            value={stageName || ''}
            groups={groups}
          />
        </div>
      ) : (
        <Button
          className="absoulute bottom-0 block ml-auto w-40 primary-gradient-button"
          radius="full"
          onClick={handleClick}
        >
          立即查看
        </Button>
      )}
    </div>
  ) : null;
}
