declare namespace ResumeModel {
  type Resume = SchemaEntity.SchemaEntity<
    StandardFields,
    {
      backgroundChecks?: { taskId: string; file: Common.NormalizedField.File }[];
      assessments?: { taskId: string; file: Common.NormalizedField.File }[];
    }
  >;

  type StandardFields = Partial<{
    name: string;
    tags: Common.NormalizedField.EntityTag[];
    works: Work[];
    awards: Award[];
    skills: Skill[];
    interns: Work[];
    comments: Comment[];
    projects: Project[];
    humanInfo: HumanInfo;
    languages: Language[];
    trainings: Training[];
    activities: Activity[];
    educations: Education[];
    researches: Research[];
    contactInfo: ContactInfo;
    certificates: Certificate[];
    expectations: Expectation[];
    selfEvaluation: string;
    currentJobStatus: CurrentJobStatus[];
    source?: string;
  }>;

  type Work = {
    /**
     * 持续月数
     */
    months: number;
    /**
     * 职位名称
     */
    jobNames?: string[];
    dateRange: Common.NormalizedField.DateRange;
    /**
     * 是否为海外经历
     */
    isOversea: boolean;
    /**
     * 工作地点
     */
    locations: Common.NormalizedField.Location[];
    /**
     * 国家名称
     */
    nationName: string;
    /**
     * 工作业绩描述
     */
    achievement: string;
    companyName: string;
    companySize: number;
    companyType: string;
    /**
     * 工作内容描述
     */
    description: string;
    salaryRange: Common.NormalizedField.SalaryRange;
    /**
     * 职位级别名称
     */
    jobLevelName: string;
    /**
     * 行业名称
     */
    industryNames: string[];
    /**
     * 离职原因描述
     */
    leavingReason: string;
    /**
     * 工作职责描述
     */
    responsibility: string;
    departmentNames: string[];
    /**
     * 工作性质名称
     */
    jobPropertyName: string;
    /**
     * 下属人数
     */
    subordinateNumber: number;
    /**
     * 公司简介
     */
    companyDescription: string;
    /**
     * 公司融资阶段名称
     */
    companyFinancialStageName: string;
  };

  type Award = {
    date: Common.NormalizedField.Date;
    /**
     * 奖励名称
     */
    name: string;
    /**
     * 获奖级别名称
     */
    levelName: string;
    /**
     * 颁发机构名称
     */
    agencyName: string;
    /**
     * 获奖内容描述
     */
    description: string;
  };

  type Skill = Partial<{
    /**
     * 技能名称
     */
    name: string;
    /**
     * 使用月数
     */
    months: number;
    /**
     * 掌握程度名称
     */
    levelName: string;
    /**
     * 技能描述
     */
    description: string;
  }>;

  type Comment = {
    /**
     * 备注日期
     */
    date: string;
    /**
     * 备注内容
     */
    content: string;
    /**
     * 备注人姓名
     */
    userAccount: string;
  };

  type Project = {
    /**
     * 项目名称
     */
    name: string;
    jobNames: string[];
    dateRange: Common.NormalizedField.DateRange;
    locations: Common.NormalizedField.Location[];
    /**
     * 项目成果描述
     */
    achievement: string;
    /**
     * 单位名称
     */
    companyName: string;
    /**
     * 项目描述
     */
    description: string;
    /**
     * 项目职责描述
     */
    responsibility: string;
    /**
     * 项目软件环境描述
     */
    softwareEnvironment: string;
  };

  type HumanInfo = Partial<{
    age: string;
    /**
     * 姓名
     */
    name: string;
    /** 昵称 */
    nickname: string;
    avatar?: Common.NormalizedField.File;
    height: string;
    weight: string;
    /**
     * 民族名称
     */
    ethicName: string;
    genderName: string;
    idDocument: Identification;
    /**
     * 姓名拼音
     */
    namePinYin: string;
    dateOfBirth: Common.NormalizedField.Date;
    maritalName: string;
    /**
     * 血型名称
     */
    bloodTypeName: string;
    /**
     * 曾用名
     */
    nameUsedBefore: string;
    /**
     * 国籍名称
     */
    nationalityName: string;
    ancestralResidence: Common.NormalizedField.Location;
    /**
     * 政治面貌名称
     */
    politicalStatusName: string;
    registeredPermanentResidence: Common.NormalizedField.Location;
    workMonths: number;
    /**
     * 最高学历
     */
    highestEducationLevel: string;
  }>;

  type Identification = {
    /**
     * 证件号
     */
    code: string;
    /**
     * 证件名称
     */
    name: '身份证' | '护照' | '军官证' | null | '';
  };

  type Language = {
    /**
     * 语言类型名称
     */
    name: string;
    /**
     * 掌握程度名称
     */
    levelName: string;
    /**
     * 考试成绩描述
     */
    scoreDescription: string;
    /**
     * 证书等级名称
     */
    certificateLevelName: string;
    /**
     * 读写水平名称
     */
    readingWritingAbilityName: string;
    /**
     * 听说水平名称
     */
    listeningSpeakingAbilityName: string;
  };

  type Training = {
    /**
     * 培训名称
     */
    name: string;
    /**
     * 培训地点
     */
    location: string;
    dateRange: Common.NormalizedField.DateRange;
    /**
     * 培训机构名称
     */
    agencyName: string;
    /**
     * 培训总课时
     */
    totalHours: number;
    /**
     * 课程名称一览
     */
    coursesName: string;
    /**
     * 培训内容描述
     */
    description: string;
    /**
     * 证书名称
     */
    certificateName: string;
  };

  type Activity = {
    /**
     * 实践名称
     */
    name: string;
    dateRange: Common.NormalizedField.DateRange;
    /**
     * 实践内容描述
     */
    description: string;
    /**
     * 职位名称
     */
    positionName: string;
  };

  type Education = {
    dateRange: Common.NormalizedField.DateRange;
    /**
     * 是否为最高学历
     */
    isHighest: boolean;
    /**
     * 是否为海外经历
     */
    isOversea: boolean;
    /**
     * 是否为第一学历
     */
    isPrimary: boolean;
    locations: Common.NormalizedField.Location[];
    degree?: Common.NormalizedField.Degree;
    majorNames?: string[];
    /**
     * 学校名称
     */
    schoolName?: string;
    schoolTags?: string[];
    courseNames?: string[];
    academyNames?: string[];
    /**
     * 专业或研究方向描述
     */
    majorDescription: string;
    /**
     * 培养方式名称
     */
    trainingModeName: string;
    /**
     * 是否为统招
     */
    isUnifiedEntrance: string;
    /**
     * 专业类别名称
     */
    majorCategoryName: string;
    /**
     * 学位名称
     */
    educationLevelName: string;
    /**
     * 学习形式名称
     */
    formsOfLearningName: string;
  };

  type Research = {
    /**
     * 论文专著标题
     */
    title: string;
    /**
     * string  作者顺序
     */
    orderOfAuthor: string;
    publishedDate: Common.NormalizedField.Date;
    /**
     * 期刊名称
     */
    periodicalName: string;
    /**
     * 年度/期次
     */
    periodicalNumber: number;
  };

  type ContactInfo = Partial<{
    /**
     * qq账号
     */
    qqID: string;
    emails: string[];
    /**
     * 当前居住地
     */
    address: Common.NormalizedField.Location;
    /**
     * 邮政编码
     */
    zipCode: string;
    /**
     * 微信账号
     */
    wechatID: string;
    /**
     * 家庭电话号码
     */
    homePhoneNumber: string;
    /**
     * 固定电话号码
     */
    telephoneNumber: string;
    /**
     * 工作电话
     */
    workPhoneNumber: string;
    /**
     * 手机号码
     */
    mobilePhoneNumber: string;
    /**
     * 虚拟手机号码
     */
    virtualPhoneNumber: string;
    /**
     * 手机号码类型
     */
    mobilePhoneNumberType: string;
    personalEmail: string;
    workEmail: string;
  }>;

  type Certificate = {
    date: Common.NormalizedField.Date;
    /**
     * 证书/考试名称
     */
    name: string;
    /**
     * 证书/考试描述
     */
    description: string;
    attachments: Common.NormalizedField.File[];
    source: string;
  };

  type Expectation = Partial<{
    /**
     * 期望职位名称列表
     */
    jobNames: string[];
    /**
     * 期望工作城市列表
     */
    locations: Common.NormalizedField.Location[];
    /**
     * 到岗时间描述
     */
    entrantDate: string;
    salaryRange: Common.NormalizedField.SalaryRange;
    /**
     * 期望单位类型名称列表
     */
    companyTypes: string[];
    /**
     * 期望行业名称列表
     */
    industryNames: string[];
    /**
     * 期望工作性质名称列表
     */
    workTypeNames: string[];
    /** 一周工作时长 */
    workDuration: Common.NormalizedField.Quantity;
    /** 工作时间：工作日白天、工作日晚上、周末 */
    workSchedulePreferences: string[];
    /** 合作形式（多选）：线上、同城线下 */
    workModes: string[];
  }>;

  type CurrentJobStatus = Partial<{
    status: string;
    /**
     * 单位名称
     */
    companyName: string;
    /**
     * 当前薪资范围
     */
    salaryRange: Common.NormalizedField.SalaryRange;
    /**
     * 行业名称
     */
    industryName: string;
    /**
     * 职位名称
     */
    positionName: string;
    /**
     * 工作地点
     */
    workLocation: Common.NormalizedField.Location;
    /**
     * 工作状态名称
     */
    situationName: string;
    /**
     * 是否有海外工作经验
     */
    hasOverseaWork: boolean;
    /**
     * 职称名称
     */
    professionalTitleName: string;
  }>;
}
