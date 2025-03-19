/**
 * @description 搜索相关接口的 Request Params
 * 获取职位列表 / 人才库列表 / 收藏夹人才列表 都会走一遍后端的搜索，前端需传递搜索的相关参数
 */

declare namespace SearchModel {
  type FilterValueRange = Partial<{ minimum: string | number; maximum: string | number }>;
  type FilterValueType = string | number | FilterValueRange | { exclusiveMinimum: string };

  type OptionValuesType<T = FilterValueType> = Array<{ value: T; label?: string; id?: string }>;

  type FilterModeType = 'choice' | 'slider' | 'select' | 'switch' | 'search';

  type FilterValue = {
    key: string;
    values: FilterValueType[];
    /** 是否是数字范围 */
    isNumberRange?: boolean;
    label?: string;
    multiple?: boolean;
    mode?: FilterModeType;
    op?: string;
  };

  type FilterOption<T = FilterValueType> = {
    /** 搜索标识 */
    key: string;
    values: OptionValuesType<T>;
    /** 标题 */
    label?: string;
    /** 多选 */
    multiple?: boolean;
    /** 是否数字范围 */
    isNumberRange?: boolean;
    /** 显示控件类型 */
    mode?: FilterModeType;
    /** 单位 */
    unit?: string;
    /** 比例 */
    ratio?: number;
  };

  type BasicSearchParams = {
    /** 搜索关键字 */
    query?: string;
    /** 筛选条件 */
    filters?: FilterValue[];
    /** 排序 */
    orderBy?: string;
    /** 新版排序 */
    sort?: string;
    /** 地理位置 */
    geo?: Common.NormalizedField.GeoPoint;
    checkPermission?: boolean;
  };

  type PaginationParams = {
    current?: number;
    pageSize?: number;
    total?: number;
  };

  /**  @description  搜索请求参数 */
  type SearchParams<T = BasicSearchParams> = T & PaginationParams;

  /**  @description  搜索返回 */
  type SearchResponse<T> = { data: T[]; total: number; filters?: SearchModel.FilterValue[] };

  type SearchEntityType = Exclude<EntityModel.EntityType, 'Dictionary'>;

  /** @description 根据entityType集成所有搜索类型 */
  type SearchEntityParams<T extends SearchEntityType = SearchEntityType> = T extends 'Project'
    ? import('@/services/project').QueryProjectsParams & { entityType: T }
    : T extends 'HydrogenTask'
      ? import('@/services/task').QueryTasksParams & { entityType: T; query?: string }
      : import('@/services/entity').EntityQueryParams<T>;
}
