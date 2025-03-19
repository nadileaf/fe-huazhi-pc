import { formatFilterNumberRange, formatFilterDateRange, formatPathValue } from '@/utils/format';
import type {
  FilterOptionConfigValues,
  FilterOptionConfigValuesWithLabel,
  FilterOptionConfig,
} from '@/config/entity';

export function useFilterOption() {
  const isComplexValue = (
    value: FilterOptionConfigValues[number],
  ): value is FilterOptionConfigValuesWithLabel => typeof value === 'object' && 'value' in value;

  const isRange = (item: SearchModel.FilterValueType): item is SearchModel.FilterValueRange =>
    typeof item === 'object' && ('minimum' in item || 'maximum' in item);

  function formatRangeValue(
    val: SearchModel.FilterValueRange,
    config: Partial<FilterOptionConfig[number]>,
  ) {
    return typeof val.maximum === 'number' || typeof val.minimum === 'number'
      ? formatFilterNumberRange(
          {
            minimum: (Number(val.minimum) ?? 0) / (config?.ratio || 1),
            maximum: (Number(val.maximum) ?? 0) / (config?.ratio || 1),
          },
          config.unit,
        )
      : formatFilterDateRange(val);
  }

  function formatValue(val: unknown, isDic?: boolean) {
    if (typeof val !== 'string' || !isDic) return val as string;
    return formatPathValue(val);
  }

  const getOptionLabel = (
    item: FilterOptionConfigValues[number],
    config: Partial<FilterOptionConfig[number]>,
  ) => {
    if (isComplexValue(item)) {
      if (item.label) return formatValue(item.label || item.value, !!config.dictionaryId);
      if (isRange(item.value)) return formatRangeValue(item.value, config);
    } else {
      if (isRange(item)) return formatRangeValue(item, config);
      return formatValue(item, !!config.dictionaryId);
    }
  };

  function getValue(option: FilterOptionConfigValues[number]) {
    if (typeof option === 'string') return option;
    return isComplexValue(option) ? option.value : option;
  }

  return { isComplexValue, isRange, getOptionLabel, getValue };
}
