import { supabase } from '../lib/supabase';

export const profileService = {
  /**
   * Fetch a single profile by user ID
   */
  async getProfile(userId) {
    if (!userId) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error || !data) return null;
      return data;
    } catch {
      return null;
    }
  },

  /**
   * Upsert profile row (create or update)
   */
  async upsertProfile(profileData) {
    if (!profileData?.id) throw new Error('Profile ID is required');
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ ...profileData, updated_at: new Date().toISOString() }, { onConflict: 'id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Update specific profile fields (partial update)
   */
  async updateProfile(userId, updates) {
    if (!userId) throw new Error('User ID is required');
    const allowed = {};
    if (updates.full_name !== undefined) allowed.full_name = updates.full_name;
    if (updates.phone !== undefined)     allowed.phone = updates.phone;
    if (updates.avatar_url !== undefined) allowed.avatar_url = updates.avatar_url;
    allowed.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('profiles')
      .update(allowed)
      .eq('id', userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Upload avatar to Supabase Storage and update profile
   */
  async uploadAvatar(userId, file) {
    if (!userId || !file) throw new Error('userId and file are required');
    const ext = file.name?.split('.').pop() || 'jpg';
    const path = `avatars/${userId}-${Date.now()}.${ext}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(path, file, { contentType: file.type || 'image/jpeg', upsert: true });

      if (!uploadError) {
        const { data: urlData } = supabase.storage.from('products').getPublicUrl(path);
        if (urlData?.publicUrl) {
          await profileService.updateProfile(userId, { avatar_url: urlData.publicUrl });
          return urlData.publicUrl;
        }
      }
    } catch (err) {
      console.warn('[profileService] Avatar upload note:', err.message);
    }

    // Fallback — base64 encode
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          await profileService.updateProfile(userId, { avatar_url: reader.result });
          resolve(reader.result);
        } catch (e) {
          reject(e);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  /**
   * Get all customer profiles (admin)
   */
  async getAllProfiles() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error || !data) return [];
      return data;
    } catch {
      return [];
    }
  },
};
