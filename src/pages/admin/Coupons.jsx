import React, { useState, useEffect } from 'react';
import { couponService } from '../../services/couponService';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';

export default function Coupons() {
  const [couponsList, setCouponsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('');
  const [creating, setCreating] = useState(false);

  const loadCoupons = async () => {
    try {
      const data = await couponService.getAllCoupons();
      setCouponsList(data || []);
    } catch (e) {
      console.warn('Coupons load error:', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!newCode) return;
    setCreating(true);

    const formatted = {
      code: newCode.trim().toUpperCase(),
      discount: `${newDiscount}% OFF`,
      discount_percent: parseFloat(newDiscount),
      discount_type: 'percentage',
      usage_count: 0,
      expires_at: '2026-12-31',
      is_active: true,
    };

    try {
      const saved = await couponService.createCoupon(formatted);
      setCouponsList(prev => [saved || formatted, ...prev.filter(c => c.code !== formatted.code)]);
      setNewCode('');
      setNewDiscount('');
    } catch (err) {
      console.warn('Coupon creation error:', err.message);
      // Optimistic UI update even if DB fails
      setCouponsList(prev => [formatted, ...prev.filter(c => c.code !== formatted.code)]);
    } finally {
      setCreating(false);
    }
  };

  const handleToggleStatus = async (code, currentStatus) => {
    try {
      await couponService.toggleCoupon(code, !currentStatus);
      setCouponsList(prev => prev.map(c => c.code === code ? { ...c, is_active: !currentStatus } : c));
    } catch (e) {
      console.warn('Toggle coupon error:', e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Promotional Campaigns & Coupons
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Create voucher codes and manage active discount percentages in Supabase.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Coupon Card */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft space-y-4">
          <h2 className="font-headline-md text-primary font-bold text-lg border-b border-outline-variant/20 pb-2">
            Create Discount Code
          </h2>
          <form onSubmit={handleCreateCoupon} className="space-y-4">
            <Input
              label="Coupon Code"
              placeholder="e.g. SUMMER25"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              required
            />
            <Input
              label="Discount Percentage (%)"
              type="number"
              placeholder="25"
              value={newDiscount}
              onChange={(e) => setNewDiscount(e.target.value)}
              required
            />
            <Button type="submit" variant="secondary" className="w-full" disabled={creating}>
              {creating ? 'Saving to Database...' : 'Save to Supabase'}
            </Button>
          </form>
        </div>

        {/* Existing Coupons Table */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden shadow-card-soft">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-bold tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="p-4">Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Total Uses</th>
                <th className="p-4">Expiry</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-on-surface">
              {couponsList.map((c) => (
                <tr key={c.code} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-sm text-primary">
                    {c.code}
                  </td>
                  <td className="p-4 font-headline-md font-bold text-secondary text-sm">
                    {c.discount || `${c.discount_percent}% OFF`}
                  </td>
                  <td className="p-4 font-medium text-on-surface-variant">
                    {c.usage_count || 0} times
                  </td>
                  <td className="p-4 text-on-surface-variant">
                    {c.expires_at || '2026-12-31'}
                  </td>
                  <td className="p-4">
                    <Badge variant={c.is_active ? 'success' : 'sale'}>
                      {c.is_active ? 'Active' : 'Disabled'}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleToggleStatus(c.code, c.is_active)}
                      className="text-xs text-primary hover:underline font-semibold"
                    >
                      {c.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
