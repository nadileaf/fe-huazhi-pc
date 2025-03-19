import ApplyButton from '@/components/unlogin/ApplyButton';
import { withCdnPrefix } from '@/utils/file';
import { Image } from '@nextui-org/react';

const data = [
  {
    icon: (
      <Image
        src={withCdnPrefix(`/custom/ciickd/website/toolbox/icon-1.svg`)}
        width={51}
        height={49}
      ></Image>
    ),
    title: '职图启航者-轻松打造优秀简历',
    description: '上传简历并描述所要面试的岗位，一键调整结构与丰富内容',
  },
  {
    icon: (
      <Image
        src={withCdnPrefix(`/custom/ciickd/website/toolbox/icon-2.svg`)}
        width={58}
        height={51}
      ></Image>
    ),
    title: '职面未来-模拟面试官',
    description: '根据简历以及面试岗位反复问答演练，熟悉常规题库与掌握面试技巧',
  },
  {
    icon: (
      <Image
        src={withCdnPrefix(`/custom/ciickd/website/toolbox/icon-3.svg`)}
        width={56}
        height={59}
      ></Image>
    ),
    title: '知识发现者-个性化学习资源搜索引擎',
    description: '专为学生设计的专业知识宝库，便捷式学习资料查找',
  },
  {
    icon: (
      <Image
        src={withCdnPrefix(`/custom/ciickd/website/toolbox/icon-4.svg`)}
        width={49}
        height={46}
      ></Image>
    ),
    title: '校园指南通-定制化校园信息查询百科',
    description: '全天候解答在校规范以及常见问题FAQ',
  },
  {
    icon: (
      <Image
        src={withCdnPrefix(`/custom/ciickd/website/toolbox/icon-5.svg`)}
        width={56}
        height={57}
      ></Image>
    ),
    title: '课程智绘师-您的教育规划专家',
    description: '专为教师设计，通过智能分析提出建议，帮助打造课程计划',
  },
  {
    icon: (
      <Image
        src={withCdnPrefix(`/custom/ciickd/website/toolbox/icon-6.svg`)}
        width={47}
        height={50}
      ></Image>
    ),
    title: '考卷智造师-你的智能教学助手',
    description: '专为教师设计，基于任何文本，快速生成符合特定年级课程水平的试卷',
  },
];

export default function Toolbox() {
  return (
    <section className="relative">
      <div className="wrapper pt-24 max-sm:pt-0 flex justify-between max-sm:flex-col">
        <div className="flex flex-col lg:w-[316px] max-sm:mb-16">
          <h3 className="text-black-333 text-5xl max-sm:text-3xl leading-[1.2] max-sm:text-center">
            智能工具箱
          </h3>
          <div className="py-10 text-black-333 text-2xl max-sm:text-base max-sm:text-center">
            丰富的AI工具选择，可辅助教师出题与谱写教案，也可帮助学生学习与面试求职，轻松迈向职业新高峰
          </div>
          <ApplyButton
            className="w-[178px] primary-gradient-button max-sm:hidden"
            radius="full"
            custom
          >
            申请试用
          </ApplyButton>
        </div>

        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 lg:w-[800px]">
          {data.map((item) => (
            <div
              key={item.title}
              className="relative bg-white rounded-xl shadow-lg mb-32 max-sm:mb-16"
            >
              <div className="absolute left-6 top-[-50px] w-[100px] h-[100px] max-sm:w-[80px] max-sm:h-[80px] max-sm:left-5 max-sm:top-[-35px] rounded-xl bg-white flex items-center justify-center shadow-lg">
                {item.icon}
              </div>
              <div className="px-6 pb-[66px] pt-[78px] max-sm:px-5 max-sm:pb-10 max-sm:pt-16">
                <div className="pb-2 font-[450] text-2xl max-sm:text-lg text-black">
                  {item.title}
                </div>
                <div className="text-black-666 max-sm:text-xs ">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
        <ApplyButton className="w-[90vw] primary-gradient-button sm:hidden" radius="full" custom>
          申请试用
        </ApplyButton>
      </div>
    </section>
  );
}
