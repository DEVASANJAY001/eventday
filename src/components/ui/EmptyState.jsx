import React from 'react';

export default function EmptyState({
  message = "No data available.",
  ctaText,
  onCtaClick,
  className = '',
}) {
  return (
    <div className={`p-8 border border-gray-200 rounded bg-gray-50 text-center ${className}`}>
      <p className="text-sm text-gray-500 mb-4">{message}</p>
      {ctaText && onCtaClick && (
        <button
          onClick={onCtaClick}
          className="text-xs text-blue-600 hover:underline font-medium"
        >
          {ctaText}
        </button>
      )}
    </div>
  );
}
