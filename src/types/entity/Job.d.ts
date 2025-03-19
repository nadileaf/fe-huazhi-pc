declare namespace JobModel {
  type Job = SchemaEntity.SchemaEntity<StandardFields>;

  type StandardFields = {
    jobType: '猎头业务职位' | '非猎头业务职位';
    headhunterRequestDetail?: HeadHunterRequestDetail;
    /**
     * 优先级
     */
    priority: '急招' | '一般' | '低';
    /**
     * 职位名称
     */
    name: string;
    /**
     * 发布招聘的公司
     */
    company?: string;
    /**
     * 职位关键词列表(职位发布者自己写的)
     */
    keywords?: string[];
    /**
     * 工作地点
     */
    locations?: Common.NormalizedField.Location[];
    /**
     * 职位类别列表
     */
    categories?: string[];
    /**
     * 发布招聘需求的部门
     */
    department?: string;
    /**
     * 薪资范围
     */
    salaryRange?: Common.NormalizedField.SalaryRange[];
    /**
     * 职位招聘性质
     */
    workTimeType?: string;
    publishedDate?: Common.NormalizedField.Date;
    /**
     * 任职资格描述
     */
    qualification?: string;
    /**
     * 年龄要求
     */
    ageRequirement?: Common.NormalizedField.IntRange;
    /**
     * 招聘人数
     */
    headCountRange?: Common.NormalizedField.IntRange;
    /**
     * 工作职责描述
     */
    responsibility?: string;
    validDateRange?: Common.NormalizedField.DateRange;
    /**
     * 学历要求
     */
    degreeRequirement?: Common.NormalizedField.Degree[];
    /**
     * 性别要求
     */
    genderRequirement?: Common.NormalizedField.Gender[];
    /**
     * 专业要求列表
     */
    majorRequirements?: string[];
    /**
     * 能力要求列表
     */
    skillRequirements?: string[];
    /**
     * 行业要求列表
     */
    industryRequirements?: string[];
    /**
     * 语言能力要求列表
     */
    languageRequirements?: string[];
    /**
     * 工作年限要求
     */
    workYearsRequirement?: Common.NormalizedField.IntRange;
    /**
     * 学校标签要求列表
     */
    schoolTagRequirements?: string[];
    /**
     * 工作经历要求
     */
    workExperienceRequirement?: string;
    geoPoint?: Common.NormalizedField.GeoPoint;
    benefits?: string[];
    attachments?: Common.NormalizedField.File[];
    channelLink?: string;
    companyReference?: Common.NormalizedField.EntityReference;
  };

  type HeadHunterStatus = '进展中' | '成功的' | '暂停的' | '已取消' | '失败的';

  type HeadHunterRequestDetail = Partial<{
    BDCreditDistributionDetail:
      | 'BD Credit 10%'
      | 'BD Credit 20%'
      | 'BD Credit 30%'
      | 'BD Credit 40%';
    performanceDistributionDetail: string;
    status: HeadHunterStatus;
    expectedPerformanceAmount: Common.NormalizedField.Currency;
    minimumCharge: Common.NormalizedField.Currency;
    partyA: Common.NormalizedField.EntityReference;
    projectChargeRatio: Common.NormalizedField.Percent;
  }>;
}
