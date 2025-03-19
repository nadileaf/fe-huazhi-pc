import { useRequest } from '@/hooks/useHooks';
import { type GroupData, taskService } from '@/services/task';
import { Icon } from '@iconify/react';
import {
  Button,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

export function FlowSelector({
  value: stageName,
  projectId,
  taskId,
  groups: _groups,
  className,
}: {
  value: string;
  taskId: string;
  projectId?: string;
  groups?: GroupData[] | string[];
  className?: string;
}) {
  const [currentStageName, setCurrentStageName] = useState(stageName);

  const [groups, setGroups] = useState(_groups || []);

  useRequest(() => taskService.queryGroups({ projectId }), {
    before: () => !!projectId && !_groups?.length,
    refreshDeps: [projectId, _groups],
    onSuccess: (data) => {
      setGroups(data);
    },
  });

  const groupData = useMemo(() => {
    if (groups.every((group) => typeof group === 'string')) {
      return groups;
    }
    return groups?.filter((group) => group.id !== 'Mesoor');
  }, [groups]);

  const getStageName = (group: GroupData | string | undefined) =>
    typeof group === 'string' ? group : group?.name;

  useEffect(() => {
    if (!currentStageName && stageName) {
      console.log(currentStageName);
      setCurrentStageName(stageName);
    }
  }, [currentStageName, stageName]);

  const currentStage = useMemo(
    () => groupData?.find((group) => getStageName(group) === currentStageName),
    [currentStageName, groupData],
  );

  const [loading, setLoading] = useState(false);
  async function handleSelectFlow(group: GroupData | string) {
    const stageName = getStageName(group);
    if (!stageName) return;
    try {
      setLoading(true);
      await taskService.updateFlowStage({ stageName, taskId });
      toast.success('更新成功');
    } finally {
      setLoading(false);
    }
  }

  return (
    groupData?.length && (
      <Dropdown>
        <DropdownTrigger>
          <Button
            isLoading={loading}
            color="primary"
            radius="full"
            className={cn('w-32 bg-gradient-to-r from-[#FDA650] to-[#FD7938]', className)}
            // style={{ backgroundColor: currentStage?.color, color: '#fff' }}
          >
            {getStageName(currentStage)}
            <Icon icon="akar-icons:triangle-down-fill" className="text-xs" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="flat"
          color="primary"
          selectionMode="single"
          selectedKeys={[currentStageName]}
          onSelectionChange={(v) => {
            setCurrentStageName(Array.from(v)[0].toString());
          }}
        >
          {groupData?.map((group) => (
            <DropdownItem key={getStageName(group)} onClick={() => handleSelectFlow(group)}>
              <div className="flex items-center gap-3">
                {/* <Icon icon="akar-icons:square-fill" style={{ color: group.color }} /> */}
                {getStageName(group)}
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    )
  );
}
