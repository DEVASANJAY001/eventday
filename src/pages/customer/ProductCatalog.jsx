import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../../components/customer/ProductGrid';
import FilterPanel from '../../components/customer/FilterPanel';
import { productService } from '../../services/productService';
import { SkeletonCard } from '../../components/ui/LoadingSpinner';

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    productService.getProducts().then((data) => {
      setProducts(data || []);
      setLoading(false);
    }).catch(() => setLoading(false));

    const unsubscribe = productService.subscribeToProducts(() => {
      productService.getProducts().then(data => setProducts(data || [])).catch(() => {});
    });

    return () => unsubscribe();
  }, []);

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
    return products.filter(p => {
      // Category
      if (selectedCategory && p.category !== selectedCategory) return false;

      // Price ranges
      if (selectedPriceRanges.length > 0) {
        const matchesPrice = selectedPriceRanges.some(r => {
          if (r === 'under-50') return p.price < 50;
          if (r === '50-100') return p.price >= 50 && p.price <= 100;
          if (r === '100-250') return p.price > 100 && p.price <= 250;
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
      if (minRating > 0) {
        if ((p.rating || 0) < minRating) return false;
      }

      return true;
    });
  }, [products, selectedCategory, selectedPriceRanges, selectedBrands, minRating]);

  // Sort
  const displayProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') list.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return list;
  }, [filteredProducts, sortBy]);

  const totalActiveFilters = selectedPriceRanges.length + selectedBrands.length + (minRating > 0 ? 1 : 0) + (selectedCategory ? 1 : 0);

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-4 sm:px-6 md:px-margin-desktop py-6 sm:py-8 gap-6">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-label-sm text-on-surface-variant uppercase tracking-wider">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-bold">All Products</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/30 pb-4">
          <div>
            <h1 className="font-headline text-2xl sm:text-3xl md:text-headline-xl font-bold text-primary tracking-tight">
              All Products & Collections
            </h1>
            <p className="text-xs sm:text-body-sm text-on-surface-variant mt-1">
              Explore premium wearables, modern electronics, and tailored essentials.
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 flex-wrap">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-surface-container rounded-full text-xs font-bold text-primary hover:bg-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              Filters
              {totalActiveFilters > 0 && (
                <span className="w-5 h-5 rounded-full bg-secondary text-on-secondary text-[10px] flex items-center justify-center font-bold">
                  {totalActiveFilters}
                </span>
              )}
            </button>

            <span className="text-xs text-on-surface-variant font-medium">
              {displayProducts.length} items
            </span>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-surface-container rounded-full py-2 pl-3.5 pr-8 text-xs font-label-md hover:bg-surface-variant transition-colors border-none outline-none cursor-pointer text-on-surface"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[16px]">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Filter & Catalog Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-gutter items-start">
        {/* Desktop Left Filter Sidebar */}
        <div className="hidden lg:block w-[260px] flex-shrink-0 sticky top-[148px] bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-card-soft">
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
        </div>

        {/* Mobile Filter Modal / Drawer */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-primary/60 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="relative z-10 w-4/5 max-w-sm ml-auto bg-surface h-full shadow-2xl p-5 overflow-y-auto animate-slideLeft">
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
                onCloseMobile={() => setMobileFiltersOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Right Product Grid */}
        <div className="flex-1 w-full flex flex-col gap-6">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-gutter">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="text-center py-16 sm:py-24 space-y-3 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant block">search_off</span>
              <p className="font-bold text-primary text-base">No products match your filters</p>
              <p className="text-xs text-on-surface-variant">Try clearing one or more filters to see more results.</p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="bg-primary text-on-primary text-xs font-bold px-4 py-2 rounded-xl shadow-sm hover:bg-primary-container"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <ProductGrid products={displayProducts} columns={4} />
          )}
        </div>
      </div>
    </div>
  );
}
