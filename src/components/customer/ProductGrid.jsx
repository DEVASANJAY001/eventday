import React from 'react';
import ProductCard from './ProductCard';
import EmptyState from '../ui/EmptyState';

export default function ProductGrid({ products, emptyMessage = "No products available." }) {
  if (!products || products.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
