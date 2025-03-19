declare namespace TaskModel {
  type TaskStage = {
    assignee?: {
      openId?: string;
    };
    // slice?: {
    //   carryFields?: SchemaEntity.SchemaFields;
    //   signer?: string;
    //   updateAt?: Common.DateType;
    // };
    rank?: number;
    invalid?: boolean;
    stageId: string;
    stageName: string;
    stage: ChannelFlowModel.FlowStage;
    slice?: { carryFields: Common.AnyFields; signer: string; updateAt: Common.DateType };
  };

  type Task<T extends EntityModel.BusinessEntityType = EntityModel.BusinessEntityType> = {
    customFields?: Common.AnyFields;
    description?: string;
    title?: string;
    /** 分组 Id */
    groupInfo?: Record<string, string>;
    meta: SchemaEntity.Meta;
    permissions?: ChannelRoleModel.Permission[];
    tags: Common.NormalizedField.EntityTag[];
    project: EntityModel.BusinessEntityPayload;
    taskPayload?: EntityModel.BusinessEntityPayload<T>;
    taskPayloadType?: EntityModel.BusinessEntityBasicInfo;
    current: TaskStage & { parentName?: string };
    history: TaskStage[];
    extendData: SchemaEntity.SchemaEntity['data']['extraData'];
    watcher?: { openId: string; entityType: 'TenantMember' }[];
  };
}
