import React from 'react';
import { useParams } from 'react-router-dom';
import EmptyState from '../../components/ui/EmptyState';

export default function OrderDetails() {
  const { id } = useParams();

  // Integration Point: Replace this null value with Supabase orders in Round 3
  const order = null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
      <p className="text-xs text-gray-500">Order Reference Key: {id}</p>

      {!order ? (
        <EmptyState message="No orders found." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Detailed visual breakdowns */}
        </div>
      )}
    </div>
  );
}
