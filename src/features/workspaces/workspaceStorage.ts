// WORKSPACE LOCAL STORAGE HELPER WITH REALISTIC INITIAL SAMPLES
import {
  AffiliateProduct,
  ContentItem,
  PerformanceRecord,
} from '@/types/database';

export interface ResearchNoteItem {
  id: string;
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

export function saveStoredProduct(product: AffiliateProduct): void {
  const list = getStoredProducts();
  const index = list.findIndex((p) => p.id === product.id);
  let updated: AffiliateProduct[];
  if (index >= 0) {
    updated = [...list];
    updated[index] = { ...product, updated_at: new Date().toISOString() };
  } else {
    updated = [product, ...list];
  }
  localStorage.setItem('shopee_academy_products', JSON.stringify(updated));
}

export function deleteStoredProduct(id: string): void {
  const list = getStoredProducts().filter((p) => p.id !== id);
  localStorage.setItem('shopee_academy_products', JSON.stringify(list));
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

export function saveStoredResearchNote(note: ResearchNoteItem): void {
  const list = getStoredResearchNotes();
  const index = list.findIndex((n) => n.id === note.id);
  const updated = index >= 0 ? list.map((n) => (n.id === note.id ? note : n)) : [note, ...list];
  localStorage.setItem('shopee_academy_research_notes', JSON.stringify(updated));
}

export function deleteStoredResearchNote(id: string): void {
  const list = getStoredResearchNotes().filter((n) => n.id !== id);
  localStorage.setItem('shopee_academy_research_notes', JSON.stringify(list));
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

export function saveStoredContentItem(item: ContentItem): void {
  const list = getStoredContentItems();
  const index = list.findIndex((c) => c.id === item.id);
  const updated = index >= 0 ? list.map((c) => (c.id === item.id ? item : c)) : [item, ...list];
  localStorage.setItem('shopee_academy_content_items', JSON.stringify(updated));
}

export function deleteStoredContentItem(id: string): void {
  const list = getStoredContentItems().filter((c) => c.id !== id);
  localStorage.setItem('shopee_academy_content_items', JSON.stringify(list));
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

export function saveStoredAffiliateLink(link: AffiliateLinkItem): void {
  const list = getStoredAffiliateLinks();
  const index = list.findIndex((l) => l.id === link.id);
  const updated = index >= 0 ? list.map((l) => (l.id === link.id ? link : l)) : [link, ...list];
  localStorage.setItem('shopee_academy_links', JSON.stringify(updated));
}

export function deleteStoredAffiliateLink(id: string): void {
  const list = getStoredAffiliateLinks().filter((l) => l.id !== id);
  localStorage.setItem('shopee_academy_links', JSON.stringify(list));
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

export function saveStoredPerformanceRecord(record: PerformanceRecord): void {
  const list = getStoredPerformanceRecords();
  const index = list.findIndex((r) => r.id === record.id);
  const updated = index >= 0 ? list.map((r) => (r.id === record.id ? record : r)) : [record, ...list];
  localStorage.setItem('shopee_academy_performance_records', JSON.stringify(updated));
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

export function saveStoredExperiment(exp: ExperimentItem): void {
  const list = getStoredExperiments();
  const index = list.findIndex((e) => e.id === exp.id);
  const updated = index >= 0 ? list.map((e) => (e.id === exp.id ? exp : e)) : [exp, ...list];
  localStorage.setItem('shopee_academy_experiments', JSON.stringify(updated));
}

export function deleteStoredExperiment(id: string): void {
  const list = getStoredExperiments().filter((e) => e.id !== id);
  localStorage.setItem('shopee_academy_experiments', JSON.stringify(list));
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

export function saveStoredSop(sop: SopItem): void {
  const list = getStoredSops();
  const index = list.findIndex((s) => s.id === sop.id);
  const updated = index >= 0 ? list.map((s) => (s.id === sop.id ? sop : s)) : [sop, ...list];
  localStorage.setItem('shopee_academy_sops', JSON.stringify(updated));
}

export function deleteStoredSop(id: string): void {
  const list = getStoredSops().filter((s) => s.id !== id);
  localStorage.setItem('shopee_academy_sops', JSON.stringify(list));
}
