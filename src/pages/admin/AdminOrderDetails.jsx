import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useCart();

  const order = orders.find(o => o.id === id) || orders[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
            Order Reference: {order?.id || id}
          </h1>
          <p className="text-body-sm text-on-surface-variant">
            Date: {order?.date} • Payment: {order?.paymentStatus}
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate('/admin/orders')} icon="arrow_back">
          Back to Orders
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft space-y-4">
          <h2 className="font-headline-md text-primary font-bold text-lg border-b border-outline-variant/20 pb-3">
            Ordered Line Items
          </h2>
          <div className="space-y-3">
            {order?.items?.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="w-12 h-12 object-contain mix-blend-multiply"
                  />
                  <div>
                    <h3 className="font-label-md text-sm text-on-surface">{item.product?.name}</h3>
                    <p className="text-xs text-on-surface-variant">Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''}</p>
                  </div>
                </div>
                <span className="font-headline-md text-primary font-bold">
                  ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft space-y-3">
            <h3 className="font-headline-md text-primary font-bold text-base">Customer & Address</h3>
            <div className="text-xs text-on-surface-variant space-y-1">
              <p className="font-bold text-on-surface text-sm">{order?.shippingAddress?.name || 'Deva Sanjay'}</p>
              <p>{order?.shippingAddress?.street || '42 Tech Boulevard'}</p>
              <p>{order?.shippingAddress?.city}, {order?.shippingAddress?.state} {order?.shippingAddress?.pincode}</p>
              <p className="pt-2">Phone: {order?.shippingAddress?.phone}</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft space-y-3">
            <h3 className="font-headline-md text-primary font-bold text-base">Fulfillment Actions</h3>
            <div className="flex flex-col gap-2">
              <Button variant="primary" size="sm">Mark as Shipped</Button>
              <Button variant="outline" size="sm">Download Invoice PDF</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
