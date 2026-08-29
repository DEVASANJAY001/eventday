import React from 'react';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

export default function Categories() {
  // Integration Point: Replace this empty array with categories in Round 3
  const categories = [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Categories</h1>
          <p className="text-xs text-gray-500">Manage catalog taxonomy groupings</p>
        </div>
        <Button disabled>Add Category</Button>
      </div>

      {categories.length === 0 ? (
        <EmptyState message="No categories available." />
      ) : (
        <div className="bg-white border rounded p-4">
          {/* Categories list */}
        </div>
      )}
    </div>
  );
}
