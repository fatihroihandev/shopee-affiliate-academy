// UAT COMPREHENSIVE MENU & FEATURE AUDIT SUITE
// Shopee Affiliate Academy - Master Development v2.0 + Addendum v2.1
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

console.log('===============================================================');
console.log('🚀 MEMULAI UAT (USER ACCEPTANCE TESTING) SELURUH MENU SISTEM');
console.log('   Shopee Affiliate Academy (v2.0 FINAL + Addendum v2.1)');
console.log('===============================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const results = [];

function recordResult(menuName, routePath, componentFile, status, details = '') {
  totalTests++;
  if (status === 'PASS') {
    passedTests++;
  } else {
    failedTests++;
  }
  results.push({ menuName, routePath, componentFile, status, details });
  console.log(`[${status === 'PASS' ? '✅ PASS' : '❌ FAIL'}] ${menuName} (${routePath}) -> ${componentFile} ${details ? `[${details}]` : ''}`);
}

// 1. Audit File Fisik Komponen Menu
console.log('--- 1. AUDIT KOMPONEN FILE HALAMAN MENU ---');

const MENU_SPECIFICATIONS = [
  // A. Public Routes
  { name: 'Landing Page & Hero', route: '/', file: 'src/pages/Home.tsx' },
  { name: 'Pilihan Akses (Pricing)', route: '/pricing', file: 'src/pages/Home.tsx' },
  { name: 'Login Akun Siswa & Admin', route: '/login', file: 'src/pages/Login.tsx' },
  { name: 'Pendaftaran Siswa Baru', route: '/register', file: 'src/pages/Register.tsx' },
  { name: 'Lupa Password', route: '/forgot-password', file: 'src/pages/ForgotPassword.tsx' },
  { name: 'Syarat & Ketentuan (Terms)', route: '/terms', file: 'src/pages/legal/TermsPage.tsx' },
  { name: 'Kebijakan Privasi (Privacy)', route: '/privacy', file: 'src/pages/legal/PrivacyPage.tsx' },

  // B. LMS Pembelajaran
  { name: 'Dasbor Siswa', route: '/dashboard', file: 'src/pages/Dashboard.tsx' },
  { name: 'Modul Belajar (M00–M06)', route: '/learn', file: 'src/pages/learning/ModulesIndex.tsx' },
  { name: 'Detail Modul Kurikulum', route: '/learn/:moduleSlug', file: 'src/pages/learning/ModuleDetail.tsx' },
  { name: 'Lesson Reader (Materi)', route: '/learn/:moduleSlug/:lessonSlug', file: 'src/pages/learning/LessonReader.tsx' },
  { name: '8 Proyek Praktik', route: '/projects', file: 'src/pages/learning/ProjectsIndex.tsx' },
  { name: 'Detail Lembar Kerja Proyek', route: '/projects/:projectCode', file: 'src/pages/learning/ProjectDetail.tsx' },
  { name: 'Bonus Eksklusif Pro Plus', route: '/pro-plus-bonus', file: 'src/pages/learning/ProPlusBonusViewer.tsx' },

  // C. 8 Workspaces Praktik
  { name: 'Workspace 1: Product Research Lab', route: '/tools/products', file: 'src/pages/workspaces/ProductResearchLab.tsx' },
  { name: 'Workspace 2: Research Notes', route: '/tools/research-notes', file: 'src/pages/workspaces/ResearchNotes.tsx' },
  { name: 'Workspace 3: Content Studio', route: '/tools/content', file: 'src/pages/workspaces/ContentStudio.tsx' },
  { name: 'Workspace 4: Content Planner', route: '/tools/planner', file: 'src/pages/workspaces/ContentPlanner.tsx' },
  { name: 'Workspace 5: Link Archive', route: '/tools/links', file: 'src/pages/workspaces/LinkArchive.tsx' },
  { name: 'Workspace 6: Performance Tracker', route: '/tools/tracker', file: 'src/pages/workspaces/PerformanceTracker.tsx' },
  { name: 'Workspace 7: Experiment Tracker', route: '/tools/experiments', file: 'src/pages/workspaces/ExperimentTracker.tsx' },
  { name: 'Workspace 8: SOP & Knowledge Hub', route: '/tools/sop', file: 'src/pages/workspaces/SopDocuments.tsx' },

  // D. Kemitraan Internal
  { name: 'Affiliate Dashboard Platform', route: '/affiliate', file: 'src/pages/affiliate/AffiliateDashboard.tsx' },

  // E. Administrasi
  { name: 'Admin Command Center', route: '/admin', file: 'src/pages/admin/AdminDashboard.tsx' },
];

for (const item of MENU_SPECIFICATIONS) {
  const fullPath = path.join(rootDir, item.file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf-8');
    if (content.length > 100) {
      recordResult(item.name, item.route, item.file, 'PASS', `${Math.round(content.length / 1024)} KB`);
    } else {
      recordResult(item.name, item.route, item.file, 'FAIL', 'File kosong / terlalu kecil');
    }
  } else {
    recordResult(item.name, item.route, item.file, 'FAIL', 'File tidak ditemukan di disk');
  }
}

// 2. Audit Navigasi di AppRoutes.tsx dan Sidebar.tsx
console.log('\n--- 2. AUDIT INTEGRITAS ROUTING & SIDEBAR LINK ---');
const appRoutesContent = fs.readFileSync(path.join(rootDir, 'src/routes/AppRoutes.tsx'), 'utf-8');
const sidebarContent = fs.readFileSync(path.join(rootDir, 'src/components/layout/Sidebar.tsx'), 'utf-8');

const EXPECTED_ROUTES = [
  '/',
  '/pricing',
  '/login',
  '/register',
  '/forgot-password',
  '/terms',
  '/privacy',
  '/dashboard',
  '/learn',
  '/learn/:moduleSlug',
  '/learn/:moduleSlug/:lessonSlug',
  '/projects',
  '/projects/:projectCode',
  '/pro-plus-bonus',
  '/tools/products',
  '/tools/research-notes',
  '/tools/content',
  '/tools/planner',
  '/tools/links',
  '/tools/tracker',
  '/tools/experiments',
  '/tools/sop',
  '/affiliate/*',
  '/admin/*',
];

for (const r of EXPECTED_ROUTES) {
  const isRegistered = appRoutesContent.includes(`path="${r}"`);
  if (isRegistered) {
    recordResult(`Route ${r}`, r, 'AppRoutes.tsx', 'PASS', 'Terdaftar di Routes');
  } else {
    recordResult(`Route ${r}`, r, 'AppRoutes.tsx', 'FAIL', 'Belum terdaftar di AppRoutes.tsx');
  }
}

const SIDEBAR_NAV_LINKS = [
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
  { label: 'SOP & Knowledge Hub', path: '/tools/sop' },
  { label: 'Affiliate Dashboard', path: '/affiliate' },
  { label: 'Admin Command Center', path: '/admin' },
];

for (const s of SIDEBAR_NAV_LINKS) {
  const hasLink = sidebarContent.includes(`to="${s.path}"`) || sidebarContent.includes(`'${s.path}'`);
  if (hasLink) {
    recordResult(`Sidebar Menu "${s.label}"`, s.path, 'Sidebar.tsx', 'PASS', 'Tersambung ke NavLink');
  } else {
    recordResult(`Sidebar Menu "${s.label}"`, s.path, 'Sidebar.tsx', 'FAIL', 'Link tidak ada di Sidebar');
  }
}

// 3. Audit Dataset Kurikulum & Proyek & Bonus
console.log('\n--- 3. AUDIT INTEGRITAS KONTEN DATASET ---');

// Check Curriculum Modules
const curriculumFile = path.join(rootDir, 'src/data/curriculumData.ts');
if (fs.existsSync(curriculumFile)) {
  const currContent = fs.readFileSync(curriculumFile, 'utf-8');
  const moduleMatches = currContent.match(/"code":\s*['"]M\d{2}['"]/g) || [];
  if (moduleMatches.length >= 7) {
    recordResult('Dataset Modul Kurikulum (M00-M06)', '/learn', 'curriculumData.ts', 'PASS', `${moduleMatches.length} modul terdeteksi`);
  } else {
    recordResult('Dataset Modul Kurikulum (M00-M06)', '/learn', 'curriculumData.ts', 'FAIL', `Hanya ${moduleMatches.length} modul terdeteksi`);
  }

  // Check Projects P01-P08 in curriculumData.ts
  const prjMatches = currContent.match(/"code":\s*['"]P\d{2}['"]/g) || [];
  if (prjMatches.length >= 8) {
    recordResult('Dataset 8 Proyek Praktik (P01-P08)', '/projects', 'curriculumData.ts', 'PASS', `${prjMatches.length} proyek lengkap terdaftar`);
  } else {
    recordResult('Dataset 8 Proyek Praktik (P01-P08)', '/projects', 'curriculumData.ts', 'FAIL', `Hanya ${prjMatches.length} proyek ditemukan`);
  }
} else {
  recordResult('Dataset Modul Kurikulum', '/learn', 'curriculumData.ts', 'FAIL', 'File tidak ditemukan');
}

// Check Pro Plus 3 Bonus
const bonusFile = path.join(rootDir, 'src/data/proPlusBonusData.ts');
if (fs.existsSync(bonusFile)) {
  const bContent = fs.readFileSync(bonusFile, 'utf-8');
  const hasCampaign = bContent.includes('PRO_PLUS_CAMPAIGN_DATA');
  const hasCaseStudies = bContent.includes('PRO_PLUS_CASE_STUDIES');
  const hasPlaybook = bContent.includes('PRO_PLUS_OBJECTION_PLAYBOOK');

  if (hasCampaign && hasCaseStudies && hasPlaybook) {
    recordResult('Dataset 3 Bonus Eksklusif Pro Plus', '/pro-plus-bonus', 'proPlusBonusData.ts', 'PASS', 'Campaign, Case Studies & Playbook lengkap');
  } else {
    recordResult('Dataset 3 Bonus Eksklusif Pro Plus', '/pro-plus-bonus', 'proPlusBonusData.ts', 'FAIL', 'Komponen bonus tidak lengkap');
  }
} else {
  recordResult('Dataset 3 Bonus Eksklusif Pro Plus', '/pro-plus-bonus', 'proPlusBonusData.ts', 'FAIL', 'File tidak ditemukan');
}

// 4. Audit Logika Otoritas & Akun Admin (Utama vs Backup) & Comped VIP Access
console.log('\n--- 4. AUDIT AKUN DUA ADMIN & FITUR VIP COMPED Rp0 ---');

const authContent = fs.readFileSync(path.join(rootDir, 'src/features/auth/AuthContext.tsx'), 'utf-8');
const orderStorageContent = fs.readFileSync(path.join(rootDir, 'src/features/commerce/orderStorage.ts'), 'utf-8');
const adminDashContent = fs.readFileSync(path.join(rootDir, 'src/pages/admin/AdminDashboard.tsx'), 'utf-8');

// Dual admin accounts in AuthContext
const hasAdminUtama = authContent.includes('admin.utama@affiliateacademy.site') || authContent.includes('admin@affiliateacademy.site');
const hasAdminBackup = authContent.includes('admin.backup@affiliateacademy.site');
if (hasAdminUtama && hasAdminBackup) {
  recordResult('Dua Akun Admin (Utama & Backup)', '/login', 'AuthContext.tsx', 'PASS', 'Admin Utama (super_admin) & Admin Backup (admin)');
} else {
  recordResult('Dua Akun Admin (Utama & Backup)', '/login', 'AuthContext.tsx', 'FAIL', 'Konfigurasi akun admin tidak lengkap');
}

// Comped Grant function in orderStorage
const hasCompedGrant = orderStorageContent.includes('grantCompedEntitlement');
if (hasCompedGrant) {
  recordResult('Fungsi Grant Akses Gratis VIP (Rp0)', '/admin', 'orderStorage.ts', 'PASS', 'Fungsi grantCompedEntitlement terdefinisi');
} else {
  recordResult('Fungsi Grant Akses Gratis VIP (Rp0)', '/admin', 'orderStorage.ts', 'FAIL', 'Fungsi tidak ditemukan');
}

// Admin Dashboard UI: Comped Grant Modal & Button
const hasCompedButton = adminDashContent.includes('setIsCompedModalOpen');
const hasCompedModal = adminDashContent.includes('handleGrantCompedAccess');
if (hasCompedButton && hasCompedModal) {
  recordResult('UI Form Masukkan Orang / Influencer (Rp0)', '/admin', 'AdminDashboard.tsx', 'PASS', 'Tombol & Modal form input tersedia');
} else {
  recordResult('UI Form Masukkan Orang / Influencer (Rp0)', '/admin', 'AdminDashboard.tsx', 'FAIL', 'UI Modal comped grant tidak lengkap');
}

// 5. Audit Ringkasan
console.log('\n===============================================================');
console.log(`📊 HASIL AKHIR UAT:`);
console.log(`   Total Pengujian Menu & Fitur: ${totalTests}`);
console.log(`   Lulus (PASS): ${passedTests}`);
console.log(`   Gagal (FAIL): ${failedTests}`);
console.log(`   Tingkat Keberhasilan: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
console.log('===============================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
