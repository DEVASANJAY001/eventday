import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { productService } from '../../services/productService';
import PriceSummary from '../../components/customer/PriceSummary';
import EmptyState from '../../components/ui/EmptyState';
import ProductGrid from '../../components/customer/ProductGrid';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    productService.getProducts().then(data => setAllProducts(data || [])).catch(() => {});
  }, []);

  const recommendedProducts = allProducts.filter(p => !cartItems.find(ci => ci.product?.id === p.id)).slice(0, 4);

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-4 sm:px-6 md:px-margin-desktop py-4 sm:py-8 gap-6 sm:gap-gutter">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex text-xs sm:text-body-sm text-on-surface-variant">
        <ol className="inline-flex items-center space-x-1 sm:space-x-2">
          <li className="inline-flex items-center">
            <Link className="inline-flex items-center hover:text-primary transition-colors" to="/">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
              <span className="text-on-surface font-label-md font-bold">Shopping Cart</span>
            </div>
          </li>
        </ol>
      </nav>

      {cartItems.length === 0 ? (
        <div className="py-8 sm:py-16">
          <EmptyState
            title="Your Cart is Empty"
            message="Looks like you haven't added any items to your shopping cart yet."
            ctaText="Start Shopping"
            onCtaClick={() => navigate('/products')}
            icon="shopping_cart"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-gutter items-start">
          {/* Cart Items List (Left - Col 8) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <h1 className="font-headline text-xl sm:text-2xl md:text-headline-xl font-bold text-primary tracking-tight">
                Shopping Cart ({cartItems.length})
              </h1>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-error hover:underline font-semibold"
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-3 sm:p-5 shadow-card-soft flex flex-col sm:flex-row gap-3 sm:gap-4 group hover:shadow-card-hover transition-all"
                >
                  {/* Product Thumbnail */}
                  <Link
                    to={`/product/${item.product.id}`}
                    className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl sm:rounded-2xl overflow-hidden bg-surface-container-low flex-shrink-0 flex items-center justify-center self-start sm:self-center"
                  >
                    <img
                      src={item.product.image || '/products/smartwatch_pro.jpg'}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = '/products/smartwatch_pro.jpg'; }}
                    />
                  </Link>

                  {/* Item Specs & Actions */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] sm:text-xs text-secondary uppercase tracking-widest font-bold block mb-0.5">
                          {item.product.category || 'Gadgets'}
                        </span>
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="font-label-md text-xs sm:text-sm md:text-base text-on-surface hover:text-primary transition-colors leading-snug font-bold">
                            {item.product.name}
                          </h3>
                        </Link>
                        <div className="flex gap-2 sm:gap-3 text-[11px] sm:text-xs text-on-surface-variant mt-1 flex-wrap">
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
                        className="text-on-surface-variant hover:text-error transition-colors p-1.5 rounded-full hover:bg-error/5 flex-shrink-0"
                        title="Remove from Cart"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>

                    {/* Quantity & Item Total */}
                    <div className="flex items-center justify-between mt-3 sm:mt-4 pt-2 border-t border-outline-variant/15">
                      <div className="flex items-center bg-surface-container rounded-full p-0.5 sm:p-1 border border-outline-variant/40">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px] sm:text-[18px]">remove</span>
                        </button>
                        <span className="font-bold text-xs sm:text-sm w-7 sm:w-8 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px] sm:text-[18px]">add</span>
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-headline font-bold text-base sm:text-lg md:text-xl text-primary">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <span className="text-[10px] sm:text-xs text-on-surface-variant block">
                            ${Number(item.product.price).toFixed(2)} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price & Checkout Summary Sidebar (Right - Col 4) */}
          <div className="lg:col-span-4 sticky top-[108px] sm:top-[128px]">
            <PriceSummary onProceedToCheckout={() => navigate('/checkout')} />
          </div>
        </div>
      )}

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-outline-variant/20 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-lg sm:text-xl font-bold text-primary">
              Recommended for You
            </h2>
            <Link to="/products" className="text-xs sm:text-sm text-secondary hover:underline font-bold">
              Explore More
            </Link>
          </div>
          <ProductGrid products={recommendedProducts} columns={4} />
        </section>
      )}
    </div>
  );
}
