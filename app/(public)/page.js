'use client';

import { useState, useEffect } from 'react';
import AccountCard from '../components/AccountCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { useTheme } from '../components/ThemeProvider';

export default function HomePage() {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetch('/api/accounts');
      const data = await response.json();
      setAccounts(data);
      setFilteredAccounts(data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredAccounts(accounts);
      return;
    }

    const filtered = accounts.filter(account =>
      account.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.price.toString().includes(searchTerm)
    );
    
    setFilteredAccounts(filtered);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-black' : 'bg-white'}`}>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
            Telegram Accounts Store
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Надежные Telegram аккаунты по лучшим ценам
          </p>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredAccounts.length === 0 ? (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="text-xl">Нет доступных аккаунтов</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Найдено аккаунтов: {filteredAccounts.length}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccounts
                .filter(account => account.active)
                .map(account => (
                  <AccountCard key={account.id} account={account} />
                ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
