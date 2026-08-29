import React from 'react';
import Button from './Button';

export default function EmptyState({
  title = "No items found",
  message = "Explore our latest collections to find what you need.",
  ctaText,
  onCtaClick,
  icon = "shopping_bag",
  className = '',
}) {
  return (
    <div className={`py-16 px-8 border border-outline-variant/30 rounded-2xl bg-surface-container-low/50 text-center flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">
        <span className="material-symbols-outlined text-[32px]">{icon}</span>
      </div>
      <div className="space-y-1 max-w-sm">
        <h3 className="font-headline-md text-headline-md text-on-surface">{title}</h3>
        <p className="text-body-sm text-on-surface-variant leading-relaxed">{message}</p>
      </div>
      {ctaText && onCtaClick && (
        <div className="pt-2">
          <Button onClick={onCtaClick} variant="primary">
            {ctaText}
          </Button>
        </div>
      )}
    </div>
  );
}
