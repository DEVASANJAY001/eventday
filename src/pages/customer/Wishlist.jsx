import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { productService } from '../../services/productService';
import ProductGrid from '../../components/customer/ProductGrid';
import EmptyState from '../../components/ui/EmptyState';
import { SkeletonCard } from '../../components/ui/LoadingSpinner';

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlistIds } = useCart();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getProducts()
      .then(data => { setAllProducts(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const wishlistProducts = allProducts.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg gap-gutter">
      <div className="flex items-center gap-2 text-label-sm text-on-surface-variant uppercase tracking-wider mb-stack-sm">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary font-bold">My Wishlist</span>
      </div>

      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Saved Favorites {!loading && `(${wishlistProducts.length})`}
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Items you have bookmarked to buy later.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : wishlistProducts.length === 0 ? (
        <EmptyState
          title="Your Wishlist is Empty"
          message="Save items you like by clicking the heart icon on any product card."
          ctaText="Discover Products"
          onCtaClick={() => navigate('/products')}
          icon="favorite"
        />
      ) : (
        <ProductGrid products={wishlistProducts} columns={4} />
      )}
    </div>
  );
}
