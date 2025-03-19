export const degreeRankMap = {
  小学: -3,
  初中: -2,
  中专: -1,
  高中: 0,
  大专: 8,
  专科: 8,
  专升本: 10,
  本科: 16,
  在职研究生: 20,
  硕士: 24,
  专业学位硕士: 24,
  学术型硕士: 28,
  MBA: 29,
  EMBA: 30,
  在职博士生: 30,
  博士: 32,
  专业学位博士: 32,
  学术型博士: 36,
  博士后: 40,
} as const;

// 获取学历等级
export function getDegreeRank(degree: string | null | undefined): number {
  if (!degree) return -999;
  return degreeRankMap[degree as keyof typeof degreeRankMap] ?? -999;
}
