import React from 'react';

export default function Select({
  label,
  options = [],
  className = '',
  id,
  placeholder,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-gray-600">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-600 ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
