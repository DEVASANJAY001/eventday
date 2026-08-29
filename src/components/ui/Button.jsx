import React from 'react';

export default function Button({
  children,
  className = '',
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  type = 'button',
  icon = null,
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-label-md rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-label-sm gap-1.5 rounded-md',
    md: 'px-5 py-2.5 text-label-md gap-2 rounded-lg',
    lg: 'px-8 py-3.5 text-body-md font-semibold gap-2.5 rounded-xl shadow-md hover:shadow-lg',
  };

  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-primary-container shadow-sm hover:shadow-md',
    secondary: 'bg-secondary-container text-on-secondary hover:bg-secondary shadow-sm hover:shadow-md',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-on-primary bg-transparent',
    ghost: 'text-on-surface-variant hover:text-primary hover:bg-surface-container bg-transparent',
    danger: 'bg-error text-on-error hover:bg-error/90 shadow-sm',
    accent: 'bg-secondary text-on-secondary hover:bg-secondary-container transition-colors',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
      {children}
    </button>
  );
}
