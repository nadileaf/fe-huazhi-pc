import ApplyButton from '@/components/unlogin/ApplyButton';
import EvaluationTabData from '@/components/unlogin/EvaluationTabData';
import { withCdnPrefix } from '@/utils/file';
import { Image } from '@nextui-org/react';

const data = [
  {
    title: '多样化测评系统',
    desc: '涵盖20种专业测评模型，全面评估人才的认知、性格、职业兴趣与职业风格，为企业提供全方位的人才洞察。',
  },
  {
    title: '丰富题库',
    desc: '超过3000道测评题目，涵盖多领域的能力和行为，保证评估的准确性和深度，确保每个人才评估都与个人特质精准匹配。',
  },
  {
    title: '助力学生职业规划',
    desc: '已为超过50,000名学生提供职业测评服务，帮助他们发现个人优势与兴趣，为未来职业选择提供科学依据。',
  },
];

export default function Evaluation() {
  return (
    <section className="">
      <div className="relative mt-32 mb-48 max-sm:mb-24 wrapper h-[686px] max-sm:h-auto px-0 flex justify-between max-sm:flex-col">
        <Image
          src={withCdnPrefix('/custom/ciickd/website/evaluation/bg.png')}
          width={1231}
          height={686}
          classNames={{ wrapper: 'max-sm:hidden absolute inset-0' }}
        ></Image>

        <div className="z-1 flex flex-col w-[316px] max-sm:w-full max-sm:mb-4">
          <h3 className="text-black-333 text-5xl max-sm:text-3xl leading-[1.2] max-sm:text-center">
            测评&培训
          </h3>
          <div className="py-10 text-black-333 text-2xl max-sm:text-base max-sm:text-center">
            丰富的测评背调培训助力您 全景规划成长
          </div>
          <ApplyButton
            className="w-[178px] primary-gradient-button max-sm:hidden"
            radius="full"
            custom
          >
            申请试用
          </ApplyButton>
        </div>

        <div className="z-10 relative max-sm:wrapper">
          <Image
            src={withCdnPrefix('/custom/ciickd/website/evaluation/bg-mo.png')}
            width={715}
            height={534}
            classNames={{
              wrapper: 'sm:hidden absolute z-[-1] top-20 left-[0] right-[0.5rem]',
            }}
          ></Image>
          <EvaluationTabData data={data} />
          <div className="flex gap-4 ">
            <Image
              src={withCdnPrefix(`/custom/ciickd/website/evaluation/card-1.png`)}
              width={221}
              height={186}
            ></Image>
            <Image
              src={withCdnPrefix(`/custom/ciickd/website/evaluation/card-2.png`)}
              width={221}
              height={186}
            ></Image>
            <Image
              src={withCdnPrefix(`/custom/ciickd/website/evaluation/card-3.png`)}
              width={221}
              height={186}
            ></Image>
          </div>
        </div>
        <ApplyButton
          className="mt-16 mx-auto w-[90vw] primary-gradient-button sm:hidden"
          radius="full"
          custom
        >
          申请试用
        </ApplyButton>
      </div>
    </section>
  );
}
