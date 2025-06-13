import CompanyCard from '@/components/company/CompanyCard';
import SchoolJobCard from '@/components/job/SchoolJobCard';
import { memo, useMemo } from 'react';

const EntityCard = memo(function EntityCard<T extends EntityModel.BusinessEntityType>({
  entityType,
  data,
}: {
  entityType: T;
  data: EntityModel.BusinessEntity<T>;
}) {
  switch (entityType) {
    case 'Job':
      return <SchoolJobCard data={data as JobModel.Job}></SchoolJobCard>;
    case 'Company':
      return <CompanyCard data={data}></CompanyCard>;
    default:
      return <div>todo</div>;
  }
});

export const EntityCardList = memo(function EntityCardList<
  T extends EntityModel.BusinessEntityType,
>({ entityType, data }: { entityType: T; data: EntityModel.BusinessEntity<T>[] }) {
  const gridClass = useMemo(
    () => `grid gap-8 pb-5 ${entityType === 'Job' ? 'grid-cols-3' : 'grid-cols-2'}`,
    [entityType],
  );

  return (
    <div className={gridClass}>
      {data.map((item) => (
        <EntityCard
          key={item.meta.openId}
          entityType={entityType}
          data={item as unknown as EntityModel.BusinessEntity<T>}
        />
      ))}
    </div>
  );
});
