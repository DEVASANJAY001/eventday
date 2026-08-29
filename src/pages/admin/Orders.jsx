import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import Badge from '../../components/ui/Badge';

export default function Orders() {
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () => {
    orderService.getAllOrders()
      .then(data => {
        setOrdersList(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
    const unsubscribe = orderService.subscribeToOrders(loadOrders);
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Customer Orders
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Track fulfillment status, payment gateways, and shipping invoices from Supabase.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-on-surface-variant font-medium">Loading orders from database...</span>
        </div>
      ) : ordersList.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-3 block">inbox</span>
          <p className="font-bold text-primary">No orders yet</p>
          <p className="text-xs text-on-surface-variant mt-1">Orders placed by customers will appear here in real time.</p>
        </div>
      ) : (
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden shadow-card-soft">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-bold tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-on-surface">
              {ordersList.map((o) => (
                <tr key={o.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4 font-headline-md font-bold text-primary text-sm">
                    {o.id}
                  </td>
                  <td className="p-4 font-medium">
                    {o.shippingAddress?.name || '—'}
                    <span className="block text-[11px] text-on-surface-variant">
                      {o.shippingAddress?.city || o.shippingAddress?.email || '—'}
                    </span>
                  </td>
                  <td className="p-4 text-on-surface-variant">
                    {o.date}
                  </td>
                  <td className="p-4">
                    {o.items?.length || 0} item{o.items?.length !== 1 ? 's' : ''}
                  </td>
                  <td className="p-4 font-headline-md font-bold text-sm text-primary">
                    ${Number(o.amount).toFixed(2)}
                  </td>
                  <td className="p-4 text-on-surface-variant capitalize">
                    {o.paymentMethod || '—'}
                  </td>
                  <td className="p-4">
                    <Badge variant={o.status === 'Delivered' ? 'success' : 'bestseller'}>
                      {o.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      to={`/admin/orders/${o.id}`}
                      className="text-secondary hover:underline font-bold"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
