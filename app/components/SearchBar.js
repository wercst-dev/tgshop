'use client';

import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { darkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Поиск по названию, описанию или цене..."
          className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
            ${darkMode 
              ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' 
              : 'bg-white border-gray-300 text-black placeholder-gray-400'
            }`}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <FiSearch className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        </div>
        <button
          type="submit"
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 rounded-md
            ${darkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
        >
          Найти
        </button>
      </div>
    </form>
  );
}
