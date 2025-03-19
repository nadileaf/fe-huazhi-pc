'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import ApplyButton from '@/components/unlogin/ApplyButton';
import { withCdnPrefix } from '@/utils/file';
import { Image } from '@nextui-org/react';
import { useMobile } from '@/hooks/useHooks';

const data = [
  {
    title: (
      <>
        以专业服务助力学生就业
        <br />
        链接高校与企业的桥梁
      </>
    ),
    img: 'footer-orange',
  },
  {
    title: (
      <>
        个性化职业辅导工具
        <br />
        推动学生合理有效成长
      </>
    ),
    img: 'footer-green',
  },
  {
    title: (
      <>
        多元一体的就业信息建设
        <br />
        俯瞰全局不再迷茫
      </>
    ),
    img: 'footer-purple',
  },
];

export default function FooterBanner() {
  const { isMobile } = useMobile();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <section className="w-full h-auto overflow-hidden">
      <Slider {...settings}>
        {data.map((item) => (
          <div key={item.img} className="relative w-full">
            <Image
              src={withCdnPrefix(
                `/custom/ciickd/website/banner/${item.img}-${isMobile ? 'mo' : 'pc'}.png`,
              )}
              width={'100vw'}
              radius="none"
              alt=""
              classNames={{ img: 'w-screen' }}
            ></Image>
            <div className="wrapper absolute inset-0 z-50 flex items-center justify-between">
              <div className="w-full flex justify-between items-end max-sm:items-center max-sm:gap-5 max-sm:flex-col">
                <h2 className="text-white text-6xl max-sm:text-2xl max-sm:text-center max-sm:w-full leading-[1.2]">
                  {item.title}
                </h2>
                <ApplyButton></ApplyButton>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
