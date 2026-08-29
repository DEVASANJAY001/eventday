import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

export default function Products() {
  const navigate = useNavigate();

  // Integration Point: Replace this empty array with Supabase product queries in Round 3
  const products = [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Products</h1>
          <p className="text-xs text-gray-500">Manage catalog listings</p>
        </div>
        <Button onClick={() => navigate('/admin/products/new')}>Add Product</Button>
      </div>

      {products.length === 0 ? (
        <EmptyState
          message="No products available."
          ctaText="Add Product"
          onCtaClick={() => navigate('/admin/products/new')}
        />
      ) : (
        <div className="bg-white border rounded overflow-hidden">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Product rows will be rendered here by students */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
