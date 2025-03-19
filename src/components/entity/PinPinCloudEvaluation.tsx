import { Image, cn } from '@nextui-org/react';
import { useMemo } from 'react';
import FileList from '../basic/FileList';
import { formatImageUrl } from '@/utils/format';
import { useStartEvaluation } from '@/hooks/useEvaluation';

export function PinPinCloudEvaluationCard({
  data,
  stageName,
  children,
  className,
}: {
  data:
    | EntityModel.BusinessEntity<'PinPinCloudEvaluation'>
    | TaskModel.Task<'PinPinCloudEvaluation'>;
  stageName?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  // const { isStarted, isDisabled, getButtonText, actionLoading, handleStart } = useStartEvaluation();

  const standardFields = useMemo(
    () =>
      'taskPayload' in data
        ? data.taskPayload?.payload?.data.standardFields
        : 'data' in data
          ? data.data.standardFields
          : undefined,
    [data],
  );

  return standardFields ? (
    <div
      className={cn(
        'card pt-12 pb-8 px-12 flex-row gap-0 justify-between relative cursor-default',
        className,
      )}
    >
      {standardFields.icon?.key && (
        <Image
          src={formatImageUrl(standardFields.icon.key)}
          width={50}
          alt=""
          classNames={{ wrapper: 'flex-shrink-0' }}
        ></Image>
      )}
      <div className="w-[416px]">
        <div className="text-3xl text-black truncate"> {standardFields.name}</div>
        <div className="my-5 text-gray-700 text-base line-clamp-4 h-24">
          {standardFields.description}
        </div>
        {children}
        {standardFields.evaluationReports?.length > 0 && (
          <FileList data={standardFields.evaluationReports} size="sm" />
        )}
      </div>
    </div>
  ) : null;
}
