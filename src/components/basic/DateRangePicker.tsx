import React, { useState, useEffect, useMemo } from 'react';
import { Input, Popover, PopoverTrigger, PopoverContent, type InputProps } from '@nextui-org/react';
import { Calendar } from '@/components/ui/calendar';
import { type DateRange } from 'react-day-picker';
import dayjs from 'dayjs';
import { formatDateRange } from '@/utils/format';
import ClearButton from '@/components/basic/ClearButton';

interface DateRangePickerProps extends Pick<InputProps, 'variant'> {
  value: { start?: Common.NormalizedField.Date; end?: Common.NormalizedField.Date };
  onChange: (range: DateRangePickerProps['value'] | null) => void;
  label?: string;
  placeholder?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  label = '日期范围',
  placeholder = '选择日期范围',
  variant,
}) => {
  const [range, setRange] = useState<DateRange | undefined>({ from: undefined, to: undefined });

  useEffect(() => {
    if (!value?.start?.iso && !value?.end?.iso) {
      setRange(undefined);
      return;
    }

    setRange({
      from: value.start?.iso ? new Date(value.start.iso) : undefined,
      to: value.end?.iso ? new Date(value.end.iso) : undefined,
    });
  }, [value]);

  const formattedRange = useMemo(() => {
    // console.log('formattedRange', value);
    if (!value?.start?.iso && !value?.end?.iso) {
      return placeholder;
    }
    return formatDateRange({ start: value?.start?.iso, end: value?.end?.iso }) || placeholder;
  }, [value, placeholder]);

  const format = (date: Date) => ({
    iso: dayjs(date).toISOString(),
    year: dayjs(date).year(),
    month: dayjs(date).month() + 1,
    day: dayjs(date).date(),
  });

  const handleDateChange = (range: DateRange | undefined) => {
    setRange(range);
    if (!range?.from && !range?.to) {
      onChange(null); // 清除值时返回 null
      return;
    }

    onChange({
      start: range.from ? format(range.from) : undefined,
      end: range.to ? format(range.to) : undefined,
    });
  };

  return (
    <div>
      <Popover placement="bottom" showArrow>
        <PopoverTrigger>
          <Input
            readOnly
            label={label}
            placeholder={placeholder}
            value={formattedRange}
            fullWidth
            variant={variant || 'bordered'}
            classNames={{
              input: 'cursor-pointer text-left',
            }}
            endContent={
              (value?.start?.iso || value?.end?.iso) && (
                <ClearButton onClick={() => handleDateChange(undefined)} />
              )
            }
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <Calendar
              mode="range"
              selected={range}
              onSelect={handleDateChange}
              defaultMonth={range?.from}
              numberOfMonths={1}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
