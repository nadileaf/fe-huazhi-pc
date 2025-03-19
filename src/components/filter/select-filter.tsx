import { Select, SelectItem } from '@nextui-org/react';
import { type FilterOptionConfig } from '@/config/entity';
import { useEffect, useState } from 'react';
import { useFilterOption } from '@/hooks/useFilterOption';

interface Props {
  config: FilterOptionConfig[number];
  values: SearchModel.FilterValueType[];
  onChange: (values: Props['values']) => void;
}

export default function SelectFilter({ config, values, onChange }: Props) {
  const { getOptionLabel, getValue } = useFilterOption();
  const isMultiple = config.multiple ?? true;

  const items =
    config.values?.map((item) => ({
      label: getOptionLabel(item, config),
      value: getValue(item),
    })) || [];

  const selectedKeys = new Set(
    items.filter((item) => values.includes(item.value)).map((item) => item.label),
  );

  function onSelectedValuesChange(keys: any) {
    const values = [...keys]
      .map((k) => items.find((item) => item.label === k)?.value)
      .filter((v) => !!v) as Props['values'];
    onChange(values);
  }

  if (!config.values) return null;

  return (
    <div>
      <Select
        size="sm"
        label={config.label}
        selectionMode={isMultiple ? 'multiple' : 'single'}
        className="max-w-xs"
        selectedKeys={selectedKeys as any}
        onSelectionChange={(keys) => onSelectedValuesChange(keys)}
        classNames={{ base: 'w-48' }}
      >
        {items.map((option) => (
          <SelectItem key={option.label || ''}>{option.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
