// import { Banner, HomeJobOpportunities, HomeJobs, SearchInput, TagNav } from '@/components/home';
import Banner from '@/components/home/Banner';
import SystemEmployeeHeader from '@/components/system-employee/Header';
import AIToolbox from '@/components/home/AIToolbox';
import SchoolJobs from '@/components/home/SchoolJobs';
import HotJobs from '@/components/home/HotJobs';
import Evaluation from '@/components/home/Evaluation';

// const Tags = {
//   热门职位: ['新人友好', '名企巡礼', '好福利', '新兴科技', '一线城市'],
//   培训课程: ['职业培训', '领导力', '大学生专区'],
//   测评中心: ['特定岗位', '任职风险', '职业性格', '其他'],
//   特色服务: ['背景调查', '人才政策'],
// };

export default async function Home() {
  return (
    <>
      <Banner />
      <SystemEmployeeHeader />
      <AIToolbox />
      <SchoolJobs />
      <HotJobs />
      <Evaluation />
    </>
  );
}
