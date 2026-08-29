import React from 'react';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

export default function Coupons() {
  // Integration Point: Replace this empty array in Round 3
  const coupons = [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Coupons</h1>
          <p className="text-xs text-gray-500">Create discount campaigns</p>
        </div>
        <Button disabled>Create Coupon</Button>
      </div>

      {coupons.length === 0 ? (
        <EmptyState message="No coupons available." />
      ) : (
        <div className="bg-white border rounded p-4">
          {/* Coupon codes list */}
        </div>
      )}
    </div>
  );
}
