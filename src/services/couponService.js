import { supabase } from '../lib/supabase';
import { INITIAL_COUPONS } from './dbSeeder';

export const couponService = {
  /**
   * Validate a coupon code from Supabase
   */
  async validateCoupon(code) {
    if (!code) return { valid: false, message: 'Please enter a coupon code' };
    const normalized = code.trim().toUpperCase();

    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', normalized)
        .eq('is_active', true)
        .single();

      if (!error && data) {
        return {
          valid: true,
          code: data.code,
          discountPercent: Number(data.discount_percent || 0),
          discountType: data.discount_type,
          discount: data.discount,
        };
      }
    } catch (err) {
      console.warn('[couponService] Query note:', err.message);
    }

    // Local fallback check
    const local = INITIAL_COUPONS.find(c => c.code === normalized && c.is_active);
    if (local) {
      return {
        valid: true,
        code: local.code,
        discountPercent: local.discount_percent,
        discountType: local.discount_type,
        discount: local.discount,
      };
    }

    return { valid: false, message: 'Invalid or expired coupon code' };
  }
};
