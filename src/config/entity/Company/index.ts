import type { FilterOptionConfig } from '../type';
import { createConfigWithDefault } from '../default';

export const filterOptionConfig: FilterOptionConfig = createConfigWithDefault([
  {
    label: '国家',
    key: 'data.standardFields.address.country',
    values: [],
  },

  {
    label: '行业',
    key: 'data.standardFields.industry',
    values: [],
  },
]);
