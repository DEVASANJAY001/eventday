import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://ltxozryvnqmxudltmstb.supabase.co';
const supabaseKey = 'sb_publishable_5gLCoW18nUefmude2OyO_g_PuqWMdJU';

const supabase = createClient(supabaseUrl, supabaseKey);

const productsDir = path.resolve('public', 'products');

async function uploadAllImages() {
  console.log('📦 Connecting to Supabase Storage...');

  // 1. Create or ensure bucket exists
  try {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    console.log('Current buckets:', buckets?.map(b => b.name));

    const bucketExists = buckets?.some(b => b.name === 'products');
    if (!bucketExists) {
      console.log('Creating "products" bucket...');
      const { data: newBucket, error: createError } = await supabase.storage.createBucket('products', {
        public: true,
      });
      if (createError) {
        console.warn('Bucket creation note:', createError.message);
      } else {
        console.log('Created bucket:', newBucket);
      }
    }
  } catch (err) {
    console.warn('Bucket list/create error:', err.message);
  }

  // 2. Upload files
  const files = fs.readdirSync(productsDir);
  const uploadedUrls = {};

  for (const file of files) {
    if (!file.endsWith('.jpg') && !file.endsWith('.png')) continue;
    const filePath = path.join(productsDir, file);
    const fileBuffer = fs.readFileSync(filePath);

    console.log(`Uploading ${file}...`);
    const { data, error } = await supabase.storage
      .from('products')
      .upload(file, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) {
      console.warn(`Upload error for ${file}:`, error.message);
    } else {
      const { data: publicUrlData } = supabase.storage.from('products').getPublicUrl(file);
      uploadedUrls[file] = publicUrlData.publicUrl;
      console.log(`✅ Uploaded ${file} -> ${publicUrlData.publicUrl}`);
    }
  }

  console.log('Finished uploading. Uploaded URLs mapping:', uploadedUrls);
}

uploadAllImages().catch(console.error);
