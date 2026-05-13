'use client';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({
  placeholder = 'Search products...',
  onSearch,
  className = '',
}) {
  const [term, setTerm] = useState('');

  function handleSearch(e) {
    e.preventDefault();
    if (onSearch) onSearch(term);
  }

  return (
    <form
      onSubmit={handleSearch}
      className={`relative w-full group ${className}`}
    >
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
        <FiSearch size={18} />
      </div>
      
      <input
        type="text"
        placeholder={placeholder}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-2.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-600 text-sm"
      />
      
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity hover:bg-blue-500"
      >
        <FiSearch size={14} />
      </button>
    </form>
  );
}
