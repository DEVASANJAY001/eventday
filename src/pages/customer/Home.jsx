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
    { id: 'almost-sold', label: 'Almost Sold out', highlight: true },
    { id: 'gadgets', label: 'Gadgets & Tech' },
    { id: 'fashion', label: 'Fashion & Apparel' },
    { id: 'home', label: 'Home & Living' },
  ];

  const featuredDeals = products.filter(p => p.isDeal || p.badge === 'Sale').slice(0, 5);
  const featuredTrending = products.slice(0, 8);

  return (
    <div className="flex flex-col w-full font-body-md text-on-surface">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap w-full mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter h-auto lg:h-[600px]">
          {/* Main Hero Tile */}
          <div className="lg:col-span-8 bg-surface-container-low rounded-xl overflow-hidden relative group flex flex-col md:flex-row h-[420px] lg:h-full transition-all duration-300 hover:shadow-card-hover border border-outline-variant/20">
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center z-10">
              <span className="inline-block px-3 py-1 bg-surface-variant text-on-surface-variant font-label-sm rounded-full mb-4 self-start">
                Featured Collection
              </span>
              <h1 className="font-headline-xl text-headline-xl text-on-surface mb-4 leading-tight tracking-tight">
                Best Furniture<br />& Lifestyle
              </h1>
              <p className="text-body-md text-on-surface-variant mb-8 max-w-sm leading-relaxed">
                Dining, living, & tech accessories designed to elevate your everyday space.
              </p>
              <Link
                to="/products"
                className="bg-primary text-on-primary px-8 py-3.5 rounded-lg font-label-md hover:bg-primary-container transition-all self-start shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 duration-200 inline-flex items-center gap-2"
              >
                Shop Now
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
            <div className="flex-1 h-64 md:h-full relative overflow-hidden flex items-end justify-center p-6">
              {loading ? (
                <div className="w-full h-full bg-surface-container-low rounded-xl animate-pulse" />
              ) : products[0]?.image ? (
                <img
                  src={products[0].image}
                  alt="Featured"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
              ) : null}
            </div>
          </div>

          {/* Side tiles */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-gutter h-full">
            {loading ? (
              <>
                <div className="bg-surface-container-low rounded-xl animate-pulse h-48 lg:h-full" />
                <div className="bg-surface-container-low rounded-xl animate-pulse h-48 lg:h-full" />
              </>
            ) : (
              <>
                <Link
                  to="/category/gadgets"
                  className="bg-surface-container-low rounded-xl overflow-hidden relative group flex flex-col justify-end p-5 h-48 lg:h-full hover:shadow-card-hover transition-all border border-outline-variant/20"
                >
                  {products[1]?.image && (
                    <img
                      src={products[1].image}
                      alt={products[1]?.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <span className="relative z-10 text-on-surface font-label-md text-sm font-bold">Gadgets & Tech</span>
                </Link>
                <Link
                  to="/category/home"
                  className="bg-surface-container-low rounded-xl overflow-hidden relative group flex flex-col justify-end p-5 h-48 lg:h-full hover:shadow-card-hover transition-all border border-outline-variant/20"
                >
                  {products[2]?.image && (
                    <img
                      src={products[2].image}
                      alt={products[2]?.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <span className="relative z-10 text-on-surface font-label-md text-sm font-bold">Home & Living</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Deals Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-stack-md">
          <div>
            <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-1">Limited Time</span>
            <h2 className="font-headline-lg text-primary tracking-tight text-2xl font-bold">Weekly Flash Deals</h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-primary font-bold bg-surface-container px-4 py-2 rounded-xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-secondary text-[18px]">timer</span>
            <span className="text-sm">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Deal pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          {dealPills.map(pill => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setDealTab(pill.id)}
              className={`px-4 py-1.5 rounded-full font-label-sm text-xs font-semibold transition-all ${
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : featuredDeals.length > 0 ? (
          <ProductGrid products={featuredDeals} columns={5} />
        ) : (
          <ProductGrid products={featuredTrending.slice(0, 5)} columns={5} />
        )}
      </section>

      {/* Trending Now */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap w-full">
        <div className="flex items-center justify-between mb-stack-md">
          <div>
            <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-1">Live Catalog</span>
            <h2 className="font-headline-lg text-primary tracking-tight text-2xl font-bold">All Products</h2>
          </div>
          <Link to="/products" className="text-secondary font-bold text-sm hover:underline inline-flex items-center gap-1">
            View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <ProductGrid products={featuredTrending} columns={4} />
        )}
      </section>
    </div>
  );
}
