import { formatFileUrl } from '@/utils/format';
import { request } from '.';
import { omitBy, isNil } from 'lodash-es';
import { type TreeDictionary } from '@/config/entity';

export type LocationOptions = {
  value: string;
  label: string;
  ext_name: string;
  children: LocationOptions;
  pinyin: string;
  pinyin_prefix: string;
}[];

export type FunctionalType = {
  value: string;
  children?: FunctionalType[];
};

// 职位描述自动生成
export async function getJobDescription(title: string) {
  if (!title) return { duty: '', demand: '' };
  const res = await request.get<{ key: string; value: { duty: string; demand: string } }[]>(
    formatFileUrl('/job-description-v2', { forceCDN: true }),
    {},
    {
      handleResponseData: false,
    },
  );

  return res?.find((jd) => jd.key === title)?.value ?? { duty: '', demand: '' };
}

// 省市区
export async function getLocationData() {
  const res = await request.get<LocationOptions>(
    `https://cdn-fe.mesoor.com/data/city_tree_simple.json`,
    {},
    {
      handleResponseData: false,
    },
  );

  return res;
}

// 职能分类
export async function getFunctionalType() {
  return await request.get<FunctionalType[]>(
    formatFileUrl('/wanda-functional-classification-v2', { forceCDN: true }),
    {},
    {
      handleResponseData: false,
    },
  );
}

// B端薪资维度
export const salaryType = [
  {
    label: '1500以下',
    periodLabel: '月薪',
    value: getSalaryValue('month', undefined, 1500),
  },
  {
    label: '1500-2000',
    periodLabel: '月薪',
    value: getSalaryValue('month', 1500, 2000),
  },
  {
    label: '2000-3000',
    periodLabel: '月薪',
    value: getSalaryValue('month', 2000, 3000),
  },
  {
    label: '3000-5000',
    periodLabel: '月薪',
    value: getSalaryValue('month', 3000, 5000),
  },
  {
    label: '5000-8000',
    periodLabel: '月薪',
    value: getSalaryValue('month', 5000, 8000),
  },
  {
    label: '8000-12000',
    periodLabel: '月薪',
    value: getSalaryValue('month', 8000, 12000),
  },
  {
    label: '12000以上',
    periodLabel: '月薪',
    value: getSalaryValue('month', 12000),
  },
  {
    periodLabel: '日薪',
    label: '80以下',
    value: getSalaryValue('day', undefined, 80),
  },
  {
    periodLabel: '日薪',
    label: '80-100',
    value: getSalaryValue('day', 80, 100),
  },
  {
    periodLabel: '日薪',
    label: '100-120',
    value: getSalaryValue('day', 100, 120),
  },
  {
    periodLabel: '日薪',
    label: '120-150',
    value: getSalaryValue('day', 120, 150),
  },
  {
    periodLabel: '日薪',
    label: '150-200',
    value: getSalaryValue('day', 150, 200),
  },
  {
    periodLabel: '日薪',
    label: '200-300',
    value: getSalaryValue('day', 200, 300),
  },
  {
    periodLabel: '日薪',
    label: '300以上',
    value: getSalaryValue('day', 300),
  },
  {
    periodLabel: '时薪',
    label: '10以下',
    value: getSalaryValue('hour', undefined, 10),
  },
  {
    periodLabel: '时薪',
    label: '10-15元',
    value: getSalaryValue('hour', 10, 15),
  },
  {
    periodLabel: '时薪',
    label: '15-30元',
    value: getSalaryValue('hour', 15, 30),
  },
  {
    periodLabel: '时薪',
    label: '30-50元',
    value: getSalaryValue('hour', 30, 50),
  },
  {
    periodLabel: '时薪',
    label: '50-80元',
    value: getSalaryValue('hour', 50, 80),
  },
  {
    periodLabel: '时薪',
    label: '80元以上',
    value: getSalaryValue('hour', 80),
  },
];

export function getSalaryValue(
  period: Common.NormalizedField.Salary['period'],
  gt?: number,
  lt?: number,
) {
  const range = {
    gt:
      gt === undefined
        ? undefined
        : {
            amount: { number: gt, unit: 'CNY' },
            period,
            months: 12,
          },
    lt:
      lt === undefined
        ? undefined
        : {
            amount: { number: lt, unit: 'CNY' },
            period,
            months: 12,
          },
    openClose: 'close-close',
  };
  return omitBy(range, isNil) as Common.NormalizedField.SalaryRange;
}

// 职位类型
export const workTypeData = [
  { label: '全职', value: '全职' },
  { label: '兼职', value: '兼职' },
  { label: '实习', value: '实习' },
];

// 性别
export const genderNameData = [
  { label: '男', value: '男' },
  { label: '女', value: '女' },
];

// 经验要求
export const experienceType = [
  { label: '在校生', value: { gt: 0, lt: 1, openClose: 'close-close' } },
  { label: '1-3年', value: { gt: 1, lt: 3, openClose: 'close-close' } },
  { label: '3-5年', value: { gt: 3, lt: 5, openClose: 'close-close' } },
  { label: '5-10年', value: { gt: 5, lt: 10, openClose: 'close-close' } },
  { label: '10年以上', value: { gt: 10, openClose: 'close-close' } },
];

export const degreeMap = [
  ['小学', -3],
  ['初中', -2],
  ['高中', 0],
  ['专科', 8],
  ['本科', 16],
  ['硕士', 24],
  ['博士', 32],
] as const;

export type DegreeMap = typeof degreeMap;

export const getDegreeRank = (degree: DegreeMap[number][0]) =>
  degreeMap.find(([k]) => k === degree)?.[1];

export const filterDegree = (degree: DegreeMap[number][0], operator: '>=' | '<=') => {
  const targetRank = getDegreeRank(degree);
  if (targetRank === undefined) return [];
  const res = degreeMap.filter(([, v]) => (operator === '>=' ? v >= targetRank : v <= targetRank));
  return res.map(([k, v]) => ({ name: k, rank: v }));
};

// 学历要求
export const degreeRequirements = [
  { label: '高中及以下', value: filterDegree('高中', '<=') },
  { label: '大专及以上', value: filterDegree('专科', '>=') },
  { label: '本科及以上', value: filterDegree('本科', '>=') },
];

// 学历
export const degrees = degreeMap.map((d) => ({
  label: d[0] as string,
  value: { name: d[0], rank: d[1] },
}));

export function filterEmpty(data: { label: string }[]) {
  return data.filter((e) => e.label !== '不限');
}

export function turnToFilterValues(data: { label: string }[]) {
  return filterEmpty(data).map((e) => e.label);
}

///get_std_kv/{entity_type}/{std_name}
export async function getSchoolKV(name?: string) {
  if (!name) return;
  return request.get<any>(`/api/kg-sqlite/get_std_kv/school/${name}`, {
    useLogo: true,
  });
}

// 行业字典
export const industryDictionary = [
  { label: '电商', value: '电商' },
  { label: '电子', value: '电子' },
  { label: '互联网', value: '互联网' },
  { label: '机械', value: '机械' },
  { label: '金融', value: '金融' },
  { label: '科技', value: '科技' },
  { label: '建筑装饰', value: '建筑装饰' },
  { label: '零售', value: '零售' },
  { label: '能源', value: '能源' },
  { label: '汽车', value: '汽车' },
  { label: '石油化工', value: '石油化工' },
  { label: '时尚', value: '时尚' },
  { label: '食品饮料', value: '食品饮料' },
  { label: '投资', value: '投资' },
  { label: '物流供应链', value: '物流供应链' },
  { label: '消费品', value: '消费品' },
  { label: '芯片半导体', value: '芯片半导体' },
  { label: '医药', value: '医药' },
  { label: '游戏', value: '游戏' },
  { label: '制造业', value: '制造业' },
  { label: '智能硬件', value: '智能硬件' },
  { label: '其他', value: '其他' },
];

// 地区字典
export const regionDictionary: TreeDictionary = [
  {
    label: '东南亚',
    value: '东南亚',
    children: [
      { label: '新加坡', value: '新加坡' },
      { label: '印度尼西亚', value: '印度尼西亚' },
      { label: '马来西亚', value: '马来西亚' },
      { label: '菲律宾', value: '菲律宾' },
      { label: '泰国', value: '泰国' },
      { label: '越南', value: '越南' },
    ],
  },
  {
    label: '中东',
    value: '中东',
    children: [
      { label: '巴林', value: '巴林' },
      { label: '卡塔尔', value: '卡塔尔' },
      { label: '伊朗', value: '伊朗' },
      { label: '伊拉克', value: '伊拉克' },
      { label: '以色列', value: '以色列' },
      { label: '约旦', value: '约旦' },
      { label: '沙特阿拉伯', value: '沙特阿拉伯' },
      { label: '阿联酋', value: '阿联酋' },
      { label: '科威特', value: '科威特' },
      { label: '黎巴嫩', value: '黎巴嫩' },
      { label: '阿曼', value: '阿曼' },
    ],
  },
  {
    label: '日韩',
    value: '日韩',
    children: [
      { label: '日本', value: '日本' },
      { label: '韩国', value: '韩国' },
    ],
  },
  {
    label: '亚洲其他',
    value: '亚洲其他',
    children: [
      { label: '印度', value: '印度' },
      { label: '巴基斯坦', value: '巴基斯坦' },
      { label: '孟加拉国', value: '孟加拉国' },
      { label: '斯里兰卡', value: '斯里兰卡' },
      { label: '尼泊尔', value: '尼泊尔' },
      { label: '不丹', value: '不丹' },
      { label: '马尔代夫', value: '马尔代夫' },
      { label: '哈萨克斯坦', value: '哈萨克斯坦' },
      { label: '吉尔吉斯斯坦', value: '吉尔吉斯斯坦' },
      { label: '塔吉克斯坦', value: '塔吉克斯坦' },
      { label: '土库曼斯坦', value: '土库曼斯坦' },
      { label: '乌兹别克斯坦', value: '乌兹别克斯坦' },
    ],
  },
  {
    label: '北美',
    value: '北美',
    children: [
      { label: '美国', value: '美国' },
      { label: '加拿大', value: '加拿大' },
      { label: '墨西哥', value: '墨西哥' },
    ],
  },
  {
    label: '拉美',
    value: '拉美',
    children: [
      { label: '阿根廷', value: '阿根廷' },
      { label: '玻利维亚', value: '玻利维亚' },
      { label: '巴西', value: '巴西' },
      { label: '智利', value: '智利' },
      { label: '哥伦比亚', value: '哥伦比亚' },
      { label: '哥斯达黎加', value: '哥斯达黎加' },
      { label: '古巴', value: '古巴' },
      { label: '多米尼加共和国', value: '多米尼加共和国' },
      { label: '厄瓜多尔', value: '厄瓜多尔' },
      { label: '萨尔瓦多', value: '萨尔瓦多' },
      { label: '危地马拉', value: '危地马拉' },
      { label: '洪都拉斯', value: '洪都拉斯' },
      { label: '墨西哥', value: '墨西哥' },
      { label: '尼加拉瓜', value: '尼加拉瓜' },
      { label: '巴拿马', value: '巴拿马' },
      { label: '巴拉圭', value: '巴拉圭' },
      { label: '秘鲁', value: '秘鲁' },
      { label: '波多黎各', value: '波多黎各' },
      { label: '马拉圭', value: '马拉圭' },
      { label: '委内瑞拉', value: '委内瑞拉' },
    ],
  },
  {
    label: '大洋洲',
    value: '大洋洲',
    children: [
      { label: '澳大利亚', value: '澳大利亚' },
      { label: '新西兰', value: '新西兰' },
    ],
  },
  {
    label: '欧洲',
    value: '欧洲',
    children: [
      { label: '法国', value: '法国' },
      { label: '德国', value: '德国' },
      { label: '英国', value: '英国' },
      { label: '荷兰', value: '荷兰' },
      { label: '瑞士', value: '瑞士' },
      { label: '西班牙', value: '西班牙' },
      { label: '意大利', value: '意大利' },
      { label: '俄罗斯', value: '俄罗斯' },
      { label: '比利时', value: '比利时' },
      { label: '奥地利', value: '奥地利' },
      { label: '丹麦', value: '丹麦' },
      { label: '挪威', value: '挪威' },
      { label: '瑞典', value: '瑞典' },
      { label: '芬兰', value: '芬兰' },
      { label: '葡萄牙', value: '葡萄牙' },
      { label: '希腊', value: '希腊' },
      { label: '马耳他', value: '马耳他' },
      { label: '塞浦路斯', value: '塞浦路斯' },
      { label: '波兰', value: '波兰' },
      { label: '捷克共和国', value: '捷克共和国' },
      { label: '斯洛伐克', value: '斯洛伐克' },
      { label: '匈牙利', value: '匈牙利' },
      { label: '罗马尼亚', value: '罗马尼亚' },
      { label: '保加利亚', value: '保加利亚' },
      { label: '克罗地亚', value: '克罗地亚' },
      { label: '斯洛文尼亚', value: '斯洛文尼亚' },
      { label: '爱沙尼亚', value: '爱沙尼亚' },
      { label: '拉脱维亚', value: '拉脱维亚' },
      { label: '立陶宛', value: '立陶宛' },
    ],
  },
  {
    label: '非洲',
    value: '非洲',
    children: [
      { label: '尼日利亚', value: '尼日利亚' },
      { label: '埃及', value: '埃及' },
      { label: '南非', value: '南非' },
      { label: '阿尔及利亚', value: '阿尔及利亚' },
      { label: '摩洛哥', value: '摩洛哥' },
      { label: '埃塞俄比亚', value: '埃塞俄比亚' },
      { label: '肯尼亚', value: '肯尼亚' },
      { label: '安哥拉', value: '安哥拉' },
      { label: '坦桑尼亚', value: '坦桑尼亚' },
      { label: '加纳', value: '加纳' },
    ],
  },
];

// 职位字典
export const jobFunctionDictionary = [
  { label: '市场', value: '市场' },
  { label: '销售', value: '销售' },
  { label: '运营', value: '运营' },
  { label: '产品', value: '产品' },
  { label: '技术研发', value: '技术研发' },
  { label: '设计', value: '设计' },
  { label: '电子电气', value: '电子电气' },
  { label: '供应链物流', value: '供应链物流' },
  { label: '采购', value: '采购' },
  { label: '法务', value: '法务' },
  { label: '公关', value: '公关' },
  { label: '财务', value: '财务' },
  { label: '人力HR', value: '人力HR' },
  { label: '数据分析', value: '数据分析' },
  { label: '项目管理', value: '项目管理' },
  { label: '高管', value: '高管' },
  { label: '其他', value: '其他' },
];

// 薪资范围字典
export const salaryRangeDictionary = [
  { label: '3K以下', value: '3K以下', min: 0, max: 3 },
  { label: '3K-5K', value: '3K-5K', min: 3, max: 5 },
  { label: '5K-10K', value: '5K-10K', min: 5, max: 10 },
  { label: '10K-20K', value: '10K-20K', min: 10, max: 20 },
  { label: '20K-40K', value: '20K-40K', min: 20, max: 40 },
  { label: '40K-60K', value: '40K-60K', min: 40, max: 60 },
  { label: '60K以上', value: '60K以上', min: 60 },
  { label: '自定义薪资下限和上限', value: 'custom' },
  { label: '面议', value: 'negotiate' },
];

// 工作经验字典
export const experienceDictionary = [
  { label: '1年以内', value: { gt: 0, lt: 1, openClose: 'close-close' } },
  { label: '1-3年', value: { gt: 1, lt: 3, openClose: 'close-close' } },
  { label: '3-5年', value: { gt: 3, lt: 5, openClose: 'close-close' } },
  { label: '5-10年', value: { gt: 5, lt: 10, openClose: 'close-close' } },
  { label: '10年以上', value: { gt: 10, openClose: 'close-close' } },
  { label: '不限', value: null },
];

// 学历字典
export const educationDictionary = [
  { label: '博士', value: { name: '博士', rank: 32 } },
  { label: '硕士', value: { name: '硕士', rank: 24 } },
  { label: '本科', value: { name: '本科', rank: 16 } },
  { label: '专科', value: { name: '专科', rank: 8 } },
  { label: '高中', value: { name: '高中', rank: 0 } },
  { label: '初中', value: { name: '初中', rank: -2 } },
  { label: '小学', value: { name: '小学', rank: -3 } },
  { label: '不限', value: null },
];
