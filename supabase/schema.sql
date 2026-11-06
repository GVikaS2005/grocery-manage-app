-- Supabase SQL Schema for SupaGrocer

-- 1. Store Chains
CREATE TABLE IF NOT EXISTS chains (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(10) DEFAULT 'SK',
    brand_color VARCHAR(20),
    website VARCHAR(255),
    flyer_url VARCHAR(255),
    loyalty_program VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Store Branches & Locations
CREATE TABLE IF NOT EXISTS stores (
    id VARCHAR(100) PRIMARY KEY,
    chain_id VARCHAR(50) REFERENCES chains(id),
    name VARCHAR(200) NOT NULL,
    city_id VARCHAR(50) NOT NULL,
    city_name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    opening_hours TEXT,
    facilities TEXT[],
    mall_name VARCHAR(150),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Flyer Cycles
CREATE TABLE IF NOT EXISTS flyer_cycles (
    cycle_id VARCHAR(50) PRIMARY KEY,
    cycle_name VARCHAR(150) NOT NULL,
    valid_from TIMESTAMPTZ NOT NULL,
    valid_until TIMESTAMPTZ NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'upcoming', 'archived')),
    total_deals INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Products Catalog
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(100) PRIMARY KEY,
    name_sk VARCHAR(200) NOT NULL,
    name_en VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    image_url TEXT,
    is_staple BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Promotional Prices (per cycle and store)
CREATE TABLE IF NOT EXISTS cycle_prices (
    id BIGSERIAL PRIMARY KEY,
    cycle_id VARCHAR(50) REFERENCES flyer_cycles(cycle_id) ON DELETE CASCADE,
    product_id VARCHAR(100) REFERENCES products(id) ON DELETE CASCADE,
    chain_id VARCHAR(50) REFERENCES chains(id) ON DELETE CASCADE,
    promo_price NUMERIC(8,2) NOT NULL,
    regular_price NUMERIC(8,2) NOT NULL,
    is_offer BOOLEAN DEFAULT TRUE,
    discount_percent INT,
    badge VARCHAR(100),
    flyer_page INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(cycle_id, product_id, chain_id)
);

-- 6. User Prescriptions History
CREATE TABLE IF NOT EXISTS prescriptions (
    id VARCHAR(100) PRIMARY KEY,
    cycle_id VARCHAR(50) REFERENCES flyer_cycles(cycle_id),
    total_items INT NOT NULL,
    total_cost NUMERIC(8,2) NOT NULL,
    regular_cost NUMERIC(8,2) NOT NULL,
    total_savings NUMERIC(8,2) NOT NULL,
    savings_percent INT NOT NULL,
    store_splits JSONB NOT NULL,
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning fast lookups
CREATE INDEX IF NOT EXISTS idx_stores_city ON stores(city_id);
CREATE INDEX IF NOT EXISTS idx_cycle_prices_lookup ON cycle_prices(cycle_id, product_id);
CREATE INDEX IF NOT EXISTS idx_flyer_cycles_dates ON flyer_cycles(valid_from, valid_until);
