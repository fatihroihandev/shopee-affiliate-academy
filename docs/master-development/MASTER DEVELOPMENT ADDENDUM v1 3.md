# MASTER DEVELOPMENT ADDENDUM v1.3

## Affiliate Academy — Free-to-Premium, Visual Identity & Launch Readiness

**Status:** Spesifikasi perubahan untuk diintegrasikan ke Master Development v1.2

**Produk:** Platform pembelajaran dan tools Shopee Affiliate

**Target pasar:** Pemula hingga affiliate yang ingin membangun sistem kerja terstruktur di Indonesia

**Model bisnis:** Free access + one-time premium purchase

**Harga reguler:** Rp149.000

**Harga peluncuran:** Rp99.000

**Stack:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Supabase, Cloudflare Pages

**Identitas visual:** Playful Editorial × Hand-Drawn Doodles × Modern SaaS

---

# 1. ARAH PRODUK

Affiliate Academy bukan hanya kumpulan materi pembelajaran. Produk harus menjadi workspace yang menggabungkan:

1. Materi belajar bertahap.
2. Tools praktis untuk menjalankan aktivitas affiliate.
3. Pencatatan progres belajar dan produksi konten.
4. Evaluasi performa dan eksperimen.
5. Proyek praktik yang menghasilkan output nyata.

Prinsip produk:

- Pengguna gratis memperoleh nilai nyata sebelum membeli.
- Pengguna premium memperoleh akses ke sistem belajar dan tools yang lebih lengkap.
- Setiap fitur harus memiliki kegunaan yang jelas.
- AI bukan dependensi wajib untuk menjalankan fitur inti MVP.
- Tidak ada janji pendapatan atau jaminan hasil affiliate.
- Antarmuka harus mudah digunakan di ponsel.
- Materi premium tidak boleh dapat diakses hanya dengan mengubah URL atau memanipulasi frontend.

# 2. KEPUTUSAN PRICING DAN AKSES

## 2.1 Paket Free

**Harga: Rp0**

Tujuan: memberikan pengalaman awal, memperlihatkan kualitas materi, dan mengonversi pengguna yang cocok menjadi pembeli premium.

Hak akses:

- Registrasi dan login.
- Empat pelajaran pada M00 — Start Here.
- Materi Modul 01 sebagai preview sesuai ketetapan v1.2.
- Dashboard dasar.
- Progres belajar untuk materi yang tersedia.
- Preview fitur Product Research Lab, Content Creation Studio, Planner, dan Performance Tracker.
- Halaman penjelasan fitur premium.
- Informasi paket, harga, dan cara upgrade.

Batasan:

- Tidak dapat membaca materi premium yang terkunci.
- Tidak dapat menyelesaikan seluruh delapan proyek praktik.
- Tidak memperoleh akses penuh ke enam database kerja dan tools premium.
- Tidak dapat membuka template, checklist, atau materi premium melalui URL langsung.
- Batas penggunaan fitur harus dijelaskan di antarmuka, bukan hanya melalui pesan error.

Akun Free tetap dapat menggunakan akun dan mengakses materi gratis tanpa batas waktu selama layanan tersedia dan akun tidak melanggar ketentuan.

## 2.2 Paket Premium

**Harga reguler: Rp149.000, sekali bayar.**

**Harga peluncuran: Rp99.000, sekali bayar.**

Hak akses:

- Seluruh materi pembelajaran M00–M06.
- Seluruh 24 modul materi.
- Delapan proyek praktik dan pelacakan progresnya.
- Enam database kerja sesuai kurikulum.
- Product Research Lab.
- Content Creation Studio.
- Planner dan kalender konten.
- Performance Tracker dan eksperimen.
- Research Notes.
- Link Archive.
- Template, checklist, dan alat pendukung yang ditetapkan sebagai bagian dari produk.
- Penyimpanan progres belajar dan data kerja pribadi.
- Pembaruan materi yang termasuk dalam kebijakan produk.

Harga ini adalah pembayaran satu kali, bukan langganan. Pengguna tidak ditagih berulang secara otomatis.

### Ketentuan akses

Gunakan istilah **akses jangka panjang selama layanan tersedia**, dengan syarat, cakupan pembaruan, dan ketentuan penghentian layanan dijelaskan di halaman Terms.

Jangan menjanjikan akses seumur hidup tanpa batas jika keberlangsungan hosting, database, dan biaya operasional belum dijamin.

## 2.3 Aturan harga peluncuran

Ketetapan awal yang direkomendasikan:

- Harga reguler: Rp149.000.
- Harga peluncuran: Rp99.000.
- Batas penawaran: 100 pembeli pertama atau 14 hari sejak peluncuran, mana yang tercapai lebih dahulu.
- Setelah periode berakhir, checkout menggunakan harga reguler.
- Harga, masa promosi, dan jumlah pembeli yang memenuhi syarat harus konsisten pada landing page dan checkout.
- Jangan menggunakan hitung mundur palsu atau mengulang promosi seolah-olah selalu terbatas.

Harga peluncuran harus ditetapkan melalui konfigurasi yang dapat diubah admin tanpa mengubah kode aplikasi.

# 3. IMPLEMENTASI HAK AKSES

## 3.1 Model entitlement

Gunakan tabel `entitlements` yang sudah direncanakan pada v1.2 sebagai sumber utama status akses produk.

Entitlement setidaknya memiliki:

- `id`
- `user_id`
- `product_code`
- `access_level`
- `status`
- `granted_at`
- `expires_at`, jika masa akses digunakan
- `source_order_id`
- `revoked_at`
- `revocation_reason`
- `created_at`
- `updated_at`

Nilai yang disarankan:

- `product_code`: `affiliate_academy`
- `access_level`: `premium`
- `status`: `active`, `revoked`, atau status lain yang didefinisikan secara konsisten

Akun Free tidak perlu memperoleh entitlement premium. Hak akses Free ditentukan oleh aturan publik/preview yang ditetapkan aplikasi.

Hanya entitlement aktif yang memberikan akses premium. Jangan menganggap pengguna premium hanya karena pernah membuat pesanan atau membuka halaman checkout.

## 3.2 Fungsi pemeriksaan akses

Buat satu sumber logika pemeriksaan hak akses yang konsisten, misalnya:

- `is_authenticated()`
- `is_admin()`
- `has_active_premium_access()`
- `can_access_lesson(lesson_id)`

Nama final dapat disesuaikan dengan implementasi database, tetapi aturan akses harus konsisten antara aplikasi dan Supabase.

Semua akses materi premium harus diperiksa di database atau backend, bukan hanya disembunyikan oleh frontend.

## 3.3 Pengalaman materi terkunci

Saat pengguna Free membuka materi premium:

- Tampilkan judul dan ringkasan yang memang disetujui sebagai preview.
- Tampilkan label Premium.
- Jelaskan manfaat materi yang terkunci.
- Sediakan CTA “Upgrade ke Premium”.
- Tampilkan harga yang berlaku.
- Arahkan ke checkout yang benar.
- Jangan mengirim isi lengkap materi premium ke browser sebelum hak akses diverifikasi.

Jika akses ditolak oleh database, frontend harus menampilkan pesan yang informatif dan tidak membocorkan isi materi.

## 3.4 Pengamanan database

- Aktifkan RLS pada semua tabel yang memuat data pengguna atau materi premium.
- Pengguna hanya boleh mengakses data kerja miliknya sendiri.
- Pengguna tidak boleh mengubah status order atau entitlement menjadi aktif.
- Hak admin ditetapkan melalui prosedur admin yang aman, bukan melalui registrasi mandiri.
- Jangan menaruh service-role key atau secret di frontend.
- Uji akses langsung melalui Supabase API, bukan hanya melalui tampilan aplikasi.

# 4. IDENTITAS VISUAL FINAL

## 4.1 Konsep

**Nama gaya:** Playful Editorial Doodle System.

Karakter visual:

- Modern dan ekspresif.
- Banyak elemen doodle buatan tangan.
- Tipografi tebal dengan hierarki yang jelas.
- Layout editorial yang tidak terlalu simetris.
- Bentuk organik, panah melengkung, bintang, garis bawah, dan stiker.
- Tetap terlihat seperti produk digital profesional, bukan lembar kerja anak-anak.

## 4.2 Palet warna

| Token | Warna | Hex | Penggunaan |
| --- | --- | --- | --- |
| Paper | Cream | `#F7F4EA` | Latar utama |
| Ink | Hitam | `#171717` | Teks dan outline |
| Orange | Bright Orange | `#FF7A24` | CTA utama, doodle, highlight |
| Lime | Acid Lime | `#C6F36A` | Progres, badge, elemen positif |
| Coral | Soft Coral | `#FF9278` | Aksen sekunder |
| Surface | Putih hangat | `#FFFDF7` | Kartu dan panel |
| Muted | Abu-abu hangat | `#77736D` | Teks sekunder |

Orange adalah warna aksen yang menonjol untuk aksi utama. Lime dipakai untuk progres dan status positif. Jangan menggunakan orange dan lime pada setiap elemen sekaligus karena dapat mengurangi keterbacaan.

## 4.3 Sistem doodle

Buat satu sistem ilustrasi yang konsisten, terdiri dari:

- Panah tangan dan panah melengkung.
- Bintang dan sparkles.
- Lingkaran coretan.
- Garis bawah bergelombang.
- Garis penunjuk dan anotasi.
- Stiker “START HERE”, “LEVEL UP”, dan “NEXT MOVE”.
- Ikon sketsa untuk riset, konten, publikasi, dan analisis.
- Ilustrasi empty state.
- Elemen visual untuk achievement dan progres.

Gunakan SVG atau aset ilustrasi yang ringan agar tajam pada berbagai ukuran layar. Doodle boleh terlihat tidak sempurna, tetapi stroke, warna, dan karakter ilustrasinya harus konsisten.

Jangan menggunakan emoji sistem sebagai pengganti seluruh ikon produk. Gunakan ikon dan ilustrasi yang memiliki satu gaya visual.

## 4.4 Tipografi

Gunakan maksimal dua keluarga font:

- Font sans-serif tegas untuk judul dan navigasi.
- Font sans-serif yang mudah dibaca untuk materi, formulir, dan tabel.

Judul landing page dapat menggunakan ukuran besar dan kapitalisasi ekspresif. Isi materi tetap menggunakan ukuran nyaman dibaca dan panjang baris yang wajar.

## 4.5 Penggunaan doodle per halaman

### Landing page

Doodle dominan pada hero, headline, ilustrasi fitur, dan transisi antarseksi.

### Dashboard

Doodle sedang. Gunakan pada heading, anotasi grafik, empty state, dan kartu aksi. Statistik harus tetap menjadi fokus.

### Halaman belajar

Gunakan doodle untuk menjelaskan konsep, menandai catatan penting, dan menampilkan progres. Jangan menambahkan dekorasi pada setiap paragraf.

### Tools dan formulir

Gunakan dekorasi minimal. Formulir, tabel, dan grafik harus mengutamakan akurasi dan kemudahan penggunaan.

### Mobile

Doodle dekoratif yang mengganggu konten boleh disembunyikan pada layar kecil. CTA, navigasi, dan materi harus tetap mudah dijangkau.

# 5. LANDING PAGE DAN ALUR PENJUALAN

Halaman publik wajib memuat:

1. Hero dengan proposisi nilai yang jelas.
2. Masalah yang diselesaikan produk.
3. Cara kerja Affiliate Academy.
4. Preview materi gratis.
5. Preview tools dan proyek praktik.
6. Penjelasan paket Free dan Premium.
7. Daftar manfaat premium.
8. Harga reguler dan harga peluncuran.
9. FAQ.
10. Ketentuan akses dan pembaruan.
11. Kebijakan refund.
12. Identitas pengelola dan kontak dukungan.
13. Terms of Service dan Privacy Policy.
14. CTA ke registrasi gratis dan checkout premium.

CTA utama:

- “Mulai Gratis” untuk pengguna yang belum memiliki akun.
- “Upgrade ke Premium” untuk pengguna Free.
- “Lanjutkan Belajar” untuk pengguna yang sudah login dan memiliki akses.

Hindari klaim “pasti menghasilkan”, “dijamin cuan”, atau klaim pendapatan yang tidak memiliki bukti.

# 6. ALUR PEMBELIAN DAN AKTIVASI

## 6.1 Alur pengguna

1. Pengunjung membuka landing page.
2. Pengunjung memilih mulai gratis atau membeli Premium.
3. Jika belum memiliki akun, pengguna membuat akun.
4. Pengguna memilih harga yang berlaku.
5. Pengguna diarahkan ke checkout Lynk.id atau metode pembayaran yang telah disetujui.
6. Admin memeriksa transaksi melalui dashboard resmi penyedia.
7. Admin mencocokkan nominal, status pembayaran, referensi transaksi, dan identitas akun.
8. Admin mengaktifkan entitlement premium.
9. Sistem mencatat waktu aktivasi dan sumber pesanan.
10. Pengguna menerima konfirmasi dan dapat mengakses seluruh fitur premium.

Jangan memberikan akses premium hanya berdasarkan screenshot, redirect sukses, atau klaim pengguna.

## 6.2 Status order

Tetapkan status order yang konsisten, misalnya:

- `pending`
- `paid`
- `cancelled`
- `refunded`
- `failed`

Aktivasi hanya dilakukan setelah pembayaran terverifikasi. Order yang sama tidak boleh mengaktifkan entitlement berulang kali tanpa pemeriksaan.

Jika nantinya digunakan payment gateway dengan webhook, validasi tanda tangan webhook dan proses notifikasi secara idempoten.

## 6.3 Admin order panel

Admin harus dapat:

- Melihat daftar pesanan.
- Mencari berdasarkan ID order atau akun.
- Memeriksa nominal dan status.
- Mencatat referensi transaksi penyedia.
- Mengaktifkan akses setelah verifikasi.
- Mencatat refund atau pencabutan akses.
- Melihat riwayat perubahan.
- Mencegah aktivasi ganda.

## 6.4 Kebijakan refund

Tentukan ketentuan refund sebelum checkout tersedia. Kebijakan harus jelas, sesuai hukum yang berlaku, dan tidak menghapus hak konsumen yang diwajibkan oleh peraturan.

Jangan membuat janji refund yang tidak dapat dipenuhi oleh sistem operasional.

# 7. ONBOARDING DAN RETENSI

Setelah registrasi, pengguna tidak boleh langsung menghadapi dashboard kosong.

Onboarding Free:

1. Sambutan singkat.
2. Penjelasan cara menggunakan akademi.
3. Rekomendasi pelajaran pertama.
4. Checklist langkah awal.
5. Pengenalan fitur yang tersedia pada akun Free.

Onboarding Premium:

1. Peta belajar M00–M06.
2. Rekomendasi urutan materi.
3. Pengenalan tools inti.
4. Ajakan memulai proyek praktik pertama.
5. Penjelasan cara menyimpan progres dan data kerja.

Dashboard menampilkan satu tindakan utama yang disarankan, misalnya melanjutkan materi, menyelesaikan proyek, atau mengevaluasi eksperimen.

Jangan menambahkan notifikasi atau gamifikasi berlebihan. Pencapaian harus didasarkan pada aktivitas yang benar-benar dilakukan.

# 8. DEFINISI MVP SIAP PUBLIKASI

MVP dapat diluncurkan jika semua syarat berikut terpenuhi.

## Produk

- Semua materi yang termasuk dalam paket telah diimpor dan diperiksa.
- Materi gratis dan premium memiliki klasifikasi yang benar.
- Delapan proyek praktik memiliki halaman dan checklist.
- Enam database kerja dipetakan dengan jelas.
- Link Archive tersedia sesuai prioritas P1.
- Tools inti dapat digunakan tanpa bergantung pada AI berbayar.

## Akun dan keamanan

- Registrasi, login, logout, dan pemulihan kata sandi berfungsi.
- Pengguna Free hanya dapat membuka materi yang diizinkan.
- Pengguna Premium dapat membuka materi dan tools yang termasuk paket.
- Akses premium tidak dapat dilewati dengan mengubah URL.
- RLS diuji untuk setiap tabel pengguna.
- Pengguna tidak dapat menaikkan hak akses sendiri.
- Admin memiliki kontrol akses yang benar.

## Pembayaran

- Harga Rp149.000 dan Rp99.000 tampil konsisten.
- Aturan promosi dapat diverifikasi.
- Alur checkout diuji.
- Aktivasi manual dapat dilakukan dengan aman.
- Order dan entitlement tercatat.
- Aktivasi ganda dan pembayaran gagal ditangani.
- Refund atau pencabutan akses memiliki prosedur.

## UX dan desain

- Landing page responsif.
- Dashboard responsif.
- Navigasi mobile dapat digunakan.
- Warna dan komponen mengikuti design system.
- Doodle tidak mengganggu keterbacaan.
- Formulir memiliki validasi dan pesan error.
- Loading, empty state, dan error state tersedia.

## Operasional

- Terms dan Privacy Policy tersedia.
- Ketentuan akses dan pembaruan ditulis dengan jelas.
- Kanal dukungan berfungsi.
- Backup dan pemulihan database dipertimbangkan.
- Domain, HTTPS, dan environment production telah diperiksa.
- Tidak ada secret dalam bundle frontend.
- Situs publik lama tidak lagi membocorkan seluruh materi premium.

# 9. ROADMAP IMPLEMENTASI

## Fase 1 — Product Foundation

- Integrasikan model Free dan Premium ke master.
- Tetapkan hak akses per materi dan tools.
- Tetapkan kebijakan harga peluncuran.
- Tetapkan ketentuan akses, pembaruan, dan refund.
- Selesaikan audit konten publik lama.

**Gate:** keputusan produk dan akses sudah konsisten.

## Fase 2 — Authentication dan Database

- Implementasikan Supabase Auth.
- Finalisasi tabel `entitlements` dan `orders`.
- Implementasikan RLS.
- Implementasikan pemeriksaan akses premium.
- Implementasikan admin bootstrap yang aman.
- Uji akses pengguna Free, Premium, dan Admin.

**Gate:** hak akses dapat dibuktikan melalui pengujian database.

## Fase 3 — Design System

- Implementasikan token warna.
- Tetapkan tipografi dan spacing.
- Buat komponen tombol, kartu, badge, input, dan modal.
- Buat library doodle SVG.
- Buat komponen locked lesson dan upgrade CTA.
- Uji tampilan desktop dan mobile.

**Gate:** halaman utama dan komponen dasar memiliki visual konsisten.

## Fase 4 — Learning dan Tools

- Migrasikan materi.
- Implementasikan progres belajar.
- Implementasikan Product Research Lab.
- Implementasikan Content Creation Studio.
- Implementasikan Planner.
- Implementasikan Performance Tracker.
- Implementasikan Research Notes.
- Implementasikan Link Archive.
- Implementasikan delapan proyek praktik dan enam database kerja.

**Gate:** pengguna dapat menyelesaikan alur belajar dan praktik utama.

## Fase 5 — Pricing dan Checkout

- Implementasikan halaman harga.
- Integrasikan alur checkout.
- Implementasikan order panel admin.
- Implementasikan verifikasi dan aktivasi manual.
- Uji pembayaran sukses, gagal, duplikat, dan refund.
- Pastikan harga promosi konsisten.

**Gate:** pembelian uji menghasilkan akses yang benar.

## Fase 6 — Launch Readiness

- Uji seluruh route.
- Uji RLS dan bypass akses.
- Uji responsivitas dan aksesibilitas dasar.
- Uji loading dan error state.
- Periksa kebijakan layanan.
- Periksa performa halaman.
- Periksa domain dan HTTPS.
- Jalankan soft launch dengan kelompok kecil.
- Perbaiki temuan kritis sebelum peluncuran publik.

**Gate:** tidak ada masalah kritis terkait akses, pembayaran, keamanan, atau alur utama.

# 10. METRIK EVALUASI PELUNCURAN

Catat metrik yang benar-benar tersedia:

- Jumlah pendaftar Free.
- Jumlah pengguna yang memulai materi pertama.
- Persentase pengguna yang menyelesaikan materi awal.
- Jumlah pengguna Free yang mengunjungi halaman Premium.
- Jumlah checkout yang dimulai.
- Jumlah pembelian berhasil.
- Rasio konversi Free ke Premium.
- Jumlah pengguna Premium yang memulai proyek praktik.
- Penggunaan tools inti.
- Permintaan dukungan dan refund.

Pisahkan data terukur dari estimasi. Jangan mengklaim konversi atau pendapatan tertentu sebelum tersedia data nyata.

# 11. KRITERIA PENERIMAAN AKHIR

Affiliate Academy v1.3 dinyatakan siap dipublikasikan jika:

1. Pengguna dapat mendaftar dan mencoba materi gratis.
2. Pengguna dapat membeli Premium dengan harga yang benar.
3. Admin dapat memverifikasi pembayaran dan memberikan akses.
4. Materi premium terlindungi oleh kontrol akses database.
5. Seluruh fitur yang dijanjikan di halaman penjualan benar-benar tersedia.
6. Pengguna dapat menggunakan produk melalui desktop dan ponsel.
7. Kebijakan layanan dan kanal dukungan tersedia.
8. Tidak ada kebocoran materi premium melalui situs statis publik.
9. Seluruh alur utama lulus pengujian.
10. Soft launch tidak menemukan masalah kritis yang belum ditangani.

**Prinsip akhir:** jangan meluncurkan berdasarkan banyaknya fitur atau bagusnya tampilan saja. Luncurkan ketika janji penjualan, hak akses, materi, pembayaran, dan pengalaman pengguna benar-benar sesuai dengan produk yang diterima pelanggan.