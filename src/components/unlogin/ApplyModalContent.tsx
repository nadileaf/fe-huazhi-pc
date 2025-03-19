'use client';
import { Input, Button, type InputProps } from '@nextui-org/react';
import { useMessageBoxContext } from '@/providers/MessageBoxProvider';
import {
  type SubmitHandler,
  type ControllerRenderProps,
  useForm,
  Controller,
} from 'react-hook-form';
import { useCallback, useState } from 'react';
import { agentService } from '@/services/agent';
import dayjs from 'dayjs';
import Loading from '../basic/Loading';
import { Icon } from '@iconify/react';

type FormInput = {
  organizationName: string;
  name: string;
  phone: string;
  job: string;
};

const formFieldMap: Record<keyof FormInput, string> = {
  organizationName: '机构名称',
  name: '姓名',
  phone: '手机号',
  job: '职位',
};

const defaultValues: FormInput = {
  organizationName: '',
  name: '',
  phone: '',
  job: '',
};

export default function useApplyModal() {
  const { openModal, ...others } = useMessageBoxContext();

  function openApplyModal() {
    openModal({
      body: () => <ApplyForm />,
      classNames: {
        base: 'modal-bg',
      },
      size: '5xl',
    });
  }
  return {
    openApplyModal,
    ...others,
  };
}

function ApplyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onTouched',
  });

  const getFieldInput = useCallback(
    (field: ControllerRenderProps<FormInput>) =>
      ({
        variant: 'bordered',
        size: 'lg',
        labelPlacement: 'outside-left',
        placeholder: '请填写',
        label: formFieldMap[field.name],
        ...field,
      }) as const,
    [],
  );

  const getFieldValidateInfo = useCallback(
    (field: keyof FormInput): Pick<InputProps, 'isInvalid' | 'errorMessage'> => {
      const isInvalid = !!errors[field];
      const errorMessage = isInvalid ? errors[field]?.message : '';
      return { isInvalid, errorMessage };
    },
    [errors],
  );

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true);

    const html = `有新的客户在官网留言，信息如下：<br/>${Object.keys(formFieldMap)
      .map((key) => `${formFieldMap[key as keyof FormInput]}：${data[key as keyof FormInput]}`)
      .join('<br/>')}<br/>留言日期： ${dayjs().format('YYYY-MM-DD')}`;

    try {
      await agentService.sendEmail({
        subject: '有新的客户在官网留言',
        html,
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Loading loading={loading}>
      {submitted ? (
        <div className="py-28 max-sm:pb-32 mx-auto flex flex-col items-center justify-center">
          <Icon icon="bi:check-circle-fill" className={`text-primary text-8xl`} />
          <strong className="text-4xl text-center mt-12 mb-6 max-sm:mt-10 max-sm:mb-5 max-sm:text-4xl">
            预约成功
          </strong>
          <span className="text-xl text-black-333 max-sm:text-lg max-sm:text-center">
            已成功预约，我们会尽快与您联系，请保持手机畅通
          </span>
        </div>
      ) : (
        <div className="pt-20 pb-12 mx-32 max-sm:pt-10 max-sm:pb-5 max-sm:mx-0">
          <div className="text-5xl max-sm:text-2xl font-semibold">预约咨询</div>
          <div className="text-2xl max-sm:text-lg text-black-333 mt-7 mb-12 max-sm:mt-5 max-sm:mb-6 ">
            留下您的联系方式，我们的服务人员会第一时间联系您开通体验账号
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between max-sm:flex-col max-sm:gap-8">
              <div className="flex flex-col gap-8">
                <div className="flex-1">
                  <Controller
                    name="organizationName"
                    rules={{ required: '请填写机构名称' }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...getFieldInput(field)}
                        {...getFieldValidateInfo(field.name)}
                        classNames={{
                          label: 'w-[96px] text-lg max-sm:text-base',
                          inputWrapper: 'w-[240px]',
                        }}
                      />
                    )}
                  />
                </div>

                <div className="flex-1">
                  <Controller
                    name="phone"
                    rules={{
                      required: '请填写手机号',
                      validate: (value) => {
                        return /^1[3-9]\d{9}$/.test(value) || '请输入正确的手机号格式';
                      },
                    }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...getFieldInput(field)}
                        {...getFieldValidateInfo(field.name)}
                        type="number"
                        classNames={{
                          label: 'w-[96px] text-lg max-sm:text-base',
                          inputWrapper: 'w-[240px]',
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex-1">
                  <Controller
                    name="name"
                    rules={{ required: '请填写姓名' }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...getFieldInput(field)}
                        {...getFieldValidateInfo(field.name)}
                        classNames={{
                          label: 'text-lg max-sm:text-base max-sm:w-[96px]',
                          inputWrapper: 'w-[240px]',
                        }}
                      />
                    )}
                  />
                </div>
                <div className="flex-1">
                  <Controller
                    name="job"
                    rules={{ required: '请填写职位' }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...getFieldInput(field)}
                        {...getFieldValidateInfo(field.name)}
                        classNames={{
                          label: 'text-lg max-sm:text-base max-sm:w-[96px]',
                          inputWrapper: 'w-[240px]',
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="w-full mt-16 flex justify-center items-center">
              <Button
                type="submit"
                size="lg"
                className="w-[320px] primary-gradient-button"
                radius="full"
              >
                提交
              </Button>
            </div>
          </form>
        </div>
      )}
    </Loading>
  );
}
