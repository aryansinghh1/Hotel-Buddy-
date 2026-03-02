import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="w-10 h-10 rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-navy-800/60 hover:bg-gray-50 dark:hover:bg-navy-700/80 flex items-center justify-center transition shadow-sm"
      aria-label="Toggle dark mode"
    >
      {dark ? (
        <Sun size={17} className="text-yellow-400" />
      ) : (
        <Moon size={17} className="text-gray-600" />
      )}
    </button>
  );
}
