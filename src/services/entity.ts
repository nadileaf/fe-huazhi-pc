import { mesoorSpacePrefixUrl, request } from '@/services';
import { generateUrl } from '@/utils/common';
import { truthy } from '@/utils/types';
import { EntityStatus } from '@/models/entity';
import type { RequestOptions } from '@/utils/request';

export type EntityQueryParams<
  T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType,
> = SearchModel.SearchParams & {
  /** 要搜索的实体 */
  entityType: T;
  /** 不显示在筛选结果中的filters */
  innerFilters?: SearchModel.FilterValue[];
  /** 是否返回filters */
  returnFilters?: boolean;
};
export type EntityQueryResponse<
  T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType,
> = SearchModel.SearchResponse<EntityModel.BusinessEntity<T>>;

export type EntityListRefreshParams<
  T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType,
> = Pick<EntityQueryParams<T>, 'entityType' | 'query' | 'filters' | 'innerFilters'>;
export type EntityListLoadMoreParams<
  T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType,
> = Pick<EntityQueryParams<T>, 'current' | 'pageSize' | 'sort'>;

export type EntityQueryDetailParams<
  T extends EntityModel.EntityType = EntityModel.BusinessEntityType,
> = {
  entityId: string | undefined;
  entityType: T;
};

export type FavoriteEntityParams = EntityQueryDetailParams;

export type FavoritesEntityParams = {
  context: {
    entityType: EntityModel.BusinessEntityType;
    openId: string;
  };
  target: {
    entityType: EntityModel.BusinessEntityType;
    openId: string;
  };
};

export type EntityCreateParams<
  T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType,
> = {
  entityType: T;
  openId?: string;
  schema?: string;
  data: EntityModel.BusinessEntity<T>['data'];
  overwrite?: boolean;
};

export type RecommendParams = {
  entityType: Extract<EntityModel.BusinessEntityType, 'Job' | 'Resume'>;
  openId: string;
  geo?: Common.NormalizedField.GeoPoint;
} & Pick<SearchModel.SearchParams, 'filters' | 'current' | 'pageSize'>;

export type EntityLocationResponse<
  T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType,
> = SearchModel.SearchResponse<{
  spaceId: string;
  spaceName?: string;
  channelId: string;
  channelName?: string;
  projectId: string;
  projectName?: string;
  project: ProjectModel.Project<T>;
  projectPayload?: EntityModel.BusinessEntityPayload<T>;
}>;

export type QueryAllEntitiesParams<
  T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType,
> = Partial<{
  entityType: T;
  openIds: string[];
  select: string;
}>;

export type QueryAllEntitiesResponse = SearchModel.SearchResponse<UserModel.BasicUserInfo>;

export type QueryEntityEvaluationsParams = SearchModel.SearchParams<
  EntityQueryDetailParams &
    Partial<{
      /** 为 true 则只返回自己写的 */
      self: boolean;
      payloadEntityType: EntityModel.BusinessEntityType;
      payloadEntityId: string;
    }>
>;

export type CreateEntityEvaluationParams = EntityQueryDetailParams &
  EvaluationModel.BasicEvaluation &
  Partial<{
    entityReference: Common.NormalizedField.EntityReference;
    attachments: Common.NormalizedField.File[];
  }>;

export type UpdateEntityEvaluationParams = {
  evaluationId: number;
  entityReference?: Common.NormalizedField.EntityReference;
  attachments?: Common.NormalizedField.File[];
} & EntityQueryDetailParams &
  EvaluationModel.BasicEvaluation;

export type DeleteEntityEvaluationParams = EntityQueryDetailParams & {
  evaluationId: number;
  payloadEntityType?: EntityModel.BusinessEntityType;
  payloadEntityId?: string;
};

export type EntityUploadParams<
  T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType,
> = {
  /** entityId不传则后端自动生成 */
  entityId?: string;
  entityType: T;
  file: File;
  roles?: string[];
};

export type EntityUploadOptions = {
  // onBeforeUpload?: (params: { source: ReturnType<typeof axios.CancelToken.source> }) => void;
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
};

export type EntityUploadResponse = {
  data: any;
  code: string | number;
  existingData?: any;
};

export const entityService = {
  async query<T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType>(
    params: EntityQueryParams<T>,
  ): Promise<EntityQueryResponse<T>> {
    try {
      const {
        current = 1,
        pageSize = 15,
        query,
        filters: requestFilters = [],
        innerFilters = [],
        returnFilters = false,
        entityType,
        ...otherParams
      } = params;

      const filters: SearchModel.FilterValue[] = [
        ...parseFilters([...requestFilters, ...innerFilters], 'search'),
        {
          key: '!meta.status',
          values: ['1'],
        },
      ];
      // if (!query && !otherParams.sort) otherParams.sort = 'meta.updatedAt:desc';

      const result = await request.post<EntityQueryResponse<T>>(
        mesoorSpacePrefixUrl('/v3/entities/searches'),
        {
          ...otherParams,
          query,
          filters,
          returnFilters,
          current,
          pageSize,
          entityType,
          tenantId:
            entityType === 'JobOpportunities' ? process.env.NEXT_PUBLIC_MAIN_TENANT : undefined,
        },
        { handleResponseData: false, isMainTenant: entityType === 'JobOpportunities' },
      );

      return { ...result, filters: parseFilters(result.filters || [], 'search') };
    } catch (error) {
      return { data: [], total: 0 };
    }
  },

  /** 推荐 */
  async recommend(params: RecommendParams) {
    console.log('params', params);
    const {
      entityType,
      openId,
      current = 1,
      pageSize = 15,
      filters: requestFilters = [],
      ...otherParams
    } = params;

    const url =
      entityType === 'Job'
        ? `/v2/candidates/${openId}/recommended-jobs`
        : `/v2/jobs/${openId}/recommended-candidates`;

    const filters = parseFilters([...requestFilters], 'recommend');

    const result = await request.post<EntityQueryResponse>(
      mesoorSpacePrefixUrl(url),
      {
        current,
        pageSize,
        filters: [...filters],
        ...otherParams,
      },
      { handleResponseData: false },
    );

    return result;
  },

  async queryFilters(entityType: EntityModel.BusinessEntityType) {
    const result = await request.post<SearchModel.FilterValue[]>(
      mesoorSpacePrefixUrl('/v3/entities/searches/filters'),
      { entityType },
    );
    return result ? parseFilters(result, 'search') : [];
  },
  /** 查询字典 */
  async queryDictionary(id: DictionaryModel.DictionaryId) {
    return request.get<DictionaryModel.Dictionary>(
      mesoorSpacePrefixUrl(`/v2/entities/Dictionary/${id}`),
    );
  },

  async queryDetail<T extends EntityModel.EntityType = EntityModel.BusinessEntityType>({
    entityId,
    entityType,
  }: EntityQueryDetailParams<T>) {
    if (!entityId || !entityType) return Promise.reject();

    const path =
      entityType === 'JobOpportunities'
        ? `/v2/entity/${process.env.NEXT_PUBLIC_MAIN_TENANT}/${entityType}/${encodeURIComponent(
            entityId,
          )}`
        : `/v2/entities/${entityType}/${encodeURIComponent(entityId)}`;

    return request.get<
      T extends EntityModel.BusinessEntityType
        ? EntityModel.BusinessEntity<T>
        : SchemaEntity.SchemaEntity
    >(mesoorSpacePrefixUrl(path), undefined, { isMainTenant: entityType === 'JobOpportunities' });
  },

  /** @description 创建实体 */
  async create<T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType>({
    entityType,
    openId,
    schema,
    data,
    overwrite = false,
  }: EntityCreateParams<T>) {
    const apiUrl = generateUrl(mesoorSpacePrefixUrl(`/v2/entities/${entityType}`), {
      openId,
      schema,
    });
    try {
      if (overwrite) {
        const result = await request.put<EntityModel.BusinessEntity<T>>(apiUrl, data);
        return result;
      }
      const result = await request.post<EntityModel.BusinessEntity<T>>(apiUrl, data);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async patchEntity(
    entityType: EntityModel.BusinessEntityType,
    params: {
      data?: Record<string, any>;
      openId?: string;
    },
    options?: Partial<RequestOptions>,
  ) {
    if (!params.openId || !entityType) return Promise.reject();
    return request.patch(
      mesoorSpacePrefixUrl(`/v2/entities/${entityType}/${params.openId}`),
      params.data,
      {
        ...options,
        headers: {
          ['content-type']: `application/merge-patch-simple+json`,
        },
      },
    );
  },

  /** 获取短码 */
  async getShortCode(content: string) {
    if (!content) return Promise.reject();
    return request.get<string>(
      mesoorSpacePrefixUrl(`/v1/short-codes?content=${encodeURIComponent(content)}`),
    );
  },

  /** 获取 entity 的所有位置 */
  queryEntityLocations<T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType>({
    entityId,
    entityType,
  }: EntityQueryDetailParams) {
    if (!entityId || !entityType) return Promise.reject();
    return request.get<EntityLocationResponse<T>>(
      mesoorSpacePrefixUrl(`/v3/entities/${entityType}/${encodeURIComponent(entityId)}/projects`),
      {},
      { handleResponseData: false },
    );
  },

  /** @description 批量获取实体已经关联的task信息 */
  async queryAssociate({
    entityType,
    entityIds,
  }: {
    entityIds: string[];
    entityType: EntityModel.BusinessEntityType;
  }) {
    return request.get<Record<string, EntityModel.AssociatedInfo[]>>(
      mesoorSpacePrefixUrl(`/v3/entities/${entityType}/associate/tasks`),
      {
        entityType,
        openIds: entityIds[0],
      },
    );
  },
  /** 获取全量或批量实体信息，现主要用于获取全量系统用户 */
  queryAllEntities(params?: QueryAllEntitiesParams) {
    const defaultSelect =
      'data.standardFields.humanInfo.name,data.standardFields.humanInfo.avatar.*,data.standardFields.humanInfo.nickname,meta.*';
    const data = JSON.parse(
      JSON.stringify({
        openIds: params?.openIds?.join() || undefined,
        select: params?.select || defaultSelect,
      }),
    );
    return request.get<QueryAllEntitiesResponse>(
      mesoorSpacePrefixUrl(`/v2/entities/${params?.entityType ?? 'SystemEmployee'}`),
      data,
      {
        handleResponseData: false,
      },
    );
  },

  /** 获取实体评价 */
  queryEntityEvaluations({
    entityId,
    entityType,
    current = 1,
    pageSize = 10,
    self = false,
    payloadEntityType,
    payloadEntityId,
  }: QueryEntityEvaluationsParams) {
    const data = JSON.parse(
      JSON.stringify({ current, pageSize, self, payloadEntityType, payloadEntityId }),
    );
    return request.get<SearchModel.SearchResponse<EvaluationModel.Evaluation>>(
      mesoorSpacePrefixUrl(`/v1/entities/${entityType}/${entityId}/evaluation`),
      data,
      { handleResponseData: false },
    );
  },
  /** 评价实体 */
  createEvaluationOnEntity({
    entityId,
    entityType,
    entityReference,
    attachments,
    ...evaluation
  }: CreateEntityEvaluationParams) {
    return request.post<EvaluationModel.Evaluation>(
      mesoorSpacePrefixUrl(`/v1/entities/${entityType}/${entityId}/evaluation`),
      {
        entityReference,
        attachments,
        ...evaluation,
      },
    );
  },
  /** 修改实体评价 */
  updateEntityEvaluation({
    entityId,
    entityType,
    evaluationId,
    entityReference,
    ...evaluation
  }: UpdateEntityEvaluationParams) {
    return request.patch<EvaluationModel.Evaluation>(
      mesoorSpacePrefixUrl(`/v1/entities/${entityType}/${entityId}/evaluation/${evaluationId}`),
      {
        entityReference,
        ...evaluation,
      },
    );
  },
  /** 删除实体评价 */
  deleteEntityEvaluation({ entityId, entityType, evaluationId }: DeleteEntityEvaluationParams) {
    return request.delete(
      mesoorSpacePrefixUrl(`/v1/entities/${entityType}/${entityId}/evaluation/${evaluationId}`),
    );
  },

  /** 上传实体相关文件 */
  async upload<T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType>(
    { entityId, entityType, file, roles }: EntityUploadParams<T>,
    options?: EntityUploadOptions,
  ) {
    const apiUrl = generateUrl(mesoorSpacePrefixUrl(`/v3/entities/${entityType}/upload`), {
      openId: entityId,
      roles,
    });

    const formData = new FormData();
    const _file = new File([file], encodeURIComponent(file.name), { type: file.type });
    formData.append('file', _file);

    // 透传用于取消上传的 source
    // const source = axios.CancelToken.source();
    // options?.onBeforeUpload?.({ source });

    try {
      await request.upload(apiUrl, file, {
        handleResponseData: false,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

function parseFilters(filters: SearchModel.FilterValue[], mode: 'search' | 'recommend') {
  const res = filters;
  for (const f of filters) {
    if (f.key === 'all') continue;
    if (mode === 'recommend' && !f.key.startsWith('schema')) {
      f.key = `schema.${f.key}`;
    } else if (f.key.startsWith('schema')) {
      f.key = f.key.replace('schema.', '');
    }

    f.values = f.values
      .map((v) => (typeof v === 'object' && 'value' in v ? (v.value as string) : v))
      .filter(truthy);
  }

  return res;
}
