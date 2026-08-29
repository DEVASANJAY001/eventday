import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../../components/customer/ProductGrid';
import { productService } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import LoadingSpinner, { SkeletonCard } from '../../components/ui/LoadingSpinner';

export default function Home() {
  const { addToCart } = useCart();
  const [dealTab, setDealTab] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getProducts()
      .then(data => { setProducts(data || []); setLoading(false); })
      .catch(() => setLoading(false));

    const unsubscribe = productService.subscribeToProducts(() => {
      productService.getProducts().then(data => setProducts(data || [])).catch(() => {});
    });
    return () => unsubscribe();
  }, []);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 35, seconds: 40, ms: 40 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.ms > 0) return { ...prev, ms: prev.ms - 1 };
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1, ms: 59 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59, ms: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59, ms: 59 };
        return { hours: 2, minutes: 35, seconds: 40, ms: 40 };
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const dealPills = [
    { id: 'all', label: 'All Deals' },
    { id: 'under-50', label: 'Under $50' },
    { id: 'almost-sold', label: 'Almost Sold Out', highlight: true },
    { id: 'gadgets', label: 'Gadgets & Tech' },
    { id: 'fashion', label: 'Apparel' },
    { id: 'home', label: 'Home & Living' },
  ];

  const filteredDeals = dealTab === 'all'
    ? products.filter(p => p.isDeal || p.badge === 'Sale').slice(0, 5)
    : dealTab === 'under-50'
    ? products.filter(p => p.price < 50).slice(0, 5)
    : dealTab === 'almost-sold'
    ? products.filter(p => (p.stock || 50) <= 25).slice(0, 5)
    : dealTab === 'gadgets'
    ? products.filter(p => p.category === 'gadgets').slice(0, 5)
    : dealTab === 'fashion'
    ? products.filter(p => p.category === 'women' || p.category === 'men').slice(0, 5)
    : products.filter(p => p.category === 'home').slice(0, 5);

  const featuredTrending = products.slice(0, 8);

  return (
    <div className="flex flex-col w-full font-body-md text-on-surface">
      {/* Hero Section (Bento Grid) */}
      <section className="max-w-container-max mx-auto px-4 sm:px-6 md:px-margin-desktop mb-8 sm:mb-12 md:mb-section-gap w-full mt-4 sm:mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-gutter">
          {/* Main Hero Card */}
          <div className="lg:col-span-8 bg-surface-container-low rounded-2xl sm:rounded-3xl overflow-hidden relative group flex flex-col md:flex-row min-h-[380px] sm:min-h-[420px] lg:min-h-[500px] transition-all duration-300 hover:shadow-card-hover border border-outline-variant/20">
            <div className="flex-1 p-6 sm:p-8 md:p-12 flex flex-col justify-center z-10">
              <span className="inline-block px-3 py-1 bg-surface-variant text-on-surface-variant font-label-sm rounded-full mb-3 sm:mb-4 self-start text-[11px] sm:text-xs">
                Featured Collection
              </span>
              <h1 className="font-headline-xl text-2xl sm:text-3xl md:text-4xl lg:text-headline-xl text-on-surface mb-3 sm:mb-4 leading-tight tracking-tight font-bold">
                Best Furniture<br className="hidden sm:block" /> & Lifestyle
              </h1>
              <p className="text-xs sm:text-body-md text-on-surface-variant mb-6 sm:mb-8 max-w-sm leading-relaxed">
                Dining, living, & tech accessories designed to elevate your everyday space in total harmony.
              </p>
              <Link
                to="/products"
                className="bg-primary text-on-primary px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-label-md hover:bg-primary-container transition-all self-start shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 duration-200 inline-flex items-center gap-2 text-xs sm:text-sm font-bold"
              >
                Shop Now
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
            <div className="flex-1 h-52 sm:h-64 md:h-full relative overflow-hidden flex items-end justify-center p-4 sm:p-6">
              {loading ? (
                <div className="w-full h-full bg-surface-container-low rounded-2xl animate-pulse" />
              ) : products[0]?.image ? (
                <img
                  src={products[0].image}
                  alt="Featured Collection"
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                />
              ) : null}
            </div>
          </div>

          {/* Side Tiles */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 md:gap-gutter">
            {loading ? (
              <>
                <div className="bg-surface-container-low rounded-2xl sm:rounded-3xl animate-pulse h-36 sm:h-48 lg:h-[240px]" />
                <div className="bg-surface-container-low rounded-2xl sm:rounded-3xl animate-pulse h-36 sm:h-48 lg:h-[240px]" />
              </>
            ) : (
              <>
                <Link
                  to="/category/gadgets"
                  className="bg-surface-container-low rounded-2xl sm:rounded-3xl overflow-hidden relative group flex flex-col justify-end p-4 sm:p-6 h-36 sm:h-48 lg:h-[240px] hover:shadow-card-hover transition-all border border-outline-variant/20"
                >
                  {products[1]?.image && (
                    <img
                      src={products[1].image}
                      alt={products[1]?.name || 'Gadgets'}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="relative z-10">
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-secondary block">Trending</span>
                    <span className="text-on-surface font-label-md text-xs sm:text-base font-bold">Gadgets & Wearables</span>
                  </div>
                </Link>
                <Link
                  to="/category/home"
                  className="bg-surface-container-low rounded-2xl sm:rounded-3xl overflow-hidden relative group flex flex-col justify-end p-4 sm:p-6 h-36 sm:h-48 lg:h-[240px] hover:shadow-card-hover transition-all border border-outline-variant/20"
                >
                  {products[2]?.image && (
                    <img
                      src={products[2].image}
                      alt={products[2]?.name || 'Home'}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="relative z-10">
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-secondary block">Designer</span>
                    <span className="text-on-surface font-label-md text-xs sm:text-base font-bold">Home & Living</span>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Flash Deals Section */}
      <section className="max-w-container-max mx-auto px-4 sm:px-6 md:px-margin-desktop mb-8 sm:mb-12 md:mb-section-gap w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-stack-md">
          <div>
            <span className="text-secondary font-bold text-[11px] sm:text-xs uppercase tracking-widest block mb-0.5">
              Limited Time Deals
            </span>
            <h2 className="font-headline text-xl sm:text-2xl md:text-headline-lg font-bold text-primary tracking-tight">
              Weekly Flash Sales
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-primary font-bold bg-surface-container px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-outline-variant/30 self-start sm:self-auto text-xs sm:text-sm">
            <span className="material-symbols-outlined text-secondary text-[16px] sm:text-[18px]">timer</span>
            <span>
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Deal Pills Scrollable Row */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4 sm:mb-6">
          {dealPills.map(pill => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setDealTab(pill.id)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full font-label-sm text-xs font-semibold whitespace-nowrap transition-all ${
                dealTab === pill.id
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredDeals.length > 0 ? (
          <ProductGrid products={filteredDeals} columns={5} />
        ) : (
          <ProductGrid products={featuredTrending.slice(0, 5)} columns={5} />
        )}
      </section>

      {/* Trending Live Catalog */}
      <section className="max-w-container-max mx-auto px-4 sm:px-6 md:px-margin-desktop mb-8 sm:mb-12 md:mb-section-gap w-full">
        <div className="flex items-center justify-between mb-4 sm:mb-stack-md">
          <div>
            <span className="text-secondary font-bold text-[11px] sm:text-xs uppercase tracking-widest block mb-0.5">
              Live Catalog
            </span>
            <h2 className="font-headline text-xl sm:text-2xl md:text-headline-lg font-bold text-primary tracking-tight">
              Trending Products
            </h2>
          </div>
          <Link to="/products" className="text-secondary font-bold text-xs sm:text-sm hover:underline inline-flex items-center gap-1">
            View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <ProductGrid products={featuredTrending} columns={4} />
        )}
      </section>
    </div>
  );
}
