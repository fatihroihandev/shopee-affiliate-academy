// WORKSPACE DUAL-LAYER STORAGE ENGINE (LOCAL OPTIMISTIC + SUPABASE POSTGRESQL SYNC)
import {
  AffiliateProduct,
  ContentItem,
  PerformanceRecord,
} from '@/types/database';
import { supabase } from '@/lib/supabase';

export function isRealUser(userId?: string | null): boolean {
  if (!userId) return false;
  return !userId.startsWith('00000000') && userId !== 'default' && userId !== 'current_user';
}

export interface ResearchNoteItem {
  id: string;
  user_id?: string;
  note_type: 'niche' | 'competitor';
  title: string;
  subject: string;
  findings: string;
  evidence_urls: string[];
  observed_at: string;
  facts: string;
  assumptions: string;
  content_gaps: string;
  next_step: string;
}

export interface AffiliateLinkItem {
  id: string;
  user_id?: string;
  product_id?: string;
  product_name?: string;
  shop_name: string;
  url: string;
  platform: string;
  status: 'active' | 'needs_check' | 'unused';
  checked_at: string;
  notes?: string;
}

export interface CommissionPeriodItem {
  id: string;
  user_id?: string;
  period_label: string;
  start_date: string;
  end_date: string;
  clicks: number;
  orders: number;
  commission_approved: number;
  commission_paid: number;
  business_costs: number;
  work_hours: number;
  payout_status: string;
  reconciliation_notes?: string;
}

export interface ExperimentItem {
  id: string;
  user_id?: string;
  name: string;
  goal: string;
  hypothesis: string;
  variable: string;
  primary_metric: string;
  baseline: number;
  result: number;
  start_date: string;
  end_date: string;
  sample_size: number;
  limitations: string;
  decision: 'continue' | 'optimize' | 'retest' | 'deprioritize' | 'stop';
  decision_reason: string;
  lessons: string;
}

export interface SopItem {
  id: string;
  user_id?: string;
  title: string;
  category: string;
  procedure: string;
  last_reviewed_at: string;
  review_notes?: string;
}

// 1. PRODUCT RESEARCH LAB STORAGE
export const INITIAL_PRODUCTS: AffiliateProduct[] = [
  {
    id: 'prod-01',
    user_id: 'default',
    name: 'Wajan Granit Anti Lengket 24cm',
    product_url: 'https://shopee.co.id/product/12345/67890',
    category: 'Peralatan Dapur',
    price: 135000,
    commission_note: 'Komisi 8% (Rp10.800 per transaksi valid)',
    rating: 4.8,
    review_count: 2450,
    checked_at: '2026-10-25',
    score_audience_fit: 5,
    score_quality: 5,
    score_price_value: 4,
    score_commission: 4,
    score_competition: 3,
    score_demo_potential: 5,
    score_availability: 4,
    research_score: 87.5,
    status: 'ready',
    notes: 'Sangat cocok untuk demonstrasi masak telur tanpa minyak di Shopee Video.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-02',
    user_id: 'default',
    name: 'Mic Wireless Clip-On Type-C & Lightning',
    product_url: 'https://shopee.co.id/product/54321/98765',
    category: 'Elektronik & Gadget',
    price: 68000,
    commission_note: 'Komisi 10% (Rp6.800 per transaksi)',
    rating: 4.7,
    review_count: 5120,
    checked_at: '2026-10-24',
    score_audience_fit: 5,
    score_quality: 4,
    score_price_value: 5,
    score_commission: 4,
    score_competition: 4,
    score_demo_potential: 5,
    score_availability: 5,
    research_score: 89.0,
    status: 'testing',
    notes: 'Kandidat evergreen untuk kreator pemula.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-03',
    user_id: 'default',
    name: 'Botol Minum Tumbler Stainless 500ml',
    product_url: 'https://shopee.co.id/product/99999/11111',
    category: 'Perlengkapan Rumah',
    price: 49000,
    commission_note: 'Komisi 5% (Rp2.450)',
    rating: 4.6,
    review_count: 1200,
    checked_at: '2026-10-18',
    score_audience_fit: 4,
    score_quality: 3,
    score_price_value: 3,
    score_commission: 2,
    score_competition: 5,
    score_demo_potential: 3,
    score_availability: 5,
    research_score: 62.0,
    status: 'dropped',
    notes: 'Komisi terlalu kecil dan persaingan perang harga terlalu ketat.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function calculateResearchScore(factors: {
  audience: number;
  quality: number;
  priceValue: number;
  commission: number;
  competition: number;
  demo: number;
  availability: number;
}): number {
  // Weights: Audiens (25%), Kualitas (20%), Nilai Harga (15%), Komisi (15%), Persaingan (10%), Demo (10%), Stok (5%)
  const score =
    (factors.audience / 5) * 25 +
    (factors.quality / 5) * 20 +
    (factors.priceValue / 5) * 15 +
    (factors.commission / 5) * 15 +
    (factors.competition / 5) * 10 +
    (factors.demo / 5) * 10 +
    (factors.availability / 5) * 5;
  return Math.round(score * 10) / 10;
}

export function getStoredProducts(): AffiliateProduct[] {
  const data = localStorage.getItem('shopee_academy_products');
  if (!data) {
    localStorage.setItem('shopee_academy_products', JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_PRODUCTS;
  }
}

export function saveStoredProduct(product: AffiliateProduct, currentUserId?: string): void {
  const finalUserId = (isRealUser(currentUserId) ? currentUserId : product.user_id) || 'default';
  const preparedProduct: AffiliateProduct = {
    ...product,
    user_id: finalUserId,
    updated_at: new Date().toISOString(),
  };

  const list = getStoredProducts();
  const index = list.findIndex((p) => p.id === preparedProduct.id);
  let updated: AffiliateProduct[];
  if (index >= 0) {
    updated = [...list];
    updated[index] = preparedProduct;
  } else {
    updated = [preparedProduct, ...list];
  }
  localStorage.setItem('shopee_academy_products', JSON.stringify(updated));

  // Dual-Layer Cloud Sync
  if (isRealUser(finalUserId)) {
    supabase
      .from('affiliate_products')
      .upsert(
        {
          id: preparedProduct.id,
          user_id: finalUserId,
          name: preparedProduct.name,
          product_url: preparedProduct.product_url,
          category: preparedProduct.category || null,
          price: preparedProduct.price || 0,
          commission_note: preparedProduct.commission_note || null,
          rating: preparedProduct.rating || null,
          review_count: preparedProduct.review_count || 0,
          checked_at: preparedProduct.checked_at || new Date().toISOString().slice(0, 10),
          score_audience_fit: preparedProduct.score_audience_fit || 3,
          score_quality: preparedProduct.score_quality || 3,
          score_price_value: preparedProduct.score_price_value || 3,
          score_commission: preparedProduct.score_commission || 3,
          score_competition: preparedProduct.score_competition || 3,
          score_demo_potential: preparedProduct.score_demo_potential || 3,
          score_availability: preparedProduct.score_availability || 5,
          research_score: preparedProduct.research_score || 0,
          status: preparedProduct.status || 'research',
          notes: preparedProduct.notes || null,
          updated_at: preparedProduct.updated_at,
        },
        { onConflict: 'id' }
      )
      .then(({ error }) => {
        if (error) console.warn('Supabase sync product error:', error.message);
      });
  }
}

export function deleteStoredProduct(id: string, currentUserId?: string): void {
  const list = getStoredProducts().filter((p) => p.id !== id);
  localStorage.setItem('shopee_academy_products', JSON.stringify(list));

  if (isRealUser(currentUserId)) {
    supabase
      .from('affiliate_products')
      .delete()
      .eq('id', id)
      .then(({ error }) => {
        if (error) console.warn('Supabase delete product error:', error.message);
      });
  }
}

export async function syncProductsFromCloud(userId: string): Promise<AffiliateProduct[]> {
  if (!isRealUser(userId)) return getStoredProducts();

  try {
    const { data, error } = await supabase
      .from('affiliate_products')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const localList = getStoredProducts();
      const nonUserData = localList.filter((p) => p.user_id !== userId && p.user_id !== 'default');
      const merged = [...data, ...nonUserData];
      localStorage.setItem('shopee_academy_products', JSON.stringify(merged));
      return merged;
    }
  } catch (e) {
    console.warn('Fallback to local products cache');
  }
  return getStoredProducts();
}

// 2. RESEARCH NOTES STORAGE
export const INITIAL_RESEARCH_NOTES: ResearchNoteItem[] = [
  {
    id: 'note-01',
    note_type: 'niche',
    title: 'Riset Audiens: Ibu Muda Praktis & Pekerja WFH',
    subject: 'Niche Perlengkapan Dapur Praktis',
    findings: 'Banyak ibu muda mengeluhkan waktu memasak yang sempit di pagi hari dan kerepotan mencuci wajan berminyak.',
    evidence_urls: ['https://tiktok.com/@sample/video/12345'],
    observed_at: '2026-10-25',
    facts: 'Lebih dari 40 komentar di video viral menanyakan: "Apakah wajannya lengket kalau tanpa minyak?"',
    assumptions: 'Mereka rela membayar Rp100.000 - Rp150.000 jika wajan benar-benar mudah dibersihkan.',
    content_gaps: 'Belum ada video yang mendemonstrasikan masak telur ceplok langsung dibersihkan hanya dengan lap tisu.',
    next_step: 'Buat video demo masak telur tanpa minyak dan lap tisu dalam 10 detik.',
  },
  {
    id: 'note-02',
    note_type: 'competitor',
    title: 'Audit Kompetitor: Akun @DapurMinimalis',
    subject: 'Kompetitor Niche Dapur',
    findings: 'Akun ini punya 80k followers tapi kualitas audio videonya sering bergema dan CTA-nya terlalu terburu-buru.',
    evidence_urls: ['https://tiktok.com/@dapurminimalis'],
    observed_at: '2026-10-24',
    facts: 'Rata-rata views 5.000 - 15.000 per video, format video estetik dengan background musik santai.',
    assumptions: 'Penonton sering tidak tahu nomor etalase/bio mana yang harus diklik.',
    content_gaps: 'Kompetitor tidak mencantumkan petunjuk nomor etalase di layar secara jelas.',
    next_step: 'Tambahkan teks overlay nomor link dan uji mic clip-on agar suara masak lebih renyah (ASMR).',
  },
];

export function getStoredResearchNotes(): ResearchNoteItem[] {
  const data = localStorage.getItem('shopee_academy_research_notes');
  if (!data) {
    localStorage.setItem('shopee_academy_research_notes', JSON.stringify(INITIAL_RESEARCH_NOTES));
    return INITIAL_RESEARCH_NOTES;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_RESEARCH_NOTES;
  }
}

export function saveStoredResearchNote(note: ResearchNoteItem, currentUserId?: string): void {
  const finalUserId = (isRealUser(currentUserId) ? currentUserId : note.user_id) || 'default';
  const preparedNote: ResearchNoteItem = {
    ...note,
    user_id: finalUserId,
  };
  const list = getStoredResearchNotes();
  const index = list.findIndex((n) => n.id === preparedNote.id);
  const updated = index >= 0 ? list.map((n) => (n.id === preparedNote.id ? preparedNote : n)) : [preparedNote, ...list];
  localStorage.setItem('shopee_academy_research_notes', JSON.stringify(updated));

  if (isRealUser(finalUserId)) {
    supabase
      .from('research_notes')
      .upsert(
        {
          id: preparedNote.id,
          user_id: finalUserId,
          note_type: preparedNote.note_type,
          title: preparedNote.title,
          subject: preparedNote.subject,
          findings: preparedNote.findings || null,
          evidence_urls: preparedNote.evidence_urls || [],
          observed_at: preparedNote.observed_at || new Date().toISOString().slice(0, 10),
          facts: preparedNote.facts || null,
          assumptions: preparedNote.assumptions || null,
          content_gaps: preparedNote.content_gaps || null,
          next_step: preparedNote.next_step || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .then(({ error }) => {
        if (error) console.warn('Supabase sync research note error:', error.message);
      });
  }
}

export function deleteStoredResearchNote(id: string, currentUserId?: string): void {
  const list = getStoredResearchNotes().filter((n) => n.id !== id);
  localStorage.setItem('shopee_academy_research_notes', JSON.stringify(list));

  if (isRealUser(currentUserId)) {
    supabase
      .from('research_notes')
      .delete()
      .eq('id', id)
      .then(({ error }) => {
        if (error) console.warn('Supabase delete research note error:', error.message);
      });
  }
}

export async function syncResearchNotesFromCloud(userId: string): Promise<ResearchNoteItem[]> {
  if (!isRealUser(userId)) return getStoredResearchNotes();

  try {
    const { data, error } = await supabase
      .from('research_notes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const localList = getStoredResearchNotes();
      const nonUserData = localList.filter((n) => n.user_id !== userId && n.user_id !== 'default');
      const merged = [...data, ...nonUserData];
      localStorage.setItem('shopee_academy_research_notes', JSON.stringify(merged));
      return merged;
    }
  } catch (e) {
    console.warn('Fallback to local research notes cache');
  }
  return getStoredResearchNotes();
}

// 3. CONTENT STUDIO STORAGE
export const INITIAL_CONTENT_ITEMS: ContentItem[] = [
  {
    id: 'cnt-01',
    user_id: 'default',
    product_id: 'prod-01',
    title: 'Tes Masak Telur Tanpa Minyak: Beneran Gak Lengket?',
    platform: 'Shopee Video',
    pillar: 'Demonstrasi Produk',
    format: 'Video Vertikal (9:16)',
    hook_type: 'demonstrasi',
    hook: 'Liat bedanya sebelum vs sesudah pake wajan granit ini dalam 5 detik...',
    angle: 'Bukti visual masak telur tanpa minyak dan lap tisu.',
    script:
      'Hook: Liat nih, telur ceplok tanpa minyak sama sekali, lengket nggak?...\nKonteks: Ini wajan granit 24cm yang lagi rame.\nIsi: Masak api sedang 2 menit, geser pake spatula lancar jaya.\nCTA: Yang mau samaan, link ada di keranjang oranye nomor 01 ya!\nDisclosure: Video ini memuat tautan affiliate resmi.',
    cta: 'Klik keranjang oranye nomor 01 sekarang sebelum voucher diskon habis!',
    has_disclosure: true,
    qc_checklist: {
      authentic: true,
      audio_quality: true,
      cta_clear: true,
      disclosure_present: true,
    },
    status: 'published',
    scheduled_at: '2026-10-25T08:00:00Z',
    published_at: '2026-10-25T08:30:00Z',
    content_url: 'https://shopee.co.id/universal-link/video/12345',
  },
  {
    id: 'cnt-02',
    user_id: 'default',
    product_id: 'prod-02',
    title: 'Mic Clip-On 60 Ribuan vs Mic HP Biasa di Tempat Ramai',
    platform: 'TikTok',
    pillar: 'Komparasi & Solusi',
    format: 'Video Vertikal (9:16)',
    hook_type: 'komparasi',
    hook: 'Mic harga 60 ribu vs mic HP di pinggir jalan raya: Mana yang lebih jernih?',
    angle: 'Stress-test suara di pinggir jalan raya berisik.',
    script: 'Hook: Tes audio pinggir jalan...\nIsi: Komparasi A vs B...\nCTA: Link ada di bio nomor 02!',
    cta: 'Cek link nomor 02 di bio untuk toko yang garansi 1 tahun!',
    has_disclosure: true,
    status: 'ready',
    scheduled_at: '2026-10-27T10:00:00Z',
  },
];

export function getStoredContentItems(): ContentItem[] {
  const data = localStorage.getItem('shopee_academy_content_items');
  if (!data) {
    localStorage.setItem('shopee_academy_content_items', JSON.stringify(INITIAL_CONTENT_ITEMS));
    return INITIAL_CONTENT_ITEMS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_CONTENT_ITEMS;
  }
}

export function saveStoredContentItem(item: ContentItem, currentUserId?: string): void {
  const finalUserId = (isRealUser(currentUserId) ? currentUserId : item.user_id) || 'default';
  const preparedItem: ContentItem = {
    ...item,
    user_id: finalUserId,
  };
  const list = getStoredContentItems();
  const index = list.findIndex((c) => c.id === preparedItem.id);
  const updated = index >= 0 ? list.map((c) => (c.id === preparedItem.id ? preparedItem : c)) : [preparedItem, ...list];
  localStorage.setItem('shopee_academy_content_items', JSON.stringify(updated));

  if (isRealUser(finalUserId)) {
    supabase
      .from('content_items')
      .upsert(
        {
          id: preparedItem.id,
          user_id: finalUserId,
          product_id: preparedItem.product_id || null,
          link_id: preparedItem.link_id || null,
          title: preparedItem.title,
          platform: preparedItem.platform,
          pillar: preparedItem.pillar || null,
          format: preparedItem.format || null,
          hook_type: preparedItem.hook_type || null,
          hook: preparedItem.hook || null,
          angle: preparedItem.angle || null,
          script: preparedItem.script || null,
          cta: preparedItem.cta || null,
          has_disclosure: preparedItem.has_disclosure,
          qc_checklist: preparedItem.qc_checklist || {},
          status: preparedItem.status || 'idea',
          scheduled_at: preparedItem.scheduled_at || null,
          published_at: preparedItem.published_at || null,
          content_url: preparedItem.content_url || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .then(({ error }) => {
        if (error) console.warn('Supabase sync content item error:', error.message);
      });
  }
}

export function deleteStoredContentItem(id: string, currentUserId?: string): void {
  const list = getStoredContentItems().filter((c) => c.id !== id);
  localStorage.setItem('shopee_academy_content_items', JSON.stringify(list));

  if (isRealUser(currentUserId)) {
    supabase
      .from('content_items')
      .delete()
      .eq('id', id)
      .then(({ error }) => {
        if (error) console.warn('Supabase delete content item error:', error.message);
      });
  }
}

export async function syncContentItemsFromCloud(userId: string): Promise<ContentItem[]> {
  if (!isRealUser(userId)) return getStoredContentItems();

  try {
    const { data, error } = await supabase
      .from('content_items')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const localList = getStoredContentItems();
      const nonUserData = localList.filter((c) => c.user_id !== userId && c.user_id !== 'default');
      const merged = [...data, ...nonUserData];
      localStorage.setItem('shopee_academy_content_items', JSON.stringify(merged));
      return merged;
    }
  } catch (e) {
    console.warn('Fallback to local content items cache');
  }
  return getStoredContentItems();
}

// 4. LINK ARCHIVE STORAGE
export const INITIAL_AFFILIATE_LINKS: AffiliateLinkItem[] = [
  {
    id: 'lnk-01',
    product_id: 'prod-01',
    product_name: 'Wajan Granit Anti Lengket 24cm',
    shop_name: 'DapurKitchen Official Mall',
    url: 'https://shope.ee/sampleLinkWajan01',
    platform: 'Shopee Affiliate Universal Link',
    status: 'active',
    checked_at: '2026-10-25',
    notes: 'Toko Star+ terverifikasi, rating toko 4.9, stok di atas 500 pcs.',
  },
  {
    id: 'lnk-02',
    product_id: 'prod-02',
    product_name: 'Mic Wireless Clip-On Type-C & Lightning',
    shop_name: 'GadgetPro ID Store',
    url: 'https://shope.ee/sampleLinkMic02',
    platform: 'Shopee Affiliate Universal Link',
    status: 'active',
    checked_at: '2026-10-24',
    notes: 'Termasuk adapter dual konektor iPhone dan Android.',
  },
];

export function getStoredAffiliateLinks(): AffiliateLinkItem[] {
  const data = localStorage.getItem('shopee_academy_links');
  if (!data) {
    localStorage.setItem('shopee_academy_links', JSON.stringify(INITIAL_AFFILIATE_LINKS));
    return INITIAL_AFFILIATE_LINKS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_AFFILIATE_LINKS;
  }
}

export function saveStoredAffiliateLink(link: AffiliateLinkItem, currentUserId?: string): void {
  const finalUserId = (isRealUser(currentUserId) ? currentUserId : link.user_id) || 'default';
  const preparedLink: AffiliateLinkItem = {
    ...link,
    user_id: finalUserId,
  };
  const list = getStoredAffiliateLinks();
  const index = list.findIndex((l) => l.id === preparedLink.id);
  const updated = index >= 0 ? list.map((l) => (l.id === preparedLink.id ? preparedLink : l)) : [preparedLink, ...list];
  localStorage.setItem('shopee_academy_links', JSON.stringify(updated));

  if (isRealUser(finalUserId)) {
    supabase
      .from('affiliate_links')
      .upsert(
        {
          id: preparedLink.id,
          user_id: finalUserId,
          product_id: preparedLink.product_id || null,
          shop_name: preparedLink.shop_name || null,
          url: preparedLink.url,
          platform: preparedLink.platform,
          status: preparedLink.status || 'active',
          checked_at: preparedLink.checked_at || new Date().toISOString().slice(0, 10),
          notes: preparedLink.notes || null,
        },
        { onConflict: 'id' }
      )
      .then(({ error }) => {
        if (error) console.warn('Supabase sync affiliate link error:', error.message);
      });
  }
}

export function deleteStoredAffiliateLink(id: string, currentUserId?: string): void {
  const list = getStoredAffiliateLinks().filter((l) => l.id !== id);
  localStorage.setItem('shopee_academy_links', JSON.stringify(list));

  if (isRealUser(currentUserId)) {
    supabase
      .from('affiliate_links')
      .delete()
      .eq('id', id)
      .then(({ error }) => {
        if (error) console.warn('Supabase delete affiliate link error:', error.message);
      });
  }
}

export async function syncAffiliateLinksFromCloud(userId: string): Promise<AffiliateLinkItem[]> {
  if (!isRealUser(userId)) return getStoredAffiliateLinks();

  try {
    const { data, error } = await supabase
      .from('affiliate_links')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const localList = getStoredAffiliateLinks();
      const nonUserData = localList.filter((l) => l.user_id !== userId && l.user_id !== 'default');
      const merged = [...data, ...nonUserData];
      localStorage.setItem('shopee_academy_links', JSON.stringify(merged));
      return merged;
    }
  } catch (e) {
    console.warn('Fallback to local affiliate links cache');
  }
  return getStoredAffiliateLinks();
}

// 5. PERFORMANCE TRACKER STORAGE
export const INITIAL_PERFORMANCE_RECORDS: PerformanceRecord[] = [
  {
    id: 'perf-01',
    user_id: 'default',
    content_item_id: 'cnt-01',
    record_date: '2026-10-25',
    views: 12400,
    clicks: 580,
    orders: 18,
    cancelled_orders: 1,
    qualified_orders: 17,
    commission_estimated: 194400,
    commission_pending: 194400,
    commission_approved: 183600,
    commission_paid: 0,
    notes: 'CTR tinggi (4.7%) berkat hook visual ceplok telur.',
  },
  {
    id: 'perf-02',
    user_id: 'default',
    content_item_id: 'cnt-01',
    record_date: '2026-10-26',
    views: 8900,
    clicks: 410,
    orders: 12,
    cancelled_orders: 0,
    qualified_orders: 12,
    commission_estimated: 129600,
    commission_pending: 129600,
    commission_approved: 129600,
    commission_paid: 0,
    notes: 'Pertahankan format demonstrasi.',
  },
];

export function getStoredPerformanceRecords(): PerformanceRecord[] {
  const data = localStorage.getItem('shopee_academy_performance_records');
  if (!data) {
    localStorage.setItem('shopee_academy_performance_records', JSON.stringify(INITIAL_PERFORMANCE_RECORDS));
    return INITIAL_PERFORMANCE_RECORDS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_PERFORMANCE_RECORDS;
  }
}

export function saveStoredPerformanceRecord(record: PerformanceRecord, currentUserId?: string): void {
  const finalUserId = (isRealUser(currentUserId) ? currentUserId : record.user_id) || 'default';
  const preparedRecord: PerformanceRecord = {
    ...record,
    user_id: finalUserId,
  };
  const list = getStoredPerformanceRecords();
  const index = list.findIndex((r) => r.id === preparedRecord.id);
  const updated = index >= 0 ? list.map((r) => (r.id === preparedRecord.id ? preparedRecord : r)) : [preparedRecord, ...list];
  localStorage.setItem('shopee_academy_performance_records', JSON.stringify(updated));

  if (isRealUser(finalUserId)) {
    supabase
      .from('performance_records')
      .upsert(
        {
          id: preparedRecord.id,
          user_id: finalUserId,
          content_item_id: preparedRecord.content_item_id,
          record_date: preparedRecord.record_date,
          views: preparedRecord.views || 0,
          clicks: preparedRecord.clicks || 0,
          orders: preparedRecord.orders || 0,
          cancelled_orders: preparedRecord.cancelled_orders || 0,
          qualified_orders: preparedRecord.qualified_orders || 0,
          commission_estimated: preparedRecord.commission_estimated || 0,
          commission_pending: preparedRecord.commission_pending || 0,
          commission_approved: preparedRecord.commission_approved || 0,
          commission_paid: preparedRecord.commission_paid || 0,
          notes: preparedRecord.notes || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .then(({ error }) => {
        if (error) console.warn('Supabase sync performance record error:', error.message);
      });
  }
}

export async function syncPerformanceRecordsFromCloud(userId: string): Promise<PerformanceRecord[]> {
  if (!isRealUser(userId)) return getStoredPerformanceRecords();

  try {
    const { data, error } = await supabase
      .from('performance_records')
      .select('*')
      .eq('user_id', userId)
      .order('record_date', { ascending: false });

    if (!error && data && data.length > 0) {
      const localList = getStoredPerformanceRecords();
      const nonUserData = localList.filter((r) => r.user_id !== userId && r.user_id !== 'default');
      const merged = [...data, ...nonUserData];
      localStorage.setItem('shopee_academy_performance_records', JSON.stringify(merged));
      return merged;
    }
  } catch (e) {
    console.warn('Fallback to local performance records cache');
  }
  return getStoredPerformanceRecords();
}

// 6. EXPERIMENTS STORAGE
export const INITIAL_EXPERIMENTS: ExperimentItem[] = [
  {
    id: 'exp-01',
    name: 'Uji Hook Masalah vs Hook Visual Ceplok Telur',
    goal: 'Meningkatkan CTR dari baseline 3.0% menjadi di atas 4.5%',
    hypothesis:
      'Perubahan: Kalimat pembuka diganti demonstrasi ceplok telur langsung.\nAlasan: Penonton lebih cepat terdorong oleh bukti visual dibanding narasi masalah.\nMetrik: CTR tayangan ke klik.\nKriteria: Jika CTR > 4.5% dalam 3.000 views pertama, lanjutkan format ini.',
    variable: '3 Detik Pertama Video (Hook)',
    primary_metric: 'CTR (Click-Through Rate)',
    baseline: 3.1,
    result: 4.7,
    start_date: '2026-10-24',
    end_date: '2026-10-26',
    sample_size: 12400,
    limitations: 'Video diunggah di jam prime time malam hari.',
    decision: 'continue',
    decision_reason: 'Hasil CTR 4.7% melampaui target baseline 4.5% dengan sampel views signifikan.',
    lessons: 'Selalu dahulukan visual sebelum kata-kata untuk produk perlengkapan rumah tangga.',
  },
];

export function getStoredExperiments(): ExperimentItem[] {
  const data = localStorage.getItem('shopee_academy_experiments');
  if (!data) {
    localStorage.setItem('shopee_academy_experiments', JSON.stringify(INITIAL_EXPERIMENTS));
    return INITIAL_EXPERIMENTS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_EXPERIMENTS;
  }
}

export function saveStoredExperiment(exp: ExperimentItem, currentUserId?: string): void {
  const finalUserId = (isRealUser(currentUserId) ? currentUserId : exp.user_id) || 'default';
  const preparedExp: ExperimentItem = {
    ...exp,
    user_id: finalUserId,
  };
  const list = getStoredExperiments();
  const index = list.findIndex((e) => e.id === preparedExp.id);
  const updated = index >= 0 ? list.map((e) => (e.id === preparedExp.id ? preparedExp : e)) : [preparedExp, ...list];
  localStorage.setItem('shopee_academy_experiments', JSON.stringify(updated));

  if (isRealUser(finalUserId)) {
    supabase
      .from('experiments')
      .upsert(
        {
          id: preparedExp.id,
          user_id: finalUserId,
          name: preparedExp.name,
          goal: preparedExp.goal,
          hypothesis: preparedExp.hypothesis,
          variable: preparedExp.variable,
          primary_metric: preparedExp.primary_metric,
          baseline: preparedExp.baseline || 0,
          result: preparedExp.result || 0,
          start_date: preparedExp.start_date,
          end_date: preparedExp.end_date || preparedExp.start_date,
          sample_size: preparedExp.sample_size || null,
          limitations: preparedExp.limitations || null,
          decision: preparedExp.decision || null,
          decision_reason: preparedExp.decision_reason || null,
          lessons: preparedExp.lessons || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .then(({ error }) => {
        if (error) console.warn('Supabase sync experiment error:', error.message);
      });
  }
}

export function deleteStoredExperiment(id: string, currentUserId?: string): void {
  const list = getStoredExperiments().filter((e) => e.id !== id);
  localStorage.setItem('shopee_academy_experiments', JSON.stringify(list));

  if (isRealUser(currentUserId)) {
    supabase
      .from('experiments')
      .delete()
      .eq('id', id)
      .then(({ error }) => {
        if (error) console.warn('Supabase delete experiment error:', error.message);
      });
  }
}

export async function syncExperimentsFromCloud(userId: string): Promise<ExperimentItem[]> {
  if (!isRealUser(userId)) return getStoredExperiments();

  try {
    const { data, error } = await supabase
      .from('experiments')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const localList = getStoredExperiments();
      const nonUserData = localList.filter((e) => e.user_id !== userId && e.user_id !== 'default');
      const merged = [...data, ...nonUserData];
      localStorage.setItem('shopee_academy_experiments', JSON.stringify(merged));
      return merged;
    }
  } catch (e) {
    console.warn('Fallback to local experiments cache');
  }
  return getStoredExperiments();
}

// 7. SOP DOCUMENTS STORAGE
export const INITIAL_SOPS: SopItem[] = [
  {
    id: 'sop-01',
    title: 'SOP 01: Verifikasi Produk & Kepatuhan Toko Sebelum Syuting',
    category: 'Riset & Verifikasi',
    procedure:
      '1. Buka Shopee Affiliate Dashboard, cari produk di tab Penawaran.\n2. Pastikan toko berstatus Star+ atau Shopee Mall.\n3. Periksa persentase komisi dan pastikan minimal 5%.\n4. Cek tanggal ulasan terbaru, pastikan ada ulasan bintang 5 dalam 7 hari terakhir.\n5. Simpan tautan di Link Archive sebelum membuat naskah.',
    last_reviewed_at: '2026-10-26',
    review_notes: 'Wajib ditaati untuk mencegah promosi toko yang libur/habis stok.',
  },
  {
    id: 'sop-02',
    title: 'SOP 02: Pengecekan 11 Butir QC Sebelum Publikasi Video',
    category: 'Produksi Konten',
    procedure:
      '1. Format video rasio 9:16 vertikal.\n2. Cek audio: suara narasi jelas, volume musik latar maks 15%.\n3. Text overlay nomor link/bio terlihat jelas minimal 3 detik.\n4. Cantumkan penanda "Affiliate Link" di deskripsi/komentar tersemat.\n5. Tes klik tautan di perangkat berbeda untuk memastikan halaman toko terbuka.',
    last_reviewed_at: '2026-10-26',
    review_notes: 'Mencegah pelanggaran aturan hak cipta dan memastikan link teratribusi.',
  },
];

export function getStoredSops(): SopItem[] {
  const data = localStorage.getItem('shopee_academy_sops');
  if (!data) {
    localStorage.setItem('shopee_academy_sops', JSON.stringify(INITIAL_SOPS));
    return INITIAL_SOPS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_SOPS;
  }
}

export function saveStoredSop(sop: SopItem, currentUserId?: string): void {
  const finalUserId = (isRealUser(currentUserId) ? currentUserId : sop.user_id) || 'default';
  const preparedSop: SopItem = {
    ...sop,
    user_id: finalUserId,
  };
  const list = getStoredSops();
  const index = list.findIndex((s) => s.id === preparedSop.id);
  const updated = index >= 0 ? list.map((s) => (s.id === preparedSop.id ? preparedSop : s)) : [preparedSop, ...list];
  localStorage.setItem('shopee_academy_sops', JSON.stringify(updated));

  if (isRealUser(finalUserId)) {
    supabase
      .from('sop_documents')
      .upsert(
        {
          id: preparedSop.id,
          user_id: finalUserId,
          title: preparedSop.title,
          category: preparedSop.category,
          procedure: preparedSop.procedure,
          last_reviewed_at: preparedSop.last_reviewed_at || new Date().toISOString().slice(0, 10),
          review_notes: preparedSop.review_notes || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .then(({ error }) => {
        if (error) console.warn('Supabase sync sop error:', error.message);
      });
  }
}

export function deleteStoredSop(id: string, currentUserId?: string): void {
  const list = getStoredSops().filter((s) => s.id !== id);
  localStorage.setItem('shopee_academy_sops', JSON.stringify(list));

  if (isRealUser(currentUserId)) {
    supabase
      .from('sop_documents')
      .delete()
      .eq('id', id)
      .then(({ error }) => {
        if (error) console.warn('Supabase delete sop error:', error.message);
      });
  }
}

export async function syncSopsFromCloud(userId: string): Promise<SopItem[]> {
  if (!isRealUser(userId)) return getStoredSops();

  try {
    const { data, error } = await supabase
      .from('sop_documents')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const localList = getStoredSops();
      const nonUserData = localList.filter((s) => s.user_id !== userId && s.user_id !== 'default');
      const merged = [...data, ...nonUserData];
      localStorage.setItem('shopee_academy_sops', JSON.stringify(merged));
      return merged;
    }
  } catch (e) {
    console.warn('Fallback to local sops cache');
  }
  return getStoredSops();
}
