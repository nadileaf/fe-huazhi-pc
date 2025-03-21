import { useRequest } from '@/hooks/useHooks';
import { taskService } from '@/services/task';
import { formatFileUrl } from '@/utils/format';
import { useMemo } from 'react';
import { Image } from '@nextui-org/react';
import LocationDisplay from '@/components/basic/LocationDisplay';
import HotJobCard from '../job/HotJobCard';

export function CompanyDetail({
  data,
  projectId,
  taskId,
}: {
  data: EntityModel.BusinessEntity<'Company'>;
  projectId?: string;
  taskId?: string;
}) {
  const queryParams = useMemo(
    () =>
      ({
        entityType: 'Job',
        filters: [
          {
            key: 'data.standardFields.channelTemplate.openId',
            values: ['EntityApprovalToJob'],
          },
          {
            key: 'data.standardFields.taskPayload.payload.data.standardFields.companyReference.openId',
            values: [data.meta.openId || ''],
          },
        ],
      }) as SearchModel.SearchEntityParams<SearchModel.SearchEntityType>,
    [data.meta.openId],
  );

  const { data: jobList } = useRequest(
    () => taskService.query<'Job'>({ ...queryParams, compact: true }),
    {
      before: () => !!data.meta.openId,
    },
  );

  const standardFields = data.data.standardFields;

  return (
    <div className="">
      {/* 公司基本信息卡片 */}
      <div className="wrapper py-10">
        <div className="bg-white rounded-lg p-8 mb-8">
          <div className="flex items-start gap-6">
            <Image
              src={formatFileUrl(standardFields.logo?.key)}
              alt={standardFields.name}
              className="w-24 h-24 flex-shrink-0"
              classNames={{ img: 'object-cover' }}
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-3">{standardFields.name}</h1>
              <p className="text-gray-600 mb-4 line-clamp-2">{standardFields.profile}</p>
              <div className="flex items-center gap-3 flex-wrap">
                {standardFields.tags?.map((tag, index) => (
                  <div key={index} className="tag-primary">
                    {tag.name}
                  </div>
                ))}
                {standardFields.address && <LocationDisplay locations={[standardFields.address]} />}
              </div>
            </div>
          </div>
        </div>

        {/* 企业背景介绍 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">企业背景介绍</h2>
          <div className="bg-white rounded-lg p-8">
            <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
              {standardFields.profile || '暂无'}
            </p>
          </div>
        </div>

        {/* 企业基本信息 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">企业基本信息</h2>
          <div className="bg-white rounded-lg p-8">
            <div className="space-y-6">
              <div className="flex items-center">
                <span className="text-gray-500 w-48">公司名：</span>
                <span className="text-gray-900">{standardFields.name || '暂无'}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 w-48">统一社会信用代码：</span>
                <span className="text-gray-900">
                  {standardFields.businessLicense?.uscc || '暂无'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 w-48">法人代表：</span>
                <span className="text-gray-900">{standardFields.juristicPerson || '暂无'}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 w-48">注册地址：</span>
                <span className="text-gray-900">
                  {standardFields.businessLicense?.address || '暂无'}
                </span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-48">经营范围：</span>
                <span className="text-gray-900 flex-1">
                  {standardFields.businessScope || '暂无'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 全部职位列表 */}
        {jobList?.data.length ? (
          <div>
            <h2 className="text-xl font-bold mb-4">全部职位列表</h2>
            <div className="grid grid-cols-3 gap-4">
              {jobList.data.map((job) => (
                <HotJobCard key={job.meta.openId} data={job} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
