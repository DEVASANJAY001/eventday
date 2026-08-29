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
  onCloseMobile = null, // provided when in mobile modal mode
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

  const categoryOptions = [
    { id: '', label: 'All Categories' },
    { id: 'gadgets', label: 'Gadgets & Tech' },
    { id: 'women', label: "Women's Fashion" },
    { id: 'men', label: "Men's Apparel" },
    { id: 'home', label: 'Home & Living' },
  ];

  const totalActive = selectedPriceRanges.length + selectedBrands.length + (minRating > 0 ? 1 : 0) + (selectedCategory ? 1 : 0);

  return (
    <aside className="w-full flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
        <div className="flex items-center gap-2">
          <h2 className="font-headline text-lg font-bold text-primary">Filters</h2>
          {totalActive > 0 && (
            <span className="bg-secondary text-on-secondary text-[10px] font-bold px-2 py-0.5 rounded-full">
              {totalActive} active
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {totalActive > 0 && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs text-secondary hover:underline font-bold"
            >
              Reset
            </button>
          )}
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter (Mobile & Desktop) */}
      <div className="flex flex-col gap-2.5 border-b border-outline-variant/20 pb-4">
        <h3 className="font-headline text-xs font-bold uppercase tracking-wider text-primary">Category</h3>
        <div className="flex flex-wrap lg:flex-col gap-1.5">
          {categoryOptions.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Block: Price Range */}
      <div className="flex flex-col gap-2.5 border-b border-outline-variant/20 pb-4">
        <h3 className="font-headline text-xs font-bold uppercase tracking-wider text-primary">Price Range</h3>
        <div className="flex flex-col gap-2">
          {priceOptions.map((opt) => (
            <label key={opt.id} className="flex items-center gap-2.5 cursor-pointer text-xs select-none">
              <input
                id={opt.id}
                type="checkbox"
                checked={selectedPriceRanges.includes(opt.id)}
                onChange={() => onTogglePriceRange(opt.id)}
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20 accent-primary cursor-pointer"
              />
              <span className="text-on-surface-variant">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter Block: Brand */}
      <div className="flex flex-col gap-2.5 border-b border-outline-variant/20 pb-4">
        <h3 className="font-headline text-xs font-bold uppercase tracking-wider text-primary">Brand</h3>
        <div className="flex flex-col gap-2">
          {brandOptions.map((brand) => (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer text-xs select-none">
              <input
                id={`brand-${brand}`}
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => onToggleBrand(brand)}
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20 accent-primary cursor-pointer"
              />
              <span className="text-on-surface-variant">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter Block: Rating */}
      <div className="flex flex-col gap-2.5 pb-2">
        <h3 className="font-headline text-xs font-bold uppercase tracking-wider text-primary">Rating</h3>
        <div className="flex flex-col gap-2">
          {[4, 3, 2].map((stars) => (
            <label key={stars} className="flex items-center gap-2.5 cursor-pointer text-xs select-none group">
              <input
                id={`rating-${stars}`}
                name="rating"
                type="radio"
                checked={minRating === stars}
                onChange={() => onSelectRating(stars)}
                className="w-4 h-4 rounded-full border-outline-variant text-secondary focus:ring-secondary/20 accent-secondary cursor-pointer"
              />
              <div className="flex items-center gap-1">
                <div className="flex text-secondary text-[14px]">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[14px]"
                      style={i < stars ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-on-surface-variant font-medium ml-1">& Up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Button in Mobile Mode */}
      {onCloseMobile && (
        <button
          type="button"
          onClick={onCloseMobile}
          className="w-full bg-primary text-on-primary font-bold py-3 rounded-xl shadow-md mt-2"
        >
          Apply Filters ({totalActive})
        </button>
      )}
    </aside>
  );
}
