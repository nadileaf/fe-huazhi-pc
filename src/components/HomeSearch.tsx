'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';

export default function HomeSearch() {
  const [inputValue, setInputValue] = useState('');

  const router = useRouter();

  function handleSearch() {
    const params = new URLSearchParams();
    params.set('query', inputValue);
    params.set('tab', 'Job');
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-8 bg-white rounded-lg shadow-sm">
      <SearchBar
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSearch={handleSearch}
      />
    </div>
  );
}
