'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '../components/AdminDashboard';
import { loginAdmin, isAdminSession, logoutAdmin } from '../lib/auth';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isAdminSession()) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (loginAdmin(password)) {
      setIsLoggedIn(true);
    } else {
      setError('Неверный пароль');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsLoggedIn(false);
    setPassword('');
    router.refresh();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Только для администратора</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Пароль администратора</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Введите пароль"
                required
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg">
                <p className="text-red-400 text-center">{error}</p>
              </div>
            )}
            
            <div className="text-center text-sm text-gray-500">
              <p>Пароль по умолчанию: admin123</p>
              <p className="mt-1">(Измените его в lib/auth.js после первого входа)</p>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold 
                rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
            >
              Войти в админ-панель
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-center text-gray-500 text-sm">
              Главный администратор: @opavshue
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
