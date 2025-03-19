'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Image } from '@nextui-org/react';
import { withCdnPrefix } from '@/utils/file';

const data = [
  {
    image: (
      <Image
        src={withCdnPrefix(`/custom/ciickd/website/about/5e/excellence.png`)}
        width={232}
        alt=""
      ></Image>
    ),
    title: 'E卓越',
    desc: '体现其智能平台和工具帮助学生能力和自信的提升',
  },
  {
    image: (
      <Image
        src={withCdnPrefix(`/custom/ciickd/website/about/5e/evolution.png`)}
        width={175}
        alt=""
      ></Image>
    ),
    title: 'E进化',
    desc: '展示其不断发展的创新解决方案和学生的进化能力',
  },
  {
    img: 'empower',
    image: (
      <Image
        src={withCdnPrefix(`/custom/ciickd/website/about/5e/empower.png`)}
        width={200}
        alt=""
      ></Image>
    ),
    title: 'E赋能',
    desc: '表明其致力于指导和培养优才的决心',
  },
  {
    img: 'employment',
    image: (
      <Image
        src={withCdnPrefix(`/custom/ciickd/website/about/5e/employment.png`)}
        width={254}
        alt=""
      ></Image>
    ),
    title: 'E就业',
    desc: '强调其在帮助学生就业方面的功能',
  },
  {
    img: 'education',
    image: (
      <Image
        src={withCdnPrefix(`/custom/ciickd/website/about/5e/education.png`)}
        width={184}
        alt=""
      ></Image>
    ),
    title: 'E教育',
    desc: '突显其在培养和指导学生就业的平台属性',
  },
];

export default function FiveE() {
  const settings = {
    dots: true,
    dotsClass: 'slick-dots  !bottom-[-40px]',
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0px',
    // slidesToShow: 3,
    speed: 500,
  };

  return (
    <section className="pt-24 pb-48 relative">
      <div className="absolute left-0 top-0 shadow-bg"></div>
      <div className="wrapper ">
        <div className="title mb-16 ">e校优才的五大E</div>

        <div className="flex items-center justify-between">
          <div className="w-[336px]">
            <Slider {...settings}>
              {data.map((item) => (
                <EItem
                  key={item.title}
                  img={item.image}
                  title={item.title}
                  desc={item.desc}
                ></EItem>
              ))}
            </Slider>
          </div>

          <Image src={withCdnPrefix('/custom/ciickd/website/about/5e.png')} width={660}></Image>
        </div>
      </div>
    </section>
  );
}

const EItem = ({
  img,
  title,
  desc,
  className,
}: {
  img: JSX.Element;
  title: string;
  desc: string;
  className?: string;
}) => {
  return (
    <div className={`px-2 ${className}`}>
      <div className="mb-20 h-[210px] flex justify-center items-center">{img}</div>
      <div>
        <div className="text-3xl font-bold mb-6">{title}</div>
        <div className="text-xl">{desc}</div>
      </div>
    </div>
  );
};
