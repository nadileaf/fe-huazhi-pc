import { formatFileUrl } from '@/utils/format';
import { request } from '.';
import { omitBy, isNil } from 'lodash-es';

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
