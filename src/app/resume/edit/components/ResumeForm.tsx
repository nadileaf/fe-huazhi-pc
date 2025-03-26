'use client';

import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { cloneDeep } from 'lodash-es';
import { entityService } from '@/services/entity';
import { toast } from 'react-toastify';
import Loading from '@/components/basic/Loading';
import { BasicInfo } from './sections/BasicInfo';
import { AcademicInfo } from './sections/AcademicInfo';
import { Works } from './sections/Works';
import { Trainings } from './sections/Trainings';
import { Certificates } from './sections/Certificates';
import { Educations } from './sections/Educations';
import { JobExpectation } from './sections/JobExpectation';
import { Projects } from './sections/Projects';

interface FormInput {
  standardFields: ResumeModel.StandardFields;
}

export default function ResumeForm() {
  const [resume, setResume] = useAuthStore((state) => [state.resume, state.setResume]);
  const standardFields = resume?.data.standardFields;

  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (standardFields) {
      setLoadingData(false);
    }
  }, [standardFields]);

  const { control, handleSubmit, reset } = useForm<FormInput>();

  const router = useRouter();

  useEffect(() => {
    if (standardFields) {
      reset({
        standardFields: cloneDeep(standardFields),
      });
    }
  }, [standardFields, reset]);

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true);
    console.log('data', data);
    try {
      await entityService.patchEntity('Resume', {
        openId: resume?.meta.openId,
        data: {
          standardFields: data.standardFields,
        },
      });
      setResume();
      toast.success('保存成功');
    } catch (error) {
      console.error('保存失败:', error);
      toast.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Loading loading={loadingData}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sticky top-[var(--navbar-height)] z-40 bg-white shadow-sm">
          <div className="py-4">
            <div className="wrapper flex items-center justify-between">
              <h1 className="title text-[40px]">编辑简历</h1>
              <Button type="submit" color="primary" isLoading={loading}>
                保存
              </Button>
            </div>
          </div>
        </div>

        <div className="wrapper">
          <div className="py-14">
            <div className="mb-14 flex justify-between gap-24">
              <BasicInfo control={control} className="flex-1" />
              <JobExpectation control={control} className="flex-1" />
            </div>
            <div className="space-y-12">
              <Educations control={control} />
              <Works control={control} />
              <Projects control={control} />
              <Certificates control={control} />
            </div>
          </div>
        </div>
      </form>
    </Loading>
  );
}
