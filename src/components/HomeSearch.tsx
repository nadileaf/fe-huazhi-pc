'use client';

import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import { useSearch } from '@/hooks/useSearch';
import { useCallback } from 'react';

export default function HomeSearch() {
  const { inputValue, updateInputValue, handleSearchValueUpdate } = useSearch();

  const router = useRouter();

  const handleSearch = useCallback(() => {
    handleSearchValueUpdate();
    const params = new URLSearchParams();
    params.set('query', inputValue);
    params.set('tab', 'Job');
    router.push(`/search?${params.toString()}`);
  }, [handleSearchValueUpdate, inputValue, router]);

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-8 bg-white rounded-lg shadow-sm">
      <SearchBar
        inputValue={inputValue}
        setInputValue={updateInputValue}
        handleSearch={handleSearch}
      />
    </div>
  );
}
