declare namespace ProjectModel {
  /** @description 实体类型 */
  type RecommendProjectType = 'JobToResume' | 'ResumeToJob';

  /** @description 项目 */
  type Project<T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType> = {
    meta: SchemaEntity.Meta;
    channelTemplate?: { openId: string };
    name: string;

    members?: UserModel.SimpleUser[];
    principalId: string;
    principal?: UserModel.SimpleUser;
    customFields: any;

    channel: {
      openId: string;
      name: string;
    };

    projectPayload?: EntityModel.BusinessEntityPayload<T>;
    projectPayloadType?: EntityModel.BusinessEntityBasicInfo;
    taskPayloadType?: EntityModel.BusinessEntityBasicInfo;
    flowStages: ChannelFlowModel.FlowStageOption[];

    priority?: Common.Priority;
    description?: string;
    startTime?: Common.DateType;
    timeoutTime?: Common.DateType;

    tags: TagModel.EntityTag[];
    templateId?: string;

    /** 分组 Id */
    groupInfo?: Record<string, string>;
    /** 连接器space下存在的映射记录 */
    pipelines?: { openId: string }[];
  };
}
