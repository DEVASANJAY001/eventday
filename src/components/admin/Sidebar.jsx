import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Sidebar() {
  const adminLinks = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { label: 'Products', path: '/admin/products', icon: 'inventory_2' },
    { label: 'Add Product', path: '/admin/products/new', icon: 'add_box' },
    { label: 'Categories', path: '/admin/categories', icon: 'category' },
    { label: 'Orders', path: '/admin/orders', icon: 'receipt_long' },
    { label: 'Customers', path: '/admin/customers', icon: 'group' },
    { label: 'Inventory', path: '/admin/inventory', icon: 'warehouse' },
    { label: 'Coupons', path: '/admin/coupons', icon: 'confirmation_number' },
    { label: 'Analytics', path: '/admin/analytics', icon: 'monitoring' },
    { label: 'Settings', path: '/admin/settings', icon: 'settings' },
  ];

  return (
    <aside className="w-64 bg-primary text-on-primary py-6 px-4 flex-shrink-0 min-h-screen flex flex-col justify-between">
      <div>
        {/* Admin Brand */}
        <Link to="/" className="flex items-center gap-3 px-3 mb-8 group">
          <img
            alt="PioMart Logo"
            className="h-7 w-auto object-contain brightness-0 invert"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY_tHE6AWhYfsMJ88RKo6ouSlLmrU4MXuwKy6IT27I9kDb2_FUFU7j_NH3RfU-Y_QYAbegkRk072LLbCS4MmsOweZ-KkFSOdhT89xdYEVfamILz12VPM3Z2lvlwS43Ko5fE3uCpDd34I6IqpLcOX7dY89rVcVLP_r1LB0vlEGzpXAk1cvmwkf3W6Bv8cAwILxy13aGSHxbmPndV6ZsBIo1Cuyqnr3YagK-N_MQX9wNIpFCgmmaKA"
          />
          <div>
            <span className="font-headline text-lg font-bold tracking-tight block leading-none">
              PioMart
            </span>
            <span className="text-[10px] text-on-primary-container uppercase tracking-widest">
              Admin Portal
            </span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1.5 font-label-md text-xs">
          {adminLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-secondary text-on-secondary font-bold shadow-sm'
                    : 'text-on-primary/70 hover:bg-primary-container hover:text-on-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Storefront return button */}
      <div className="pt-6 border-t border-primary-container">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 text-xs text-on-primary-container hover:text-on-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">storefront</span>
          Back to Storefront
        </Link>
      </div>
    </aside>
  );
}
