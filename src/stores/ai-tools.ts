import { type AppItem } from '@/services/ai';
import { create } from 'zustand';

type State = {
  aiTools: AppItem[];
};

type Action = {
  setAITools: (aiTools: AppItem[]) => void;
};

export const useAIToolsStore = create<State & Action>((set) => ({
  aiTools: [],
  setAITools: (aiTools) => set(() => ({ aiTools })),
}));
