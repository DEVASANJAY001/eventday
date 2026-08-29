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
      className={`bg-surface-container-lowest rounded-2xl p-4 flex flex-col group relative shadow-card-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border border-outline-variant/20 ${className}`}
    >
      {/* Badges */}
      {product.badge && (
        <span
          className={`absolute top-4 left-4 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10 ${
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
        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm shadow flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-surface transition-all duration-200"
      >
        <span
          className="material-symbols-outlined text-[18px]"
          style={inWishlist ? { fontVariationSettings: "'FILL' 1", color: '#ba1a1a' } : {}}
        >
          favorite
        </span>
      </button>

      {/* Image Display */}
      <Link
        to={`/product/${product.id}`}
        className="relative w-full aspect-square mb-4 bg-surface-container-low rounded-xl overflow-hidden p-4 flex items-center justify-center"
      >
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Subtitle / Brand */}
      {product.subtitle && (
        <p className="text-body-sm text-on-surface-variant line-clamp-1 mb-1">
          {product.subtitle}
        </p>
      )}

      {/* Product Title */}
      <Link to={`/product/${product.id}`} className="block mb-2">
        <h3 className="font-label-md text-on-surface hover:text-primary transition-colors line-clamp-2 leading-snug">
          {product.name}
        </h3>
      </Link>

      {/* Stars or Motion View */}
      <div className="flex items-center gap-1 mb-3">
        {product.rating ? (
          <div className="flex items-center gap-1">
            <div className="flex text-secondary text-[14px]">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[14px]"
                  style={i < Math.floor(product.rating) ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {i < Math.floor(product.rating) ? 'star' : i < product.rating ? 'star_half' : 'star'}
                </span>
              ))}
            </div>
            <span className="text-label-sm text-outline font-medium">({product.reviewsCount || 0})</span>
          </div>
        ) : product.hasMotionView ? (
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-surface-variant">
              motion_photos_on
            </span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Motion View
            </span>
          </div>
        ) : null}
      </div>

      {/* Pricing & CTA */}
      <div className="mt-auto pt-2 border-t border-outline-variant/20 flex items-center justify-between gap-2">
        <div>
          <span className="font-headline-md text-primary font-bold block text-lg">
            ${Number(product.price).toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-body-sm text-outline line-through text-xs">
              ${Number(product.originalPrice).toFixed(2)}
            </span>
          )}
        </div>

        {showQuickAdd && (
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label="Add to cart"
            className="w-9 h-9 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
            title="Quick Add"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
        )}
      </div>
    </div>
  );
}
