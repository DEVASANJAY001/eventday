import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  return (
    <div className="max-w-xl mx-auto px-margin-mobile py-16 text-center">
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 md:p-12 shadow-card-soft space-y-6">
        {/* Animated Check Icon */}
        <div className="w-20 h-20 rounded-full bg-primary-fixed flex items-center justify-center mx-auto text-primary shadow-sm animate-pulse">
          <span className="material-symbols-outlined text-[44px]">verified</span>
        </div>

        <div className="space-y-2">
          <h1 className="font-headline-xl text-headline-lg text-primary tracking-tight">
            Order Confirmed!
          </h1>
          <p className="text-body-md text-on-surface-variant max-w-sm mx-auto">
            Thank you for shopping with PioMart. Your order has been placed and is being prepared for dispatch.
          </p>
        </div>

        {/* Order Details Pill Box */}
        <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/20 text-left space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant font-label-sm">Order Reference ID:</span>
            <span className="font-headline-md text-primary font-bold">{order?.id || 'ORD-729401'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant font-label-sm">Total Paid:</span>
            <span className="font-headline-md text-primary font-bold">${(order?.amount || 590.76).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant font-label-sm">Estimated Delivery:</span>
            <span className="text-on-surface font-medium">3-5 Business Days</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button onClick={() => navigate('/orders')} variant="primary" className="flex-1">
            View My Orders
          </Button>
          <Link to="/products" className="flex-1">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
