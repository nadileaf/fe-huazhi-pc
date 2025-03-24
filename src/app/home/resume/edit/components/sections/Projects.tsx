import { Input, Textarea } from '@nextui-org/react';
import { Controller } from 'react-hook-form';
import { ArrayField } from '../ArrayField';
import { type InfoProps } from '../types';
import DateRangePicker from '@/components/basic/DateRangePicker';
import { commonProps } from './common';

export function Projects({ control, className }: InfoProps) {
  return (
    <ArrayField
      name="standardFields.projects"
      control={control}
      title="项目经历"
      className={className}
      defaultValue={{
        name: '',
        companyName: '',
        description: '',
        dateRange: undefined,
      }}
    >
      {(index) => (
        <>
          <Controller
            name={`standardFields.projects.${index}.name`}
            control={control}
            render={({ field }) => (
              <Input {...field} {...commonProps} label="项目名称" placeholder="请输入项目名称" />
            )}
          />

          <Controller
            name={`standardFields.projects.${index}.companyName`}
            control={control}
            render={({ field }) => (
              <Input {...field} {...commonProps} label="所属公司" placeholder="请输入所属公司" />
            )}
          />

          <div className="flex items-center gap-5">
            <Controller
              name={`standardFields.projects.${index}.dateRange`}
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <div className="flex-1">
                  <DateRangePicker
                    value={{ start: field.value?.start, end: field.value?.end }}
                    onChange={(range) => field.onChange(range)}
                    label="项目时间"
                  />
                </div>
              )}
            />
          </div>

          <Controller
            name={`standardFields.projects.${index}.description`}
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                {...commonProps}
                label="项目描述"
                placeholder="请输入项目描述"
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
