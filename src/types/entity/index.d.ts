declare namespace EntityModel {
  type EntityType = BasicEntityType | BusinessEntityType;

  type BasicEntityType = 'Project' | 'HydrogenTask' | 'Dictionary';

  /** @description 业务实体类型 */
  type BusinessEntityType =
    | 'SystemEmployee'
    | 'Job'
    | 'Resume'
    | 'Company'
    | 'Customer'
    | 'BusinessPartner'
    | 'Invoice'
    | 'Contract'
    | 'Generic'
    | 'Shop'
    | 'NationalBanner'
    | 'SquareBanner'
    | 'ShortCode'
    | 'IMInfo'
    | 'Demand'
    | 'PackagePlan'
    | 'Course'
    | 'PinPinCloudEvaluation'
    | 'BackgroundCheck'
    | 'JobOpportunities'
    | 'Training';

  type BusinessEntityMap = {
    Resume: ResumeModel.Resume;
    Job: JobModel.Job;
    BusinessPartner: BusinessPartnerModel.BusinessPartner;
    SystemEmployee: SystemEmployeeModel.SystemEmployee;
    Demand: DemandModel.Demand;
    PackagePlan: PackagePlanModel.PackagePlan;
    JobOpportunities: JobOpportunitiesModel.JobOpportunities;
    Training: TrainingModel.Training;
    Company: CompanyModel.Company;
  };

  /** @description 素材库实体信息,继承自SchemaEntity */
  type BusinessEntity<T extends BusinessEntityType = BusinessEntityType> =
    T extends keyof BusinessEntityMap ? BusinessEntityMap[T] : SchemaEntity.SchemaEntity;

  /** @description 素材库实体基础数据 */
  type BusinessEntityBasicInfo = {
    entityType: BusinessEntityType;
    name: string;
  };

  /** @description 素材库实体关联结构数据 */
  type BusinessEntityPayload<T extends BusinessEntityType = BusinessEntityType> = {
    openId: string;
    payload?: BusinessEntity<T>;
  } & BusinessEntityBasicInfo;

  /** @description 实体已经关联的项目信息 */
  type AssociatedInfo = {
    entityName: string;
    entityType: BusinessEntityType;
    entityId: string;
    taskId: string;
    spaceId: string;
    spaceName: string;
    channelId: string;
    channelName: string;
    projectId: string;
    projectName: string;
    stageId: string;
    flowStage: ChannelFlowModel.FlowStage;
  };
}
