import React, { useState, useEffect, useMemo } from 'react';
import { Input, Popover, PopoverTrigger, PopoverContent, type InputProps } from '@nextui-org/react';
import { Calendar } from '@/components/ui/calendar';
import dayjs from 'dayjs';
import { formatDate, normalizeDate } from '@/utils/format';
import { Icon } from '@iconify/react';

interface DatePickerProps extends Pick<InputProps, 'variant' | 'size'> {
  value?: Common.NormalizedField.Date;
  onChange: (date: Common.NormalizedField.Date | null) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  className,
  variant,
  size,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  useEffect(() => {
    if (value?.iso) {
      setSelectedDate(new Date(value.iso));
    } else {
      setSelectedDate(undefined);
    }
  }, [value]);

  const formattedDate = useMemo(() => {
    return value?.iso ? formatDate(value.iso) : '';
  }, [value]);

  const handleDateChange = (date: Date | undefined) => {
    console.log('handleDateChange', date);
    setSelectedDate(date);
    if (!date) {
      onChange(null);
      return;
    }
    onChange(normalizeDate(date));
  };

  return (
    <div className={className}>
      <Popover placement="bottom" showArrow>
        <PopoverTrigger>
          <Input
            readOnly
            label={label}
            value={formattedDate}
            fullWidth
            variant={variant || 'bordered'}
            size={size}
            classNames={{
              input: 'cursor-pointer text-left',
            }}
            endContent={
              formattedDate && (
                <div
                  className="cursor-pointer text-default-400 hover:text-default-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDateChange(undefined);
                  }}
                >
                  <Icon icon="mdi:close" />
                </div>
              )
            }
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              defaultMonth={selectedDate}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
