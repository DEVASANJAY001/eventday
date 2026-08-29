import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';

export default function CustomerOrders() {
  const navigate = useNavigate();
  const { orders } = useCart();

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg gap-gutter">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-label-sm text-on-surface-variant uppercase tracking-wider mb-stack-sm">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary font-bold">My Orders</span>
      </div>

      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Purchase History
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Track and view invoices for your recent orders.
        </p>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          title="No Orders Placed Yet"
          message="When you purchase items from PioMart, your receipts and tracking links will appear here."
          ctaText="Explore Products"
          onCtaClick={() => navigate('/products')}
          icon="receipt_long"
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft hover:shadow-card-hover transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-4">
                <div>
                  <span className="font-headline-md text-primary font-bold text-lg">{order.id}</span>
                  <span className="text-xs text-on-surface-variant ml-3">Placed on {order.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={order.status === 'Delivered' ? 'success' : 'bestseller'}>
                    {order.status}
                  </Badge>
                  <span className="font-headline-md text-primary font-bold text-lg">
                    ${Number(order.amount).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Items in order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-surface-container-low p-3 rounded-xl">
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-12 h-12 object-contain mix-blend-multiply flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-label-md text-xs text-on-surface truncate">{item.product?.name}</p>
                      <p className="text-[11px] text-on-surface-variant">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2 text-xs text-on-surface-variant">
                <span>Payment: <strong>{order.paymentStatus}</strong></span>
                <Link
                  to={`/orders/${order.id}`}
                  className="text-secondary hover:text-secondary-container font-semibold inline-flex items-center gap-1"
                >
                  View Details & Tracking
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
