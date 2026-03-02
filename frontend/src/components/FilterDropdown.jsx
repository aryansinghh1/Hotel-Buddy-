import { useState, useEffect, useRef } from 'react';

const FILTER_OPTIONS = [
  { value: 'pool', label: 'Pool', icon: 'fa-swimming-pool' },
  { value: 'gym', label: 'Gym', icon: 'fa-dumbbell' },
  { value: 'restaurant', label: 'Restaurant', icon: 'fa-utensils' },
  { value: 'price', label: 'Price: Low to High', icon: 'fa-arrow-down-short-wide' },
  { value: 'rating', label: 'Rating: High to Low', icon: 'fa-star' },
];

function FilterDropdown({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  function handleToggle(value) {
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(next);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer ${
          selected.length > 0
            ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400'
            : 'border-white/[0.08] bg-white/[0.03] text-gray-500 hover:text-gray-300 hover:bg-white/[0.06]'
        }`}
      >
        <i className="fas fa-sliders text-sm"></i>
        {selected.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">
            {selected.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-60 rounded-xl border border-white/[0.08] bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Filters</p>
          </div>
          <div className="p-2">
            {FILTER_OPTIONS.map((opt) => {
              const isSelected = selected.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-indigo-500/10 text-white'
                      : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-200'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-150 flex-shrink-0 ${
                      isSelected
                        ? 'bg-indigo-500 border-indigo-500'
                        : 'border-gray-600'
                    }`}
                  >
                    {isSelected && <i className="fas fa-check text-[8px] text-white"></i>}
                  </div>
                  <i className={`fas ${opt.icon} text-xs w-4 text-center ${isSelected ? 'text-indigo-400' : 'text-gray-600'}`}></i>
                  <span className="text-sm">{opt.label}</span>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleToggle(opt.value)}
                    className="sr-only"
                  />
                </label>
              );
            })}
          </div>
          {selected.length > 0 && (
            <div className="px-3 pb-3">
              <button
                onClick={() => onChange([])}
                className="w-full text-xs text-gray-500 hover:text-gray-300 py-1.5 transition-colors cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
