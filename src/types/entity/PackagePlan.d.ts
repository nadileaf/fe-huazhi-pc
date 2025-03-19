declare namespace PackagePlanModel {
  type PackagePlan = SchemaEntity.SchemaEntity<StandardFields>;

  type PlanType = '补给卡' | '套餐';

  type StandardFields = Partial<{
    description: string;
    name: string;
    type: PlanType;
    icon: Common.NormalizedField.File;
    specifications: Specification[];
  }>;

  // 规格
  type Specification = {
    discountPrice: number; //折扣价
    entryIntoForceCycle: number; //生效周期/天
    key: string; //标识
    originalPrice: number; // 原价
    specificationDescription: string; //规格描述
    resources: Resource[];
  };

  //资源类型
  type Resource = {
    units: string;
    resourceName: string;
    resourceType:
      | 'ActiveJob'
      | 'ImChatInvite'
      | 'TenantMember'
      | 'BackgroundCheck'
      | 'Assessment'
      | 'VideoResume';
    enable: boolean;
    number: number;

    limitType: 'count_down' | 'period' | 'max_count'; //限制类型
    periodTime: 'day' | 'month'; // 周期时间
  };
}
