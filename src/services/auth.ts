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
  redirectAuthPage(userType: UserModel.UserType) {
    const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;

    // 如果是 share 就登陆完重定向回来，如果是business 就不用回来了
    window.location.href =
      userType === 'share' ? generateUrl(authUrl, { redirect: window.location.href }) : authUrl;
  },
};
