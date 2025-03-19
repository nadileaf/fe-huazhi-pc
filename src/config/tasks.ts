export const mainTabs: { label: string; value: EntityModel.BusinessEntityType; flows: string[] }[] =
  [
    {
      label: '课程学习',
      value: 'Training',
      flows: ['待学习', '进行中', '待考试', '考试中', '已完成', '异常取消'],
    },
    { label: '校企求职', value: 'Job', flows: ['投递', '笔试', '面试', '入职', '淘汰'] },
    {
      label: '职业背调',
      value: 'BackgroundCheck',
      flows: ['待发起', '待作答', '已出报告', '已过期', '已关闭'],
    },
    {
      label: '职业评测',
      value: 'PinPinCloudEvaluation',
      flows: ['待发起', '待作答', '已出报告', '已过期', '已关闭'],
    },
  ];
