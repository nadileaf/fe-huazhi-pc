declare namespace SystemEmployeeModel {
  type SystemEmployee = SchemaEntity.SchemaEntity<StandardFields>;

  type StandardFields = ResumeModel.StandardFields & {
    employeeInfo?: EmployeeInfo;
    /** 附件 */
    attachments: Common.NormalizedField.File[];
    academicPerformance?: { averageGPA: number; topPercentage: number };
    evaluationReports?: Common.NormalizedField.File[];
  };

  type EmployeeInfo = Partial<{
    id: string;
    /** 入职日期 */
    hireDate: string;
    /** 关注的信息 */
    concernInfo: ConcernInfo;
    /** 当前的职位信息 */
    currentPosition: CurrentPosition;
  }>;

  type ConcernInfo = Partial<{
    /** 行业 */
    industries: string[];
    /** 职能 */
    categories: string[];
  }>;

  type CurrentPosition = Partial<{
    /**
     * 职位名字
     */
    jobName?: string;
    /**
     * 团队名字
     */
    teamName?: string;
    /**
     * 公司名字
     */
    companyName?: string;
  }>;
}
