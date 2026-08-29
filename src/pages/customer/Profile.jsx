import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function Profile() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-xs text-gray-500">Manage account information and settings</p>
        </div>
        <div className="flex gap-2">
          <Link to="/profile/addresses" className="text-xs border px-3 py-1.5 rounded hover:bg-gray-50">Addresses</Link>
          <Link to="/profile/settings" className="text-xs border px-3 py-1.5 rounded hover:bg-gray-50">Settings</Link>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded space-y-4 max-w-lg">
        <h3 className="font-semibold text-gray-800 text-sm uppercase">Personal details</h3>
        <div className="space-y-4">
          <Input label="Full Name" placeholder="Not set" readOnly />
          <Input label="Email" placeholder="Not set" readOnly />
          <Input label="Phone" placeholder="Not set" readOnly />
        </div>
        <div className="pt-4 border-t">
          <Button disabled>Edit Profile Details (Inert)</Button>
        </div>
      </div>
    </div>
  );
}
