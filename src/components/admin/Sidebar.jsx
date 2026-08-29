import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const adminLinks = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Products', path: '/admin/products' },
    { label: 'Add Product', path: '/admin/products/new' },
    { label: 'Categories', path: '/admin/categories' },
    { label: 'Orders', path: '/admin/orders' },
    { label: 'Customers', path: '/admin/customers' },
    { label: 'Inventory', path: '/admin/inventory' },
    { label: 'Coupons', path: '/admin/coupons' },
    { label: 'Analytics', path: '/admin/analytics' },
    { label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 py-6 px-4 flex-shrink-0">
      <div className="mb-8 px-2">
        <span className="font-bold text-gray-800 tracking-wider">VEYORA ADMIN</span>
      </div>
      <nav className="flex flex-col gap-1 text-xs uppercase tracking-wider font-semibold text-gray-600">
        {adminLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded transition-colors ${
                isActive ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
