import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Guard that allows ONLY authenticated users with `role === 'admin'` to access Admin routes.
 */
export default function AdminRoute() {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-body-sm text-on-surface-variant font-label-md">Verifying Administrator Access...</span>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    // Redirect to the dedicated Admin Login portal
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
