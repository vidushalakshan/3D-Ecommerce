'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({
  placeholder = 'Search here...',
  buttonText = 'Search',
  onSearch,
  icon = <FaSearch size={14} />,
  iconPosition = 'left', // 'left' or 'right'
  className = '',
  buttonClassName = '',
  inputClassName = '',
}) {
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
    <form
      onSubmit={handleSearch}
      className={`relative w-full max-w-md flex rounded-full ${className}`}
    >
      {/* Search Icon */}
      {icon && iconPosition === 'left' && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {icon}
        </div>
      )}

      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className={`flex-1 ${
          iconPosition === 'left' ? 'pl-10 pr-4' : 'pl-4 pr-10'
        } py-2 text-sm bg-[#eeeeee] rounded-l-full shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none ${inputClassName}`}
      />

      {/* Search Button */}
      <button
        type="submit"
        className={`px-3 py-2 bg-blue-600 text-[#eeeeee] font-bold text-[14px] rounded-r-full hover:bg-blue-700 transition ${buttonClassName}`}
      >
        {buttonText}
      </button>
    </form>
  );
}
