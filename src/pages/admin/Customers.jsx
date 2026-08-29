import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { orderService } from '../../services/orderService';
import Badge from '../../components/ui/Badge';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        const orders = await orderService.getAllOrders();

        if (profiles && profiles.length > 0) {
          const list = profiles.map(p => {
            const userOrders = orders.filter(o => o.user_id === p.id || o.user_email === p.email || o.shippingAddress?.email === p.email);
            const totalSpent = userOrders.reduce((sum, o) => sum + Number(o.amount || 0), 0);
            return {
              id: p.id.slice(0, 8).toUpperCase(),
              name: p.full_name || 'Customer',
              email: p.email,
              avatar: p.avatar_url,
              ordersCount: userOrders.length,
              spent: `$${totalSpent.toFixed(2)}`,
              status: p.role === 'admin' ? 'Administrator' : 'Active',
            };
          });
          setCustomers(list);
        } else {
          // Derive customer profiles from orders if profiles table is empty
          const customerMap = new Map();
          orders.forEach(o => {
            const email = o.user_email || o.shippingAddress?.email || 'customer@piomart.com';
            const name = o.shippingAddress?.name || email.split('@')[0];
            const prev = customerMap.get(email) || { name, email, ordersCount: 0, spent: 0 };
            prev.ordersCount += 1;
            prev.spent += Number(o.amount || 0);
            customerMap.set(email, prev);
          });

          const derived = Array.from(customerMap.values()).map((c, i) => ({
            id: `CUST-${100 + i}`,
            name: c.name,
            email: c.email,
            ordersCount: c.ordersCount,
            spent: `$${c.spent.toFixed(2)}`,
            status: 'Active',
          }));
          setCustomers(derived);
        }
      } catch (err) {
        console.warn('Customers load note:', err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Customer Accounts & Profiles
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Live shopper metrics, registered profiles, and transaction lifetime value in Supabase.
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
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 text-on-surface">
            {customers.map((c) => (
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
                  <Badge variant={c.status === 'Administrator' ? 'bestseller' : 'success'}>
                    {c.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
