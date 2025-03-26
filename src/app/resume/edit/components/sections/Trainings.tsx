import { Input, Textarea } from '@nextui-org/react';
import { Controller } from 'react-hook-form';
import { ArrayField } from '../ArrayField';
import { type InfoProps } from '../types';
import DateRangePicker2 from '@/components/basic/DateRangePicker';
import { commonProps } from './common';

export function Trainings({ control, className }: InfoProps) {
  return (
    <ArrayField
      name="standardFields.trainings"
      control={control}
      title="在校所学课程"
      className={className}
      defaultValue={{
        name: '',
        description: '',
        dateRange: undefined,
      }}
    >
      {(index) => (
        <>
          <div className="flex items-center gap-5">
            <Controller
              name={`standardFields.trainings.${index}.name`}
              control={control}
              render={({ field }) => (
                <Input {...field} {...commonProps} label="课程名称" className="w-[66%]" />
              )}
            />

            <Controller
              name={`standardFields.trainings.${index}.dateRange`}
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <div className="w-[33%]">
                  <DateRangePicker2
                    value={{ start: field.value?.start, end: field.value?.end }}
                    onChange={(range) => field.onChange(range)}
                    label="课程时间"
                  />
                </div>
              )}
            />
          </div>

          <Controller
            name={`standardFields.trainings.${index}.description`}
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                {...commonProps}
                label="课程内容描述"
                className="w-full"
                minRows={3}
                maxRows={6}
              />
            )}
          />
        </>
      )}
    </ArrayField>
  );
}
