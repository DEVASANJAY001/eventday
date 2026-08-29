import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { signInWithEmail, isAdmin, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already logged in as admin, redirect to dashboard
  if (user && isAdmin) {
    navigate('/admin/dashboard', { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmail(email, password);
      // Auth state change will update isAdmin
      setTimeout(() => {
        navigate('/admin/dashboard', { replace: true });
      }, 500);
    } catch (err) {
      setError(err.message || 'Invalid administrator credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-primary text-on-primary rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <span className="material-symbols-outlined text-[32px]">admin_panel_settings</span>
          </div>
          <h1 className="font-headline-xl text-2xl text-primary font-bold tracking-tight">
            Store Administration
          </h1>
          <p className="text-body-sm text-on-surface-variant">
            Authorized management portal for PioMart operations.
          </p>
        </div>

        {error && (
          <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Admin Email"
            type="email"
            placeholder="admin@piomart.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3.5"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Access Admin Dashboard'}
          </Button>
        </form>

        <div className="text-center text-xs text-on-surface-variant space-y-2 pt-2 border-t border-outline-variant/20">
          <p>
            Need to register as an administrator?{' '}
            <Link to="/admin/register" className="text-secondary font-bold hover:underline">
              Create Admin Account
            </Link>
          </p>
          <p>
            <Link to="/" className="text-primary font-semibold hover:underline">
              ← Return to Storefront
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
