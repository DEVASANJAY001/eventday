import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function Settings() {
  const [orderUpdates, setOrderUpdates] = useState(true);

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
        <p className="text-xs text-gray-500"><Link to="/profile" className="text-blue-600 hover:underline">Profile</Link> / Settings</p>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded space-y-6 max-w-lg">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm">Notification settings</h3>
          <label className="flex items-center gap-3 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={orderUpdates}
              onChange={(e) => setOrderUpdates(e.target.checked)}
            />
            Receive email notifications about order shipments
          </label>
        </div>

        <div className="border-t pt-6 space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm">Session Control</h3>
          <p className="text-xs text-gray-500">Sign out of active account sessions.</p>
          <Button className="bg-red-600 hover:bg-red-700">Logout (Inert)</Button>
        </div>
      </div>
    </div>
  );
}
