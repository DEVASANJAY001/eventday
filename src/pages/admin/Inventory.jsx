import React from 'react';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import Badge from '../../components/ui/Badge';

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Warehouse Inventory & Stock Logs
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Live stock monitoring, low-stock threshold warnings, and restocking logs.
        </p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden shadow-card-soft">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-surface-container-low text-on-surface-variant uppercase font-bold tracking-wider border-b border-outline-variant/20">
            <tr>
              <th className="p-4">SKU / Item</th>
              <th className="p-4">Category</th>
              <th className="p-4">Available Units</th>
              <th className="p-4">Threshold</th>
              <th className="p-4">Stock Status</th>
              <th className="p-4 text-right">Quick Restock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 text-on-surface">
            {MOCK_PRODUCTS.map((p, idx) => (
              <tr key={p.id} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 object-contain mix-blend-multiply bg-surface-container-low rounded-lg p-1"
                    />
                    <div>
                      <span className="font-label-md text-sm font-bold block">{p.name}</span>
                      <span className="text-[10px] text-on-surface-variant font-mono">SKU-00{idx + 101}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 uppercase text-[11px] font-semibold text-on-surface-variant">
                  {p.category}
                </td>
                <td className="p-4 font-headline-md font-bold text-sm text-primary">
                  {p.stock || 30} units
                </td>
                <td className="p-4 text-on-surface-variant">
                  10 units
                </td>
                <td className="p-4">
                  <Badge variant={(p.stock || 30) > 15 ? 'success' : 'bestseller'}>
                    {(p.stock || 30) > 15 ? 'Healthy Stock' : 'Low Stock'}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <button className="bg-surface-container text-primary hover:bg-primary hover:text-on-primary font-bold px-3 py-1.5 rounded-lg transition-colors">
                    + Restock 50
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
