'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function SearchInput() { 
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [inputValue, setInputValue] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const timer = setTimeout(() => { 
        const params = new URLSearchParams(searchParams.toString());
        
        if (inputValue.length >= 3) {
          params.set('q', inputValue);
        } else { 
          params.delete('q');
        } 
        router.replace(`${pathname}?${params.toString()}`);
      }, 500); 
      return () => {
        clearTimeout(timer);
      };
    }, [inputValue, searchParams, pathname, router]);

  return ( 
    <div className="relative mb-8">
    <input
        type="text"
        name="q"
        placeholder="Search by job title, company, or city (min. 3 characters)..." 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full p-4 pr-12 text-base text-white bg-gray-800 border border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
    />
    <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-4">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
    </button>
    </div> 
  );
}