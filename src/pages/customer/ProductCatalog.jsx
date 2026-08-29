import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../../components/customer/ProductGrid';
import FilterPanel from '../../components/customer/FilterPanel';
import { MOCK_PRODUCTS } from '../../data/mockProducts';

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState(['50-100']);
  const [selectedBrands, setSelectedBrands] = useState(['SonicWear']);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  const handleTogglePriceRange = (rangeId) => {
    setSelectedPriceRanges(prev => 
      prev.includes(rangeId) ? prev.filter(r => r !== rangeId) : [...prev, rangeId]
    );
  };

  const handleToggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedBrands([]);
    setMinRating(0);
    setSelectedCategory('');
  };

  // Filtered & Sorted list
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      // Category
      if (selectedCategory && p.category !== selectedCategory) return false;

      // Price ranges
      if (selectedPriceRanges.length > 0) {
        const matchesPrice = selectedPriceRanges.some(r => {
          if (r === 'under-50') return p.price < 50;
          if (r === '50-100') return p.price >= 50 && p.price <= 100;
          if (r === '100-250') return p.price >= 100 && p.price <= 250;
          if (r === 'over-250') return p.price > 250;
          return true;
        });
        if (!matchesPrice) return false;
      }

      // Brands
      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(p.brand)) return false;
      }

      // Rating
      if (minRating > 0 && (p.rating || 0) < minRating) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // featured
    });
  }, [selectedCategory, selectedPriceRanges, selectedBrands, minRating, sortBy]);

  // Fallback to all products if specific demo filter yields 0
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : MOCK_PRODUCTS;

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg gap-gutter">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col gap-stack-sm mb-stack-md">
        <div className="flex items-center gap-2 text-label-sm text-on-surface-variant uppercase tracking-wider">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-bold">All Products</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
          <div>
            <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
              All Products & Collections
            </h1>
            <p className="text-body-sm text-on-surface-variant mt-1">
              Explore premium wearables, modern electronics, and tailored essentials.
            </p>
          </div>

          <div className="flex items-center gap-stack-md flex-wrap">
            <span className="text-body-sm text-on-surface-variant font-medium">
              Showing {displayProducts.length} of {MOCK_PRODUCTS.length} products
            </span>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-surface-container rounded-full py-2 pl-4 pr-10 text-body-sm font-label-md hover:bg-surface-variant transition-colors border-none outline-none cursor-pointer text-on-surface"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Filter & Catalog Layout */}
      <div className="flex flex-col lg:flex-row gap-gutter items-start">
        {/* Left Filters */}
        <FilterPanel
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedPriceRanges={selectedPriceRanges}
          onTogglePriceRange={handleTogglePriceRange}
          selectedBrands={selectedBrands}
          onToggleBrand={handleToggleBrand}
          minRating={minRating}
          onSelectRating={setMinRating}
          onResetFilters={handleResetFilters}
        />

        {/* Right Grid & Pagination */}
        <div className="flex-1 w-full flex flex-col gap-stack-lg">
          <ProductGrid products={displayProducts} columns={4} />

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-stack-lg border-t border-outline-variant/30 pt-stack-lg">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className={`w-10 h-10 rounded-full font-label-md flex items-center justify-center shadow-md ${
                currentPage === 1 ? 'bg-primary text-on-primary' : 'hover:bg-surface-container text-on-surface-variant'
              }`}
            >
              1
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className={`w-10 h-10 rounded-full font-label-md flex items-center justify-center ${
                currentPage === 2 ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              2
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(3)}
              className={`w-10 h-10 rounded-full font-label-md flex items-center justify-center ${
                currentPage === 3 ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              3
            </button>
            <span className="text-on-surface-variant mx-1">...</span>
            <button
              type="button"
              className="w-10 h-10 rounded-full text-on-surface-variant font-label-md flex items-center justify-center hover:bg-surface-container transition-colors"
            >
              12
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
