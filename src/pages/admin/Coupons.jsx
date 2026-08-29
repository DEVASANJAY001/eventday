import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';

export default function Coupons() {
  const [couponsList, setCouponsList] = useState([
    { code: 'SAVE10', discount: '10% OFF', type: 'Percentage', usage: 142, expiry: '2026-12-31', active: true },
    { code: 'WELCOME20', discount: '20% OFF', type: 'Percentage', usage: 389, expiry: '2026-12-31', active: true },
    { code: 'FLASH50', discount: '$50.00 FLAT', type: 'Fixed', usage: 45, expiry: '2026-09-15', active: false },
  ]);

  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('');

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCode) return;
    setCouponsList(prev => [
      { code: newCode.toUpperCase(), discount: `${newDiscount}% OFF`, type: 'Percentage', usage: 0, expiry: '2026-12-31', active: true },
      ...prev
    ]);
    setNewCode('');
    setNewDiscount('');
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Promotional Campaigns & Coupons
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Create voucher codes and manage active discount percentages.
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
            <Button type="submit" variant="secondary" className="w-full">
              Generate Coupon
            </Button>
          </form>
        </div>

        {/* Coupons List */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden shadow-card-soft">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase font-bold tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="p-4">Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Total Redemptions</th>
                <th className="p-4">Valid Until</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-on-surface">
              {couponsList.map((c) => (
                <tr key={c.code} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-sm text-primary">
                    {c.code}
                  </td>
                  <td className="p-4 font-bold text-secondary">
                    {c.discount}
                  </td>
                  <td className="p-4 text-on-surface-variant">
                    {c.usage} times
                  </td>
                  <td className="p-4 text-on-surface-variant">
                    {c.expiry}
                  </td>
                  <td className="p-4">
                    <Badge variant={c.active ? 'success' : 'neutral'}>
                      {c.active ? 'Active' : 'Expired'}
                    </Badge>
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
