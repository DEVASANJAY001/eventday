import React, { useState } from 'react';
import ProductGrid from '../../components/customer/ProductGrid';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';

export default function ProductCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Integration Point: Replace this empty array with Supabase queries in Round 3
  const products = [];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
        <p className="text-xs text-gray-500">Search and filter our catalog</p>
      </div>

      {/* Basic Filters bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white border border-gray-200 p-4 rounded">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="py-1.5 px-3"
        />
        
        <Select
          placeholder="All Categories"
          options={[
            { label: 'Men', value: 'men' },
            { label: 'Women', value: 'women' },
            { label: 'Accessories', value: 'accessories' },
          ]}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />

        <Select
          placeholder="Sort by"
          options={[
            { label: 'Newest Arrivals', value: 'newest' },
            { label: 'Price: Low to High', value: 'price_asc' },
            { label: 'Price: High to Low', value: 'price_desc' },
          ]}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        />
      </div>

      {/* Grid */}
      <ProductGrid
        products={products}
        emptyMessage="No products available."
      />
    </div>
  );
}
