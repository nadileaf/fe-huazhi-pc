'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { type Settings } from 'react-slick';
import { Image } from '@nextui-org/react';
import { withCdnPrefix } from '@/utils/file';
import { useMemo, useRef, useState } from 'react';
import NextImage from 'next/image';
import ApplyButton from '@/components/unlogin/ApplyButton';
import { useMobile } from '@/hooks/useHooks';

const data = [
  {
    title: '就业信息建设',
    key: 'info',
  },
  {
    title: '学生看板管理',
    key: 'document',
  },
  {
    title: '校企职位管理',
    key: 'job',
  },
  {
    title: '岗位咨询可查',
    key: 'search',
  },
];

export default function Management() {
  const { isMobile } = useMobile();
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  let sliderRef = useRef<Slider | null>(null);

  const settings: Settings = useMemo(() => {
    return {
      dots: isMobile,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      vertical: !isMobile,
      verticalSwiping: !isMobile,
      afterChange: () => setUpdateCount(updateCount + 1),
      beforeChange: (current, next) => setSlideIndex(next),
    };
  }, [isMobile]);

  const [activeIndex, setActiveIndex] = useState(0);

  function handleClick(index: number) {
    setActiveIndex(index);
    (sliderRef as any).slickGoTo(index);
  }

  return (
    <section className="relative">
      <div className="absolute left-0 top-0 shadow-bg"></div>
      <div className="wrapper max-sm:px-0 pt-48 pb-24 max-sm:pt-28 max-sm:pb-32 flex justify-between items-center max-sm:flex-col">
        <div className="flex flex-col gap-16 max-sm:gap-8">
          <h3 className="text-black-333 text-5xl max-sm:text-3xl leading-[1.2] max-sm:text-center">
            赋能就业管理
          </h3>
          <div className="flex flex-col gap-20 max-sm:gap-2 max-sm:justify-between max-sm:flex-row max-sm:flex-wrap ">
            {data.map((item, index) => (
              <div
                key={item.title}
                className={`max-sm:w-[46%] pl-5 pr-8 max-sm:pl-2 max-sm:pr-0 flex items-center gap-7 max-sm:gap-3 h-16 max-sm:h-12 cursor-pointer hover:bg-white hover:rounded-3xl hover:shadow-[0px_7px_11px_0px_#7E7E7E33] ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleClick(index)}
              >
                <Image
                  as={NextImage}
                  priority={true}
                  src={withCdnPrefix(
                    `/custom/ciickd/website/management/icon/${item.key}${activeIndex === index ? '-active' : ''}.svg`,
                  )}
                  width={49}
                  height={49}
                />
                <div
                  className={`${activeIndex === index ? 'text-primary' : 'text-black-333'} text-2xl max-sm:text-sm font-[450]`}
                >
                  {item.title}
                </div>
              </div>
            ))}
          </div>
          <ApplyButton
            className="max-sm:hidden w-[178px] primary-gradient-button "
            radius="full"
            custom
          >
            申请试用
          </ApplyButton>
        </div>
        <div className="w-[838px] h-[540px] max-sm:mt-8 max-sm:w-full max-sm:h-auto">
          <Slider
            ref={(slider) => {
              sliderRef = slider as any;
            }}
            {...settings}
          >
            {data.map((item) => (
              <Image
                key={item.key}
                src={withCdnPrefix(`/custom/ciickd/website/management/${item.key}.png`)}
                width={838}
                height={540}
                alt=""
              ></Image>
            ))}
          </Slider>
        </div>

        <ApplyButton
          className="sm:hidden mt-16 w-[90vw] primary-gradient-button"
          radius="full"
          custom
        >
          申请试用
        </ApplyButton>
      </div>
    </section>
  );
}
