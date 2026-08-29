import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 px-6 mt-12 text-sm text-gray-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-bold text-gray-800 mb-2">VEYORA</h4>
          <p className="text-xs">Modern E-Commerce Platform</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-2">Shop Navigation</h4>
          <ul className="space-y-1 text-xs">
            <li><Link to="/products" className="hover:underline">All Products</Link></li>
            <li><Link to="/category/all" className="hover:underline">Categories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-2">Quick Links</h4>
          <ul className="space-y-1 text-xs">
            <li><Link to="/orders" className="hover:underline">My Orders</Link></li>
            <li><Link to="/profile" className="hover:underline">My Profile</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-200 mt-6 pt-4 text-xs text-center">
        <p>&copy; {new Date().getFullYear()} VEYORA. All rights reserved.</p>
      </div>
    </footer>
  );
}
