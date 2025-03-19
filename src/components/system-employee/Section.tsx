import React from 'react';

export interface SystemEmployeeSectionProps {
  title?: string;
  children: React.ReactNode;
  classNames?: Partial<{
    base: string;
    title: string;
    content: string;
  }>;
  id?: string;
}

export default function SystemEmployeeSection({
  title,
  children,
  classNames,
  id,
}: SystemEmployeeSectionProps) {
  return (
    <div className={`scroll-mt-[calc(var(--navbar-height)+100px)] ${classNames?.base}`} id={id}>
      {title && (
        <div className={`text-4xl font-semibold text-black-333 mb-16 ${classNames?.title}`}>
          {title}
        </div>
      )}
      <div className={classNames?.content}>{children}</div>
    </div>
  );
}
