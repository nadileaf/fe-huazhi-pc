import type { FilterOptionConfig } from '../type';
import { createConfigWithDefault, createDictionaryConfigItem } from '../default';
import { formatFilterNumberRange } from '@/utils/format';
import {
  regionDictionary,
  jobFunctionDictionary,
  industryDictionary,
  salaryRangeDictionary,
} from '@/services/dictionary';

export const filterOptionConfig: FilterOptionConfig = createConfigWithDefault([
  {
    label: '国家',
    key: 'data.standardFields.locations.country',
    treeDictionary: regionDictionary,
  },
  {
    label: '职能',
    key: 'data.standardFields.categories',
    values: jobFunctionDictionary,
  },
  {
    label: '行业',
    key: 'data.standardFields.industryRequirements',
    values: industryDictionary,
  },
  {
    label: '薪资要求',
    key: 'data.standardFields.salaryRange.gt.amount.number,data.standardFields.salaryRange.lt.amount.number',
    values: salaryRangeDictionary
      .filter((item) => typeof item.min === 'number' || typeof item.max === 'number')
      .map((item) => ({
        value: {
          minimum: item.min ? item.min * 1000 : item.min,
          maximum: item.max ? item.max * 1000 : item.max,
        },
        label: formatFilterNumberRange({ minimum: item.min, maximum: item.max }, 'k'),
      })),
    multiple: false,
    common: true,
  },
]);
