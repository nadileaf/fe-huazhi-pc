'use client';
import { JobDetail } from '@/components/entity/Job';
import { JobOpportunitiesDetail } from '@/components/entity/JobOpportunities';
import { TrainingDetail } from '@/components/entity/Training';
import { useRequest } from '@/hooks/useHooks';
import { entityService } from '@/services/entity';
import { useAuthStore } from '@/stores/auth';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

export default function EntityDetail({
  params,
  searchParams,
}: {
  params: { type_id: [EntityModel.BusinessEntityType, string] };
  searchParams: { taskId?: string; projectId?: string };
}) {
  const { user } = useAuthStore();
  const [entityType, entityId] = params.type_id;
  const { data } = useRequest(() => entityService.queryDetail({ entityType, entityId }), {
    refreshDeps: [entityType, entityId, user],
    before: () => !!user || entityType === 'JobOpportunities',
  });

  const router = useRouter();

  return (
    data && (
      <section className="">
        <div className="wrapper ">
          <div
            className="flex items-center gap-2 pt-10 text-sm text-black-666 hover:text-black-333 cursor-pointer"
            onClick={() => router.back()}
          >
            <Icon icon="ep:back"></Icon>返回
          </div>
        </div>
        {entityType === 'Job' && <JobDetail data={data as JobModel.Job} {...searchParams} />}
        {entityType === 'JobOpportunities' && (
          <JobOpportunitiesDetail
            data={data as JobOpportunitiesModel.JobOpportunities}
            {...searchParams}
          />
        )}
        {entityType === 'Training' && (
          <TrainingDetail data={data as EntityModel.BusinessEntity<'Training'>} {...searchParams} />
        )}
      </section>
    )
  );
}
