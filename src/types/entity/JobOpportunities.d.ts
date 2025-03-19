declare namespace JobOpportunitiesModel {
  type StandardFields = Partial<{
    link?: Common.NormalizedField.File;
    /**
     * 生成的名称，不是实际的名称
     */
    name?: string;
    /**
     * 标签
     */
    tags?: Common.NormalizedField.EntityTag[];
    /**
     * 标签
     */
    labels?: string[];
    /**
     * 来源
     */
    source?: string;
    /**
     * 公司
     */
    company?: string;
    /**
     * 招聘对象
     */
    targets?: string[];
    /**
     * 福利
     */
    benefits?: string[];
    /**
     * 工作地
     */
    locations?: Common.NormalizedField.Location[];
    /**
     * 行业
     */
    industries?: string[];
    /**
     * 描述
     */
    description?: string;
    salaryRange?: Common.NormalizedField.SalaryRange;
    /**
     * 母公司
     */
    parentCompany?: string;
    validityPeriod?: Common.NormalizedField.DateRange;
    hiringCountRange?: Common.NormalizedField.IntRange;
    /**
     * 技能要求
     */
    skillRequirements?: string[];
    /**
     * 学历要求
     */
    degreeRequirements?: Common.NormalizedField.Degree[];
    /**
     * 语言要求
     */
    languageRequirements?: string[];
    /**
     * 其他要求
     */
    additionalRequirements?: string[];
    /**
     * 证书要求
     */
    certificateRequirements?: ResumeModel.Resume.Certificate[];
    /**
     * 专业要求
     */
    professionalRequirements?: string[];
    workExperienceRequirement?: Common.NormalizedField.IntRange;
    /**
     * 政治面貌要求
     */
    politicalAffiliationRequirements?: string[];
  }>;

  type JobOpportunities = SchemaEntity.SchemaEntity<StandardFields>;
}
