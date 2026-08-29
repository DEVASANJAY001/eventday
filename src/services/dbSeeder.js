import { supabase } from '../lib/supabase';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../data/mockProducts';

export const INITIAL_COUPONS = [
  { code: 'SAVE10', discount: '10% OFF', discount_percent: 10, discount_type: 'percentage', usage_count: 142, expires_at: '2026-12-31', is_active: true },
  { code: 'WELCOME20', discount: '20% OFF', discount_percent: 20, discount_type: 'percentage', usage_count: 389, expires_at: '2026-12-31', is_active: true },
  { code: 'FLASH50', discount: '$50.00 FLAT', discount_percent: 50, discount_type: 'fixed', usage_count: 45, expires_at: '2026-12-31', is_active: true },
];

/**
 * Automatically seeds the Supabase database with categories, products, and coupons.
 * Uses upsert to be safely idempotent.
 */
export async function seedDatabase(force = false) {
  try {
    console.log('[DB Seeder] Checking Supabase tables...');

    // 1. Seed Categories
    const { data: existingCategories, error: catCheckError } = await supabase
      .from('categories')
      .select('id')
      .limit(1);

    if (!catCheckError && (force || !existingCategories || existingCategories.length === 0)) {
      console.log('[DB Seeder] Seeding categories...');
      const formattedCategories = MOCK_CATEGORIES.map(c => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        icon: c.icon,
        description: c.description,
        count: c.count,
      }));

      await supabase.from('categories').upsert(formattedCategories, { onConflict: 'id' });
    }

    // 2. Seed Products
    const { data: existingProducts, error: prodCheckError } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (!prodCheckError && (force || !existingProducts || existingProducts.length === 0)) {
      console.log('[DB Seeder] Seeding 12 high-resolution products...');
      const formattedProducts = MOCK_PRODUCTS.map(p => ({
        id: p.id,
        name: p.name,
        subtitle: p.subtitle || '',
        description: p.description || '',
        price: p.price,
        original_price: p.originalPrice || null,
        discount_percentage: p.discountPercentage || 0,
        category: p.category,
        brand: p.brand || '',
        rating: p.rating || 5.0,
        reviews_count: p.reviewsCount || 0,
        in_stock: p.inStock !== false,
        stock: p.stock || 50,
        badge: p.badge || null,
        has_motion_view: Boolean(p.hasMotionView),
        is_deal: Boolean(p.isDeal),
        featured: Boolean(p.featured),
        image: p.image,
        thumbnails: p.thumbnails || [p.image],
        colors: p.colors || [],
        sizes: p.sizes || [],
      }));

      await supabase.from('products').upsert(formattedProducts, { onConflict: 'id' });
    }

    // 3. Seed Coupons
    const { data: existingCoupons, error: couponCheckError } = await supabase
      .from('coupons')
      .select('code')
      .limit(1);

    if (!couponCheckError && (force || !existingCoupons || existingCoupons.length === 0)) {
      console.log('[DB Seeder] Seeding promotional coupons...');
      await supabase.from('coupons').upsert(INITIAL_COUPONS, { onConflict: 'code' });
    }

    console.log('[DB Seeder] Supabase synchronization complete.');
    return { success: true, message: 'Database seeded successfully' };
  } catch (err) {
    console.warn('[DB Seeder] Note: Supabase tables might need creation via schema.sql in Supabase SQL editor.', err.message);
    return { success: false, error: err.message };
  }
}
