import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../../components/customer/ProductGrid';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Integration Point: Replace this empty array with Supabase queries searching products in Round 3
  const results = [];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Search Results</h1>
        <p className="text-xs text-gray-500">
          {query ? `Showing results for "${query}"` : 'Enter search term above'}
        </p>
      </div>

      {/* Grid */}
      <ProductGrid
        products={results}
        emptyMessage="No products available."
      />
    </div>
  );
}
