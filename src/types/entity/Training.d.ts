declare namespace TrainingModel {
  type Training = SchemaEntity.SchemaEntity<StandardFields>;

  type StandardFields = {
    /**
     * 培训模式
     */
    mode?: '线上' | '现场' | '其他';
    cover?: Common.NormalizedField.File;
    /**
     * 课程价格
     */
    price?: number;
    /**
     * 课程收益
     */
    benefit?: string;
    /**
     * 课程章节
     */
    chapters?: {
      /**
       * 章节名字
       */
      name?: string;
      /**
       * 章节资料
       */
      materials?: Common.NormalizedField.File[];
    }[];
    /**
     * 课程来源
     */
    sources?: string[];
    /**
     * 分类
     */
    category?: string[];
    /**
     * 课程大纲
     */
    syllabus?: string;
    /**
     * 课程背景
     */
    background?: string;
    /**
     * 课程目的
     */
    objectives?: string;
    /**
     * 其他资料
     */
    attachments?: Common.NormalizedField.File[];
    /**
     * 课件
     */
    coursewares?: Common.NormalizedField.File[];
    /**
     * 培训描述
     */
    description?: string;
    /**
     * 课程对象
     */
    targetAudiences?: string[];
    /**
     * 课程介绍图
     */
    introductionAttachments?: Common.NormalizedField.File[];
    /** 课程讲师 */
    courseLecturer: string;
    /** 课程讲师介绍 */
    courseLecturerProfile: string;
  };
}
