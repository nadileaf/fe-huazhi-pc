declare namespace SchemaEntity {
  /** @description 通用的meta信息 */
  type Meta = {
    openId: string;
    /** 创建时间 */
    createdAt?: Common.DateType;
    /** 创建人Id */
    createdBy?: string;
    /** 更新时间 */
    updatedAt?: Common.DateType;
    /** 更新人Id */
    updatedBy?: string;
    standardSchema?: string;
    customSchema?: string;
    source?: string;
    status?: import('@/models/entity').EntityStatus;
    [k: string]: any;
  };

  type BasicStandardFields = Partial<{
    name: string;
    description: string;
    tags: Common.NormalizedField.EntityTag[];
  }>;

  type BasicCustomFields = Partial<{
    /** 收藏 */
    userFavorite?: string[];
    favorites?: {
      openId: string;
      entityType: EntityModel.BusinessEntityType;
    }[];
  }>;

  type RawData = {
    files?: Common.NormalizedField.File[];
    /** 半结构化数据（通过连接器导入，来自上游系统） */
    externalContent?: AnyFields;
  };

  type AnyFields = Record<string, any>;

  /** @description 基于Schema的entity  */
  type SchemaEntity<S = AnyFields, C = AnyFields, R = AnyFields> = {
    meta: Meta;
    data: {
      customFields?: BasicCustomFields & C;
      standardFields: BasicStandardFields & S;
      rawData?: RawData & R;
      /* FunctionFields TODO: 知识图谱*/
      functionFields?: AnyFields;
      managedFields?: {
        /** TODO 等级信息 */
        level?: Common.NormalizedField.EntityReference<UserLevelModel.StandardFields>;
        /** 评价信息 */
        evaluationInfo?: EvaluationInfo;

        entityRelated?: {
          /** 关联的项目 */
          projects?: { projectId: string; taskPayloadType: EntityModel.BusinessEntityType }[];
          /** 关联的任务 */
          hydrogenTasks?: {
            hydrogenTaskId: string;
            projectId: string;
            projectPayload: Common.NormalizedField.EntityReference;
            stageId: string;
            stageName: string;
          }[];
        };
      };
      extraData?: {
        score?: number;
        ratings?: RatingPerspective[];
        recommendReason: string;
        jobCount?: number;
        distance: string;
        description: string;
        priority: Common.Priority;
        startTime?: Common.DateType;
        timeoutTime?: Common.DateType;
      };
    };
  };

  type EvaluationInfo = {
    /** 平均分 */
    averageRating?: number;
    /** 评价累计总分 */
    cumulativeRatingScore?: number;
    /** 评价总数 */
    totalEvaluationCount?: number;
    /** 差评率 */
    negativeEvaluationRate?: number;
    /** 好评率 */
    positiveEvaluationRate?: number;
    /** 差评数量 */
    negativeEvaluationCount?: number;
    /** 好评数量 */
    positiveEvaluationCount?: number;
  };

  type FunctionFields = {
    /** 知识图谱 */
    educations?: KGModel.Education[];
    works?: KGModel.Business[];
    interns?: KGModel.Business[];
  };

  type RatingPerspective = {
    description: string;
    title: string;
    rating: Common.NormalizedField.Rating;
    comments: { text: string; aspect: string }[];
  };
}
