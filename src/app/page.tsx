import CompanyAndUniversity from '../components/unlogin/home/CompanyAndUniversity';
import Management from '../components/unlogin/home/Management';
import Toolbox from '../components/unlogin/home/Toolbox';
import Evaluation from '../components/unlogin/home/Evaluation';
import Solution from '../components/unlogin/home/Solution';
import Features from '../components/unlogin/home/Features';
import FooterBanner from '../components/unlogin/home/FooterBanner';
import { features } from '@/config/features';
import Banner from '@/components/Banner';
import HomeSearch from '@/components/HomeSearch';
import HomeHotJobs from '@/components/HomeJobs';
import HomeHotCompanies from '@/components/HomeCompanies';
import { useAuthStore } from '@/stores/auth';

export default function Page() {
  return (
    <div className="w-full">
      <Banner></Banner>
      <div className="wrapper pt-20">
        <HomeSearch></HomeSearch>
        <HomeHotJobs></HomeHotJobs>
        <HomeHotCompanies></HomeHotCompanies>
      </div>
    </div>
  );
}
