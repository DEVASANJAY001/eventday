import React from 'react';

export default function Select({
  label,
  options = [],
  className = '',
  id,
  placeholder,
  error,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={`w-full appearance-none bg-surface-container-lowest border border-outline-variant/60 rounded-lg px-4 py-2.5 pr-10 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all ${
            error ? 'border-error' : ''
          } ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">
          expand_more
        </span>
      </div>
      {error && <span className="text-label-sm text-error">{error}</span>}
    </div>
  );
}
