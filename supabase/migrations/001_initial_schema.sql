-- Sleaze Apparel Database Schema
-- Run this migration in your Supabase SQL Editor

-- Products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  shopify_product_id text unique not null,
  name text not null,
  slug text unique not null,
  description text,
  price decimal(10,2) not null,
  compare_at_price decimal(10,2),
  category text check (category in ('mens', 'womens', 'accessories', 'xtreme')),
  featured boolean default false,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Product variants (sizes)
create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade,
  shopify_variant_id text unique not null,
  size text not null,
  sku text,
  inventory_count int default 0,
  created_at timestamptz default now()
);

-- Product images
create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade,
  url text not null,
  alt_text text,
  position int default 0,
  is_primary boolean default false
);

-- Collections
create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  active boolean default true
);

-- Collection products junction
create table if not exists public.collection_products (
  collection_id uuid references public.collections(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  position int default 0,
  primary key (collection_id, product_id)
);

-- Contact submissions
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Newsletter subscribers
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz default now()
);

-- Create indexes for better query performance
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_featured on public.products(featured);
create index if not exists idx_products_active on public.products(active);
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_product_variants_product_id on public.product_variants(product_id);
create index if not exists idx_product_images_product_id on public.product_images(product_id);

-- Enable Row Level Security
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_images enable row level security;
alter table public.collections enable row level security;
alter table public.collection_products enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- RLS Policies

-- Products: Public read for active products
create policy "Public read active products" 
  on public.products for select 
  using (active = true);

-- Product variants: Public read
create policy "Public read product variants" 
  on public.product_variants for select 
  using (true);

-- Product images: Public read
create policy "Public read product images" 
  on public.product_images for select 
  using (true);

-- Collections: Public read for active collections
create policy "Public read active collections" 
  on public.collections for select 
  using (active = true);

-- Collection products: Public read
create policy "Public read collection products" 
  on public.collection_products for select 
  using (true);

-- Contact submissions: Public insert only
create policy "Public insert contact submissions" 
  on public.contact_submissions for insert 
  with check (true);

-- Newsletter subscribers: Public insert only
create policy "Public insert newsletter" 
  on public.newsletter_subscribers for insert 
  with check (true);

-- Updated at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply updated_at trigger to products
drop trigger if exists on_products_updated on public.products;
create trigger on_products_updated
  before update on public.products
  for each row
  execute function public.handle_updated_at();

