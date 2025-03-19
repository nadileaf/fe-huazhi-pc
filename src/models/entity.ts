/** @description 实体状态 */
export enum EntityStatus {
  /** 正常 */
  Normal = '0',
  /** 归档 */
  Archived = '1',
  /** 假数据 */
  Fake = '2',
}

export const entityNameMap = new Map<EntityModel.BusinessEntityType, string>([
  ['SystemEmployee', '人才'],
  ['Demand', '需求'],
]);

export const JOB_STATUS_MAP = new Map<JobModel.HeadHunterStatus, Common.ComponentType>([
  ['进展中', 'primary'],
  ['成功的', 'success'],
  ['失败的', 'error'],
  ['已取消', 'warning'],
  ['暂停的', 'info'],
]);

export const DictionaryTitleMap = new Map<DictionaryModel.DictionaryId, string>([
  ['industry', '行业'],
  ['category', '职能'],
]);

export const validateStandardFieldsMap_SystemEmployee = new Map([
  ['humanInfo.avatar.key', '头像'],
  ['humanInfo.nickname', '昵称'],
  ['description', '一句话介绍'],
  ['selfEvaluation', '个人能力'],
  ['skills[0]', '技能'],
  ['expectations[0].workSchedulePreferences[0]', '接受工作时间'],
  ['expectations[0].workModes[0]', '合作方式'],
]);
