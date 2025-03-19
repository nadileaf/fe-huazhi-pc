import { useAuthStore } from '@/stores/auth';

export { default as request, type ResponseData } from '@/utils/request';

export const mesoorUserPrefixUrl = (url: string) => String('/api/mesoor-user' + url);

export const mesoorSpacePrefixUrl = (url: string) => {
  const { user } = useAuthStore.getState();
  return `${user ? `/api` : ''}/mesoor-space${url}`;
};

export const ruleenginePrefixUrl = (url: string) => String('/api/ruleengine' + url);

export const agentPrefixUrl = (url: string) => String('/agent-api/' + url);
