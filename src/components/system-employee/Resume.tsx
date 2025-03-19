import { useSystemEmployee } from '@/hooks/useSystemEmployee';
import { formatDate, formatImageUrl, formatDateRange } from '@/utils/format';
import { Image } from '@nextui-org/react';
import NextImage from 'next/image';

interface ResumeProps {
  data: SystemEmployeeModel.SystemEmployee;
}

export default function Resume({ data }: ResumeProps) {
  const { standardFields, basicInfo, academicPerformance, trainings, works } =
    useSystemEmployee(data);

  if (!standardFields) return null;

  return (
    <div id="resume" className="bg-white p-12 relative">
      <h3 className="text-5xl font-bold text-primary">
        {standardFields.humanInfo?.name}
        <span className="text-black-333"> 个人简历</span>
      </h3>

      {standardFields.humanInfo?.avatar?.key && (
        <Image
          src={formatImageUrl(standardFields.humanInfo.avatar.key)}
          alt="头像"
          width={150}
          height={200}
          style={{ objectFit: 'cover' }}
          as={NextImage}
          classNames={{
            wrapper: 'ml-auto -mt-11',
          }}
        />
      )}

      <>
        <ResumeSection
          title="基本信息"
          classNames={{ content: 'grid grid-cols-3 gap-4', title: 'mt-10' }}
        >
          {Object.entries(basicInfo).map(([key, value]) => (
            <div key={key} className="flex items-center flex-wrap gap-2 text-lg">
              <div className="flex-shrink-0 text-black-666">{key}：</div>
              <div className="text-black-333 truncate">{value}</div>
            </div>
          ))}
        </ResumeSection>

        <ResumeSection
          title="在校成绩"
          classNames={{ content: 'grid grid-cols-3 gap-4', title: 'mt-10' }}
        >
          <div className="">
            处于全部学生的
            <span className="text-black-333">前{academicPerformance.topPercentage}%</span>
          </div>
          <div>
            平均GPA: <span className="text-black-333">{academicPerformance.averageGPA}</span>
          </div>
        </ResumeSection>

        {standardFields.educations?.length ? (
          <ResumeSection
            title="教育经历"
            classNames={{
              content: 'space-y-4 ',
              title: 'mt-10',
            }}
          >
            {standardFields.educations?.map((edu, index) => (
              <div key={index}>
                <div className="text-lg font-bold mb-1 truncate w-40">{edu.schoolName}</div>
                <div className="flex gap-5 items-center">
                  <div className="text-center">{edu.educationLevelName || '普通高等教育'}</div>
                  <div className="text-center">{edu.degree?.name || '教育学'}</div>
                  <div className="text-center">{formatDateRange(edu.dateRange)}</div>
                  <div className="text-center">{edu.isHighest ? '3年' : '2年'}</div>
                </div>
              </div>
            ))}
          </ResumeSection>
        ) : null}

        {standardFields.certificates?.length ? (
          <ResumeSection title="所获证书" classNames={{ content: 'space-y-4', title: 'mt-10' }}>
            <ul className="list-disc list-inside space-y-1">
              {standardFields.certificates?.map((cert, index) => (
                <li key={index}>
                  <div className="inline-flex items-center justify-between gap-9">
                    <span>{cert.name}</span>
                    <span>{formatDate(cert.date, 'YYYY-MM-DD')}</span>
                  </div>
                </li>
              ))}
            </ul>
          </ResumeSection>
        ) : null}

        {trainings.length ? (
          <ResumeSection title="在校所学课程" classNames={{ content: 'space-y-4', title: 'mt-10' }}>
            <ul className=" space-y-4">
              {trainings.map((yearGroup, index) => (
                <li key={index} className="">
                  <div className="">
                    <div className="text-lg font-bold mb-1">{yearGroup.year}</div>
                    <div className="text-black-333 inline-flex items-center flex-wrap gap-3">
                      {yearGroup.points.map((course, idx) => (
                        <span key={idx}>
                          {<span className="mx-1">•</span>}
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </ResumeSection>
        ) : null}

        {works.length ? (
          <ResumeSection title="工作实践经历" classNames={{ title: 'mt-10' }}>
            {works?.map((work, index) => (
              <div key={index} className="mb-5">
                <div className="flex justify-between mb-2">
                  <div className="flex gap-5 items-center texg-lg">
                    <span className="font-bold">{work.companyName}</span>{' '}
                    <span>{work.jobNames?.join('/')}</span>
                  </div>
                  <span className="text-base">{formatDateRange(work.dateRange)}</span>
                </div>
                <div className="text-base text-gray-600 whitespace-pre-line leading-[1.6]">
                  {work.description}
                </div>
              </div>
            ))}
          </ResumeSection>
        ) : null}
      </>
    </div>
  );
}

interface ResumeSectionProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
  classNames?: {
    title?: string;
    content?: string;
  };
}

function ResumeSection({ title, children, classNames }: ResumeSectionProps) {
  return (
    <>
      <h4 className={`text-lg font-bold text-primary ${classNames?.title}`}>{title}</h4>
      <div className="divider bg-primary mb-5"></div>
      <div className={`text-base text-black-333 px-4 ${classNames?.content}`}>{children}</div>
    </>
  );
}
