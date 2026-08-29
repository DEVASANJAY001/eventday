import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 p-8 rounded max-w-md mx-auto text-center space-y-4 my-8">
      <h1 className="text-xl font-bold text-gray-800">Order Placed Successfully!</h1>
      <p className="text-xs text-gray-500">
        Your order has been submitted. Check details in your profile history.
      </p>
      <div className="text-xs font-semibold bg-gray-50 py-2 border rounded">
        Order ID: --
      </div>
      <div className="flex gap-3 justify-center">
        <Button onClick={() => navigate('/orders')}>My Orders</Button>
        <button onClick={() => navigate('/products')} className="border border-gray-200 text-xs px-4 py-2 rounded">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
