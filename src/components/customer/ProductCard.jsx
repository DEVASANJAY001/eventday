import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product, showQuickAdd = true, className = '' }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className={`bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 flex flex-col group relative shadow-card-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border border-outline-variant/20 ${className}`}
    >
      {/* Badges */}
      {product.badge && (
        <span
          className={`absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded uppercase tracking-wider z-10 shadow-sm ${
            product.badge.toLowerCase() === 'sale'
              ? 'bg-error text-on-error'
              : product.badge.toLowerCase() === 'best seller'
              ? 'bg-secondary-container text-on-secondary'
              : 'bg-primary text-on-primary'
          }`}
        >
          {product.badge}
        </span>
      )}

      {/* Wishlist Action Button */}
      <button
        type="button"
        onClick={handleWishlistToggle}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-surface/80 backdrop-blur-sm shadow flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-surface transition-all duration-200"
      >
        <span
          className="material-symbols-outlined text-[16px] sm:text-[18px]"
          style={inWishlist ? { fontVariationSettings: "'FILL' 1", color: '#ba1a1a' } : {}}
        >
          favorite
        </span>
      </button>

      {/* Image Display */}
      <Link
        to={`/product/${product.id}`}
        className="relative w-full aspect-square mb-2.5 sm:mb-3.5 rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center bg-surface-container-low"
      >
        <img
          src={product.image || '/products/smartwatch_pro.jpg'}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/products/smartwatch_pro.jpg';
          }}
        />
      </Link>

      {/* Subtitle / Brand */}
      {product.subtitle && (
        <p className="text-[10px] sm:text-xs text-on-surface-variant line-clamp-1 mb-0.5">
          {product.subtitle}
        </p>
      )}

      {/* Product Title */}
      <Link to={`/product/${product.id}`} className="block mb-1 sm:mb-2">
        <h3 className="font-label-md text-xs sm:text-sm text-on-surface hover:text-primary transition-colors line-clamp-2 leading-snug font-bold">
          {product.name}
        </h3>
      </Link>

      {/* Stars rating */}
      <div className="flex items-center gap-1 mb-2 sm:mb-3">
        {product.rating ? (
          <div className="flex items-center gap-1">
            <div className="flex text-secondary text-[12px] sm:text-[14px]">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[12px] sm:text-[14px]"
                  style={i < Math.floor(product.rating) ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {i < Math.floor(product.rating) ? 'star' : i < product.rating ? 'star_half' : 'star'}
                </span>
              ))}
            </div>
            <span className="text-[10px] sm:text-label-sm text-outline font-medium">({product.reviewsCount || 0})</span>
          </div>
        ) : product.hasMotionView ? (
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-surface-variant">
              motion_photos_on
            </span>
            <span className="text-[9px] sm:text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Motion View
            </span>
          </div>
        ) : null}
      </div>

      {/* Pricing & Quick Add CTA */}
      <div className="mt-auto pt-1.5 sm:pt-2 border-t border-outline-variant/20 flex items-center justify-between gap-1.5 sm:gap-2">
        <div className="min-w-0">
          <span className="font-headline-md text-primary font-bold block text-sm sm:text-base md:text-lg leading-none">
            ${Number(product.price).toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[10px] sm:text-xs text-outline line-through block mt-0.5">
              ${Number(product.originalPrice).toFixed(2)}
            </span>
          )}
        </div>

        {showQuickAdd && (
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label="Add to cart"
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 flex-shrink-0"
            title="Quick Add"
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">add</span>
          </button>
        )}
      </div>
    </div>
  );
}
