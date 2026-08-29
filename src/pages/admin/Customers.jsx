import React from 'react';
import Badge from '../../components/ui/Badge';

export default function Customers() {
  const customerList = [
    { id: 'CUST-101', name: 'Deva Sanjay', email: 'devasanjay001@gmail.com', ordersCount: 4, spent: '$1,240.00', status: 'Active' },
    { id: 'CUST-102', name: 'Aarav Sharma', email: 'aarav.sharma@example.com', ordersCount: 2, spent: '$480.00', status: 'Active' },
    { id: 'CUST-103', name: 'Ananya Rao', email: 'ananya.rao@example.com', ordersCount: 6, spent: '$2,190.00', status: 'Active' },
    { id: 'CUST-104', name: 'Vikram Singh', email: 'vikram.s@example.com', ordersCount: 1, spent: '$149.00', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Customer Accounts & Profiles
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Registered shopper metrics and transaction lifetime value.
        </p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden shadow-card-soft">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-surface-container-low text-on-surface-variant uppercase font-bold tracking-wider border-b border-outline-variant/20">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Customer ID</th>
              <th className="p-4">Orders Placed</th>
              <th className="p-4">Lifetime Spend</th>
              <th className="p-4">Account Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 text-on-surface">
            {customerList.map((c) => (
              <tr key={c.id} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-label-md text-sm font-bold block">{c.name}</span>
                      <span className="text-[11px] text-on-surface-variant">{c.email}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-mono font-medium text-on-surface-variant">
                  {c.id}
                </td>
                <td className="p-4 font-bold text-primary">
                  {c.ordersCount} orders
                </td>
                <td className="p-4 font-headline-md font-bold text-primary text-sm">
                  {c.spent}
                </td>
                <td className="p-4">
                  <Badge variant="success">{c.status}</Badge>
                </td>
                <td className="p-4 text-right">
                  <button className="text-secondary hover:underline font-bold">
                    View Orders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
