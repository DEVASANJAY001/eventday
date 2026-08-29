import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmptyState from '../../components/ui/EmptyState';

export default function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Integration Point: Replace this null value with Supabase orders in Round 3
  const order = null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Reference Details</h1>
          <p className="text-xs text-gray-500">Order ID: {id}</p>
        </div>
        <button
          onClick={() => navigate('/admin/orders')}
          className="text-xs border px-3 py-1.5 rounded hover:bg-gray-50"
        >
          Back to Orders
        </button>
      </div>

      {!order ? (
        <EmptyState message="No orders found." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-gray-200 p-6 rounded">
          {/* Order tracking layout */}
        </div>
      )}
    </div>
  );
}
