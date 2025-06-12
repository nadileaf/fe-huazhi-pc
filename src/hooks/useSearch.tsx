import { useSearchStore } from '@/stores/search';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export function useSearch() {
  const searchParams = useSearchParams();
  const searchStore = useSearchStore();

  // 当前搜索的值（用于查询）
  const [searchValue, setSearchValue] = useState(
    searchParams.get('query') || searchStore.query || '',
  );

  // 输入框的值（仅用于显示）
  const [inputValue, setInputValue] = useState(
    searchParams.get('query') || searchStore.query || '',
  );

  useEffect(() => {
    const queryFromParams = searchParams.get('query') || searchStore.query || '';
    setSearchValue(queryFromParams);
    setInputValue(queryFromParams);
  }, [searchParams, searchStore.query]);

  // 只更新输入框值，不触发重渲染
  const updateInputValue = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  // 执行搜索时更新搜索值
  const handleSearchValueUpdate = useCallback(() => {
    setSearchValue(inputValue);
    searchStore.setQuery(inputValue);
  }, [inputValue, searchStore]);

  return {
    searchValue, // 用于查询的值
    inputValue, // 输入框显示的值
    updateInputValue, // 更新输入框值
    handleSearchValueUpdate,
    searchParams,
  };
}
