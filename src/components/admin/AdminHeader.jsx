import React from 'react';

export default function AdminHeader() {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="font-bold text-gray-800 text-sm">VEYORA ADMIN SYSTEM</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <input
          type="text"
          placeholder="Search admin dashboard..."
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
          readOnly
        />
        <span>System Admin</span>
      </div>
    </header>
  );
}
