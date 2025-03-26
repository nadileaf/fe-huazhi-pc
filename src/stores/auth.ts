import { create } from 'zustand';
import { authService } from '@/services/auth';
import { storageStore } from '@/utils/common';
import { entityService } from '@/services/entity';

type Route = {
  title: string;
  href: string;
  target?: '_blank';
  onClick?: () => void;
};

interface State {
  token?: string;
  user?: UserModel.User;
  tenant?: string;
  selfTenantMemberId?: string;
  inviterId?: string;
  logging?: boolean;
  isLogout?: boolean;
  resume?: EntityModel.BusinessEntity<'Resume'>;
  loading: boolean;
  authRoutes: Route[];
}

interface Actions {
  setToken: (token?: string) => void;
  initUser: () => Promise<void>;
  setUser: (user: UserModel.User) => void;
  setTenant: (tenant: string) => void;
  setSelfTenantMemberId: (selfTenantMemberId: string) => void;
  setResume: () => void;
  setLogging: (val: boolean) => void;
  setInviterId: (val: string) => void;
  login: (userType: UserModel.UserType) => void;
  logout: () => void;
  setIsLogout: (val: boolean) => void;
  setLoading: (val: boolean) => void;
  setAuthRoutes: () => void;
}

const storage = storageStore('AUTH');

const defaultRoutes = [{ title: '首页', href: '/' }];

export const useAuthStore = create<State & Actions>((set, get) => ({
  token: process.env.NEXT_PUBLIC_LOCAL_TOKEN || undefined,
  user: undefined,
  tenant: undefined,
  selfTenantMemberId: undefined,
  logging: storage?.get('logging'),
  isLogout: storage?.get('logout') || false,
  resume: undefined,
  loading: false,
  authRoutes: [...defaultRoutes],
  setToken: (token?: string) => {
    set({ token, user: undefined });
    get().setLogging(false);
  },

  initUser: async () => {
    try {
      console.log('initUser', get().token);
      if (!get().token) return;
      get().setLoading(true);
      const user = await authService.getUserInfoByToken();

      get().setUser(user);
      get().setTenant(user.currentTenant?.tenantAlias || '');
      get().setSelfTenantMemberId((user.userId && get().tenant + 'T' + user.userId) || '');

      get().setAuthRoutes();
      // get().setLogging(false);
      get().setResume();
    } catch (error) {
      console.error(error);
    } finally {
      get().setLoading(false);
    }
  },
  setLoading: (val: boolean) => {
    set({ loading: val });
  },
  setUser: (user: UserModel.User) => {
    set({ user });
  },
  setTenant: (tenant: string) => {
    set({ tenant });
  },
  setSelfTenantMemberId: (selfTenantMemberId: string) => {
    set({ selfTenantMemberId });
  },
  setResume: async () => {
    const resume = await entityService.queryDetail({
      entityId: get().user?.userId || '',
      entityType: 'Resume',
    });
    set({ resume });
  },
  setInviterId: (val: string) => {
    set({ inviterId: val });
  },
  setLogging: (val: boolean) => {
    set({ logging: val });
    storage?.set('logging', val);
  },
  login(userType: UserModel.UserType) {
    get().setIsLogout(false);
    // if (get().logging) {
    //   console.log('logging');
    //   location.replace('/');
    //   get().setLogging(false);
    //   return;
    // }
    // get().setLogging(true);

    authService.redirectAuthPage(userType);
  },
  logout: () => {
    get().setIsLogout(true);
    set({ token: undefined, user: undefined, resume: undefined });
    get().setAuthRoutes();
  },
  setIsLogout: (val: boolean) => {
    set({ isLogout: val });
    storage?.set('logout', val);
  },
  setAuthRoutes: () => {
    const res = [...defaultRoutes];
    console.log('setAuthRoutes', get().user);
    if (get().user) {
      res.push({ title: '简历', href: '/resume/edit' });
    }
    set({ authRoutes: res });
  },
}));
