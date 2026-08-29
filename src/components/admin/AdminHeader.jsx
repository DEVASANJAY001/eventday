import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminHeader() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const adminName = profile?.full_name || user?.user_metadata?.full_name || 'Admin User';
  const adminEmail = user?.email || 'admin@piomart.com';
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEeZukfD0PyCs7V-ESAVDJOih52NKMIKtgqRy2TfbaHp6bgvBzfimSJR7o9YGazDasJF1Q4dG98hVfgb0cr_vRzM1_JqXupRrQBXiKSZIIGM-LLFByGTfJ5NnQ70Xrnd14nQ3nWZyiRjEDxxN-c2mKP6xdjpNLFMlD4K8_DVV4IooNFYByVFExdd8-03Q8rS9WDtrNqeVaCx0Hs4oCaB0U2BvHR0QHeKW_klE4eI2bNaQfJQE89w';

  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant/30 py-4 px-6 flex items-center justify-between shadow-nav-subtle">
      <div className="flex items-center gap-3">
        <h2 className="font-headline text-base font-bold text-primary">Store Control Center</h2>
        <span className="bg-primary-fixed text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
          Supabase Connected
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-3 pl-2 border-l border-outline-variant/30">
          <img
            alt="Admin Avatar"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
            src={avatarUrl}
          />
          <div className="hidden md:block text-left">
            <span className="block font-label-md text-xs text-on-surface font-bold">{adminName}</span>
            <span className="text-[10px] text-on-surface-variant truncate max-w-[140px] block">{adminEmail}</span>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            title="Sign out of Admin Portal"
            className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
