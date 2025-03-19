import { mesoorSpacePrefixUrl, request } from '.';
import { useAuthStore } from '@/stores/auth';
import type { RequestOptions } from '@/utils/request';

export type ViewGroupBy = 'flow' | 'principal' | 'time' | 'tag';
type ViewOrdering = 'asc' | 'desc';
type ViewSearchHierarchyType = 'channel' | 'project' | 'flow';

export type QueryTasksRes<
  T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType,
> = {
  data: TaskModel.Task<T>[];
  total: number;
};

export type CreateRecruitTaskParams = {
  jobId: string;
  recruiterUserId: string;
  resumeId: string;
  candidateUserId: string;
};

export type GroupData = {
  name: string;
  count: number;
  id: string;
  ordered: number;
  color?: string;
  parent?: string;
  parentName?: string;
  subGroups?: GroupData[];
} & (
  | { type: 'flow'; extra?: ChannelFlowModel.FlowStage }
  // | { type: 'principal'; extra?: UserModel.User }
  | { type: 'time'; extra?: unknown }
  | { type: 'tag'; extra?: unknown }
);

export type BoardViewGroups = GroupData[];

export type View = 'board' | 'list';

export type QueryTasksParams = Partial<
  SearchModel.SearchParams<{
    viewHistory: boolean;
    projectId: string;
    groupBy: ViewGroupBy;
    /** board 视图需要 */
    groupId: string;
    groupName: string;
    keyWords: string;
    searchRanges: string[];
    sortBy: string;
    ordering: ViewOrdering;
    /** 筛选条件，如负责人 */
    filters: SearchModel.FilterValue[];
    pointer?: string;
    appendPointer?: Record<string, string>;
    op?: 'and' | 'or';
    /** 搜索的层级 */
    searchHierarchyType: ViewSearchHierarchyType;
    skip: number;
    limit: number;
    view: View;
    checkPermission?: boolean;
  }>
>;

export type TaskCreateParams = {
  projectId?: string;
  projectPayloadOpenId?: string;
  projectPayloadType?: EntityModel.BusinessEntityType;
  tagLibraryIds?: string[];
  taskPayloadOpenId?: string;
  taskPayloadType?: EntityModel.BusinessEntityType;
  stageId?: string;
};

export type TaskModifyParams = {
  taskId: string;
  priority?: Common.Priority;
  startTime?: Common.DateType;
  timeoutTime?: Common.DateType;
  assignId?: string;
  stageId?: string;
  watcher?: TaskModel.Task['watcher'];
};

export const taskService = {
  async query<T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType>(
    params: QueryTasksParams,
  ) {
    const {
      groupBy = 'flow',
      searchRanges = [],
      sortBy = 'meta.updatedAt:desc',
      current = 1,
      pageSize = 15,
      ...others
    } = params;

    try {
      const url = `/v2/memory-searches`;
      const result = await request.post<QueryTasksRes<T>>(
        mesoorSpacePrefixUrl(url),
        { ...others, groupBy, searchRanges, sortBy, current, pageSize, entityType: 'HydrogenTask' },
        { handleResponseData: false },
      );
      return result;
    } catch (error) {
      return { data: [], total: 0 } as QueryTasksRes<T>;
    }
  },

  async queryGroups(params: QueryTasksParams) {
    const {
      groupBy = 'flow',
      searchRanges = [],
      sortBy = 'meta.updatedAt:desc',
      current = 1,
      pageSize = 15,
      ...others
    } = params;

    const groups = await request.post<BoardViewGroups>(
      mesoorSpacePrefixUrl(`/v2/memory-searches/tasks/groups?view=board`),
      {
        ...others,
        groupBy,
        searchRanges,
        sortBy,
        current,
        pageSize,
      },
    );

    return groups;
  },

  async queryDetail<T extends EntityModel.BusinessEntityType>(taskId: string) {
    if (!taskId) return Promise.reject();
    return request.get<TaskModel.Task<T>>(mesoorSpacePrefixUrl(`/v3/tasks/${taskId}`));
  },

  // 创建流程
  async create(params: TaskCreateParams) {
    const result = await request.post<TaskModel.Task>(mesoorSpacePrefixUrl(`/v3/tasks`), params);
    return result;
  },

  async updateTask({ taskId, ...rest }: TaskModifyParams, option?: Partial<RequestOptions>) {
    return request.put(mesoorSpacePrefixUrl(`/v3/tasks/${taskId}`), rest, option);
  },

  async updateFlowStage({ stageName, taskId }: { stageName: string; taskId: string }) {
    return request.patch(mesoorSpacePrefixUrl(`/v3/tasks/${taskId}/stages`), { stageName });
  },

  async queryDemandsByIM(toUserId?: string) {
    try {
      const { user } = useAuthStore.getState();
      const data = await request.post<EntityModel.BusinessEntity<'Demand'>[]>(
        mesoorSpacePrefixUrl(`/v2/memory-searches`),
        {
          entityType: 'HydrogenTask',
          filters: [
            {
              key: 'data.standardFields.channelTemplate.openId',
              op: 'Is',
              values: ['DemandToSystemEmployee'],
            },
            {
              key: 'data.standardFields.project.payload.data.standardFields.projectPayload.payload.meta.createdBy',
              op: 'In',
              values: [user?.userId, toUserId],
            },
            {
              key: 'data.standardFields.taskPayload.openId',
              op: 'In',
              values: [user?.userId, toUserId],
            },
          ],
          select: [
            'data.standardFields.project.payload.data.standardFields.projectPayload.payload.*',
          ],
          pointer:
            '/data/standardFields/project/payload/data/standardFields/projectPayload/payload',
        },
        {},
      );
      return data;
    } catch (error) {
      return [];
    }
  },
  async queryTaskByPayloadId(projectId: string, taskPayloadOpenId: string) {
    const res = await request.post<
      SearchModel.SearchResponse<
        SchemaEntity.SchemaEntity<{
          taskId: string;
          stageId: string;
          stageName: string;
        }>
      >
    >(
      mesoorSpacePrefixUrl(`/v2/memory-searches`),
      {
        entityType: 'HydrogenTask',
        filters: [
          { key: 'data.standardFields.project.openId', values: [projectId] },
          {
            key: 'data.standardFields.taskPayload.openId',
            values: [taskPayloadOpenId],
          },
        ],
        pageSize: 10000,
        sort: 'meta.updatedAt:desc',
        pointer: '/',
        appendPointer: {
          taskId: '/meta/openId',
          stageId: '/data/standardFields/current/stageId',
          stageName: '/data/standardFields/current/stageName',
        },
      },
      { handleResponseData: false },
    );
    return res?.data?.[0]?.data?.standardFields;
  },
};
