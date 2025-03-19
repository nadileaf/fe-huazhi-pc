import { DictionaryTitleMap } from '@/models/entity';
import type { FilterOptionConfig } from './type';

export const defaultConfig: FilterOptionConfig = [
  {
    label: '创建时间',
    key: 'meta.createdAt',
    mode: 'dateRange',
  },
  {
    label: '更新时间',
    key: 'meta.updatedAt',
    mode: 'dateRange',
  },
];

export const createConfigWithDefault = (config: FilterOptionConfig) => [
  ...config,
  ...defaultConfig,
];

export function createDictionaryConfigItem(
  dictionaryId: DictionaryModel.DictionaryId,
  key: string,
): FilterOptionConfig[number] {
  return {
    label: DictionaryTitleMap.get(dictionaryId),
    key,
    values: [],
    dictionaryId,
  };
}
