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
    <div className="flex flex-col w-full max-w-container-max mx-auto px-4 sm:px-6 md:px-margin-desktop py-4 sm:py-8 gap-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs sm:text-label-sm text-on-surface-variant uppercase tracking-wider">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-bold">My Orders</span>
      </div>

      <div className="border-b border-outline-variant/30 pb-3">
        <h1 className="font-headline text-xl sm:text-2xl md:text-headline-xl font-bold text-primary tracking-tight">
          Purchase History
        </h1>
        <p className="text-xs sm:text-body-sm text-on-surface-variant mt-0.5">
          Track shipments, view official tax receipts, and access invoices for your orders.
        </p>
      </div>

      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-xs sm:text-body-sm text-on-surface-variant font-label-md">Loading Your Orders...</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="py-8">
          <EmptyState
            title="No Orders Placed Yet"
            message="When you purchase items from PioMart, your official receipts and live tracking links will appear here."
            ctaText="Explore Products"
            onCtaClick={() => navigate('/products')}
            icon="receipt_long"
          />
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const items = order.items || [];
            return (
              <div
                key={order.id}
                className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-card-soft hover:shadow-card-hover transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
                  <div>
                    <span className="font-headline text-base sm:text-lg font-bold text-primary">{order.id}</span>
                    <span className="text-[11px] sm:text-xs text-on-surface-variant sm:ml-3 block sm:inline">
                      Placed on {order.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 justify-between sm:justify-end">
                    <Badge variant={order.status === 'Delivered' ? 'success' : 'bestseller'} className="text-[10px] sm:text-xs">
                      {order.status}
                    </Badge>
                    <span className="font-headline font-bold text-base sm:text-lg text-primary">
                      ${Number(order.amount).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Items in order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
                  {items.map((item, idx) => {
                    const p = item.product || item;
                    const name = p.name || item.product_name || 'Product';
                    const image = p.image || item.product_image || '/products/smartwatch_pro.jpg';
                    const qty = item.quantity || 1;
                    return (
                      <div key={idx} className="flex items-center gap-3 bg-surface-container-low p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-outline-variant/20">
                        <img
                          src={image}
                          alt={name}
                          className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg sm:rounded-xl border border-outline-variant/20 flex-shrink-0"
                          onError={(e) => { e.target.src = '/products/smartwatch_pro.jpg'; }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xs text-on-surface truncate">{name}</p>
                          <p className="text-[10px] sm:text-[11px] text-on-surface-variant">
                            Qty: {qty} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pt-2 text-xs text-on-surface-variant border-t border-outline-variant/15">
                  <span className="text-[11px] sm:text-xs">
                    Payment: <strong className="text-on-surface">{order.paymentStatus || 'Paid'}</strong> ({order.paymentMethod || 'Credit Card'})
                  </span>
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-secondary hover:text-secondary-container font-bold inline-flex items-center gap-1 bg-surface-container px-3 py-1.5 rounded-full hover:bg-surface-variant transition-colors self-start sm:self-auto text-xs"
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
