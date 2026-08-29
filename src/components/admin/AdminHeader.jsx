import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminHeader({ onToggleMobileSidebar = () => {} }) {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const adminName = profile?.full_name || user?.user_metadata?.full_name || 'Admin User';
  const adminEmail = user?.email || 'admin@piomart.com';
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || 'https://api.dicebear.com/9.x/initials/svg?seed=Admin&backgroundColor=00120f&textColor=ffffff';

  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant/30 py-3.5 px-4 sm:px-6 flex items-center justify-between shadow-nav-subtle">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          aria-label="Open Admin Menu"
          className="lg:hidden p-1.5 -ml-1 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <h2 className="font-headline text-sm sm:text-base font-bold text-primary truncate">
          Store Control Center
        </h2>
        <span className="hidden sm:inline-block bg-primary-fixed text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
          Live DB
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 text-xs">
        <div className="flex items-center gap-2 sm:gap-3 pl-2 border-l border-outline-variant/30">
          <img
            alt="Admin Avatar"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-primary/20"
            src={avatarUrl}
          />
          <div className="hidden md:block text-left">
            <span className="block font-label-md text-xs text-on-surface font-bold truncate max-w-[120px]">{adminName}</span>
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
