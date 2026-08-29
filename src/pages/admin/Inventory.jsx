import React from 'react';
import EmptyState from '../../components/ui/EmptyState';

export default function Inventory() {
  // Integration Point: Replace this empty array with database queries in Round 3
  const items = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Inventory</h1>
        <p className="text-xs text-gray-500">Track item stock logs</p>
      </div>

      {items.length === 0 ? (
        <EmptyState message="No products available." />
      ) : (
        <div className="bg-white border rounded p-4">
          {/* Inventory visual lines */}
        </div>
      )}
    </div>
  );
}
