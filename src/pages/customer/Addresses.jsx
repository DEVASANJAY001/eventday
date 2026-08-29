import React from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

export default function Addresses() {
  // Integration Point: Replace this empty array with addresses in Round 3
  const addresses = [];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Saved Addresses</h1>
          <p className="text-xs text-gray-500"><Link to="/profile" className="text-blue-600 hover:underline">Profile</Link> / Addresses</p>
        </div>
        <Button disabled>Add Address</Button>
      </div>

      {addresses.length === 0 ? (
        <EmptyState message="No addresses found." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Address lists */}
        </div>
      )}
    </div>
  );
}
