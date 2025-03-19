import { useAuthStore } from '@/stores/auth';
import { ruleenginePrefixUrl, request } from '.';
import { mixColor, predefineColors } from '@/utils/color';

export interface AppItem {
  name: string;
  mode: string;
  icon: string;
  icon_v2?: Common.NormalizedField.File;
  description: string;
  iconColor?: string;
  iconBackgroundColor: string;
  link: string;
  appliedTenants?: Common.NormalizedField.EntityReference[];
  order?: string;
  specialIdentification?: string;
  inNewWindow?: boolean;
}

export const aiService = {
  async query() {
    const res = await request.get<SchemaEntity.SchemaEntity<AppItem>[]>(
      ruleenginePrefixUrl(`/v2/entity/standard/AIApp?_accept=application/json&_page-size=10000`),
    );
    const result = res.map((item) => {
      const data = item.data.standardFields;
      if (!data.iconBackgroundColor) {
        data.iconBackgroundColor = mixColor(
          '#ffffff',
          predefineColors[Math.floor(Math.random() * predefineColors.length)],
          0.08,
        );
      }
      return data;
    });
    return (
      result
        .filter((item) => {
          if (item.appliedTenants?.length)
            return item.appliedTenants.some(
              (tenant) =>
                tenant.openId === useAuthStore.getState().user?.currentTenant?.tenantAlias,
            );
          return true;
        })
        // A-Z order
        .sort((a, b) => (a.order || 'Z').localeCompare(b.order || 'Z'))
    );
  },
};
