import React from 'react';

export default function FilterPanel({
  selectedCategory = '',
  onSelectCategory = () => {},
  selectedPriceRanges = [],
  onTogglePriceRange = () => {},
  selectedBrands = [],
  onToggleBrand = () => {},
  minRating = 0,
  onSelectRating = () => {},
  onResetFilters = () => {},
}) {
  const priceOptions = [
    { id: 'under-50', label: 'Under $50', min: 0, max: 50 },
    { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
    { id: '100-250', label: '$100 - $250', min: 100, max: 250 },
    { id: 'over-250', label: 'Over $250', min: 250, max: 999999 },
  ];

  const brandOptions = [
    'SonicWear',
    'ViewMax',
    'AuraTech',
    'Nordic Living',
    'Veyora Atelier',
  ];

  return (
    <aside className="w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-stack-lg sticky top-[140px] bg-surface-container-lowest lg:bg-transparent p-4 lg:p-0 rounded-2xl border lg:border-none border-outline-variant/30">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-md text-headline-md text-primary">Filters</h2>
        <button
          type="button"
          onClick={onResetFilters}
          className="text-label-sm text-secondary hover:underline font-semibold"
        >
          Reset All
        </button>
      </div>

      {/* Filter Block: Price Range */}
      <div className="flex flex-col gap-stack-md border-b border-outline-variant/30 pb-stack-md">
        <h3 className="font-headline-md text-body-lg text-primary">Price Range</h3>
        <div className="flex flex-col gap-stack-sm">
          {priceOptions.map((opt) => (
            <div key={opt.id} className="flex items-center gap-2">
              <input
                id={opt.id}
                type="checkbox"
                checked={selectedPriceRanges.includes(opt.id)}
                onChange={() => onTogglePriceRange(opt.id)}
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 accent-primary cursor-pointer"
              />
              <label htmlFor={opt.id} className="text-body-sm text-on-surface-variant cursor-pointer select-none">
                {opt.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Block: Brand */}
      <div className="flex flex-col gap-stack-md border-b border-outline-variant/30 pb-stack-md">
        <h3 className="font-headline-md text-body-lg text-primary">Brand</h3>
        <div className="flex flex-col gap-stack-sm">
          {brandOptions.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <input
                id={`brand-${brand}`}
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => onToggleBrand(brand)}
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 accent-primary cursor-pointer"
              />
              <label htmlFor={`brand-${brand}`} className="text-body-sm text-on-surface-variant cursor-pointer select-none">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Block: Rating */}
      <div className="flex flex-col gap-stack-md pb-stack-md">
        <h3 className="font-headline-md text-body-lg text-primary">Rating</h3>
        <div className="flex flex-col gap-stack-sm">
          {[4, 3, 2].map((stars) => (
            <div key={stars} className="flex items-center gap-2 cursor-pointer group">
              <input
                id={`rating-${stars}`}
                name="rating"
                type="radio"
                checked={minRating === stars}
                onChange={() => onSelectRating(stars)}
                className="w-5 h-5 rounded-full border-outline-variant text-secondary focus:ring-secondary/20 accent-secondary cursor-pointer"
              />
              <label htmlFor={`rating-${stars}`} className="flex items-center gap-1 cursor-pointer select-none">
                <div className="flex text-secondary text-[16px]">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[16px]"
                      style={i < stars ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      {i < stars ? 'star' : 'star'}
                    </span>
                  ))}
                </div>
                <span className="text-body-sm text-on-surface-variant ml-1 group-hover:text-primary">& Up</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
