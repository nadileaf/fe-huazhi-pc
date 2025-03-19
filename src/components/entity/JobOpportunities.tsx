import {
  formatLocation,
  formatNumberRange,
  formatSalaryRange,
  formatStringArray,
} from '@/utils/format';
import { Icon } from '@iconify/react';
import { Button, Chip, Image, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import LocationDisplay from '../basic/LocationDisplay';

export function JobOpportunitiesCard<
  T extends EntityModel.BusinessEntity<'JobOpportunities'> | TaskModel.Task<'JobOpportunities'>,
>({ data, mode, onClick }: { data: T; mode?: 'simple'; onClick?: (data: T) => void }) {
  const standardFields = useMemo(
    () =>
      'taskPayload' in data
        ? data.taskPayload?.payload?.data.standardFields
        : 'data' in data
          ? data.data.standardFields
          : undefined,
    [data],
  );

  const id = useMemo(
    () => ('taskPayload' in data ? data.taskPayload?.openId : data.meta.openId),
    [data],
  );

  const router = useRouter();
  function handleClick() {
    console.log('handleClick', onClick);
    if (onClick) onClick(data);
    else router.push(`/entity/JobOpportunities/${id}`);
  }

  return (
    standardFields && (
      <div className="card justify-between" onClick={handleClick}>
        {mode === 'simple' ? (
          <>
            <div className="text-default-500 text-xs">{standardFields.company}</div>
            <div className="font-medium text-base">{standardFields.name}</div>
            <div className="flex items-center gap-2 overflow-hidden">
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
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1 text-default-500 text-xs">
                <Icon icon="akar-icons:location" className="text-default-500" />
                {formatLocation(standardFields.locations, ['city', 'district'])}
              </span>
              <span className="text-orange-500">
                {formatSalaryRange(standardFields.salaryRange)}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="font-medium">{standardFields.name}</div>
                <div className="text-default-500 text-xs">{standardFields.company}</div>
              </div>
              <div className="flex items-center gap-2">
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
              <div className="line-clamp-2 text-default-500 text-xs">
                {standardFields.description}
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1 text-default-500 text-xs">
                <Icon icon="akar-icons:location" className="text-default-500" />
                {formatLocation(standardFields.locations, ['city', 'district'])}
              </span>
              <span className="text-orange-500">
                {formatSalaryRange(standardFields.salaryRange)}
              </span>
            </div>
          </>
        )}
      </div>
    )
  );
}

export function JobOpportunitiesDetail({
  data,
}: {
  data: EntityModel.BusinessEntity<'JobOpportunities'>;
}) {
  return (
    <>
      <div className="wrapper py-20">
        <div className="flex justify-between gap-3 mb-7">
          <div>
            <div className="text-5xl text-black font-bold mb-8">
              {data.data.standardFields.name}
            </div>
            <div className="flex items-center gap-5 text-2xl">
              <span className="">发布者：{data.data.standardFields.company}</span>
              <LocationDisplay locations={data.data.standardFields.locations} />
            </div>
          </div>
          <div>
            <Button
              as={Link}
              href={data.data.standardFields.link?.key}
              isExternal
              isDisabled={!data.data.standardFields.link?.key}
              className="primary-gradient-button w-[140px]"
              radius="full"
              color="primary"
            >
              前往投递
            </Button>
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          {data.data.standardFields.tags?.map((tag, index) => (
            <div className="tag-default" key={index}>
              {tag.name}
            </div>
          ))}
        </div>
        <div className="mt-20 flex w-full gap-4 items-center">
          <div className="flex-1 flex flex-col items-center gap-6">
            <span className="text-3xl">
              {data.data.standardFields.degreeRequirements?.map((v) => v.name).join(',') || '不限'}
            </span>
            <span className="text-xl">学历要求</span>
          </div>

          <div className="flex-1 flex flex-col items-center gap-6 border-x border-gray-200">
            <span className="text-3xl">
              {formatNumberRange(data.data.standardFields.workExperienceRequirement, '年') ||
                '不限'}
            </span>
            <span className="text-xl">经验要求</span>
          </div>

          <div className="flex-1 flex flex-col items-center gap-6">
            <span className="text-3xl">
              {formatNumberRange(data.data.standardFields.hiringCountRange, '人') || '-'}
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
              {formatSalaryRange(data.data.standardFields.salaryRange, false) || '-'}
            </span>
            <span className="text-xl">元/月</span>
          </div>
        </div>
      </div>
      <div className="bg-white py-28">
        <div className="wrapper">
          <div className="mb-28">
            <div className="text-4xl font-bold mb-20">岗位描述</div>
            <div className="text-2xl whitespace-pre-wrap leading-[1.6]">
              {data.data.standardFields.description}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
