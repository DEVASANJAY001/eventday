import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function Checkout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/order-success');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Address form fields */}
        <div className="md:col-span-2 space-y-6 bg-white border border-gray-200 p-6 rounded">
          <h3 className="font-semibold text-gray-800 text-sm uppercase">Shipping Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Name" placeholder="John Doe" required />
            <Input label="Phone" placeholder="+91 99999 99999" required />
            <div className="sm:col-span-2">
              <Input label="Street Address" placeholder="123 Main St, Appt 4B" required />
            </div>
            <Input label="City" placeholder="Mumbai" required />
            <Input label="State" placeholder="Maharashtra" required />
            <Input label="Pincode" placeholder="400001" required />
          </div>
        </div>

        {/* Order Summary & Payment method column */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 p-6 rounded space-y-4">
            <h3 className="font-semibold text-gray-800 text-sm uppercase">Payment Method</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                Cash on Delivery (COD)
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                />
                UPI (GPay / PhonePe)
              </label>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded space-y-4">
            <h3 className="font-semibold text-gray-800 text-sm uppercase">Summary Placeholder</h3>
            <p className="text-xs text-gray-400">Total pricing details can be displayed here by students.</p>
            <Button type="submit" className="w-full">Place Order</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
