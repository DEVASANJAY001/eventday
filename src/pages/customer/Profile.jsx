import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function Profile() {
  const { user, profile } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user || profile) {
      setFullName(profile?.full_name || user?.user_metadata?.full_name || 'Deva Sanjay');
      setEmail(user?.email || profile?.email || 'devasanjay001@gmail.com');
      setPhone(profile?.phone || '+91 98765 43210');
    }
  }, [user, profile]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await supabase
          .from('profiles')
          .update({ full_name: fullName, phone })
          .eq('id', user.id);
      } catch (e) {}
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const userAvatar = profile?.avatar_url || user?.user_metadata?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEeZukfD0PyCs7V-ESAVDJOih52NKMIKtgqRy2TfbaHp6bgvBzfimSJR7o9YGazDasJF1Q4dG98hVfgb0cr_vRzM1_JqXupRrQBXiKSZIIGM-LLFByGTfJ5NnQ70Xrnd14nQ3nWZyiRjEDxxN-c2mKP6xdjpNLFMlD4K8_DVV4IooNFYByVFExdd8-03Q8rS9WDtrNqeVaCx0Hs4oCaB0U2BvHR0QHeKW_klE4eI2bNaQfJQE89w';

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg gap-gutter">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-label-sm text-on-surface-variant uppercase tracking-wider mb-stack-sm">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary font-bold">My Profile</span>
      </div>

      <div className="border-b border-outline-variant/30 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
            Account Center
          </h1>
          <p className="text-body-sm text-on-surface-variant">
            Manage your personal profile and account credentials in Supabase.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/orders">
            <Button variant="outline" size="sm">My Orders</Button>
          </Link>
          <Link to="/profile/settings">
            <Button variant="ghost" size="sm">Preferences</Button>
          </Link>
        </div>
      </div>

      {saved && (
        <div className="bg-primary text-on-primary p-4 rounded-xl shadow-md flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary-container">check_circle</span>
          <span className="font-label-md">Profile changes saved successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft text-center flex flex-col items-center space-y-4">
          <img
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/20 shadow-md"
            src={userAvatar}
          />
          <div>
            <h2 className="font-headline-md text-headline-md text-primary text-xl">{fullName}</h2>
            <p className="text-xs text-on-surface-variant">{email}</p>
          </div>
          <span className="inline-block bg-primary-fixed text-primary font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            {profile?.role === 'admin' ? 'Administrator' : 'Premium Member'}
          </span>
        </div>

        {/* Details Form */}
        <form onSubmit={handleSave} className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-card-soft space-y-6">
          <h2 className="font-headline-md text-headline-md text-primary text-lg border-b border-outline-variant/20 pb-3">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              value={email}
              disabled
              type="email"
            />
            <div className="sm:col-span-2">
              <Input
                label="Mobile Contact Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
            <Button type="submit" variant="primary">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
