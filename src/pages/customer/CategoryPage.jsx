import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from '../../components/customer/ProductGrid';
import { productService } from '../../services/productService';
import { SkeletonCard } from '../../components/ui/LoadingSpinner';

export default function CategoryPage() {
  const { category } = useParams();
  const normalizedCategory = (category || '').toLowerCase();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      productService.getProducts(),
      productService.getCategories(),
    ]).then(([prods, cats]) => {
      setProducts(prods || []);
      setCategories(cats || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const categoryMeta = categories.find(c => c.slug === normalizedCategory) || {
    name: category ? category.charAt(0).toUpperCase() + category.slice(1) : '',
    description: `Explore our collection of ${category || 'products'}`,
    icon: 'inventory_2',
  };

  const filteredProducts = normalizedCategory === 'all' || normalizedCategory === 'special-offers'
    ? (normalizedCategory === 'special-offers' ? products.filter(p => p.isDeal) : products)
    : products.filter(p => p.category === normalizedCategory);

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg gap-gutter">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-label-sm text-on-surface-variant uppercase tracking-wider mb-stack-sm">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link to="/products" className="hover:text-primary transition-colors">Categories</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary font-bold">{categoryMeta.name}</span>
      </div>

      {/* Category Header Banner */}
      <div className="bg-surface-container-low rounded-2xl p-8 md:p-10 border border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-1">
            Category Showcase
          </span>
          <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
            {loading ? (
              <span className="inline-block w-48 h-8 bg-surface-container-low rounded-lg animate-pulse" />
            ) : categoryMeta.name}
          </h1>
          <p className="text-body-md text-on-surface-variant mt-2 max-w-lg">
            {loading ? (
              <span className="inline-block w-64 h-4 bg-surface-container-low rounded animate-pulse" />
            ) : categoryMeta.description}
          </p>
        </div>

        <div className="bg-surface-container-lowest px-6 py-4 rounded-xl shadow-sm border border-outline-variant/20 flex items-center gap-4 self-start md:self-auto">
          <span className="material-symbols-outlined text-[32px] text-primary">
            {categoryMeta.icon || 'inventory_2'}
          </span>
          <div>
            <span className="block font-headline-md text-primary font-bold">
              {loading ? '—' : filteredProducts.length}
            </span>
            <span className="text-xs text-on-surface-variant">Available Items</span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mt-4">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <ProductGrid
            products={filteredProducts}
            emptyMessage={`No products found in "${categoryMeta.name}" yet.`}
            columns={4}
          />
        )}
      </div>
    </div>
  );
}
