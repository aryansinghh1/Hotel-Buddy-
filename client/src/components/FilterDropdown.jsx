import { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, Check } from 'lucide-react';

const OPTIONS = [
  { key: 'pool', label: '🏊 Pool' },
  { key: 'gym', label: '💪 Gym' },
  { key: 'restaurant', label: '🍽️ Restaurant' },
  { key: 'priceLowHigh', label: '💰 Price: Low → High' },
  { key: 'ratingHighLow', label: '⭐ Rating: High → Low' },
];

export default function FilterDropdown({ filters, setFilters }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const activeCount = Object.values(filters).filter(Boolean).length;

  function toggle(key) {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-navy-800/60 hover:bg-gray-50 dark:hover:bg-navy-700/80 text-sm font-medium transition shadow-sm"
        aria-label="Filter options"
      >
        <SlidersHorizontal size={16} />
        <span className="hidden sm:inline">Filters</span>
        {activeCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-semibold">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-800 shadow-xl py-2 animate-fadeInUp">
          <p className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Amenities & Sort
          </p>
          {OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-navy-700/60 transition"
            >
              <span>{label}</span>
              <span
                className={`w-5 h-5 rounded flex items-center justify-center border transition ${
                  filters[key]
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-300 dark:border-white/20'
                }`}
              >
                {filters[key] && <Check size={12} strokeWidth={3} />}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
