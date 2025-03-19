import { useSystemEmployee } from '@/hooks/useSystemEmployee';

export default function BasicInfo({
  data,
  className,
}: {
  data?: EntityModel.BusinessEntity<'SystemEmployee'>;
  className?: string;
}) {
  const { basicInfo, academicPerformance } = useSystemEmployee(data);

  return (
    <div className="flex items-center gap-10">
      <div className="flex-1">
        <div className={`text-4xl font-semibold text-black-333 mb-16`}>基本信息</div>
        <div className={`bg-white h-[260px] py-12 px-14 flex flex-row gap-10 ${className}`}>
          <div className="grid grid-cols-2 gap-8 flex-1">
            {Object.entries(basicInfo).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 text-xl">
                <div className="flex-shrink-0 text-black-666">{key}：</div>
                <div className=" text-black-333 truncate">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className={`text-4xl font-semibold text-black-333 mb-16`}>在校成绩</div>
        <div
          className={`bg-white h-[260px] py-12 px-14 gap-10 text-xl text-black-666 ${className}`}
        >
          <div className="mb-10 ">
            处于全部学生的
            <span className="text-black-333">前{academicPerformance.topPercentage || 0}%</span>
          </div>
          <div>
            平均GPA: <span className="text-black-333">{academicPerformance.averageGPA}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
