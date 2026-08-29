import { supabase } from '../lib/supabase';

// Local fallback coupons (used if Supabase is unavailable)
const FALLBACK_COUPONS = [
  { code: 'SAVE10', discount: '10% OFF', discount_percent: 10, discount_type: 'percentage', is_active: true },
  { code: 'WELCOME20', discount: '20% OFF', discount_percent: 20, discount_type: 'percentage', is_active: true },
  { code: 'FLASH50', discount: '50% OFF', discount_percent: 50, discount_type: 'percentage', is_active: true },
];

export const couponService = {
  /**
   * Validate a coupon code against Supabase, with local fallback
   */
  async validateCoupon(code) {
    if (!code || !code.trim()) return { valid: false, message: 'Please enter a coupon code' };
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
      console.warn('[couponService] Supabase query note:', err.message);
    }

    // Local fallback
    const local = FALLBACK_COUPONS.find(c => c.code === normalized && c.is_active);
    if (local) {
      return {
        valid: true,
        code: local.code,
        discountPercent: local.discount_percent,
        discountType: local.discount_type,
        discount: local.discount,
      };
    }

    return { valid: false, message: 'Invalid or expired coupon code.' };
  },

  /**
   * Fetch all coupons (admin)
   */
  async getAllCoupons() {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('code');
      if (error || !data) return FALLBACK_COUPONS;
      return data;
    } catch {
      return FALLBACK_COUPONS;
    }
  },

  /**
   * Create a new coupon (admin)
   */
  async createCoupon(couponData) {
    const { data, error } = await supabase
      .from('coupons')
      .insert([couponData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Toggle coupon active state (admin)
   */
  async toggleCoupon(code, isActive) {
    const { data, error } = await supabase
      .from('coupons')
      .update({ is_active: isActive })
      .eq('code', code)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
