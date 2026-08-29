import React from 'react';
import ProductCard from './ProductCard';
import EmptyState from '../ui/EmptyState';

export default function ProductGrid({
  products,
  emptyMessage = "No products available in this collection.",
  columns = 4, // 2, 3, 4, 5
}) {
  if (!products || products.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  const gridColsClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  }[columns] || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <div className={`grid ${gridColsClass} gap-4 md:gap-gutter`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
