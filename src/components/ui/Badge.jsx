import React from 'react';

export default function Badge({
  children,
  variant = 'neutral', // 'brand' | 'neutral' | 'success' | 'warning' | 'danger'
  className = '',
}) {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors';
  
  const variants = {
    brand: 'bg-brand/10 text-brand-dark border border-brand/20',
    neutral: 'bg-neutral-dark/5 text-neutral-dark/80 border border-neutral-dark/10',
    success: 'bg-green-50 text-green-700 border border-green-200/50',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200/50',
    danger: 'bg-red-50 text-red-700 border border-red-200/50'
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
