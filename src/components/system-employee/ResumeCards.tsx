import { useMemo, useState } from 'react';
import { Avatar, Switch, Image, Link } from '@nextui-org/react';
import {
  formatLocation,
  formatHighestEducation,
  formatDateRange,
  formatImageUrl,
} from '@/utils/format';
import { Icon } from '@iconify/react';

export default function ResumeCards({
  data,
  educationInfo,
}: {
  data: EntityModel.BusinessEntity<'SystemEmployee'>;
  educationInfo: (ResumeModel.Education & { kv?: any })[];
}) {
  const [show, setShow] = useState(true);

  const standardFields = useMemo(() => data?.data.standardFields, [data]);

  const highestEducation = useMemo(
    () => formatHighestEducation(educationInfo) as ResumeModel.Education & { kv?: any },
    [educationInfo],
  );

  return (
    <div className="bg-white w-full ">
      <div className="wrapper ">
        <div className="flex justify-between pb-20">
          <div
            className={`text-4xl font-semibold text-black-333 h-full ${show ? '' : 'opacity-0'}`}
          >
            人才卡片
          </div>
          <Switch
            isSelected={show}
            onValueChange={setShow}
            classNames={{ label: 'text-lg text-black-333' }}
          >
            {show ? '关闭人才卡片' : '开启人才卡片'}
          </Switch>
        </div>
        {show && (
          <section className="pb-24">
            <div className="w-full h-[460px] flex items-center gap-5 mb-5">
              <div className="w-[41.87%] h-full flex flex-col gap-5">
                {standardFields.academicPerformance?.topPercentage && (
                  <div className="flex-1 flex gap-5">
                    <Card className="bg-[#E7FBF9] text-black-333 text-lg flex-col justify-between flex-1">
                      <div>排名</div>
                      <div className="text-6xl">
                        {standardFields.academicPerformance.topPercentage}%
                      </div>
                      <div>处于全部学生</div>
                    </Card>
                    <Card className="bg-[#E7FBF9] text-black-333 text-lg flex-col justify-between flex-1">
                      <div>平均</div>
                      <div className="text-6xl">
                        {standardFields.academicPerformance.averageGPA}
                      </div>
                      <div>GPA</div>
                    </Card>
                  </div>
                )}

                <div className="w-full flex-1 ">
                  <Card className="bg-active h-full flex-col justify-between !items-start">
                    <div className="text-6xl w-full truncate">{highestEducation?.degree?.name}</div>
                    <div className="w-full">
                      <div className="divider mb-3"></div>
                      <div className="flex items-center justify-between">
                        <span>{formatDateRange(highestEducation?.dateRange, 'YYYY')}</span>
                        <span>{highestEducation?.schoolName}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              <Card className="bg-[#F0FCFF] w-[27.73%] h-full flex-col">
                <Avatar
                  classNames={{ base: 'w-44 h-44 ' }}
                  src={formatImageUrl(standardFields?.humanInfo?.avatar?.key)}
                  className="flex-shrink-0"
                ></Avatar>
                <div className="mt-9 mb-6 text-4xl">{standardFields.humanInfo?.name}</div>
                <div className="divider mb-6"></div>
                <div className="text-lg text-black-333 font-light flex items-center flex-col justify-center">
                  <div className="mb-4 flex items-center gap-2">
                    <span>{standardFields.humanInfo?.genderName}</span>
                    <span>{standardFields.humanInfo?.age}</span>
                  </div>
                  <div className="">
                    {formatLocation(standardFields?.contactInfo?.address, ['city', 'district']) ||
                      formatLocation(standardFields?.contactInfo?.address, ['province']) ||
                      formatLocation(standardFields?.contactInfo?.address, ['country'])}
                  </div>
                </div>
              </Card>
              {highestEducation && (
                <Card className="bg-[#F2F6FF] w-[27.73%] h-full flex-col">
                  {highestEducation.kv?.logo && (
                    <Image
                      src={`data:image/jpg;base64,${highestEducation.kv.logo}`}
                      width={176}
                      alt=""
                    />
                  )}
                  <div className="mt-9 mb-6 text-4xl text-center w-full truncate">
                    {highestEducation.schoolName}
                  </div>
                  <div className="divider mb-6"></div>
                  <div className="text-lg text-black-333 font-light flex items-center flex-col justify-center">
                    <div className="mb-4 flex items-center gap-2">
                      <span>{highestEducation.majorNames?.[0]}</span>
                      <span>{highestEducation.degree?.name}</span>
                    </div>
                    <div>学号：{standardFields.employeeInfo?.id ?? '-'}</div>
                  </div>
                </Card>
              )}
            </div>
            <div className="w-full h-[220px] flex items-center gap-5">
              <Card className="bg-[#F2F6FF] w-[20.23%] h-full flex-col justify-between !items-start">
                <div className="text-6xl text-black-333">
                  {standardFields.certificates?.length ?? 0}
                </div>
                <div className="w-full">
                  <div className="divider mb-3"></div>
                  <CardLink href="#certificates">所获证书</CardLink>
                </div>
              </Card>
              <Card className="bg-[#E7FBF9] w-[35.55%] h-full flex-col justify-between !items-start">
                <div className="flex flex-col gap-2">
                  <span className="text-5xl text-black-333 ">
                    {standardFields.trainings?.[0]?.name}
                  </span>
                  <span className="text-lg">
                    {formatDateRange(standardFields.trainings?.[0]?.dateRange)}
                  </span>
                </div>

                <div className="w-full">
                  <div className="divider mb-3"></div>
                  <CardLink href="#courses">所学课程</CardLink>
                </div>
              </Card>
              <Card className="bg-[#F2F6FF] w-[41.09%] h-full flex-col justify-between !items-start">
                <div className="w-full">
                  <div className="flex justify-between w-full">
                    <span className="text-2xl text-black-333 ">
                      {standardFields.works?.[0]?.companyName}
                    </span>
                    <span className="text-lg">
                      {formatDateRange(standardFields.works?.[0]?.dateRange)}
                    </span>
                  </div>
                  <div className="w-full mt-4 text-lg truncate">
                    {standardFields.works?.[0]?.description}
                  </div>
                </div>
                <div className="w-full">
                  <div className="divider mb-3"></div>
                  <CardLink href="#works">工作实训经历</CardLink>
                </div>
              </Card>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

const Card = ({ children, className }: { children: React.ReactNode; className: string }) => (
  <div className={`py-8 px-9 flex items-center rounded-lg shadow-lg ${className}`}>{children}</div>
);

const CardLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-black-333 w-full flex justify-between items-center"
    showAnchorIcon
    anchorIcon={<Icon icon="ic:outline-arrow-outward"></Icon>}
  >
    {children}
  </Link>
);
