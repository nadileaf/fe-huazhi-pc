import NoData from '../basic/NoData';

export interface EventPoint {
  points: string[];
  year: string;
  active?: boolean;
}

export interface TimeLineProps {
  events: EventPoint[];
  className?: string;
}

export default function TimeLine({ events, className }: TimeLineProps) {
  return (
    <div className={`flex items-center overflow-x-auto pb-12 ${className}`}>
      {events.length ? (
        <div className="flex ">
          {events.map((event, index) => (
            <div
              key={index}
              className="relative flex shrink-0 flex-col items-baseline min-w-[260px] pr-10"
            >
              {/* Timeline Line */}
              <div className="absolute z-1 top-3 left-0 w-full h-0.5 bg-[#CCCCCC]"></div>
              <div className="absolute z-1 top-5 left-2.5 w-0.5 h-32 bg-[#D9D9D9]"></div>
              <div className="absolute z-1 top-36 left-1.5 w-3 h-3 rounded-full bg-primary"></div>
              {/* Year Circle */}
              <div
                className={`w-5 h-5 rounded-full border-primary border-2 ${
                  event.active ? 'bg-primary' : 'bg-white'
                } flex justify-center items-center z-10`}
              ></div>
              {/* Year */}
              <div
                className={`pl-10 my-10 text-4xl font-bold ${event.active ? 'text-primary' : 'text-black'}  text-center`}
              >
                {event.year}
              </div>
              {/* Event List */}
              <ul className="pl-10 space-y-2">
                {event.points.map((point, idx) => (
                  <li key={idx} className="text-sm text-gray-600">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}
