import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { profileService } from '../services/profileService';

const AuthContext = createContext();

const DEFAULT_AVATAR = 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=00120f&textColor=ffffff';

const ADMIN_EMAILS = ['admin@piomart.com', 'devasanjay001@gmail.com'];

/** Derive admin secret from VITE env (proper prefix) or fallback */
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET_KEY || 'admin_piomart_2026';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  /**
   * Fetch or create a profile row for the given auth user
   */
  const fetchProfile = async (currentUser) => {
    if (!currentUser) {
      setProfile(null);
      return null;
    }

    try {
      // Try fetching existing profile
      const existing = await profileService.getProfile(currentUser.id);
      if (existing) {
        setProfile(existing);
        return existing;
      }

      // Profile doesn't exist — create one
      const userMeta = currentUser.user_metadata || {};
      const role = userMeta.role || (ADMIN_EMAILS.includes(currentUser.email) ? 'admin' : 'customer');

      const newProfile = {
        id: currentUser.id,
        email: currentUser.email,
        full_name: userMeta.full_name || userMeta.name || currentUser.email.split('@')[0],
        avatar_url: userMeta.avatar_url || userMeta.picture || DEFAULT_AVATAR,
        role,
        phone: userMeta.phone || '',
      };

      try {
        const saved = await profileService.upsertProfile(newProfile);
        setProfile(saved || newProfile);
        return saved || newProfile;
      } catch {
        setProfile(newProfile);
        return newProfile;
      }
    } catch (err) {
      console.warn('[AuthContext] Profile fetch error:', err.message);
      // Minimal fallback so app doesn't break
      const fallback = {
        id: currentUser.id,
        email: currentUser.email,
        full_name: currentUser.user_metadata?.full_name || currentUser.email.split('@')[0],
        avatar_url: currentUser.user_metadata?.avatar_url || DEFAULT_AVATAR,
        role: ADMIN_EMAILS.includes(currentUser.email) ? 'admin' : 'customer',
        phone: '',
      };
      setProfile(fallback);
      return fallback;
    }
  };

  useEffect(() => {
    // 0. Detect and handle OAuth error or code exchange from URL
    const handleUrlAuthParams = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));

        const error = urlParams.get('error') || hashParams.get('error');
        const errorDescription = urlParams.get('error_description') || hashParams.get('error_description');
        const errorCode = urlParams.get('error_code') || hashParams.get('error_code');
        const code = urlParams.get('code');

        if (error) {
          console.warn('[AuthContext] OAuth callback notification:', error, errorDescription || errorCode);
          setAuthError(errorDescription || 'OAuth authorization was cancelled or expired.');
          
          // Clean the URL without reloading to clear bad_oauth_state
          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
        } else if (code) {
          // Exchange code for session if present
          try {
            const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
            if (!exchangeError && data?.session?.user) {
              setUser(data.session.user);
              await fetchProfile(data.session.user);
            }
          } catch (e) {
            console.warn('[AuthContext] Code exchange note:', e.message);
          }
          // Clean the URL code param
          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
        }
      } catch (err) {
        console.warn('[AuthContext] URL auth param processing:', err.message);
      }
    };

    handleUrlAuthParams();

    // 1. Restore existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // 2. Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 1-Click Google OAuth Sign-in with dynamic origin redirect */
  const signInWithGoogle = async () => {
    setAuthError(null);
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      },
    });
    if (error) {
      setAuthError(error.message);
      throw error;
    }
    return data;
  };

  /** Email + password login */
  const signInWithEmail = async (email, password) => {
    setAuthError(null);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
      throw error;
    }
    setUser(data.user);
    await fetchProfile(data.user);
    return data;
  };

  /** New customer registration */
  const signUpWithEmail = async (email, password, fullName = '') => {
    setAuthError(null);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role: 'customer' } },
    });
    if (error) {
      setAuthError(error.message);
      throw error;
    }
    if (data.user) {
      setUser(data.user);
      await fetchProfile(data.user);
    }
    return data;
  };

  /** Admin account creation — requires secret passcode */
  const createAdminAccount = async (email, password, fullName, adminSecret) => {
    setAuthError(null);
    if (adminSecret !== ADMIN_SECRET) {
      throw new Error('Invalid Admin Secret Passcode. Contact store owner for clearance.');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role: 'admin' } },
    });
    if (error) {
      setAuthError(error.message);
      throw error;
    }

    if (data.user) {
      const adminProfile = {
        id: data.user.id,
        email: data.user.email,
        full_name: fullName || 'Store Administrator',
        role: 'admin',
        avatar_url: DEFAULT_AVATAR,
        phone: '',
      };
      try {
        await profileService.upsertProfile(adminProfile);
      } catch {}
      setUser(data.user);
      setProfile(adminProfile);
    }

    return data;
  };

  /** Sign out */
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setAuthError(null);
  };

  /** Update the current user's profile */
  const updateProfile = async (updates) => {
    if (!user?.id) throw new Error('Not authenticated');
    const updated = await profileService.updateProfile(user.id, updates);
    setProfile(prev => ({ ...prev, ...updated }));
    return updated;
  };

  const isAdmin = profile?.role === 'admin' || ADMIN_EMAILS.includes(user?.email);

  const value = {
    user,
    profile,
    isAdmin,
    loading,
    authError,
    setAuthError,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    createAdminAccount,
    updateProfile,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
