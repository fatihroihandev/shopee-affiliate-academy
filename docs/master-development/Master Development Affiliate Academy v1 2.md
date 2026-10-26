# Master Development Affiliate Academy v1.2

# Master Development Document — v1.2

**Status:** Blueprint pengembangan v1.2. Diselaraskan dengan situs materi Shopee Affiliate V2, delapan proyek praktik, enam database kerja, serta kebutuhan perlindungan konten dan aktivasi pembeli.

**Produk:** Platform belajar Shopee Affiliate berbasis web

**Target pengguna:** Pemula Shopee Affiliate di Indonesia

**Harga peluncuran:** Rp99.000, sekali bayar

**Harga reguler yang direncanakan:** Rp149.000

**Model akses:** Satu kali pembayaran, akses jangka panjang sesuai ketentuan layanan

**Kanal penjualan awal:** Lynk.id

**Domain:** Menggunakan domain milik sendiri

**Kurikulum:** Shopee Affiliate V2 (5 level, 24 modul, 8 project praktik, 6 database kerja)

**Versi sebelumnya:** v1.1

> **Apa yang diperbaiki di v1.2.** Dokumen v1.1 dipertahankan sebagai dasar, lalu diperbaiki agar lebih konsisten dan siap dipakai sebagai spesifikasi implementasi. Perubahan utama: risiko konten yang saat ini tersedia di situs publik ditangani sebagai tugas sebelum peluncuran; delapan proyek praktik dan enam database kerja dipetakan ke fitur aplikasi; Link Archive diprioritaskan karena dibutuhkan oleh materi dan Project 05; pencatatan komisi per periode dipisahkan dari metrik per konten; fitur catatan riset dan progres proyek ditambahkan; serta aturan RLS, admin bootstrap, dan aktivasi manual dibuat lebih eksplisit. Daftar perubahan ada di Lampiran D.
> 

---

# 0. KEPUTUSAN ARSITEKTUR DAN PRODUK

Keputusan berikut menjadi dasar implementasi v1.2. Jika keputusan diubah, catat dampaknya di Lampiran D sebelum mengubah skema database, kode, atau teks penjualan.

| No | Keputusan | Ketetapan | Implikasi implementasi |
| --- | --- | --- | --- |
| 1 | Kurikulum | 7 modul platform (M00–M06), 30 pelajaran, 24 modul materi, 5 level, 8 proyek praktik, dan 6 database kerja | Seed materi dan metadata proyek harus mengikuti Lampiran B dan sumber materi |
| 2 | Planner | Kalender umum berbasis tanggal dengan template Kalender 30 Hari; Hari 1–14 menjadi Sprint Awal | Planner mendukung tanggal bebas, template, dan status konten |
| 3 | Level 5 | Seluruh materi M06 dirilis bersama MVP; tools lanjutan Target Calculator dan SOP terstruktur dapat menyusul | Jangan mengklaim tools lanjutan sebelum aktif |
| 4 | Link Archive | Fitur arsip link sederhana masuk P1 sebelum peluncuran, karena dibutuhkan oleh Modul 14 dan Project 05 | `affiliate_links` dibuat pada fase tools; fitur lanjutan dapat disempurnakan setelah peluncuran |
| 5 | Nama tabel produk pengguna | `affiliate_products`, bukan `products` | Menghindari benturan makna dengan produk Affiliate Academy yang dijual |
| 6 | Perlindungan materi | Materi premium tidak boleh dikirim sebagai file statis di bundle frontend atau dipublikasikan melalui halaman publik | Konten premium disajikan dari Supabase dengan kebijakan akses; situs publik yang sekarang ada harus dibatasi/dinonaktifkan sebelum penjualan |
| 7 | Preview gratis | Semua 4 pelajaran M00 dan materi Modul 01 dapat dibaca akun terdaftar tanpa entitlement berbayar | Akses preview dibatasi secara konsisten oleh kebijakan database; ringkasan landing page boleh publik |
| 8 | Ketentuan akses dan refund | Harus diputuskan dan ditulis di `/terms` sebelum penjualan | Batas akses, pembaruan, dukungan, refund, dan penghentian layanan tidak boleh dibiarkan ambigu |
| 9 | Penentuan admin | Tabel `user_roles` dan fungsi database `is_admin()` | Tidak boleh ada mekanisme self-service yang memungkinkan pengguna menaikkan perannya sendiri |
| 10 | Proyek praktik dan database kerja | Delapan proyek praktik memiliki halaman/checklist/progres di platform. Enam database kerja dipetakan ke tools terkait | Project 01 dan 03 memerlukan `research_notes`; Project 05 memerlukan `affiliate_links`; pencatatan keuangan memerlukan `commission_periods` |
| 11 | Pembayaran awal | Lynk.id sebagai kanal penjualan; status dibuktikan melalui dashboard penyedia dan akses diberikan manual | Tidak mengasumsikan webhook atau API Lynk.id tersedia sebelum diverifikasi |
| 12 | QRIS DANA Bisnis | Jalur tambahan opsional, diverifikasi manual dari riwayat transaksi resmi dan hanya jika penggunaan online diizinkan penyedia | Jangan menjanjikan konfirmasi otomatis dari QRIS statis |

**Risiko yang sudah ada:** halaman materi pada URL GitHub Pages yang diberikan saat ini dapat diakses publik dan menampilkan navigasi menuju modul lengkap. Mengubah repository menjadi privat tidak otomatis membuat URL publik yang sudah diterbitkan menjadi terlindungi. Sebelum menjual akses premium, hentikan publikasi konten lengkap atau ubah situs menjadi preview terbatas. Anggap konten yang pernah terbuka sudah dapat disalin; keamanan produk harus berasal dari kontrol akses aplikasi, bukan asumsi bahwa materi tidak pernah dilihat publik.

## **Keputusan bisnis yang masih perlu diisi sebelum peluncuran:** ketentuan akses jangka panjang, pembaruan, dukungan, refund, dan skenario penghentian layanan (keputusan nomor 8).

# 1. VISI PRODUK

Affiliate Academy adalah platform pembelajaran dan eksekusi Shopee Affiliate. Platform ini membantu pemula memahami proses affiliate marketing, melakukan riset produk, membuat konten, menerbitkan konten, dan mengevaluasi performa secara terstruktur.

Produk ini bukan sekadar kumpulan materi atau e-book yang dipindahkan ke website. Nilai utamanya adalah kombinasi dari empat hal:

1. **Learning System:** jalur belajar terstruktur dari dasar sampai pertumbuhan profesional.
2. **Execution Tools:** alat praktis untuk menjalankan materi.
3. **Progress Tracking:** pencatatan perkembangan belajar dan aktivitas konten.
4. **Practical Workflow:** panduan langkah demi langkah yang bisa langsung dipraktikkan.

### Prinsip produk

- Mudah dipahami pemula.
- Berorientasi pada praktik, bukan teori saja.
- Antarmuka sederhana dan nyaman di perangkat mobile.
- Tidak menjanjikan pendapatan atau hasil affiliate tertentu.
- Mengutamakan fitur inti yang benar-benar bermanfaat.
- Bisa dikembangkan bertahap tanpa membangun ulang sistem.
- Istilah dan angka di aplikasi sama dengan istilah baku di materi (lihat Lampiran C).

---

# 2. TUJUAN VERSI PERTAMA

Versi pertama atau MVP harus memungkinkan pengguna untuk:

- Mendaftar dan login ke akun.
- Mengakses materi berbayar setelah hak akses diberikan.
- Mempelajari pelajaran dan menandai pelajaran selesai.
- Menyimpan progres belajar.
- Menggunakan alat riset produk.
- Membuat dan mengelola ide serta rencana konten.
- Mencatat hasil konten dengan empat status komisi.
- Mencatat dan mengevaluasi eksperimen sederhana.
- Melihat ringkasan aktivitas di dashboard.
- Mengakses produk dari desktop maupun ponsel.

Admin harus dapat mengelola pengguna, hak akses, materi, dan status pesanan dengan aman.

**Kriteria MVP selesai:** seluruh alur utama dapat digunakan, hak akses berfungsi, data pengguna terlindungi, dan minimal satu transaksi uji dapat diselesaikan dari pembelian sampai aktivasi akun.

---

# 3. TECH STACK FINAL

| Komponen | Teknologi | Fungsi |
| --- | --- | --- |
| Frontend | React | Antarmuka aplikasi |
| Bahasa | TypeScript | Mengurangi kesalahan tipe data |
| Build tool | Vite | Menjalankan dan membangun aplikasi |
| Styling | Tailwind CSS | Sistem desain dan layout |
| UI components | shadcn/ui | Komponen antarmuka |
| Backend platform | Supabase | Infrastruktur backend |
| Authentication | Supabase Auth | Registrasi dan login |
| Database | PostgreSQL via Supabase | Penyimpanan data |
| Authorization | Supabase RLS | Perlindungan data berbasis pengguna |
| Hosting frontend | Cloudflare Pages | Deployment aplikasi web |
| Version control | Git + GitHub | Pengelolaan kode dan perubahan |
| Penjualan awal | Lynk.id | Halaman penjualan dan checkout |
| Pembayaran alternatif | DANA Bisnis QRIS | Pembayaran langsung dengan verifikasi manual pada tahap awal |

### Arsitektur teknis

Frontend React berkomunikasi dengan Supabase lewat client SDK. Supabase menangani autentikasi, database, dan pemeriksaan hak akses.

Cloudflare Pages meng-host frontend. Jika perlu backend khusus, fungsi server dijalankan lewat Supabase Edge Functions atau layanan backend yang sesuai.

Jangan menyimpan secret key di frontend. Hanya public/publishable key yang memang ditujukan untuk frontend yang boleh dipakai di sana, dengan kebijakan RLS yang benar.

### Sumber konten materi

Materi Shopee Affiliate V2 menjadi sumber konten kanonis dan sebaiknya disimpan sebagai Markdown di folder `content/sumber-markdown/`, lalu diimpor ke tabel `lessons` lewat skrip seed yang idempoten. Situs GitHub Pages yang saat ini publik hanya boleh dipakai sebagai referensi saat migrasi; jangan mengandalkan situs statis publik sebagai penyimpanan materi premium. Sebelum peluncuran, batasi situs publik menjadi landing/preview yang disetujui atau nonaktifkan publikasi konten lengkap.

---

# 4. STRUKTUR HALAMAN WEBSITE

## 4.1 Halaman publik

### `/`

Landing page produk.

Bagian utama:

- Hero section.
- Penjelasan masalah target pengguna.
- Cara kerja Affiliate Academy.
- Daftar fitur dan tools.
- Preview isi materi (pelajaran gratis: Start Here dan Modul 01).
- Harga dan isi produk.
- FAQ.
- CTA menuju checkout Lynk.id.

### `/login`

Form login pengguna.

### `/register`

Form registrasi akun.

### `/forgot-password`

Pemulihan akses akun.

### `/auth/callback`

Penanganan callback autentikasi bila dibutuhkan.

### `/terms`

Ketentuan layanan, termasuk ketentuan akses jangka panjang, pembaruan, dukungan, dan refund.

### `/privacy`

Kebijakan privasi dan pengelolaan data.

## 4.2 Halaman aplikasi

Semua halaman berikut memerlukan autentikasi.

### `/dashboard`

Dashboard utama pengguna.

Komponen:

- Sapaan pengguna.
- Persentase progres belajar.
- Tombol lanjutkan belajar.
- Modul yang tersedia.
- Ringkasan aktivitas konten (per status).
- Ringkasan tracker (views, klik, pesanan, dan komisi per status).
- Pengingat aktivitas berikutnya.

### `/learn`

Daftar modul pembelajaran (M00–M06).

### `/learn/:moduleSlug`

Halaman detail modul dan daftar pelajaran.

### `/learn/:moduleSlug/:lessonSlug`

Halaman membaca materi.

Fitur:

- Konten pelajaran.
- Navigasi pelajaran sebelumnya dan berikutnya.
- Tandai selesai.
- Indikator progres.
- Daftar pelajaran dalam modul.
- Checklist dan kunci jawaban yang bisa dibuka satu per satu (seperti di situs materi).

### `/tools/products`

Product Research Lab.

### `/tools/content`

Content Creation Studio.

### `/tools/planner`

Kalender dan rencana publikasi.

### `/tools/tracker`

Performance Tracker, dengan dua tab: Performa dan Eksperimen.

### `/tools/research-notes`

Catatan riset untuk Project 01 (Niche Research) dan Project 03 (Competitor Research), termasuk sumber bukti, tanggal observasi, pemisahan fakta/asumsi, dan langkah validasi berikutnya.

### `/tools/links`

Link Archive untuk menyimpan affiliate link, menghubungkannya dengan produk, memeriksa status, dan menyimpan tanggal pemeriksaan.

### `/settings`

Pengaturan akun dan informasi hak akses.

## 4.3 Halaman admin

### `/admin`

Dashboard admin.

### `/admin/users`

Pengelolaan pengguna.

### `/admin/access`

Pengelolaan hak akses produk.

### `/admin/modules`

Pengelolaan modul, pelajaran, dan template (hook, skrip, CTA).

### `/admin/orders`

Pencatatan dan pemeriksaan pesanan.

Halaman admin harus dilindungi dengan otorisasi server/database. Menyembunyikan menu admin di frontend saja tidak cukup.

---

# 5. STRUKTUR MATERI PEMBELAJARAN

## 5.1 Prinsip struktur

Platform memakai dua tingkat konten: **modul** dan **pelajaran**.

- **Modul platform (M00–M06)** adalah kelompok belajar yang tampil di `/learn`. Di database, ini tabel `modules`.
- **Pelajaran** adalah halaman materi. Di database, ini tabel `lessons`.
- **Modul materi (Modul 01–24)** dari kurikulum menjadi pelajaran di dalam modul platform.

Penamaan ini bisa membingungkan. Di antarmuka, tampilkan pelajaran dengan nama aslinya, misalnya “Modul 06 — Riset dan Evaluasi Produk”, dan tampilkan modul platform sebagai “Tahap”. Untuk pembahasan teknis, gunakan istilah `modules` dan `lessons`.

## 5.2 Peta kurikulum ke platform

| Modul platform | Level kurikulum | Modul materi | Tools |
| --- | --- | --- | --- |
| M00 — Start Here | Pengantar | Pengantar dan cara belajar | Dashboard |
| M01 — Affiliate Fundamentals | Level 1 | Modul 01–03 | Dashboard |
| M02 — Product Research Lab | Level 2 | Modul 04–07 | Product Research Lab |
| M03 — Content Creation Studio | Level 3 (bagian 1) | Modul 08–12 | Content Creation Studio |
| M04 — Publishing Sprint | Level 3 (bagian 2) | Modul 13 dan Proyek Akhir 30 Hari | Planner dan checklist publikasi |
| M05 — Analyze & Improve | Level 4 | Modul 14–17 | Performance Tracker dan Eksperimen |
| M06 — Professional Growth | Level 5 | Modul 18–24 | Target Calculator dan Link Archive (P2) |

Rincian pelajaran per modul platform ada di Lampiran B.

## M00 — Start Here

Tujuan: membantu pengguna memahami cara memakai platform dan peta belajar.

Pelajaran:

- Selamat datang dan cara belajar.
- Peta belajar dan 5 aturan emas.
- Istilah baku (status komisi, funnel, keputusan).
- Cara memakai dashboard, tools, dan Sprint Awal.

Catatan: pelajaran terakhir (cara memakai dashboard dan Sprint Awal) adalah konten baru yang perlu ditulis. Tiga lainnya diambil dari halaman pengantar kurikulum.

## M01 — Affiliate Fundamentals

Tujuan: memahami dasar Shopee Affiliate dan aturan program.

Pelajaran: Modul 01 (Dasar Affiliate Marketing), Modul 02 (Shopee Affiliate Program dan Kebijakan), Modul 03 (Persiapan Akun dan Operasional).

Topik utama:

- Cara kerja affiliate marketing dan istilah penting.
- Perbedaan omzet, nilai pesanan, komisi, dan hasil setelah biaya.
- Aturan program, atribusi, pembayaran, dan pajak.
- Persiapan akun, keamanan, dan backup.

## M02 — Product Research Lab

Tujuan: memilih produk yang layak diuji untuk konten.

Pelajaran: Modul 04 (Riset Pasar dan Permintaan), Modul 05 (Niche, Audiens, dan Positioning), Modul 06 (Riset dan Evaluasi Produk), Modul 07 (Riset Kompetitor).

Tools:

- Form pencatatan produk.
- Skor evaluasi produk berbobot (7 faktor, skala 0–100).
- Daftar produk kandidat.
- Status: Riset, Siap Dipromosikan, Diuji, Dihentikan.

Skor produk adalah alat bantu keputusan, bukan jaminan penjualan.

## M03 — Content Creation Studio

Tujuan: mengubah ide produk menjadi konten.

Pelajaran: Modul 08 (Strategi Channel dan Traffic Organik), Modul 09 (Strategi Konten), Modul 10 (Copywriting dan Hook), Modul 11 (Produksi Video dan Visual), Modul 12 (SEO dan Konten Berbasis Pencarian).

Tools:

- Hook bank (30 hook awal, 5 jenis).
- Template skrip (hook, konteks, isi, bukti dan batasan, CTA, pengungkapan affiliate).
- Generator kerangka konten berbasis template.
- Catatan ide konten.

Generator berbasis template tidak memerlukan AI berbayar pada versi awal. Template harus mengingatkan pengguna untuk tidak mengaku sudah mencoba produk yang belum dicoba, tidak membuat klaim tanpa bukti, dan menyertakan pengungkapan affiliate.

## M04 — Publishing Sprint

Tujuan: membantu pengguna menjalankan rencana publikasi.

Pelajaran: Modul 13 (Distribusi dan Community Building), Proyek Akhir Level 3 (Sistem Konten Affiliate 30 Hari), dan Checklist Publikasi dan Kepatuhan.

Tools:

- Planner dengan template Kalender 30 Hari (Hari 1–14 sebagai Sprint Awal).
- Status konten: Ide, Riset, Skrip, Produksi, Pemeriksaan, Siap Publikasi, Terbit, Evaluasi, Selesai.
- Checklist publikasi (11 butir Quality Control).

## M05 — Analyze & Improve

Tujuan: mengevaluasi hasil dan menentukan eksperimen berikutnya.

Pelajaran: Modul 14 (Affiliate Link dan Tracking), Modul 15 (Conversion Rate Optimization), Modul 16 (Analytics dan Dashboard), Modul 17 (Eksperimen dan Validasi).

Tools:

- Performance Tracker dengan empat status komisi.
- Metrik: CTR, CVR, CVR valid, EPC, komisi per 1.000 views, rasio pembatalan.
- Catatan pembelajaran.
- Riwayat eksperimen dengan hipotesis empat bagian dan keputusan baku.

Semua angka tracker versi awal diinput pengguna, bukan ditarik otomatis dari Shopee.

## M06 — Professional Growth

Tujuan: mengembangkan hasil secara terukur dan aman.

Pelajaran: Modul 18 sampai Modul 24 (Monetisasi dan Pemilihan Produk Lanjutan, Keuangan dan Target Komisi, Scaling dan Sistem Produksi, Kepatuhan Risiko dan Reputasi, Advanced Strategy, Otomasi dan Sistem Kerja, Evaluasi Bisnis dan Mastery).

Tools:

- Link Archive sederhana (P1, sebelum peluncuran; mendukung Modul 14 dan Project 05).
- Target Calculator (P2, setelah peluncuran; hitung mundur komisi, pesanan, klik, views).
- Tabel kontribusi produk dan konsentrasi pendapatan (P2).
- Pengelolaan SOP dan pengetahuan terstruktur (P2).
## 5.7 Delapan proyek praktik wajib

Delapan proyek adalah bukti penerapan materi, bukan sekadar bacaan. Aplikasi harus menyediakan halaman proyek, checklist, catatan, status progres, dan hasil akhir yang dapat disimpan. Penilaian tidak didasarkan pada besarnya komisi; pengguna boleh menyelesaikan proyek First Conversion dengan diagnosis yang baik meskipun belum mendapat transaksi.

| Proyek | Hasil utama | Modul pendukung | Fitur platform |
| --- | --- | --- | --- |
| 01 — Niche Research | Niche, audiens, dan 10 masalah audiens dengan bukti | 04–05 | Research Notes |
| 02 — Product Research | 3–5 produk prioritas beserta alasan | 06 | Product Research Lab |
| 03 — Competitor Research | Peta 5–10 kompetitor dan 10 celah konten | 07 | Research Notes |
| 04 — Content Production | 30 ide, 10 skrip, minimal 10 konten terbit | 09–11 | Content Studio + Planner |
| 05 — First Conversion | Link teruji dan diagnosis funnel | 14–15 | Link Archive + Tracker |
| 06 — Analytics Dashboard | Dashboard dan laporan mingguan | 16 | Tracker + Commission Periods |
| 07 — Optimization Sprint | Satu eksperimen lengkap dan keputusan | 17 | Experiments |
| 08 — Business Growth Plan | Target komisi, SOP, dan rencana scaling | 19–20, 24 | Commission Periods + SOP (SOP tool lanjutan dapat P2) |

Setiap proyek memiliki: tujuan, modul pendukung, checklist, kolom bukti/sumber, catatan keterbatasan data, kriteria selesai, dan tanggal selesai. Seed proyek dan checklist sebagai data kurikulum; progres tiap pengguna disimpan terpisah.

## 5.8 Enam database kerja dalam platform

Materi mengajarkan enam database kerja. Di aplikasi, konsepnya dipetakan sebagai berikut:

1. **Database Produk Affiliate** → `affiliate_products`.
2. **Database Konten Affiliate** → `content_items` dan `performance_records`.
3. **Database Komisi Affiliate** → `commission_periods` (rekap periode) serta metrik per konten di `performance_records`.
4. **Database Link Affiliate** → `affiliate_links`.
5. **Database Eksperimen** → `experiments`.
6. **Database SOP dan Pengetahuan** → fitur SOP sederhana P2; sebelum fitur itu tersedia, pengguna dapat menyimpan catatan umum atau memakai Notion secara opsional.

Perbedaan penting: `performance_records` mencatat metrik per konten/tanggal, sedangkan `commission_periods` mencatat rekap komisi, biaya, jam kerja, dan rekonsiliasi untuk suatu periode. Angka dari dua level ini tidak boleh dijumlahkan secara otomatis karena dapat merujuk pada transaksi yang sama.

---

# 6. SPESIFIKASI FITUR INTI

## 6.1 Authentication

Fitur:

- Registrasi dengan email dan kata sandi.
- Login dan logout.
- Verifikasi email jika diaktifkan.
- Reset kata sandi.
- Pengelolaan sesi.

Aturan:

- Pengguna hanya dapat mengakses akun sendiri.
- Profil tidak boleh dipakai untuk memberikan hak akses berbayar.
- Data sensitif tidak boleh dikirim ke log atau URL.

## 6.2 Learning Management

Fitur:

- Daftar modul dan daftar pelajaran.
- Status progres.
- Tandai pelajaran selesai.
- Lanjutkan dari pelajaran terakhir.
- Navigasi antar-pelajaran.
- Pelajaran gratis (preview) bisa dibuka tanpa hak akses berbayar. Pelajaran preview: seluruh M00 dan Modul 01.
- Perkiraan waktu baca per pelajaran.

Konten harus memiliki struktur yang konsisten agar mudah ditambah dan diperbarui. Setiap pelajaran materi memakai 10 bagian yang sama: Tujuan, Ringkasan, Penjelasan, Istilah, Langkah Praktik, Contoh, Kesalahan Umum, Tugas dan Checklist, Latihan dan Kunci Jawaban, Standar Kelulusan.

## 6.3 Product Research Lab

Data yang dicatat:

- Nama produk.
- URL produk.
- Kategori.
- Harga saat dicek dan tanggal pemeriksaan.
- Tarif komisi dan sumber verifikasinya (teks).
- Rating dan jumlah ulasan jika tersedia.
- Tujuh skor faktor (skala 1–5): kesesuaian audiens, kualitas dan reputasi, harga dan nilai guna, komisi, persaingan, potensi demonstrasi, ketersediaan.
- Skor total berbobot (0–100).
- Risiko atau catatan.
- Status: Riset, Siap Dipromosikan, Diuji, Dihentikan.

Bobot skor sama dengan Modul 06: 25%, 20%, 15%, 15%, 10%, 10%, 5%.

Rumus skor:

```
Skor total = jumlah dari (skor faktor ÷ 5 × bobot)
```

Skor 80–100 dibaca sebagai kandidat prioritas, 65–79 perlu diperiksa lagi, dan di bawah 65 perlu dievaluasi kembali. Faktor yang datanya belum diketahui boleh dikosongkan, dan aplikasi menampilkan skor sebagai “belum lengkap”.

Fitur:

- Tambah, edit, dan hapus data.
- Filter berdasarkan status.
- Urutkan berdasarkan skor.
- Simpan catatan.
- Pengingat jika tanggal pemeriksaan harga atau komisi sudah lama.

## 6.4 Content Creation Studio

Data:

- Judul atau ide konten.
- Produk terkait.
- Platform.
- Pilar konten dan format.
- Jenis hook (masalah, rasa ingin tahu, demonstrasi, perbandingan, keberatan) dan teks hook.
- Sudut konten.
- Skrip.
- CTA.
- Affiliate link (teks) dan penanda pengungkapan affiliate.
- Hasil checklist publikasi.
- Status produksi.
- Jadwal publikasi, tanggal terbit, dan URL konten.

Fitur:

- Membuat ide.
- Menyimpan draf.
- Mengedit dan menghapus.
- Mengubah status konten.
- Menautkan konten ke produk riset.
- Memilih hook dari hook bank dan template skrip.
- Generator kerangka berbasis template.

## 6.5 Planner

Fitur:

- Kalender sederhana atau daftar berdasarkan tanggal.
- Tanggal publikasi yang direncanakan.
- Status pekerjaan (9 status konten).
- Filter konten.
- Tautan ke detail konten.
- Template Kalender 30 Hari, dengan Hari 1–14 sebagai Sprint Awal.

Template memakai rencana dari Modul 13: Hari 1–3 audiens, produk, dan channel; Hari 4–7 riset dan pilar; Hari 8–14 produksi dan publikasi awal; Hari 15–21 pengujian; Hari 22–27 perbaikan; Hari 28–30 evaluasi.

## 6.6 Performance Tracker

Metrik yang dicatat per konten per tanggal:

- Tanggal.
- Platform dan URL konten.
- Nama produk.
- Views.
- Klik.
- Pesanan.
- Pesanan dibatalkan.
- Pesanan memenuhi syarat (jika diketahui).
- Komisi estimasi.
- Komisi pending.
- Komisi disetujui.
- Komisi dibayarkan.
- Catatan evaluasi.

Perhitungan (hanya tampil jika penyebutnya lebih dari nol):

| Metrik | Rumus |
| --- | --- |
| CTR | klik ÷ views × 100% |
| CVR | pesanan ÷ klik × 100% |
| CVR valid | pesanan memenuhi syarat ÷ klik × 100% |
| EPC | komisi disetujui ÷ klik |
| Komisi per 1.000 views | komisi disetujui ÷ views × 1.000 |
| Rasio pembatalan | pesanan dibatalkan ÷ total pesanan × 100% |

Aturan penting:

- Empat status komisi dicatat terpisah. Jangan dijumlahkan, karena angkanya bisa beririsan.
- Jangan menyamakan pesanan dengan pesanan yang memenuhi syarat atau komisi yang sudah dibayarkan.
- Setiap metrik harus menampilkan dasar perhitungannya (misalnya “CTR terhadap views” dan “EPC berdasarkan komisi disetujui”).
- Jika data belum diisi, tampilkan kosong atau “belum diisi”, jangan nol palsu.

## 6.7 Eksperimen

Fitur:

- Mencatat hipotesis dengan empat bagian: perubahan, alasan, metrik, dan kriteria keputusan.
- Variabel utama, metrik utama, baseline, hasil, tanggal, ukuran sampel, dan keterbatasan.
- Keputusan: Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, atau Hentikan.
- Pelajaran yang didapat.
- Peringatan jika ukuran sampel sangat kecil (hanya sebagai pengingat).

## 6.8 Research Notes

Mendukung Project 01 dan Project 03, yang di materi asal disimpan sebagai catatan riset/kompetitor di halaman Notion bebas.

Data:

- Jenis catatan: niche research atau competitor research.
- Judul.
- Niche/audiens atau nama akun kompetitor.
- Temuan dan bukti.
- URL sumber.
- Tanggal observasi.
- Fakta yang teramati.
- Asumsi yang belum terverifikasi.
- Celah konten atau hipotesis.
- Langkah validasi berikutnya.
- Status dan catatan.

Jangan menyalin konten kompetitor. Catatan dipakai untuk analisis dan diferensiasi.

## 6.9 Link Archive

Fitur P1:

- Menambah, mengedit, dan mengarsipkan link.
- Menghubungkan link dengan `affiliate_products`.
- Menyimpan nama toko, platform, tanggal dibuat, tanggal pemeriksaan, dan status.
- Status: Aktif, Perlu Diperiksa, Tidak Digunakan.
- Link lama tidak dihapus saat diganti; statusnya diubah agar riwayat tetap tersedia.
- Menghubungkan link ke `content_items`.

Jangan mencoba menguji komisi dengan membeli melalui link sendiri. Pemeriksaan link hanya memastikan URL mengarah ke tujuan yang benar dan sesuai aturan program.

## 6.10 Practice Projects

Fitur:

- Delapan proyek dengan tujuan, modul pendukung, checklist, dan kriteria selesai.
- Pengguna dapat menandai checklist, menyimpan bukti/sumber, menulis refleksi, dan mencatat tanggal selesai.
- Progres proyek tersimpan lintas perangkat.
- Penyelesaian proyek tidak bergantung pada adanya transaksi atau besarnya komisi.
- Data proyek kurikulum bersifat read-only bagi pengguna; progres pengguna hanya dapat diubah pemilik akun.

## 6.11 Commission Periods

Mendukung Database Komisi Affiliate:

- Mencatat periode mulai dan akhir.
- Mencatat klik, pesanan, pesanan batal, empat status komisi, biaya usaha, jam kerja, status pembayaran, bukti atau referensi pembayaran, dan catatan rekonsiliasi.
- Menandai sumber data dan tanggal terakhir diperiksa.
- Mencegah periode laporan yang tumpang tindih ditotal begitu saja.
- Tidak menjumlahkan status komisi Estimasi, Pending, Disetujui, dan Dibayarkan menjadi satu angka.

## 6.8 Admin

Fitur:

- Mencari pengguna.
- Melihat status hak akses.
- Memberikan atau mencabut akses secara tercatat.
- Memeriksa pesanan.
- Mengelola modul, pelajaran, dan template.
- Melihat status aktivasi.
- Menyimpan alasan perubahan hak akses.

Semua tindakan admin penting harus dicatat dalam audit log.

---

# 7. DESAIN DATABASE

Gunakan PostgreSQL melalui Supabase. Skema final dituangkan ke migration SQL dan disimpan di repository. Gunakan tipe data, foreign key, constraint, dan indeks yang sesuai.

## 7.1 Ringkasan tabel

| Tabel | Fungsi | Dibangun di |
| --- | --- | --- |
| `profiles` | Profil pengguna | Fase 2 |
| `user_roles` | Peran admin | Fase 2 |
| `modules` | Modul platform (M00–M06) | Fase 2 |
| `lessons` | Pelajaran dan isi materi | Fase 2 |
| `lesson_progress` | Progres belajar | Fase 4 |
| `orders` | Pesanan | Fase 3 |
| `entitlements` | Hak akses produk | Fase 3 |
| `admin_audit_logs` | Jejak tindakan admin | Fase 3 |
| `affiliate_products` | Produk affiliate milik pengguna | Fase 5 |
| `content_templates` | Hook bank, template skrip, CTA, checklist | Fase 5 |
| `content_items` | Ide dan rencana konten | Fase 5 |
| `performance_records` | Catatan performa per konten/tanggal | Fase 5 |
| `commission_periods` | Rekap komisi, biaya, dan rekonsiliasi per periode | Fase 5 |
| `research_notes` | Catatan riset niche dan kompetitor | Fase 5 |
| `practice_projects` | Metadata delapan proyek dan checklist kurikulum | Fase 4 |
| `project_progress` | Progres checklist proyek per pengguna | Fase 5 |
| `experiments` | Eksperimen | Fase 5 |
| `affiliate_links` | Arsip link affiliate | Fase 5 (P1) |
| `sop_documents` | SOP dan pengetahuan (fitur lanjutan) | P2 |

## 7.2 `profiles`

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid | Sama dengan ID pengguna Auth |
| `display_name` | text | Nama tampilan |
| `created_at` | timestamptz |  |
| `updated_at` | timestamptz |  |

Jangan menjadikan data profil sebagai sumber otoritatif hak akses.

## 7.3 `user_roles`

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `user_id` | uuid | Pengguna |
| `role` | enum | `admin` |
| `created_at` | timestamptz |  |

Pengguna biasa tidak boleh bisa membaca atau mengubah tabel ini. Buat fungsi `is_admin()` di database dan pakai di kebijakan RLS. Jangan menentukan admin dari data yang bisa diubah pengguna.

## 7.4 `modules`

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid |  |
| `code` | text | `M00` sampai `M06` |
| `title` | text |  |
| `slug` | text | Unik |
| `description` | text |  |
| `sort_order` | int |  |
| `is_published` | boolean |  |

## 7.5 `lessons`

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid |  |
| `module_id` | uuid | Relasi ke `modules` |
| `title` | text |  |
| `slug` | text | Unik per modul |
| `content` | text | Markdown |
| `source_ref` | text | Rujukan ke materi, misalnya `modul-06` |
| `estimated_minutes` | int | Perkiraan waktu baca |
| `is_free_preview` | boolean | Boleh dibuka tanpa hak akses berbayar |
| `sort_order` | int |  |
| `is_published` | boolean |  |

Konten berbayar harus tetap dilindungi. Jangan mengirim semua materi premium kepada pengguna yang belum punya hak akses lalu hanya menyembunyikannya di UI. Kebijakan RLS: baca diizinkan jika `is_free_preview` bernilai benar, atau pengguna punya entitlement aktif.

## 7.6 `lesson_progress`

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid |  |
| `user_id` | uuid |  |
| `lesson_id` | uuid |  |
| `is_completed` | boolean |  |
| `completed_at` | timestamptz |  |
| `updated_at` | timestamptz |  |

Gunakan constraint unik untuk pasangan `user_id` dan `lesson_id`.

## 7.7 `affiliate_products`

Pengganti tabel `products` dari v1.0. Menyimpan produk affiliate yang dicatat pengguna (setara Database Produk Affiliate di materi).

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid |  |
| `user_id` | uuid |  |
| `name` | text |  |
| `product_url` | text |  |
| `category` | text |  |
| `price` | numeric | Harga saat dicek |
| `commission_note` | text | Tarif komisi dan sumber verifikasi |
| `rating` | numeric | Opsional |
| `review_count` | int | Opsional |
| `checked_at` | date | Tanggal pemeriksaan harga dan komisi |
| `score_audience_fit` | int | 1–5, opsional |
| `score_quality` | int | 1–5, opsional |
| `score_price_value` | int | 1–5, opsional |
| `score_commission` | int | 1–5, opsional |
| `score_competition` | int | 1–5, opsional |
| `score_demo_potential` | int | 1–5, opsional |
| `score_availability` | int | 1–5, opsional |
| `research_score` | numeric | 0–100, hasil hitung |
| `status` | enum | `research`, `ready`, `testing`, `dropped` |
| `notes` | text |  |
| `created_at` | timestamptz |  |
| `updated_at` | timestamptz |  |

Label tampilan status: Riset, Siap Dipromosikan, Diuji, Dihentikan.

## 7.8 `content_templates`

Menyimpan hook bank, template skrip, template CTA, dan checklist. Isinya dikelola admin.

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid |  |
| `kind` | enum | `hook`, `script`, `cta`, `checklist` |
| `subtype` | text | Untuk hook: masalah, rasa ingin tahu, demonstrasi, perbandingan, keberatan |
| `title` | text |  |
| `body` | text |  |
| `sort_order` | int |  |
| `is_published` | boolean |  |

Template hanya bisa dibaca pengguna yang punya hak akses. Pengguna tidak boleh mengubahnya.

## 7.9 `content_items`

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid |  |
| `user_id` | uuid |  |
| `product_id` | uuid | Relasi ke `affiliate_products`, opsional |
| `title` | text |  |
| `platform` | text |  |
| `pillar` | text | Pilar konten |
| `format` | text | Demonstrasi, perbandingan, tutorial, dan sebagainya |
| `hook_type` | text |  |
| `hook` | text |  |
| `angle` | text | Sudut konten |
| `script` | text |  |
| `cta` | text |  |
| `affiliate_link` | text | Link affiliate sebagai teks (MVP) |
| `has_disclosure` | boolean | Pengungkapan affiliate sudah ada |
| `qc_checklist` | jsonb | Hasil 11 butir checklist publikasi |
| `status` | enum | Lihat di bawah |
| `scheduled_at` | timestamptz |  |
| `published_at` | timestamptz |  |
| `content_url` | text | URL konten yang sudah terbit |
| `created_at` | timestamptz |  |
| `updated_at` | timestamptz |  |

Nilai `status`: `idea`, `research`, `script`, `production`, `review`, `ready`, `published`, `evaluation`, `done`. Label tampilan: Ide, Riset, Skrip, Produksi, Pemeriksaan, Siap Publikasi, Terbit, Evaluasi, Selesai.

## 7.10 `performance_records`

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid |  |
| `user_id` | uuid |  |
| `content_item_id` | uuid |  |
| `record_date` | date |  |
| `views` | int | Opsional |
| `clicks` | int | Opsional |
| `orders` | int | Opsional |
| `cancelled_orders` | int | Opsional |
| `qualified_orders` | int | Opsional |
| `commission_estimated` | numeric | Opsional |
| `commission_pending` | numeric | Opsional |
| `commission_approved` | numeric | Opsional |
| `commission_paid` | numeric | Opsional |
| `notes` | text |  |
| `created_at` | timestamptz |  |
| `updated_at` | timestamptz |  |

Kolom `commission_amount` dari v1.0 diganti empat kolom komisi di atas. Semua angka diinput manual dan boleh kosong. Kosong berarti belum diketahui, bukan nol.

## 7.11 `experiments`

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid |  |
| `user_id` | uuid |  |
| `name` | text |  |
| `goal` | text | Tujuan |
| `hypothesis` | text | Perubahan, alasan, metrik, dan kriteria keputusan |
| `variable` | text | Variabel utama |
| `primary_metric` | text |  |
| `baseline` | numeric | Opsional |
| `result` | numeric | Opsional |
| `start_date` | date |  |
| `end_date` | date |  |
| `sample_size` | int | Opsional |
| `limitations` | text |  |
| `decision` | enum | `continue`, `optimize`, `retest`, `deprioritize`, `stop` |
| `decision_reason` | text |  |
| `lessons` | text |  |
| `created_at` | timestamptz |  |
| `updated_at` | timestamptz |  |

Label keputusan: Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, Hentikan.

## 7.12 `affiliate_links` (P1)

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid |  |
| `user_id` | uuid |  |
| `product_id` | uuid |  |
| `shop_name` | text |  |
| `url` | text |  |
| `platform` | text |  |
| `status` | enum | `active`, `needs_check`, `unused` |
| `checked_at` | date |  |
| `notes` | text |  |
| `created_at` | timestamptz |  |

Di MVP, `content_items.link_id` menjadi relasi utama ke arsip link. Untuk migrasi data awal, kolom teks `affiliate_link` boleh dipakai sementara, tetapi jangan mempertahankan dua sumber kebenaran setelah relasi aktif. Hapus kolom teks setelah data lama berhasil dipindahkan dan diverifikasi.

## 7.13 `commission_periods`

Mewakili Database Komisi Affiliate untuk rekap per periode, bukan performa per konten.

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid | Primary key |
| `user_id` | uuid | Pemilik |
| `period_label` | text | Misalnya Minggu 1 atau Oktober 2026 |
| `start_date` | date | Awal periode |
| `end_date` | date | Akhir periode |
| `source_name` | text | Dashboard/sumber yang digunakan |
| `source_checked_at` | timestamptz | Waktu verifikasi data |
| `clicks` | int | Opsional |
| `orders` | int | Opsional |
| `cancelled_orders` | int | Opsional |
| `commission_estimated` | numeric | Opsional |
| `commission_pending` | numeric | Opsional |
| `commission_approved` | numeric | Opsional |
| `commission_paid` | numeric | Opsional |
| `business_costs` | numeric | Opsional |
| `work_hours` | numeric | Opsional |
| `payout_status` | text | Status pembayaran yang dilaporkan |
| `proof_reference` | text | URL/referensi bukti, jangan menyimpan data sensitif berlebihan |
| `reconciliation_notes` | text | Catatan rekonsiliasi |
| `created_at` | timestamptz |  |
| `updated_at` | timestamptz |  |

Periode yang tumpang tindih harus ditandai atau diperingatkan. Jangan menjumlahkan rekap mingguan dan bulanan yang mencakup transaksi sama. Empat status komisi adalah tahap yang dapat saling beririsan, bukan komponen yang boleh dijumlahkan.

## 7.14 `research_notes`

Menyimpan catatan riset untuk Project 01 dan Project 03.

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid | Primary key |
| `user_id` | uuid | Pemilik |
| `note_type` | enum | `niche`, `competitor` |
| `title` | text | Judul |
| `subject` | text | Niche, audiens, atau akun yang dianalisis |
| `findings` | text | Temuan |
| `evidence_urls` | jsonb | Daftar sumber/bukti |
| `observed_at` | date | Tanggal observasi |
| `facts` | text | Fakta teramati |
| `assumptions` | text | Asumsi belum terverifikasi |
| `content_gaps` | text | Celah konten atau peluang diferensiasi |
| `next_step` | text | Langkah validasi berikutnya |
| `status` | text | Status catatan |
| `created_at` | timestamptz |  |
| `updated_at` | timestamptz |  |

## 7.15 `practice_projects`

Metadata kurikulum untuk delapan proyek. Baris di-seed oleh admin dan tidak dapat diubah pengguna.

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid | Primary key |
| `code` | text | `P01` sampai `P08`, unik |
| `title` | text | Nama proyek |
| `objective` | text | Tujuan |
| `supporting_modules` | jsonb | Nomor modul pendukung |
| `checklist` | jsonb | Checklist dan kriteria selesai |
| `sort_order` | int | Urutan |
| `is_published` | boolean |  |
| `created_at` | timestamptz |  |

## 7.16 `project_progress`

Progres proyek tiap pengguna.

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid | Primary key |
| `user_id` | uuid | Pemilik |
| `project_id` | uuid | Relasi ke `practice_projects` |
| `completed_checklist` | jsonb | Status tiap item checklist |
| `notes` | text | Refleksi pengguna |
| `evidence_urls` | jsonb | Link bukti atau dokumen |
| `status` | enum | `not_started`, `in_progress`, `completed` |
| `started_at` | timestamptz |  |
| `completed_at` | timestamptz |  |
| `created_at` | timestamptz |  |
| `updated_at` | timestamptz |  |

Constraint unik: `user_id` + `project_id`.

## 7.17 `sop_documents` (P2)

Untuk fitur Database SOP dan Pengetahuan setelah peluncuran.

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid | Primary key |
| `user_id` | uuid | Pemilik |
| `title` | text | Nama proses |
| `category` | text | Bagian proses |
| `status` | text | Status SOP |
| `last_reviewed_at` | date | Tanggal tinjauan |
| `source_url` | text | Sumber |
| `procedure` | text | Langkah SOP |
| `review_notes` | text | Catatan tinjauan |
| `created_at` | timestamptz |  |
| `updated_at` | timestamptz |  |

## 7.18 `orders`

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid |  |
| `user_id` | uuid | Boleh kosong sebelum akun pembeli terhubung |
| `provider` | enum | `lynk`, `dana_qris`, `manual` |
| `provider_reference` | text | Referensi transaksi, unik jika tersedia |
| `customer_email` | text |  |
| `amount` | numeric |  |
| `currency` | text |  |
| `status` | enum | `pending`, `paid`, `cancelled`, `refunded`, `failed` |
| `paid_at` | timestamptz |  |
| `created_at` | timestamptz |  |
| `updated_at` | timestamptz |  |

## 7.19 `entitlements`

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid |  |
| `user_id` | uuid |  |
| `product_code` | text | Kode produk yang dijual, misalnya `affiliate-academy` |
| `order_id` | uuid |  |
| `status` | enum | `active`, `revoked`, `expired` |
| `granted_at` | timestamptz |  |
| `revoked_at` | timestamptz |  |
| `created_at` | timestamptz |  |

Hak akses diberikan oleh backend atau admin yang berwenang. Pengguna tidak boleh bisa membuat atau mengubah entitlement miliknya sendiri.

## 7.20 `admin_audit_logs`

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | uuid |  |
| `admin_user_id` | uuid |  |
| `action` | text |  |
| `target_user_id` | uuid |  |
| `related_order_id` | uuid |  |
| `reason` | text |  |
| `created_at` | timestamptz |  |

## 7.21 Ringkasan RLS

| Tabel | Baca | Ubah |
| --- | --- | --- |
| `profiles` | Pemilik | Pemilik |
| `user_roles` | Tidak ada (hanya fungsi database) | Admin lewat jalur aman |
| `modules`, `practice_projects` | Pengguna login | Admin |
| `lessons` | Akun terdaftar: preview tanpa entitlement; pelajaran lain hanya jika entitlement aktif | Admin |
| `lesson_progress` | Pemilik | Pemilik, dan hanya untuk pelajaran yang boleh diakses |
| `affiliate_products`, `content_items`, `performance_records`, `commission_periods`, `research_notes`, `project_progress`, `affiliate_links` | Pemilik | Pemilik |
| `content_templates` | Pengguna dengan entitlement aktif | Admin |
| `sop_documents` | Pemilik | Pemilik |
| `orders`, `entitlements` | Pemilik (hanya baca) | Admin atau backend |
| `user_roles` | Tidak dapat dibaca langsung oleh pengguna biasa | Bootstrap/admin lewat jalur aman |
| `admin_audit_logs` | Admin | Hanya sistem (tambah saja) |

---

# 8. SISTEM PEMBAYARAN DAN AKTIVASI

## Tahap awal: Lynk.id + aktivasi manual

Alur:

1. Pengguna menemukan produk di halaman promosi.
2. Pengguna membeli lewat checkout Lynk.id.
3. Admin memeriksa status transaksi langsung lewat dashboard Lynk.id, bukan dari screenshot pembeli.
4. Catat pesanan dengan ID internal unik, kanal penjualan, email pembeli, nominal, waktu verifikasi, dan status.
5. Pembeli membuat akun di Affiliate Academy menggunakan email yang dapat dicocokkan dengan pesanan.
6. Admin mencocokkan pesanan dengan akun dan memastikan pesanan belum pernah dipakai untuk memberikan akses.
7. Admin memberikan entitlement melalui halaman admin yang terotorisasi; tindakan dicatat di audit log.
8. Pengguna login dan mengakses materi.
9. Jika email checkout dan email akun berbeda, lakukan verifikasi manual tambahan sebelum mengaktifkan akses.

Untuk pembayaran langsung memakai QRIS DANA Bisnis, transaksi dicatat terpisah dan diverifikasi lewat riwayat transaksi resmi.

Bukti screenshot saja bukan bukti final pembayaran. Jangan memberikan akses hanya berdasarkan halaman redirect atau pesan dari pembeli.

## Tahap otomatis

Integrasi otomatis baru dibangun setelah jalur teknis tersedia dan terverifikasi.

Persyaratan:

- Sumber notifikasi pembayaran yang resmi.
- Endpoint backend yang aman.
- Verifikasi signature atau mekanisme autentikasi notifikasi sesuai penyedia.
- Validasi ID transaksi, nominal, mata uang, dan status.
- Pemrosesan idempoten agar notifikasi berulang tidak memberi akses ganda.
- Pencatatan pesanan dan status akses.
- Penanganan pembayaran gagal, tertunda, dibatalkan, atau dikembalikan.

Jika Lynk.id tidak menyediakan integrasi yang sesuai, pertahankan proses manual atau evaluasi penyedia checkout lain. Jangan mengasumsikan integrasi tersedia sebelum memverifikasi dokumentasi dan akses akun merchant. Jangan melakukan scraping dashboard atau mengandalkan email notifikasi yang tidak terautentikasi sebagai sumber final pembayaran.

Untuk proses manual, cegah pemberian akses ganda dengan constraint unik/aturan idempotensi pada referensi pesanan dan entitlement terkait. Proses refund atau chargeback harus memicu pemeriksaan admin dan keputusan akses yang tercatat.

---

# 9. KEAMANAN

Persyaratan wajib:

- RLS aktif pada seluruh tabel yang menyimpan data pengguna.
- Pengguna hanya dapat membaca dan mengubah data miliknya.
- Hak akses materi diperiksa di sisi database atau backend.
- Akses admin ditentukan oleh mekanisme yang aman (`user_roles` dan `is_admin()`) dan tidak bisa diubah pengguna.
- Secret key tidak boleh berada di frontend atau repository publik.
- Validasi input dilakukan di frontend dan backend sesuai konteks.
- Database migration disimpan di version control.
- Data dan tindakan penting punya jejak audit.
- Tidak ada password atau secret yang disimpan dalam teks biasa.
- Repository sumber materi dan situs statis yang berisi seluruh materi dibuat privat.
- Pengujian mencakup upaya mengakses data pengguna lain dan materi premium tanpa entitlement.

Kebijakan RLS harus diuji memakai akun pengguna biasa, bukan hanya akun admin.

---

# 10. DESAIN UI/UX

Arah desain:

- Modern, bersih, profesional, dan ramah pemula.
- Mobile-first.
- Navigasi sederhana.
- Tidak terlalu banyak elemen dekoratif.
- Status dan progres mudah dipahami.
- Komponen konsisten antarhalaman.
- Palet oranye dan putih, dengan tema terang, sepia, dan gelap, mengikuti situs materi yang sudah dibuat.

Referensi desain yang sudah ada: situs materi statis (HTML dan CSS) memuat pola yang bisa dipindahkan ke React dan Tailwind, yaitu navigasi bawah di ponsel, kartu bagian, kunci jawaban yang bisa dibuka, pengaturan baca, mode fokus, bar progres, dan konfeti saat modul selesai.

Navigasi utama:

- Dashboard
- Belajar
- Riset Produk
- Konten
- Planner
- Tracker (tab Performa dan Eksperimen)
- Pengaturan

Komponen reusable:

- App sidebar atau mobile navigation.
- Header.
- Module card dan lesson card.
- Lesson navigation.
- Progress indicator.
- Data table.
- Search dan filter.
- Form field.
- Empty state.
- Loading state.
- Error state.
- Confirmation dialog.
- Access denied state.
- Lesson reader (Markdown, tabel, checklist, kunci jawaban, blok rumus).

Setiap halaman harus punya kondisi loading, data kosong, error, dan sukses. Jangan menampilkan data dummy seolah-olah data asli pengguna.

---

# 11. URUTAN PENGEMBANGAN

## Fase 1 — Fondasi proyek

- [ ]  Buat repository GitHub (privat).
- [ ]  Audit URL publik materi yang saat ini aktif: [https://fatihroihandev.github.io/shopee-affiliate-academy/](https://fatihroihandev.github.io/shopee-affiliate-academy/).
- [ ]  Nonaktifkan publikasi materi lengkap atau ubah deployment publik menjadi preview yang disetujui saja. Jangan menganggap perubahan visibility repository cukup untuk melindungi URL yang sudah dipublikasikan.
- [ ]  Simpan sumber materi kanonis di repository privat dan pastikan folder materi premium tidak masuk ke `public/` atau bundle frontend.
- [ ]  Catat bahwa materi yang pernah publik mungkin sudah disalin/diindeks; kontrol akses aplikasi tetap wajib.
- [ ]  Buat proyek React + TypeScript + Vite.
- [ ]  Konfigurasikan Tailwind CSS dan shadcn/ui.
- [ ]  Buat proyek Supabase.
- [ ]  Siapkan environment variables.
- [ ]  Siapkan struktur folder dan routing.
- [ ]  Hubungkan repository ke Cloudflare Pages.

**Output:** aplikasi dasar berhasil berjalan secara lokal dan dapat di-deploy.

## Fase 2 — Database dan autentikasi

- [ ]  Buat migration tabel dasar (`profiles`, `user_roles`, `modules`, `lessons`).
- [ ]  Buat fungsi `is_admin()`.
- [ ]  Implementasikan Supabase Auth.
- [ ]  Buat profil pengguna otomatis saat registrasi.
- [ ]  Terapkan RLS.
- [ ]  Buat halaman login, registrasi, logout, dan reset password.
- [ ]  Lindungi halaman aplikasi.

**Output:** pengguna dapat membuat akun, login, dan hanya mengakses data yang berhak diakses.

## Fase 3 — Entitlement dan admin

- [ ]  Buat tabel `orders`, `entitlements`, dan `admin_audit_logs`.
- [ ]  Implementasikan pengecekan hak akses.
- [ ]  Buat halaman access denied.
- [ ]  Buat fungsi admin untuk memberikan dan mencabut akses.
- [ ]  Buat halaman pencatatan pesanan.
- [ ]  Buat audit log.
- [ ]  Uji pemberian dan pencabutan akses.

**Output:** sistem dapat membedakan akun yang punya dan tidak punya akses premium.

## Fase 4 — Learning Management System

- [ ]  Buat skrip seed idempoten untuk mengimpor materi Markdown ke `modules` dan `lessons` (7 modul platform, 30 pelajaran, 24 modul materi).
- [ ]  Tulis konten baru M00 (cara memakai dashboard dan Sprint Awal) dan pelajaran Checklist Publikasi dan Kepatuhan.
- [ ]  Buat dashboard.
- [ ]  Buat halaman daftar modul.
- [ ]  Buat lesson reader (Markdown, tabel, checklist, kunci jawaban).
- [ ]  Buat navigasi pelajaran.
- [ ]  Simpan progres belajar (`lesson_progress`).
- [ ]  Implementasikan perlindungan konten premium dan preview. Tandai `is_free_preview` untuk 4 pelajaran M00 dan Modul 01; preview dapat dibaca akun terdaftar tanpa entitlement berbayar.

**Output:** alur belajar utama berfungsi.

## Fase 5 — Tools pengguna

Implementasikan secara berurutan:

1. Product Research Lab (`affiliate_products`).
2. Research Notes untuk niche dan kompetitor (`research_notes`).
3. Content Creation Studio (`content_templates`, `content_items`).
4. Planner.
5. Link Archive (`affiliate_links`) untuk mendukung Modul 14 dan Project 05.
6. Performance Tracker (`performance_records`).
7. Rekap komisi per periode (`commission_periods`).
8. Eksperimen (`experiments`).
9. Progres delapan proyek praktik (`practice_projects`, `project_progress`).

Semua data harus tersimpan di database dan terisolasi per pengguna.

**Output:** pengguna dapat mempraktikkan materi dan menyimpan hasil kerja.

## Fase 6 — Integrasi penjualan awal dan halaman legal

- [ ]  Bangun landing page `/` (isi produk sesuai fitur yang benar-benar ada).
- [ ]  Tulis `/terms` dan `/privacy` (akses jangka panjang, pembaruan, dukungan, refund).
- [ ]  Siapkan halaman penjualan di Lynk.id.
- [ ]  Pastikan deskripsi, harga, isi produk, dan ketentuan akses konsisten.
- [ ]  Uji pembelian.
- [ ]  Uji pencatatan pesanan.
- [ ]  Uji proses aktivasi akun.
- [ ]  Siapkan prosedur dukungan pembeli.

**Output:** transaksi dapat diproses lewat alur manual yang dapat diaudit.

## Fase 7 — Quality assurance

- [ ]  Uji desktop dan mobile.
- [ ]  Uji seluruh route.
- [ ]  Uji validasi form.
- [ ]  Uji akses tanpa login.
- [ ]  Uji akses tanpa entitlement (termasuk membaca `lessons.content` langsung dari API).
- [ ]  Uji bahwa materi premium tidak ada di source map, bundle JavaScript, direktori `public/`, atau URL publik.
- [ ]  Uji bahwa URL GitHub Pages lama tidak lagi menampilkan materi lengkap sebelum peluncuran.
- [ ]  Uji isolasi data antar pengguna.
- [ ]  Uji proses lupa kata sandi.
- [ ]  Uji pemulihan dari error.
- [ ]  Uji alur transaksi dan aktivasi.
- [ ]  Uji perhitungan metrik tracker, skor produk, dan peringatan periode komisi tumpang tindih.
- [ ]  Uji seluruh 8 proyek praktik dan progres checklist per pengguna.
- [ ]  Uji Link Archive dari produk → link → konten.

**Output:** MVP siap diluncurkan ke pembeli awal.

## Fase 8 — Peluncuran dan evaluasi

- [ ]  Mulai dengan kelompok pembeli awal.
- [ ]  Kumpulkan masalah penggunaan.
- [ ]  Catat pertanyaan dukungan yang berulang.
- [ ]  Perbaiki hambatan utama.
- [ ]  Ukur penggunaan materi dan tools.
- [ ]  Evaluasi kebutuhan otomasi pembayaran.

**Output:** keputusan pengembangan berdasarkan penggunaan nyata.

---

# 12. STRUKTUR FOLDER YANG DISARANKAN

```
affiliate-academy/
├── public/
├── content/
│   └── sumber-markdown/
├── scripts/
│   └── seed-lessons.ts
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── shared/
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── learning/
│   │   ├── products/
│   │   ├── content/
│   │   ├── planner/
│   │   ├── tracker/
│   │   ├── experiments/
│   │   ├── access/
│   │   └── admin/
│   ├── hooks/
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── metrics.ts
│   │   └── utils.ts
│   ├── pages/
│   ├── routes/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   ├── migrations/
│   └── functions/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts
```

Struktur dapat disesuaikan dengan kebutuhan implementasi, tetapi pemisahan fitur harus tetap jelas. File `metrics.ts` menyimpan rumus CTR, CVR, EPC, dan skor produk di satu tempat supaya konsisten dengan materi.

---

# 13. FITUR YANG TIDAK DIBANGUN PADA MVP

Untuk menjaga waktu dan biaya, tunda fitur berikut:

- AI generator yang memerlukan API berbayar.
- Integrasi langsung dengan API Shopee.
- Otomatisasi data komisi Shopee.
- Hosting video sendiri.
- Komunitas internal.
- Gamifikasi kompleks.
- Aplikasi Android atau iOS.
- Multi-produk dan sistem kupon yang kompleks.
- Sistem afiliasi untuk menjual Affiliate Academy itu sendiri.
- Integrasi payment gateway langsung jika belum diperlukan.
- Target Calculator, dashboard kontribusi produk, dan pengelolaan SOP terstruktur (P2). Link Archive dasar bukan P2; fitur ini masuk P1.

Fitur baru hanya ditambahkan jika menyelesaikan masalah pengguna yang nyata.

---

# 14. KETENTUAN PRODUK DAN MODEL BISNIS

## Harga

- Harga peluncuran: Rp99.000.
- Harga reguler yang direncanakan: Rp149.000.
- Model pembayaran: sekali bayar.

## Akses jangka panjang

Definisikan dengan jelas hal-hal berikut sebelum peluncuran, lalu tuangkan di `/terms`:

- [ ]  Apa yang dimaksud akses jangka panjang.
- [ ]  Pembaruan materi apa yang termasuk.
- [ ]  Ketentuan dukungan pembeli.
- [ ]  Kebijakan pengembalian dana.
- [ ]  Keadaan jika layanan dihentikan.

Jangan menjanjikan layanan akan tersedia selamanya tanpa batasan operasional yang jelas.

## Klaim pemasaran

- Tidak menjamin jumlah pendapatan.
- Tidak menjanjikan komisi tertentu.
- Tidak menyatakan keberhasilan pengguna sebagai hasil yang pasti.
- Jelaskan bahwa hasil bergantung pada pelaksanaan, produk, audiens, dan faktor lain.
- Angka di materi dan tools (misalnya contoh target Rp30 juta) selalu disebut simulasi untuk latihan.
- Jelaskan isi produk sesuai yang benar-benar tersedia saat peluncuran (jumlah pelajaran, tools yang sudah aktif).

## Kepatuhan

Periksa ketentuan platform affiliate, hak penggunaan materi, perlindungan data pribadi, dan kewajiban usaha yang relevan sebelum peluncuran. Pastikan juga halaman penjualan tidak memakai nama atau logo yang bisa membuat Affiliate Academy tampak sebagai produk resmi Shopee.

---

# 15. KRITERIA KELULUSAN MVP

MVP dinyatakan siap apabila:

- [ ]  Domain dan deployment berfungsi.
- [ ]  Registrasi dan login berjalan.
- [ ]  Pengguna dapat reset password.
- [ ]  Halaman premium terlindungi, termasuk saat API dipanggil langsung.
- [ ]  Admin dapat memberikan akses dengan aman, dan peran admin tidak bisa diubah pengguna.
- [ ]  Modul dan pelajaran dapat dibuka (7 modul, 30 pelajaran).
- [ ]  Pelajaran gratis dapat dibuka tanpa akses berbayar.
- [ ]  Progres belajar tersimpan.
- [ ]  Product Research Lab berfungsi, dengan skor berbobot.
- [ ]  Content Creation Studio berfungsi, dengan hook bank dan template skrip.
- [ ]  Planner berfungsi.
- [ ]  Performance Tracker berfungsi, dengan empat status komisi dan metrik yang benar.
- [ ]  Eksperimen dapat dicatat dengan lima keputusan baku.
- [ ]  Delapan proyek praktik dapat dibuka dan progresnya tersimpan.
- [ ]  Research Notes mendukung Project 01 dan Project 03.
- [ ]  Link Archive mendukung Modul 14 dan Project 05.
- [ ]  Rekap komisi per periode terpisah dari performa per konten.
- [ ]  Data pengguna terisolasi.
- [ ]  Alur Lynk.id dan aktivasi pembeli diuji.
- [ ]  Ketentuan layanan dan privasi tersedia.
- [ ]  Tampilan mobile diuji.
- [ ]  Backup dan pemulihan database dipertimbangkan.
- [ ]  Tidak ada secret key di frontend atau repository publik.
- [ ]  Materi premium tidak dapat diakses dari URL publik atau file frontend statis.
- [ ]  Situs materi publik lama telah dinonaktifkan atau dibatasi menjadi preview yang disetujui saja.
- [ ]  Prosedur dukungan pembeli tersedia.

---

# 16. PRIORITAS EKSEKUSI

**P0 — Wajib**

- Fondasi aplikasi.
- Authentication.
- Database dan RLS.
- Entitlement.
- Learning Management System dan seed materi.
- Admin access management.
- Deployment.

**P1 — Penting**

- Product Research Lab.
- Content Creation Studio.
- Planner.
- Performance Tracker.
- Rekap komisi per periode.
- Link Archive dasar.
- Research Notes.
- Progres delapan proyek praktik.
- Eksperimen.
- Landing page, `/terms`, dan `/privacy`.
- Prosedur penjualan dan aktivasi.

**P2 — Setelah peluncuran**

- Otomatisasi pembayaran.
- Target Calculator, analisis kontribusi produk, dan pengelolaan SOP terstruktur (tools M06).
- Analitik penggunaan.
- Penyempurnaan UX.
- Fitur AI.
- Fitur lanjutan berdasarkan masukan pengguna.

---

# 17. PRINSIP PENGEMBANGAN

1. Bangun fitur secara berurutan dan pastikan setiap fase berfungsi sebelum melanjutkan.
2. Jangan mengimplementasikan semua fitur sekaligus.
3. Gunakan data nyata dari database, bukan mock data yang tersisa di production.
4. Utamakan keamanan hak akses sejak awal.
5. Simpan perubahan database lewat migration.
6. Uji fitur kritis dengan akun pengguna biasa.
7. Hindari dependensi berbayar yang belum dibutuhkan.
8. Jangan mengubah tech stack tanpa alasan teknis yang jelas.
9. Pisahkan penjualan, pembayaran, dan sistem pembelajaran.
10. Evaluasi pengembangan berdasarkan manfaat bagi pengguna dan hasil penjualan.
11. Samakan istilah dan rumus aplikasi dengan istilah baku materi.

---

## KEPUTUSAN AKHIR

Affiliate Academy dibangun sebagai aplikasi belajar berbasis web memakai React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Supabase, dan Cloudflare Pages.

Kurikulum Shopee Affiliate V2 (5 level, 24 modul materi, 30 pelajaran platform, 8 proyek praktik, dan 6 database kerja) dipetakan ke aplikasi. Tools pengguna meliputi Product Research Lab, Research Notes, Content Creation Studio, Planner, Link Archive, Performance Tracker, rekap komisi per periode, dan Eksperimen.

Lynk.id dipakai untuk penjualan awal, sedangkan aktivasi hak akses dilakukan manual sampai tersedia jalur integrasi otomatis yang terverifikasi. DANA Bisnis dapat dipertimbangkan sebagai jalur pembayaran langsung sesuai ketentuan penyedia.

Sebelum peluncuran, risiko utama yang wajib diselesaikan adalah menghentikan akses publik ke materi premium yang saat ini tersedia di situs statis. Target awal bukan membangun platform dengan fitur sebanyak mungkin, melainkan meluncurkan MVP yang aman, berfungsi, bermanfaat, dan bisa diuji pembeli nyata.

**Langkah pengembangan pertama:** membuat repository privat, menyiapkan proyek frontend, menghubungkan Supabase, dan membangun autentikasi beserta sistem entitlement sebelum mengembangkan modul dan tools pembelajaran.

---

# LAMPIRAN A — PERUBAHAN DARI v1.0

| No | Bagian | Perubahan | Alasan |
| --- | --- | --- | --- |
| 1 | 5 | 6 modul (M00–M05) menjadi 7 modul platform (M00–M06) dan 30 pelajaran | Kurikulum sudah punya 24 modul dan 5 level. Level 5 belum punya tempat di v1.0 |
| 2 | 5 | Planner dan target praktik 14 hari menjadi Kalender 30 Hari dengan Sprint Awal 14 hari | Materi (Modul 09 dan 13) memakai rencana 30 hari. Hari 1–14 sudah ada sebagai fase awal |
| 3 | 7 | `products` diganti `affiliate_products` | Nama lama bisa tertukar dengan produk yang dijual (Affiliate Academy) di `entitlements.product_code` |
| 4 | 7 | `commission_amount` diganti 4 kolom (estimasi, pending, disetujui, dibayarkan) | Materi menetapkan 4 status komisi yang tidak boleh disamakan atau dijumlahkan |
| 5 | 7 | Tambah kolom skor 7 faktor di `affiliate_products` | Modul 06 memakai skor berbobot 7 faktor, bukan satu angka |
| 6 | 7 | Status produk (kandidat, dipilih, diuji, ditolak) disesuaikan dengan label materi (Riset, Siap Dipromosikan, Diuji, Dihentikan) | Konsistensi istilah |
| 7 | 7 | Status konten dari 4 menjadi 9 | Modul 23 dan Database Konten memakai 9 status |
| 8 | 7 | Tambah tabel `experiments` | Modul 05 v1.0 menyebut “riwayat eksperimen” tetapi belum punya tabel |
| 9 | 7 | Tambah tabel `content_templates` | Hook bank dan template skrip butuh tempat penyimpanan |
| 10 | 7 | Tambah tabel `user_roles` dan fungsi `is_admin()` | v1.0 tidak menjelaskan cara menentukan admin |
| 11 | 7 | Tambah `is_free_preview` di `lessons` | Landing page menjanjikan preview materi |
| 12 | 7 | Tambah tabel `affiliate_links` (P2) | Modul 14 mengajarkan arsip link |
| 13 | 6 | Rumus dan metrik tracker disamakan dengan materi (CTR, CVR, CVR valid, EPC, komisi per 1.000 views, rasio pembatalan) | Konsistensi dengan Modul 16 |
| 14 | 11 | Tambah tugas seed materi, penulisan konten M00, landing page, `/terms`, dan `/privacy` | v1.0 menyebut halaman itu tetapi tidak menjadwalkannya |
| 15 | 9 dan 15 | Tambah syarat repository dan situs statis materi harus privat | Seluruh materi premium ada di sumber Markdown dan situs statis |
| 16 | 15 | Format checklist diperbaiki | Bullet kosong di v1.0 tidak terbaca saat diimpor |
| 17 | Semua | Istilah “tautan affiliate” diganti “link affiliate” | Mengikuti istilah di materi |
| 18 | 0 | Bagian “Keputusan yang perlu dikonfirmasi” menjadi “Keputusan yang sudah ditetapkan”. Semua 9 rekomendasi disetujui | Keputusan sudah final. Hanya isi ketentuan akses dan refund (nomor 8) yang belum ditentukan |
| 19 | 4, 6, 11 | Pelajaran preview ditetapkan (M00 dan Modul 01). Tugas memastikan repository privat ditambahkan di Fase 1 | Menerapkan keputusan nomor 6 dan 7 |

---

# LAMPIRAN B — PELAJARAN PER MODUL PLATFORM

Total: 7 modul, 30 pelajaran.

## M00 — Start Here (4 pelajaran)

| No | Pelajaran | Sumber |
| --- | --- | --- |
| 1 | Selamat datang dan cara belajar | Halaman pengantar |
| 2 | Peta belajar dan 5 aturan emas | Halaman pengantar |
| 3 | Istilah baku | Halaman pengantar dan Kamus Istilah |
| 4 | Cara memakai dashboard, tools, dan Sprint Awal | Konten baru |

## M01 — Affiliate Fundamentals (3 pelajaran)

| No | Pelajaran | Sumber |
| --- | --- | --- |
| 1 | Modul 01 — Dasar Affiliate Marketing | Materi |
| 2 | Modul 02 — Shopee Affiliate Program dan Kebijakan | Materi |
| 3 | Modul 03 — Persiapan Akun dan Operasional | Materi |

## M02 — Product Research Lab (4 pelajaran)

| No | Pelajaran | Sumber |
| --- | --- | --- |
| 1 | Modul 04 — Riset Pasar dan Permintaan | Materi |
| 2 | Modul 05 — Niche, Audiens, dan Positioning | Materi |
| 3 | Modul 06 — Riset dan Evaluasi Produk | Materi |
| 4 | Modul 07 — Riset Kompetitor | Materi |

## M03 — Content Creation Studio (5 pelajaran)

| No | Pelajaran | Sumber |
| --- | --- | --- |
| 1 | Modul 08 — Strategi Channel dan Traffic Organik | Materi |
| 2 | Modul 09 — Strategi Konten | Materi |
| 3 | Modul 10 — Copywriting dan Hook | Materi |
| 4 | Modul 11 — Produksi Video dan Visual | Materi |
| 5 | Modul 12 — SEO dan Konten Berbasis Pencarian | Materi |

## M04 — Publishing Sprint (3 pelajaran)

| No | Pelajaran | Sumber |
| --- | --- | --- |
| 1 | Modul 13 — Distribusi dan Community Building | Materi |
| 2 | Proyek Akhir Level 3: Sistem Konten Affiliate 30 Hari | Lampiran Modul 13 |
| 3 | Checklist Publikasi dan Kepatuhan | Disusun dari Modul 11 dan Modul 21 |

## M05 — Analyze & Improve (4 pelajaran)

| No | Pelajaran | Sumber |
| --- | --- | --- |
| 1 | Modul 14 — Affiliate Link dan Tracking | Materi |
| 2 | Modul 15 — Conversion Rate Optimization | Materi |
| 3 | Modul 16 — Analytics dan Dashboard | Materi |
| 4 | Modul 17 — Eksperimen dan Validasi | Materi |

## M06 — Professional Growth (7 pelajaran)

| No | Pelajaran | Sumber |
| --- | --- | --- |
| 1 | Modul 18 — Monetisasi dan Pemilihan Produk Lanjutan | Materi |
| 2 | Modul 19 — Keuangan dan Target Komisi | Materi |
| 3 | Modul 20 — Scaling dan Sistem Produksi | Materi |
| 4 | Modul 21 — Kepatuhan, Risiko, dan Reputasi | Materi |
| 5 | Modul 22 — Advanced Strategy | Materi |
| 6 | Modul 23 — Otomasi dan Sistem Kerja | Materi |
| 7 | Modul 24 — Evaluasi Bisnis dan Mastery | Materi |

Catatan: materi Panduan Pelatih dan Penilaian tidak dimasukkan sebagai pelajaran pengguna. Halaman itu untuk pelatih dan bisa dipakai di dokumen internal.

---

# LAMPIRAN C — ISTILAH BAKU YANG DIPAKAI DI APLIKASI

| Hal | Aturan |
| --- | --- |
| Status komisi | Estimasi → Pending → Disetujui → Dibayarkan. Empat angka ini dicatat terpisah dan tidak dijumlahkan |
| Funnel | Views → Klik → Pesanan → Transaksi memenuhi syarat → Komisi disetujui → Pembayaran |
| Status produk | Riset, Siap Dipromosikan, Diuji, Dihentikan |
| Status konten | Ide, Riset, Skrip, Produksi, Pemeriksaan, Siap Publikasi, Terbit, Evaluasi, Selesai |
| Keputusan evaluasi | Lanjutkan, Optimalkan, Uji ulang, Kurangi prioritas, Hentikan |
| Jenis hook | Masalah, rasa ingin tahu, demonstrasi, perbandingan, keberatan |
| Tahap pembeli | Awareness, Consideration, Evaluation, Conversion |
| Hasil setelah biaya | Basis kas = komisi dibayarkan − biaya. Basis kinerja = komisi disetujui − biaya. “Profit bersih” hanya setelah pajak |
| Angka contoh | Selalu simulasi untuk latihan, bukan tarif resmi Shopee dan bukan janji hasil |
| Pengungkapan affiliate | “Link ini adalah affiliate link. Saya dapat menerima komisi jika kamu membeli lewat link ini dan transaksinya memenuhi ketentuan program.” |

---

# LAMPIRAN D — PERUBAHAN v1.1 → v1.2

| Bagian | Perbaikan | Alasan |
| --- | --- | --- |
| Bagian 0 dan Fase 1 | Menjelaskan bahwa materi saat ini tersedia di URL publik dan perlu dinonaktifkan/dibatasi sebelum menjual akses premium | Mengubah visibility repository saja tidak melindungi konten yang sudah diterbitkan |
| Bagian 5 | Menambahkan pemetaan delapan proyek praktik dan enam database kerja ke fitur platform | Memastikan materi praktik tidak hanya tampil sebagai bacaan |
| Bagian 6 | Menambahkan Research Notes, Link Archive, Practice Projects, dan Commission Periods | Project 01, 03, 05, 06, dan 08 memerlukan fitur/data yang sebelumnya belum lengkap |
| Bagian 7 | Menambahkan tabel `research_notes`, `commission_periods`, `practice_projects`, `project_progress`, dan `sop_documents` | Memisahkan data riset, progres proyek, metrik per konten, dan rekap keuangan |
| Bagian 7 | Memindahkan `affiliate_links` dari P2 ke P1 | Link Archive diperlukan oleh Modul 14 dan Project 05; menunda seluruh fitur akan memutus alur kurikulum |
| Bagian 8 | Memperjelas proses aktivasi manual, pencocokan email, pencegahan akses ganda, dan verifikasi transaksi | Mengurangi risiko salah aktivasi dan klaim pembayaran palsu |
| Bagian 9 | Menambahkan aturan admin bootstrap, keamanan fungsi `is_admin()`, konten statis, dan private storage | RLS tidak melindungi materi yang telah dikirim ke browser sebagai aset publik |
| Fase 4–7 | Menambahkan seed idempoten, audit URL publik, QA proyek, dan pengujian konten premium | Kriteria kelulusan menjadi dapat diuji, bukan hanya checklist fitur |
| Prioritas P1/P2 | Memindahkan fitur minimum yang diperlukan oleh proyek praktik ke P1; menunda Target Calculator dan SOP lanjutan | Mengurangi kontradiksi antara kurikulum yang dijanjikan dan tools yang tersedia |

## Catatan sumber kurikulum

Situs referensi: [https://fatihroihandev.github.io/shopee-affiliate-academy/](https://fatihroihandev.github.io/shopee-affiliate-academy/)

Bagian yang dijadikan dasar pemetaan:

- Beranda dan Pengantar: 5 level, 24 modul, 8 proyek, 6 database, 5 aturan emas, istilah baku, funnel, dan evaluasi mingguan.
- 8 Project Praktik Wajib: hasil, modul pendukung, dan kriteria selesai untuk Project 01–08.
- Database Notion yang Wajib Dibangun: enam database kerja dan hubungan antardatabase.
- Lembar Rumus dan Template: rumus CTR, CVR, CVR valid, EPC, komisi per 1.000 views, skor produk, serta template praktik.

Semua aturan Shopee yang dapat berubah harus diperiksa dari sumber resmi sebelum dipublikasikan atau diperbarui. Situs ini adalah materi pembelajaran independen, bukan situs resmi Shopee.

layout :

![Dasbor Doodle Affiliate Academy.png](Dasbor_Doodle_Affiliate_Academy.png)

[MASTER DEVELOPMENT ADDENDUM v1.3](MASTER%20DEVELOPMENT%20ADDENDUM%20v1%203%20403522c2d0f68011b006d05a206afed8.md)

[SCOPE LOCK & FINAL DEVELOPMENT SPECIFICATION](SCOPE%20LOCK%20&%20FINAL%20DEVELOPMENT%20SPECIFICATION%20403522c2d0f6806a9b38c0ec5dca1b25.md)

[ADDENDUM — AFFILIATE PROGRAM & AFFILIATE DASHBOARD](ADDENDUM%20%E2%80%94%20AFFILIATE%20PROGRAM%20&%20AFFILIATE%20DASHBOARD%20404522c2d0f68068bd8ddcbbf0037825.md)