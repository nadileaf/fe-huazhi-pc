import { cn } from '@/lib/utils';

interface SectionLayoutProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  headerChildren?: React.ReactNode;
}

export function SectionLayout({ title, children, className, headerChildren }: SectionLayoutProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="mb-12 flex items-center justify-between">
        <h3 className="title text-3xl">{title}</h3>
        {headerChildren}
      </div>
      <div className="px-3 space-y-6">{children}</div>
    </div>
  );
}
