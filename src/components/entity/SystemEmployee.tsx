import { useRequest } from '@/hooks/useHooks';
import { getSchoolKV } from '@/services/dictionary';
import { formatDate, formatDateRange, formatImageUrl, formatLocation } from '@/utils/format';
import { Icon } from '@iconify/react';
import {
  Avatar,
  Button,
  Chip,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { useMemo } from 'react';
import FileList from '../basic/FileList';
import Loading from '../basic/Loading';

export function SystemEmployeeDetail({
  data,
}: {
  data: EntityModel.BusinessEntity<'SystemEmployee'>;
}) {
  const standardFields = useMemo(() => data?.data.standardFields, [data]);

  const works = useMemo(
    () => [...(standardFields?.works || []), ...(standardFields?.interns || [])],
    [standardFields],
  );
  const evaluationReports = useMemo(
    () => standardFields?.evaluationReports?.filter((v) => v.key),
    [standardFields],
  );

  return (
    <div className="flex flex-col gap-5">
      <BasicInfo data={data} />
      <div className="grid grid-cols-2 gap-5">
        <div className="card-section2">
          <div className="section-title">认证教育信息</div>
          {standardFields?.educations?.[0] ? (
            <div className="flex flex-col gap-5">
              <EducationInfo educationInfo={standardFields?.educations?.[0]} />
              {standardFields?.educations.slice(1).map((item, index) => (
                <div key={index}>
                  <Popover placement="top" triggerScaleOnOpen={false} backdrop="blur">
                    <PopoverTrigger>
                      <div className="flex items-center justify-between bg-default-100 p-2 rounded-lg cursor-pointer hover:bg-default-200">
                        <div className="flex items-center gap-5">
                          <div className="text-black text-14px font-medium">{item.schoolName}</div>
                          <div>{item.degree?.name}</div>
                          <div className="text-gray-500">{formatDateRange(item.dateRange)}</div>
                        </div>
                        <Icon icon="akar-icons:chevron-right-small" className="text-16px" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-5">
                      <EducationInfo educationInfo={item} />
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </div>
          ) : (
            <EducationInfo educationInfo={standardFields?.educations?.[0]} />
          )}
        </div>
        <div className="card-section2">
          <div className="section-title flex justify-between items-center">所获证书</div>
          <div className="flex flex-col gap-5">
            {!standardFields?.certificates?.length && (
              <div className="text-center text-default-400 text-xs py-5">暂无数据</div>
            )}
            {standardFields?.certificates?.map((item, index) => (
              <div key={index} className="flex items-center gap-5">
                <Image
                  src={formatImageUrl(item.attachments?.[0]?.key)}
                  className="w-[60px] h-[60px] rounded-md"
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <div className="text-black text-14px">{item.name}</div>
                  <div className="text-default-400">完成于 {formatDate(item.date) || '-'}</div>
                  <div className="text-primary inline-flex items-center">
                    <Icon icon="ri:checkbox-circle-fill" className="text-16px mr-1" />
                    已验证电子证书 ({item.source || '-'})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-section2">
          <div className="section-title flex justify-between items-center">测评报告</div>
          {!evaluationReports?.length && (
            <div className="text-center text-default-400 text-xs py-5">暂无数据</div>
          )}
          <FileList data={evaluationReports} mode="list" />
        </div>
        <div className="card-section2">
          <div className="section-title">在校成绩</div>
          <div className="flex items-center justify-between text-14px">
            <div className="text-[#A58673]">
              处于全部学生的前{standardFields?.academicPerformance?.topPercentage || 0}%
            </div>
            <div>平均GPA: {standardFields?.academicPerformance?.averageGPA}</div>
          </div>
        </div>

        <div className="card-section2">
          <div className="section-title">在校所学课程</div>
          {!standardFields?.trainings?.length && (
            <div className="text-center text-default-400 text-xs py-5">暂无数据</div>
          )}
          <div className="relative z-1 flex flex-col gap-2">
            <table>
              {standardFields?.trainings?.map((item, index) => (
                <tr key={index}>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{formatDateRange(item.dateRange)}</td>
                  <td className="p-2">{item.description}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>

        <div className="card-section2">
          <div className="section-title">工作实训经历</div>
          {!works?.length && (
            <div className="text-center text-default-400 text-xs py-5">暂无数据</div>
          )}
          <div className="flex flex-col gap-8">
            {works?.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-black text-14px font-medium">{item.companyName}</span>
                  <span className="text-gray-400">
                    {formatDate(item.dateRange?.start?.iso, 'YYYY/MM/DD')}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-14px">{item.jobNames?.join('/')}</span>
                </div>
                <div className="text-[#999] leading-[1.5] bg-[#F6F8FA] p-4 mt-2 rounded-md overflow-y-auto max-h-[150px]">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BasicInfo({
  data,
  className,
}: {
  data: EntityModel.BusinessEntity<'SystemEmployee'>;
  className?: string;
}) {
  const standardFields = useMemo(() => data?.data.standardFields, [data]);
  const info = useMemo(
    () => ({
      姓名: standardFields?.humanInfo?.name,
      性别: standardFields?.humanInfo?.genderName,
      年龄: standardFields?.humanInfo?.age,
      学号: standardFields?.employeeInfo?.id,
      学历: standardFields?.educations?.[0]?.degree?.name,
      现居地: formatLocation(standardFields?.contactInfo?.address),
    }),
    [standardFields],
  );
  return (
    <div className={`card-section2 flex w-full flex-row gap-10 ${className}`}>
      <Avatar
        classNames={{ base: 'w-20 h-20' }}
        radius="sm"
        src={standardFields?.humanInfo?.avatar?.key}
        className="flex-shrink-0"
      ></Avatar>

      <div className="grid grid-cols-2 gap-y-2 flex-1">
        {Object.entries(info).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <div className="w-20 text-default-500">{key}</div>
            <div className="flex-1">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationInfo({
  educationInfo,
}: {
  educationInfo?: NonNullable<
    EntityModel.BusinessEntity<'SystemEmployee'>['data']['standardFields']['educations']
  >[0];
}) {
  const { data: schoolKV, loading } = useRequest(() => getSchoolKV(educationInfo?.schoolName), {
    refreshDeps: [educationInfo?.schoolName],
    before: () => !!educationInfo?.schoolName,
  });
  return (
    <Loading loading={loading}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          {schoolKV?.logo && (
            <Image src={`data:image/jpg;base64,${schoolKV.logo}`} width={60} height={60} alt="" />
          )}
          <div className="flex-1 min-w-px">
            <div className="text-16px text-[#A58673] mb-2">{educationInfo?.schoolName}</div>
            <div className="text-default-400 truncate">{schoolKV?.['英文名'] || ''}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {schoolKV?.['标签']?.map((tag: string, i: number) => (
            <Chip key={i} size="sm">
              {tag}
            </Chip>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-default-400 w-60px">所在城市</span>
            <span className="flex-1">{schoolKV?.['省份'] || ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-default-400 w-60px">获得学历</span>
            <span className="flex-1">{educationInfo?.degree?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-default-400 w-60px">入学年份</span>
            <span className="flex-1">
              {formatDate(educationInfo?.dateRange?.start?.iso, 'YYYY年')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-default-400 w-60px">毕业年份</span>
            <span className="flex-1">
              {formatDate(educationInfo?.dateRange?.end?.iso, 'YYYY年')}
            </span>
          </div>
          <div className="flex items-center col-span-full  gap-2">
            <span className="text-default-400 w-60px">就读专业</span>
            <span className="flex-1">{educationInfo?.majorNames?.[0]}</span>
          </div>
        </div>
      </div>
    </Loading>
  );
}
