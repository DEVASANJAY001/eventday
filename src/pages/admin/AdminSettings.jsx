import React, { useState } from 'react';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

export default function AdminSettings() {
  const [storeInfo, setStoreInfo] = useState({
    name: 'PioMart Retail Corp',
    email: 'support@piomart.com',
    currency: 'USD',
    shippingThreshold: '50.00',
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Store Configuration
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Configure currency rules, free shipping thresholds, and notification webhooks.
        </p>
      </div>

      {saved && (
        <div className="bg-primary text-on-primary p-4 rounded-xl shadow-md flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary-container">check_circle</span>
          <span className="font-label-md">Store settings successfully saved!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 bg-surface-container-lowest border border-outline-variant/30 p-6 md:p-8 rounded-2xl shadow-card-soft">
        <h2 className="font-headline-md text-primary font-bold text-lg border-b border-outline-variant/20 pb-3">
          General Brand Settings
        </h2>

        <Input
          label="Storefront Brand Name"
          value={storeInfo.name}
          onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
          required
        />

        <Input
          label="Support Contact Email"
          type="email"
          value={storeInfo.email}
          onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Base Currency"
            options={[
              { label: 'US Dollar ($ - USD)', value: 'USD' },
              { label: 'Indian Rupee (₹ - INR)', value: 'INR' },
              { label: 'Euro (€ - EUR)', value: 'EUR' },
              { label: 'British Pound (£ - GBP)', value: 'GBP' },
            ]}
            value={storeInfo.currency}
            onChange={(e) => setStoreInfo({ ...storeInfo, currency: e.target.value })}
            required
          />

          <Input
            label="Free Shipping Minimum ($)"
            type="number"
            value={storeInfo.shippingThreshold}
            onChange={(e) => setStoreInfo({ ...storeInfo, shippingThreshold: e.target.value })}
            required
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-outline-variant/20">
          <Button type="submit" variant="primary">
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
