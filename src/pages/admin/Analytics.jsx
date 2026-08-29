import React from 'react';
import EmptyState from '../../components/ui/EmptyState';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Analytics</h1>
        <p className="text-xs text-gray-500">Sales performance charts</p>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded min-h-[300px] flex items-center justify-center">
        <EmptyState message="No analytics data available." />
      </div>
    </div>
  );
}
