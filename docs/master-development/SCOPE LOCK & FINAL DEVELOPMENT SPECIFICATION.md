# SCOPE LOCK & FINAL DEVELOPMENT SPECIFICATION

## Shopee Affiliate Academy

**Versi:** 1.4 — Final Product Scope

**Model bisnis:** Sekali bayar

**Harga reguler:** Rp149.000

**Harga peluncuran:** Rp99.000

**Target:** Produk lengkap, terintegrasi, aman, dan siap dipasarkan.

---

## 1. TUJUAN PENGEMBANGAN

Mengembangkan Shopee Affiliate Academy menjadi platform pembelajaran sekaligus workspace praktis untuk membantu pengguna menjalankan proses Shopee Affiliate dari belajar, riset produk, perencanaan konten, publikasi, hingga evaluasi performa.

Pengembangan berfokus pada penyelesaian fitur inti yang sudah direncanakan. Fitur baru tidak boleh ditambahkan tanpa kebutuhan pengguna yang jelas atau persyaratan penting untuk keamanan, operasional, dan kelayakan peluncuran.

## 2. MODEL PRODUK DAN HARGA

### Akun Free — Rp0

- Registrasi dan login.
- Akses materi pengenalan yang ditetapkan untuk Free.
- Preview materi Premium.
- Dashboard dan progres pembelajaran dasar.
- Contoh terbatas penggunaan tools.
- Akses ke halaman upgrade Premium.

Batas akses harus ditetapkan secara eksplisit pada materi dan data, bukan sekadar menyembunyikan menu.

### Akun Premium — Sekali bayar

- Harga reguler Rp149.000.
- Harga peluncuran Rp99.000 sesuai periode atau kuota promosi yang diumumkan.
- Akses ke seluruh materi dan fitur Premium yang tercantum dalam produk.
- Akses ke proyek praktik, template, dan enam workspace kerja.
- Penyimpanan progres belajar serta data kerja pengguna.

Hak akses dan cakupan pembaruan harus dijelaskan sebelum pembelian. Jangan menyebut akses seumur hidup atau pembaruan tanpa batas jika belum dapat dijamin secara operasional.

## 3. RUANG LINGKUP FITUR FINAL

### A. Sistem pembelajaran

1. Kurikulum lengkap sesuai master development.
2. Struktur level, modul, pelajaran, dan materi.
3. Navigasi materi serta penanda progres.
4. Proyek praktik yang terkait dengan pembelajaran.
5. Template dan checklist yang dapat digunakan.
6. Dashboard yang menunjukkan progres dan materi berikutnya.

**Kriteria selesai:** semua materi yang dijanjikan tersedia, dapat diakses sesuai hak pengguna, dan tidak ada halaman pelajaran kosong atau placeholder.

### B. Enam workspace kerja

**1. Product Research**

Mencatat produk, harga, komisi yang diketahui, rating, tautan sumber, target audiens, dan catatan evaluasi. Skor penilaian harus menggunakan kriteria yang transparan.

**2. Content Planner**

Mencatat ide konten, jadwal, platform, status pengerjaan, serta produk yang dipromosikan.

**3. Content Library**

Menyimpan hook, script, caption, brief, checklist produksi, dan tautan konten yang telah diterbitkan.

**4. Performance Tracker**

Mencatat metrik performa yang diinput pengguna, seperti tayangan, klik, pesanan, dan komisi, beserta tanggal dan sumber data.

**5. Experiment Tracker**

Mencatat hipotesis, variabel yang diuji, periode, hasil, dan keputusan berikutnya.

**6. Link Archive**

Menyimpan tautan affiliate, produk terkait, platform, status pemeriksaan, dan tanggal pembaruan.

**Persyaratan integrasi:** produk yang dicatat di Product Research harus dapat dipilih di Content Planner dan Content Library. Konten dapat dihubungkan ke tautan affiliate dan catatan performa. Experiment Tracker harus dapat merujuk pada konten atau periode performa yang relevan.

Enam workspace tidak harus menjadi enam tabel database terpisah. Struktur database ditentukan berdasarkan relasi data dan kebutuhan keamanan.

### C. Tools berbasis aturan

Pertahankan tools yang sudah tercantum dalam master, selama dapat berjalan tanpa layanan berbayar yang tidak diperlukan.

- Perhitungan dan penilaian berbasis input pengguna.
- Generator konten berbasis template.
- Checklist dan panduan produksi.
- Pencatatan serta evaluasi performa.
- Pengelolaan tautan dan catatan riset.

Tools harus memiliki validasi input, penyimpanan jika diperlukan, penanganan error, dan petunjuk penggunaan.

### D. Administrasi

Admin harus dapat:

- Mengelola modul, pelajaran, dan materi.
- Mengelola pengguna serta hak akses.
- Memverifikasi pembayaran.
- Mengaktifkan dan mencabut akses Premium.
- Melihat status order dan riwayat tindakan administratif.
- Memperbarui pengumuman dan informasi produk.

Akun pengguna tidak boleh dapat menaikkan hak akses sendiri. Perubahan status order dan entitlement hanya boleh dilakukan melalui proses tepercaya.

## 4. FITUR YANG TIDAK MENJADI SYARAT PELUNCURAN

Fitur berikut tidak ditambahkan sebagai pekerjaan baru dalam ruang lingkup final, kecuali master yang sudah ada secara eksplisit mewajibkannya:

- AI Assistant yang menggunakan API berbayar.
- Sinkronisasi otomatis dengan platform eksternal.
- Prediksi pendapatan, produk viral, atau hasil penjualan.
- Otomatisasi publikasi konten.
- Analitik lintas platform yang memerlukan integrasi khusus.
- Gamifikasi kompleks, leaderboard, dan sistem poin.
- Aplikasi mobile native terpisah.

Fitur yang sudah tercantum dan telah disepakati di master tidak boleh dihapus hanya karena tercantum dalam daftar ini. Daftar ini mencegah penambahan lingkup baru, bukan membatalkan keputusan terdahulu.

## 5. ARSITEKTUR DAN KEAMANAN

Pertahankan stack yang telah direncanakan:

- Frontend: React, TypeScript, dan Vite.
- UI: Tailwind CSS serta komponen UI yang sudah digunakan.
- Backend dan database: Supabase Auth dan PostgreSQL.
- Otorisasi: Row Level Security (RLS) dan pemeriksaan hak akses.
- Hosting frontend: Cloudflare Pages.
- Pembayaran: proses manual terverifikasi terlebih dahulu jika itu yang ditetapkan dalam master.

Persyaratan keamanan:

1. Materi Premium tidak boleh disimpan dalam aset publik yang dapat diakses tanpa otorisasi.
2. RLS harus membatasi akses data antar pengguna.
3. Hak akses Premium ditentukan dari entitlement yang sah.
4. Secret dan service-role key tidak boleh dimasukkan ke frontend.
5. Proses aktivasi pembayaran harus dapat diaudit dan tidak boleh memberikan akses hanya berdasarkan screenshot atau parameter dari pengguna.
6. Backup, prosedur pemulihan, dan migrasi database harus didokumentasikan.
7. Lingkungan pengembangan dan produksi harus dipisahkan dengan konfigurasi yang sesuai.

## 6. DESAIN DAN PENGALAMAN PENGGUNA

Pertahankan arah visual yang sudah disepakati: playful editorial, doodle buatan tangan, dan tampilan SaaS modern dengan aksen oranye.

Desain harus mendukung keterbacaan dan penggunaan, bukan sekadar dekorasi.

- Responsif pada desktop dan perangkat seluler.
- Navigasi konsisten.
- Formulir dengan validasi yang jelas.
- Loading, empty state, success state, dan error state.
- Dashboard yang menonjolkan tugas dan progres berikutnya.
- Halaman harga dengan perbedaan Free dan Premium yang jelas.
- Alur onboarding yang membantu pengguna menyelesaikan langkah pertama.

## 7. PEMBAYARAN DAN HAK AKSES

Alur pembelian harus mencakup:

1. Pengguna memilih paket Premium.
2. Sistem membuat order dengan ID unik.
3. Pengguna mengikuti instruksi pembayaran.
4. Admin memverifikasi pembayaran melalui sumber resmi.
5. Sistem memberikan entitlement Premium.
6. Pengguna menerima konfirmasi dan dapat mengakses materi.
7. Setiap aktivasi, pencabutan, dan perubahan status tercatat.

Sediakan prosedur untuk pembayaran yang belum cocok, pembayaran ganda, pembatalan, refund, dan koreksi kesalahan admin.

Ketentuan harga, refund, akses, dan pembaruan harus disampaikan dengan jelas sebelum transaksi.

## 8. KONTEN DAN PEMBARUAN

Seluruh materi yang dijanjikan harus diperiksa sebelum peluncuran. Materi yang membahas aturan Shopee, komisi, atau kebijakan platform harus mencantumkan sumber dan tanggal pemeriksaan.

Hindari klaim pendapatan yang dijamin. Gunakan contoh yang dapat diverifikasi dan jelaskan bahwa hasil pengguna dapat berbeda.

## 9. ACCEPTANCE CRITERIA PRODUK FINAL

Produk baru dapat dinyatakan siap dipasarkan setelah:

- Semua materi dan proyek yang dijanjikan lengkap.
- Semua fitur inti berfungsi sesuai spesifikasi.
- Enam workspace terintegrasi dengan benar.
- Registrasi, login, pemulihan kata sandi, dan hak akses teruji.
- Pembayaran dan aktivasi Premium dapat diverifikasi serta diaudit.
- Pengguna Free tidak dapat mengakses materi atau data Premium secara tidak sah.
- Data pengguna tidak dapat dibaca atau diubah pengguna lain.
- Semua formulir, navigasi, dan aksi utama berfungsi.
- Tampilan responsif dan dapat digunakan pada perangkat yang ditargetkan.
- Tidak ada placeholder, tombol mati, atau data demo yang disajikan sebagai data nyata.
- Backup dan prosedur pemulihan telah diuji.
- Kebijakan privasi, ketentuan penggunaan, refund, dan kanal bantuan tersedia.
- Pengujian end-to-end, regresi, dan keamanan dasar telah lulus.
- Dokumentasi deployment, konfigurasi, migrasi, dan prosedur operasional tersedia.

## 10. ATURAN PERUBAHAN LINGKUP

Setelah scope ini disetujui, fitur baru tidak langsung ditambahkan.

Setiap usulan harus menjawab:

1. Masalah pengguna apa yang diselesaikan?
2. Apakah fitur tersebut diperlukan agar produk yang dijanjikan berfungsi?
3. Apakah kebutuhan itu sudah dapat dipenuhi oleh fitur yang ada?
4. Berapa dampak terhadap waktu pengembangan, biaya, keamanan, dan pemeliharaan?
5. Apakah fitur tersebut dapat ditunda tanpa merusak kualitas produk inti?

Fitur yang tidak penting untuk memenuhi janji produk dipindahkan ke daftar pengembangan lanjutan.

## 11. KEPUTUSAN AKHIR

Prioritas pengembangan adalah menyelesaikan produk yang sudah dirancang, mengintegrasikan fitur inti, melindungi data dan materi Premium, serta memastikan kualitas peluncuran.

Jangan memperpanjang pengembangan dengan menambahkan layanan AI berbayar, integrasi eksternal, atau otomatisasi yang belum terbukti dibutuhkan.

**Definisi produk selesai:** pengguna dapat belajar, meriset produk, merencanakan dan menyimpan konten, mengelola tautan affiliate, mencatat performa, serta mengevaluasi hasil melalui satu aplikasi yang terintegrasi dan dapat digunakan sesuai paketnya.

**Catatan versi:** dokumen ini adalah spesifikasi penguncian ruang lingkup berdasarkan keputusan yang tercatat. Sebelum menggantikan seluruh Master Development sebelumnya, lakukan rekonsiliasi dengan dokumen lengkap agar fitur, tabel, modul, dan ketentuan terdahulu yang masih berlaku tidak terhapus secara tidak sengaja.