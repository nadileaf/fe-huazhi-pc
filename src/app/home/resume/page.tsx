'use client';

import { useAuthStore } from '@/stores/auth';
import { useSystemEmployee } from '@/hooks/useSystemEmployee';
import SystemEmployeeHeader from '@/components/system-employee/Header';
import ResumeCards from '@/components/system-employee/ResumeCards';
import SystemEmployeeSection from '@/components/system-employee/Section';
import BasicInfo from '@/components/system-employee/BasicInfo';
import TimeLine from '@/components/system-employee/TimeLine';
import Works from '@/components/system-employee/Works';
import Certificates from '@/components/system-employee/Certificates';
import Educations from '@/components/system-employee/Educations';
import FileList from '@/components/basic/FileList';
import Loading from '@/components/basic/Loading';
import HomeBreadcrumbs from '@/components/home/Breadcrumbs';

export default function Resume() {
  const { systemEmployee: data, loading } = useAuthStore();

  const { standardFields, educationInfo, works, evaluationReports, trainings } =
    useSystemEmployee(data);

  return (
    <Loading loading={loading}>
      {data && (
        <section className="">
          <div className="bg-white pt-14">
            <HomeBreadcrumbs
              className="wrapper"
              position={{ title: '人才看板', href: '/resume' }}
            ></HomeBreadcrumbs>
          </div>

          <SystemEmployeeHeader />

          <section id="resume">
            <ResumeCards data={data} educationInfo={educationInfo || []} />
            <div className="bg-background-2">
              <SystemEmployeeSection classNames={{ base: 'wrapper py-20' }}>
                <BasicInfo data={data} />
              </SystemEmployeeSection>
            </div>
            <div className="bg-background-2 relative pt-24">
              <div className="absolute left-0 top-0 shadow-bg-2"></div>
              <SystemEmployeeSection
                title="认证教育信息"
                classNames={{ base: 'wrapper', content: 'pb-20 px-5' }}
              >
                <Educations educationInfo={educationInfo} />
              </SystemEmployeeSection>
            </div>
            <div className="bg-white">
              <SystemEmployeeSection
                title="所获证书"
                id="certificates"
                classNames={{ base: 'wrapper py-20' }}
              >
                <Certificates certificates={standardFields?.certificates} />
              </SystemEmployeeSection>
            </div>
            <div className="bg-background-2 relative pt-24">
              <div className="absolute left-0 top-0 shadow-bg-2"></div>
              <SystemEmployeeSection
                title="在校所学课程"
                id="courses"
                classNames={{ base: 'wrapper', content: 'mb-20 px-5' }}
              >
                <TimeLine events={trainings} />
              </SystemEmployeeSection>
              <SystemEmployeeSection
                title="工作实训经历"
                id="works"
                classNames={{ base: 'wrapper', content: 'pb-20' }}
              >
                <Works works={works} />
              </SystemEmployeeSection>
            </div>
            {evaluationReports && (
              <div className="bg-white">
                <SystemEmployeeSection title="评测报告" classNames={{ base: 'wrapper py-20' }}>
                  <FileList data={evaluationReports} mode="card" />
                </SystemEmployeeSection>
              </div>
            )}
          </section>
        </section>
      )}
    </Loading>
  );
}
