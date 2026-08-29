import React from 'react';

export default function Badge({
  children,
  variant = 'neutral', // 'sale' | 'bestseller' | 'popular' | 'success' | 'neutral' | 'outline'
  className = '',
}) {
  const baseStyles = 'inline-flex items-center rounded px-2.5 py-0.5 text-label-sm font-label-md uppercase tracking-wider transition-colors';

  const variants = {
    sale: 'bg-error text-on-error',
    bestseller: 'bg-secondary-container text-on-secondary',
    popular: 'bg-primary text-on-primary',
    success: 'bg-primary-fixed text-primary font-bold',
    neutral: 'bg-surface-container-high text-on-surface-variant',
    outline: 'border border-outline-variant text-on-surface-variant bg-surface',
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.neutral} ${className}`}>
      {children}
    </span>
  );
}
