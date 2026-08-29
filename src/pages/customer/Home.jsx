import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../../components/customer/ProductGrid';
import Button from '../../components/ui/Button';

export default function Home() {
  // Integration Point: Replace this null value with Supabase fetch in Round 3
  const products = null;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gray-100 p-8 rounded text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">
          Welcome to Veyora
        </h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Explore our modern e-commerce platform offering essential wardrobe additions.
        </p>
        <Link to="/products" className="inline-block mt-2">
          <Button>Browse Products</Button>
        </Link>
      </section>

      {/* Category Selection */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">Categories</h2>
        <div className="grid grid-cols-3 gap-4">
          <Link to="/category/men" className="bg-gray-100 p-6 rounded text-center font-medium hover:bg-gray-200">Men</Link>
          <Link to="/category/women" className="bg-gray-100 p-6 rounded text-center font-medium hover:bg-gray-200">Women</Link>
          <Link to="/category/accessories" className="bg-gray-100 p-6 rounded text-center font-medium hover:bg-gray-200">Accessories</Link>
        </div>
      </section>

      {/* Product Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">Featured Collections</h2>
        
        {/* Render standard ProductGrid. Given products is null, this will show the empty state:
            "No products available." */}
        <ProductGrid
          products={products}
          emptyMessage="No products available."
        />
      </section>

      {/* Promotional section */}
      <section className="bg-gray-800 text-white p-8 rounded text-center">
        <h2 className="text-xl font-bold mb-2">New Season Sale</h2>
        <p className="text-xs text-gray-400">Get up to 20% off on premium collections. UI customizations can be added here.</p>
      </section>
    </div>
  );
}
