import React from 'react';

export default function Dashboard() {
  const kpis = [
    { label: 'Total Sales', value: 'No data' },
    { label: 'Total Orders', value: '--' },
    { label: 'Total Customers', value: 'No data' },
    { label: 'Total Products', value: '--' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-xs text-gray-500">Overview metrics and charts</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-gray-200 p-4 rounded text-center">
            <span className="text-xs text-gray-400 font-semibold uppercase">{kpi.label}</span>
            <span className="block text-2xl font-bold text-gray-800 mt-1">{kpi.value}</span>
          </div>
        ))}
      </div>

      {/* Charts visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 p-6 rounded h-64 flex flex-col justify-between">
          <span className="text-xs font-bold text-gray-400 uppercase">Sales Revenue</span>
          <div className="flex-1 flex items-center justify-center text-xs text-gray-400 border border-dashed rounded bg-gray-50 mt-4">
            No data available.
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded h-64 flex flex-col justify-between">
          <span className="text-xs font-bold text-gray-400 uppercase">Daily Orders</span>
          <div className="flex-1 flex items-center justify-center text-xs text-gray-400 border border-dashed rounded bg-gray-50 mt-4">
            No data available.
          </div>
        </div>
      </div>
    </div>
  );
}
