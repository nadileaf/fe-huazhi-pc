import { useState, useEffect, useMemo } from 'react';
import { useRequest } from '@/hooks/useHooks';
import { type EntityQueryParams, entityService } from '@/services/entity';
import { taskService } from '@/services/task';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'react-toastify';
import { groupBy } from 'lodash-es';

export default function useEvaluationData() {
  const { user, systemEmployee } = useAuthStore();

  const params = useMemo<EntityQueryParams<'PinPinCloudEvaluation'>>(
    () => ({
      entityType: 'PinPinCloudEvaluation',
      query: '',
      filters: [],
      current: 1,
      pageSize: 100,
    }),
    [],
  );

  const { data, loading } = useRequest(() => entityService.query(params), {
    refreshDeps: [params, user],
    before: () => !!user,
  });

  const groupData = useMemo(
    () => groupBy(data?.data, 'data.standardFields.classification'),
    [data],
  );

  const groupTabs = useMemo(() => Object.keys(groupData), [groupData]);

  const [currentTab, setCurrentTab] = useState(groupTabs[0]);

  useEffect(() => {
    if (!groupTabs.includes(currentTab)) {
      setCurrentTab(groupTabs[0]);
    }
  }, [currentTab, groupTabs]);

  return {
    data,
    loading,
    groupData,
    groupTabs,
    currentTab,
    setCurrentTab,
    ...useStartEvaluation(),
  };
}

export function useStartEvaluation() {
  const { user, systemEmployee } = useAuthStore();
  const [startedIds, setStartedIds] = useState<string[]>([]);
  const [actionLoading, setActionLoading] = useState<string>();

  const isStarted = (openId: string) => startedIds.includes(openId);
  const isDisabled = (openId: string) => isStarted(openId) || openId === actionLoading;
  const getButtonText = (openId: string) => (isStarted(openId) ? '已开始' : '开始测评');

  useEffect(() => {
    const ids =
      systemEmployee?.data.managedFields?.entityRelated?.hydrogenTasks
        ?.map((v) => v.projectPayload.openId)
        .filter((v) => Boolean(v)) || [];
    setStartedIds(ids as string[]);
  }, [systemEmployee]);

  async function handleStart(openId: string) {
    try {
      setActionLoading(openId);
      await taskService.create({
        projectId: `evaluation-${openId}`,
        taskPayloadOpenId: user?.userId!,
      });
      setStartedIds([...startedIds, openId]);
      toast.success('创建成功，请留意短信通知，及时完成测评。');
    } finally {
      setActionLoading(undefined);
    }
  }
  return {
    isStarted,
    isDisabled,
    getButtonText,
    actionLoading,
    handleStart,
  };
}
