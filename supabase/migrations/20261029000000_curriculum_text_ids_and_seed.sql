-- ==============================================================================
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
INSERT INTO public.modules (id, code, title, slug, description, sort_order, is_published)
VALUES ('m00', 'M00', 'Start Here — Pengantar & Orientasi', 'start-here', 'Pahami cara belajar, aturan emas Shopee Affiliate, kamus istilah, dan panduan menjalankan 6 workspace praktik.', 0, true)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

INSERT INTO public.modules (id, code, title, slug, description, sort_order, is_published)
VALUES ('m01', 'M01', 'Affiliate Fundamentals (Level 1)', 'affiliate-fundamentals', 'Dasar affiliate marketing, aturan komisi Shopee Affiliate resmi, dan persiapan akun operasional.', 1, true)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

INSERT INTO public.modules (id, code, title, slug, description, sort_order, is_published)
VALUES ('m02', 'M02', 'Product Research Lab (Level 2)', 'product-research-lab', 'Riset pasar dan permintaan, pemilihan niche audiens, evaluasi skor produk 7 faktor, dan riset kompetitor.', 2, true)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

INSERT INTO public.modules (id, code, title, slug, description, sort_order, is_published)
VALUES ('m03', 'M03', 'Content Creation Studio (Level 3 - Bagian 1)', 'content-creation-studio', 'Strategi channel organik, pilar konten, hook bank formula, produksi video, dan optimasi SEO pencarian.', 3, true)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

INSERT INTO public.modules (id, code, title, slug, description, sort_order, is_published)
VALUES ('m04', 'M04', 'Publishing Sprint (Level 3 - Bagian 2)', 'publishing-sprint', 'Distribusi konten, kalender publikasi 30 hari (Sprint Awal 14 Hari), dan 11 butir Quality Control sebelum terbit.', 4, true)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

INSERT INTO public.modules (id, code, title, slug, description, sort_order, is_published)
VALUES ('m05', 'M05', 'Analyze & Improve (Level 4)', 'analyze-and-improve', 'Manajemen link affiliate, optimasi conversion rate (CRO), analytics dashboard, dan eksperimen validasi A/B.', 5, true)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

INSERT INTO public.modules (id, code, title, slug, description, sort_order, is_published)
VALUES ('m06', 'M06', 'Professional Growth (Level 5)', 'professional-growth', 'Monetisasi lanjutan, manajemen keuangan komisi, sistem scaling batching, kepatuhan risiko, dan otomasi alur kerja.', 6, true)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;


-- 3. Seed Lessons
INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l01', 'm00', 'Selamat Datang dan Cara Belajar di Affiliate Academy', 'selamat-datang-dan-cara-belajar', '# Selamat Datang dan Cara Belajar di Affiliate Academy

Selamat datang di **Shopee Affiliate Academy**! Materi ini mengajarkan cara membangun bisnis Shopee Affiliate dari nol dengan pendekatan berbasis data dan eksekusi terstruktur.

## Misi Pembelajaran
Membangun bisnis Shopee Affiliate yang terukur, berkelanjutan, dan berkembang melalui strategi traffic organik tanpa perlu modal stok barang.

> **PENTING DIBACA:** Tidak ada jaminan penghasilan instan. Hasil Anda bergantung pada pilihan produk, kualitas konten, kebutuhan pasar, dan kepatuhan pada aturan program resmi Shopee. Semua keputusan di platform ini didasarkan pada data nyata, bukan tebakan.

## Cara Belajar yang Efektif
1. **Belajar Berurutan:** Mulai dari Modul 01. Setiap modul dirancang menggunakan output dari modul sebelumnya.
2. **Baca Lalu Praktik:** Selesaikan *Tugas dan Checklist* di akhir setiap pelajaran sebelum melanjutkan ke modul berikutnya.
3. **Gunakan 6 Workspace:** Jangan biarkan data Anda berserakan di catatan kertas. Catat riset Anda langsung di menu **6 Workspace** yang tersedia di platform ini.
4. **Verifikasi Aturan Resmi:** Sebelum mempromosikan produk, selalu periksa dashboard Shopee Affiliate Anda untuk mencatat tanggal dan komisi terbaru.', 'Pengantar', 8, true, 1, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l02', 'm00', 'Peta Belajar dan 5 Aturan Emas Shopee Affiliate', 'peta-belajar-dan-5-aturan-emas', '# Peta Belajar dan 5 Aturan Emas Shopee Affiliate

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
- **Level 5 (M06):** Monetisasi lanjutan, target keuangan, scaling batching produksi, kepatuhan, dan otomasi.', 'Pengantar', 10, true, 2, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l03', 'm00', 'Kamus Istilah Baku (Status Komisi, Funnel & Metrik)', 'kamus-istilah-baku', '# Kamus Istilah Baku di Seluruh Materi

Semua modul dan workspace di platform ini menggunakan definisi baku berikut. Jika ada istilah yang terdengar berbeda di luar sana, patuhi tabel standar ini.

## Empat Status Komisi (DILARANG DIJUMLAHKAN)
1. **Estimasi:** Pesanan baru tercatat di sistem Shopee dan sedang menunggu pengiriman barang.
2. **Pending:** Barang telah sampai dan sedang dalam masa garansi retur/konfirmasi penerimaan pembeli.
3. **Disetujui:** Pesanan telah selesai tervalidasi dan siap dibayarkan pada periode settlement berikutnya.
4. **Dibayarkan:** Dana komisi resmi telah ditransfer ke saldo rekening/bank Anda.

> **PENTING:** Keempat status ini adalah fase perjalanan transaksi yang saling beririsan, BUKAN komponen pendapatan yang boleh ditambahkan menjadi satu total angka.

## Funnel Konversi Affiliate
**Views (Tayangan) $\rightarrow$ Klik $\rightarrow$ Pesanan $\rightarrow$ Transaksi Memenuhi Syarat $\rightarrow$ Komisi Disetujui $\rightarrow$ Pembayaran.**

## Rumus Metrik Utama
- **CTR (Click-Through Rate):** $\frac{\text{Klik}}{\text{Views}} \times 100\%$
- **CVR (Conversion Rate):** $\frac{\text{Pesanan}}{\text{Klik}} \times 100\%$
- **CVR Valid:** $\frac{\text{Pesanan Memenuhi Syarat}}{\text{Klik}} \times 100\%$
- **EPC (Earnings Per Click):** $\frac{\text{Komisi Disetujui}}{\text{Klik}}$
- **RPM (Komisi per 1.000 Views):** $\frac{\text{Komisi Disetujui}}{\text{Views}} \times 1.000$
- **Rasio Pembatalan:** $\frac{\text{Pesanan Batal}}{\text{Total Pesanan}} \times 100\%$', 'Kamus Istilah', 12, true, 3, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l04', 'm00', 'Panduan Menjalankan 6 Workspace Praktik & Sprint Awal', 'panduan-workspace-dan-sprint-awal', '# Panduan Menjalankan 6 Workspace Praktik & Sprint Awal 14 Hari

Affiliate Academy bukan sekadar kursus bacaan, melainkan workspace kerja harian Anda. 

## Enam Workspace Digital yang Saling Terintegrasi
1. **Product Research Lab (`/tools/products`):** Catat produk, hitung skor 7 faktor berbobot (0–100), dan saring produk prioritas.
2. **Research Notes (`/tools/research-notes`):** Kumpulkan 10 masalah nyata audiens dan bedah 10 kompetitor.
3. **Content Creation Studio (`/tools/content`):** Pilih hook dari 30+ formula Hook Bank dan buat skrip terstruktur.
4. **Content Planner (`/tools/planner`):** Kalender jadwal publikasi dengan 9 alur status pengerjaan konten.
5. **Link Archive (`/tools/links`):** Manajemen tautan Shopee Affiliate agar terhindar dari promosi toko mati atau produk habis.
6. **Performance Tracker (`/tools/tracker`):** Evaluasi performa harian dan rekonsiliasi keuangan mingguan/bulanan.

## Panduan Sprint Awal 14 Hari
- **Hari 1–3:** Tentukan satu niche dan 1 audiens spesifik (Project 01).
- **Hari 4–7:** Evaluasi minimal 10 produk dan pilih 3–5 produk unggulan (Project 02).
- **Hari 8–10:** Riset 5–10 akun kompetitor dan temukan 10 celah konten (Project 03).
- **Hari 11–14:** Susun 30 ide konten, tulis 10 skrip, dan terbitkan konten pertama Anda (Project 04)!', 'Panduan Praktik', 10, true, 4, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l05', 'm01', 'Modul 01: Dasar Affiliate Marketing', 'modul-01-dasar-affiliate-marketing', '# Modul 01: Dasar Affiliate Marketing

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Menjelaskan pengertian affiliate marketing dengan bahasa sendiri.
- Membedakan affiliate, reseller, dropshipper, dan seller.
- Menjelaskan cara kerja bisnis affiliate dari awal sampai komisi.
- Menjelaskan peran setiap pihak yang terlibat.
- Menghitung komisi dengan asumsi yang jelas.
- Membedakan omzet, nilai pesanan, komisi, dan hasil setelah biaya.
- Menjelaskan traffic, klik, konversi, dan atribusi.
- Menyebutkan potensi, keterbatasan, dan risiko bisnis affiliate.
- Membedakan pendapatan estimasi dengan pendapatan aktual.

## 2. Ringkasan Konsep Utama

1. Affiliate marketing adalah model bisnis: kamu mempromosikan produk milik pihak lain dan mendapat komisi jika terjadi tindakan yang memenuhi ketentuan program.
2. Affiliate tidak perlu punya produk, stok, atau pengiriman. Penjual dan marketplace yang menangani penjualan dan pengiriman.
3. Pekerjaan affiliate bukan sekadar membagikan link. Kamu perlu memahami kebutuhan pembeli, memilih produk, membuat konten, mendatangkan traffic, dan memantau hasil.
4. Prosesnya ada enam tahap: memilih produk, membuat konten, mendapat klik, terjadi pembelian, transaksi divalidasi, komisi diproses.
5. Rumus komisi: Komisi = Dasar Komisi × Tarif Komisi. Dasar komisi belum tentu sama dengan harga di halaman produk.
6. Omzet, nilai pesanan, komisi, dan hasil setelah biaya adalah empat hal berbeda.
7. Traffic, klik (CTR), konversi (CVR), dan atribusi adalah fondasi analisis performa. Metrik-metrik ini saling berkaitan, tetapi tidak saling menggantikan.
8. Status komisi punya empat tahap berurutan: Estimasi, Pending, Disetujui, Dibayarkan. Jangan menjumlahkannya begitu saja.

## 3. Penjelasan

### 3.1 Pengertian affiliate marketing

Affiliate marketing adalah model bisnis ketika kamu mempromosikan produk atau layanan milik pihak lain. Kamu mendapat komisi jika terjadi tindakan yang memenuhi ketentuan program.

Dalam Shopee Affiliate, kamu memperkenalkan produk yang dijual di Shopee kepada calon pembeli lewat konten atau kanal promosi yang diizinkan. Jika seseorang membeli lewat jalur promosi yang memenuhi ketentuan, transaksi itu dapat menghasilkan komisi untukmu.

Kamu tidak perlu punya produk sendiri, menyimpan stok, mengemas pesanan, atau mengirim barang. Penjual dan marketplace menangani penjualan dan pengiriman sesuai sistem mereka.

**Contoh sederhana.** Kamu menemukan botol minum seharga Rp100.000 di Shopee. Kamu membuat video yang menjelaskan:

- Bentuk dan ukuran botol.
- Fitur yang tersedia.
- Siapa yang cocok memakainya.
- Hal yang perlu diperhatikan sebelum membeli.

Kamu menyertakan affiliate link sesuai ketentuan program. Seseorang menonton videomu, mengeklik link, lalu membeli botol itu. Jika transaksinya memenuhi syarat komisi, kamu mendapat komisi.

Penghasilanmu berasal dari aktivitas promosi, bukan dari selisih harga jual dan harga modal.

> Inti affiliate marketing: membantu calon pembeli menemukan produk yang relevan, lalu mendapat komisi atas transaksi yang memenuhi ketentuan program.

### 3.2 Apakah affiliate hanya membagikan link?

Tidak. Membagikan link hanya satu bagian dari pekerjaan. Agar berpeluang menghasilkan penjualan, kamu juga perlu:

1. Memahami kebutuhan calon pembeli.
2. Memilih produk yang relevan.
3. Membuat konten yang menarik dan bermanfaat.
4. Mendatangkan pengunjung yang tepat.
5. Membantu calon pembeli mengambil keputusan.
6. Memantau klik, transaksi, komisi, dan hasilnya.

Link tanpa traffic tidak menghasilkan kunjungan. Traffic tanpa ketertarikan pada produk belum tentu menghasilkan pembelian.

### 3.3 Perbedaan affiliate, reseller, dropshipper, dan seller

Keempat model ini berkaitan dengan penjualan produk, tetapi cara memperoleh penghasilan dan tanggung jawabnya berbeda.

| Aspek | Affiliate | Reseller | Dropshipper | Seller |
| --- | --- | --- | --- | --- |
| Produk sendiri | Tidak wajib | Tidak wajib | Tidak wajib | Bisa sendiri atau produk pihak lain |
| Membeli stok | Tidak wajib | Biasanya ya | Biasanya tidak | Tergantung model usaha |
| Menangani pesanan | Tidak secara langsung | Biasanya ya | Biasanya mengurus pesanan ke pemasok | Ya, atau melalui pihak yang membantu |
| Pengiriman | Ditangani penjual | Ditangani sendiri atau pihak lain | Pemasok biasanya mengirim | Ditangani sendiri atau mitra |
| Sumber penghasilan | Komisi | Selisih harga jual dan biaya | Selisih harga jual dan biaya | Margin penjualan |
| Risiko stok | Rendah | Bisa tinggi | Umumnya rendah | Bergantung model usaha |
| Fokus utama | Promosi dan konversi | Penjualan dan pengelolaan stok | Penjualan dan koordinasi pemasok | Pengelolaan penjualan dan bisnis |

Praktik reseller, dropshipper, dan seller bisa berbeda tergantung sistem bisnisnya.

**A. Affiliate.** Mempromosikan produk memakai link atau mekanisme pelacakan yang disediakan program.

- Harga produk: Rp100.000.
- Asumsi komisi: 5% dari nilai yang memenuhi syarat.
- Komisi: Rp5.000.

Affiliate tidak menerima Rp100.000 sebagai pendapatan. Pendapatannya adalah komisi yang memenuhi ketentuan program.

**B. Reseller.** Membeli produk dari pemasok atau penjual lain, lalu menjualnya kembali.

- Harga beli: Rp60.000.
- Harga jual: Rp100.000.
- Selisih harga: Rp40.000.

Selisih Rp40.000 belum tentu menjadi untung bersih. Masih ada biaya operasional, pengiriman, promosi, dan biaya lain.

**C. Dropshipper.** Menjual produk tanpa menyimpan stok sendiri. Saat ada pesanan, dropshipper meneruskannya ke pemasok yang mengirim barang.

- Harga dari pemasok: Rp70.000.
- Harga jual: Rp100.000.
- Selisih awal: Rp30.000.

Selisih ini masih dikurangi biaya yang ditanggung dropshipper.

**D. Seller.** Pihak yang menjual produk kepada pembeli. Seller bisa memproduksi sendiri, membeli dari pemasok, atau memakai model lain. Seller umumnya bertanggung jawab atas pengelolaan penjualan dan kewajiban transaksi, meskipun sebagian proses bisa dialihkan ke mitra.

**Kesimpulan.** Jika kamu ingin mulai dengan modal uang Rp0, affiliate relatif ringan karena kamu tidak perlu membeli stok. Namun, modal Rp0 bukan berarti tanpa biaya. Kamu tetap butuh waktu, perangkat, koneksi internet, dan tenaga untuk membuat konten.

### 3.4 Peran pihak yang terlibat

Ada empat pihak utama.

**A. Affiliate.** Tugasnya:

- Menemukan produk yang relevan.
- Membuat dan menyebarkan konten.
- Mengarahkan calon pembeli ke produk.
- Mematuhi kebijakan program dan platform promosi.
- Memantau performa dan komisi.

Affiliate tidak punya kendali penuh atas stok, harga, kualitas layanan penjual, keputusan pembeli, atau perubahan kebijakan marketplace.

**B. Merchant atau penjual.** Pihak yang menawarkan produk. Perannya: menyediakan produk, informasi produk, harga, stok, dan memenuhi pesanan. Kualitas layanan penjual memengaruhi kepercayaan pembeli.

**C. Marketplace.** Platform tempat transaksi berlangsung. Di materi ini, marketplace adalah Shopee. Sesuai program yang berlaku, marketplace menyediakan sistem belanja, pelacakan, validasi transaksi, penghitungan komisi, dan pengelolaan pembayaran affiliate.

**D. Pembeli.** Orang yang mencari informasi, membandingkan produk, lalu memutuskan membeli atau tidak. Pembeli tidak wajib membeli hanya karena mengeklik affiliate link.

**Hubungan keempat pihak.** Affiliate membantu pembeli menemukan produk. Penjual menyediakan dan memenuhi pesanan. Marketplace memfasilitasi transaksi dan mengelola sistemnya. Pembeli memutuskan apakah produk cocok. Jika satu bagian bermasalah, hasil affiliate ikut terpengaruh.

### 3.5 Cara kerja komisi

Komisi adalah imbalan yang bisa diperoleh affiliate ketika transaksi atau tindakan tertentu memenuhi ketentuan program.

Komisi tidak selalu dihitung dari seluruh nilai pesanan. Dasar perhitungannya bisa bergantung pada kategori produk, tarif yang berlaku, jenis program, transaksi yang memenuhi syarat, dan ketentuan khusus.

**Faktor yang memengaruhi komisi:**

- Harga dan dasar perhitungan komisi.
- Tarif komisi untuk produk atau program.
- Status dan kelayakan transaksi.
- Pembatalan atau retur.
- Ketentuan atribusi.
- Validasi transaksi.
- Perubahan kebijakan program.

> Prinsip utama: jangan menghitung pendapatan dengan asumsi bahwa setiap klik pasti menghasilkan komisi.

### 3.6 Omzet, nilai pesanan, komisi, dan hasil setelah biaya

**A. Omzet.** Total nilai penjualan yang dihasilkan bisnis dalam periode tertentu. Omzet toko bukan penghasilan affiliate. Kamu tidak otomatis menerima seluruh nilai penjualan itu.

**B. Nilai pesanan.** Nilai satu pesanan pembeli. Nilainya bisa berbeda dari dasar komisi karena diskon, voucher, ongkos kirim, koin, atau ketentuan program. Dasar komisi mengikuti definisi program yang berlaku, bukan ditentukan sendiri oleh affiliate.

**C. Komisi.** Imbalan yang diperoleh affiliate dari transaksi yang memenuhi ketentuan.

**D. Hasil setelah biaya.** Komisi dikurangi biaya usaha yang relevan. Ada dua basis (lihat bagian 6.5). Istilah "profit bersih" baru dipakai setelah pajak dan kewajiban lain dihitung.

**Kesalahan yang harus dihindari:**

- Menganggap nilai penjualan toko sebagai penghasilan pribadi.
- Menganggap semua komisi estimasi pasti dibayar.
- Mengabaikan biaya operasional.
- Menganggap komisi tinggi otomatis berarti hasil tinggi.

### 3.7 Traffic, klik, konversi, dan atribusi

**A. Traffic** adalah aliran orang yang melihat dan mendatangi konten atau halaman yang kamu promosikan. Contoh sumber traffic: TikTok, Instagram, YouTube, Facebook, artikel website, dan Shopee Video.

Traffic tidak selalu berarti orang yang ingin membeli. Sebagian pengunjung hanya mencari hiburan atau informasi. Contoh: video mendapat 10.000 tayangan (views). Angka itu adalah jumlah tayangan yang dicatat platform, bukan 10.000 orang unik atau 10.000 calon pembeli.

**B. Klik** adalah tindakan mengeklik link atau elemen yang mengarahkan calon pembeli ke produk. CTR membantu menilai apakah konten dan penawaranmu cukup menarik untuk mendorong klik.

**C. Konversi** adalah tindakan yang menjadi tujuan bisnis. Dalam affiliate berbasis penjualan, konversi biasanya berarti pembelian lewat jalur yang bisa diatribusikan ke affiliate. Ingat: 10 pesanan yang tercatat belum tentu semuanya memenuhi syarat komisi.

**D. Atribusi** adalah proses menentukan apakah suatu transaksi dapat dikaitkan dengan promosi affiliate tertentu. Alur contohnya:

1. Pembeli mengeklik affiliate link A.
2. Pembeli melihat produk.
3. Pembeli kembali dan menyelesaikan transaksi.
4. Sistem memeriksa apakah transaksi memenuhi aturan atribusi.
5. Komisi diberikan atau tidak, sesuai hasil pemeriksaan dan ketentuan program.

Atribusi dipengaruhi waktu klik, klik affiliate lain, kanal yang dipakai, dan ketentuan teknis program. Angka masa atribusi dibahas di Modul 02. Jangan menganggap setiap pembelian setelah seseorang melihat kontenmu otomatis menjadi transaksimu.

**Hubungan seluruh metrik:**

| Metrik | Pertanyaan yang dijawab |
| --- | --- |
| Tayangan (views) | Berapa banyak tayangan yang tercatat? |
| Klik | Berapa banyak orang mengeklik link? |
| CTR | Seberapa efektif konten mendorong klik? |
| Pesanan | Berapa banyak pesanan yang tercatat? |
| CVR (conversion rate) | Seberapa banyak klik menghasilkan pesanan? |
| Transaksi memenuhi syarat | Berapa transaksi yang memenuhi ketentuan? |
| Komisi | Berapa imbalan yang dihasilkan? |
| Hasil setelah biaya | Berapa yang tersisa setelah biaya? |

### 3.8 Potensi dan keterbatasan affiliate marketing

**Potensi:**

1. **Tidak harus punya produk sendiri.** Kamu bisa mulai dengan produk yang sudah ada di marketplace.
2. **Tidak harus membeli stok.** Kamu tidak perlu membeli barang hanya untuk mempromosikannya. Namun, produk yang belum pernah kamu coba harus dijelaskan jujur, berdasarkan informasi yang bisa diverifikasi.
3. **Bisa dimulai dengan modal uang terbatas.** Manfaatkan perangkat dan kanal organik yang sudah ada.
4. **Konten bisa terus mendatangkan pengunjung.** Konten yang relevan bisa ditemukan kembali setelah dipublikasikan, tetapi traffic tidak dijamin bertahan.
5. **Bisa dievaluasi dengan data.** Kamu bisa mengukur tayangan, klik, pesanan, komisi, dan hasil setelah biaya untuk memperbaiki strategi.

**Keterbatasan:**

1. **Tidak ada jaminan penghasilan.** Permintaan pasar, kualitas produk, harga, dan kepercayaan audiens ikut menentukan.
2. **Bergantung pada kebijakan program.** Tarif komisi, kelayakan transaksi, atribusi, dan metode pembayaran bisa berubah.
3. **Tidak semua traffic berkualitas.** Video viral belum tentu menghasilkan banyak klik atau pembelian.
4. **Komisi bisa dibatalkan atau tidak memenuhi syarat.** Penyebabnya: pembatalan, retur, pelanggaran, atau ketentuan lain.
5. **Persaingan konten.** Produk populer dipromosikan banyak kreator. Kamu perlu alasan yang jelas agar kontenmu tetap relevan.
6. **Kepercayaan butuh waktu.** Konten yang berlebihan, menyesatkan, atau terlalu menjual mengurangi kepercayaan audiens.

**Kesimpulan strategis.** Modal Rp0 menurunkan biaya awal, tetapi membatasi kecepatan produksi jika perangkat, waktu, dan kemampuan masih terbatas. Karena itu, tujuan awalmu bukan langsung mengejar komisi besar. Tujuan awalmu: membuktikan bahwa kamu bisa membuat konten yang menghasilkan klik relevan, transaksi yang memenuhi syarat, dan komisi yang benar-benar dibayarkan.

### 3.9 Pendapatan estimasi vs pendapatan aktual

**Pendapatan estimasi** adalah perkiraan komisi dari data atau perhitungan sementara. Nilainya bisa berubah karena validasi transaksi, pembatalan, retur, koreksi, atau ketentuan program.

**Pendapatan aktual** perlu diperjelas sesuai konteks. Komisi yang tercatat sebagai hasil aktual belum tentu sudah menjadi uang di tanganmu. Untuk pencatatan yang akurat, pakai empat status berurutan:

| Tahap | Status | Pengertian |
| --- | --- | --- |
| 1 | Estimasi | Perkiraan komisi, belum final |
| 2 | Pending | Komisi atau transaksi masih menunggu proses yang disyaratkan |
| 3 | Disetujui | Komisi sudah memenuhi tahap persetujuan yang ditampilkan sistem |
| 4 | Dibayarkan | Dana sudah diproses atau diterima sesuai bukti pembayaran |

Nama status di dashboard Shopee bisa berbeda. Pakai nama yang benar-benar tampil di akunmu.

**Contoh.** Dashboard menunjukkan:

- Estimasi komisi: Rp500.000.
- Komisi Pending: Rp300.000.
- Komisi Disetujui: Rp200.000.
- Komisi Dibayarkan: Rp150.000.

Jangan menjumlahkan keempat angka itu menjadi Rp1.150.000. Angka-angka itu bisa menggambarkan tahap atau kelompok transaksi yang saling beririsan. Untuk tahu pendapatan sebenarnya, periksa periode, definisi tiap status, dan apakah nominalnya merujuk pada transaksi yang sama.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Affiliate marketing | Model bisnis: mempromosikan produk atau layanan pihak lain dan mendapat komisi jika terjadi tindakan yang memenuhi ketentuan program |
| Affiliate | Pihak yang mempromosikan produk dengan link atau mekanisme pelacakan yang disediakan program |
| Reseller | Pihak yang membeli produk dari pemasok atau penjual lain, lalu menjualnya kembali |
| Dropshipper | Pihak yang menjual produk tanpa menyimpan stok; pesanan diteruskan ke pemasok yang mengirim |
| Seller | Pihak yang menjual produk kepada pembeli; bisa memproduksi sendiri, membeli dari pemasok, atau model lain |
| Merchant/penjual | Pihak yang menawarkan produk; menyediakan produk, informasi, harga, stok, dan memenuhi pesanan |
| Marketplace | Platform tempat transaksi berlangsung (di materi ini: Shopee) |
| Pembeli | Orang yang mencari informasi, membandingkan produk, lalu memutuskan membeli atau tidak |
| Komisi | Imbalan yang bisa diperoleh affiliate ketika transaksi atau tindakan tertentu memenuhi ketentuan program |
| Dasar komisi | Nilai yang menjadi basis perhitungan komisi; tidak otomatis sama dengan harga di halaman produk |
| Omzet | Total nilai penjualan bisnis dalam periode tertentu |
| Nilai pesanan | Nilai satu pesanan pembeli; bisa berbeda dari dasar komisi karena diskon, voucher, ongkos kirim, koin, atau ketentuan program |
| Hasil setelah biaya | Komisi dikurangi biaya usaha; basis kas memakai komisi dibayarkan, basis kinerja memakai komisi disetujui |
| Traffic | Aliran orang yang melihat dan mendatangi konten atau halaman yang dipromosikan |
| Klik | Tindakan mengeklik link yang mengarahkan calon pembeli ke produk |
| CTR | Klik ÷ Tayangan (views) × 100%; menilai seberapa efektif konten mendorong klik |
| Konversi | Tindakan yang menjadi tujuan bisnis; di affiliate berbasis penjualan biasanya berarti pembelian lewat jalur yang bisa diatribusikan |
| CVR (conversion rate) | Pesanan ÷ Klik × 100% |
| Atribusi | Proses menentukan apakah suatu transaksi bisa dikaitkan dengan promosi affiliate tertentu |
| Pendapatan estimasi | Perkiraan komisi dari data sementara; masih bisa berubah |

## 5. Langkah Praktik: Cara Kerja Bisnis Affiliate

Proses affiliate terdiri dari enam tahap.

1. **Memilih produk.** Temukan produk yang relevan dan layak direkomendasikan.
2. **Membuat konten.** Bantu calon pembeli memahami manfaat dan kekurangan produk.
3. **Mendapat klik.** Calon pembeli mengeklik affiliate link.
4. **Terjadi pembelian.** Pembeli bertransaksi lewat mekanisme marketplace.
5. **Transaksi divalidasi.** Sistem memeriksa apakah transaksi memenuhi ketentuan komisi.
6. **Komisi diproses.** Komisi mengikuti status validasi dan aturan pembayaran yang berlaku.

**Penjelasan tiap tahap:**

- **Tahap 1, memilih produk.** Jangan memilih produk hanya karena komisinya terlihat besar. Pertimbangkan kualitas, kebutuhan pembeli, harga, reputasi penjual, ulasan, dan kemampuanmu menjelaskan produk.
- **Tahap 2, membuat konten.** Konten bisa berupa demonstrasi, tutorial, perbandingan, ulasan jujur, atau penjelasan masalah yang bisa dibantu produk. Jangan membuat klaim yang tidak bisa dibuktikan. Jangan berpura-pura pernah memakai produk yang belum kamu coba.
- **Tahap 3, mendapat klik.** Orang yang tertarik mengeklik link untuk melihat detail produk. Jumlah klik belum membuktikan penjualan akan terjadi.
- **Tahap 4, terjadi pembelian.** Pembeli bisa memasukkan produk ke keranjang tanpa membayar. Karena itu, klik tidak sama dengan transaksi.
- **Tahap 5, transaksi divalidasi.** Pesanan yang terlihat belum tentu memenuhi semua syarat komisi. Statusnya bisa berubah karena pembatalan, retur, validasi, atau ketentuan program.
- **Tahap 6, komisi diproses.** Komisi bisa melewati beberapa status sebelum dibayarkan. Selalu periksa status aktual di dashboard, bukan hanya perkiraan pendapatan.

## 6. Contoh dan Perhitungan

Semua tarif komisi di bawah ini adalah simulasi untuk belajar, bukan tarif resmi Shopee.

### 6.1 Rumus dasar komisi

```
Komisi = Dasar Komisi × Tarif Komisi
```

Tentukan dasar komisi lebih dulu. Jangan otomatis menyamakannya dengan harga di halaman produk.

Contoh:

- Dasar komisi yang memenuhi syarat: Rp100.000.
- Tarif komisi asumsi: 5%.
- Komisi: Rp100.000 × 5% = **Rp5.000**.

Jika ada 20 transaksi yang masing-masing menghasilkan komisi Rp5.000 dan semuanya memenuhi syarat:

- 20 × Rp5.000 = **Rp100.000**.

Jika sebagian transaksi dibatalkan atau tidak memenuhi syarat, komisi aktual lebih rendah.

### 6.2 Omzet

Sebuah toko menjual 100 produk seharga Rp100.000 per produk.

- 100 × Rp100.000 = **Rp10.000.000** (omzet toko).

Omzet toko bukan penghasilan affiliate.

### 6.3 Nilai pesanan

- Harga awal produk: Rp100.000.
- Diskon: Rp10.000.
- Harga setelah diskon: Rp90.000.

### 6.4 Komisi dari nilai setelah diskon

Anggap dasar komisi sama dengan harga setelah diskon (hanya untuk simulasi).

- Dasar komisi: Rp90.000.
- Tarif asumsi: 5%.
- Komisi: Rp90.000 × 5% = **Rp4.500**.

### 6.5 Hasil setelah biaya

Ada dua basis. Selalu sebutkan basis yang kamu pakai.

```
Basis kas      : Hasil setelah biaya = Komisi Dibayarkan − Biaya Usaha
Basis kinerja  : Hasil setelah biaya = Komisi Disetujui − Biaya Usaha
```

Contoh basis kas (memakai komisi dibayarkan):

| Komponen | Nilai |
| --- | --- |
| Komisi dibayarkan | Rp500.000 |
| Biaya internet untuk usaha | Rp50.000 |
| Biaya alat atau aplikasi | Rp25.000 |
| Hasil setelah biaya | Rp425.000 |

Hitungannya: Rp500.000 − Rp50.000 − Rp25.000 = Rp425.000.

Contoh ini mengasumsikan tidak ada biaya lain yang belum dicatat. Angka ini belum memperhitungkan pajak, jadi belum disebut profit bersih. Basis kinerja dipakai untuk menilai kualitas konten tanpa menunggu pembayaran.

### 6.6 CTR (Click-Through Rate)

```
CTR = Klik ÷ Tayangan × 100%
```

Tayangan di modul ini berarti views.

- Tayangan (views): 10.000.
- Klik: 200.
- 200 ÷ 10.000 × 100% = **2%**.

Hitungan ini mengasumsikan tayangan dan klik berasal dari periode dan sumber pengukuran yang sebanding.

### 6.7 CVR (Conversion Rate)

```
CVR = Pesanan ÷ Klik × 100%
```

- Klik: 200.
- Pesanan tercatat: 10.
- 10 ÷ 200 × 100% = **5%**.

Hitungan ini mengasumsikan pesanan dan klik memakai definisi dan periode pengukuran yang sebanding.

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Menganggap affiliate hanya membagikan link | Lengkapi dengan riset kebutuhan pembeli, pemilihan produk, konten, traffic, dan pemantauan hasil |
| Memilih produk hanya karena komisinya terlihat besar | Pertimbangkan kualitas, kebutuhan pembeli, harga, reputasi penjual, ulasan, dan kemampuanmu menjelaskan produk |
| Membuat klaim yang tidak bisa dibuktikan atau berpura-pura pernah memakai produk | Jelaskan produk dengan jujur berdasarkan informasi yang bisa diverifikasi |
| Menganggap klik sama dengan transaksi | Ingat: pembeli bisa menaruh produk di keranjang tanpa membayar |
| Menganggap setiap klik pasti menghasilkan komisi | Transaksi masih melewati validasi, atribusi, dan ketentuan program |
| Menganggap nilai penjualan toko sebagai penghasilan pribadi | Bedakan omzet, nilai pesanan, komisi, dan hasil setelah biaya |
| Menganggap semua komisi estimasi pasti dibayar | Periksa status aktual di dashboard |
| Mengabaikan biaya operasional | Hitung hasil setelah biaya dengan basis yang jelas: kas (komisi dibayarkan − biaya) atau kinerja (komisi disetujui − biaya) |
| Menganggap komisi tinggi otomatis berarti hasil tinggi | Hasil baru muncul setelah biaya yang relevan dikurangkan |
| Menjumlahkan status komisi yang beririsan (misalnya jadi Rp1.150.000) | Periksa periode, definisi tiap status, dan apakah nominalnya merujuk pada transaksi yang sama |
| Menganggap setiap pembelian setelah melihat konten otomatis milikmu | Atribusi dipengaruhi waktu klik, klik affiliate lain, kanal, dan ketentuan teknis program |
| Menganggap tayangan tinggi sama dengan penghasilan | Tayangan hanya angka yang dicatat platform, bukan jumlah orang unik atau calon pembeli |

## 8. Tugas dan Checklist

### Tugas 1: Buat diagram perjalanan pembeli

Salin checklist ini ke Notion.

- [ ] Pilih satu contoh produk.
- [ ] Tentukan audiens yang membutuhkan produk itu.
- [ ] Tentukan kanal konten.
- [ ] Jelaskan bagaimana audiens menemukan konten.
- [ ] Jelaskan bagaimana audiens mengeklik affiliate link.
- [ ] Jelaskan bagaimana pembelian bisa terjadi.
- [ ] Jelaskan proses validasi transaksi.
- [ ] Jelaskan kapan komisi bisa dibayarkan.

**Contoh jawaban:**

- Produk: lampu meja belajar.
- Audiens: pelajar dan mahasiswa yang butuh pencahayaan untuk belajar.
- Perjalanan pembeli: konten tutorial memilih lampu belajar → audiens tertarik → audiens mengeklik link → audiens memeriksa produk → audiens membeli → transaksi diperiksa → komisi diproses jika memenuhi ketentuan.

### Tugas 2: Identifikasi penyebab komisi tidak dibayarkan

Centang penyebab yang mungkin terjadi pada suatu transaksi:

- [ ] Transaksi dibatalkan.
- [ ] Pesanan tidak memenuhi ketentuan transaksi yang sah.
- [ ] Terjadi retur atau pengembalian yang memengaruhi kelayakan.
- [ ] Transaksi tidak bisa diatribusikan sesuai aturan program.
- [ ] Promosi melanggar ketentuan.
- [ ] Terjadi masalah validasi atau pelacakan.
- [ ] Informasi pembayaran atau pajak belum lengkap.
- [ ] Pembayaran masih menunggu proses atau jadwal yang berlaku.

Penyebab sebenarnya ditentukan dari status transaksi, ketentuan resmi, dan informasi dari dukungan Shopee.

## 9. Latihan dan Kunci Jawaban

Semua tarif dalam latihan ini adalah asumsi untuk belajar, bukan tarif resmi Shopee.

**Soal 1.** Dasar komisi Rp200.000 dan tarif asumsi 3%. Berapa komisinya?

**Soal 2.** Ada 15 transaksi yang masing-masing menghasilkan komisi Rp4.000. Jika semua memenuhi syarat, berapa total komisinya?

**Soal 3.** Komisi dibayarkan Rp600.000 dan biaya usaha Rp75.000. Berapa hasil setelah biaya (basis kas), sebelum memperhitungkan pajak atau biaya lain yang belum dicatat?

**Kunci jawaban:**

- Soal 1: Rp200.000 × 3% = Rp6.000.
- Soal 2: 15 × Rp4.000 = Rp60.000.
- Soal 3: Rp600.000 − Rp75.000 = Rp525.000 (basis kas, belum dipotong pajak).

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika kamu bisa menjelaskan affiliate marketing tanpa membaca materi, membedakan omzet, nilai pesanan, komisi, dan hasil setelah biaya, serta membedakan empat status komisi. Kamu juga harus menjawab minimal 80% soal pemahaman dengan benar dan mampu menjelaskan satu contoh perjalanan pembeli dari konten sampai komisi.

Checklist penguasaan:

- [ ] Menjelaskan affiliate marketing tanpa membaca materi.
- [ ] Membedakan affiliate, reseller, dropshipper, dan seller.
- [ ] Menjelaskan peran affiliate, merchant, marketplace, dan pembeli.
- [ ] Menghitung komisi dengan dasar dan tarif yang jelas.
- [ ] Membedakan omzet, nilai pesanan, komisi, dan hasil setelah biaya.
- [ ] Menjelaskan traffic, klik, konversi, dan atribusi.
- [ ] Menjelaskan mengapa tayangan tinggi belum tentu menghasilkan komisi.
- [ ] Membedakan Estimasi, Pending, Disetujui, dan Dibayarkan.
', 'Modul 01', 15, true, 5, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l06', 'm01', 'Modul 02: Shopee Affiliate Program dan Kebijakan', 'modul-02-shopee-affiliate-program-dan-kebijakan', '# Modul 02: Shopee Affiliate Program dan Kebijakan

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Menjelaskan cara kerja Shopee Affiliate Indonesia.
- Memeriksa langkah dan persyaratan pendaftaran yang berlaku.
- Memahami peninjauan dan aktivasi akun.
- Memahami ketentuan kanal promosi.
- Membuat affiliate link lewat mekanisme resmi.
- Memeriksa skema komisi dan aturan atribusi.
- Mengenali transaksi yang memenuhi atau tidak memenuhi syarat.
- Memahami validasi, pembayaran, dan pajak.
- Menemukan sumber resmi untuk memeriksa perubahan kebijakan.

## 2. Ringkasan Konsep Utama

1. Shopee Affiliate Program memungkinkan kamu memperoleh penghasilan tambahan dengan mempromosikan produk Shopee lewat media sosial dan fitur konten Shopee yang didukung program.
2. **Sumber resmi adalah acuan utama**, bukan unggahan kreator yang belum tentu sesuai kebijakan terbaru. Sumber resmi di materi ini diperiksa pada **9 Oktober 2026**. Periksa ulang sebelum kamu bertindak.
3. Pendaftaran butuh akun Shopee yang sesuai ketentuan, kanal promosi yang memenuhi kriteria, dan formulir yang diisi benar. Akun yang didaftarkan harus akun pribadi, bukan akun toko atau penjual.
4. Tidak semua kanal atau metode promosi otomatis diizinkan. Pakai kanal yang kamu daftarkan atau yang disetujui Shopee.
5. Komisi bisa berasal dari Shopee, dari penjual, dan dari skema tambahan (misalnya produk bertanda Komisi XTRA). Jangan mengasumsikan tarif.
6. Atribusi menentukan apakah pembelian bisa dikaitkan dengan affiliate link tertentu. Panduan komisi sosial media Shopee menyebut jendela tujuh hari setelah klik. Cocokkan dengan jenis program dan kanalmu.
7. Pesanan yang tercatat belum tentu transaksi yang memenuhi syarat. Pembatalan, retur, penipuan, dan pelanggaran bisa menggugurkan komisi.
8. Status komisi (Estimasi, Pending, Disetujui, Dibayarkan), jadwal atau ambang pembayaran, dan ketentuan pajak harus kamu periksa di dokumen resmi terbaru dan dashboard akunmu.

## 3. Penjelasan

### 3.1 Apa itu Shopee Affiliate Program?

Menurut penjelasan resmi Shopee, Shopee Affiliate Program memungkinkan pengguna memperoleh penghasilan tambahan dengan mempromosikan produk Shopee lewat media sosial dan fitur konten Shopee yang didukung program.

Sebagai affiliate, kamu membantu calon pembeli menemukan produk. Jika transaksi berasal dari link atau mekanisme promosi yang sah dan memenuhi persyaratan, kamu berpeluang menerima komisi.

Tidak semua pesanan otomatis menghasilkan komisi. Syarat dan ketentuan resmi menyatakan bahwa komisi bergantung pada transaksi yang memenuhi persyaratan program.

### 3.2 Sumber resmi yang wajib dipelajari

Jadikan sumber resmi sebagai acuan utama, bukan unggahan kreator yang belum tentu sesuai kebijakan terbaru.

| Dokumen | Fungsinya | Link |
| --- | --- | --- |
| Syarat dan Ketentuan Shopee Affiliate untuk Individu | Acuan untuk memahami kewajiban affiliate, transaksi yang memenuhi syarat, pembayaran, dan kepatuhan | [https://help.shopee.co.id/portal/4/article/71217-Syarat-dan-Ketentuan-Program-Afiliasi-Shopee-untuk-Individu](https://help.shopee.co.id/portal/4/article/71217-Syarat-dan-Ketentuan-Program-Afiliasi-Shopee-untuk-Individu) |
| Panduan perhitungan komisi | Acuan untuk memahami skema komisi dan atribusi pembelian | [https://help.shopee.co.id/portal/10/article/123866](https://help.shopee.co.id/portal/10/article/123866) |
| Panduan pendaftaran | Acuan untuk langkah awal bergabung dan membagikan link | [https://shopee.co.id/m/daftar-affiliate](https://shopee.co.id/m/daftar-affiliate) |
| Halaman utama Shopee Affiliate | Acuan untuk informasi program dan ketentuan promosi | [https://shopee.co.id/m/affiliates](https://shopee.co.id/m/affiliates) |

> **Keempat sumber di atas diperiksa pada 9 Oktober 2026.** Informasi di halaman program bisa diperbarui. Periksa kembali sebelum mengambil keputusan atau mempublikasikan promosi.

### 3.3 Persyaratan pendaftaran

Periksa hal-hal berikut:

- Kamu punya akun Shopee yang sesuai ketentuan program.
- Kamu punya kanal promosi yang memenuhi kriteria.
- Kamu mengisi formulir pendaftaran dengan benar.
- Kamu memberikan informasi yang diminta program.
- Kamu mematuhi persyaratan konten, kanal, dan produk.
- Kamu memenuhi ketentuan tambahan yang berlaku saat mendaftar.

Halaman resmi Shopee menyebut bahwa kanal media sosial yang kamu pakai perlu **aktif, terbuka untuk umum, dan punya konten orisinal**. Halaman itu juga menyatakan bahwa akun Shopee yang didaftarkan harus **akun pribadi, bukan akun toko atau penjual Shopee**. Verifikasi lagi persyaratan aktual saat kamu mendaftar.

Jangan menganggap jumlah pengikut tertentu sebagai syarat universal. Periksa persyaratan yang benar-benar tampil untuk akun dan jalur pendaftaranmu.

### 3.4 Proses peninjauan dan aktivasi akun

Pendaftaran umumnya berupa pengisian formulir lalu peninjauan oleh Shopee. Panduan pendaftaran Shopee menjelaskan adanya peninjauan dan pemberitahuan lewat notifikasi atau email. Cek informasi resmi untuk waktu penyelesaian yang berlaku.

**Jika pendaftaran belum disetujui.** Jangan langsung membuat banyak akun atau mendaftar ulang sebelum tahu penyebabnya. Periksa:

- Apakah data yang kamu isi benar?
- Apakah kanal promosi sesuai ketentuan?
- Apakah akun dan kontenmu bisa diakses?
- Apakah ada notifikasi yang perlu kamu tindak lanjuti?
- Apakah ada ketentuan khusus yang belum terpenuhi?

Jika penyebabnya tidak jelas, hubungi dukungan resmi Shopee Affiliate.

### 3.5 Ketentuan kanal promosi

Kanal promosi adalah tempat kamu menyampaikan konten dan menempatkan affiliate link. Tabel berikut adalah daftar resmi kanal yang bisa dipakai di materi ini.

| Kanal | Bentuk promosi |
| --- | --- |
| TikTok | Video, caption, atau penempatan link yang diizinkan |
| Instagram | Reels, Stories, atau bio sesuai fitur yang tersedia |
| YouTube | Video dan deskripsi |
| Facebook | Feed atau Reels sesuai fitur dan ketentuan |
| Shopee Video | Konten video lewat fitur Shopee |
| Shopee Live | Siaran langsung lewat fitur Shopee |
| Website | Artikel atau halaman konten jika diperbolehkan oleh ketentuan program |

Tidak semua kanal atau metode promosi otomatis diizinkan untuk setiap jenis program. Pakai kanal yang kamu daftarkan atau yang disetujui Shopee, dan periksa aturan khusus tiap fitur.

**Prinsip promosi yang aman:**

- Gunakan kanal yang sah dan sesuai ketentuan.
- Buat konten orisinal dan relevan.
- Jangan menyamarkan tujuan link.
- Jangan membuat klaim produk yang menyesatkan.
- Jangan memakai cara promosi yang dilarang.
- Ungkapkan hubungan affiliate dengan jelas kepada audiens.
- Jangan melakukan spam atau memanipulasi transaksi.

**Contoh kalimat pengungkapan:**

> Link ini adalah affiliate link. Saya dapat menerima komisi jika kamu membeli lewat link ini dan transaksinya memenuhi ketentuan program.

Variasi pendek juga boleh, misalnya: "Sebagian link di panduan ini adalah affiliate link."

Jangan menjanjikan soal harga atau biaya, misalnya "harga tidak berubah" atau "tanpa biaya tambahan", kecuali hal itu tertulis di ketentuan resmi. Kamu tidak mengendalikan harga dan biaya di Shopee, jadi janji itu bisa menyesatkan audiens.

Sesuaikan pengungkapan dengan kondisi sebenarnya dan ketentuan platform.

### 3.6 Struktur dan dasar perhitungan komisi

Shopee punya komisi dari program dan dari penjual, serta kemungkinan komisi tambahan lewat skema khusus. Ketentuan resmi menjelaskan bahwa komisi dihitung dari tarif yang berlaku dan **nilai pembelian bersih sesuai definisi program**.

**Jenis komisi yang perlu kamu kenali:**

1. **Komisi dari Shopee.** Berasal dari skema program Shopee, sesuai kategori dan ketentuan yang berlaku.
2. **Komisi dari penjual.** Berasal dari penjual yang ikut serta dalam program affiliate.
3. **Komisi tambahan.** Bisa tersedia lewat program tertentu, misalnya produk bertanda **Komisi XTRA**, jika memenuhi syaratnya.

### 3.7 Atribusi pembelian dan masa atribusi

Atribusi menentukan apakah suatu pembelian bisa dikaitkan dengan affiliate link tertentu.

Panduan komisi sosial media yang dipublikasikan Shopee (diperiksa 9 Oktober 2026) menyebut bahwa komisi dihitung untuk pembelian yang selesai dalam **tujuh hari setelah klik affiliate link**. Cocokkan ketentuan yang tepat dengan jenis program dan kanal yang kamu pakai, dan cek ulang secara berkala.

**Contoh sederhana:**

1. Senin: calon pembeli mengeklik affiliate link.
2. Selasa: calon pembeli membandingkan produk.
3. Rabu: calon pembeli membeli.

Pembelian ini berpeluang masuk jangka waktu atribusi. Namun, komisi tetap bergantung pada aturan yang berlaku, pelacakan sistem, dan validasi transaksi.

**Hal yang harus diperhatikan:**

- Masa atribusi bukan jaminan pembelian menghasilkan komisi.
- Klik affiliate lain bisa memengaruhi atribusi.
- Setiap kanal atau fitur bisa punya ketentuan khusus.
- Transaksi harus memenuhi persyaratan program.
- Jangan menganggap semua metode pembelian punya aturan yang sama.

### 3.8 Transaksi yang memenuhi atau tidak memenuhi syarat

**Transaksi yang berpeluang memenuhi syarat:**

- Berasal dari link atau mekanisme promosi yang sah.
- Terjadi sesuai aturan atribusi.
- Memenuhi definisi transaksi selesai yang berlaku.
- Tidak teridentifikasi sebagai transaksi curang.
- Mematuhi ketentuan program dan kebijakan Shopee.

**Transaksi yang berisiko tidak menghasilkan komisi:**

- Pesanan dibatalkan.
- Transaksi tidak memenuhi persyaratan pembelian selesai.
- Transaksi teridentifikasi sebagai penipuan.
- Pembelian lewat link sendiri atau pola transaksi yang dilarang.
- Promosi melanggar kebijakan.
- Sumber transaksi tidak bisa dilacak sesuai ketentuan.
- Terjadi retur atau kondisi lain yang memengaruhi kelayakan.

Ketentuan resmi Shopee mengatur transaksi yang tidak memenuhi syarat dan konsekuensi pelanggaran. Daftar di atas hanya ringkasan untuk belajar, bukan pengganti dokumen lengkap.

**Mengapa membeli lewat link sendiri berisiko?** Program affiliate dirancang untuk memberi komisi atas promosi yang memenuhi ketentuan. Program ini bukan untuk membuat komisi lewat transaksi sendiri atau transaksi rekayasa.

Hindari:

- Membeli produk lewat link sendiri untuk mendapat komisi.
- Meminta orang membuat transaksi palsu.
- Memakai metode yang melanggar ketentuan untuk menaikkan komisi.
- Memakai sumber traffic yang dilarang.

### 3.9 Pembatalan, retur, dan validasi transaksi

Pesanan yang tercatat belum tentu menjadi transaksi yang memenuhi syarat komisi.

**Contoh alur:** pesanan dibuat → pembayaran atau pemenuhan pesanan berlangsung → transaksi selesai sesuai ketentuan → validasi dilakukan → komisi diproses.

Jika pesanan dibatalkan, diretur, atau tidak memenuhi syarat lain, komisi bisa berubah atau tidak diberikan.

**Yang harus kamu lakukan:**

- Periksa status pesanan dan komisi di dashboard.
- Catat perubahan status yang relevan.
- Jangan menganggap komisi estimasi sebagai uang yang sudah diterima.
- Jika ada ketidaksesuaian, kumpulkan informasi transaksi yang diperlukan.
- Hubungi dukungan resmi untuk meminta penjelasan.

Jangan menyimpulkan sistem salah hanya karena estimasi komisi berbeda dari jumlah yang dibayarkan.

### 3.10 Status komisi

Status komisi punya empat tahap berurutan.

| Tahap | Status | Makna |
| --- | --- | --- |
| 1 | Estimasi | Perkiraan penghasilan |
| 2 | Pending | Menunggu tahap pemrosesan |
| 3 | Disetujui | Memenuhi tahap persetujuan yang ditentukan |
| 4 | Dibayarkan | Dana sudah diproses sesuai informasi pembayaran |

Nama status di dashboard bisa berbeda (misalnya "Dalam proses" untuk Pending). Pakai nama status aktual di dashboard sebagai acuan utama.

### 3.11 Jadwal, ambang, dan metode pembayaran

Ketentuan pembayaran bisa mencakup periode pembayaran, rekening atau dompet yang dipakai, ambang nominal, dan persyaratan administrasi.

Syarat dan ketentuan resmi Shopee Affiliate untuk individu menjelaskan mekanisme pembayaran dan pemotongan pajak. Untuk ketentuan di akunmu, pakai dokumen resmi terbaru dan informasi pembayaran di dashboard.

Jangan memakai jadwal atau ambang pembayaran dari artikel lama tanpa verifikasi ulang.

### 3.12 Ketentuan pajak

Penghasilan dari affiliate bisa punya kewajiban pajak sesuai hukum Indonesia dan kondisi masing-masing penerima.

Dokumen resmi Shopee Affiliate individu menjelaskan ketentuan pemotongan pajak dan dokumen identitas atau perpajakan untuk pembayaran. Periksa persyaratan aktual di dokumen terbaru.

**Yang perlu kamu lakukan:**

- Periksa informasi identitas dan perpajakan yang diminta Shopee.
- Pastikan data yang kamu berikan benar.
- Simpan catatan komisi dan pembayaran.
- Simpan bukti pemotongan pajak jika tersedia.
- Periksa kewajiban pelaporan sesuai situasi pribadimu.
- Jika kamu tidak paham kewajibanmu, konsultasikan dengan pihak yang kompeten atau otoritas pajak.

Materi ini bukan pengganti nasihat pajak pribadi. Kewajiban tiap affiliate bisa berbeda.

### 3.13 Perubahan kebijakan program

Shopee bisa memperbarui syarat, ketentuan, skema komisi, dan mekanisme program. Informasi yang benar hari ini belum tentu berlaku bulan depan.

**Kebiasaan yang perlu kamu bangun:**

- Periksa informasi resmi sebelum mulai promosi.
- Periksa ulang tarif sebelum memilih produk.
- Simpan link sumber dan tanggal pemeriksaan.
- Catat perubahan kebijakan yang memengaruhi strategimu.
- Jangan menjadikan screenshot lama sebagai satu-satunya acuan.
- Jangan mengikuti instruksi pihak tidak dikenal yang meminta data sensitif.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Shopee Affiliate Program | Program yang memungkinkan pengguna memperoleh penghasilan tambahan dengan mempromosikan produk Shopee lewat media sosial dan fitur konten Shopee yang didukung program |
| Kanal promosi | Tempat kamu menyampaikan konten dan menempatkan affiliate link |
| Komisi dari Shopee | Komisi dari skema program Shopee, sesuai kategori dan ketentuan yang berlaku |
| Komisi dari penjual | Komisi dari penjual yang ikut serta dalam program affiliate |
| Komisi tambahan | Komisi yang bisa tersedia lewat program tertentu, misalnya produk bertanda Komisi XTRA, jika memenuhi syarat |
| Nilai pembelian bersih | Dasar perhitungan komisi menurut definisi program, dipakai bersama tarif yang berlaku |
| Atribusi | Proses yang menentukan apakah suatu pembelian bisa dikaitkan dengan affiliate link tertentu |
| Masa atribusi | Jangka waktu atribusi; panduan komisi sosial media Shopee menyebut tujuh hari setelah klik (cocokkan dengan program dan kanal) |
| Transaksi memenuhi syarat | Transaksi dari link atau mekanisme sah, sesuai aturan atribusi, memenuhi definisi transaksi selesai, tidak curang, dan patuh kebijakan |
| Estimasi (status komisi) | Perkiraan penghasilan |
| Pending (status komisi) | Menunggu tahap pemrosesan |
| Disetujui (status komisi) | Memenuhi tahap persetujuan yang ditentukan |
| Dibayarkan (status komisi) | Dana sudah diproses sesuai informasi pembayaran |

## 5. Langkah Praktik

### 5.1 Bagaimana affiliate memperoleh komisi (alur umum)

1. Kamu mengikuti program dan akunmu memenuhi persyaratan.
2. Kamu memilih produk yang layak dipromosikan.
3. Kamu membuat link atau konten lewat mekanisme yang tersedia.
4. Kamu mempromosikannya lewat kanal yang diizinkan.
5. Pembeli mengeklik atau membuka link itu.
6. Pembeli menyelesaikan transaksi.
7. Sistem memeriksa kelayakan dan atribusi.
8. Komisi diproses sesuai ketentuan pembayaran.

### 5.2 Langkah pendaftaran

1. Masuk ke akun Shopee yang akan dipakai.
2. Buka halaman pendaftaran resmi.
3. Isi informasi yang diminta.
4. Pilih atau masukkan kanal promosi sesuai instruksi.
5. Periksa kembali seluruh data.
6. Kirim pendaftaran.
7. Pantau notifikasi dan email.
8. Periksa dashboard untuk melihat status akun.
9. Jika ada permintaan tambahan, ikuti instruksi resmi.

### 5.3 Alur umum membuat affiliate link

Nama menu dan tampilan aplikasi bisa berubah. Pakai panduan resmi atau instruksi di dashboardmu sebagai acuan.

1. Masuk ke Shopee Affiliate lewat akun yang sudah terdaftar.
2. Pilih produk yang ingin kamu promosikan.
3. Buka fitur untuk membuat atau mengambil affiliate link.
4. Salin link yang dibuat sistem.
5. Tempatkan link di kanal promosi yang diperbolehkan.
6. Uji link untuk memastikan produk yang terbuka sudah benar.
7. Catat produk, link, kanal, dan tanggal publikasi.

Jangan memodifikasi link dengan cara yang merusak pelacakan atau melanggar kebijakan.

### 5.4 Cara membaca laporan komisi

1. Pilih periode laporan.
2. Periksa total pesanan dan transaksi yang memenuhi syarat.
3. Periksa komisi berdasarkan status.
4. Periksa apakah ada koreksi atau pembatalan.
5. Cocokkan jumlah pembayaran dengan bukti pembayaran.
6. Catat perbedaan yang belum terjelaskan.

### 5.5 Proses bantuan dan penyelesaian masalah

Jika ada masalah pada pendaftaran, link, transaksi, atau pembayaran, periksa secara sistematis.

1. **Identifikasi masalah.** Contoh: link tidak mengarah ke produk, komisi tidak muncul, atau pembayaran belum diterima.
2. **Kumpulkan informasi.** Catat tanggal kejadian, produk, link, status komisi, dan bukti yang relevan. Jangan membagikan data sensitif ke pihak yang tidak berwenang.
3. **Periksa sumber resmi.** Baca syarat dan ketentuan atau artikel bantuan yang terkait.
4. **Hubungi dukungan resmi.** Sampaikan masalah dengan spesifik dan sertakan informasi yang diperlukan.
5. **Simpan hasil penyelesaian.** Catat jawaban dukungan dan tindakan yang perlu kamu lakukan.

## 6. Contoh dan Perhitungan

### 6.1 Mengapa tarif komisi tidak boleh diasumsikan?

Dua produk dengan harga sama belum tentu memberi komisi yang sama.

Contoh simulasi (bukan tarif resmi Shopee):

| Produk | Dasar komisi | Tarif asumsi | Komisi |
| --- | --- | --- | --- |
| Produk A | Rp100.000 | 2% | Rp2.000 |
| Produk B | Rp100.000 | 5% | Rp5.000 |
| Produk C | Rp100.000 | 8% | Rp8.000 |

> Tabel ini hanya menunjukkan perbedaan hasil hitungan **berdasarkan asumsi tarif**. Periksa tarif aktual di informasi produk, program, atau dashboard Shopee yang berlaku.

### 6.2 Template tabel catatan kebijakan

Gunakan tabel ini di Notion.

| Topik | Ketentuan resmi | Sumber | Tanggal diperiksa | Perlu diperiksa ulang? |
| --- | --- | --- | --- | --- |
| Pendaftaran | Isi setelah membaca sumber | URL resmi | 9 Okt 2026 | Ya |
| Kanal promosi | Isi sesuai aturan terbaru | URL resmi | 9 Okt 2026 | Ya |
| Komisi | Isi berdasarkan program aktual | Dashboard/sumber resmi | 9 Okt 2026 | Ya |
| Atribusi | Isi sesuai program dan kanal | URL resmi | 9 Okt 2026 | Ya |
| Pembayaran | Isi sesuai akun dan aturan terbaru | Dashboard/sumber resmi | 9 Okt 2026 | Ya |
| Pajak | Isi sesuai dokumen resmi | URL resmi | 9 Okt 2026 | Ya |

Jangan mengisi kolom ketentuan dengan angka perkiraan atau informasi dari kreator lain tanpa verifikasi.

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Menjadikan unggahan kreator sebagai acuan kebijakan | Jadikan sumber resmi sebagai acuan utama dan catat tanggal pemeriksaan |
| Menganggap jumlah pengikut tertentu sebagai syarat universal | Periksa persyaratan yang benar-benar tampil untuk akun dan jalur pendaftaranmu |
| Membuat banyak akun atau mendaftar ulang saat ditolak | Periksa dulu data, kanal, akses konten, notifikasi, dan ketentuan khusus; hubungi dukungan resmi jika tidak jelas |
| Menganggap semua kanal otomatis diizinkan | Pakai kanal yang didaftarkan atau disetujui dan periksa aturan khusus tiap fitur |
| Menyamarkan tujuan link atau membuat klaim menyesatkan | Buat konten orisinal, jujur, dan ungkapkan hubungan affiliate dengan jelas |
| Menjanjikan "harga tidak berubah" atau "tanpa biaya tambahan" di pengungkapan | Pakai kalimat pengungkapan baku; janji soal harga atau biaya hanya boleh jika tertulis di ketentuan resmi |
| Memodifikasi link sehingga merusak pelacakan | Pakai link dari mekanisme resmi tanpa modifikasi yang melanggar kebijakan |
| Mengasumsikan tarif komisi | Periksa komisi aktual di dashboard dan catat tanggal pemeriksaan |
| Menganggap masa atribusi menjamin komisi | Komisi tetap bergantung pada aturan, pelacakan sistem, dan validasi transaksi |
| Membeli lewat link sendiri atau membuat transaksi rekayasa | Hindari sepenuhnya, termasuk transaksi palsu dan sumber traffic yang dilarang |
| Menganggap komisi estimasi sebagai uang yang sudah diterima | Periksa status di dashboard dan cocokkan dengan bukti pembayaran |
| Menyimpulkan sistem salah karena estimasi tidak sama dengan pembayaran | Kumpulkan informasi transaksi dan minta penjelasan ke dukungan resmi |
| Memakai jadwal atau ambang pembayaran dari artikel lama | Verifikasi lewat dokumen resmi terbaru dan dashboard |
| Menebak kewajiban pajak | Periksa dokumen resmi; konsultasikan dengan pihak kompeten atau otoritas pajak |
| Menjadikan screenshot lama sebagai satu-satunya acuan | Periksa ulang sumber resmi dan catat perubahan kebijakan |
| Mengikuti instruksi pihak tak dikenal yang meminta data sensitif | Verifikasi hanya lewat kanal resmi |

## 8. Tugas dan Checklist

### Tugas 1: Baca syarat dan ketentuan

- [ ] Buka dokumen syarat dan ketentuan individu.
- [ ] Baca bagian definisi program.
- [ ] Baca aturan promosi dan link.
- [ ] Baca aturan transaksi yang memenuhi syarat.
- [ ] Baca ketentuan pembayaran.
- [ ] Baca bagian pajak.
- [ ] Baca aturan pelanggaran dan konsekuensinya.
- [ ] Catat tanggal pemeriksaan.

### Tugas 2: Isi tabel catatan kebijakan

- [ ] Salin template di bagian 6.2 ke Notion.
- [ ] Isi tiap baris dari sumber resmi, bukan dari kreator lain.
- [ ] Catat URL dan tanggal pemeriksaan di tiap baris.

### Tugas 3: Siapkan checklist sebelum mendaftar

- [ ] Akun Shopee bisa diakses.
- [ ] Data akun sesuai dengan identitas yang diperlukan.
- [ ] Kanal promosi yang ingin dipakai sudah ditentukan.
- [ ] Kanal bisa diakses publik jika diwajibkan.
- [ ] Konten yang tersedia tidak melanggar ketentuan.
- [ ] Informasi yang diminta formulir sudah disiapkan.
- [ ] Syarat dan ketentuan terbaru sudah dibaca.

### Tugas 4: Periksa komisi aktual

- [ ] Buka dashboard affiliate.
- [ ] Cari produk yang ingin dipromosikan.
- [ ] Periksa informasi komisi yang tampil.
- [ ] Periksa apakah komisi berasal dari Shopee, penjual, atau program tambahan.
- [ ] Periksa syarat produk dan transaksi.
- [ ] Catat tanggal pemeriksaan.
- [ ] Periksa lagi jika kamu akan mempromosikan produk di periode berikutnya.

### Tugas 5: Siapkan checklist pembayaran

- [ ] Data penerima pembayaran sesuai.
- [ ] Rekening atau akun pembayaran yang diperlukan sudah terdaftar.
- [ ] Persyaratan identitas sudah dipenuhi.
- [ ] Persyaratan pajak sudah diperiksa.
- [ ] Status komisi sudah diperiksa.
- [ ] Jadwal pembayaran sudah diperiksa.
- [ ] Bukti pembayaran disimpan.

### Tugas 6: Pemeriksaan sebelum membagikan link

- [ ] Link berasal dari mekanisme resmi.
- [ ] Link mengarah ke produk yang benar.
- [ ] Produk masih tersedia atau layak dipromosikan.
- [ ] Harga dan informasi produk sudah diperiksa.
- [ ] Kanal penempatan link sesuai ketentuan.
- [ ] Konten tidak membuat klaim yang menyesatkan.
- [ ] Link tercatat di database operasional (lihat Modul 03).

### Tugas 7: Checklist kepatuhan

- [ ] Produk boleh dipromosikan.
- [ ] Konten tidak menyesatkan.
- [ ] Kanal promosi sesuai ketentuan.
- [ ] Link dibuat lewat mekanisme yang sah.
- [ ] Pengungkapan affiliate tersedia.
- [ ] Tidak ada transaksi sendiri atau transaksi rekayasa.
- [ ] Data pribadi dan informasi pembayaran dijaga.
- [ ] Sumber resmi dan tanggal pemeriksaan tercatat.

## 9. Latihan dan Kunci Jawaban

**Soal 1.** Sebutkan empat sumber resmi yang wajib dipelajari.
**Jawaban:** (1) Syarat dan Ketentuan Shopee Affiliate untuk Individu; (2) Panduan perhitungan komisi; (3) Panduan pendaftaran; (4) Halaman utama Shopee Affiliate. Keempatnya diperiksa pada 9 Oktober 2026 dan perlu diperiksa ulang.

**Soal 2.** Menurut halaman resmi Shopee yang dikutip modul ini, akun Shopee seperti apa yang boleh didaftarkan ke program affiliate?
**Jawaban:** Akun pribadi, bukan akun toko atau penjual Shopee. Kanal media sosial yang kamu pakai juga perlu aktif, terbuka untuk umum, dan punya konten orisinal.

**Soal 3.** Tiga jenis komisi apa yang perlu kamu kenali?
**Jawaban:** Komisi dari Shopee, komisi dari penjual, dan komisi tambahan lewat program tertentu (misalnya produk bertanda Komisi XTRA).

**Soal 4.** Produk A, B, dan C punya dasar komisi Rp100.000 dengan tarif asumsi 2%, 5%, dan 8%. Berapa komisi masing-masing, dan apa peringatan yang menyertai tabelnya?
**Jawaban:** Rp2.000, Rp5.000, dan Rp8.000. Peringatannya: tabel hanya menunjukkan perbedaan hasil hitungan berdasarkan asumsi tarif. Tarif aktual harus diperiksa di informasi produk, program, atau dashboard Shopee yang berlaku.

**Soal 5.** Berapa jendela atribusi yang disebut di panduan komisi sosial media Shopee, dan apa catatannya?
**Jawaban:** Komisi dihitung untuk pembelian yang selesai dalam tujuh hari setelah klik affiliate link. Catatannya: cocokkan dengan jenis program dan kanal yang dipakai, dan masa atribusi bukan jaminan komisi.

**Soal 6.** Sebutkan empat status komisi beserta maknanya.
**Jawaban:** Estimasi (perkiraan penghasilan), Pending (menunggu tahap pemrosesan), Disetujui (memenuhi tahap persetujuan yang ditentukan), Dibayarkan (dana sudah diproses sesuai informasi pembayaran). Nama di dashboard bisa berbeda; pakai nama aktual di dashboard sebagai acuan.

**Soal 7.** Mengapa membeli lewat link sendiri berisiko?
**Jawaban:** Program affiliate dirancang untuk memberi komisi atas promosi yang memenuhi ketentuan, bukan untuk membuat komisi lewat transaksi sendiri atau transaksi rekayasa.

**Soal 8.** Mengapa kalimat pengungkapan sebaiknya tidak berisi "tanpa biaya tambahan"?
**Jawaban:** Kamu tidak boleh menjanjikan soal harga atau biaya kecuali hal itu tertulis di ketentuan resmi. Pakai kalimat baku: "Link ini adalah affiliate link. Saya dapat menerima komisi jika kamu membeli lewat link ini dan transaksinya memenuhi ketentuan program."

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika kamu bisa menemukan dokumen resmi, menjelaskan alur pendaftaran, atribusi, validasi, dan status komisi, serta mengenali pelanggaran yang berisiko. Kamu juga harus menjawab minimal 80% soal pemahaman dengan benar dan punya catatan aturan resmi beserta tanggal pemeriksaan.
', 'Modul 02', 15, false, 6, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l07', 'm01', 'Modul 03: Persiapan Akun dan Operasional', 'modul-03-persiapan-akun-dan-operasional', '# Modul 03: Persiapan Akun dan Operasional

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Menyiapkan akun Shopee dan akun affiliate.
- Memeriksa status pendaftaran.
- Menyiapkan kanal promosi.
- Memahami pengaturan pembayaran dan data administrasi.
- Menavigasi dashboard affiliate.
- Membuat dan menguji affiliate link.
- Mencatat produk, konten, klik, transaksi, dan komisi.
- Menyimpan sumber resmi dan bukti pembayaran.
- Mengamankan akun dan membuat cadangan data.

Tujuan modul ini bukan langsung mendapat banyak penjualan. Tujuannya memastikan semua kebutuhan operasional siap, supaya kamu bisa mulai promosi secara teratur dan mengukur hasilnya.

## 2. Ringkasan Konsep Utama

1. Akun Shopee yang kamu pakai harus bisa diakses, datanya benar, dan keamanannya disiapkan sejak awal, bukan setelah ada masalah.
2. Formulir pendaftaran yang terkirim belum berarti akun aktif. Periksa sendiri status affiliate-mu.
3. Di tahap awal, siapkan **satu kanal utama** dengan positioning konten yang jelas. Jangan mempromosikan semua kategori secara acak.
4. Penghasilan di dashboard belum tentu berarti dana sudah ada di rekening. Periksa status komisi, kelengkapan administrasi, dan status pembayaran secara terpisah.
5. Dashboard affiliate punya beberapa area informasi (produk, link, komisi, performa, pesanan, pembayaran, pusat bantuan). Nama menunya bisa berubah.
6. Buat affiliate link lewat mekanisme resmi, lalu uji. Pengujian hanya memeriksa akses dan tujuan link, bukan membuktikan atribusi komisi berfungsi.
7. Pencatatan di Notion dimulai dari tiga database versi awal: Produk, Konten, dan Komisi. Tiga database lain dibangun di modul berikutnya.
8. Keamanan akun dan backup data adalah bagian dari operasional. Backup mengurangi risiko kehilangan catatan, tetapi tidak menjamin akun Shopee bisa dipulihkan.

## 3. Penjelasan

### 3.1 Persiapan akun Shopee

Sebelum promosi, pastikan akun yang kamu pakai bisa diakses dan sesuai persyaratan program.

**Mengapa persiapan akun penting?** Bayangkan kamu sudah membuat banyak konten dan mulai mendapat komisi, tetapi kehilangan akses ke email atau nomor telepon yang terhubung ke akun. Masalah akses bisa mengganggu promosi dan pengelolaan pembayaran. Siapkan keamanan akun sejak awal.

> **Catatan keamanan:** jangan memberikan kata sandi, kode OTP, atau kode pemulihan kepada orang yang mengaku sebagai admin affiliate.

### 3.2 Pendaftaran dan pemeriksaan status affiliate

Jika belum mendaftar, pakai halaman resmi: [https://shopee.co.id/m/daftar-affiliate](https://shopee.co.id/m/daftar-affiliate)

**Jika akun sudah terdaftar.** Periksa apakah kamu sudah bisa mengakses fitur yang dibutuhkan untuk promosi: pencarian produk, pembuatan link, informasi komisi, dan laporan performa sesuai akses akunmu. Jangan langsung menganggap akun aktif hanya karena formulir berhasil dikirim.

**Jika akun belum aktif.** Tunda promosi yang butuh akses atau persetujuan itu sampai statusnya jelas. Periksa notifikasi dan ikuti petunjuk resmi Shopee.

### 3.3 Pengaturan kanal promosi

Kanal promosi adalah tempat kamu menerbitkan konten untuk menjangkau calon pembeli. Di tahap awal, siapkan satu kanal utama dulu. Contohnya:

- TikTok untuk video pendek.
- Instagram untuk Reels dan konten visual.
- YouTube untuk video pendek atau tutorial.
- Facebook untuk konten Feed atau Reels.
- Website untuk artikel dan panduan produk.

Daftar lengkap kanal yang bisa dipakai ada di Modul 02. Kanal yang tepat bergantung pada jenis produk, audiens, kemampuan produksi, dan ketentuan program.

**Contoh positioning akun.** Kamu memilih niche perlengkapan rumah untuk orang yang tinggal di kos. Positioning yang bisa kamu pakai:

> Konten tips memilih perlengkapan kos yang praktis, hemat tempat, dan sesuai kebutuhan sehari-hari.

Dengan positioning ini, arah kontenmu jelas. Kamu tidak perlu mempromosikan semua kategori produk secara acak.

### 3.4 Pengaturan pembayaran

Pengaturan pembayaran memastikan komisi yang memenuhi syarat bisa diproses sesuai ketentuan program. Data yang diminta bisa bergantung pada aturan dan status akunmu.

Jangan mengisi informasi pembayaran dengan data orang lain tanpa dasar yang sah atau yang bertentangan dengan ketentuan program.

> **Perlu dipahami:** penghasilan di dashboard belum tentu berarti dana sudah ada di rekening. Periksa status komisi, kelengkapan administrasi, dan status pembayaran secara terpisah.

### 3.5 Informasi pajak yang relevan

Pengaturan pajak adalah bagian dari administrasi penghasilan, bukan formalitas.

Periksa persyaratan terbaru Shopee untuk dokumen identitas, informasi perpajakan, dan pemotongan pajak. Kewajiban pajak pribadimu juga bergantung pada situasimu.

Jangan menebak jumlah pajak yang harus dibayar. Jangan menganggap pemotongan oleh platform selalu menyelesaikan seluruh kewajiban pajakmu.

### 3.6 Mengenal dashboard Shopee Affiliate

Dashboard adalah tempat kamu memeriksa informasi operasional dan performa akun affiliate. Nama menu bisa berubah. Pelajari fungsi tiap menu dari tampilan akunmu.

| Informasi | Kegunaan |
| --- | --- |
| Produk | Mencari produk yang bisa dipromosikan |
| Link affiliate | Membuat atau mengambil link promosi |
| Informasi komisi | Memeriksa tarif dan ketentuan yang tersedia |
| Performa | Memeriksa metrik yang dilaporkan sistem |
| Pesanan | Memeriksa pesanan yang tercatat |
| Komisi | Memeriksa komisi berdasarkan status |
| Pembayaran | Memeriksa pemrosesan dana jika tersedia |
| Pusat bantuan | Mencari informasi dan menyelesaikan masalah |

Tidak semua akun atau jenis program menampilkan susunan menu yang sama.

### 3.7 Pembuatan dan pengujian affiliate link

Link yang benar penting karena link itu mengarahkan pembeli dan menghubungkan promosimu dengan transaksi lewat mekanisme pelacakan program. Prosedur lengkapnya ada di bagian 5.1.

### 3.8 Pencatatan operasional di Notion

Notion bisa kamu pakai sebagai pusat pengelolaan produk, link, konten, dan hasil affiliate.

Tujuan pencatatan bukan sekadar membuat administrasi rapi. Pencatatan membantu menjawab pertanyaan bisnis:

- Produk mana yang sedang dipromosikan?
- Konten mana yang sudah terbit?
- Konten mana yang menghasilkan klik?
- Apakah klik menghasilkan pesanan?
- Berapa komisi yang disetujui?
- Berapa dana yang sudah dibayarkan?
- Apa yang perlu diperbaiki?

**Peta database.** Sistem pencatatan lengkap terdiri dari enam database. Modul ini membangun tiga database versi awal: Produk, Konten, dan Komisi. Tiga database lain dibangun nanti: Database Link Affiliate di Modul 14, Database Eksperimen di Modul 17, dan Database SOP dan Pengetahuan di Modul 20 dan 23. Kolom tambahan untuk Produk menyusul di Modul 06, dan kolom performa untuk Konten dan Komisi menyusul di Modul 16.

Pakai nama database persis seperti di bawah dan nama kolom berbahasa Indonesia, supaya modul berikutnya tetap cocok.

#### Database 1: `Database Produk Affiliate` (versi awal)

| Kolom | Tipe Notion | Fungsi |
| --- | --- | --- |
| Nama Produk | Title | Nama produk |
| ID Produk | Text | Kode produk, misalnya P001 |
| Kategori | Select | Kategori produk |
| Link Produk | URL | Halaman produk |
| Harga Saat Dicek | Number | Harga pada saat pemeriksaan |
| Tarif Komisi | Text | Tarif dan sumber verifikasi |
| Status | Select | Riset, Siap Dipromosikan, Dihentikan |
| Tanggal Pemeriksaan | Date | Tanggal informasi diperiksa |
| Catatan | Text | Hal penting tentang produk, termasuk catatan kualitas dan ulasan |

> **Penting:** harga dan komisi bisa berubah. Simpan tanggal pemeriksaan agar kamu tahu kapan data itu terakhir diverifikasi.

Kolom lain (Rating, Jumlah Ulasan, Kualitas Penjual, Potensi Konten, Kelayakan Program, Skor Produk) ditambahkan di Modul 06.

#### Database 2: `Database Konten Affiliate` (versi awal)

| Kolom | Tipe Notion | Fungsi |
| --- | --- | --- |
| Judul Konten | Title | Nama atau topik konten |
| ID Konten | Text | Kode konten, misalnya C001 |
| Produk | Relation | Produk yang dipromosikan (relasi ke Database Produk Affiliate) |
| Kanal | Select | TikTok, Instagram, YouTube, dan lainnya |
| Format | Select | Tutorial, Review, Perbandingan, Demonstrasi |
| Tanggal Publikasi | Date | Tanggal konten terbit |
| URL Konten | URL | Link konten |
| Affiliate Link | URL | Link promosi (sementara bertipe URL) |
| Views | Number | Jumlah tayangan (views) |
| Klik | Number | Jumlah klik |
| Pesanan | Number | Jumlah pesanan yang tercatat |
| Komisi Disetujui | Number | Komisi yang sudah disetujui |
| Catatan Evaluasi | Text | Temuan dan perbaikan |

Kolom "Affiliate Link" bertipe URL hanya untuk sementara. Di Modul 14, kolom ini diganti relasi ke Database Link Affiliate.

Pakai definisi metrik yang konsisten. Misalnya, tentukan apakah data dicatat 24 jam, 7 hari, atau 30 hari setelah konten terbit.

#### Database 3: `Database Komisi Affiliate` (versi awal)

| Kolom | Tipe Notion | Fungsi |
| --- | --- | --- |
| Periode | Title | Periode laporan, misalnya "Oktober 2026 minggu 1" |
| Komisi Estimasi | Number | Estimasi yang tercatat |
| Komisi Pending | Number | Komisi yang menunggu proses |
| Komisi Disetujui | Number | Komisi yang disetujui |
| Komisi Dibayarkan | Number | Dana yang sudah dibayarkan |
| Biaya Usaha | Number | Biaya yang relevan |
| Bukti Pembayaran | URL atau Files | Lokasi bukti |
| Catatan | Text | Koreksi atau masalah |

Kolom Klik, Pesanan, dan kolom lain ditambahkan di Modul 16.

Status komisi punya empat tahap berurutan: Estimasi, Pending, Disetujui, Dibayarkan. Jangan menjumlahkan komisi dari status yang saling beririsan. Jika satu nominal pindah status, catat sebagai perubahan status, bukan pendapatan baru. Pakai periode yang konsisten dan jangan menghitung nominal yang sama dua kali.

### 3.9 Pengarsipan konten dan data

Data yang kamu catat harus mudah ditemukan kembali.

**Struktur halaman Notion yang disarankan:**

- Shopee Affiliate Workspace
    - Level 1 — Fondasi
    - Database Produk Affiliate
    - Database Konten Affiliate
    - Database Komisi Affiliate
    - Sumber Resmi dan Kebijakan
    - Arsip dan Backup

**File atau informasi yang perlu disimpan:**

- Link sumber resmi.
- Tanggal pemeriksaan kebijakan.
- Daftar produk yang dipromosikan.
- Affiliate link yang dipakai.
- URL konten yang sudah terbit.
- Data performa per periode.
- Catatan status komisi.
- Bukti pembayaran dan potongan pajak jika tersedia.
- Catatan masalah dan hasil penyelesaiannya.

> Jangan menyimpan kata sandi atau kode OTP di database operasional.

### 3.10 Pengamanan akun

Akun affiliate dan akun media sosialmu adalah aset operasional. Kehilangan akses bisa mengganggu produksi konten dan promosi.

**Waspadai penipuan.** Hati-hati jika ada pihak yang menjanjikan komisi pasti, meminta bayaran untuk membuka akun tanpa dasar resmi, atau meminta OTP dengan alasan aktivasi. Verifikasi semua permintaan lewat kanal resmi Shopee.

### 3.11 Backup data penting

Backup adalah cadangan data agar informasi operasional tidak hanya bergantung pada satu tempat.

**Data yang sebaiknya dicadangkan:**

- Daftar produk dan link.
- Daftar konten.
- Catatan performa.
- Catatan komisi.
- Sumber resmi.
- Bukti pembayaran.
- Catatan eksperimen konten.

> Backup tidak menjamin akun Shopee bisa dipulihkan. Tujuannya mengurangi risiko kehilangan catatan operasional.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Kanal promosi | Tempat kamu menerbitkan konten untuk menjangkau calon pembeli |
| Positioning akun | Arah atau fokus konten akun, misalnya "konten tips memilih perlengkapan kos yang praktis, hemat tempat, dan sesuai kebutuhan sehari-hari" |
| Dashboard affiliate | Tempat kamu memeriksa informasi operasional dan performa akun affiliate |
| Database Produk Affiliate | Database Notion berisi produk, link produk, harga saat dicek, tarif komisi, status, dan tanggal pemeriksaan |
| Database Konten Affiliate | Database Notion berisi konten, kanal, format, metrik views/klik/pesanan, dan komisi disetujui |
| Database Komisi Affiliate | Database Notion berisi periode, komisi estimasi/pending/disetujui/dibayarkan, biaya usaha, dan bukti pembayaran |
| Backup | Cadangan data agar informasi operasional tidak hanya bergantung pada satu tempat |

## 5. Langkah Praktik

### 5.1 Prosedur membuat dan menguji affiliate link

1. **Pilih produk.** Pilih satu produk yang sesuai niche dan memenuhi ketentuan promosi.
2. **Buat link.** Pakai fitur pembuatan link di sistem affiliate.
3. **Salin dan simpan.** Masukkan link ke database operasionalmu.
4. **Uji link.** Buka link untuk memastikan produk yang dituju benar. Pengujian ini hanya memeriksa akses dan tujuan link, bukan membuktikan atribusi komisi pasti berfungsi.
5. **Periksa kanal.** Pastikan cara membagikan link sesuai kebijakan Shopee dan platform tempat konten terbit.
6. **Catat tanggal.** Catat kapan link dibuat dan kapan dipakai di konten.

### 5.2 Prosedur backup sederhana

1. Perbarui database Notion.
2. Periksa kelengkapan data.
3. Ekspor atau cadangkan data sesuai fitur yang tersedia.
4. Simpan salinan di tempat yang aman.
5. Lakukan pemeriksaan berkala.
6. Pastikan salinan bisa dibuka kembali.

## 6. Contoh dan Perhitungan

Modul ini tidak memperkenalkan rumus baru. Rumus komisi, CTR, CVR, dan hasil setelah biaya ada di Modul 01. Bagian ini berisi template pencatatan.

### Simulasi pencatatan (contoh isi database)

Kamu membuat konten tentang lampu meja belajar. Angka berikut adalah simulasi, bukan laporan transaksi nyata.

**Baris di Database Konten Affiliate:**

| Kolom | Isi contoh |
| --- | --- |
| Judul Konten | Tutorial memilih lampu meja belajar |
| ID Konten | C001 |
| Views | 5.000 |
| Klik | 100 |
| Pesanan | 5 |
| Komisi Disetujui | Rp15.000 |

**Baris di Database Komisi Affiliate:**

| Kolom | Isi contoh |
| --- | --- |
| Periode | Simulasi lampu meja belajar |
| Komisi Estimasi | Rp25.000 |
| Komisi Pending | Tidak diisi (atau Rp0) |
| Komisi Disetujui | Rp15.000 |
| Komisi Dibayarkan | Rp10.000 |
| Catatan | Data simulasi, bukan transaksi nyata |

Komisi Pending dikosongkan karena contoh ini hanya menyebut tiga angka. Kamu boleh mengisinya Rp0. Pada data nyata, isi sesuai dashboard.

Tujuan simulasi: belajar mencatat perkembangan data tanpa mencampur estimasi dengan dana yang sudah dibayarkan. Ingat, angka Estimasi, Disetujui, dan Dibayarkan tidak dijumlahkan.

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Menganggap akun aktif hanya karena formulir berhasil dikirim | Periksa status pendaftaran dan akses fitur yang diperlukan di dashboard |
| Memulai promosi padahal akun belum aktif | Tunda promosi yang butuh akses atau persetujuan sampai status jelas; ikuti petunjuk resmi Shopee |
| Menyiapkan keamanan akun setelah ada masalah | Siapkan kata sandi kuat, verifikasi keamanan, dan metode pemulihan sejak awal |
| Memberikan kata sandi, OTP, atau kode pemulihan kepada "admin affiliate" | Jangan berikan; verifikasi semua permintaan lewat kanal resmi Shopee |
| Mempromosikan semua kategori produk secara acak | Tentukan satu kanal utama dan positioning konten yang jelas |
| Mengisi data pembayaran dengan data orang lain | Jangan lakukan tanpa dasar yang sah atau jika bertentangan dengan ketentuan program |
| Menganggap angka di dashboard sama dengan dana di rekening | Periksa status komisi, kelengkapan administrasi, dan status pembayaran secara terpisah |
| Menebak jumlah pajak atau menganggap pemotongan platform menyelesaikan semua kewajiban | Periksa ketentuan terbaru dan kewajiban perpajakan pribadimu |
| Menganggap uji link membuktikan atribusi komisi berfungsi | Pengujian hanya memeriksa akses dan tujuan link |
| Menguji komisi dengan membuat transaksi sendiri | Tidak perlu membuat transaksi sendiri untuk menguji komisi |
| Menjumlahkan komisi dari status yang saling beririsan | Catat perpindahan status sebagai perubahan status, bukan pendapatan baru; pakai periode konsisten |
| Menyimpan kata sandi atau OTP di database operasional | Jangan simpan di Notion; simpan informasi pemulihan di tempat yang aman |
| Mengandalkan satu tempat penyimpanan data | Lakukan backup berkala dan pastikan salinan bisa dibuka kembali |
| Percaya pihak yang menjanjikan komisi pasti atau meminta bayaran untuk membuka akun | Verifikasi lewat kanal resmi Shopee |

## 8. Tugas dan Checklist

### Tugas 1: Periksa kesiapan akun Shopee

- [ ] Bisa masuk ke akun Shopee.
- [ ] Nomor telepon atau email akun bisa diakses.
- [ ] Informasi akun benar.
- [ ] Metode pemulihan akun tersedia.
- [ ] Kata sandi kuat dan unik.
- [ ] Verifikasi keamanan diaktifkan jika tersedia.
- [ ] Akun tidak sedang dibatasi sehingga menghalangi aktivitas.
- [ ] Persyaratan pendaftaran affiliate sudah diperiksa.

### Tugas 2: Pendaftaran dan status affiliate

- [ ] Buka halaman resmi.
- [ ] Baca persyaratan yang berlaku.
- [ ] Isi formulir dengan informasi yang benar.
- [ ] Masukkan kanal promosi sesuai instruksi.
- [ ] Periksa kembali data.
- [ ] Kirim formulir.
- [ ] Periksa notifikasi dan email.
- [ ] Periksa status pendaftaran.
- [ ] Simpan informasi hasil pendaftaran.

### Tugas 3: Siapkan kanal promosi

- [ ] Tentukan satu kanal utama.
- [ ] Pastikan kanal bisa diakses.
- [ ] Periksa persyaratan kanal dari Shopee.
- [ ] Tentukan topik utama konten.
- [ ] Siapkan profil yang menjelaskan fokus konten.
- [ ] Siapkan tempat penempatan link yang diperbolehkan.
- [ ] Periksa kebijakan platform promosi.
- [ ] Siapkan cara mencatat performa konten.

### Tugas 4: Periksa pembayaran dan pajak

- [ ] Buka pengaturan pembayaran atau informasi akun yang relevan.
- [ ] Periksa metode pembayaran yang tersedia.
- [ ] Pastikan nama dan data penerima sesuai.
- [ ] Pastikan rekening atau akun pembayaran yang diperlukan aktif.
- [ ] Periksa persyaratan identitas.
- [ ] Baca ketentuan pajak di syarat dan ketentuan affiliate.
- [ ] Periksa status kelengkapan data.
- [ ] Simpan bukti atau konfirmasi yang tersedia, termasuk bukti pemotongan pajak jika ada.

### Tugas 5: Kenali dashboard

- [ ] Masuk ke dashboard affiliate.
- [ ] Cari fitur pemilihan produk.
- [ ] Cari fitur pembuatan link.
- [ ] Cari informasi komisi.
- [ ] Cari laporan performa.
- [ ] Cari informasi status transaksi.
- [ ] Cari status pembayaran.
- [ ] Catat nama menu yang benar-benar ada di akunmu. Catatan ini menjadi panduan operasional pribadimu.

### Tugas 6: Buat satu link pengujian

- [ ] Pilih satu produk yang sesuai.
- [ ] Periksa informasi produk.
- [ ] Buat affiliate link lewat mekanisme resmi.
- [ ] Buka link untuk memeriksa tujuan.
- [ ] Pastikan halaman produk sesuai tujuan dan kanal promosi sesuai ketentuan.
- [ ] Simpan link di Notion.
- [ ] Catat tanggal pemeriksaan.
- [ ] Catat kanal yang akan dipakai.

Tidak perlu membuat transaksi sendiri untuk menguji komisi.

### Tugas 7: Buat database operasional

- [ ] Buat Database Produk Affiliate (kolom versi awal).
- [ ] Buat Database Konten Affiliate (kolom versi awal).
- [ ] Buat Database Komisi Affiliate (kolom versi awal).
- [ ] Buat halaman Sumber Resmi dan Kebijakan.
- [ ] Buat halaman Arsip dan Backup.
- [ ] Masukkan satu contoh produk.
- [ ] Masukkan satu contoh rencana konten.
- [ ] Masukkan satu contoh catatan komisi memakai data simulasi di bagian 6.

### Tugas 8: Amankan akun dan siapkan backup

- [ ] Pakai kata sandi unik.
- [ ] Aktifkan fitur keamanan yang tersedia.
- [ ] Amankan email dan nomor telepon pemulihan.
- [ ] Jangan bagikan OTP.
- [ ] Jangan beri akses akun kepada pihak yang tidak dipercaya.
- [ ] Hindari link login yang mencurigakan.
- [ ] Akses dashboard lewat kanal resmi.
- [ ] Periksa aktivitas akun jika tersedia.
- [ ] Simpan informasi pemulihan di tempat yang aman.
- [ ] Jalankan prosedur backup di bagian 5.2 satu kali.

## 9. Latihan dan Kunci Jawaban

**Soal 1.** Mengapa formulir pendaftaran yang berhasil dikirim belum berarti akunmu aktif, dan apa yang harus kamu lakukan?
**Jawaban:** Karena status akun perlu kamu periksa sendiri. Cek apakah kamu sudah bisa mengakses fitur untuk promosi (pencarian produk, pembuatan link, informasi komisi, laporan performa). Jika belum aktif, tunda promosi yang butuh akses atau persetujuan itu sampai statusnya jelas, periksa notifikasi, dan ikuti petunjuk resmi Shopee.

**Soal 2.** Tiga database Notion apa yang kamu buat di modul ini, dan apa nama persisnya?
**Jawaban:** `Database Produk Affiliate`, `Database Konten Affiliate`, dan `Database Komisi Affiliate`. Ketiganya versi awal; tiga database lain dibangun di Modul 14, 17, dan 20/23.

**Soal 3.** Di Database Produk Affiliate, pilihan apa saja pada kolom Status?
**Jawaban:** Riset, Siap Dipromosikan, Dihentikan.

**Soal 4.** Pada simulasi, konten lampu meja belajar mencatat 5.000 views, 100 klik, 5 pesanan, komisi estimasi Rp25.000, disetujui Rp15.000, dan dibayarkan Rp10.000. Apa catatan pentingnya?
**Jawaban:** Angka itu data simulasi, bukan laporan transaksi nyata. Tujuannya belajar mencatat perkembangan data tanpa mencampur estimasi dengan dana yang sudah dibayarkan. Ketiga angka komisi tidak dijumlahkan.

**Soal 5.** Apa batas pengujian affiliate link pada langkah 4 prosedur?
**Jawaban:** Pengujian hanya memeriksa akses dan tujuan link, bukan membuktikan bahwa atribusi komisi pasti berfungsi.

**Soal 6.** Apa yang tidak boleh disimpan di database operasional, dan apa batas manfaat backup?
**Jawaban:** Jangan simpan kata sandi atau kode OTP di database operasional. Backup tidak menjamin akun Shopee bisa dipulihkan; tujuannya mengurangi risiko kehilangan catatan operasional.

**Soal 7.** Sebutkan empat status komisi secara berurutan.
**Jawaban:** Estimasi, Pending, Disetujui, Dibayarkan.

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika semua tugas selesai dan kamu bisa menunjukkan alur kerja dari memilih produk sampai mencatat komisi. Kamu juga harus bisa memastikan status akun, menemukan fungsi utama dashboard, membuat dan memeriksa satu affiliate link, mengamankan akun, menyiapkan backup, dan menyimpan sumber resmi beserta tanggal pemeriksaan.
', 'Modul 03', 15, false, 7, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l08', 'm02', 'Modul 04 — Riset Pasar dan Permintaan', 'modul-04-riset-pasar-dan-permintaan', '# Modul 04 — Riset Pasar dan Permintaan

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- [ ]  Menjelaskan siapa calon pembeli dan masalah yang mereka hadapi.
- [ ]  Mengumpulkan 20 masalah pembeli dan mengenali pertanyaan serta keluhan yang berulang.
- [ ]  Menjelaskan perbedaan popularitas dan niat beli.
- [ ]  Memvalidasi satu peluang dengan minimal tiga sumber yang relevan.
- [ ]  Memisahkan fakta, estimasi, dan hipotesis.
- [ ]  Menyusun daftar peluang konten dari hasil riset.

Hasil akhir modul: daftar masalah pembeli, bukti permintaan, kata kunci, dan peluang konten. Semua ini kamu pakai untuk menentukan niche dan produk di modul berikutnya.

## 2. Ringkasan Konsep Utama

- Riset pasar dilakukan **sebelum** kamu menentukan produk yang akan dipromosikan.
- Jangan mulai dari "Produk apa yang ingin saya jual?". Mulailah dari "Masalah apa yang ingin diselesaikan calon pembeli?"
- Tren dan permintaan berkaitan, tetapi tidak sama. Viral belum tentu dibeli.
- Masalah yang berulang di banyak sumber adalah sinyal kebutuhan yang belum terselesaikan dengan baik.
- Pertanyaan calon pembeli adalah bahan baku ide konten.
- Setiap sumber data punya keterbatasan. Pakai beberapa sumber untuk memeriksa konsistensi temuanmu.
- Popularitas (views) berbeda dari niat beli. Klik dan transaksi lebih dekat dengan hasil bisnis.
- Pisahkan fakta, estimasi, dan hipotesis. Jangan mengarang data.

## 3. Penjelasan

### 3.1 Apa itu riset pasar

Riset pasar adalah proses mencari informasi. Kamu mencari tahu apa yang dibutuhkan orang, masalah yang mereka hadapi, produk yang mereka cari, dan alasan mereka mau membeli. Dalam Shopee Affiliate, kamu melakukannya sebelum memilih produk.

Contoh: kamu tertarik mempromosikan rak penyimpanan meja. Sebelum membuat video, cari tahu dulu:

- Apakah banyak orang mengalami masalah meja berantakan?
- Apakah mereka butuh rak tambahan, atau sebenarnya butuh kotak penyimpanan?
- Apakah mereka mencari produk murah, atau lebih mementingkan kekuatan bahan?
- Apakah mereka sudah membeli produk serupa?
- Apa yang membuat mereka ragu membeli?
- Apakah produk itu benar-benar menyelesaikan masalah mereka?

### 3.2 Jenis kebutuhan pembeli

Kebutuhan pembeli adalah sesuatu yang ingin mereka dapatkan, atau masalah yang ingin mereka selesaikan lewat suatu produk.

| Jenis kebutuhan | Penjelasan | Contoh |
| --- | --- | --- |
| Fungsional | Membantu menyelesaikan pekerjaan | Blender untuk menghaluskan bahan makanan |
| Kenyamanan | Membuat aktivitas lebih praktis | Pel lantai dengan sistem pemeras |
| Penghematan | Mengurangi biaya atau pemborosan | Botol minum isi ulang |
| Estetika | Membuat sesuatu terlihat lebih menarik | Lampu dekorasi kamar |
| Keamanan | Membantu mengurangi risiko | Pelindung sudut meja |
| Produktivitas | Membantu pekerjaan lebih teratur | Stand laptop |
| Penggantian | Mengganti barang yang rusak atau habis masa pakainya | Kabel charger pengganti |

Satu produk bisa memenuhi beberapa kebutuhan sekaligus. Stand laptop, misalnya, memperbaiki posisi layar, merapikan meja, dan membuat ruang kerja lebih nyaman.

### 3.3 Tren versus permintaan

- **Tren** adalah perubahan minat atau perhatian masyarakat terhadap topik, produk, atau kebutuhan tertentu.
- **Permintaan** adalah kebutuhan atau keinginan pasar terhadap suatu produk atau solusi.

Contoh: botol minum viral karena desainnya unik. Banyak orang menonton videonya, tetapi belum tentu membeli. Sebaliknya, kebutuhan mengganti botol minum yang bocor mungkin tidak viral, tetapi muncul sepanjang tahun.

Dalam affiliate marketing, cari tren yang relevan. Lalu periksa apakah ada kebutuhan nyata di balik tren itu.

### 3.4 Sumber untuk mencari tren dan permintaan

**1. Pencarian Shopee**

- Ketik kata kunci produk di kolom pencarian.
- Amati saran pencarian yang muncul.
- Periksa produk yang relevan, harga, variasi, ulasan, dan indikator penjualan.
- Baca ulasan terbaru dan ulasan negatif.
- Bandingkan beberapa produk, bukan hanya satu.

> Saran pencarian dan indikator penjualan adalah **petunjuk**, bukan bukti lengkap tentang besarnya pasar.

**2. TikTok**

- Cari video tentang masalah yang ingin kamu pelajari.
- Perhatikan komentar yang menanyakan nama produk, harga, ukuran, atau cara membeli.
- Amati pertanyaan yang berulang.
- Periksa apakah video hanya menarik perhatian, atau juga mendorong orang mempertimbangkan pembelian.

> Views tinggi tidak otomatis berarti penjualan tinggi.

**3. Google Trends**

Google Trends membandingkan minat pencarian suatu topik dari waktu ke waktu. Contoh: membandingkan "rak meja" dengan "organizer meja".

> Google Trends menampilkan **indeks minat relatif**, bukan jumlah pencarian absolut. Data ini juga tidak langsung menunjukkan jumlah pembelian di Shopee.

**4. Google Search dan forum publik**

Pakai pencarian untuk menemukan pertanyaan, keluhan, dan pengalaman pengguna. Contoh kata kunci:

- "cara mengatasi meja berantakan"
- "rak meja yang kuat"
- "rak meja kecil kekurangan"
- "organizer meja worth it atau tidak"

**5. Ulasan produk**

Ulasan menunjukkan pengalaman nyata pembeli, termasuk hal yang tidak terlihat di foto produk. Cari pola keluhan, misalnya bahan terlalu tipis, ukuran tidak sesuai, pemasangan sulit, atau produk tidak cocok untuk kebutuhan tertentu.

> Semua sumber di atas punya keterbatasan. Pakai beberapa sumber untuk memeriksa apakah temuanmu konsisten.

### 3.5 Analisis masalah yang berulang

Masalah berulang adalah masalah yang disebut banyak orang atau muncul berkali-kali dalam situasi berbeda. Masalah ini layak diteliti karena bisa menunjukkan kebutuhan yang belum terselesaikan dengan baik.

Contoh keluhan dari ulasan organizer meja:

- "Terlalu kecil untuk barang saya."
- "Tidak cukup untuk menyimpan kabel."
- "Meja masih terlihat berantakan."
- "Ukuran tidak sesuai dengan meja."
- "Bahannya terasa kurang kokoh."

Keluhan ini dikelompokkan menjadi tiga kategori:

1. Kapasitas penyimpanan.
2. Kesesuaian ukuran.
3. Kualitas bahan.

Ide konten yang bisa diturunkan:

- Cara memilih organizer berdasarkan ukuran meja.
- Perbandingan organizer kecil dan besar.
- Hal yang perlu diperiksa sebelum membeli organizer.
- Demonstrasi kapasitas organizer dengan barang sehari-hari.

> Jangan menyimpulkan bahwa semua pembeli mengalami masalah yang sama. Catat jumlah sumber yang kamu periksa dan berapa kali setiap masalah ditemukan.

### 3.6 Analisis pertanyaan calon pembeli

Pertanyaan calon pembeli sering menunjukkan apa yang mereka butuhkan sebelum memutuskan membeli. Contohnya: apakah produk ini muat untuk laptop 15 inci, apakah bahannya mudah patah, apakah bisa dipakai di meja kecil, apakah pemasangannya butuh alat, apakah ada ukuran lebih besar, apakah mudah dibersihkan.

| Kategori pertanyaan | Contoh | Ide konten |
| --- | --- | --- |
| Ukuran | Apakah muat di meja kecil? | Demonstrasi ukuran |
| Kualitas | Apakah mudah patah? | Tunjukkan bahan dan konstruksi |
| Fungsi | Apakah bisa menahan beban tertentu? | Uji sesuai spesifikasi aman |
| Penggunaan | Bagaimana cara memasangnya? | Tutorial pemasangan |
| Harga | Apakah ada alternatif lebih murah? | Perbandingan harga dan fitur |
| Kesesuaian | Apakah cocok untuk kebutuhan saya? | Panduan memilih produk |
| Perawatan | Bagaimana cara membersihkannya? | Tutorial perawatan |

> Jangan menjawab pertanyaan teknis dengan dugaan. Periksa spesifikasi, dokumentasi produk, atau lakukan pengujian yang wajar jika memungkinkan.

### 3.7 Riset kata kunci

Kata kunci adalah kata atau frasa yang dipakai orang saat mencari informasi atau produk. Riset kata kunci membantumu memahami bahasa calon pembeli dan topik yang perlu dibahas di konten.

Ada empat jenis kata kunci:

| Jenis | Contoh | Makna |
| --- | --- | --- |
| Informasional | cara merapikan meja | Mencari informasi atau solusi |
| Komersial | rekomendasi organizer meja; organizer meja plastik vs besi | Sedang mengevaluasi pilihan, termasuk membandingkan alternatif ("A vs B") |
| Transaksional | beli organizer meja murah | Niat membeli lebih kuat |
| Navigasional | toko organizer meja di Shopee | Mencari toko, merek, atau halaman tertentu |

> Pembagian ini panduan umum. Niat pencarian yang sebenarnya bergantung pada konteks.
>
> Jangan menganggap sebuah kata kunci bervolume tinggi hanya karena terdengar populer. Jika tidak ada data volume yang bisa diperiksa, catat bahwa volumenya belum diketahui.

### 3.8 Pola musiman

Pola musiman adalah perubahan kebutuhan atau minat yang berkaitan dengan waktu tertentu.

| Periode atau situasi | Contoh kebutuhan |
| --- | --- |
| Ramadan dan Lebaran | Perlengkapan mudik, kebutuhan rumah, perlengkapan ibadah |
| Tahun ajaran baru | Peralatan sekolah dan perlengkapan belajar |
| Musim hujan | Jas hujan, payung, perlengkapan pengeringan |
| Akhir tahun | Dekorasi, hadiah, perlengkapan perjalanan |
| Periode pindahan kos | Penyimpanan, perlengkapan kamar, kebutuhan rumah tangga |

> Daftar ini adalah **hipotesis awal**. Besarnya permintaan tiap produk harus kamu periksa lewat data.

Cara memeriksa pola musiman:

- Bandingkan minat pencarian dari beberapa periode atau tahun.
- Periksa apakah kebutuhan muncul berulang pada waktu yang sama.
- Cari bukti dari beberapa sumber.
- Hitung waktu produksi konten. Audiens perlu menemukan kontenmu sebelum atau selama periode pembelian.
- Periksa apakah produk tetap diminati setelah musim berakhir.

> Jangan memilih produk hanya karena ada tanggal promosi. Momen promosi tidak menjamin produk itu dibutuhkan audiensmu.

### 3.9 Tren jangka pendek versus kebutuhan jangka panjang

- **Tren jangka pendek:** minat bisa naik cepat, lalu turun ketika perhatian berpindah. Contoh: produk unik yang mendadak viral.
- **Kebutuhan jangka panjang:** berhubungan dengan masalah yang terus muncul dan bisa diminati sepanjang tahun. Contoh: penyimpanan rumah dan perlengkapan kerja.

Strategi yang masuk akal: jadikan kebutuhan jangka panjang sebagai dasar niche, lalu uji tren jangka pendek jika relevan. Misalnya niche utamamu perlengkapan ruang kerja. Kamu bisa mempromosikan organizer meja sepanjang tahun. Produk baru yang sedang populer hanya diuji jika benar-benar cocok dengan kebutuhan audiens.

> Produk yang tampak selalu dibutuhkan belum tentu menghasilkan komisi yang baik. Tetap periksa kualitas produk, persaingan, harga, komisi, dan kemampuan kontenmu menghasilkan pembelian.

### 3.10 Membedakan popularitas dan niat beli

- Orang menonton video botol minum karena bentuknya lucu: indikasi **perhatian**.
- Orang bertanya apakah botol itu tahan bocor: indikasi **pertimbangan**.
- Orang membandingkan ukuran, harga, dan material: indikasi **evaluasi**.
- Orang mencari produk tertentu untuk dibeli: indikasi **niat membeli yang lebih kuat**.

Semua ini petunjuk, bukan jaminan transaksi.

| Sinyal | Apa yang mungkin ditunjukkan |
| --- | --- |
| Views tinggi | Konten menarik perhatian |
| Banyak komentar umum | Audiens tertarik berdiskusi |
| Pertanyaan spesifik tentang produk | Ada kebutuhan informasi |
| Pertanyaan tentang harga dan ukuran | Ada kemungkinan pertimbangan pembelian |
| Klik affiliate link | Ada tindakan menuju penawaran |
| Transaksi valid | Terjadi pembelian yang tercatat sesuai sistem program |

Untuk affiliate marketing, views penting sebagai jangkauan. Namun klik dan transaksi lebih dekat dengan hasil bisnis. Penilaian akhir juga perlu melihat komisi disetujui, pembatalan, dan pengembalian barang.

### 3.11 Menilai peluang pasar tanpa mengarang data

Pemula sering menyimpulkan terlalu cepat (lihat bagian 7). Pakai tiga kategori informasi ini:

- **Fakta:** informasi yang benar-benar kamu amati atau peroleh dari sumber yang bisa diperiksa. Contoh: halaman produk menampilkan harga tertentu pada tanggal pengamatan.
- **Estimasi:** perkiraan berdasarkan asumsi yang dijelaskan. Contoh: jika 1.000 klik menghasilkan 20 transaksi, conversion rate yang diasumsikan adalah 2%.
- **Hipotesis:** dugaan yang masih harus diuji. Contoh: video demonstrasi kapasitas organizer mungkin lebih menarik daripada video yang hanya menampilkan desain.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Riset pasar | Proses mencari informasi untuk memahami kebutuhan orang, masalah mereka, produk yang mereka cari, dan alasan mereka mau membeli |
| Kebutuhan pembeli | Sesuatu yang ingin mereka dapatkan atau masalah yang ingin mereka selesaikan lewat suatu produk |
| Tren | Perubahan minat atau perhatian masyarakat terhadap topik, produk, atau kebutuhan tertentu |
| Permintaan | Kebutuhan atau keinginan pasar terhadap suatu produk atau solusi |
| Masalah berulang | Masalah yang disebut banyak orang atau muncul berkali-kali dalam berbagai situasi |
| Kata kunci | Kata atau frasa yang dipakai orang saat mencari informasi atau produk |
| Pola musiman | Perubahan kebutuhan atau minat yang berkaitan dengan waktu tertentu |
| Validasi | Proses memeriksa apakah dugaanmu didukung bukti yang cukup |
| Popularitas | Seberapa banyak perhatian yang diperoleh suatu topik atau produk |
| Niat beli | Seberapa kuat seseorang mempertimbangkan untuk membeli |
| Fakta | Informasi yang benar-benar kamu amati atau peroleh dari sumber yang bisa diperiksa |
| Estimasi | Perkiraan berdasarkan asumsi yang dijelaskan |
| Hipotesis | Dugaan yang masih harus diuji |

## 5. Langkah Praktik

### 5.1 Cara menemukan kebutuhan

1. **Amati kehidupan sehari-hari.** Cari masalah yang sering dialami orang di rumah, tempat kerja, sekolah, dapur, kamar tidur, atau saat bepergian.
2. **Cari bukti bahwa masalah itu benar-benar dialami.** Periksa ulasan pembeli, kolom komentar, forum publik, pertanyaan produk, dan saran pencarian.
3. **Catat masalah dengan kalimat yang spesifik.** Hindari catatan umum seperti "orang membutuhkan peralatan rumah". Tulis: "orang yang tinggal di kamar kos membutuhkan tempat penyimpanan tambahan karena ruang lantainya terbatas".
4. **Hubungkan masalah dengan solusi yang mungkin.** Satu masalah bisa punya beberapa solusi. Jangan langsung menganggap satu produk sebagai solusi terbaik.
5. **Periksa apakah ada indikasi niat membeli.** Orang yang hanya mengeluh belum tentu mau membeli. Perhatikan apakah mereka mencari rekomendasi, membandingkan harga, menanyakan ukuran, atau meminta link produk.

### 5.2 Cara melakukan riset kata kunci

1. Tentukan masalah utama, misalnya meja yang berantakan.
2. Catat kata kunci dasar: organizer meja.
3. Perluas dengan kebutuhan: organizer meja kecil, organizer kabel, organizer meja kerja.
4. Perluas dengan pertanyaan: organizer meja yang kuat, cara memilih organizer meja.
5. Periksa saran pencarian dan konten yang muncul.
6. Kelompokkan kata kunci berdasarkan kebutuhan pembeli dan jenisnya (informasional, komersial, transaksional, navigasional).
7. Pilih kata kunci yang relevan dengan produk yang bisa kamu promosikan.

Contoh pengelompokan:

- Masalah: meja berantakan.
- Solusi: organizer meja.
- Kriteria: ukuran, kapasitas, bahan.
- Keberatan: apakah kuat, apakah sepadan dengan harga.
- Niat membeli: rekomendasi dan perbandingan produk.

### 5.3 Mengubah pertanyaan menjadi konten

Pola: **Pertanyaan pembeli → kebutuhan informasi → bukti yang diperlukan → format konten.**

Contoh:

- Pertanyaan: Apakah stand laptop ini stabil?
- Kebutuhan: Mengetahui apakah laptop aman diletakkan di atasnya.
- Bukti: Spesifikasi beban dan demonstrasi stabilitas yang relevan.
- Konten: Video demonstrasi stabilitas dengan batas pengujian yang dijelaskan.

### 5.4 Validasi permintaan melalui beberapa sumber

Misalnya kamu menduga organizer meja kecil punya peluang. Jangan hanya mengandalkan satu video viral. Periksa:

- Apakah ada pencarian terkait kebutuhan itu?
- Apakah produk sejenis tersedia dan punya ulasan?
- Apakah orang membicarakan masalah yang sama?
- Apakah ada pertanyaan tentang ukuran dan fungsi?
- Apakah ada indikasi orang membandingkan atau ingin membeli produk?

**Matriks validasi sederhana**

| Sumber | Bukti yang dicari | Hasil |
| --- | --- | --- |
| Pencarian Shopee | Produk relevan, ulasan, indikator penjualan | Catat temuan |
| Google Trends | Pola minat pencarian | Naik, stabil, turun, atau belum jelas |
| TikTok | Masalah dan pertanyaan berulang | Catat pola |
| Ulasan pembeli | Kebutuhan, keluhan, dan pengalaman | Catat pola |
| Forum publik | Diskusi kebutuhan dan solusi | Catat pola |

Beri status pada setiap temuan:

- **Terdukung:** ada bukti relevan dari beberapa sumber independen.
- **Perlu diperiksa:** bukti baru berasal dari satu sumber atau masih lemah.
- **Belum terdukung:** belum ada bukti yang cukup.

> Sumber yang berbeda belum tentu independen. Banyak video bisa membahas tren yang sama karena meniru satu video awal. Jadi banyaknya konten belum tentu berarti banyaknya permintaan.

## 6. Contoh dan Perhitungan

### 6.1 Template pencatatan masalah

| Masalah | Sumber | Frekuensi ditemukan | Bukti |
| --- | --- | --- | --- |
| Ukuran terlalu kecil | Ulasan produk | 8 | Ulasan pada beberapa produk |
| Bahan kurang kokoh | Ulasan produk | 5 | Keluhan mengenai bahan |
| Sulit dipasang | Komentar publik | 4 | Pertanyaan dan keluhan pengguna |

> Angka di tabel hanya contoh cara mencatat, bukan data riset aktual.

### 6.2 Contoh estimasi conversion rate

Rumus: CVR = Pesanan ÷ Klik × 100%.

```
CVR = 20 ÷ 1.000 × 100% = 2%
```

Jika 1.000 klik menghasilkan 20 pesanan, CVR yang **diasumsikan** adalah 2%. Ini termasuk **estimasi**, yaitu perkiraan berdasarkan asumsi, bukan fakta terverifikasi. Angka ini simulasi, bukan tarif resmi Shopee.

### 6.3 Template catatan riset

- Nama peluang:
- Masalah calon pembeli:
- Audiens yang mungkin membutuhkan:
- Bukti dari sumber pertama:
- Bukti dari sumber kedua:
- Bukti dari sumber ketiga:
- Sinyal niat beli:
- Keterbatasan data:
- Hipotesis yang ingin diuji:
- Langkah validasi berikutnya:

### 6.4 Template Tugas A — 20 masalah pembeli

| No. | Masalah pembeli | Audiens | Bukti awal | Solusi yang mungkin |
| --- | --- | --- | --- | --- |
| 1 | Meja kerja berantakan | Pekerja atau pelajar | Ulasan dan diskusi | Organizer meja |
| 2 | Kabel mudah kusut | Pengguna perangkat elektronik | Keluhan pengguna | Pengatur kabel |
| 3 | Barang sulit ditemukan di kamar | Penghuni kamar kecil | Diskusi publik | Kotak penyimpanan |
| 4 | Laptop terlalu rendah saat digunakan | Pekerja atau pelajar | Pertanyaan pengguna | Stand laptop |

> Empat baris di atas hanya contoh awal. Lengkapi sampai 20 baris dengan hasil risetmu sendiri.

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Menyimpulkan "Produk ini pasti laku karena sedang viral" | Cari bukti permintaan dari beberapa sumber, bukan dari satu video viral |
| Menyimpulkan "Semua orang membutuhkan produk ini" | Tentukan audiens dan situasi yang spesifik |
| Menyimpulkan "Kompetitornya sedikit, jadi pasti mudah menghasilkan uang" | Periksa apakah ada permintaan nyata, bukan hanya sedikit kompetitor |
| Menyimpulkan "Banyak ulasan berarti komisinya tinggi" | Periksa komisi aktual di sumber resmi Shopee Affiliate |
| Menyamakan views tinggi dengan penjualan tinggi | Lihat klik, pertanyaan beli, dan transaksi |
| Menganggap saran pencarian dan indikator penjualan sebagai bukti lengkap besarnya pasar | Pakai sebagai petunjuk, lalu cocokkan dengan sumber lain |
| Menganggap Google Trends menunjukkan jumlah pencarian absolut atau pembelian di Shopee | Ingat bahwa Google Trends adalah indeks minat relatif |
| Menganggap banyaknya konten berarti banyaknya permintaan | Cek apakah konten-konten itu hanya saling meniru |
| Mencatat masalah dengan kalimat terlalu umum | Tulis masalah lengkap dengan situasinya |
| Menjawab pertanyaan teknis dengan dugaan | Periksa spesifikasi atau uji secara wajar |
| Menganggap kata kunci bervolume tinggi hanya karena terdengar populer | Catat "volume belum diketahui" jika tidak ada datanya |
| Memilih produk hanya karena ada tanggal promosi | Pastikan produk dibutuhkan audiensmu |

## 8. Tugas dan Checklist

**Tugas 1 — Temukan 20 masalah pembeli.** Cari 20 masalah yang berhubungan dengan satu atau beberapa kategori produk yang kamu minati. Pakai template di bagian 6.4.

> 20 masalah ini adalah bahan mentah untuk Modul 05. Di sana kamu memilih 10 masalah untuk audiens utamamu.

**Tugas 2 — Kumpulkan pertanyaan calon pembeli**

- [ ]  Kumpulkan minimal 20 pertanyaan dari ulasan dan diskusi publik.
- [ ]  Catat sumber setiap pertanyaan.
- [ ]  Kelompokkan berdasarkan ukuran, kualitas, fungsi, harga, penggunaan, dan keberatan.
- [ ]  Tandai pertanyaan yang paling sering muncul dalam sampel yang kamu periksa.
- [ ]  Ubah pertanyaan itu menjadi ide konten.

**Tugas 3 — Buat daftar peluang konten**

- [ ]  Pilih 5 masalah yang punya bukti paling relevan.
- [ ]  Buat minimal 2 ide konten untuk setiap masalah (total minimal 10 ide).
- [ ]  Tentukan bukti yang dibutuhkan untuk setiap konten.
- [ ]  Tentukan tujuan konten: menjangkau audiens, menjawab keberatan, atau mendorong pembelian.

## 9. Latihan dan Kunci Jawaban

**1. Apa perbedaan tren dan permintaan?**
Tren adalah perubahan minat atau perhatian masyarakat. Permintaan adalah kebutuhan atau keinginan pasar terhadap produk atau solusi. Keduanya berkaitan tetapi tidak sama. Contoh: botol minum viral banyak ditonton, tetapi belum tentu dibeli.

**2. Sebutkan tujuh jenis kebutuhan pembeli beserta satu contoh.**
Fungsional (blender), kenyamanan (pel lantai dengan sistem pemeras), penghematan (botol minum isi ulang), estetika (lampu dekorasi kamar), keamanan (pelindung sudut meja), produktivitas (stand laptop), penggantian (kabel charger pengganti).

**3. Mengapa banyaknya konten tentang suatu produk belum tentu berarti permintaan besar?**
Karena sumber yang berbeda belum tentu independen. Banyak video bisa membahas tren yang sama karena meniru satu video awal.

**4. Sebutkan tiga status temuan dalam matriks validasi.**
Terdukung (bukti relevan dari beberapa sumber independen), perlu diperiksa (bukti dari satu sumber atau masih lemah), belum terdukung (bukti belum cukup).

**5. Klasifikasikan pernyataan berikut sebagai fakta, estimasi, atau hipotesis.**

- "Halaman produk menampilkan harga tertentu pada tanggal pengamatan." → Fakta.
- "Jika 1.000 klik menghasilkan 20 transaksi, conversion rate adalah 2%." → Estimasi.
- "Video demonstrasi kapasitas organizer mungkin lebih menarik daripada video desain." → Hipotesis.

**6. Jelaskan empat jenis kata kunci.**
Informasional (cara merapikan meja: mencari informasi atau solusi), komersial (rekomendasi organizer meja atau "organizer plastik vs besi": sedang mengevaluasi pilihan, termasuk membandingkan alternatif), transaksional (beli organizer meja murah: niat membeli lebih kuat), navigasional (toko organizer meja di Shopee: mencari toko, merek, atau halaman tertentu).

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika kamu bisa menjelaskan calon pembeli dan masalahnya. Kamu juga sudah mengumpulkan 20 masalah pembeli, memvalidasi satu peluang dengan minimal tiga sumber, memisahkan fakta, estimasi, dan hipotesis, serta membuat daftar peluang konten dari hasil risetmu.
', 'Modul 04', 15, false, 8, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l09', 'm02', 'Modul 05 — Niche, Audiens, dan Positioning', 'modul-05-niche-audiens-dan-positioning', '# Modul 05 — Niche, Audiens, dan Positioning

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- [ ]  Memilih satu niche dan satu audiens utama berdasarkan bukti dan kemampuanmu.
- [ ]  Memahami alasan calon pembeli tertarik atau ragu membeli produk.
- [ ]  Menyusun buyer persona yang membedakan fakta dan asumsi.
- [ ]  Menulis positioning yang jelas dan menentukan diferensiasi yang realistis.
- [ ]  Memilih 10 masalah audiens utama dari 20 masalah di Modul 04.

Hasil akhir modul: satu niche utama, satu audiens utama, satu buyer persona, satu pernyataan positioning, dan daftar masalah yang dipakai untuk memilih produk.

## 2. Ringkasan Konsep Utama

- Niche menentukan audiens, masalah, produk, konten, dan alasan orang mengikuti akunmu.
- Niche terlalu luas membuat konten tidak terarah. Niche terlalu sempit membuat produk dan ide konten habis.
- Evaluasi niche lewat lima faktor: permintaan, produk, kemampuan, konten, monetisasi.
- Untuk affiliate, segmentasi berdasarkan **masalah dan situasi** lebih berguna daripada usia atau jenis kelamin.
- Buyer persona dibangun dari fakta riset. Tandai semua asumsi.
- Pain point, motivasi, dan keberatan adalah tiga sumbu utama untuk merancang konten.
- Validasi daya beli dan sensitivitas harga. Jangan mengasumsikannya dari status audiens.
- Positioning menjelaskan siapa yang dibantu, masalah apa, manfaat apa, dan pendekatan konten apa.
- Kompetitor bukan alasan menghindari niche. Diferensiasi yang jelas lebih penting.

## 3. Penjelasan

### 3.1 Definisi niche

Niche adalah bidang atau segmen pasar yang kamu pilih sebagai fokus utama bisnis affiliate. Niche membantu menentukan:

- Siapa yang ingin kamu jangkau.
- Masalah apa yang ingin kamu bantu selesaikan.
- Produk apa yang relevan untuk dipromosikan.
- Konten apa yang perlu dibuat.
- Alasan audiens mengikuti akunmu.

Contoh niche: fashion pria; perawatan rambut; peralatan dapur; perlengkapan kamar kos; peralatan kerja dan produktivitas; perlengkapan olahraga di rumah; aksesori HP; perlengkapan ibu dan bayi.

**Niche terlalu luas vs lebih terarah**

| Niche terlalu luas | Niche yang lebih terarah |
| --- | --- |
| Elektronik | Aksesori HP untuk penggunaan sehari-hari |
| Rumah tangga | Solusi penyimpanan untuk rumah kecil |
| Fashion | Pakaian kasual pria dengan anggaran terbatas |
| Kesehatan dan kebugaran | Perlengkapan olahraga rumahan untuk pemula |
| Peralatan kerja | Aksesori meja kerja untuk pelajar dan pekerja |

> Niche yang spesifik memudahkanmu memahami kebutuhan audiens. Tapi jangan terlalu sempit sampai hampir tidak ada produk yang relevan atau peluang konten.

### 3.2 Lima faktor evaluasi niche

Niche yang bagus bukan sekadar niche yang sedang populer. Niche itu harus sesuai dengan kebutuhan pasar, kemampuanmu membuat konten, dan peluang bisnis yang masuk akal.

| Faktor | Pertanyaan evaluasi |
| --- | --- |
| Permintaan | Apakah ada bukti bahwa orang membutuhkan solusi dalam niche ini? |
| Produk | Apakah tersedia cukup banyak produk yang layak dipromosikan? |
| Kemampuan | Apakah kamu mampu menjelaskan atau mendemonstrasikan produknya? |
| Konten | Apakah ada banyak masalah dan pertanyaan yang bisa dijadikan konten? |
| Monetisasi | Apakah produk punya komisi yang layak dan peluang menghasilkan transaksi? |

### 3.3 Segmentasi audiens

Segmentasi audiens adalah membagi calon pembeli menjadi kelompok berdasarkan karakteristik dan kebutuhannya. Kamu tidak harus menargetkan semua orang yang mungkin membeli.

Contoh: organizer meja bisa relevan bagi pelajar bermeja kecil, pekerja dari rumah, penghuni kamar kos, pengguna komputer dengan banyak kabel, atau siapa saja yang ingin merapikan ruang kerja. Produknya sama, tetapi alasan beli dan konten yang dibutuhkan bisa berbeda.

**Empat cara segmentasi**

1. **Berdasarkan karakteristik** — contoh: pelajar, pekerja, mahasiswa, pemilik usaha kecil.
2. **Berdasarkan situasi** — contoh: tinggal di kamar kos, bekerja dari rumah, punya meja kecil, sering berpindah tempat kerja.
3. **Berdasarkan masalah** — contoh: meja berantakan, ruang terbatas, kabel kusut, sulit menyimpan alat tulis.
4. **Berdasarkan perilaku pembelian** — contoh: mencari produk paling murah, membandingkan beberapa merek, mengutamakan daya tahan, mencari produk yang mudah dipasang.

> Untuk affiliate marketing, segmentasi berdasarkan **masalah dan situasi** sering lebih berguna daripada usia atau jenis kelamin.

### 3.4 Buyer persona

Buyer persona adalah gambaran terstruktur tentang calon pembeli ideal, berdasarkan informasi yang kamu kumpulkan.

> Persona bukan karakter karangan. Pakai fakta yang kamu temukan dan tandai hal yang masih asumsi.

**Contoh persona: penghuni kamar kos dengan meja kecil** (contoh ilustratif untuk latihan, bukan hasil survei aktual)

- **Situasi** — Tinggal di kamar kos dengan ruang terbatas. Meja dipakai untuk belajar, bekerja, atau mengakses komputer.
- **Masalah utama** — Barang di meja mudah menumpuk, kabel perangkat berantakan, ruang kerja terasa sempit.
- **Motivasi** — Ingin meja lebih rapi tanpa menghabiskan banyak ruang atau uang.
- **Keberatan sebelum membeli** — Takut ukuran tidak sesuai, khawatir bahan kurang kokoh, tidak ingin membayar produk yang kurang berguna.
- **Informasi yang dibutuhkan** — Ukuran produk, kapasitas penyimpanan, bahan, cara pemasangan, dan harga.
- **Produk yang mungkin relevan** — Organizer meja, pengatur kabel, rak kecil, atau tempat penyimpanan bertingkat.

> Perbarui persona jika riset menunjukkan calon pembeli sebenarnya punya kebutuhan yang berbeda.

### 3.5 Pain point, motivasi, dan keberatan

Ketiganya membantu kamu membuat konten yang menjawab alasan orang membeli atau tidak membeli.

**A. Pain point** — masalah atau kesulitan yang dirasakan calon pembeli. Contoh: meja terlalu sempit; barang mudah hilang; produk lama mudah rusak; sulit menemukan produk dengan ukuran yang tepat.

**B. Motivasi** — hasil yang ingin dicapai calon pembeli. Contoh: ingin meja lebih rapi; ingin kerja lebih nyaman; ingin menghemat ruang; ingin menghindari salah beli.

**C. Keberatan** — alasan calon pembeli ragu atau menunda pembelian. Contoh: harga terlalu mahal; tidak yakin kualitasnya; ukuran belum tentu sesuai; tidak tahu apakah produk benar-benar perlu; takut barang yang datang berbeda dari foto.

**Cara menghubungkan ketiganya**

| Pain point | Motivasi | Keberatan | Pendekatan konten |
| --- | --- | --- | --- |
| Meja berantakan | Meja lebih rapi | Takut organizer terlalu kecil | Demonstrasi kapasitas |
| Kabel kusut | Kabel lebih teratur | Takut perekat mudah lepas | Jelaskan cara pemasangan dan keterbatasannya |
| Sulit memilih stand laptop | Posisi layar lebih sesuai | Takut tidak stabil | Bandingkan spesifikasi dan demonstrasi |
| Anggaran terbatas | Mendapat produk yang berguna | Takut kualitas rendah | Bandingkan fitur, bahan, dan harga |

> Konten yang baik tidak hanya menonjolkan kelebihan. Konten juga membantu audiens memahami keterbatasan produk supaya tidak salah beli.

### 3.6 Daya beli dan sensitivitas harga

- **Daya beli** — kemampuan seseorang membeli produk berdasarkan kondisi keuangannya.
- **Sensitivitas harga** — seberapa besar perubahan harga memengaruhi keputusan pembelian seseorang.

Contoh: orang yang mencari organizer termurah lebih sensitif terhadap harga daripada orang yang mengutamakan bahan kuat dan tahan lama.

> Jangan menganggap semua mahasiswa beranggaran rendah atau semua pekerja beranggaran tinggi. Validasi dulu.
>
> **Penting:** Produk termurah tidak otomatis paling mudah terjual. Produk lebih mahal juga tidak otomatis berkomisi lebih tinggi. Hitung kelayakan dari harga, komisi aktual, kemungkinan transaksi, dan faktor lain dalam program affiliate.

### 3.7 Customer journey

Customer journey adalah perjalanan calon pembeli sejak menyadari masalah sampai membeli produk. Ada empat tahap, dan nama yang sama dipakai di Modul 09.

| Tahap | Kondisi calon pembeli | Konten yang sesuai |
| --- | --- | --- |
| 1 — Awareness (menyadari masalah) | Contoh: meja terlihat berantakan dan sulit dipakai | Penyebab masalah dan solusi dasar |
| 2 — Consideration (mencari dan mempertimbangkan solusi) | Mulai mencari organizer, kotak penyimpanan, atau pengatur kabel | Tutorial dan pilihan solusi |
| 3 — Evaluation (membandingkan produk) | Membandingkan ukuran, harga, kualitas, dan fitur | Perbandingan dan demonstrasi |
| 4 — Conversion (memutuskan membeli) | Memilih produk dan membuka link untuk membeli | Jawaban atas keberatan, informasi produk, dan CTA yang jelas |

> Tidak semua orang melewati tahap ini berurutan. Ada yang langsung membeli saat menemukan produk yang cocok. Ada yang membandingkan banyak alternatif. Tugas konten affiliate adalah membantu audiens di tahap yang sedang mereka jalani.

### 3.8 Positioning akun

Positioning adalah cara kamu ingin dipahami dan diingat audiens dibandingkan akun lain.

- **Positioning lemah:** "Saya membagikan produk Shopee yang bagus." Terlalu umum, tidak menjelaskan siapa yang dibantu atau manfaatnya.
- **Positioning lebih terarah:** "Saya membantu penghuni kamar kos menemukan perlengkapan hemat ruang melalui demonstrasi, perbandingan, dan panduan memilih produk."

Positioning yang baik menjelaskan: siapa audiens utama, masalah apa yang dibantu, manfaat apa yang ditawarkan, dan pendekatan konten apa yang dipakai.

### 3.9 Diferensiasi dari kompetitor

Diferensiasi adalah alasan akunmu punya nilai berbeda dari akun lain di niche serupa.

Kamu tidak perlu mencari niche tanpa kompetitor. Adanya kompetitor bisa menjadi bukti awal bahwa niche itu aktif. Namun persaingan tinggi berarti kamu perlu pendekatan yang lebih jelas.

Contoh diferensiasi:

- Fokus pada produk untuk ruang yang sangat terbatas.
- Membuat demonstrasi ukuran secara nyata.
- Menjelaskan kekurangan produk secara terbuka.
- Membandingkan produk berdasarkan kebutuhan tertentu.
- Menampilkan perhitungan biaya dan nilai guna.
- Memakai format tutorial yang mudah diikuti.
- Menjawab pertanyaan yang belum dijelaskan konten lain.

**Contoh:** banyak akun membahas organizer meja dengan menampilkan desain dan harga. Kamu bisa membuat konten "Apakah organizer ini benar-benar muat di meja berukuran 60 cm?" Konten ini lebih spesifik karena menjawab kebutuhan tertentu. Tapi kamu harus punya ukuran produk yang valid dan menunjukkan dasar pengukurannya.

### 3.10 Niche utama dan batas ekspansi

Di tahap awal, pakai satu niche utama. Dengan begitu kamu lebih mudah memahami pasar dan mengevaluasi performa konten. Kamu boleh menguji beberapa subkategori yang masih berhubungan.

Contoh:

- Niche utama: perlengkapan ruang kerja.
- Subkategori: organizer meja, pengatur kabel, stand laptop, lampu meja.

Semua produk ini melayani audiens yang sama. Sebaliknya, menggabungkan stand laptop, kosmetik, makanan hewan, dan pakaian bayi dalam satu akun tanpa hubungan jelas membuat positioning sulit dipahami.

**Kapan boleh memperluas?**

- [ ]  Kamu sudah mengenali kebutuhan audiens yang konsisten.
- [ ]  Ada konten dengan sinyal positif berdasarkan metrik yang relevan.
- [ ]  Produk awal sudah diuji dengan data yang cukup.
- [ ]  Kamu menemukan subkategori yang berkaitan dengan kebutuhan audiens.
- [ ]  Kamu punya waktu menguji kategori tambahan tanpa mengabaikan kategori utama.

> Tidak ada angka universal yang menjamin niche layak diperluas. Pertimbangkan kualitas data, konsistensi hasil, dan sumber daya yang kamu punya.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Niche | Bidang atau segmen pasar yang kamu pilih sebagai fokus utama bisnis affiliate |
| Segmentasi audiens | Membagi calon pembeli menjadi kelompok berdasarkan karakteristik dan kebutuhannya |
| Buyer persona | Gambaran terstruktur tentang calon pembeli ideal berdasarkan informasi yang kamu kumpulkan |
| Pain point | Masalah atau kesulitan yang dirasakan calon pembeli |
| Motivasi | Hasil yang ingin dicapai calon pembeli |
| Keberatan | Alasan calon pembeli ragu atau menunda pembelian |
| Daya beli | Kemampuan seseorang membeli produk berdasarkan kondisi keuangannya |
| Sensitivitas harga | Seberapa besar perubahan harga memengaruhi keputusan pembelian |
| Customer journey | Perjalanan calon pembeli dari menyadari masalah sampai membeli produk |
| Positioning | Cara kamu ingin dipahami dan diingat audiens dibandingkan akun lain |
| Diferensiasi | Alasan akunmu punya nilai berbeda dari akun lain di niche serupa |

## 5. Langkah Praktik

### 5.1 Cara memilih niche

1. **Buat daftar 3–5 niche kandidat.** Pilih berdasarkan minat, pengalaman, akses ke produk, atau masalah yang ingin kamu pelajari.
2. **Riset kebutuhan setiap niche.** Cari pertanyaan, keluhan, kata kunci, dan bukti niat membeli.
3. **Periksa produk yang tersedia.** Pastikan ada produk relevan dengan informasi cukup, yang bisa dipromosikan lewat program affiliate yang kamu ikuti.
4. **Evaluasi kemampuan produksi konten.** Pertimbangkan apakah kamu bisa membuat konten tanpa membeli banyak produk. Misalnya demonstrasi barang yang sudah kamu miliki, perbandingan spesifikasi, atau penjelasan kebutuhan pembeli dari sumber yang valid. **Jika konten butuh demonstrasi fisik, jangan mengaku sudah menguji produk yang belum pernah kamu pakai.**
5. **Pilih satu niche utama untuk diuji.** Jangan menjalankan lima niche di lima akun jika waktu dan tenagamu terbatas.

### 5.2 Cara mempelajari sensitivitas harga

1. Periksa rentang harga produk sejenis.
2. Baca ulasan yang membahas harga dan kualitas.
3. Amati pertanyaan tentang alternatif yang lebih murah.
4. Bandingkan fitur dan kualitas pada rentang harga berbeda.
5. Catat apakah pembeli mengutamakan harga, daya tahan, desain, atau fungsi.
6. Uji konten perbandingan produk jika data awal mendukung.

## 6. Contoh dan Perhitungan

### 6.1 Contoh penilaian niche (skor 1–5)

Pakai skor 1–5. Angka 1 berarti sangat lemah, angka 5 berarti sangat kuat.

| Faktor | Peralatan meja kerja | Aksesori HP | Dekorasi kamar |
| --- | --- | --- | --- |
| Bukti permintaan | 4 | 4 | 3 |
| Ketersediaan produk | 4 | 5 | 4 |
| Kemampuan membuat konten | 4 | 3 | 4 |
| Potensi ide konten | 4 | 5 | 4 |
| Peluang monetisasi | 3 | 3 | 3 |
| **Total ilustratif** | **19** | **20** | **18** |

> **Angka ini hanya contoh latihan, bukan hasil riset pasar aktual.** Jangan menentukan skor monetisasi dari dugaan. Periksa komisi dan potensi transaksi dulu.
>
> Niche bernilai tertinggi belum tentu pilihan terbaik. Jika kamu tidak mampu membuat konten berkualitas di niche itu, skor tinggi di atas kertas tidak banyak membantu.

### 6.2 Formula positioning

> Saya membantu [audiens utama] menyelesaikan [masalah utama] melalui [pendekatan konten] agar mereka dapat [hasil yang diinginkan].

Contoh:

- "Saya membantu penghuni kamar kos menemukan perlengkapan hemat ruang melalui demonstrasi, perbandingan, dan panduan memilih produk."
- "Saya membantu pekerja rumahan memilih aksesori meja kerja yang praktis melalui perbandingan fitur, demonstrasi, dan panduan pembelian."

> Pakai formula ini sebagai titik awal, bukan janji bahwa kamu pasti bisa memberi semua hasil itu. Pastikan pendekatan kontenmu benar-benar bisa kamu jalankan.

### 6.3 Template buyer persona

Salin template ini ke Notion.

- Nama persona:
- Situasi atau latar belakang:
- Kebutuhan utama:
- Masalah yang ingin diselesaikan:
- Tujuan yang ingin dicapai:
- Motivasi pembelian:
- Batas anggaran atau sensitivitas harga:
- Hal yang dikhawatirkan:
- Pertanyaan sebelum membeli:
- Jenis konten yang dibutuhkan:
- Produk yang mungkin relevan:
- Bukti yang mendukung persona:
- Asumsi yang belum terverifikasi:

### 6.4 Template Tugas 5 — 10 masalah audiens utama

Pilih 10 masalah dari 20 masalah yang kamu kumpulkan di Modul 04. Pilih yang paling sesuai dengan audiens utamamu.

| No. | Masalah | Bukti | Ide solusi | Ide konten |
| --- | --- | --- | --- | --- |
| 1 |  |  |  |  |
| 2 |  |  |  |  |
| 3 |  |  |  |  |
| 4 |  |  |  |  |
| 5 |  |  |  |  |
| 6 |  |  |  |  |
| 7 |  |  |  |  |
| 8 |  |  |  |  |
| 9 |  |  |  |  |
| 10 |  |  |  |  |

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Memilih niche hanya karena sedang populer | Periksa kebutuhan pasar dan kemampuan produksi kontenmu |
| Niche terlalu luas atau terlalu sempit | Pilih niche yang terarah, dengan produk dan ide konten yang cukup |
| Memberi skor monetisasi berdasarkan dugaan | Periksa komisi dan potensi transaksi dulu |
| Memilih niche hanya karena skornya tertinggi | Pastikan kamu mampu membuat konten berkualitas di sana |
| Mengarang karakter buyer persona | Pakai fakta riset dan tandai asumsi |
| Mengaku sudah menguji produk yang belum pernah dipakai | Buat konten berdasarkan bukti yang tersedia |
| Menjalankan lima niche di lima akun | Mulai dengan satu niche utama |
| Mengasumsikan semua mahasiswa beranggaran rendah atau semua pekerja beranggaran tinggi | Validasi daya beli lewat riset |
| Menganggap produk termurah pasti paling mudah dijual, atau produk mahal pasti berkomisi lebih tinggi | Hitung harga, komisi aktual, dan kemungkinan transaksi |
| Positioning terlalu umum, seperti "Saya membagikan produk Shopee yang bagus" | Pakai formula positioning yang menyebut audiens, masalah, dan pendekatan |
| Menggabungkan kategori yang tidak berhubungan dalam satu akun | Pilih subkategori yang melayani audiens yang sama |
| Hanya menonjolkan kelebihan produk | Jelaskan juga keterbatasannya |

## 8. Tugas dan Checklist

**Tugas 1 — Pilih satu niche**

- [ ]  Buat daftar 3–5 niche kandidat.
- [ ]  Evaluasi bukti permintaan setiap niche.
- [ ]  Periksa ketersediaan produk dan program affiliate.
- [ ]  Nilai kemampuanmu membuat konten.
- [ ]  Pilih satu niche utama untuk pengujian awal.
- [ ]  Catat alasan pemilihan dan risiko utamanya.

**Tugas 2 — Tentukan satu audiens utama**

- [ ]  Tentukan siapa calon pembelinya.
- [ ]  Tentukan situasi yang mereka hadapi.
- [ ]  Tentukan tiga masalah utama mereka.
- [ ]  Identifikasi motivasi pembelian.
- [ ]  Catat keberatan dan sensitivitas harga.
- [ ]  Pisahkan fakta hasil riset dari asumsi.

**Tugas 3 — Buat buyer persona.** Pakai template di bagian 6.3.

**Tugas 4 — Tulis positioning.** Lengkapi kalimat: "Saya membantu ______ menyelesaikan ______ melalui ______ agar mereka dapat ______."

**Tugas 5 — Pilih 10 masalah audiens utama.** Pilih dari 20 masalah di Modul 04, lalu isi tabel di bagian 6.4.

## 9. Latihan dan Kunci Jawaban

**1. Sebutkan lima faktor evaluasi niche beserta pertanyaan kuncinya.**
Permintaan (ada bukti orang butuh solusi?), Produk (cukup produk layak promosi?), Kemampuan (mampu menjelaskan atau mendemonstrasikan?), Konten (banyak masalah dan pertanyaan untuk dijadikan konten?), Monetisasi (komisi layak dan ada peluang transaksi?).

**2. Mengapa segmentasi berdasarkan masalah dan situasi lebih berguna untuk affiliate marketing?**
Audiens yang tertarik pada produk yang sama bisa punya alasan beli dan kebutuhan konten yang berbeda. Masalah dan situasi sering lebih berguna daripada usia atau jenis kelamin.

**3. Apa perbedaan pain point, motivasi, dan keberatan?**
Pain point adalah masalah atau kesulitan yang dirasakan. Motivasi adalah hasil yang ingin dicapai. Keberatan adalah alasan yang membuat ragu atau menunda pembelian.

**4. Sebutkan empat tahap customer journey dan konten yang sesuai.**
Awareness (menyadari masalah): penyebab masalah dan solusi dasar. Consideration (mencari dan mempertimbangkan solusi): tutorial dan pilihan solusi. Evaluation (membandingkan produk): perbandingan dan demonstrasi. Conversion (memutuskan membeli): jawaban atas keberatan, informasi produk, dan CTA yang jelas.

**5. Mengapa keberadaan kompetitor tidak otomatis buruk?**
Kompetitor bisa menjadi bukti awal bahwa niche itu aktif. Namun persaingan tinggi berarti kamu perlu pendekatan yang lebih jelas.

**6. Lengkapi formula positioning.**
"Saya membantu [audiens utama] menyelesaikan [masalah utama] melalui [pendekatan konten] agar mereka dapat [hasil yang diinginkan]."

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika kamu sudah memilih satu niche dan satu audiens utama berdasarkan bukti, membuat buyer persona yang memisahkan fakta dan asumsi, menulis positioning dan diferensiasi yang realistis, serta memilih 10 masalah audiens utama dari hasil Modul 04.
', 'Modul 05', 15, false, 9, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l10', 'm02', 'Modul 06 — Riset dan Evaluasi Produk', 'modul-06-riset-dan-evaluasi-produk', '# Modul 06 — Riset dan Evaluasi Produk

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- [ ]  Mengumpulkan 10–20 kandidat produk yang relevan dengan niche dan audiensmu.
- [ ]  Menilai produk dari kualitas, kebutuhan audiens, komisi, dan persaingan.
- [ ]  Menghitung skor produk dengan sistem skor berbobot.
- [ ]  Memilih 3–5 produk awal untuk diuji dan menetapkan kriteria penghentian promosi.

Hasil akhir modul: daftar produk yang sudah dievaluasi, skor kelayakan, alasan pemilihan, risiko, dan rencana pengujian.

## 2. Ringkasan Konsep Utama

- Produk yang bagus untuk affiliate bukan sekadar produk yang murah, viral, atau banyak ulasannya.
- Tujuannya bukan menemukan produk sempurna, tetapi produk yang **paling sesuai untuk diuji** berdasarkan bukti yang ada.
- Kumpulkan 10–20 kandidat dulu, baru seleksi. Jangan langsung membuat konten untuk semuanya.
- Pakai ulasan untuk menemukan **pola**, bukan untuk membuat klaim berlebihan.
- Periksa komisi secara aktual (produk, kategori, penjual, akun), bukan dari video tutorial lama.
- Nilai kelayakan produk dengan **sistem skor berbobot** yang totalnya 100%.
- Pembatalan, retur, dan ketersediaan adalah risiko yang memengaruhi komisi yang akhirnya kamu terima.
- Persaingan tinggi tidak otomatis harus dihindari. Yang penting adalah peluang diferensiasi.
- Jika data tidak tersedia, tulis "belum diketahui". Jangan mengarang persentase.

## 3. Penjelasan

### 3.1 Tujuan riset produk

Riset produk adalah proses menilai apakah suatu produk layak dipromosikan ke audiens targetmu. Produk yang layak memenuhi kondisi berikut:

- Dibutuhkan audiens.
- Menyelesaikan masalah yang jelas.
- Punya kualitas dan reputasi yang bisa dipertanggungjawabkan.
- Berharga masuk akal bagi calon pembeli.
- Berkomisi layak sesuai ketentuan program.
- Persaingannya masih bisa kamu hadapi.
- Bisa dipromosikan lewat konten yang informatif dan meyakinkan.

> Tujuanmu bukan menemukan produk sempurna, tetapi produk yang paling sesuai untuk diuji berdasarkan bukti yang tersedia.

### 3.2 Menemukan kandidat produk

Kandidat produk adalah produk yang masuk daftar awal untuk dievaluasi, tetapi belum tentu layak dipromosikan.

**Sumber kandidat produk:**

1. **Pencarian Shopee** — cari produk yang berhubungan langsung dengan masalah audiensmu. Contoh untuk niche perlengkapan ruang kerja: organizer meja, pengatur kabel, stand laptop, lampu meja, mouse pad, tempat alat tulis, rak meja kecil.
2. **Ulasan dan diskusi pembeli** — pakai keluhan untuk menemukan produk yang bisa jadi solusi. Periksa juga apakah produk alternatif benar-benar lebih baik mengatasi keluhan itu.
3. **Konten kompetitor** — amati produk yang mereka bahas dan pertanyaan di komentar. Jangan menganggap produk laris hanya karena banyak dipromosikan.
4. **Program affiliate** — periksa apakah produk dan penjualnya memenuhi syarat promosi, tersedia di program yang kamu ikuti, dan punya ketentuan komisi yang jelas.
5. **Kebutuhan yang belum terjawab** — cari produk atau alternatif yang bisa menyelesaikan masalah yang sering muncul di riset pasar.

Kumpulkan **10–20 kandidat produk**. Pada tahap ini jangan langsung membuat konten. Kumpulkan informasi dulu supaya seleksi lebih efisien.

### 3.3 Memeriksa harga dan variasi produk

Harga memengaruhi keputusan beli, tetapi harga murah tidak otomatis membuat produk lebih menarik. Periksa:

- Harga produk yang sebenarnya.
- Variasi ukuran, warna, bahan, atau kapasitas.
- Perbedaan harga antarvariasi.
- Kesesuaian harga dengan fitur.
- Ketersediaan variasi yang dibutuhkan audiens.
- Biaya tambahan yang relevan bagi pembeli, jika ada.
- Ketentuan voucher atau promosi yang berlaku.

### 3.4 Memeriksa ulasan dan reputasi penjual

Ulasan membantu menilai pengalaman pembeli, tetapi kualitas informasinya tidak sama.

**Hal yang perlu diperiksa:**

- **A. Rating produk** — petunjuk kepuasan pembeli, tetapi tidak menjelaskan semua aspek kualitas.
- **B. Jumlah ulasan** — memberi konteks banyaknya pengalaman yang tercatat. Namun produk berulasan banyak belum tentu berkualitas terbaik atau berkonversi affiliate tertinggi.
- **C. Ulasan terbaru** — membantu memeriksa apakah pengalaman pembeli masih konsisten.
- **D. Ulasan negatif** — periksa keluhan tentang bahan, ukuran tidak sesuai, produk rusak, fungsi tidak sesuai deskripsi, pengemasan, dan variasi yang tidak cocok.
- **E. Foto dan video pembeli** — jika ada, periksa apakah produk yang diterima sesuai deskripsi penjual.
- **F. Reputasi penjual** — periksa informasi toko, konsistensi produk, pelayanan, dan indikator reputasi yang ditampilkan platform.

> Ulasan bukan bukti mutlak bahwa semua pembeli akan mengalami hal serupa. Pakai ulasan untuk menemukan pola, bukan untuk membuat klaim berlebihan.

### 3.5 Menganalisis kelebihan dan kekurangan produk

Tugas affiliate bukan menyembunyikan kekurangan. Tugasmu membantu calon pembeli menentukan apakah produk cocok dengan kebutuhannya.

| Aspek | Pertanyaan |
| --- | --- |
| Fungsi | Masalah apa yang benar-benar bisa diselesaikan? |
| Kualitas | Bagaimana bahan dan konstruksinya? |
| Ukuran | Apakah sesuai dengan kebutuhan audiens? |
| Kemudahan | Apakah mudah dipakai atau dipasang? |
| Harga | Apakah sebanding dengan fitur dan kualitas? |
| Daya tahan | Apakah ada bukti ketahanan produk? |
| Keterbatasan | Dalam situasi apa produk kurang cocok? |

**Contoh:** stand laptop punya kelebihan mengangkat posisi layar. Namun produk ini kurang cocok jika ukurannya tidak sesuai dengan laptop, stabilitasnya kurang memadai, tinggi atau sudutnya tidak bisa diatur, atau pengguna butuh produk yang mudah dilipat untuk mobilitas tinggi. Konten yang menjelaskan batasan ini membantu audiens mengambil keputusan yang lebih tepat.

### 3.6 Memeriksa komisi aktual

Komisi adalah pendapatan yang berpotensi kamu terima dari transaksi yang memenuhi syarat program affiliate. Jangan memilih produk hanya dari harga atau popularitas. Periksa komisi yang benar-benar berlaku untuk produk, kategori, penjual, dan akunmu.

**Hal yang harus diperiksa:**

- Persentase atau nominal komisi.
- Dasar perhitungan komisi.
- Ketentuan kelayakan transaksi.
- Perbedaan komisi reguler dan promosi, jika ada.
- Periode atribusi atau masa berlaku pelacakan (lihat Modul 02).
- Ketentuan pembatalan dan retur.
- Status komisi (lihat bagian 3.12).
- Jadwal dan ketentuan pembayaran.

> **Ketentuan bisa berubah. Pakai informasi resmi Shopee Affiliate yang berlaku untuk akun dan wilayahmu, bukan hanya video tutorial lama atau klaim pihak lain.**

### 3.7 Menilai risiko pembatalan dan retur

Pembatalan dan retur bisa memengaruhi komisi affiliate. Produk yang banyak diklik belum tentu menghasilkan komisi akhir yang baik.

Faktor yang perlu diperhatikan:

- Deskripsi produk tidak jelas.
- Foto berpotensi menimbulkan ekspektasi keliru.
- Ukuran atau variasi sulit dipahami.
- Kualitas produk tidak konsisten.
- Banyak ulasan negatif tentang fungsi atau bahan.
- Penjual sering mengganti variasi atau stok.
- Produk mudah rusak saat pengiriman.

> **Kamu tidak selalu punya data tingkat retur yang sebenarnya. Jika datanya tidak ada, jangan mengarang persentasenya.** Pakai indikator yang tersedia untuk menilai risiko, dan tandai ketidakpastiannya.

### 3.8 Menganalisis persaingan produk

Persaingan adalah jumlah dan kekuatan pihak lain yang mempromosikan produk atau memenuhi kebutuhan audiens yang sama.

Persaingan tinggi tidak otomatis berarti produk harus dihindari. Persaingan bisa menunjukkan bahwa produk itu menarik bagi pasar. Pertanyaan yang lebih penting:

- Apakah kompetitor membahas kebutuhan yang sama?
- Apakah kontennya hanya mengulang informasi produk?
- Apakah ada pertanyaan yang belum terjawab?
- Apakah kamu bisa membuat demonstrasi yang lebih informatif?
- Apakah kamu punya sudut pandang yang relevan dan berbeda?

**Contoh:** banyak akun mempromosikan stand laptop dengan menyebut harga dan desain. Kamu bisa membahas perbedaan stand yang bisa dilipat dan yang tidak, cara memeriksa kecocokan ukuran, hal yang perlu diperiksa soal stabilitas, kelebihan dan kekurangan tiap tipe, dan kesalahan memilih stand untuk meja kecil.

> Diferensiasi tidak harus berarti produknya berbeda. Cara kamu membantu pembeli memilih juga bisa menjadi pembeda.

### 3.9 Mengukur potensi demonstrasi

Potensi demonstrasi adalah seberapa mudah manfaat, cara pakai, atau perbedaan produk ditunjukkan lewat konten.

| Produk | Potensi demonstrasi |
| --- | --- |
| Organizer meja | Menunjukkan kapasitas sebelum dan sesudah dipakai |
| Pengatur kabel | Memperlihatkan cara merapikan kabel |
| Stand laptop | Memperlihatkan ukuran, mekanisme, dan stabilitas |
| Lampu meja | Menunjukkan pengaturan cahaya dalam kondisi yang sesuai |
| Kotak penyimpanan | Memperlihatkan ukuran dan barang yang bisa dimasukkan |

> Tidak semua produk harus ditunjukkan secara fisik. Beberapa produk bisa dijelaskan lewat perbandingan spesifikasi, tutorial, atau analisis kebutuhan. **Jika kamu belum punya produknya, buat konten sesuai bukti yang tersedia dan jangan mengaku sudah menguji produk secara pribadi.**

### 3.10 Menilai kesesuaian produk dengan niche

Produk harus sesuai dengan kebutuhan audiens dan positioning akun. Contoh: jika niche kamu perlengkapan ruang kerja, stand laptop dan pengatur kabel masih relevan. Dekorasi rumah mungkin juga relevan jika berkaitan dengan penataan ruang kerja. Tapi produk yang tidak berhubungan dengan kebutuhan audiens jangan langsung ditambahkan hanya karena komisinya menarik.

Sebelum memilih produk, tanyakan:

- Apakah audiensku benar-benar membutuhkan produk ini?
- Masalah apa yang diselesaikannya?
- Apakah produk sesuai dengan positioning akun?
- Apakah aku punya bukti cukup untuk menjelaskan manfaatnya?
- Apakah produk punya kekurangan yang perlu diketahui pembeli?
- Apakah produk tersedia lewat program affiliate yang relevan?

### 3.11 Memeriksa stabilitas ketersediaan

Ketersediaan memengaruhi kemampuanmu terus mempromosikan produk. Periksa:

- Apakah produk masih tersedia?
- Apakah variasi yang dibutuhkan sering habis?
- Apakah penjual punya alternatif yang relevan?
- Apakah harga berubah signifikan?
- Apakah produk atau penjual masih memenuhi ketentuan program?
- Apakah affiliate link masih berfungsi?

> Jika produk sering habis atau berubah sehingga menyulitkan promosi, siapkan alternatif yang relevan. Tapi jangan langsung mengganti produk sebelum memeriksa apakah alternatifnya memenuhi kebutuhan yang sama.

### 3.12 Status komisi

Komisi melewati empat status berurutan: **Estimasi → Pending → Disetujui → Dibayarkan**. Periksa status ini di dashboard Shopee Affiliate.

> Nama di dashboard bisa berbeda dari istilah di materi ini. Misalnya, status Pending bisa tampil sebagai "Dalam proses". Cocokkan dengan tampilan akunmu.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Riset produk | Proses menilai apakah suatu produk layak dipromosikan ke audiens targetmu |
| Kandidat produk | Produk yang masuk daftar awal untuk dievaluasi, tetapi belum tentu layak dipromosikan |
| Komisi | Pendapatan yang berpotensi kamu terima dari transaksi yang memenuhi syarat program affiliate |
| Kelayakan produk | Penilaian menyeluruh tentang apakah produk pantas dipromosikan |
| Persaingan | Jumlah dan kekuatan pihak lain yang mempromosikan produk atau memenuhi kebutuhan audiens yang sama |
| Potensi demonstrasi | Seberapa mudah manfaat, cara pakai, atau perbedaan produk ditunjukkan lewat konten |
| Status komisi | Empat tahap berurutan: Estimasi, Pending, Disetujui, Dibayarkan |
| Periode atribusi | Masa berlaku pelacakan transaksi (lihat Modul 02) |

## 5. Langkah Praktik

### 5.1 Cara membaca ulasan secara efektif

Jangan hanya membaca ulasan bintang lima. Pakai metode sederhana ini:

1. Baca sejumlah ulasan positif.
2. Baca ulasan netral.
3. Baca ulasan negatif.
4. Periksa ulasan terbaru.
5. Kelompokkan keluhan berdasarkan jenisnya.
6. Catat apakah masalah yang sama muncul berulang.
7. Bandingkan dengan produk alternatif.

Contoh: jika beberapa pembeli mengeluh ukuran terlalu kecil, pastikan ukuran produk sebelum merekomendasikannya.

### 5.2 Faktor evaluasi kelayakan produk

Kelayakan produk adalah penilaian menyeluruh. Jangan hanya memakai satu faktor, seperti rating atau komisi. Periksa sembilan hal ini:

1. Kesesuaian dengan masalah audiens.
2. Kualitas dan reputasi penjual.
3. Harga dan nilai guna.
4. Komisi aktual.
5. Persaingan konten.
6. Kemampuan menghasilkan demonstrasi.
7. Risiko pembatalan atau retur.
8. Ketersediaan produk.
9. Kesesuaian dengan aturan program affiliate.

### 5.3 Mencatat kandidat di Database Produk Affiliate

Catat semua kandidat di Database Produk Affiliate (Notion) yang kamu buat di Modul 03. Tambahkan enam kolom baru:

| Kolom baru | Tipe | Isi |
| --- | --- | --- |
| Rating | Number | Rating produk saat dicek |
| Jumlah Ulasan | Number | Jumlah ulasan saat dicek |
| Kualitas Penjual | Select | Penilaianmu atas reputasi penjual |
| Potensi Konten | Select | Seberapa mudah produk dijadikan konten |
| Kelayakan Program | Select | Apakah produk memenuhi ketentuan program |
| Skor Produk | Number | Hasil skor berbobot (0–100) |

Kolom Status memakai tiga pilihan: Riset, Siap Dipromosikan, Dihentikan. Kandidat baru berstatus Riset. Produk yang terpilih menjadi Siap Dipromosikan.

## 6. Contoh dan Perhitungan

### 6.1 Contoh evaluasi harga dan variasi (tiga organizer meja)

| Aspek | Produk A | Produk B | Produk C |
| --- | --- | --- | --- |
| Harga | Rp25.000 | Rp40.000 | Rp55.000 |
| Bahan | Plastik | Logam | Plastik tebal |
| Ukuran | Kecil | Sedang | Besar |
| Kelebihan | Murah | Konstruksi kokoh | Kapasitas besar |
| Risiko | Kapasitas terbatas | Harga lebih tinggi | Memerlukan ruang lebih besar |

> **Angka dan karakteristik di tabel adalah contoh ilustratif, bukan hasil pemeriksaan produk Shopee tertentu.**

Dari contoh ini kamu tidak bisa langsung menyimpulkan Produk A paling baik. Pilihan terbaik bergantung pada kebutuhan pembeli. Untuk pembeli bermeja kecil dengan anggaran terbatas, Produk A mungkin lebih sesuai. Untuk pembeli yang butuh konstruksi logam, Produk B mungkin lebih relevan.

### 6.2 Contoh perhitungan komisi

Misalnya harga produk Rp100.000, **asumsi** komisi efektif 5%, dan 1 transaksi memenuhi syarat.

```
Estimasi komisi = Harga × Tarif komisi
                = Rp100.000 × 5%
                = Rp5.000
```

> Ini simulasi. Angka 5% adalah **asumsi, bukan tarif resmi Shopee**. Nilai sebenarnya bergantung pada dasar perhitungan dan ketentuan komisi yang berlaku di akun dan wilayahmu. Jika transaksi dibatalkan atau tidak memenuhi syarat, komisi itu belum tentu kamu terima.

### 6.3 Sistem skor produk (berbobot)

Beri skor 1–5 untuk setiap faktor. Semakin tinggi, semakin baik.

| Faktor | Bobot |
| --- | --- |
| Kesesuaian dengan kebutuhan audiens | 25% |
| Kualitas dan reputasi | 20% |
| Harga dan nilai guna | 15% |
| Komisi dan potensi pendapatan | 15% |
| Persaingan | 10% |
| Potensi demonstrasi konten | 10% |
| Ketersediaan | 5% |
| **Total** | **100%** |

> Beri nilai tinggi pada Persaingan jika kamu menemukan peluang diferensiasi yang realistis. Beri nilai Komisi berdasarkan informasi aktual, bukan perkiraan tanpa bukti.

**Rumus skor berbobot:**

```
Skor total = jumlah dari (Skor faktor ÷ 5 × Bobot)
```

Karena bobot dalam persen, skor total berada pada skala 0–100.

### 6.4 Contoh simulasi skor

| Faktor | Skor (1–5) | Bobot | Perhitungan |
| --- | --- | --- | --- |
| Kebutuhan audiens | 5 | 25 | 5/5 × 25 = 25 |
| Kualitas dan reputasi | 4 | 20 | 4/5 × 20 = 16 |
| Harga dan nilai guna | 4 | 15 | 4/5 × 15 = 12 |
| Komisi | 3 | 15 | 3/5 × 15 = 9 |
| Persaingan | 3 | 10 | 3/5 × 10 = 6 |
| Potensi demonstrasi | 5 | 10 | 5/5 × 10 = 10 |
| Ketersediaan | 4 | 5 | 4/5 × 5 = 4 |

```
Skor total = 25 + 16 + 12 + 9 + 6 + 10 + 4 = 82 dari 100
```

> Angka ini contoh perhitungan, bukan penilaian produk nyata.

**Pedoman pengelompokan hasil:**

- **80–100:** kandidat prioritas untuk pengujian.
- **65–79:** kandidat yang perlu dibandingkan atau diperiksa lebih lanjut.
- **Di bawah 65:** kandidat dengan banyak kelemahan yang perlu dievaluasi kembali.

> Batas ini bukan standar universal. Produk berskor tinggi tetap harus memenuhi persyaratan kualitas, legalitas, dan ketentuan program.

### 6.5 Tabel perbandingan alternatif produk

Jangan membandingkan produk hanya dari harga. Pakai kriteria yang berhubungan dengan kebutuhan pembeli.

| Kriteria | Produk A | Produk B | Produk C |
| --- | --- | --- | --- |
| Harga |  |  |  |
| Bahan |  |  |  |
| Ukuran |  |  |  |
| Fungsi utama |  |  |  |
| Kualitas ulasan |  |  |  |
| Kekurangan |  |  |  |
| Komisi aktual |  |  |  |
| Ketersediaan |  |  |  |
| Kesesuaian audiens |  |  |  |

> Isi tabel dengan hasil pemeriksaan nyata. Pilih produk yang paling sesuai dengan kebutuhan utama audiens, bukan otomatis yang termurah atau berkomisi tertinggi.

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Memilih produk hanya karena murah, viral, atau banyak ulasan | Nilai produk dengan sistem skor berbobot |
| Menganggap produk berulasan banyak pasti berkualitas terbaik atau berkonversi tertinggi | Baca isi ulasan dan cari pola keluhan |
| Hanya membaca ulasan bintang lima | Baca ulasan positif, netral, negatif, dan terbaru |
| Memakai ulasan untuk klaim berlebihan | Pakai ulasan untuk menemukan pola |
| Menganggap produk laris karena banyak dipromosikan kompetitor | Periksa bukti permintaan sendiri |
| Memilih produk tanpa memeriksa komisi aktual | Cek komisi di sumber resmi Shopee Affiliate |
| Mengandalkan video tutorial lama untuk ketentuan komisi | Pakai informasi resmi yang berlaku |
| Mengarang persentase retur | Tulis "belum diketahui" dan pakai indikator risiko yang ada |
| Menilai kelayakan dari satu faktor saja | Pakai sembilan faktor evaluasi dan skor berbobot |
| Mengaku sudah menguji produk yang belum dimiliki | Buat konten dari bukti yang tersedia |
| Menambah produk tidak relevan karena komisinya menarik | Pastikan produk sesuai kebutuhan audiens dan positioning |
| Mengganti produk tanpa memeriksa alternatifnya | Pastikan alternatif memenuhi kebutuhan yang sama |
| Menghentikan produk hanya karena satu konten gagal | Periksa dulu hook, kualitas konten, jangkauan, dan CTA, bukan hanya kualitas produk |

## 8. Tugas dan Checklist

**Tugas 1 — Kumpulkan 10–20 kandidat produk**

- [ ]  Pilih produk yang relevan dengan niche.
- [ ]  Catat nama dan link produk di Database Produk Affiliate.
- [ ]  Catat harga serta variasinya.
- [ ]  Periksa ulasan positif dan negatif, lalu isi kolom Rating dan Jumlah Ulasan.
- [ ]  Periksa reputasi penjual dan isi kolom Kualitas Penjual.
- [ ]  Catat kelebihan dan kekurangan.
- [ ]  Periksa komisi aktual dan ketentuan program, lalu isi kolom Kelayakan Program.
- [ ]  Catat risiko ketersediaan.
- [ ]  Nilai potensi demonstrasi dan isi kolom Potensi Konten.

**Tugas 2 — Beri skor pada setiap produk.** Pakai sistem skor berbobot di bagian 6.3 dan isi kolom Skor Produk. Jika data belum tersedia, tulis "belum diketahui". Jangan memberi nilai seolah-olah sudah terverifikasi.

**Tugas 3 — Pilih 3–5 produk awal.** Pilih kandidat yang paling sesuai dengan audiens dan layak diuji. Ubah statusnya menjadi Siap Dipromosikan. Jangan mempromosikan semuanya sekaligus jika itu menyulitkanmu melihat produk mana yang benar-benar berhasil.

**Tugas 4 — Catat alasan pemilihan.** Untuk tiap produk, tulis: masalah yang diselesaikan, bukti kebutuhan audiens, kelebihan dan kekurangan, alasan produk dipilih, komisi aktual, risiko utama, ide konten awal, dan informasi yang masih belum diketahui.

**Tugas 5 — Tetapkan kriteria penghentian promosi.** Contoh kriteria:

- Produk tidak lagi tersedia.
- Produk tidak lagi memenuhi syarat program.
- Ada bukti kuat tentang masalah kualitas.
- Komisi berubah sehingga kelayakannya menurun.
- Produk tidak sesuai dengan audiens.
- Setelah pengujian memadai, produk tetap tidak menghasilkan sinyal positif dan ada alternatif yang lebih baik.

Produk yang dihentikan diberi status Dihentikan.

## 9. Latihan dan Kunci Jawaban

**1. Sebutkan tujuh kondisi produk yang layak dipromosikan.**
Dibutuhkan audiens; menyelesaikan masalah yang jelas; kualitas dan reputasi bisa dipertanggungjawabkan; harga masuk akal bagi calon pembeli; komisi layak sesuai ketentuan program; persaingan masih bisa dihadapi; bisa dipromosikan lewat konten yang informatif dan meyakinkan.

**2. Sebutkan bobot setiap faktor pada sistem skor produk.**
Kesesuaian dengan kebutuhan audiens 25%; kualitas dan reputasi 20%; harga dan nilai guna 15%; komisi dan potensi pendapatan 15%; persaingan 10%; potensi demonstrasi konten 10%; ketersediaan 5%. Total 100%.

**3. Produk dengan skor berbobot 70 masuk kategori apa, dan apa tindak lanjutnya?**
Rentang 65–79: kandidat yang perlu dibandingkan atau diperiksa lebih lanjut. Batas ini bukan standar universal.

**4. Hitung estimasi komisi untuk produk Rp100.000 dengan asumsi komisi efektif 5% dan 1 transaksi memenuhi syarat.**
Rp100.000 × 5% = Rp5.000. Ini simulasi, bukan tarif resmi Shopee. Jika transaksi dibatalkan atau tidak memenuhi syarat, komisi belum tentu diperoleh.

**5. Apa yang harus kamu lakukan jika data tingkat retur tidak tersedia?**
Jangan mengarang persentasenya. Pakai indikator yang tersedia untuk menilai risiko dan tandai ketidakpastiannya.

**6. Sebutkan empat status komisi yang harus diperiksa.**
Estimasi, Pending, Disetujui, Dibayarkan.

**7. Mengapa persaingan tinggi tidak otomatis berarti produk harus dihindari?**
Persaingan bisa menunjukkan bahwa produk itu menarik bagi pasar. Yang lebih penting: apakah ada pertanyaan yang belum terjawab, dan apakah kamu punya sudut pandang serta demonstrasi yang lebih informatif.

**8. Hitung skor berbobot jika skornya 5, 4, 4, 3, 3, 5, 4 (urut sesuai tabel bobot).**
25 + 16 + 12 + 9 + 6 + 10 + 4 = 82 dari 100.

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika kamu sudah mengumpulkan 10–20 kandidat produk di Database Produk Affiliate, memberi skor berbobot dengan data yang jelas, memilih 3–5 produk prioritas untuk diuji, dan menetapkan kriteria penghentian promosi.
', 'Modul 06', 15, false, 10, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l11', 'm02', 'Modul 07 — Riset Kompetitor', 'modul-07-riset-kompetitor', '# Modul 07 — Riset Kompetitor

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- [ ]  Menganalisis kompetitor tanpa menyalin konten mereka.
- [ ]  Membedakan kompetitor langsung dan tidak langsung, lalu memahami positioning mereka.
- [ ]  Menganalisis format konten, hook, dan CTA kompetitor.
- [ ]  Menemukan celah konten dan menyusun daftar peluang konten yang berpotensi menghasilkan penjualan.
- [ ]  Menjelaskan diferensiasi akunmu sendiri.

Hasil akhir modul: peta kompetitor, daftar celah konten, dan strategi diferensiasi yang bisa dijalankan.

## 2. Ringkasan Konsep Utama

- Riset kompetitor bertujuan memahami, bukan menyalin.
- Prinsip utama: pelajari pola yang berhasil, cari kekurangannya, lalu buat pendekatan orisinal yang lebih relevan bagi audiensmu.
- Kompetitor **langsung** menawarkan produk atau solusi yang sama untuk audiens serupa. Kompetitor **tidak langsung** menawarkan solusi berbeda untuk masalah yang sama.
- Simpulkan positioning kompetitor dari pola konten yang kamu amati, bukan dari satu video.
- Empat objek analisis utama: hook, format konten, cara menjawab keberatan, dan CTA.
- Peluang terbesar sering ada pada **pertanyaan yang belum terjawab** oleh konten kompetitor.
- Diferensiasi bisa lewat audiens, kedalaman informasi, format, atau kepercayaan.
- Inspirasi berbeda dari penyalinan. Eksekusi, penjelasan, bukti, dan nilai harus orisinal.

## 3. Penjelasan

### 3.1 Apa itu riset kompetitor

Riset kompetitor adalah proses mempelajari akun atau pihak lain yang menargetkan audiens serupa, membahas masalah serupa, atau mempromosikan produk yang sama.

Tujuannya bukan menyalin strategi mereka. Tujuannya memahami:

- Apa yang sudah dilakukan kompetitor.
- Jenis konten apa yang mereka pakai.
- Bagaimana mereka menjelaskan manfaat produk.
- Apa yang membuat audiens tertarik.
- Pertanyaan apa yang belum terjawab.
- Bagaimana kamu bisa memberi nilai yang berbeda.

Dalam Shopee Affiliate, riset kompetitor membantumu menghindari konten yang hanya mengulang informasi yang sudah banyak tersedia.

> **Prinsip utama:** Pelajari pola yang berhasil, cari kekurangannya, lalu buat pendekatan orisinal yang lebih relevan bagi audiensmu.

### 3.2 Kompetitor langsung dan tidak langsung

**A. Kompetitor langsung** — akun yang menargetkan audiens serupa dan menawarkan solusi atau produk yang sama. Contoh: kamu membuat akun perlengkapan meja kerja dan mempromosikan stand laptop. Akun lain yang juga membahas stand laptop untuk pelajar dan pekerja adalah kompetitor langsung.

**B. Kompetitor tidak langsung** — menawarkan solusi berbeda untuk masalah yang sama. Contoh: kamu mempromosikan organizer meja untuk mengatasi meja berantakan. Kompetitor tidak langsung mungkin mempromosikan kotak penyimpanan, rak meja, laci tambahan, atau pengatur kabel. Produknya berbeda, tetapi audiensnya bisa punya kebutuhan yang sama.

### 3.3 Menganalisis positioning kompetitor

Positioning kompetitor adalah cara mereka membangun identitas dan membedakan akun dari akun lain. Perhatikan apakah mereka dikenal sebagai:

- Akun rekomendasi produk murah.
- Akun review produk secara mendalam.
- Akun perbandingan beberapa produk.
- Akun demonstrasi penggunaan.
- Akun tips dan tutorial.
- Akun yang fokus pada kategori produk tertentu.

**Contoh analisis (tiga akun membahas perlengkapan meja kerja):**

| Akun | Positioning yang terlihat | Peluang diferensiasi |
| --- | --- | --- |
| Akun A | Rekomendasi produk murah | Bandingkan nilai guna dan kekurangan |
| Akun B | Demonstrasi produk | Tambahkan panduan memilih berdasarkan kebutuhan |
| Akun C | Kompilasi produk populer | Berikan perbandingan yang lebih mendalam |

> **Tabel ini hanya ilustrasi.** Simpulkan positioning dari pola konten yang benar-benar kamu amati, bukan dari satu video.

**Pertanyaan analisis:**

- Siapa audiens utama mereka?
- Masalah apa yang paling sering dibahas?
- Apa janji atau manfaat utama akun itu?
- Apakah mereka fokus pada harga, kualitas, kemudahan, atau estetika?
- Apakah pendekatannya konsisten?
- Apa yang bisa kamu tawarkan secara berbeda?

### 3.4 Format konten

Format konten adalah bentuk penyajian informasi untuk menarik perhatian dan menjelaskan manfaat produk. Ada delapan format yang sering terlihat pada kompetitor.

| Format | Fungsi | Contoh |
| --- | --- | --- |
| Demonstrasi | Memperlihatkan cara kerja produk | Menunjukkan cara memakai pengatur kabel |
| Review | Membahas kelebihan dan kekurangan | Review bahan dan ukuran organizer |
| Perbandingan | Membantu memilih alternatif | Organizer kecil vs besar |
| Tutorial | Mengajarkan sesuatu | Cara menata meja kerja |
| Daftar rekomendasi | Menyajikan beberapa pilihan | Tiga jenis lampu meja |
| Pemecahan masalah | Menjawab masalah spesifik | Cara mengatasi meja sempit |
| FAQ | Menjawab pertanyaan pembeli | Apakah stand laptop bisa dilipat? |
| Kesalahan umum | Mencegah pembelian yang salah | Kesalahan memilih ukuran organizer |

Delapan format ini adalah hal yang kamu amati di akun kompetitor. Di Modul 09, format-format tersebut dikelompokkan menjadi 6 jenis konten affiliate untuk merancang kontenmu sendiri.

**Cara mengevaluasi format** — periksa apakah konten: menyampaikan masalah dengan jelas, memberi informasi yang relevan, memperlihatkan bukti atau demonstrasi, menjawab kebutuhan audiens, menyebut keterbatasan jika perlu, dan punya CTA yang sesuai tujuan konten.

> Jangan menyimpulkan satu format pasti paling efektif untuk semua produk. Uji efektivitasnya berdasarkan audiens dan hasil aktual.

### 3.5 Hook kompetitor

Hook adalah bagian pembuka konten untuk menarik perhatian audiens. Di video pendek, hook muncul di detik-detik awal. Di artikel, hook berupa judul dan paragraf pembuka.

Contoh pola hook:

- **Masalah:** "Meja kecil tetapi barang terus menumpuk?"
- **Kesalahan:** "Jangan memilih organizer sebelum memeriksa ukuran ini."
- **Perbandingan:** "Organizer murah atau yang lebih besar, mana yang sesuai?"
- **Pertanyaan:** "Apakah stand laptop ini cocok untuk meja sempit?"
- **Demonstrasi:** Menampilkan perubahan kondisi meja sebelum dan sesudah ditata.
- **Panduan:** "Tiga hal yang perlu diperiksa sebelum membeli stand laptop."

> Contoh ini pola yang bisa kamu kembangkan sendiri, bukan naskah untuk disalin dari kompetitor.
>
> Hook yang menarik tapi tidak sesuai isi konten merusak kepercayaan audiens. Jangan memakai klaim seperti "produk terbaik" atau "pasti berhasil" tanpa bukti.

### 3.6 Cara kompetitor menjawab keberatan

Calon pembeli sering punya pertanyaan sebelum membeli. Konten kompetitor menunjukkan keberatan yang sering muncul dan cara mereka menjawabnya.

Contoh keberatan: harga terlalu mahal; tidak yakin kualitasnya; ukuran tidak sesuai; tidak tahu cara memakainya; khawatir produk tidak awet; bingung memilih variasi.

| Keberatan | Pendekatan konten | Peluang perbaikan |
| --- | --- | --- |
| Harga terlalu mahal | Membandingkan harga | Bandingkan juga fungsi dan kualitas |
| Ukuran tidak sesuai | Menampilkan ukuran produk | Tunjukkan cara mengukur ruang yang tersedia |
| Takut produk tidak stabil | Menampilkan produk saat dipakai | Jelaskan kondisi dan batas demonstrasi |
| Bingung memilih variasi | Menampilkan pilihan produk | Buat panduan memilih berdasarkan kebutuhan |

> Tujuannya bukan mengklaim kontenmu lebih baik tanpa bukti. Tujuannya menemukan informasi yang bisa kamu tambahkan agar keputusan pembeli lebih terarah.

### 3.7 Menganalisis CTA

CTA (call to action) adalah ajakan kepada audiens untuk melakukan tindakan berikutnya.

Contoh CTA:

- Lihat detail ukuran produk.
- Bandingkan spesifikasi sebelum membeli.
- Periksa variasi yang sesuai kebutuhanmu.
- Cek harga dan ketersediaan lewat link.
- Simpan panduan ini untuk referensi.

CTA sebaiknya sesuai tahap perjalanan pembeli. Konten edukasi bisa mengajak audiens menyimpan panduan. Konten perbandingan produk bisa mengarahkan mereka memeriksa detail produk lewat affiliate link.

**Cara mengevaluasi CTA kompetitor:**

- Apakah CTA jelas?
- Apakah sesuai dengan isi konten?
- Apakah menjelaskan tindakan berikutnya?
- Apakah ada alasan relevan untuk melakukan tindakan itu?
- Apakah ajakannya jujur dan tidak menyesatkan?

> **Hindari CTA dengan urgensi palsu, seperti menyatakan stok hampir habis tanpa bukti. Jika memakai affiliate link, ungkapkan hubungan affiliate secara jelas sesuai ketentuan program dan platform.**

### 3.8 Pertanyaan yang belum terjawab

Salah satu peluang terbesar dalam riset kompetitor adalah menemukan pertanyaan yang belum dijawab dengan baik.

Misalnya, banyak video organizer meja membahas desain dan harga, tetapi jarang menjelaskan:

- Cara memilih ukuran berdasarkan luas meja.
- Perbedaan bahan plastik dan logam.
- Kapasitas produk yang sebenarnya.
- Cara memastikan ukuran sebelum membeli.
- Kapan organizer tidak diperlukan.
- Kekurangan setiap jenis organizer.

> Tidak semua pertanyaan yang belum terjawab adalah peluang bisnis. Pastikan pertanyaan itu relevan dengan kebutuhan audiens dan produk yang bisa kamu promosikan.

### 3.9 Empat pendekatan diferensiasi

**A. Berdasarkan audiens** — kompetitor membahas perlengkapan meja kerja secara umum. Kamu fokus pada perlengkapan meja untuk kamar kos yang sempit.

**B. Berdasarkan kedalaman informasi** — kompetitor hanya menyebut fitur. Kamu menjelaskan arti fitur itu, manfaatnya, dan keterbatasannya.

**C. Berdasarkan format** — kompetitor membuat video rekomendasi. Kamu membuat tutorial, perbandingan, atau demonstrasi ukuran.

**D. Berdasarkan kepercayaan** — kompetitor hanya menampilkan kelebihan. Kamu menjelaskan siapa yang cocok memakai produk, siapa yang mungkin tidak membutuhkannya, dan hal yang harus diperiksa sebelum membeli.

### 3.10 Inspirasi versus penyalinan

Mempelajari kompetitor adalah bagian dari riset. Tapi menyalin video, naskah, atau karya mereka bukan strategi jangka panjang yang baik.

**Inspirasi yang bisa dikembangkan:**

- Mempelajari struktur video.
- Mengamati jenis masalah yang dibahas.
- Mengidentifikasi pertanyaan audiens.
- Mempelajari cara menjelaskan fitur.
- Memakai prinsip hook untuk membuat pembukaan sendiri.
- Mengembangkan format yang sesuai dengan gaya dan kemampuanmu.

**Praktik yang harus dihindari:**

- Mengunduh dan mengunggah ulang video orang lain tanpa izin.
- Menyalin naskah dengan perubahan kata yang sangat sedikit.
- Memakai foto atau materi kreatif tanpa hak yang sesuai.
- Mengaku melakukan pengujian yang tidak pernah dilakukan.
- Membuat testimoni atau pengalaman pengguna palsu.
- Menyalin klaim produk tanpa memeriksa kebenarannya.

**Contoh:** kompetitor membuat video tentang tiga cara merapikan kabel. Kamu bisa membuat konten sendiri tentang tiga kesalahan memilih pengatur kabel, dengan contoh, penjelasan, dan materi visual buatanmu sendiri.

> Topiknya boleh berhubungan. Eksekusi, penjelasan, bukti, dan nilai yang kamu berikan harus orisinal.

### 3.11 SWOT kompetitor

Pakai analisis SWOT sederhana untuk memahami posisi kompetitor. SWOT terdiri dari **Strengths** (kekuatan), **Weaknesses** (kelemahan), **Opportunities** (peluang), dan **Threats** (ancaman).

| Elemen | Contoh analisis |
| --- | --- |
| Strengths | Konten demonstrasi konsisten dan mudah dipahami |
| Weaknesses | Informasi ukuran produk kurang lengkap |
| Opportunities | Membuat panduan pengukuran sebelum membeli |
| Threats | Banyak akun lain membahas produk serupa |

> **Ini contoh ilustratif.** Dalam riset nyata, catat bukti untuk setiap kesimpulan.
>
> Jangan menyimpulkan kompetitor lemah hanya karena kamu tidak suka gaya kontennya. Ukur kelemahan dari kebutuhan audiens yang belum terpenuhi.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Riset kompetitor | Proses mempelajari akun atau pihak lain yang menargetkan audiens serupa, membahas masalah serupa, atau mempromosikan produk yang sama |
| Kompetitor langsung | Akun yang menargetkan audiens serupa dan menawarkan solusi atau produk yang sama |
| Kompetitor tidak langsung | Pihak yang menawarkan solusi berbeda untuk masalah yang sama |
| Positioning kompetitor | Cara mereka membangun identitas dan membedakan akun dari akun lain |
| Format konten | Bentuk penyajian informasi untuk menarik perhatian dan menjelaskan manfaat produk |
| Hook | Bagian pembuka konten untuk menarik perhatian audiens |
| CTA (call to action) | Ajakan kepada audiens untuk melakukan tindakan berikutnya |
| SWOT | Strengths (kekuatan), Weaknesses (kelemahan), Opportunities (peluang), Threats (ancaman) |

## 5. Langkah Praktik

### 5.1 Cara menemukan kompetitor

1. Cari kata kunci yang berhubungan dengan niche.
2. Temukan akun yang sering membahas produk atau masalah itu.
3. Periksa beberapa konten dari setiap akun.
4. Amati siapa audiens yang tampaknya ditargetkan.
5. Catat jenis produk, format konten, dan pendekatan yang dipakai.
6. Pilih akun yang benar-benar relevan untuk dianalisis.

> Jangan memilih kompetitor hanya karena pengikutnya banyak. Akun kecil dengan audiens yang sangat relevan bisa memberi pelajaran yang lebih berguna.

### 5.2 Cara menganalisis hook

Catat:

1. Kalimat pembuka.
2. Masalah atau keinginan yang disasar.
3. Informasi yang dijanjikan.
4. Bukti yang dipakai untuk mendukung janji itu.
5. Kesesuaian isi video dengan hook.
6. Respons audiens jika tersedia.

### 5.3 Metode mencari celah konten

1. Pilih 5–10 akun yang relevan.
2. Analisis beberapa konten dari setiap akun.
3. Baca komentar dan pertanyaan audiens.
4. Catat pertanyaan yang belum terjawab atau dijawab kurang jelas.
5. Validasi apakah pertanyaan itu juga muncul di ulasan produk atau sumber lain.
6. Buat konten yang menjawab pertanyaan dengan bukti dan penjelasan yang memadai.

## 6. Contoh dan Perhitungan

Modul ini isinya template kerja, bukan rumus. Kamu memakainya untuk mencatat hasil analisis kompetitor, celah konten, dan pendekatan kontenmu.

### 6.1 Template strategi diferensiasi

- Niche:
- Audiens:
- Kompetitor utama:
- Pendekatan kompetitor:
- Pertanyaan yang belum terjawab:
- Kebutuhan audiens yang belum terpenuhi:
- Pendekatan konten saya:
- Bukti yang akan saya gunakan:
- Alasan audiens mungkin memilih konten saya:

### 6.2 Template Tugas 1 — analisis akun kompetitor

| Aspek | Catatan |
| --- | --- |
| Nama atau identitas akun |  |
| Niche |  |
| Audiens utama |  |
| Positioning |  |
| Produk yang dibahas |  |
| Format konten |  |
| Pola hook |  |
| Cara menjelaskan manfaat |  |
| Cara menjawab keberatan |  |
| CTA |  |
| Kekuatan |  |
| Kelemahan yang teramati |  |
| Peluang diferensiasi |  |

> Catat sumber dan tanggal pengamatan. Jika metrik tertentu tidak tersedia, tulis "tidak diketahui".

### 6.3 Template Tugas 2 — 10 celah konten

| No. | Pertanyaan atau kebutuhan | Bukti | Ide konten | Produk relevan |
| --- | --- | --- | --- | --- |
| 1 | Bagaimana memilih ukuran organizer? |  |  |  |
| 2 | Apakah bahan tertentu lebih kokoh? |  |  |  |
| 3 | Bagaimana mengukur ruang sebelum membeli? |  |  |  |
| 4 | Apa perbedaan organizer kecil dan besar? |  |  |  |
| 5 | Bagaimana merapikan kabel di meja? |  |  |  |
| 6 | Kapan stand laptop dibutuhkan? |  |  |  |
| 7 | Bagaimana memeriksa spesifikasi produk? |  |  |  |
| 8 | Apa saja kekurangan organizer tertentu? |  |  |  |
| 9 | Bagaimana membandingkan produk berdasarkan anggaran? |  |  |  |
| 10 | Kapan produk tidak cocok digunakan? |  |  |  |

> Daftar ini contoh awal. Validasi setiap topik sebelum memprioritaskannya.

### 6.4 Template Tugas 3 — tiga pendekatan konten

**Konsep 1 — Pemecahan masalah**

- Masalah utama:
- Hook:
- Penjelasan:
- Bukti atau demonstrasi:
- CTA:

**Konsep 2 — Perbandingan**

- Dua atau lebih alternatif:
- Kriteria perbandingan:
- Bukti:
- Siapa yang cocok memilih setiap alternatif:
- CTA:

**Konsep 3 — Menjawab keberatan**

- Keberatan calon pembeli:
- Informasi yang diperlukan:
- Bukti yang tersedia:
- Penjelasan:
- CTA:

> Pastikan ketiga konsep punya pendekatan berbeda, bukan hanya mengganti kalimat pembuka.

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Menyalin strategi, video, atau naskah kompetitor | Pelajari polanya, lalu buat eksekusi sendiri |
| Memilih kompetitor hanya karena pengikutnya banyak | Pilih akun yang relevan dengan niche dan audiensmu |
| Menyimpulkan positioning dari satu video | Amati beberapa konten dari akun yang sama |
| Menyimpulkan satu format pasti paling efektif | Uji format sesuai audiens dan hasil aktual |
| Membuat hook menarik yang tidak sesuai isi | Pastikan isi konten memenuhi janji hook |
| Memakai klaim "produk terbaik" atau "pasti berhasil" tanpa bukti | Pakai klaim yang bisa kamu buktikan |
| Mengklaim kontenmu lebih baik tanpa bukti | Fokus pada informasi tambahan yang berguna bagi pembeli |
| Membuat CTA dengan urgensi palsu | Jangan menyebut stok hampir habis tanpa bukti |
| Tidak mengungkapkan hubungan affiliate saat memakai affiliate link | Ungkapkan secara jelas sesuai ketentuan program dan platform |
| Menganggap semua pertanyaan yang belum dijawab adalah peluang bisnis | Pastikan relevan dengan audiens dan produk yang bisa kamu promosikan |
| Mengunggah ulang video orang lain, menyalin naskah, atau memakai materi tanpa hak | Buat naskah dan materi visual sendiri |
| Mengaku melakukan pengujian yang tidak pernah dilakukan, atau membuat testimoni palsu | Hanya sampaikan pengalaman yang benar-benar kamu alami |
| Menyalin klaim produk tanpa memeriksa kebenarannya | Verifikasi klaim dari sumber resmi atau spesifikasi produk |
| Menyimpulkan kompetitor lemah hanya karena tidak suka gayanya | Ukur kelemahan dari kebutuhan audiens yang belum terpenuhi |

## 8. Tugas dan Checklist

**Tugas 1 — Analisis 5–10 akun kompetitor.** Pilih akun yang relevan dengan niche dan audiensmu. Pakai tabel di bagian 6.2.

**Tugas 2 — Temukan 10 celah konten.** Buat daftar pertanyaan yang belum terjawab atau kebutuhan yang belum dipenuhi dengan baik. Pakai tabel di bagian 6.3.

**Tugas 3 — Buat tiga pendekatan konten yang berbeda.** Pilih satu produk dan buat tiga konsep konten sesuai kerangka di bagian 6.4.

Checklist akhir:

- [ ]  Aku bisa membedakan kompetitor langsung dan tidak langsung.
- [ ]  Aku menganalisis 5–10 akun yang relevan.
- [ ]  Aku memahami positioning kompetitor.
- [ ]  Aku menganalisis format konten, hook, dan CTA.
- [ ]  Aku mengidentifikasi pertanyaan yang belum terjawab.
- [ ]  Aku menemukan minimal 10 celah konten.
- [ ]  Aku membuat tiga pendekatan konten yang berbeda.
- [ ]  Aku bisa menjelaskan diferensiasi akunku sendiri.
- [ ]  Aku tidak menyalin karya atau membuat klaim yang tidak terbukti.

## 9. Latihan dan Kunci Jawaban

**1. Apa perbedaan kompetitor langsung dan tidak langsung? Beri contoh.**
Kompetitor langsung menargetkan audiens serupa dan menawarkan solusi atau produk yang sama (contoh: akun lain yang juga membahas stand laptop untuk pelajar dan pekerja). Kompetitor tidak langsung menawarkan solusi berbeda untuk masalah yang sama (contoh: kamu mempromosikan organizer meja, mereka mempromosikan kotak penyimpanan, rak meja, laci tambahan, atau pengatur kabel).

**2. Sebutkan delapan format konten beserta fungsinya.**
Demonstrasi (memperlihatkan cara kerja produk), review (membahas kelebihan dan kekurangan), perbandingan (membantu memilih alternatif), tutorial (mengajarkan sesuatu), daftar rekomendasi (menyajikan beberapa pilihan), pemecahan masalah (menjawab masalah spesifik), FAQ (menjawab pertanyaan pembeli), kesalahan umum (mencegah pembelian yang salah).

**3. Sebutkan enam pola hook.**
Masalah, kesalahan, perbandingan, pertanyaan, demonstrasi, dan panduan.

**4. Sebutkan enam langkah metode mencari celah konten.**
Pilih 5–10 akun relevan → analisis beberapa konten tiap akun → baca komentar dan pertanyaan audiens → catat pertanyaan yang belum atau kurang jelas terjawab → validasi apakah pertanyaan itu juga muncul di ulasan produk atau sumber lain → buat konten yang menjawab dengan bukti dan penjelasan memadai.

**5. Sebutkan empat pendekatan diferensiasi.**
Berdasarkan audiens, kedalaman informasi, format, dan kepercayaan.

**6. Apa batas antara inspirasi dan penyalinan?**
Topik boleh berhubungan, tetapi eksekusi, penjelasan, bukti, dan nilai yang kamu berikan harus orisinal. Mengunggah ulang video, menyalin naskah dengan perubahan minim, memakai materi kreatif tanpa hak, mengaku menguji yang tidak diuji, membuat testimoni palsu, dan menyalin klaim produk tanpa verifikasi harus dihindari.

**7. Apa yang harus dihindari dalam membuat CTA?**
Urgensi palsu, seperti menyatakan stok hampir habis tanpa bukti. Selain itu, ungkapkan hubungan affiliate secara jelas sesuai ketentuan program dan platform.

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika kamu sudah menganalisis 5–10 akun kompetitor, menemukan minimal 10 celah konten, menyusun tiga pendekatan konten yang berbeda, dan bisa menjelaskan diferensiasi akunmu tanpa menyalin karya atau membuat klaim yang tidak terbukti.
', 'Modul 07', 15, false, 11, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l12', 'm03', 'Modul 08 — Strategi Channel dan Traffic Organik', 'modul-08-strategi-channel-dan-traffic-organik', '# Modul 08 — Strategi Channel dan Traffic Organik

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Menjelaskan cara kerja traffic organik.
- Membedakan jangkauan, impresi, views, dan klik.
- Memilih channel berdasarkan audiens, produk, kemampuan, dan data.
- Menjelaskan karakteristik Shopee Video, TikTok, Instagram Reels, YouTube Shorts, dan website SEO.
- Membuat rencana distribusi konten.
- Mengurangi ketergantungan pada satu platform.
- Memeriksa aturan link dan promosi sebelum publikasi.

---

## 2. Ringkasan Konsep Utama

1. Traffic organik adalah pengunjung atau penonton yang datang **tanpa kamu membayar iklan** untuk distribusi konten. Tetap ada biaya waktu, tenaga, kemampuan, dan biaya kesempatan. Jadi traffic organik tidak gratis sepenuhnya.
2. Traffic organik berjalan sebagai **rantai traffic** 5 tahap: publikasi → ditemukan → ditonton → klik produk → pembelian dan komisi. Rantai ini berbeda dari funnel 6 tahap yang dipakai untuk analisis performa di modul lain.
3. Setiap tahap rantai bisa menjadi sumber masalah. Diagnosis harus berbasis metrik, bukan menyalahkan algoritma.
4. Jangkauan, impresi, views, dan klik adalah empat metrik berbeda. Definisinya bisa berbeda antarplatform, jadi angkanya tidak harus sama.
5. Pilih channel dengan empat pertimbangan: kecocokan audiens, produk, kemampuan, dan model monetisasi. Popularitas platform bukan alasan.
6. Tidak ada satu channel yang selalu terbaik. Jangan langsung menjalankan lima channel sekaligus.
7. Distribusi bukan memublikasikan konten identik di semua platform. Sesuaikan format tiap platform.
8. Bergantung pada satu platform adalah risiko. Namun diversifikasi terlalu dini memperlambat pembelajaran. Fokus dulu, perluas setelah prosesmu bisa diulang.
9. Periksa aturan link, promosi, dan pengungkapan affiliate **sebelum** publikasi.

Catatan: daftar resmi kanal yang bisa dipakai ada di Modul 02. Modul ini hanya membahas lima kanal utama untuk pemula: Shopee Video, TikTok, Instagram Reels, YouTube Shorts, dan Website/SEO.

---

## 3. Penjelasan

### 3.1 Cara Kerja Traffic Organik

**Apa itu traffic organik?** Traffic organik adalah pengunjung atau penonton yang datang tanpa kamu membayar iklan untuk mendistribusikan konten.

Traffic organik bisa berasal dari:

- Rekomendasi konten di halaman utama platform.
- Hasil pencarian.
- Halaman profil.
- Video yang dibagikan orang lain.
- Komunitas yang relevan.
- Artikel yang ditemukan lewat mesin pencari.
- Link yang dibagikan secara wajar sesuai aturan platform.

Contoh: kamu membuat video tentang rak penyimpanan meja kerja. Orang yang tertarik menata meja menontonnya. Sebagian membuka profilmu, beberapa mengeklik link produk, dan sebagian membeli. Kamu tidak membayar iklan untuk distribusi itu. Itulah traffic organik.

**Rantai traffic (5 tahap):**

1. **Konten dipublikasikan.** Video, gambar, atau artikel menjawab kebutuhan tertentu.
2. **Konten ditemukan audiens.** Lewat rekomendasi, pencarian, profil, atau distribusi.
3. **Audiens tertarik dan menonton.** Hook, relevansi, dan kualitas konten memengaruhi perhatian.
4. **Audiens mengeklik produk.** CTA yang jelas dan produk yang relevan mendorong klik.
5. **Pembelian dan komisi.** Transaksi harus memenuhi ketentuan atribusi program affiliate (lihat Modul 02).

**Diagnosis per tahap:**

| Gejala | Kemungkinan penyebab |
| --- | --- |
| Konten tidak ditemukan | Masalah distribusi, topik, atau relevansi |
| Konten ditemukan tetapi tidak ditonton | Masalah pada pembukaan atau kemasan konten |
| Banyak yang menonton tetapi sedikit yang mengeklik | Manfaat, CTA, atau kecocokan produk kurang kuat |
| Banyak klik tetapi sedikit transaksi | Harga, kualitas produk, ulasan, ongkir, kepercayaan, atau proses pembelian menjadi hambatan |
| Transaksi tercatat tetapi komisi tidak disetujui | Periksa atribusi dan ketentuan program |

Jangan langsung menyimpulkan bahwa algoritma penyebab semua masalah. Diagnosis berdasarkan metrik lebih berguna daripada menebak.

**Kelebihan traffic organik:**

- Tidak perlu anggaran iklan untuk distribusi.
- Bisa membangun aset konten jangka panjang.
- Memungkinkan uji ide dengan biaya rendah.
- Membantu membangun kepercayaan lewat edukasi dan demonstrasi.

**Kekurangan traffic organik:**

- Jangkauan tidak dapat dipastikan.
- Butuh waktu dan produksi konten yang konsisten.
- Performa bisa berubah karena algoritma dan persaingan.
- Konten yang ramai belum tentu menghasilkan transaksi.
- Akun atau konten bisa dibatasi jika melanggar aturan.

### 3.2 Jangkauan, Impresi, Views, dan Klik

Empat istilah ini sering tertukar, padahal fungsinya berbeda.

| Metrik | Pengertian | Contoh |
| --- | --- | --- |
| Jangkauan (reach) | Jumlah akun unik yang melihat konten, jika metrik tersedia | 1.000 akun |
| Impresi (impressions) | Jumlah kali konten ditampilkan | 1.500 kali |
| Views | Jumlah penayangan menurut definisi platform | 1.200 views |
| Klik (clicks) | Jumlah klik pada link atau elemen yang diukur | 60 klik |

Angka-angka ini tidak harus sama karena cara hitung dan definisinya berbeda. Satu akun bisa melihat konten lebih dari sekali, jadi impresi lebih besar dari jangkauan. Angka di atas hanya ilustrasi, bukan standar performa.

**Metrik tambahan:**

- **CTR (Click-Through Rate):** persentase orang yang melihat sesuatu lalu mengekliknya. Selalu sebut dasar tayangannya.

  ```
  CTR = Klik ÷ Tayangan × 100%
  ```

  Dengan contoh di atas, hasilnya bergantung pada penyebut:

  ```
  CTR terhadap impresi = 60 ÷ 1.500 × 100% = 4%
  CTR terhadap views   = 60 ÷ 1.200 × 100% = 5%
  ```

  Angkanya beda karena penyebutnya beda (1.500 impresi vs 1.200 views), padahal klik-nya sama, yaitu 60. Keduanya benar. Pilih satu dasar dan pakai terus agar hasilnya bisa dibandingkan. Bawaan di materi ini adalah views. Jangan mencampur klik dengan tayangan yang dasar pengukurannya tidak sebanding.

- **Retention:** ukuran seberapa lama penonton bertahan pada video.
- **Conversion rate (CVR):** persentase klik yang menghasilkan pembelian, sesuai definisi laporan program.
- **EPC (Earnings Per Click):** rata-rata komisi per klik.

  ```
  EPC = Komisi ÷ Klik
  ```

  Pastikan periode dan jenis komisinya konsisten. EPC dari komisi estimasi berbeda dari EPC komisi disetujui atau dibayarkan. Utamakan komisi disetujui.

### 3.3 Memilih Channel Utama

Channel adalah platform atau media untuk menjangkau audiens. Contohnya Shopee Video, TikTok, Instagram Reels, YouTube Shorts, serta website dan mesin pencari.

Kesalahan umum adalah memilih channel hanya karena sedang populer. Channel populer belum tentu cocok dengan produk dan kemampuanmu.

**A. Kecocokan audiens.** Tanyakan:

- Di mana calon pembeli mencari informasi?
- Mereka lebih sering menonton demonstrasi atau membaca perbandingan?
- Mereka butuh penjelasan singkat atau panduan panjang?
- Apakah mereka sudah berniat membeli?

**B. Kecocokan produk.** Produk visual seperti alat dapur, organizer, dan aksesori meja mudah didemonstrasikan lewat video. Produk yang butuh banyak pertimbangan, seperti elektronik, sering perlu perbandingan spesifikasi, ulasan mendalam, dan panduan pembelian. Ini bukan aturan mutlak. Produk visual juga bisa butuh penjelasan mendalam, dan produk kompleks bisa laku lewat video singkat jika kebutuhan audiensnya spesifik.

**C. Kecocokan kemampuan.** Tanyakan pada dirimu:

- Nyaman bicara di depan kamera, atau lebih suka voice-over?
- Punya produk fisik untuk didemonstrasikan?
- Mampu menulis artikel?
- Punya waktu untuk riset?
- Bisa mengedit video dengan smartphone?

Jangan memilih format yang terlalu sulit sampai kamu tidak konsisten membuat konten.

**D. Kecocokan model monetisasi.** Periksa apakah channel mendukung cara promosi dan link yang ingin kamu pakai:

- Apakah audiens bisa mengakses link produk?
- Apakah affiliate link diizinkan pada penempatan yang kamu pakai?
- Apakah fitur belanja tersedia untuk akun dan wilayahmu?
- Apakah klik dan transaksi bisa diukur?
- Apakah ada aturan khusus pengungkapan affiliate?

Jangan mengasumsikan semua platform punya fitur, atribusi, dan izin link yang sama.

### 3.4 Memahami Setiap Channel

**A. Shopee Video**

- Fokus: penemuan produk di dalam ekosistem Shopee.
- Cocok untuk menghubungkan demonstrasi produk dengan kebutuhan belanja, terutama jika audiens sudah mencari barang.
- Contoh konten: demonstrasi alat dapur, cara memakai organizer, perbandingan fitur dua produk, tips memilih barang sesuai kebutuhan.
- Periksa: fitur affiliate yang tersedia, syarat akun, penempatan link produk, dan kebijakan konten.
- Risiko: bergantung pada ekosistem, dan jangkauan tidak pasti.

**B. TikTok**

- Fokus: penemuan lewat video pendek, rekomendasi, dan pencarian.
- Cocok untuk menguji banyak hook, demonstrasi, dan problem-solution content.
- Contoh konten: masalah kecil sehari-hari beserta solusinya, demonstrasi sebelum dan sesudah (jika perubahannya nyata), tiga hal yang diperiksa sebelum membeli, perbandingan produk untuk kebutuhan tertentu.
- Risiko: performa berubah, persaingan tinggi, dan tidak semua penonton ingin membeli. Akses fitur belanja atau link juga bergantung pada ketentuan yang berlaku.

**C. Instagram Reels**

- Fokus: penemuan konten visual dan hubungan dengan audiens lewat profil, Stories, dan interaksi.
- Cocok untuk rekomendasi perlengkapan rumah, tips gaya hidup, demonstrasi singkat, dan konten seri dengan identitas visual konsisten.
- Risiko: membangun audiens butuh konsistensi. Jangan menganggap semua penonton Reels bisa langsung diarahkan ke link produk. Pakai jalur yang tersedia dan diizinkan.

**D. YouTube Shorts**

- Fokus: penemuan video pendek di YouTube.
- Cocok untuk tutorial singkat, tips memilih produk, demonstrasi fitur, dan ringkasan perbandingan.
- Shorts juga bisa mendukung konten YouTube yang lebih panjang. Namun link di deskripsi atau komentar Shorts belum tentu bisa diklik. Periksa fitur dan aturan link terbaru.
- Risiko: penonton video pendek belum tentu pindah ke konten panjang atau membeli.

**E. Website dan SEO**

- SEO (Search Engine Optimization) adalah upaya agar halamanmu lebih mudah ditemukan lewat hasil pencarian yang relevan.
- Cocok untuk artikel perbandingan, panduan memilih barang, jawaban atas pertanyaan calon pembeli, dan konten evergreen.
- Contoh topik: "Cara Memilih Kursi Kerja untuk Meja Kecil".
- Risiko: website baru butuh waktu untuk terlihat. Traffic pencarian tidak dijamin, dan website perlu dirawat.

**Channel mana yang terbaik?** Tidak ada satu pun yang selalu terbaik.

- Jika mulai tanpa modal dan memilih video pendek, pilih platform yang cocok dengan produk, kemampuan, dan jalur affiliate yang tersedia. **Jangan langsung menjalankan lima channel sekaligus.**
- Jika kamu lebih unggul menulis dan riset, website SEO bisa lebih cocok. Namun jangan memilih SEO hanya karena berharap traffic datang otomatis.

### 3.5 Kesesuaian Produk dengan Channel

Pakai tabel ini sebagai **titik awal, bukan aturan mutlak**.

| Jenis produk | Format yang dapat diuji | Alasan |
| --- | --- | --- |
| Alat dapur | Video demonstrasi | Fungsi mudah diperlihatkan |
| Organizer rumah | Video sebelum-sesudah yang nyata | Perubahan dapat divisualisasikan |
| Aksesori smartphone | Demonstrasi dan perbandingan | Fitur dapat dibandingkan |
| Elektronik | Review, perbandingan, buying guide | Pembeli sering butuh detail |
| Perlengkapan kerja | Tutorial dan problem-solution | Bisa dikaitkan dengan masalah spesifik |
| Produk yang sering dibandingkan spesifikasinya | Artikel dan video perbandingan | Membantu calon pembeli menilai alternatif |

Satu produk bisa dipromosikan lewat beberapa format, tetapi format harus mengikuti perilaku calon pembeli. Contoh untuk stand laptop:

- Video: cara stand laptop membantu mengatur posisi meja.
- Video lain: perbedaan stand lipat dan stand tetap.
- Artikel: panduan memilih stand laptop.
- Konten tanya-jawab: hal yang diperiksa sebelum membeli.

### 3.6 Distribusi Konten

Distribusi adalah menempatkan konten pada channel yang tepat agar ditemukan audiens. **Distribusi bukan memublikasikan konten identik di semua platform tanpa penyesuaian.**

Contoh: satu demonstrasi organizer bisa menjadi video pendek, artikel tutorial, atau carousel edukasi. Pakai materi yang kamu miliki atau berhak kamu gunakan, dan sesuaikan dengan format tiap platform.

Jangan menganggap mengunggah ulang otomatis diizinkan. Periksa aturan konten duplikat, watermark, musik, hak cipta, dan promosi di tiap platform.

### 3.7 Risiko Bergantung pada Satu Platform

Jika seluruh traffic bergantung pada satu akun, perubahan algoritma, pembatasan akun, atau perubahan kebijakan bisa memukul bisnismu.

Cara mengurangi risiko:

- Bangun identitas konten yang konsisten.
- Simpan naskah, rekaman asli, dan data performa.
- Catat pertanyaan audiens dan topik yang berhasil.
- Pelajari kemungkinan membangun website atau channel pendukung.
- Jangan memindahkan audiens dengan spam.
- Perluas setelah channel utama menunjukkan sinyal yang cukup baik.

Diversifikasi tidak berarti langsung membuka banyak akun. Di tahap awal, fokus pada satu channel mempercepat pembelajaran. Diversifikasi lebih masuk akal setelah kamu punya proses yang bisa diulang.

### 3.8 Aturan Link dan Promosi

Sebelum memublikasikan konten affiliate, periksa:

- Apakah promosi affiliate diizinkan?
- Apakah link boleh ditempatkan di bio, deskripsi, komentar, atau fitur belanja?
- Apakah ada syarat akun atau batasan wilayah?
- Apakah materi produk boleh dipakai?
- Apakah pengungkapan hubungan affiliate diwajibkan?
- Apakah ada aturan soal spam, pengalihan link, atau klaim produk?
- Apakah atribusi transaksi mengikuti ketentuan tertentu? (Lihat Modul 02.)

Jangan memakai komentar massal, pesan pribadi yang tidak diminta, atau link berulang yang mengganggu audiens.

Contoh kalimat pengungkapan:

> "Link ini adalah affiliate link. Saya dapat menerima komisi jika kamu membeli lewat link ini dan transaksinya memenuhi ketentuan program."

Sesuaikan penempatan dan bentuk pengungkapan dengan aturan program dan platform.

---

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Traffic organik | Pengunjung atau penonton yang datang tanpa kamu membayar iklan untuk distribusi konten |
| Rantai traffic | Lima tahap traffic organik: publikasi, ditemukan, ditonton, klik produk, pembelian dan komisi |
| Jangkauan (reach) | Jumlah akun unik yang melihat konten, jika metrik tersedia |
| Impresi (impressions) | Jumlah kali konten ditampilkan |
| Views | Jumlah penayangan menurut definisi platform |
| Klik (clicks) | Jumlah klik pada link atau elemen yang diukur |
| CTR (Click-Through Rate) | Klik ÷ Tayangan × 100%; selalu sebut dasarnya (views atau impresi) |
| Retention | Ukuran seberapa lama penonton bertahan pada video |
| Conversion rate (CVR) | Pesanan ÷ Klik × 100% |
| EPC (Earnings Per Click) | Komisi ÷ Klik; sebut jenis komisinya |
| Channel | Platform atau media untuk menjangkau audiens |
| SEO | Upaya agar halaman lebih mudah ditemukan lewat hasil pencarian yang relevan |
| Distribusi | Menempatkan konten pada channel yang tepat agar ditemukan audiens |
| Baseline | Data awal yang dipakai sebagai pembanding |

---

## 5. Langkah Praktik

**Langkah distribusi konten (6 langkah):**

1. Buat satu konten inti yang punya manfaat jelas.
2. Tentukan channel utama.
3. Sesuaikan format, pembukaan, teks layar, deskripsi, dan CTA.
4. Pastikan link dan promosi sesuai aturan tiap platform.
5. Catat performa per channel.
6. Ulangi pendekatan yang menghasilkan indikator berkualitas.

**Syarat ekspansi ke channel tambahan.** Pertimbangkan ekspansi jika:

- Kamu sudah bisa memproduksi konten utama secara konsisten.
- Kamu tahu format yang berpotensi menghasilkan klik berkualitas.
- Kamu sudah memeriksa bahwa transaksi dan komisi bisa dilacak.
- Ada alasan jelas untuk menjangkau audiens tambahan.
- Channel tambahan tidak menurunkan kualitas channel utama.

---

## 6. Contoh dan Perhitungan

Semua angka di bagian ini adalah simulasi, bukan standar performa dan bukan tarif resmi Shopee.

**Ilustrasi metrik satu konten:**

| Tahap | Angka |
| --- | --- |
| Jangkauan | 1.000 akun |
| Impresi | 1.500 impresi |
| Views | 1.200 views |
| Klik link produk | 60 klik |

**CTR dari data yang sama:**

```
CTR terhadap impresi = 60 ÷ 1.500 × 100% = 4%
CTR terhadap views   = 60 ÷ 1.200 × 100% = 5%
```

Penyebutnya berbeda, jadi hasilnya berbeda. Sebut dasar yang kamu pakai.

**EPC:**

```
EPC = Komisi ÷ Klik
```

Contoh: jika 60 klik menghasilkan komisi disetujui Rp30.000, maka EPC = Rp30.000 ÷ 60 = Rp500 per klik.

**Tabel baseline performa 14 hari (untuk Tugas 4):**

| Tanggal | Konten | Views | Klik | Transaksi | Komisi |
| --- | --- | --- | --- | --- | --- |
| Hari 1 | Konten A | Isi data | Isi data | Isi data | Isi data |
| Hari 2 | Konten B | Isi data | Isi data | Isi data | Isi data |
| Hari 3 | Konten C | Isi data | Isi data | Isi data | Isi data |

Lanjutkan sampai hari ke-14. Jika suatu metrik tidak tersedia, tulis "tidak tersedia". **Jangan mengarang angka**, dan jangan menyimpulkan tidak ada transaksi hanya karena laporan belum diperbarui.

---

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Menganggap traffic organik gratis sepenuhnya | Ingat biaya waktu, tenaga, kemampuan, dan biaya kesempatan |
| Menyalahkan algoritma untuk semua masalah | Diagnosis berdasarkan metrik di tiap tahap rantai traffic |
| Mencampur klik dengan tayangan yang dasarnya tidak sebanding | Pilih satu penyebut (views atau impresi) dan sebut dasarnya |
| Memilih channel karena sedang populer | Pakai empat pertimbangan: audiens, produk, kemampuan, model monetisasi |
| Menjalankan lima channel sekaligus di awal | Fokus satu channel utama; perluas setelah proses bisa diulang |
| Memilih format yang terlalu sulit | Pilih format yang bisa kamu produksi secara konsisten |
| Mengasumsikan semua platform sama soal fitur, atribusi, dan izin link | Periksa aturan tiap platform |
| Mengunggah ulang konten identik ke semua platform | Sesuaikan format; periksa aturan konten duplikat, watermark, musik, hak cipta |
| Memindahkan audiens dengan spam, komentar massal, atau DM yang tidak diminta | Dilarang; pakai jalur yang diizinkan |
| Mengarang angka di laporan baseline | Tulis "tidak tersedia" jika metrik belum ada |
| Berharap SEO mendatangkan traffic otomatis | Website baru butuh waktu dan perawatan; traffic tidak dijamin |

---

## 8. Tugas dan Checklist

**Tugas 1 — Pilih satu channel utama**

- [ ] Saya sudah menentukan audiens utama.
- [ ] Saya memahami masalah yang ingin diselesaikan audiens.
- [ ] Saya sudah memilih kategori produk.
- [ ] Saya tahu format konten yang mampu saya produksi.
- [ ] Saya sudah memeriksa aturan promosi dan link.
- [ ] Saya punya waktu untuk membuat konten secara konsisten.
- [ ] Saya tahu metrik yang akan dipantau.

**Tugas 2 — Tuliskan alasan pemilihan.** Isi:

- Channel utama:
- Audiens:
- Kategori produk:
- Masalah audiens:
- Alasan memilih channel:
- Format konten:
- Cara mengarahkan audiens ke produk:
- Risiko utama:
- Cara mengukur hasil:

**Tugas 3 — Buat rencana distribusi**

- [ ] Tentukan channel utama.
- [ ] Publikasikan konten sesuai jadwal yang realistis.
- [ ] Sesuaikan format jika mendistribusikan konten ke channel lain.
- [ ] Catat klik dan transaksi.
- [ ] Evaluasi setelah data cukup.
- [ ] Hindari ekspansi sebelum memahami hasil awal.

**Tugas 4 — Catat baseline 14 hari.** Isi tabel baseline di bagian 6 setiap hari selama 14 hari.

---

## 9. Latihan dan Kunci Jawaban

**1. Apa beda jangkauan dan impresi?**
Jangkauan = jumlah akun unik yang melihat konten (jika metrik tersedia). Impresi = jumlah kali konten ditampilkan. Satu akun bisa menghasilkan lebih dari satu impresi, jadi angkanya tidak harus sama.

**2. Banyak views tetapi sedikit klik link. Apa dugaan penyebabnya?**
Manfaat, CTA, atau kecocokan produk kurang kuat.

**3. Transaksi tercatat tetapi komisi tidak disetujui. Apa yang diperiksa?**
Atribusi dan ketentuan program.

**4. Sebutkan empat pertimbangan memilih channel.**
Kecocokan audiens, produk, kemampuan, dan model monetisasi.

**5. Mengapa fokus satu channel disarankan di tahap awal?**
Fokus pada satu channel mempercepat pembelajaran. Diversifikasi lebih masuk akal setelah kamu punya proses yang bisa diulang.

**6. Sebuah konten punya 1.500 impresi, 1.200 views, dan 60 klik. Hitung CTR terhadap impresi dan terhadap views. Mengapa hasilnya beda?**
CTR terhadap impresi = 60 ÷ 1.500 × 100% = 4%. CTR terhadap views = 60 ÷ 1.200 × 100% = 5%. Hasilnya beda karena penyebutnya beda, sedangkan klik-nya sama.

---

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika kamu bisa memilih satu channel berdasarkan kebutuhan audiens, kecocokan produk, kemampuan produksi, aturan promosi, dan data performa, bukan hanya popularitas platform.
', 'Modul 08', 15, false, 12, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l13', 'm03', 'Modul 09 — Strategi Konten', 'modul-09-strategi-konten', '# Modul 09 — Strategi Konten

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Menentukan pilar konten yang sesuai kebutuhan audiens.
- Mengembangkan satu topik menjadi banyak sudut pandang.
- Membuat konten edukasi, demonstrasi, review, perbandingan, dan buying guide.
- Menjelaskan empat tahap pembelian calon pelanggan.
- Menyusun kalender konten 30 hari.
- Memakai ulang materi secara tepat dan diizinkan.
- Menghasilkan ide konten tanpa bergantung pada tren viral.

---

## 2. Ringkasan Konsep Utama

1. Strategi konten adalah rencana tentang **konten apa yang dibuat, untuk siapa, dengan tujuan apa, dan bagaimana hasilnya diukur**.
2. **Content pillar** adalah kelompok besar topik yang menjadi dasar konten sebuah akun. Modul ini memberi enam pilar contoh untuk kategori perlengkapan kerja.
3. **Content angle** adalah sudut pandang spesifik untuk satu topik. Satu produk bisa menghasilkan banyak angle tanpa mencari produk baru.
4. **Problem-solution content** dimulai dari masalah audiens, bukan dari produk.
5. Ada enam jenis konten affiliate: demonstrasi, edukasi, review, perbandingan, buying guide, dan jawaban keberatan. Keenamnya adalah pengelompokan dari 8 format yang kamu amati pada kompetitor di Modul 07. Format menjawab "bentuk kontennya apa", sedangkan jenis menjawab "fungsinya apa".
6. Sesuaikan konten dengan empat tahap pembelian: Awareness, Consideration, Evaluation, Conversion.
7. Content calendar bukan hanya tanggal dan judul. Ia memuat pilar, audiens, masalah, format, CTA, status produksi, dan metrik evaluasi.
8. **Repurposing** boleh dengan tiga syarat: punya hak penggunaan, disesuaikan dengan platform, dan bukan menyalin kreator lain.
9. Tidak semua konten harus berakhir dengan ajakan membeli. Kejujuran meningkatkan kepercayaan jangka panjang.

---

## 3. Penjelasan

### 3.1 Apa Itu Strategi Konten?

Strategi konten adalah rencana tentang konten apa yang dibuat, untuk siapa, dengan tujuan apa, dan bagaimana hasilnya diukur. Tanpa strategi, kamu bisa mengunggah video setiap hari tetapi tidak punya arah.

Contoh pembanding (kategori perlengkapan meja kerja):

- **Konten tanpa strategi:** video produk dengan tulisan "Wajib punya!"
- **Konten dengan strategi:** membahas
    - Masalah meja kerja yang terlalu sempit.
    - Cara memilih stand laptop.
    - Perbedaan stand laptop lipat dan tetap.
    - Kesalahan saat membeli lampu meja.
    - Perbandingan dua produk berdasarkan spesifikasi.
    - Hal yang diperiksa sebelum membeli.

Setiap konten punya fungsi berbeda dalam membantu calon pembeli.

### 3.2 Content Pillar

Content pillar adalah kelompok besar topik yang menjadi dasar konten sebuah akun. Pilar menjaga arah pembahasan dan mengurangi kebingungan mencari ide tiap hari.

**Enam content pillar contoh:**

| Pilar | Isi | Contoh judul |
| --- | --- | --- |
| Pilar 1 — Masalah dan solusi | Membahas masalah sehari-hari yang relevan dengan produk | "Meja kerja terasa sempit? Periksa tiga penyebab ini sebelum membeli organizer." |
| Pilar 2 — Demonstrasi produk | Memperlihatkan cara kerja, fitur, ukuran, atau cara penggunaan | "Begini cara mengatur tinggi stand laptop yang dapat disesuaikan." |
| Pilar 3 — Perbandingan | Membantu audiens memahami perbedaan beberapa pilihan | "Stand laptop lipat vs. stand tetap: apa yang perlu dipertimbangkan?" |
| Pilar 4 — Edukasi pembelian | Mengajarkan cara menilai produk sebelum membeli | "Empat hal yang perlu diperiksa sebelum membeli lampu meja." |
| Pilar 5 — Inspirasi dan penggunaan | Menunjukkan contoh pengaturan ruang, rutinitas, atau penggunaan produk | "Ide menata meja kerja kecil tanpa menambahkan banyak barang." |
| Pilar 6 — Keberatan dan pertanyaan pembeli | Menjawab kekhawatiran soal harga, ukuran, bahan, daya tahan, atau kecocokan | "Apakah stand laptop lipat cocok dimasukkan ke tas?" |

Enam pilar ini **contoh untuk kategori perlengkapan kerja**. Jika kamu memilih kategori lain, sesuaikan pilar dengan pertanyaan dan masalah pembeli di kategori itu.

**Mengapa perlu beberapa pilar?**

- Jika semua konten berisi promosi, audiens merasa terus dijual produk.
- Jika semua konten edukasi tanpa jalur monetisasi, kamu dapat perhatian tetapi sedikit transaksi.
- Strategi yang baik menggabungkan konten yang membantu, mendidik, menunjukkan bukti, dan memudahkan keputusan beli.

### 3.3 Content Angle

Content angle adalah sudut pandang spesifik untuk membahas satu topik. Satu produk bisa menghasilkan banyak angle.

**Contoh produk: organizer kabel.**

| Angle | Ide Konten |
| --- | --- |
| Masalah | Mengapa kabel di meja mudah berantakan? |
| Demonstrasi | Cara memasang organizer kabel |
| Edukasi | Hal yang perlu diperiksa sebelum membeli pengikat kabel |
| Perbandingan | Klip kabel vs. kotak penyimpanan kabel |
| Keberatan | Apakah organizer kabel cocok untuk semua jenis meja? |
| Kesalahan | Kesalahan memilih panjang kabel dan ukuran pengikat |
| Penghematan | Cara merapikan kabel dengan barang yang sudah dimiliki |
| Buying guide | Cara memilih organizer kabel sesuai kebutuhan |

Tidak semua konten harus berakhir dengan rekomendasi membeli. Kadang solusi terbaik adalah memakai barang yang sudah kamu punya. Kejujuran seperti ini meningkatkan kepercayaan jangka panjang.

### 3.4 Problem-Solution Content

Problem-solution content dimulai dari masalah audiens, lalu menjelaskan solusi yang relevan.

**Struktur (6 langkah):**

1. Sebutkan masalah.
2. Jelaskan penyebab atau konteksnya.
3. Tunjukkan solusi.
4. Perlihatkan cara solusi bekerja.
5. Berikan batasan atau hal yang perlu diperhatikan.
6. Arahkan audiens ke langkah berikutnya.

**Contoh lengkap:**

- **Masalah:** kabel pengisi daya sering jatuh ke belakang meja.
- **Konteks:** meja tidak punya pengelola kabel.
- **Solusi:** pakai klip kabel yang sesuai.
- **Demonstrasi:** tunjukkan cara memasang dan memakainya.
- **Batasan:** pastikan ukuran klip sesuai diameter kabel.
- **CTA:** ajak audiens memeriksa ukuran dan spesifikasi produk.

Jangan menciptakan masalah palsu hanya agar produk terlihat penting.

### 3.5 Jenis Konten Affiliate

Ada enam jenis konten affiliate. Ini pengelompokan dari 8 format di Modul 07, yaitu format yang kamu amati pada kompetitor. Satu jenis bisa tampil dalam beberapa format.

**A. Demonstrasi produk.** Memperlihatkan cara produk dipakai. Elemen penting:

- Produk terlihat jelas.
- Fitur yang dibahas benar-benar ada.
- Demonstrasi mudah dipahami.
- Hasil tidak dimanipulasi.
- Kekurangan atau batasan dijelaskan jika relevan.

**B. Konten edukasi.** Memberi pengetahuan yang membantu audiens mengambil keputusan. Contoh: "Bagaimana memilih ukuran organizer yang sesuai dengan ruang penyimpanan?" Konten edukasi menarik audiens yang belum siap membeli tetapi sedang mempelajari masalahnya.

**C. Review.** Evaluasi produk berdasarkan bukti yang ada. Review langsung sebaiknya berdasar penggunaan nyata. Jika belum pernah mencoba produk, jangan menulis seolah sudah memakainya. Alternatif yang jujur adalah analisis spesifikasi, misalnya: "Berdasarkan informasi produk, ini tiga hal yang perlu diperiksa sebelum membeli." Bedakan informasi dari penjual dan pengalaman pribadi.

**D. Perbandingan produk.** Membantu audiens memahami kelebihan dan kekurangan beberapa pilihan. Bandingkan aspek yang sejenis:

- Harga pada waktu pengecekan.
- Dimensi.
- Bahan.
- Fitur.
- Garansi.
- Kebutuhan penggunaan.
- Informasi ulasan yang bisa diverifikasi.

Jangan menyatakan produk A lebih baik secara mutlak jika ia hanya lebih cocok untuk kebutuhan tertentu.

**E. Buying guide.** Panduan memilih produk berdasarkan kebutuhan, bukan sekadar daftar produk populer. Struktur:

1. Tentukan masalah pembeli.
2. Identifikasi kriteria penting.
3. Jelaskan pilihan yang tersedia.
4. Bandingkan kelebihan dan kekurangan.
5. Beri rekomendasi berdasarkan kebutuhan.
6. Arahkan pembaca ke produk yang relevan.
7. Ungkapkan hubungan affiliate.

**F. Konten jawaban keberatan.** Keberatan adalah alasan yang membuat calon pembeli ragu. Contoh:

- "Apakah ukurannya cocok?"
- "Apakah harganya sepadan?"
- "Apakah ada pilihan lebih murah?"
- "Apakah produk ini sesuai kebutuhan saya?"
- "Apa yang harus diperiksa sebelum membeli?"

Jawab keberatan dengan fakta, bukan tekanan.

### 3.6 Konten Berdasarkan Tahap Pembelian

Calon pembeli tidak selalu siap membeli saat pertama menemukan kontenmu.

| Tahap | Nama | Kondisi audiens | Contoh konten | Tujuan |
| --- | --- | --- | --- | --- |
| 1 | Awareness (menyadari masalah) | Audiens mulai memahami masalah atau kebutuhan | "Tiga penyebab meja kerja terasa berantakan." | Menarik audiens yang relevan |
| 2 | Consideration (mencari dan mempertimbangkan solusi) | Audiens mulai membandingkan cara mengatasi masalah | "Kapan organizer kabel diperlukan dan kapan tidak?" | Membangun pemahaman dan kepercayaan |
| 3 | Evaluation (membandingkan produk) | Audiens membandingkan pilihan berdasarkan spesifikasi, harga, dan kebutuhan | "Perbandingan dua jenis organizer kabel berdasarkan ukuran dan pemasangan." | Membantu pengambilan keputusan |
| 4 | Conversion (memutuskan membeli) | Audiens butuh informasi terakhir sebelum transaksi | "Periksa ukuran meja dan jenis kabel sebelum memilih produk ini." | Mempermudah tindakan yang relevan tanpa memaksa |

Pembagian ini tidak kaku. Satu video bisa mengedukasi sekaligus mendorong pembelian.

### 3.7 Content Calendar

Content calendar adalah jadwal yang mencatat konten apa yang dipublikasikan, kapan, dan apa tujuannya.

Kalender yang baik tidak hanya berisi tanggal dan judul. Tambahkan:

- Pilar konten.
- Audiens yang dituju.
- Masalah yang dibahas.
- Format.
- CTA.
- Status produksi.
- Metrik evaluasi.

**Contoh kalender 7 hari:**

| Hari | Pilar | Topik | Format |
| --- | --- | --- | --- |
| 1 | Masalah | Meja kerja berantakan | Video |
| 2 | Edukasi | Cara mengukur ruang meja | Video |
| 3 | Demonstrasi | Cara memasang klip kabel | Video |
| 4 | Perbandingan | Klip kabel vs. kotak kabel | Video |
| 5 | Keberatan | Ukuran klip untuk kabel berbeda | Video |
| 6 | Buying guide | Memilih organizer sesuai meja | Video |
| 7 | Evaluasi | Analisis performa minggu pertama | Analisis |

Kalender ini **contoh pola**, bukan aturan bahwa konten harus terbit setiap hari. Sesuaikan frekuensi dengan kapasitas produksimu.

### 3.8 Content Repurposing

Content repurposing adalah mengadaptasi materi yang sudah dibuat menjadi format lain yang tetap relevan. Satu topik, "Memilih stand laptop", bisa menjadi:

- Video demonstrasi singkat.
- Video perbandingan.
- Carousel tentang kriteria pemilihan.
- Artikel buying guide.
- Video jawaban atas pertanyaan audiens.

**Tiga hal yang harus diperhatikan:**

1. Pastikan kamu punya hak untuk memakai rekaman, gambar, musik, dan materi lain.
2. Sesuaikan isi dengan karakteristik tiap platform.
3. Jangan menyalin konten kreator lain hanya dengan mengganti teks atau musik.

Konten buatan sendiri yang disesuaikan dengan kebutuhan audiens lebih aman sebagai fondasi bisnis jangka panjang.

### 3.9 Seri Konten

Seri konten adalah kumpulan konten yang membahas topik secara bertahap.

**Contoh seri "Menata Meja Kerja Kecil":**

1. Mengidentifikasi masalah meja kerja.
2. Mengatur posisi laptop.
3. Merapikan kabel.
4. Memilih pencahayaan.
5. Menentukan tempat penyimpanan.
6. Memilih produk sesuai ukuran meja.

**Keuntungan seri konten:**

- Ide lebih mudah dikembangkan.
- Audiens punya alasan mengikuti konten berikutnya.
- Topik bisa diperdalam bertahap.
- Hasil tiap bagian bisa dibandingkan.

Jangan membuat seri hanya untuk memperbanyak unggahan. Setiap bagian harus punya manfaat yang berdiri sendiri.

### 3.10 Konten Evergreen dan Musiman

**Konten evergreen** adalah konten yang relevansinya relatif tahan lama. Contoh:

- Cara mengukur ruang sebelum membeli rak.
- Cara memilih ukuran organizer.
- Perbedaan bahan suatu produk.
- Kesalahan memilih aksesori kerja.

**Konten musiman** adalah konten yang relevan pada periode tertentu. Contoh:

- Perlengkapan sekolah menjelang tahun ajaran baru.
- Ide hadiah menjelang hari raya.
- Kebutuhan perjalanan saat musim liburan.
- Produk tertentu selama kampanye belanja.

Konten musiman bisa berubah harga, ketersediaan, dan promosinya. **Selalu periksa informasi terkini sebelum memublikasikan klaim soal penawaran.**

---

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Strategi konten | Rencana tentang konten apa yang dibuat, untuk siapa, dengan tujuan apa, dan bagaimana hasilnya diukur |
| Content pillar | Kelompok besar topik yang menjadi dasar konten sebuah akun |
| Content angle | Sudut pandang spesifik untuk membahas suatu topik |
| Problem-solution content | Konten yang dimulai dari masalah audiens dan menjelaskan solusi yang relevan |
| Review | Evaluasi produk berdasarkan bukti yang tersedia |
| Buying guide | Panduan memilih produk berdasarkan kebutuhan, bukan sekadar daftar produk populer |
| Keberatan | Alasan yang membuat calon pembeli ragu |
| Awareness | Tahap audiens mulai memahami masalah atau kebutuhan |
| Consideration | Tahap audiens mulai mencari dan membandingkan cara mengatasi masalah |
| Evaluation | Tahap audiens membandingkan produk berdasarkan spesifikasi, harga, dan kebutuhan |
| Conversion | Tahap audiens memutuskan membeli dan butuh informasi terakhir sebelum transaksi |
| Content calendar | Jadwal yang mencatat konten apa yang dipublikasikan, kapan, dan apa tujuannya |
| Content repurposing | Mengadaptasi materi yang sudah dibuat menjadi format lain yang tetap relevan |
| Seri konten | Kumpulan konten yang membahas topik secara bertahap |
| Konten evergreen | Konten yang relevansinya relatif tahan lama |
| Konten musiman | Konten yang relevan pada periode tertentu |

---

## 5. Langkah Praktik

**Alur menyusun strategi konten:** tentukan enam content pillar → buat 30 ide konten dengan format 8 kolom → susun kalender 30 hari → catat hasil tiap format.

**Struktur problem-solution content:** sebutkan masalah → jelaskan penyebab → tunjukkan solusi → perlihatkan cara kerja → beri batasan → arahkan ke langkah berikutnya.

**Struktur buying guide:** tentukan masalah pembeli → identifikasi kriteria → jelaskan pilihan → bandingkan kelebihan dan kekurangan → rekomendasi sesuai kebutuhan → arahkan ke produk relevan → ungkapkan hubungan affiliate.

---

## 6. Contoh dan Template

**Format pengisian ide konten (untuk Tugas 2).** Pakai untuk setiap ide:

- Judul:
- Audiens:
- Masalah:
- Pilar:
- Angle:
- Format:
- CTA:
- Bukti yang diperlukan:

**Contoh satu ide yang sudah terisi:**

- **Judul:** Cara memilih organizer kabel untuk meja kecil.
- **Audiens:** orang yang bekerja atau belajar di meja berukuran kecil.
- **Masalah:** kabel tidak tertata.
- **Pilar:** edukasi pembelian.
- **Angle:** ukuran dan metode pemasangan.
- **Format:** video demonstrasi.
- **CTA:** periksa ukuran produk sebelum membeli.
- **Bukti:** dimensi produk dan demonstrasi pemasangan yang benar.

**Tabel pencatatan hasil per format (untuk Tugas 4):**

| Konten | Pilar | Views | Klik | Transaksi | Catatan |
| --- | --- | --- | --- | --- | --- |
| Konten A | Edukasi | — | — | — | — |
| Konten B | Demonstrasi | — | — | — | — |
| Konten C | Perbandingan | — | — | — | — |

---

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Mengunggah video tiap hari tanpa arah | Buat strategi: konten apa, untuk siapa, tujuan apa, diukur bagaimana |
| Semua konten berisi promosi | Gabungkan beberapa pilar agar audiens tidak merasa terus dijual produk |
| Semua konten edukasi tanpa jalur monetisasi | Sediakan jalur ke produk yang relevan agar perhatian berubah jadi transaksi |
| Menciptakan masalah palsu agar produk terlihat penting | Dilarang; mulai dari masalah nyata audiens |
| Menulis review seolah sudah memakai produk padahal belum | Pakai analisis spesifikasi dan bedakan informasi penjual dari pengalaman pribadi |
| Menyatakan produk A lebih baik secara mutlak | Nyatakan hanya lebih cocok untuk kebutuhan tertentu |
| Menjawab keberatan dengan tekanan | Jawab dengan fakta |
| Menyalin konten kreator lain dengan mengganti teks atau musik | Dilarang; pastikan hak penggunaan materi |
| Membuat seri hanya untuk memperbanyak unggahan | Pastikan tiap bagian punya manfaat yang berdiri sendiri |
| Memublikasikan klaim penawaran musiman tanpa cek ulang | Periksa harga, ketersediaan, dan promosi sebelum publikasi |

---

## 8. Tugas dan Checklist

**Tugas 1 — Tentukan enam content pillar** (sesuai kategori yang kamu pilih)

- [ ] Pilar 1:
- [ ] Pilar 2:
- [ ] Pilar 3:
- [ ] Pilar 4:
- [ ] Pilar 5:
- [ ] Pilar 6:

**Tugas 2 — Buat 30 ide konten.** Pakai format 8 kolom di bagian 6 untuk tiap ide.

- [ ] 30 ide tersebar di enam pilar.
- [ ] Tiap ide punya audiens, masalah, angle, format, CTA, dan bukti.

**Tugas 3 — Buat kalender 30 hari**

- [ ] Tentukan frekuensi publikasi yang realistis.
- [ ] Sebarkan topik ke beberapa pilar.
- [ ] Gabungkan konten edukasi dan komersial.
- [ ] Jadwalkan evaluasi mingguan.
- [ ] Siapkan ide cadangan dari pertanyaan audiens.

**Tugas 4 — Catat hasil tiap format.** Isi tabel pencatatan hasil di bagian 6 setelah konten terbit.

---

## 9. Latihan dan Kunci Jawaban

**1. Apa beda content pillar dan content angle?**
Content pillar = kelompok besar topik yang menjadi dasar konten sebuah akun. Content angle = sudut pandang spesifik untuk membahas satu topik. Satu pilar bisa dipecah menjadi banyak angle.

**2. Sebutkan enam pilar contoh untuk kategori perlengkapan kerja.**
Masalah dan solusi; demonstrasi produk; perbandingan; edukasi pembelian; inspirasi dan penggunaan; keberatan dan pertanyaan pembeli.

**3. Kamu belum pernah memakai produknya. Review jenis apa yang jujur?**
Analisis spesifikasi, misalnya: "Berdasarkan informasi produk, ini tiga hal yang perlu diperiksa sebelum membeli." Jangan menulis seolah sudah memakainya.

**4. Audiens baru menyadari mejanya berantakan tetapi belum tahu solusinya. Tahap apa, dan apa contoh kontennya?**
Tahap 1, Awareness (menyadari masalah). Contoh: "Tiga penyebab meja kerja terasa berantakan." Tujuannya menarik audiens yang relevan.

**5. Apa tiga syarat repurposing?**

1. Memiliki hak atas rekaman, gambar, musik, dan materi lain.
2. Menyesuaikan isi dengan karakteristik tiap platform.
3. Tidak menyalin konten kreator lain hanya dengan mengganti teks atau musik.

---

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika kamu punya enam pilar yang relevan, 30 ide konten, kalender 30 hari, dan cara menilai konten berdasarkan kebutuhan audiens serta hasil aktual.
', 'Modul 09', 15, false, 13, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l14', 'm03', 'Modul 10 — Copywriting dan Hook', 'modul-10-copywriting-dan-hook', '# Modul 10 — Copywriting dan Hook

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Menulis pembukaan yang relevan dan menarik.
- Memakai teknik copywriting secara etis.
- Menyusun skrip video yang jelas.
- Menjelaskan manfaat produk berdasarkan bukti.
- Mengatasi keberatan calon pembeli.
- Menulis CTA yang sesuai tahap pembelian.
- Mengungkapkan hubungan affiliate dengan jelas.

---

## 2. Ringkasan Konsep Utama

1. Copywriting adalah penulisan pesan yang dirancang untuk mendorong tindakan tertentu. Dalam affiliate, tindakan itu bukan hanya membeli, tetapi juga menonton sampai selesai, menyimpan, membaca, membandingkan, dan mengeklik.
2. Ada enam prinsip copywriting: spesifik, relevan, mudah dipahami, berorientasi manfaat, dapat dipercaya, dan punya tindakan berikutnya.
3. **Fitur, manfaat, dan klaim itu berbeda.** Fitur bisa diverifikasi. Manfaat perlu dijelaskan sesuai konteks. Klaim hasil pasti atau klaim kesehatan butuh bukti yang sesuai.
4. Ada lima jenis hook: berbasis masalah, rasa ingin tahu, demonstrasi, perbandingan, dan keberatan.
5. Struktur naskah video: Hook → Konteks → Isi atau demonstrasi → Bukti dan batasan → CTA.
6. Rumus penyampaian manfaat: **Fitur → Fungsi → Manfaat potensial → Batasan.**
7. Sesuaikan CTA dengan tujuan konten. Hindari urgensi palsu.
8. Pengungkapan hubungan affiliate harus jelas dan mudah ditemukan.

---

## 3. Penjelasan

### 3.1 Apa Itu Copywriting?

Copywriting adalah penulisan pesan yang dirancang untuk mendorong tindakan tertentu. Dalam affiliate marketing, tindakan itu bisa berupa:

- Menonton video sampai selesai.
- Menyimpan konten.
- Membaca panduan.
- Membandingkan produk.
- Mengeklik link.
- Membeli produk.

Copywriting bukan sekadar membuat kata terdengar menarik. Pesan yang baik harus relevan, mudah dipahami, dan punya alasan masuk akal untuk dipercaya.

**Contoh yang lemah:**

> "Produk terbaik, wajib beli sekarang!"

Masalahnya:

- Tidak jelas untuk siapa produk itu.
- Tidak menjelaskan manfaat.
- Tidak memberi bukti.
- Tidak membantu pembeli menilai kecocokan.

**Contoh yang lebih baik:**

> "Sedang mencari organizer kabel untuk meja kecil? Periksa ukuran klip dan cara pemasangannya sebelum memilih."

Pesan kedua membantu audiens mengambil keputusan, bahkan jika mereka akhirnya tidak membeli produk yang kamu promosikan.

### 3.2 Enam Prinsip Copywriting

1. **Spesifik:** sebutkan masalah atau kebutuhan yang jelas.
2. **Relevan:** bicara kepada audiens yang tepat.
3. **Mudah dipahami:** hindari bahasa rumit tanpa alasan.
4. **Berorientasi manfaat:** jelaskan apa yang dibantu oleh produk.
5. **Dapat dipercaya:** pakai bukti yang bisa diperiksa.
6. **Punya tindakan berikutnya:** arahkan audiens ke langkah yang sesuai.

**Bedakan manfaat dari fitur.** Contoh:

- **Fitur:** stand laptop memiliki ketinggian yang dapat disesuaikan.
- **Manfaat potensial:** pengguna dapat mengatur posisi layar sesuai meja dan preferensinya.
- **Klaim yang tidak otomatis dapat dibenarkan:** stand tersebut pasti menghilangkan nyeri leher.

Fitur bisa diverifikasi lewat spesifikasi atau demonstrasi. Manfaat perlu dijelaskan sesuai konteks. Klaim kesehatan atau hasil pasti butuh bukti yang sesuai dan tidak boleh dibuat tanpa dasar.

### 3.3 Lima Jenis Hook

Hook adalah bagian pembuka yang membuat audiens paham alasan untuk terus menonton atau membaca.

#### A. Hook Berbasis Masalah

Dimulai dari kendala yang dirasakan audiens. Contoh:

- "Kabel di meja sering jatuh ke belakang?"
- "Sulit menata barang di meja yang sempit?"
- "Bingung memilih rak yang sesuai dengan ukuran ruangan?"
- "Sebelum membeli stand laptop, ukur bagian ini dulu."

Hook yang baik tidak perlu berteriak, memakai huruf kapital berlebihan, atau membuat klaim ekstrem. Pilih masalah yang benar-benar relevan dengan produk dan audiens.

#### B. Hook Berbasis Rasa Ingin Tahu

Membuat audiens ingin tahu informasi berikutnya. Contoh:

- "Ada satu ukuran yang sering terlupakan saat memilih organizer."
- "Dua jenis stand laptop ini punya kegunaan yang berbeda."
- "Sebelum membeli lampu meja, periksa hal berikut."
- "Mengapa dua produk dengan bentuk serupa bisa punya fungsi berbeda?"

Pastikan konten benar-benar menjawab rasa ingin tahu yang kamu bangun. Jangan menjanjikan sesuatu di pembukaan lalu tidak membahasnya.

#### C. Hook Demonstrasi

Langsung memperlihatkan proses, hasil, atau fungsi yang relevan. Contoh:

- Memperlihatkan cara memasang klip kabel.
- Menunjukkan mekanisme lipat sebuah stand.
- Membandingkan ukuran dua produk secara langsung.
- Memperlihatkan cara sebuah wadah dibuka dan ditutup.

Demonstrasi berguna ketika manfaat produk lebih mudah dipahami lewat gambar daripada penjelasan panjang.

Jangan memanipulasi sudut kamera atau kondisi perbandingan agar produk tampak lebih baik daripada kenyataannya.

#### D. Hook Perbandingan

Membantu audiens memahami perbedaan pilihan. Contoh:

- "Stand laptop lipat atau tetap: mana yang lebih cocok untuk kebutuhanmu?"
- "Rak terbuka atau tertutup: apa yang perlu dipertimbangkan?"
- "Organizer perekat vs. organizer penjepit."
- "Produk murah vs. produk dengan fitur tambahan: apa bedanya?"

Bandingkan berdasarkan kriteria yang jelas. Harga murah belum tentu buruk, dan harga tinggi belum tentu lebih baik.

#### E. Hook Berbasis Keberatan

Dimulai dari keraguan calon pembeli. Contoh:

- "Takut organizer terlalu besar untuk meja?"
- "Apakah stand laptop lipat mudah dibawa?"
- "Sebelum membeli produk yang terlihat serupa, periksa tiga spesifikasi ini."
- "Kapan produk ini tidak cocok untuk kebutuhanmu?"

Membahas kapan produk tidak cocok meningkatkan kualitas rekomendasi karena audiens tidak merasa dipaksa membeli.

### 3.4 Struktur Naskah Video

Pakai struktur sederhana ini:

1. **Hook:** tarik perhatian dengan masalah, pertanyaan, atau demonstrasi.
2. **Konteks:** jelaskan mengapa masalah itu penting bagi audiens.
3. **Isi atau demonstrasi:** tunjukkan solusi, fitur, proses, atau perbandingan.
4. **Bukti dan batasan:** tunjukkan informasi yang bisa diverifikasi dan jelaskan keterbatasannya jika relevan.
5. **CTA:** ajak audiens melakukan satu tindakan yang sesuai.

**Contoh skrip lengkap:**

> **Hook:** "Sebelum membeli organizer kabel, jangan hanya melihat bentuknya."
>
> **Konteks:** "Ukuran kabel dan permukaan meja bisa memengaruhi kecocokan produk."
>
> **Isi:** "Periksa diameter kabel yang didukung, ukuran klip, dan metode pemasangannya."
>
> **Bukti:** "Pada produk ini, ukuran yang tercantum di halaman produk adalah informasi yang perlu kamu cocokkan dengan kebutuhanmu."
>
> **CTA:** "Periksa spesifikasinya lewat affiliate link yang tersedia jika produk ini sesuai dengan kebutuhanmu."

Naskah ini tidak mengklaim bahwa produk pasti berhasil untuk semua orang.

### 3.5 Storytelling

Storytelling adalah memakai cerita untuk menjelaskan masalah, proses, atau pelajaran.

**Struktur sederhana:**

- Situasi awal.
- Masalah.
- Proses mencari solusi.
- Solusi yang dipertimbangkan.
- Pelajaran atau kesimpulan.

**Contoh edukatif:**

> "Ketika meja berukuran kecil dipakai untuk laptop, buku, dan pengisi daya sekaligus, ruang kerja bisa terasa penuh. Sebelum membeli aksesori tambahan, ukur ruang yang tersedia. Setelah itu, bandingkan organizer berdasarkan dimensi dan metode pemasangan."

Jika kamu belum mengalami masalah itu sendiri, sampaikan sebagai skenario umum atau contoh, bukan pengalaman pribadi. Jangan mengarang kisah pembeli, testimoni, atau perubahan hasil penggunaan.

### 3.6 Penyampaian Manfaat Produk

**Rumus:** Fitur → Fungsi → Manfaat potensial → Batasan.

**Contoh penerapan:**

- **Fitur:** organizer memiliki perekat.
- **Fungsi:** dapat dipasang pada permukaan yang sesuai.
- **Manfaat potensial:** kabel dapat ditahan di lokasi tertentu.
- **Batasan:** kecocokan perekat bergantung pada permukaan, kondisi pemasangan, dan petunjuk produk.

Dengan rumus ini, penjelasanmu lebih realistis dan bermanfaat.

### 3.7 Bukti dan Klaim yang Dapat Diverifikasi

Bukti yang bisa kamu pakai:

- Demonstrasi langsung.
- Spesifikasi resmi.
- Dimensi produk.
- Informasi bahan.
- Kebijakan garansi.
- Foto produk yang dipakai dengan izin.
- Ulasan pelanggan yang ditampilkan akurat dan tidak dipilih secara menyesatkan.

**Tabel penilaian klaim:**

| Klaim | Penilaian |
| --- | --- |
| "Dimensi produk tercantum 20 × 10 cm." | Dapat diperiksa pada sumber yang relevan |
| "Produk ini cocok untuk meja yang memiliki ruang terbatas." | Harus dijelaskan berdasarkan dimensi dan kebutuhan |
| "Produk ini pasti awet bertahun-tahun." | Tidak layak tanpa bukti yang memadai |
| "Semua pembeli puas." | Tidak boleh dinyatakan tanpa data yang mendukung |
| "Saya sudah mencobanya." | Hanya boleh jika benar-benar pernah mencoba |

Selalu periksa ulang informasi yang bisa berubah, seperti harga, stok, diskon, dan spesifikasi di halaman produk.

### 3.8 CTA (Call to Action)

CTA adalah ajakan melakukan tindakan berikutnya.

**Contoh CTA berdasarkan tujuan:**

| Tujuan | Contoh CTA |
| --- | --- |
| Edukasi | "Simpan panduan ini untuk referensi." |
| Diskusi | "Bagian mana yang paling sulit saat memilih produk?" |
| Perbandingan | "Bandingkan ukuran dan fitur sebelum memutuskan." |
| Klik produk | "Periksa detail produk lewat link yang tersedia." |
| Pembelian | "Jika sesuai kebutuhan dan anggaranmu, kamu bisa memeriksa pilihan produk lewat affiliate link." |

Hindari CTA yang menipu, memaksa, atau membuat urgensi palsu. Kalimat seperti "diskon berakhir malam ini" hanya boleh dipakai jika informasinya valid dan waktunya masih berlaku.

### 3.9 Menangani Keberatan

**Struktur jawaban keberatan (5 langkah):**

1. Akui pertanyaan atau kekhawatiran.
2. Jelaskan informasi yang relevan.
3. Berikan bukti atau cara memeriksa.
4. Sebutkan batasan jika ada.
5. Biarkan calon pembeli memutuskan.

**Contoh:**

> **Pertanyaan:** "Apakah stand ini cocok untuk laptop 16 inci?"
>
> **Jawaban:** "Periksa rentang ukuran perangkat yang didukung, lebar dudukan, dan kapasitas beban pada spesifikasi produk. Ukuran layar saja belum cukup untuk memastikan kecocokan."

Jawaban ini lebih bermanfaat daripada mengatakan "pasti cocok" tanpa bukti.

### 3.10 Pengungkapan Hubungan Affiliate

Jika kamu berpotensi menerima komisi dari pembelian lewat link, jelaskan hubungan itu secara transparan.

**Kalimat pengungkapan baku:**

> "Link ini adalah affiliate link. Saya dapat menerima komisi jika kamu membeli lewat link ini dan transaksinya memenuhi ketentuan program."

**Variasi pendek:**

> "Sebagian link di panduan ini adalah affiliate link."

Jangan menjanjikan "harga tidak berubah" atau "tanpa biaya tambahan" kecuali itu tertulis di ketentuan resmi. Tempatkan pengungkapan agar mudah ditemukan dan dipahami. Ikuti juga format yang diwajibkan program dan platform.

---

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Copywriting | Penulisan pesan yang dirancang untuk mendorong tindakan tertentu |
| Hook | Bagian pembuka yang membuat audiens paham alasan untuk terus menonton atau membaca |
| Hook berbasis masalah | Hook yang dimulai dari kendala yang dirasakan audiens |
| Hook berbasis rasa ingin tahu | Hook yang membuat audiens ingin tahu informasi berikutnya |
| Hook demonstrasi | Hook yang langsung memperlihatkan proses, hasil, atau fungsi yang relevan |
| Hook perbandingan | Hook yang membantu audiens memahami perbedaan pilihan |
| Hook berbasis keberatan | Hook yang dimulai dari keraguan calon pembeli |
| Storytelling | Memakai cerita untuk menjelaskan masalah, proses, atau pelajaran |
| CTA (Call to Action) | Ajakan melakukan tindakan berikutnya |
| Fitur | Atribut produk yang bisa diverifikasi lewat spesifikasi atau demonstrasi |
| Manfaat potensial | Apa yang dibantu produk; perlu dijelaskan sesuai konteks |

---

## 5. Langkah Praktik

**Menulis satu naskah video:**

1. Hook: masalah, pertanyaan, atau demonstrasi.
2. Konteks: mengapa masalah itu penting bagi audiens.
3. Isi atau demonstrasi: solusi, fitur, proses, atau perbandingan.
4. Bukti dan batasan: informasi yang bisa diverifikasi dan keterbatasannya.
5. CTA: satu tindakan yang sesuai.
6. Tambahkan pengungkapan affiliate yang sesuai.

**Menjelaskan manfaat produk:** Fitur → Fungsi → Manfaat potensial → Batasan.

**Menjawab keberatan:** akui → jelaskan informasi relevan → beri bukti atau cara memeriksa → sebutkan batasan → biarkan calon pembeli memutuskan.

---

## 6. Contoh dan Template

Modul ini tidak punya rumus angka. Contoh dan template yang bisa kamu pakai ulang ada di bagian 3. Ringkasannya:

| Template | Letaknya | Isi singkat |
| --- | --- | --- |
| Copy lemah vs. kuat | 3.1 | "Produk terbaik, wajib beli sekarang!" diganti pesan spesifik dan relevan |
| 20 contoh hook | 3.3 | Empat contoh untuk tiap jenis hook (lima jenis) |
| Skrip video lengkap | 3.4 | Hook, Konteks, Isi, Bukti, CTA |
| Rumus manfaat | 3.6 | Fitur → Fungsi → Manfaat potensial → Batasan |
| Tabel penilaian klaim | 3.7 | Lima klaim beserta penilaiannya |
| Tabel CTA | 3.8 | Lima tujuan beserta contoh CTA |
| Jawaban keberatan | 3.9 | Contoh stand untuk laptop 16 inci |
| Kalimat pengungkapan | 3.10 | Kalimat baku dan variasi pendek |

---

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Copy generik seperti "Produk terbaik, wajib beli sekarang!" | Sebut untuk siapa, apa manfaatnya, dan apa buktinya |
| Mengklaim fitur sebagai hasil pasti (mis. "pasti menghilangkan nyeri leher") | Klaim kesehatan atau hasil pasti butuh bukti yang sesuai |
| Hook berteriak, kapital berlebihan, klaim ekstrem | Pilih masalah yang benar-benar relevan |
| Hook menjanjikan sesuatu yang tidak dibahas di isi | Pastikan konten menjawab rasa ingin tahu yang dibangun |
| Memanipulasi sudut kamera atau kondisi perbandingan | Dilarang; jangan buat produk tampak lebih baik dari kenyataan |
| Menyimpulkan harga murah itu buruk atau harga mahal itu lebih baik | Bandingkan dengan kriteria yang jelas |
| Mengarang kisah pembeli, testimoni, atau hasil penggunaan | Dilarang; sampaikan sebagai skenario umum jika belum mengalami sendiri |
| Menyatakan "Semua pembeli puas" atau "pasti awet bertahun-tahun" | Jangan, kecuali ada data atau bukti yang memadai |
| CTA dengan urgensi palsu ("diskon berakhir malam ini") | Pakai hanya jika informasinya valid dan masih berlaku |
| Menjawab keberatan dengan "pasti cocok" | Arahkan ke spesifikasi yang bisa diperiksa |
| Pengungkapan affiliate menjanjikan "tanpa biaya tambahan" | Pakai kalimat pengungkapan baku di 3.10 |

---

## 8. Tugas dan Checklist

**Tugas 1 — Buat 30 hook**

- [ ] 6 hook berbasis masalah.
- [ ] 6 hook berbasis rasa ingin tahu.
- [ ] 6 hook demonstrasi.
- [ ] 6 hook perbandingan.
- [ ] 6 hook keberatan.

**Tugas 2 — Tulis 10 skrip.** Setiap skrip harus punya:

- [ ] Hook.
- [ ] Konteks.
- [ ] Isi atau demonstrasi.
- [ ] Bukti.
- [ ] Batasan yang relevan.
- [ ] CTA.
- [ ] Pengungkapan affiliate yang sesuai.

**Tugas 3 — Buat variasi CTA.** Untuk satu konten, buat tiga CTA dengan tujuan berbeda: edukasi, klik produk, dan pembelian.

**Tugas 4 — Uji pendekatan berbeda.** Bandingkan hook masalah, demonstrasi, dan perbandingan pada topik yang sebanding. Pertahankan faktor lain sebisa mungkin agar hasilnya mudah ditafsirkan. Jangan menyatakan satu hook terbaik dari satu video saja. Catat hasil beberapa publikasi, dan perhatikan perbedaan topik, audiens, dan waktu publikasi.

---

## 9. Latihan dan Kunci Jawaban

**1. Perbaiki copy "Produk terbaik, wajib beli sekarang!"**
Contoh: "Sedang mencari organizer kabel untuk meja kecil? Periksa ukuran klip dan cara pemasangannya sebelum memilih."

**2. Klasifikasikan: fitur, manfaat potensial, atau klaim yang tidak otomatis dapat dibenarkan?**

- "Stand laptop memiliki ketinggian yang dapat disesuaikan." → **Fitur**
- "Pengguna dapat mengatur posisi layar sesuai meja dan preferensinya." → **Manfaat potensial**
- "Stand tersebut pasti menghilangkan nyeri leher." → **Klaim yang tidak otomatis dapat dibenarkan**

**3. Sebutkan lima elemen struktur naskah video.**
Hook → Konteks → Isi atau demonstrasi → Bukti dan batasan → CTA.

**4. Apa rumus penyampaian manfaat produk?**
Fitur → Fungsi → Manfaat potensial → Batasan.

**5. Mana klaim yang tidak layak tanpa bukti memadai?**
"Produk ini pasti awet bertahun-tahun." dan "Semua pembeli puas." Keduanya tidak boleh dinyatakan tanpa data atau bukti.

**6. CTA mana yang cocok untuk tujuan edukasi?**
"Simpan panduan ini untuk referensi."

**7. Mengapa membahas kapan produk TIDAK cocok justru dianjurkan?**
Karena meningkatkan kualitas rekomendasi, dan audiens tidak merasa dipaksa membeli.

---

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika kamu bisa menulis hook, skrip, dan CTA yang jelas, relevan, persuasif, dapat diverifikasi, dan tidak mengandalkan klaim berlebihan.
', 'Modul 10', 15, false, 14, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l15', 'm03', 'Modul 11 — Produksi Video dan Visual', 'modul-11-produksi-video-dan-visual', '# Modul 11 — Produksi Video dan Visual

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Merekam video produk dengan smartphone.
- Mengatur pencahayaan, komposisi, dan audio.
- Menampilkan produk dengan jelas.
- Melakukan editing sederhana.
- Membuat subtitle dan teks layar.
- Meningkatkan retensi penonton tanpa manipulasi.
- Memakai materi visual secara sah.
- Membangun workflow produksi tanpa modal.

---

## 2. Ringkasan Konsep Utama

1. Video affiliate tidak harus terlihat seperti iklan profesional. Yang terpenting: informasi mudah dipahami, produk terlihat jelas, dan demonstrasi mendukung pesan.
2. Prioritas kualitas video ada urutannya. Isi konten yang relevan di urutan pertama, editing di urutan kelima.
3. Teknik rekam smartphone tanpa modal: bersihkan lensa, stabilkan perangkat, pilih resolusi yang sesuai, kunci fokus, dan ambil beberapa jenis gambar.
4. Cukup pakai cahaya jendela dan latar yang kontras. Jangan mengubah warna lewat editing sampai berbeda jauh dari produk asli.
5. Ada tiga framing dasar: wide shot, medium shot, close-up.
6. Audio yang jelas lebih penting daripada musik yang menarik. Musik butuh hak atau izin, termasuk untuk penggunaan komersial.
7. Bangun retensi dengan struktur yang membantu pemahaman, bukan dengan menahan informasi sampai akhir.
8. Periksa status hak penggunaan semua materi visual (foto, video, musik, ilustrasi, logo, gambar produk). Tersedia publik tidak sama dengan bebas dipakai.
9. Ada checklist Quality Control 11 butir sebelum publikasi.

---

## 3. Penjelasan

### 3.1 Prinsip Produksi Video Affiliate

Video affiliate tidak harus terlihat seperti iklan profesional. Yang paling penting: informasi mudah dipahami, produk terlihat jelas, dan demonstrasi mendukung pesanmu.

**Prioritas kualitas video (berurutan):**

1. Isi konten relevan.
2. Produk dan demonstrasi terlihat jelas.
3. Audio dapat dipahami.
4. Pembukaan langsung menuju topik.
5. Editing membantu pemahaman.
6. CTA sesuai dengan isi konten.

Jangan menghabiskan banyak waktu mempercantik video jika masalah utamanya adalah konten tidak menjawab kebutuhan audiens.

### 3.2 Teknik Pengambilan Gambar dengan Smartphone

**A. Bersihkan kamera.** Sebelum merekam, bersihkan lensa dengan kain lembut. Lensa kotor bisa membuat gambar buram.

**B. Stabilkan smartphone.** Pakai tripod jika punya. Jika tidak, pakai tumpukan buku, penyangga, atau permukaan yang stabil. Hindari gerakan kamera berlebihan saat memperlihatkan detail produk.

**C. Pilih resolusi yang sesuai.** Untuk video vertikal pendek, **1080 × 1920 piksel atau rasio 9:16** adalah titik awal yang praktis jika perangkatmu mendukung. Resolusi tinggi tidak otomatis membuat video bagus. Fokus, pencahayaan, dan kestabilan tetap penting.

**D. Gunakan fokus yang tepat.** Pastikan bagian produk yang dibahas terlihat tajam. Jika smartphone mendukung kunci fokus dan pencahayaan, pakai saat perlu agar gambar tidak berubah-ubah saat merekam.

**E. Ambil beberapa jenis gambar.** Untuk satu produk, rekam:

- Tampilan keseluruhan produk.
- Detail bahan atau fitur.
- Cara penggunaan.
- Proses pemasangan.
- Perbandingan ukuran.
- Hasil demonstrasi yang bisa diverifikasi.

Variasi gambar membuat penjelasan lebih mudah diikuti.

### 3.3 Pencahayaan

Pencahayaan yang baik membantu audiens melihat bentuk, warna, dan detail produk. Cara memanfaatkannya tanpa modal:

- Rekam di dekat jendela pada siang hari.
- Hadapkan produk ke sumber cahaya.
- Hindari cahaya dari belakang yang membuat produk gelap.
- Pakai latar belakang yang tidak terlalu ramai.
- Hindari campuran cahaya berwarna yang membuat tampilan produk menyesatkan.

Contoh: saat merekam organizer putih, latar yang terlalu putih membuat bentuk produk sulit dibedakan. Pakai latar yang kontras secukupnya.

Jangan mengubah warna lewat editing sampai berbeda jauh dari tampilan produk sebenarnya.

### 3.4 Komposisi dan Framing

Framing adalah cara menempatkan objek di dalam gambar.

**Tiga jenis framing dasar:**

| Jenis | Fungsi |
| --- | --- |
| Wide shot | Menunjukkan produk dan lingkungan penggunaannya |
| Medium shot | Menunjukkan produk saat digunakan |
| Close-up | Menampilkan detail, tombol, bahan, atau mekanisme |

**Contoh untuk stand laptop:**

- Wide shot: seluruh meja kerja.
- Medium shot: stand dan laptop dalam posisi penggunaan.
- Close-up: mekanisme pengaturan tinggi.

Jangan membuat objek terlalu kecil sampai penonton tidak bisa melihat bagian yang dijelaskan.

### 3.5 Audio

Audio yang jelas lebih penting daripada musik menarik yang mengganggu. Cara merekam audio dengan smartphone:

- Pilih ruangan yang relatif tenang.
- Dekatkan mikrofon ke sumber suara.
- Jangan bicara dari jarak terlalu jauh.
- Matikan sumber suara yang tidak perlu.
- Dengarkan hasil rekaman sebelum mengedit.
- Pakai voice-over jika suara saat merekam demonstrasi tidak jelas.

Musik tidak harus ada di setiap video. **Jika memakai musik, pastikan kamu punya hak atau izin yang diperlukan, termasuk untuk penggunaan komersial.**

### 3.6 Demonstrasi Visual

Demonstrasi adalah format penting dalam affiliate karena membantu audiens memahami produk tanpa penjelasan panjang.

Contoh demonstrasi:

- Memperlihatkan cara membuka produk.
- Menunjukkan cara pemasangan.
- Mengukur dimensi produk.
- Memperlihatkan fitur yang benar-benar ada.
- Membandingkan dua produk dengan kondisi yang sebanding.

Hindari demonstrasi yang dibuat untuk memberi kesan palsu. Jika membandingkan dua produk, jelaskan kondisi pengujian dan batasan hasilnya.

**Jika belum punya produk:** jangan mengambil video milik penjual atau kreator lain lalu menyajikannya seolah rekamanmu sendiri. Buat video edukasi berbasis teks dan ilustrasi yang kamu miliki atau punya izin memakainya, dan cantumkan sumber informasi bila relevan.

### 3.7 Editing Video

Editing membuat konten lebih mudah dipahami dan membuang bagian yang tidak perlu.

**Urutan editing sederhana (8 langkah):**

1. Pilih rekaman yang paling relevan.
2. Potong jeda yang tidak perlu.
3. Susun gambar sesuai urutan penjelasan.
4. Tambahkan voice-over jika perlu.
5. Tambahkan subtitle.
6. Periksa volume audio.
7. Periksa akurasi teks dan klaim.
8. Tinjau hasil akhir sebelum publikasi.

Mulai dengan fitur editing bawaan smartphone atau aplikasi gratis. Kamu tidak perlu membeli aplikasi berbayar di tahap awal.

Jangan mengedit berlebihan sampai demonstrasi sulit dipahami atau informasi penting hilang.

### 3.8 Subtitle dan Teks Layar

Subtitle membantu audiens memahami video saat mereka tidak memakai suara atau berada di tempat bising.

**Prinsip subtitle:**

- Pakai ukuran yang mudah dibaca.
- Pastikan kontras teks cukup.
- Hindari terlalu banyak kata dalam satu tampilan.
- Periksa ejaan dan istilah produk.
- Jangan menutupi bagian penting demonstrasi.
- Pastikan teks sesuai dengan ucapan.

Teks layar bisa menyoroti satu poin penting, misalnya "Periksa dimensi sebelum membeli". Sampaikan satu ide utama pada satu bagian video.

### 3.9 Tempo dan Retensi

Retensi menunjukkan seberapa lama penonton bertahan menonton konten, sesuai metrik yang disediakan platform.

Hal yang membantu retensi:

- Pembukaan langsung membahas masalah.
- Tidak ada pengantar panjang yang tidak perlu.
- Visual sesuai penjelasan.
- Informasi disusun logis.
- Demonstrasi memperlihatkan hal yang dijanjikan.
- Kesimpulan memberi jawaban yang jelas.

Jangan sengaja menahan informasi sederhana sampai akhir hanya untuk memperpanjang durasi. Tujuannya bukan sekadar membuat penonton bertahan, tetapi membantu mereka mendapat manfaat dari konten.

### 3.10 Format Vertikal dan Horizontal

| Format | Kegunaan umum |
| --- | --- |
| Vertikal 9:16 | Video pendek seperti Reels dan Shorts |
| Horizontal 16:9 | Video YouTube panjang dan tutorial tertentu |
| Persegi 1:1 | Beberapa format feed dan materi visual |

Pilih format berdasarkan channel dan penempatan konten. Jika satu materi dipakai di beberapa platform, periksa ulang framing, subtitle, dan rasio gambar. Jangan sekadar memotong video tanpa memastikan produk dan teks tetap terlihat.

### 3.11 Thumbnail

Thumbnail adalah gambar representasi video pada penempatan tertentu. Thumbnail lebih relevan untuk beberapa format YouTube dan tampilan profil tertentu daripada untuk semua video pendek.

**Prinsip thumbnail:**

- Fokus pada satu ide.
- Pakai gambar yang relevan.
- Pastikan produk mudah dikenali.
- Hindari teks yang terlalu kecil.
- Jangan pakai gambar atau hasil yang menyesatkan.

Thumbnail menarik tidak bisa menggantikan konten yang lemah.

### 3.12 Penggunaan Materi Visual yang Sah

Materi visual mencakup foto, video, musik, ilustrasi, logo, dan gambar produk. Sebelum memakainya, periksa:

- Siapa pemilik materi?
- Apakah penggunaan komersial diizinkan?
- Apakah perlu mencantumkan atribusi?
- Apakah izin berlaku untuk platform yang kamu pakai?
- Apakah ada larangan mengubah atau mengedit materi?

**Foto yang tersedia secara publik tidak otomatis bebas dipakai untuk promosi affiliate.**

Utamakan rekaman sendiri, materi yang secara eksplisit diizinkan untuk penggunaanmu, atau aset dengan lisensi yang sesuai.

### 3.13 Workflow Produksi Tanpa Modal

Workflow adalah urutan kerja yang membuat produksi lebih efisien.

1. Riset topik dan kebutuhan audiens.
2. Tulis hook dan naskah.
3. Rekam materi visual.
4. Edit dan tambahkan subtitle.
5. Periksa kualitas dan kepatuhan.
6. Publikasikan dan catat performa.

Untuk menghemat waktu, kelompokkan pekerjaan dalam sesi: riset topik, penulisan skrip, perekaman, editing, dan evaluasi. Namun produksi berkelompok hanya efektif jika tidak mengorbankan relevansi tiap konten.

---

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Framing | Cara menempatkan objek di dalam gambar |
| Wide shot | Framing yang menunjukkan produk dan lingkungan penggunaannya |
| Medium shot | Framing yang menunjukkan produk saat digunakan |
| Close-up | Framing yang menampilkan detail, tombol, bahan, atau mekanisme |
| Retensi | Ukuran seberapa lama penonton bertahan menonton konten, sesuai metrik platform |
| Thumbnail | Gambar representasi video pada penempatan tertentu |
| Materi visual | Foto, video, musik, ilustrasi, logo, dan gambar produk |
| Workflow | Urutan kerja yang membuat produksi lebih efisien |
| Voice-over | Narasi suara yang ditambahkan, dipakai jika suara saat merekam demonstrasi tidak jelas |

---

## 5. Langkah Praktik

**Workflow produksi tanpa modal (6 langkah):** riset topik dan kebutuhan audiens → tulis hook dan naskah → rekam materi visual → edit dan tambahkan subtitle → periksa kualitas dan kepatuhan → publikasikan dan catat performa.

**Urutan editing (8 langkah):** pilih rekaman relevan → potong jeda → susun sesuai urutan penjelasan → tambah voice-over bila perlu → tambah subtitle → periksa volume audio → periksa akurasi teks dan klaim → tinjau hasil akhir sebelum publikasi.

---

## 6. Contoh dan Template

Modul ini tidak punya rumus angka. Bagian ini berisi spesifikasi dan templatenya.

**Spesifikasi teknis:**

- Video vertikal pendek: **1080 × 1920 piksel** atau rasio **9:16** sebagai titik awal praktis (jika perangkat mendukung).
- Horizontal **16:9** untuk video YouTube panjang dan tutorial tertentu.
- Persegi **1:1** untuk beberapa format feed dan materi visual.

**Contoh set shot untuk satu produk (stand laptop):** wide shot seluruh meja kerja → medium shot stand dan laptop dalam posisi penggunaan → close-up mekanisme pengaturan tinggi.

**Contoh teks layar:** "Periksa dimensi sebelum membeli".

**Contoh kasus pencahayaan:** organizer putih dengan latar terlalu putih membuat bentuk produk sulit dibedakan. Pakai latar yang kontras secukupnya.

**Template produksi (untuk Tugas 4):** simpan format naskah, template subtitle, daftar pemeriksaan (checklist Quality Control di bagian 8), dan struktur editing agar bisa dipakai ulang.

---

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Sibuk mempercantik video padahal konten tidak menjawab kebutuhan audiens | Prioritaskan relevansi isi lebih dulu |
| Gerakan kamera berlebihan saat memperlihatkan detail | Stabilkan dengan tripod, tumpukan buku, atau permukaan stabil |
| Mengandalkan resolusi tinggi saja | Perhatikan juga fokus, pencahayaan, dan kestabilan |
| Cahaya dari belakang membuat produk gelap | Hadapkan produk ke sumber cahaya |
| Latar terlalu mirip warna produk | Pakai latar yang kontras secukupnya |
| Mengubah warna lewat editing sampai berbeda jauh dari produk asli | Dilarang karena menyesatkan |
| Objek terlalu kecil di frame | Perbesar sampai bagian yang dijelaskan terlihat |
| Memakai musik tanpa hak atau izin | Pastikan hak atau izin, termasuk penggunaan komersial |
| Demonstrasi dibuat untuk kesan palsu | Jelaskan kondisi pengujian dan batasan hasil |
| Memakai video penjual atau kreator lain seolah rekaman sendiri | Dilarang; buat video edukasi dari materi yang berhak kamu pakai |
| Editing berlebihan | Jaga agar demonstrasi tetap mudah dipahami dan informasi penting tidak hilang |
| Subtitle menutupi demonstrasi atau terlalu banyak kata | Ikuti prinsip subtitle di 3.8 |
| Menahan informasi sederhana sampai akhir demi durasi | Dilarang; tujuannya manfaat bagi penonton |
| Memotong video lintas platform tanpa cek framing | Periksa ulang framing, subtitle, dan rasio |
| Menganggap foto publik bebas dipakai | Foto publik tidak otomatis bebas dipakai untuk promosi affiliate |
| Berpura-pura sudah melakukan demonstrasi atau pengujian | Dilarang; lihat Tugas 1 |

---

## 8. Tugas dan Checklist

**Checklist Quality Control sebelum publikasi**

- [ ] Produk terlihat jelas.
- [ ] Audio dapat dipahami.
- [ ] Hook sesuai dengan isi.
- [ ] Demonstrasi akurat.
- [ ] Subtitle tidak mengandung kesalahan.
- [ ] Tidak ada klaim tanpa bukti.
- [ ] Materi visual digunakan secara sah.
- [ ] CTA relevan.
- [ ] Pengungkapan affiliate tersedia sesuai kebutuhan.
- [ ] Link dan penempatan promosi sesuai aturan.
- [ ] Informasi harga dan stok tidak menyesatkan.

**Tugas 1 — Produksi 10 video**

- [ ] Buat 3 video edukasi.
- [ ] Buat 3 video demonstrasi atau analisis produk.
- [ ] Buat 2 video perbandingan.
- [ ] Buat 2 video jawaban keberatan.

Sesuaikan format dengan akses ke produk. **Jika tidak punya produknya, jangan berpura-pura sudah melakukan demonstrasi atau pengujian.**

**Tugas 2 — Buat variasi pembukaan.** Rekam satu topik dengan tiga pembukaan: berbasis masalah, berbasis demonstrasi, dan berbasis pertanyaan perbandingan.

**Tugas 3 — Evaluasi kualitas.** Tinjau setiap video dengan checklist Quality Control, lalu catat masalah utama yang harus diperbaiki.

**Tugas 4 — Buat template produksi.** Simpan format naskah, template subtitle, daftar pemeriksaan, dan struktur editing yang bisa dipakai ulang.

---

## 9. Latihan dan Kunci Jawaban

**1. Urutkan prioritas kualitas video.**
Isi konten relevan → produk dan demonstrasi terlihat jelas → audio dapat dipahami → pembukaan langsung menuju topik → editing membantu pemahaman → CTA sesuai dengan isi konten.

**2. Resolusi atau rasio apa yang menjadi titik awal praktis untuk video vertikal pendek?**
1080 × 1920 piksel atau rasio 9:16, jika perangkat mendukung.

**3. Sebutkan tiga framing dasar dan fungsinya.**
Wide shot (produk dan lingkungan penggunaannya), medium shot (produk saat digunakan), close-up (detail, tombol, bahan, atau mekanisme).

**4. Kamu belum punya produk fisiknya. Apa yang boleh dan tidak boleh dilakukan?**
Tidak boleh mengambil video milik penjual atau kreator lain lalu menyajikannya seolah rekamanmu sendiri, dan tidak boleh berpura-pura sudah mendemonstrasikan atau menguji produk. Boleh membuat video edukasi berbasis teks dan ilustrasi yang kamu miliki atau punya izin memakainya, dengan mencantumkan sumber informasi bila relevan.

**5. Apakah foto yang tersedia publik bebas dipakai untuk promosi affiliate?**
Tidak. Periksa pemilik, izin komersial, kebutuhan atribusi, keberlakuan izin di platform, dan larangan mengedit.

**6. Mengapa menahan informasi sederhana sampai akhir video tidak dianjurkan?**
Karena tujuannya bukan sekadar membuat penonton bertahan, tetapi membantu mereka mendapat manfaat dari konten.

---

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika kamu bisa menghasilkan konten orisinal dengan visual jelas, audio yang dapat dipahami, pesan akurat, dan proses produksi yang bisa diulang.
', 'Modul 11', 15, false, 15, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l16', 'm03', 'Modul 12 — SEO dan Konten Berbasis Pencarian', 'modul-12-seo-dan-konten-berbasis-pencarian', '# Modul 12 — SEO dan Konten Berbasis Pencarian

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Menjelaskan search intent dan mencocokkannya dengan format konten.
- Melakukan riset kata kunci tanpa modal.
- Membedakan kata kunci informasional, komersial, transaksional, dan navigasional.
- Menemukan long-tail keyword dan memperlakukannya sebagai hipotesis.
- Menulis judul dan deskripsi yang relevan.
- Menyusun artikel panduan dan buying guide.
- Membuat perbandingan produk tanpa mengarang data.
- Mengukur performa traffic pencarian.
- Menerapkan SEO yang bermanfaat dan tidak menyesatkan.

---

## 2. Ringkasan Konsep Utama

1. SEO adalah upaya meningkatkan peluang halaman ditemukan lewat hasil pencarian organik. SEO tidak menjamin posisi teratas dan bukan menumpuk kata kunci.
2. Ada empat jenis kata kunci berdasarkan search intent: informasional, komersial, transaksional, dan navigasional. Daftar yang sama ada di Modul 04.
3. Konten affiliate tidak selalu jawaban terbaik untuk intent navigasional.
4. Riset kata kunci bisa dilakukan tanpa modal. Setiap sumber punya keterbatasan: saran otomatis bukan bukti volume, dan Google Trends menunjukkan minat relatif.
5. Long-tail keyword lebih spesifik. Persaingan rendah atau volume tinggi hanyalah hipotesis yang perlu diuji.
6. Kelompokkan kata kunci supaya kamu tidak membuat banyak halaman yang menjawab hal yang sama.
7. Judul harus menjelaskan isi dan tidak membuat janji yang tidak didukung.
8. Artikel SEO punya 6 bagian ditambah pengungkapan affiliate. Buying guide punya 9 langkah.
9. Jangan mengarang data untuk mengisi tabel perbandingan.
10. Website baru punya data sangat sedikit. Jangan mengubah strategi drastis karena satu artikel belum mendapat traffic dalam beberapa hari.

---

## 3. Penjelasan

### 3.1 Apa Itu SEO?

SEO (Search Engine Optimization) adalah upaya meningkatkan peluang halaman ditemukan melalui hasil pencarian organik.

Contoh: seseorang mencari "cara memilih rak untuk kamar sempit". Jika artikelmu menjawab kebutuhan itu secara lengkap dan relevan, artikelmu berpeluang ditemukan.

SEO tidak menjamin posisi teratas. Hasilnya bergantung pada kualitas dan relevansi konten, persaingan, kondisi teknis website, dan sistem pencarian. SEO juga tidak berarti menumpuk kata kunci sebanyak mungkin.

### 3.2 Search Intent

Search intent adalah tujuan seseorang saat mencari sesuatu. Memahaminya membantu kamu membuat konten yang sesuai kebutuhan pencari. Penamaan jenisnya sama dengan Modul 04 (lihat Modul 04).

**A. Informasional (informational)** — pengguna ingin tahu sesuatu.

- Contoh: "Cara memilih stand laptop", "Cara merapikan kabel", "Apa fungsi organizer meja?"
- Konten yang cocok: tutorial, penjelasan, panduan, artikel edukasi.

**B. Komersial (commercial investigation)** — pengguna sedang mengevaluasi pilihan sebelum membeli, termasuk perbandingan seperti "A vs B".

- Contoh: "Stand laptop lipat terbaik untuk meja kecil", "Perbandingan dua jenis rak", "Kelebihan dan kekurangan lampu meja tertentu".
- Konten yang cocok: perbandingan, ulasan berbasis bukti, buying guide.

**C. Transaksional (transactional)** — pengguna punya niat lebih kuat untuk membeli atau bertindak.

- Contoh: "Harga stand laptop lipat", "Tempat membeli organizer kabel".
- Konten yang cocok: informasi produk, perbandingan pilihan, atau panduan pembelian yang mengarahkan pembaca ke tempat membeli yang relevan.

**D. Navigasional (navigational)** — pengguna ingin menemukan situs atau halaman tertentu.

- Contoh: mencari nama toko atau merek tertentu.
- Konten affiliate tidak selalu jawaban terbaik. Jangan memaksakan artikel promosi saat pengguna hanya ingin menemukan situs resminya.

### 3.3 Riset Kata Kunci

Kata kunci adalah kata atau frasa yang orang pakai saat mencari informasi. Riset kata kunci membantu kamu menemukan:

- apa yang dicari audiens;
- bagaimana mereka menjelaskan masalahnya;
- seberapa spesifik kebutuhan mereka;
- apakah mereka ingin belajar, membandingkan, atau membeli.

**Sumber riset tanpa modal:**

- Saran otomatis mesin pencari.
- Bagian pertanyaan terkait, jika tersedia.
- Google Trends untuk melihat pola minat pencarian.
- Kolom pencarian platform video.
- Pertanyaan dan komentar audiens.
- Judul dan topik konten yang sudah ada.
- Fitur riset kata kunci gratis.

Setiap sumber punya keterbatasan. **Saran otomatis bukan bukti pasti volume pencarian.** **Google Trends umumnya menunjukkan minat relatif, bukan jumlah pencarian absolut.**

### 3.4 Kata Kunci Informasional dan Komersial

| Jenis | Contoh | Format konten |
| --- | --- | --- |
| Informasional | Cara merapikan kabel meja | Tutorial |
| Informasional | Apa fungsi stand laptop? | Penjelasan |
| Komersial | Stand laptop lipat vs. tetap | Perbandingan |
| Komersial | Stand laptop untuk meja kecil | Buying guide |
| Transaksional | Harga stand laptop aluminium | Informasi produk dan opsi pembelian |

Kata kunci komersial membantu kamu mendekati calon pembeli. Tetapi konversi tidak otomatis lebih tinggi. Kecocokan produk dan kualitas konten tetap menentukan.

### 3.5 Long-Tail Keyword

Long-tail keyword adalah frasa pencarian yang lebih spesifik. Contoh bertingkat:

- Umum: "rak".
- Lebih spesifik: "rak penyimpanan untuk kamar kecil".
- Sangat spesifik: "rak meja tanpa bor untuk ruang kerja sempit".

**Keuntungan kata kunci spesifik:**

- Kebutuhan pencari lebih mudah dipahami.
- Konten bisa menjawab pertanyaan yang lebih terarah.
- Persaingan mungkin lebih rendah daripada kata kunci umum.

Frasa panjang tidak selalu punya persaingan rendah atau volume tinggi. **Anggap itu hipotesis yang perlu diuji.**

### 3.6 Judul dan Deskripsi

Judul harus menjelaskan isi dan sesuai kebutuhan pencari.

- Judul terlalu umum: "Produk yang Wajib Kamu Punya!"
- Judul lebih jelas: "Cara Memilih Stand Laptop untuk Meja Kerja Kecil".

**Judul yang baik:**

- menjelaskan topik;
- memakai bahasa yang dipahami audiens;
- sesuai dengan isi artikel;
- tidak membuat janji yang tidak didukung;
- tidak memaksakan pengulangan kata kunci.

Deskripsi membantu pembaca memahami isi halaman di hasil pencarian. **Mesin pencari tidak selalu memakai deskripsi yang kamu tulis.**

### 3.7 Internal Linking

Internal linking adalah link yang menghubungkan satu halaman ke halaman lain di website yang sama. Contoh: artikel tentang stand laptop bisa mengarah ke:

- panduan memilih lampu meja;
- artikel penataan meja kerja;
- panduan mengatur kabel.

Manfaatnya: pembaca menemukan informasi lanjutan, dan mesin pencari memahami hubungan antarkonten. Pakai link yang relevan saja. Jangan menambah link berlebihan demi menaikkan jumlah klik.

### 3.8 Mengukur Traffic Pencarian

Jika kamu punya website, pantau metrik berikut:

- Tayangan halaman di hasil pencarian.
- Klik dari hasil pencarian.
- CTR pencarian.
- Posisi rata-rata, jika tersedia.
- Kunjungan halaman.
- Klik affiliate link.
- Transaksi dan komisi.

**Google Search Console** membantu memantau performa pencarian Google. Alat analitik website membantu memahami perilaku pengunjung.

Untuk website baru, data bisa sangat sedikit. Jangan mengubah strategi drastis hanya karena satu artikel belum mendapat traffic dalam beberapa hari.

### 3.9 Konten Evergreen dan Pembaruan

Konten evergreen bisa relevan dalam waktu lama, tetapi tetap perlu diperbarui. Periksa secara berkala:

- Apakah informasi masih benar?
- Apakah link masih aktif?
- Apakah produk masih tersedia?
- Apakah harga atau spesifikasi berubah?
- Apakah ada pertanyaan pembaca yang belum terjawab?
- Apakah artikel masih memenuhi kebutuhan pencarian?

Prioritaskan pembaruan yang menambah manfaat bagi pembaca. Jangan hanya mengganti tanggal artikel.

### 3.10 SEO yang Bermanfaat dan Kepatuhan

**Hindari:**

- menyalin artikel orang lain;
- membuat halaman massal yang hampir sama tanpa nilai tambah;
- memasukkan kata kunci berlebihan;
- membuat ulasan palsu;
- mengaku memakai produk yang belum pernah dicoba;
- menyamarkan affiliate link secara menyesatkan;
- mengutamakan komisi hingga mengabaikan kebutuhan pembaca.

Konten affiliate harus membantu pengguna mengambil keputusan, bukan sekadar menjadi halaman perantara.

---

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| SEO (Search Engine Optimization) | Upaya meningkatkan peluang halaman ditemukan melalui hasil pencarian organik |
| Search intent | Tujuan seseorang saat melakukan pencarian |
| Informasional | Pengguna ingin mengetahui sesuatu |
| Komersial | Pengguna sedang mengevaluasi pilihan sebelum membeli, termasuk membandingkan "A vs B" |
| Transaksional | Pengguna punya niat lebih kuat untuk membeli atau bertindak |
| Navigasional | Pengguna ingin menemukan situs atau halaman tertentu |
| Kata kunci | Kata atau frasa yang orang pakai saat mencari informasi |
| Long-tail keyword | Frasa pencarian yang lebih spesifik |
| Buying guide | Panduan yang membantu pembaca memilih produk sesuai kebutuhan |
| Internal linking | Link yang menghubungkan satu halaman ke halaman lain di website yang sama |
| Konten evergreen | Konten yang relevan dalam waktu lama, tetapi tetap perlu diperbarui |

---

## 5. Langkah Praktik

### 5.1 Struktur Artikel SEO (artikel panduan)

Contoh judul: **Cara Memilih Stand Laptop untuk Meja Kerja Kecil**

1. **Pendahuluan** — jelaskan masalah pembaca dan apa yang akan dipelajari.
2. **Bagian 1: Tentukan kebutuhan.** Untuk bekerja, belajar, atau kebutuhan lain?
3. **Bagian 2: Ukur ruang yang tersedia.** Jelaskan dimensi meja dan ruang yang diperlukan.
4. **Bagian 3: Periksa spesifikasi.** Bahas ukuran dudukan, bahan, pengaturan tinggi, dan batasan produk.
5. **Bagian 4: Bandingkan pilihan.** Pakai kriteria yang jelas.
6. **Bagian 5: Kesalahan yang perlu dihindari.** Contoh: membeli tanpa memeriksa dimensi atau kecocokan perangkat.
7. **Bagian 6: Kesimpulan dan pilihan.** Jelaskan jenis produk yang cocok untuk kebutuhan tertentu.
8. **Pengungkapan affiliate** — jelaskan hubungan affiliate jika ada affiliate link.

Ini panduan awal. Sesuaikan dengan kebutuhan pembaca.

### 5.2 Langkah Membuat Buying Guide (9 langkah)

Contoh topik: "Panduan Memilih Organizer Kabel untuk Meja Kerja".

1. Identifikasi tipe pembeli.
2. Tentukan kriteria pemilihan.
3. Kumpulkan spesifikasi produk.
4. Bandingkan beberapa alternatif.
5. Jelaskan kelebihan dan kekurangan yang bisa diverifikasi.
6. Jelaskan siapa yang cocok memakai tiap pilihan.
7. Cantumkan sumber informasi yang relevan.
8. Tambahkan affiliate link sesuai aturan.
9. Periksa ulang harga, stok, dan informasi yang berubah.

Jangan merekomendasikan produk hanya karena komisinya tinggi. Produk yang tidak cocok menurunkan kepercayaan pembaca.

### 5.3 Alur Riset dan Pengelompokan Kata Kunci

Pilih satu kategori produk → kumpulkan 20 frasa → kelompokkan berdasarkan kebutuhan yang sama → tentukan search intent → prioritaskan frasa yang cocok dengan produk dan kebutuhan audiens.

---

## 6. Contoh dan Perhitungan

Modul ini tidak punya rumus. Berikut contoh daftar kata kunci, pengelompokan, dan template tabel perbandingan.

### 6.1 Contoh 20 kata kunci — kategori perlengkapan meja kerja

1. Cara merapikan meja kerja.
2. Cara merapikan kabel meja.
3. Organizer kabel untuk meja kecil.
4. Cara memilih stand laptop.
5. Stand laptop lipat atau tetap.
6. Stand laptop untuk meja kecil.
7. Cara mengukur tinggi stand laptop.
8. Perbedaan stand laptop aluminium dan plastik.
9. Cara memilih lampu meja.
10. Lampu meja untuk ruang kerja kecil.
11. Cara mengatur pencahayaan meja kerja.
12. Rak meja untuk ruang sempit.
13. Cara memilih organizer meja.
14. Organizer meja dengan banyak kompartemen.
15. Perbandingan rak meja terbuka dan tertutup.
16. Cara memilih aksesori meja kerja.
17. Barang yang perlu diperiksa sebelum membeli stand laptop.
18. Cara mengatur ruang kerja minimalis.
19. Cara memilih penyimpanan alat tulis.
20. Panduan menata meja kerja kecil.

**Daftar ini contoh ide, bukan data yang membuktikan semua frasa punya volume pencarian tinggi.**

### 6.2 Contoh pengelompokan kata kunci

- Kelompok A: organisasi kabel.
- Kelompok B: stand laptop.
- Kelompok C: pencahayaan meja.
- Kelompok D: penyimpanan meja.
- Kelompok E: penataan ruang kerja.

Pengelompokan mencegah kamu membuat banyak halaman yang menjawab pertanyaan hampir sama.

### 6.3 Template tabel perbandingan produk

| Kriteria | Produk A | Produk B |
| --- | --- | --- |
| Harga | Periksa harga terkini | Periksa harga terkini |
| Dimensi | Berdasarkan spesifikasi | Berdasarkan spesifikasi |
| Bahan | Berdasarkan informasi resmi | Berdasarkan informasi resmi |
| Fitur | Catat fitur yang tersedia | Catat fitur yang tersedia |
| Cocok untuk | Berdasarkan kebutuhan | Berdasarkan kebutuhan |
| Kekurangan | Jelaskan jika bisa diverifikasi | Jelaskan jika bisa diverifikasi |

**Jangan mengarang data untuk mengisi tabel.** Jika informasi tidak tersedia, tulis bahwa data belum diketahui atau tidak tercantum.

---

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Menganggap SEO menjamin posisi teratas | Ingat bahwa hasil bergantung pada kualitas konten, persaingan, kondisi teknis website, dan sistem pencarian |
| Menumpuk kata kunci | Tulis untuk pembaca, bukan untuk memasukkan kata kunci sebanyak mungkin |
| Memaksakan artikel promosi untuk intent navigasional | Biarkan pengguna menemukan situs resminya |
| Menganggap saran otomatis sebagai bukti volume pencarian | Pakai saran otomatis hanya sebagai ide |
| Menganggap Google Trends sebagai jumlah pencarian absolut | Baca sebagai minat relatif |
| Menganggap long-tail pasti persaingan rendah atau volume tinggi | Anggap sebagai hipotesis dan uji |
| Judul terlalu umum ("Produk yang Wajib Kamu Punya!") | Tulis judul yang menjelaskan topik dan sesuai isi |
| Memaksakan pengulangan kata kunci di judul | Tulis judul yang wajar |
| Membuat banyak halaman yang menjawab pertanyaan hampir sama | Kelompokkan kata kunci lebih dulu |
| Merekomendasikan produk karena komisinya tinggi | Pilih produk yang cocok dengan kebutuhan pembaca |
| Mengarang data tabel perbandingan | Tulis bahwa data belum diketahui atau tidak tercantum |
| Menambah internal link berlebihan demi klik | Pakai link yang relevan saja |
| Mengubah strategi drastis karena satu artikel belum dapat traffic | Tunggu data yang cukup, terutama di website baru |
| Mengganti tanggal artikel tanpa perubahan isi | Perbarui isi yang menambah manfaat pembaca |
| Menyalin artikel, membuat ulasan palsu, mengaku memakai produk yang belum dicoba, menyamarkan affiliate link | Hindari semuanya; lihat bagian 3.10 |

---

## 8. Tugas dan Checklist

**Tugas 1 — Riset 20 kata kunci**

- [ ] Kumpulkan 20 frasa.
- [ ] Catat sumber penemuan.
- [ ] Kelompokkan berdasarkan topik.
- [ ] Tentukan search intent (informasional, komersial, transaksional, atau navigasional).
- [ ] Prioritaskan frasa yang cocok dengan produk dan kebutuhan audiens.

**Tugas 2 — Buat buying guide.** Pilih satu topik dan tulis panduan yang benar-benar membantu pembaca memilih produk.

**Tugas 3 — Buat perbandingan produk.** Bandingkan minimal dua pilihan berdasarkan data yang bisa diverifikasi.

**Tugas 4 — Evaluasi performa pencarian.** Jika data tersedia, catat tayangan, klik, CTR, dan klik affiliate. Jika belum, fokus pada kualitas konten dan pemeriksaan teknis dasar.

---

## 9. Latihan dan Kunci Jawaban

**1. Tentukan search intent dan format konten yang cocok:**

- "Cara merapikan kabel meja" → informasional → tutorial.
- "Stand laptop lipat vs. tetap" → komersial → perbandingan.
- "Harga stand laptop aluminium" → transaksional → informasi produk dan opsi pembelian.

**2. Urutkan dari umum ke sangat spesifik.**
"rak" → "rak penyimpanan untuk kamar kecil" → "rak meja tanpa bor untuk ruang kerja sempit".

**3. Apa keterbatasan saran otomatis dan Google Trends?**
Saran otomatis bukan bukti pasti volume pencarian. Google Trends umumnya menunjukkan minat relatif, bukan jumlah pencarian absolut.

**4. Perbaiki judul "Produk yang Wajib Kamu Punya!".**
Contoh: "Cara Memilih Stand Laptop untuk Meja Kerja Kecil".

**5. Apakah deskripsi yang kamu tulis pasti dipakai mesin pencari?**
Tidak. Mesin pencari tidak selalu memakai deskripsi yang ditulis pemilik website.

**6. Apa yang kamu tulis jika data spesifikasi untuk tabel perbandingan tidak tersedia?**
Tulis bahwa data belum diketahui atau tidak tercantum. Jangan mengarang data.

**7. Alat apa untuk memantau performa pencarian Google?**
Google Search Console. Alat analitik website membantu memahami perilaku pengunjung.

---

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika mampu membuat konten berbasis kebutuhan pencarian, memahami search intent, menulis buying guide, serta memberi informasi dan rekomendasi yang dapat dipertanggungjawabkan.
', 'Modul 12', 15, false, 16, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l17', 'm04', 'Modul 13 — Distribusi dan Community Building', 'modul-13-distribusi-dan-community-building', '# Modul 13 — Distribusi dan Community Building

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Mendistribusikan konten sesuai aturan platform.
- Menjawab pertanyaan audiens dengan akurat.
- Membangun kepercayaan.
- Memakai komentar sebagai sumber riset.
- Mengubah pertanyaan audiens menjadi ide konten.
- Mengelola kritik dan menjaga reputasi.
- Menghindari spam.
- Mengembangkan identitas konten.
- Membuat seri konten berdasarkan kebutuhan nyata.

---

## 2. Ringkasan Konsep Utama

1. Distribusi bukan sekadar memublikasikan konten. Distribusi juga mencakup waktu, format, konteks, dan cara konten ditemukan.
2. Kepercayaan tidak bergantung pada jumlah pengikut. Akun kecil pun bisa membantu calon pembeli jika informasinya berguna dan jujur.
3. Komentar adalah sumber riset kebutuhan, keberatan, dan bahasa calon pembeli. Tetapi komentar satu orang bukan bukti kebutuhan pasar.
4. Alur mengubah pertanyaan menjadi konten: pertanyaan audiens → identifikasi kebutuhan → buat konten jawaban → evaluasi respons.
5. Jawab pertanyaan produk dengan informasi akurat. Mengaku tidak yakin lebih baik daripada memberi informasi salah.
6. Ada tiga jenis respons audiens dengan penanganan berbeda: kritik informatif, ketidaksetujuan wajar, dan spam atau pelecehan.
7. Ada tujuh aktivitas spam yang harus kamu hindari.
8. Identitas konten adalah positioning yang jelas: siapa yang kamu bantu dan atas dasar apa.
9. Community building tidak harus berupa grup khusus. Komunitas bisa tumbuh dari komentar, diskusi, dan kebiasaan audiens mengikuti kontenmu.

---

## 3. Penjelasan

### 3.1 Apa Itu Distribusi Konten?

Distribusi konten adalah proses membantu konten menjangkau audiens melalui channel yang relevan. Distribusi mencakup pemilihan waktu, format, konteks, dan cara konten ditemukan.

**Contoh distribusi:**

- Video pendek dipublikasikan di channel utama.
- Artikel pendukung ditautkan jika platform mengizinkan.
- Pertanyaan audiens dijawab lewat konten lanjutan.
- Panduan yang relevan dibagikan di komunitas yang memperbolehkan promosi.
- Konten lama diperbarui saat informasi penting berubah.

Setiap aktivitas harus bermanfaat dan mengikuti aturan channel.

### 3.2 Membangun Kepercayaan

Kepercayaan memengaruhi apakah audiens mau mempertimbangkan rekomendasimu. **Akun kecil pun bisa membantu calon pembeli jika informasinya berguna dan jujur.**

**Tujuh prinsip membangun kepercayaan:**

1. Jelaskan apa yang kamu ketahui dan yang belum kamu ketahui.
2. Bedakan pengalaman pribadi dari informasi penjual.
3. Tampilkan bukti jika membuat klaim.
4. Jelaskan kekurangan atau batasan yang relevan.
5. Hindari tekanan pembelian.
6. Ungkapkan hubungan affiliate.
7. Perbarui informasi yang sudah tidak akurat.

Jangan menyamarkan promosi sebagai rekomendasi independen jika kamu menerima komisi dari pembelian.

### 3.3 Komentar sebagai Sumber Riset

Komentar memberi tahu kamu kebutuhan, keberatan, dan bahasa yang dipakai calon pembeli.

**Contoh:** pada video tentang stand laptop, audiens bertanya:

- Apakah produk bisa dilipat?
- Apakah cocok untuk perangkat tertentu?
- Berapa ukuran dudukannya?
- Apakah pemasangan memerlukan alat?
- Apakah ada pilihan dengan harga lebih rendah?

Pertanyaan seperti ini bisa menjadi ide konten berikutnya.

Komentar satu orang tidak membuktikan seluruh pasar punya kebutuhan yang sama. **Catat pertanyaan yang berulang dan validasi dengan sumber lain sebelum menjadikannya prioritas.**

### 3.4 Mengubah Pertanyaan Menjadi Konten

1. **Pertanyaan audiens** — "Apakah produk ini cocok untuk meja kecil?"
2. **Identifikasi kebutuhan** — audiens ingin memastikan kecocokan ukuran.
3. **Buat konten jawaban** — tutorial mengukur ruang dan memeriksa dimensi produk.
4. **Evaluasi respons** — periksa apakah konten menjawab pertanyaan dan memicu tindakan yang relevan.

Cara ini menghasilkan konten berdasarkan kebutuhan nyata, bukan sekadar mengikuti tren.

### 3.5 Mengelola Pertanyaan Produk

Jawab pertanyaan produk dengan informasi akurat.

**Pertanyaan tentang harga:**

- Periksa harga terkini.
- Jelaskan bahwa harga bisa berubah, jika relevan.
- Jangan menjanjikan diskon yang belum terverifikasi.

**Pertanyaan tentang spesifikasi:**

- Periksa halaman produk atau sumber resmi.
- Jangan menebak jika data tidak tersedia.
- Jelaskan apa yang perlu diperiksa pembeli.

**Pertanyaan tentang pengalaman penggunaan:**

- Jawab dari pengalaman nyata jika kamu memang pernah mencoba.
- Jika belum, katakan bahwa kamu hanya bisa memberi analisis berdasarkan informasi yang tersedia.

**Jika kamu tidak tahu jawabannya, lebih baik menyampaikan ketidakpastian daripada memberi informasi yang salah.**

### 3.6 Mengelola Kritik

Kritik bisa membantu kamu menemukan masalah pada konten atau rekomendasi. Bedakan tiga jenis respons:

| Jenis respons | Contoh | Tindakan |
| --- | --- | --- |
| A. Kritik yang memberi informasi | Audiens menunjukkan dimensi produk di kontenmu tidak sesuai dengan halaman produk | Verifikasi, koreksi informasi, dan perbarui konten jika perlu |
| B. Ketidaksetujuan yang wajar | Audiens merasa produk terlalu mahal untuk kebutuhan mereka | Jelaskan alternatif atau kriteria pemilihan tanpa memaksakan pembelian |
| C. Spam atau pelecehan | Komentar promosi acak atau serangan pribadi | Pakai fitur moderasi platform sesuai kebijakan. Tidak semua komentar harus ditanggapi |

Jangan menghapus kritik yang valid hanya karena menurunkan kesan positif terhadap produk.

### 3.7 Menghindari Spam

Spam adalah promosi berulang atau tidak relevan yang mengganggu pengguna atau melanggar aturan platform.

**Hindari:**

- mengirim link promosi massal tanpa diminta;
- membanjiri komentar dengan link yang sama;
- mengulang komentar promosi di banyak unggahan;
- mengirim pesan pribadi kepada orang yang tidak meminta rekomendasi;
- memakai bot atau interaksi palsu;
- memanipulasi views, klik, atau transaksi;
- menyamar sebagai pembeli yang puas.

Cara yang lebih baik: buat konten yang menjawab pertanyaan, bagikan informasi di komunitas yang relevan, dan patuhi aturan promosi.

### 3.8 Identitas Konten

Identitas konten membantu audiens memahami fokus dan nilai yang ditawarkan akunmu. Identitas bisa mencakup:

- kategori topik;
- jenis masalah yang diselesaikan;
- gaya penyampaian;
- standar bukti;
- format konten;
- pola visual;
- cara berinteraksi dengan audiens.

**Contoh positioning:**

> "Konten yang membantu pekerja dan pelajar memilih perlengkapan meja kerja berdasarkan fungsi, ukuran, dan anggaran."

Positioning ini lebih jelas daripada "akun rekomendasi produk murah".

Semua video tidak harus terlihat sama. **Konsistensi terutama ada pada manfaat yang diberikan dan jenis kebutuhan yang dilayani.**

### 3.9 Seri Konten Berbasis Pertanyaan

Misalnya kamu menemukan banyak pertanyaan tentang ukuran produk. Kamu bisa membuat seri:

1. Cara membaca dimensi produk.
2. Cara mengukur ruang yang tersedia.
3. Kesalahan memilih ukuran.
4. Cara membandingkan dimensi dua produk.
5. Cara memastikan produk cocok dengan kebutuhan.

Simpan pertanyaan audiens di **bank ide konten**.

**Format bank pertanyaan:**

| Pertanyaan | Frekuensi | Jenis kebutuhan | Ide konten | Prioritas |
| --- | --- | --- | --- | --- |
| Apakah ukurannya cocok? | Catat | Kecocokan | Tutorial pengukuran | Sesuai data |
| Apakah ada pilihan murah? | Catat | Anggaran | Perbandingan harga | Sesuai data |
| Bagaimana cara memasang? | Catat | Penggunaan | Demonstrasi pemasangan | Sesuai data |

**Jangan mengarang frekuensi.** Catat jumlah pertanyaan yang benar-benar kamu temukan.

### 3.10 Community Building

Community building adalah proses membangun hubungan berkelanjutan dengan orang yang punya kebutuhan atau minat serupa. Komunitas tidak harus berupa grup khusus. Komunitas juga bisa berkembang lewat komentar, diskusi, pertanyaan, dan kebiasaan audiens mengikuti kontenmu.

**Cara membangun hubungan:**

- Jawab pertanyaan yang relevan.
- Buat konten lanjutan berdasarkan kebutuhan audiens.
- Pakai bahasa yang konsisten.
- Akui kesalahan saat terjadi.
- Jangan menghakimi pilihan pembeli.
- Beri rekomendasi sesuai kebutuhan, bukan sekadar komisi.
- Dorong diskusi yang bermanfaat.

Jangan memaksakan pembentukan grup jika audiens belum menunjukkan kebutuhan untuk bergabung. Mulailah dari interaksi yang sudah ada.

---

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Distribusi konten | Proses membantu konten menjangkau audiens melalui channel yang relevan; mencakup waktu, format, konteks, dan cara konten ditemukan |
| Spam | Promosi berulang atau tidak relevan yang mengganggu pengguna atau melanggar aturan platform |
| Identitas konten | Hal yang membantu audiens memahami fokus dan nilai yang ditawarkan akun |
| Bank ide konten (bank pertanyaan) | Catatan pertanyaan audiens beserta frekuensi, jenis kebutuhan, ide konten, dan prioritas |
| Community building | Proses membangun hubungan berkelanjutan dengan orang yang punya kebutuhan atau minat serupa |

---

## 5. Langkah Praktik

**Mengubah pertanyaan menjadi konten:** pertanyaan audiens → identifikasi kebutuhan → buat konten jawaban → evaluasi respons.

**Menangani kritik:** klasifikasikan jenis respons (informatif, ketidaksetujuan wajar, atau spam/pelecehan). Lalu verifikasi dan koreksi, jelaskan alternatif, atau pakai fitur moderasi.

**Membangun bank pertanyaan:** catat pertanyaan → kelompokkan berdasarkan masalah → tandai pertanyaan berulang → verifikasi dengan sumber lain → pilih pertanyaan paling relevan untuk dijadikan konten.

---

## 6. Contoh dan Perhitungan

Modul ini tidak punya rumus. Berikut contoh dan templatenya:

- **Pertanyaan audiens pada video stand laptop:** apakah bisa dilipat; apakah cocok untuk perangkat tertentu; berapa ukuran dudukannya; apakah pemasangan memerlukan alat; apakah ada pilihan lebih murah.
- **Alur pertanyaan ke konten:** "Apakah produk ini cocok untuk meja kecil?" → kebutuhan: memastikan kecocokan ukuran → konten: tutorial mengukur ruang dan memeriksa dimensi produk.
- **Contoh positioning:** "Konten yang membantu pekerja dan pelajar memilih perlengkapan meja kerja berdasarkan fungsi, ukuran, dan anggaran."
- **Contoh seri berbasis pertanyaan ukuran:** lima bagian di bagian 3.9.
- **Template bank pertanyaan:** tabel di bagian 3.9.

---

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Mengukur kepercayaan dari jumlah pengikut | Fokus pada informasi yang berguna dan jujur |
| Menyamarkan promosi sebagai rekomendasi independen padahal menerima komisi | Ungkapkan hubungan affiliate |
| Menjadikan komentar satu orang sebagai bukti kebutuhan pasar | Catat pertanyaan berulang dan validasi dengan sumber lain |
| Menjanjikan diskon yang belum terverifikasi | Periksa harga terkini dan jelaskan bahwa harga bisa berubah |
| Menebak spesifikasi saat data tidak tersedia | Periksa halaman produk atau sumber resmi; jelaskan apa yang perlu diperiksa pembeli |
| Menjawab seolah pernah memakai produk | Jika belum mencoba, katakan bahwa jawabanmu analisis dari informasi yang tersedia |
| Memberi informasi salah daripada mengaku tidak tahu | Sampaikan ketidakpastian |
| Menghapus kritik valid demi kesan positif | Verifikasi dan koreksi |
| Merasa wajib menanggapi semua komentar | Spam dan pelecehan tidak perlu ditanggapi |
| Spam link, DM tidak diminta, bot, manipulasi views/klik/transaksi, menyamar sebagai pembeli puas | Hindari semuanya; lihat bagian 3.7 |
| Mengarang frekuensi pertanyaan di bank ide | Catat jumlah pertanyaan yang benar-benar ditemukan |
| Memaksakan pembentukan grup komunitas | Mulai dari interaksi yang sudah ada |

---

## 8. Tugas dan Checklist

**Tugas 1 — Buat bank pertanyaan audiens**

- [ ] Catat pertanyaan yang muncul pada konten.
- [ ] Kelompokkan berdasarkan masalah.
- [ ] Tandai pertanyaan yang berulang.
- [ ] Verifikasi kebutuhan dengan sumber lain.
- [ ] Pilih pertanyaan yang paling relevan untuk dijadikan konten.

**Tugas 2 — Buat konten jawaban.** Pilih tiga pertanyaan dan buat konten yang menjawabnya langsung.

**Tugas 3 — Catat keberatan yang berulang.** Kelompokkan berdasarkan harga, ukuran, kualitas, fitur, penggunaan, dan kecocokan.

**Tugas 4 — Susun seri konten.** Pilih satu kelompok pertanyaan dan buat seri yang menjawabnya bertahap.

**Tugas 5 — Evaluasi kualitas interaksi.** Catat bukan hanya jumlah komentar, tetapi juga:

- Apakah komentar berasal dari audiens yang relevan?
- Apakah ada pertanyaan produk?
- Apakah konten memicu diskusi yang bermanfaat?
- Apakah ada klik atau transaksi yang bisa diukur?
- Apakah ada koreksi atau keluhan yang perlu ditindaklanjuti?

---

## 9. Latihan dan Kunci Jawaban

**1. Apa beda "memublikasikan konten" dan "distribusi konten"?**
Distribusi tidak sekadar memublikasikan. Distribusi juga mencakup waktu, format, konteks, dan cara konten ditemukan.

**2. Seorang penonton menunjukkan dimensi produk di videomu tidak sesuai halaman produk. Jenis respons apa dan apa tindakannya?**
Kritik yang memberi informasi (jenis A). Tindakan: verifikasi, koreksi informasi, dan perbarui konten jika perlu.

**3. Ada yang bertanya spesifikasi yang tidak tercantum di halaman produk. Apa yang kamu lakukan?**
Jangan menebak. Periksa halaman produk atau sumber resmi, dan jelaskan apa yang perlu diperiksa pembeli. Jika tetap tidak tahu, sampaikan ketidakpastian.

**4. Sebutkan minimal lima aktivitas yang termasuk spam.**
Link promosi massal tanpa diminta; membanjiri komentar dengan link yang sama; mengulang komentar promosi di banyak unggahan; pesan pribadi kepada orang yang tidak meminta rekomendasi; bot atau interaksi palsu; memanipulasi views, klik, atau transaksi; menyamar sebagai pembeli yang puas.

**5. Mengapa positioning "akun rekomendasi produk murah" kurang baik?**
Karena kurang jelas. Contoh yang lebih jelas: "Konten yang membantu pekerja dan pelajar memilih perlengkapan meja kerja berdasarkan fungsi, ukuran, dan anggaran."

**6. Apa yang boleh dan tidak boleh diisi di kolom "Frekuensi" bank pertanyaan?**
Isi dengan jumlah pertanyaan yang benar-benar ditemukan. Jangan mengarang frekuensi.

---

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika mampu memakai interaksi audiens sebagai sumber riset, menjawab pertanyaan dengan akurat, mengelola kritik, dan membangun kepercayaan tanpa spam atau manipulasi.

---

# Lampiran — Penutup Level 3

Bagian ini berlaku untuk seluruh Level 3 (Modul 08–13), bukan hanya Modul 13.

## A. Proyek Akhir Level 3 — Sistem Konten Affiliate 30 Hari

Setelah menyelesaikan Modul 08–13, gabungkan semua kemampuanmu menjadi satu sistem kerja. Proyek ini menguji apakah kamu bisa merencanakan, memproduksi, mendistribusikan, dan mengevaluasi konten affiliate secara terukur.

### A.1 Tentukan fondasi strategi

Isi lembar kerja berikut. Tanda (•) di bawah menunjukkan contoh pilihan. Ganti dengan pilihanmu sendiri.

```
Target audiens
[ Contoh: pekerja dengan meja kerja kecil ]

Kategori produk
[ Contoh: perlengkapan meja kerja ]

Channel utama
(•) Shopee Video
( ) TikTok
( ) Instagram Reels
( ) YouTube Shorts
( ) Website dan SEO

Format utama
(•) Video pendek
( ) Artikel
( ) Konten visual
( ) Campuran yang sesuai aturan

Waktu yang tersedia per hari
( ) Kurang dari 1 jam
(•) 1–2 jam
( ) 2–4 jam
( ) Lebih dari 4 jam

Tujuan pengujian awal
( ) Menguji konsistensi publikasi
( ) Menjangkau audiens yang relevan
(•) Mendapatkan klik produk yang relevan
( ) Memvalidasi transaksi dan komisi

Data performa saat ini
(•) Belum ada data
( ) Ada data views dan engagement
( ) Ada data klik
( ) Ada data transaksi dan komisi
```

### A.2 Rencana implementasi 30 hari

| Periode | Fokus | Hasil yang harus dibuat |
| --- | --- | --- |
| Hari 1–3 | Menentukan audiens, produk, dan channel | Dokumen strategi awal |
| Hari 4–7 | Riset masalah dan content pillar | Enam pilar dan bank ide |
| Hari 8–14 | Produksi dan publikasi awal | Konten awal dan baseline |
| Hari 15–21 | Pengujian format, hook, dan CTA | Data pembanding |
| Hari 22–27 | Memperbaiki konten berdasarkan data | Konten hasil perbaikan |
| Hari 28–30 | Evaluasi | Keputusan (Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, atau Hentikan) untuk tiap pendekatan |

Jangan menganggap 30 hari pasti cukup untuk penjualan yang konsisten. Periode ini kerangka pengujian awal, **bukan jaminan hasil**.

### A.3 Dashboard evaluasi

Catat metrik yang tersedia sesuai kemampuan platform.

| Metrik | Pertanyaan yang dijawab |
| --- | --- |
| Jumlah publikasi | Apakah proses produksi berjalan? |
| Views (tayangan) | Apakah konten mendapat distribusi? |
| Retensi | Apakah konten mempertahankan perhatian? |
| Klik produk | Apakah audiens mengambil tindakan? |
| CTR | Apakah elemen yang ditampilkan mendorong klik? |
| Pesanan dan transaksi | Apakah ada pembelian yang tercatat? |
| Komisi Estimasi | Berapa komisi yang diperkirakan? |
| Komisi Pending | Berapa komisi yang masih menunggu validasi? |
| Komisi Disetujui | Berapa komisi yang sudah disetujui? |
| Komisi Dibayarkan | Berapa komisi yang benar-benar dibayarkan? |

Empat status komisi berurutan: Estimasi → Pending → Disetujui → Dibayarkan. Nama di dashboard Shopee bisa berbeda. **Pisahkan keempatnya. Jangan memakai angka estimasi sebagai pendapatan yang pasti diterima.**

### A.4 Aturan pengambilan keputusan

Pakai istilah keputusan berikut setelah mengevaluasi data.

- **Lanjutkan** jika konten relevan, produksi realistis, dan hasil menunjukkan sinyal yang layak diuji lebih jauh.
- **Optimalkan** jika ada hambatan yang bisa diidentifikasi, misalnya hook kurang jelas, demonstrasi membingungkan, atau CTA tidak sesuai.
- **Uji ulang** jika hasil belum jelas atau sampelnya masih kecil.
- **Kurangi prioritas** jika pendekatan itu kalah dari pendekatan lain, tetapi belum perlu dihentikan.
- **Hentikan** pendekatan tertentu jika setelah pengujian yang memadai hasilnya terus buruk atau menimbulkan risiko kepatuhan.
- **Perluas** hanya setelah ada bukti: proses bisa diulang, jalur konversi dipahami, dan ada alasan jelas untuk menambah channel atau format.

Jangan mengubah banyak variabel sekaligus. Jika kamu mengubah topik, hook, durasi, CTA, dan produk bersamaan, kamu sulit tahu perubahan mana yang memengaruhi hasil.

## B. Checklist Kelulusan Level 3

Progres: 0/12

- [ ] Memilih satu channel utama berdasarkan audiens dan produk
- [ ] Membuat baseline performa dan rencana distribusi
- [ ] Menentukan enam content pillar
- [ ] Membuat 30 ide konten dan kalender 30 hari
- [ ] Menulis 30 hook dan 10 skrip video
- [ ] Membuat CTA yang relevan dan transparan
- [ ] Memproduksi 10 konten orisinal
- [ ] Memahami dasar riset kata kunci dan search intent
- [ ] Membuat satu buying guide dan satu perbandingan produk
- [ ] Membangun bank pertanyaan audiens
- [ ] Mengevaluasi klik, transaksi, dan status komisi
- [ ] Memeriksa hak penggunaan materi dan aturan promosi

## C. Kesimpulan Level 3

Di akhir level ini, kamu harus punya lebih dari sekadar kumpulan ide konten. Kamu harus punya sistem yang menghubungkan kebutuhan audiens, pemilihan channel, produksi konten, distribusi, klik produk, dan evaluasi transaksi.

Fokus utamanya adalah menemukan format konten yang bisa kamu produksi secara konsisten, relevan dengan calon pembeli, dan terbukti membantu menghasilkan tindakan yang bernilai.

Views dan pengikut membantu distribusi. Tetapi keputusan bisnis harus berdasarkan data yang paling dekat dengan tujuan akhir: **transaksi yang memenuhi ketentuan program dan komisi yang benar-benar disetujui.**
', 'Modul 13', 15, false, 17, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l18', 'm04', 'Proyek Akhir Level 3: Sistem Konten Affiliate 30 Hari', 'proyek-akhir-level-3-sistem-konten-30-hari', '# Proyek Akhir Level 3: Sistem Konten Affiliate 30 Hari

Rencana publikasi 30 hari ini adalah sistem produksi konten yang terbukti menghasilkan data dan klik organik.

## Alur Pembagian 30 Hari
- **Hari 1–3:** Riset mendalam audiens dan pemilihan 1 channel utama.
- **Hari 4–7:** Kurasi 3–5 produk unggulan di *Product Research Lab* dan catat 10 celah konten di *Research Notes*.
- **Hari 8–14 (Sprint Awal):** Tulis 10 naskah pertama menggunakan formula Hook Bank dan publikasikan minimal 7 konten.
- **Hari 15–21 (Fase Pengujian):** Pantau rasio CTR dan retensi penonton. Analisis format mana yang mendapatkan impresi tertinggi.
- **Hari 22–27 (Fase Optimasi):** Perbaiki titik lemah hook dan perjelas Call-to-Action (CTA).
- **Hari 28–30 (Evaluasi Bulanan):** Lakukan rekonsiliasi data mingguan di *Performance Tracker* dan rumuskan hipotesis eksperimen berikutnya.', 'Lampiran Modul 13', 12, false, 18, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l18', 'm05', 'Modul 14 — Affiliate Link dan Tracking', 'modul-14-affiliate-link-dan-tracking', '# Modul 14 — Affiliate Link dan Tracking

## 1. Tujuan Pembelajaran

Tujuan Level 4 bukan sekadar mendapat banyak views atau klik. Kamu perlu tahu konten mana yang menghasilkan transaksi, produk mana yang menguntungkan, dan perubahan apa yang benar-benar menaikkan komisi.

Setelah modul ini, kamu mampu:

- Menemukan link yang dipakai oleh suatu konten.
- Menentukan produk yang dipromosikan oleh link tersebut.
- Memeriksa apakah link dan halaman tujuan masih benar.
- Membedakan klik, pesanan, transaksi yang memenuhi syarat, dan komisi.
- Menjelaskan perbedaan data internal dan data resmi.
- Mengenali keterbatasan tracking yang tersedia.

## 2. Ringkasan Konsep Utama

1. **Affiliate link** adalah link khusus yang mengandung informasi pelacakan, sehingga sistem affiliate bisa menghubungkan aktivitas dengan akun affiliate-mu.
2. **Klik tidak otomatis menghasilkan komisi.** Hasilnya dipengaruhi aturan atribusi, kelayakan produk, status transaksi, pembatalan, dan ketentuan program.
3. Buat link lewat **mekanisme resmi** Shopee Affiliate. Simpan ke Database Link Affiliate, lalu uji sebelum dipublikasikan.
4. Pengujian link punya tiga aspek: **pemeriksaan teknis, pemeriksaan tujuan, dan pemeriksaan tracking**. Link yang bisa dibuka belum membuktikan atribusi berfungsi.
5. **ID Konten, ID Produk, dan ID Link adalah tiga hal berbeda.** Jangan menyamakannya.
6. **Atribusi** menentukan aktivitas mana yang mendapat kredit atas konversi. Salah satu faktornya adalah *attribution window*.
7. Pisahkan rantai metrik: klik → pesanan tercatat → pesanan dibatalkan atau masih diproses → pesanan memenuhi syarat → komisi (Estimasi → Pending → Disetujui → Dibayarkan).
8. **Rekonsiliasi** membandingkan catatan internal dengan laporan resmi. Selisih tidak otomatis berarti komisi hilang.

## 3. Penjelasan

### 3.1 Pengertian Affiliate Link

Affiliate link adalah link khusus untuk mengarahkan calon pembeli ke produk atau halaman tertentu. Link ini mengandung identitas atau informasi pelacakan yang menghubungkan aktivitas dengan akun affiliate-mu.

Contoh alur sederhana:

- Kamu membuat video tentang rak sepatu.
- Penonton tertarik dan mengeklik link produk.
- Penonton membuka halaman produk di Shopee.
- Penonton membeli.
- Jika transaksi memenuhi persyaratan program, kamu berpotensi mendapat komisi.

Tracking membantu kamu mengetahui hubungan antara konten, link, produk, klik, transaksi, dan komisi berdasarkan data yang tersedia.

### 3.2 Pembuatan Affiliate Link

Buat affiliate link hanya lewat mekanisme resmi program Shopee Affiliate. Nama menu, tampilan, dan prosedur bisa berubah sesuai versi platform dan ketentuan program. Langkah lengkapnya ada di bagian 5.

### 3.3 Pengujian Affiliate Link: Tiga Aspek

**A. Pemeriksaan teknis**

- Link bisa dibuka.
- Tidak ada error.
- Link tidak mengarah ke halaman yang tidak ditemukan.
- Tidak ada pengalihan yang mencurigakan.
- Link bisa dibuka di perangkat yang umum dipakai audiens.

**B. Pemeriksaan tujuan**

- Produk yang muncul sesuai konten.
- Varian, ukuran, warna, atau tipe produk sesuai, jika relevan.
- Toko yang dituju benar.
- Harga dan informasi produk masih masuk akal.
- Halaman tujuan bukan produk lain yang tidak sengaja tertaut.

**C. Pemeriksaan tracking**

- Link dibuat lewat sistem affiliate resmi.
- Link yang dipublikasikan sama dengan link yang dicatat.
- Informasi klik diperiksa lewat dashboard resmi, jika tersedia.
- Jangan langsung menyimpulkan tracking gagal hanya karena laporan belum diperbarui.

Keberhasilan membuka halaman **tidak** membuktikan atribusi berfungsi. Pemeriksaan teknis dan pemeriksaan tracking adalah dua hal berbeda.

### 3.4 Pemeriksaan Halaman Tujuan (Landing Page)

Halaman tujuan adalah halaman yang terbuka setelah seseorang mengeklik affiliate link. Di Shopee Affiliate, biasanya berupa halaman produk atau toko di Shopee. Halaman ini penting karena calon pembeli mengambil keputusan dari informasi di sana.

Periksa:

- Judul produk sesuai yang dijanjikan konten.
- Foto produk jelas.
- Harga masih sesuai dengan informasi di konten.
- Varian yang dibutuhkan tersedia.
- Deskripsi produk cukup jelas.
- Ulasan dan penilaian pembeli bisa diperiksa.
- Reputasi penjual layak dipertimbangkan.
- Stok tersedia, jika informasinya ditampilkan.
- Biaya pengiriman dan ketentuan pembelian tidak membuat penawaran kurang menarik.

### 3.5 Pelacakan Produk per Konten

Catat setiap konten bersama produk dan link yang dipromosikannya. Dengan begitu kamu tahu konten mana yang menghasilkan klik dan transaksi.

Jika dua konten memakai link yang sama dan dashboard tidak menyediakan data per konten, kamu mungkin tidak bisa mengetahui kontribusi masing-masing secara akurat. Karena itu pisahkan tiga identitas:

- **ID Konten:** identitas konten yang kamu publikasikan.
- **ID Produk:** identitas produk yang dipromosikan.
- **ID Link:** identitas link yang dipakai.

### 3.6 Atribusi Affiliate

Atribusi adalah proses menentukan sumber atau aktivitas yang mendapat kredit atas suatu konversi, misalnya pembelian. Dalam affiliate marketing, atribusi menjelaskan apakah suatu transaksi dikaitkan dengan aktivitas affiliate tertentu berdasarkan aturan program.

Alur contoh:

1. Seseorang melihat videomu.
2. Orang itu mengeklik affiliate link.
3. Orang itu membeli produk.
4. Sistem mencatat atau mengaitkan transaksi berdasarkan aturan yang berlaku.

Tidak semua pembelian setelah klik otomatis menjadi transaksi affiliate yang memenuhi syarat. Faktor yang memengaruhi:

- jendela atribusi (*attribution window*);
- ketentuan sumber traffic;
- interaksi dengan affiliate link lain;
- produk yang memenuhi syarat komisi;
- aturan atribusi yang dipakai program;
- pembatalan, retur, atau status transaksi;
- ketentuan khusus program affiliate.

**Attribution window** adalah rentang waktu yang ditetapkan program untuk mengaitkan suatu tindakan, seperti pembelian, dengan interaksi sebelumnya. Contohnya: pembelian hanya dihitung jika terjadi dalam rentang waktu tertentu setelah klik. Ketentuan resmi saat ini dijelaskan di Modul 02. Cek ulang sebelum kamu memakainya.

**Jangan berasumsi bahwa:**

- semua orang yang mengeklik link akan menghasilkan komisi;
- semua pembelian berikutnya pasti dikaitkan denganmu;
- semua produk punya ketentuan komisi yang sama;
- transaksi yang muncul langsung berstatus final.

Pahami atribusi dari aturan aktual program, bukan dari perkiraan pribadi.

### 3.7 Perbedaan Klik, Pembelian, dan Status Komisi

- **Klik:** seseorang membuka atau mengeklik link.
- **Pembelian (pesanan):** seseorang memesan sesuai definisi sistem pelaporan.
- **Transaksi memenuhi syarat:** pesanan yang lolos ketentuan program.

Komisi melewati empat status berurutan:

1. **Estimasi:** perkiraan komisi dari pesanan yang tercatat.
2. **Pending:** menunggu validasi.
3. **Disetujui:** sudah melewati validasi sesuai ketentuan program.
4. **Dibayarkan:** sudah dibayarkan kepadamu.

Nama di dashboard Shopee bisa berbeda (misalnya "Dalam proses" untuk Pending). Cocokkan dengan dashboard yang kamu pakai.

Pisahkan semua ini: klik, pesanan tercatat, pesanan dibatalkan, pesanan masih diproses, pesanan memenuhi syarat, dan keempat status komisi. Pemisahan ini mencegah salah menilai performa bisnis.

### 3.8 Pemeriksaan Kelayakan Transaksi

Transaksi di laporan belum tentu memenuhi semua syarat komisi. Periksa:

- Apakah pesanan tercatat di sistem?
- Apakah produk termasuk produk yang memenuhi syarat?
- Apakah transaksi dibatalkan atau diretur?
- Apakah pesanan sudah menyelesaikan tahap validasi?
- Apakah nilai komisi masih berstatus Estimasi?
- Apakah ada ketentuan program yang membuat transaksi tidak memenuhi syarat?
- Apakah data yang dibandingkan berasal dari periode pelaporan yang sama?

### 3.9 Parameter Tracking (Jika Diizinkan)

Parameter tracking adalah informasi tambahan yang ditempel pada URL untuk membedakan sumber traffic atau kampanye. Dalam pemasaran digital, parameter seperti UTM sering dipakai untuk analisis traffic. Pada affiliate link, penggunaannya harus mengikuti aturan program dan platform.

Contoh URL dengan parameter:

`https://contoh.com/produk?utm_source=tiktok&utm_medium=organic&utm_campaign=rak_sepatu`

URL ini **hanya ilustrasi format tracking, bukan link produk Shopee yang valid.**

Ingat:

- Menambah parameter tidak otomatis membuat transaksi teratribusi.
- Parameter tambahan bisa memengaruhi cara URL diproses.
- Parameter yang tidak didukung bisa dihapus atau membuat link tidak bekerja.
- Parameter eksternal tidak menggantikan tracking resmi Shopee Affiliate.

Jika Shopee tidak mendukung parameter yang kamu butuhkan, pakai alternatif aman: ID Konten dan pencatatan manual di database.

### 3.10 Pengarsipan Affiliate Link

Pengarsipan link adalah menyimpan dan mengelola semua affiliate link secara terstruktur. Manfaatnya:

- link mudah ditemukan dan tidak tertukar;
- produk yang dipromosikan bisa diperiksa lagi;
- perubahan harga dan stok bisa dicatat;
- link yang tidak dipakai mudah dikenali;
- data performa konten lebih mudah dianalisis.

Kamu menyimpan link di Database Link Affiliate. Struktur kolomnya ada di bagian 6.4.

### 3.11 Pemeriksaan Link Rusak

Link rusak adalah link yang tidak lagi membawa pengguna ke tujuan semestinya atau tidak bisa dipakai sebagaimana diharapkan. Penyebabnya:

- produk dihapus;
- halaman produk tidak tersedia;
- link salah disalin;
- URL berubah;
- halaman error;
- pengalihan tidak bekerja;
- produk atau toko berubah.

**Jangan langsung menghapus catatan link lama.** Simpan riwayatnya supaya kamu tahu konten mana yang pernah memakai link itu.

### 3.12 Pelacakan Perubahan Harga dan Stok

Harga dan stok memengaruhi keputusan calon pembeli. Contoh: produk dipromosikan seharga Rp50.000, tetapi saat audiens membuka link harganya Rp75.000. Sebagian calon pembeli mungkin batal karena penawaran tidak sesuai lagi. Perubahan stok juga mengurangi peluang pembelian.

Catat:

- harga saat konten dibuat;
- harga saat konten dipublikasikan;
- harga saat link diperiksa ulang;
- ketersediaan produk;
- varian yang tersedia;
- tanggal pemeriksaan terakhir;
- perubahan penting pada produk.

Kamu tidak perlu memeriksa setiap produk tiap jam. Prioritaskan produk yang sering dipromosikan, banyak diklik, atau besar kontribusinya pada komisi.

### 3.13 Rekonsiliasi Laporan

Rekonsiliasi adalah membandingkan beberapa catatan untuk memastikan data bisa dipahami dan perbedaannya bisa dijelaskan. Bandingkan:

- catatan performa konten;
- data klik yang tersedia;
- laporan pesanan;
- status transaksi;
- laporan komisi;
- catatan pembayaran komisi.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Affiliate link | Link khusus untuk mengarahkan calon pembeli ke produk atau halaman tertentu, berisi informasi pelacakan yang menghubungkan aktivitas dengan akun affiliate |
| Halaman tujuan (landing page) | Halaman yang terbuka setelah seseorang mengeklik affiliate link; di Shopee Affiliate biasanya halaman produk atau toko |
| ID Konten | Identitas konten yang kamu publikasikan |
| ID Produk | Identitas produk yang dipromosikan |
| ID Link | Identitas link yang dipakai |
| Atribusi | Proses menentukan sumber atau aktivitas yang mendapat kredit atas suatu konversi |
| Attribution window | Rentang waktu yang ditetapkan program untuk mengaitkan suatu tindakan, seperti pembelian, dengan interaksi sebelumnya |
| Klik | Seseorang membuka atau mengeklik link |
| Pembelian (pesanan) | Seseorang memesan sesuai definisi sistem pelaporan |
| Komisi Estimasi, Pending, Disetujui, Dibayarkan | Empat status komisi berurutan; Disetujui adalah komisi yang sudah lolos validasi |
| Parameter tracking | Informasi tambahan pada URL untuk membedakan sumber traffic atau kampanye |
| Pengarsipan link | Menyimpan dan mengelola semua affiliate link secara terstruktur |
| Link rusak | Link yang tidak lagi membawa pengguna ke tujuan semestinya |
| Rekonsiliasi | Membandingkan beberapa catatan agar perbedaannya bisa dijelaskan |

## 5. Langkah Praktik

### A. Membuat dan menyimpan affiliate link

1. Pilih produk yang ingin kamu promosikan.
2. Buka fitur pembuatan affiliate link yang resmi.
3. Pilih atau masukkan produk sesuai petunjuk.
4. Buat affiliate link.
5. Salin link yang dihasilkan.
6. Simpan link ke Database Link Affiliate.
7. Hubungkan link dengan konten yang mempromosikan produk. Hubungan ini ada di kolom Link pada Database Konten Affiliate.
8. Uji link sebelum dipublikasikan.

### B. Memindahkan kolom Affiliate Link dari Modul 03

Di Modul 03, Database Konten Affiliate sementara punya kolom "Affiliate Link" bertipe URL. Sekarang pindahkan:

1. Salin setiap URL dari kolom "Affiliate Link" ke Database Link Affiliate (satu baris per link unik, dengan ID Link).
2. Di Database Konten Affiliate, buat kolom Link bertipe Relation ke Database Link Affiliate.
3. Isi kolom Link pada setiap konten dengan link yang sesuai.
4. Pastikan semua konten sudah terhubung, lalu hapus kolom "Affiliate Link" yang lama.

### C. Memeriksa link rusak

1. Buka link dari database.
2. Periksa apakah halaman bisa diakses.
3. Cocokkan produk dan toko dengan catatan.
4. Periksa harga dan ketersediaan produk.
5. Jika bermasalah, catat tanggal dan jenis masalah.
6. Cari produk pengganti jika perlu.
7. Buat affiliate link baru lewat mekanisme resmi.
8. Perbarui database.
9. Periksa lagi semua konten yang memakai link lama.

### D. Rekonsiliasi saat ada selisih

1. Apakah kedua laporan memakai periode yang sama?
2. Apakah satu laporan berisi Estimasi dan yang lain berisi Komisi Disetujui?
3. Apakah ada pembatalan atau penyesuaian?
4. Apakah semua transaksi sudah selesai diproses?
5. Apakah ada transaksi yang belum masuk laporan terbaru?

Jika selisih belum bisa dijelaskan, tandai sebagai masalah yang perlu ditindaklanjuti.

## 6. Contoh dan Perhitungan

Modul ini tidak punya rumus metrik. Rumus dasar ada di Modul 01, 15, dan 16. Berikut tabel contoh dan struktur data. Angka di dalamnya simulasi, bukan tarif resmi Shopee.

### 6.1 Isi Database Konten Affiliate (contoh)

Tabel ini adalah contoh isi Database Konten Affiliate. Kolom Link berisi relasi ke Database Link Affiliate.

| ID Konten | Judul Konten | Produk | Link |
| --- | --- | --- | --- |
| C001 | Rak sepatu untuk kamar sempit | Rak sepatu A | L001 |
| C002 | Perbandingan dua rak sepatu | Rak sepatu A | L001 |
| C003 | Organizer meja kerja | Organizer B | L002 |

Dua konten (C001 dan C002) memakai produk dan link yang sama. Konten C003 mempromosikan produk lain. Jika dashboard tidak menyediakan data per konten, kontribusi C001 dan C002 bisa tidak terbaca.

### 6.2 Contoh corong klik sampai pesanan

| Metrik | Jumlah |
| --- | --- |
| Klik affiliate link | 500 |
| Pesanan tercatat | 20 |
| Pesanan dibatalkan | 3 |
| Pesanan masih diproses | 5 |
| Pesanan selesai dan memenuhi syarat | 12 |

Cek: 12 + 3 + 5 = 20, jadi semua pesanan tercatat sudah terhitung. Angka ini hanya contoh ilustratif.

500 klik tidak sama dengan 500 pembelian. 20 pesanan tercatat juga tidak otomatis berarti 20 pesanan menghasilkan komisi final.

### 6.3 Contoh Estimasi vs Disetujui

Kamu melihat Komisi Estimasi sebesar **Rp500.000**. Beberapa hari kemudian, setelah sebagian transaksi dibatalkan atau divalidasi, Komisi Disetujui menjadi **Rp350.000**.

Estimasi awal belum tentu sama dengan komisi final. Selisih ini tidak selalu berarti sistem salah. Periksa status transaksi dan rincian laporan dulu.

### 6.4 Struktur Database Link Affiliate

Satu link bisa dipakai banyak konten. Karena itu relasi link ke konten diletakkan di Database Konten Affiliate (kolom Link), bukan di database ini.

| Kolom | Tipe | Fungsi |
| --- | --- | --- |
| ID Link | Title | Identitas unik link, mis. L001 |
| Produk | Relation | Produk yang dipromosikan (ke Database Produk Affiliate) |
| Nama Toko | Text | Identitas penjual |
| Affiliate Link | URL | Link resmi yang dipakai |
| Tanggal Dibuat | Date | Waktu pembuatan link |
| Platform | Select | Tempat link dipakai |
| Status Link | Select | Aktif, Perlu Diperiksa, atau Tidak Digunakan |
| Tanggal Pemeriksaan | Date | Waktu terakhir link diperiksa |
| Catatan | Text | Informasi tambahan |

Contoh isi: baris L001 (Rak sepatu A) dan L002 (Organizer B) dari tabel 6.1.

### 6.5 Contoh rekonsiliasi

Catatan internalmu menunjukkan Komisi Estimasi **Rp800.000**, sedangkan dashboard terbaru menunjukkan **Rp650.000**. Jangan langsung menganggap selisih **Rp150.000** sebagai komisi yang hilang. Jalankan lima pemeriksaan di bagian 5.D.

### 6.6 Contoh relevansi halaman tujuan

Konten berjudul "Rak sepatu minimalis untuk kamar sempit" memakai link yang mengarah ke rak besar yang butuh banyak ruang. Link berfungsi secara teknis, tetapi relevansinya rendah. Orang mungkin mengeklik, lalu batal membeli.

Link yang benar bukan hanya yang bisa dibuka, tetapi yang membawa audiens ke produk sesuai ekspektasi mereka.

### 6.7 Contoh perubahan harga

Produk dipromosikan seharga **Rp50.000**. Saat audiens membuka link, harganya menjadi **Rp75.000**. Catat perubahan ini dan perbarui kontenmu.

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Memakai link produk biasa dan menganggapnya affiliate link | Buat link lewat mekanisme resmi Shopee Affiliate |
| Menyalin link yang salah | Cocokkan link yang dipublikasikan dengan yang tercatat |
| Tidak memeriksa apakah link masih mengarah ke produk yang benar | Jadwalkan pemeriksaan dan catat Tanggal Pemeriksaan |
| Memakai satu link tanpa mencatat konten yang memakainya | Isi kolom Link di Database Konten Affiliate |
| Mengubah link tanpa catatan perubahan | Simpan riwayat di kolom Catatan |
| Menganggap semua klik pasti tercatat atau menghasilkan komisi | Pisahkan klik, pesanan, dan komisi |
| Menyimpulkan tracking gagal hanya karena laporan belum diperbarui | Tunggu pembaruan laporan, lalu periksa lagi |
| Menganggap link yang bisa dibuka berarti atribusi berfungsi | Lakukan pemeriksaan teknis dan pemeriksaan tracking |
| Menganggap selisih dengan dashboard sebagai komisi hilang | Lakukan rekonsiliasi lima langkah |
| Menghapus catatan link lama saat mengganti link | Ubah Status Link menjadi Tidak Digunakan, jangan hapus barisnya |

## 8. Tugas dan Checklist

- [ ] **Tugas 1 — Buat Database Link Affiliate** dengan kolom baku di bagian 6.4.
- [ ] **Tugas 2 — Beri ID unik** untuk setiap produk, link, dan konten.
- [ ] **Tugas 3 — Simpan link resmi** yang dihasilkan program.
- [ ] **Tugas 4 — Pindahkan kolom "Affiliate Link"** dari Modul 03 ke database ini dan ganti dengan relasi (bagian 5.B).
- [ ] **Tugas 5 — Hubungkan setiap konten** dengan produk dan link yang dipromosikan.
- [ ] **Tugas 6 — Uji link** dan periksa halaman tujuan.
- [ ] **Tugas 7 — Catat tanggal pemeriksaan** link.
- [ ] **Tugas 8 — Periksa perubahan harga dan stok.**
- [ ] **Tugas 9 — Catat masalah atribusi** yang kamu temukan.
- [ ] **Tugas 10 — Bandingkan catatan internal** dengan dashboard resmi.
- [ ] **Tugas 11 — Pisahkan empat status komisi:** Estimasi, Pending, Disetujui, Dibayarkan.

## 9. Latihan dan Kunci Jawaban

**Soal 1.** Sebuah affiliate link berhasil dibuka dan menampilkan halaman produk tanpa error. Apakah ini membuktikan atribusi berfungsi?
**Jawaban:** Tidak. Pemeriksaan teknis dan pemeriksaan tracking adalah dua hal berbeda.

**Soal 2.** Data contoh: 500 klik, 20 pesanan tercatat, 3 dibatalkan, 5 masih diproses, 12 selesai dan memenuhi syarat. Angka mana yang paling dekat dengan dasar komisi final?
**Jawaban:** 12 pesanan yang selesai dan memenuhi syarat. Ketiga angka tersambung: 12 + 3 + 5 = 20 pesanan tercatat. Pesanan yang masih diproses (5) bisa menambah jumlah yang memenuhi syarat nanti, sedangkan yang dibatalkan (3) tidak. 500 klik bukan 500 pembelian. (Angka ilustratif.)

**Soal 3.** Dua konten (C001 dan C002) memakai ID Link yang sama (L001). Apa risikonya untuk analisis?
**Jawaban:** Jika dashboard tidak menyediakan data per konten, kontribusi transaksi masing-masing konten tidak bisa diketahui secara akurat.

**Soal 4.** Estimasi komisi di catatan internal Rp800.000, dashboard menunjukkan Rp650.000. Apa langkah pertamamu?
**Jawaban:** Jangan langsung menganggap Rp150.000 hilang. Periksa kesamaan periode, apakah satu laporan Estimasi dan lainnya Disetujui, adanya pembatalan atau penyesuaian, apakah semua transaksi selesai diproses, dan apakah ada transaksi yang belum masuk laporan terbaru.

**Soal 5.** Bolehkah menambah parameter UTM pada affiliate link agar transaksi pasti teratribusi?
**Jawaban:** Tidak bisa diasumsikan. Parameter harus mengikuti aturan program dan platform. Parameter tidak otomatis membuat transaksi teratribusi, yang tidak didukung bisa dihapus atau merusak link, dan parameter eksternal tidak menggantikan tracking resmi Shopee Affiliate.

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika mampu menemukan link dan produk yang dipakai suatu konten, memeriksa link dan halaman tujuannya, membedakan klik, pesanan, transaksi memenuhi syarat, dan empat status komisi, serta menjelaskan beda data internal dan data resmi beserta keterbatasan tracking.
', 'Modul 14', 15, false, 18, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l19', 'm04', 'Checklist Publikasi & 11 Butir Quality Control Konten', 'checklist-publikasi-dan-11-butir-qc', '# Checklist Publikasi & 11 Butir Quality Control (QC)

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
11. [ ] **Kepatuhan Aturan Shopee:** Tidak menggunakan logo Shopee resmi secara menyesatkan atau melanggar hak cipta.', 'Modul 11 & 21', 10, false, 19, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l19', 'm05', 'Modul 15 — Conversion Rate Optimization (CRO)', 'modul-15-conversion-rate-optimization', '# Modul 15 — Conversion Rate Optimization (CRO)

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Menghitung conversion rate dengan definisi yang jelas.
- Mengenali kemungkinan kebocoran funnel.
- Menjelaskan penyebab potensial klik tanpa pembelian.
- Memilih optimasi berdasarkan masalah yang sudah teridentifikasi.
- Membuat hipotesis yang bisa diuji.
- Menghindari perubahan yang hanya berdasarkan dugaan.

## 2. Ringkasan Konsep Utama

1. **CRO** adalah proses meningkatkan persentase orang yang melakukan tindakan yang kamu inginkan. Tiap tindakan punya conversion rate berbeda, jadi sebut **konversi apa yang kamu ukur**.
2. **Funnel affiliate** punya 6 tahap: Views → Klik → Pesanan → Transaksi memenuhi syarat → Komisi disetujui → Pembayaran. Setiap tahap bisa bocor.
3. Cari **tahap yang paling bermasalah** sebelum memutuskan perubahan.
4. Elemen yang bisa dioptimalkan: hook, relevansi produk, demonstrasi, CTA, kesesuaian harga dan manfaat, kepercayaan terhadap penjual, dan kualitas halaman tujuan.
5. **Klik tinggi tetapi pesanan rendah tidak otomatis berarti konten buruk.** Masalahnya bisa di halaman produk, harga, kepercayaan penjual, atau ekspektasi yang tidak sesuai.
6. Jawab **keberatan calon pembeli** dengan informasi, bukan klaim yang tidak terbukti.
7. Optimasi harus berbasis **hipotesis yang jelas**. Jangan mengubah banyak faktor sekaligus.

## 3. Penjelasan

### 3.1 Pengertian Conversion Rate Optimization

CRO adalah proses meningkatkan persentase orang yang melakukan tindakan yang kamu inginkan. Dalam affiliate marketing, tindakan itu bisa berupa:

- mengeklik affiliate link;
- membuka halaman produk;
- membeli;
- menyelesaikan transaksi yang memenuhi syarat komisi.

Tiap tindakan punya conversion rate berbeda. Karena itu, jelaskan konversi apa yang sedang kamu ukur.

Angka di modul ini memakai **definisi sederhana untuk latihan**. Jika laporan Shopee memakai definisi klik, pesanan, atau konversi yang berbeda, pakai definisi resmi itu secara konsisten.

Tujuan CRO bukan sekadar membuat orang mengeklik lebih banyak. Tujuannya memperbaiki perjalanan calon pembeli sampai menghasilkan transaksi yang memenuhi syarat.

### 3.2 Funnel Affiliate Marketing

Funnel adalah gambaran tahap yang dilalui seseorang sejak melihat konten sampai komisi dibayarkan. Funnel baku memakai 6 tahap:

| No | Tahap | Keterangan |
| --- | --- | --- |
| 1 | Views | Audiens melihat konten |
| 2 | Klik | Audiens tertarik membuka link |
| 3 | Pesanan | Audiens memesan produk |
| 4 | Transaksi memenuhi syarat | Transaksi memenuhi persyaratan program |
| 5 | Komisi disetujui | Komisi lolos validasi sesuai ketentuan program |
| 6 | Pembayaran | Komisi dibayarkan kepadamu |

Contoh kebocoran per tahap:

- Banyak views tetapi sedikit klik.
- Banyak klik tetapi sedikit pesanan.
- Banyak pesanan tetapi banyak yang dibatalkan.
- Banyak transaksi tetapi komisi per transaksi rendah.

Cari tahap yang paling bermasalah sebelum memutuskan perubahan.

### 3.3 Mengoptimalkan Hook

Hook adalah bagian pembuka konten yang menarik perhatian. Di video pendek, hook muncul di beberapa detik pertama. Di artikel, hook berupa judul dan paragraf pembuka.

Hook yang efektif:

- relevan dengan masalah audiens;
- menjelaskan manfaat atau konflik yang nyata;
- membuat orang ingin tahu kelanjutannya;
- sesuai dengan isi konten;
- tidak memakai klaim menyesatkan.

Hook yang kuat tidak otomatis menghasilkan penjualan. Uji apakah audiens yang tertarik benar-benar mengeklik link dan membeli.

**Cara mengevaluasi hook:**

1. Views.
2. Rasio klik terhadap views (CTR), jika datanya ada.
3. Jumlah klik.
4. Pesanan dan komisi.
5. Kesesuaian audiens dengan produk.

Jangan memilih hook hanya karena views-nya paling tinggi.

### 3.4 Mengoptimalkan Relevansi Produk

Relevansi produk adalah tingkat kesesuaian produk dengan kebutuhan, masalah, dan ekspektasi audiens. Contoh: audiens mencari cara menghemat ruang di kamar kos. Produk yang relevan misalnya rak bertingkat, organizer lipat, atau tempat penyimpanan bawah tempat tidur.

Produk yang tidak relevan mungkin banyak diklik karena tampak menarik, tetapi belum tentu dibeli.

Periksa:

- Apakah produk menyelesaikan masalah yang dibahas?
- Apakah harga sesuai kemampuan target audiens?
- Apakah manfaatnya mudah dipahami?
- Apakah produk sesuai konteks penggunaan?
- Apakah penjual memberi informasi produk yang jelas?
- Apakah kualitas produk didukung bukti yang cukup?

Jangan hanya memilih produk berkomisi tertinggi. Produk berkomisi besar tetapi sulit terjual bisa menghasilkan lebih sedikit daripada produk yang lebih relevan dan lebih sering dibeli.

### 3.5 Mengoptimalkan Demonstrasi Produk

Demonstrasi menunjukkan bagaimana produk bekerja atau dipakai. Demonstrasi biasanya lebih informatif daripada foto produk saja, karena audiens memahami fungsi dan batasannya.

**Prinsip demonstrasi yang baik:**

- Pakai produk yang benar-benar kamu tampilkan, atau jelaskan dengan jujur jika memakai materi resmi penjual.
- Jangan mengaku sudah mencoba produk jika belum.
- Jangan mengedit visual sampai manfaatnya tampak lebih besar dari kenyataan.
- Jangan menyembunyikan keterbatasan yang penting bagi pembeli.
- Pakai bukti yang relevan dengan klaim.

Tujuan demonstrasi bukan memaksa orang membeli, tetapi mengurangi ketidakpastian mereka.

### 3.6 Mengoptimalkan CTA

CTA (call to action) adalah ajakan untuk melakukan tindakan berikutnya. Di affiliate marketing, CTA bisa mengajak audiens memeriksa harga, membaca detail, atau membuka link produk.

Contoh CTA:

- "Cek ukuran dan pilihan warna lewat link produk."
- "Bandingkan harga dan ulasannya sebelum membeli."
- "Lihat detail produk lewat link yang tersedia."

Sesuaikan CTA dengan tahap audiens. Audiens yang baru mengenal produk butuh informasi tambahan. Audiens yang sudah tertarik lebih butuh petunjuk menuju halaman produk.

CTA yang jelas mengurangi kebingungan, **tetapi bukan jaminan pembelian**.

### 3.7 Kesesuaian Harga dan Manfaat

Calon pembeli menimbang apakah manfaat produk sebanding dengan harganya. Nilai yang dirasakan dipengaruhi oleh:

- fungsi produk;
- kualitas bahan;
- daya tahan;
- kemudahan penggunaan;
- biaya pengiriman;
- garansi atau layanan yang tersedia;
- alternatif produk lain;
- risiko membeli produk yang tidak sesuai.

### 3.8 Kepercayaan terhadap Penjual

Kepercayaan memengaruhi keputusan beli, terutama jika calon pembeli belum pernah memakai produk atau membeli dari toko itu. Periksa:

- penilaian dan ulasan pembeli;
- jumlah dan kualitas ulasan yang relevan;
- reputasi toko;
- kejelasan deskripsi;
- foto produk;
- respons penjual, jika informasinya ada;
- kebijakan pengembalian atau garansi.

Jangan hanya melihat angka rating. Baca beberapa ulasan yang relevan dan lihat apakah keluhan pembeli berkaitan dengan kebutuhan audiensmu. Contoh: produk berating tinggi, tetapi beberapa pembeli mengeluh ukurannya terlalu kecil. Jika audiensmu butuh kapasitas besar, keluhan itu penting.

### 3.9 Kualitas Halaman Tujuan

Konten yang bagus bisa kehilangan konversi jika halaman tujuan tidak mendukung keputusan beli. Periksa:

- link mengarah ke produk yang tepat;
- harga dan varian sesuai konten;
- informasi ukuran dan fungsi tersedia;
- foto cukup jelas;
- ulasan bisa dibaca;
- produk tersedia atau ada alternatif yang sesuai;
- tidak ada informasi yang bertentangan dengan konten.

### 3.10 Memahami Keberatan Calon Pembeli

Keberatan adalah alasan yang membuat seseorang ragu atau menunda pembelian. Tabel keberatan ada di bagian 6.3. Jangan menjawab keberatan dengan klaim yang tidak terbukti. Jika produk punya keterbatasan, jelaskan dengan jujur.

### 3.11 Perbandingan Produk

Perbandingan produk membantu audiens memilih alternatif sesuai kebutuhan. Ciri perbandingan yang baik:

- memakai kriteria yang sama;
- menampilkan fakta yang bisa diperiksa;
- menjelaskan kelebihan dan kekurangan;
- tidak membandingkan klaim yang tidak setara;
- memberi rekomendasi sesuai kebutuhan audiens.

Perbandingan juga membantu audiens yang belum siap membeli karena masih menimbang beberapa alternatif.

### 3.12 Analisis Klik tanpa Pembelian

Klik tanpa pembelian tidak otomatis berarti konten gagal. Kemungkinan penyebabnya:

1. Audiens hanya ingin tahu harga.
2. Produk kurang relevan.
3. Harga lebih tinggi dari ekspektasi.
4. Halaman produk kurang meyakinkan.
5. Stok atau varian tidak tersedia.
6. Audiens masih membandingkan alternatif.
7. Transaksi belum selesai.
8. Pelaporan belum diperbarui.
9. Klik dan transaksi tidak terhubung di laporan karena keterbatasan atribusi.

### 3.13 Menghindari Perubahan yang Tidak Terukur

Lakukan optimasi berdasarkan hipotesis yang jelas. Perhatikan faktor lain seperti perbedaan produk, harga, waktu publikasi, dan distribusi views. Jangan menganggap perubahan hasil pasti disebabkan satu faktor jika banyak faktor berubah sekaligus.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Conversion Rate Optimization (CRO) | Proses meningkatkan persentase orang yang melakukan tindakan yang kamu inginkan |
| Funnel | Gambaran tahap yang dilalui seseorang sejak melihat konten sampai pembayaran komisi |
| CTR (Click-through rate) | Klik ÷ Views × 100% (dasar yang dipakai di modul ini adalah views) |
| CVR (Conversion rate) | Pesanan ÷ Klik × 100% |
| Hook | Bagian pembuka konten yang menarik perhatian; di video pendek muncul di beberapa detik pertama, di artikel berupa judul dan paragraf pembuka |
| Relevansi produk | Tingkat kesesuaian produk dengan kebutuhan, masalah, dan ekspektasi audiens |
| Demonstrasi | Cara menunjukkan bagaimana produk bekerja atau dipakai |
| CTA (call to action) | Ajakan untuk melakukan tindakan berikutnya |
| Keberatan | Alasan yang membuat seseorang ragu atau menunda pembelian |

## 5. Langkah Praktik

### A. Alur demonstrasi produk (contoh organizer meja)

1. Tampilkan kondisi meja yang berantakan.
2. Tunjukkan cara memakai organizer.
3. Perlihatkan meja setelah barang ditata.
4. Jelaskan barang apa saja yang bisa dimasukkan.
5. Sebutkan ukuran atau keterbatasan produk jika kamu tahu.
6. Arahkan audiens memeriksa detail produk lewat link.

### B. Mendiagnosis klik tanpa pembelian

Mulai dari data yang paling mudah diperiksa:

- Pastikan link berfungsi.
- Pastikan halaman tujuan benar.
- Periksa harga dan stok.
- Tinjau kesesuaian konten dengan produk.
- Periksa jumlah klik dan pesanan pada periode yang sama.
- Tinjau status transaksi.
- Bandingkan dengan konten lain yang mempromosikan produk serupa.

Jika penyebabnya belum jelas, buat hipotesis dan uji. **Jangan mengganti produk, format konten, dan CTA bersamaan.** Kamu akan sulit tahu faktor mana yang menyebabkan perubahan.

## 6. Contoh dan Perhitungan

Angka di bagian ini simulasi, bukan tarif resmi Shopee.

### 6.1 Contoh CTR dan CVR

Konten tentang botol minum mendapat **10.000 views**, lalu **200 orang mengeklik link produk**.

```
CTR = Klik ÷ Views × 100%
CTR = 200 / 10.000 × 100% = 2%
```

Dari 200 klik itu tercatat **10 pesanan**.

```
CVR = Pesanan ÷ Klik × 100%
CVR = 10 / 200 × 100% = 5%
```

Definisi ini sederhana untuk latihan. Jika laporan Shopee memakai definisi yang berbeda, pakai definisi resmi itu secara konsisten. Rumus yang sama dipakai di Modul 16.

### 6.2 Contoh hook

Produk: organizer meja kerja.

- Hook kurang spesifik: "Ini dia produk yang bagus banget."
- Hook lebih relevan: "Meja kerja penuh barang? Organizer ini bisa membantu memisahkan alat tulis dan aksesori kecil."

Hook kedua lebih jelas karena menyebut masalah dan manfaat.

### 6.3 Tabel keberatan calon pembeli

| Keberatan | Informasi yang perlu disediakan |
| --- | --- |
| Harga terlalu mahal | Perbandingan manfaat dan alternatif |
| Takut kualitas buruk | Ulasan relevan dan bukti yang tersedia |
| Tidak tahu ukuran | Ukuran dan contoh penggunaan |
| Tidak yakin produk cocok | Batasan produk dan konteks penggunaan |
| Khawatir barang tidak sesuai | Foto, deskripsi, dan varian yang jelas |
| Belum membutuhkan sekarang | Informasi yang membantu keputusan tanpa tekanan |

### 6.4 Contoh kesesuaian harga dan manfaat

- Produk A berharga **Rp40.000** dan berfungsi dasar.
- Produk B berharga **Rp70.000**, tetapi berkapasitas lebih besar dan berbahan lebih kuat.

Produk A tidak otomatis lebih baik karena lebih murah. Produk B juga tidak otomatis lebih baik karena fiturnya lebih banyak. Pahami kebutuhan audiens dan tunjukkan perbedaan yang relevan.

### 6.5 Tabel perbandingan produk

| Faktor | Produk A | Produk B |
| --- | --- | --- |
| Harga | Rp40.000 | Rp70.000 |
| Kapasitas | Lebih kecil | Lebih besar |
| Ukuran | Ringkas | Lebih lebar |
| Cocok untuk | Ruang sempit | Penyimpanan lebih banyak |
| Kekurangan | Kapasitas terbatas | Butuh ruang lebih luas |

Angka ini contoh ilustratif, bukan penawaran produk aktual.

### 6.6 Contoh hipotesis yang terukur

> "Jika video menampilkan ukuran organizer secara langsung, rasio pesanan terhadap klik akan meningkat karena calon pembeli bisa menilai kesesuaiannya sebelum membuka link."

Uji hipotesis ini dengan membandingkan konten yang menampilkan ukuran dengan konten yang tidak. Perhatikan perbedaan produk, harga, waktu publikasi, dan distribusi views.

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Terlalu banyak ajakan dalam satu konten | Pilih satu CTA utama |
| CTA tidak berhubungan dengan isi konten | Samakan CTA dengan topik konten |
| Klaim mendesak tanpa bukti, mis. "stok tinggal satu" padahal tidak diketahui | Tulis hanya hal yang kamu ketahui dan bisa dibuktikan |
| Tidak memberi tahu audiens tindakan yang harus dilakukan | Tulis ajakan yang jelas |
| Mengarahkan audiens ke link yang berbeda dari produk yang dibahas | Cocokkan link dengan produk di konten |
| Memilih hook hanya karena views tertinggi | Lihat juga klik, pesanan, dan kesesuaian audiens |
| Memilih produk hanya karena komisi tertinggi | Pilih produk yang relevan dan lebih mungkin dibeli |
| Mengaku sudah mencoba produk, mengedit visual agar manfaat tampak berlebihan, atau menyembunyikan keterbatasan | Tampilkan produk dan keterbatasannya dengan jujur |
| Menjawab keberatan dengan klaim tidak terbukti | Jawab dengan informasi dan bukti |
| Menyimpulkan konten buruk hanya karena klik tinggi dan pesanan rendah | Diagnosis dulu dengan langkah 5.B |
| Mengganti produk, format konten, dan CTA bersamaan | Ubah satu variabel utama |
| Menganggap satu faktor sebagai penyebab padahal banyak yang berubah | Catat semua faktor lain yang berubah |

## 8. Tugas dan Checklist

- [ ] **Tugas 1 — Petakan funnel** dari Views sampai Pembayaran (6 tahap).
- [ ] **Tugas 2 — Catat metrik** pada setiap tahap yang datanya tersedia.
- [ ] **Tugas 3 — Temukan tahap** yang paling banyak kehilangan calon pembeli.
- [ ] **Tugas 4 — Pilih satu masalah** yang ingin diperbaiki.
- [ ] **Tugas 5 — Buat satu hipotesis** yang bisa diuji.
- [ ] **Tugas 6 — Ubah satu variabel utama.**
- [ ] **Tugas 7 — Bandingkan hasil** dengan baseline.
- [ ] **Tugas 8 — Catat faktor lain** yang mungkin memengaruhi hasil.
- [ ] **Tugas 9 — Tentukan keputusan akhir** memakai istilah baku: Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, atau Hentikan. "Perluas" hanya dipertimbangkan setelah ada bukti (lihat Modul 20).

## 9. Latihan dan Kunci Jawaban

**Soal 1.** Sebutkan enam tahap funnel affiliate menurut modul ini.
**Jawaban:** Views → Klik → Pesanan → Transaksi memenuhi syarat → Komisi disetujui → Pembayaran.

**Soal 2.** Kontenmu punya banyak klik tetapi sedikit pesanan. Kesimpulan apa yang TIDAK boleh langsung diambil, dan apa yang harus diperiksa?
**Jawaban:** Jangan langsung menyimpulkan kontennya buruk. Masalahnya bisa di halaman produk, harga, kepercayaan terhadap penjual, atau ekspektasi yang tidak sesuai. Periksa link, halaman tujuan, harga dan stok, kesesuaian konten dengan produk, klik dan pesanan pada periode yang sama, status transaksi, serta bandingkan dengan konten lain untuk produk serupa.

**Soal 3.** Audiens menyatakan "tidak tahu ukuran". Informasi apa yang perlu disediakan?
**Jawaban:** Ukuran dan contoh penggunaan.

**Soal 4.** Mengapa tidak boleh mengganti produk, format konten, dan CTA sekaligus?
**Jawaban:** Karena kamu akan sulit mengetahui faktor mana yang menyebabkan perubahan hasil.

**Soal 5.** Tuliskan satu contoh hipotesis yang bisa diuji.
**Jawaban:** "Jika video menampilkan ukuran organizer secara langsung, rasio pesanan terhadap klik akan meningkat karena calon pembeli bisa menilai kesesuaiannya sebelum membuka link."

**Soal 6.** Sebuah video punya 20.000 views dan 400 klik. Berapa CTR-nya?
**Jawaban:** 400 / 20.000 × 100% = 2%. (Simulasi.)

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika mampu menghitung conversion rate dengan definisi yang jelas, menemukan tahap funnel yang bocor, menjelaskan penyebab klik tanpa pembelian, memilih optimasi sesuai masalah, membuat hipotesis yang bisa diuji, dan tidak mengubah apa pun hanya berdasarkan dugaan.
', 'Modul 15', 15, false, 19, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l20', 'm05', 'Modul 16 — Analytics dan Dashboard', 'modul-16-analytics-dan-dashboard', '# Modul 16 — Analytics dan Dashboard

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Menjelaskan fungsi setiap metrik utama.
- Menghitung metrik dengan rumus yang benar.
- Membaca data tanpa menyamakan klik, pesanan, dan komisi.
- Membandingkan produk dan konten berdasarkan tujuan yang jelas.
- Membuat laporan dengan periode yang konsisten.
- Mengenali data yang belum tersedia atau belum final.
- Mengambil keputusan yang sesuai dengan kualitas bukti.

## 2. Ringkasan Konsep Utama

1. **Analytics** adalah proses mengumpulkan, membaca, membandingkan, dan menafsirkan data untuk membantu mengambil keputusan. Tujuannya menentukan tindakan berikutnya, bukan sekadar melihat hasil masa lalu.
2. **Views, impresi, dan jangkauan adalah tiga hal berbeda.** Definisi tiap metrik mengikuti platform atau sistem pelaporan.
3. Metrik utama modul ini: **CTR, CVR (termasuk CVR valid), EPC, komisi per 1.000 views, AOV, jumlah pesanan, dan rasio pembatalan**.
4. **Jangan membandingkan metrik yang definisinya berbeda** seolah-olah setara.
5. **Komisi estimasi, pending, disetujui, dan dibayarkan** harus dipisahkan di dashboard.
6. Jangan memilih produk atau format konten dari **satu metrik saja**.
7. Bandingkan periode dengan durasi yang sebanding dan data yang sudah cukup lengkap.
8. Data analytics punya keterbatasan. Bedakan Fakta, Estimasi, Hipotesis, dan Keputusan.
9. Dashboard Notion memakai tiga database dari Modul 03 (Produk, Konten, Komisi) yang kamu tambah kolom performanya. Kamu tidak membuat database baru.

## 3. Penjelasan

### 3.1 Pengertian analytics

Analytics membantu menjawab pertanyaan seperti:

- Konten mana yang menghasilkan klik terbanyak?
- Produk mana yang menghasilkan transaksi?
- Berapa komisi yang dihasilkan?
- Berapa banyak pesanan yang dibatalkan?
- Apakah views yang naik juga menaikkan komisi?
- Format konten mana yang paling efektif?
- Produk mana yang layak dipromosikan lagi?

Contoh: video A mendapat 50.000 views tetapi komisinya rendah. Video B mendapat 5.000 views dengan komisi lebih tinggi. Periksa mengapa bisa berbeda. Mungkin audiens B lebih relevan, produknya lebih cocok, atau tingkat pembeliannya lebih baik. Kesimpulan itu harus didukung data, bukan asumsi.

### 3.2 Views dan impresi

- **Views** adalah jumlah tayangan yang tercatat menurut definisi platform.
- **Impresi** adalah jumlah kesempatan konten ditampilkan ke pengguna menurut definisi sistem pelaporan.

Keduanya tidak selalu sama. Satu pengguna bisa menghasilkan lebih dari satu impresi. Definisi views juga berbeda antarplatform, misalnya berdasarkan durasi tonton.

Contoh: sebuah video mendapat 20.000 views, menjangkau 15.000 akun, dan menghasilkan 400 klik affiliate link. Jangkauan (15.000) tidak sama dengan views (20.000).

Views menunjukkan kemampuan konten mendapat perhatian. Views saja tidak menunjukkan minat membeli. Baca views bersama klik, pesanan, dan komisi.

### 3.3 Cara membaca CTR

CTR rendah bisa berarti:

- hook kurang menarik;
- produk kurang relevan;
- manfaat tidak jelas;
- CTA tidak terlihat;
- audiens belum punya alasan untuk mengeklik.

CTR rendah juga bisa berasal dari distribusi ke audiens yang kurang tepat. CTR tinggi belum tentu bagus kalau orang mengeklik karena ekspektasi yang tidak sesuai dengan produk.

Di modul ini CTR dihitung terhadap views, bukan selalu CTR resmi yang ditampilkan platform. Jika yang tersedia adalah impresi, pakai impresi dan beri nama metriknya dengan tepat.

### 3.4 Conversion Rate (CVR)

CVR adalah rasio konversi terhadap jumlah peluang yang menjadi dasar pengukuran. Ada dua versi:

- **CVR** = pesanan ÷ klik.
- **CVR valid** = pesanan yang memenuhi syarat ÷ klik.

CVR valid membedakan performa pesanan awal dari hasil yang lebih dekat dengan komisi aktual. Jangan membandingkan CVR dan CVR valid seolah-olah setara.

### 3.5 Earnings Per Click (EPC)

EPC adalah rata-rata komisi per klik. EPC bisa dihitung dengan komisi estimasi atau komisi disetujui. Pisahkan keduanya dan beri label yang jelas. Utamakan komisi disetujui.

EPC membantu membandingkan monetisasi dari traffic yang berbeda. EPC tinggi belum tentu berarti produk terbaik. Pertimbangkan juga jumlah traffic, konsistensi, kualitas produk, pembatalan, dan kelayakan transaksi.

### 3.6 Komisi per 1.000 views

Metrik ini mengukur rata-rata komisi untuk setiap 1.000 views. Gunanya membandingkan kemampuan konten menghasilkan komisi dari distribusi yang didapat. Perhatikan dua hal:

1. Konten dengan views kecil menghasilkan nilai yang sangat naik-turun.
2. Periode komisi harus sesuai dengan periode views, sejauh data atribusi memungkinkan.

### 3.7 Nilai pesanan rata-rata (AOV)

*Average Order Value* (AOV) adalah rata-rata nilai pesanan menurut definisi transaksi yang dipakai.

**AOV adalah metrik nilai pesanan, bukan pendapatan affiliate.** Kamu tidak otomatis menerima persentase dari seluruh nilai pesanan. Komisi ditentukan oleh ketentuan program, produk, dan transaksi yang memenuhi syarat.

### 3.8 Jumlah pesanan

Jumlah pesanan adalah banyaknya pesanan yang tercatat menurut definisi laporan. Perhatikan statusnya:

- pesanan tercatat;
- pesanan yang masih diproses;
- pesanan dibatalkan;
- pesanan selesai;
- transaksi yang memenuhi syarat komisi.

Pesanan banyak belum tentu berarti komisi besar. Contoh: Produk A menghasilkan 50 pesanan dengan komisi rata-rata kecil, sedangkan Produk B menghasilkan 20 pesanan dengan komisi rata-rata lebih besar. Produk B bisa saja menghasilkan komisi lebih tinggi. Bandingkan dengan data komisi aktual, bukan asumsi.

### 3.9 Pembatalan dan transaksi tidak memenuhi syarat

Pembatalan adalah salah satu penyebab selisih antara pesanan tercatat dan komisi disetujui. Penyebabnya beragam: pembeli berubah pikiran, produk tidak tersedia, atau pesanan tidak diselesaikan.

Pastikan kategori pembatalan dan total pesanan memakai definisi yang konsisten. **Jangan menganggap setiap pembatalan disebabkan oleh konten.** Penyebabnya bisa di luar kendalimu.

### 3.10 Status komisi: estimasi, pending, disetujui, dibayarkan

Komisi melewati empat tahap berurutan. Pisahkan keempatnya di dashboard.

| Status komisi | Pengertian |
| --- | --- |
| Estimasi | Perkiraan komisi yang dilaporkan sebelum validasi selesai |
| Pending | Komisi yang masih menunggu proses validasi atau penyesuaian |
| Disetujui | Komisi yang sudah lolos tahap persetujuan sesuai sistem program |
| Dibayarkan | Komisi yang sudah dibayarkan sesuai ketentuan program |

Nama status di dashboard Shopee bisa berbeda dari tabel ini (misalnya "Dalam proses" untuk Pending). Ikuti definisi di dashboard Shopee Affiliate yang kamu pakai.

### 3.11 Analisis berdasarkan periode

- **Harian**: memantau masalah operasional.
- **Mingguan**: mengevaluasi konten dan produk.
- **Bulanan**: menilai hasil bisnis.

Agar perbandingan dua periode adil:

- Pakai durasi yang sebanding.
- Periksa apakah data sudah lengkap.
- Perhatikan konten yang baru dipublikasikan.
- Perhatikan perubahan harga dan stok.
- Jangan mencampur komisi estimasi dengan komisi disetujui.
- Beri waktu cukup agar transaksi melewati validasi.

### 3.12 Keterbatasan dan kelengkapan data

Data analytics tidak selalu lengkap atau real-time:

- Laporan bisa terlambat diperbarui.
- Tidak semua klik bisa dikaitkan dengan transaksi yang terlihat.
- Dashboard mungkin tidak menyediakan data per konten.
- Satu konten bisa memakai beberapa link.
- Satu link bisa dipakai di beberapa konten.
- Status transaksi bisa berubah.
- Definisi metrik bisa berbeda antarplatform.

Karena itu, selalu bedakan:

- **Fakta**: angka yang tercatat dalam laporan.
- **Estimasi**: angka yang belum final.
- **Hipotesis**: penjelasan yang masih perlu diuji.
- **Keputusan**: tindakan yang dipilih berdasarkan bukti yang ada.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Analytics | Proses mengumpulkan, membaca, membandingkan, dan menafsirkan data untuk membantu mengambil keputusan |
| Views | Jumlah tayangan yang tercatat menurut definisi platform |
| Impresi | Jumlah kesempatan konten ditampilkan ke pengguna menurut definisi sistem pelaporan |
| CTR (Click-Through Rate) | Persentase tayangan (views atau impresi) yang menghasilkan klik |
| CVR (Conversion Rate) | Pesanan ÷ klik |
| CVR valid | Pesanan yang memenuhi syarat ÷ klik; lebih dekat ke komisi aktual |
| EPC (Earnings Per Click) | Rata-rata komisi per klik |
| Komisi per 1.000 views | Rata-rata komisi untuk setiap 1.000 views |
| AOV (Average Order Value) | Rata-rata nilai pesanan; bukan pendapatan affiliate |
| Jumlah pesanan | Banyaknya pesanan yang tercatat menurut definisi laporan |
| Pembatalan | Salah satu penyebab selisih antara pesanan tercatat dan komisi disetujui |
| Komisi estimasi / pending / disetujui / dibayarkan | Empat tahap status komisi (lihat 3.10) |
| Fakta / Estimasi / Hipotesis / Keputusan | Angka tercatat / angka belum final / penjelasan yang perlu diuji / tindakan berdasarkan bukti |

## 5. Langkah Praktik — Membuat Dashboard Affiliate di Notion

Untuk tahap awal, jangan membuat sistem yang rumit. Kamu **tidak membuat database baru**. Pakai tiga database yang sudah kamu bangun di Modul 03, lalu tambahkan kolom yang kurang:

- Database Produk Affiliate
- Database Konten Affiliate
- Database Komisi Affiliate

### Langkah 1 — Database Produk Affiliate

Database ini sudah punya kolom dasar dari Modul 03 (Nama Produk, ID Produk, Kategori, Link Produk, Harga Saat Dicek, Tarif Komisi, Status, Tanggal Pemeriksaan, Catatan). Pastikan kolom itu terisi dan terbaru. Kolom lain seperti Rating, Skor Produk, dan Kelayakan Program ditambahkan di Modul 06 bila sudah kamu pakai. Di modul ini kamu hanya perlu data produk yang rapi sebagai acuan.

### Langkah 2 — Tambah kolom performa di Database Konten Affiliate

| Kolom | Tipe properti Notion |
| --- | --- |
| Views | Number |
| Klik | Number |
| Pesanan | Number |
| Komisi Estimasi | Number |
| Komisi Disetujui | Number |
| Komisi Dibayarkan | Number |
| Catatan Evaluasi | Text |

Kolom lain (Judul Konten, ID Konten, Produk, Kanal, Format, Tanggal Publikasi, URL Konten, Status Konten) sudah ada dari Modul 03. Isi Komisi hanya jika data per konten memang tersedia.

### Langkah 3 — Tambah kolom di Database Komisi Affiliate dan buat "tampilan Performa"

Database Komisi Affiliate dari Modul 03 sudah punya Periode, Komisi Estimasi, Komisi Pending, Komisi Disetujui, Komisi Dibayarkan, Biaya Usaha, Bukti Pembayaran, dan Catatan. Tambahkan kolom berikut:

| Kolom | Tipe properti Notion |
| --- | --- |
| Tanggal Mulai | Date |
| Tanggal Akhir | Date |
| Produk | Relation (opsional) |
| Klik | Number |
| Pesanan | Number |
| Pesanan Dibatalkan | Number |
| Jam Kerja | Number |

"Tampilan Performa" bukan database baru. Itu adalah **view** (tabel atau board) dari Database Komisi Affiliate. Atur view itu untuk menampilkan Periode, Tanggal Mulai, Tanggal Akhir, Klik, Pesanan, Pesanan Dibatalkan, dan keempat jenis komisi. Satu baris mewakili satu periode (misalnya satu minggu).

### Langkah 4 — Tambah properti formula

Tambahkan formula untuk CTR, CVR, dan EPC bila datanya tersedia. **Jangan memaksakan metrik yang tidak bisa dihitung dengan benar.** Jika kamu belum punya data komisi per konten, jangan membagi komisi total produk secara sembarangan ke setiap konten.

Formula memakai nama properti persis: Views, Klik, Pesanan, Komisi Disetujui.

CTR terhadap views (di Database Konten):

```
if(prop("Views") > 0, prop("Klik") / prop("Views"), 0)
```

CVR pesanan terhadap klik:

```
if(prop("Klik") > 0, prop("Pesanan") / prop("Klik"), 0)
```

EPC berdasarkan komisi disetujui:

```
if(prop("Klik") > 0, prop("Komisi Disetujui") / prop("Klik"), 0)
```

Rumus ini mengasumsikan nama properti persis seperti di atas dan periode serta definisinya konsisten. Atur format hasil CTR dan CVR menjadi persentase.

### Prinsip pencatatan

- Catat tanggal periode secara konsisten.
- Jangan mengisi data yang tidak tersedia dengan perkiraan tanpa label.
- Jangan menjumlahkan laporan mingguan yang saling tumpang tindih.
- Pisahkan data per konten jika tersedia.
- Jika data hanya tersedia per produk atau akun, catat pada tingkat itu.
- Simpan sumber data dan tanggal pengambilan laporan.

## 6. Contoh dan Perhitungan

Semua angka di bagian ini adalah simulasi, bukan tarif resmi Shopee.

### 6.1 CTR — Click-Through Rate

```
CTR = Klik ÷ Views × 100%
```

Contoh: Views 10.000, Klik 300.

```
CTR = 300 ÷ 10.000 × 100% = 3%
```

Artinya ada 3 klik untuk setiap 100 views. Ini CTR terhadap views, bukan selalu CTR resmi platform.

### 6.2 CVR pesanan terhadap klik

```
CVR = Pesanan ÷ Klik × 100%
```

Contoh: Klik 400, Pesanan 20.

```
CVR = 20 ÷ 400 × 100% = 5%
```

Artinya ada 5 pesanan per 100 klik.

### 6.3 CVR valid

```
CVR valid = Pesanan yang memenuhi syarat ÷ Klik × 100%
```

Lanjutan contoh 6.2: dari 400 klik ada 20 pesanan (CVR 5%). Dari 20 pesanan itu, 15 memenuhi syarat.

```
CVR valid = 15 ÷ 400 × 100% = 3,75%
```

Penyebutnya tetap **klik** (400), bukan pesanan (20). Jangan tertukar dengan hitungan lain:

```
15 ÷ 20 × 100% = 75%
```

Angka 75% adalah persentase pesanan yang memenuhi syarat. Itu bukan CVR valid. Ringkasnya: CVR 5% (20 dari 400 klik), CVR valid 3,75% (15 dari 400 klik), pesanan memenuhi syarat 75% (15 dari 20 pesanan). Jangan membandingkan ketiganya seolah-olah setara.

### 6.4 EPC — Earnings Per Click

```
EPC = Komisi ÷ Jumlah Klik
```

Contoh: Klik 500, komisi untuk analisis Rp250.000.

```
EPC = 250.000 ÷ 500 = Rp500
```

Setiap klik menghasilkan rata-rata Rp500 untuk jenis komisi dan periode yang dipakai.

Perbandingan EPC antarproduk (komisi disetujui):

| Produk | Klik | Komisi disetujui | EPC |
| --- | --- | --- | --- |
| Produk A | 1.000 | Rp300.000 | Rp300 |
| Produk B | 500 | Rp250.000 | Rp500 |

Produk B punya EPC lebih tinggi walau kliknya lebih sedikit. Namun belum tentu B pilihan terbaik. Pertimbangkan juga jumlah traffic, konsistensi, kualitas produk, pembatalan, dan kelayakan transaksi.

### 6.5 Komisi per 1.000 views

```
Komisi per 1.000 views = Komisi ÷ Views × 1.000
```

Contoh: Views 50.000, komisi disetujui Rp500.000.

```
500.000 ÷ 50.000 × 1.000 = Rp10.000
```

Konten ini menghasilkan Rp10.000 komisi disetujui per 1.000 views.

### 6.6 AOV — Nilai pesanan rata-rata

```
AOV = Total Nilai Pesanan ÷ Jumlah Pesanan
```

Contoh: total nilai pesanan Rp2.000.000, jumlah pesanan 40.

```
AOV = 2.000.000 ÷ 40 = Rp50.000
```

### 6.7 Rasio pembatalan

```
Rasio pembatalan = Pesanan dibatalkan ÷ Total pesanan × 100%
```

Contoh: total pesanan 100, dibatalkan 10. Rasio pembatalan = 10 ÷ 100 × 100% = 10%.

### 6.8 Contoh status komisi

Komisi estimasi Rp1.000.000, komisi disetujui Rp800.000, komisi dibayarkan Rp600.000. Angka ini hanya ilustrasi.

Jangan langsung menyimpulkan bahwa Rp400.000 hilang. Mungkin ada transaksi yang masih diproses, jadwal pembayaran yang belum tiba, atau penyesuaian yang perlu diperiksa. Untuk menghitung hasil bisnis, kamu harus tahu angka mana yang masih estimasi dan mana yang sudah dibayarkan.

### 6.9 Perbandingan produk di dashboard

| Produk | Klik | Pesanan | Komisi disetujui | EPC |
| --- | --- | --- | --- | --- |
| Organizer A | 400 | 20 | Rp200.000 | Rp500 |
| Rak B | 600 | 15 | Rp150.000 | Rp250 |
| Lampu C | 200 | 12 | Rp180.000 | Rp900 |

Data ini contoh latihan. Lampu C punya EPC tertinggi, tetapi Organizer A menghasilkan total komisi lebih besar. Keputusan bergantung pada tujuan:

- Mencari efisiensi per klik: pakai **EPC**.
- Mencari kontribusi komisi total: pakai **jumlah komisi**.
- Mencari peluang menaikkan skala: periksa juga apakah traffic bisa naik tanpa menurunkan kualitas konversi.

**Jangan memilih produk dari satu metrik saja.**

### 6.10 Perbandingan format konten

Format yang bisa dibandingkan: demonstrasi produk, tutorial, perbandingan produk, daftar rekomendasi, pemecahan masalah, dan review berbasis informasi yang dapat diverifikasi.

| Format | Jumlah konten | Total views | Total klik | Komisi | CTR | EPC |
| --- | --- | --- | --- | --- | --- | --- |
| Demonstrasi | 10 | 50.000 | 1.000 | Rp500.000 | 2% | Rp500 |
| Perbandingan | 8 | 30.000 | 900 | Rp600.000 | 3% | Rp667 |
| Tutorial | 12 | 60.000 | 600 | Rp240.000 | 1% | Rp400 |

Angka ini hanya ilustrasi. CTR = klik ÷ views. EPC = komisi ÷ klik (dibulatkan ke rupiah).

Jangan langsung menyimpulkan bahwa format perbandingan selalu lebih baik. Produk, harga, waktu publikasi, distribusi, dan kualitas tiap konten mungkin berbeda. Pakai data ini untuk menentukan eksperimen berikutnya (Modul 17).

### 6.11 Analisis berdasarkan periode

| Periode | Klik | Komisi disetujui | EPC |
| --- | --- | --- | --- |
| Minggu 1 | 1.000 | Rp300.000 | Rp300 |
| Minggu 2 | 1.200 | Rp360.000 | Rp300 |
| Minggu 3 | 1.500 | Rp375.000 | Rp250 |
| Minggu 4 | 1.800 | Rp450.000 | Rp250 |

Klik naik terus, tetapi komisi tidak naik secepat itu. EPC turun dari Rp300 ke Rp250. Periksa komposisi produk, tingkat pembatalan, dan status transaksi.

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Menganggap jangkauan sama dengan views | Catat definisi tiap metrik dan jangan campur |
| Menganggap CTR tinggi otomatis bagus | Cek juga pesanan; klik bisa datang dari ekspektasi yang salah |
| Membandingkan CVR dengan definisi berbeda | Pilih satu definisi (CVR atau CVR valid) dan pakai konsisten |
| Mencampur komisi estimasi dan disetujui saat menghitung EPC | Beri label jenis komisi di setiap angka |
| Menganggap AOV sebagai pendapatan affiliate | Ingat: AOV adalah nilai pesanan, bukan komisi |
| Menyimpulkan pesanan tinggi pasti berarti komisi tinggi | Bandingkan komisi aktual |
| Menganggap setiap pembatalan disebabkan konten | Periksa penyebab lain sebelum mengubah konten |
| Menganggap selisih estimasi vs dibayarkan sebagai kehilangan | Cek transaksi yang masih diproses dan jadwal pembayaran |
| Memilih produk dari satu metrik saja | Gabungkan EPC, total komisi, dan kualitas transaksi |
| Menyimpulkan satu format selalu terbaik dari satu tabel | Jadikan hasil sebagai bahan eksperimen berikutnya |
| Menjumlahkan laporan mingguan yang tumpang tindih | Pakai rentang tanggal yang tidak berimpit |
| Membagi komisi total produk sembarangan ke tiap konten | Catat data pada tingkat yang tersedia (produk atau akun) |
| Mengisi data kosong dengan perkiraan tanpa label | Beri label "estimasi" atau biarkan kosong |

## 8. Tugas dan Checklist

- [ ] Tugas 1: Tambahkan kolom performa ke Database Konten dan Database Komisi Affiliate, lalu buat tampilan Performa.
- [ ] Tugas 2: Catat views, klik, pesanan, dan komisi.
- [ ] Tugas 3: Hitung CTR jika penyebutnya (views atau impresi) tersedia.
- [ ] Tugas 4: Hitung CVR dengan definisi yang konsisten.
- [ ] Tugas 5: Hitung EPC berdasarkan jenis komisi yang jelas.
- [ ] Tugas 6: Pisahkan komisi estimasi, pending, disetujui, dan dibayarkan.
- [ ] Tugas 7: Bandingkan performa beberapa produk.
- [ ] Tugas 8: Bandingkan format konten.
- [ ] Tugas 9: Buat laporan mingguan.
- [ ] Tugas 10: Buat laporan bulanan.
- [ ] Tugas 11: Catat keterbatasan data.
- [ ] Tugas 12: Tentukan satu tindakan berdasarkan hasil analisis.

## 9. Latihan dan Kunci Jawaban

**Soal 1.** Views 10.000 dan klik 300. Berapa CTR terhadap views?
**Jawaban:** 3%, yaitu 3 klik untuk setiap 100 views. Ini CTR terhadap views, bukan selalu CTR resmi platform.

**Soal 2.** Klik 400, pesanan 20. Berapa CVR?
**Jawaban:** 5%, yaitu 5 pesanan per 100 klik.

**Soal 3.** Klik 500 dan komisi untuk analisis Rp250.000. Berapa EPC?
**Jawaban:** Rp500 per klik, untuk jenis komisi dan periode yang dipakai.

**Soal 4.** Views 50.000 dengan komisi disetujui Rp500.000. Berapa komisi per 1.000 views?
**Jawaban:** Rp10.000.

**Soal 5.** Total nilai pesanan Rp2.000.000 dari 40 pesanan. Berapa AOV, dan apakah itu pendapatanmu?
**Jawaban:** Rp50.000. Itu bukan pendapatan affiliate. Komisi ditentukan ketentuan program, produk, dan transaksi yang memenuhi syarat.

**Soal 6.** Total pesanan 100, dibatalkan 10. Berapa rasio pembatalan?
**Jawaban:** 10%. Pastikan definisi konsisten dan jangan menganggap semua pembatalan disebabkan konten.

**Soal 7.** Dari tabel Organizer A, Rak B, Lampu C: produk mana EPC tertinggi dan mana komisi terbesar?
**Jawaban:** EPC tertinggi Lampu C (Rp900). Komisi terbesar Organizer A (Rp200.000). Keputusan bergantung pada tujuan.

**Soal 8.** Tulis formula Notion untuk EPC berdasarkan komisi disetujui.
**Jawaban:** `if(prop("Klik") > 0, prop("Komisi Disetujui") / prop("Klik"), 0)`

**Soal 9.** Dari 400 klik ada 20 pesanan, dan 15 memenuhi syarat. Berapa CVR valid, dan apa beda dengan 15 ÷ 20?
**Jawaban:** CVR valid = 15 ÷ 400 = 3,75%. Hitungan 15 ÷ 20 = 75% adalah persentase pesanan yang memenuhi syarat, bukan CVR valid.

**Soal 10.** Sebutkan empat status komisi secara berurutan.
**Jawaban:** Estimasi, Pending, Disetujui, Dibayarkan.

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika mampu menghitung dan menjelaskan metrik utama dengan definisi yang konsisten, memisahkan empat status komisi di dashboard Notion, membandingkan produk dan konten dengan tujuan yang jelas, serta mengambil keputusan yang sesuai dengan kualitas data.
', 'Modul 16', 15, false, 20, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l21', 'm05', 'Modul 17 — Eksperimen dan Validasi', 'modul-17-eksperimen-dan-validasi', '# Modul 17 — Eksperimen dan Validasi

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Membuat hipotesis yang bisa diuji.
- Menentukan variabel utama dan metrik keberhasilan.
- Menentukan periode pengujian yang masuk akal.
- Memahami pengaruh ukuran sampel.
- Membedakan dugaan, korelasi, dan bukti.
- Mendokumentasikan hasil eksperimen di Database Eksperimen.
- Menentukan keputusan setelah eksperimen: Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, atau Hentikan.

## 2. Ringkasan Konsep Utama

1. **Eksperimen** adalah proses menguji suatu perubahan untuk mengetahui apakah perubahan itu benar-benar memperbaiki hasil.
2. Prinsip utama: **jangan memperbesar strategi hanya karena satu konten berhasil.** Cari tahu apakah hasilnya bisa diulang.
3. **Hipotesis yang baik punya empat bagian:** perubahan, alasan, metrik penilaian, dan kriteria keputusan.
4. Pisahkan **variabel utama** (yang sengaja diubah) dari **variabel pendukung** (faktor lain yang bisa memengaruhi hasil).
5. **Metrik utama ditentukan di awal** dan sesuai tujuan bisnis, bukan angka yang paling enak dilihat.
6. **Tidak ada satu durasi pengujian yang selalu benar.** Sampel kecil membuat metrik mudah berubah.
7. Performa bisa berbeda walau strategi sama, karena distribusi, waktu, audiens, tren, harga, stok, persaingan, eksekusi, dan faktor acak.
8. Setiap eksperimen dicatat dengan struktur tetap di **Database Eksperimen** dan ditutup dengan satu dari lima keputusan baku: **Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, Hentikan**.

## 3. Penjelasan

### 3.1 Pengertian eksperimen dalam affiliate marketing

Eksperimen menguji perubahan untuk melihat apakah hasil benar-benar membaik. Dugaan yang sering muncul:

- Hook yang menyebut masalah audiens menghasilkan lebih banyak klik.
- Video demonstrasi menghasilkan lebih banyak pesanan daripada video yang hanya menampilkan produk.
- Produk berharga lebih rendah lebih mudah dikonversi.
- CTA yang lebih jelas menaikkan klik affiliate link.
- Konten perbandingan menghasilkan komisi lebih besar.

Semua dugaan ini masuk akal sebagai titik awal, tetapi belum tentu benar untuk audiens, produk, dan kanal kamu. Eksperimen mengubah dugaan menjadi bukti yang lebih kuat.

### 3.2 Membuat hipotesis

Hipotesis adalah dugaan yang bisa diuji dengan data. Hipotesis yang baik punya **empat bagian**:

1. Perubahan yang akan dilakukan.
2. Alasan perubahan itu diperkirakan membantu.
3. Metrik untuk menilai hasil.
4. Kriteria keputusan setelah pengujian.

Contoh hipotesis yang **kurang baik**: *"Kalau konten dibuat lebih bagus, penjualan pasti naik."* Masalahnya:

- tidak jelas apa yang diubah;
- tidak ada alasan yang bisa diuji;
- tidak ada metrik utama;
- tidak ada kriteria keberhasilan;
- tidak ada batas waktu evaluasi.

Ubah dugaan umum menjadi pernyataan yang spesifik dan terukur.

### 3.3 Menentukan variabel

Variabel adalah faktor yang bisa berubah dalam pengujian. Variabel yang bisa diuji dalam konten affiliate:

- hook;
- durasi video;
- format konten;
- urutan demonstrasi;
- CTA;
- produk;
- harga produk;
- cara menjelaskan manfaat;
- penempatan link, jika platform memungkinkan.

**Variabel utama** adalah faktor yang sengaja diubah. **Variabel pendukung** adalah faktor lain yang mungkin memengaruhi hasil.

Contoh: menguji apakah hook berbeda menaikkan CTR.

- Variabel utama: **hook**.
- Variabel pendukung: **produk, harga, durasi, kualitas visual, CTA, dan audiens**.

Konten yang terbit pada waktu berbeda bisa mendapat distribusi berbeda. Kamu tidak bisa mengendalikan semuanya. Usahakan kondisi yang sebanding dan **catat perbedaan yang tidak bisa dikendalikan**.

### 3.4 Menetapkan metrik utama

Metrik utama adalah ukuran yang menentukan apakah eksperimen berhasil menjawab pertanyaan awal. Jangan memakai terlalu banyak metrik utama karena hasilnya membingungkan.

Mengapa ditentukan di awal? Misalnya kamu menguji hook baru. CTR naik, tetapi rasio pembelian turun dan komisi total tidak naik. Jika tujuanmu menaikkan klik, hook baru berhasil di tahap itu. Jika tujuan bisnismu menaikkan komisi, kamu belum punya bukti bahwa perubahan itu menguntungkan.

Metrik utama harus sesuai tujuan bisnis, bukan sekadar angka yang terlihat paling bagus.

### 3.5 Menentukan periode pengujian

Periode pengujian adalah rentang waktu pengumpulan data. **Tidak ada satu durasi yang selalu benar.** Pertimbangkan:

- frekuensi publikasi;
- kecepatan mendapat views;
- jumlah klik;
- jumlah transaksi;
- waktu yang dibutuhkan audiens untuk membeli;
- jeda pembaruan laporan;
- perbedaan distribusi konten;
- perubahan harga dan stok.

### 3.6 Memahami sampel kecil

Sampel adalah kumpulan data yang kamu analisis: jumlah views, klik, pesanan, atau konten yang diuji. **Sampel kecil membuat metrik mudah berubah.**

Jangan menganggap satu atau dua transaksi sebagai bukti kuat bahwa suatu produk atau format pasti unggul.

### 3.7 Memahami variasi performa

Performa konten bisa berubah walau strateginya sama. Penyebabnya:

- perubahan distribusi algoritma;
- perbedaan waktu publikasi;
- perbedaan karakteristik audiens;
- tren yang naik atau turun;
- harga dan stok produk;
- persaingan;
- kualitas eksekusi konten;
- faktor acak.

Cara mengurangi salah tafsir:

- Uji beberapa konten dengan pendekatan serupa.
- Pakai metrik yang sama.
- Catat kondisi publikasi.
- Hindari menyimpulkan dari satu konten.
- Periksa apakah hasilnya konsisten.
- Bandingkan periode yang kondisinya relatif sebanding.

### 3.8 Menghindari kesimpulan terlalu dini

Kesimpulan terlalu dini terjadi saat keputusan dibuat sebelum bukti cukup.

Contoh: kamu mengunggah video baru dan mendapat tiga pesanan dalam satu jam. Lalu kamu menyimpulkan format itu strategi terbaik. Padahal pesanan itu bisa berasal dari:

- distribusi yang kebetulan tinggi;
- audiens yang sedang butuh produk;
- produk yang sedang ada penawaran menarik;
- faktor lain yang tidak terkait format.

Kamu boleh mengubah strategi lebih cepat jika ada **masalah serius**, seperti link rusak atau produk yang tidak lagi sesuai. Namun jangan menyamakan tindakan korektif dengan bukti bahwa eksperimen berhasil.

### 3.9 Menguji hook

Tujuannya mencari pembuka konten yang paling efektif menarik audiens relevan. Buat konten dengan substansi dan penawaran serupa, lalu bandingkan.

Metrik yang diamati: views, CTR terhadap views, klik, pesanan, dan komisi.

Jika data per konten tersedia, analisis tiap konten terpisah. Jika tidak, catat keterbatasan pengukuran. Jangan memilih hook dari views tertinggi saja. Lihat juga apakah audiens yang tertarik menunjukkan minat membeli.

### 3.10 Menguji format konten

Contoh format: demonstrasi langsung, tutorial penggunaan, perbandingan produk, daftar rekomendasi, dan penjelasan masalah serta solusi.

Jika dua format memakai produk berbeda, hasilnya sulit ditafsirkan. Bila memungkinkan, pakai produk dan penawaran yang sebanding.

### 3.11 Menguji CTA

Tujuannya mengetahui apakah cara mengajak audiens bertindak memengaruhi hasil. Setiap CTA memberi informasi atau dorongan yang berbeda.

**CTA yang menaikkan klik belum tentu menaikkan pembelian.** Jangan mengevaluasi hasil hanya di satu tahap funnel.

### 3.12 Menguji produk

Pengujian produk menentukan apakah suatu produk layak diprioritaskan dibanding alternatifnya. Kriteria yang bisa dipakai:

- relevansi dengan audiens;
- harga;
- kualitas dan reputasi penjual;
- permintaan;
- ketersediaan produk;
- potensi komisi;
- CTR, CVR, dan EPC;
- komisi disetujui;
- tingkat pembatalan.

Contoh: Produk A berkomisi lebih besar per transaksi tetapi jarang menghasilkan pesanan. Produk B berkomisi lebih kecil tetapi lebih konsisten terjual. B bisa saja menghasilkan komisi total lebih tinggi. Namun jangan langsung memilih B dari beberapa transaksi. Periksa volume traffic, stabilitas performa, dan kualitas data.

### 3.13 Kriteria keputusan setelah eksperimen

Tentukan sebelum eksperimen dimulai bagaimana hasilnya akan dipakai. Modul ini memakai lima keputusan baku: **Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, Hentikan.**

**A. Lanjutkan** — jika:

- Metrik utama membaik secara relevan.
- Data cukup untuk mendukung keputusan.
- Tidak ada penurunan besar pada metrik bisnis penting.
- Hasil bisa diulang atau menunjukkan konsistensi.
- Produk tetap layak dipromosikan.

Lanjutkan bukan berarti langsung menaikkan volume besar-besaran. Mulailah dengan pengujian lanjutan yang terukur. Keputusan memperluas skala (Perluas) adalah langkah terpisah di Modul 20, dan baru dipertimbangkan setelah ada bukti.

**B. Optimalkan** — jika ada hambatan yang bisa diperbaiki:

- Metrik utama membaik tetapi komisi tidak membaik. Contohnya CTR naik tetapi pesanan tidak bertambah.
- Ada masalah pada eksekusi konten.

Teliti relevansi produk, harga, dan halaman tujuan sebelum mengubah seluruh strategi.

**C. Uji ulang** — jika hasil belum jelas:

- Sampel masih terlalu kecil.
- Faktor lain terlalu banyak berubah.
- Hipotesis belum benar-benar teruji.

Ulangi pengujian dengan kondisi yang lebih terkontrol atau sampel yang lebih besar.

**D. Kurangi prioritas** (bila relevan) — jika hasilnya kurang baik dibanding alternatif yang lebih menjanjikan, tetapi belum cukup alasan untuk berhenti. Produk atau pendekatan itu tetap ada, hanya dikerjakan lebih jarang.

**E. Hentikan** — jika:

- Hasil berulang kali tidak membaik secara berarti.
- Produk tidak memenuhi standar kualitas.
- Risiko reputasi terlalu tinggi.
- Link atau promosi tidak memenuhi aturan program.
- Potensi komisi tidak sebanding dengan waktu yang dibutuhkan.
- Ada alternatif yang lebih menjanjikan berdasarkan bukti.

Menghentikan eksperimen bukan berarti gagal. Keputusan ini mencegah waktu terbuang pada pendekatan yang tidak efektif.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Eksperimen | Proses menguji perubahan untuk mengetahui apakah perubahan itu memperbaiki hasil |
| Hipotesis | Dugaan yang bisa diuji dengan data; terdiri dari perubahan, alasan, metrik, dan kriteria keputusan |
| Variabel | Faktor yang bisa berubah dalam pengujian |
| Variabel utama | Faktor yang sengaja diubah untuk menguji hipotesis |
| Variabel pendukung | Faktor lain yang mungkin memengaruhi hasil |
| Metrik utama | Ukuran yang menentukan apakah eksperimen berhasil menjawab pertanyaan awal |
| Periode pengujian | Rentang waktu pengumpulan data |
| Sampel | Data yang dianalisis (views, klik, pesanan, atau konten yang diuji) |
| Kesimpulan terlalu dini | Keputusan yang dibuat sebelum bukti cukup |
| Baseline | Hasil sebelum perubahan |
| Keputusan baku | Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, Hentikan |

## 5. Langkah Praktik

### A. Pengujian format konten

Hipotesis contoh: *"Format perbandingan dua produk menghasilkan lebih banyak pesanan per 100 klik daripada demonstrasi tunggal karena audiens bisa membandingkan alternatif."*

1. Pilih produk yang relevan dan punya informasi kualitas memadai.
2. Buat konten demonstrasi.
3. Buat konten perbandingan.
4. Pakai CTA yang sebanding.
5. Catat views, klik, pesanan, dan komisi.
6. Evaluasi setelah data cukup.
7. Catat apakah perbedaan hasil mungkin berasal dari faktor lain.

### B. Pengujian CTA

1. Pilih satu produk.
2. Buat dua atau lebih variasi CTA.
3. Pertahankan isi konten sedekat mungkin.
4. Catat views dan klik.
5. Hitung CTR jika memungkinkan.
6. Periksa pesanan dan komisi.
7. Bandingkan hasil berdasarkan metrik utama.

### C. Cara menghindari kesimpulan terlalu dini

1. Catat hasil awal.
2. Periksa apakah data sudah lengkap.
3. Tunggu sampai periode pengamatan yang direncanakan selesai.
4. Bandingkan dengan baseline.
5. Ulangi pengujian jika hasil masih belum jelas.
6. Putuskan berdasarkan bukti yang terkumpul.

## 6. Contoh dan Perhitungan

Modul ini tidak memperkenalkan rumus baru. Metrik yang dipakai (CTR, CVR, EPC, komisi per 1.000 views) ada di Modul 16.

### 6.1 Contoh hipotesis lengkap

Hipotesis: *"Jika saya menampilkan ukuran organizer secara langsung dalam video, rasio pesanan terhadap klik akan naik karena calon pembeli bisa menilai apakah produk sesuai kebutuhan."*

- **Perubahan:** menampilkan ukuran produk dengan jelas.
- **Alasan:** mengurangi ketidakpastian calon pembeli.
- **Metrik utama:** rasio pesanan terhadap klik (CVR).
- **Metrik pendukung:** jumlah klik, jumlah pesanan, dan komisi.
- **Periode:** dua minggu, dengan evaluasi setelah data cukup.
- **Keputusan:** Lanjutkan jika peningkatan cukup meyakinkan dan tidak menurunkan kualitas hasil bisnis.

Periode dua minggu hanya contoh. Sesuaikan dengan volume traffic, siklus pembelian, dan keterlambatan pelaporan.

### 6.2 Pemilihan metrik utama berdasarkan tujuan

| Tujuan eksperimen | Metrik utama |
| --- | --- |
| Menaikkan ketertarikan pada link | CTR terhadap views |
| Menaikkan pembelian setelah klik | CVR (pesanan ÷ klik) |
| Menaikkan kualitas transaksi | CVR valid (pesanan memenuhi syarat ÷ klik) |
| Menaikkan monetisasi per klik | EPC berdasarkan komisi yang dipilih |
| Menaikkan hasil dari distribusi konten | Komisi per 1.000 views |
| Menaikkan hasil bisnis | Komisi disetujui atau dibayarkan, sesuai tujuan |

### 6.3 Perbandingan yang tidak sebanding

Kamu mengunggah dua video dalam satu hari. Video pertama mendapat 100 views, video kedua 10.000 views. Membandingkan jumlah klik langsung tidak adil, karena kesempatan mendapat klik sangat berbeda.

Kamu bisa membandingkan CTR, tetapi tetap periksa apakah audiens dan distribusi kedua video cukup sebanding.

Untuk data transaksi, ukuran sampel juga penting. Sepuluh pesanan dari 100 klik memberi indikasi awal, tetapi belum cukup untuk menyimpulkan satu strategi selalu lebih baik.

### 6.4 Contoh sampel kecil

- **Konten A:** 20 klik, 2 pesanan, CVR = 2 ÷ 20 = 10%.
- **Konten B:** 500 klik, 30 pesanan, CVR = 30 ÷ 500 = 6%.

CVR A lebih tinggi, tetapi hanya dari 20 klik. Dua pesanan tambahan akan mengubah hasilnya banyak. CVR B didasarkan pada sampel yang jauh lebih besar.

Ini tidak berarti B pasti lebih baik. Contoh ini menunjukkan bahwa hasil sampel kecil harus ditafsirkan hati-hati. Keputusan yang cocok untuk kasus ini: Uji ulang.

### 6.5 Contoh variasi hook (produk organizer meja)

- **Hook A:** "Meja kerja penuh barang?"
- **Hook B:** "Cara menata meja kerja agar lebih rapi."
- **Hook C:** "Tiga kesalahan saat memilih organizer meja."

### 6.6 Contoh variasi CTA

- **CTA A:** "Cek detail produk di link."
- **CTA B:** "Cek ukuran dan pilihan warna sebelum membeli."
- **CTA C:** "Bandingkan harga dan ulasan melalui link produk."

### 6.7 Skema Database Eksperimen

Catat semua eksperimen di **Database Eksperimen**, salah satu dari enam database sistem Notion kamu (SOP dan Pengetahuan menyusul di Modul 20 dan 23). Buat database baru dengan nama persis "Database Eksperimen" dan kolom berikut:

| Kolom | Tipe properti Notion | Isi |
| --- | --- | --- |
| Nama Eksperimen | Title | Nama singkat, mis. "Hook masalah vs hook cara" |
| ID Eksperimen | Text | Mis. EXP001 |
| Tujuan | Text | Hasil yang ingin ditingkatkan |
| Hipotesis | Text | Dugaan yang diuji |
| Variabel Utama | Select | Faktor yang diubah (Hook, CTA, Format, Produk, dst.) |
| Metrik Utama | Select | Ukuran keberhasilan (CTR, CVR, EPC, dst.) |
| Baseline | Number | Hasil sebelum perubahan |
| Hasil | Number | Data setelah pengujian |
| Tanggal Mulai | Date | Tanggal pengujian dimulai |
| Tanggal Akhir | Date | Tanggal evaluasi |
| Ukuran Sampel | Number | Views, klik, atau pesanan yang dipakai |
| Keterbatasan | Text | Faktor yang belum bisa dikendalikan |
| Keputusan | Select | Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, Hentikan |
| Alasan Keputusan | Text | Bukti yang mendukung keputusan |
| Pelajaran | Text | Apa yang dipelajari untuk eksperimen berikutnya |

### 6.8 Contoh dokumentasi terisi

- ID Eksperimen: EXP001.
- Tujuan: menaikkan CTR.
- Hipotesis: hook yang menyebut masalah audiens menaikkan ketertarikan pada link.
- Variabel Utama: hook.
- Metrik Utama: CTR terhadap views.
- Baseline: 2%.
- Hasil: 2,5%.
- Keterbatasan: distribusi audiens dan waktu publikasi berbeda.
- Keputusan: **Uji ulang** (ulangi pengujian sebelum memperluas strategi).

Angka ini contoh ilustrasi. Kenaikan dari 2% ke 2,5% adalah **0,5 poin persentase**, atau **kenaikan relatif 25%** (0,5 ÷ 2 × 100%). Hasil ini belum membuktikan bahwa hook adalah penyebabnya.

### 6.9 Template evaluasi eksperimen (salin ke Notion)

```markdown
# Catatan Eksperimen Affiliate

**ID Eksperimen:**

**Tanggal Mulai:**

**Tanggal Akhir:**

## 1. Tujuan
Apa hasil yang ingin ditingkatkan?

## 2. Hipotesis
Jika saya melakukan perubahan ..., maka metrik ... akan berubah karena ...

## 3. Variabel
- Variabel utama:
- Faktor lain yang perlu diperhatikan:

## 4. Baseline
- Views:
- Klik:
- CTR:
- Pesanan:
- CVR:
- Komisi estimasi:
- Komisi disetujui:
- EPC:

Isi hanya metrik yang datanya tersedia.

## 5. Hasil Pengujian
- Views:
- Klik:
- CTR:
- Pesanan:
- CVR:
- Komisi estimasi:
- Komisi disetujui:
- EPC:

## 6. Keterbatasan Data
Apa yang mungkin memengaruhi hasil selain perubahan yang diuji?

## 7. Kesimpulan
Apakah hipotesis didukung, belum cukup bukti, atau tidak didukung?

## 8. Keputusan
Pilih satu: Lanjutkan / Optimalkan / Uji ulang / Kurangi prioritas / Hentikan

**Alasan keputusan:**

## 9. Pelajaran dan Langkah Berikutnya
Apa yang akan dilakukan dan metrik apa yang akan dipantau?
```

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Memperbesar strategi karena satu konten berhasil | Ulangi dulu dan periksa konsistensi |
| Hipotesis tidak spesifik | Tulis perubahan, alasan, metrik, kriteria keberhasilan, dan batas waktu |
| Terlalu banyak metrik utama | Pilih satu metrik utama sesuai tujuan |
| Memilih metrik yang paling enak dilihat | Pilih metrik yang sesuai tujuan bisnis |
| Membandingkan klik dua konten dengan views jauh berbeda | Bandingkan CTR dan perhatikan ukuran sampel |
| Menganggap satu atau dua transaksi sebagai bukti kuat | Tunggu sampel yang lebih besar |
| Menyimpulkan dari satu konten | Uji beberapa konten dan cek konsistensi |
| Menyimpulkan terlalu dini (mis. tiga pesanan dalam satu jam) | Tunggu periode evaluasi yang direncanakan |
| Menyamakan tindakan korektif dengan bukti keberhasilan | Pisahkan perbaikan masalah (link rusak) dari hasil eksperimen |
| Memilih hook dari views tertinggi saja | Lihat juga klik, pesanan, dan komisi |
| Menguji dua format dengan produk berbeda | Pakai produk yang sebanding |
| Mengevaluasi CTA di satu tahap funnel saja | Periksa klik, pesanan, dan komisi |
| Memilih produk dari beberapa transaksi | Periksa traffic, stabilitas, dan kualitas data |

## 8. Tugas dan Checklist

Jalankan tiga eksperimen dengan tujuan berbeda. Pakai produk yang relevan dan pastikan link serta pencatatan datanya sudah berfungsi. Catat setiap eksperimen di Database Eksperimen.

**Tugas 1 — Eksperimen 1: Pengujian Hook**

- [ ]  Pilih satu produk.
- [ ]  Buat dua variasi hook.
- [ ]  Pertahankan isi dan CTA sedekat mungkin.
- [ ]  Catat views dan klik.
- [ ]  Bandingkan CTR terhadap views.
- [ ]  Periksa apakah pesanan dan komisi ikut mendukung hasilnya.

Hipotesis: hook yang menyebut masalah spesifik audiens menghasilkan CTR lebih tinggi.

**Tugas 2 — Eksperimen 2: Pengujian Demonstrasi**

- [ ]  Pilih satu produk.
- [ ]  Buat satu konten dengan demonstrasi.
- [ ]  Bandingkan dengan konten yang menjelaskan manfaat tanpa demonstrasi langsung.
- [ ]  Catat klik, pesanan, dan komisi.
- [ ]  Periksa apakah kondisinya cukup sebanding.
- [ ]  Tentukan apakah perlu Uji ulang.

Hipotesis: demonstrasi menaikkan rasio pesanan terhadap klik karena audiens lebih paham fungsi produk.

**Tugas 3 — Eksperimen 3: Pengujian Produk**

- [ ]  Pilih dua produk yang relevan dengan audiens yang sama.
- [ ]  Periksa kualitas, harga, reputasi penjual, dan ketersediaannya.
- [ ]  Pakai format konten yang sebanding.
- [ ]  Catat klik, pesanan, dan komisi.
- [ ]  Hitung EPC jika datanya tersedia.
- [ ]  Bandingkan hasil dengan mempertimbangkan ukuran sampel.
- [ ]  Tentukan produk mana yang layak diuji kembali.

Hipotesis: produk yang lebih sesuai kebutuhan dan penawarannya lebih baik menghasilkan monetisasi lebih tinggi daripada produk yang hanya dipilih karena komisinya besar.

**Tugas 4 — Dokumentasi:** isi satu baris Database Eksperimen untuk setiap eksperimen, lengkap dengan Keputusan dan Alasan Keputusan.

## 9. Latihan dan Kunci Jawaban

**Soal 1.** Sebutkan empat bagian hipotesis yang baik.
**Jawaban:** (1) perubahan yang akan dilakukan; (2) alasan perubahan diperkirakan membantu; (3) metrik untuk menilai hasil; (4) kriteria keputusan setelah pengujian.

**Soal 2.** Kamu menguji apakah hook berbeda menaikkan CTR. Mana variabel utama dan mana variabel pendukung?
**Jawaban:** Variabel utama: hook. Variabel pendukung: produk, harga, durasi, kualitas visual, CTA, dan audiens.

**Soal 3.** Tujuan eksperimenmu menaikkan monetisasi per klik. Metrik utama apa yang dipilih?
**Jawaban:** EPC berdasarkan komisi yang dipilih.

**Soal 4.** Konten A: 20 klik, 2 pesanan (CVR 10%). Konten B: 500 klik, 30 pesanan (CVR 6%). Bolehkah menyimpulkan A lebih baik?
**Jawaban:** Tidak. CVR A lebih tinggi, tetapi hanya dari 20 klik, dan dua pesanan tambahan mengubah hasil banyak. Ini juga tidak berarti B pasti lebih baik. Hasil sampel kecil harus ditafsirkan hati-hati. Keputusan yang cocok: Uji ulang.

**Soal 5.** Baseline CTR 2%, hasil 2,5%. Bagaimana menafsirkannya?
**Jawaban:** Naik 0,5 poin persentase atau 25% secara relatif, tetapi belum membuktikan bahwa hook adalah penyebabnya. Keputusan dalam contoh: Uji ulang sebelum memperluas strategi. (Angka ilustrasi.)

**Soal 6.** CTR eksperimenmu naik tetapi pesanan tidak bertambah. Keputusan baku mana yang dipilih?
**Jawaban:** Optimalkan. Ada hambatan yang bisa diperbaiki. Teliti relevansi produk, harga, dan halaman tujuan sebelum mengubah seluruh strategi.

**Soal 7.** Kamu menemukan link rusak di tengah eksperimen. Boleh langsung mengubah strategi?
**Jawaban:** Boleh, karena link rusak atau produk yang tidak sesuai adalah masalah serius. Namun jangan menyamakan tindakan korektif ini dengan bukti bahwa eksperimen berhasil.

**Soal 8.** Sebutkan lima keputusan baku setelah eksperimen.
**Jawaban:** Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, Hentikan.

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika mampu menulis hipotesis dengan empat bagian, memilih variabel dan metrik utama yang tepat, memahami pengaruh sampel kecil, mencatat eksperimen di Database Eksperimen, dan menutupnya dengan salah satu dari lima keputusan baku berdasarkan bukti.
', 'Modul 17', 15, false, 21, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l22', 'm06', 'Modul 18 — Monetisasi dan Pemilihan Produk Lanjutan', 'modul-18-monetisasi-dan-pemilihan-produk-lanjutan', '# Modul 18 — Monetisasi dan Pemilihan Produk Lanjutan

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Membandingkan produk berdasarkan komisi dan kontribusi bisnis.
- Menentukan produk mana yang layak diprioritaskan.
- Memahami perbedaan produk volume tinggi dan produk komisi tinggi.
- Mengembangkan produk yang sudah terbukti menghasilkan.
- Mengurangi ketergantungan pada satu produk.
- Menentukan kapan produk harus Dilanjutkan, Dioptimalkan, Diuji ulang, Dikurangi prioritasnya, atau Dihentikan.

## 2. Ringkasan Konsep Utama

1. Tiga metrik monetisasi inti: **komisi per pesanan**, **EPC (komisi per klik)**, dan **komisi per 1.000 views**.
2. Produk komisi tinggi mengurangi jumlah pesanan yang dibutuhkan, tetapi belum tentu lebih menguntungkan jika lebih sulit terjual.
3. Konten paling populer belum tentu konten paling efektif menghasilkan komisi.
4. Portofolio produk dikelompokkan menurut fungsi (utama, pengembangan, pelengkap, eksperimen, evaluasi). Ini kategori kerja internal, bukan kategori resmi Shopee.
5. Ketergantungan pada satu produk adalah risiko pendapatan yang harus diukur, bukan diperkirakan.
6. Penurunan performa didiagnosis berurutan sebelum produk dihentikan.
7. Kualitas pendapatan (konsistensi, kualitas transaksi, konsentrasi, efisiensi) sama penting dengan nominal komisi.
8. Diversifikasi bertujuan mengurangi risiko, bukan memperbanyak produk.

## 3. Penjelasan

### 3.1 Komisi per pesanan

Komisi per pesanan adalah komisi dari satu pesanan yang memenuhi syarat program. Besarnya berbeda menurut harga produk, persentase komisi, kategori, ketentuan program, dan status transaksi.

```
Komisi per pesanan = Nilai transaksi yang memenuhi syarat × Persentase komisi
```

Rumus ini penyederhanaan. Perhitungan sebenarnya mengikuti dasar perhitungan, batas komisi, dan ketentuan resmi Shopee Affiliate yang berlaku.

Pesanan yang dibatalkan, dikembalikan, tidak memenuhi syarat, atau disesuaikan bisa menghasilkan komisi berbeda dari estimasi awal.

Komisi per pesanan membantu kamu menghitung berapa transaksi yang dibutuhkan untuk mencapai target.

| Komisi per pesanan | Pesanan untuk Rp1 juta |
| --- | --- |
| Rp2.000 | 500 |
| Rp5.000 | 200 |
| Rp10.000 | 100 |
| Rp25.000 | 40 |
| Rp50.000 | 20 |

Angka di atas adalah simulasi, bukan tarif komisi resmi Shopee.

Produk berkomisi lebih tinggi mengurangi jumlah pesanan yang dibutuhkan. Namun produk itu belum tentu lebih menguntungkan jika lebih sulit terjual.

### 3.2 Komisi per klik (EPC)

*Earnings per click* (EPC) adalah rata-rata komisi dari setiap klik affiliate. EPC menjawab: "Dari setiap klik yang saya dapat, berapa rata-rata komisinya?"

```
EPC = Total komisi ÷ Total klik affiliate
```

Pakai komisi dan klik dari periode serta sumber data yang konsisten. Utamakan komisi disetujui dan sebutkan jenis komisi yang kamu pakai.

Kegunaan EPC:

- Membandingkan produk yang dipromosikan lewat sumber traffic sejenis.
- Mengevaluasi konten yang mendatangkan klik berkualitas.
- Menemukan produk yang banyak diklik tetapi jarang menghasilkan komisi.
- Menentukan prioritas pengujian produk berikutnya.

**Keterbatasan EPC.** EPC tidak boleh menjadi satu-satunya dasar keputusan. Produk A bisa punya EPC lebih tinggi tetapi total komisi lebih kecil karena kliknya sedikit. Produk B bisa punya EPC lebih rendah tetapi total komisi lebih besar karena traffic-nya jauh lebih tinggi. Atribusi transaksi, jeda pembelian, pembatalan, dan perubahan status komisi juga memengaruhi hasil.

### 3.3 Komisi per 1.000 views

Metrik ini adalah rata-rata komisi dari setiap 1.000 tayangan (views) konten. Namanya juga *commission per mille*.

```
Komisi per 1.000 views = Total komisi ÷ Total views × 1.000
```

Contoh: komisi Rp400.000 dari 20.000 views.

```
400.000 ÷ 20.000 × 1.000 = Rp20.000
```

Metrik ini membandingkan kemampuan konten menghasilkan komisi dari tayangan yang didapat.

| Konten | Views | Komisi | Komisi per 1.000 views |
| --- | --- | --- | --- |
| A | 100.000 | Rp200.000 | Rp2.000 |
| B | 20.000 | Rp300.000 | Rp15.000 |
| C | 10.000 | Rp50.000 | Rp5.000 |

Konten B paling efisien per tayangan, walau views-nya lebih sedikit dari A. Konten A membawa traffic terbesar, tetapi tiap 1.000 tayangannya menghasilkan komisi paling sedikit.

**Pelajaran:** konten paling populer belum tentu konten paling efektif menghasilkan komisi.

Definisikan views secara konsisten. Gunakan periode atribusi yang sesuai (lihat Modul 02). Jangan langsung menganggap komisi berasal dari satu konten jika sumber penjualannya tidak bisa diidentifikasi jelas.

### 3.4 Produk volume tinggi vs komisi tinggi

Produk volume tinggi relatif sering dibeli. Produk komisi tinggi berpotensi memberi komisi besar per transaksi. Keduanya tidak selalu bertentangan. Ada produk yang volumenya tinggi sekaligus komisinya tinggi, tetapi tidak semua produk begitu.

| Aspek | Volume tinggi | Komisi tinggi |
| --- | --- | --- |
| Fokus | Jumlah transaksi | Nilai komisi per transaksi |
| Kelebihan | Berpotensi menghasilkan banyak pesanan | Butuh lebih sedikit pesanan untuk target komisi yang sama |
| Tantangan | Komisi per pesanan mungkin kecil | Penjualan bisa lebih sulit |
| Kebutuhan utama | Traffic dan konversi yang konsisten | Kepercayaan, kebutuhan pembeli, dan nilai produk yang jelas |
| Risiko | Persaingan dan margin komisi rendah | Ketergantungan pada sedikit transaksi besar |

Jangan memilih produk hanya dari harga atau komisi tertinggi. Evaluasi juga:

- kesesuaian dengan kebutuhan audiens;
- kemampuan konten menjelaskan manfaat produk;
- tingkat konversi;
- komisi efektif yang benar-benar disetujui;
- persaingan;
- kualitas dan reputasi penjual;
- risiko pembatalan atau pengembalian;
- konsistensi permintaan.

Produk berkomisi kecil tetapi mudah terjual bisa lebih menarik daripada produk berkomisi besar yang hampir tidak menghasilkan pesanan.

### 3.5 Analisis produk pelengkap

Produk pelengkap adalah produk lain yang relevan dengan kebutuhan pembeli produk utama.

| Produk utama | Produk pelengkap |
| --- | --- |
| Laptop | Mouse, keyboard, cooling pad |
| Smartphone | Casing, pelindung layar, charger yang kompatibel |
| Alat kopi | Filter, timbangan, wadah penyimpanan |
| Peralatan olahraga | Matras, resistance band, botol minum |
| Peralatan dapur | Wadah penyimpanan, alat ukur, perlengkapan pembersih |

Produk pelengkap memperluas peluang monetisasi tanpa pindah niche. Misalnya audiens yang mencari perlengkapan meja kerja mungkin juga butuh mouse, keyboard, lampu meja, dan penyangga laptop. Dengan memahami itu, kamu bisa membuat beberapa konten yang saling berkaitan.

Jangan mempromosikan produk tambahan hanya untuk memperbanyak link affiliate. Setiap produk harus punya alasan jelas untuk direkomendasikan.

### 3.6 Pengelolaan portofolio produk

Portofolio produk adalah kumpulan produk yang kamu promosikan aktif. Tujuannya membangun kombinasi produk yang:

- relevan dengan audiens;
- punya peluang menghasilkan komisi;
- tidak terlalu bergantung pada satu sumber pendapatan;
- bisa kamu kelola sesuai waktu dan kemampuan;
- punya potensi dikembangkan.

**Kelompok produk menurut fungsi:**

1. **Produk utama** — sudah menunjukkan kontribusi komisi atau konversi yang menjanjikan.
2. **Produk pengembangan** — relevan dan sedang diuji untuk peluang tumbuh.
3. **Produk pelengkap** — mendukung kebutuhan audiens di sekitar produk utama.
4. **Produk eksperimen** — masih butuh data untuk menentukan layak dilanjutkan atau tidak.
5. **Produk yang perlu dievaluasi** — performanya menurun, kualitasnya meragukan, tidak tersedia, atau tidak lagi sesuai kebutuhan audiens.

Kelompok ini kategori kerja internal, bukan kategori resmi Shopee.

Contoh portofolio sederhana (konten perlengkapan kerja dan belajar):

| Kelompok | Contoh | Tujuan |
| --- | --- | --- |
| Utama | Stand laptop | Menjaga produk yang terbukti menghasilkan |
| Pengembangan | Keyboard | Menguji potensi produk terkait |
| Pelengkap | Mouse pad | Memenuhi kebutuhan tambahan |
| Eksperimen | Lampu meja | Menguji peluang baru |
| Evaluasi | Produk dengan banyak keluhan | Menentukan apakah promosi harus dihentikan |

Jangan menambah produk hanya agar katalog terlihat lengkap. Terlalu banyak produk membuat riset, produksi konten, dan evaluasi tidak efisien.

### 3.7 Ketergantungan pada satu produk

Jika sebagian besar komisi berasal dari satu produk, perubahan kecil pada produk itu memengaruhi seluruh pendapatan affiliate. Contohnya:

- produk tidak tersedia;
- harga naik sehingga permintaan turun;
- komisi dikurangi;
- reputasi penjual turun;
- konten kehilangan relevansi;
- produk pesaing menawarkan alternatif lebih baik.

Ukur ketergantungan dengan kontribusi produk:

```
Kontribusi produk = Komisi produk ÷ Total komisi × 100%
```

Contoh: total komisi Rp5.000.000, komisi produk A Rp3.500.000.

```
Kontribusi produk A = 3.500.000 ÷ 5.000.000 × 100% = 70%
```

Artinya 70% komisi berasal dari satu produk. Jika produk itu berhenti menghasilkan, pendapatan bisa turun tajam.

Tidak ada persentase ketergantungan yang berlaku untuk semua bisnis. Sesuaikan ambang batas dengan stabilitas produk, jumlah alternatif, dan toleransi risiko.

### 3.8 Pengembangan konten pemenang

Konten pemenang adalah konten dengan hasil bisnis baik menurut metrik yang relevan, bukan hanya views. Cirinya:

- menghasilkan klik affiliate;
- punya EPC yang sehat;
- menghasilkan komisi disetujui;
- menarik audiens yang sesuai dengan produk;
- bisa dikembangkan ke format lain;
- tetap relevan setelah periode awal publikasi.

Misalnya video stand laptop menghasilkan klik dan pesanan. Jangan sekadar mengunggah ulang video yang sama. Kembangkan sudut pembahasan lain:

- cara memilih stand laptop;
- kesalahan saat membeli stand laptop;
- perbandingan dua jenis stand laptop;
- fitur yang perlu diperiksa sebelum membeli;
- produk untuk meja kerja yang sempit;
- demonstrasi cara penggunaan;
- kelebihan dan keterbatasan produk berdasarkan bukti.

Setiap variasi harus memberi nilai baru.

**Eksperimen terukur.** Ubah satu variabel utama per pengujian jika memungkinkan: hook, format demonstrasi, sudut pembahasan, CTA, atau produk. Catat hasilnya. Jangan menyimpulkan sebuah hook pasti lebih baik hanya karena satu video mendapat lebih banyak views. Views tinggi belum tentu mendatangkan pembeli yang sesuai.

### 3.9 Analisis kualitas pendapatan

Kualitas pendapatan menilai seberapa sehat, konsisten, dan dapat diandalkan komisi yang kamu peroleh. Dua affiliate bisa punya komisi nominal sama tetapi risiko berbeda.

Contoh: Affiliate A memperoleh Rp5 juta dari satu produk. Affiliate B memperoleh Rp5 juta dari lima produk relevan. Risiko konsentrasi B mungkin lebih rendah. Namun itu tidak otomatis membuat pendapatannya lebih stabil, karena semua produk bisa terkena faktor yang sama, seperti perubahan algoritma atau daya beli audiens.

Aspek yang diperiksa:

1. **Konsistensi** — apakah komisi relatif stabil dari waktu ke waktu?
2. **Kualitas transaksi** — berapa bagian komisi yang akhirnya disetujui?
3. **Konsentrasi** — seberapa besar kontribusi produk terbesar?
4. **Keterulangan** — apakah penjualan bisa diulang lewat konten baru?
5. **Ketergantungan** — apakah pendapatan bergantung pada satu konten atau platform?
6. **Efisiensi** — berapa waktu yang dibutuhkan untuk menghasilkan komisi?
7. **Kelayakan produk** — apakah produk masih relevan dan memenuhi standar kualitas?
8. **Ketepatan pembayaran** — apakah komisi disetujui sudah dibayarkan sesuai ketentuan?

Status komisi mengikuti empat tahap berurutan: Estimasi, Pending, Disetujui, Dibayarkan. Nama di dashboard Shopee bisa berbeda. Sebutkan selalu tahap yang kamu pakai.

Metrik tambahan:

```
Rasio komisi disetujui = Komisi disetujui ÷ Komisi estimasi × 100%
```

Pakai rasio ini hanya jika kedua angka berasal dari transaksi dan periode yang bisa dibandingkan. Contoh: komisi estimasi Rp1.000.000 dan disetujui Rp800.000 menghasilkan rasio 800.000 ÷ 1.000.000 × 100% = 80%.

```
Komisi per jam kerja = Komisi yang dipilih ÷ Jam kerja
```

Contoh: komisi disetujui Rp500.000 dari 50 jam kerja menghasilkan Rp500.000 ÷ 50 = Rp10.000 per jam. Ini hanya simulasi.

Kamu bisa memakai komisi disetujui untuk menilai kualitas pendapatan, lalu membandingkannya dengan hasil setelah pembayaran. Jelaskan basis pengukuranmu agar estimasi dan realisasi tidak tercampur.

### 3.10 Risiko perubahan komisi

Komisi bisa berubah menurut ketentuan program, kategori, promosi, atau kebijakan. **Jangan menganggap persentase komisi hari ini akan selalu berlaku.**

Langkah mengelola risikonya:

- Periksa informasi komisi terbaru lewat sumber resmi.
- Catat tanggal perubahan yang kamu ketahui.
- Pisahkan estimasi dari komisi yang disetujui.
- Hindari proyeksi bisnis dari satu tingkat komisi saja.
- Siapkan alternatif produk yang tetap relevan.
- Evaluasi dampak perubahan komisi terhadap target pendapatan.

Jika komisi turun, jangan langsung menggandakan jumlah konten. Hitung dulu besar penurunan pendapatan dan apakah penambahan volume realistis bisa menutupinya.

### 3.11 Diversifikasi yang terukur

Diversifikasi berarti menyebarkan risiko secara masuk akal. Tujuannya mengurangi ketergantungan pada satu sumber pendapatan, bukan mempromosikan banyak produk sekaligus.

Bentuk diversifikasi:

- beberapa produk untuk kebutuhan audiens yang sama;
- produk utama dan produk pelengkap;
- beberapa format konten;
- beberapa topik dalam satu niche;
- lebih dari satu sumber traffic bila sumber dayamu sudah cukup.

Untuk tahap awal, diversifikasi produk dalam niche yang sama lebih mudah dikelola daripada langsung membuka banyak niche dan kanal.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Komisi per pesanan | Komisi dari satu pesanan yang memenuhi syarat program affiliate |
| EPC (earnings per click) | Rata-rata komisi dari setiap klik affiliate |
| Komisi per 1.000 views | Rata-rata komisi dari setiap 1.000 tayangan konten; disebut juga commission per mille |
| Produk volume tinggi | Produk yang relatif sering dibeli |
| Produk komisi tinggi | Produk yang berpotensi memberi komisi besar per transaksi |
| Produk pelengkap | Produk lain yang relevan dengan kebutuhan pembeli produk utama |
| Portofolio produk | Kumpulan produk yang dipromosikan aktif |
| Konten pemenang | Konten dengan hasil bisnis baik menurut metrik relevan, bukan hanya views |
| Kualitas pendapatan | Penilaian seberapa sehat, konsisten, dan dapat diandalkan komisi yang diperoleh |
| Diversifikasi | Menyebarkan risiko secara masuk akal untuk mengurangi ketergantungan pada satu sumber pendapatan |

## 5. Langkah Praktik

### A. Mengembangkan produk pelengkap

1. Identifikasi masalah utama audiens.
2. Pilih satu produk utama yang relevan.
3. Cari kebutuhan lain yang muncul sebelum atau sesudah produk itu dipakai.
4. Periksa apakah produk pelengkap benar-benar bermanfaat.
5. Riset harga, kualitas, penjual, komisi, dan ketersediaannya.
6. Buat konten yang menjelaskan kapan produk pelengkap diperlukan.
7. Ukur hasil tiap produk secara terpisah.

### B. Mengurangi ketergantungan pada satu produk

1. Cari produk alternatif untuk kebutuhan serupa.
2. Uji produk pelengkap.
3. Kembangkan beberapa format konten untuk audiens yang sama.
4. Jaga sumber traffic agar tidak hanya bergantung pada satu konten.
5. Pantau perubahan komisi dan ketersediaan.
6. Jangan langsung meninggalkan produk utama yang masih sehat hanya demi diversifikasi.

Diversifikasi harus mengurangi risiko tanpa mengorbankan terlalu banyak waktu dan komisi yang sudah terbukti.

### C. Diagnosis produk yang performanya menurun

Penurunan performa tidak selalu berarti produknya buruk. Penyebabnya bisa dari konten, traffic, harga, persaingan, ketersediaan, komisi, atau kebutuhan pasar.

1. **Periksa produk:** masih tersedia, relevan, dan layak direkomendasikan?
2. **Periksa traffic:** apakah tayangan dan klik turun?
3. **Periksa CTR:** apakah lebih sedikit orang yang mengeklik?
4. **Periksa konversi:** apakah klik tetap tinggi tetapi pesanan turun?
5. **Periksa komisi:** apakah komisi per pesanan berubah?
6. **Periksa kualitas transaksi:** apakah banyak pesanan dibatalkan atau tidak memenuhi syarat?
7. **Periksa periode:** apakah penurunan karena pola musiman atau fluktuasi biasa?

Keputusan berdasarkan diagnosis (lima keputusan baku):

- **Lanjutkan** — produk masih menghasilkan dan memenuhi kebutuhan audiens.
- **Optimalkan** — masalah ada pada konten atau cara penyampaian.
- **Uji ulang** — penyebab penurunan belum jelas.
- **Kurangi prioritas** — hasilnya kurang baik dibanding alternatif yang lebih menjanjikan.
- **Hentikan** — produk tidak lagi layak, tidak tersedia, melanggar ketentuan, atau terus menunjukkan hasil tidak memadai setelah pengujian yang wajar.

Jangan menghentikan produk hanya karena performanya turun satu hari. Pakai periode evaluasi yang cukup dan perhitungkan jumlah data.

### D. Melakukan diversifikasi

1. Ukur kontribusi produk utama.
2. Identifikasi risiko terbesar.
3. Pilih satu alternatif yang relevan.
4. Tetapkan anggaran waktu untuk pengujian.
5. Ukur klik, konversi, dan komisi.
6. Bandingkan hasilnya dengan produk utama.
7. Lanjutkan diversifikasi hanya jika hasil dan risiko mendukung.

## 6. Contoh dan Perhitungan

Seluruh angka di bagian ini adalah simulasi, bukan tarif resmi Shopee dan bukan proyeksi hasil akunmu.

### 6.1 Komisi per pesanan

- Harga produk: Rp200.000.
- Persentase komisi efektif: 5%.
- Komisi ilustratif: Rp200.000 × 5% = **Rp10.000**.
- Jika ada 50 pesanan yang semuanya memenuhi syarat: total komisi ilustratif **Rp500.000**.

### 6.2 EPC

Dalam tujuh hari: total klik 1.000, komisi tercatat Rp150.000.

```
EPC = 150.000 ÷ 1.000 = Rp150 per klik
```

Setiap klik menghasilkan rata-rata Rp150 dalam periode itu. Artinya bukan setiap klik benar-benar menghasilkan Rp150. Sebagian klik tidak menghasilkan transaksi, sebagian lain bisa menghasilkan komisi lebih besar.

### 6.3 Komisi per 1.000 views

Konten dengan 20.000 views dan komisi Rp400.000 menghasilkan **Rp20.000 per 1.000 views** (400.000 ÷ 20.000 × 1.000).

### 6.4 Volume tinggi vs komisi tinggi

| Produk | Komisi rata-rata | Pesanan | Total komisi |
| --- | --- | --- | --- |
| Produk A | Rp3.000 | 200 | Rp600.000 |
| Produk B | Rp30.000 | 20 | Rp600.000 |

Keduanya menghasilkan komisi sama, tetapi jumlah pesanan yang dibutuhkan berbeda jauh. Produk B baru lebih menarik secara operasional jika 20 pesanan itu memang bisa dicapai dengan usaha dan traffic yang masuk akal.

### 6.5 Mengukur ketergantungan produk

- Total komisi: Rp5.000.000.
- Komisi dari produk A: Rp3.500.000.
- Kontribusi produk A: 3.500.000 ÷ 5.000.000 × 100% = **70%**.

### 6.6 Tabel praktik perbandingan produk

| Produk | Klik | Pesanan memenuhi syarat | Komisi disetujui | EPC | Kontribusi komisi |
| --- | --- | --- | --- | --- | --- |
| Produk A | 1.000 | 20 | Rp200.000 | Rp200 | 40% |
| Produk B | 800 | 16 | Rp240.000 | Rp300 | 48% |
| Produk C | 500 | 5 | Rp60.000 | Rp120 | 12% |
| Total | 2.300 | 41 | Rp500.000 | Rp217,39 | 100% |

Data ini simulasi. Kontribusi dihitung dari total komisi Rp500.000. EPC dihitung dari komisi disetujui ÷ klik. Contoh: Produk B = 240.000 ÷ 800 = Rp300.

Cara membacanya:

- Produk B punya EPC tertinggi dan kontribusi komisi terbesar.
- Produk A juga berkontribusi berarti.
- Produk C punya EPC terendah, jadi perlu diperiksa lebih lanjut.

Data ini belum cukup untuk langsung menghentikan produk C. Periksa dulu apakah datanya memadai, apakah traffic-nya sesuai, dan apakah masalahnya ada pada produk atau konten.

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Memilih produk hanya dari harga atau komisi tertinggi | Evaluasi konversi, komisi efektif, kualitas penjual, persaingan, dan risiko pembatalan |
| Menjadikan EPC satu-satunya dasar keputusan | Bandingkan juga total komisi dan volume klik; perhatikan atribusi dan perubahan status komisi |
| Menganggap konten paling populer pasti paling efektif | Hitung komisi per 1.000 views, bukan hanya views |
| Mempromosikan produk tambahan hanya demi memperbanyak link affiliate | Pastikan setiap produk punya alasan jelas untuk direkomendasikan |
| Menambah produk agar katalog terlihat lengkap | Batasi sesuai kapasitas riset, produksi, dan evaluasi |
| Mengunggah ulang konten yang sama | Kembangkan sudut pembahasan baru yang memberi nilai baru |
| Menyimpulkan hook lebih baik dari satu video | Ubah satu variabel per pengujian dan catat hasilnya |
| Menghentikan produk karena performa turun satu hari | Pakai periode evaluasi yang cukup dan perhitungkan jumlah data |
| Menggandakan konten begitu komisi turun | Hitung dulu besar penurunan dan apakah volume realistis bisa menutupinya |
| Meninggalkan produk utama yang masih sehat demi diversifikasi | Diversifikasi harus mengurangi risiko tanpa mengorbankan komisi terbukti |

## 8. Tugas dan Checklist

- [ ]  Tugas 1: Catat data setiap produk.
- [ ]  Tugas 2: Hitung EPC.
- [ ]  Tugas 3: Hitung kontribusi komisi.
- [ ]  Tugas 4: Identifikasi produk utama.
- [ ]  Tugas 5: Pilih satu produk untuk dikembangkan.
- [ ]  Tugas 6: Pilih satu produk untuk diuji ulang.
- [ ]  Tugas 7: Tentukan produk yang perlu dihentikan jika bukti sudah memadai.
- [ ]  Tugas 8: Dokumentasikan alasan setiap keputusan.

## 9. Latihan dan Kunci Jawaban

**1. Jika komisi per pesanan Rp25.000, berapa pesanan yang dibutuhkan untuk Rp1 juta?**
Kunci: 40 pesanan (tabel simulasi 3.1).

**2. Konten memperoleh 20.000 views dan Rp400.000 komisi. Berapa komisi per 1.000 views?**
Kunci: Rp20.000 per 1.000 views.

**3. Total komisi Rp5.000.000, komisi produk A Rp3.500.000. Berapa kontribusi produk A, dan apa implikasinya?**
Kunci: 70%. Artinya 70% komisi berasal dari satu produk. Jika produk itu berhenti menghasilkan, pendapatan bisa turun tajam. Tidak ada ambang persentase universal. Sesuaikan dengan stabilitas produk, jumlah alternatif, dan toleransi risiko.

**4. Produk A: komisi rata-rata Rp3.000 × 200 pesanan. Produk B: Rp30.000 × 20 pesanan. Mana yang lebih baik?**
Kunci: Keduanya menghasilkan Rp600.000. Produk B baru lebih menarik secara operasional jika 20 pesanan itu bisa dicapai dengan usaha dan traffic yang masuk akal.

**5. Produk C pada tabel praktik punya EPC terendah (Rp120). Apakah langsung dihentikan?**
Kunci: Tidak. Periksa dulu apakah datanya memadai, apakah traffic-nya sesuai, dan apakah masalahnya dari produk atau konten.

**6. Sebutkan lima kelompok fungsi dalam portofolio produk.**
Kunci: Produk utama, pengembangan, pelengkap, eksperimen, dan yang perlu dievaluasi. Ini kategori kerja internal, bukan kategori resmi Shopee.

**7. Komisi per pesanan sebuah produk tiba-tiba turun. Apa langkah pertamamu?**
Kunci: Periksa informasi komisi terbaru lewat sumber resmi, catat tanggal perubahan, pisahkan estimasi dari komisi disetujui, dan hitung dampak penurunan sebelum menambah volume konten.

**8. Sebutkan lima keputusan baku untuk diagnosis produk.**
Kunci: Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, Hentikan.

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika mampu membandingkan produk dengan metrik yang tepat, mengidentifikasi sumber komisi utama, mengukur ketergantungan, dan menentukan prioritas produk berdasarkan hasil serta risiko.
', 'Modul 18', 15, false, 22, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l23', 'm06', 'Modul 19 — Keuangan dan Target Komisi', 'modul-19-keuangan-dan-target-komisi', '# Modul 19 — Keuangan dan Target Komisi

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Menetapkan target komisi lewat perhitungan, bukan sekadar keinginan.
- Menghitung kebutuhan pesanan, klik, dan views dari target komisi.
- Menilai kelayakan contoh target jangka panjang Rp30 juta per bulan. Angka ini hanya contoh untuk latihan menghitung, bukan janji dan bukan patokan Shopee. Pakai targetmu sendiri.
- Membedakan komisi estimasi, pending, disetujui, dan dibayarkan, serta hasil setelah biaya.
- Mengelola biaya operasional dan arus kas.
- Membuat skenario pendapatan yang realistis.
- Mendiagnosis selisih antara target dan hasil aktual per tahap funnel.

## 2. Ringkasan Konsep Utama

1. Hitung target mundur: komisi → pesanan → klik → views. Jangan menetapkannya dari keinginan nominal.
2. Makin kecil komisi per pesanan, makin banyak pesanan yang dibutuhkan. Tetapi produk berkomisi besar belum tentu realistis dijual.
3. Status komisi berjalan empat tahap: Estimasi → Pending → Disetujui → Dibayarkan. Hasil setelah biaya adalah hal yang berbeda lagi.
4. Hasil setelah biaya punya dua basis. Basis kas memakai komisi dibayarkan. Basis kinerja memakai komisi disetujui. Selalu sebutkan basis yang kamu pakai.
5. Arus kas berbeda dari laporan performa. Komisi yang belum dibayarkan belum bisa dibelanjakan.
6. Rekonsiliasi membantu menjelaskan selisih antara komisi dan dana yang masuk.
7. Skenario konservatif, dasar, dan optimistis adalah alat antisipasi, bukan prediksi.
8. Waktu kerja adalah sumber daya bisnis, meski modal uangmu Rp0.
9. Kalau target meleset, diagnosis per tahap funnel. Jangan menyimpulkan "kurang rajin".

## 3. Penjelasan

### 3.1 Menentukan Target Komisi

Target komisi adalah jumlah komisi yang ingin kamu capai dalam periode tertentu. Bedakan target jangka pendek dan jangka panjang.

| Periode | Target ilustratif |
| --- | --- |
| Minggu pertama | Mengumpulkan data awal |
| Bulan pertama | Mendapatkan transaksi yang dapat divalidasi |
| Bulan kedua | Meningkatkan konversi dan konsistensi |
| Bulan ketiga | Menilai potensi pertumbuhan |
| Jangka panjang | Contoh target jangka panjang untuk latihan menghitung: komisi Rp30 juta per bulan |

Tetapkan target mingguan setelah kamu tahu kemampuan produksi konten dan punya data awal.

Target harus mempertimbangkan:

1. Komisi rata-rata per pesanan.
2. Jumlah pesanan yang dibutuhkan.
3. Tingkat konversi.
4. Jumlah klik yang diperlukan.
5. Kemampuan menghasilkan traffic.
6. Waktu yang tersedia.
7. Konsistensi kualitas konten.
8. Risiko pembatalan dan penyesuaian komisi.

> Rp30 juta di modul ini hanya contoh target jangka panjang untuk latihan menghitung. Angka ini bukan bukti bahwa bisnismu mampu menghasilkannya. Target baru realistis jika kebutuhan traffic, konversi, dan kapasitas kerja punya dukungan data.

### 3.2 Menghitung Kebutuhan Pesanan

```
Kebutuhan pesanan = Target komisi ÷ Komisi rata-rata per pesanan
```

Jika hasilnya bukan bilangan bulat, bulatkan ke atas. Jumlah pesanan tidak bisa berupa pecahan.

**Simulasi untuk contoh target Rp30 juta** (simulasi, bukan tarif resmi Shopee):

| Komisi rata-rata per pesanan | Pesanan per bulan |
| --- | --- |
| Rp2.000 | 15.000 |
| Rp5.000 | 6.000 |
| Rp10.000 | 3.000 |
| Rp20.000 | 1.500 |
| Rp50.000 | 600 |
| Rp100.000 | 300 |

Angka ini hanya hitungan matematis. Belum tentu produk dengan komisi sebesar itu tersedia atau mudah terjual.

Makin kecil komisi per pesanan, makin banyak transaksi yang kamu butuhkan. Tapi produk berkomisi Rp100.000 belum tentu pilihan terbaik. Jika produk itu sangat sulit dijual, produk berkomisi Rp10.000 bisa lebih realistis.

Pakai komisi rata-rata yang benar-benar kamu peroleh dari transaksi yang memenuhi syarat, bukan persentase komisi yang tercantum.

### 3.3 Menghitung Kebutuhan Klik

Klik affiliate adalah jumlah klik pada link yang dicatat sistem tracking. Untuk menghitung kebutuhan klik, kamu perlu CVR.

**CVR (conversion rate)** adalah persentase klik yang menjadi pesanan.

```
CVR = Pesanan ÷ Klik × 100%
Kebutuhan klik = Kebutuhan pesanan ÷ CVR
```

Di rumus kebutuhan klik, tulis CVR dalam bentuk desimal (3% = 0,03).

Contoh: target butuh 3.000 pesanan dan CVR aktual 3%.

```
3.000 ÷ 0,03 = 100.000 klik
```

Hasil ini berlaku jika CVR 3% bisa dipertahankan.

Pastikan definisi pesanan dan periode klik konsisten dengan data program affiliate. Tidak semua pesanan awal memenuhi syarat komisi. Soal masa atribusi, lihat Modul 02.

CVR 3% hanyalah contoh. CVR sebenarnya bergantung pada produk, harga, audiens, kualitas traffic, dan halaman produk. Pakai data akunmu bila ada.

### 3.4 Menghitung Kebutuhan Traffic

Traffic adalah jumlah orang atau kunjungan yang berpotensi melihat kontenmu dan membuka link affiliate. Traffic dan klik tidak sama.

- **Views** (tayangan): jumlah tayangan yang dicatat platform.
- **Klik**: tindakan mengeklik link affiliate.
- **Pesanan**: hasil pembelian.
- **Komisi**: imbalan yang memenuhi ketentuan program.

```
CTR = Klik affiliate ÷ Views × 100%
Kebutuhan views = Kebutuhan klik ÷ CTR
```

Di rumus kebutuhan views, tulis CTR dalam bentuk desimal (2% = 0,02). Di modul ini, CTR dihitung dari views.

Contoh: butuh 100.000 klik dan CTR 2%.

```
100.000 ÷ 0,02 = 5.000.000 views
```

Hasil ini berlaku jika CTR 2% bisa dipertahankan. CTR sangat berbeda antarplatform dan format. Di sebagian platform, klik profil, klik bio, dan klik link eksternal ada di tahap funnel yang berbeda.

**Menghitung arah maju (dari views):**

```
Pesanan = Views × CTR × CVR
```

Rumus ini hanya untuk funnel dengan satu tahap klik. Jika ada beberapa tahap klik, hitung tiap tahap terpisah.

### 3.5 Komisi Rata-rata

```
Komisi rata-rata = Total komisi ÷ Jumlah pesanan yang sesuai
```

Pastikan penyebutnya konsisten dengan pembilangnya. Jika pembilangnya komisi disetujui, jangan bagi dengan jumlah pesanan awal yang masih mencakup transaksi batal atau tidak memenuhi syarat.

Simpan data per produk dan per periode. Rata-rata seluruh produk bisa menyembunyikan perbedaan besar antara produk berkomisi rendah dan tinggi.

### 3.6 Status Komisi dan Hasil Setelah Biaya

Komisi melewati empat tahap berurutan: Estimasi → Pending → Disetujui → Dibayarkan. Nama di dashboard Shopee bisa berbeda. Misalnya, status Pending kadang tampil sebagai "Dalam proses".

Jangan menyamakan tahap-tahap ini dengan hasil setelah biaya.

| Istilah | Pengertian |
| --- | --- |
| Komisi estimasi | Perkiraan komisi dari transaksi yang tercatat |
| Komisi pending | Komisi yang masih menunggu verifikasi |
| Komisi disetujui | Komisi yang sudah memenuhi verifikasi dan ketentuan program |
| Komisi dibayarkan | Dana yang benar-benar kamu terima (pembayaran aktual) |
| Hasil setelah biaya | Komisi dikurangi biaya usaha. Ada dua basis: kas dan kinerja (lihat 3.7) |

Komisi disetujui yang belum dibayarkan bisa masuk pada periode berikutnya, sesuai ketentuan pembayaran dan status akun. Karena itu laporan performa dan laporan arus kas punya tujuan berbeda.

### 3.7 Pendapatan Kotor dan Hasil Setelah Biaya

Pendapatan kotor affiliate adalah total komisi sebelum dikurangi biaya operasional yang relevan.

Biaya bisnis dapat meliputi:

- Internet.
- Peralatan kerja.
- Perangkat lunak.
- Penyimpanan file.
- Transportasi untuk produksi konten.
- Produk sampel yang dibeli.
- Jasa editor atau tenaga pendukung.
- Biaya lain yang benar-benar terkait kegiatan bisnis.

Jika kamu memakai peralatan pribadi, jangan otomatis menganggap seluruh harga belinya sebagai biaya periode berjalan. Cara mencatatnya bergantung pada sifat pengeluaran serta aturan akuntansi atau pajak yang berlaku.

Ada dua basis hasil setelah biaya:

```
Basis kas      = Komisi dibayarkan − Biaya usaha
Basis kinerja  = Komisi disetujui − Biaya usaha
```

Selalu sebutkan basis yang kamu pakai. Basis kas menjawab "uang apa yang benar-benar masuk". Basis kinerja menjawab "seberapa baik performa periode ini".

Istilah "profit bersih" baru dipakai setelah pajak dan kewajiban lain dihitung. Sebelum itu, sebut hasilnya "hasil setelah biaya" atau "profit sebelum pajak".

### 3.8 Nilai Waktu Kerja

Waktu adalah sumber daya bisnis, meski kamu tidak mengeluarkan uang.

```
Komisi per jam = Komisi yang dipilih ÷ Total jam kerja
```

Pilih basis komisinya (estimasi atau disetujui) dan sebutkan saat melaporkan angka. Contoh di modul ini memakai komisi disetujui.

Metrik ini membantu membandingkan aktivitas yang butuh waktu berbeda. Misalnya, 10 video butuh 20 jam. Format lain mungkin lebih singkat dengan hasil serupa.

Jangan menilai hanya satu minggu. Konten evergreen bisa menghasilkan komisi setelah masa produksi awal. Pertimbangkan umur konten dan kontribusi jangka panjangnya.

### 3.9 Mengelola Arus Kas

Arus kas adalah pergerakan uang masuk dan keluar dalam satu periode. Komisi tidak selalu dibayarkan bersamaan dengan transaksinya, jadi arus kas perlu kamu perhatikan.

| Keterangan | Jumlah |
| --- | --- |
| Saldo awal | Rp500.000 |
| Dana masuk | Rp1.500.000 |
| Pengeluaran operasional | Rp400.000 |
| Saldo akhir | Rp1.600.000 |

```
Saldo akhir = Saldo awal + Kas masuk − Kas keluar
```

Komisi yang belum dibayarkan jangan dicatat sebagai uang yang sudah tersedia.

Kebiasaan yang perlu dibangun:

- Catat setiap penerimaan aktual.
- Catat setiap pengeluaran.
- Pisahkan uang pribadi dan uang bisnis jika memungkinkan.
- Sisihkan dana untuk kebutuhan operasional.
- Jangan menghabiskan komisi estimasi.
- Cocokkan pembayaran dengan laporan program affiliate.

### 3.10 Skenario Konservatif, Dasar, dan Optimistis

Skenario membantu kamu mengantisipasi perubahan hasil tanpa menganggap pertumbuhan pasti terjadi. Contoh ini memakai asumsi komisi rata-rata Rp10.000 per pesanan sebagai skenario dasar.

| Skenario | Komisi rata-rata | Pesanan | Komisi |
| --- | --- | --- | --- |
| Konservatif | Rp8.000 | 1.000 | Rp8.000.000 |
| Dasar | Rp10.000 | 1.500 | Rp15.000.000 |
| Optimistis | Rp12.000 | 2.500 | Rp30.000.000 |

Ini simulasi, bukan prediksi. Skenario optimistis butuh kenaikan jumlah pesanan sekaligus komisi rata-rata. Jangan menganggap keduanya naik bersamaan tanpa bukti.

Buat skenario dari data aktualmu. Tentukan faktor apa yang harus berubah agar tiap skenario terjadi.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Target komisi | Jumlah komisi yang ingin dicapai dalam periode tertentu |
| Klik affiliate | Klik pada link yang dicatat sistem tracking |
| CVR (conversion rate) | Persentase klik yang menjadi pesanan |
| CTR | Persentase views yang menjadi klik affiliate |
| Traffic | Jumlah orang atau kunjungan yang berpotensi melihat konten dan membuka link affiliate |
| Views | Jumlah tayangan yang dicatat platform |
| Pesanan | Hasil pembelian |
| Komisi | Imbalan yang memenuhi ketentuan program |
| Komisi estimasi | Perkiraan komisi dari transaksi yang tercatat |
| Komisi pending | Komisi yang menunggu verifikasi |
| Komisi disetujui | Komisi yang sudah memenuhi verifikasi dan ketentuan program |
| Komisi dibayarkan | Dana yang benar-benar diterima (pembayaran aktual) |
| Hasil setelah biaya | Komisi dikurangi biaya usaha; sebutkan basis kas atau kinerja |
| Profit bersih | Hasil setelah pajak dan kewajiban lain dihitung |
| Pendapatan kotor | Total komisi sebelum dikurangi biaya operasional |
| Arus kas | Pergerakan uang masuk dan keluar dalam satu periode |
| Rekonsiliasi | Mencocokkan data komisi dan pembayaran agar perbedaan bisa dijelaskan |

## 5. Langkah Praktik

### A. Menghitung mundur dari target ke traffic

1. **Komisi**: tetapkan target komisi periode.
2. **Pesanan** = Target komisi ÷ Komisi rata-rata per pesanan (bulatkan ke atas).
3. **Klik** = Kebutuhan pesanan ÷ CVR (desimal).
4. **Views** = Kebutuhan klik ÷ CTR (desimal).

Arah maju: Views × CTR = Klik → Klik × CVR = Pesanan → Pesanan × Komisi rata-rata = Komisi.

### B. Rekonsiliasi pembayaran

1. Catat komisi estimasi.
2. Catat komisi pending dan komisi disetujui.
3. Catat pembayaran yang seharusnya kamu terima menurut laporan.
4. Catat dana yang benar-benar masuk.
5. Cocokkan tanggal, jumlah, dan status pembayaran.
6. Periksa potongan atau penyesuaian jika ada.
7. Catat selisih yang belum bisa dijelaskan.
8. Simpan bukti laporan dan transaksi.

Selisih belum tentu kesalahan pembayaran. Periksa dulu periode perhitungan, status transaksi, ketentuan program, dan potongan.

### C. Mendiagnosis target yang tidak tercapai

Jika target meleset, jangan menyimpulkan kamu kurang rajin. Tanyakan:

- Apakah views kurang?
- Apakah CTR rendah?
- Apakah klik tinggi tetapi CVR rendah?
- Apakah komisi per pesanan terlalu kecil?
- Apakah banyak transaksi tidak memenuhi syarat?
- Apakah jumlah konten melampaui kapasitas produksi?
- Apakah produk tidak cocok dengan audiens?
- Apakah waktu evaluasi terlalu pendek?

Pilih tindakan sesuai penyebab:

| Gejala | Tindakan |
| --- | --- |
| Views rendah | Uji topik, hook, format, dan distribusi konten |
| CTR rendah | Perjelas relevansi produk dan CTA |
| CVR rendah | Evaluasi kualitas produk, harga, kecocokan audiens, dan halaman tujuan |
| Komisi rendah | Evaluasi portofolio produk dan komisi efektif |
| Banyak pembatalan | Periksa kualitas penjual dan karakteristik transaksi |

## 6. Contoh dan Perhitungan

Semua angka di bagian ini adalah simulasi, bukan tarif resmi Shopee dan bukan proyeksi hasil akunmu.

### 6.1 Kebutuhan klik dari target pesanan

- Kebutuhan pesanan: 3.000
- CVR aktual: 3%
- Kebutuhan klik: 3.000 ÷ 0,03 = **100.000 klik** (jika CVR 3% bertahan)

### 6.2 Kebutuhan views dari target klik

- Kebutuhan klik: 100.000
- CTR dari views ke klik affiliate: 2%
- Kebutuhan views: 100.000 ÷ 0,02 = **5.000.000 views** (jika CTR 2% bertahan)

### 6.3 Funnel arah maju

- Views: 1.000.000, CTR: 2%, CVR: 3%
- Klik = 1.000.000 × 2% = **20.000 klik**
- Pesanan = 20.000 × 3% = **600 pesanan**
- Komisi ilustratif, jika rata-rata Rp10.000 per pesanan: 600 × Rp10.000 = **Rp6.000.000**

Hasil ini mengasumsikan semua pesanan menghasilkan komisi Rp10.000. Untuk estimasi yang lebih akurat, hitung komisi yang tidak disetujui, pembatalan, dan perubahan tarif.

### 6.4 Contoh target Rp30 juta dari funnel

Asumsi ilustratif: target Rp30.000.000 (contoh untuk latihan), komisi rata-rata Rp10.000, CVR 3%, CTR 2%.

| Tahap | Perhitungan | Kebutuhan |
| --- | --- | --- |
| Komisi | Target | Rp30.000.000 |
| Pesanan | Rp30 juta ÷ Rp10.000 | 3.000 |
| Klik | 3.000 ÷ 0,03 | 100.000 |
| Views | 100.000 ÷ 0,02 | 5.000.000 |

Lima juta views per bulan setara rata-rata sekitar **166.667 views per hari** (dibagi rata selama 30 hari). Views tidak tersebar merata. Sebagian konten bisa menyumbang sebagian besar traffic.

Jika kapasitas traffic saat ini jauh di bawah kebutuhan, jangan langsung memaksakan target. Validasi dulu apakah CTR, CVR, dan komisi per pesanan bisa dipertahankan.

### 6.5 Komisi rata-rata per pesanan

- Komisi tercatat: Rp2.000.000
- Pesanan yang menjadi dasar: 200
- Komisi rata-rata = Rp2.000.000 ÷ 200 = **Rp10.000**

### 6.6 Dari komisi estimasi sampai hasil setelah biaya

- Komisi estimasi: Rp10 juta
- Komisi disetujui: Rp8 juta
- Komisi dibayarkan pada periode ini: Rp6 juta
- Biaya usaha: Rp1 juta

| Basis | Perhitungan | Hasil |
| --- | --- | --- |
| Kinerja | Rp8 juta − Rp1 juta | Rp7 juta |
| Kas | Rp6 juta − Rp1 juta | Rp5 juta |

Keduanya masih sebelum pajak dan kewajiban lain, jadi belum disebut profit bersih. Selisih Rp2 juta antara komisi disetujui dan dibayarkan bisa masuk pada periode berikutnya, sesuai ketentuan pembayaran.

### 6.7 Komisi per jam kerja

- Komisi disetujui: Rp3.000.000
- Total waktu kerja: 100 jam
- Komisi per jam = Rp3.000.000 ÷ 100 = **Rp30.000**

### 6.8 Arus kas

Rp500.000 + Rp1.500.000 − Rp400.000 = **saldo akhir Rp1.600.000**.

### 6.9 Tiga skenario pendapatan

| Skenario | Komisi rata-rata | Pesanan | Komisi |
| --- | --- | --- | --- |
| Konservatif | Rp8.000 | 1.000 | Rp8.000.000 |
| Dasar | Rp10.000 | 1.500 | Rp15.000.000 |
| Optimistis | Rp12.000 | 2.500 | Rp30.000.000 |

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Menetapkan target hanya dari keinginan nominal | Tetapkan setelah tahu kapasitas produksi dan punya data awal |
| Menganggap Rp30 juta (contoh latihan) sebagai bukti kemampuan atau janji | Target realistis hanya jika traffic, konversi, dan kapasitas kerja punya dukungan data; pakai targetmu sendiri |
| Memilih produk komisi Rp100.000 hanya karena pesanannya paling sedikit | Jika sangat sulit dijual, produk komisi Rp10.000 bisa lebih realistis |
| Memakai persentase komisi yang tercantum sebagai komisi rata-rata | Pakai komisi rata-rata dari transaksi yang memenuhi syarat |
| Memakai CVR contoh (3%) sebagai patokan | Pakai data aktual akunmu |
| Menyamakan views dengan klik | Views, klik, pesanan, dan komisi adalah tahap berbeda |
| Memakai rumus funnel satu tahap untuk funnel bertahap | Hitung tiap tahap terpisah |
| Membagi komisi disetujui dengan jumlah pesanan awal | Samakan pembilang dan penyebut |
| Menyamakan komisi estimasi, pending, disetujui, dibayarkan, dan hasil setelah biaya | Pisahkan semuanya; laporan performa tidak sama dengan laporan arus kas |
| Menyebut hasil setelah biaya tanpa basisnya | Tulis basis kas atau basis kinerja |
| Menyebut "profit bersih" padahal pajak belum dihitung | Sebut "hasil setelah biaya" atau "profit sebelum pajak" |
| Menganggap seluruh harga peralatan pribadi sebagai biaya periode berjalan | Ikuti sifat pengeluaran dan aturan akuntansi/pajak yang berlaku |
| Menghabiskan komisi estimasi | Komisi yang belum dibayarkan bukan uang yang tersedia |
| Menganggap selisih rekonsiliasi pasti kesalahan pembayaran | Periksa periode, status transaksi, ketentuan program, dan potongan |
| Mengasumsikan komisi rata-rata dan jumlah pesanan naik bersamaan | Skenario optimistis butuh bukti untuk kedua faktor |
| Menyimpulkan "kurang rajin" saat target meleset | Diagnosis per tahap funnel lebih dulu |

## 8. Tugas dan Checklist

**Tugas 1.** Buat lembar perhitungan target komisi dengan data berikut. Pakai targetmu sendiri, atau contoh Rp30 juta untuk latihan.

- [ ] Target komisi bulanan.
- [ ] Komisi rata-rata aktual per pesanan.
- [ ] Kebutuhan pesanan.
- [ ] CVR aktual.
- [ ] Kebutuhan klik.
- [ ] CTR aktual.
- [ ] Kebutuhan views.

**Tugas 2.** Catat angka keuangan periode ini.

- [ ] Komisi estimasi, pending, disetujui, dan dibayarkan.
- [ ] Biaya usaha.
- [ ] Hasil setelah biaya, basis kas dan basis kinerja.

**Tugas 3.** Buat skenario konservatif, dasar, dan optimistis.

- [ ] Tiap skenario mencantumkan faktor yang harus berubah.

Jika belum punya data aktual, pakai angka simulasi dulu. Tandai mana asumsi dan mana hasil nyata.

## 9. Latihan dan Kunci Jawaban

**1. Target Rp30 juta (contoh latihan) dengan komisi rata-rata Rp5.000 per pesanan. Berapa pesanan per bulan?**
Kunci: 6.000 pesanan.

**2. Kebutuhan pesanan 3.000 dan CVR 3%. Berapa klik yang dibutuhkan?**
Kunci: 3.000 ÷ 0,03 = 100.000 klik, dengan syarat CVR 3% bertahan.

**3. Kebutuhan klik 100.000 dan CTR views ke klik 2%. Berapa views, dan berapa per hari selama 30 hari?**
Kunci: 5.000.000 views; rata-rata sekitar 166.667 per hari jika dibagi rata. Views tidak selalu tersebar merata.

**4. Views 1.000.000, CTR 2%, CVR 3%, komisi rata-rata Rp10.000. Berapa klik, pesanan, dan komisi ilustratif?**
Kunci: 20.000 klik; 600 pesanan; Rp6.000.000. Masih mengasumsikan semua pesanan berkomisi Rp10.000.

**5. Komisi estimasi Rp10 juta, disetujui Rp8 juta, dibayarkan Rp6 juta, biaya Rp1 juta. Berapa hasil setelah biaya pada kedua basis?**
Kunci: Basis kinerja Rp8 juta − Rp1 juta = Rp7 juta. Basis kas Rp6 juta − Rp1 juta = Rp5 juta. Keduanya sebelum pajak, jadi bukan profit bersih.

**6. Komisi tercatat Rp2.000.000 dari 200 pesanan. Berapa komisi rata-rata, dan apa syarat angka ini sah?**
Kunci: Rp10.000. Penyebut harus konsisten dengan pembilang.

**7. Komisi disetujui Rp3.000.000 dengan 100 jam kerja. Berapa komisi per jam, dan apa batas interpretasinya?**
Kunci: Rp30.000 per jam. Jangan menilai hanya satu minggu, karena konten evergreen bisa menghasilkan setelah masa produksi awal.

**8. Saldo awal Rp500.000, dana masuk Rp1.500.000, pengeluaran Rp400.000. Berapa saldo akhir?**
Kunci: Rp1.600.000.

**9. Mengapa skenario optimistis Rp30 juta tidak boleh dianggap prediksi?**
Kunci: Skenario itu butuh kenaikan jumlah pesanan (2.500) sekaligus komisi rata-rata (Rp12.000). Keduanya tidak boleh diasumsikan naik bersamaan tanpa bukti.

**10. Klik tinggi tetapi CVR rendah. Tindakan apa yang disarankan?**
Kunci: Evaluasi kualitas produk, harga, kecocokan audiens, dan halaman tujuan.

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika mampu menghitung kebutuhan pesanan, klik, dan views dengan asumsi yang jelas. Kamu juga harus memisahkan tahap komisi dari hasil setelah biaya (sebut basisnya) dan membandingkan proyeksi dengan hasil aktual.
', 'Modul 19', 15, false, 23, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l24', 'm06', 'Modul 20 — Scaling dan Sistem Produksi', 'modul-20-scaling-dan-sistem-produksi', '# Modul 20 — Scaling dan Sistem Produksi

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Menentukan kapan bisnismu layak dikembangkan (scaling).
- Mengidentifikasi konten yang memberikan hasil.
- Membuat variasi konten secara sistematis.
- Menyusun SOP produksi.
- Mengelola waktu dan database.
- Menaikkan volume tanpa mengorbankan kualitas.
- Mengurangi ketergantungan pada satu konten.

## 2. Ringkasan Konsep Utama

1. Scaling adalah mengembangkan proses yang sudah terbukti efektif. Scaling bukan sekadar mengunggah lebih banyak konten.
2. Jika sistem belum terbukti menghasilkan transaksi, memperbesar volume hanya memperbesar pemborosan waktu.
3. Ada lima syarat sebelum scaling: ada bukti hasil, ada pola yang bisa diulang, kualitas produk terjaga, proses produksi dapat dijalankan, dan risiko dapat dikendalikan.
4. Konten pemenang dikenali dari rangkaian metrik, bukan hanya views.
5. Sistem produksi adalah alur 12 langkah yang didokumentasikan, supaya kamu tidak memutuskan dari nol setiap kali.
6. Batch production menghemat waktu, tetapi berisiko menghasilkan banyak konten berkualitas rendah jika riset awalnya keliru.
7. SOP dan database (konten dan produk) adalah tulang punggung konsistensi.
8. Volume boleh naik hanya jika kualitas produk, akurasi informasi, dan kepatuhan tidak menurun.

## 3. Penjelasan

### 3.1 Pengertian Scaling

Scaling adalah upaya meningkatkan hasil bisnis dengan mengembangkan proses yang sudah terbukti efektif. Dalam affiliate marketing, scaling bisa berarti:

- Menambah jumlah konten berkualitas.
- Mengembangkan variasi dari konten yang menghasilkan.
- Memperluas portofolio produk yang relevan.
- Meningkatkan efisiensi produksi.
- Memperbaiki konversi.
- Mengembangkan kanal kedua setelah kanal utama tervalidasi.

> Jika sistem belum terbukti menghasilkan transaksi, memperbesar volume hanya memperbesar pemborosan waktu.

### 3.2 Menentukan Kapan Harus Scaling

Keputusan "Perluas" (scaling) baru kamu pertimbangkan setelah kelima syarat ini terpenuhi:

1. **Ada bukti hasil.** Konten atau produk sudah menghasilkan klik dan komisi yang bisa diukur.
2. **Ada pola yang bisa diulang.** Hasil tidak bergantung pada satu kejadian viral.
3. **Kualitas produk terjaga.** Produk masih relevan, tersedia, dan layak direkomendasikan.
4. **Proses produksi dapat dijalankan.** Kamu tahu waktu yang dibutuhkan untuk riset, produksi, publikasi, dan evaluasi.
5. **Risiko dapat dikendalikan.** Kamu tidak terlalu bergantung pada satu produk, konten, atau sumber traffic.

> Tidak ada jumlah views atau pesanan yang otomatis menjadi syarat scaling bagi semua affiliate. Pertimbangkan volume data, kestabilan performa, kemampuan produksi, dan risiko.

Jika salah satu syarat belum terpenuhi, pakai keputusan lain: Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, atau Hentikan.

### 3.3 Mengidentifikasi Konten Pemenang

Data yang dipakai:

- Views.
- Retensi atau waktu tonton, jika tersedia.
- Klik affiliate.
- CTR.
- Pesanan.
- CVR.
- Komisi estimasi.
- Komisi disetujui.
- EPC.
- Komisi per 1.000 views.
- Waktu produksi.

Contoh (simulasi, bukan tarif resmi Shopee):

| Konten | Views | Klik | Komisi disetujui |
| --- | --- | --- | --- |
| A | 50.000 | 500 | Rp100.000 |
| B | 15.000 | 450 | Rp180.000 |
| C | 30.000 | 300 | Rp30.000 |

Konten B menghasilkan komisi terbesar walau views-nya paling rendah. Namun jangan langsung menetapkannya sebagai format terbaik. Periksa dulu apakah hasilnya bisa dipertahankan. Periksa juga apakah komisinya terkait dengan periode dan sumber traffic yang dibandingkan.

### 3.4 Mengembangkan Variasi Konten

Konten pemenang memberi petunjuk tentang kebutuhan audiens dan format yang mungkin efektif. Kembangkan variasi berdasarkan:

- Masalah yang dibahas.
- Pertanyaan pembeli.
- Kategori audiens.
- Sudut demonstrasi.
- Perbandingan produk.
- Format penyampaian.
- Tahap keputusan pembelian.

Contoh satu produk: **stand laptop**.

| Format | Tujuan |
| --- | --- |
| Tutorial penggunaan | Menjelaskan cara memakai |
| Panduan memilih | Membantu menentukan kriteria |
| Perbandingan | Menjelaskan perbedaan pilihan |
| Demonstrasi | Memperlihatkan fitur yang bisa diverifikasi |
| Kekurangan produk | Membantu ekspektasi yang realistis |
| FAQ | Menjawab keraguan pembeli |

> Jangan membuat variasi yang hanya mengganti judul tanpa menambah informasi baru.

### 3.5 Batch Production

Batch production adalah mengerjakan beberapa tugas sejenis dalam satu sesi kerja.

**Contoh jadwal mingguan** (sesuaikan dengan waktu dan karakter kanalmu):

- **Senin:** riset 10 ide.
- **Selasa:** menulis 5 skrip.
- **Rabu:** merekam beberapa video.
- **Kamis:** mengedit dan memeriksa konten.
- **Jumat:** publikasi dan evaluasi.
- **Akhir pekan:** meninjau data dan menyiapkan eksperimen berikutnya.

**Manfaat:**

- Mengurangi perpindahan fokus.
- Menghemat waktu persiapan.
- Memudahkan penggunaan template.
- Membantu menjaga konsistensi.
- Membuat beban kerja lebih terencana.

**Risiko:** batch production bisa menghasilkan banyak konten berkualitas rendah jika riset awalnya keliru. Periksa kualitas sebelum memproduksi dalam jumlah besar.

### 3.6 Pengelolaan Waktu

Alokasikan waktu berdasarkan dampak aktivitas. Aktivitas affiliate umumnya terdiri dari riset, produksi, publikasi, pengelolaan link, analisis data, administrasi, dan pengembangan sistem.

Jika waktumu terbatas, jangan habiskan sebagian besar waktu untuk administrasi yang tidak meningkatkan kualitas keputusan.

Catat waktu untuk mengetahui:

- Berapa lama riset satu produk.
- Berapa lama produksi satu konten.
- Berapa lama evaluasi mingguan.
- Aktivitas mana yang memberi kontribusi komisi terbaik.

Setelah punya data, sederhanakan proses yang berulang.

### 3.7 Pengelolaan Database

Database adalah tempat menyimpan informasi yang bisa dipakai ulang. Di Notion kamu sudah punya database baku. Modul ini memakai dua di antaranya, ditambah satu untuk SOP.

**Database Konten Affiliate** menyimpan semua konten yang kamu terbitkan. Ini juga yang dimaksud "database publikasi" atau "katalog konten" di tugas dan modul lain. Kolom bakunya:

- Judul Konten, ID Konten, Produk, Link.
- Kanal, Format, Pilar Konten, Hook.
- Tanggal Publikasi, URL Konten.
- Views, Klik, Pesanan.
- Komisi Estimasi, Komisi Disetujui, Komisi Dibayarkan.
- Status Konten, Catatan Evaluasi.

**Database Produk Affiliate** menyimpan produk yang kamu riset dan promosikan. Kolom bakunya:

- Nama Produk, ID Produk, Kategori, Link Produk.
- Harga Saat Dicek, Tarif Komisi (tarif dan sumber verifikasi).
- Rating, Jumlah Ulasan, Kualitas Penjual.
- Potensi Konten, Kelayakan Program, Skor Produk.
- Status (Riset, Siap Dipromosikan, Dihentikan).
- Tanggal Pemeriksaan, Catatan.

Simpan tanggal pemeriksaan, karena harga, komisi, dan ketersediaan bisa berubah.

**Database SOP dan Pengetahuan** menyimpan SOP, template, dan pelajaran yang kamu pakai berulang (kolom: Nama Proses, Bagian, Status SOP, Terakhir Diperbarui, Sumber, Prosedur, Catatan Tinjauan). Semua SOP di modul ini disimpan di sana.

### 3.8 Mengembangkan Kanal Kedua

Kanal kedua bisa mengurangi ketergantungan pada satu platform, tetapi juga menambah pekerjaan. Sebelum membuka kanal baru, tanyakan:

- Apakah kanal utama sudah menghasilkan?
- Apakah ada format konten yang bisa diadaptasi?
- Apakah audiens kanal kedua sesuai?
- Apakah aturan affiliate dan platform mengizinkan metode promosi itu?
- Apakah kamu mampu menjaga kualitas di kedua kanal?

> Jika kanal utama belum tervalidasi, perbaiki dulu produk, konten, dan konversi. Jangan membagi waktu ke banyak platform.

### 3.9 Menghindari Ketergantungan pada Satu Konten

Satu konten viral bisa menghasilkan banyak komisi, tetapi performanya bisa menurun. Untuk mengurangi risiko:

- Buat variasi konten yang punya nilai baru.
- Kembangkan beberapa masalah audiens yang relevan.
- Bangun katalog konten evergreen (isinya tercatat di Database Konten Affiliate).
- Dokumentasikan format yang berhasil.
- Jangan menganggap performa satu konten bertahan selamanya.

Tujuannya kumpulan konten yang saling melengkapi, bukan mengejar satu konten viral.

### 3.10 Menjaga Kualitas Saat Volume Meningkat

Makin banyak konten, makin besar risiko salah. Pakai standar minimum:

- Produk tetap relevan.
- Klaim dapat dibuktikan.
- Visual digunakan secara sah.
- Link benar.
- CTA jelas.
- Pengungkapan affiliate sesuai aturan.
- Konten memberi informasi bermanfaat.
- Data performa tercatat.

> Jangan menaikkan volume jika kualitas produk, akurasi informasi, atau kepatuhan mulai menurun.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Scaling | Meningkatkan hasil bisnis dengan mengembangkan proses yang sudah terbukti efektif |
| Sistem produksi | Rangkaian proses yang membantu pekerjaan dilakukan secara konsisten |
| Batch production | Mengerjakan beberapa tugas sejenis dalam satu sesi kerja |
| SOP (Standard Operating Procedure) | Petunjuk tertulis cara menjalankan tugas secara konsisten |
| Database | Tempat menyimpan informasi yang bisa dipakai ulang |
| Kanal kedua | Platform tambahan yang dikembangkan setelah kanal utama tervalidasi |
| Keputusan evaluasi | Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, Hentikan |
| Perluas | Keputusan scaling terpisah, hanya setelah lima syarat di 3.2 terpenuhi |

## 5. Langkah Praktik

### 5.1 Alur dasar sistem produksi (12 langkah)

1. Riset kebutuhan audiens.
2. Riset produk.
3. Menentukan tujuan konten.
4. Menulis skrip.
5. Menyiapkan bahan visual.
6. Memproduksi konten.
7. Mengedit.
8. Memeriksa fakta dan kepatuhan.
9. Mempublikasikan.
10. Menambahkan affiliate link sesuai aturan.
11. Mencatat data performa.
12. Mengevaluasi hasil.

Dokumentasikan proses yang berulang agar kamu tidak membuat keputusan dari awal setiap kali.

### 5.2 Template skrip video (6 bagian)

1. **Hook:** masalah atau pertanyaan yang relevan.
2. **Konteks:** siapa yang mengalami masalah itu.
3. **Isi:** penjelasan atau demonstrasi.
4. **Bukti:** fakta, fitur, atau hasil yang bisa diverifikasi.
5. **Batasan:** kondisi saat produk mungkin tidak cocok.
6. **CTA:** ajakan yang relevan.

**Contoh singkat (stand laptop):**

- **Hook:** "Meja kerja sempit dan laptop selalu memakan tempat?"
- **Konteks:** jelaskan kebutuhan ruang kerja.
- **Isi:** perlihatkan cara kerja stand laptop.
- **Bukti:** tunjukkan ukuran atau fitur dari spesifikasi yang bisa diperiksa.
- **Batasan:** jelaskan kompatibilitas atau ukuran yang perlu diperhatikan.
- **CTA:** ajak audiens memeriksa spesifikasi dan harga lewat affiliate link.

Pakai hanya klaim yang bisa dipertanggungjawabkan. Jangan mengarang pengalaman pemakaian atau hasil pengujian.

### 5.3 SOP Produksi Konten (5 tahap)

Simpan SOP ini di Database SOP dan Pengetahuan.

**Tahap 1 — Riset**

- [ ] Tentukan masalah audiens.
- [ ] Pilih produk yang relevan.
- [ ] Periksa harga, spesifikasi, ketersediaan, dan penjual.
- [ ] Periksa ketentuan affiliate.

**Tahap 2 — Produksi**

- [ ] Tentukan hook.
- [ ] Buat skrip.
- [ ] Pastikan klaim dapat dibuktikan.
- [ ] Siapkan visual yang boleh digunakan.
- [ ] Produksi dan edit.

**Tahap 3 — Pemeriksaan**

- [ ] Periksa fakta.
- [ ] Periksa hak penggunaan visual.
- [ ] Periksa pengungkapan affiliate.
- [ ] Periksa CTA.
- [ ] Periksa link.

**Tahap 4 — Publikasi**

- [ ] Publikasikan sesuai ketentuan platform.
- [ ] Pastikan link berfungsi.
- [ ] Simpan URL konten.
- [ ] Catat tanggal publikasi.

**Tahap 5 — Evaluasi**

- [ ] Catat views.
- [ ] Catat klik.
- [ ] Catat pesanan dan komisi.
- [ ] Identifikasi masalah.
- [ ] Tentukan keputusan berikutnya: Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, atau Hentikan.

### 5.4 Menambah Produk Secara Terukur (8 langkah)

Jangan menambah banyak produk sekaligus tanpa alasan jelas.

1. Identifikasi kebutuhan yang belum terpenuhi.
2. Cari beberapa kandidat produk.
3. Bandingkan kualitas, harga, komisi, dan relevansi.
4. Pilih satu atau beberapa kandidat untuk diuji.
5. Tetapkan waktu pengujian.
6. Catat klik dan transaksi.
7. Bandingkan dengan produk yang sudah berjalan.
8. Putuskan: Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, atau Hentikan.

Sesuaikan jumlah produk yang diuji dengan kapasitasmu. Tidak ada angka universal.

## 6. Contoh dan Perhitungan

Data berikut adalah simulasi, bukan tarif resmi Shopee.

**Identifikasi konten pemenang:**

| Konten | Views | Klik | Komisi disetujui |
| --- | --- | --- | --- |
| A | 50.000 | 500 | Rp100.000 |
| B | 15.000 | 450 | Rp180.000 |
| C | 30.000 | 300 | Rp30.000 |

Konten B menghasilkan komisi terbesar walau views-nya paling rendah. Periksa dulu keterulangan hasilnya, periode, dan sumber traffic sebelum memutuskan.

**Jadwal batch production:** lihat bagian 3.5.

**Template:** modul ini berfokus pada template skrip (5.2), SOP produksi (5.3), dan dua database di 3.7. Modul ini tidak punya rumus khusus.

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Menganggap scaling sama dengan mengunggah lebih banyak konten | Scaling adalah mengembangkan proses yang sudah terbukti efektif |
| Memperbesar volume sebelum sistem terbukti menghasilkan transaksi | Validasi dulu; kalau tidak, volume hanya memperbesar pemborosan waktu |
| Memakai ambang views atau pesanan tertentu sebagai syarat scaling | Tidak ada angka universal; lihat volume data, kestabilan, kapasitas, risiko |
| Menyimpulkan format terbaik dari satu tabel konten | Periksa keterulangan hasil, kesamaan periode, dan sumber traffic |
| Memilih "Perluas" sebelum lima syarat terpenuhi | Pakai Lanjutkan, Optimalkan, atau Uji ulang dulu |
| Membuat variasi yang hanya mengganti judul | Tiap variasi harus menambah informasi baru |
| Batch production tanpa memeriksa kualitas riset | Periksa kualitas sebelum memproduksi dalam jumlah besar |
| Mengarang pengalaman pemakaian atau hasil pengujian | Pakai hanya klaim yang bisa dipertanggungjawabkan |
| Menghabiskan sebagian besar waktu untuk administrasi | Alokasikan waktu berdasarkan dampak aktivitas |
| Tidak mencatat tanggal pemeriksaan produk | Harga, komisi, dan ketersediaan bisa berubah |
| Membuka kanal kedua sebelum kanal utama tervalidasi | Perbaiki produk, konten, dan konversi lebih dulu |
| Mengandalkan satu konten viral | Bangun katalog konten evergreen yang saling melengkapi |
| Menaikkan volume saat kualitas atau kepatuhan menurun | Jangan menaikkan volume sebelum standar minimum terpenuhi |

## 8. Tugas dan Checklist

Bangun sistem kerja mingguan dengan tugas berikut.

**Tugas 1.** Tetapkan target produksi sesuai kapasitas.

- [ ] Target produksi mingguan tertulis.

**Tugas 2.** Buat template dan SOP, lalu simpan di Database SOP dan Pengetahuan.

- [ ] Template riset produk.
- [ ] Template skrip.
- [ ] SOP pemeriksaan konten.

**Tugas 3.** Rapikan database.

- [ ] Isi Database Konten Affiliate (inilah "database publikasi") dengan kolom baku di 3.7.
- [ ] Isi Database Produk Affiliate, lengkap dengan tanggal pemeriksaan.

**Tugas 4.** Kembangkan satu konten pemenang.

- [ ] Pilih satu konten untuk dikembangkan.
- [ ] Buat variasi dengan sudut berbeda.

**Tugas 5.** Evaluasi.

- [ ] Catat waktu produksi.
- [ ] Evaluasi hasil setelah periode pengujian.
- [ ] Putuskan: Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, atau Hentikan.
- [ ] Putuskan apakah prosesmu layak ditingkatkan (Perluas), berdasarkan lima syarat di 3.2.

## 9. Latihan dan Kunci Jawaban

**1. Sebutkan lima hal yang harus diperiksa sebelum scaling.**
Kunci: Ada bukti hasil; ada pola yang bisa diulang; kualitas produk terjaga; proses produksi dapat dijalankan; risiko dapat dikendalikan.

**2. Konten B hanya 15.000 views tetapi komisinya Rp180.000. Apakah langsung dijadikan format utama?**
Kunci: Tidak. Periksa dulu apakah hasilnya bisa dipertahankan dan apakah komisinya terkait dengan periode dan sumber traffic yang dibandingkan.

**3. Sebutkan 12 langkah alur sistem produksi.**
Kunci: Riset kebutuhan audiens → riset produk → menentukan tujuan konten → menulis skrip → menyiapkan bahan visual → memproduksi konten → mengedit → memeriksa fakta dan kepatuhan → mempublikasikan → menambahkan affiliate link sesuai aturan → mencatat data performa → mengevaluasi hasil.

**4. Apa risiko utama batch production dan cara mengatasinya?**
Kunci: Banyak konten berkualitas rendah jika riset awalnya keliru. Periksa kualitas sebelum memproduksi dalam jumlah besar.

**5. Sebutkan enam bagian template skrip video.**
Kunci: Hook, Konteks, Isi, Bukti, Batasan, CTA.

**6. Pada tahap SOP mana pengungkapan affiliate diperiksa?**
Kunci: Tahap 3 — Pemeriksaan (bersama fakta, hak visual, CTA, dan link).

**7. Kapan sebaiknya kanal kedua dibuka?**
Kunci: Setelah kanal utama tervalidasi dan menghasilkan, ada format yang bisa diadaptasi, audiens sesuai, aturan affiliate dan platform mengizinkan, dan kualitas di kedua kanal bisa dijaga.

**8. Apa delapan langkah menambah produk secara terukur?**
Kunci: Identifikasi kebutuhan → cari kandidat → bandingkan kualitas/harga/komisi/relevansi → pilih kandidat untuk diuji → tetapkan waktu pengujian → catat klik dan transaksi → bandingkan dengan produk berjalan → putuskan (Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, atau Hentikan).

**9. Database mana yang dipakai untuk "database publikasi"?**
Kunci: Database Konten Affiliate. Itu bukan database terpisah.

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika mampu menjalankan proses produksi secara konsisten, mendokumentasikan SOP, mengembangkan konten berdasarkan data, dan menaikkan volume tanpa mengorbankan kualitas.
', 'Modul 20', 15, false, 24, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l25', 'm06', 'Modul 21 — Kepatuhan, Risiko, dan Reputasi', 'modul-21-kepatuhan-risiko-dan-reputasi', '# Modul 21 — Kepatuhan, Risiko, dan Reputasi

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Memahami pentingnya aturan Shopee Affiliate dan aturan platform.
- Mengungkapkan hubungan affiliate secara transparan.
- Menghindari pelanggaran hak cipta.
- Menjaga kejujuran klaim produk.
- Mengelola link rusak dan produk tidak tersedia.
- Melindungi akun dan data.
- Menyusun prosedur menghadapi perubahan kebijakan atau pembatasan akun.

## 2. Ringkasan Konsep Utama

1. Ketentuan program Shopee Affiliate bisa berubah. Ketentuan itu mengatur banyak hal, termasuk pembatalan komisi dan penghentian partisipasi.
2. Aturan platform berbeda dari aturan program. Metode yang boleh di satu platform belum tentu boleh di Shopee Affiliate, dan sebaliknya.
3. Pengungkapan affiliate harus akurat dan mudah terlihat, bukan disembunyikan di antara hashtag.
4. Tidak semua konten di internet bebas dipakai. Periksa hak cipta dan lisensi sebelum memakainya.
5. Klaim produk harus berbasis bukti yang bisa dipertanggungjawabkan.
6. Affiliate bukan pihak yang menangani pesanan, garansi, atau pengembalian dana.
7. Akun affiliate dan akun platform adalah aset bisnis yang perlu diamankan.
8. Risiko operasional utama: link rusak, produk tidak tersedia, perubahan algoritma, dan ketergantungan pada satu platform.
9. Pendapatan affiliate bisa menimbulkan kewajiban administrasi dan pajak.
10. Ada prosedur baku jika kamu menerima peringatan atau pembatasan akun.

## 3. Penjelasan

### 3.1 Aturan Shopee Affiliate

Shopee Affiliate punya ketentuan program yang bisa berubah. Ketentuan itu dapat mengatur:

- Cara promosi.
- Jenis transaksi yang memenuhi syarat.
- Perhitungan komisi.
- Atribusi transaksi.
- Penggunaan link.
- Aktivitas promosi yang dilarang.
- Pembatalan atau penyesuaian komisi.
- Proses pembayaran.
- Pembatasan atau penghentian partisipasi.

Untuk sumber resmi dan cara membaca syarat program, lihat Modul 02. Modul ini menjelaskan prinsip pengelolaan risiko dan tidak menggantikan syarat resmi.

Kebiasaan yang harus kamu terapkan:

1. Baca syarat program yang berlaku untuk akunmu.
2. Periksa ketentuan promosi di kanal yang kamu pakai.
3. Simpan tanggal pemeriksaan dan catatan perubahan penting.
4. Jangan mengandalkan informasi komisi dari sumber tidak resmi jika sumber resmi tersedia.
5. Jika ada ketentuan yang tidak jelas, minta klarifikasi lewat kanal bantuan resmi.

> Metode promosi yang boleh di satu platform tidak otomatis boleh di Shopee Affiliate.

### 3.2 Aturan Platform

Tiap platform punya kebijakan sendiri soal konten, link eksternal, spam, hak cipta, dan promosi komersial. Contoh hal yang diatur:

- Penempatan link.
- Pengungkapan konten komersial.
- Penggunaan musik.
- Penggunaan video pihak lain.
- Konten berulang.
- Manipulasi engagement.
- Klaim produk.
- Pengumpulan data pengguna.

Sebelum memublikasikan konten, periksa aturan platform yang kamu pakai. Jika satu konten akan tayang di beberapa platform, periksa ulang. Konten yang boleh di satu platform belum tentu sesuai untuk platform lain.

### 3.3 Pengungkapan Hubungan Affiliate

Pengungkapan affiliate berarti memberi tahu audiens bahwa kamu bisa memperoleh komisi saat mereka membeli lewat link tertentu. Tujuannya transparansi.

**Kalimat baku:**

- "Link ini adalah affiliate link. Saya dapat menerima komisi jika kamu membeli lewat link ini dan transaksinya memenuhi ketentuan program."

**Variasi pendek yang boleh dipakai:**

- "Sebagian link di konten ini adalah affiliate link."

Aturan penulisan dan penempatan:

- Tulis kalimat yang akurat.
- Jangan menjanjikan bahwa harga tidak berubah atau pembeli tidak kena biaya tambahan. Janji seperti itu hanya boleh jika tertulis di ketentuan resmi. Karena itu, jangan pakai frasa seperti "tanpa biaya tambahan bagimu" dalam kalimat pengungkapan.
- Letakkan pengungkapan di tempat yang mudah terlihat dan dipahami, sesuai ketentuan platform dan aturan yang berlaku.
- Jangan menyembunyikan pengungkapan di antara banyak hashtag. Jangan menaruhnya hanya di halaman yang kemungkinan besar tidak dibuka audiens.

### 3.4 Hak Cipta

Hak cipta melindungi karya yang memenuhi ketentuan hukum, seperti video, foto, musik, ilustrasi, dan tulisan. Tidak semua konten di internet bebas dipakai untuk promosi.

**Risiko yang perlu kamu pahami:**

- Mengunduh video affiliate lain lalu mengunggahnya kembali.
- Memakai musik tanpa izin yang sesuai.
- Mengambil foto produk dari situs lain tanpa memperhatikan hak penggunaannya.
- Menghapus watermark dan mengaku sebagai pembuat.
- Memakai materi promosi berlisensi terbatas untuk keperluan komersial.

**Cara mengurangi risiko:**

1. Buat konten orisinal jika memungkinkan.
2. Pakai materi milikmu sendiri atau yang kamu punya izin pakainya.
3. Periksa lisensi sebelum memakai musik, foto, dan video.
4. Simpan bukti izin atau lisensi.
5. Periksa syarat penggunaan materi promosi dari penjual atau program affiliate.

> Materi yang boleh dibagikan belum tentu boleh diedit, dipakai di iklan, atau diunggah ke semua platform.

### 3.5 Hak Penggunaan Gambar dan Video

Jika kamu tidak punya produk fisik, kamu tetap bisa membuat konten informatif. Tetapi pilih bahan visual dengan benar. Pilihanmu:

- Membuat visual sendiri.
- Membuat ilustrasi orisinal.
- Memakai materi yang jelas mengizinkan penggunaan itu.
- Memakai materi promosi resmi sesuai lisensinya.
- Menyajikan spesifikasi dengan sumber yang bisa diperiksa.

> Jangan mengaku sudah menguji produk secara langsung jika belum.

Jika memakai gambar resmi produk, jangan mengeditnya sampai terkesan produk punya fitur yang sebenarnya tidak ada.

### 3.6 Kejujuran Klaim Produk

Klaim produk harus berdasarkan bukti yang bisa dipertanggungjawabkan.

**Contoh klaim berisiko:**

- "Produk ini pasti awet seumur hidup."
- "Semua orang membutuhkan produk ini."
- "Produk ini paling murah di Indonesia."
- "Produk ini terbukti menyembuhkan penyakit."
- "Saya sudah menggunakannya selama setahun," padahal tidak pernah memakainya.

**Alternatif yang lebih bertanggung jawab:**

- "Spesifikasi yang tercantum menyebutkan bahwa produk ini memiliki fitur tersebut."
- "Harga perlu diperiksa kembali karena bisa berubah."
- "Produk ini mungkin cocok bagi pengguna yang membutuhkan fitur tertentu."
- "Periksa ukuran dan kompatibilitas sebelum membeli."
- "Saya belum menguji produk secara langsung; informasi berikut berdasarkan spesifikasi yang tersedia."

Pakai bahasa yang menjelaskan fakta, batasan, dan kondisi penggunaan.

### 3.7 Mengelola Komentar dan Keluhan

Komentar dan keluhan memberi informasi tentang masalah produk dan kebutuhan audiens. Cara menanganinya:

1. Baca keluhan secara objektif.
2. Bedakan pertanyaan, kritik, dan spam.
3. Jawab berdasarkan fakta.
4. Jangan menjanjikan sesuatu di luar kendalimu.
5. Jika keluhan menyangkut transaksi, arahkan pengguna ke kanal layanan resmi yang tepat.
6. Jika ada informasi salah di kontenmu, perbaiki atau beri klarifikasi.
7. Jangan menghapus kritik yang sah hanya agar produk terkesan sempurna.

> Affiliate bukan pihak yang menangani pesanan, garansi, atau pengembalian dana. Jangan mengaku bisa menyelesaikan masalah transaksi jika kamu tidak punya wewenang.

### 3.8 Keamanan Akun

Akun affiliate dan akun platform adalah aset bisnis. Langkah dasar keamanan:

- Pakai kata sandi unik.
- Aktifkan autentikasi dua faktor jika tersedia.
- Jangan membagikan kode OTP.
- Jangan memberi akses akun kepada pihak yang tidak tepercaya.
- Waspadai pesan yang meminta data login.
- Periksa alamat situs sebelum masuk.
- Simpan metode pemulihan akun.
- Periksa aktivitas akun secara berkala.

> Jangan menyimpan kata sandi atau kode autentikasi di database yang dibagikan ke orang lain.

### 3.9 Risiko Link Rusak

Link rusak menghambat pembelian dan membuat traffic terbuang.

Penyebab yang mungkin:

- URL salah.
- Produk dihapus.
- Link dialihkan secara tidak sesuai.
- Parameter tracking hilang.
- Produk tidak lagi tersedia.
- Halaman tujuan tidak bisa diakses.

> Berhasil membuka halaman produk tidak selalu berarti tracking affiliate berhasil. Jika sistem menyediakan laporan klik atau alat pengujian, pakai itu. Jangan membuat transaksi palsu dan jangan melanggar aturan program.

### 3.10 Risiko Produk Tidak Tersedia

Jika produk tidak tersedia, jangan terus mengarahkan audiens ke halaman yang tidak bisa dipakai. Langkahmu:

- Periksa apakah stok benar-benar habis atau hanya sementara.
- Periksa apakah penjual masih aktif.
- Cari alternatif yang memenuhi kebutuhan serupa.
- Bandingkan spesifikasi, harga, reputasi, dan komisi.
- Perbarui konten atau link jika perubahan itu diperbolehkan.
- Jangan menyebut alternatif sebagai produk identik jika ada perbedaan penting.

> Produk pengganti harus memenuhi kebutuhan audiens, bukan sekadar menawarkan komisi serupa.

### 3.11 Risiko Perubahan Algoritma

Perubahan algoritma bisa memengaruhi distribusi konten. Jangan menganggap satu format akan selalu mendapat jangkauan yang sama.

Strategi pengelolaan risiko:

- Pantau hasil konten dalam beberapa periode.
- Buat variasi format.
- Pertahankan katalog konten evergreen.
- Evaluasi kualitas konten, bukan hanya distribusi.
- Jangan melakukan tindakan manipulatif untuk mengejar jangkauan.
- Jangan menyimpulkan penyebab perubahan performa tanpa data.

> Penurunan views tidak selalu karena algoritma. Penyebabnya bisa perubahan topik, persaingan, kualitas hook, minat audiens, atau variasi performa biasa.

### 3.12 Risiko Ketergantungan pada Satu Platform

Jika seluruh traffic datang dari satu platform, perubahan aturan atau distribusi bisa berdampak besar. Tetapi membuka banyak platform sekaligus menambah beban kerja.

Pendekatan bertahap:

1. Validasi kanal utama.
2. Dokumentasikan format yang menghasilkan.
3. Pilih kanal kedua berdasarkan kecocokan audiens.
4. Adaptasi konten sesuai format dan aturan kanal kedua.
5. Ukur kontribusi tiap kanal.
6. Jangan pertahankan kanal yang menyita banyak waktu tanpa alasan bisnis yang memadai.

> Lakukan diversifikasi kanal setelah kapasitas dan manfaatnya cukup jelas.

### 3.13 Privasi dan Data

Kumpulkan dan simpan hanya data yang dibutuhkan untuk operasional. Contohnya:

- Data performa konten.
- Informasi produk.
- Catatan komisi.
- Catatan pembayaran.
- Informasi publik yang relevan untuk riset produk.

Hindari mengumpulkan data pribadi audiens yang tidak perlu. Jika kamu mengelola data pribadi, perhatikan ketentuan privasi dan hukum yang berlaku. Jangan membagikan data pribadi pembeli atau informasi akun kepada pihak yang tidak berwenang.

### 3.14 Pajak dan Pencatatan Kewajiban

Pendapatan affiliate bisa menimbulkan kewajiban administrasi dan pajak. Kewajiban yang tepat bergantung pada jenis penghasilan, status wajib pajak, bentuk kegiatan usaha, dan peraturan yang berlaku.

Langkah dasar:

- Catat penerimaan komisi.
- Simpan bukti pembayaran.
- Catat biaya yang relevan.
- Simpan dokumen program affiliate.
- Periksa aturan perpajakan yang berlaku.
- Konsultasikan dengan profesional pajak jika situasimu rumit.

> Jangan berasumsi pendapatan dari internet otomatis bebas pajak.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Pengungkapan affiliate | Memberi tahu audiens bahwa kamu bisa memperoleh komisi saat mereka membeli lewat link tertentu; tujuannya transparansi |
| Hak cipta | Perlindungan atas karya yang memenuhi ketentuan hukum, seperti video, foto, musik, ilustrasi, dan tulisan |
| Link rusak | Link yang menghambat pembelian dan membuat traffic terbuang (URL salah, produk dihapus, parameter tracking hilang, dan sebagainya) |
| Ketentuan program Shopee Affiliate | Ketentuan yang dapat mengatur cara promosi, transaksi yang memenuhi syarat, perhitungan komisi, atribusi, penggunaan link, aktivitas terlarang, pembatalan atau penyesuaian komisi, pembayaran, serta pembatasan atau penghentian partisipasi |

## 5. Langkah Praktik

### 5.1 Prosedur pemeriksaan link (7 langkah)

1. Buka link dari tempat yang relevan.
2. Pastikan halaman tujuan benar.
3. Periksa apakah produk tersedia.
4. Pastikan affiliate link dibuat lewat metode resmi.
5. Periksa tracking jika fitur pengujiannya tersedia.
6. Catat tanggal pemeriksaan.
7. Periksa ulang link secara berkala.

Berhasil membuka halaman produk tidak selalu berarti tracking berhasil. Pakai laporan klik atau alat pengujian resmi. Jangan membuat transaksi palsu dan jangan melanggar aturan program.

### 5.2 Prosedur menghadapi pelanggaran atau pembatasan akun (9 langkah)

Jika kamu menerima peringatan atau pembatasan akun:

1. Baca pemberitahuan resmi.
2. Catat tanggal dan alasan yang disebutkan.
3. Periksa konten, link, dan aktivitas yang relevan.
4. Simpan bukti yang diperlukan.
5. Hentikan aktivitas yang jelas melanggar.
6. Ajukan keberatan lewat kanal resmi jika kamu merasa keputusan itu tidak tepat.
7. Ikuti prosedur pemulihan yang ditentukan.
8. Jangan mencoba menghindari pembatasan dengan cara yang melanggar aturan.
9. Siapkan rencana operasional alternatif yang tetap sesuai kebijakan.

> Jangan menghapus bukti yang relevan sebelum kamu memahami masalahnya.

## 6. Contoh: Ringkasan Risiko Kepatuhan

Tabel ini merangkum bagian 3 dan 5 untuk kamu tempel di catatan kerja. Penjelasan lengkapnya ada di bagian tersebut.

| Area risiko | Apa yang harus dilakukan |
| --- | --- |
| Ketentuan program | Baca syarat resmi, catat tanggal pemeriksaan, minta klarifikasi bila tidak jelas |
| Aturan platform | Periksa ulang aturan tiap platform sebelum publikasi |
| Pengungkapan affiliate | Pakai kalimat baku di tempat yang mudah terlihat; jangan janjikan harga tetap |
| Hak cipta dan visual | Pakai materi sendiri atau berizin; simpan bukti izin; jangan edit visual resmi yang menyesatkan |
| Klaim dan keluhan | Klaim berbasis spesifikasi; arahkan keluhan transaksi ke kanal resmi; jangan hapus kritik sah |
| Keamanan akun dan data | Kata sandi unik, 2FA, jangan simpan kredensial di database bersama, simpan data seperlunya |
| Link rusak dan produk tidak tersedia | Periksa link berkala dengan alat resmi; cari pengganti yang memenuhi kebutuhan audiens |
| Algoritma dan satu platform | Pantau beberapa periode, variasikan format, tambah kanal secara bertahap |
| Pajak | Catat pemasukan dan biaya; konsultasi ke profesional pajak bila rumit |
| Pembatasan akun | Ikuti 9 langkah di 5.2; simpan bukti dulu |

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Mengandalkan informasi komisi dari sumber tidak resmi | Pakai sumber resmi; minta klarifikasi lewat kanal bantuan resmi |
| Menganggap metode yang boleh di satu platform otomatis boleh di Shopee Affiliate | Periksa kedua set aturan secara terpisah |
| Mempublikasikan konten yang sama ke banyak platform tanpa pemeriksaan ulang | Periksa ulang per platform |
| Menyembunyikan pengungkapan affiliate | Taruh di tempat yang mudah terlihat dan dipahami |
| Menulis "tanpa biaya tambahan" atau janji harga tetap di pengungkapan | Pakai kalimat baku di 3.3 |
| Memakai materi orang lain tanpa memeriksa lisensi | Periksa lisensi dan simpan bukti izin |
| Mengaku sudah menguji produk padahal belum | Nyatakan bahwa informasi berdasarkan spesifikasi yang tersedia |
| Menghapus kritik yang sah | Jawab berdasarkan fakta; perbaiki informasi yang salah |
| Menyimpan kata sandi atau OTP di database bersama | Jangan simpan kredensial di database operasional |
| Menguji tracking dengan transaksi palsu | Pakai laporan klik atau alat pengujian resmi |
| Menyimpulkan penurunan views pasti karena algoritma | Pantau beberapa periode dan periksa faktor lain |
| Menghapus bukti saat akun dibatasi | Simpan bukti dulu, pahami masalahnya, lalu tempuh kanal resmi |

## 8. Tugas dan Checklist

**Tugas 1.** Pakai checklist kepatuhan ini untuk setiap konten sebelum terbit.

- [ ] Produk layak direkomendasikan.
- [ ] Klaim berdasarkan bukti.
- [ ] Pengungkapan affiliate tersedia dan memakai kalimat baku.
- [ ] Gambar dan video digunakan secara sah.
- [ ] Link dibuat sesuai aturan.
- [ ] CTA tidak menyesatkan.
- [ ] Tidak ada spam atau manipulasi.
- [ ] Tidak ada data pribadi yang terungkap.
- [ ] Aturan platform sudah diperiksa.

**Tugas 2.** Siapkan sistem pendukung.

- [ ] Perubahan kebijakan dicatat beserta tanggalnya.
- [ ] Ada prosedur jika link atau produk bermasalah.
- [ ] Ada rencana jika kanal utama dibatasi.

## 9. Latihan dan Kunci Jawaban

**1. Sebutkan sembilan hal yang dapat diatur ketentuan program Shopee Affiliate.**
Kunci: Cara promosi; jenis transaksi yang memenuhi syarat; perhitungan komisi; atribusi transaksi; penggunaan link; aktivitas promosi yang dilarang; pembatalan atau penyesuaian komisi; proses pembayaran; pembatasan atau penghentian partisipasi.

**2. Mengapa pengungkapan affiliate tidak boleh diletakkan di antara banyak hashtag?**
Kunci: Pengungkapan harus mudah terlihat dan dipahami. Menyembunyikannya bertentangan dengan tujuan transparansi.

**3. Sebutkan lima risiko hak cipta.**
Kunci: Mengunduh video affiliate lain lalu mengunggahnya kembali; memakai musik tanpa izin; mengambil foto produk tanpa memperhatikan hak penggunaan; menghapus watermark dan mengaku sebagai pembuat; memakai materi promosi berlisensi terbatas untuk keperluan komersial.

**4. Halaman produk terbuka normal. Apakah berarti tracking affiliate berhasil?**
Kunci: Tidak. Pakai laporan klik atau alat pengujian yang tersedia, tanpa membuat transaksi palsu atau melanggar aturan program.

**5. Audiens mengeluh pesanannya belum sampai. Apa yang harus dilakukan affiliate?**
Kunci: Jawab berdasarkan fakta, jangan menjanjikan di luar kendali, dan arahkan ke kanal layanan resmi. Affiliate bukan pihak yang menangani pesanan, garansi, atau pengembalian dana.

**6. Produk utama habis stok. Apa langkahnya?**
Kunci: Periksa apakah stok habis permanen atau sementara; periksa penjual; cari alternatif serupa; bandingkan spesifikasi, harga, reputasi, dan komisi; perbarui konten atau link jika diperbolehkan; jangan menyebut alternatif identik bila ada perbedaan penting.

**7. Views turun tajam. Bolehkah langsung disimpulkan karena algoritma?**
Kunci: Tidak. Bisa karena perubahan topik, persaingan, kualitas hook, minat audiens, atau variasi biasa. Jangan menyimpulkan tanpa data.

**8. Akunmu dibatasi. Urutkan langkahnya.**
Kunci: Baca pemberitahuan resmi → catat tanggal dan alasan → periksa konten, link, dan aktivitas → simpan bukti → hentikan aktivitas yang jelas melanggar → ajukan keberatan lewat kanal resmi bila perlu → ikuti prosedur pemulihan → jangan menghindari pembatasan dengan cara melanggar → siapkan rencana alternatif yang sesuai kebijakan.

**9. Benarkah pendapatan dari internet otomatis bebas pajak?**
Kunci: Tidak. Pendapatan affiliate bisa menimbulkan kewajiban administrasi dan pajak sesuai status dan ketentuan yang berlaku.

**10. Kalimat pengungkapan mana yang benar: "Link ini adalah affiliate link. Saya dapat menerima komisi jika kamu membeli lewat link ini dan transaksinya memenuhi ketentuan program" atau "Beli lewat link ini tanpa biaya tambahan"?**
Kunci: Yang pertama. Frasa "tanpa biaya tambahan" tidak boleh dipakai kecuali tertulis di ketentuan resmi.

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika mampu memeriksa kepatuhan sebelum publikasi, melindungi akun dan reputasi, serta menangani risiko dengan prosedur yang jelas.
', 'Modul 21', 15, false, 25, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l26', 'm06', 'Modul 22 — Advanced Strategy', 'modul-22-advanced-strategy', '# Modul 22 — Advanced Strategy

## 1. Tujuan Pembelajaran

Modul ini mengajarkan cara mengambil keputusan bisnis yang lebih strategis. Dasarnya adalah data produk, konten, traffic, konversi, dan komisi.

Setelah modul ini, kamu mampu:

- Menilai kontribusi setiap konten terhadap komisi.
- Menemukan pola produk dan audiens yang menghasilkan.
- Mengidentifikasi pola musiman.
- Mengembangkan konten evergreen.
- Mengelola katalog konten di Database Konten Affiliate.
- Mengidentifikasi kejenuhan audiens.
- Melakukan diversifikasi traffic.
- Menghitung opportunity cost.
- Menentukan prioritas berdasarkan dampak dan usaha.
- Membangun positioning yang jelas.
- Menggunakan data sebagai dasar keputusan.

## 2. Ringkasan Konsep Utama

1. Tidak semua konten memberi kontribusi yang sama. Pola views, klik, dan pesanan bisa sangat berbeda.
2. Satu produk bisa menghasilkan performa berbeda pada audiens berbeda. Anggap perbedaan itu **hipotesis yang perlu diuji**.
3. Pola musiman harus dibuktikan dengan data historis, bukan diasumsikan.
4. Konten evergreen relevan lebih lama, tetapi **evergreen tidak berarti abadi**.
5. Katalog konten dipakai untuk mengambil keputusan, bukan sekadar menyimpan daftar link. Katalog ini adalah Database Konten Affiliate yang sudah kamu punya.
6. Pembaruan konten adalah eksperimen yang hasilnya perlu diukur.
7. Kejenuhan audiens punya tanda-tanda, tetapi tanda itu tidak otomatis membuktikan kejenuhan.
8. Opportunity cost: waktu untuk satu produk berarti waktu itu tidak dipakai untuk produk lain.
9. Prioritas ditentukan dengan matriks dampak × usaha.
10. Positioning harus terlihat dalam pemilihan produk, gaya konten, kualitas informasi, dan konsistensi audiens. Nama akun atau slogan saja tidak cukup.
11. Setiap keputusan penting punya alasan dan bukti yang bisa ditinjau. Hasil negatif juga dicatat.

## 3. Penjelasan

### 3.1 Analisis Kontribusi Konten terhadap Komisi

Ada konten dengan banyak views tetapi sedikit klik. Ada konten dengan banyak klik tetapi sedikit pesanan. Ada pula konten dengan views rendah yang menghasilkan komisi cukup besar.

**Data yang dikumpulkan untuk setiap konten:**

- ID konten.
- Produk yang dipromosikan.
- Tanggal publikasi.
- Views.
- Klik affiliate yang dapat diatribusikan.
- Pesanan.
- Komisi estimasi.
- Komisi disetujui.
- Waktu produksi.
- Catatan eksperimen.

**Cara mengambil keputusan:**

- **Views tinggi dan komisi tinggi:** evaluasi kemungkinan pengembangan.
- **Views tinggi, klik rendah:** evaluasi relevansi produk dan CTA.
- **Klik tinggi, pesanan rendah:** periksa produk, harga, audiens, dan halaman tujuan.
- **Views rendah, konversi baik:** uji cara meningkatkan distribusi tanpa mengubah faktor yang sudah bekerja.
- **Semua metrik rendah:** periksa kembali kebutuhan audiens dan kualitas ide.

> Jangan menganggap setiap konten harus langsung menghasilkan komisi. Konten edukasi yang membantu audiens memahami masalah juga bisa berkontribusi secara tidak langsung.

### 3.2 Analisis Performa Berdasarkan Produk dan Audiens

Satu produk bisa menghasilkan performa berbeda pada audiens berbeda. Stand laptop, misalnya, relevan untuk mahasiswa, pekerja jarak jauh, pengguna meja kerja kecil, dan pengguna laptop untuk belajar.

Mahasiswa mungkin lebih memperhatikan harga dan portabilitas. Pekerja jarak jauh mungkin lebih memperhatikan kenyamanan dan kesesuaian dengan ruang kerja.

> Ini **hipotesis yang perlu diuji**, bukan fakta untuk semua anggota kelompok tersebut. Jangan menyimpulkan satu segmen pasti lebih menguntungkan hanya dari satu konten.

### 3.3 Analisis Pola Musiman

Permintaan produk bisa berubah menurut waktu. Contoh kemungkinan pola musiman:

- Perlengkapan sekolah menjelang tahun ajaran baru.
- Produk hadiah menjelang hari besar.
- Peralatan rumah menjelang periode pindahan.
- Produk tertentu saat ada promosi besar.

Pola musiman berbeda menurut produk, harga, audiens, dan periode.

> Jika belum punya data historis, jangan menyebut suatu produk pasti laku pada musim tertentu. Catat sebagai hipotesis untuk diuji.

### 3.4 Pengembangan Konten Evergreen

Konten evergreen tetap relevan dalam waktu relatif panjang. Contoh:

- Cara memilih ukuran produk.
- Panduan memeriksa spesifikasi.
- Perbedaan beberapa tipe produk.
- Kesalahan saat membeli.
- Cara menggunakan fitur.
- Panduan memilih produk sesuai kebutuhan.

Konten tentang harga promo hari ini atau stok terbatas lebih cepat kehilangan relevansi.

**Mengapa penting.** Konten evergreen tetap membantu audiens setelah tanggal publikasi, selama informasi dan produknya masih relevan. **Namun evergreen tidak berarti abadi.** Harga, spesifikasi, aturan, dan ketersediaan bisa berubah.

**Cara mengembangkan katalog evergreen:**

- Identifikasi pertanyaan pembeli yang sering muncul.
- Buat konten yang menjawab pertanyaan itu.
- Cantumkan informasi yang bisa diperiksa.
- Hindari klaim harga yang tidak bertanggal.
- Periksa ulang link dan informasi secara berkala.
- Perbarui konten jika platform mengizinkan dan pembaruan memberi nilai baru.

### 3.5 Mengelola Katalog Konten

Katalog konten adalah daftar terstruktur dari semua konten yang sudah kamu buat. Katalog membantu kamu tahu konten mana yang dipertahankan, dikembangkan, diperbarui, atau dihentikan.

**Katalog konten bukan database baru.** Ia adalah **Database Konten Affiliate** yang kamu bangun sejak Modul 03 dan lengkapi di Modul 16. Kamu cukup membuat tampilan (view) atau filter dari database itu. Jangan membuat tabel kedua yang berisi data yang sama.

Kolom yang dipakai memakai nama baku Database Konten Affiliate:

| Kolom | Fungsi |
| --- | --- |
| ID Konten | Identitas unik |
| Judul Konten | Memudahkan pencarian |
| Produk | Mengetahui produk yang dipromosikan |
| Format | Mengetahui bentuk konten |
| Tanggal Publikasi | Mengukur umur konten |
| URL Konten | Membuka konten |
| Views | Mengukur distribusi |
| Klik | Mengukur tindakan audiens |
| Komisi Disetujui | Mengukur kontribusi |
| Status Konten | Posisi konten dalam alur kerja (Ide sampai Selesai) |
| Catatan Evaluasi | Menyimpan pelajaran |

**Status katalog.** Untuk keperluan keputusan, kamu bisa mengelompokkan konten ke tiga label: Aktif, perlu diperbarui, dan dihentikan. Label ini adalah tampilan atau filter, bukan kolom baru. Dasarnya adalah Status Konten (misalnya Terbit atau Evaluasi) dan keputusan evaluasi baku:

| Label katalog | Dasarnya |
| --- | --- |
| Aktif | Konten Terbit yang masih relevan; keputusannya Lanjutkan |
| Perlu diperbarui | Keputusan Optimalkan atau Uji ulang (informasi usang, link bermasalah, hasil belum jelas) |
| Dihentikan | Keputusan Hentikan; Status Konten bisa dipindah ke Selesai |

Keputusan baku setelah evaluasi selalu salah satu dari: Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, Hentikan.

> Gunakan katalog untuk mengambil keputusan, bukan hanya menyimpan daftar link.

### 3.6 Memperbarui Konten Lama

Konten lama bisa diperbarui jika masih relevan dan perubahannya memberi manfaat nyata. Contoh pembaruan:

- Mengganti informasi harga yang sudah tidak berlaku.
- Memperbaiki spesifikasi yang salah.
- Memperbarui alternatif produk.
- Mengganti link yang tidak lagi valid.
- Menambahkan jawaban atas pertanyaan audiens.
- Memperjelas keterbatasan produk.

> Jangan menganggap pembaruan pasti menaikkan views atau komisi. Pembaruan adalah eksperimen yang hasilnya perlu diukur.

### 3.7 Analisis Kejenuhan Audiens

Kejenuhan audiens terjadi ketika topik, format, atau promosi yang sama disampaikan terlalu sering tanpa nilai baru.

**Tanda yang mungkin muncul:**

- Engagement menurun.
- CTR menurun.
- Komentar menunjukkan kebosanan.
- Audiens berulang kali melihat promosi yang sama.
- Views menurun meskipun jumlah publikasi bertambah.

> Tanda-tanda ini tidak selalu membuktikan kejenuhan. Penurunan bisa disebabkan faktor lain.

**Cara mengatasinya:**

- Ubah sudut pembahasan.
- Jawab pertanyaan audiens.
- Tambahkan informasi tentang keterbatasan produk.
- Gunakan format demonstrasi atau perbandingan.
- Kurangi promosi yang tidak relevan.
- Periksa data sebelum memutuskan mengganti niche.

Tujuannya bukan selalu mengganti produk. Tujuannya menemukan cara yang lebih berguna untuk menjelaskan kebutuhan yang sama.

### 3.8 Diversifikasi Sumber Traffic

Sumber traffic adalah tempat audiens menemukan konten atau affiliate link kamu. Contoh:

- TikTok.
- Instagram.
- YouTube.
- Mesin pencari.
- Website atau blog.
- Komunitas yang mengizinkan promosi sesuai aturan.

Setiap sumber punya karakteristik, kebutuhan produksi, dan kebijakan berbeda.

> Jika waktumu terbatas, kuasai satu channel utama lebih dulu daripada membagi tenaga terlalu tipis.

### 3.9 Opportunity Cost

Opportunity cost adalah nilai dari alternatif terbaik yang kamu lepaskan saat memilih suatu aktivitas. Dalam affiliate marketing, waktu untuk satu produk berarti waktu itu tidak dipakai untuk produk atau konten lain.

Contoh:

- **Opsi A:** membuat 10 konten produk berkomisi rendah.
- **Opsi B:** membuat 5 konten untuk produk dengan kebutuhan audiens lebih jelas.

> Opsi B belum tentu lebih baik. Bandingkan hasil aktual atau lakukan pengujian.

**Yang perlu dipertimbangkan:** waktu yang diperlukan, peluang komisi, ketidakpastian hasil, potensi penggunaan ulang konten, risiko produk, dan peluang lain yang harus ditunda.

Jangan hanya membandingkan nominal komisi. Bandingkan juga waktu, risiko, dan kemungkinan hasil berulang.

### 3.10 Prioritas Berdasarkan Dampak dan Usaha

| Dampak potensial | Usaha | Prioritas awal |
| --- | --- | --- |
| Tinggi | Rendah | Kerjakan lebih dahulu |
| Tinggi | Tinggi | Rencanakan dan ukur |
| Rendah | Rendah | Kerjakan jika relevan |
| Rendah | Tinggi | Tunda atau hindari |

Contoh:

- Memperbaiki link rusak pada konten yang sudah menghasilkan: dampak tinggi, usaha rendah.
- Mengubah seluruh niche tanpa data: usaha tinggi, hasil tidak pasti.
- Membuat laporan otomatis sederhana: bisa mengurangi pekerjaan administratif.
- Membuat banyak akun sekaligus: menambah beban dan risiko kepatuhan.

> Prioritas harus mempertimbangkan urgensi, dampak terhadap komisi, dan risiko.

### 3.11 Pengembangan Positioning

Positioning adalah cara kamu ingin dikenal oleh audiens. Positioning yang jelas membantu audiens memahami alasan mengikuti kontenmu.

Contoh positioning:

- Panduan memilih perlengkapan kerja terjangkau.
- Rekomendasi alat belajar untuk mahasiswa.
- Perbandingan perlengkapan rumah berdasarkan fungsi dan harga.
- Panduan memilih produk teknologi berdasarkan kebutuhan.

> Positioning bukan sekadar nama akun atau slogan. Ia harus terlihat dalam pemilihan produk, gaya konten, kualitas informasi, dan konsistensi audiens yang dilayani.
>
> Jangan memilih positioning hanya karena suatu niche sedang populer. Pastikan kamu bisa membuat konten relevan secara konsisten.

### 3.12 Sistem Keputusan Berbasis Data

Sistem ini berarti setiap keputusan penting punya alasan dan bukti yang bisa ditinjau. Format yang dipakai:

- **Masalah:** klik affiliate menurun.
- **Hipotesis:** CTA kurang jelas.
- **Bukti awal:** views relatif stabil, tetapi CTR turun.
- **Eksperimen:** uji dua variasi CTA pada konten dengan topik sebanding.
- **Metrik:** CTR, klik, CVR, dan komisi disetujui.
- **Periode:** tentukan sebelum pengujian, sesuai volume traffic.
- **Keputusan:** Lanjutkan variasi yang lebih baik bila datanya memadai, atau Uji ulang bila hasil belum meyakinkan.

> Catat hasil negatif juga. Eksperimen yang gagal tetap berguna jika membantu menyingkirkan hipotesis yang lemah.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Konten evergreen | Konten yang tetap relevan dalam waktu relatif panjang |
| Katalog konten | Tampilan terstruktur dari Database Konten Affiliate, berisi semua konten yang sudah dibuat |
| Kejenuhan audiens | Kondisi ketika topik, format, atau promosi yang sama disampaikan terlalu sering tanpa nilai baru |
| Sumber traffic | Tempat audiens menemukan konten atau affiliate link |
| Opportunity cost | Nilai dari alternatif terbaik yang dilepaskan saat memilih suatu aktivitas |
| Positioning | Cara kamu ingin dikenal oleh audiens |
| Sistem keputusan berbasis data | Setiap keputusan penting punya alasan dan bukti yang bisa ditinjau |

## 5. Langkah Praktik

### A. Analisis performa per produk dan audiens

1. Tentukan segmen audiens yang ingin diuji.
2. Buat konten dengan pesan yang relevan bagi segmen itu.
3. Gunakan produk yang sesuai.
4. Catat views, klik, konversi, dan komisi.
5. Bandingkan hasil dengan segmen lain jika data tersedia.
6. Tentukan segmen yang layak diprioritaskan.

### B. Analisis pola musiman

1. Kumpulkan data performa menurut tanggal.
2. Kelompokkan per minggu atau bulan.
3. Catat perubahan views, klik, pesanan, dan komisi.
4. Bandingkan periode yang sejenis jika tersedia.
5. Periksa apakah perubahan berkaitan dengan promosi, perubahan harga, atau ketersediaan.
6. Gunakan hasilnya untuk merencanakan konten berikutnya.

### C. Memperbarui konten lama

1. Periksa performa sebelumnya.
2. Identifikasi informasi yang sudah usang.
3. Pastikan perubahan diperbolehkan oleh platform.
4. Perbarui informasi yang diperlukan.
5. Periksa link.
6. Catat tanggal pembaruan di Catatan Evaluasi.
7. Evaluasi performa setelah perubahan.

### D. Menentukan sumber traffic kedua

1. Pelajari perilaku audiens.
2. Pilih channel yang sesuai dengan format konten.
3. Periksa aturan promosi affiliate.
4. Adaptasi konten, jangan sekadar menyalin.
5. Ukur klik dan komisi secara terpisah.
6. Bandingkan kontribusi dan waktu kerja.

### E. Membangun positioning

1. Pilih kelompok audiens.
2. Identifikasi masalah utama mereka.
3. Tentukan jenis bantuan yang akan kamu berikan.
4. Tentukan kriteria produk yang akan dipromosikan.
5. Tentukan format konten utama.
6. Uji respons audiens.
7. Perbaiki positioning berdasarkan data.

## 6. Contoh dan Perhitungan

Rumus:

```
Komisi per 1.000 views = Komisi disetujui ÷ Views × 1.000
```

Data berikut adalah simulasi, bukan tarif resmi Shopee.

| Konten | Views | Klik | Komisi disetujui |
| --- | --- | --- | --- |
| A | 100.000 | 1.000 | Rp100.000 |
| B | 20.000 | 600 | Rp180.000 |
| C | 50.000 | 500 | Rp50.000 |

Komisi per 1.000 views:

- Konten A: Rp100.000 ÷ 100.000 × 1.000 = **Rp1.000**
- Konten B: Rp180.000 ÷ 20.000 × 1.000 = **Rp9.000**
- Konten C: Rp50.000 ÷ 50.000 × 1.000 = **Rp1.000**

Konten B menghasilkan komisi per 1.000 views tertinggi dalam contoh ini. Sebelum menyimpulkan B adalah format terbaik, periksa tiga hal. Apakah klik dan komisi bisa dihubungkan wajar dengan konten itu? Apakah periode pengukurannya sama? Apakah datanya cukup?

Untuk memilih pekerjaan, pakai matriks dampak × usaha di bagian 3.10.

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Menganggap setiap konten harus langsung menghasilkan komisi | Konten edukasi bisa berkontribusi secara tidak langsung |
| Menyimpulkan konten B format terbaik dari satu tabel | Periksa hubungan data, kesamaan periode, dan kecukupan data |
| Menganggap karakteristik segmen audiens sebagai fakta | Perlakukan sebagai hipotesis yang diuji |
| Menyimpulkan segmen lebih menguntungkan dari satu konten | Bandingkan dengan segmen lain jika data tersedia |
| Menyebut produk pasti laku pada musim tertentu tanpa data historis | Catat sebagai hipotesis untuk diuji |
| Menganggap konten evergreen abadi | Periksa berkala; harga, spesifikasi, aturan, dan ketersediaan bisa berubah |
| Menjadikan katalog sekadar daftar link, atau membuat database kedua | Pakai Database Konten Affiliate sebagai katalog dan ambil keputusan darinya |
| Menganggap pembaruan pasti menaikkan views atau komisi | Perlakukan pembaruan sebagai eksperimen yang diukur |
| Menyimpulkan kejenuhan dari satu indikator | Periksa data sebelum mengganti niche |
| Menyalin konten apa adanya ke channel kedua | Adaptasi sesuai format dan aturan channel |
| Membagi tenaga ke banyak channel saat waktu terbatas | Kuasai satu channel utama lebih dulu |
| Membandingkan hanya nominal komisi antar opsi | Bandingkan juga waktu, risiko, dan kemungkinan hasil berulang |
| Mengubah seluruh niche tanpa data | Usaha tinggi dengan hasil tidak pasti; putuskan dengan data |
| Memilih positioning karena niche sedang populer | Pastikan kamu bisa memproduksi konten relevan secara konsisten |
| Membuang hasil eksperimen negatif | Catat juga; berguna untuk menyingkirkan hipotesis lemah |

## 8. Tugas dan Checklist

- [ ] Tugas 1: Buat tampilan katalog konten dari Database Konten Affiliate.
- [ ] Tugas 2: Hitung komisi per 1.000 views untuk konten yang datanya tersedia.
- [ ] Tugas 3: Identifikasi produk dan audiens yang menunjukkan hasil baik.
- [ ] Tugas 4: Tentukan konten evergreen.
- [ ] Tugas 5: Tandai konten yang perlu diperbarui.
- [ ] Tugas 6: Periksa tanda-tanda kejenuhan.
- [ ] Tugas 7: Evaluasi peluang sumber traffic kedua.
- [ ] Tugas 8: Buat matriks dampak dan usaha.
- [ ] Tugas 9: Rumuskan positioning akunmu.
- [ ] Tugas 10: Buat tiga eksperimen dengan hipotesis dan metrik jelas (catat di Database Eksperimen).

## 9. Latihan dan Kunci Jawaban

**1. Konten A: 100.000 views, komisi Rp100.000. Konten B: 20.000 views, komisi Rp180.000. Hitung komisi per 1.000 views masing-masing.**
Kunci: A = Rp1.000; B = Rp9.000.

**2. Views tinggi tetapi klik rendah. Apa yang dievaluasi?**
Kunci: Relevansi produk dan CTA.

**3. Klik tinggi tetapi pesanan rendah. Apa yang diperiksa?**
Kunci: Produk, harga, audiens, dan halaman tujuan.

**4. Views rendah tetapi konversi baik. Apa langkahnya?**
Kunci: Uji cara meningkatkan distribusi tanpa mengubah faktor yang sudah bekerja.

**5. Sebutkan lima tanda kemungkinan kejenuhan audiens.**
Kunci: Engagement menurun; CTR menurun; komentar menunjukkan kebosanan; audiens berulang kali melihat promosi yang sama; views menurun meskipun jumlah publikasi bertambah. Tanda ini tidak otomatis membuktikan kejenuhan.

**6. Apa prioritas awal untuk pekerjaan berdampak tinggi dengan usaha rendah?**
Kunci: Kerjakan lebih dahulu. Contoh: memperbaiki link rusak pada konten yang sudah menghasilkan.

**7. Opsi A (10 konten produk komisi rendah) atau Opsi B (5 konten produk dengan kebutuhan audiens lebih jelas): mana yang lebih baik?**
Kunci: Opsi B belum tentu lebih baik. Bandingkan hasil aktual atau lakukan pengujian. Pertimbangkan waktu, peluang komisi, ketidakpastian hasil, potensi penggunaan ulang konten, risiko produk, dan peluang yang tertunda.

**8. Tuliskan format keputusan berbasis data untuk masalah "klik affiliate menurun".**
Kunci: Masalah: klik affiliate menurun. Hipotesis: CTA kurang jelas. Bukti awal: views relatif stabil tetapi CTR turun. Eksperimen: uji dua variasi CTA pada konten topik sebanding. Metrik: CTR, klik, CVR, komisi disetujui. Periode: ditentukan sebelum pengujian sesuai volume traffic. Keputusan: Lanjutkan variasi yang lebih baik bila datanya memadai, atau Uji ulang bila belum meyakinkan.

**9. Apakah katalog konten adalah database baru? Jelaskan.**
Kunci: Bukan. Katalog konten adalah Database Konten Affiliate (dengan kolom baku). Label Aktif, perlu diperbarui, dan dihentikan hanyalah tampilan atau filter dari Status Konten dan keputusan baku.

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika mampu menilai kontribusi konten, mengidentifikasi peluang pertumbuhan, dan menetapkan prioritas berdasarkan dampak bisnis, bukan sekadar views atau jumlah publikasi.
', 'Modul 22', 15, false, 26, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l27', 'm06', 'Modul 23 — Otomasi dan Sistem Kerja', 'modul-23-otomasi-dan-sistem-kerja', '# Modul 23 — Otomasi dan Sistem Kerja

## 1. Tujuan Pembelajaran

Setelah modul ini, kamu mampu:

- Merapikan dan menyempurnakan database kerja di Notion.
- Membuat template riset, skrip, dan kalender konten.
- Mengurangi pekerjaan administratif yang berulang.
- Memakai spreadsheet untuk analisis.
- Menyimpan backup data.
- Mengelola versi konten.
- Menjaga otomasi tetap sesuai aturan platform.

## 2. Ringkasan Konsep Utama

1. Otomasi = menjalankan pekerjaan berulang dengan intervensi manual yang lebih sedikit. Otomasi **tidak selalu berarti memakai bot**.
2. Untuk bisnis affiliate yang baru berkembang, template dan rumus sederhana sering sudah cukup.
3. Prinsip utama: otomasi mengurangi pekerjaan berulang, **bukan menciptakan kerumitan baru**.
4. Jangan mengotomatisasi proses yang belum kamu pahami. Struktur data yang salah hanya menyebarkan kesalahan lebih cepat.
5. Notion punya 6 database baku. Di modul ini kamu merapikan Database Produk Affiliate, Konten Affiliate, Eksperimen, Komisi Affiliate (database "keuangan"), dan SOP dan Pengetahuan.
6. Template inti: riset produk, skrip, kalender konten, laporan mingguan.
7. Spreadsheet dipakai menghitung CTR, CVR, EPC, dan komisi per 1.000 views.
8. Ada batas tegas: otomasi tidak boleh dipakai untuk klik palsu, spam, atau manipulasi.

## 3. Penjelasan

### 3.1 Pengertian Otomasi

Otomasi adalah memakai alat atau sistem untuk menjalankan pekerjaan berulang dengan intervensi manual yang lebih sedikit. Contohnya:

- Template database.
- Rumus spreadsheet.
- Pengingat evaluasi.
- Laporan dari data yang sudah dikumpulkan.
- Penyalinan data antartabel lewat integrasi yang diizinkan.

Otomasi tidak selalu berarti bot. Untuk bisnis yang baru berkembang, template dan rumus sederhana sering sudah membantu.

> **Prinsip utama:** otomasi mengurangi pekerjaan berulang, bukan menciptakan kerumitan baru. Jangan mengotomatisasi proses yang belum dipahami. Jika struktur datanya salah, otomasi hanya menyebarkan kesalahan lebih cepat.

### 3.2 Database Notion yang Dirapikan

Notion punya **6 database baku**: Database Produk Affiliate, Database Link Affiliate, Database Konten Affiliate, Database Komisi Affiliate, Database Eksperimen, dan Database SOP dan Pengetahuan. Kamu sudah membangun sebagian besarnya di modul-modul sebelumnya. Di modul ini kamu tidak membuat database baru. Kamu merapikan dan menyempurnakan lima di antaranya, lalu menghubungkannya.

**A. Database Produk Affiliate** (kolom baku, yang paling berguna untuk kerja harian)

- Nama Produk, ID Produk, Kategori.
- Link Produk.
- Harga Saat Dicek.
- Tarif Komisi (tarif + sumber verifikasi).
- Rating, Jumlah Ulasan, Kualitas Penjual.
- Potensi Konten, Kelayakan Program, Skor Produk.
- Status (Riset / Siap Dipromosikan / Dihentikan).
- Tanggal Pemeriksaan.
- Catatan.

**B. Database Konten Affiliate**

- Judul Konten, ID Konten.
- Produk (relasi) dan Link (relasi).
- Kanal, Format, Pilar Konten, Hook.
- Tanggal Publikasi, URL Konten.
- Views, Klik, Pesanan.
- Komisi Estimasi, Komisi Disetujui, Komisi Dibayarkan.
- Status Konten, Catatan Evaluasi.

**C. Database Eksperimen**

- Nama Eksperimen, ID Eksperimen.
- Tujuan, Hipotesis.
- Variabel Utama, Metrik Utama, Baseline, Hasil.
- Tanggal Mulai, Tanggal Akhir, Ukuran Sampel, Keterbatasan.
- Keputusan, Alasan Keputusan, Pelajaran.

**D. Database Komisi Affiliate (inilah "database keuangan")**

Database ini mencatat satu baris per periode. Isinya komisi menurut empat tahap (Estimasi, Pending, Disetujui, Dibayarkan), biaya, bukti, dan status rekonsiliasi.

- Periode, Tanggal Mulai, Tanggal Akhir.
- Klik, Pesanan, Pesanan Dibatalkan.
- Komisi Estimasi, Komisi Pending, Komisi Disetujui, Komisi Dibayarkan.
- Biaya Usaha, Jam Kerja.
- Status Pembayaran, Bukti Pembayaran.
- Catatan Rekonsiliasi.

Nama status di dashboard Shopee bisa berbeda dari empat tahap ini. Misalnya "Dalam proses" untuk Pending. Cocokkan dengan dashboard yang kamu pakai.

**E. Database SOP dan Pengetahuan**

Simpan template dari bagian 5 dan SOP kerjamu di sini. Kolomnya: Nama Proses, Bagian, Status SOP, Terakhir Diperbarui, Sumber, Prosedur, Catatan Tinjauan.

> **Jangan menyimpan kata sandi, OTP, atau data rahasia akun di database operasional yang tidak dirancang untuk itu.**

### 3.3 Pengelolaan Versi Konten

Versi konten adalah catatan perubahan pada suatu materi. Contoh:

- **V1:** skrip awal.
- **V2:** hook diperbaiki.
- **V3:** spesifikasi diperbarui.
- **V4:** CTA disesuaikan.

Simpan catatan perubahan yang penting supaya kamu tahu apa yang diubah dan mengapa. Untuk konten yang sudah terbit, catat tanggal perubahan dan dampaknya pada performa jika bisa diukur.

### 3.4 Pengelolaan Tugas

Status tugas konten memakai pilihan **Status Konten** di Database Konten Affiliate. Ada sembilan tahap berurutan:

- Ide.
- Riset.
- Skrip.
- Produksi.
- Pemeriksaan.
- Siap Publikasi.
- Terbit.
- Evaluasi.
- Selesai.

Setiap tugas sebaiknya punya:

- Tujuan.
- Tenggat waktu jika perlu.
- Produk atau konten terkait.
- Status.
- Langkah berikutnya.

> Jangan membuat sistem tugas yang terlalu rumit. Jangan sampai mengelolanya makan lebih banyak waktu daripada produksi.

### 3.5 Backup Data

Backup adalah salinan data yang bisa dipakai jika data utama hilang, rusak, atau tidak bisa diakses.

**Data yang perlu dicadangkan:**

- Database Produk Affiliate.
- Database Konten Affiliate.
- Database Komisi Affiliate dan laporan komisi.
- Bukti pembayaran.
- SOP.
- Template.
- Hasil eksperimen.

> Backup tidak berguna jika salinannya rusak atau tidak pernah diperiksa.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Otomasi | Memakai alat atau sistem untuk menjalankan pekerjaan berulang dengan intervensi manual yang lebih sedikit |
| Backup | Salinan data yang bisa dipakai jika data utama hilang, rusak, atau tidak bisa diakses |
| Versi konten | Catatan perubahan yang dilakukan pada suatu materi |
| Kalender konten | Alat untuk merencanakan publikasi |
| Database "keuangan" | Sebutan untuk Database Komisi Affiliate, bukan database terpisah |

## 5. Langkah Praktik

Bagian ini berisi template dan SOP yang bisa kamu simpan di Database SOP dan Pengetahuan.

### 5.1 Template Riset Produk

Gunakan struktur ini untuk setiap produk.

**Identitas produk**

- Nama:
- Kategori:
- Link:
- Harga saat dicek:
- Tanggal pemeriksaan:

**Kebutuhan audiens**

- Masalah yang diselesaikan:
- Siapa yang membutuhkan:
- Kapan produk dibutuhkan:

**Kelayakan produk**

- Kualitas dan spesifikasi:
- Reputasi penjual:
- Ulasan yang relevan:
- Kelebihan:
- Kekurangan:
- Alternatif:
- Risiko:

**Kelayakan affiliate**

- Komisi sesuai ketentuan saat dicek:
- Syarat promosi:
- Ketersediaan:
- Potensi format konten:
- Data performa jika tersedia:

**Keputusan** (pilih satu)

- Uji.
- Lanjutkan.
- Optimalkan.
- Uji ulang.
- Hentikan.

"Uji" adalah status awal untuk produk yang belum punya data performa. Setelah ada hasil, pilih salah satu dari empat keputusan lainnya.

### 5.2 Template Skrip

Setiap skrip bisa memakai struktur ini:

- Nama konten.
- Audiens.
- Masalah.
- Tujuan.
- Hook.
- Penjelasan.
- Bukti atau demonstrasi.
- Keterbatasan.
- CTA.
- Pengungkapan affiliate.
- Sumber informasi.
- Checklist pemeriksaan.

> Template menjaga konsistensi. Jangan sampai semua kontenmu terasa seperti salinan satu sama lain.

### 5.3 Template Kalender Konten

| Kolom | Fungsi |
| --- | --- |
| Tanggal | Rencana publikasi |
| Platform | Tempat publikasi |
| Produk | Produk yang dibahas |
| Topik | Masalah yang dibahas |
| Format | Tutorial, perbandingan, dan sebagainya |
| Status | Pilihan Status Konten (Ide sampai Selesai) |
| URL | Link konten setelah terbit |
| Hasil | Metrik performa |
| Tindakan | Keputusan berikutnya |

> Kalender yang penuh bukan bukti strategi berjalan baik. Kalender adalah alat perencanaan. Evaluasi hasil bisnis secara terpisah.

### 5.4 Template Laporan Mingguan

**Ringkasan**

- Jumlah konten terbit.
- Total views.
- Total klik.
- Total pesanan.
- Komisi estimasi.
- Komisi disetujui.
- Komisi dibayarkan.

**Analisis**

- Konten dengan kontribusi komisi terbesar.
- Produk dengan EPC tertinggi.
- Konten dengan CTR rendah.
- Produk yang performanya menurun.
- Masalah tracking.
- Perubahan komisi atau ketersediaan.

**Tindakan berikutnya**

- Konten yang akan dikembangkan.
- Produk yang akan diuji.
- Masalah yang akan diperbaiki.
- Eksperimen berikutnya.

### 5.5 Langkah Backup Data (6 langkah)

1. Tentukan data penting.
2. Gunakan fitur ekspor atau backup yang tersedia.
3. Simpan salinan di lokasi yang aman.
4. Batasi akses.
5. Perbarui backup secara berkala.
6. Pastikan file hasil backup bisa dibuka.

## 6. Contoh dan Perhitungan

### 6.1 Struktur kolom spreadsheet

- **A:** Nama konten.
- **B:** Views.
- **C:** Klik.
- **D:** Pesanan.
- **E:** Komisi disetujui.

### 6.2 Rumus spreadsheet

**CTR** (Klik ÷ Views)

```
=IFERROR(C2/B2,0)
```

Format hasil sebagai persentase.

**CVR** (Pesanan ÷ Klik)

```
=IFERROR(D2/C2,0)
```

Format hasil sebagai persentase.

**EPC** (Komisi disetujui ÷ Klik)

```
=IFERROR(E2/C2,0)
```

**Komisi per 1.000 views**

```
=IFERROR(E2/B2*1000,0)
```

Rumus ini memakai asumsi kolom di atas. Sesuaikan dengan struktur datamu. Periksa konsistensi periode dan definisi transaksi sebelum membandingkan hasil.

### 6.3 Daftar otomasi: boleh dan dilarang

**Otomasi pencatatan yang boleh dipertimbangkan**

Otomasi harus mengikuti aturan program affiliate, platform, dan alat yang kamu pakai. Contoh pekerjaan yang boleh dipertimbangkan:

- Menghitung EPC lewat spreadsheet.
- Menghitung CTR dan CVR.
- Menghitung kontribusi komisi.
- Mengingatkan jadwal pemeriksaan link.
- Membuat ringkasan dari data yang sudah dicatat.
- Memakai integrasi resmi yang diizinkan.

> Sebelum mengotomatisasi pengambilan data atau publikasi, periksa apakah metodenya diperbolehkan oleh platform dan layanan terkait.
>
> **Jangan memakai otomasi untuk menghasilkan klik palsu, pesanan palsu, spam, atau manipulasi engagement.**

**Penggunaan otomasi yang dapat melanggar aturan**

Otomasi bisa melanggar aturan jika dipakai untuk:

- Menghasilkan klik palsu.
- Membuat aktivitas yang menyesatkan.
- Mengirim spam.
- Membuat komentar otomatis yang tidak relevan.
- Memanipulasi transaksi.
- Mengambil data secara tidak sah.
- Mengunggah konten tanpa memperhatikan aturan platform.

> Jangan menganggap suatu metode boleh hanya karena secara teknis bisa dilakukan. Pakai integrasi resmi dan dokumentasi yang berlaku. **Jika ketentuan tidak jelas, hindari metode itu sampai ada kepastian.**

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Mengotomatisasi proses yang belum dipahami | Benahi struktur data lebih dulu; otomasi menyebarkan kesalahan lebih cepat |
| Menganggap otomasi harus berupa bot | Template dan rumus sederhana sering sudah cukup |
| Membuat otomasi yang menambah kerumitan | Otomasi harus mengurangi pekerjaan berulang |
| Membuat database baru padahal sudah ada | Rapikan 6 database baku; jangan menduplikasi data |
| Menyimpan kata sandi atau OTP di database operasional | Jangan simpan data rahasia akun di database yang tidak dirancang untuk itu |
| Membuat semua konten terasa seperti salinan karena template | Pakai template untuk konsistensi, bukan menyeragamkan isi |
| Menganggap kalender penuh = strategi berhasil | Evaluasi hasil bisnis secara terpisah |
| Mengotomatisasi pengambilan data atau publikasi tanpa memeriksa izin | Periksa aturan platform dan layanan terkait lebih dulu |
| Memakai otomasi untuk klik palsu, pesanan palsu, spam, manipulasi engagement | Dilarang; pakai integrasi resmi saja |
| Menganggap metode boleh karena secara teknis bisa dilakukan | Jika ketentuan tidak jelas, hindari sampai ada kepastian |
| Sistem tugas terlalu rumit | Pakai status sederhana agar tidak menyita waktu produksi |
| Membuat backup tanpa memeriksanya | Pastikan file backup bisa dibuka; perbarui berkala |

## 8. Tugas dan Checklist

- [ ] Tugas 1: Rapikan Database Produk Affiliate dengan kolom baku.
- [ ] Tugas 2: Rapikan Database Konten Affiliate dengan kolom baku.
- [ ] Tugas 3: Rapikan Database Eksperimen.
- [ ] Tugas 4: Rapikan Database Komisi Affiliate (database keuangan) dengan kolom komisi, biaya, bukti, dan rekonsiliasi.
- [ ] Tugas 5: Buat template skrip di Database SOP dan Pengetahuan.
- [ ] Tugas 6: Buat kalender konten.
- [ ] Tugas 7: Buat laporan mingguan.
- [ ] Tugas 8: Terapkan rumus CTR, CVR, EPC, dan komisi per 1.000 views.
- [ ] Tugas 9: Buat sistem backup.
- [ ] Tugas 10: Buat SOP pencatatan.
- [ ] Tugas 11: Periksa kepatuhan setiap otomasi yang kamu pakai.

## 9. Latihan dan Kunci Jawaban

**1. Sebutkan database Notion yang kamu rapikan di modul ini beserta satu kolom khasnya.**
Kunci: Database Produk Affiliate (mis. "Tarif Komisi"); Database Konten Affiliate (mis. "Status Konten"); Database Eksperimen (mis. "Hipotesis"); Database Komisi Affiliate / "keuangan" (mis. "Catatan Rekonsiliasi"); Database SOP dan Pengetahuan (mis. "Prosedur"). Totalnya ada 6 database baku di Notion; yang keenam adalah Database Link Affiliate.

**2. Tuliskan rumus spreadsheet untuk CTR dan CVR beserta format hasilnya.**
Kunci: CTR `=IFERROR(C2/B2,0)`; CVR `=IFERROR(D2/C2,0)`. Keduanya diformat sebagai persentase.

**3. Tuliskan rumus EPC dan komisi per 1.000 views.**
Kunci: EPC `=IFERROR(E2/C2,0)`; komisi per 1.000 views `=IFERROR(E2/B2*1000,0)`.

**4. Sebutkan tujuh penggunaan otomasi yang dapat melanggar aturan.**
Kunci: Menghasilkan klik palsu; membuat aktivitas yang menyesatkan; mengirim spam; membuat komentar otomatis yang tidak relevan; memanipulasi transaksi; mengambil data secara tidak sah; mengunggah konten tanpa memperhatikan aturan platform.

**5. Apa lima opsi keputusan pada template riset produk? Mana yang menjadi status awal?**
Kunci: Uji; Lanjutkan; Optimalkan; Uji ulang; Hentikan. "Uji" adalah status awal.

**6. Sebutkan enam langkah backup data.**
Kunci: Tentukan data penting; gunakan fitur ekspor atau backup; simpan salinan di lokasi aman; batasi akses; perbarui berkala; pastikan file backup bisa dibuka.

**7. Apa sembilan status tugas konten?**
Kunci: Ide, Riset, Skrip, Produksi, Pemeriksaan, Siap Publikasi, Terbit, Evaluasi, Selesai (pilihan Status Konten).

**8. Ketentuan sebuah metode otomasi tidak jelas. Apa yang harus dilakukan?**
Kunci: Hindari metode itu sampai ada kepastian; pakai integrasi resmi dan dokumentasi yang berlaku.

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika mampu mengelola data, konten, dan tugas lewat sistem yang konsisten, mengurangi pekerjaan berulang, dan menjaga otomasi tetap sesuai aturan.
', 'Modul 23', 15, false, 27, true)
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

INSERT INTO public.lessons (id, module_id, title, slug, content, source_ref, estimated_minutes, is_free_preview, sort_order, is_published)
VALUES ('l28', 'm06', 'Modul 24 — Evaluasi Bisnis dan Mastery', 'modul-24-evaluasi-bisnis-dan-mastery', '# Modul 24 — Evaluasi Bisnis dan Mastery

## 1. Tujuan Pembelajaran

Modul terakhir ini memastikan kamu mampu mengelola Shopee Affiliate sebagai bisnis yang punya proses, data, evaluasi, dan rencana pengembangan.

Setelah modul ini, kamu mampu:

- Melakukan audit niche dan produk.
- Mengevaluasi performa konten dan traffic.
- Menganalisis funnel dari views sampai pembayaran.
- Memeriksa kualitas komisi dan pembayaran.
- Menilai profitabilitas.
- Mengevaluasi eksperimen.
- Menyusun rencana bisnis 30, 90, dan 365 hari sesuai kebutuhan.
- Menetapkan prioritas berdasarkan masalah terbesar.
- Mendokumentasikan SOP final.

## 2. Ringkasan Konsep Utama

1. Modul ini adalah rangkaian **audit**: niche → produk → konten → traffic → funnel → komisi → pembayaran → profitabilitas.
2. Jangan mempertahankan niche hanya karena sudah banyak waktu yang kamu habiskan di dalamnya.
3. Produk dengan komisi tertinggi tidak otomatis menjadi produk terbaik.
4. Tujuan audit funnel adalah menemukan **tahap yang paling membatasi hasil**.
5. Jangan menjumlahkan komisi estimasi dan komisi disetujui untuk transaksi yang sama. Itu penghitungan ganda.
6. Jika modal uang Rp0, waktu tetap harus dihitung sebagai sumber daya.
7. Eksperimen yang tidak berhasil bukan kegagalan jika memberi informasi untuk keputusan.
8. Target baru ditetapkan dari hasil aktual, bukan karena ada target jangka panjang Rp30 juta.
9. SOP final harus cukup jelas supaya pekerjaan bisa diulang tanpa mengandalkan ingatan.

## 3. Penjelasan

### 3.1 Audit Niche

Audit niche menilai apakah niche pilihanmu masih layak dikembangkan. Jangan mempertahankan niche hanya karena sudah banyak waktu yang kamu habiskan. Periksa apakah niche masih punya kebutuhan audiens dan peluang monetisasi yang sesuai.

**A. Permintaan pasar**

- Apakah audiens masih punya kebutuhan yang jelas?
- Apakah ada masalah yang belum dijawab konten yang tersedia?
- Apakah permintaan terlihat konsisten atau hanya sementara?

**B. Peluang monetisasi**

- Apakah tersedia produk yang relevan?
- Apakah komisinya layak?
- Apakah produk punya alternatif yang memadai?

**C. Persaingan**

- Siapa kompetitor yang relevan?
- Konten apa yang sudah banyak tersedia?
- Nilai tambah apa yang bisa kamu berikan?

**D. Kesesuaian dengan kemampuan**

- Apakah kamu mampu membuat konten secara konsisten?
- Apakah niche sesuai dengan waktu dan sumber dayamu?
- Apakah kamu bisa memeriksa informasi produk secara bertanggung jawab?

**Keputusan audit niche:**

Gunakan lima keputusan yang sama seperti di seluruh materi:

- **Lanjutkan** jika niche menunjukkan permintaan dan peluang yang memadai.
- **Optimalkan** jika kebutuhan audiens masih relevan tetapi kontenmu belum menonjol. Perbaiki positioning dan diferensiasimu.
- **Uji ulang** jika datanya belum cukup atau ada kelompok kebutuhan yang lebih spesifik (subniche) yang layak dicoba.
- **Kurangi prioritas** jika hasilnya kecil dibanding usahamu dan ada niche atau subniche lain yang lebih menjanjikan.
- **Hentikan** (pindah niche) hanya jika bukti menunjukkan peluangnya tidak memadai setelah pengujian yang wajar.

> Jangan berpindah niche hanya karena beberapa konten pertama tidak mendapat banyak views.

### 3.2 Audit Produk

Audit produk memastikan produk yang kamu promosikan masih layak. Periksa:

- Relevansi dengan audiens.
- Kualitas dan spesifikasi.
- Harga terkini.
- Reputasi penjual.
- Ketersediaan.
- Komisi efektif.
- Klik dan konversi.
- Komisi disetujui.
- Keluhan yang relevan.
- Risiko perubahan ketentuan.

**Contoh keputusan:**

| Kondisi | Tindakan |
| --- | --- |
| Komisi baik dan transaksi konsisten | Lanjutkan dan evaluasi peluang pengembangan |
| Klik tinggi, pesanan rendah | Optimalkan: periksa produk, harga, dan kecocokan audiens |
| Komisi menurun | Periksa perubahan tarif dan jumlah transaksi |
| Produk tidak tersedia | Cari alternatif yang relevan |
| Keluhan serius atau kualitas diragukan | Kurangi prioritas atau Hentikan promosi |
| Data masih sedikit | Uji ulang jika risikonya dapat diterima |

> Produk dengan komisi tertinggi tidak otomatis menjadi produk terbaik. Pertimbangkan kualitas, kebutuhan pembeli, hasil, dan risiko.

### 3.3 Audit Konten

Audit konten mencari tahu konten mana yang memberi kontribusi bisnis dan mana yang perlu diperbaiki.

**Kategori evaluasi:**

- **Konten pemenang:** memberi kontribusi komisi atau menunjukkan performa funnel yang menjanjikan, dan layak diuji pengembangannya.
- **Konten pendukung:** konten edukasi yang membantu menjawab pertanyaan audiens atau membangun pemahaman sebelum pembelian.
- **Konten yang perlu dioptimalkan:** punya potensi, tetapi bermasalah pada hook, CTA, relevansi produk, atau distribusi.
- **Konten yang perlu dihentikan atau diperbarui:** sudah tidak relevan, berisi informasi usang, punya link bermasalah, atau tidak layak dipertahankan.

**Pertanyaan audit:**

- Apakah konten menjawab masalah yang jelas?
- Apakah hook sesuai dengan isi?
- Apakah klaim bisa dibuktikan?
- Apakah produk relevan?
- Apakah CTA jelas?
- Apakah link berfungsi?
- Apakah komisi bisa diukur?
- Apakah konten bisa dikembangkan menjadi variasi yang memberi nilai baru?

> Jangan menghapus semua konten dengan views rendah. Sebagian mungkin tetap relevan untuk pencarian atau kebutuhan audiens tertentu.

### 3.4 Audit Traffic

Audit traffic membantu menemukan sumber masalah sebelum kamu mengubah strategi. Periksa:

- Views per konten.
- Distribusi views menurut platform.
- Perubahan views dari waktu ke waktu.
- CTR dari views ke klik affiliate.
- Jumlah klik yang bisa dicatat.
- Kontribusi konten evergreen.
- Ketergantungan pada konten viral.

**Contoh diagnosis:**

- **Views turun 50%, CTR dan CVR relatif stabil:** masalah utama kemungkinan di distribusi atau jumlah tayangan.
- **Views stabil, klik turun:** periksa apakah CTA, penempatan link, atau relevansi produk berubah.
- **Klik stabil, pesanan turun:** periksa produk, harga, halaman tujuan, dan karakteristik traffic.

> Gunakan data beberapa periode jika tersedia. Jangan mengubah seluruh strategi karena satu hari yang buruk.

### 3.5 Audit Funnel

Funnel adalah rangkaian tahap yang dilalui audiens dari melihat konten sampai pembayaran komisi. Funnel baku punya **6 tahap**:

1. **Views:** audiens melihat konten.
2. **Klik:** audiens tertarik dan mengeklik affiliate link.
3. **Pesanan:** audiens melakukan pembelian.
4. **Transaksi memenuhi syarat:** pesanan lolos ketentuan program.
5. **Komisi disetujui:** komisi transaksi itu disetujui.
6. **Pembayaran:** dana diterima sesuai proses pembayaran.

Setiap tahap bisa punya masalah berbeda:

| Masalah | Hal yang diperiksa |
| --- | --- |
| Views rendah | Topik, hook, format, distribusi |
| CTR rendah | Relevansi produk, CTA, penempatan link |
| CVR rendah | Kualitas produk, harga, audiens, halaman tujuan |
| Transaksi memenuhi syarat rendah | Pesanan dibatalkan atau tidak lolos ketentuan program; periksa status transaksi, jenis produk, dan syarat program |
| Komisi per pesanan rendah | Portofolio produk dan komisi efektif |
| Komisi disetujui jauh di bawah estimasi | Status transaksi dan ketentuan program |
| Pembayaran berbeda dari laporan | Periode pembayaran, penyesuaian, dan rekonsiliasi |

> Tujuan audit funnel adalah menemukan tahap yang paling membatasi hasil. Memperbaiki tahap yang sudah sehat, sementara masalah utama ada di tahap lain, membuang waktu.

### 3.6 Audit Komisi

Audit komisi memastikan performa bisnis dinilai dari angka yang tepat. Periksa:

- Total komisi estimasi.
- Total komisi disetujui.
- Komisi yang belum dibayarkan.
- Komisi dibayarkan (pembayaran aktual).
- Komisi per pesanan.
- EPC.
- Komisi per 1.000 views.
- Kontribusi setiap produk.
- Kontribusi setiap channel jika bisa diidentifikasi.
- Perubahan komisi selama periode evaluasi.

Status komisi berurutan: Estimasi → Pending → Disetujui → Dibayarkan. Nama di dashboard Shopee bisa berbeda, misalnya "Dalam proses" untuk Pending.

> **Jangan menjumlahkan komisi estimasi dan komisi disetujui jika keduanya untuk transaksi yang sama. Itu menyebabkan penghitungan ganda.**

### 3.7 Audit Profitabilitas

Profitabilitas menjawab apakah bisnis menghasilkan nilai setelah biaya yang relevan dihitung. Ada dua basis, dan kamu harus selalu menyebut basis yang dipakai:

```
Basis kinerja: Hasil setelah biaya = Komisi disetujui − Biaya usaha
Basis kas:     Hasil setelah biaya = Komisi dibayarkan − Biaya usaha
```

Contoh basis kinerja: komisi disetujui Rp10.000.000 − biaya Rp1.500.000 = Rp8.500.000. Basis kas memakai komisi yang sudah dibayarkan, jadi angkanya mengikuti uang yang benar-benar masuk.

Istilah "profit bersih" baru dipakai setelah pajak dan kewajiban lain dihitung. Sebelum itu, pakai "hasil setelah biaya".

**Pertanyaan audit:**

- Berapa biaya operasional bulanan?
- Berapa jam kerja yang dipakai?
- Berapa komisi disetujui?
- Berapa komisi yang sudah dibayarkan?
- Apakah ada biaya yang tidak dicatat?
- Apakah pendapatan berasal dari satu produk atau beberapa produk?
- Apakah hasil bisa diulang dengan proses yang tersedia?

> Jika modal uang Rp0, waktu tetap harus dihitung sebagai sumber daya. Bisnis yang menghasilkan komisi tetapi butuh waktu berlebihan mungkin perlu diperbaiki prosesnya.

### 3.8 Menentukan Target Berikutnya

Tetapkan target baru dari hasil aktual. Misalnya komisi disetujui bulan ini Rp2 juta. **Jangan langsung membuat proyeksi Rp30 juta bulan depan hanya karena target jangka panjangnya Rp30 juta.** Rp30 juta hanyalah contoh target jangka panjang untuk latihan menghitung. Itu bukan janji dan bukan patokan Shopee. Pakai targetmu sendiri.

Periksa:

- Pertumbuhan klik.
- Perubahan CVR.
- Perubahan komisi rata-rata.
- Kapasitas produksi.
- Konsistensi hasil.
- Risiko produk dan platform.

Tentukan target dari beberapa skenario. Target boleh menantang, tetapi kebutuhan sumber daya dan metriknya harus bisa dijelaskan.

### 3.9 Dokumentasi SOP Final

Di akhir Level 5, susun satu dokumen operasional yang merangkum:

- SOP riset produk.
- SOP pemeriksaan kualitas produk.
- SOP pembuatan konten.
- SOP pemeriksaan kepatuhan.
- SOP pembuatan dan pengujian link.
- SOP publikasi.
- SOP pencatatan performa.
- SOP evaluasi mingguan.
- SOP rekonsiliasi komisi.
- SOP backup data.
- SOP penanganan risiko.
- SOP evaluasi bulanan.

> SOP harus cukup jelas supaya pekerjaan bisa diulang tanpa mengandalkan ingatan. Perbarui SOP jika ada perubahan aturan, alat, proses, atau bukti bahwa metode lama tidak lagi efektif.

## 4. Istilah Penting

| Istilah | Definisi |
| --- | --- |
| Audit niche | Mengevaluasi apakah niche yang dipilih masih layak dikembangkan |
| Audit produk | Memastikan produk yang dipromosikan masih layak |
| Audit konten | Mencari tahu konten mana yang memberi kontribusi bisnis dan mana yang perlu diperbaiki |
| Audit traffic | Menemukan sumber masalah sebelum mengubah strategi |
| Funnel | Rangkaian tahap dari melihat konten sampai pembayaran (6 tahap baku) |
| Audit pembayaran | Memeriksa dana yang seharusnya diterima dan dana yang benar-benar masuk |
| Profitabilitas | Apakah bisnis menghasilkan nilai setelah biaya yang relevan dihitung |
| Hasil setelah biaya | Komisi (disetujui atau dibayarkan, sebut basisnya) dikurangi Biaya usaha |
| Perencanaan kuartalan | Menyusun prioritas untuk periode sekitar tiga bulan |
| Konten pemenang | Konten yang memberi kontribusi komisi atau performa funnel yang menjanjikan |
| Konten pendukung | Konten edukasi yang membantu menjawab pertanyaan atau membangun pemahaman sebelum pembelian |

## 5. Langkah Praktik

### 5.1 Audit Pembayaran (7 langkah)

1. Ambil laporan komisi dari sistem affiliate.
2. Identifikasi komisi yang sudah disetujui.
3. Periksa status pembayaran.
4. Cocokkan jumlah yang dibayarkan dengan mutasi atau bukti penerimaan.
5. Catat selisih.
6. Periksa penyesuaian dan periode pembayaran.
7. Ajukan pertanyaan lewat kanal resmi jika ada selisih yang belum bisa dijelaskan.

> Simpan bukti laporan dan pembayaran secara teratur supaya audit berikutnya lebih mudah.

### 5.2 Evaluasi Eksperimen

**Format dokumentasi (contoh):**

- **Nama eksperimen:** Menguji hook video.
- **Masalah:** CTR lebih rendah daripada target internal.
- **Hipotesis:** Hook yang menjelaskan masalah audiens secara spesifik akan menaikkan klik.
- **Variabel:** Hook.
- **Metrik utama:** CTR.
- **Metrik pendukung:** Views, CVR, komisi disetujui.
- **Periode:** Ditentukan sebelum pengujian, sesuai volume traffic.
- **Hasil:** Dicatat setelah data tersedia.
- **Keputusan:** Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, atau Hentikan.

**Cara mengevaluasi:**

- Hasil membaik dan data memadai: pertimbangkan penerapan yang lebih luas.
- Hasil memburuk: periksa apakah hipotesis salah atau pelaksanaan tidak konsisten.
- Hasil belum jelas: tambah data atau sederhanakan eksperimen (Uji ulang).
- Beberapa variabel berubah bersamaan: jangan menyimpulkan penyebabnya dari hasil itu saja.

> Eksperimen yang tidak berhasil bukan kegagalan jika memberi informasi untuk keputusan.

### 5.3 Perencanaan Kuartalan (contoh kerangka)

**Bulan pertama: Validasi**

- Audit niche dan produk.
- Bangun database.
- Uji beberapa format konten.
- Catat funnel.
- Tentukan masalah utama.

**Bulan kedua: Optimasi**

- Perbaiki tahap funnel yang paling lemah.
- Kembangkan konten yang menunjukkan hasil baik.
- Evaluasi produk pelengkap.
- Perbaiki SOP.
- Tingkatkan kualitas pencatatan.

**Bulan ketiga: Pengembangan**

- Evaluasi apakah hasil cukup konsisten.
- Tingkatkan produksi jika kapasitas dan data mendukung.
- Uji diversifikasi yang relevan.
- Perbarui proyeksi komisi.
- Tentukan prioritas kuartal berikutnya.

> Ini contoh rencana, **bukan jaminan pertumbuhan dalam tiga bulan**. Jika validasi belum selesai, fokus pada perbaikan, jangan memaksakan scaling.

## 6. Contoh dan Perhitungan

Angka berikut adalah simulasi, bukan tarif resmi Shopee.

### 6.1 Audit profitabilitas

```
Basis kinerja: Hasil setelah biaya = Komisi disetujui − Biaya usaha
Basis kas:     Hasil setelah biaya = Komisi dibayarkan − Biaya usaha
```

Contoh basis kinerja:

- Komisi disetujui: **Rp10.000.000**
- Biaya operasional: **Rp1.500.000**
- Hasil setelah biaya: Rp10.000.000 − Rp1.500.000 = **Rp8.500.000**, sebelum pajak dan kewajiban lain yang belum dihitung.

Basis kas memakai komisi yang sudah dibayarkan sebagai pengganti komisi disetujui.

### 6.2 Contoh penetapan target berikutnya

Komisi disetujui bulan ini Rp2 juta. Jangan langsung memproyeksikan Rp30 juta bulan depan hanya karena itu contoh target jangka panjang untuk latihan. Periksa dulu pertumbuhan klik, perubahan CVR, perubahan komisi rata-rata, kapasitas produksi, konsistensi hasil, serta risiko produk dan platform.

### 6.3 Contoh diagnosis traffic

Views turun 50% sementara CTR dan CVR relatif stabil. Masalah utamanya kemungkinan di distribusi atau jumlah tayangan, bukan di konversi.

### 6.4 Template Laporan Performa 30 Hari

Salin format ini ke Notion dan isi dengan data aktual.

**# Laporan Performa Shopee Affiliate — 30 Hari**

**1. Periode Evaluasi**

- Tanggal mulai:
- Tanggal selesai:
- Platform utama:
- Niche:
- Jumlah konten yang diterbitkan:

**2. Hasil Utama**

- Total views:
- Total klik affiliate:
- Total pesanan:
- Komisi estimasi:
- Komisi disetujui:
- Komisi dibayarkan:
- Biaya operasional:
- Hasil setelah biaya (sebut basis: kinerja atau kas):
- Total jam kerja:

**3. Performa Funnel**

- CTR:
- CVR:
- EPC:
- Komisi per 1.000 views:
- Tahap funnel yang paling lemah:

**4. Analisis Produk**

- Produk dengan kontribusi komisi terbesar:
- Produk dengan EPC tertinggi:
- Produk dengan performa menurun:
- Produk yang perlu diuji:
- Risiko utama portofolio:

**5. Analisis Konten**

- Konten dengan hasil terbaik:
- Konten dengan views tinggi tetapi komisi rendah:
- Konten dengan klik tinggi tetapi pesanan rendah:
- Konten evergreen:
- Format yang perlu dikembangkan:

**6. Evaluasi Eksperimen**

- Hipotesis:
- Perubahan yang diuji:
- Metrik utama:
- Hasil:
- Kesimpulan:
- Tindakan berikutnya:

**7. Tiga Prioritas Berikutnya**

1.
2.
3.

**8. Rencana 30 Hari**

- Target yang realistis:
- Produk yang diprioritaskan:
- Konten yang dikembangkan:
- Perbaikan funnel:
- Jadwal evaluasi:
- Risiko yang perlu dipantau:

### 6.5 Template Evaluasi 90 Hari

Evaluasi 90 hari menunjukkan apakah bisnis berkembang secara berkelanjutan, bukan hanya melonjak sesaat.

Bandingkan:

- Total komisi disetujui.
- Komisi dibayarkan.
- Jumlah transaksi.
- Komisi rata-rata.
- EPC.
- CTR dan CVR.
- Kontribusi produk terbesar.
- Kontribusi konten evergreen.
- Waktu kerja.
- Biaya operasional.
- Konsistensi hasil antarperiode.

> Pakai tiga periode bulanan atau kelompok periode yang konsisten. Jangan membandingkan bulan yang berbeda tanpa memperhitungkan jumlah hari, perubahan musim, promosi, atau perubahan ketentuan program.

**Keputusan akhir.** Setelah evaluasi, tentukan apakah bisnis perlu:

- **Lanjutkan:** proses menunjukkan hasil yang layak.
- **Optimalkan:** ada peluang, tetapi ada hambatan yang bisa diperbaiki.
- **Uji ulang:** bukti belum cukup untuk memutuskan.
- **Kurangi prioritas:** aktivitas tertentu butuh usaha besar dengan hasil yang tidak memadai.
- **Hentikan:** produk, metode, atau channel tidak lagi layak atau berisiko tidak dapat diterima.

"Perluas" adalah keputusan scaling terpisah (Modul 20). Pertimbangkan hanya setelah ada bukti.

## 7. Kesalahan Umum dan Cara Menghindarinya

| Kesalahan | Cara menghindari |
| --- | --- |
| Mempertahankan niche karena sudah banyak waktu dihabiskan | Evaluasi kebutuhan audiens dan peluang monetisasi secara objektif |
| Berpindah niche karena beberapa konten pertama sepi views | Lakukan pengujian yang wajar lebih dulu |
| Menganggap produk komisi tertinggi pasti terbaik | Pertimbangkan kualitas, kebutuhan pembeli, hasil, dan risiko |
| Menghapus semua konten dengan views rendah | Sebagian mungkin tetap relevan untuk pencarian atau audiens tertentu |
| Mengubah seluruh strategi karena satu hari buruk | Pakai data beberapa periode |
| Memperbaiki tahap funnel yang sudah sehat | Temukan tahap yang paling membatasi hasil |
| Menjumlahkan komisi estimasi dan komisi disetujui untuk transaksi yang sama | Hindari penghitungan ganda |
| Memakai satu angka "hasil" tanpa menyebut basisnya | Selalu sebut basis kinerja (disetujui) atau basis kas (dibayarkan) |
| Mengabaikan waktu kerja karena modal uang Rp0 | Waktu tetap sumber daya; perbaiki proses yang terlalu memakan waktu |
| Menyimpulkan penyebab saat beberapa variabel berubah bersamaan | Jangan menyimpulkan dari hasil itu saja |
| Memproyeksikan Rp30 juta dari hasil Rp2 juta | Tetapkan target dari hasil aktual dan beberapa skenario |
| Membandingkan bulan berbeda tanpa penyesuaian | Perhitungkan jumlah hari, musim, promosi, dan perubahan ketentuan |

## 8. Tugas dan Checklist

**A. Audit niche dan produk**

- [ ] Tugas 1: Identifikasi niche utama.
- [ ] Tugas 2: Identifikasi kebutuhan audiens.
- [ ] Tugas 3: Periksa kelayakan produk.
- [ ] Tugas 4: Evaluasi kontribusi komisi.
- [ ] Tugas 5: Identifikasi risiko konsentrasi.
- [ ] Tugas 6: Tentukan produk yang dilanjutkan atau dihentikan.

**B. Audit konten dan traffic**

- [ ] Tugas 7: Kumpulkan data konten.
- [ ] Tugas 8: Identifikasi konten dengan kontribusi komisi terbesar.
- [ ] Tugas 9: Hitung CTR dan EPC jika datanya tersedia.
- [ ] Tugas 10: Periksa konten dengan views tinggi tetapi klik rendah.
- [ ] Tugas 11: Periksa konten dengan klik tinggi tetapi pesanan rendah.
- [ ] Tugas 12: Identifikasi peluang evergreen.

**C. Audit keuangan**

- [ ] Tugas 13: Catat komisi estimasi.
- [ ] Tugas 14: Catat komisi disetujui.
- [ ] Tugas 15: Catat komisi dibayarkan.
- [ ] Tugas 16: Catat biaya operasional.
- [ ] Tugas 17: Rekonsiliasi pembayaran.
- [ ] Tugas 18: Hitung hasil setelah biaya (sebut basisnya).
- [ ] Tugas 19: Bandingkan proyeksi dan realisasi.

**D. Audit strategi**

- [ ] Tugas 20: Evaluasi eksperimen.
- [ ] Tugas 21: Identifikasi tiga masalah terbesar.
- [ ] Tugas 22: Tentukan tiga prioritas berikutnya.
- [ ] Tugas 23: Susun rencana 30 hari.
- [ ] Tugas 24: Susun rencana 90 hari jika data tersedia.
- [ ] Tugas 25: Perbarui SOP final.

## 9. Latihan dan Kunci Jawaban

**1. Sebutkan empat aspek yang diperiksa dalam audit niche.**
Kunci: Permintaan pasar; peluang monetisasi; persaingan; kesesuaian dengan kemampuan.

**2. Klik tinggi tetapi pesanan rendah pada audit produk. Apa tindakannya?**
Kunci: Periksa produk, harga, dan kecocokan audiens.

**3. Sebutkan enam tahap funnel baku.**
Kunci: Views → Klik → Pesanan → Transaksi memenuhi syarat → Komisi disetujui → Pembayaran.

**4. Komisi disetujui jauh di bawah estimasi. Apa yang diperiksa?**
Kunci: Status transaksi dan ketentuan program.

**5. Pembayaran berbeda dari laporan. Apa yang diperiksa?**
Kunci: Periode pembayaran, penyesuaian, dan rekonsiliasi.

**6. Mengapa komisi estimasi dan komisi disetujui tidak boleh dijumlahkan?**
Kunci: Jika keduanya untuk transaksi yang sama, terjadi penghitungan ganda.

**7. Komisi disetujui Rp10.000.000 dan biaya operasional Rp1.500.000. Berapa hasil setelah biaya, dan basis apa yang dipakai?**
Kunci: Rp8.500.000 (basis kinerja), sebelum pajak dan kewajiban lain. Basis kas memakai komisi dibayarkan.

**8. Views turun 50% tetapi CTR dan CVR stabil. Di mana masalah utamanya kemungkinan terletak?**
Kunci: Pada distribusi atau jumlah tayangan.

**9. Hasil eksperimen belum jelas. Apa langkah berikutnya?**
Kunci: Tambah data atau sederhanakan eksperimen (Uji ulang).

**10. Sebutkan lima opsi keputusan akhir pada evaluasi 90 hari.**
Kunci: Lanjutkan; Optimalkan; Uji ulang; Kurangi prioritas; Hentikan.

**11. Tahap funnel mana yang bermasalah jika banyak pesanan tidak lolos ketentuan program?**
Kunci: Transaksi memenuhi syarat (tahap 4). Periksa status transaksi, jenis produk, dan syarat program.

## 10. Standar Kelulusan

Kamu dianggap menguasai modul ini jika mampu melakukan audit bisnis, mengidentifikasi masalah utama, menyusun prioritas, mengevaluasi eksperimen, dan membuat rencana pengembangan berdasarkan data aktual.

---

## Lampiran — Penutup: Standar Kelulusan Level 5

Bagian ini berlaku untuk seluruh Level 5.

Level 5 tidak selesai hanya karena semua materi sudah dibaca. Penguasaan harus dibuktikan lewat penerapan dan evaluasi.

**Checklist akhir (gunakan di Notion):**

- [ ] Saya mampu membandingkan produk berdasarkan komisi dan konversi.
- [ ] Saya mampu mengukur kontribusi setiap produk.
- [ ] Saya memahami risiko ketergantungan pendapatan.
- [ ] Saya mampu menghitung kebutuhan pesanan, klik, dan views.
- [ ] Saya dapat membedakan komisi estimasi, komisi disetujui, pembayaran, dan hasil setelah biaya.
- [ ] Saya memiliki SOP produksi konten.
- [ ] Saya dapat mengembangkan konten berdasarkan data.
- [ ] Saya memahami aturan affiliate dan platform yang digunakan.
- [ ] Saya memiliki prosedur pengelolaan risiko.
- [ ] Saya menggunakan database untuk mengelola produk dan konten.
- [ ] Saya mampu mengevaluasi eksperimen.
- [ ] Saya memiliki laporan performa 30 hari.
- [ ] Saya memiliki rencana pengembangan berdasarkan hasil aktual.

**Prinsip yang harus diingat:**

1. Komisi tinggi tidak selalu berarti produk terbaik. Periksa konversi, kualitas, dan risiko.
2. Views tinggi tidak selalu berarti bisnis sehat. Periksa klik, transaksi, dan komisi.
3. Banyak konten tidak selalu berarti pertumbuhan. Prioritaskan kualitas dan hasil.
4. Diversifikasi tidak berarti mempromosikan semua produk. Pilih alternatif yang relevan.
5. Target Rp30 juta (contoh target jangka panjang untuk latihan) harus dibuktikan dengan angka. Hitung kebutuhan transaksi dan traffic dari data aktual.
6. Otomasi bukan pengganti strategi. Otomatisasi proses yang sudah jelas dan sesuai aturan.
7. Evaluasi harus menghasilkan keputusan. Data tanpa tindakan tidak banyak membantu bisnis.
8. Reputasi adalah aset bisnis. Pertahankan kejujuran dan kepatuhan saat bisnis berkembang.

**Hasil akhir yang dituju:** kamu punya sistem Shopee Affiliate yang terdokumentasi, mampu mengukur komisi secara akurat, memahami sumber pertumbuhan, mengelola risiko, dan bisa menentukan langkah berikutnya berdasarkan data, bukan sekadar asumsi.
', 'Modul 24', 15, false, 28, true)
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


-- 4. Seed Practice Projects
INSERT INTO public.practice_projects (id, code, title, objective, supporting_modules, checklist, sort_order, is_published)
VALUES ('p01', 'P01', 'Niche Research', 'Memilih bidang dan audiens yang jelas serta memetakan 10 masalah nyata dengan bukti sumber.', '["04","05"]'::jsonb, '[{"id":"c1","label":"Kumpulkan 20 masalah pembeli dari forum, komentar, atau ulasan produk"},{"id":"c2","label":"Pilih satu niche spesifik yang memiliki permintaan nyata"},{"id":"c3","label":"Tentukan profil satu persona audiens utama"},{"id":"c4","label":"Saring 10 masalah audiens teratas dan pisahkan fakta dengan asumsi"}]'::jsonb, 1, true)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  objective = EXCLUDED.objective,
  supporting_modules = EXCLUDED.supporting_modules,
  checklist = EXCLUDED.checklist,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

INSERT INTO public.practice_projects (id, code, title, objective, supporting_modules, checklist, sort_order, is_published)
VALUES ('p02', 'P02', 'Product Research', 'Memilih 3–5 produk awal menggunakan kalkulator evaluasi 7 faktor berbobot (skor 0–100).', '["06"]'::jsonb, '[{"id":"c1","label":"Analisis minimal 10–20 kandidat produk di Shopee"},{"id":"c2","label":"Periksa komisi dan kelayakan toko di dashboard Shopee Affiliate"},{"id":"c3","label":"Beri skor 7 faktor berbobot pada Product Research Lab"},{"id":"c4","label":"Pilih 3–5 produk prioritas dengan skor >= 70 dan catat alasannya"}]'::jsonb, 2, true)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  objective = EXCLUDED.objective,
  supporting_modules = EXCLUDED.supporting_modules,
  checklist = EXCLUDED.checklist,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

INSERT INTO public.practice_projects (id, code, title, objective, supporting_modules, checklist, sort_order, is_published)
VALUES ('p03', 'P03', 'Competitor Research', 'Menemukan 10 celah konten pembeda dari 5–10 akun kompetitor tanpa menjiplak.', '["07"]'::jsonb, '[{"id":"c1","label":"Analisis 5–10 akun kompetitor di niche pilihan Anda"},{"id":"c2","label":"Temukan 10 pertanyaan atau keluhan audiens yang belum terjawab baik"},{"id":"c3","label":"Susun 3 sudut pandang (angle) konten pembeda yang belum digarap kompetitor"}]'::jsonb, 3, true)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  objective = EXCLUDED.objective,
  supporting_modules = EXCLUDED.supporting_modules,
  checklist = EXCLUDED.checklist,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

INSERT INTO public.practice_projects (id, code, title, objective, supporting_modules, checklist, sort_order, is_published)
VALUES ('p04', 'P04', 'Content Production', 'Menyusun 30 ide konten, 10 skrip lengkap, dan menerbitkan minimal 10 konten teruji.', '["09","10","11"]'::jsonb, '[{"id":"c1","label":"Susun 30 ide konten di Content Creation Studio"},{"id":"c2","label":"Tulis 10 naskah lengkap dengan Hook Bank, bukti solusi, CTA, dan disclosure"},{"id":"c3","label":"Produksi dan publikasikan minimal 10 konten yang lolos 11 butir QC"}]'::jsonb, 4, true)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  objective = EXCLUDED.objective,
  supporting_modules = EXCLUDED.supporting_modules,
  checklist = EXCLUDED.checklist,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

INSERT INTO public.practice_projects (id, code, title, objective, supporting_modules, checklist, sort_order, is_published)
VALUES ('p05', 'P05', 'First Conversion', 'Memverifikasi jalur pelacakan link affiliate dan mendiagnosis drop-off konversi pertama.', '["14","15"]'::jsonb, '[{"id":"c1","label":"Daftarkan semua tautan produk di Link Archive dan pastikan tujuan link benar"},{"id":"c2","label":"Catat jumlah klik yang masuk di dashboard"},{"id":"c3","label":"Lakukan diagnosis funnel jika terjadi drop-off antara klik dan pesanan"}]'::jsonb, 5, true)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  objective = EXCLUDED.objective,
  supporting_modules = EXCLUDED.supporting_modules,
  checklist = EXCLUDED.checklist,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

INSERT INTO public.practice_projects (id, code, title, objective, supporting_modules, checklist, sort_order, is_published)
VALUES ('p06', 'P06', 'Analytics Dashboard', 'Menyusun laporan mingguan dan membaca metrik CTR, CVR, EPC secara objektif.', '["16"]'::jsonb, '[{"id":"c1","label":"Input metrik harian ke Performance Tracker (Views, Klik, Pesanan)"},{"id":"c2","label":"Pisahkan 4 status komisi (Estimasi, Pending, Disetujui, Dibayarkan)"},{"id":"c3","label":"Buat laporan evaluasi mingguan dengan rekomendasi 1 tindakan spesifik"}]'::jsonb, 6, true)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  objective = EXCLUDED.objective,
  supporting_modules = EXCLUDED.supporting_modules,
  checklist = EXCLUDED.checklist,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

INSERT INTO public.practice_projects (id, code, title, objective, supporting_modules, checklist, sort_order, is_published)
VALUES ('p07', 'P07', 'Optimization Sprint', 'Mengeksekusi 1 eksperimen A/B terstruktur dengan hipotesis 4 bagian.', '["17"]'::jsonb, '[{"id":"c1","label":"Tulis hipotesis: Perubahan yang diuji, Alasan, Tolok ukur metrik, Kriteria keputusan"},{"id":"c2","label":"Uji variasi konten dengan hanya mengubah 1 variabel utama (misal: hook kalimat pertama)"},{"id":"c3","label":"Catat keputusan akhir: Lanjutkan, Optimalkan, Uji Ulang, Kurangi Prioritas, atau Hentikan"}]'::jsonb, 7, true)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  objective = EXCLUDED.objective,
  supporting_modules = EXCLUDED.supporting_modules,
  checklist = EXCLUDED.checklist,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

INSERT INTO public.practice_projects (id, code, title, objective, supporting_modules, checklist, sort_order, is_published)
VALUES ('p08', 'P08', 'Business Growth Plan', 'Menyusun target numerik komisi realistis, kalkulasi kebutuhan traffic, dan SOP produksi.', '["19","20","24"]'::jsonb, '[{"id":"c1","label":"Hitung mundur target komisi bulanan menuju target pesanan, klik, dan views yang dibutuhkan"},{"id":"c2","label":"Tulis minimal 2 dokumen SOP di SOP Hub (SOP Syuting & SOP Quality Control)"},{"id":"c3","label":"Rancang rencana delegasi atau batching produksi mingguan"}]'::jsonb, 8, true)
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  title = EXCLUDED.title,
  objective = EXCLUDED.objective,
  supporting_modules = EXCLUDED.supporting_modules,
  checklist = EXCLUDED.checklist,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published;

