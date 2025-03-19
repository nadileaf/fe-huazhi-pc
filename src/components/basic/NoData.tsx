import { cn } from '@nextui-org/react';

export default function NoData({ className }: { className?: string }) {
  return (
    <div className={cn('text-center text-default-400 flex items-center justify-center', className)}>
      暂无数据
    </div>
  );
}
