import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../../components/ui/EmptyState';

export default function EditProduct() {
  const navigate = useNavigate();

  // Integration Point: Replace this null value with database fetch in Round 3
  const product = null;

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
        <p className="text-xs text-gray-500">Update catalog listing</p>
      </div>

      {!product ? (
        <EmptyState
          message="No product selected."
          ctaText="Back to Products"
          onCtaClick={() => navigate('/admin/products')}
        />
      ) : (
        <form className="space-y-4 bg-white border border-gray-200 p-6 rounded">
          {/* Edit form controls */}
        </form>
      )}
    </div>
  );
}
