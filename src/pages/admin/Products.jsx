import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function Products() {
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState(MOCK_PRODUCTS);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this product?')) {
      setProductsList(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
            Product Inventory Catalog
          </h1>
          <p className="text-body-sm text-on-surface-variant">
            Manage catalog items, pricing, stock levels, and promotional badges.
          </p>
        </div>
        <Button onClick={() => navigate('/admin/products/new')} variant="secondary" icon="add">
          Add New Product
        </Button>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden shadow-card-soft">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-bold tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-on-surface">
              {productsList.map((product) => (
                <tr key={product.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-contain mix-blend-multiply bg-surface-container-low rounded-lg p-1"
                      />
                      <div>
                        <span className="font-label-md text-sm font-bold block">{product.name}</span>
                        <span className="text-[11px] text-on-surface-variant">{product.subtitle || product.brand}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 uppercase text-[11px] font-semibold text-on-surface-variant">
                    {product.category}
                  </td>
                  <td className="p-4 font-headline-md font-bold text-sm text-primary">
                    ${Number(product.price).toFixed(2)}
                  </td>
                  <td className="p-4 font-medium">
                    {product.stock || 25} in stock
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-secondary font-bold">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span>{product.rating}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={product.inStock ? 'success' : 'sale'}>
                      {product.inStock ? 'Active' : 'Out of Stock'}
                    </Badge>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-primary hover:underline font-semibold"
                    >
                      View
                    </Link>
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      className="text-secondary hover:underline font-semibold"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-error hover:underline font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
