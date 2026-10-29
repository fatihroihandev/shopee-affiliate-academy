const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'docs', 'course', 'Shopee Affiliate V2');

// Read helper files
const rootDoc = fs.readFileSync(path.join(__dirname, '..', 'docs', 'course', 'Shopee Affiliate V2.md'), 'utf-8');
const glossaryDoc = fs.readFileSync(path.join(baseDir, 'Kamus Istilah.md'), 'utf-8');
const formulaDoc = fs.readFileSync(path.join(baseDir, 'Lembar Rumus dan Template.md'), 'utf-8');
const projectsDoc = fs.readFileSync(path.join(baseDir, '8 Project Praktik Wajib.md'), 'utf-8');
const notionDoc = fs.readFileSync(path.join(baseDir, 'Database Notion yang Wajib Dibangun.md'), 'utf-8');

// Function to read module file safely
function readModuleFile(levelDir, fileName) {
  const fullPath = path.join(baseDir, levelDir, fileName);
  if (fs.existsSync(fullPath)) {
    return fs.readFileSync(fullPath, 'utf-8');
  }
  return '';
}

// 7 Modules Definition
const modules = [
  {
    id: 'm00',
    code: 'M00',
    title: 'Start Here — Pengantar & Orientasi',
    slug: 'start-here',
    description: 'Pahami cara belajar, aturan emas Shopee Affiliate, kamus istilah, dan panduan menjalankan 6 workspace praktik.',
    sort_order: 0,
    is_published: true,
  },
  {
    id: 'm01',
    code: 'M01',
    title: 'Affiliate Fundamentals (Level 1)',
    slug: 'affiliate-fundamentals',
    description: 'Dasar affiliate marketing, aturan komisi Shopee Affiliate resmi, dan persiapan akun operasional.',
    sort_order: 1,
    is_published: true,
  },
  {
    id: 'm02',
    code: 'M02',
    title: 'Product Research Lab (Level 2)',
    slug: 'product-research-lab',
    description: 'Riset pasar dan permintaan, pemilihan niche audiens, evaluasi skor produk 7 faktor, dan riset kompetitor.',
    sort_order: 2,
    is_published: true,
  },
  {
    id: 'm03',
    code: 'M03',
    title: 'Content Creation Studio (Level 3 - Bagian 1)',
    slug: 'content-creation-studio',
    description: 'Strategi channel organik, pilar konten, hook bank formula, produksi video, dan optimasi SEO pencarian.',
    sort_order: 3,
    is_published: true,
  },
  {
    id: 'm04',
    code: 'M04',
    title: 'Publishing Sprint (Level 3 - Bagian 2)',
    slug: 'publishing-sprint',
    description: 'Distribusi konten, kalender publikasi 30 hari (Sprint Awal 14 Hari), dan 11 butir Quality Control sebelum terbit.',
    sort_order: 4,
    is_published: true,
  },
  {
    id: 'm05',
    code: 'M05',
    title: 'Analyze & Improve (Level 4)',
    slug: 'analyze-and-improve',
    description: 'Manajemen link affiliate, optimasi conversion rate (CRO), analytics dashboard, dan eksperimen validasi A/B.',
    sort_order: 5,
    is_published: true,
  },
  {
    id: 'm06',
    code: 'M06',
    title: 'Professional Growth (Level 5)',
    slug: 'professional-growth',
    description: 'Monetisasi lanjutan, manajemen keuangan komisi, sistem scaling batching, kepatuhan risiko, dan otomasi alur kerja.',
    sort_order: 6,
    is_published: true,
  },
];

// Helper to extract summary from module markdown
function extractSummary(content) {
  const match = content.match(/## Ringkasan[^#]*\n([\s\S]*?)(?=\n##|$)/);
  if (match) {
    return match[1].replace(/>|\*|-/g, '').trim().slice(0, 180) + '...';
  }
  return 'Pelajari konsep inti, studi kasus numerik, dan langkah praktik teruji pada modul ini.';
}

// 30 Lessons Definition
const lessons = [
  // M00 (4 Pelajaran)
  {
    id: 'l01',
    module_id: 'm00',
    title: 'Selamat Datang dan Cara Belajar di Affiliate Academy',
    slug: 'selamat-datang-dan-cara-belajar',
    content: `# Selamat Datang dan Cara Belajar di Affiliate Academy

Selamat datang di **Shopee Affiliate Academy**! Materi ini mengajarkan cara membangun bisnis Shopee Affiliate dari nol dengan pendekatan berbasis data dan eksekusi terstruktur.

## Misi Pembelajaran
Membangun bisnis Shopee Affiliate yang terukur, berkelanjutan, dan berkembang melalui strategi traffic organik tanpa perlu modal stok barang.

> **PENTING DIBACA:** Tidak ada jaminan penghasilan instan. Hasil Anda bergantung pada pilihan produk, kualitas konten, kebutuhan pasar, dan kepatuhan pada aturan program resmi Shopee. Semua keputusan di platform ini didasarkan pada data nyata, bukan tebakan.

## Cara Belajar yang Efektif
1. **Belajar Berurutan:** Mulai dari Modul 01. Setiap modul dirancang menggunakan output dari modul sebelumnya.
2. **Baca Lalu Praktik:** Selesaikan *Tugas dan Checklist* di akhir setiap pelajaran sebelum melanjutkan ke modul berikutnya.
3. **Gunakan 6 Workspace:** Jangan biarkan data Anda berserakan di catatan kertas. Catat riset Anda langsung di menu **6 Workspace** yang tersedia di platform ini.
4. **Verifikasi Aturan Resmi:** Sebelum mempromosikan produk, selalu periksa dashboard Shopee Affiliate Anda untuk mencatat tanggal dan komisi terbaru.`,
    source_ref: 'Pengantar',
    estimated_minutes: 8,
    is_free_preview: true,
    sort_order: 1,
    is_published: true,
    summary: 'Orientasi cara belajar terstruktur dan prinsip kerja Shopee Affiliate Academy.'
  },
  {
    id: 'l02',
    module_id: 'm00',
    title: 'Peta Belajar dan 5 Aturan Emas Shopee Affiliate',
    slug: 'peta-belajar-dan-5-aturan-emas',
    content: `# Peta Belajar dan 5 Aturan Emas Shopee Affiliate

Untuk membangun karier affiliate yang berumur panjang dan terhindar dari sanksi penalti, pegang teguh 5 Aturan Emas ini:

## 5 Aturan Emas
1. **Aturan Resmi Selalu Diutamakan:** Selalu ikuti syarat & ketentuan resmi Shopee Affiliate. Jangan mengambil kesimpulan hanya berdasarkan konten media sosial orang lain.
2. **Jujur dan Orisinal:** Jangan pernah mengaku sudah mencoba produk yang belum pernah Anda sentuh. Jangan menyalin konten kreator lain tanpa izin. Wajib sertakan pengungkapan (*disclosure*) affiliate.
3. **Data Sebelum Keputusan:** Jangan menyimpulkan keberhasilan atau kegagalan hanya dari satu video atau satu hari yang sepi. Evaluasi minimal 7–14 hari.
4. **Satu Hal Sekaligus:** Kuasai satu channel utama terlebih dahulu (misal: TikTok, Shopee Video, atau Instagram Reels). Saat melakukan eksperimen, ubah satu variabel saja dalam satu waktu.
5. **Pisahkan Komisi Estimasi dari Uang Cair:** Komisi estimasi adalah pesanan yang baru masuk dan belum tentu menjadi uang di rekening Anda. Hormati 4 tahapan status komisi resmi.

## Peta Belajar 5 Level
- **Level 1 (M01):** Dasar affiliate, aturan main Shopee, dan persiapan operasional.
- **Level 2 (M02):** Riset pasar, penentuan niche, evaluasi produk 7 faktor, dan pemetaan kompetitor.
- **Level 3 (M03 & M04):** Strategi konten, copywriting hook, produksi video, SEO, dan sprint publikasi 30 hari.
- **Level 4 (M05):** Deep-linking, conversion rate optimization (CRO), analitik performa, dan eksperimen A/B.
- **Level 5 (M06):** Monetisasi lanjutan, target keuangan, scaling batching produksi, kepatuhan, dan otomasi.`,
    source_ref: 'Pengantar',
    estimated_minutes: 10,
    is_free_preview: true,
    sort_order: 2,
    is_published: true,
    summary: 'Pahami 5 aturan emas kepatuhan dan peta perjalanan belajar dari Level 1 sampai Level 5.'
  },
  {
    id: 'l03',
    module_id: 'm00',
    title: 'Kamus Istilah Baku (Status Komisi, Funnel & Metrik)',
    slug: 'kamus-istilah-baku',
    content: `# Kamus Istilah Baku di Seluruh Materi

Semua modul dan workspace di platform ini menggunakan definisi baku berikut. Jika ada istilah yang terdengar berbeda di luar sana, patuhi tabel standar ini.

## Empat Status Komisi (DILARANG DIJUMLAHKAN)
1. **Estimasi:** Pesanan baru tercatat di sistem Shopee dan sedang menunggu pengiriman barang.
2. **Pending:** Barang telah sampai dan sedang dalam masa garansi retur/konfirmasi penerimaan pembeli.
3. **Disetujui:** Pesanan telah selesai tervalidasi dan siap dibayarkan pada periode settlement berikutnya.
4. **Dibayarkan:** Dana komisi resmi telah ditransfer ke saldo rekening/bank Anda.

> **PENTING:** Keempat status ini adalah fase perjalanan transaksi yang saling beririsan, BUKAN komponen pendapatan yang boleh ditambahkan menjadi satu total angka.

## Funnel Konversi Affiliate
**Views (Tayangan) $\\rightarrow$ Klik $\\rightarrow$ Pesanan $\\rightarrow$ Transaksi Memenuhi Syarat $\\rightarrow$ Komisi Disetujui $\\rightarrow$ Pembayaran.**

## Rumus Metrik Utama
- **CTR (Click-Through Rate):** $\\frac{\\text{Klik}}{\\text{Views}} \\times 100\\%$
- **CVR (Conversion Rate):** $\\frac{\\text{Pesanan}}{\\text{Klik}} \\times 100\\%$
- **CVR Valid:** $\\frac{\\text{Pesanan Memenuhi Syarat}}{\\text{Klik}} \\times 100\\%$
- **EPC (Earnings Per Click):** $\\frac{\\text{Komisi Disetujui}}{\\text{Klik}}$
- **RPM (Komisi per 1.000 Views):** $\\frac{\\text{Komisi Disetujui}}{\\text{Views}} \\times 1.000$
- **Rasio Pembatalan:** $\\frac{\\text{Pesanan Batal}}{\\text{Total Pesanan}} \\times 100\\%$`,
    source_ref: 'Kamus Istilah',
    estimated_minutes: 12,
    is_free_preview: true,
    sort_order: 3,
    is_published: true,
    summary: 'Kamus istilah baku: 4 status komisi, funnel konversi, dan rumus resmi CTR, CVR, EPC.'
  },
  {
    id: 'l04',
    module_id: 'm00',
    title: 'Panduan Menjalankan 6 Workspace Praktik & Sprint Awal',
    slug: 'panduan-workspace-dan-sprint-awal',
    content: `# Panduan Menjalankan 6 Workspace Praktik & Sprint Awal 14 Hari

Affiliate Academy bukan sekadar kursus bacaan, melainkan workspace kerja harian Anda. 

## Enam Workspace Digital yang Saling Terintegrasi
1. **Product Research Lab (\`/tools/products\`):** Catat produk, hitung skor 7 faktor berbobot (0–100), dan saring produk prioritas.
2. **Research Notes (\`/tools/research-notes\`):** Kumpulkan 10 masalah nyata audiens dan bedah 10 kompetitor.
3. **Content Creation Studio (\`/tools/content\`):** Pilih hook dari 30+ formula Hook Bank dan buat skrip terstruktur.
4. **Content Planner (\`/tools/planner\`):** Kalender jadwal publikasi dengan 9 alur status pengerjaan konten.
5. **Link Archive (\`/tools/links\`):** Manajemen tautan Shopee Affiliate agar terhindar dari promosi toko mati atau produk habis.
6. **Performance Tracker (\`/tools/tracker\`):** Evaluasi performa harian dan rekonsiliasi keuangan mingguan/bulanan.

## Panduan Sprint Awal 14 Hari
- **Hari 1–3:** Tentukan satu niche dan 1 audiens spesifik (Project 01).
- **Hari 4–7:** Evaluasi minimal 10 produk dan pilih 3–5 produk unggulan (Project 02).
- **Hari 8–10:** Riset 5–10 akun kompetitor dan temukan 10 celah konten (Project 03).
- **Hari 11–14:** Susun 30 ide konten, tulis 10 skrip, dan terbitkan konten pertama Anda (Project 04)!`,
    source_ref: 'Panduan Praktik',
    estimated_minutes: 10,
    is_free_preview: true,
    sort_order: 4,
    is_published: true,
    summary: 'Cara mengoptimalkan 6 workspace terpadu dan rencana aksi 14 hari pertama.'
  },
];

// Helper to add course modules
const levelMap = [
  {
    levelDir: 'LEVEL 1 — FUNDAMENTALS',
    moduleId: 'm01',
    startOrder: 5,
    files: [
      { name: 'Modul 01 Dasar Affiliate Marketing.md', slug: 'modul-01-dasar-affiliate-marketing', isPreview: true, ref: 'Modul 01' },
      { name: 'Modul 02 Shopee Affiliate Program dan Kebijakan.md', slug: 'modul-02-shopee-affiliate-program-dan-kebijakan', isPreview: false, ref: 'Modul 02' },
      { name: 'Modul 03 Persiapan Akun dan Operasional.md', slug: 'modul-03-persiapan-akun-dan-operasional', isPreview: false, ref: 'Modul 03' },
    ]
  },
  {
    levelDir: 'LEVEL 2 — MARKET AND PRODUCT RESEARCH',
    moduleId: 'm02',
    startOrder: 8,
    files: [
      { name: 'Modul 04 — Riset Pasar dan Permintaan.md', slug: 'modul-04-riset-pasar-dan-permintaan', isPreview: false, ref: 'Modul 04' },
      { name: 'Modul 05 — Niche, Audiens, dan Positioning.md', slug: 'modul-05-niche-audiens-dan-positioning', isPreview: false, ref: 'Modul 05' },
      { name: 'Modul 06 — Riset dan Evaluasi Produk.md', slug: 'modul-06-riset-dan-evaluasi-produk', isPreview: false, ref: 'Modul 06' },
      { name: 'Modul 07 — Riset Kompetitor.md', slug: 'modul-07-riset-kompetitor', isPreview: false, ref: 'Modul 07' },
    ]
  },
  {
    levelDir: 'LEVEL 3 — CONTENT AND TRAFFIC',
    moduleId: 'm03',
    startOrder: 12,
    files: [
      { name: 'Modul 08 — Strategi Channel dan Traffic Organik.md', slug: 'modul-08-strategi-channel-dan-traffic-organik', isPreview: false, ref: 'Modul 08' },
      { name: 'Modul 09 — Strategi Konten.md', slug: 'modul-09-strategi-konten', isPreview: false, ref: 'Modul 09' },
      { name: 'Modul 10 — Copywriting dan Hook.md', slug: 'modul-10-copywriting-dan-hook', isPreview: false, ref: 'Modul 10' },
      { name: 'Modul 11 — Produksi Video dan Visual.md', slug: 'modul-11-produksi-video-dan-visual', isPreview: false, ref: 'Modul 11' },
      { name: 'Modul 12 — SEO dan Konten Berbasis Pencarian.md', slug: 'modul-12-seo-dan-konten-berbasis-pencarian', isPreview: false, ref: 'Modul 12' },
    ]
  },
  {
    levelDir: 'LEVEL 3 — CONTENT AND TRAFFIC',
    moduleId: 'm04',
    startOrder: 17,
    files: [
      { name: 'Modul 13 — Distribusi dan Community Building.md', slug: 'modul-13-distribusi-dan-community-building', isPreview: false, ref: 'Modul 13' },
    ]
  },
  {
    levelDir: 'LEVEL 4 — CONVERSION AND ANALYTICS',
    moduleId: 'm05',
    startOrder: 20,
    files: [
      { name: 'Modul 14 — Affiliate Link dan Tracking.md', slug: 'modul-14-affiliate-link-dan-tracking', isPreview: false, ref: 'Modul 14' },
      { name: 'Modul 15 — Conversion Rate Optimization (CRO).md', slug: 'modul-15-conversion-rate-optimization', isPreview: false, ref: 'Modul 15' },
      { name: 'Modul 16 — Analytics dan Dashboard.md', slug: 'modul-16-analytics-dan-dashboard', isPreview: false, ref: 'Modul 16' },
      { name: 'Modul 17 — Eksperimen dan Validasi.md', slug: 'modul-17-eksperimen-dan-validasi', isPreview: false, ref: 'Modul 17' },
    ]
  },
  {
    levelDir: 'LEVEL 5 — PROFESSIONAL GROWTH',
    moduleId: 'm06',
    startOrder: 24,
    files: [
      { name: 'Modul 18 — Monetisasi dan Pemilihan Produk Lanjutan.md', slug: 'modul-18-monetisasi-dan-pemilihan-produk-lanjutan', isPreview: false, ref: 'Modul 18' },
      { name: 'Modul 19 — Keuangan dan Target Komisi.md', slug: 'modul-19-keuangan-dan-target-komisi', isPreview: false, ref: 'Modul 19' },
      { name: 'Modul 20 — Scaling dan Sistem Produksi.md', slug: 'modul-20-scaling-dan-sistem-produksi', isPreview: false, ref: 'Modul 20' },
      { name: 'Modul 21 — Kepatuhan, Risiko, dan Reputasi.md', slug: 'modul-21-kepatuhan-risiko-dan-reputasi', isPreview: false, ref: 'Modul 21' },
      { name: 'Modul 22 — Advanced Strategy.md', slug: 'modul-22-advanced-strategy', isPreview: false, ref: 'Modul 22' },
      { name: 'Modul 23 — Otomasi dan Sistem Kerja.md', slug: 'modul-23-otomasi-dan-sistem-kerja', isPreview: false, ref: 'Modul 23' },
      { name: 'Modul 24 — Evaluasi Bisnis dan Mastery.md', slug: 'modul-24-evaluasi-bisnis-dan-mastery', isPreview: false, ref: 'Modul 24' },
    ]
  }
];

let globalLessonCounter = 5;

levelMap.forEach(group => {
  group.files.forEach(f => {
    const rawContent = readModuleFile(group.levelDir, f.name);
    // Extract title from first line (# Modul ...)
    const titleMatch = rawContent.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : f.name.replace('.md', '');
    const summary = extractSummary(rawContent);

    lessons.push({
      id: `l${String(globalLessonCounter).padStart(2, '0')}`,
      module_id: group.moduleId,
      title: title,
      slug: f.slug,
      content: rawContent || `# ${title}\n\nMateri kurikulum sedang diproses.`,
      source_ref: f.ref,
      estimated_minutes: 15,
      is_free_preview: f.isPreview,
      sort_order: globalLessonCounter,
      is_published: true,
      summary: summary
    });
    globalLessonCounter++;
  });

  // Inject additional M04 lessons: Pelajaran 18 (Proyek Akhir 30 Hari) and Pelajaran 19 (Checklist QC)
  if (group.moduleId === 'm04') {
    lessons.push({
      id: `l18`,
      module_id: 'm04',
      title: 'Proyek Akhir Level 3: Sistem Konten Affiliate 30 Hari',
      slug: 'proyek-akhir-level-3-sistem-konten-30-hari',
      content: `# Proyek Akhir Level 3: Sistem Konten Affiliate 30 Hari

Rencana publikasi 30 hari ini adalah sistem produksi konten yang terbukti menghasilkan data dan klik organik.

## Alur Pembagian 30 Hari
- **Hari 1–3:** Riset mendalam audiens dan pemilihan 1 channel utama.
- **Hari 4–7:** Kurasi 3–5 produk unggulan di *Product Research Lab* dan catat 10 celah konten di *Research Notes*.
- **Hari 8–14 (Sprint Awal):** Tulis 10 naskah pertama menggunakan formula Hook Bank dan publikasikan minimal 7 konten.
- **Hari 15–21 (Fase Pengujian):** Pantau rasio CTR dan retensi penonton. Analisis format mana yang mendapatkan impresi tertinggi.
- **Hari 22–27 (Fase Optimasi):** Perbaiki titik lemah hook dan perjelas Call-to-Action (CTA).
- **Hari 28–30 (Evaluasi Bulanan):** Lakukan rekonsiliasi data mingguan di *Performance Tracker* dan rumuskan hipotesis eksperimen berikutnya.`,
      source_ref: 'Lampiran Modul 13',
      estimated_minutes: 12,
      is_free_preview: false,
      sort_order: 18,
      is_published: true,
      summary: 'Panduan eksekusi kalender sistem konten 30 hari dengan pembagian sprint yang terstruktur.'
    });

    lessons.push({
      id: `l19`,
      module_id: 'm04',
      title: 'Checklist Publikasi & 11 Butir Quality Control Konten',
      slug: 'checklist-publikasi-dan-11-butir-qc',
      content: `# Checklist Publikasi & 11 Butir Quality Control (QC)

Sebelum menekan tombol "Publish" pada video atau postingan affiliate Anda, lakukan pengecekan 11 butir QC wajib ini di *Content Creation Studio*:

## 11 Butir Quality Control (QC)
1. [ ] **Keaslian Produk:** Apakah Anda benar-benar memahami produk ini dan tidak membuat klaim bohong?
2. [ ] **Kualitas Hook:** Apakah 3 detik pertama memuat masalah nyata atau rasa penasaran yang relevan dengan audiens?
3. [ ] **Kualitas Visual & Audio:** Apakah pencahayaan jelas dan suara narasi jernih tanpa noise berlebih?
4. [ ] **Kesesuaian Resolusi:** Format video vertikal 9:16 untuk video pendek (TikTok, Reels, Shopee Video).
5. [ ] **Bukan Re-upload Kasar:** Konten adalah rekaman orisinal Anda, bukan potongan video orang lain tanpa nilai tambah.
6. [ ] **Kejelasan Solusi:** Apakah isi konten mendemonstrasikan manfaat produk secara objektif?
7. [ ] **Batasan Produk Diungkapkan:** Apakah kelemahan wajar atau batasan produk disebutkan agar terpercaya?
8. [ ] **Call to Action (CTA) Spesifik:** Apakah arahan membeli jelas (misal: "Link ada di keranjang oranye / bio nomor 05")?
9. [ ] **Wajib Affiliate Disclosure:** Tercantum penanda jelas bahwa link yang dibagikan adalah affiliate link.
10. [ ] **Link Telah Diuji:** Tautan affiliate diuji dan terbukti mengarah ke toko resmi yang aktif dan memiliki stok.
11. [ ] **Kepatuhan Aturan Shopee:** Tidak menggunakan logo Shopee resmi secara menyesatkan atau melanggar hak cipta.`,
      source_ref: 'Modul 11 & 21',
      estimated_minutes: 10,
      is_free_preview: false,
      sort_order: 19,
      is_published: true,
      summary: '11 butir pemeriksaan kepatuhan dan standar kualitas sebelum konten resmi diterbitkan.'
    });
  }
});

// Sort lessons by sort_order
lessons.sort((a, b) => a.sort_order - b.sort_order);

// 8 Practice Projects
const practiceProjects = [
  {
    id: 'p01',
    code: 'P01',
    title: 'Niche Research',
    objective: 'Memilih bidang dan audiens yang jelas serta memetakan 10 masalah nyata dengan bukti sumber.',
    supporting_modules: ['04', '05'],
    checklist: [
      { id: 'c1', label: 'Kumpulkan 20 masalah pembeli dari forum, komentar, atau ulasan produk' },
      { id: 'c2', label: 'Pilih satu niche spesifik yang memiliki permintaan nyata' },
      { id: 'c3', label: 'Tentukan profil satu persona audiens utama' },
      { id: 'c4', label: 'Saring 10 masalah audiens teratas dan pisahkan fakta dengan asumsi' }
    ],
    criteria: 'Niche dan audiens dapat dijelaskan dalam satu kalimat, serta setiap masalah memiliki bukti URL observasi.',
    sort_order: 1,
    is_published: true
  },
  {
    id: 'p02',
    code: 'P02',
    title: 'Product Research',
    objective: 'Memilih 3–5 produk awal menggunakan kalkulator evaluasi 7 faktor berbobot (skor 0–100).',
    supporting_modules: ['06'],
    checklist: [
      { id: 'c1', label: 'Analisis minimal 10–20 kandidat produk di Shopee' },
      { id: 'c2', label: 'Periksa komisi dan kelayakan toko di dashboard Shopee Affiliate' },
      { id: 'c3', label: 'Beri skor 7 faktor berbobot pada Product Research Lab' },
      { id: 'c4', label: 'Pilih 3–5 produk prioritas dengan skor >= 70 dan catat alasannya' }
    ],
    criteria: 'Setiap produk memiliki catatan tarif komisi, tanggal verifikasi, dan batas kriteria kapan produk akan dihentikan.',
    sort_order: 2,
    is_published: true
  },
  {
    id: 'p03',
    code: 'P03',
    title: 'Competitor Research',
    objective: 'Menemukan 10 celah konten pembeda dari 5–10 akun kompetitor tanpa menjiplak.',
    supporting_modules: ['07'],
    checklist: [
      { id: 'c1', label: 'Analisis 5–10 akun kompetitor di niche pilihan Anda' },
      { id: 'c2', label: 'Temukan 10 pertanyaan atau keluhan audiens yang belum terjawab baik' },
      { id: 'c3', label: 'Susun 3 sudut pandang (angle) konten pembeda yang belum digarap kompetitor' }
    ],
    criteria: 'Analisis diambil dari beberapa video kompetitor, memuat bukti komentar penonton, dan sudut pandang benar-benar unik.',
    sort_order: 3,
    is_published: true
  },
  {
    id: 'p04',
    code: 'P04',
    title: 'Content Production',
    objective: 'Menyusun 30 ide konten, 10 skrip lengkap, dan menerbitkan minimal 10 konten teruji.',
    supporting_modules: ['09', '10', '11'],
    checklist: [
      { id: 'c1', label: 'Susun 30 ide konten di Content Creation Studio' },
      { id: 'c2', label: 'Tulis 10 naskah lengkap dengan Hook Bank, bukti solusi, CTA, dan disclosure' },
      { id: 'c3', label: 'Produksi dan publikasikan minimal 10 konten yang lolos 11 butir QC' }
    ],
    criteria: 'Seluruh konten memenuhi checklist QC, tidak ada klaim tanpa bukti, dan tercatat URL serta tanggal terbitnya.',
    sort_order: 4,
    is_published: true
  },
  {
    id: 'p05',
    code: 'P05',
    title: 'First Conversion',
    objective: 'Memverifikasi jalur pelacakan link affiliate dan mendiagnosis drop-off konversi pertama.',
    supporting_modules: ['14', '15'],
    checklist: [
      { id: 'c1', label: 'Daftarkan semua tautan produk di Link Archive dan pastikan tujuan link benar' },
      { id: 'c2', label: 'Catat jumlah klik yang masuk di dashboard' },
      { id: 'c3', label: 'Lakukan diagnosis funnel jika terjadi drop-off antara klik dan pesanan' }
    ],
    criteria: 'Tautan affiliate teruji bebas dari self-purchase dan pengguna dapat menjelaskan di tahap funnel mana audiens drop.',
    sort_order: 5,
    is_published: true
  },
  {
    id: 'p06',
    code: 'P06',
    title: 'Analytics Dashboard',
    objective: 'Menyusun laporan mingguan dan membaca metrik CTR, CVR, EPC secara objektif.',
    supporting_modules: ['16'],
    checklist: [
      { id: 'c1', label: 'Input metrik harian ke Performance Tracker (Views, Klik, Pesanan)' },
      { id: 'c2', label: 'Pisahkan 4 status komisi (Estimasi, Pending, Disetujui, Dibayarkan)' },
      { id: 'c3', label: 'Buat laporan evaluasi mingguan dengan rekomendasi 1 tindakan spesifik' }
    ],
    criteria: 'Laporan keuangan terpisah dari angka performa harian dan tidak menjumlahkan komisi estimasi dengan uang cair.',
    sort_order: 6,
    is_published: true
  },
  {
    id: 'p07',
    code: 'P07',
    title: 'Optimization Sprint',
    objective: 'Mengeksekusi 1 eksperimen A/B terstruktur dengan hipotesis 4 bagian.',
    supporting_modules: ['17'],
    checklist: [
      { id: 'c1', label: 'Tulis hipotesis: Perubahan yang diuji, Alasan, Tolok ukur metrik, Kriteria keputusan' },
      { id: 'c2', label: 'Uji variasi konten dengan hanya mengubah 1 variabel utama (misal: hook kalimat pertama)' },
      { id: 'c3', label: 'Catat keputusan akhir: Lanjutkan, Optimalkan, Uji Ulang, Kurangi Prioritas, atau Hentikan' }
    ],
    criteria: 'Eksperimen memiliki baseline yang jelas dan kesimpulan tidak ditarik dari ukuran sampel yang terlalu sedikit.',
    sort_order: 7,
    is_published: true
  },
  {
    id: 'p08',
    code: 'P08',
    title: 'Business Growth Plan',
    objective: 'Menyusun target numerik komisi realistis, kalkulasi kebutuhan traffic, dan SOP produksi.',
    supporting_modules: ['19', '20', '24'],
    checklist: [
      { id: 'c1', label: 'Hitung mundur target komisi bulanan menuju target pesanan, klik, dan views yang dibutuhkan' },
      { id: 'c2', label: 'Tulis minimal 2 dokumen SOP di SOP Hub (SOP Syuting & SOP Quality Control)' },
      { id: 'c3', label: 'Rancang rencana delegasi atau batching produksi mingguan' }
    ],
    criteria: 'Proyeksi target masuk akal berdasarkan data konversi riil dan SOP siap dijalankan secara mandiri atau bersama tim.',
    sort_order: 8,
    is_published: true
  }
];

// Write output to src/data/curriculumData.ts
const outputFilePath = path.join(__dirname, '..', 'src', 'data', 'curriculumData.ts');

const fileHeader = `// AUTO-GENERATED CURRICULUM DATASET — SHOPEE AFFILIATE V2.0
// Synchronized with docs/course/ files. 7 Platform Modules, 30 Lessons, 8 Practice Projects.

export interface CurriculumModule {
  id: string;
  code: string;
  title: string;
  slug: string;
  description: string;
  sort_order: number;
  is_published: boolean;
}

export interface CurriculumLesson {
  id: string;
  module_id: string;
  title: string;
  slug: string;
  content: string;
  source_ref: string;
  estimated_minutes: number;
  is_free_preview: boolean;
  sort_order: number;
  is_published: boolean;
  summary: string;
}

export interface CurriculumProject {
  id: string;
  code: string;
  title: string;
  objective: string;
  supporting_modules: string[];
  checklist: Array<{ id: string; label: string }>;
  criteria: string;
  sort_order: number;
  is_published: boolean;
}

export const MODULES: CurriculumModule[] = ${JSON.stringify(modules, null, 2)};

export const LESSONS: CurriculumLesson[] = ${JSON.stringify(lessons, null, 2)};

export const PRACTICE_PROJECTS: CurriculumProject[] = ${JSON.stringify(practiceProjects, null, 2)};
`;

fs.writeFileSync(outputFilePath, fileHeader, 'utf-8');
console.log('Successfully compiled curriculumData.ts!');
console.log('Modules compiled:', modules.length);
console.log('Lessons compiled:', lessons.length);
console.log('Projects compiled:', practiceProjects.length);

// Generate Database SQL Seed Migration
const sqlEscape = (str) => {
  if (str === null || str === undefined) return "''";
  return "'" + String(str).replace(/'/g, "''") + "'";
};

let sqlContent = `-- ==============================================================================
-- SHOPEE AFFILIATE ACADEMY — MIGRATION 20261029000000_curriculum_text_ids_and_seed.sql
-- Aligns modules/lessons/projects IDs to TEXT and seeds 7 Modules, 30 Lessons, 8 Projects
-- ==============================================================================

-- 1. Ensure columns use TEXT and foreign keys are preserved
ALTER TABLE IF EXISTS public.lesson_progress DROP CONSTRAINT IF EXISTS lesson_progress_lesson_id_fkey;
ALTER TABLE IF EXISTS public.lessons DROP CONSTRAINT IF EXISTS lessons_module_id_fkey;
ALTER TABLE IF EXISTS public.project_progress DROP CONSTRAINT IF EXISTS project_progress_project_id_fkey;

ALTER TABLE IF EXISTS public.modules ALTER COLUMN id TYPE TEXT;
ALTER TABLE IF EXISTS public.lessons ALTER COLUMN id TYPE TEXT;
ALTER TABLE IF EXISTS public.lessons ALTER COLUMN module_id TYPE TEXT;
ALTER TABLE IF EXISTS public.lesson_progress ALTER COLUMN lesson_id TYPE TEXT;
ALTER TABLE IF EXISTS public.practice_projects ALTER COLUMN id TYPE TEXT;
ALTER TABLE IF EXISTS public.project_progress ALTER COLUMN project_id TYPE TEXT;

ALTER TABLE IF EXISTS public.lessons 
  ADD CONSTRAINT lessons_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS public.lesson_progress 
  ADD CONSTRAINT lesson_progress_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS public.project_progress 
  ADD CONSTRAINT project_progress_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.practice_projects(id) ON DELETE CASCADE;

-- 2. Seed Modules
`;

modules.forEach((m) => {
  sqlContent += `INSERT INTO public.modules (id, code, title, slug, description, sort_order, is_published)
VALUES (${sqlEscape(m.id)}, ${sqlEscape(m.code)}, ${sqlEscape(m.title)}, ${sqlEscape(m.slug)}, ${sqlEscape(m.description)}, ${m.sort_order}, ${m.is_published})
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

`;
});

sqlContent += `\n-- 3. Seed Lessons\n`;

lessons.forEach((l) => {
  sqlContent += `INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES (${sqlEscape(l.id)}, ${sqlEscape(l.module_id)}, ${sqlEscape(l.title)}, ${sqlEscape(l.slug)}, ${sqlEscape(l.content)}, ${sqlEscape(l.source_ref)}, ${l.estimated_minutes}, ${l.is_free_preview}, ${l.sort_order}, ${l.is_published})
ON CONFLICT (id) DO UPDATE SET
  module_id = EXCLUDED.module_id,
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  content = EXCLUDED.content,
  source_ref = EXCLUDED.source_ref,
  estimated_minutes = EXCLUDED.estimated_minutes,
  is_free_preview = EXCLUDED.is_free_preview,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

`;
});

sqlContent += `\n-- 4. Seed Practice Projects\n`;

practiceProjects.forEach((p) => {
  sqlContent += `INSERT INTO public.practice_projects (id, code, title, objective, supporting_modules, checklist, sort_order, is_published)
VALUES (${sqlEscape(p.id)}, ${sqlEscape(p.code)}, ${sqlEscape(p.title)}, ${sqlEscape(p.objective)}, ${sqlEscape(JSON.stringify(p.supporting_modules))}::jsonb, ${sqlEscape(JSON.stringify(p.checklist))}::jsonb, ${p.sort_order}, ${p.is_published})
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  objective = EXCLUDED.objective,
  supporting_modules = EXCLUDED.supporting_modules,
  checklist = EXCLUDED.checklist,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

`;
});

const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20261029000000_curriculum_text_ids_and_seed.sql');
fs.writeFileSync(migrationPath, sqlContent, 'utf-8');
console.log('Successfully generated Supabase migration:', migrationPath);
