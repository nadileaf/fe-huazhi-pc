import { lazy, Suspense } from 'react';
import { Spinner } from '@nextui-org/react';
import { type FilterOptionConfig } from '@/config/entity';

const SelectFilter = lazy(() => import('./select-filter'));
const DateRangeFilter = lazy(() => import('./date-range-filter'));

export interface FilterOption {
  label: string;
  selectedValues: string | number;
}

interface FilterProps {
  config: FilterOptionConfig[number];
  selectedValues: SearchModel.FilterValueType[];
  onChange: (values: FilterProps['selectedValues']) => void;
}

export default function Filter({ config, selectedValues, onChange }: FilterProps) {
  const FilterComponent = (() => {
    if (!config.mode) return SelectFilter;

    switch (config.mode) {
      case 'dateRange':
        return DateRangeFilter;
    }
  })();

  if (!FilterComponent) return null;

  return (
    <Suspense fallback={<Spinner />}>
      <FilterComponent config={config} values={selectedValues} onChange={onChange} />
    </Suspense>
  );
}
