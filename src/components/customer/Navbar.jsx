import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { totalCartCount, wishlistIds } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navCategories = [
    { label: 'All Products', path: '/products' },
    { label: 'Women', path: '/category/women' },
    { label: 'Men', path: '/category/men' },
    { label: 'Gadgets', path: '/category/gadgets' },
    { label: 'Home', path: '/category/home' },
    { label: 'Special Offers', path: '/category/special-offers', isSpecial: true },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md shadow-nav-subtle transition-all">
      {/* Top Primary Bar */}
      <div className="h-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between gap-gutter">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-stack-sm flex-shrink-0 group">
          <img
            alt="PioMart Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY_tHE6AWhYfsMJ88RKo6ouSlLmrU4MXuwKy6IT27I9kDb2_FUFU7j_NH3RfU-Y_QYAbegkRk072LLbCS4MmsOweZ-KkFSOdhT89xdYEVfamILz12VPM3Z2lvlwS43Ko5fE3uCpDd34I6IqpLcOX7dY89rVcVLP_r1LB0vlEGzpXAk1cvmwkf3W6Bv8cAwILxy13aGSHxbmPndV6ZsBIo1Cuyqnr3YagK-N_MQX9wNIpFCgmmaKA"
          />
          <span className="font-headline-md text-headline-md text-primary tracking-tight">
            PioMart
          </span>
        </Link>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-2xl mx-2 md:mx-gutter">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Search products, brands and categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-full py-2.5 md:py-3 pl-11 md:pl-12 pr-6 text-body-sm text-on-surface focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-on-surface-variant/70"
            />
          </form>
        </div>

        {/* Right Navigation & Utility Actions */}
        <div className="flex items-center gap-2 md:gap-stack-md flex-shrink-0">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative flex items-center justify-center p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors"
            title="Wishlist"
          >
            <span className="material-symbols-outlined text-[22px]">favorite</span>
            {wishlistIds.length > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors"
            title="Shopping Cart"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
            {totalCartCount > 0 && (
              <span className="absolute top-0 right-0 bg-secondary text-on-secondary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {totalCartCount}
              </span>
            )}
          </Link>

          {/* User Profile */}
          <Link
            to="/profile"
            className="flex items-center gap-stack-sm ml-1 md:ml-stack-sm p-1 rounded-full hover:bg-surface-container transition-colors"
            title="My Profile"
          >
            <img
              alt="Profile"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover ring-2 ring-surface-variant"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEeZukfD0PyCs7V-ESAVDJOih52NKMIKtgqRy2TfbaHp6bgvBzfimSJR7o9YGazDasJF1Q4dG98hVfgb0cr_vRzM1_JqXupRrQBXiKSZIIGM-LLFByGTfJ5NnQ70Xrnd14nQ3nWZyiRjEDxxN-c2mKP6xdjpNLFMlD4K8_DVV4IooNFYByVFExdd8-03Q8rS9WDtrNqeVaCx0Hs4oCaB0U2BvHR0QHeKW_klE4eI2bNaQfJQE89w"
            />
            <span className="hidden lg:block font-label-md text-label-md text-on-surface-variant pr-2">
              Account
            </span>
          </Link>

          {/* Admin Switch Link */}
          <Link
            to="/admin/dashboard"
            className="hidden sm:inline-flex text-[11px] font-semibold bg-surface-container-high text-on-surface-variant hover:text-primary px-2.5 py-1 rounded-md transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>

      {/* Secondary Category Navigation Bar */}
      <nav className="bg-surface-container-low border-t border-outline-variant/30 overflow-x-auto scrollbar-hide">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex items-center gap-6 md:gap-8 h-12">
          {navCategories.map((cat) => (
            <NavLink
              key={cat.path}
              to={cat.path}
              className={({ isActive }) =>
                `font-label-md text-label-md whitespace-nowrap transition-colors py-1 ${
                  cat.isSpecial
                    ? 'text-secondary hover:text-secondary-container font-semibold'
                    : isActive
                    ? 'text-primary font-bold border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`
              }
            >
              {cat.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
