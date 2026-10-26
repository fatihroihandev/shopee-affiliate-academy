export type UserRole = 'student' | 'admin' | 'super_admin';

export interface Profile {
  id: string;
  display_name: string;
  avatar_url?: string | null;
  phone_number?: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRoleRecord {
  id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
}

export interface Entitlement {
  id: string;
  user_id: string;
  product_code: string;
  access_level: 'free' | 'premium';
  status: 'active' | 'revoked' | 'expired';
  source_order_id?: string | null;
  granted_at: string;
  revoked_at?: string | null;
}

export interface Module {
  id: string;
  code: string; // M00 - M06
  title: string;
  slug: string;
  description?: string;
  sort_order: number;
  is_published: boolean;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  slug: string;
  content: string;
  source_ref?: string;
  estimated_minutes: number;
  is_free_preview: boolean;
  sort_order: number;
  is_published: boolean;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  is_completed: boolean;
  completed_at?: string | null;
}

export interface PracticeProject {
  id: string;
  code: string; // P01 - P08
  title: string;
  objective: string;
  supporting_modules: string[];
  checklist: Array<{ id: string; label: string }>;
  sort_order: number;
  is_published: boolean;
}

export interface ProjectProgress {
  id: string;
  user_id: string;
  project_id: string;
  completed_checklist: string[];
  reflection_notes?: string;
  evidence_urls: string[];
  status: 'not_started' | 'in_progress' | 'completed';
  started_at?: string;
  completed_at?: string;
}

export interface AffiliateProduct {
  id: string;
  user_id: string;
  name: string;
  product_url: string;
  category?: string;
  price: number;
  commission_note?: string;
  rating?: number;
  review_count?: number;
  checked_at: string;
  score_audience_fit?: number;
  score_quality?: number;
  score_price_value?: number;
  score_commission?: number;
  score_competition?: number;
  score_demo_potential?: number;
  score_availability?: number;
  research_score?: number;
  status: 'research' | 'ready' | 'testing' | 'dropped';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ContentItem {
  id: string;
  user_id: string;
  product_id?: string | null;
  link_id?: string | null;
  title: string;
  platform: string;
  pillar?: string;
  format?: string;
  hook_type?: string;
  hook?: string;
  angle?: string;
  script?: string;
  cta?: string;
  has_disclosure: boolean;
  qc_checklist?: Record<string, boolean>;
  status: 'idea' | 'research' | 'script' | 'production' | 'review' | 'ready' | 'published' | 'evaluation' | 'done';
  scheduled_at?: string | null;
  published_at?: string | null;
  content_url?: string | null;
}

export interface PerformanceRecord {
  id: string;
  user_id: string;
  content_item_id: string;
  record_date: string;
  views: number;
  clicks: number;
  orders: number;
  cancelled_orders: number;
  qualified_orders: number;
  commission_estimated: number;
  commission_pending: number;
  commission_approved: number;
  commission_paid: number;
  notes?: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string | null;
  customer_email: string;
  amount: number;
  currency: string;
  provider: string;
  provider_reference?: string | null;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded' | 'failed';
  paid_at?: string | null;
  created_at: string;
}

export interface AffiliateProfile {
  id: string;
  user_id: string;
  referral_code: string;
  bank_name?: string;
  bank_account_number?: string;
  bank_account_holder?: string;
  is_active: boolean;
  total_commission_earned: number;
  total_commission_paid: number;
}
