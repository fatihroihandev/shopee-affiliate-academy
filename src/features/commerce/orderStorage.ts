// ORDER, ENTITLEMENT & ADMIN AUDIT STORAGE ENGINE
import { Order, Entitlement, AdminAuditLog, ProductSku, ProductTier } from '@/types/database';
import {
  recordReferralConversion,
  getStoredAffiliatePayouts,
  saveStoredAffiliatePayout,
} from '@/features/affiliate/affiliateStorage';

const STORAGE_KEYS = {
  ORDERS: 'shopee_academy_orders',
  ENTITLEMENTS: 'shopee_academy_entitlements',
  AUDIT_LOGS: 'shopee_academy_admin_audit_logs',
};

// Official Product Catalog per Addendum v2.1
export interface ProductCatalogItem {
  sku: ProductSku;
  name: string;
  tier: ProductTier;
  promoPrice: number;
  regularPrice: number;
  features: string[];
}

export const CATALOG_PRODUCTS: Record<ProductSku, ProductCatalogItem> = {
  affiliate_academy_pro: {
    sku: 'affiliate_academy_pro',
    name: 'Shopee Affiliate Academy — Paket Pro',
    tier: 'pro',
    promoPrice: 99000,
    regularPrice: 149000,
    features: [
      'Seluruh 24 Modul Materi Lengkap (Level 1–5)',
      '30 Pelajaran Platform & 8 Proyek Praktik Wajib',
      'Akses Penuh 6 Workspace Praktik Terintegrasi',
      'Hook Bank 30+ Formula & Generator Skrip Konten',
      'Akses Program Affiliate Internal Komisi 10%',
      'Hak Akses Jangka Panjang Sekali Bayar',
    ],
  },
  affiliate_academy_pro_plus: {
    sku: 'affiliate_academy_pro_plus',
    name: 'Shopee Affiliate Academy — Paket Pro Plus',
    tier: 'pro_plus',
    promoPrice: 199000,
    regularPrice: 249000,
    features: [
      'Seluruh Hak Akses Paket Pro Tanpa Terkecuali',
      'Bonus 1: Affiliate Campaign-in-a-Box (Paket Kampanye Siap Eksekusi)',
      'Bonus 2: Affiliate Case Study Lab (2+ Studi Kasus Analisis Bukti)',
      'Bonus 3: Content Angle & Objection Playbook (Matriks Sudut & Keberatan)',
      'Tanpa Ketergantungan API AI Berbayar',
      'Hak Akses Jangka Panjang Sekali Bayar',
    ],
  },
};

// Initial Sample Orders
export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-01',
    order_number: 'ORD-20261024-001',
    user_id: 'default',
    customer_email: 'budi.santoso@gmail.com',
    amount: 99000,
    currency: 'IDR',
    provider: 'dana_qris',
    provider_reference: 'QRIS-DANA-891021',
    status: 'paid',
    paid_at: '2026-10-24T10:15:00Z',
    created_at: '2026-10-24T10:10:00Z',
  },
  {
    id: 'ord-02',
    order_number: 'ORD-20261024-002',
    user_id: 'usr-02',
    customer_email: 'siti.khadijah@gmail.com',
    amount: 99000,
    currency: 'IDR',
    provider: 'lynk',
    provider_reference: 'LYNK-TX-9921',
    status: 'paid',
    paid_at: '2026-10-24T14:30:00Z',
    created_at: '2026-10-24T14:20:00Z',
  },
  {
    id: 'ord-03',
    order_number: 'ORD-20261025-001',
    user_id: 'usr-03',
    customer_email: 'rina.melati@gmail.com',
    amount: 99000,
    currency: 'IDR',
    provider: 'manual',
    provider_reference: 'TRF-BCA-5512',
    status: 'paid',
    paid_at: '2026-10-25T09:00:00Z',
    created_at: '2026-10-25T08:45:00Z',
  },
  {
    id: 'ord-04',
    order_number: 'ORD-20261025-002',
    user_id: 'usr-04',
    customer_email: 'fajar.aditya@gmail.com',
    amount: 99000,
    currency: 'IDR',
    provider: 'dana_qris',
    provider_reference: 'QRIS-DANA-11029',
    status: 'pending',
    paid_at: null,
    created_at: '2026-10-25T16:20:00Z',
  },
  {
    id: 'ord-05',
    order_number: 'ORD-20261026-001',
    user_id: 'usr-05',
    customer_email: 'hendra.wijaya@gmail.com',
    amount: 99000,
    currency: 'IDR',
    provider: 'lynk',
    provider_reference: 'LYNK-TX-3381',
    status: 'pending',
    paid_at: null,
    created_at: new Date().toISOString(),
  },
];

// Initial Sample Entitlements
export const INITIAL_ENTITLEMENTS: Entitlement[] = [
  {
    id: 'ent-01',
    user_id: 'default',
    product_code: 'affiliate_academy',
    access_level: 'premium',
    status: 'active',
    source_order_id: 'ord-01',
    granted_at: '2026-10-24T10:15:00Z',
  },
  {
    id: 'ent-02',
    user_id: 'usr-02',
    product_code: 'affiliate_academy',
    access_level: 'premium',
    status: 'active',
    source_order_id: 'ord-02',
    granted_at: '2026-10-24T14:30:00Z',
  },
  {
    id: 'ent-03',
    user_id: 'usr-03',
    product_code: 'affiliate_academy',
    access_level: 'premium',
    status: 'active',
    source_order_id: 'ord-03',
    granted_at: '2026-10-25T09:00:00Z',
  },
];

// Initial Audit Logs
export const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'log-01',
    admin_user_id: 'admin-001',
    action: 'ORDER_VERIFIED_AND_ENTITLEMENT_GRANTED',
    target_user_id: 'usr-03',
    related_order_id: 'ord-03',
    reason: 'Verifikasi mutasi BCA manual sebesar Rp99.000 cocok.',
    metadata: { order_number: 'ORD-20261025-001', amount: 99000 },
    created_at: '2026-10-25T09:00:00Z',
  },
  {
    id: 'log-02',
    admin_user_id: 'admin-001',
    action: 'AFFILIATE_PAYOUT_APPROVED',
    target_user_id: 'default',
    related_order_id: undefined,
    reason: 'Pencairan komisi Rp50.000 via Flip Enterprise ID #82910 sukses.',
    metadata: { payout_id: 'pay-01', amount: 50000 },
    created_at: '2026-10-24T15:00:00Z',
  },
];

// 1. Orders Management
export function getStoredOrders(): Order[] {
  const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_ORDERS;
  }
}

export function saveStoredOrder(order: Order): void {
  const list = getStoredOrders();
  const index = list.findIndex((o) => o.id === order.id);
  const updated = index >= 0 ? list.map((o) => (o.id === order.id ? order : o)) : [order, ...list];
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
}

export function createNewOrder(
  userId: string | null,
  customerEmail: string,
  provider: 'lynk' | 'dana_qris' | 'manual' = 'dana_qris',
  sku: ProductSku = 'affiliate_academy_pro'
): Order {
  const catalogItem = CATALOG_PRODUCTS[sku] || CATALOG_PRODUCTS.affiliate_academy_pro;
  const orderNumber = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;
  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    order_number: orderNumber,
    user_id: userId,
    customer_email: customerEmail,
    amount: catalogItem.promoPrice,
    currency: 'IDR',
    provider,
    provider_reference: `${provider.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
    sku: catalogItem.sku,
    tier: catalogItem.tier,
    status: 'pending',
    paid_at: null,
    created_at: new Date().toISOString(),
  };

  saveStoredOrder(newOrder);
  return newOrder;
}

// 2. Entitlements Management
export function getStoredEntitlements(): Entitlement[] {
  const data = localStorage.getItem(STORAGE_KEYS.ENTITLEMENTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.ENTITLEMENTS, JSON.stringify(INITIAL_ENTITLEMENTS));
    return INITIAL_ENTITLEMENTS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_ENTITLEMENTS;
  }
}

export function saveStoredEntitlement(entitlement: Entitlement): void {
  const list = getStoredEntitlements();
  const index = list.findIndex((e) => e.user_id === entitlement.user_id && e.product_code === entitlement.product_code);
  const updated = index >= 0 ? list.map((e) => (e.id === entitlement.id ? entitlement : e)) : [entitlement, ...list];
  localStorage.setItem(STORAGE_KEYS.ENTITLEMENTS, JSON.stringify(updated));
}

export function checkUserEntitlement(userIdOrEmail: string): boolean {
  const entitlements = getStoredEntitlements();
  const clean = userIdOrEmail.trim().toLowerCase();
  const found = entitlements.find(
    (e) =>
      (e.user_id === userIdOrEmail || (e.customer_email && e.customer_email.toLowerCase() === clean)) &&
      e.product_code === 'affiliate_academy' &&
      e.status === 'active'
  );
  return !!found;
}

export function getUserEntitlement(userIdOrEmail: string): Entitlement | null {
  const entitlements = getStoredEntitlements();
  const clean = userIdOrEmail.trim().toLowerCase();
  return (
    entitlements.find(
      (e) =>
        (e.user_id === userIdOrEmail || (e.customer_email && e.customer_email.toLowerCase() === clean)) &&
        e.product_code === 'affiliate_academy' &&
        e.status === 'active'
    ) || null
  );
}

// 3. Admin Audit Logs Management
export function getStoredAuditLogs(): AdminAuditLog[] {
  const data = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(INITIAL_AUDIT_LOGS));
    return INITIAL_AUDIT_LOGS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_AUDIT_LOGS;
  }
}

export function recordAuditLog(
  adminUserId: string,
  action: string,
  targetUserId?: string,
  relatedOrderId?: string,
  reason?: string,
  metadata?: Record<string, any>
): void {
  const newLog: AdminAuditLog = {
    id: `log-${Date.now()}`,
    admin_user_id: adminUserId,
    action,
    target_user_id: targetUserId,
    related_order_id: relatedOrderId,
    reason,
    metadata,
    created_at: new Date().toISOString(),
  };

  const list = getStoredAuditLogs();
  localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify([newLog, ...list]));
}

// 4. Idempotent Payment Confirmation & Entitlement Activation
export function confirmPaymentAndGrantEntitlement(
  orderId: string,
  adminUserId: string = 'admin-001',
  notes: string = 'Konfirmasi pembayaran valid oleh Admin.'
): { success: boolean; message: string; order?: Order; entitlement?: Entitlement } {
  const orders = getStoredOrders();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return { success: false, message: 'Pesanan tidak ditemukan.' };
  }

  // Idempotency: If already paid, do not re-grant
  if (order.status === 'paid') {
    return { success: true, message: 'Pesanan ini sudah berstatus Lunas sebelumnya.', order };
  }

  // Update order status
  order.status = 'paid';
  order.paid_at = new Date().toISOString();
  saveStoredOrder(order);

  // Grant or Upgrade Entitlement atomically per Addendum v2.1
  const targetLevel = order.tier === 'pro_plus' || order.sku === 'affiliate_academy_pro_plus' ? 'pro_plus' : 'pro';
  const existingEntitlements = getStoredEntitlements();
  const existingEnt = existingEntitlements.find(
    (e) => e.user_id === (order.user_id || 'default') && e.product_code === 'affiliate_academy'
  );

  let entitlement: Entitlement;
  if (existingEnt) {
    // Atomic upgrade: if targetLevel is pro_plus or already pro, keep highest
    existingEnt.access_level = targetLevel;
    existingEnt.status = 'active';
    existingEnt.source_order_id = order.id;
    existingEnt.granted_at = new Date().toISOString();
    saveStoredEntitlement(existingEnt);
    entitlement = existingEnt;
  } else {
    const entitlementId = `ent-${Date.now()}`;
    entitlement = {
      id: entitlementId,
      user_id: order.user_id || 'default',
      product_code: 'affiliate_academy',
      access_level: targetLevel,
      status: 'active',
      source_order_id: order.id,
      granted_at: new Date().toISOString(),
    };
    saveStoredEntitlement(entitlement);
  }

  // Also trigger referral conversion if user came through referral
  recordReferralConversion(order.id, order.order_number, order.customer_email, order.amount);

  // Record audit log
  recordAuditLog(
    adminUserId,
    'ORDER_CONFIRMED_AND_ENTITLEMENT_GRANTED',
    order.user_id || undefined,
    order.id,
    notes,
    { order_number: order.order_number, amount: order.amount, provider: order.provider }
  );

  return {
    success: true,
    message: `Pesanan ${order.order_number} berhasil dikonfirmasi dan hak akses Premium langsung aktif!`,
    order,
    entitlement,
  };
}

// 4b. Manual Comped / Influencer Grant Logic (Akses Cuma-cuma Tanpa Bayar)
export function grantCompedEntitlement(
  targetEmail: string,
  targetTier: 'pro' | 'pro_plus',
  adminUserId: string = 'admin-utama',
  reasonCategory: string = 'Influencer Endorsement',
  notes: string = ''
): { success: boolean; message: string; order: Order; entitlement: Entitlement } {
  const cleanEmail = targetEmail.trim().toLowerCase();
  const orderNumber = `ORD-VIP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;
  const orderId = `ord-comped-${Date.now()}`;

  // Synthetic / mapped user ID
  const userId = `usr-${cleanEmail.replace(/[^a-z0-9]/g, '_')}`;

  const compedOrder: Order = {
    id: orderId,
    order_number: orderNumber,
    user_id: userId,
    customer_email: cleanEmail,
    amount: 0,
    currency: 'IDR',
    provider: 'admin_manual_grant',
    provider_reference: `VIP-${reasonCategory.toUpperCase().replace(/\s+/g, '_')}`,
    sku: targetTier === 'pro_plus' ? 'affiliate_academy_pro_plus' : 'affiliate_academy_pro',
    tier: targetTier,
    status: 'paid',
    paid_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  };

  saveStoredOrder(compedOrder);

  // Grant or update entitlement
  const existingEntitlements = getStoredEntitlements();
  const existingEnt = existingEntitlements.find(
    (e) =>
      (e.user_id === userId || (e.customer_email && e.customer_email.toLowerCase() === cleanEmail)) &&
      e.product_code === 'affiliate_academy'
  );

  let entitlement: Entitlement;
  const isInfluencer = reasonCategory.toLowerCase().includes('influencer');
  const grantType = isInfluencer ? 'comped_influencer' : 'comped_vip';
  const fullNotes = notes ? `[${reasonCategory}] ${notes}` : reasonCategory;

  if (existingEnt) {
    existingEnt.access_level = targetTier;
    existingEnt.status = 'active';
    existingEnt.source_order_id = compedOrder.id;
    existingEnt.customer_email = cleanEmail;
    existingEnt.grant_type = grantType;
    existingEnt.notes = fullNotes;
    existingEnt.granted_at = new Date().toISOString();
    saveStoredEntitlement(existingEnt);
    entitlement = existingEnt;
  } else {
    const entitlementId = `ent-vip-${Date.now()}`;
    entitlement = {
      id: entitlementId,
      user_id: userId,
      customer_email: cleanEmail,
      product_code: 'affiliate_academy',
      access_level: targetTier,
      status: 'active',
      source_order_id: compedOrder.id,
      grant_type: grantType,
      notes: fullNotes,
      granted_at: new Date().toISOString(),
    };
    saveStoredEntitlement(entitlement);
  }

  // Record Admin Audit Log
  recordAuditLog(
    adminUserId,
    'GRANT_COMPED_VIP_ACCESS',
    userId,
    compedOrder.id,
    `Pemberian akses cuma-cuma (Rp0) paket ${targetTier.toUpperCase()} [${reasonCategory}]: ${notes || 'Tanpa catatan tambahan'}`,
    {
      target_email: cleanEmail,
      tier: targetTier,
      reason_category: reasonCategory,
      amount: 0,
      admin_user: adminUserId,
    }
  );

  return {
    success: true,
    message: `Akses ${targetTier === 'pro_plus' ? 'Pro Plus' : 'Pro'} berhasil diberikan cuma-cuma (Rp0) kepada ${cleanEmail}!`,
    order: compedOrder,
    entitlement,
  };
}

// 5. Revocation & Refund Logic
export function refundOrderAndRevokeEntitlement(
  orderId: string,
  adminUserId: string = 'admin-001',
  reason: string = 'Pengajuan refund disetujui sesuai regulasi klausul terms.'
): { success: boolean; message: string } {
  const orders = getStoredOrders();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return { success: false, message: 'Pesanan tidak ditemukan.' };
  }

  order.status = 'refunded';
  saveStoredOrder(order);

  // Revoke entitlement if exists
  if (order.user_id) {
    const entitlements = getStoredEntitlements();
    const ent = entitlements.find((e) => e.user_id === order.user_id && e.product_code === 'affiliate_academy');
    if (ent) {
      ent.status = 'revoked';
      ent.revoked_at = new Date().toISOString();
      ent.revocation_reason = reason;
      saveStoredEntitlement(ent);
    }
  }

  // Record audit log
  recordAuditLog(
    adminUserId,
    'ORDER_REFUNDED_AND_ENTITLEMENT_REVOKED',
    order.user_id || undefined,
    order.id,
    reason,
    { order_number: order.order_number, amount: order.amount }
  );

  return {
    success: true,
    message: `Pesanan ${order.order_number} berhasil direfund dan akses pengguna dicabut.`,
  };
}

// 6. Admin Payout Approval & Processing
export function approveAffiliatePayout(
  payoutId: string,
  adminUserId: string = 'admin-001',
  transferProofUrl: string = 'TRF-FLIP-SUCCESS',
  adminNotes: string = 'Transfer berhasil dilakukan ke rekening tujuan.'
): { success: boolean; message: string } {
  const payouts = getStoredAffiliatePayouts();
  const payout = payouts.find((p) => p.id === payoutId);

  if (!payout) {
    return { success: false, message: 'Permohonan penarikan dana tidak ditemukan.' };
  }

  payout.status = 'completed';
  payout.processed_at = new Date().toISOString();
  payout.transfer_proof_url = transferProofUrl;
  payout.admin_notes = adminNotes;
  saveStoredAffiliatePayout(payout);

  recordAuditLog(
    adminUserId,
    'AFFILIATE_PAYOUT_APPROVED',
    payout.affiliate_id,
    undefined,
    adminNotes,
    { payout_id: payoutId, amount: payout.amount, bank_name: payout.bank_name }
  );

  return {
    success: true,
    message: `Permohonan penarikan dana Rp${payout.amount.toLocaleString('id-ID')} berhasil disetujui & ditandai Lunas.`,
  };
}

export function rejectAffiliatePayout(
  payoutId: string,
  adminUserId: string = 'admin-001',
  reason: string = 'Nomor rekening tidak cocok dengan nama pemilik.'
): { success: boolean; message: string } {
  const payouts = getStoredAffiliatePayouts();
  const payout = payouts.find((p) => p.id === payoutId);

  if (!payout) {
    return { success: false, message: 'Permohonan penarikan dana tidak ditemukan.' };
  }

  payout.status = 'rejected';
  payout.processed_at = new Date().toISOString();
  payout.admin_notes = reason;
  saveStoredAffiliatePayout(payout);

  recordAuditLog(
    adminUserId,
    'AFFILIATE_PAYOUT_REJECTED',
    payout.affiliate_id,
    undefined,
    reason,
    { payout_id: payoutId, amount: payout.amount }
  );

  return {
    success: true,
    message: `Permohonan penarikan dana Rp${payout.amount.toLocaleString('id-ID')} ditolak.`,
  };
}
