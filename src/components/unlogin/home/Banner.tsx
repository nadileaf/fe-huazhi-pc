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
    type: '校园',
    img: 'header-purple',
    title: (
      <>
        校园就业 <br className="sm:hidden" />
        一键启航
      </>
    ),
    description: <>管理档案，发布职位，校园就业服务全面升级，让就业机会触手可及。</>,
    qrcodeWrapperClass: `bg-[url('https://cdn-fe.mesoor.com/custom/ciickd/website/banner/qrcode-wrapper-purple.png')]`,
    qrcodeIcon: '/custom/ciickd/website/banner/qrcode-icon-purple.svg',
  },
  {
    type: '学生',
    img: 'header-orange',
    title: (
      <>
        求职加速 <br className="sm:hidden" />
        面试无忧
      </>
    ),
    description: <>简历优化，模拟面试，职业测评，每一步精心准备，每一次面试都迎刃而解。</>,
    qrcodeWrapperClass: `bg-[url('https://cdn-fe.mesoor.com/custom/ciickd/website/banner/qrcode-wrapper-orange.png')]`,
    qrcodeIcon: '/custom/ciickd/website/banner/qrcode-icon-orange.svg',
  },
  {
    type: '企业',
    img: 'header-green',
    title: (
      <>
        人才优选 <br className="sm:hidden" />
        岗位速配
      </>
    ),
    description: <>人岗匹配，定制培育，长期追踪，让企业招聘如鱼得水，得心应手。</>,
    qrcodeWrapperClass: `bg-[url('https://cdn-fe.mesoor.com/custom/ciickd/website/banner/qrcode-wrapper-green.png')]`,
    qrcodeIcon: '/custom/ciickd/website/banner/qrcode-icon-green.svg',
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
    <section className="h-[calc(100vh-var(--navbar-height))] w-full ">
      <Slider {...settings}>
        {data?.map((item) => (
          <div key={item.type} className="relative w-full h-screen">
            <img
              src={withCdnPrefix(`/custom/ciickd/website/banner/${item.img}-pc.png`)}
              alt={``}
              className="w-full h-full  max-sm:!hidden"
            />
            <img
              src={withCdnPrefix(`/custom/ciickd/website/banner/${item.img}-mo.png`)}
              alt={``}
              className="w-full h-full object-cover sm:!hidden"
            />
            <div className="wrapper absolute inset-0 flex justify-between items-center max-sm:items-start">
              <div className="mt-0 max-sm:mt-[8vh]">
                <div className="w-20 h-9 flex items-center justify-center bg-transparent border border-white text-white text-lg rounded mb-7 max-sm:mb-4">
                  {item.type}
                </div>
                <h1 className="text-white !leading-[1.2] text-8xl max-sm:text-[50px] font-bold mb-7">
                  {item.title}
                </h1>
                <div className="text-white text-2xl max-sm:text-lg mb-20 max-sm:mb-8">
                  {item.description}
                </div>
                <ApplyButton />
                <div
                  className={`sm:hidden max-sm:mt-8 max-sm:w-[220px] max-sm:h-[220px] max-sm:ml-auto max-sm:right-5 max-sm:bottom-[15vh] pt-7 px-10 max-sm:pt-5 max-sm:px-7 bg-no-repeat bg-cover ${item.qrcodeWrapperClass}`}
                >
                  <div className="flex items-center justify-between mb-6 max-sm:mb-4">
                    <div className="text-white max-sm:text-xs">小程序扫码</div>
                    <Image
                      src={withCdnPrefix(item.qrcodeIcon)}
                      width={39 * 0.7}
                      height={47 * 0.7}
                    ></Image>
                  </div>
                  <Image
                    src={withCdnPrefix('/custom/ciickd/website/banner/qrcode.png')}
                    width={109}
                    height={108}
                    classNames={{
                      wrapper: 'mx-auto max-sm:w-[100px] max-sm:h-[100px]',
                    }}
                  ></Image>
                </div>
              </div>
              <div
                className={`max-sm:hidden mt-[30vh] w-[24vh] h-[24vh] min-w-[260px] min-h-[260px] max-sm:mt-0 max-sm:w-[220px] max-sm:h-[220px] max-sm:absolute max-sm:right-5 max-sm:bottom-[15vh] pt-8 px-12 max-sm:pt-3 max-sm:px-7 bg-no-repeat bg-cover ${item.qrcodeWrapperClass}`}
              >
                <div className="flex items-center justify-between mb-6 max-sm:mb-4">
                  <div className="text-white text-lg max-sm:text-xs">小程序扫码</div>
                  <div className="w-[15%]">
                    <Image src={withCdnPrefix(item.qrcodeIcon)} width={39}></Image>
                  </div>
                </div>
                <div className="w-[70%] mx-auto">
                  <Image
                    src={withCdnPrefix('/custom/ciickd/website/banner/qrcode.png')}
                    width={'100%'}
                    height={'100%'}
                    classNames={{
                      wrapper: 'mx-auto ',
                    }}
                  ></Image>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
