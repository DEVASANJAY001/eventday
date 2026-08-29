import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    orderService.getAllOrders().then(orders => {
      const found = (orders || []).find(o => o.id === id);
      setOrder(found || null);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const handleUpdateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      await orderService.updateOrderStatus(id, newStatus);
      setOrder(prev => ({ ...prev, status: newStatus }));
    } catch (e) {
      setOrder(prev => ({ ...prev, status: newStatus }));
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20">
        <LoadingSpinner label={`Loading Order #${id}...`} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6">
        <span className="material-symbols-outlined text-[48px] text-on-surface-variant block mb-2">search_off</span>
        <p className="font-bold text-primary text-base">Order Not Found</p>
        <p className="text-xs text-on-surface-variant mb-4">Could not locate order ID #{id}.</p>
        <Button variant="primary" size="sm" onClick={() => navigate('/admin/orders')} icon="arrow_back">
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <h1 className="font-headline text-xl sm:text-2xl md:text-headline-xl font-bold text-primary tracking-tight">
              Order #{order.id}
            </h1>
            <Badge variant={order.status === 'Delivered' ? 'success' : 'bestseller'} className="text-xs">
              {order.status}
            </Badge>
          </div>
          <p className="text-xs sm:text-body-sm text-on-surface-variant mt-0.5">
            Placed on {order.date} • Payment: {order.paymentStatus || 'Paid'} ({order.paymentMethod || 'Credit Card'})
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/orders')} icon="arrow_back" className="self-start sm:self-auto text-xs">
          Back to Orders
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-card-soft space-y-4">
          <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
            <h2 className="font-headline text-base sm:text-lg font-bold text-primary">
              Ordered Line Items ({order.items?.length || 0})
            </h2>
            <span className="font-headline font-bold text-base sm:text-lg text-primary">
              Total: ${Number(order.amount).toFixed(2)}
            </span>
          </div>

          <div className="space-y-3">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 sm:p-4 bg-surface-container-low rounded-xl gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.product?.image || '/products/smartwatch_pro.jpg'}
                    alt={item.product?.name || 'Product'}
                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg border border-outline-variant/20 flex-shrink-0"
                    onError={(e) => { e.target.src = '/products/smartwatch_pro.jpg'; }}
                  />
                  <div className="min-w-0">
                    <h3 className="font-label-md text-xs sm:text-sm text-on-surface font-bold truncate">
                      {item.product?.name || 'Product'}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-on-surface-variant">
                      Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                    </p>
                  </div>
                </div>
                <span className="font-headline text-xs sm:text-sm font-bold text-primary whitespace-nowrap">
                  ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-card-soft space-y-3">
            <h3 className="font-headline text-sm sm:text-base font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
              Customer & Shipping
            </h3>
            <div className="text-xs text-on-surface-variant space-y-1">
              <p className="font-bold text-on-surface text-sm">{order.shippingAddress?.name || 'Customer'}</p>
              <p>{order.shippingAddress?.street || order.shippingAddress?.address || '—'}</p>
              <p>{order.shippingAddress?.city}{order.shippingAddress?.state ? `, ${order.shippingAddress?.state}` : ''} {order.shippingAddress?.pincode}</p>
              {order.shippingAddress?.phone && <p className="pt-1">Phone: <strong className="text-on-surface">{order.shippingAddress?.phone}</strong></p>}
              {order.shippingAddress?.email && <p>Email: <strong className="text-on-surface">{order.shippingAddress?.email}</strong></p>}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-card-soft space-y-3">
            <h3 className="font-headline text-sm sm:text-base font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">sync_alt</span>
              Fulfillment Actions
            </h3>
            <div className="flex flex-col gap-2">
              <Button
                variant="primary"
                size="sm"
                disabled={updating || order.status === 'Shipped'}
                onClick={() => handleUpdateStatus('Shipped')}
                className="text-xs w-full"
              >
                Mark as Shipped
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={updating || order.status === 'Delivered'}
                onClick={() => handleUpdateStatus('Delivered')}
                className="text-xs w-full"
              >
                Mark as Delivered
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
