import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ltxozryvnqmxudltmstb.supabase.co';
const supabaseKey = 'sb_publishable_5gLCoW18nUefmude2OyO_g_PuqWMdJU';

const supabase = createClient(supabaseUrl, supabaseKey);

const categories = [
  { id: 'gadgets', name: 'Gadgets', slug: 'gadgets', icon: 'devices', count: 145, description: 'Smart wearables, audio, and modern electronics' },
  { id: 'women', name: 'Women', slug: 'women', icon: 'apparel', count: 280, description: 'Contemporary women\'s fashion & accessories' },
  { id: 'men', name: 'Men', slug: 'men', icon: 'man', count: 190, description: 'Tailored men\'s apparel & activewear' },
  { id: 'home', name: 'Home', slug: 'home', icon: 'chair', count: 85, description: 'Minimalist designer furniture & decor' },
  { id: 'special-offers', name: 'Special Offers', slug: 'special-offers', icon: 'local_offer', count: 64, description: 'Weekly deals & exclusive promotions' },
];

const products = [
  {
    id: 'prod-1',
    name: 'Wilson Ultra Pro Smartwatch',
    subtitle: 'SonicWear Pro Series',
    price: 1899.00,
    original_price: 2299.00,
    discount_percentage: 17,
    category: 'gadgets',
    brand: 'SonicWear',
    rating: 4.8,
    reviews_count: 124,
    in_stock: true,
    stock: 42,
    badge: 'Sale',
    has_motion_view: true,
    is_deal: true,
    featured: true,
    description: 'Experience the pinnacle of wearable technology. The Wilson Ultra Pro features a stunning round OLED display, advanced biometric tracking, and up to 14 days of battery life, wrapped in an aerospace-grade titanium case.',
    image: '/products/smartwatch_pro.jpg',
    thumbnails: ['/products/smartwatch_pro.jpg'],
    colors: [
      { name: 'Midnight Black', hex: '#1A1A1A' },
      { name: 'Lunar Silver', hex: '#E8E8E8' },
      { name: 'Forest Green', hex: '#004733' },
    ],
    sizes: ['Small', 'Medium', 'Large'],
  },
  {
    id: 'prod-2',
    name: 'Silence V2 Wireless ANC Headphones',
    subtitle: 'AuraTech Audio',
    price: 349.00,
    original_price: 399.00,
    discount_percentage: 12,
    category: 'gadgets',
    brand: 'AuraTech',
    rating: 4.9,
    reviews_count: 84,
    in_stock: true,
    stock: 25,
    badge: 'Popular',
    has_motion_view: true,
    is_deal: true,
    featured: true,
    description: 'Industry-leading Active Noise Cancellation with customized acoustic drivers delivering studio-grade sound fidelity and 40 hours of continuous playback.',
    image: '/products/headphones_anc.jpg',
    thumbnails: ['/products/headphones_anc.jpg'],
    colors: [
      { name: 'Arctic White', hex: '#FFFFFF' },
      { name: 'Matte Black', hex: '#1C1C1E' },
      { name: 'Champagne Gold', hex: '#E5D3B3' },
    ],
    sizes: ['Universal'],
  },
  {
    id: 'prod-3',
    name: 'Alpha M50 Mirrorless Digital Camera',
    subtitle: 'ViewMax Optics',
    price: 899.00,
    original_price: 1049.00,
    discount_percentage: 14,
    category: 'gadgets',
    brand: 'ViewMax',
    rating: 4.8,
    reviews_count: 32,
    in_stock: true,
    stock: 18,
    badge: 'Best Seller',
    has_motion_view: true,
    is_deal: false,
    featured: true,
    description: 'Ultra-compact 4K mirrorless camera with high-speed dual pixel autofocus, interchangeable lens mount, and cinematic color profiling.',
    image: '/products/camera_mirrorless.jpg',
    thumbnails: ['/products/camera_mirrorless.jpg'],
    colors: [
      { name: 'Retro Silver', hex: '#D1D5DB' },
      { name: 'Obsidian Black', hex: '#111827' },
    ],
    sizes: ['Body Only', '35mm Kit'],
  },
  {
    id: 'prod-4',
    name: 'Buds Air Pro True Wireless Earbuds',
    subtitle: 'SonicWear Pro Series',
    price: 129.00,
    original_price: 159.00,
    discount_percentage: 18,
    category: 'gadgets',
    brand: 'SonicWear',
    rating: 4.7,
    reviews_count: 215,
    in_stock: true,
    stock: 75,
    badge: 'Sale',
    has_motion_view: false,
    is_deal: true,
    featured: true,
    description: 'Ergonomic in-ear wireless earphones with smart touch gestures, crystal clear call clarity with quad microphones, and wireless Qi charging case.',
    image: '/products/earbuds_pro.jpg',
    thumbnails: ['/products/earbuds_pro.jpg'],
    colors: [
      { name: 'Pebble White', hex: '#F9FAFB' },
      { name: 'Graphite', hex: '#374151' },
    ],
    sizes: ['Standard'],
  },
  {
    id: 'prod-5',
    name: 'Horizon Pro Smartwatch with Health Tracking',
    subtitle: 'SonicWear Pro Series',
    price: 199.00,
    original_price: 249.00,
    discount_percentage: 20,
    category: 'gadgets',
    brand: 'SonicWear',
    rating: 4.8,
    reviews_count: 128,
    in_stock: true,
    stock: 30,
    badge: 'Sale',
    has_motion_view: true,
    is_deal: true,
    featured: true,
    description: '24/7 heart rate, blood oxygen and sleep tracking with built-in GPS and water resistance up to 50 meters.',
    image: '/products/smartwatch_pro.jpg',
    thumbnails: ['/products/smartwatch_pro.jpg'],
    colors: [
      { name: 'Midnight Black', hex: '#111827' },
      { name: 'Ocean Blue', hex: '#1E40AF' },
    ],
    sizes: ['40mm', '44mm'],
  },
  {
    id: 'prod-6',
    name: 'MagSafe Duo Wireless Fast Charger',
    subtitle: 'AuraTech Power',
    price: 129.00,
    original_price: 149.00,
    discount_percentage: 13,
    category: 'gadgets',
    brand: 'AuraTech',
    rating: 4.8,
    reviews_count: 95,
    in_stock: true,
    stock: 50,
    badge: 'Popular',
    has_motion_view: false,
    is_deal: false,
    featured: false,
    description: 'Conveniently charge your compatible smartphone, smartwatch, and wireless charging case simultaneously with fast magnetic alignment.',
    image: '/products/charger_magsafe.jpg',
    thumbnails: ['/products/charger_magsafe.jpg'],
    colors: [
      { name: 'Matte Black', hex: '#18181B' },
      { name: 'Silver White', hex: '#E4E4E7' },
    ],
    sizes: ['15W Fast Charge'],
  },
  {
    id: 'prod-7',
    name: 'Ultra-Slim 20,000mAh Power Bank',
    subtitle: 'SonicWear Power',
    price: 79.99,
    original_price: 99.99,
    discount_percentage: 20,
    category: 'gadgets',
    brand: 'SonicWear',
    rating: 4.9,
    reviews_count: 160,
    in_stock: true,
    stock: 45,
    badge: 'Sale',
    has_motion_view: false,
    is_deal: true,
    featured: false,
    description: 'High-density lithium-polymer battery packed into an ultra-thin anodized aluminum chassis with 65W Power Delivery output and digital battery readout.',
    image: '/products/powerbank_slim.jpg',
    thumbnails: ['/products/powerbank_slim.jpg'],
    colors: [
      { name: 'Space Grey', hex: '#4B5563' },
      { name: 'Navy Blue', hex: '#1E3A8A' },
    ],
    sizes: ['20,000mAh'],
  },
  {
    id: 'prod-8',
    name: 'Pro Braided USB-C to USB-C Cable (2m)',
    subtitle: 'SonicWear Gear',
    price: 24.00,
    original_price: 32.00,
    discount_percentage: 25,
    category: 'gadgets',
    brand: 'SonicWear',
    rating: 4.6,
    reviews_count: 310,
    in_stock: true,
    stock: 120,
    badge: 'Sale',
    has_motion_view: false,
    is_deal: false,
    featured: false,
    description: 'Double-braided nylon exterior with reinforced strain relief tested for over 30,000 bends. Supports 100W fast charging and 10Gbps data sync.',
    image: '/products/cable_braided.jpg',
    thumbnails: ['/products/cable_braided.jpg'],
    colors: [
      { name: 'Charcoal Grey', hex: '#374151' },
      { name: 'Pure White', hex: '#F3F4F6' },
    ],
    sizes: ['1 Meter', '2 Meter'],
  },
  {
    id: 'prod-9',
    name: 'Aluminum Precision Headphone Stand',
    subtitle: 'ViewMax Accessories',
    price: 45.00,
    original_price: 55.00,
    discount_percentage: 18,
    category: 'gadgets',
    brand: 'ViewMax',
    rating: 4.9,
    reviews_count: 88,
    in_stock: true,
    stock: 35,
    badge: 'Popular',
    has_motion_view: false,
    is_deal: false,
    featured: false,
    description: 'CNC-machined solid aluminum headphone stand with a soft silicone cradle that protects headband padding while organizing your workstation.',
    image: '/products/stand_aluminum.jpg',
    thumbnails: ['/products/stand_aluminum.jpg'],
    colors: [
      { name: 'Silver Matte', hex: '#D1D5DB' },
      { name: 'Anodized Black', hex: '#1F2937' },
    ],
    sizes: ['Standard'],
  },
  {
    id: 'prod-10',
    name: 'Minimalist Ochre Lounge Armchair',
    subtitle: 'Nordic Living Studio',
    price: 649.00,
    original_price: 799.00,
    discount_percentage: 19,
    category: 'home',
    brand: 'Nordic Living',
    rating: 4.9,
    reviews_count: 42,
    in_stock: true,
    stock: 12,
    badge: 'Featured',
    has_motion_view: true,
    is_deal: false,
    featured: true,
    description: 'Contemporary Scandinavian lounge armchair upholstered in textured ochre-yellow velvet fabric with a sculpted solid beechwood frame.',
    image: '/products/armchair_ochre.jpg',
    thumbnails: ['/products/armchair_ochre.jpg'],
    colors: [
      { name: 'Ochre Yellow', hex: '#EAB308' },
      { name: 'Forest Green', hex: '#004733' },
      { name: 'Stone Grey', hex: '#9CA3AF' },
    ],
    sizes: ['Standard Lounge'],
  },
  {
    id: 'prod-11',
    name: 'Merino Knit Mustard Pullover',
    subtitle: 'Veyora Atelier',
    price: 145.00,
    original_price: 180.00,
    discount_percentage: 20,
    category: 'men',
    brand: 'Veyora Atelier',
    rating: 4.8,
    reviews_count: 67,
    in_stock: true,
    stock: 28,
    badge: 'Sale',
    has_motion_view: false,
    is_deal: false,
    featured: true,
    description: 'Crafted from 100% extrafine Australian Merino wool. Breathable, naturally odor-resistant, and tailored for effortless layering across seasons.',
    image: '/products/sweater_mustard.jpg',
    thumbnails: ['/products/sweater_mustard.jpg'],
    colors: [
      { name: 'Mustard Yellow', hex: '#D97706' },
      { name: 'Navy', hex: '#1E3A8A' },
      { name: 'Olive Green', hex: '#3F6212' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'prod-12',
    name: 'Classic Organic Cotton Crew Tee',
    subtitle: 'Veyora Essentials',
    price: 38.00,
    original_price: 48.00,
    discount_percentage: 21,
    category: 'men',
    brand: 'Veyora Essentials',
    rating: 4.7,
    reviews_count: 190,
    in_stock: true,
    stock: 80,
    badge: 'Popular',
    has_motion_view: false,
    is_deal: false,
    featured: false,
    description: 'Heavyweight 220 GSM combed organic cotton t-shirt with a pre-shrunk rib collar and clean double-needle stitching.',
    image: '/products/tshirt_white.jpg',
    thumbnails: ['/products/tshirt_white.jpg'],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Heather Grey', hex: '#9CA3AF' },
      { name: 'Washed Black', hex: '#1F2937' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
];

const coupons = [
  { code: 'SAVE10', discount: '10% OFF', discount_percent: 10, discount_type: 'percentage', usage_count: 142, expires_at: '2026-12-31', is_active: true },
  { code: 'WELCOME20', discount: '20% OFF', discount_percent: 20, discount_type: 'percentage', usage_count: 389, expires_at: '2026-12-31', is_active: true },
  { code: 'FLASH50', discount: '$50.00 FLAT', discount_percent: 50, discount_type: 'fixed', usage_count: 45, expires_at: '2026-12-31', is_active: true },
];

const initialOrders = [
  {
    id: 'ORD-89241',
    user_email: 'devasanjay001@gmail.com',
    amount: 349.00,
    subtotal: 349.00,
    discount_amount: 0,
    shipping: 0,
    tax: 27.92,
    status: 'Delivered',
    payment_method: 'Credit Card',
    payment_status: 'Paid',
    date: '2026-08-28',
    shipping_address: {
      name: 'Deva Sanjay',
      street: '42 Tech Boulevard, Suite 100',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      phone: '+91 98765 43210'
    },
    items: [
      {
        product_id: 'prod-2',
        product_name: 'Silence V2 Wireless ANC Headphones',
        product_image: '/products/headphones_anc.jpg',
        product_price: 349.00,
        quantity: 1,
        selected_color: 'Arctic White',
        selected_size: 'Universal'
      }
    ]
  },
  {
    id: 'ORD-729401',
    user_email: 'devasanjay001@gmail.com',
    amount: 590.76,
    subtotal: 572.00,
    discount_amount: 57.20,
    shipping: 0,
    tax: 41.18,
    status: 'Processing',
    payment_method: 'UPI Fast Pay',
    payment_status: 'Paid',
    date: '2026-08-29',
    shipping_address: {
      name: 'Deva Sanjay',
      street: '42 Tech Boulevard, Suite 100',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      phone: '+91 98765 43210'
    },
    items: [
      {
        product_id: 'prod-1',
        product_name: 'Wilson Ultra Pro Smartwatch',
        product_image: '/products/smartwatch_pro.jpg',
        product_price: 1899.00,
        quantity: 1,
        selected_color: 'Midnight Black',
        selected_size: 'Medium'
      },
      {
        product_id: 'prod-4',
        product_name: 'Buds Air Pro True Wireless Earbuds',
        product_image: '/products/earbuds_pro.jpg',
        product_price: 129.00,
        quantity: 1,
        selected_color: 'Pebble White',
        selected_size: 'Standard'
      }
    ]
  }
];

async function runPush() {
  console.log('🚀 Starting direct Supabase Database Data Push...');

  // 1. Push Categories
  console.log('📦 Pushing 5 Categories...');
  const { data: catData, error: catError } = await supabase
    .from('categories')
    .upsert(categories, { onConflict: 'id' })
    .select();

  if (catError) {
    console.error('❌ Categories Error:', catError.message);
  } else {
    console.log(`✅ Categories Pushed: ${catData?.length || categories.length}`);
  }

  // 2. Push Products
  console.log('📦 Pushing 12 Products with 1:1 studio photos...');
  const { data: prodData, error: prodError } = await supabase
    .from('products')
    .upsert(products, { onConflict: 'id' })
    .select();

  if (prodError) {
    console.error('❌ Products Error:', prodError.message);
  } else {
    console.log(`✅ Products Pushed: ${prodData?.length || products.length}`);
  }

  // 3. Push Coupons
  console.log('🎟️ Pushing Coupons...');
  const { data: coupData, error: coupError } = await supabase
    .from('coupons')
    .upsert(coupons, { onConflict: 'code' })
    .select();

  if (coupError) {
    console.error('❌ Coupons Error:', coupError.message);
  } else {
    console.log(`✅ Coupons Pushed: ${coupData?.length || coupons.length}`);
  }

  // 4. Push Initial Orders & Line Items
  console.log('📋 Pushing Initial Orders & Line Items...');
  for (const ord of initialOrders) {
    const { items, ...orderRow } = ord;
    const { error: ordError } = await supabase
      .from('orders')
      .upsert([orderRow], { onConflict: 'id' });

    if (!ordError && items && items.length > 0) {
      const lineItems = items.map(item => ({
        order_id: ord.id,
        ...item
      }));
      await supabase.from('order_items').insert(lineItems);
    }
  }
  console.log('✅ Orders & Line Items Pushed.');

  console.log('🎉 All mock data has been successfully pushed to live Supabase database tables!');
}

runPush().catch(err => {
  console.error('Push Failed:', err);
});
