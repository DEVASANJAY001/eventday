import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function Checkout() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { cartItems, subtotal, discountAmount, shipping, tax, finalTotal, createOrder } = useCart();

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    if (user || profile) {
      setShippingInfo(prev => ({
        ...prev,
        name: profile?.full_name || user?.user_metadata?.full_name || '',
        email: user?.email || profile?.email || '',
        phone: profile?.phone || '',
      }));
    }
  }, [user, profile]);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      navigate('/products');
      return;
    }

    setSubmitting(true);
    try {
      const order = await createOrder(shippingInfo, paymentMethod);
      setSubmitting(false);
      navigate('/order-success', { state: { order } });
    } catch (err) {
      console.error('[Checkout] Order error:', err);
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto py-12 sm:py-16 text-center space-y-4 px-4">
        <h2 className="font-headline text-xl sm:text-headline-md font-bold text-primary">Your Cart is Empty</h2>
        <p className="text-xs sm:text-body-sm text-on-surface-variant">Please add items to cart before proceeding to checkout.</p>
        <Link to="/products">
          <Button variant="primary">Browse Catalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-4 sm:px-6 md:px-margin-desktop py-4 sm:py-8 gap-6 sm:gap-gutter">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs sm:text-label-sm text-on-surface-variant uppercase tracking-wider">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <Link to="/cart" className="hover:text-primary transition-colors">Cart</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-bold">Checkout</span>
      </div>

      <div className="border-b border-outline-variant/30 pb-3">
        <h1 className="font-headline text-xl sm:text-2xl md:text-headline-xl font-bold text-primary tracking-tight">
          Express Checkout
        </h1>
        <p className="text-xs sm:text-body-sm text-on-surface-variant mt-0.5">
          Complete your delivery details and choose your preferred payment option.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-gutter items-start">
        {/* Left Form: Shipping & Payment (Col 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Shipping Address Container */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-card-soft space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
              <span className="material-symbols-outlined text-primary text-[22px]">local_shipping</span>
              <h2 className="font-headline text-base sm:text-lg md:text-xl font-bold text-primary">
                1. Shipping Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Input
                label="Full Name"
                placeholder="Deva Sanjay"
                value={shippingInfo.name}
                onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                required
              />
              <Input
                label="Contact Phone"
                placeholder="+91 98765 43210"
                value={shippingInfo.phone}
                onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                required
              />
              <div className="sm:col-span-2">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="devasanjay@example.com"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  label="Street Address"
                  placeholder="42 Tech Boulevard, Suite 100"
                  value={shippingInfo.street}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, street: e.target.value })}
                  required
                />
              </div>
              <Input
                label="City"
                placeholder="Bangalore"
                value={shippingInfo.city}
                onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                required
              />
              <Input
                label="State / Province"
                placeholder="Karnataka"
                value={shippingInfo.state}
                onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                required
              />
              <div className="sm:col-span-2">
                <Input
                  label="Postal / Zip Code"
                  placeholder="560001"
                  value={shippingInfo.pincode}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-card-soft space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
              <span className="material-symbols-outlined text-primary text-[22px]">credit_card</span>
              <h2 className="font-headline text-base sm:text-lg md:text-xl font-bold text-primary">
                2. Payment Method
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Credit / Debit Card */}
              <label
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border flex flex-col gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm'
                    : 'border-outline-variant/40 hover:border-outline-variant'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-primary text-[22px]">credit_card</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-primary w-4 h-4"
                  />
                </div>
                <span className="font-bold text-xs sm:text-sm text-primary">Credit / Debit Card</span>
                <span className="text-[10px] sm:text-[11px] text-on-surface-variant">Visa, Mastercard, Amex</span>
              </label>

              {/* UPI / Net Banking */}
              <label
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border flex flex-col gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm'
                    : 'border-outline-variant/40 hover:border-outline-variant'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-secondary text-[22px]">qr_code_2</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="accent-secondary w-4 h-4"
                  />
                </div>
                <span className="font-bold text-xs sm:text-sm text-primary">Instant UPI</span>
                <span className="text-[10px] sm:text-[11px] text-on-surface-variant">GPay, PhonePe, Paytm</span>
              </label>

              {/* Cash on Delivery */}
              <label
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border flex flex-col gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm'
                    : 'border-outline-variant/40 hover:border-outline-variant'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-on-surface-variant text-[22px]">payments</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-primary w-4 h-4"
                  />
                </div>
                <span className="font-bold text-xs sm:text-sm text-primary">Cash on Delivery</span>
                <span className="text-[10px] sm:text-[11px] text-on-surface-variant">Pay when delivered</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary & Place Order (Col 4) */}
        <div className="lg:col-span-4 sticky top-[108px] sm:top-[128px] space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-card-soft space-y-4">
            <h2 className="font-headline text-base sm:text-lg font-bold text-primary border-b border-outline-variant/20 pb-3">
              Order Summary ({cartItems.length} items)
            </h2>

            {/* Items Mini Preview */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product.image || '/products/smartwatch_pro.jpg'}
                    alt={item.product.name}
                    className="w-10 h-10 object-cover rounded-lg border border-outline-variant/20 flex-shrink-0"
                    onError={(e) => { e.target.src = '/products/smartwatch_pro.jpg'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-on-surface truncate">{item.product.name}</p>
                    <p className="text-[11px] text-on-surface-variant">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-primary whitespace-nowrap">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 border-t border-outline-variant/20 pt-3 text-xs text-on-surface-variant">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-on-surface">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-secondary font-bold">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Standard Shipping</span>
                <span className="font-medium text-on-surface">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-medium text-on-surface">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-bold text-primary pt-2 border-t border-outline-variant/20">
                <span>Total Amount</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3.5 sm:py-4 rounded-xl shadow-md text-xs sm:text-sm font-bold"
              disabled={submitting}
            >
              {submitting ? 'Confirming Order...' : `Place Order • $${finalTotal.toFixed(2)}`}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
