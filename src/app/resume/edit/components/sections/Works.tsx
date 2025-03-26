import { Input, Textarea } from '@nextui-org/react';
import { Controller } from 'react-hook-form';
import { ArrayField } from '../ArrayField';
import { type InfoProps } from '../types';
import DateRangePicker from '@/components/basic/DateRangePicker';
import { commonProps } from './common';

export function Works({ control, className }: InfoProps) {
  return (
    <ArrayField
      name="standardFields.works"
      control={control}
      title="工作经历"
      className={className}
      defaultValue={{
        companyName: '',
        jobNames: [],
        description: '',
        dateRange: { start: null, end: null },
      }}
    >
      {(index) => (
        <>
          <div className="flex items-center gap-5">
            <Controller
              name={`standardFields.works.${index}.companyName`}
              control={control}
              render={({ field }) => (
                <Input {...field} {...commonProps} label="公司名称" className="w-[66%]" />
              )}
            />

            <Controller
              name={`standardFields.works.${index}.dateRange`}
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <div className="flex-1">
                  <DateRangePicker
                    value={{ start: field.value?.start, end: field.value?.end }}
                    onChange={(range) => field.onChange(range)}
                    label="工作时间"
                  />
                </div>
              )}
            />
          </div>

          <Controller
            name={`standardFields.works.${index}.jobNames`}
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Input
                {...commonProps}
                label="职位名称"
                className="w-full"
                value={field.value?.[0] || ''}
                onChange={(e) => {
                  field.onChange([e.target.value]);
                }}
              />
            )}
          />

          <Controller
            name={`standardFields.works.${index}.description`}
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                {...commonProps}
                label="工作内容描述"
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
