import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function Addresses() {
  const addresses = [
    {
      id: 'addr-1',
      title: 'Home / Primary',
      name: 'Deva Sanjay',
      street: '42 Tech Boulevard, Suite 100',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      phone: '+91 98765 43210',
      isDefault: true,
    },
    {
      id: 'addr-2',
      title: 'Work / Office',
      name: 'Deva Sanjay',
      street: 'Tower 4, Innovation Park',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081',
      phone: '+91 98765 43210',
      isDefault: false,
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg gap-gutter">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-label-sm text-on-surface-variant uppercase tracking-wider mb-stack-sm">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link to="/profile" className="hover:text-primary transition-colors">Profile</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary font-bold">Addresses</span>
      </div>

      <div className="border-b border-outline-variant/30 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
            Saved Addresses
          </h1>
          <p className="text-body-sm text-on-surface-variant">
            Manage your shipping and delivery destinations.
          </p>
        </div>
        <Button variant="primary" icon="add">Add New Address</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft space-y-4 relative"
          >
            {addr.isDefault && (
              <span className="absolute top-4 right-4 bg-primary text-on-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                Default
              </span>
            )}
            <h3 className="font-headline-md text-primary font-bold text-lg">{addr.title}</h3>
            <div className="text-body-sm text-on-surface-variant space-y-1">
              <p className="font-semibold text-on-surface">{addr.name}</p>
              <p>{addr.street}</p>
              <p>{addr.city}, {addr.state} {addr.pincode}</p>
              <p className="pt-2 text-xs">Phone: {addr.phone}</p>
            </div>
            <div className="flex gap-2 pt-2 border-t border-outline-variant/20">
              <button className="text-xs text-primary font-semibold hover:underline">Edit</button>
              <span className="text-outline-variant">•</span>
              <button className="text-xs text-error font-semibold hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
