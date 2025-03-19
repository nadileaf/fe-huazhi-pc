'use client';
import { useState } from 'react';

export default function EvaluationTabData({ data }: { data: { title: string; desc: string }[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className="ml-auto w-[552px] max-sm:mx-auto max-sm:w-[80%] bg-white rounded-lg p-10 px-12 max-sm:p-5 max-sm:px-6">
        <div className="text-black font-[450] text-2xl max-sm:text-lg mb-3">
          {data[activeIndex].title}
        </div>
        <div className="text-black text-base max-sm:text-sm rounded">{data[activeIndex].desc}</div>
      </div>

      <div className="max-sm:w-full py-20 max-sm:py-12 max-sm:pb-8 flex items-center justify-between ">
        {data.map((item, index) => (
          <div
            key={item.title}
            className={`w-[196px] max-sm:w-auto max-sm:min-w-[80px]  py-3 max-sm:py-2 max-sm:px-2 text-lg max-sm:text-sm font-[450] rounded-[36px] flex items-center justify-center bg-white shadow-md cursor-pointer hover:text-primary  ${activeIndex === index ? 'text-primary' : 'text-black'}`}
            onClick={() => setActiveIndex(index)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </>
  );
}
