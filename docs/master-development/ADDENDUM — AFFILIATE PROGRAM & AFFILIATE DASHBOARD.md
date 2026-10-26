# ADDENDUM — AFFILIATE PROGRAM & AFFILIATE DASHBOARD

**Shopee Affiliate Academy — Development Specification v1.5**

## 1. Tujuan dan Prinsip Fitur

Shopee Affiliate Academy menyediakan program affiliate internal yang memungkinkan pengguna mempromosikan produk Shopee Affiliate Academy melalui link referral atau kode affiliate unik, kemudian memperoleh komisi dari transaksi valid yang dihasilkan.

Program ini tersedia bagi pengguna Free dan Premium. Status Free atau Premium menentukan akses terhadap materi pembelajaran, bukan kelayakan untuk menjadi affiliate.

Prinsip implementasi:

- Pengguna Free dan Premium sama-sama dapat mendaftar sebagai affiliate.
- Tidak ada biaya pendaftaran affiliate.
- Komisi standar sebesar 10% dari nilai produk setelah diskon yang benar-benar dibayar pelanggan.
- Pembayaran komisi hanya berlaku untuk transaksi valid dan terverifikasi.
- Tidak memerlukan AI API atau layanan berlangganan tambahan untuk menjalankan fungsi inti.
- Admin memiliki kendali atas persetujuan, komisi, pembatalan, dan pencairan.
- Sistem harus transparan mengenai klik, konversi, status komisi, dan pembayaran.
- Affiliate tidak boleh memperoleh komisi dari transaksi sendiri.

## 2. Hak Akses Affiliate

### 2.1 Pengguna Free

Pengguna Free dapat:

- Mengaktifkan akun affiliate tanpa harus membeli Premium.
- Memiliki kode referral unik.
- Membuat dan menyalin link referral.
- Mengunduh atau menyalin materi promosi yang disediakan.
- Melihat statistik klik dan penjualan yang diatribusikan kepadanya.
- Melihat estimasi komisi, komisi tertunda, komisi disetujui, dan komisi yang telah dibayar.
- Mengajukan pencairan komisi sesuai ketentuan.
- Mengakses riwayat transaksi referral dan riwayat pencairan miliknya.

### 2.2 Pengguna Premium

Pengguna Premium memperoleh seluruh kemampuan affiliate yang sama dengan pengguna Free.

Status Premium tidak memberikan persentase komisi yang lebih tinggi secara otomatis. Persentase komisi hanya dapat diubah melalui kebijakan program resmi yang ditetapkan admin.

### 2.3 Pengguna yang Belum Login

Pengunjung yang belum memiliki akun boleh mengeklik link affiliate dan melihat halaman penjualan. Namun, untuk mengaktifkan dashboard affiliate, menerima komisi, dan mengajukan pencairan, pengguna harus membuat akun dan memenuhi persyaratan verifikasi yang ditentukan.

## 3. Menu Affiliate pada Aplikasi

Tambahkan menu navigasi utama bernama **Affiliate**.

Menu tersebut memiliki halaman:

1. Dashboard Affiliate
2. Link Referral
3. Materi Promosi
4. Penjualan dan Komisi
5. Pencairan Komisi
6. Riwayat Transaksi
7. Panduan dan Ketentuan Affiliate

Menu Affiliate ditampilkan untuk pengguna Free dan Premium.

Jika pengguna belum mengaktifkan program affiliate, tampilkan tombol “Mulai Menjadi Affiliate”. Setelah aktivasi berhasil, tampilkan dashboard affiliate.

## 4. Dashboard Affiliate

Dashboard menjadi pusat aktivitas affiliate dan wajib menampilkan informasi yang dapat ditindaklanjuti.

### 4.1 Ringkasan Statistik

Tampilkan kartu statistik berikut:

- Total klik referral.
- Total pesanan yang teratribusi.
- Total pesanan valid.
- Tingkat konversi.
- Komisi tertunda.
- Komisi disetujui.
- Komisi tersedia untuk dicairkan.
- Total komisi yang sudah dibayarkan.

Definisi:

- Klik referral: kunjungan yang tercatat dan lolos validasi dasar.
- Pesanan teratribusi: pesanan yang dikaitkan dengan kode affiliate.
- Pesanan valid: pembayaran terkonfirmasi dan tidak dibatalkan atau dikembalikan.
- Tingkat konversi: pesanan valid dibagi klik referral valid, ditampilkan sebagai persentase.
- Komisi tertunda: komisi yang menunggu masa validasi atau pemeriksaan.
- Komisi disetujui: komisi yang sudah memenuhi persyaratan tetapi belum dibayar.
- Komisi tersedia: saldo komisi yang disetujui dan belum masuk ke pencairan yang sedang diproses.
- Komisi dibayarkan: jumlah pencairan yang sudah ditandai berhasil dan diverifikasi admin.

Jangan menghitung pesanan yang sama lebih dari sekali. Pembaruan status pesanan tidak boleh membuat komisi ganda.

### 4.2 Grafik Performa

Sediakan grafik sederhana:

- Klik referral per hari.
- Pesanan valid per hari.
- Komisi per periode.

Sediakan filter rentang tanggal: 7 hari, 30 hari, bulan ini, dan seluruh waktu.

Jika belum ada data, tampilkan empty state dengan petunjuk membagikan link referral.

### 4.3 Link Referral Utama

Dashboard harus menampilkan:

- Kode affiliate.
- Link referral utama.
- Tombol salin link.
- Tombol salin kode.
- Status affiliate.
- Petunjuk cara membagikan link.

Contoh:

`https://domain-aplikasi.com/?ref=KODEAFFILIATE`

Domain contoh wajib diganti dengan domain produksi yang benar saat implementasi.

Affiliate tidak boleh dapat mengganti kode affiliate pengguna lain atau membuat kode yang sudah dipakai.

## 5. Sistem Link dan Kode Referral

### 5.1 Kode Affiliate

Setiap affiliate memiliki kode unik, tidak peka huruf besar-kecil, dan tidak dapat digunakan oleh dua akun berbeda.

Kode harus divalidasi oleh server. Jangan mempercayai nilai kode atau identitas affiliate yang dikirim browser tanpa validasi.

### 5.2 Link Referral

Link referral harus:

- Membuka landing page atau halaman penjualan yang relevan.
- Mempertahankan informasi referral selama masa atribusi.
- Tetap berfungsi ketika pengunjung berpindah dari landing page ke halaman checkout.
- Tidak memberikan akses premium secara otomatis.
- Tidak mengubah harga atau status pembayaran tanpa otorisasi server.

Sediakan tombol salin dan notifikasi berhasil menyalin link.

### 5.3 Masa Atribusi

Gunakan masa atribusi standar selama 30 hari sejak klik referral yang memenuhi syarat.

Rekomendasi kebijakan awal adalah first-click attribution: affiliate pertama yang valid menjadi sumber atribusi selama periode tersebut. Setelah atribusi dikunci pada akun, kode lain tidak boleh menggantinya secara diam-diam.

Kode referral manual dapat dimasukkan sebelum atribusi terkunci. Sistem harus menampilkan affiliate yang akan dikaitkan dan meminta konfirmasi pengguna.

Jika pengguna sudah memiliki atribusi terkunci, kode baru ditolak atau diteruskan ke proses bantuan admin sesuai ketentuan.

### 5.4 Atribusi Pengguna

Saat pengunjung login atau mendaftar, sistem menghubungkan atribusi referral ke ID pengguna yang terautentikasi.

Atribusi akun disimpan di database dan menjadi sumber utama perhitungan komisi. Cookie hanya digunakan untuk membantu mempertahankan referral sebelum identitas pengguna diketahui.

Jika cookie hilang sebelum referral berhasil dihubungkan ke akun, sistem tidak boleh mengklaim atribusi secara pasti.

### 5.5 Penggunaan Kode Manual

Sediakan kolom “Punya kode referral?” pada pendaftaran atau checkout, dengan ketentuan:

- Kode harus valid dan aktif.
- Pengguna melihat identitas atau kode affiliate yang akan dikaitkan sebelum konfirmasi.
- Kode tidak boleh menunjuk ke akun pengguna sendiri.
- Kode tidak boleh mengubah atribusi yang sudah terkunci.
- Semua perubahan atribusi harus tercatat dalam audit log jika dilakukan admin.

## 6. Perhitungan Komisi

Komisi standar: **10% dari harga produk setelah diskon yang dibayar pelanggan, sebelum biaya payment gateway**.

Rumus:

Komisi = nilai produk setelah diskon × 10%.

Contoh:

- Harga Rp99.000: komisi Rp9.900.
- Harga Rp149.000: komisi Rp14.900.

Jika ada diskon, komisi dihitung dari nilai produk setelah diskon. Biaya transaksi gateway, pajak, atau komponen lain tidak dimasukkan ke dasar komisi kecuali kebijakan resmi menyatakan lain.

Komisi hanya dibuat ketika:

1. Pesanan terhubung ke affiliate yang valid.
2. Pembayaran terkonfirmasi melalui notifikasi server yang diverifikasi.
3. Pesanan belum pernah menghasilkan catatan komisi untuk perhitungan yang sama.
4. Transaksi tidak termasuk pembelian sendiri atau transaksi yang melanggar ketentuan.

Gunakan ID pesanan dan constraint database untuk mencegah komisi ganda.

## 7. Status Komisi dan Refund

Gunakan status berikut:

- `pending`: pembayaran terkonfirmasi, komisi menunggu validasi.
- `approved`: komisi disetujui dan menjadi hak affiliate.
- `processing`: komisi telah dialokasikan untuk pencairan yang sedang diproses.
- `paid`: pencairan berhasil diverifikasi.
- `rejected`: komisi ditolak berdasarkan alasan yang tercatat.
- `reversed`: komisi dibatalkan karena refund, chargeback, fraud, atau koreksi yang sah.

Masa validasi awal yang direkomendasikan adalah 14 hari setelah pembayaran, dengan kemungkinan penyesuaian sesuai kebijakan refund produk.

Jika transaksi di-refund sebelum komisi disetujui, komisi dibatalkan. Jika refund atau chargeback terjadi setelah persetujuan, sistem membuat koreksi yang dapat diaudit dan tidak menghapus sejarah transaksi.

Jangan mengurangi saldo affiliate secara diam-diam. Semua koreksi harus memiliki alasan dan referensi transaksi.

## 8. Pencairan Komisi

### 8.1 Ketentuan

- Ambang minimum pencairan awal: Rp50.000.
- Pencairan dilakukan secara bulanan atau sesuai jadwal resmi yang diumumkan.
- Affiliate wajib mengisi data penerima yang diperlukan.
- Nama penerima dan rekening harus diperiksa sesuai prosedur operasional.
- Affiliate dapat melihat status pengajuan.
- Admin dapat menyetujui, menolak, atau menandai pembayaran berhasil setelah bukti transfer diverifikasi.

### 8.2 Status Pencairan

Gunakan status:

- `requested`
- `under_review`
- `approved`
- `processing`
- `paid`
- `rejected`
- `cancelled`

Saldo yang sedang berada dalam permintaan pencairan aktif tidak boleh diajukan kembali untuk pencairan lain.

Untuk tahap awal, pembayaran komisi boleh dilakukan manual oleh admin. Integrasi payout API bukan persyaratan peluncuran fitur ini.

Jangan pernah menampilkan pencairan sebagai berhasil sebelum pembayaran benar-benar dilakukan dan diverifikasi.

### 8.3 Data Pencairan

Simpan hanya data yang diperlukan untuk proses pembayaran. Lindungi data rekening, batasi akses admin sesuai kebutuhan, dan jangan pernah menampilkan data sensitif secara lengkap di dashboard publik atau log yang dapat diakses pengguna lain.

## 9. Materi Promosi

Sediakan halaman Materi Promosi yang dapat digunakan pengguna Free dan Premium.

Materi yang didukung:

- Ringkasan manfaat produk.
- Gambar atau banner promosi.
- Contoh caption media sosial.
- Contoh pesan WhatsApp.
- FAQ produk.
- Panduan penggunaan link dan kode referral.
- Ketentuan program affiliate.

Admin dapat menambah, mengedit, menerbitkan, dan menonaktifkan materi promosi.

Materi harus akurat dan tidak boleh menjanjikan pendapatan, hasil finansial, atau manfaat yang tidak dijamin oleh produk.

Jika affiliate mempromosikan produk melalui konten publik, sediakan panduan pengungkapan bahwa konten tersebut menggunakan link affiliate atau berpotensi menghasilkan komisi.

## 10. Riwayat Transaksi Affiliate

Tampilkan tabel dengan kolom:

- Tanggal pesanan.
- ID pesanan yang disamarkan bila diperlukan.
- Produk.
- Nilai pesanan yang menjadi dasar komisi.
- Komisi.
- Status komisi.
- Tanggal persetujuan atau pembatalan.
- Alasan pembatalan jika tersedia.

Affiliate hanya boleh melihat transaksi yang diatribusikan kepadanya. Jangan tampilkan nama lengkap, email, nomor telepon, alamat, atau informasi pribadi pembeli yang tidak diperlukan.

Sediakan filter tanggal dan status serta tampilan yang responsif untuk perangkat mobile.

## 11. Dashboard Admin Affiliate

Tambahkan halaman Admin Affiliate yang hanya dapat diakses oleh role admin terverifikasi.

Admin dapat:

- Melihat dan mencari akun affiliate.
- Melihat status affiliate dan statistik performanya.
- Menonaktifkan affiliate yang melanggar kebijakan.
- Melihat klik, pesanan, komisi, refund, dan pencairan.
- Memeriksa permintaan pencairan.
- Menyetujui atau menolak komisi dengan alasan.
- Menyetujui atau menolak permintaan pencairan.
- Mencatat bukti pembayaran dan referensi transfer.
- Menangani sengketa atribusi.
- Mengelola materi promosi.
- Mengatur persentase komisi untuk kebijakan mendatang.
- Mengatur masa atribusi dan masa validasi komisi.
- Melihat audit log perubahan.

Perubahan persentase komisi hanya berlaku untuk transaksi yang memenuhi aturan periode efektif. Perubahan tidak boleh diam-diam mengubah komisi transaksi lama yang sudah disetujui.

Admin tidak boleh mengubah status pembayaran Midtrans hanya dengan mengedit form biasa. Status pembayaran tetap harus berasal dari proses verifikasi transaksi yang sah.

## 12. Database dan Integrasi

Gunakan Supabase Postgres sebagai sumber data utama dan integrasikan fitur dengan tabel pengguna serta pesanan yang sudah ada.

Tabel yang direkomendasikan:

### `affiliate_profiles`

Kolom minimum:

- `id`
- `user_id`
- `affiliate_code`
- `status`
- `joined_at`
- `created_at`
- `updated_at`

### `affiliate_clicks`

Kolom minimum:

- `id`
- `affiliate_id`
- `clicked_at`
- `landing_path`
- `anonymous_session_id` yang tidak berisi data pribadi langsung
- `is_valid`
- `created_at`

### `affiliate_attributions`

Kolom minimum:

- `id`
- `user_id`
- `affiliate_id`
- `attribution_type`
- `attributed_at`
- `expires_at`
- `locked_at`
- `created_at`

### `affiliate_commissions`

Kolom minimum:

- `id`
- `affiliate_id`
- `order_id`
- `commission_base_amount`
- `commission_rate`
- `commission_amount`
- `status`
- `approved_at`
- `paid_at`
- `reversal_reason`
- `created_at`
- `updated_at`

### `affiliate_payout_requests`

Kolom minimum:

- `id`
- `affiliate_id`
- `amount`
- `status`
- `payment_reference`
- `requested_at`
- `reviewed_at`
- `paid_at`
- `rejection_reason`
- `created_at`
- `updated_at`

### `affiliate_payout_items`

Tabel penghubung untuk menentukan komisi mana yang dimasukkan ke pencairan tertentu. Setiap komisi hanya boleh dialokasikan ke pencairan aktif satu kali.

### `affiliate_promo_assets`

Kolom minimum:

- `id`
- `title`
- `asset_type`
- `content`
- `asset_url`
- `status`
- `created_by`
- `created_at`
- `updated_at`

### `affiliate_settings`

Menyimpan konfigurasi aktif seperti persentase komisi, masa atribusi, masa validasi, ambang pencairan, dan jadwal pencairan. Perubahan pengaturan wajib tercatat di audit log dan memiliki tanggal efektif jika memengaruhi komisi.

Sesuaikan nama kolom, tipe data, constraint, foreign key, dan migrasi dengan skema Master Development yang sudah ada. Jangan membuat tabel duplikat untuk fungsi yang telah tersedia.

## 13. Integrasi dengan `orders` dan Midtrans

- Setiap order memiliki ID internal yang unik.
- Order mencatat referensi affiliate yang valid pada saat transaksi dibuat.
- Browser tidak berwenang menentukan status pembayaran.
- Server memverifikasi notifikasi pembayaran Midtrans sebelum mengubah status order.
- Komisi dibuat melalui proses backend yang idempoten setelah pembayaran terkonfirmasi.
- Notifikasi pembayaran berulang tidak boleh membuat order, entitlement, atau komisi ganda.
- Refund atau chargeback harus memicu pemeriksaan ulang status komisi.
- Pemberian akses Premium tetap mengikuti alur entitlement yang terpisah dari komisi affiliate.

Jangan menyimpan data kartu pembayaran atau rahasia API di browser. Kunci rahasia Midtrans hanya boleh berada di lingkungan server yang terlindungi.

## 14. Keamanan dan Privasi

- Gunakan Supabase Auth untuk identitas pengguna.
- Terapkan Row Level Security (RLS) untuk semua tabel yang mengandung data pengguna, transaksi, komisi, atau rekening.
- Affiliate hanya dapat membaca data affiliate miliknya.
- Affiliate tidak dapat membuat atau menyetujui komisi sendiri.
- Affiliate tidak dapat mengubah status pencairan menjadi `paid`.
- Hanya proses backend terotorisasi yang dapat membuat komisi berdasarkan pembayaran terverifikasi.
- Admin harus diverifikasi melalui role yang dikelola server; jangan mempercayai flag admin dari browser.
- Catat perubahan status, nilai komisi, atribusi, dan pencairan di audit log.
- Gunakan validasi input, rate limiting, dan deteksi aktivitas referral yang tidak wajar.
- Jangan menganggap setiap klik sebagai pengunjung unik atau menjamin semua klik bebas fraud.
- Terapkan pemberitahuan privasi dan ketentuan program affiliate.

## 15. Anti-Fraud dan Sengketa

Sistem harus mendeteksi atau memungkinkan admin memeriksa:

- Pembelian menggunakan referral sendiri.
- Klik atau pesanan yang tidak wajar.
- Order berulang atau duplikat.
- Refund atau chargeback.
- Perubahan atribusi yang tidak sah.
- Percobaan manipulasi status pembayaran.
- Penyalahgunaan identitas atau rekening pencairan.

Deteksi otomatis awal boleh berbasis aturan sederhana. Sistem tidak perlu menggunakan AI untuk fitur ini.

Jangan memblokir affiliate secara permanen hanya berdasarkan satu sinyal yang belum terverifikasi. Sediakan pemeriksaan admin dan alasan keputusan yang tercatat.

## 16. UI/UX

Ikuti sistem desain Shopee Affiliate Academy yang sudah ditetapkan:

- Background paper cream `#F7F4EA`.
- Teks ink black `#171717`.
- CTA orange `#FF7A24`.
- Aksen lime `#C6F36A`.
- Coral `#FF9278`.
- Komponen responsif untuk desktop dan mobile.
- Tabel transaksi dengan empty state, loading state, error state, dan pagination bila dibutuhkan.
- Tombol salin link dan kode yang mudah ditemukan.
- Status komisi dan pencairan harus memiliki label teks yang jelas, bukan hanya warna.

Jangan menambah animasi, gamifikasi, atau grafik kompleks yang tidak diperlukan untuk memahami performa affiliate.

## 17. Batas Scope

Termasuk dalam scope:

- Aktivasi affiliate untuk Free dan Premium.
- Kode dan link referral.
- Pencatatan klik.
- Atribusi pengguna.
- Dashboard performa.
- Pencatatan komisi.
- Riwayat transaksi.
- Permintaan pencairan.
- Persetujuan admin.
- Materi promosi.
- Pengaturan program affiliate.
- Audit log dan keamanan.
- Integrasi dengan order dan pembayaran.

Tidak wajib untuk peluncuran awal:

- Payout otomatis melalui API.
- Komisi bertingkat atau multi-level.
- Program referral untuk mengajak affiliate lain.
- AI untuk membuat materi promosi.
- Skema bonus dinamis berdasarkan target.
- Pelacakan lintas perangkat yang mengandalkan fingerprinting.
- Aplikasi mobile terpisah.
- Gamifikasi atau leaderboard kompleks.

## 18. Acceptance Criteria

Fitur dianggap selesai jika:

1. Pengguna Free dan Premium dapat mengaktifkan affiliate tanpa membeli Premium.
2. Setiap affiliate memperoleh kode unik.
3. Link referral dapat dicatat dan dipertahankan sesuai aturan atribusi.
4. Pengguna dapat memasukkan kode referral manual jika belum memiliki atribusi terkunci.
5. Atribusi dapat dihubungkan dengan akun pengguna secara konsisten.
6. Pembayaran terkonfirmasi menghasilkan komisi yang tepat satu kali.
7. Refund dan pembatalan ditangani sesuai aturan.
8. Affiliate hanya melihat statistik dan transaksi miliknya.
9. Saldo komisi tidak dapat dicairkan dua kali.
10. Admin dapat meninjau komisi dan mencatat pembayaran.
11. Materi promosi dapat dikelola dan digunakan affiliate.
12. Seluruh perubahan sensitif tercatat dalam audit log.
13. RLS dan pemeriksaan server mencegah akses silang antar pengguna.
14. Status pembayaran dan pencairan tidak dapat dimanipulasi melalui browser.
15. Dashboard berfungsi di desktop dan mobile.
16. Seluruh alur diuji dengan transaksi sukses, pembayaran gagal, notifikasi duplikat, refund, atribusi yang kedaluwarsa, kode tidak valid, dan percobaan pembelian sendiri.

## 19. Urutan Implementasi

1. Audit skema `profiles`, `orders`, `entitlements`, dan `admin_audit_logs`.
2. Implementasikan database, constraint, RLS, dan proses backend.
3. Implementasikan kode referral, cookie, dan atribusi akun.
4. Implementasikan integrasi order dan komisi.
5. Implementasikan dashboard affiliate dan riwayat transaksi.
6. Implementasikan permintaan pencairan dan dashboard admin.
7. Implementasikan materi promosi dan pengaturan program.
8. Lakukan pengujian keamanan, pembayaran, refund, dan anti-duplikasi.
9. Uji alur end-to-end sebelum mengaktifkan program secara publik.

Urutan ini merupakan tahapan implementasi menuju fitur lengkap, bukan pengurangan spesifikasi menjadi MVP.

## 20. Definisi Selesai

Program Affiliate Shopee Affiliate Academy dinyatakan siap produksi ketika pengguna Free dan Premium dapat mempromosikan kelas, referral tercatat secara benar, transaksi terverifikasi menghasilkan komisi yang akurat, pencairan dapat diaudit, dan tidak ada celah bagi pengguna untuk memanipulasi atribusi, saldo, atau status pembayaran.

Semua perubahan harus tetap konsisten dengan Master Development utama, skema database yang sudah ada, ketentuan produk, dan kebijakan pembayaran yang diumumkan kepada pengguna.