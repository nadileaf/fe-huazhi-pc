import create from 'zustand';
import { useAuthStore } from './auth';
import { uniq } from 'lodash-es';

export type SearchHistoryOption = { value: string; label?: string };

interface State {
  histories: SearchHistoryOption[];
}

interface Actions {
  addHistoryOption: (option: SearchHistoryOption) => void;
  removeHistoryOption: (option: SearchHistoryOption) => void;
  setHistoryOption: (option: SearchHistoryOption, action: 'add' | 'remove') => void;
  clearHistories: () => void;
}

export const useSearchStore = create<State & Actions>((set, get) => {
  const { user } = useAuthStore.getState();
  const key = `search-history_${user?.userId || 'default'}`;

  return {
    get histories() {
      return JSON.parse(localStorage.getItem(key) || '[]');
    },
    set histories(value: SearchHistoryOption[]) {
      localStorage.setItem(key, JSON.stringify(value.slice(0, 10)));
      set({ histories: value });
    },
    addHistoryOption: (option: SearchHistoryOption) => {
      get().setHistoryOption(option, 'add');
    },
    removeHistoryOption: (option: SearchHistoryOption) => {
      get().setHistoryOption(option, 'remove');
    },
    setHistoryOption: (option: SearchHistoryOption, action: 'add' | 'remove') => {
      console.log(option);
      const histories = get().histories;
      const index = histories.findIndex((item) => item.value === option.value);
      if (index >= 0) histories.splice(index, 1);
      if (action === 'add') histories.unshift(option);
      set({ histories: uniq(histories) });
    },
    clearHistories: () => {
      set({ histories: [] });
    },
  };
});
