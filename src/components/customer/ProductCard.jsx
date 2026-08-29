import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="border border-gray-200 rounded p-4 bg-white flex flex-col justify-between">
      <div>
        <div className="aspect-[4/3] bg-gray-100 rounded mb-3 flex items-center justify-center text-xs text-gray-400">
          Image Placeholder
        </div>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4">₹{product.price}</p>
      </div>
      <div className="flex gap-2">
        <Link to={`/product/${product.id}`} className="text-xs text-blue-600 hover:underline flex-1 py-2 text-center border border-gray-200 rounded">
          Details
        </Link>
        <button className="text-xs bg-blue-600 text-white rounded px-3 py-2">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
