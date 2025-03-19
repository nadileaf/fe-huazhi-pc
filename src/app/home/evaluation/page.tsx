'use client';
import { PinPinCloudEvaluationCard } from '@/components/entity/PinPinCloudEvaluation';
import { Button, Tab, Tabs } from '@nextui-org/react';
import useEvaluationData from '@/hooks/useEvaluation';
import Loading from '@/components/basic/Loading';

export default function Evaluation() {
  const {
    loading,
    groupData,
    groupTabs,
    currentTab,
    setCurrentTab,
    actionLoading,
    isStarted,
    isDisabled,
    getButtonText,
    handleStart,
  } = useEvaluationData();

  return (
    <div className="wrapper py-8">
      <Tabs
        color="primary"
        variant="light"
        size="lg"
        radius="full"
        selectedKey={currentTab}
        onSelectionChange={(v) => setCurrentTab(v.toString())}
        className="mb-8"
        classNames={{
          tabList: 'gap-10',
          tab: 'h-12 w-[180px] py-2 px-8 border-1 border-[#CCCCCC] bg-white',
        }}
      >
        {groupTabs.map((tab) => (
          <Tab key={tab} value={tab} title={tab}></Tab>
        ))}
      </Tabs>

      <Loading loading={loading}>
        <div className="grid grid-cols-2 gap-10">
          {groupData[currentTab]?.map((item) => (
            <PinPinCloudEvaluationCard key={item.meta.openId} data={item}>
              <div className="mt-6 flex justify-end ">
                <Button
                  color="primary"
                  className="w-40 primary-gradient-button"
                  radius="full"
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
  );
}
