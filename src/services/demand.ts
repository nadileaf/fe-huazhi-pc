import { mesoorSpacePrefixUrl, request } from '.';

export const demandService = {
  async create(demand: DemandModel.Demand['data']) {
    const result = await request.post<DemandModel.Demand>(
      mesoorSpacePrefixUrl(`/entity-approval/v3/entities/Demand`),
      demand,
      {
        handleResponseData: false,
      },
    );
    return result;
  },

  async update(entityId: string, entity: DemandModel.Demand['data']) {
    const result = await request.patch<DemandModel.Demand>(
      mesoorSpacePrefixUrl(`/entity-approval/v3/entities/Demand/${entityId}`),
      entity,
      {
        handleResponseData: false,
        headers: {
          ['content-type']: 'application/merge-patch+json',
        },
      },
    );
    return result;
  },
};
