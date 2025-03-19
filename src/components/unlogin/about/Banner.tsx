'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { withCdnPrefix } from '@/utils/file';
import { Image } from '@nextui-org/react';
import ApplyButton from '@/components/unlogin/ApplyButton';
import { useMobile } from '@/hooks/useHooks';
import { useMemo } from 'react';

const data = [
  {
    img: 'header-purple',
    description: (
      <>e校优才就像一座坚实的桥梁，连接着学校、学生与企业，为学生的职业发展铺就康庄大道。</>
    ),
  },
  {
    img: 'header-orange',
    description: <>智能简历优化、模拟面试与职业测评一体化辅助求职。</>,
  },
  {
    img: 'header-green',
    description: <>人岗匹配推动定制化培育，学生职业发展长期追踪。</>,
  },
];

export default function Banner() {
  const { isMobile } = useMobile();

  const settings = useMemo(
    () => ({
      dots: isMobile,
      dotsClass: 'slick-dots slick-dots-white white !bottom-4',
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 6000,
      pauseOnHover: false,
      arrows: false,
    }),
    [isMobile],
  );

  return (
    <section className=" w-full ">
      <Slider {...settings}>
        {data?.map((item) => (
          <div key={item.img} className="relative w-full h-[621px]">
            <img
              src={withCdnPrefix(`/custom/ciickd/website/banner/${item.img}-pc.png`)}
              alt={``}
              className="w-full h-full object-cover max-sm:!hidden"
            />
            <img
              src={withCdnPrefix(`/custom/ciickd/website/banner/${item.img}-mo.png`)}
              alt={``}
              className="w-full h-full object-cover sm:!hidden"
            />
            <div className="wrapper absolute inset-0 flex justify-between items-center max-sm:items-start">
              <div className="mt-0 max-sm:mt-[8vh]">
                <Image
                  src={withCdnPrefix('/custom/ciickd/website/about/exyc.png')}
                  width={357}
                  height={65}
                ></Image>
                <div className="w-[45vw] text-white text-2xl max-sm:text-lg mt-11 max-sm:mb-8">
                  {item.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
