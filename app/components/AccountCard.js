'use client';

import { useTheme } from './ThemeProvider';

export default function AccountCard({ account }) {
  const { darkMode } = useTheme();

  const handleBuy = () => {
    const message = `Здравствуйте! Хочу купить аккаунт:\n\nНазвание: ${account.title}\nID: ${account.id}\nЦена: ${account.price} ₽`;
    const telegramUrl = `https://t.me/tonurx?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <div className={`rounded-xl border shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden 
      ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className={`text-xl font-bold truncate ${darkMode ? 'text-white' : 'text-black'}`}>
            {account.title}
          </h3>
          <span className={`px-2 py-1 rounded text-xs ${account.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {account.active ? '✓ В наличии' : '✗ Продано'}
          </span>
        </div>
        
        <p className={`mb-4 min-h-[60px] ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {account.description}
        </p>
        
        <div className={`mb-4 p-3 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="flex justify-between items-center">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>ID аккаунта:</span>
            <code className="font-mono text-sm">{account.id}</code>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
              {account.price} ₽
            </span>
          </div>
          
          <button
            onClick={handleBuy}
            disabled={!account.active}
            className={`px-6 py-3 rounded-lg font-semibold transition-all
              ${account.active 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow hover:shadow-lg' 
                : 'bg-gray-400 cursor-not-allowed text-gray-800'
              }`}
          >
            {account.active ? 'Купить' : 'Продано'}
          </button>
        </div>
        
        <div className={`mt-4 pt-4 border-t text-sm ${darkMode ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
          <p>Опубликовано: {new Date(account.date).toLocaleDateString('ru-RU')}</p>
        </div>
      </div>
    </div>
  );
}
