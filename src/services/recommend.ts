import { request, mesoorSpacePrefixUrl } from '.';

export const recommendService = {
  async query<T extends EntityModel.BusinessEntityType = 'Job'>(
    params: SearchModel.SearchParams & {
      contextEntityType: EntityModel.BusinessEntityType;
      contextOpenIds: string[];
      targetEntityType: T;
    },
  ) {
    const filters = params.filters?.length ? params.filters : undefined;
    const sort = params.sort ? params.sort : undefined;
    return request.post<SearchModel.SearchResponse<EntityModel.BusinessEntity<T>>>(
      mesoorSpacePrefixUrl(`/v3/recommendations`),
      { ...params, filters, sort },
      { handleResponseData: false, isMainTenant: params.targetEntityType === 'JobOpportunities' },
    );
  },

  async queryFilters(params: {
    contextEntityType: EntityModel.BusinessEntityType;
    contextOpenIds: string[];
    targetEntityType: EntityModel.BusinessEntityType;
  }) {
    const result = await request.post<SearchModel.FilterOption[]>(
      mesoorSpacePrefixUrl('/v3/recommendations/filters'),
      { ...params },
    );

    return result ?? [];
  },
};
