import React from 'react';
import EmptyState from '../../components/ui/EmptyState';

export default function Orders() {
  // Integration Point: Replace this empty array with orders from Supabase in Round 3
  const orders = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Orders</h1>
        <p className="text-xs text-gray-500">Track purchase transactions</p>
      </div>

      {orders.length === 0 ? (
        <EmptyState message="No orders found." />
      ) : (
        <div className="bg-white border rounded overflow-hidden">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 border-b font-semibold uppercase">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Order rows */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
