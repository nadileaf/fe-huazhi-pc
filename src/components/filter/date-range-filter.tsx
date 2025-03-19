import { type FilterOptionConfig } from '@/config/entity';
import { useEffect, useState } from 'react';
import { get } from 'lodash-es';
import { normalizeDate } from '@/utils/format';
import DatePicker from '../basic/DatePicker';

interface Props {
  config: FilterOptionConfig[number];
  values: SearchModel.FilterValueType[];
  onChange: (values: Props['values']) => void;
}

export default function DateRangeFilter({ config, values, onChange }: Props) {
  const dateRange = values.length
    ? (values[0] as { minimum?: string; maximum?: string })
    : undefined;

  const start = get(dateRange, 'minimum');
  const end = get(dateRange, 'maximum');

  function updateDateRange(newRange: Partial<{ minimum?: string; maximum?: string }>) {
    let range: typeof dateRange = { ...dateRange, ...newRange };
    if (!range.maximum && !range.minimum) {
      range = undefined;
    }
    onChange(range ? [range] : []);
  }

  function onStartChange(date: Common.NormalizedField.Date) {
    console.log('onStartChange', date);
    updateDateRange({ minimum: date?.iso || undefined });
  }

  function onEndChange(date: Common.NormalizedField.Date) {
    console.log('onEndChange', date);
    updateDateRange({ maximum: date?.iso || undefined });
  }

  return (
    <div className="flex items-center gap-4">
      <div className="mr-3">{config.label}：</div>
      <DatePicker
        value={start ? normalizeDate(start) : undefined}
        onChange={(date) => onStartChange(date)}
        label="开始时间"
        size="sm"
        variant="flat"
        className="w-36"
      />
      -
      <DatePicker
        value={end ? normalizeDate(end) : undefined}
        onChange={(date) => onEndChange(date)}
        label="结束时间"
        size="sm"
        variant="flat"
        className="w-36"
      />
    </div>
  );
}
