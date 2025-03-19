import { mesoorSpacePrefixUrl, request } from '.';

type ViewGroupBy = 'flow' | 'principal' | 'time' | 'tag';
type ViewOrdering = 'asc' | 'desc';

export type QueryProjectsParams = Partial<
  SearchModel.SearchParams<
    SearchModel.BasicSearchParams & {
      channelTemplateId: string;
      groupBy: ViewGroupBy;
      ordering: ViewOrdering;
      keyWords: string;
      searchRanges: string[];
    }
  >
>;

export type ProjectRecommendListResponse =
  SearchModel.SearchResponse<EntityModel.BusinessEntity> & {
    type: ProjectModel.RecommendProjectType;
  };

export const projectService = {
  async query<T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType>(
    params: QueryProjectsParams,
  ) {
    const {
      channelTemplateId = 'recruitment-management',
      groupBy = 'flow',
      searchRanges = [],
      sort = 'meta.updatedAt:desc',
      current = 1,
      pageSize = 20,
      ...others
    } = params;

    const result = await request.post<SearchModel.SearchResponse<ProjectModel.Project<T>>>(
      mesoorSpacePrefixUrl(`/v1/memory-searches/projects?view=list`),
      {
        ...others,
        channelTemplateId,
        groupBy,
        searchRanges,
        sort,
        current,
        pageSize,
      },
      { handleResponseData: false },
    );

    result.data.forEach(
      (item) =>
        item.groupInfo?.flowGroupId &&
        (item.groupInfo.flowGroupId = item.channel.openId + '_' + item.groupInfo.flowGroupId),
    );

    return result;
  },
  queryDetail({ projectId }: { projectId: string }) {
    return request.get<ProjectModel.Project>(mesoorSpacePrefixUrl(`/v2/projects/${projectId}`));
  },
  queryProjectBasicInfo(projectId: string) {
    try {
      return request.get<{ projectId: string; projectName?: string }>(
        mesoorSpacePrefixUrl(`/v2/spaces/space-trees/base-info`),
        {
          openId: projectId,
          entityType: 'Project',
        },
      );
    } catch (error) {
      console.log(error);
    }
  },
  async recommendList(params: SearchModel.SearchParams, { projectId }: { projectId: string }) {
    const { type, ...others } = await request.post<ProjectRecommendListResponse>(
      mesoorSpacePrefixUrl(`/v2/projects/${projectId}/recommended-entities?filterFlow=true`),
      params,
      { handleResponseData: false },
    );

    const entityType: EntityModel.BusinessEntityType = type === 'JobToResume' ? 'Resume' : 'Job';
    return { entityType, ...others };
  },
};
