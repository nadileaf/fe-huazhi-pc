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
import { Button, Chip } from '@nextui-org/react';

type Props<T extends EntityModel.BusinessEntity<'Job'> | TaskModel.Task<'Job'>> = {
  data: T;
  onClick?: (data: T) => void;
};

export default function HotJobCard<
  T extends EntityModel.BusinessEntity<'Job'> | TaskModel.Task<'Job'>,
>({ data, onClick }: { data: T; onClick?: (data: T) => void }) {
  const standardFields = useMemo(
    () =>
      'taskPayload' in data
        ? data.taskPayload?.payload?.data.standardFields
        : 'data' in data
          ? data.data.standardFields
          : undefined,
    [data],
  );
  console.log('standardFields', standardFields);

  const id = useMemo(
    () => ('taskPayload' in data ? data.taskPayload?.openId : data.meta.openId),
    [data],
  );

  const company = useMemo(
    () => standardFields?.companyReference?.payload?.name || standardFields?.company,
    [standardFields],
  );

  const location = useMemo(
    () => formatLocation(standardFields?.locations),
    [standardFields?.locations],
  );

  const router = useRouter();
  function handleClick() {
    console.log('handleClick', onClick);
    if (onClick) onClick(data);
    else router.push(`/home/entity/Job/${id}`);
  }

  return standardFields ? (
    <div
      className="h-full bg-white rounded-lg shadow-md hover:shadow-xl cursor-pointer relative group "
      onClick={handleClick}
    >
      <div className="px-7 pt-5 w-full">
        {' '}
        <div className="font-semibold text-2xl truncate mb-4">{standardFields.name}</div>
        <div className="flex items-center gap-2 mb-4 h-7">
          {standardFields.tags?.map((tag, i) => (
            <Chip
              key={i}
              color="default"
              variant="flat"
              size="sm"
              style={{ ...tag.style, backgroundColor: tag.style['background-color'] }}
            >
              {tag.name}
            </Chip>
          ))}
        </div>
        <div className="flex items-center justify-end mb-5">
          <span className="text-black-333 text-2xl ">
            {formatSalaryRange(standardFields.salaryRange?.[0]) || '-'}
          </span>
        </div>
        <div className="flex items-center flex-wrap gap-3 mb-5">
          {[
            // ...(standardFields.tags?.map((tag) => tag.name) || []),
            formatStringArray(standardFields.degreeRequirement?.map((v) => v.name)) || '学历不限',
            formatNumberRange(standardFields.workYearsRequirement, '年') || '经验不限',
          ].map((item) => (
            <div
              className="border border-[#E0E0E0] bg-white text-black-666 text-sm py-1 px-2 rounded w-max"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#F2F6FF] group-hover:bg-active px-7 flex items-center gap-5 text-black-666 text-base h-16">
        <span className="truncate flex-1">{company && <span>{company}</span>}</span>

        {location && (
          <span className="flex items-center gap-1 truncate flex-1">
            <Icon icon="akar-icons:location" className="text-default-500 flex-shrink-0" />
            {location}
          </span>
        )}
      </div>
    </div>
  ) : null;
}
