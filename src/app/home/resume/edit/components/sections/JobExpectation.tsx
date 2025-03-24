import { Input, Select, SelectItem } from '@nextui-org/react';
import { Controller } from 'react-hook-form';
import { SectionLayout } from '../SectionLayout';
import { type InfoProps } from '../types';
import { commonProps } from './common';
import LocationSelector from '@/components/basic/LocationSelector';
import { workTypeData } from '@/services/dictionary';

export function JobExpectation({ control, className }: InfoProps) {
  return (
    <SectionLayout title="求职意向" className={className}>
      <Controller
        name="standardFields.expectations.0.jobNames.0"
        control={control}
        render={({ field }) => (
          <Input {...field} {...commonProps} label="期望职位" placeholder="请选择期望职位" />
        )}
      />

      <Controller
        name="standardFields.expectations.0.workModes.0"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            {...commonProps}
            label="工作类型"
            placeholder="请选择工作类型"
            selectedKeys={field.value ? [field.value] : []}
          >
            {workTypeData.map((option) => (
              <SelectItem key={option.value}>{option.label}</SelectItem>
            ))}
          </Select>
        )}
      />

      <div className="flex items-center gap-5">
        <Controller
          name="standardFields.expectations.0.salaryRange.gt.amount.number"
          control={control}
          render={({ field }) => {
            console.log('salaryRange.gt.amount.number', field);
            return (
              <Input
                {...commonProps}
                type="number"
                label="最低期望薪资"
                placeholder="请输入"
                className="flex-1"
                value={field.value?.toString() || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === '' ? null : Number(value));
                }}
              />
            );
          }}
        />
        <div className="mt-7">-</div>
        <Controller
          name="standardFields.expectations.0.salaryRange.lt.amount.number"
          control={control}
          render={({ field }) => (
            <Input
              {...commonProps}
              type="number"
              label="最高期望薪资"
              placeholder="请输入"
              className="flex-1"
              value={field.value?.toString() || ''}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === '' ? null : Number(value));
              }}
            />
          )}
        />
      </div>

      <Controller
        name="standardFields.expectations.0.locations.0"
        control={control}
        render={({ field }) => (
          <>
            <div className="mb-1">目标地点</div>
            <LocationSelector
              value={field.value}
              onChange={(val) => {
                field.onChange({
                  ...Object.fromEntries(
                    ['country', 'province', 'city', 'district', 'code', 'address'].map((key) => [
                      key,
                      val[key as keyof typeof val] || null,
                    ]),
                  ),
                });
              }}
            />
          </>
        )}
      />
    </SectionLayout>
  );
}
