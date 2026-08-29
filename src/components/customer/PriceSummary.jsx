import React from 'react';

export default function PriceSummary({ subtotal = 0, delivery = 0, total = 0, onCtaClick, ctaText = "Checkout" }) {
  return (
    <div className="border border-gray-200 rounded p-4 bg-white space-y-3">
      <h3 className="font-semibold text-gray-800 text-sm uppercase">Order Summary</h3>
      <div className="text-xs text-gray-600 space-y-1">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹{delivery}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-800 border-t pt-2">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
      {onCtaClick && (
        <button
          onClick={onCtaClick}
          className="w-full bg-blue-600 text-white py-2 rounded text-xs font-semibold hover:bg-blue-700 transition-colors"
        >
          {ctaText}
        </button>
      )}
    </div>
  );
}
