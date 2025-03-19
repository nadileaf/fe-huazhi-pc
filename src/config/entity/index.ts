import { filterOptionConfig as filterOptionConfig_JobOpportunities } from './JobOpportunities';
import { type FilterOptionConfig, FilterOptionConfigValues } from './type';

export const entitiesWithoutFilters: EntityModel.EntityType[] = ['Project'];

export const entityConfigMap = new Map<
  EntityModel.EntityType,
  { filterOptionConfig: FilterOptionConfig }
>([['JobOpportunities', { filterOptionConfig: filterOptionConfig_JobOpportunities }]]);

export * from './type';
