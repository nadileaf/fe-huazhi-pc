import * as React from 'react';
import { Image } from '@nextui-org/react';
import { withCdnPrefix } from '@/utils/file';

export default function CompanyAndUniversity() {
  const images = [
    { key: 'bytedance', width: 205, height: 55 },
    { key: 'zhongshan', width: 215, height: 61 },
    { key: 'jinan', width: 182, height: 73 },
    { key: 'shanghai', width: 177, height: 75 },
    { key: 'nio', width: 147, height: 58 },
  ];

  return (
    <section className="bg-white flex flex-col items-center pt-52 pb-64 max-sm:pt-28 max-sm:pb-32 w-full max-md:mt-10 max-md:max-w-full">
      <div className="wrapper flex flex-col w-full max-w-screen-xl ">
        <div className="max-w-full w-[780px] mx-auto">
          <h3 className="text-6xl sm:text-center mb-8 max-md:max-w-full max-sm:text-4xl">
            深受领先企业
            <br className="sm:hidden" />
            和全国高校信赖
          </h3>
          <div className="text-2xl max-sm:text-sm leading-9 sm:text-center font-[305]  max-sm:max-w-full">
            e校优才以智能平台为桥梁，精准连接学生、学校与企业，提供全方位的
            <br />
            就业解决方案，助力每位学子迈向职业成功。
          </div>
        </div>
        {/* <div className="flex justify-between items-center mt-24 w-full max-md:mt-10 max-md:max-w-full max-sm:overflow-x-auto">
          <div className="w-full flex flex-nowrap max-sm:gap-3 sm:justify-between">
            {images.map((item) => (
              <Image
                key={item.key}
                src={withCdnPrefix(`/custom/ciickd/website/company-university/${item.key}.png`)}
                alt=""
                width={item.width}
                height={item.height}
              ></Image>
            ))}
          </div>
        </div> */}
      </div>
      <div className="wrapper flex flex-col mt-56 w-full max-w-screen-xl max-sm:mt-20">
        <div className="max-w-full w-[780px] mx-auto">
          <h3 className="text-6xl sm:text-center mb-8 max-md:max-w-full max-sm:text-4xl">
            连接优才 成就卓越
          </h3>
          <div className="text-2xl max-sm:text-sm leading-9 sm:text-center font-[305] max-sm:max-w-full">
            我们以AI驱动的智能工具和个性化服务，致力于提供最专业的
            <br className="max-sm:hidden" />
            就业解决方案，成为您职业发展道路上的可靠伙伴。
          </div>
        </div>

        <div className="flex flex-wrap sm:gap-10 max-sm:justify-between items-start mt-24 max-sm:mt-4 w-full max-sm:mx-auto max-sm:w-[92%]">
          <FeatureCard
            image={
              <Image
                src={withCdnPrefix(`/custom/ciickd/website/connect-youcai/ai.svg`)}
                width={65}
                height={65}
                radius="none"
              ></Image>
            }
            title="AI智能辅助"
            description={
              <>
                利用先进的AI技术，快速优化
                <br className="max-sm:hidden" />
                简历，提高求职成功率。
              </>
            }
          />
          <FeatureCard
            image={
              <Image
                src={withCdnPrefix(`/custom/ciickd/website/connect-youcai/match.svg`)}
                width={65}
                height={65}
                radius="none"
              ></Image>
            }
            title="靶向匹配"
            description="基于大数据分析，根据学生情况匹配符合需求的岗位。"
          />
          <FeatureCard
            image={
              <Image
                src={withCdnPrefix(`/custom/ciickd/website/connect-youcai/guide.svg`)}
                width={61}
                height={62}
                radius="none"
              ></Image>
            }
            title="个性化指导"
            description="基于个人看板的发展建议，帮助学生规划和实现职业目标。"
          />
          <FeatureCard
            image={
              <Image
                src={withCdnPrefix(`/custom/ciickd/website/connect-youcai/safety.svg`)}
                width={45}
                height={60}
                radius="none"
              ></Image>
            }
            title="安全保障"
            description={
              <>
                严格保护用户数据隐私，
                <br />
                确保信息安全无忧。
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({
  image,
  title,
  description,
}: {
  image: JSX.Element;
  title: string;
  description: string | JSX.Element;
}) => (
  <div className="flex sm:flex-1 flex-col max-sm:w-[47%] max-sm:mt-10">
    {image}
    <div className="flex flex-col mt-10 max-sm:mt-5 w-full">
      <div className="text-3xl max-sm:text-xl font-[450]">{title}</div>
      <div className="mt-6 max-sm:mt-3 text-lg max-sm:text-sm font-[305]">{description}</div>
    </div>
  </div>
);
