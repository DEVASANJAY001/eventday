import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import { productService } from '../../services/productService';

export default function Analytics() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      orderService.getAllOrders(),
      productService.getProducts(),
    ]).then(([ords, prods]) => {
      setOrders(ords || []);
      setProducts(prods || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const totalRevenue = orders.reduce((acc, o) => acc + Number(o.amount || 0), 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  // Category revenue breakdown from real orders
  const categoryRevenue = {};
  orders.forEach(o => {
    (o.items || []).forEach(item => {
      const prod = products.find(p => p.id === (item.product?.id || item.product_id));
      const cat = prod?.category || 'Other';
      categoryRevenue[cat] = (categoryRevenue[cat] || 0) + Number(item.product?.price || item.product_price || 0) * (item.quantity || 1);
    });
  });

  const catEntries = Object.entries(categoryRevenue).sort((a, b) => b[1] - a[1]);
  const totalCatRevenue = catEntries.reduce((acc, [, v]) => acc + v, 0);

  return (
    <div className="space-y-6">
      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Sales & Traffic Analytics
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Conversion funnels, average order value (AOV), and customer retention insights — live from Supabase.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-on-surface-variant font-medium">Loading analytics from database...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft">
              <span className="text-xs font-bold uppercase text-on-surface-variant">Total Revenue</span>
              <span className="block font-headline text-3xl font-bold text-primary mt-2">
                ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-on-surface-variant mt-1 block">{orders.length} total orders</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft">
              <span className="text-xs font-bold uppercase text-on-surface-variant">Average Order Value</span>
              <span className="block font-headline text-3xl font-bold text-secondary mt-2">
                ${avgOrderValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-on-surface-variant mt-1 block">Across all transactions</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft">
              <span className="text-xs font-bold uppercase text-on-surface-variant">Active Products</span>
              <span className="block font-headline text-3xl font-bold text-primary mt-2">{products.length}</span>
              <span className="text-xs text-on-surface-variant mt-1 block">
                {products.filter(p => p.inStock).length} in stock
              </span>
            </div>
          </div>

          {/* Category Revenue Breakdown */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft space-y-4">
            <h2 className="font-headline-md text-primary font-bold text-lg border-b border-outline-variant/20 pb-3">
              Category Revenue Contribution
            </h2>
            {catEntries.length === 0 ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-[40px] text-on-surface-variant block mb-2">bar_chart</span>
                <p className="text-sm text-on-surface-variant">No order data yet. Revenue breakdown will appear after customers place orders.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {catEntries.map(([cat, rev], i) => {
                  const pct = totalCatRevenue > 0 ? Math.round((rev / totalCatRevenue) * 100) : 0;
                  const barColors = ['bg-primary', 'bg-secondary-container', 'bg-primary-container', 'bg-surface-variant'];
                  return (
                    <div key={cat} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-on-surface">
                        <span>{cat.charAt(0).toUpperCase() + cat.slice(1)} ({pct}%)</span>
                        <span>${rev.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden">
                        <div
                          style={{ width: `${pct}%`, transition: 'width 0.8s ease' }}
                          className={`h-full ${barColors[i % barColors.length]} rounded-full`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Order Status Summary */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft space-y-4">
            <h2 className="font-headline-md text-primary font-bold text-lg border-b border-outline-variant/20 pb-3">
              Order Status Distribution
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => {
                const count = orders.filter(o => o.status === status).length;
                return (
                  <div key={status} className="bg-surface-container-low rounded-xl p-4 text-center">
                    <span className="block text-2xl font-bold text-primary">{count}</span>
                    <span className="text-xs text-on-surface-variant font-medium">{status}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
