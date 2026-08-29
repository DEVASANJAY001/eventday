import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from '../../components/customer/ProductGrid';

export default function CategoryPage() {
  const { category } = useParams();

  // Integration Point: Replace this empty array with Supabase queries in Round 3
  const products = [];

  return (
    <div className="space-y-6">
      {/* Basic Breadcrumb */}
      <div className="text-xs text-gray-500">
        <Link to="/" className="hover:underline">Home</Link> / <span className="font-semibold">{category}</span>
      </div>

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold uppercase text-gray-800">{category} Collection</h1>
        <p className="text-xs text-gray-500">Explore items under category: {category}</p>
      </div>

      {/* Grid */}
      <ProductGrid
        products={products}
        emptyMessage="No products available."
      />
    </div>
  );
}
