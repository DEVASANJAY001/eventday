import React from 'react';
import EmptyState from '../../components/ui/EmptyState';

export default function CustomerOrders() {
  // Integration Point: Replace this empty array with orders from Supabase in Round 3
  const orders = [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>

      {orders.length === 0 ? (
        <EmptyState message="No orders found." />
      ) : (
        <div className="space-y-4">
          {/* Order list structure */}
        </div>
      )}
    </div>
  );
}
