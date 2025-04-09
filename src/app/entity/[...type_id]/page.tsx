'use client';
import { JobDetail } from '@/components/entity/Job';
import { CompanyDetail } from '@/components/entity/Company';
import { JobOpportunitiesDetail } from '@/components/entity/JobOpportunities';
import { TrainingDetail } from '@/components/entity/Training';
import { useRequest } from '@/hooks/useHooks';
import { entityService } from '@/services/entity';
import Loading from '@/components/basic/Loading';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import NoData from '@/components/basic/NoData';

export default function EntityDetail({
  params,
  searchParams,
}: {
  params: { type_id: [EntityModel.BusinessEntityType, string] };
  searchParams: { taskId?: string; projectId?: string };
}) {
  const [entityType, entityId] = params.type_id;
  const { data, loading } = useRequest(() => entityService.queryDetail({ entityType, entityId }), {
    refreshDeps: [entityType, entityId],
  });

  const router = useRouter();

  return (
    <Loading loading={loading}>
      {data ? (
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
          {entityType === 'Company' && (
            <CompanyDetail data={data as EntityModel.BusinessEntity<'Company'>} {...searchParams} />
          )}
          {entityType === 'JobOpportunities' && (
            <JobOpportunitiesDetail
              data={data as JobOpportunitiesModel.JobOpportunities}
              {...searchParams}
            />
          )}
        </section>
      ) : (
        <NoData className="py-24" />
      )}
    </Loading>
  );
}
