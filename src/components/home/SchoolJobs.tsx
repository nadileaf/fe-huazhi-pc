'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import { Select, SelectItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import SchoolJobCard from '../job/SchoolJobCard';
import Loading from '../basic/Loading';
import useSchoolJobs from '@/hooks/useSchoolJobs';
import NoData from '../basic/NoData';

const sliderSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 6000,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
};

export default function SchoolJobs() {
  const sliderRef = useRef<Slider | null>(null);
  const router = useRouter();

  const { sorts, data, loading, currentSort, handleSelectSort, handleClick } = useSchoolJobs();

  function handleClickMore() {
    router.push('/school-jobs');
  }

  return (
    <section>
      <div className="wrapper pb-20">
        <div className="flex items-center justify-between pt-20 mb-20">
          <div className="title">我校专区</div>
          <div className="flex items-center justify-between w-[200px]">
            <Select
              aria-label="label"
              radius="full"
              className="w-36"
              selectedKeys={[currentSort.label]}
              onChange={handleSelectSort}
            >
              {sorts.map((sort) => (
                <SelectItem key={sort.label}>{sort.label}</SelectItem>
              ))}
            </Select>
            <div className="hover:text-primary cursor-pointer" onClick={handleClickMore}>
              更多
            </div>
          </div>
        </div>
        <Loading loading={loading}>
          {!data?.data.length ? (
            <NoData className="py-24" />
          ) : (
            <div>
              {data?.data.length && data.data.length >= 3 ? (
                <Slider
                  ref={(slider) => {
                    sliderRef.current = slider;
                  }}
                  {...sliderSettings}
                >
                  {data?.data.map((item) => (
                    <div key={item.meta.openId} className="px-2.5 py-8">
                      <SchoolJobCard data={item} onClick={handleClick} />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="flex items-center">
                  {data?.data.map((item) => (
                    <div key={item.meta.openId} className="px-2.5 py-8 flex-1">
                      <SchoolJobCard data={item} onClick={handleClick} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Loading>
      </div>
    </section>
  );
}
