-- ==============================================================================
-- SHOPEE AFFILIATE ACADEMY — MIGRATION 20261029010000_workspace_text_ids_and_dual_layer.sql
-- Aligns workspace tables IDs to TEXT for Dual-Layer Storage compatibility
-- ==============================================================================

-- 1. Drop foreign keys referencing workspace IDs temporarily
ALTER TABLE IF EXISTS public.affiliate_links DROP CONSTRAINT IF EXISTS affiliate_links_product_id_fkey;
ALTER TABLE IF EXISTS public.content_items DROP CONSTRAINT IF EXISTS content_items_product_id_fkey;
ALTER TABLE IF EXISTS public.content_items DROP CONSTRAINT IF EXISTS content_items_link_id_fkey;
ALTER TABLE IF EXISTS public.performance_records DROP CONSTRAINT IF EXISTS performance_records_content_item_id_fkey;

-- 2. Alter column types to TEXT
ALTER TABLE IF EXISTS public.affiliate_products ALTER COLUMN id TYPE TEXT;
ALTER TABLE IF EXISTS public.research_notes ALTER COLUMN id TYPE TEXT;
ALTER TABLE IF EXISTS public.content_templates ALTER COLUMN id TYPE TEXT;
ALTER TABLE IF EXISTS public.affiliate_links ALTER COLUMN id TYPE TEXT;
ALTER TABLE IF EXISTS public.affiliate_links ALTER COLUMN product_id TYPE TEXT;
ALTER TABLE IF EXISTS public.content_items ALTER COLUMN id TYPE TEXT;
ALTER TABLE IF EXISTS public.content_items ALTER COLUMN product_id TYPE TEXT;
ALTER TABLE IF EXISTS public.content_items ALTER COLUMN link_id TYPE TEXT;
ALTER TABLE IF EXISTS public.performance_records ALTER COLUMN id TYPE TEXT;
ALTER TABLE IF EXISTS public.performance_records ALTER COLUMN content_item_id TYPE TEXT;
ALTER TABLE IF EXISTS public.commission_periods ALTER COLUMN id TYPE TEXT;
ALTER TABLE IF EXISTS public.experiments ALTER COLUMN id TYPE TEXT;
ALTER TABLE IF EXISTS public.sop_documents ALTER COLUMN id TYPE TEXT;

-- 3. Restore foreign keys
ALTER TABLE IF EXISTS public.affiliate_links 
  ADD CONSTRAINT affiliate_links_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.affiliate_products(id) ON DELETE SET NULL;
ALTER TABLE IF EXISTS public.content_items 
  ADD CONSTRAINT content_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.affiliate_products(id) ON DELETE SET NULL;
ALTER TABLE IF EXISTS public.content_items 
  ADD CONSTRAINT content_items_link_id_fkey FOREIGN KEY (link_id) REFERENCES public.affiliate_links(id) ON DELETE SET NULL;
ALTER TABLE IF EXISTS public.performance_records 
  ADD CONSTRAINT performance_records_content_item_id_fkey FOREIGN KEY (content_item_id) REFERENCES public.content_items(id) ON DELETE CASCADE;
