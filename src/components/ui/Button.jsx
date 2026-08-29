import React from 'react';

export default function Button({
  children,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
