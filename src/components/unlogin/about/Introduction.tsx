import { Image } from '@nextui-org/react';
import { withCdnPrefix } from '@/utils/file';

export default function Introduction() {
  return (
    <section className="pt-24 pb-48 bg-white">
      <div className="wrapper ">
        <div className="title mb-16 ">关于e校优才</div>
        <Image
          src={withCdnPrefix('/custom/ciickd/logo/temp-logo.png')}
          alt=""
          width={311}
          classNames={{ wrapper: 'mx-auto my-8 max-sm:hidden' }}
        />
        <Image
          src={withCdnPrefix('/custom/ciickd/logo/temp-logo.png')}
          alt=""
          width={311 / 2}
          classNames={{ wrapper: 'mx-auto my-8 sm:hidden' }}
        />

        <div className="flex items-center gap-48 justify-between mb-20 mt-36 text-2xl max-sm:flex-col max-sm:text-base max-sm:gap-10 max-sm:mb-10 max-sm:mt-10">
          <div>
            e校优才，一款专为学校打造的就业管理工具，它提供全面管理功能。从学生入学起便建立详细档案，记录学习历程、实践活动、专业技能等多方面信息。同时管理就业动态，为教学调整与就业指导提供有力依据。通过助力校企合作，轻松发布职位，推送优质岗位，搭建高效桥梁。
          </div>
          <div>
            e校优才是学生的职业发展顾问。智能简历优化、模拟面试与职业测评是学生职前准备的坚强后盾。通过人岗匹配算法，e校优才旨在实现靶向培育，为学生制定个性化方案，长期追踪职业发展，优化教学与就业指导策略，帮助每一位平凡学子追梦高质量就业。
          </div>
        </div>

        <div className="text-2xl max-sm:text-base">
          e校优才整合行业信息与就业数据，引领数字化职业发展赋能的趋势，它致力于填补信息差，处处用数据说话。e校优才就像一座坚实的桥梁，连接着学校、学生与企业，为学生的职业发展铺就康庄大道。
        </div>
      </div>
    </section>
  );
}
