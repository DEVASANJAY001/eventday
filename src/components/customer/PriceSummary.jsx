import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function PriceSummary({ onProceedToCheckout, onCtaClick, ctaText = "Proceed to Checkout", showCoupon = true }) {
  const { subtotal, discountAmount, shipping, tax, finalTotal, coupon, applyCoupon, removeCoupon } = useCart();
  const [inputCode, setInputCode] = useState('');
  const [couponMsg, setCouponMsg] = useState(null);
  const [loadingCoupon, setLoadingCoupon] = useState(false);

  const clickHandler = onProceedToCheckout || onCtaClick;

  const handleApply = async (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    setLoadingCoupon(true);
    try {
      const res = await applyCoupon(inputCode);
      setCouponMsg(res);
      if (res?.success) setInputCode('');
    } catch {
      setCouponMsg({ success: false, message: 'Failed to apply coupon.' });
    } finally {
      setLoadingCoupon(false);
    }
  };

  return (
    <div className="bg-surface-container-low rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-card-soft border border-outline-variant/30 space-y-4">
      <h2 className="font-headline text-base sm:text-lg font-bold text-primary">Order Summary</h2>

      <div className="flex flex-col gap-2.5 py-1 text-xs sm:text-sm">
        <div className="flex justify-between items-center text-on-surface-variant">
          <span>Subtotal</span>
          <span className="font-bold text-on-surface">${subtotal.toFixed(2)}</span>
        </div>

        {coupon.applied && discountAmount > 0 && (
          <div className="flex justify-between items-center text-secondary font-bold">
            <span className="flex items-center gap-1">
              Coupon ({coupon.code})
              <button
                type="button"
                onClick={removeCoupon}
                className="text-[10px] text-error hover:underline ml-1"
              >
                [Remove]
              </button>
            </span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-on-surface-variant">
          <span>Shipping</span>
          <span className="font-bold text-on-surface">
            {shipping === 0 ? <span className="text-secondary">FREE</span> : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between items-center text-on-surface-variant">
          <span>Estimated Tax (8%)</span>
          <span className="font-bold text-on-surface">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-outline-variant/30 pt-3">
        <div className="flex justify-between items-center">
          <span className="font-headline font-bold text-sm sm:text-base text-primary">Total Amount</span>
          <span className="font-headline font-bold text-lg sm:text-xl text-primary">${finalTotal.toFixed(2)}</span>
        </div>
        <p className="text-[10px] sm:text-xs text-on-surface-variant mt-0.5 text-right">
          Includes all applicable taxes
        </p>
      </div>

      {/* Coupon Field */}
      {showCoupon && (
        <div className="pt-1">
          <label htmlFor="coupon-code" className="block text-[10px] sm:text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
            Promotional Voucher
          </label>
          <div className="flex gap-2">
            <input
              id="coupon-code"
              type="text"
              placeholder="e.g. SAVE10"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="flex-1 bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary uppercase text-on-surface placeholder:normal-case"
            />
            <button
              type="button"
              onClick={handleApply}
              disabled={loadingCoupon}
              className="bg-primary text-on-primary text-xs font-bold px-4 py-2 rounded-xl hover:bg-primary-container transition-colors shadow-sm disabled:opacity-50"
            >
              {loadingCoupon ? 'Applying...' : 'Apply'}
            </button>
          </div>
          {couponMsg && (
            <p className={`text-[11px] mt-1.5 font-semibold ${couponMsg.success ? 'text-secondary' : 'text-error'}`}>
              {couponMsg.message}
            </p>
          )}
        </div>
      )}

      {clickHandler && (
        <button
          type="button"
          onClick={clickHandler}
          className="w-full bg-secondary text-on-secondary font-headline font-bold text-xs sm:text-sm text-center py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-secondary-container transition-all duration-300 flex items-center justify-center gap-2 mt-2"
        >
          {ctaText}
          <span className="material-symbols-outlined text-[18px]">lock</span>
        </button>
      )}

      <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-center gap-4 text-on-surface-variant opacity-60 text-[11px]">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">verified_user</span>
          256-Bit SSL Encrypted
        </span>
      </div>
    </div>
  );
}
