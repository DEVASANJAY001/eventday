import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function Settings() {
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(true);

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg gap-gutter">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-label-sm text-on-surface-variant uppercase tracking-wider mb-stack-sm">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link to="/profile" className="hover:text-primary transition-colors">Profile</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary font-bold">Preferences</span>
      </div>

      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Account Preferences
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Control notifications, privacy, and active session logins.
        </p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-card-soft max-w-2xl space-y-6">
        <div className="space-y-4">
          <h3 className="font-headline-md text-primary font-bold text-lg border-b border-outline-variant/20 pb-2">
            Notification Settings
          </h3>
          <div className="space-y-3 text-body-sm text-on-surface">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={orderUpdates}
                onChange={(e) => setOrderUpdates(e.target.checked)}
                className="w-5 h-5 rounded border-outline-variant accent-primary cursor-pointer"
              />
              <span>Receive real-time order status updates via email</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-5 h-5 rounded border-outline-variant accent-primary cursor-pointer"
              />
              <span>Receive instant SMS delivery notifications</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={promoEmails}
                onChange={(e) => setPromoEmails(e.target.checked)}
                className="w-5 h-5 rounded border-outline-variant accent-primary cursor-pointer"
              />
              <span>Subscribe to Weekly Best Deals and product launches</span>
            </label>
          </div>
        </div>

        <div className="border-t border-outline-variant/20 pt-6 space-y-3">
          <h3 className="font-headline-md text-primary font-bold text-lg">
            Security & Session
          </h3>
          <p className="text-body-sm text-on-surface-variant">
            You are currently signed in as <strong>devasanjay001@gmail.com</strong>.
          </p>
          <div className="pt-2">
            <Button variant="danger" icon="logout">Sign Out of All Devices</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
