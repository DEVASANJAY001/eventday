import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const userMenuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { totalCartCount, wishlistIds } = useCart();
  const { user, profile, isAdmin, signOut } = useAuth();

  // Close menus on route change
  useEffect(() => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileSearchOpen(false);
    }
  };

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    await signOut();
    navigate('/');
  };

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navCategories = [
    { label: 'All Products', path: '/products', icon: 'grid_view' },
    { label: 'Women', path: '/category/women', icon: 'apparel' },
    { label: 'Men', path: '/category/men', icon: 'man' },
    { label: 'Gadgets', path: '/category/gadgets', icon: 'devices' },
    { label: 'Home', path: '/category/home', icon: 'chair' },
    { label: 'Special Offers', path: '/category/special-offers', icon: 'local_offer', isSpecial: true },
  ];

  const userAvatar = profile?.avatar_url || user?.user_metadata?.avatar_url || user?.user_metadata?.picture || 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=00120f&textColor=ffffff';
  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Account';

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/95 backdrop-blur-md shadow-nav-subtle transition-all">
      {/* Top Primary Navigation Bar */}
      <div className="h-16 md:h-20 max-w-container-max mx-auto px-4 sm:px-6 md:px-margin-desktop flex items-center justify-between gap-2 sm:gap-4 md:gap-gutter">
        
        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open Navigation Menu"
          className="lg:hidden p-2 -ml-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0 group">
          <img
            alt="PioMart Logo"
            className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY_tHE6AWhYfsMJ88RKo6ouSlLmrU4MXuwKy6IT27I9kDb2_FUFU7j_NH3RfU-Y_QYAbegkRk072LLbCS4MmsOweZ-KkFSOdhT89xdYEVfamILz12VPM3Z2lvlwS43Ko5fE3uCpDd34I6IqpLcOX7dY89rVcVLP_r1LB0vlEGzpXAk1cvmwkf3W6Bv8cAwILxy13aGSHxbmPndV6ZsBIo1Cuyqnr3YagK-N_MQX9wNIpFCgmmaKA"
          />
          <span className="font-headline text-lg sm:text-xl md:text-headline-md font-bold text-primary tracking-tight">
            PioMart
          </span>
        </Link>

        {/* Desktop Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-2 md:mx-gutter">
          <form onSubmit={handleSearch} className="relative flex items-center w-full">
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
        <div className="flex items-center gap-1 sm:gap-2 md:gap-stack-md flex-shrink-0">
          
          {/* Mobile Search Toggle Icon */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen(prev => !prev)}
            aria-label="Toggle Search"
            className="md:hidden p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileSearchOpen ? 'close' : 'search'}
            </span>
          </button>

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

          {/* Shopping Cart */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors"
            title="Shopping Cart"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
            {totalCartCount > 0 && (
              <span className="absolute top-0 right-0 bg-secondary text-on-secondary text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-sm">
                {totalCartCount}
              </span>
            )}
          </Link>

          {/* User Auth Section */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen(prev => !prev)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-surface-container transition-colors"
                aria-label="User Account Menu"
              >
                <img
                  alt={displayName}
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full object-cover ring-2 ring-primary/20"
                  src={userAvatar}
                />
                <span className="hidden lg:block font-label-md text-label-md text-on-surface-variant pr-1 max-w-[100px] truncate">
                  {displayName.split(' ')[0]}
                </span>
                <span className="hidden sm:inline-block material-symbols-outlined text-[16px] text-on-surface-variant">
                  expand_more
                </span>
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-xl py-2 z-50 space-y-1">
                  <div className="px-4 py-2 border-b border-outline-variant/20">
                    <p className="font-label-md text-xs text-on-surface font-bold truncate">{displayName}</p>
                    <p className="text-[11px] text-on-surface-variant truncate">{user.email}</p>
                    {isAdmin && (
                      <span className="inline-block bg-primary-fixed text-primary text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">
                        Administrator
                      </span>
                    )}
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-secondary hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                      Admin Dashboard
                    </Link>
                  )}

                  <Link
                    to="/orders"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                    My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                    My Wishlist
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">account_circle</span>
                    Profile Settings
                  </Link>

                  <div className="border-t border-outline-variant/20 pt-1">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-error hover:bg-error/5 transition-colors text-left"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="bg-primary text-on-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-label-md hover:bg-primary-container transition-all shadow-sm whitespace-nowrap"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Admin Direct Button for Admins */}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold bg-primary text-on-primary hover:bg-primary-container px-3 py-1.5 rounded-full transition-colors shadow-sm whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[14px]">shield</span>
              Admin
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Search Dropdown Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 bg-surface border-b border-outline-variant/30 animate-fadeIn">
          <form onSubmit={handleSearch} className="relative flex items-center w-full">
            <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[18px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              autoFocus
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-full py-2 pl-10 pr-4 text-xs text-on-surface focus:ring-2 focus:ring-primary/20 outline-none placeholder:text-on-surface-variant/70"
            />
          </form>
        </div>
      )}

      {/* Secondary Category Navigation Bar */}
      <nav className="bg-surface-container-low border-t border-outline-variant/30 overflow-x-auto scrollbar-hide">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-margin-desktop flex items-center gap-4 sm:gap-6 md:gap-8 h-10 sm:h-11 md:h-12">
          {navCategories.map((cat) => (
            <NavLink
              key={cat.path}
              to={cat.path}
              className={({ isActive }) =>
                `font-label-md text-xs sm:text-label-md whitespace-nowrap transition-colors py-1 flex items-center gap-1.5 ${
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

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-primary/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm bg-surface h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-slideRight">
            <div>
              {/* Drawer Header */}
              <div className="p-5 border-b border-outline-variant/20 flex items-center justify-between">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <img
                    alt="PioMart"
                    className="h-7 w-auto"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY_tHE6AWhYfsMJ88RKo6ouSlLmrU4MXuwKy6IT27I9kDb2_FUFU7j_NH3RfU-Y_QYAbegkRk072LLbCS4MmsOweZ-KkFSOdhT89xdYEVfamILz12VPM3Z2lvlwS43Ko5fE3uCpDd34I6IqpLcOX7dY89rVcVLP_r1LB0vlEGzpXAk1cvmwkf3W6Bv8cAwILxy13aGSHxbmPndV6ZsBIo1Cuyqnr3YagK-N_MQX9wNIpFCgmmaKA"
                  />
                  <span className="font-headline font-bold text-primary text-lg">PioMart</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>

              {/* User profile card inside drawer */}
              {user ? (
                <div className="p-4 mx-4 my-3 bg-surface-container-low rounded-2xl flex items-center gap-3">
                  <img
                    src={userAvatar}
                    alt={displayName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs text-on-surface truncate">{displayName}</p>
                    <p className="text-[11px] text-on-surface-variant truncate">{user.email}</p>
                    {isAdmin && (
                      <span className="inline-block bg-primary-fixed text-primary text-[9px] font-bold px-2 py-0.5 rounded-full mt-0.5">
                        Admin
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 mx-4 my-3 bg-surface-container-low rounded-2xl text-center space-y-2">
                  <p className="text-xs text-on-surface-variant">Sign in for saved items, orders & express checkout</p>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full bg-primary text-on-primary py-2 rounded-xl text-xs font-bold shadow-sm"
                  >
                    Sign In / Register
                  </Link>
                </div>
              )}

              {/* Navigation Categories */}
              <div className="px-4 py-2 space-y-1">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider px-3 block mb-2">
                  Categories & Catalog
                </span>
                {navCategories.map((cat) => (
                  <Link
                    key={cat.path}
                    to={cat.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                      cat.isSpecial
                        ? 'text-secondary font-bold bg-secondary/5'
                        : 'text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant">{cat.icon}</span>
                    {cat.label}
                  </Link>
                ))}
              </div>

              {/* Account Quick Links */}
              <div className="px-4 py-2 border-t border-outline-variant/20 space-y-1 mt-2">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider px-3 block mb-2">
                  My Account
                </span>
                <Link
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-on-surface hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant">receipt_long</span>
                  My Orders
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-on-surface hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant">favorite</span>
                  Wishlist ({wishlistIds.length})
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-on-surface hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant">shopping_cart</span>
                  Shopping Cart ({totalCartCount})
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-on-surface hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant">account_circle</span>
                  Profile Settings
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold text-secondary bg-secondary/5 mt-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                    Admin Control Center
                  </Link>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-outline-variant/20">
              {user && (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-error font-bold rounded-xl hover:bg-error/5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
