import { supabase } from '../lib/supabase';

export const orderService = {
  /**
   * Create an order in Supabase with line items
   */
  async createOrder({
    userId = null,
    userEmail = '',
    items = [],
    shippingAddress = {},
    paymentMethod = 'Credit Card',
    subtotal = 0,
    discountAmount = 0,
    shipping = 0,
    tax = 0,
    totalAmount = 0,
  }) {
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toISOString().split('T')[0];

    const orderRow = {
      id: orderId,
      user_id: userId,
      user_email: userEmail || shippingAddress?.email || '',
      amount: totalAmount,
      subtotal: subtotal,
      discount_amount: discountAmount,
      shipping: shipping,
      tax: tax,
      status: 'Processing',
      payment_method: paymentMethod,
      payment_status: paymentMethod === 'cod' ? 'Pending' : 'Paid',
      shipping_address: shippingAddress,
      date: today,
    };

    try {
      // 1. Insert Order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([orderRow])
        .select()
        .single();

      if (orderError) {
        console.warn('[orderService] Supabase order insert fallback to local:', orderError.message);
      }

      // 2. Insert Order Items
      if (items.length > 0) {
        const itemRows = items.map(item => ({
          order_id: orderId,
          product_id: item.product?.id || item.id,
          product_name: item.product?.name || item.name,
          product_image: item.product?.image || item.image,
          product_price: item.product?.price || item.price,
          quantity: item.quantity || 1,
          selected_color: item.selectedColor || null,
          selected_size: item.selectedSize || null,
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(itemRows);

        if (itemsError) {
          console.warn('[orderService] Supabase items insert note:', itemsError.message);
        }
      }

      return {
        id: orderId,
        date: today,
        amount: totalAmount,
        subtotal,
        discountAmount,
        shipping,
        tax,
        status: 'Processing',
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
        items,
        shippingAddress,
      };
    } catch (err) {
      console.warn('[orderService] Storing local order representation:', err.message);
      return {
        id: orderId,
        date: today,
        amount: totalAmount,
        subtotal,
        discountAmount,
        shipping,
        tax,
        status: 'Processing',
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
        items,
        shippingAddress,
      };
    }
  },

  /**
   * Fetch orders for a specific user
   */
  async getUserOrders(userId, userEmail = '') {
    try {
      let query = supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.or(`user_id.eq.${userId},user_email.eq.${userEmail}`);
      } else if (userEmail) {
        query = query.eq('user_email', userEmail);
      }

      const { data, error } = await query;

      if (error || !data) {
        return [];
      }

      return data.map(o => ({
        id: o.id,
        date: o.date,
        amount: Number(o.amount),
        subtotal: Number(o.subtotal || o.amount),
        discountAmount: Number(o.discount_amount || 0),
        shipping: Number(o.shipping || 0),
        tax: Number(o.tax || 0),
        status: o.status,
        paymentMethod: o.payment_method,
        paymentStatus: o.payment_status,
        shippingAddress: o.shipping_address,
        items: (o.order_items || []).map(it => ({
          id: it.id,
          product: {
            id: it.product_id,
            name: it.product_name,
            image: it.product_image,
            price: Number(it.product_price),
          },
          quantity: it.quantity,
          selectedColor: it.selected_color,
          selectedSize: it.selected_size,
        }))
      }));
    } catch (err) {
      return [];
    }
  },

  /**
   * Fetch all orders (Admin view)
   */
  async getAllOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false });

      if (error || !data) {
        return [];
      }

      return data.map(o => ({
        id: o.id,
        date: o.date,
        amount: Number(o.amount),
        subtotal: Number(o.subtotal || o.amount),
        status: o.status,
        paymentMethod: o.payment_method,
        paymentStatus: o.payment_status,
        shippingAddress: o.shipping_address,
        items: (o.order_items || []).map(it => ({
          id: it.id,
          product: {
            id: it.product_id,
            name: it.product_name,
            image: it.product_image,
            price: Number(it.product_price),
          },
          quantity: it.quantity,
          selectedColor: it.selected_color,
          selectedSize: it.selected_size,
        }))
      }));
    } catch (err) {
      return [];
    }
  },

  /**
   * Update order status
   */
  async updateOrderStatus(orderId, status, paymentStatus) {
    const updates = {};
    if (status) updates.status = status;
    if (paymentStatus) updates.payment_status = paymentStatus;

    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      console.error('[orderService] updateOrderStatus error:', error.message);
      throw error;
    }

    return data;
  },

  /**
   * Subscribe to live order events
   */
  subscribeToOrders(onChange) {
    const channelId = `orders-listener-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          if (onChange) onChange(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
};
