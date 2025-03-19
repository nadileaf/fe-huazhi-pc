import { type EventPoint } from '@/components/system-employee/TimeLine';
import { getSchoolKV } from '@/services/dictionary';
import { formatLocation, formatYears } from '@/utils/format';
import { useMemo } from 'react';
import { useAsyncMemo } from './useHooks';

export function useSystemEmployee(data?: EntityModel.BusinessEntity<'SystemEmployee'>) {
  const standardFields = useMemo(() => data?.data.standardFields, [data]);

  const basicInfo = useMemo(
    () => ({
      姓名: standardFields?.humanInfo?.name,
      性别: standardFields?.humanInfo?.genderName,
      年龄: standardFields?.humanInfo?.age,
      学历: standardFields?.educations?.[0]?.degree?.name,
      学号: standardFields?.employeeInfo?.id,
      现居地: formatLocation(standardFields?.contactInfo?.address, ['city', 'district']),
    }),
    [standardFields],
  );

  const academicPerformance = useMemo(() => {
    return {
      topPercentage: standardFields?.academicPerformance?.topPercentage,
      averageGPA: standardFields?.academicPerformance?.averageGPA,
    };
  }, [standardFields]);

  const educationInfo = useAsyncMemo(async () => {
    if (!standardFields?.educations?.length) return [];
    const result: (ResumeModel.Education & { kv?: any })[] = standardFields.educations;

    try {
      await Promise.all(
        standardFields.educations?.map((v) => getSchoolKV(v.schoolName)) || [],
      ).then((res) => {
        result.forEach((r, i) => {
          r.kv = res[i];
        });
      });
    } catch (error) {
      console.error('获取学校信息失败', error);
    }

    return result;
  }, [standardFields]);

  const works = useMemo(
    () => [...(standardFields?.works || []), ...(standardFields?.interns || [])],
    [standardFields],
  );

  const trainings = useMemo(() => {
    const trainings = standardFields?.trainings || [];
    const events: EventPoint[] = [];
    for (const training of trainings) {
      const years = formatYears(training.dateRange);
      for (const year of years) {
        const yearIndex = events.findIndex((e) => e.year === year);
        if (yearIndex === -1) {
          events.push({ year, points: [training.name] });
        } else {
          events[yearIndex].points.push(training.name);
        }
      }
    }
    return events.sort((a, b) => Number(a.year) - Number(b.year));
  }, [standardFields]);

  const evaluationReports = useMemo(
    () => standardFields?.evaluationReports?.filter((v) => v.key),
    [standardFields],
  );

  return {
    standardFields,
    basicInfo,
    academicPerformance,
    educationInfo,
    works,
    trainings,
    evaluationReports,
  };
}
