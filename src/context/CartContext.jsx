import React, { createContext, useContext, useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import { couponService } from '../services/couponService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();

  // Cart state stored in localStorage (default to empty array)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('piomart_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Wishlist IDs stored in localStorage (default to empty array)
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('piomart_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Orders state (default to empty array, populated live from Supabase)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('piomart_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const [coupon, setCoupon] = useState({ code: '', discountPercent: 0, applied: false });

  // Sync with Supabase orders when user changes or orders change
  useEffect(() => {
    if (user?.id || user?.email) {
      orderService.getUserOrders(user.id, user.email).then(remoteOrders => {
        if (remoteOrders && remoteOrders.length > 0) {
          setOrders(remoteOrders);
        }
      }).catch(() => {});
    } else {
      // If unauthenticated, keep local saved orders
      try {
        const saved = localStorage.getItem('piomart_orders');
        if (saved) setOrders(JSON.parse(saved));
      } catch (e) {}
    }
  }, [user]);

  // Realtime subscription for orders
  useEffect(() => {
    const unsubscribe = orderService.subscribeToOrders(() => {
      if (user?.id || user?.email) {
        orderService.getUserOrders(user.id, user.email).then(remoteOrders => {
          if (remoteOrders && remoteOrders.length > 0) {
            setOrders(remoteOrders);
          }
        }).catch(() => {});
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('piomart_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('piomart_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {}
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('piomart_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  const addToCart = (product, quantity = 1, selectedColor = '', selectedSize = '') => {
    if (!product) return;
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product?.id === product.id &&
                item.selectedColor === selectedColor &&
                item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          product,
          quantity,
          selectedColor: selectedColor || (product.colors?.[0]?.name || ''),
          selectedSize: selectedSize || (product.sizes?.[0] || 'Standard'),
        },
      ];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (productId) => {
    setWishlistIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId) => wishlistIds.includes(productId);

  const applyCoupon = async (code) => {
    const result = await couponService.validateCoupon(code);
    if (result.valid) {
      setCoupon({
        code: result.code,
        discountPercent: result.discountPercent,
        applied: true,
      });
      return { success: true, message: `Coupon ${result.code} applied (${result.discount})!` };
    }
    return { success: false, message: result.message || 'Invalid coupon code.' };
  };

  const removeCoupon = () => {
    setCoupon({ code: '', discountPercent: 0, applied: false });
  };

  // Price calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );

  const discountAmount = coupon.applied
    ? (subtotal * coupon.discountPercent) / 100
    : 0;

  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping + tax);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const createOrder = async (shippingAddress, paymentMethod = 'Credit Card') => {
    const newOrder = await orderService.createOrder({
      userId: user?.id || null,
      userEmail: user?.email || shippingAddress?.email || '',
      items: [...cartItems],
      shippingAddress,
      paymentMethod,
      subtotal,
      discountAmount,
      shipping,
      tax,
      totalAmount: finalTotal,
    });

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    removeCoupon();
    return newOrder;
  };

  const value = {
    cartItems,
    totalCartCount,
    wishlistIds,
    orders,
    subtotal,
    discountAmount,
    shipping,
    tax,
    finalTotal,
    coupon,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isInWishlist,
    applyCoupon,
    removeCoupon,
    createOrder,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
