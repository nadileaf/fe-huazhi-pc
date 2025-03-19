const studentFeatures = {
  学生中心: {
    学生数据管理: [
      {
        label: '学生数据标准模版批量导入/导出',
        standard: '500条',
        major: '1000条',
        flagship: '3000条',
      },
      { label: '学生数据简历解析导入', standard: '500条', major: '1000条', flagship: '3000条' },
      { label: '学生数据自定义模版或APi对接', standard: true, major: true, flagship: true },
      { label: '学生数据编辑维护', standard: true, major: true, flagship: true },
    ],
    学生一人一档: [
      { label: '学生看板模块', standard: true, major: true, flagship: true },
      { label: '学生测评/背调报告聚合展示看板', standard: true, major: true, flagship: true },
      {
        label: '学生数据智能搜索',
        standard: '支持10项系统筛选项',
        major: '支持20项系统筛选项',
        flagship: '支持系统+自定义筛选项',
      },
    ],
  },
  职业规划助手: {
    职业发展测评: [
      { label: '职业性格测评', standard: '1000人次', major: '2000人次', flagship: '5000人次' },
      { label: '职业兴趣测评', standard: '1000人次', major: '2000人次', flagship: '5000人次' },
      { label: '任职风险测评', standard: false, major: '2000人次', flagship: '5000人次' },
      { label: '特定岗位职业能力测评', standard: false, major: '2000人次', flagship: '5000人次' },
      { label: '管理胜任力测评', standard: false, major: false, flagship: true },
    ],
    背景调查评估: [
      {
        label: '应届生校招背调评估报告',
        standard: false,
        major: '300人次',
        flagship: '1000人次',
      },
    ],
    职业洞察: [
      { label: '岗位胜任力查询智能体', standard: true, major: true, flagship: true },
      { label: '个性化职位规划智能体', standard: true, major: true, flagship: true },
    ],
  },
  求职助手: {
    AI简历优化: [{ label: '简历诊断与优化智能体', standard: true, major: true, flagship: true }],
    人岗匹配: [
      {
        label: '校企合作职位投递',
        standard: true,
        major: true,
        flagship: true,
      },
      {
        label: '校企合作职位智能推荐与邀约',
        standard: true,
        major: true,
        flagship: true,
      },
    ],
    AI模拟面试: [
      {
        label: '定制岗位模拟面试千人千面面试结果分析',
        standard: true,
        major: true,
        flagship: true,
      },
    ],
  },
  AI工具箱: {
    学习伴侣: [{ label: '学生学习辅助工具', standard: '3个', major: '6个', flagship: '15个' }],
    教学助手: [
      {
        label: '教师职业教育教学工具',
        standard: '3个',
        major: '6个',
        flagship: '15个',
      },
    ],
    健康辅导: [
      {
        label: '学生心理干预辅导工具',
        standard: true,
        major: true,
        flagship: true,
      },
    ],
    趣味工具: [
      {
        label: '趣味性AI问答工具',
        standard: true,
        major: true,
        flagship: true,
      },
    ],
    个性化工具: [
      {
        label: '定制学校校规/制度智能问答工具',
        standard: false,
        major: false,
        flagship: '1个',
      },
      {
        label: '萃取明星教师问答工具',
        standard: false,
        major: false,
        flagship: '1门课或10万字材料萃取',
      },
    ],
  },
};

const schoolFeatures = {
  专属校招入口: {
    学校logo: [
      { label: 'PC网站展示学校logo', standard: true, major: true, flagship: true },
      { label: 'PC网站展示学校logo', standard: true, major: true, flagship: true },
    ],
    全网热门职位: [
      {
        label: '适合学生投递的全网优质职位收集',
        standard: '支持搜索',
        major: '支持搜索+细分频道专区',
        flagship: '支持搜索+细分频道专区',
      },
      {
        label: '学校活动Banner投放',
        standard: true,
        major: true,
        flagship: true,
      },
    ],
  },
  智慧管理: {
    综合仪表盘: [
      { label: '学生端仪表盘（支持7张报表）', standard: true, major: true, flagship: true },
      { label: '就业进度仪表盘（支持10张报表）', standard: true, major: true, flagship: true },
    ],
    自动化管理机器人: [
      {
        label: '解决多场景的人工重复操作，提升管理老师工作效能',
        standard: '每月500次',
        major: '每月2000次',
        flagship: '每月10000次',
      },
    ],
    学生进度管理: [
      {
        label: '展示学生所有动态关联任务',
        standard: true,
        major: true,
        flagship: true,
      },
      {
        label: '展示学生所有动态/备注/日志',
        standard: true,
        major: true,
        flagship: true,
      },
    ],
    校企合作管理: [
      {
        label: '企业HR角色权限管理',
        standard: true,
        major: true,
        flagship: true,
      },
      {
        label: '企业职位进度管理',
        standard: true,
        major: true,
        flagship: true,
      },
      {
        label: '企业职位智能匹配本校学生发起邀约',
        standard: true,
        major: true,
        flagship: true,
      },
      {
        label: '企业职位进度自动通知学生',
        standard: true,
        major: true,
        flagship: true,
      },
    ],
  },
  招聘会: {
    线上线下联动: [
      {
        label:
          '线下扫码进入小程序完成招聘投递和面试邀约，线上实时统计进展追踪闭环（分场次和时间段出报表）',
        standard: true,
        major: true,
        flagship: true,
      },
    ],
  },
  线上培训: {
    教学智慧进度管理: [
      { label: '在线导入课程信息', standard: true, major: true, flagship: true },
      { label: '在线安排课程教学计划', standard: true, major: true, flagship: true },
      { label: '培训进度实时追踪管理', standard: true, major: true, flagship: true },
    ],
    学生智慧学习: [
      {
        label: '学生在线完成线上课程',
        standard: true,
        major: true,
        flagship: true,
      },
      {
        label: '智能生成考卷题库和教辅助手',
        standard: false,
        major: '1门',
        flagship: '3门',
      },
    ],
  },
};

const enterpriseFeatures = {
  职位管理: {
    职位描述智能撰写: [
      { label: '模糊概念AI智慧化自动生成', standard: true, major: true, flagship: true },
    ],
    岗位发布: [
      {
        label: '校企合作职位发布',
        standard: true,
        major: true,
        flagship: true,
      },
      {
        label: '职位数据模版批量上传发布',
        standard: true,
        major: true,
        flagship: true,
      },
    ],
  },
  人才筛选: {
    人才库: [
      {
        label: '通过多维度筛选管理人才库',
        standard: '支持10项系统筛选项',
        major: '支持20项系统筛选项',
        flagship: '支持系统+自定义筛选项',
      },
      { label: '查看学生全景人才看板', standard: true, major: true, flagship: true },
    ],
    人岗双向推荐: [
      {
        label: '人岗智能匹配分析',
        standard: true,
        major: true,
        flagship: true,
      },
    ],
    人才发展测评: [
      {
        label: '发起并查看候选人职业性格测评',
        standard: '1000人次',
        major: '2000人次',
        flagship: '5000人次',
      },
      {
        label: '发起并查看候选人职业兴趣测评',
        standard: '1000人次',
        major: '2000人次',
        flagship: '5000人次',
      },
      {
        label: '发起并查看候选人任职风险测评',
        standard: false,
        major: '2000人次',
        flagship: '5000人次',
      },
      {
        label: '发起并查看候选人特定岗位职业能力测评',
        standard: false,
        major: '2000人次',
        flagship: '5000人次',
      },
      {
        label: '发起并查看候选人管理胜任力测评',
        standard: false,
        major: false,
        flagship: '5000人次',
      },
    ],
  },
};

export type Features = Record<
  string,
  Record<
    string,
    Record<
      string,
      {
        label: string;
        standard?: boolean | string;
        major?: boolean | string;
        flagship?: boolean | string;
      }[]
    >
  >
>;

export const features: Features = {
  功能总览: {
    ...studentFeatures,
    ...schoolFeatures,
    ...enterpriseFeatures,
  },
  学生高质量就业赋能工具: studentFeatures,
  '学校-学生高质量就业一体化管理系统': schoolFeatures,
  '企业-赋能学生高质量就业管理系统': enterpriseFeatures,
};
