import { useState, useEffect } from 'react';
import ChatBox from './components/ChatBox.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import StarBackground from './components/StarBackground.jsx';
import FilterDropdown from './components/FilterDropdown.jsx';
import { Hotel } from 'lucide-react';

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  const [filters, setFilters] = useState({
    pool: false,
    gym: false,
    restaurant: false,
    priceLowHigh: false,
    ratingHighLow: false,
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="relative min-h-screen transition-colors duration-300 bg-white dark:bg-navy-900 text-gray-900 dark:text-gray-100">
      {dark && <StarBackground />}

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10 backdrop-blur-sm bg-white/80 dark:bg-navy-900/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Hotel size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Hotel Buddy
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-none">
              Your AI assistant for hotel bookings
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FilterDropdown filters={filters} setFilters={setFilters} />
          <ThemeToggle dark={dark} setDark={setDark} />
        </div>
      </header>

      {/* Chat area */}
      <main className="relative z-10 flex justify-center px-4 py-6">
        <div className="w-full max-w-3xl">
          <ChatBox filters={filters} />
        </div>
      </main>
    </div>
  );
}
