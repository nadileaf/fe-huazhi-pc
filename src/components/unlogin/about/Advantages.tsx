import FeatureItem from '../FeatureItem';
import { Image } from '@nextui-org/react';
import { withCdnPrefix } from '@/utils/file';

export default function Advantages() {
  return (
    <section className="pt-24 pb-48 relative bg-white">
      <div className="wrapper ">
        <div className="title mb-8 ">e校优才的核心优势</div>
        <div className="md:w-[598px] text-2xl">
          以AI驱动的智能工具和个性化服务，致力于提供最专业的
          就业解决方案，成为您职业发展道路上的可靠伙伴。
        </div>
        <div className="flex flex-wrap sm:gap-10 max-sm:justify-between items-start mt-24 max-sm:mt-4 w-full max-sm:mx-auto max-sm:w-[92%]">
          <FeatureItem
            image={
              <Image
                src={withCdnPrefix(`/custom/ciickd/website/about/ai.svg`)}
                width={65}
                height={65}
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
          <FeatureItem
            image={
              <Image
                src={withCdnPrefix(`/custom/ciickd/website/about/match.svg`)}
                width={65}
                height={65}
              ></Image>
            }
            title="精准匹配"
            description="基于大数据分析，为用户精准推荐最符合需求的岗位。"
          />
          <FeatureItem
            image={
              <Image
                src={withCdnPrefix(`/custom/ciickd/website/about/guide.svg`)}
                width={61}
                height={62}
              ></Image>
            }
            title="个性化指导"
            description="提供专业的职业发展建议，帮助学生规划和实现职业目标。"
          />
          <FeatureItem
            image={
              <Image
                src={withCdnPrefix(`/custom/ciickd/website/about/safety.svg`)}
                width={45}
                height={60}
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
