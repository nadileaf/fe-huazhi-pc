import { request, mesoorUserPrefixUrl } from '@/services';
import { generateUrl } from '@/utils/common';

export type JoinTenantParams = {
  tenantId: string;
  inviterId: string;
  userId?: string;
  username?: string;
};

export const authService = {
  async getUserInfoByToken() {
    return request.get<UserModel.User>(mesoorUserPrefixUrl('/users/token/user'), undefined, {
      handleResponseData: false,
    });
  },

  async queryTenants() {
    const res = await request.get<UserModel.Tenant[]>(mesoorUserPrefixUrl('/tenants'), undefined, {
      handleResponseData: false,
    });
    const schoolList = res.filter((item) => item.industry === '教育');
    return schoolList;
  },
  loginBusiness() {
    const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;
    window.location.href = authUrl;
  },
};
