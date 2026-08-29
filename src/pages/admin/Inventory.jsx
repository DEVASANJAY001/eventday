import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { SkeletonRow } from '../../components/ui/LoadingSpinner';
import Badge from '../../components/ui/Badge';

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restockingId, setRestockingId] = useState(null);

  const loadData = () => {
    productService.getProducts()
      .then(data => { setProducts(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
    const unsubscribe = productService.subscribeToProducts(loadData);
    return () => unsubscribe();
  }, []);

  const handleQuickRestock = async (productId, currentStock) => {
    setRestockingId(productId);
    try {
      const newStock = (currentStock || 0) + 25;
      await productService.updateProduct(productId, { stock: newStock });
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
    } catch (e) {
      console.warn('Restock error:', e.message);
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

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-on-surface-variant font-medium">Loading inventory from database...</span>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-3 block">warehouse</span>
          <p className="font-bold text-primary">No products in inventory</p>
          <p className="text-xs text-on-surface-variant mt-1">Add products to start tracking stock levels.</p>
        </div>
      ) : (
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
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image || '/products/placeholder.jpg'}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded-xl border border-outline-variant/20"
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                      <div>
                        <span className="font-label-md text-sm font-bold block">{p.name}</span>
                        <span className="text-[10px] text-on-surface-variant font-mono">SKU-{String(p.id).toUpperCase().slice(0, 10)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 uppercase text-[11px] font-semibold text-on-surface-variant">
                    {p.category}
                  </td>
                  <td className="p-4 font-headline-md font-bold text-sm text-primary">
                    {p.stock ?? 0} units
                  </td>
                  <td className="p-4 text-on-surface-variant">
                    10 units
                  </td>
                  <td className="p-4">
                    <Badge variant={(p.stock ?? 0) > 15 ? 'success' : 'bestseller'}>
                      {(p.stock ?? 0) > 15 ? 'Healthy Stock' : 'Low Stock'}
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
      )}
    </div>
  );
}
