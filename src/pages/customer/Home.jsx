import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../../components/customer/ProductGrid';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { useCart } from '../../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();
  const [dealTab, setDealTab] = useState('all');

  // Countdown timer simulation for Weekly Deals
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 35,
    seconds: 40,
    ms: 40,
  });

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
    { id: 'all', label: 'Up to 90% off' },
    { id: 'under-50', label: 'Under $50' },
    { id: 'almost-sold', label: 'Almost Sold out', highlight: true },
    { id: 'gadgets', label: 'Gadgets & Tech' },
    { id: 'fashion', label: 'Fashion & Apparel' },
    { id: 'home', label: 'Home & Living' },
  ];

  const featuredDeals = MOCK_PRODUCTS.filter(p => p.isDeal).slice(0, 5);
  const featuredTrending = MOCK_PRODUCTS.slice(0, 8);

  return (
    <div className="flex flex-col w-full font-body-md text-on-surface">
      {/* Hero Section (Bento Grid Style from Stitch) */}
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
                Dining, living, & tech accessories designed to elevate your everyday space in total harmony.
              </p>
              <Link
                to="/products"
                className="bg-primary text-on-primary px-8 py-3.5 rounded-lg font-label-md hover:bg-primary-container transition-all self-start shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 duration-200 inline-flex items-center gap-2"
              >
                Shop Now
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>

            <div className="absolute right-0 bottom-0 w-full md:w-3/5 h-3/5 md:h-full z-0 overflow-hidden pointer-events-none">
              <div
                className="w-full h-full bg-cover bg-center md:bg-right-bottom group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{
                  backgroundImage: `url('/hero_furniture.jpg')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-surface-container-low/60 md:via-transparent to-transparent" />
            </div>
          </div>

          {/* Right Column Bento Tiles */}
          <div className="lg:col-span-4 flex flex-col gap-gutter h-full">
            {/* Top Right Tile */}
            <div className="flex-1 bg-[#F9F5F0] rounded-xl overflow-hidden relative group p-8 transition-all duration-300 hover:shadow-card-hover border border-outline-variant/20 min-h-[260px] flex flex-col justify-between">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <span className="text-secondary font-label-md font-bold uppercase tracking-wider block mb-1">
                    Super Sale 50%
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface leading-tight max-w-[200px]">
                    Stylish Looks For Any Season
                  </h2>
                </div>
                <Link
                  to="/category/women"
                  className="bg-secondary text-on-secondary px-6 py-2.5 rounded-full font-label-sm hover:bg-secondary-container transition-colors self-start shadow-sm mt-4 inline-flex items-center gap-1.5"
                >
                  Shop Now
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </Link>
              </div>

              <div className="absolute right-0 bottom-0 w-2/3 h-[120%] -mb-8 z-0 overflow-hidden pointer-events-none">
                <div
                  className="w-full h-full bg-contain bg-no-repeat bg-bottom group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDofTtB3-ecd-hOR-RMTcNw6GNnUj8ENjrHVbErNGWHoVJclMB_gbDgvKc15nV9hSRsClbBAUHK_v8ZhV0UJO3KQ_GQJOJnSwqJA1V44HAG4SXW4GQr_sdPqZuN9m1fMqjkhMT-k6PUn-oxCFXs20u956stjvcA1HsfMaEQ-aqTzCEVGKqDP82g94rQ9f31Aq693mHO6UqAhX664bc2SaJwkYyyAjGyY3K1D1Koqk6tC7i8-skZqQ')`,
                  }}
                />
              </div>
            </div>

            {/* Bottom Right Tile */}
            <div className="flex-1 bg-surface-container-low rounded-xl overflow-hidden relative group p-8 transition-all duration-300 hover:shadow-card-hover border border-outline-variant/20 min-h-[260px] flex flex-col justify-between">
              <div className="relative z-10 w-3/5 h-full flex flex-col justify-center">
                <span className="text-on-surface-variant font-label-sm uppercase tracking-wider block mb-1">
                  Super Sale 50%
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface leading-tight mb-4">
                  Stylish Men's<br />Fashion
                </h2>
                <Link
                  to="/category/men"
                  className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-sm hover:bg-primary-container transition-colors self-start shadow-sm inline-flex items-center gap-1.5"
                >
                  Shop Now
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </Link>
              </div>

              <div className="absolute right-0 bottom-0 w-3/4 h-[115%] z-0 overflow-hidden pointer-events-none">
                <div
                  className="w-full h-full bg-contain bg-no-repeat bg-bottom group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxHY7RsuEf4B_lF44kjMOa5VjN-ZP5121JkgpFlfK85DDtehEx9QBSYl_0twuydYuRGujueTr8soGwJDD7aNGbig2IBjVUaWia0EoA5HjpBKBDDSn1unDjVRflWqFfuuXHXmrSfRArSpZv5NSU1uYMww42WsxEycZ5kkVLbCU1o6d_nxfXNpSuIKQJEOlPR2G8Q0RUApJBeQSv9m_hAby9jJTA-uzG2jQELKiFYUQbvoIyl5RxAQ')`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Best Deals Section (Deep Forest Background from Stitch) */}
      <section className="w-full bg-primary py-section-gap text-on-primary">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Header & Live Countdown Timer */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <span className="text-secondary-fixed text-xs font-bold uppercase tracking-widest block mb-1">
                Flash Discounts
              </span>
              <h2 className="font-headline-xl text-headline-xl text-on-primary tracking-tight">
                Weekly Best Deals
              </h2>
            </div>

            <div className="flex items-center gap-4 bg-primary-container px-5 py-2.5 rounded-2xl border border-outline/30">
              <span className="text-on-primary/80 font-body-sm hidden sm:inline">Limited time only:</span>
              <div className="flex gap-1.5 font-headline-md text-on-primary items-center">
                <span className="bg-error px-2.5 py-1 rounded text-on-error font-mono text-sm font-bold">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-error font-bold">:</span>
                <span className="bg-error px-2.5 py-1 rounded text-on-error font-mono text-sm font-bold">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-error font-bold">:</span>
                <span className="bg-error px-2.5 py-1 rounded text-on-error font-mono text-sm font-bold">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-error font-bold">:</span>
                <span className="bg-error px-2.5 py-1 rounded text-on-error font-mono text-sm font-bold">
                  {String(timeLeft.ms).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
            {dealPills.map(pill => (
              <button
                key={pill.id}
                type="button"
                onClick={() => setDealTab(pill.id)}
                className={`px-6 py-2 rounded-full font-label-md transition-all whitespace-nowrap text-sm ${
                  pill.highlight
                    ? 'bg-secondary-container text-on-secondary-container font-semibold shadow-sm'
                    : dealTab === pill.id
                    ? 'bg-on-primary text-primary font-bold shadow-md'
                    : 'border border-on-primary/20 text-on-primary hover:bg-on-primary/10'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* 5-Card Deals Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {featuredDeals.map((product) => (
              <div
                key={product.id}
                className="bg-surface rounded-xl p-4 flex flex-col group relative shadow-card-soft hover:-translate-y-1 transition-all duration-300 hover:shadow-card-hover text-on-surface"
              >
                <span className="absolute top-4 left-4 bg-error text-on-error text-[10px] font-bold px-2 py-0.5 rounded uppercase z-10">
                  Sale
                </span>

                <Link
                  to={`/product/${product.id}`}
                  className="relative w-full aspect-square mb-4 bg-surface-container-low rounded-lg overflow-hidden p-4 flex items-center justify-center"
                >
                  <img
                    className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    src={product.image}
                    alt={product.name}
                  />
                </Link>

                <Link to={`/product/${product.id}`}>
                  <h3 className="font-label-md text-on-surface hover:text-primary transition-colors mb-2 line-clamp-2 text-sm leading-snug">
                    {product.name}
                  </h3>
                </Link>

                {product.hasMotionView && (
                  <div className="flex items-center gap-1 mb-2">
                    <span className="material-symbols-outlined text-[16px] text-surface-variant">
                      motion_photos_on
                    </span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                      Motion View
                    </span>
                  </div>
                )}

                <div className="mt-auto flex items-end justify-between pt-2">
                  <div>
                    <span className="font-headline-md text-primary font-bold block text-base sm:text-lg">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-body-sm text-on-surface-variant line-through text-xs">
                        ${Number(product.originalPrice).toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product, 1)}
                    className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors shadow-sm"
                    title="Add to Cart"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trending Catalog Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-1">
              Curated Picks
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary tracking-tight">
              Trending Collections
            </h2>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1 text-primary font-label-md hover:underline underline-offset-4 font-semibold"
          >
            Explore All Products
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <ProductGrid products={featuredTrending} columns={4} />
      </section>
    </div>
  );
}
