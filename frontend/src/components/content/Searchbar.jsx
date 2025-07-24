'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ placeholder = 'Search here...', onSearch }) {
  const [term, setTerm] = useState('');

  function handleSearch(e) {
    e.preventDefault();
    if (onSearch) {
      onSearch(term);
    } else {
      console.log(term);
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md flex rounded-full">
      {/* Search Icon inside input */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        <FaSearch size={14} />
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="flex-1 pl-10 pr-30 py-2 text-sm  bg-[#eeeeee] rounded-l-full shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none"
      />

      {/* Search Button */}
      <button
        type="submit"
        className="px-6 py-2 bg-[#D10024] text-[#eeeeee] font-bold text-[16px] rounded-r-full hover:bg-red-600 transition"
      >
        Search
      </button>
    </form>
  );
}
