import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import Badge from '../../components/ui/Badge';

export default function Inventory() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [restockingId, setRestockingId] = useState(null);

  const loadData = () => {
    productService.getProducts().then(setProducts).catch(() => {});
  };

  useEffect(() => {
    loadData();
    const unsubscribe = productService.subscribeToProducts(() => {
      loadData();
    });
    return () => unsubscribe();
  }, []);

  const handleQuickRestock = async (productId, currentStock) => {
    setRestockingId(productId);
    try {
      const newStock = (currentStock || 0) + 25;
      await productService.updateProduct(productId, { stock: newStock });
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
    } catch (e) {
      console.warn('Restock note:', e.message);
    } finally {
      setRestockingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Warehouse Inventory & Stock Logs
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Live stock monitoring, low-stock threshold warnings, and 1-click database restocking.
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
            {products.map((p, idx) => (
              <tr key={p.id} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-xl border border-outline-variant/20"
                    />
                    <div>
                      <span className="font-label-md text-sm font-bold block">{p.name}</span>
                      <span className="text-[10px] text-on-surface-variant font-mono">SKU-{p.id.toUpperCase()}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 uppercase text-[11px] font-semibold text-on-surface-variant">
                  {p.category}
                </td>
                <td className="p-4 font-headline-md font-bold text-sm text-primary">
                  {p.stock || 25} units
                </td>
                <td className="p-4 text-on-surface-variant">
                  10 units
                </td>
                <td className="p-4">
                  <Badge variant={(p.stock || 25) > 15 ? 'success' : 'bestseller'}>
                    {(p.stock || 25) > 15 ? 'Healthy Stock' : 'Low Stock'}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <button
                    disabled={restockingId === p.id}
                    onClick={() => handleQuickRestock(p.id, p.stock)}
                    className="bg-surface-container text-primary hover:bg-primary hover:text-on-primary font-bold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {restockingId === p.id ? 'Updating...' : '+25 Units'}
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
