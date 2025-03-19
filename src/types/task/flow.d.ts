declare namespace ChannelFlowModel {
  /** @description 流程阶段配置信息 */
  type FlowStageOption = {
    name: string;
    editable: boolean;
    color: string;
    category: FlowStageCategory;
  };

  /** @description 任务下的流程信息 */
  type FlowStage = {
    id: string;
    name: string;
    type: string;
    extend: {
      category: FlowStageCategory;
      color: string;
    };
    // carryFieldsSchema?: SchemaEntity.Schema;
    rank: number;
    deleted: boolean;
    parent?: string;
    parentName?: string;
    subStages?: FlowStage[];
  };

  /** @description 流程分类 */
  type FlowStageCategory = 'active' | 'fail' | 'success';

  /** @description 流程日志 */
  type FlowLog = {
    stageId: string;
    stageStatusId: string;
    stageName: string;
    stageColor: string;
    createdAt: Common.DateType;
    updatedAt: Common.DateType;
    userInfo: User.UserProfile;
    createdAt: Common.DateType;
  };
}
