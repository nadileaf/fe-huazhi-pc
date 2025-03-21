import dynamic from 'next/dynamic';
import { Button, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { type FilterOptionConfig } from '@/config/entity';
import { ChevronDownIcon } from 'lucide-react';

const SelectFilter = dynamic(() => import('./select-filter'));
const DateRangeFilter = dynamic(() => import('./date-range-filter'));
const TreeDictionaryFilter = dynamic(() => import('./tree-dictionary-filter'));

export interface FilterOption {
  label: string;
  selectedValues: string | number;
}

interface FilterProps {
  config: FilterOptionConfig[number];
  selectedValues: SearchModel.FilterValueType[];
  onChange: (values: FilterProps['selectedValues']) => void;
}

// 如果是简单的 options 就 Dropdown，其他的都用 Popover
export default function Filter({ config, selectedValues, onChange }: FilterProps) {
  console.log('Filter', config);

  if (config.values?.length) {
    return <SelectFilter config={config} values={selectedValues} onChange={onChange} />;
  }

  return (
    <Popover key={config.key} placement="bottom">
      <PopoverTrigger>
        <Button
          variant="bordered"
          color={selectedValues.length > 0 ? 'primary' : 'default'}
          endContent={<ChevronDownIcon size={16} />}
        >
          {config.label}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="bg-white p-4">
          <FilterComponent config={config} selectedValues={selectedValues} onChange={onChange} />
        </div>
      </PopoverContent>
    </Popover>
  );
}

function FilterComponent({ config, selectedValues, onChange }: FilterProps) {
  const commonProps = { config, values: selectedValues, onChange };

  if (config.treeDictionary) return <TreeDictionaryFilter {...commonProps} />;

  if (config.mode === 'dateRange') {
    return <DateRangeFilter {...commonProps} />;
  }

  return <SelectFilter {...commonProps} />;
}
