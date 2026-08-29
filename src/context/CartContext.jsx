import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../data/mockProducts';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Pre-seed cart with 2 initial items if empty for immediate Stitch parity
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('piomart_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial items matching Stitch Shopping Cart screen
    return [
      {
        id: 'cart-1',
        product: MOCK_PRODUCTS[0], // Wilson Ultra Pro Smartwatch
        quantity: 1,
        selectedColor: 'Midnight Black',
        selectedSize: 'Medium',
      },
      {
        id: 'cart-2',
        product: MOCK_PRODUCTS[1], // Silence V2 Wireless ANC
        quantity: 1,
        selectedColor: 'Arctic White',
        selectedSize: 'Universal',
      },
    ];
  });

  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('piomart_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['prod-1', 'prod-3'];
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('piomart_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'ORD-89241',
        date: '2026-08-28',
        amount: 349.00,
        status: 'Delivered',
        paymentStatus: 'Paid',
        items: [
          { product: MOCK_PRODUCTS[1], quantity: 1, selectedColor: 'Arctic White' }
        ],
        shippingAddress: {
          name: 'Deva Sanjay',
          address: '42 Tech Boulevard, Suite 100',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560001',
          phone: '+91 98765 43210'
        }
      }
    ];
  });

  const [coupon, setCoupon] = useState({ code: '', discountPercent: 0, applied: false });

  useEffect(() => {
    try {
      localStorage.setItem('piomart_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('piomart_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('piomart_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const addToCart = (product, quantity = 1, selectedColor = '', selectedSize = '') => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedColor === (selectedColor || product.colors?.[0]?.name || '') &&
        item.selectedSize === (selectedSize || product.sizes?.[0] || '')
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: copy[existingIndex].quantity + quantity
        };
        return copy;
      }

      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          product,
          quantity,
          selectedColor: selectedColor || product.colors?.[0]?.name || '',
          selectedSize: selectedSize || product.sizes?.[0] || '',
        }
      ];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity: newQty } : item));
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon({ code: '', discountPercent: 0, applied: false });
  };

  const toggleWishlist = (productId) => {
    setWishlistIds(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId) => wishlistIds.includes(productId);

  const applyCoupon = (code) => {
    const clean = (code || '').trim().toUpperCase();
    if (clean === 'SAVE10') {
      setCoupon({ code: 'SAVE10', discountPercent: 10, applied: true });
      return { success: true, message: '10% discount applied!' };
    } else if (clean === 'WELCOME20') {
      setCoupon({ code: 'WELCOME20', discountPercent: 20, applied: true });
      return { success: true, message: '20% special discount applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try SAVE10 or WELCOME20' };
  };

  const createOrder = (shippingInfo, paymentMethod) => {
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      amount: finalTotal,
      status: 'Processing',
      paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
      paymentMethod,
      items: [...cartItems],
      shippingAddress: shippingInfo,
      couponApplied: coupon.applied ? coupon.code : null,
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + ((item.product.price || 0) * item.quantity), 0);
  const discountAmount = coupon.applied ? (subtotal * coupon.discountPercent / 100) : 0;
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const tax = (subtotal - discountAmount) > 0 ? ((subtotal - discountAmount) * 0.08) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping + tax);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
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
      createOrder,
    }}>
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
