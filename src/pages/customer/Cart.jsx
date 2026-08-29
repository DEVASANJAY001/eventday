import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { productService } from '../../services/productService';
import PriceSummary from '../../components/customer/PriceSummary';
import EmptyState from '../../components/ui/EmptyState';
import { SkeletonCard } from '../../components/ui/LoadingSpinner';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, addToCart } = useCart();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    productService.getProducts().then(data => setAllProducts(data || [])).catch(() => {});
  }, []);

  const recommendedProducts = allProducts.filter(p => !cartItems.find(ci => ci.product?.id === p.id)).slice(0, 4);

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg gap-section-gap">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex text-body-sm text-on-surface-variant mb-stack-md">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link className="inline-flex items-center hover:text-primary transition-colors" to="/">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="material-symbols-outlined text-[16px] mx-1">chevron_right</span>
              <span className="text-on-surface font-label-md font-bold">Shopping Cart</span>
            </div>
          </li>
        </ol>
      </nav>

      {cartItems.length === 0 ? (
        <EmptyState
          title="Your Cart is Empty"
          message="Looks like you haven't added any items to your shopping cart yet."
          ctaText="Start Shopping"
          onCtaClick={() => navigate('/products')}
          icon="shopping_cart"
        />
      ) : (
        <div className="flex flex-col lg:flex-row gap-gutter relative items-start">
          {/* Cart Items Section */}
          <div className="flex-1 flex flex-col gap-stack-lg w-full">
            <div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface mb-stack-sm tracking-tight">
                Your Cart
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart. You are eligible for free shipping!
              </p>
            </div>

            <div className="flex flex-col gap-stack-md">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-stack-md bg-surface-container-lowest p-stack-md rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] transition-all duration-300 group border border-outline-variant/20"
                >
                  {/* Item Image */}
                  <Link
                    to={`/product/${item.product.id}`}
                    className="w-full sm:w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 relative flex items-center justify-center bg-surface-container-lowest"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Item Specs & Actions */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-label-sm text-secondary uppercase tracking-widest font-bold mb-1 block">
                          {item.product.category || 'Gadgets'}
                        </span>
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="font-headline-md text-headline-md text-on-surface hover:text-primary transition-colors leading-tight text-lg">
                            {item.product.name}
                          </h3>
                        </Link>
                        <div className="flex gap-3 text-body-sm text-on-surface-variant mt-1.5 flex-wrap">
                          {item.selectedColor && (
                            <span>Color: <strong className="text-on-surface">{item.selectedColor}</strong></span>
                          )}
                          {item.selectedSize && (
                            <span>Size: <strong className="text-on-surface">{item.selectedSize}</strong></span>
                          )}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        aria-label="Remove item"
                        onClick={() => removeFromCart(item.id)}
                        className="text-on-surface-variant hover:text-error transition-colors p-2 -mt-2 -mr-2 rounded-full hover:bg-error/5"
                        title="Remove from Cart"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>

                    {/* Quantity & Item Total */}
                    <div className="flex items-end justify-between mt-4 sm:mt-0">
                      <div className="flex items-center bg-surface-container rounded-full p-1 border border-outline-variant/50">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">remove</span>
                        </button>
                        <span className="font-label-md w-8 text-center font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-headline-md text-primary font-bold text-xl">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <span className="text-xs text-on-surface-variant">
                            ${Number(item.product.price).toFixed(2)} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between pt-stack-md border-t border-outline-variant/30 mt-stack-sm gap-4">
              <Link
                to="/products"
                className="flex items-center gap-2 text-on-surface-variant hover:text-primary font-label-md transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Side Panel */}
          <div className="w-full lg:w-[400px] flex-shrink-0">
            <div className="sticky top-[140px]">
              <PriceSummary onCtaClick={() => navigate('/checkout')} />
            </div>
          </div>
        </div>
      )}

      {/* Recommended Section (from Stitch Shopping Cart screen) */}
      <section className="mt-section-gap pt-stack-lg border-t border-outline-variant/30">
        <div className="flex justify-between items-end mb-stack-lg">
          <div>
            <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-1">
              Add More Essentials
            </span>
            <h2 className="font-headline-lg text-on-surface tracking-tight">
              Recommended for You
            </h2>
            <p className="text-body-md text-on-surface-variant mt-1">
              Perfect companions for the items in your cart.
            </p>
          </div>
          <Link
            to="/products"
            className="hidden md:flex items-center gap-2 text-primary font-label-md hover:underline underline-offset-4 font-semibold"
          >
            View All <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {recommendedProducts.map((rec) => (
            <div key={rec.id} className="group flex flex-col">
              <div className="bg-surface-container-lowest rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden mb-3 aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img
                  src={rec.image}
                  alt={rec.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                />
                <button
                  type="button"
                  onClick={() => addToCart(rec, 1)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-surface-container-lowest/95 backdrop-blur-sm text-primary border border-primary/20 rounded-full py-2 px-6 font-label-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 shadow-lg hover:bg-primary hover:text-on-primary whitespace-nowrap text-xs font-bold"
                >
                  Quick Add
                </button>
              </div>

              <div>
                <Link to={`/product/${rec.id}`}>
                  <h4 className="font-label-md text-on-surface line-clamp-1 hover:text-primary transition-colors">
                    {rec.name}
                  </h4>
                </Link>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-headline-md text-primary font-bold text-base">
                    ${Number(rec.price).toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1 text-secondary">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="text-label-sm text-on-surface-variant font-medium">{rec.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
