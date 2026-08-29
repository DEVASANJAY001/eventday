import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { useCart } from '../../context/CartContext';
import ProductGrid from '../../components/customer/ProductGrid';
import EmptyState from '../../components/ui/EmptyState';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];

  const inWishlist = product ? isInWishlist(product.id) : false;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Medium');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) {
    return (
      <div className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">
        <EmptyState
          title="Product not found"
          message="The requested item might be sold out or discontinued."
          ctaText="Back to Catalog"
          onCtaClick={() => navigate('/products')}
        />
      </div>
    );
  }

  const galleryImages = product.thumbnails && product.thumbnails.length > 0 
    ? product.thumbnails 
    : [product.image];

  const currentImage = galleryImages[activeImageIndex] || product.image;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/cart');
  };

  const relatedProducts = MOCK_PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
      {/* Toast notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-secondary-container">check_circle</span>
          <span className="font-label-md">Added to your shopping cart!</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-8 text-body-sm text-on-surface-variant flex-wrap">
        <Link className="hover:text-primary transition-colors" to="/">Home</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <Link className="hover:text-primary transition-colors" to="/products">
          {product.category?.charAt(0).toUpperCase() + product.category?.slice(1) || 'Products'}
        </Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-on-surface font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-section-gap">
        {/* Product Images (Left - Col 7) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="w-full bg-surface-container-low rounded-2xl flex items-center justify-center p-8 md:p-12 relative overflow-hidden group aspect-[4/3]">
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-error text-on-error px-3 py-1 rounded-full font-label-sm uppercase tracking-wider font-bold">
                {product.badge}
              </div>
            )}
          </div>

          {/* Thumbnails Row */}
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`bg-surface-container-low rounded-xl p-2 aspect-square border-2 transition-all overflow-hidden ${
                    activeImageIndex === idx
                      ? 'border-primary shadow-sm scale-102'
                      : 'border-transparent hover:border-outline-variant'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info (Right - Col 5) */}
        <div className="lg:col-span-5 flex flex-col pt-2">
          <div className="mb-6 border-b border-outline-variant/30 pb-6">
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2 tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <div className="flex items-center text-secondary">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[20px]"
                    style={i < Math.floor(product.rating || 5) ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {i < Math.floor(product.rating || 5) ? 'star' : 'star_half'}
                  </span>
                ))}
              </div>
              <span className="text-body-sm text-on-surface-variant">
                ({product.reviewsCount || 124} Reviews)
              </span>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span className="text-body-sm text-primary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                In Stock ({product.stock || 24} available)
              </span>
            </div>

            <div className="flex items-end gap-3">
              <span className="font-headline-md text-headline-md text-primary font-bold text-2xl sm:text-3xl">
                ${Number(product.price).toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-body-lg text-outline line-through mb-1">
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <p className="text-body-md text-on-surface-variant mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-8">
              <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-3">
                Color: <span className="text-primary font-bold capitalize ml-1">{selectedColor}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    className={`w-10 h-10 rounded-full shadow-sm hover:scale-110 transition-all ${
                      selectedColor === color.name
                        ? 'ring-4 ring-primary/30 border-2 border-primary scale-105'
                        : 'border border-outline-variant/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size / Band Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-3">
                Select Option / Size
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg text-body-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'border-2 border-primary text-primary bg-primary/5 shadow-sm font-bold'
                        : 'border border-outline-variant text-on-surface-variant bg-surface hover:border-primary hover:text-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA Actions */}
          <div className="flex gap-3 sm:gap-4 mt-auto flex-wrap sm:flex-nowrap">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-outline-variant rounded-lg bg-surface">
              <button
                type="button"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3.5 py-3 text-on-surface hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <span className="w-8 text-center font-medium font-headline-md text-sm">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3.5 py-3 text-on-surface hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-on-primary rounded-xl font-label-md py-3.5 px-6 flex items-center justify-center gap-2 hover:bg-primary-container transition-all shadow-md hover:shadow-lg active:scale-98 duration-200"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              Add to Cart
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-all ${
                inWishlist
                  ? 'border-error bg-error/5 text-error shadow-sm'
                  : 'border-outline-variant text-on-surface-variant hover:text-error hover:border-error hover:bg-error/5'
              }`}
              title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={inWishlist ? { fontVariationSettings: "'FILL' 1", color: '#ba1a1a' } : {}}
              >
                favorite
              </span>
            </button>
          </div>

          {/* Buy Now Button */}
          <button
            type="button"
            onClick={handleBuyNow}
            className="w-full mt-3 bg-secondary text-on-secondary font-label-md py-3 rounded-xl hover:bg-secondary-container transition-colors shadow-sm"
          >
            Buy Now with Express Checkout
          </button>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-outline-variant/30">
            <div className="flex items-center gap-3 text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-outline text-[22px]">local_shipping</span>
              <span>Free Express Shipping Over $50</span>
            </div>
            <div className="flex items-center gap-3 text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-outline text-[22px]">verified_user</span>
              <span>2-Year Manufacturer Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-section-gap pt-stack-lg border-t border-outline-variant/30">
          <div className="mb-stack-lg">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-1">
              You May Also Like
            </span>
            <h2 className="font-headline-lg text-primary tracking-tight">
              Related Items
            </h2>
          </div>
          <ProductGrid products={relatedProducts} columns={4} />
        </section>
      )}
    </div>
  );
}
