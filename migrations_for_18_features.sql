-- 1. REAL-TIME UPDATES & CORE
-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE trips;
ALTER PUBLICATION supabase_realtime ADD TABLE requests;
ALTER PUBLICATION supabase_realtime ADD TABLE chats;

-- 2. ENHANCED PROFILES (ROOMMATE GROUPING, ADMIN)
ALTER TABLE users ADD COLUMN room_number TEXT;
ALTER TABLE users ADD COLUMN hostel_block TEXT;
ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user';

-- 3. SCHEDULED & MULTI-STOP TRIPS
ALTER TABLE trips ADD COLUMN scheduled_time TIMESTAMP WITH TIME ZONE;
ALTER TABLE trips ADD COLUMN is_active BOOLEAN DEFAULT true;
ALTER TABLE trips ADD COLUMN stops JSONB DEFAULT '[]'::jsonb; -- Array of locations

-- 4. EMERGENCY REQUESTS & ADVANCED STATUS
ALTER TABLE requests ADD COLUMN is_urgent BOOLEAN DEFAULT false;
-- request status can now include 'picked_up'
-- Note: status is TEXT, so we don't need a strict ENUM alteration based on the existing setup.sql,
-- but we enforce logic on backend.

-- 5. PUSH NOTIFICATIONS
CREATE TABLE push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  auth_key TEXT NOT NULL,
  p256dh_key TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. RATINGS & REVIEWS
-- The existing `ratings` table covers reviews effectively:
-- id, from_user_id, to_user_id, trip_id, rating, comment, created_at
-- We'll keep using it.

-- 7. GAMIFICATION & BADGES
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon_name TEXT NOT NULL
);

CREATE TABLE user_badges (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

-- 8. IN-APP PAYMENTS (WALLETS)
CREATE TABLE wallets (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  balance INTEGER DEFAULT 0 -- Stored in lowest denominator (e.g. cents/paise)
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  to_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL, -- e.g., 'credit', 'debit', 'escrow_hold', 'escrow_release'
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. COMMUNITY BULLETIN BOARD
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. PARTNER STORE INTEGRATIONS
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  location TEXT
);

CREATE TABLE partner_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image_url TEXT
);
