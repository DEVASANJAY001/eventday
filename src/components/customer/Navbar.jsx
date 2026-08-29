import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-wider text-gray-900">
            VEYORA
          </Link>
          <span className="text-xs text-gray-500 font-medium ml-2">Modern E-Commerce Platform</span>
        </div>

        {/* Navigation links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <Link to="/category/all" className="hover:text-blue-600">Categories</Link>
        </nav>

        {/* Search, wishlist, cart, profile */}
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-l px-2.5 py-1.5 text-xs focus:outline-none"
            />
            <button type="submit" className="bg-blue-600 text-white px-3 py-1.5 text-xs rounded-r">
              Go
            </button>
          </form>
          
          <Link to="/wishlist" className="text-gray-600 hover:text-blue-600">Wishlist</Link>
          <Link to="/cart" className="text-gray-600 hover:text-blue-600">Cart</Link>
          <Link to="/profile" className="text-gray-600 hover:text-blue-600">Profile</Link>
        </div>
      </div>
    </header>
  );
}
