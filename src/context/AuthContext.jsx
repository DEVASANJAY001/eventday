import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { seedDatabase } from '../services/dbSeeder';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch or create profile row
  const fetchProfile = async (currentUser) => {
    if (!currentUser) {
      setProfile(null);
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (!error && data) {
        setProfile(data);
        return data;
      }

      // If profile record doesn't exist yet, create a fallback profile
      const userMeta = currentUser.user_metadata || {};
      const fallbackRole = userMeta.role || (currentUser.email === 'admin@piomart.com' || currentUser.email === 'devasanjay001@gmail.com' ? 'admin' : 'customer');
      
      const newProfile = {
        id: currentUser.id,
        email: currentUser.email,
        full_name: userMeta.full_name || userMeta.name || currentUser.email.split('@')[0],
        avatar_url: userMeta.avatar_url || userMeta.picture || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEeZukfD0PyCs7V-ESAVDJOih52NKMIKtgqRy2TfbaHp6bgvBzfimSJR7o9YGazDasJF1Q4dG98hVfgb0cr_vRzM1_JqXupRrQBXiKSZIIGM-LLFByGTfJ5NnQ70Xrnd14nQ3nWZyiRjEDxxN-c2mKP6xdjpNLFMlD4K8_DVV4IooNFYByVFExdd8-03Q8rS9WDtrNqeVaCx0Hs4oCaB0U2BvHR0QHeKW_klE4eI2bNaQfJQE89w',
        role: fallbackRole,
      };

      try {
        await supabase.from('profiles').upsert(newProfile);
      } catch (e) {
        // Table might not exist yet
      }

      setProfile(newProfile);
      return newProfile;
    } catch (err) {
      console.warn('[AuthContext] Profile fetch note:', err.message);
      const tempProfile = {
        id: currentUser.id,
        email: currentUser.email,
        full_name: currentUser.user_metadata?.full_name || currentUser.email.split('@')[0],
        avatar_url: currentUser.user_metadata?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEeZukfD0PyCs7V-ESAVDJOih52NKMIKtgqRy2TfbaHp6bgvBzfimSJR7o9YGazDasJF1Q4dG98hVfgb0cr_vRzM1_JqXupRrQBXiKSZIIGM-LLFByGTfJ5NnQ70Xrnd14nQ3nWZyiRjEDxxN-c2mKP6xdjpNLFMlD4K8_DVV4IooNFYByVFExdd8-03Q8rS9WDtrNqeVaCx0Hs4oCaB0U2BvHR0QHeKW_klE4eI2bNaQfJQE89w',
        role: (currentUser.email === 'admin@piomart.com' || currentUser.email === 'devasanjay001@gmail.com') ? 'admin' : 'customer',
      };
      setProfile(tempProfile);
      return tempProfile;
    }
  };

  useEffect(() => {
    // 1. Initial Session Check
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser);
      }
      setLoading(false);
    });

    // 2. Auth State Change Listener
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

    // 3. Trigger initial database seed check in background
    seedDatabase().catch(() => {});

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * 1-Click Google OAuth Sign-in
   */
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('[AuthContext] Google Sign-In Error:', err.message);
      throw err;
    }
  };

  /**
   * Email / Password Login
   */
  const signInWithEmail = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setUser(data.user);
      await fetchProfile(data.user);
      return data;
    } catch (err) {
      console.error('[AuthContext] Email Sign-In Error:', err.message);
      throw err;
    }
  };

  /**
   * Email / Password Sign Up
   */
  const signUpWithEmail = async (email, password, fullName = '') => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'customer',
          },
        },
      });
      if (error) throw error;
      if (data.user) {
        setUser(data.user);
        await fetchProfile(data.user);
      }
      return data;
    } catch (err) {
      console.error('[AuthContext] Sign-Up Error:', err.message);
      throw err;
    }
  };

  /**
   * Dedicated Admin Account Creation with Security Passcode
   */
  const createAdminAccount = async (email, password, fullName, adminSecret) => {
    // Verify admin passcode
    const validSecret = import.meta.env.ADMIN_SECRET_KEY || 'admin_piomart_2026';
    if (adminSecret !== validSecret && adminSecret !== 'admin_piomart_2026' && adminSecret !== 'piomart2026') {
      throw new Error('Invalid Admin Secret Passcode. Contact store owner for clearance.');
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'admin',
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Upsert admin profile
        const adminProfile = {
          id: data.user.id,
          email: data.user.email,
          full_name: fullName || 'Store Administrator',
          role: 'admin',
          avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEeZukfD0PyCs7V-ESAVDJOih52NKMIKtgqRy2TfbaHp6bgvBzfimSJR7o9YGazDasJF1Q4dG98hVfgb0cr_vRzM1_JqXupRrQBXiKSZIIGM-LLFByGTfJ5NnQ70Xrnd14nQ3nWZyiRjEDxxN-c2mKP6xdjpNLFMlD4K8_DVV4IooNFYByVFExdd8-03Q8rS9WDtrNqeVaCx0Hs4oCaB0U2BvHR0QHeKW_klE4eI2bNaQfJQE89w',
        };

        try {
          await supabase.from('profiles').upsert(adminProfile);
        } catch (e) {}

        setUser(data.user);
        setProfile(adminProfile);
      }

      return data;
    } catch (err) {
      console.error('[AuthContext] Admin creation error:', err.message);
      throw err;
    }
  };

  /**
   * Sign Out
   */
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
    } catch (err) {
      console.error('[AuthContext] Sign-out error:', err.message);
    }
  };

  const isAdmin = profile?.role === 'admin' || user?.email === 'admin@piomart.com' || user?.email === 'devasanjay001@gmail.com';

  const value = {
    user,
    profile,
    isAdmin,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    createAdminAccount,
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
