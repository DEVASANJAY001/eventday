import React from 'react';
import EmptyState from '../../components/ui/EmptyState';

export default function Wishlist() {
  // Integration Point: Replace this empty array with wishlist items in Round 3
  const wishlistItems = [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <EmptyState
          message="Your wishlist is empty."
          ctaText="Browse products catalog"
          onCtaClick={() => window.location.replace('/products')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Wishlist Items grid */}
        </div>
      )}
    </div>
  );
}
