import React from 'react';

export default function Input({
  label,
  className = '',
  id,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-gray-600">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600 ${className}`}
        {...props}
      />
    </div>
  );
}
