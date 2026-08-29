import React from 'react';

export default function FilterPanel({
  selectedCategory = '',
  onSelectCategory = () => {},
  priceRange = [0, 5000],
  onPriceRangeChange = () => {},
}) {
  const categories = ['Men', 'Women', 'Accessories'];

  return (
    <div className="space-y-6 text-sm text-gray-600">
      <div>
        <h4 className="font-semibold text-gray-800 mb-2">Category</h4>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat.toLowerCase()}
                onChange={() => onSelectCategory(cat.toLowerCase())}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 mb-2">Max Price</h4>
        <input
          type="range"
          min="0"
          max="10000"
          value={priceRange[1]}
          onChange={(e) => onPriceRangeChange([0, parseInt(e.target.value)])}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>₹0</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}
