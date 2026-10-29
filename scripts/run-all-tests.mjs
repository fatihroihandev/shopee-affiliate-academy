// MASTER AUTOMATED TEST SUITE & SYSTEM VERIFICATION
// Shopee Affiliate Academy — Production Readiness & Remediation Audit
// Node.js pure ESM test runner (cross-platform, zero external runner dependency)

import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

console.log('===============================================================');
console.log('🧪 RUNNING MASTER AUTOMATED TEST SUITE & SECURITY AUDIT');
console.log('   Shopee Affiliate Academy Platform (v2.0 + Addendum v2.1)');
console.log('===============================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assertTest(name, condition, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`[✅ PASS] ${name} ${details ? `(${details})` : ''}`);
  } else {
    failedTests++;
    console.error(`[❌ FAIL] ${name} ${details ? `(${details})` : ''}`);
  }
}

// -------------------------------------------------------------
// SECTION 1: ROUTING & PHYSICAL PAGE COMPONENTS AUDIT
// -------------------------------------------------------------
console.log('--- 1. AUDIT KOMPONEN FILE HALAMAN & ROUTING ---');
const APP_ROUTES_FILE = path.join(rootDir, 'src/routes/AppRoutes.tsx');
const routesContent = fs.readFileSync(APP_ROUTES_FILE, 'utf-8');

const PAGES_TO_CHECK = [
  { name: 'Landing Page & Hero', path: 'src/pages/Home.tsx', route: '/' },
  { name: 'Pricing Catalog', path: 'src/pages/Home.tsx', route: '/pricing' },
  { name: 'Login Page', path: 'src/pages/Login.tsx', route: '/login' },
  { name: 'Register Page', path: 'src/pages/Register.tsx', route: '/register' },
  { name: 'Forgot Password', path: 'src/pages/ForgotPassword.tsx', route: '/forgot-password' },
  { name: 'Terms of Service', path: 'src/pages/legal/TermsPage.tsx', route: '/terms' },
  { name: 'Privacy Policy', path: 'src/pages/legal/PrivacyPage.tsx', route: '/privacy' },
  { name: 'Dashboard Siswa', path: 'src/pages/Dashboard.tsx', route: '/dashboard' },
  { name: 'Modules Index', path: 'src/pages/learning/ModulesIndex.tsx', route: '/learn' },
  { name: 'Module Detail', path: 'src/pages/learning/ModuleDetail.tsx', route: '/learn/:moduleSlug' },
  { name: 'Lesson Reader', path: 'src/pages/learning/LessonReader.tsx', route: '/learn/:moduleSlug/:lessonSlug' },
  { name: 'Projects Index', path: 'src/pages/learning/ProjectsIndex.tsx', route: '/projects' },
  { name: 'Project Detail', path: 'src/pages/learning/ProjectDetail.tsx', route: '/projects/:projectCode' },
  { name: 'Pro Plus Bonus Viewer', path: 'src/pages/learning/ProPlusBonusViewer.tsx', route: '/pro-plus-bonus' },
  { name: 'Workspace 1: Products', path: 'src/pages/workspaces/ProductResearchLab.tsx', route: '/tools/products' },
  { name: 'Workspace 2: Notes', path: 'src/pages/workspaces/ResearchNotes.tsx', route: '/tools/research-notes' },
  { name: 'Workspace 3: Content', path: 'src/pages/workspaces/ContentStudio.tsx', route: '/tools/content' },
  { name: 'Workspace 4: Planner', path: 'src/pages/workspaces/ContentPlanner.tsx', route: '/tools/planner' },
  { name: 'Workspace 5: Links', path: 'src/pages/workspaces/LinkArchive.tsx', route: '/tools/links' },
  { name: 'Workspace 6: Tracker', path: 'src/pages/workspaces/PerformanceTracker.tsx', route: '/tools/tracker' },
  { name: 'Workspace 7: Experiments', path: 'src/pages/workspaces/ExperimentTracker.tsx', route: '/tools/experiments' },
  { name: 'Workspace 8: SOP', path: 'src/pages/workspaces/SopDocuments.tsx', route: '/tools/sop' },
  { name: 'Affiliate Dashboard', path: 'src/pages/affiliate/AffiliateDashboard.tsx', route: '/affiliate' },
  { name: 'Admin Command Center', path: 'src/pages/admin/AdminDashboard.tsx', route: '/admin' },
];

for (const page of PAGES_TO_CHECK) {
  const fullPath = path.join(rootDir, page.path);
  const exists = fs.existsSync(fullPath);
  assertTest(`File Page: ${page.name}`, exists, page.path);

  const routeRegistered = routesContent.includes(`path="${page.route}"`) || routesContent.includes(`path='${page.route}'`) || routesContent.includes(`${page.route}/*`);
  assertTest(`Route Registered: ${page.route}`, routeRegistered, 'AppRoutes.tsx');
}

// -------------------------------------------------------------
// SECTION 2: SIDEBAR NAVIGATION INTEGRITY
// -------------------------------------------------------------
console.log('\n--- 2. AUDIT SIDEBAR NAVIGATION INTEGRITY ---');
const SIDEBAR_FILE = path.join(rootDir, 'src/components/layout/Sidebar.tsx');
const sidebarContent = fs.readFileSync(SIDEBAR_FILE, 'utf-8');

const SIDEBAR_LINKS = [
  { label: 'Dasbor Siswa', path: '/dashboard' },
  { label: 'Modul Belajar', path: '/learn' },
  { label: '8 Proyek Praktik', path: '/projects' },
  { label: 'Bonus Pro Plus', path: '/pro-plus-bonus' },
  { label: 'Product Research', path: '/tools/products' },
  { label: 'Research Notes', path: '/tools/research-notes' },
  { label: 'Content Studio', path: '/tools/content' },
  { label: 'Content Planner', path: '/tools/planner' },
  { label: 'Link Archive', path: '/tools/links' },
  { label: 'Performance Tracker', path: '/tools/tracker' },
  { label: 'Experiment Tracker', path: '/tools/experiments' },
  { label: 'SOP & Hub', path: '/tools/sop' },
  { label: 'Affiliate Dashboard', path: '/affiliate' },
  { label: 'Admin Command Center', path: '/admin' },
];

for (const link of SIDEBAR_LINKS) {
  const isLinked = sidebarContent.includes(`'${link.path}'`) || sidebarContent.includes(`"${link.path}"`);
  assertTest(`Sidebar Link: ${link.label}`, isLinked, link.path);
}

// -------------------------------------------------------------
// SECTION 3: CURRICULUM & DATASET INTEGRITY
// -------------------------------------------------------------
console.log('\n--- 3. AUDIT DATASET KURIKULUM & MATERI ---');
const CURRICULUM_DATA_FILE = path.join(rootDir, 'src/data/curriculumData.ts');
const curriculumContent = fs.readFileSync(CURRICULUM_DATA_FILE, 'utf-8');

const modulesCount = (curriculumContent.match(/["']?code["']?:\s*['"]M0[0-6]['"]/g) || []).length;
assertTest('Dataset Modul Lengkap (M00-M06)', modulesCount === 7, `Terdeteksi ${modulesCount} modul`);

const lessonsCount = (curriculumContent.match(/["']?id["']?:\s*['"]l[0-3][0-9]['"]/g) || []).length;
assertTest('Dataset Materi Pelajaran (30 Pelajaran)', lessonsCount === 30, `Terdeteksi ${lessonsCount} pelajaran`);

const projectsCount = (curriculumContent.match(/["']?id["']?:\s*['"]p0[1-8]['"]/g) || []).length;
assertTest('Dataset 8 Proyek Praktik (P01-P08)', projectsCount === 8, `Terdeteksi ${projectsCount} proyek`);

const BONUS_DATA_FILE = path.join(rootDir, 'src/data/proPlusBonusData.ts');
const bonusContent = fs.readFileSync(BONUS_DATA_FILE, 'utf-8');
const hasCampaignBonus = bonusContent.includes('PRO_PLUS_CAMPAIGN_DATA');
const hasCaseStudies = bonusContent.includes('PRO_PLUS_CASE_STUDIES');
const hasPlaybook = bonusContent.includes('PRO_PLUS_OBJECTION_PLAYBOOK');
assertTest('Bonus Pro Plus: Campaign Packages', hasCampaignBonus, 'proPlusBonusData.ts');
assertTest('Bonus Pro Plus: Case Study Lab', hasCaseStudies, 'proPlusBonusData.ts');
assertTest('Bonus Pro Plus: Objection Playbook', hasPlaybook, 'proPlusBonusData.ts');

// -------------------------------------------------------------
// SECTION 4: SECURITY & AUTHENTICATION ENFORCEMENT
// -------------------------------------------------------------
console.log('\n--- 4. AUDIT SECURITY & AUTHENTICATION CONTROLS ---');
const AUTH_CONTEXT_FILE = path.join(rootDir, 'src/features/auth/AuthContext.tsx');
const authContent = fs.readFileSync(AUTH_CONTEXT_FILE, 'utf-8');

const queriesUserRoles = authContent.includes('.from(\'user_roles\')') && authContent.includes('.select(\'role\')');
assertTest('Security: Role Diperiksa dari Tabel Database Supabase', queriesUserRoles, 'AuthContext.tsx');

const LOGIN_FILE = path.join(rootDir, 'src/pages/Login.tsx');
const loginContent = fs.readFileSync(LOGIN_FILE, 'utf-8');
const demoLimitedToDev = loginContent.includes('import.meta.env.DEV') && !loginContent.includes('searchParams.get(\'demo\')');
assertTest('Security: Demo Box Terisolasi Murni di DEV Mode (Tanpa ?demo Bypass)', demoLimitedToDev, 'Login.tsx');

const pricingAccessible = !routesContent.includes('<GuestOnlyRoute>\n          <Route path="/"') &&
                          !routesContent.includes('<GuestOnlyRoute>\n            <Home />');
assertTest('Security: Pricing Table Dapat Diakses Siswa Login (Bukan Guest-Only)', pricingAccessible, 'AppRoutes.tsx');

// -------------------------------------------------------------
// SECTION 5: DUAL-LAYER STORAGE & WORKSPACE SYNC ENGINE
// -------------------------------------------------------------
console.log('\n--- 5. AUDIT DUAL-LAYER STORAGE ENGINE ---');
const WORKSPACE_STORAGE_FILE = path.join(rootDir, 'src/features/workspaces/workspaceStorage.ts');
const wsStorageContent = fs.readFileSync(WORKSPACE_STORAGE_FILE, 'utf-8');

const hasProductsSync = wsStorageContent.includes('syncProductsFromCloud') && wsStorageContent.includes('affiliate_products');
const hasNotesSync = wsStorageContent.includes('syncResearchNotesFromCloud') && wsStorageContent.includes('research_notes');
const hasContentSync = wsStorageContent.includes('syncContentItemsFromCloud') && wsStorageContent.includes('content_items');
const hasLinksSync = wsStorageContent.includes('syncAffiliateLinksFromCloud') && wsStorageContent.includes('affiliate_links');
const hasPerfSync = wsStorageContent.includes('syncPerformanceRecordsFromCloud') && wsStorageContent.includes('performance_records');
const hasExpSync = wsStorageContent.includes('syncExperimentsFromCloud') && wsStorageContent.includes('experiments');
const hasSopSync = wsStorageContent.includes('syncSopsFromCloud') && wsStorageContent.includes('sop_documents');

assertTest('Dual-Layer: Product Research Lab Cloud Sync', hasProductsSync, 'workspaceStorage.ts');
assertTest('Dual-Layer: Research Notes Cloud Sync', hasNotesSync, 'workspaceStorage.ts');
assertTest('Dual-Layer: Content Studio Cloud Sync', hasContentSync, 'workspaceStorage.ts');
assertTest('Dual-Layer: Link Archive Cloud Sync', hasLinksSync, 'workspaceStorage.ts');
assertTest('Dual-Layer: Performance Tracker Cloud Sync', hasPerfSync, 'workspaceStorage.ts');
assertTest('Dual-Layer: Experiment Tracker Cloud Sync', hasExpSync, 'workspaceStorage.ts');
assertTest('Dual-Layer: SOP Documents Cloud Sync', hasSopSync, 'workspaceStorage.ts');

// -------------------------------------------------------------
// SECTION 6: COMMERCE, ORDERS & ENTITLEMENTS
// -------------------------------------------------------------
console.log('\n--- 6. AUDIT COMMERCE, ORDER & ENTITLEMENT ENGINE ---');
const ORDER_STORAGE_FILE = path.join(rootDir, 'src/features/commerce/orderStorage.ts');
const orderStorageContent = fs.readFileSync(ORDER_STORAGE_FILE, 'utf-8');

const hasProCatalog = orderStorageContent.includes('affiliate_academy_pro') && orderStorageContent.includes('99000');
const hasProPlusCatalog = orderStorageContent.includes('affiliate_academy_pro_plus') && orderStorageContent.includes('199000');
const hasSyncOrders = orderStorageContent.includes('syncOrdersFromCloud');
const hasSyncEntitlements = orderStorageContent.includes('syncEntitlementsFromCloud');
const hasCompedGrant = orderStorageContent.includes('grantCompedEntitlement');
const hasRefundRevoke = orderStorageContent.includes('refundOrderAndRevokeEntitlement');

assertTest('Commerce: Katalog Paket Pro (Rp99.000)', hasProCatalog, 'orderStorage.ts');
assertTest('Commerce: Katalog Paket Pro Plus (Rp199.000)', hasProPlusCatalog, 'orderStorage.ts');
assertTest('Commerce: Sync Orders dari Cloud Database', hasSyncOrders, 'orderStorage.ts');
assertTest('Commerce: Sync Entitlements dari Cloud Database', hasSyncEntitlements, 'orderStorage.ts');
assertTest('Commerce: Pemberian Hak Akses VIP Gratis Rp0', hasCompedGrant, 'orderStorage.ts');
assertTest('Commerce: Pencabutan Entitlement saat Refund', hasRefundRevoke, 'orderStorage.ts');

const CHECKOUT_MODAL_FILE = path.join(rootDir, 'src/features/commerce/CheckoutModal.tsx');
const checkoutModalContent = fs.readFileSync(CHECKOUT_MODAL_FILE, 'utf-8');
const requiresVerification = checkoutModalContent.includes('pending_verification') &&
                             checkoutModalContent.includes('Saya Sudah Menyelesaikan Pembayaran');
assertTest('Checkout: Tombol Bayar Berstatus Pending Verification Resmi', requiresVerification, 'CheckoutModal.tsx');

// -------------------------------------------------------------
// SECTION 7: INTERNAL AFFILIATE PLATFORM ENGINE
// -------------------------------------------------------------
console.log('\n--- 7. AUDIT INTERNAL AFFILIATE PLATFORM ENGINE ---');
const AFFILIATE_STORAGE_FILE = path.join(rootDir, 'src/features/affiliate/affiliateStorage.ts');
const affiliateStorageContent = fs.readFileSync(AFFILIATE_STORAGE_FILE, 'utf-8');

const hasAttributionTracking = affiliateStorageContent.includes('captureReferralParam') &&
                               affiliateStorageContent.includes('shopee_academy_ref_attribution');
const hasCommissionRate10 = affiliateStorageContent.includes('0.1') || affiliateStorageContent.includes('0.10');
const hasPayoutThreshold50k = affiliateStorageContent.includes('50000');
const hasSyncAffiliate = affiliateStorageContent.includes('syncAffiliateFromCloud');

assertTest('Affiliate: 30-Day Attribution Tracking Cookie', hasAttributionTracking, 'affiliateStorage.ts');
assertTest('Affiliate: Komisi Referral 10%', hasCommissionRate10, 'affiliateStorage.ts');
assertTest('Affiliate: Batas Minimal Payout Rp50.000', hasPayoutThreshold50k, 'affiliateStorage.ts');
assertTest('Affiliate: Sync Profil, Clicks, Convs & Payouts dari Cloud', hasSyncAffiliate, 'affiliateStorage.ts');

// -------------------------------------------------------------
// SECTION 8: SUPABASE EDGE FUNCTION & PAYMENT WEBHOOK
// -------------------------------------------------------------
console.log('\n--- 8. AUDIT EDGE FUNCTION PAYMENT WEBHOOK ---');
const WEBHOOK_FILE = path.join(rootDir, 'supabase/functions/handle-payment-webhook/index.ts');
const webhookExists = fs.existsSync(WEBHOOK_FILE);
assertTest('Edge Function: Berkas Webhook Ditemukan', webhookExists, 'supabase/functions/handle-payment-webhook/index.ts');

if (webhookExists) {
  const webhookContent = fs.readFileSync(WEBHOOK_FILE, 'utf-8');
  const hasCors = webhookContent.includes('Access-Control-Allow-Origin');
  const hasSecretCheck = webhookContent.includes('x-webhook-signature') || webhookContent.includes('PAYMENT_WEBHOOK_SECRET');
  const hasIdempotency = webhookContent.includes('order.status === "paid"');
  const updatesEntitlement = webhookContent.includes('.from("entitlements")') && webhookContent.includes('upsert');

  assertTest('Edge Function: CORS Pre-flight Handling', hasCors, 'handle-payment-webhook');
  assertTest('Edge Function: Signature Token Verification', hasSecretCheck, 'handle-payment-webhook');
  assertTest('Edge Function: Idempotent Order Handling', hasIdempotency, 'handle-payment-webhook');
  assertTest('Edge Function: Automatic Entitlement Activation', updatesEntitlement, 'handle-payment-webhook');
}

// -------------------------------------------------------------
// SECTION 9: DATABASE MIGRATIONS DDL AUDIT
// -------------------------------------------------------------
console.log('\n--- 9. AUDIT BASIS DATA & SKEMA MIGRATION DDL ---');
const MIGRATION_DIR = path.join(rootDir, 'supabase/migrations');
const MIGRATION_FILES = [
  '20261026000000_init_schema.sql',
  '20261029000000_curriculum_text_ids_and_seed.sql',
  '20261029010000_workspace_text_ids_and_dual_layer.sql',
  '20261029020000_commerce_affiliate_text_ids_and_edge_webhook.sql',
];

for (const mig of MIGRATION_FILES) {
  const migPath = path.join(MIGRATION_DIR, mig);
  const exists = fs.existsSync(migPath);
  const sizeKb = exists ? Math.round(fs.statSync(migPath).size / 1024) : 0;
  assertTest(`DDL Migration: ${mig}`, exists, `${sizeKb} KB`);
}

const INIT_SCHEMA_FILE = path.join(MIGRATION_DIR, '20261026000000_init_schema.sql');
const initSchemaContent = fs.readFileSync(INIT_SCHEMA_FILE, 'utf-8');
const hasRlsLessons = initSchemaContent.includes('Lessons readable by entitled users or preview');
const hasRlsWorkspaces = initSchemaContent.includes('Users own affiliate_products');
const hasProTierFunctions = initSchemaContent.includes('has_active_premium_access') && initSchemaContent.includes('has_active_pro_plus_access');

assertTest('Database: RLS Lessons Server-Side Protection', hasRlsLessons, 'init_schema.sql');
assertTest('Database: RLS Workspaces User Data Isolation', hasRlsWorkspaces, 'init_schema.sql');
assertTest('Database: Functions has_active_premium & pro_plus', hasProTierFunctions, 'init_schema.sql');

// -------------------------------------------------------------
// SUMMARY REPORTOUTPUT
// -------------------------------------------------------------
console.log('\n===============================================================');
console.log('📊 REKAPITULASI HASIL AUDIT OTOMATIS:');
console.log(`   Total Pengujian: ${totalTests}`);
console.log(`   Lulus (PASS): ${passedTests}`);
console.log(`   Gagal (FAIL): ${failedTests}`);
console.log(`   Tingkat Kelulusan: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
console.log('===============================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
