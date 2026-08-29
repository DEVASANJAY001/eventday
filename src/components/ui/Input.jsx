import React from 'react';

export default function Input({
  label,
  className = '',
  id,
  error,
  icon,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`w-full bg-surface-container-lowest border border-outline-variant/60 rounded-lg px-4 py-2.5 text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all ${
            icon ? 'pl-10' : ''
          } ${error ? 'border-error ring-1 ring-error/20' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-label-sm text-error">{error}</span>}
    </div>
  );
}
