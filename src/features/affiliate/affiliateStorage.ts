// AFFILIATE SYSTEM STORAGE & TRACKING SERVICE
import {
  AffiliateProfile,
  ReferralClick,
  ReferralConversion,
  AffiliatePayout,
  MarketingMaterial,
} from '@/types/database';

const STORAGE_KEYS = {
  PROFILES: 'shopee_academy_affiliate_profiles',
  CLICKS: 'shopee_academy_referral_clicks',
  CONVERSIONS: 'shopee_academy_referral_conversions',
  PAYOUTS: 'shopee_academy_affiliate_payouts',
  ATTRIBUTION: 'shopee_academy_ref_attribution',
};

// 30-Day Attribution Tracking Cookie / Storage Helper
export interface ReferralAttribution {
  referralCode: string;
  source?: string;
  timestamp: number;
}

export function captureReferralParam(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  const src = params.get('src') || undefined;

  if (ref) {
    const cleanRef = ref.trim().toUpperCase();
    const attribution: ReferralAttribution = {
      referralCode: cleanRef,
      source: src,
      timestamp: Date.now(),
    };
    // Save to localStorage (30 days validity)
    localStorage.setItem(STORAGE_KEYS.ATTRIBUTION, JSON.stringify(attribution));

    // Also record click immediately
    recordReferralClick(cleanRef, window.location.href);
    return cleanRef;
  }

  return getActiveAttributionCode();
}

export function getActiveAttributionCode(): string | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEYS.ATTRIBUTION);
  if (!raw) return null;

  try {
    const attribution: ReferralAttribution = JSON.parse(raw);
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    if (Date.now() - attribution.timestamp <= thirtyDaysMs) {
      return attribution.referralCode;
    } else {
      localStorage.removeItem(STORAGE_KEYS.ATTRIBUTION);
      return null;
    }
  } catch (e) {
    return null;
  }
}

// Initial Sample Marketing Swipe Copies & Materials
export const INITIAL_MARKETING_MATERIALS: MarketingMaterial[] = [
  {
    id: 'mat-01',
    title: 'Swipe Copy WhatsApp / Telegram: Problem-Agitate-Solve',
    category: 'swipe_copy',
    sort_order: 1,
    is_published: true,
    copy_text: `Halo teman-teman creator! 👋

Sering ngerasa udah rajin upload video di Shopee Video tapi komisi masih nol koma sekian atau bahkan zonk? 🥲

Ternyata masalahnya bukan di kurang rajin, tapi algoritma Shopee itu butuh naskah terstruktur: Hook 3 detik visual, validasi audiens, & link relevan.

Aku lagi belajar di Shopee Affiliate Academy — panduannya bener-bener teknis (ada 24 modul komprehensif + 6 tools workspace otomatis).

Kamu bisa pelajari selengkapnya di sini ya:
👉 {{AFFILIATE_LINK}}

Investasinya terjangkau banget (cuma Rp99.000 sekali seumur hidup, dapet akses semua tools). Yuk sama-sama naik level! 🚀`,
  },
  {
    id: 'mat-02',
    title: 'Swipe Copy TikTok / Reels: Hook Penasaran & Studi Kasus',
    category: 'swipe_copy',
    sort_order: 2,
    is_published: true,
    copy_text: `Rahasia kenapa affiliate pro bisa dapet komisi jutaan tanpa perang harga murah:

1. Mereka gak promosi sembarang produk (pake 7 faktor scoring terukur).
2. Hook 3 detik pertama bukan omong kosong, tapi bukti demonstrasi nyata.
3. Selalu pantau EPC (Earnings Per Click), bukan cuma views viral!

Semua alur kerjanya lengkap dibongkar di Shopee Affiliate Academy. 
Cek link di bio nomor 01 atau klik di sini:
👉 {{AFFILIATE_LINK}}`,
  },
  {
    id: 'mat-03',
    title: 'Swipe Copy Twitter / X Thread: Framework Praktis',
    category: 'swipe_copy',
    sort_order: 3,
    is_published: true,
    copy_text: `Banyak pemula gagal di Shopee Affiliate karena cuma modal copy-paste link produk diskonan. 

Ini 4 langkah beneran bangun aset affiliate berulang:
1. Niche spesifik (Audiens jelas)
2. Filter toko Star/Mall komisi minimal 5%
3. Naskah 5 bagian (Hook, Masalah, Bukti, Transisi, CTA)
4. Rekonsiliasi mingguan

Dipelajari langsung dari Shopee Affiliate Academy (24 modul, 8 proyek praktik, kalkulator performa bawaan).
Link daftar: {{AFFILIATE_LINK}}`,
  },
  {
    id: 'mat-04',
    title: 'Banner Promosi Editorial 1: Panduan Lengkap Rp99.000',
    category: 'banner',
    content_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80',
    sort_order: 4,
    is_published: true,
    copy_text: 'Banner vertikal 9:16 untuk Instagram Story & WhatsApp Status.',
  },
  {
    id: 'mat-05',
    title: 'Panduan Etika & Regulasi Promosi Kemitraan',
    category: 'guide',
    sort_order: 5,
    is_published: true,
    copy_text: `1. Komisi Affiliate adalah 10% (Rp9.900) dari setiap pembelian Paket Premium Rp99.000.
2. Dilarang melakukan spamming di grup atau kolom komentar publik yang mengganggu.
3. Dilarang melakukan self-purchase (membeli menggunakan kode referral sendiri).
4. Penarikan dana (Payout) minimal Rp50.000 dan diproses ke rekening bank / e-wallet terdaftar setiap hari kerja.`,
  },
];

// Initial Sample Affiliate Profiles
export const INITIAL_AFFILIATE_PROFILES: AffiliateProfile[] = [
  {
    id: 'aff-01',
    user_id: 'default',
    referral_code: 'AKADEMIPRO',
    bank_name: 'BCA (Bank Central Asia)',
    bank_account_number: '8271928491',
    bank_account_holder: 'Siswa Affiliate Pro',
    is_active: true,
    total_commission_earned: 49500, // 5 sales x 9.900
    total_commission_paid: 0,
  },
  {
    id: 'aff-admin',
    user_id: 'admin-001',
    referral_code: 'SUPERADMIN',
    bank_name: 'Bank Mandiri',
    bank_account_number: '137001829102',
    bank_account_holder: 'Admin Shopee Academy',
    is_active: true,
    total_commission_earned: 99000,
    total_commission_paid: 0,
  },
];

// Initial Sample Referral Clicks
export const INITIAL_REFERRAL_CLICKS: ReferralClick[] = [
  {
    id: 'clk-01',
    affiliate_id: 'aff-01',
    ip_hash: 'anon-hash-1',
    user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
    referer_url: 'https://instagram.com',
    created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    id: 'clk-02',
    affiliate_id: 'aff-01',
    ip_hash: 'anon-hash-2',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    referer_url: 'https://wa.me',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'clk-03',
    affiliate_id: 'aff-01',
    ip_hash: 'anon-hash-3',
    user_agent: 'Mozilla/5.0 (Linux; Android 14)',
    referer_url: 'https://tiktok.com',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'clk-04',
    affiliate_id: 'aff-01',
    ip_hash: 'anon-hash-4',
    user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    referer_url: 'https://t.me',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

// Initial Sample Conversions
export const INITIAL_CONVERSIONS: ReferralConversion[] = [
  {
    id: 'conv-01',
    affiliate_id: 'aff-01',
    order_id: 'ord-01',
    order_number: 'ORD-20261024-001',
    customer_email: 'budi.santoso@gmail.com',
    order_amount: 99000,
    commission_rate: 0.1,
    commission_amount: 9900,
    status: 'approved',
    created_at: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
  },
  {
    id: 'conv-02',
    affiliate_id: 'aff-01',
    order_id: 'ord-02',
    order_number: 'ORD-20261024-002',
    customer_email: 'siti.khadijah@gmail.com',
    order_amount: 99000,
    commission_rate: 0.1,
    commission_amount: 9900,
    status: 'approved',
    created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    id: 'conv-03',
    affiliate_id: 'aff-01',
    order_id: 'ord-03',
    order_number: 'ORD-20261025-001',
    customer_email: 'rina.melati@gmail.com',
    order_amount: 99000,
    commission_rate: 0.1,
    commission_amount: 9900,
    status: 'approved',
    created_at: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
  },
  {
    id: 'conv-04',
    affiliate_id: 'aff-01',
    order_id: 'ord-04',
    order_number: 'ORD-20261025-002',
    customer_email: 'fajar.aditya@gmail.com',
    order_amount: 99000,
    commission_rate: 0.1,
    commission_amount: 9900,
    status: 'pending',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'conv-05',
    affiliate_id: 'aff-01',
    order_id: 'ord-05',
    order_number: 'ORD-20261026-001',
    customer_email: 'hendra.wijaya@gmail.com',
    order_amount: 99000,
    commission_rate: 0.1,
    commission_amount: 9900,
    status: 'pending',
    created_at: new Date().toISOString(),
  },
];

// Initial Sample Payouts
export const INITIAL_PAYOUTS: AffiliatePayout[] = [
  {
    id: 'pay-01',
    affiliate_id: 'aff-01',
    amount: 50000,
    status: 'completed',
    bank_name: 'BCA (Bank Central Asia)',
    bank_account_number: '8271928491',
    bank_account_holder: 'Siswa Affiliate Pro',
    admin_notes: 'Transfer sukses via Flip Enterprise ID #82910',
    processed_at: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 24 * 6).toISOString(),
  },
];

// 1. Storage Helpers
export function getStoredAffiliateProfiles(): AffiliateProfile[] {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILES);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(INITIAL_AFFILIATE_PROFILES));
    return INITIAL_AFFILIATE_PROFILES;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_AFFILIATE_PROFILES;
  }
}

export function saveStoredAffiliateProfile(profile: AffiliateProfile): void {
  const list = getStoredAffiliateProfiles();
  const index = list.findIndex((p) => p.user_id === profile.user_id || p.id === profile.id);
  const updated = index >= 0 ? list.map((p, i) => (i === index ? profile : p)) : [profile, ...list];
  localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(updated));
}

export function getOrCreateAffiliateProfile(userId: string, defaultName?: string): AffiliateProfile {
  const profiles = getStoredAffiliateProfiles();
  let found = profiles.find((p) => p.user_id === userId);

  if (!found) {
    const cleanName = (defaultName || 'MEMBER').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 8);
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newCode = `${cleanName || 'PRO'}${randomSuffix}`;

    found = {
      id: `aff-${Date.now()}`,
      user_id: userId,
      referral_code: newCode,
      is_active: true,
      total_commission_earned: 0,
      total_commission_paid: 0,
    };
    saveStoredAffiliateProfile(found);
  }

  return found;
}

// 2. Clicks Storage
export function getStoredReferralClicks(): ReferralClick[] {
  const data = localStorage.getItem(STORAGE_KEYS.CLICKS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.CLICKS, JSON.stringify(INITIAL_REFERRAL_CLICKS));
    return INITIAL_REFERRAL_CLICKS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_REFERRAL_CLICKS;
  }
}

export function recordReferralClick(referralCode: string, refererUrl?: string): void {
  const profiles = getStoredAffiliateProfiles();
  const matched = profiles.find((p) => p.referral_code.toUpperCase() === referralCode.toUpperCase());
  if (!matched) return;

  const newClick: ReferralClick = {
    id: `clk-${Date.now()}`,
    affiliate_id: matched.id,
    ip_hash: `ip-${Math.random().toString(36).substring(7)}`,
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    referer_url: refererUrl || '',
    created_at: new Date().toISOString(),
  };

  const clicks = getStoredReferralClicks();
  localStorage.setItem(STORAGE_KEYS.CLICKS, JSON.stringify([newClick, ...clicks]));
}

// 3. Conversions Storage
export function getStoredReferralConversions(): ReferralConversion[] {
  const data = localStorage.getItem(STORAGE_KEYS.CONVERSIONS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.CONVERSIONS, JSON.stringify(INITIAL_CONVERSIONS));
    return INITIAL_CONVERSIONS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_CONVERSIONS;
  }
}

export function recordReferralConversion(
  orderId: string,
  orderNumber: string,
  customerEmail: string,
  amount: number = 99000
): ReferralConversion | null {
  const refCode = getActiveAttributionCode();
  if (!refCode) return null;

  const profiles = getStoredAffiliateProfiles();
  const matched = profiles.find((p) => p.referral_code.toUpperCase() === refCode.toUpperCase());
  if (!matched) return null;

  const commissionRate = 0.10; // 10%
  const commissionAmount = Math.round(amount * commissionRate);

  const conversion: ReferralConversion = {
    id: `conv-${Date.now()}`,
    affiliate_id: matched.id,
    order_id: orderId,
    order_number: orderNumber,
    customer_email: customerEmail,
    order_amount: amount,
    commission_rate: commissionRate,
    commission_amount: commissionAmount,
    status: 'approved',
    created_at: new Date().toISOString(),
  };

  const list = getStoredReferralConversions();
  localStorage.setItem(STORAGE_KEYS.CONVERSIONS, JSON.stringify([conversion, ...list]));

  // Update Affiliate Profile total earned
  matched.total_commission_earned += commissionAmount;
  saveStoredAffiliateProfile(matched);

  return conversion;
}

// 4. Payouts Storage
export function getStoredAffiliatePayouts(): AffiliatePayout[] {
  const data = localStorage.getItem(STORAGE_KEYS.PAYOUTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.PAYOUTS, JSON.stringify(INITIAL_PAYOUTS));
    return INITIAL_PAYOUTS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_PAYOUTS;
  }
}

export function saveStoredAffiliatePayout(payout: AffiliatePayout): void {
  const list = getStoredAffiliatePayouts();
  const index = list.findIndex((p) => p.id === payout.id);
  const updated = index >= 0 ? list.map((p) => (p.id === payout.id ? payout : p)) : [payout, ...list];
  localStorage.setItem(STORAGE_KEYS.PAYOUTS, JSON.stringify(updated));
}

export function requestAffiliatePayout(
  affiliateId: string,
  amount: number,
  bankDetails: {
    bank_name: string;
    bank_account_number: string;
    bank_account_holder: string;
  }
): { success: boolean; message: string; payout?: AffiliatePayout } {
  if (amount < 50000) {
    return {
      success: false,
      message: 'Batas minimal penarikan dana komisi adalah Rp50.000.',
    };
  }

  const newPayout: AffiliatePayout = {
    id: `pay-${Date.now()}`,
    affiliate_id: affiliateId,
    amount,
    status: 'requested',
    bank_name: bankDetails.bank_name,
    bank_account_number: bankDetails.bank_account_number,
    bank_account_holder: bankDetails.bank_account_holder,
    created_at: new Date().toISOString(),
  };

  saveStoredAffiliatePayout(newPayout);

  // Update profile bank details for future auto-fill
  const profiles = getStoredAffiliateProfiles();
  const profile = profiles.find((p) => p.id === affiliateId);
  if (profile) {
    profile.bank_name = bankDetails.bank_name;
    profile.bank_account_number = bankDetails.bank_account_number;
    profile.bank_account_holder = bankDetails.bank_account_holder;
    saveStoredAffiliateProfile(profile);
  }

  return {
    success: true,
    message: 'Permohonan pencairan dana berhasil diajukan dan sedang diverifikasi admin.',
    payout: newPayout,
  };
}
