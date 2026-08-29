import React from 'react';
import EmptyState from '../../components/ui/EmptyState';

export default function Customers() {
  // Integration Point: Replace this empty array with database queries in Round 3
  const customers = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Customers</h1>
        <p className="text-xs text-gray-500">View user metric tables</p>
      </div>

      {customers.length === 0 ? (
        <EmptyState message="No customers available." />
      ) : (
        <div className="bg-white border rounded overflow-hidden">
          {/* Customers lists table */}
        </div>
      )}
    </div>
  );
}
