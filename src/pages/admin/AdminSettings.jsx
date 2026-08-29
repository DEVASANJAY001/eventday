import React, { useState } from 'react';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

export default function AdminSettings() {
  const [storeInfo, setStoreInfo] = useState({
    name: 'Veyora E-Commerce',
    email: 'admin@veyora.local',
    currency: 'INR',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Settings</h1>
        <p className="text-xs text-gray-500">Configure parameters for Veyora</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-gray-200 p-6 rounded">
        <h3 className="font-semibold text-gray-800 text-sm uppercase">Store Settings</h3>
        <Input
          label="Store Name"
          value={storeInfo.name}
          onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
          required
        />
        <Input
          label="Support Email"
          type="email"
          value={storeInfo.email}
          onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
          required
        />
        <Select
          label="Primary Currency"
          options={[
            { label: 'Indian Rupee (₹)', value: 'INR' },
            { label: 'US Dollar ($)', value: 'USD' },
          ]}
          value={storeInfo.currency}
          onChange={(e) => setStoreInfo({ ...storeInfo, currency: e.target.value })}
          required
        />

        <div className="flex justify-end pt-4 border-t">
          <Button type="submit">Save Settings</Button>
        </div>
      </form>
    </div>
  );
}
