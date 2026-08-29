import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function AdminRegister() {
  const navigate = useNavigate();
  const { createAdminAccount } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createAdminAccount(email, password, fullName, adminSecret);
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/dashboard', { replace: true });
      }, 1200);
    } catch (err) {
      setError(err.message || 'Failed to create admin account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-secondary text-on-secondary rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <span className="material-symbols-outlined text-[32px]">shield_person</span>
          </div>
          <h1 className="font-headline-xl text-2xl text-primary font-bold tracking-tight">
            Register Admin Account
          </h1>
          <p className="text-body-sm text-on-surface-variant">
            Create an administrator profile with verified clearance key.
          </p>
        </div>

        {error && (
          <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-primary text-on-primary px-4 py-3 rounded-xl text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-secondary-container">check_circle</span>
            <span>Admin account created successfully! Redirecting to Dashboard...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Admin Deva"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

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

          <div className="space-y-1">
            <Input
              label="Admin Security Passcode"
              type="password"
              placeholder="Enter store clearance key"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              required
            />
            <p className="text-[11px] text-on-surface-variant">
              Default passcode: <code className="bg-surface-container px-1 py-0.5 rounded font-mono font-bold text-primary">admin_piomart_2026</code>
            </p>
          </div>

          <Button
            type="submit"
            variant="secondary"
            className="w-full py-3.5"
            disabled={loading}
          >
            {loading ? 'Registering Admin...' : 'Create Admin Account'}
          </Button>
        </form>

        <div className="text-center text-xs text-on-surface-variant space-y-2 pt-2 border-t border-outline-variant/20">
          <p>
            Already registered?{' '}
            <Link to="/admin/login" className="text-primary font-bold hover:underline">
              Admin Login
            </Link>
          </p>
          <p>
            <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors">
              ← Back to Storefront
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
