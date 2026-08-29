import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import ProductGrid from '../../components/customer/ProductGrid';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('specs');

  useEffect(() => {
    setLoading(true);
    setProduct(null);
    productService.getProductById(id).then(data => {
      setProduct(data || null);
      setLoading(false);
    }).catch(() => setLoading(false));

    productService.getProducts().then(data => setAllProducts(data || [])).catch(() => {});
  }, [id]);

  const inWishlist = product ? isInWishlist(product.id) : false;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0]?.name || '');
      setSelectedSize(product.sizes?.[0] || 'Standard');
      setActiveImageIndex(0);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">
        <LoadingSpinner label="Loading product details..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">
        <EmptyState
          title="Product not found"
          message="The requested item might be sold out or removed from our catalog."
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

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  // Specifications list
  const specifications = [
    { label: 'Brand / Manufacturer', value: product.brand || 'Veyora Atelier' },
    { label: 'Category', value: product.category ? product.category.toUpperCase() : 'LIFESTYLE' },
    { label: 'Model SKU', value: `SKU-${product.id.toUpperCase()}` },
    { label: 'Materials & Finish', value: 'Aerospace Grade Aluminum & Premium Textured Composite' },
    { label: 'Warranty Coverage', value: '2-Year Full International Manufacturer Warranty' },
    { label: 'Package Inclusions', value: `${product.name}, Quick Start Guide, Certified Charging Accessory & Warranty Card` },
  ];

  // Customer Reviews sample
  const reviews = [
    {
      author: 'Marcus Chen',
      rating: 5,
      date: 'August 24, 2026',
      verified: true,
      comment: `The build quality of this ${product.name} is outstanding. Exceeded my expectations with premium materials and sleek design.`,
    },
    {
      author: 'Sophia Alverez',
      rating: 5,
      date: 'August 19, 2026',
      verified: true,
      comment: 'Lightning fast delivery and beautiful packaging. Works seamlessly right out of the box. Highly recommended!',
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 gap-gutter">
      {/* Toast notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-secondary-container">check_circle</span>
          <span className="font-label-md">Added to your shopping cart!</span>
          <Link to="/cart" className="underline text-xs text-secondary font-bold ml-2">View Cart</Link>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-body-sm text-on-surface-variant flex-wrap">
        <Link className="hover:text-primary transition-colors font-medium" to="/">Home</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <Link className="hover:text-primary transition-colors font-medium" to="/products">
          Catalog
        </Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <Link className="hover:text-primary transition-colors font-medium capitalize" to={`/category/${product.category}`}>
          {product.category}
        </Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-primary font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Product Images (Left - Col 7) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="w-full aspect-square rounded-3xl overflow-hidden relative group shadow-card-soft bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center">
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-full object-cover rounded-3xl hover:scale-105 transition-transform duration-500"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-primary text-on-primary px-3.5 py-1 rounded-full font-label-sm uppercase tracking-wider font-bold shadow-md">
                {product.badge}
              </div>
            )}
            {product.hasMotionView && (
              <div className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur-md text-primary px-3 py-1.5 rounded-full font-label-sm font-bold flex items-center gap-1.5 border border-outline-variant/30 shadow-sm">
                <span className="material-symbols-outlined text-[18px] text-secondary">360</span>
                360° Studio View
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
                  className={`rounded-2xl aspect-square transition-all overflow-hidden border ${
                    activeImageIndex === idx
                      ? 'ring-2 ring-primary border-transparent shadow-md scale-102'
                      : 'border-outline-variant/40 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info (Right - Col 5) */}
        <div className="lg:col-span-5 flex flex-col bg-surface-container-lowest border border-outline-variant/30 p-6 md:p-8 rounded-3xl shadow-card-soft space-y-6">
          <div className="border-b border-outline-variant/20 pb-5 space-y-2">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest block">
              {product.brand || 'SonicWear Pro'}
            </span>
            <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight leading-tight">
              {product.name}
            </h1>
            {product.subtitle && (
              <p className="text-body-sm text-on-surface-variant font-medium">
                {product.subtitle}
              </p>
            )}

            {/* Rating and Stock */}
            <div className="flex items-center gap-3 pt-2 flex-wrap text-xs">
              <div className="flex items-center text-secondary">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="font-bold text-primary">{product.rating || 4.9}</span>
              <span className="text-on-surface-variant">({product.reviewsCount || 128} Reviews)</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span className="text-primary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-secondary">check_circle</span>
                In Stock ({product.stock || 45} available)
              </span>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pt-3">
              <span className="font-headline-md text-3xl font-bold text-primary">
                ${Number(product.price).toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-body-md text-on-surface-variant line-through">
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <Badge variant="sale" className="text-xs">
                  {product.discountPercentage}% OFF
                </Badge>
              )}
            </div>
          </div>

          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2.5">
              <h2 className="font-label-md text-xs text-on-surface uppercase tracking-wider">
                Select Color: <strong className="text-primary font-bold capitalize ml-1">{selectedColor}</strong>
              </h2>
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
                        ? 'ring-4 ring-primary/20 border-2 border-primary scale-105'
                        : 'border border-outline-variant/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size / Option Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2.5">
              <h2 className="font-label-md text-xs text-on-surface uppercase tracking-wider">
                Select Configuration / Size
              </h2>
              <div className="grid grid-cols-3 gap-2.5">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                      selectedSize === size
                        ? 'border-2 border-primary text-primary bg-primary/5 shadow-sm'
                        : 'border border-outline-variant text-on-surface-variant bg-surface hover:border-primary hover:text-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3 items-center">
              {/* Stepper */}
              <div className="flex items-center border border-outline-variant/60 rounded-xl bg-surface-container-low p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <span className="w-8 text-center font-bold text-sm text-primary">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-on-primary rounded-xl font-label-md py-3.5 px-6 flex items-center justify-center gap-2 hover:bg-primary-container transition-all shadow-md active:scale-98"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                Add to Cart
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                  inWishlist
                    ? 'border-error bg-error/5 text-error shadow-sm'
                    : 'border-outline-variant text-on-surface-variant hover:text-error hover:border-error'
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

            {/* Buy Now Express */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full bg-secondary text-on-secondary font-label-md py-3.5 rounded-xl hover:bg-secondary-container transition-colors shadow-sm font-bold flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">bolt</span>
              Buy Now with Express Checkout
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-outline-variant/20 text-xs text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
              <span>Free Express Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
              <span>2-Year Official Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Specifications & Reviews */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 shadow-card-soft space-y-6">
        <div className="flex gap-4 border-b border-outline-variant/20 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`font-label-md text-sm font-bold pb-2 border-b-2 transition-all ${
              activeTab === 'specs'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            Technical Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`font-label-md text-sm font-bold pb-2 border-b-2 transition-all ${
              activeTab === 'reviews'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            Customer Reviews ({product.reviewsCount || 128})
          </button>
        </div>

        {activeTab === 'specs' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specifications.map((spec, idx) => (
              <div key={idx} className="flex justify-between p-3.5 bg-surface-container-low rounded-xl text-xs">
                <span className="text-on-surface-variant font-medium">{spec.label}</span>
                <strong className="text-primary text-right">{spec.value}</strong>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((r, idx) => (
              <div key={idx} className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-primary">{r.author}</span>
                    {r.verified && (
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-on-surface-variant">{r.date}</span>
                </div>
                <div className="flex text-secondary text-xs">
                  {[...Array(r.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="border-b border-outline-variant/20 pb-3">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-1">
              Curated Recommendations
            </span>
            <h2 className="font-headline-lg text-2xl text-primary font-bold tracking-tight">
              Similar & Complementary Products
            </h2>
          </div>
          <ProductGrid products={relatedProducts} columns={4} />
        </section>
      )}
    </div>
  );
}
