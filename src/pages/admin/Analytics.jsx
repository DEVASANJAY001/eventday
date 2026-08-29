import React from 'react';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Sales & Traffic Analytics
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Conversion funnels, average order value (AOV), and customer retention insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft">
          <span className="text-xs font-bold uppercase text-on-surface-variant">Average Order Value</span>
          <span className="block font-headline text-3xl font-bold text-primary mt-2">$142.50</span>
          <span className="text-xs text-primary font-semibold mt-1 block">+5.8% vs last month</span>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft">
          <span className="text-xs font-bold uppercase text-on-surface-variant">Conversion Rate</span>
          <span className="block font-headline text-3xl font-bold text-secondary mt-2">3.84%</span>
          <span className="text-xs text-primary font-semibold mt-1 block">+0.4% from mobile shoppers</span>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft">
          <span className="text-xs font-bold uppercase text-on-surface-variant">Cart Abandonment</span>
          <span className="block font-headline text-3xl font-bold text-primary mt-2">24.2%</span>
          <span className="text-xs text-error font-semibold mt-1 block">-3.1% improved recovery</span>
        </div>
      </div>

      {/* Breakdown by Category */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft space-y-4">
        <h2 className="font-headline-md text-primary font-bold text-lg border-b border-outline-variant/20 pb-3">
          Category Revenue Contribution
        </h2>
        <div className="space-y-4">
          {[
            { cat: 'Gadgets & Wearables', percent: '64%', revenue: '$31,308.80', bar: 'bg-primary' },
            { cat: 'Apparel (Men & Women)', percent: '22%', revenue: '$10,762.40', bar: 'bg-secondary-container' },
            { cat: 'Home & Living', percent: '14%', revenue: '$6,848.80', bar: 'bg-primary-container' },
          ].map(c => (
            <div key={c.cat} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-on-surface">
                <span>{c.cat} ({c.percent})</span>
                <span>{c.revenue}</span>
              </div>
              <div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden">
                <div style={{ width: c.percent }} className={`h-full ${c.bar} rounded-full`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
