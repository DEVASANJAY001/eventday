import { supabase } from '../lib/supabase';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../data/mockProducts';

// Helper to normalize Supabase product fields to component-friendly naming
function normalizeProduct(p) {
  if (!p) return null;
  return {
    id: p.id,
    name: p.name,
    subtitle: p.subtitle,
    description: p.description,
    price: Number(p.price),
    originalPrice: p.original_price ? Number(p.original_price) : null,
    discountPercentage: Number(p.discount_percentage || 0),
    category: p.category,
    brand: p.brand,
    rating: Number(p.rating || 5.0),
    reviewsCount: Number(p.reviews_count || 0),
    inStock: Boolean(p.in_stock),
    stock: Number(p.stock || 50),
    badge: p.badge,
    hasMotionView: Boolean(p.has_motion_view),
    isDeal: Boolean(p.is_deal),
    featured: Boolean(p.featured),
    image: p.image,
    thumbnails: Array.isArray(p.thumbnails) ? p.thumbnails : [p.image],
    colors: Array.isArray(p.colors) ? p.colors : [],
    sizes: Array.isArray(p.sizes) ? p.sizes : [],
  };
}

export const productService = {
  /**
   * Fetch all products from Supabase with fallback to local mock data
   */
  async getProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        if (error) console.warn('[productService] Supabase read fallback:', error.message);
        return MOCK_PRODUCTS;
      }

      return data.map(normalizeProduct);
    } catch (err) {
      console.warn('[productService] Using local fallback:', err.message);
      return MOCK_PRODUCTS;
    }
  },

  /**
   * Fetch single product by ID
   */
  async getProductById(id) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        return MOCK_PRODUCTS.find(p => p.id === id) || null;
      }

      return normalizeProduct(data);
    } catch (err) {
      return MOCK_PRODUCTS.find(p => p.id === id) || null;
    }
  },

  /**
   * Fetch all categories
   */
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error || !data || data.length === 0) {
        return MOCK_CATEGORIES;
      }

      return data;
    } catch (err) {
      return MOCK_CATEGORIES;
    }
  },

  /**
   * Create new product in Supabase
   */
  async createProduct(productData) {
    const newId = productData.id || `prod-${Date.now()}`;
    const row = {
      id: newId,
      name: productData.name,
      subtitle: productData.subtitle || '',
      description: productData.description || '',
      price: productData.price,
      original_price: productData.originalPrice || null,
      discount_percentage: productData.discountPercentage || 0,
      category: productData.category || 'gadgets',
      brand: productData.brand || 'SonicWear',
      rating: productData.rating || 5.0,
      reviews_count: productData.reviewsCount || 0,
      in_stock: productData.inStock !== false,
      stock: productData.stock || 50,
      badge: productData.badge || null,
      has_motion_view: Boolean(productData.hasMotionView),
      is_deal: Boolean(productData.isDeal),
      featured: Boolean(productData.featured),
      image: productData.image || '/products/smartwatch_pro.jpg',
      thumbnails: productData.thumbnails || [productData.image || '/products/smartwatch_pro.jpg'],
      colors: productData.colors || [],
      sizes: productData.sizes || [],
    };

    const { data, error } = await supabase
      .from('products')
      .insert([row])
      .select()
      .single();

    if (error) {
      console.error('[productService] createProduct error:', error.message);
      throw error;
    }

    return normalizeProduct(data);
  },

  /**
   * Update existing product
   */
  async updateProduct(id, updates) {
    const row = {
      name: updates.name,
      subtitle: updates.subtitle,
      description: updates.description,
      price: updates.price,
      original_price: updates.originalPrice,
      discount_percentage: updates.discountPercentage,
      category: updates.category,
      brand: updates.brand,
      stock: updates.stock,
      badge: updates.badge,
    };

    const { data, error } = await supabase
      .from('products')
      .update(row)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[productService] updateProduct error:', error.message);
      throw error;
    }

    return normalizeProduct(data);
  },

  /**
   * Delete product
   */
  async deleteProduct(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[productService] deleteProduct error:', error.message);
      throw error;
    }

    return true;
  },

  /**
   * Subscribe to realtime product changes
   */
  subscribeToProducts(onChange) {
    const channelId = `products-listener-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
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
