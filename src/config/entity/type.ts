export type FilterOptionConfigValuesWithLabel = {
  value: SearchModel.FilterValueType;
  label?: string;
};
export type FilterOptionConfigValues = (
  | SearchModel.FilterValueType
  | FilterOptionConfigValuesWithLabel
)[];

export type TreeDictionary = {
  label: string;
  value: string;
  children?: TreeDictionary;
}[];

export type FilterOptionMode = 'select' | 'dateRange';
export type FilterOptionConfig = (Pick<SearchModel.FilterValue, 'key' | 'label' | 'multiple'> &
  Partial<{
    values: FilterOptionConfigValues;
    treeDictionary: TreeDictionary;
    dictionaryId: DictionaryModel.DictionaryId;
    unit: string;
    ratio: number;
    foldable: boolean;
    /** 默认是 select */
    mode: FilterOptionMode;
    /** 是否常驻 */
    common: boolean;
  }>)[];
