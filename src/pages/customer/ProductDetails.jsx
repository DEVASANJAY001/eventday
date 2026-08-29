import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

export default function ProductDetails() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Single Point of Data Fetching: Replace this null value with Supabase fetch in Round 3
  const product = null;

  if (!product) {
    return (
      <div className="space-y-4">
        <div className="text-xs text-gray-500">
          <Link to="/" className="hover:underline">Home</Link> / <Link to="/products" className="hover:underline">Products</Link> / <span>Details</span>
        </div>
        <div className="min-h-[300px] flex items-center justify-center bg-white border border-gray-200 rounded">
          <EmptyState
            message="Product information will be loaded from the catalog."
            ctaText="Return to Products"
            onCtaClick={() => window.location.replace('/products')}
          />
        </div>
      </div>
    );
  }

  // Fallback layout if product exists (for Round 3 verification)
  return (
    <div className="space-y-8">
      <div className="text-xs text-gray-500">
        <Link to="/" className="hover:underline">Home</Link> / <Link to="/products" className="hover:underline">Products</Link> / <span className="font-semibold">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Image Placeholder */}
        <div className="aspect-[4/3] bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-gray-400 text-sm">
          Image Placeholder
        </div>

        {/* Right: Product specs */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-lg font-semibold text-gray-600 mt-1">₹{product.price}</p>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            {product.description || 'No description available for this item.'}
          </p>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-600">Select Size</span>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 border rounded text-xs font-medium ${
                    selectedSize === size ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-300 text-gray-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-600">Quantity</span>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="border border-gray-300 rounded px-2 py-1 w-20 text-sm block"
            />
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">Add to Cart</Button>
            <button className="bg-gray-800 text-white rounded px-4 py-2 hover:bg-gray-700 font-medium text-sm flex-1">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Details / Reviews section */}
      <div className="border-t border-gray-200 pt-8 space-y-4">
        <h3 className="font-bold text-gray-800 text-sm">Product Reviews</h3>
        <p className="text-xs text-gray-400">Reviews placeholder. Design can be completed by students.</p>
      </div>
    </div>
  );
}
