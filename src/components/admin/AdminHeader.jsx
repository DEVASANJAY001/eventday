import React from 'react';

export default function AdminHeader() {
  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant/30 py-4 px-6 flex items-center justify-between shadow-nav-subtle">
      <div className="flex items-center gap-3">
        <h2 className="font-headline text-base font-bold text-primary">Store Control Center</h2>
        <span className="bg-primary-fixed text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
          Live
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search orders, products..."
            className="w-56 bg-surface-container-low border border-outline-variant/40 rounded-full pl-8 pr-3 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/30">
          <img
            alt="Admin Avatar"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-variant"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEeZukfD0PyCs7V-ESAVDJOih52NKMIKtgqRy2TfbaHp6bgvBzfimSJR7o9YGazDasJF1Q4dG98hVfgb0cr_vRzM1_JqXupRrQBXiKSZIIGM-LLFByGTfJ5NnQ70Xrnd14nQ3nWZyiRjEDxxN-c2mKP6xdjpNLFMlD4K8_DVV4IooNFYByVFExdd8-03Q8rS9WDtrNqeVaCx0Hs4oCaB0U2BvHR0QHeKW_klE4eI2bNaQfJQE89w"
          />
          <div className="hidden md:block text-left">
            <span className="block font-label-md text-xs text-on-surface font-bold">Admin Deva</span>
            <span className="text-[10px] text-on-surface-variant">Store Superuser</span>
          </div>
        </div>
      </div>
    </header>
  );
}
