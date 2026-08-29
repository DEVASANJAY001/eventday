import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function PriceSummary({ onCtaClick, ctaText = "Proceed to Checkout", showCoupon = true }) {
  const { subtotal, discountAmount, shipping, tax, finalTotal, coupon, applyCoupon } = useCart();
  const [inputCode, setInputCode] = useState('');
  const [couponMsg, setCouponMsg] = useState(null);

  const handleApply = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyCoupon(inputCode);
    setCouponMsg(res);
  };

  return (
    <div className="bg-surface-container-low rounded-[24px] p-stack-lg shadow-card-soft border border-outline-variant/20 space-y-stack-md">
      <h2 className="font-headline-md text-headline-md text-on-surface">Order Summary</h2>

      <div className="flex flex-col gap-3 py-2">
        <div className="flex justify-between items-center text-body-md text-on-surface-variant">
          <span>Subtotal</span>
          <span className="font-label-md text-on-surface">${subtotal.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between items-center text-body-md text-primary font-semibold">
            <span>Discount ({coupon.code})</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-body-md text-on-surface-variant">
          <span>Shipping Estimate</span>
          <span className="font-label-md text-on-surface">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between items-center text-body-md text-on-surface-variant">
          <span>Tax Estimate</span>
          <span className="font-label-md text-on-surface">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-outline-variant/30 pt-stack-md">
        <div className="flex justify-between items-center">
          <span className="font-headline-md text-on-surface">Total</span>
          <span className="font-headline-lg text-primary">${finalTotal.toFixed(2)}</span>
        </div>
        <p className="text-label-sm text-on-surface-variant mt-1 text-right">
          Includes all taxes and duties
        </p>
      </div>

      {/* Coupon Field */}
      {showCoupon && (
        <div className="pt-2">
          <label htmlFor="coupon-code" className="block font-label-sm text-on-surface-variant uppercase tracking-widest mb-2">
            Discount Code
          </label>
          <div className="flex gap-2">
            <input
              id="coupon-code"
              type="text"
              placeholder="e.g. SAVE10"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="flex-1 bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 py-2.5 text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface"
            />
            <button
              type="button"
              onClick={handleApply}
              className="bg-primary text-on-primary font-label-md px-5 py-2.5 rounded-lg hover:bg-primary-container transition-colors shadow-sm"
            >
              Apply
            </button>
          </div>
          {couponMsg && (
            <p className={`text-xs mt-1.5 font-medium ${couponMsg.success ? 'text-primary' : 'text-error'}`}>
              {couponMsg.message}
            </p>
          )}
        </div>
      )}

      {onCtaClick && (
        <button
          type="button"
          onClick={onCtaClick}
          className="w-full bg-secondary text-on-secondary font-headline-md text-center py-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-secondary-container transition-all duration-300 flex items-center justify-center gap-2 mt-4"
        >
          {ctaText}
          <span className="material-symbols-outlined text-[20px]">lock</span>
        </button>
      )}

      <div className="mt-4 pt-4 border-t border-outline-variant/20 flex items-center justify-center gap-6 opacity-60 text-on-surface-variant">
        <span className="material-symbols-outlined text-[28px]" title="Secure Payment">payments</span>
        <span className="material-symbols-outlined text-[28px]" title="Credit Cards">credit_card</span>
        <span className="material-symbols-outlined text-[28px]" title="Net Banking">account_balance</span>
      </div>
    </div>
  );
}
