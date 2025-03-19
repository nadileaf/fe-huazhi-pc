import { Input } from '@nextui-org/react';
import { Controller } from 'react-hook-form';
import { ArrayField } from '../ArrayField';
import { type InfoProps } from '../types';
import { commonProps } from './common';
import DatePicker from '@/components/basic/DatePicker';
import FileUpload from '@/components/basic/FileUpload';

export function Certificates({ control, className }: InfoProps) {
  return (
    <ArrayField
      name="standardFields.certificates"
      control={control}
      title="所获证书"
      className={className}
      defaultValue={{
        name: '',
        source: '',
        date: null,
        attachments: [],
      }}
    >
      {(index) => (
        <>
          <Controller
            name={`standardFields.certificates.${index}.name`}
            control={control}
            render={({ field }) => <Input {...field} {...commonProps} label="证书名称" />}
          />

          <div className="flex items-center gap-5">
            <Controller
              name={`standardFields.certificates.${index}.source`}
              control={control}
              render={({ field }) => (
                <Input {...field} {...commonProps} label="证书来源" className="w-2/3" />
              )}
            />

            <Controller
              name={`standardFields.certificates.${index}.date`}
              control={control}
              defaultValue={{ iso: '' }}
              render={({ field }) => (
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  label="证书日期"
                  placeholder="请选择证书日期"
                  className="flex-1"
                />
              )}
            />
          </div>

          <Controller
            name={`standardFields.certificates.${index}.attachments`}
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <div>
                <div className="mb-2">证书附件</div>
                <FileUpload value={field.value} onChange={field.onChange} />
              </div>
            )}
          />
        </>
      )}
    </ArrayField>
  );
}
