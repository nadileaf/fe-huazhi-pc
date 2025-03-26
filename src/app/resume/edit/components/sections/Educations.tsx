import { Input, Select, SelectItem } from '@nextui-org/react';
import { Controller } from 'react-hook-form';
import { ArrayField } from '../ArrayField';
import { type InfoProps } from '../types';
import { commonProps } from './common';
import { degreeOptions } from '@/config/degree';
import DateRangePicker from '@/components/basic/DateRangePicker';

export function Educations({ control, className }: InfoProps) {
  return (
    <ArrayField
      name="standardFields.educations"
      control={control}
      title="认证教育信息"
      className={className}
      defaultValue={{
        schoolName: '',
        dateRange: undefined,
        degree: {},
        department: '',
        major: '',
      }}
    >
      {(index) => (
        <>
          <div className="flex items-center gap-5">
            <Controller
              name={`standardFields.educations.${index}.schoolName`}
              control={control}
              render={({ field }) => (
                <Input {...field} {...commonProps} label="学校名称" className="w-[66%]" />
              )}
            />

            <Controller
              name={`standardFields.educations.${index}.dateRange`}
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <div className="flex-1">
                  <DateRangePicker
                    value={{ start: field.value?.start, end: field.value?.end }}
                    onChange={(range) => field.onChange(range)}
                    label="就读时间"
                  />
                </div>
              )}
            />
          </div>

          <div className="flex items-center gap-5">
            <Controller
              name={`standardFields.educations.${index}.degree.name`}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  {...commonProps}
                  label="学历"
                  selectedKeys={field.value ? [field.value] : []}
                >
                  {degreeOptions.map((item) => (
                    <SelectItem key={item}>{item}</SelectItem>
                  ))}
                </Select>
              )}
            />

            <Controller
              name={`standardFields.educations.${index}.majorNames`}
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Input
                  {...commonProps}
                  label="专业"
                  value={field.value?.[0] || ''}
                  onChange={(e) => {
                    field.onChange([e.target.value]);
                  }}
                />
              )}
            />
          </div>
        </>
      )}
    </ArrayField>
  );
}
