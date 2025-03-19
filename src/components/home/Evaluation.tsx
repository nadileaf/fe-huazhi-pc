'use client';
import { PinPinCloudEvaluationCard } from '@/components/entity/PinPinCloudEvaluation';
import { Button, Tab, Tabs } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import Loading from '../basic/Loading';
import useEvaluationData from '@/hooks/useEvaluation';

const cardBackgroundList = ['bg-active', 'bg-[#F2F6FF]', 'bg-[#FFF4F2]', 'bg-[#F0FCFF]'];

export default function Evaluation() {
  const router = useRouter();

  const { data, loading, actionLoading, isDisabled, getButtonText, handleStart } =
    useEvaluationData();

  function handleClickMore() {
    router.push('/home/evaluation');
  }

  return (
    <section className="bg-white ">
      <div className="wrapper">
        <div className="flex items-center justify-between pt-20 pb-12">
          <div className="title">职业测评</div>
          <div className="hover:text-primary cursor-pointer" onClick={handleClickMore}>
            进入测评中心
          </div>
        </div>

        <Loading loading={loading}>
          <div className="grid grid-cols-2 gap-8">
            {data?.data.slice(0, 4).map((item, i) => (
              <PinPinCloudEvaluationCard
                key={item.meta.openId}
                data={item}
                className={'cursor-default ' + cardBackgroundList[i]}
              >
                <div className="mt-6 flex justify-end ">
                  <Button
                    color="primary"
                    size="lg"
                    isLoading={item.meta.openId === actionLoading}
                    onClick={() => handleStart(item.meta.openId)}
                    disabled={isDisabled(item.meta.openId)}
                  >
                    {getButtonText(item.meta.openId)}
                  </Button>
                </div>
              </PinPinCloudEvaluationCard>
            ))}
          </div>
        </Loading>
      </div>
    </section>
  );
}
