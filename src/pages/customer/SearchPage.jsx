import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductGrid from '../../components/customer/ProductGrid';
import { productService } from '../../services/productService';
import { MOCK_PRODUCTS } from '../../data/mockProducts';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') || '').trim().toLowerCase();
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  useEffect(() => {
    productService.getProducts().then(setProducts).catch(() => {});
  }, []);

  const results = query
    ? products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(query)) ||
        (p.brand && p.brand.toLowerCase().includes(query)) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query))
      )
    : products;

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg gap-gutter">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-label-sm text-on-surface-variant uppercase tracking-wider mb-stack-sm">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary font-bold">Search</span>
      </div>

      <div className="border-b border-outline-variant/30 pb-6">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Search Results
        </h1>
        <p className="text-body-md text-on-surface-variant mt-1">
          {query ? (
            <span>
              Found <strong className="text-primary">{results.length}</strong> matching products for &ldquo;<span className="text-primary font-semibold">{query}</span>&rdquo;
            </span>
          ) : (
            'Showing all curated catalog products'
          )}
        </p>
      </div>

      <ProductGrid
        products={results}
        emptyMessage={`No products found matching "${query}". Try searching for "smartwatch", "headphones", or "fashion".`}
        columns={4}
      />
    </div>
  );
}
