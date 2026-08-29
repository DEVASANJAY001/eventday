import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';

export default function CustomerOrders() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { orders: contextOrders } = useCart();
  const [orders, setOrders] = useState(contextOrders);
  const [loading, setLoading] = useState(contextOrders.length === 0);

  useEffect(() => {
    if (contextOrders && contextOrders.length > 0) {
      setOrders(contextOrders);
      setLoading(false);
    }
  }, [contextOrders]);

  useEffect(() => {
    orderService.getUserOrders(user?.id, user?.email).then(data => {
      if (data && data.length > 0) {
        setOrders(data);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [user]);

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
          Track shipments, view official tax receipts, and access invoices for your orders.
        </p>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-body-sm text-on-surface-variant font-label-md">Loading Your Orders...</span>
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          title="No Orders Placed Yet"
          message="When you purchase items from PioMart, your official receipts and live tracking links will appear here."
          ctaText="Explore Products"
          onCtaClick={() => navigate('/products')}
          icon="receipt_long"
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const items = order.items || [];
            return (
              <div
                key={order.id}
                className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-card-soft hover:shadow-card-hover transition-all space-y-4"
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
                  {items.map((item, idx) => {
                    const p = item.product || item;
                    const name = p.name || item.product_name || 'Product';
                    const image = p.image || item.product_image || '/products/smartwatch_pro.jpg';
                    const qty = item.quantity || 1;
                    return (
                      <div key={idx} className="flex items-center gap-3 bg-surface-container-low p-3 rounded-2xl border border-outline-variant/20">
                        <img
                          src={image}
                          alt={name}
                          className="w-14 h-14 object-cover rounded-xl border border-outline-variant/20 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-label-md text-xs text-on-surface font-bold truncate">{name}</p>
                          <p className="text-[11px] text-on-surface-variant">
                            Qty: {qty} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-2 text-xs text-on-surface-variant border-t border-outline-variant/15">
                  <span>Payment: <strong className="text-on-surface">{order.paymentStatus || 'Paid'}</strong> ({order.paymentMethod || 'Credit Card'})</span>
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-secondary hover:text-secondary-container font-bold inline-flex items-center gap-1 bg-surface-container px-3 py-1.5 rounded-full hover:bg-surface-variant transition-colors"
                  >
                    View Details & Tracking
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
