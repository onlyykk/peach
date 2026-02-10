-- Peach Financial Advisor - Supabase Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & PROFILES
-- ============================================

-- User profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  
  -- Onboarding data
  monthly_income DECIMAL(12,2),
  savings_target DECIMAL(12,2),
  pay_frequency TEXT CHECK (pay_frequency IN ('weekly', 'biweekly', 'monthly')),
  payday_of_month INTEGER CHECK (payday_of_month BETWEEN 1 AND 31),
  
  -- Preferences
  timezone TEXT DEFAULT 'America/Los_Angeles',
  currency TEXT DEFAULT 'USD',
  
  -- Subscription
  subscription_status TEXT DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'canceled', 'expired')),
  trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '14 days'),
  stripe_customer_id TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BUDGET CATEGORIES (Envelopes)
-- ============================================

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  icon TEXT, -- emoji or icon name
  color TEXT, -- hex color
  
  -- Budget settings
  monthly_limit DECIMAL(12,2),
  rollover_enabled BOOLEAN DEFAULT FALSE,
  
  -- Ordering
  sort_order INTEGER DEFAULT 0,
  
  -- System categories can't be deleted
  is_system BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, name)
);

-- Default categories (inserted per user on signup)
-- Groceries, Dining Out, Transportation, Entertainment, Shopping, Bills, Health, Other

-- ============================================
-- TRANSACTIONS
-- ============================================

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  
  -- Transaction data
  amount DECIMAL(12,2) NOT NULL,
  description TEXT,
  merchant TEXT,
  
  -- Date (separate from created_at for manual entry)
  transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  
  -- Type
  type TEXT DEFAULT 'expense' CHECK (type IN ('expense', 'income', 'transfer')),
  
  -- Source (manual vs future Plaid integration)
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'plaid', 'import')),
  plaid_transaction_id TEXT,
  
  -- Metadata
  notes TEXT,
  tags TEXT[], -- array of tags
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast date-based queries
CREATE INDEX idx_transactions_user_date ON transactions(user_id, transaction_date DESC);
CREATE INDEX idx_transactions_category ON transactions(category_id);

-- ============================================
-- SAVINGS GOALS (Cookie Jars)
-- ============================================

CREATE TABLE savings_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL, -- "Christmas Fund", "Vacation", etc.
  target_amount DECIMAL(12,2) NOT NULL,
  current_amount DECIMAL(12,2) DEFAULT 0,
  
  -- Optional deadline
  target_date DATE,
  
  -- Visual customization
  icon TEXT DEFAULT '🍪',
  color TEXT,
  
  -- Status
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RECURRING BILLS (Kitchen Calendar)
-- ============================================

CREATE TABLE recurring_bills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  
  name TEXT NOT NULL, -- "Rent", "Netflix", "Electric"
  amount DECIMAL(12,2) NOT NULL,
  
  -- Schedule
  frequency TEXT NOT NULL CHECK (frequency IN ('weekly', 'biweekly', 'monthly', 'quarterly', 'yearly')),
  day_of_month INTEGER CHECK (day_of_month BETWEEN 1 AND 31),
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = Sunday
  
  -- Next due date (computed/updated)
  next_due_date DATE,
  
  -- Auto-pay status
  is_autopay BOOLEAN DEFAULT FALSE,
  
  -- Notifications
  remind_days_before INTEGER DEFAULT 3,
  
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CHAT HISTORY (for Peach conversations)
-- ============================================

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  
  -- Peach's mood for this message (for assistant messages)
  mood TEXT CHECK (mood IN ('happy', 'neutral', 'anguished')),
  
  -- Context (what data was referenced)
  context JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fetching recent conversations
CREATE INDEX idx_chat_messages_user_date ON chat_messages(user_id, created_at DESC);

-- ============================================
-- DAILY SUMMARIES (precomputed for performance)
-- ============================================

CREATE TABLE daily_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  summary_date DATE NOT NULL,
  
  -- Spending totals
  total_spent DECIMAL(12,2) DEFAULT 0,
  total_income DECIMAL(12,2) DEFAULT 0,
  
  -- Category breakdown (JSONB for flexibility)
  category_totals JSONB DEFAULT '{}',
  
  -- Mood indicator (computed based on budget)
  mood TEXT CHECK (mood IN ('happy', 'neutral', 'anguished')),
  
  -- Peach's daily tip/comment
  daily_tip TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, summary_date)
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE recurring_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_summaries ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only access their own data
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can CRUD own categories" ON categories FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own transactions" ON transactions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own savings_goals" ON savings_goals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own recurring_bills" ON recurring_bills FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own chat_messages" ON chat_messages FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can CRUD own daily_summaries" ON daily_summaries FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_savings_goals_updated_at BEFORE UPDATE ON savings_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_recurring_bills_updated_at BEFORE UPDATE ON recurring_bills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to create default categories for new users
CREATE OR REPLACE FUNCTION create_default_categories()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO categories (user_id, name, icon, color, is_system, sort_order) VALUES
    (NEW.id, 'Groceries', '🛒', '#4CAF50', true, 1),
    (NEW.id, 'Dining Out', '🍽️', '#FF9800', true, 2),
    (NEW.id, 'Transportation', '🚗', '#2196F3', true, 3),
    (NEW.id, 'Entertainment', '🎬', '#9C27B0', true, 4),
    (NEW.id, 'Shopping', '🛍️', '#E91E63', true, 5),
    (NEW.id, 'Bills & Utilities', '📄', '#607D8B', true, 6),
    (NEW.id, 'Health', '💊', '#00BCD4', true, 7),
    (NEW.id, 'Other', '📦', '#795548', true, 8);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profile_created
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE FUNCTION create_default_categories();

-- ============================================
-- VIEWS (for common queries)
-- ============================================

-- Monthly spending summary view
CREATE OR REPLACE VIEW monthly_spending AS
SELECT 
  user_id,
  DATE_TRUNC('month', transaction_date) AS month,
  category_id,
  SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expenses,
  SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
  COUNT(*) AS transaction_count
FROM transactions
GROUP BY user_id, DATE_TRUNC('month', transaction_date), category_id;
