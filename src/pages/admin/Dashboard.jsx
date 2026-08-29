import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { useCart } from '../../context/CartContext';
import Badge from '../../components/ui/Badge';

export default function Dashboard() {
  const { orders } = useCart();

  const kpis = [
    { label: 'Total Revenue', value: '$48,920.00', change: '+14.2%', icon: 'payments', isUp: true },
    { label: 'Total Orders', value: String(124 + orders.length), change: '+8.1%', icon: 'receipt_long', isUp: true },
    { label: 'Total Customers', value: '1,840', change: '+12.4%', icon: 'groups', isUp: true },
    { label: 'Live Catalog Items', value: String(MOCK_PRODUCTS.length), change: 'Stable', icon: 'inventory_2', isUp: true },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
            Executive Dashboard
          </h1>
          <p className="text-body-sm text-on-surface-variant">
            Performance metrics, sales overview, and recent order transactions.
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="bg-secondary text-on-secondary px-5 py-2.5 rounded-xl font-label-md hover:bg-secondary-container transition-colors shadow-sm inline-flex items-center gap-2 self-start"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Product
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-2xl shadow-card-soft space-y-3 relative overflow-hidden group hover:shadow-card-hover transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">
                {kpi.label}
              </span>
              <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">{kpi.icon}</span>
              </div>
            </div>

            <div>
              <span className="block text-2xl font-bold font-headline-md text-primary tracking-tight">
                {kpi.value}
              </span>
              <span className="text-xs font-semibold text-primary-container flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                {kpi.change} from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Charts & Visual Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart Card */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-2xl shadow-card-soft space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary text-lg">Sales Revenue Weekly</h2>
              <p className="text-xs text-on-surface-variant">Daily transaction volumes in USD</p>
            </div>
            <span className="text-xs bg-primary-fixed text-primary font-bold px-3 py-1 rounded-full">
              +18% Peak
            </span>
          </div>

          {/* Styled CSS Bar Chart */}
          <div className="h-52 flex items-end justify-between gap-3 pt-8 pb-2 px-4 bg-surface-container-low rounded-xl">
            {[
              { day: 'Mon', height: '40%', val: '$3.4k' },
              { day: 'Tue', height: '65%', val: '$5.8k' },
              { day: 'Wed', height: '55%', val: '$4.9k' },
              { day: 'Thu', height: '85%', val: '$7.8k' },
              { day: 'Fri', height: '70%', val: '$6.2k' },
              { day: 'Sat', height: '95%', val: '$9.2k' },
              { day: 'Sun', height: '75%', val: '$6.8k' },
            ].map(b => (
              <div key={b.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                  {b.val}
                </span>
                <div
                  style={{ height: b.height }}
                  className="w-full max-w-[36px] bg-primary group-hover:bg-secondary-container rounded-t-lg transition-all duration-300"
                />
                <span className="text-xs text-on-surface-variant font-medium">{b.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders Overview */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-2xl shadow-card-soft space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary text-lg">Latest Orders</h2>
              <p className="text-xs text-on-surface-variant">Real-time incoming customer transactions</p>
            </div>
            <Link to="/admin/orders" className="text-xs text-secondary hover:underline font-semibold">
              View All
            </Link>
          </div>

          <div className="space-y-3 overflow-hidden">
            {orders.slice(0, 4).map((o) => (
              <div key={o.id} className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                <div>
                  <span className="font-headline-md text-sm font-bold text-primary block">{o.id}</span>
                  <span className="text-xs text-on-surface-variant">{o.shippingAddress?.name || 'Customer'} • {o.items?.length || 1} items</span>
                </div>
                <div className="text-right">
                  <span className="font-headline-md text-sm font-bold text-primary block">${Number(o.amount).toFixed(2)}</span>
                  <Badge variant={o.status === 'Delivered' ? 'success' : 'bestseller'} className="text-[9px]">
                    {o.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
