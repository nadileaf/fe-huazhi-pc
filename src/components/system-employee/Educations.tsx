import { Image } from '@nextui-org/react';
import NoData from '../basic/NoData';
import { useCallback, useMemo, useState } from 'react';
import { formatDate, formatDuration } from '@/utils/format';
import Loading from '../basic/Loading';

export interface Props {
  educationInfo?: (ResumeModel.Education & { kv?: any })[];
}

export default function Educations({ educationInfo }: Props) {
  const [loading, setLoading] = useState(false);

  const renderField = useCallback((label: string, value?: string) => {
    return (
      <div className="flex items-center gap-2 text-2xl">
        <span className="text-black-666 w-[129px]">{label}：</span>
        <span className="text-black-333 truncate">{value || '-'}</span>
      </div>
    );
  }, []);

  return (
    <Loading loading={loading}>
      <div className="w-full overflow-x-auto scrollbar-hide">
        {educationInfo?.length ? (
          educationInfo.map((item, i) => (
            <div
              key={item.schoolName || i}
              className="w-full h-[400px] rounded-lg shadow-lg bg-white mb-16"
            >
              <div className="rounded-l-lg rounded-br-lg bg-[#FFECDD] w-[240px] h-[52px] flex items-center justify-center">
                {[item.degree?.name, item.schoolName, item.majorNames?.[0]].join('-')}
              </div>
              <div className="my-16 mx-24 flex items-center h-[178px]">
                {item.kv?.logo && (
                  <div className="h-full flex flex-shrink-0 items-center justify-between">
                    <Image src={`data:image/jpg;base64,${item.kv.logo}`} width={176} alt="" />
                    <div className="w-[1px] h-full bg-[#CCCCCC] mx-16"></div>
                  </div>
                )}
                <div className="flex w-full gap-10">
                  <div className="flex flex-col gap-10 flex-1">
                    {renderField('入学日期', formatDate(item.dateRange?.start?.iso))}
                    {renderField('结业日期', formatDate(item.dateRange?.end?.iso))}
                    {renderField('学校名称', item.schoolName)}
                  </div>
                  <div className="flex flex-col gap-10 flex-1">
                    {renderField('学历类别', item.degree?.name)}
                    {renderField('就读专业', item.majorNames?.[0])}
                    {renderField('学制时长', formatDuration(item.dateRange, false))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NoData />
        )}
      </div>
    </Loading>
  );
}
