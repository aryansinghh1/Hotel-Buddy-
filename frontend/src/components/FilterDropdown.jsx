import { useState, useRef, useEffect } from "react";

const FILTER_OPTIONS = [
  { value: "pool", label: "Pool" },
  { value: "gym", label: "Gym" },
  { value: "restaurant", label: "Restaurant" },
  { value: "price", label: "Price: Low to High" },
  { value: "rating", label: "Rating: High to Low" },
];

function FilterDropdown({ filters, onFilterChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        className="filter-button"
        onClick={() => setOpen((prev) => !prev)}
      >
        Filters <i className="fas fa-chevron-down"></i>
      </button>
      {open && (
        <div className="filter-options" style={{ display: "block" }}>
          {FILTER_OPTIONS.map((opt) => (
            <label key={opt.value}>
              <input
                type="checkbox"
                value={opt.value}
                checked={filters.includes(opt.value)}
                onChange={() => onFilterChange(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
