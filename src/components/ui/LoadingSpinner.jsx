import React from 'react';

/**
 * Reusable loading skeleton for product/item grids
 */
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-surface-container-lowest border border-outline-variant/20 rounded-3xl overflow-hidden animate-pulse ${className}`}>
      <div className="aspect-square bg-surface-container-low w-full" />
      <div className="p-4 space-y-2.5">
        <div className="h-3 bg-surface-container-low rounded-full w-3/4" />
        <div className="h-3 bg-surface-container-low rounded-full w-1/2" />
        <div className="h-5 bg-surface-container-low rounded-full w-1/3 mt-1" />
      </div>
    </div>
  );
}

/**
 * Reusable skeleton for table rows
 */
export function SkeletonRow({ cols = 6 }) {
  return (
    <tr className="animate-pulse border-b border-outline-variant/10">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="p-4">
          <div className="h-3 bg-surface-container-low rounded-full w-full" />
        </td>
      ))}
    </tr>
  );
}

/**
 * Full-page centered spinner with label
 */
export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 w-full">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
      <span className="text-sm text-on-surface-variant font-medium">{label}</span>
    </div>
  );
}
