import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, discountAmount, shipping, tax, finalTotal, createOrder } = useCart();

  const [shippingInfo, setShippingInfo] = useState({
    name: 'Deva Sanjay',
    phone: '+91 98765 43210',
    email: 'devasanjay@example.com',
    street: '42 Tech Boulevard, Suite 100',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      navigate('/products');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const order = createOrder(shippingInfo, paymentMethod);
      setSubmitting(false);
      navigate('/order-success', { state: { order } });
    }, 800);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h2 className="font-headline-md text-headline-md text-primary">Your Cart is Empty</h2>
        <p className="text-body-sm text-on-surface-variant">Please add items to cart before proceeding to checkout.</p>
        <Link to="/products">
          <Button variant="primary">Browse Catalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg gap-gutter">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-label-sm text-on-surface-variant uppercase tracking-wider mb-stack-sm">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link to="/cart" className="hover:text-primary transition-colors">Cart</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary font-bold">Checkout</span>
      </div>

      <div className="border-b border-outline-variant/30 pb-4 mb-2">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Express Checkout
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Complete your delivery details and choose your preferred payment option.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left Form: Shipping & Payment (Col 7/8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Shipping Address Container */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-card-soft space-y-6">
            <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-4">
              <span className="material-symbols-outlined text-primary text-[24px]">local_shipping</span>
              <h2 className="font-headline-md text-headline-md text-primary text-xl">
                1. Shipping Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-card-soft space-y-6">
            <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-4">
              <span className="material-symbols-outlined text-primary text-[24px]">credit_card</span>
              <h2 className="font-headline-md text-headline-md text-primary text-xl">
                2. Payment Method
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card option */}
              <label
                className={`p-4 rounded-xl border-2 flex flex-col items-center text-center cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-outline-variant/40 hover:border-outline-variant'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  className="sr-only"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <span className="material-symbols-outlined text-[32px] text-primary mb-2">credit_card</span>
                <span className="font-headline-md text-sm text-on-surface">Credit / Debit Card</span>
                <span className="text-[11px] text-on-surface-variant mt-1">Visa, Mastercard, Amex</span>
              </label>

              {/* UPI option */}
              <label
                className={`p-4 rounded-xl border-2 flex flex-col items-center text-center cursor-pointer transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-outline-variant/40 hover:border-outline-variant'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  className="sr-only"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                />
                <span className="material-symbols-outlined text-[32px] text-secondary mb-2">payments</span>
                <span className="font-headline-md text-sm text-on-surface">UPI / Fast Pay</span>
                <span className="text-[11px] text-on-surface-variant mt-1">GPay, PhonePe, Paytm</span>
              </label>

              {/* COD option */}
              <label
                className={`p-4 rounded-xl border-2 flex flex-col items-center text-center cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-outline-variant/40 hover:border-outline-variant'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  className="sr-only"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <span className="material-symbols-outlined text-[32px] text-outline mb-2">local_atm</span>
                <span className="font-headline-md text-sm text-on-surface">Cash On Delivery</span>
                <span className="text-[11px] text-on-surface-variant mt-1">Pay upon arrival</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary: Review & Submit (Col 4/5) */}
        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-[140px]">
          <div className="bg-surface-container-low rounded-2xl p-6 shadow-card-soft border border-outline-variant/20 space-y-4">
            <h3 className="font-headline-md text-headline-md text-on-surface text-lg border-b border-outline-variant/20 pb-3">
              Order Review ({cartItems.length} items)
            </h3>

            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-surface-container-lowest p-2.5 rounded-xl border border-outline-variant/10">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-contain mix-blend-multiply flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-xs text-on-surface truncate">{item.product.name}</p>
                    <p className="text-[11px] text-on-surface-variant">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-headline-md text-xs font-bold text-primary">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-outline-variant/20 pt-3 text-body-sm text-on-surface-variant">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-label-md text-on-surface">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-primary font-semibold">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-label-md text-on-surface">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-label-md text-on-surface">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-on-surface border-t border-outline-variant/20 pt-2">
                <span>Total Due</span>
                <span className="font-headline-md text-primary text-xl">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-secondary text-on-secondary font-headline-md text-center py-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-secondary-container transition-all duration-300 flex items-center justify-center gap-2 text-base font-bold disabled:opacity-50"
            >
              {submitting ? 'Processing Order...' : 'Place Order & Pay'}
              <span className="material-symbols-outlined text-[20px]">lock</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
