import { formatDate } from '@/utils/format';
import NoData from '../basic/NoData';

export interface Props {
  works: ResumeModel.Work[];
}

export default function Works({ works }: Props) {
  return (
    <div className="w-full overflow-x-auto pb-12">
      {works.length ? (
        <div className="flex gap-8 px-4">
          {works.map((work) => (
            <div
              key={work.companyName}
              className="w-[625px] min-h-[380px] my-4 flex-shrink-0 bg-white rounded-md shadow-md py-10 px-16 text-black-333"
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-2xl font-medium">{work.jobNames?.join('/')}</span>
                <span> {formatDate(work.dateRange?.start?.iso, 'YYYY/MM/DD')}</span>
              </div>
              <div className="text-primary">{work.companyName}</div>
              <div className="divider my-6"></div>
              <div className="whitespace-pre-wrap ">{work.description}</div>
            </div>
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}
