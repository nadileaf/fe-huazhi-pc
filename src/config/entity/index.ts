import { filterOptionConfig as filterOptionConfig_Job } from './Job';
import { filterOptionConfig as filterOptionConfig_Company } from './Company';
import { type FilterOptionConfig, FilterOptionConfigValues } from './type';

export const entitiesWithoutFilters: EntityModel.EntityType[] = ['Project'];

export const entityConfigMap = new Map<
  EntityModel.EntityType,
  { filterOptionConfig: FilterOptionConfig }
>([
  ['Job', { filterOptionConfig: filterOptionConfig_Job }],
  ['Company', { filterOptionConfig: filterOptionConfig_Company }],
]);

export * from './type';
