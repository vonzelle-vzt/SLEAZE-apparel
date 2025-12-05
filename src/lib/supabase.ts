import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase: SupabaseClient | null = 
  supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey) 
    : null;

export type Product = {
  id: string;
  shopify_product_id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  category: 'mens' | 'womens' | 'accessories' | 'xtreme';
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  product_images?: ProductImage[];
  product_variants?: ProductVariant[];
};

export type ProductVariant = {
  id: string;
  product_id: string;
  shopify_variant_id: string;
  size: string;
  sku: string | null;
  inventory_count: number;
  created_at: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  position: number;
  is_primary: boolean;
};

export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  active: boolean;
};

export async function getProducts(category?: string): Promise<Product[]> {
  if (!supabase) return [];
  
  let query = supabase
    .from('products')
    .select(`
      *,
      product_images (*),
      product_variants (*)
    `)
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!supabase) return [];
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (*),
      product_variants (*)
    `)
    .eq('active', true)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(8);

  if (error) throw error;
  return data || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (*),
      product_variants (*)
    `)
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (error) return null;
  return data;
}

export async function getCollections(): Promise<Collection[]> {
  if (!supabase) return [];
  
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('active', true);

  if (error) throw error;
  return data || [];
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  if (!supabase) throw new Error('Database not configured');
  
  const { error } = await supabase
    .from('contact_submissions')
    .insert([data]);

  if (error) throw error;
}

export async function subscribeNewsletter(email: string): Promise<void> {
  if (!supabase) throw new Error('Database not configured');
  
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }]);

  if (error) throw error;
}

