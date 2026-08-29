import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Badge from '../../components/ui/Badge';

export default function Orders() {
  const { orders } = useCart();

  return (
    <div className="space-y-6">
      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Customer Orders
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Track fulfillment status, payment gateways, and shipping invoices.
        </p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden shadow-card-soft">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-surface-container-low text-on-surface-variant uppercase font-bold tracking-wider border-b border-outline-variant/20">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 text-on-surface">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-4 font-headline-md font-bold text-primary text-sm">
                  {o.id}
                </td>
                <td className="p-4 font-medium">
                  {o.shippingAddress?.name || 'Deva Sanjay'}
                  <span className="block text-[11px] text-on-surface-variant">{o.shippingAddress?.city || 'Bangalore'}</span>
                </td>
                <td className="p-4 text-on-surface-variant">
                  {o.date}
                </td>
                <td className="p-4">
                  {o.items?.length || 1} items
                </td>
                <td className="p-4 font-headline-md font-bold text-sm text-primary">
                  ${Number(o.amount).toFixed(2)}
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
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
