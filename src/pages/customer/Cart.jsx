import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../../components/ui/EmptyState';
import PriceSummary from '../../components/customer/PriceSummary';

export default function Cart() {
  const navigate = useNavigate();

  // Integration Point: Replace this empty array with real state/Supabase in Round 3
  const [cartItems] = useState([]);

  const subtotal = 0;
  const delivery = 0;
  const total = 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <EmptyState
          message="Your cart is empty."
          ctaText="Continue Shopping"
          onCtaClick={() => navigate('/products')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {/* Cart Items List */}
          </div>
          <div>
            <PriceSummary
              subtotal={subtotal}
              delivery={delivery}
              total={total}
              onCtaClick={() => navigate('/checkout')}
              ctaText="Proceed to Checkout"
            />
          </div>
        </div>
      )}
    </div>
  );
}
