-- =============================================
-- TOMYLINK DATABASE SCHEMA
-- =============================================

-- USERS (extend Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  banner_url text,
  referral_code text unique default substr(md5(random()::text), 1, 8),
  referred_by uuid references public.profiles(id),
  total_earnings bigint default 0, -- in IDR cents
  created_at timestamptz default now()
);

-- =============================================
-- LINKS (Affiliate, Digital, Template, dll)
-- =============================================
create table public.links (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  category text not null check (category in ('affiliate','digital','template','food','other')),
  title text not null,
  url text not null,
  icon_emoji text default '🔗',
  icon_bg text default 'linear-gradient(135deg,#5E5CE6,#BF5AF2)',
  clicks int default 0,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- =============================================
-- AUCTIONS (Lelang)
-- =============================================
create table public.auctions (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  image_url text,
  category text default 'general' check (category in ('nft','digital_art','physical','collectible','general')),
  start_price bigint not null, -- IDR in cents (e.g. 10000000 = Rp 100.000)
  current_price bigint not null,
  min_bid_increment bigint default 500000, -- Rp 5.000 minimum increment
  status text default 'upcoming' check (status in ('upcoming','active','ended','cancelled')),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  winner_id uuid references public.profiles(id),
  total_bids int default 0,
  created_at timestamptz default now()
);

-- =============================================
-- BIDS
-- =============================================
create table public.bids (
  id uuid default gen_random_uuid() primary key,
  auction_id uuid references public.auctions(id) on delete cascade,
  bidder_id uuid references public.profiles(id) on delete cascade,
  amount bigint not null, -- IDR in cents
  status text default 'active' check (status in ('active','outbid','won','refunded')),
  payment_status text default 'pending' check (payment_status in ('pending','paid','refunded','failed')),
  xendit_payment_id text, -- Xendit invoice/payment ID
  xendit_refund_id text,
  created_at timestamptz default now()
);

-- =============================================
-- DIGITAL PRODUCTS
-- =============================================
create table public.products (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  image_url text,
  category text not null check (category in ('font','mockup','icon','brush','template','preset','other')),
  price bigint not null, -- IDR in cents
  file_url text, -- download link after purchase
  sales_count int default 0,
  rating numeric(3,2) default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- =============================================
-- ORDERS (Digital Products)
-- =============================================
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references public.profiles(id),
  product_id uuid references public.products(id),
  amount bigint not null,
  status text default 'pending' check (status in ('pending','paid','delivered','refunded')),
  xendit_payment_id text,
  created_at timestamptz default now()
);

-- =============================================
-- FOOD MENU (Delivery/UMKM)
-- =============================================
create table public.menu_items (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  description text,
  image_url text,
  price bigint not null, -- IDR in cents
  category text default 'food' check (category in ('food','drink','snack','package')),
  is_available boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- =============================================
-- FOOD ORDERS
-- =============================================
create table public.food_orders (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references public.profiles(id),
  seller_id uuid references public.profiles(id),
  items jsonb not null, -- [{menu_item_id, name, qty, price}]
  total_amount bigint not null,
  status text default 'pending' check (status in ('pending','confirmed','preparing','delivered','cancelled')),
  delivery_address text,
  notes text,
  xendit_payment_id text,
  created_at timestamptz default now()
);

-- =============================================
-- REFERRALS & EARNINGS
-- =============================================
create table public.earnings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  source_type text not null check (source_type in ('referral','auction_sale','product_sale','food_sale','platform_fee')),
  source_id uuid, -- auction_id, order_id, etc
  amount bigint not null, -- IDR in cents
  status text default 'pending' check (status in ('pending','available','withdrawn')),
  created_at timestamptz default now()
);

-- =============================================
-- WITHDRAWALS
-- =============================================
create table public.withdrawals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  amount bigint not null,
  bank_name text,
  account_number text,
  account_name text,
  status text default 'pending' check (status in ('pending','processing','completed','failed')),
  xendit_disbursement_id text,
  created_at timestamptz default now()
);

-- =============================================
-- NOTIFICATIONS
-- =============================================
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  type text not null check (type in ('outbid','auction_won','auction_ended','payment_received','refund','new_order','withdrawal')),
  title text not null,
  message text not null,
  data jsonb, -- extra data (auction_id, amount, etc)
  is_read boolean default false,
  created_at timestamptz default now()
);

-- =============================================
-- INDEXES (for performance)
-- =============================================
create index on public.links(user_id);
create index on public.auctions(status, ends_at);
create index on public.bids(auction_id, status);
create index on public.bids(bidder_id);
create index on public.notifications(user_id, is_read);
create index on public.earnings(user_id, status);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
alter table public.profiles enable row level security;
alter table public.links enable row level security;
alter table public.auctions enable row level security;
alter table public.bids enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.menu_items enable row level security;
alter table public.food_orders enable row level security;
alter table public.earnings enable row level security;
alter table public.withdrawals enable row level security;
alter table public.notifications enable row level security;

-- Profiles: public read, own write
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Links: public read, own write
create policy "Links are viewable by everyone" on public.links for select using (true);
create policy "Users can manage own links" on public.links for all using (auth.uid() = user_id);

-- Auctions: public read, own write
create policy "Auctions are viewable by everyone" on public.auctions for select using (true);
create policy "Users can manage own auctions" on public.auctions for all using (auth.uid() = seller_id);

-- Bids: public read, own write
create policy "Bids are viewable by everyone" on public.bids for select using (true);
create policy "Users can place own bids" on public.bids for insert with check (auth.uid() = bidder_id);
create policy "Users can view own bids" on public.bids for select using (auth.uid() = bidder_id);

-- Notifications: private
create policy "Users can view own notifications" on public.notifications for all using (auth.uid() = user_id);

-- Earnings: private
create policy "Users can view own earnings" on public.earnings for select using (auth.uid() = user_id);

-- Withdrawals: private
create policy "Users can manage own withdrawals" on public.withdrawals for all using (auth.uid() = user_id);
