import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';

export default function OrderDetails() {
  const { id } = useParams();
  const { orders } = useCart();

  const order = orders.find(o => o.id === id) || orders[0];

  if (!order) {
    return (
      <div className="max-w-container-max mx-auto px-margin-desktop py-16">
        <EmptyState title="Order not found" message="We couldn't locate this order reference." />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg gap-gutter">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-label-sm text-on-surface-variant uppercase tracking-wider mb-stack-sm">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link to="/orders" className="hover:text-primary transition-colors">Orders</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary font-bold">{order.id}</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
            Order Details: {order.id}
          </h1>
          <p className="text-body-sm text-on-surface-variant">
            Placed on {order.date} • Paid via {order.paymentMethod || 'Credit Card'}
          </p>
        </div>
        <Badge variant={order.status === 'Delivered' ? 'success' : 'bestseller'}>
          {order.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ordered items list (Col 2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft space-y-4">
            <h2 className="font-headline-md text-headline-md text-primary text-lg border-b border-outline-variant/20 pb-3">
              Items in this Shipment
            </h2>

            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 border-b border-outline-variant/10 pb-3 last:border-none">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-16 h-16 object-contain mix-blend-multiply bg-surface-container-low rounded-lg p-2"
                    />
                    <div>
                      <h3 className="font-label-md text-sm text-on-surface">{item.product?.name}</h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                      </p>
                    </div>
                  </div>
                  <span className="font-headline-md text-primary font-bold">
                    ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping address & summary */}
        <div className="space-y-6">
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft space-y-4">
            <h3 className="font-headline-md text-headline-md text-primary text-lg border-b border-outline-variant/20 pb-2">
              Delivery Address
            </h3>
            <div className="text-body-sm text-on-surface-variant space-y-1">
              <p className="font-bold text-on-surface">{order.shippingAddress?.name || 'Deva Sanjay'}</p>
              <p>{order.shippingAddress?.street || '42 Tech Boulevard'}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}</p>
              <p className="pt-2 text-xs">Phone: {order.shippingAddress?.phone || '+91 98765 43210'}</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft space-y-3">
            <h3 className="font-headline-md text-headline-md text-primary text-lg border-b border-outline-variant/20 pb-2">
              Payment Summary
            </h3>
            <div className="flex justify-between text-body-sm text-on-surface-variant">
              <span>Total Paid</span>
              <span className="font-headline-md text-primary font-bold text-lg">${Number(order.amount).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
