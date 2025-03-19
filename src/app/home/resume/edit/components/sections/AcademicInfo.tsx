import { Input } from '@nextui-org/react';
import { Controller } from 'react-hook-form';
import { SectionLayout } from '../SectionLayout';
import { type InfoProps } from '../types';
import { commonProps } from './common';

export function AcademicInfo({ control, className }: InfoProps) {
  return (
    <SectionLayout title="在校成绩" className={className}>
      <Controller
        name="standardFields.academicPerformance.topPercentage"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            {...commonProps}
            type="number"
            label="成绩排名"
            min={0}
            endContent={<div className="pointer-events-none"></div>}
            onChange={(e) => field.onChange(Number(e.target.value))}
          />
        )}
      />

      <Controller
        name="standardFields.academicPerformance.averageGPA"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            {...commonProps}
            type="number"
            label="平均GPA"
            step={0.01}
            min={0}
            max={5}
            onChange={(e) => field.onChange(Number(e.target.value))}
          />
        )}
      />
    </SectionLayout>
  );
}
