-- ==============================================================================
-- SHOPEE AFFILIATE ACADEMY — MIGRATION 20261026000000_init_schema.sql
-- Production-Ready Database Schema: 23 Tables + Types + RLS Policies + Triggers
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USER & AUTH SCHEMA
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    phone_number TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

DO $$ BEGIN
    CREATE TYPE user_role_enum AS ENUM ('student', 'admin', 'super_admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role user_role_enum DEFAULT 'student' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE (user_id, role)
);

-- Security Functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. ORDERS & ENTITLEMENTS (Sebelum LMS agar RLS bisa mengecek entitlement)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_email TEXT NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    currency TEXT DEFAULT 'IDR' NOT NULL,
    provider TEXT NOT NULL, -- 'lynk', 'dana_qris', 'manual', 'xendit'
    provider_reference TEXT UNIQUE,
    status TEXT CHECK (status IN ('pending', 'paid', 'cancelled', 'refunded', 'failed')) DEFAULT 'pending' NOT NULL,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.entitlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_code TEXT NOT NULL DEFAULT 'affiliate_academy',
    access_level TEXT NOT NULL DEFAULT 'premium',
    status TEXT CHECK (status IN ('active', 'revoked', 'expired')) DEFAULT 'active' NOT NULL,
    source_order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    granted_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    revoked_at TIMESTAMPTZ,
    revocation_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE (user_id, product_code)
);

CREATE OR REPLACE FUNCTION public.has_active_premium_access()
RETURNS BOOLEAN AS $$
BEGIN
  IF public.is_admin() THEN
    RETURN TRUE;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.entitlements
    WHERE user_id = auth.uid() AND product_code = 'affiliate_academy' AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id UUID NOT NULL REFERENCES public.profiles(id),
    action TEXT NOT NULL,
    target_user_id UUID REFERENCES public.profiles(id),
    related_order_id UUID REFERENCES public.orders(id),
    reason TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. KURIKULUM & LMS
CREATE TABLE IF NOT EXISTS public.modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE, -- 'M00' sampai 'M06'
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN DEFAULT true NOT NULL
);

CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    content TEXT NOT NULL,
    source_ref TEXT,
    estimated_minutes INT DEFAULT 10 NOT NULL,
    is_free_preview BOOLEAN DEFAULT false NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN DEFAULT true NOT NULL,
    UNIQUE (module_id, slug)
);

CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT false NOT NULL,
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE (user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS public.practice_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE, -- 'P01' sampai 'P08'
    title TEXT NOT NULL,
    objective TEXT NOT NULL,
    supporting_modules JSONB NOT NULL DEFAULT '[]'::jsonb,
    checklist JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN DEFAULT true NOT NULL
);

CREATE TABLE IF NOT EXISTS public.project_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES public.practice_projects(id) ON DELETE CASCADE,
    completed_checklist JSONB NOT NULL DEFAULT '[]'::jsonb,
    reflection_notes TEXT,
    evidence_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started' NOT NULL,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE (user_id, project_id)
);

-- 5. WORKSPACE EKSEKUSI PENGGUNA
CREATE TABLE IF NOT EXISTS public.affiliate_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    product_url TEXT NOT NULL,
    category TEXT,
    price NUMERIC(12,2) NOT NULL DEFAULT 0,
    commission_note TEXT,
    rating NUMERIC(3,2),
    review_count INT DEFAULT 0,
    checked_at DATE DEFAULT CURRENT_DATE NOT NULL,
    score_audience_fit INT CHECK (score_audience_fit BETWEEN 1 AND 5),
    score_quality INT CHECK (score_quality BETWEEN 1 AND 5),
    score_price_value INT CHECK (score_price_value BETWEEN 1 AND 5),
    score_commission INT CHECK (score_commission BETWEEN 1 AND 5),
    score_competition INT CHECK (score_competition BETWEEN 1 AND 5),
    score_demo_potential INT CHECK (score_demo_potential BETWEEN 1 AND 5),
    score_availability INT CHECK (score_availability BETWEEN 1 AND 5),
    research_score NUMERIC(5,2),
    status TEXT CHECK (status IN ('research', 'ready', 'testing', 'dropped')) DEFAULT 'research' NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.research_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    note_type TEXT CHECK (note_type IN ('niche', 'competitor')) NOT NULL,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    findings TEXT,
    evidence_urls JSONB DEFAULT '[]'::jsonb,
    observed_at DATE DEFAULT CURRENT_DATE NOT NULL,
    facts TEXT,
    assumptions TEXT,
    content_gaps TEXT,
    next_step TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.content_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kind TEXT CHECK (kind IN ('hook', 'script', 'cta', 'checklist')) NOT NULL,
    subtype TEXT,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true NOT NULL
);

CREATE TABLE IF NOT EXISTS public.affiliate_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.affiliate_products(id) ON DELETE SET NULL,
    shop_name TEXT,
    url TEXT NOT NULL,
    platform TEXT NOT NULL,
    status TEXT CHECK (status IN ('active', 'needs_check', 'unused')) DEFAULT 'active' NOT NULL,
    checked_at DATE DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.content_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.affiliate_products(id) ON DELETE SET NULL,
    link_id UUID REFERENCES public.affiliate_links(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    platform TEXT NOT NULL,
    pillar TEXT,
    format TEXT,
    hook_type TEXT,
    hook TEXT,
    angle TEXT,
    script TEXT,
    cta TEXT,
    has_disclosure BOOLEAN DEFAULT true NOT NULL,
    qc_checklist JSONB DEFAULT '{}'::jsonb,
    status TEXT CHECK (status IN ('idea', 'research', 'script', 'production', 'review', 'ready', 'published', 'evaluation', 'done')) DEFAULT 'idea' NOT NULL,
    scheduled_at TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    content_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.performance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content_item_id UUID NOT NULL REFERENCES public.content_items(id) ON DELETE CASCADE,
    record_date DATE NOT NULL,
    views INT DEFAULT 0,
    clicks INT DEFAULT 0,
    orders INT DEFAULT 0,
    cancelled_orders INT DEFAULT 0,
    qualified_orders INT DEFAULT 0,
    commission_estimated NUMERIC(12,2) DEFAULT 0,
    commission_pending NUMERIC(12,2) DEFAULT 0,
    commission_approved NUMERIC(12,2) DEFAULT 0,
    commission_paid NUMERIC(12,2) DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE (content_item_id, record_date)
);

CREATE TABLE IF NOT EXISTS public.commission_periods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    period_label TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    source_name TEXT DEFAULT 'Shopee Official Dashboard' NOT NULL,
    source_checked_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()),
    clicks INT DEFAULT 0,
    orders INT DEFAULT 0,
    cancelled_orders INT DEFAULT 0,
    commission_estimated NUMERIC(12,2) DEFAULT 0,
    commission_pending NUMERIC(12,2) DEFAULT 0,
    commission_approved NUMERIC(12,2) DEFAULT 0,
    commission_paid NUMERIC(12,2) DEFAULT 0,
    business_costs NUMERIC(12,2) DEFAULT 0,
    work_hours NUMERIC(6,2) DEFAULT 0,
    payout_status TEXT,
    proof_reference TEXT,
    reconciliation_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.experiments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    goal TEXT NOT NULL,
    hypothesis TEXT NOT NULL,
    variable TEXT NOT NULL,
    primary_metric TEXT NOT NULL,
    baseline NUMERIC(12,2),
    result NUMERIC(12,2),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    sample_size INT,
    limitations TEXT,
    decision TEXT CHECK (decision IN ('continue', 'optimize', 'retest', 'deprioritize', 'stop')),
    decision_reason TEXT,
    lessons TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.sop_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    procedure TEXT NOT NULL,
    last_reviewed_at DATE DEFAULT CURRENT_DATE,
    review_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. PROGRAM AFFILIATE INTERNAL
CREATE TABLE IF NOT EXISTS public.affiliate_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    referral_code TEXT NOT NULL UNIQUE,
    bank_name TEXT,
    bank_account_number TEXT,
    bank_account_holder TEXT,
    is_active BOOLEAN DEFAULT true NOT NULL,
    total_commission_earned NUMERIC(12,2) DEFAULT 0 NOT NULL,
    total_commission_paid NUMERIC(12,2) DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.referral_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    affiliate_id UUID NOT NULL REFERENCES public.affiliate_profiles(id) ON DELETE CASCADE,
    ip_hash TEXT,
    user_agent TEXT,
    referer_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.referral_conversions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    affiliate_id UUID NOT NULL REFERENCES public.affiliate_profiles(id) ON DELETE CASCADE,
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE UNIQUE,
    commission_rate NUMERIC(4,2) DEFAULT 0.10 NOT NULL,
    commission_amount NUMERIC(12,2) NOT NULL,
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'paid')) DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.affiliate_payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    affiliate_id UUID NOT NULL REFERENCES public.affiliate_profiles(id) ON DELETE CASCADE,
    amount NUMERIC(12,2) NOT NULL,
    status TEXT CHECK (status IN ('requested', 'processing', 'completed', 'rejected')) DEFAULT 'requested' NOT NULL,
    admin_notes TEXT,
    transfer_proof_url TEXT,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.marketing_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT CHECK (category IN ('banner', 'swipe_copy', 'video_mockup', 'guide')) NOT NULL,
    content_url TEXT,
    copy_text TEXT,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 7. TRIGGER AUTO-CREATE PROFILE SAAT USER MENDAFTAR DI AUTH.USERS
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );

  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'student');

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Aktifkan RLS di seluruh tabel
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sop_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_materials ENABLE ROW LEVEL SECURITY;

-- Profiles: Pengguna bisa membaca dan mengubah profil miliknya sendiri. Admin bisa baca semua.
CREATE POLICY "Profiles are viewable by owner or admin"
ON public.profiles FOR SELECT
USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- User Roles: Pengguna biasa tidak bisa memanipulasi role.
CREATE POLICY "User roles viewable by self or admin"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Admin can manage roles"
ON public.user_roles FOR ALL
USING (public.is_admin());

-- Modules & Practice Projects: Dapat dibaca publik/authenticated
CREATE POLICY "Modules viewable by authenticated users"
ON public.modules FOR SELECT
USING (auth.uid() IS NOT NULL AND is_published = true);

CREATE POLICY "Projects viewable by authenticated users"
ON public.practice_projects FOR SELECT
USING (auth.uid() IS NOT NULL AND is_published = true);

-- Lessons: Preview gratis untuk semua pengguna terdaftar; materi lain wajib memiliki entitlement aktif
CREATE POLICY "Lessons readable by entitled users or preview"
ON public.lessons FOR SELECT
USING (
  is_published = true AND (
    is_free_preview = true OR
    public.has_active_premium_access()
  )
);

CREATE POLICY "Admin can manage lessons"
ON public.lessons FOR ALL
USING (public.is_admin());

-- Lesson Progress & Project Progress: Pemilik akun
CREATE POLICY "Users can manage own lesson progress"
ON public.lesson_progress FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own project progress"
ON public.project_progress FOR ALL
USING (auth.uid() = user_id);

-- Workspace Data: Isolasi ketat milik pengguna (auth.uid() = user_id)
CREATE POLICY "Users own affiliate_products"
ON public.affiliate_products FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users own research_notes"
ON public.research_notes FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users own affiliate_links"
ON public.affiliate_links FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users own content_items"
ON public.content_items FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users own performance_records"
ON public.performance_records FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users own commission_periods"
ON public.commission_periods FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users own experiments"
ON public.experiments FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users own sop_documents"
ON public.sop_documents FOR ALL
USING (auth.uid() = user_id);

-- Content Templates: Hanya dibaca pengguna premium / preview M00
CREATE POLICY "Content templates viewable by premium"
ON public.content_templates FOR SELECT
USING (public.has_active_premium_access() OR public.is_admin());

-- Orders & Entitlements: Dibaca pemilik akun; modifikasi hanya admin / service backend
CREATE POLICY "Users can view own orders"
ON public.orders FOR SELECT
USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can view own entitlements"
ON public.entitlements FOR SELECT
USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Admin can manage orders and entitlements"
ON public.orders FOR ALL
USING (public.is_admin());

CREATE POLICY "Admin can manage entitlements table"
ON public.entitlements FOR ALL
USING (public.is_admin());

-- Admin Audit Logs: Hanya admin yang bisa melihat
CREATE POLICY "Audit logs viewable by admin"
ON public.admin_audit_logs FOR SELECT
USING (public.is_admin());

-- Affiliate Data
CREATE POLICY "Affiliates manage own profile"
ON public.affiliate_profiles FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Affiliates view own conversions"
ON public.referral_conversions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.affiliate_profiles
    WHERE id = referral_conversions.affiliate_id AND user_id = auth.uid()
  ) OR public.is_admin()
);

CREATE POLICY "Affiliates view own payouts"
ON public.affiliate_payouts FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.affiliate_profiles
    WHERE id = affiliate_payouts.affiliate_id AND user_id = auth.uid()
  ) OR public.is_admin()
);

CREATE POLICY "Marketing materials viewable by authenticated users"
ON public.marketing_materials FOR SELECT
USING (auth.uid() IS NOT NULL AND is_published = true);
