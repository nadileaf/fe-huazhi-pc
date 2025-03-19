'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Image } from '@nextui-org/react';
import { useRequest } from '@/hooks/useHooks';
import { bannerService } from '@/services/banner';
import Loading from './basic/Loading';

export default function Banner() {
  const { data, loading } = useRequest(() => bannerService.query());

  if (!data) return null;

  return (
    <section className="slider-container">
      <Loading loading={loading} className="h-[465px]">
        <Slider
          {...{
            dotsClass: 'slick-dots slick-dots-white white !bottom-4',
            infinite: data.length > 1,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 6000,
            pauseOnHover: false,
            arrows: false,
          }}
        >
          {data?.map((item, i) => (
            <div key={i} className="relative w-full">
              <Image src={item.url} alt="" width={'100%'} radius="none"></Image>
            </div>
          ))}
        </Slider>
      </Loading>
    </section>
  );
}
