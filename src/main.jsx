import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import './index.css'

// Canonical Production Domain Enforcement:
// If landed on preview aliases (e.g. eventday-devasanjay002s-projects.vercel.app),
// instantly forward to https://eventdaydev.vercel.app/ preserving hash and search parameters.
if (typeof window !== 'undefined') {
  const hostname = window.location.hostname;
  if (
    hostname.includes('vercel.app') &&
    hostname !== 'eventdaydev.vercel.app' &&
    !hostname.startsWith('localhost')
  ) {
    const target = `https://eventdaydev.vercel.app${window.location.pathname}${window.location.search}${window.location.hash}`;
    window.location.replace(target);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)
