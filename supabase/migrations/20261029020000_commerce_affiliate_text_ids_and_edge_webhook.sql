-- MIGRATION: 20261029020000_commerce_affiliate_text_ids_and_edge_webhook.sql
-- TUJUAN: Menyelaraskan Commerce, Entitlement, dan Internal Affiliate Platform dengan String IDs,
--         Mendukung Addendum v2.1 Tiering ('pro', 'pro_plus'), dan Memperkuat Row Level Security (RLS).

-- 1. Penyesuaian Kolom Tambahan pada Tabel Orders & Entitlements
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS sku TEXT DEFAULT 'affiliate_academy_pro';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'pro';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS notes TEXT;

ALTER TABLE public.entitlements ADD COLUMN IF NOT EXISTS customer_email TEXT;

-- 2. Migrasi Kolom ID Tabel Commerce & Entitlements ke TEXT PRIMARY KEY
DO $$
BEGIN
  -- Orders
  ALTER TABLE public.orders ALTER COLUMN id TYPE TEXT;
  ALTER TABLE public.orders ALTER COLUMN id SET DEFAULT gen_random_uuid()::text;

  -- Entitlements
  ALTER TABLE public.entitlements ALTER COLUMN id TYPE TEXT;
  ALTER TABLE public.entitlements ALTER COLUMN id SET DEFAULT gen_random_uuid()::text;
  ALTER TABLE public.entitlements ALTER COLUMN source_order_id TYPE TEXT;

  -- Admin Audit Logs
  ALTER TABLE public.admin_audit_logs ALTER COLUMN id TYPE TEXT;
  ALTER TABLE public.admin_audit_logs ALTER COLUMN id SET DEFAULT gen_random_uuid()::text;
  ALTER TABLE public.admin_audit_logs ALTER COLUMN related_order_id TYPE TEXT;

  -- Affiliate Profiles
  ALTER TABLE public.affiliate_profiles ALTER COLUMN id TYPE TEXT;
  ALTER TABLE public.affiliate_profiles ALTER COLUMN id SET DEFAULT gen_random_uuid()::text;

  -- Referral Clicks
  ALTER TABLE public.referral_clicks ALTER COLUMN id TYPE TEXT;
  ALTER TABLE public.referral_clicks ALTER COLUMN id SET DEFAULT gen_random_uuid()::text;
  ALTER TABLE public.referral_clicks ALTER COLUMN affiliate_id TYPE TEXT;

  -- Referral Conversions
  ALTER TABLE public.referral_conversions ALTER COLUMN id TYPE TEXT;
  ALTER TABLE public.referral_conversions ALTER COLUMN id SET DEFAULT gen_random_uuid()::text;
  ALTER TABLE public.referral_conversions ALTER COLUMN affiliate_id TYPE TEXT;
  ALTER TABLE public.referral_conversions ALTER COLUMN order_id TYPE TEXT;

  -- Affiliate Payouts
  ALTER TABLE public.affiliate_payouts ALTER COLUMN id TYPE TEXT;
  ALTER TABLE public.affiliate_payouts ALTER COLUMN id SET DEFAULT gen_random_uuid()::text;
  ALTER TABLE public.affiliate_payouts ALTER COLUMN affiliate_id TYPE TEXT;

  -- Marketing Materials
  ALTER TABLE public.marketing_materials ALTER COLUMN id TYPE TEXT;
  ALTER TABLE public.marketing_materials ALTER COLUMN id SET DEFAULT gen_random_uuid()::text;
END $$;

-- 3. Fungsi Helper Evaluasi Entitlement Pro dan Pro Plus (Addendum v2.1)
CREATE OR REPLACE FUNCTION public.has_active_premium_access()
RETURNS BOOLEAN AS $$
BEGIN
  IF public.is_admin() THEN
    RETURN TRUE;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.entitlements
    WHERE user_id = auth.uid() 
      AND product_code = 'affiliate_academy' 
      AND status = 'active'
      AND access_level IN ('pro', 'pro_plus', 'premium')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.has_active_pro_plus_access()
RETURNS BOOLEAN AS $$
BEGIN
  IF public.is_admin() THEN
    RETURN TRUE;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.entitlements
    WHERE user_id = auth.uid() 
      AND product_code = 'affiliate_academy' 
      AND status = 'active'
      AND access_level IN ('pro_plus', 'premium')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. RLS Permissive Policies untuk Checkout & Pelacakan Referral Publik
DROP POLICY IF EXISTS "Public or Users can insert orders" ON public.orders;
CREATE POLICY "Public or Users can insert orders"
ON public.orders FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Public can record referral clicks" ON public.referral_clicks;
CREATE POLICY "Public can record referral clicks"
ON public.referral_clicks FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Users can create own affiliate profile" ON public.affiliate_profiles;
CREATE POLICY "Users can create own affiliate profile"
ON public.affiliate_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can request affiliate payouts" ON public.affiliate_payouts;
CREATE POLICY "Users can request affiliate payouts"
ON public.affiliate_payouts FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.affiliate_profiles
    WHERE id = affiliate_payouts.affiliate_id AND user_id = auth.uid()
  )
);
