import LocationSelector from '@/components/basic/LocationSelector';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { Controller } from 'react-hook-form';
import { SectionLayout } from '../SectionLayout';
import { type InfoProps } from '../types';
import { commonProps } from './common';
import { AvatarEditor } from '@/components/basic/AvatarEditor';
import { last } from 'lodash-es';

export function BasicInfo({ control, className }: InfoProps) {
  return (
    <SectionLayout title="基本信息" className={className}>
      <Controller
        name="standardFields.humanInfo.avatar"
        control={control}
        render={({ field }) => {
          console.log('field', field);
          return (
            <AvatarEditor
              value={field.value}
              onChange={(files) => {
                console.log('files', files);
                field.onChange(last(files));
              }}
            ></AvatarEditor>
          );
        }}
      ></Controller>
      <Controller
        name="standardFields.humanInfo.name"
        control={control}
        render={({ field }) => <Input {...field} {...commonProps} label="姓名" />}
      />

      <div className="flex items-center gap-5">
        <Controller
          name="standardFields.humanInfo.genderName"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              {...commonProps}
              label="性别"
              selectedKeys={field.value ? [field.value] : []}
            >
              <SelectItem key="男">男</SelectItem>
              <SelectItem key="女">女</SelectItem>
            </Select>
          )}
        />

        <Controller
          name="standardFields.humanInfo.age"
          control={control}
          render={({ field }) => (
            <Input
              {...commonProps}
              type="number"
              label="年龄"
              value={field.value || ''}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === '' ? null : Number(value));
              }}
            />
          )}
        />

        <Controller
          name="standardFields.employeeInfo.id"
          control={control}
          render={({ field }) => <Input {...field} {...commonProps} label="学号" />}
        />
      </div>

      <Controller
        name="standardFields.contactInfo.address"
        control={control}
        render={({ field }) => (
          <>
            <div className="mb-1">现居地</div>
            <LocationSelector
              value={field.value}
              onChange={(val) => {
                const value = {
                  ...Object.fromEntries(
                    ['country', 'province', 'city', 'district', 'code', 'address'].map((key) => [
                      key,
                      val[key as keyof typeof val] || null,
                    ]),
                  ),
                };
                field.onChange(value);
              }}
            />
          </>
        )}
      />
    </SectionLayout>
  );
}
