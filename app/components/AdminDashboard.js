'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { FiPlus, FiTrash2, FiEdit2, FiEye, FiEyeOff, FiLogOut } from 'react-icons/fi';

export default function AdminDashboard({ onLogout }) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAccount, setNewAccount] = useState({
    title: '',
    description: '',
    price: ''
  });
  const [editingId, setEditingId] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetch('/api/accounts');
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Редактирование
      const response = await fetch('/api/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingId,
          ...newAccount,
          price: parseInt(newAccount.price)
        })
      });
      
      if (response.ok) {
        fetchAccounts();
        resetForm();
      }
    } else {
      // Добавление нового
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newAccount,
          price: parseInt(newAccount.price)
        })
      });
      
      if (response.ok) {
        fetchAccounts();
        resetForm();
      }
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Удалить это объявление?')) {
      const response = await fetch('/api/admin', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      
      if (response.ok) {
        fetchAccounts();
      }
    }
  };

  const toggleActive = async (id, currentActive) => {
    const response = await fetch('/api/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        id, 
        active: !currentActive 
      })
    });
    
    if (response.ok) {
      fetchAccounts();
    }
  };

  const editAccount = (account) => {
    setNewAccount({
      title: account.title,
      description: account.description,
      price: account.price.toString()
    });
    setEditingId(account.id);
  };

  const resetForm = () => {
    setNewAccount({
      title: '',
      description: '',
      price: ''
    });
    setEditingId(null);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                Админ-панель
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Главный администратор: @opavshue
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={onLogout}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                  ${darkMode 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
              >
                <FiLogOut />
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Форма добавления/редактирования */}
          <div className={`lg:col-span-1 rounded-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
              {editingId ? 'Редактировать объявление' : 'Добавить объявление'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Название аккаунта
                </label>
                <input
                  type="text"
                  value={newAccount.title}
                  onChange={(e) => setNewAccount({...newAccount, title: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-black'
                    }`}
                  required
                />
              </div>
              
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Описание
                </label>
                <textarea
                  value={newAccount.description}
                  onChange={(e) => setNewAccount({...newAccount, description: e.target.value})}
                  rows="4"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-black'
                    }`}
                  required
                />
              </div>
              
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Цена (₽)
                </label>
                <input
                  type="number"
                  value={newAccount.price}
                  onChange={(e) => setNewAccount({...newAccount, price: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-black'
                    }`}
                  required
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2
                    ${darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                  <FiPlus />
                  <span>{editingId ? 'Обновить' : 'Добавить'}</span>
                </button>
                
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className={`px-6 py-3 border rounded-lg font-semibold
                      ${darkMode 
                        ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                        : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                      }`}
                  >
                    Отмена
                  </button>
                )}
              </div>
            </form>
            
            <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                📝 Информация для покупателей:
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                • Для покупки нужно написать в Telegram: @tonurx
                <br />
                • Техподдержка: @opavshue
                <br />
                • Аккаунты проверены и готовы к использованию
              </p>
            </div>
          </div>

          {/* Список объявлений */}
          <div className="lg:col-span-2">
            <div className={`rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="p-6 border-b">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                  Все объявления ({accounts.length})
                </h2>
              </div>
              
              {loading ? (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : accounts.length === 0 ? (
                <div className="p-8 text-center">
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Нет объявлений</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>ID</th>
                        <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Название</th>
                        <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Цена</th>
                        <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Статус</th>
                        <th className={`text-left p-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.map(account => (
                        <tr key={account.id} className={`border-b hover:bg-opacity-50 ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                          <td className="p-4">
                            <code className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                              {account.id.slice(-6)}
                            </code>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className={`font-medium truncate max-w-xs ${darkMode ? 'text-white' : 'text-black'}`}>
                                {account.title}
                              </p>
                              <p className={`text-sm truncate max-w-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {account.description.substring(0, 60)}...
                              </p>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                              {account.price} ₽
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium
                              ${account.active 
                                ? (darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800') 
                                : (darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800')
                              }`}>
                              {account.active ? 'Активно' : 'Скрыто'}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => editAccount(account)}
                                className={`p-2 rounded ${darkMode ? 'hover:bg-gray-700 text-blue-400' : 'hover:bg-gray-100 text-blue-600'}`}
                                title="Редактировать"
                              >
                                <FiEdit2 />
                              </button>
                              
                              <button
                                onClick={() => toggleActive(account.id, account.active)}
                                className={`p-2 rounded ${darkMode ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-gray-100 text-yellow-600'}`}
                                title={account.active ? 'Скрыть' : 'Показать'}
                              >
                                {account.active ? <FiEyeOff /> : <FiEye />}
                              </button>
                              
                              <button
                                onClick={() => handleDelete(account.id)}
                                className={`p-2 rounded ${darkMode ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-600'}`}
                                title="Удалить"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
