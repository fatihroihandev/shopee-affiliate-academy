# ADDENDUM v2.1 — TIER PRICING, PRO PLUS, BONUS ALIGNMENT & GOOGLE LOGIN

**Produk:** Shopee Affiliate Academy  
**Dokumen acuan:** Master Development Document v2.0 FINAL  
**Status:** Spesifikasi perubahan produk dan pengembangan  
**Prioritas:** Setelah review versi berjalan selesai dan sebelum peluncuran komersial  
**Prinsip:** Pro sebagai paket utama, Pro Plus sebagai upgrade bernilai nyata, tanpa bonus duplikat, tanpa ketergantungan API AI berbayar untuk penggunaan bonus, serta autentikasi yang aman dan mudah digunakan.  

---

## 1. TUJUAN ADDENDUM

Addendum ini menetapkan perubahan dan tambahan berikut:

1. **Free** — memperoleh pengguna baru, membantu mereka merasakan manfaat platform, dan membuka peluang promosi melalui program affiliate internal.
2. **Pro** — paket utama yang ditargetkan menjadi pilihan mayoritas pembeli berbayar.
3. **Pro Plus** — paket dengan seluruh hak akses Pro ditambah materi implementasi dan studi kasus yang lebih mendalam.
4. **Google Login** — memungkinkan pengguna mendaftar atau masuk menggunakan akun Google melalui Supabase Auth, tanpa menghapus opsi login email dan password.

Perubahan wajib diterapkan secara konsisten pada halaman harga, checkout, pencatatan pesanan, entitlement, pemeriksaan akses, dashboard pengguna, panel admin, serta halaman autentikasi.

Addendum ini tidak mengubah kurikulum inti, enam workspace, delapan proyek praktik, program affiliate internal, atau fondasi desain yang sudah ditetapkan dalam Master v2.0, kecuali jika diperlukan untuk integrasi tier dan autentikasi.

---

## 2. HARGA DAN MODEL PENJUALAN

### 2.1 Harga resmi yang diusulkan

| Paket | Harga peluncuran | Harga reguler | Model |
| --- | --- | --- | --- |
| Free | Rp0 | Rp0 | Gratis |
| Pro | Rp99.000 | Rp149.000 | Sekali bayar |
| Pro Plus | Rp199.000 | Rp249.000 | Sekali bayar |

Ketentuan harga:

- Harga peluncuran Pro mengikuti kebijakan promo pada Master v2.0, yaitu kuota 100 pembeli pertama atau periode peluncuran 14 hari, sesuai aturan promo yang benar-benar diterapkan.
- Promo Pro Plus harus memiliki tanggal, kuota, atau kondisi yang ditetapkan secara eksplisit. Jangan menampilkan klaim kelangkaan jika tidak benar-benar diberlakukan.
- Harga yang berlaku harus bersumber dari konfigurasi produk di backend, bukan nilai yang dipercaya dari frontend.
- Checkout wajib menampilkan nama paket, harga, diskon jika ada, jumlah yang harus dibayar, dan status pembayaran.
- Seluruh harga merupakan harga produk sebelum komisi affiliate, biaya pemrosesan pembayaran, refund, dan pajak yang mungkin berlaku.

### 2.2 Model pembelian

Kedua paket berbayar merupakan pembelian satu kali. Tidak ada auto-renewal atau biaya API AI berkala yang dibebankan kepada pengguna untuk memperoleh bonus dalam addendum ini.

Istilah akses jangka panjang mengikuti batasan layanan pada Master v2.0. Jangan menjanjikan layanan akan tersedia selamanya tanpa batas operasional.

---

## 3. DEFINISI HAK AKSES SETIAP PAKET

### 3.1 Free

Pengguna Free memperoleh:

- Registrasi dan login.
- Akses penuh M00 dengan empat pelajaran.
- Preview Modul 01 sesuai Master v2.0.
- Ringkasan dan preview materi premium.
- Dashboard progres untuk materi yang dapat diakses.
- Akses terbatas ke workspace sesuai batas yang telah ditetapkan.
- Preview proyek praktik dalam mode baca.
- Akses program affiliate internal dengan komisi 10%, sesuai ketentuan program.

Batas akses workspace Free harus mengikuti Master v2.0. Addendum ini tidak boleh secara tidak sengaja mengubah batas produk, draf, baris data, atau fitur yang sudah ditentukan.

### 3.2 Pro — Paket utama

Pengguna Pro memperoleh seluruh hak akses premium inti yang ditentukan dalam Master v2.0, termasuk:

- Akses penuh seluruh 24 modul materi.
- Akses dan penyimpanan progres delapan proyek praktik.
- Akses penuh enam workspace kerja.
- Product Research Lab.
- Research Notes.
- Content Creation Studio.
- Content Planner.
- Performance Tracker dan Experiment Tracker.
- Link Archive dan SOP Documents.
- Tools, template, serta fungsi inti yang telah ditetapkan dalam Master v2.0.
- Akses program affiliate internal dengan komisi 10%, sesuai ketentuan program.

Seluruh batas akses Free yang relevan dinaikkan sesuai hak akses Pro. Tidak boleh ada fitur inti Pro yang tanpa sengaja terkunci akibat perubahan tier.

### 3.3 Pro Plus — Paket implementasi lanjutan

Pengguna Pro Plus memperoleh **seluruh hak akses Pro**, ditambah tiga kelompok bonus eksklusif berikut:

1. Affiliate Campaign-in-a-Box.
2. Affiliate Case Study Lab.
3. Content Angle & Objection Playbook.

Pro Plus tidak mengganti, mengurangi, atau mengunci fitur Pro. Bonus hanya menambah materi implementasi yang berbeda dari workspace inti.

---

## 4. SPESIFIKASI BONUS PRO PLUS

### 4.1 Bonus 1 — Affiliate Campaign-in-a-Box

**Tujuan:** Membantu pengguna mengubah pengetahuan dari kursus menjadi rencana kampanye yang dapat langsung disesuaikan dan dijalankan.

Setiap paket kampanye harus memiliki:

- Profil target audiens dan kebutuhan utamanya.
- Masalah pembeli yang hendak diselesaikan.
- Contoh proses pemilihan produk beserta alasan pemilihannya.
- Brief konten untuk setiap konten yang direkomendasikan.
- Contoh naskah konten dan CTA yang sesuai dengan tujuan konten.
- Rencana publikasi yang memiliki urutan dan prioritas.
- Metrik yang harus dicatat untuk mengevaluasi hasil.
- Panduan keputusan: apa yang perlu diubah jika hasil tidak sesuai target.
- Daftar asumsi yang harus diverifikasi sebelum kampanye dijalankan.
- Checklist implementasi dan evaluasi.

**Batasan agar tidak duplikat:**

- Bonus ini bukan Content Planner baru.
- Bonus ini bukan Content Creation Studio versi kedua.
- Jadwal publikasi dan naskah disajikan sebagai contoh kampanye siap adaptasi, bukan sebagai workspace operasional terpisah.
- Pengguna menjalankan, mengubah, dan mengevaluasi kampanye menggunakan workspace inti yang sudah tersedia.

**Format keluaran:** Dokumen kampanye terstruktur, contoh aset konten, checklist, dan data contoh yang dapat dibaca atau disalin.

**Kriteria penerimaan:**

- Minimal satu kampanye lengkap dan teruji secara editorial tersedia saat peluncuran.
- Semua komponen kampanye saling konsisten.
- Setiap asumsi dan data simulasi diberi label yang jelas.
- Pengguna dapat mengikuti kampanye tanpa perlu membeli API AI atau layanan tambahan.

Jumlah kampanye tambahan dapat dikembangkan berdasarkan penggunaan nyata; jangan menjanjikan jumlah yang belum selesai diproduksi.

### 4.2 Bonus 2 — Affiliate Case Study Lab

**Tujuan:** Melatih pengguna mengambil keputusan berdasarkan bukti, bukan hanya menyalin template.

Setiap studi kasus harus menjelaskan:

1. Konteks niche dan target audiens.
2. Masalah atau peluang yang ditemukan.
3. Kriteria pemilihan produk.
4. Alasan menerima atau menolak kandidat produk.
5. Strategi konten yang dipilih.
6. Metrik yang relevan untuk evaluasi.
7. Interpretasi hasil dan batas kesimpulan.
8. Kesalahan atau risiko yang perlu dihindari.
9. Keputusan tindak lanjut dan eksperimen berikutnya.

**Ketentuan data:**

- Data yang disimulasikan harus ditandai sebagai simulasi.
- Data nyata hanya boleh digunakan jika sumber dan izin penggunaannya memadai.
- Studi kasus tidak boleh mengarang hasil pendapatan, komisi, conversion rate, atau performa seolah-olah merupakan hasil aktual.
- Hasil suatu kasus tidak boleh dipresentasikan sebagai jaminan keberhasilan bagi pengguna.

**Batasan agar tidak duplikat:**

- Bonus ini berupa pembelajaran berbasis contoh yang telah dianalisis.
- Bonus ini bukan Performance Tracker atau Experiment Tracker baru.
- Pencatatan hasil milik pengguna tetap dilakukan melalui workspace inti.

**Format keluaran:** Studi kasus terstruktur, data contoh, pertanyaan analisis, pembahasan keputusan, dan checklist evaluasi.

**Kriteria penerimaan:**

- Minimal dua studi kasus lengkap tersedia saat peluncuran Pro Plus.
- Setiap kasus mempunyai konteks, bukti atau data yang jelas, analisis, batasan, dan keputusan tindak lanjut.
- Tidak ada data simulasi yang disamarkan sebagai hasil nyata.

### 4.3 Bonus 3 — Content Angle & Objection Playbook

**Tujuan:** Membantu pengguna menentukan pendekatan konten berdasarkan kebutuhan audiens dan alasan pembelian, bukan hanya menghasilkan lebih banyak hook.

Isi wajib:

- Pemetaan kebutuhan dan situasi audiens.
- Kategori keberatan pembeli, seperti harga, kualitas, kegunaan, kepercayaan, dan kecocokan produk.
- Panduan memilih pendekatan konten berdasarkan konteks.
- Contoh konten edukasi, demonstrasi, komparasi, pemecahan masalah, dan penanganan keberatan.
- Contoh klaim yang dapat digunakan versus klaim yang membutuhkan bukti tambahan.
- Checklist bukti yang perlu diperlihatkan dalam konten.
- Contoh CTA yang sesuai dengan tingkat kesiapan audiens.
- Panduan menghindari klaim menyesatkan, urgensi palsu, dan janji hasil yang tidak dapat dibuktikan.
- Matriks pemilihan angle berdasarkan tujuan konten dan kebutuhan audiens.

**Batasan agar tidak duplikat:**

- Bonus ini bukan Hook Bank baru.
- Bonus ini tidak menggantikan template naskah yang ada di Content Creation Studio.
- Fokusnya adalah kerangka pengambilan keputusan tentang *mengapa dan kapan* suatu angle dipakai, bukan sekadar daftar hook dan naskah tambahan.

**Format keluaran:** Playbook, matriks keputusan, contoh penerapan, dan checklist editorial yang dapat disalin.

**Kriteria penerimaan:**

- Setiap kategori angle mempunyai konteks penggunaan dan contoh yang jelas.
- Contoh keberatan dan jawaban tidak membuat klaim produk yang tidak didukung bukti.
- Materi dapat digunakan tanpa API AI berbayar.

---

## 5. ATURAN ANTI-DUPLIKASI FITUR

Sebelum bonus dipublikasikan, tim wajib melakukan pemeriksaan terhadap fitur yang telah ada dalam Master v2.0.

| Fitur inti yang sudah ada | Batas bonus Pro Plus |
| --- | --- |
| Product Research Lab | Tidak membuat kalkulator skor produk kedua |
| Research Notes | Tidak membuat pusat catatan riset kedua |
| Content Creation Studio | Tidak membuat editor atau generator naskah kedua |
| Hook Bank | Tidak menjual ulang kumpulan hook sebagai bonus baru |
| Content Planner | Tidak membuat kalender publikasi kedua |
| Performance Tracker | Tidak membuat dashboard metrik kedua |
| Experiment Tracker | Tidak membuat pelacak eksperimen kedua |
| Link Archive | Tidak membuat arsip link kedua |
| SOP Documents | Tidak membuat SOP Hub kedua |
| Delapan proyek praktik | Tidak menghitung ulang proyek yang sama sebagai bonus |

Bonus harus memberikan **konteks, contoh penerapan, metode pengambilan keputusan, atau aset implementasi** yang belum disediakan oleh fitur inti.

Jika sebuah bonus ternyata hanya mengulang fungsi yang sudah ada, bonus tersebut harus diperbaiki atau dihapus, bukan sekadar diberi nama baru.

---

## 6. KETENTUAN PRODUKSI BONUS DAN BIAYA

Bonus dibuat sebagai aset konten statis atau konten terstruktur yang disimpan dan disajikan oleh platform.

Ketentuan teknis:

- Pembuatan awal boleh menggunakan AI internal yang dimiliki pengembang.
- Penggunaan bonus oleh pelanggan tidak memerlukan pemanggilan model AI secara langsung.
- Tidak ada biaya API AI per penggunaan yang diwajibkan oleh fitur bonus.
- Konten harus dapat dibaca di dalam platform dan, jika desain produk mendukungnya, dapat disalin atau diekspor.
- Bonus tidak boleh bergantung pada layanan eksternal berbayar agar fungsi dasarnya tetap dapat digunakan.
- Pembaruan bonus merupakan keputusan operasional pengelola, bukan janji pembaruan otomatis tanpa batas.

**Ketentuan peluncuran:** Jangan mengaktifkan penawaran Pro Plus sebelum seluruh bonus minimum pada bagian 4 selesai, diperiksa, dan tersedia bagi pengguna yang berhak. Jika bonus belum siap, tunda Pro Plus atau nyatakan statusnya secara transparan sebelum pengguna membeli.

---

## 7. GOOGLE LOGIN DAN AUTENTIKASI PENGGUNA

### 7.1 Tujuan

Shopee Affiliate Academy harus menyediakan pilihan autentikasi:

1. **Masuk dengan Google** — melalui Google OAuth dan Supabase Auth.
2. **Masuk dengan email dan password** — tetap tersedia sebagai metode alternatif sesuai implementasi yang sudah ada.
3. **Registrasi akun baru** — dapat menggunakan Google atau metode email dan password yang didukung.

Google Login bertujuan mengurangi hambatan registrasi dan login. Fitur ini tidak mengganti sistem otorisasi, entitlement, atau pemeriksaan hak akses produk.

### 7.2 Stack teknologi dan batas perubahan

Implementasi harus menggunakan fondasi teknologi yang sudah ditetapkan dalam Master v2.0:

- Frontend: React dan TypeScript.
- Autentikasi: Supabase Auth.
- Database dan kontrol akses: Supabase PostgreSQL serta Row Level Security (RLS).
- Hosting: Cloudflare Pages sesuai konfigurasi proyek.

**Tidak perlu mengganti stack teknologi atau membangun sistem autentikasi baru dari awal.** Implementasi berfokus pada konfigurasi Google OAuth, integrasi frontend, penanganan callback, sinkronisasi profil, dan pengujian keamanan.

### 7.3 Konfigurasi Google OAuth

Developer wajib:

1. Membuat atau menggunakan proyek yang sesuai di Google Cloud Console.
2. Mengonfigurasi OAuth consent screen sesuai kebutuhan aplikasi dan kebijakan Google yang berlaku.
3. Membuat OAuth Client ID dan Client Secret yang diperlukan.
4. Mengaktifkan provider Google pada Supabase Auth.
5. Mengatur callback URL yang tepat sesuai instruksi Supabase.
6. Mengatur Site URL dan daftar redirect URL yang diizinkan pada Supabase.
7. Memastikan URL produksi dan lingkungan pengembangan menggunakan konfigurasi yang sesuai.
8. Menyimpan kredensial rahasia hanya pada konfigurasi aman di sisi server atau dashboard penyedia layanan, bukan di source code publik.

Callback URL Google OAuth harus mengikuti nilai yang benar-benar diberikan oleh Supabase untuk proyek tersebut. Jangan menebak atau menuliskan URL callback produksi sebelum konfigurasi proyek diverifikasi.

### 7.4 Integrasi halaman login

Halaman login wajib menyediakan tombol yang jelas:

- **Lanjutkan dengan Google**
- Pemisah visual seperti “atau”
- Form email dan password yang sudah tersedia, jika metode tersebut telah diimplementasikan
- Tautan registrasi atau pemulihan password sesuai fungsi yang sudah ada

Ketentuan antarmuka:

- Tombol Google mengikuti desain Shopee Affiliate Academy.
- Tampilkan status proses login ketika autentikasi sedang berlangsung.
- Tampilkan pesan yang jelas jika pengguna membatalkan login atau autentikasi gagal.
- Jangan menampilkan pesan sukses sebelum Supabase mengonfirmasi proses autentikasi.
- Hindari tombol yang memungkinkan pengiriman login berulang kali saat proses masih berjalan.
- Pastikan halaman dapat digunakan pada perangkat desktop dan mobile.

### 7.5 Alur autentikasi

Alur Google Login:

1. Pengguna menekan tombol “Lanjutkan dengan Google”.
2. Frontend memulai proses OAuth menggunakan Supabase Auth.
3. Pengguna diarahkan ke Google untuk memilih akun dan menyelesaikan autentikasi.
4. Google mengarahkan pengguna kembali ke callback yang telah dikonfigurasi.
5. Supabase Auth memvalidasi proses autentikasi dan menyediakan sesi pengguna.
6. Aplikasi mengambil atau menyinkronkan profil pengguna melalui mekanisme yang aman dan idempoten.
7. Aplikasi memuat entitlement pengguna dari sumber data tepercaya.
8. Pengguna diarahkan ke dashboard atau halaman tujuan yang diizinkan.
9. Hak akses konten ditentukan berdasarkan entitlement aktif, bukan berdasarkan metode login.

Login email dan password yang sudah ada harus tetap berfungsi setelah integrasi Google selesai.

### 7.6 Sinkronisasi profil dan pencegahan akun ganda

Implementasi wajib:

- Menggunakan identitas pengguna yang disediakan Supabase Auth sebagai referensi utama untuk relasi data pengguna.
- Membuat atau menyinkronkan profil secara idempoten agar login berulang tidak membuat baris profil duplikat.
- Mempertahankan relasi dengan progres belajar, workspace, proyek praktik, pesanan, dan entitlement yang sudah ada.
- Menangani login pertama, login berulang, dan akun yang telah terdaftar sebelumnya.
- Tidak membuat akun Academy kedua hanya karena pengguna menggunakan metode login yang berbeda tanpa memeriksa kondisi identitas yang relevan.

**Aturan keamanan pengaitan akun:**

- Jangan menggabungkan dua akun hanya karena alamat email yang tampak sama.
- Jangan menganggap email dari provider telah terverifikasi tanpa memeriksa status verifikasinya.
- Jika pengguna telah memiliki akun email dan password lalu mencoba login Google dengan email yang sama, aplikasi harus mengikuti mekanisme account linking yang aman dan didukung oleh Supabase.
- Jika pengaitan otomatis tidak aman atau tidak tersedia, arahkan pengguna ke alur verifikasi atau bantuan yang sesuai, bukan menggabungkan data secara paksa.
- Pengaitan identitas tidak boleh memindahkan kepemilikan pesanan, progres, atau entitlement tanpa validasi yang benar.

### 7.7 Pemisahan autentikasi dan entitlement

Google Login hanya membuktikan identitas pengguna. Login Google **tidak otomatis memberikan akses Pro atau Pro Plus**.

Ketentuan:

- Pengguna baru yang berhasil login melalui Google mendapatkan akses sesuai aturan akun Free pada Master v2.0.
- Akses Pro atau Pro Plus hanya diberikan setelah entitlement yang sesuai diterbitkan oleh backend berdasarkan transaksi yang telah diverifikasi atau mekanisme pemberian akses resmi yang sah.
- Frontend tidak boleh menentukan tier hanya dari metadata profil, parameter URL, atau klaim dari browser.
- Seluruh pemeriksaan akses materi, workspace, bonus, dan data pengguna tetap mengikuti RLS dan validasi backend.
- Logout harus mengakhiri sesi sesuai mekanisme Supabase Auth.
- Akses data pengguna harus tetap dibatasi pada identitas dan hak akses yang sah.

### 7.8 Sesi, callback, dan penanganan kesalahan

Implementasi wajib menangani:

- Callback OAuth berhasil.
- Pengguna membatalkan proses pada halaman Google.
- Callback tidak valid atau redirect URL tidak diizinkan.
- Kegagalan jaringan atau respons autentikasi.
- Sesi kedaluwarsa.
- Logout dan login kembali.
- Refresh halaman setelah login.
- Navigasi ke halaman yang memerlukan autentikasi.
- Pengalihan kembali ke halaman tujuan yang diizinkan setelah login.

Parameter tujuan setelah login harus divalidasi. Jangan mengizinkan redirect bebas ke URL eksternal yang dapat dimanfaatkan untuk serangan open redirect.

### 7.9 Biaya dan ketergantungan layanan

Google Login tidak memerlukan API model AI berbayar. Implementasinya menggunakan Google OAuth dan Supabase Auth.

Namun, biaya, batas penggunaan, persyaratan verifikasi aplikasi, dan ketentuan layanan harus mengikuti kebijakan Google serta paket Supabase yang berlaku pada saat implementasi. Jangan menjanjikan bahwa seluruh layanan terkait selalu gratis tanpa memeriksa batas aktualnya.

### 7.10 Kriteria penerimaan Google Login

- Tombol “Lanjutkan dengan Google” tersedia di halaman login.
- Pengguna baru dapat mendaftar melalui Google.
- Pengguna terdaftar dapat login kembali menggunakan Google sesuai identitas yang terhubung.
- Login email dan password tetap berfungsi.
- Callback dan redirect produksi menggunakan URL yang diizinkan.
- Login yang dibatalkan atau gagal menampilkan pesan yang sesuai.
- Login berulang tidak membuat profil duplikat.
- Sesi tetap berfungsi setelah refresh halaman dan mengikuti kebijakan sesi yang diterapkan.
- Logout berfungsi dan mengakhiri sesi pengguna.
- Kasus akun email dan password yang memiliki email sama dengan akun Google ditangani secara aman.
- Login Google tidak memberikan entitlement Pro atau Pro Plus secara otomatis.
- Data profil, progres, workspace, pesanan, dan entitlement tetap terhubung ke identitas pengguna yang benar.
- RLS dan pemeriksaan akses backend tetap berjalan.
- Tidak ada kredensial OAuth rahasia yang terekspos di frontend atau repositori publik.
- Fitur diuji pada desktop dan mobile.
- Seluruh skenario kritis lulus sebelum fitur dirilis.

---

## 8. PENERAPAN TIER PADA BACKEND DAN ENTITLEMENT

### 8.1 Prinsip hak akses

Backend menjadi sumber kebenaran untuk status pembayaran dan hak akses. Frontend tidak boleh menjadi satu-satunya pengaman konten premium.

Setiap pengguna berhak memiliki satu tingkat akses efektif untuk produk Academy: `free`, `pro`, atau `pro_plus`.

Hak akses efektif harus ditentukan berdasarkan entitlement yang valid, bukan berdasarkan nilai harga, query parameter, metode login, atau pilihan paket yang dikirim dari browser.

### 8.2 Penyesuaian skema

Master v2.0 menggunakan tabel `entitlements` dengan `product_code`, `access_level`, `status`, `source_order_id`, serta batasan unik `(user_id, product_code)`.

Implementasi wajib:

- Mempertahankan satu entitlement kanonis untuk produk Academy per pengguna.
- Memperluas nilai `access_level` agar dapat mewakili `pro` dan `pro_plus`, dengan tetap menyediakan jalur kompatibilitas untuk data lama yang menggunakan `premium`.
- Mempertahankan status entitlement seperti `active`, `revoked`, dan `expired`.
- Menyimpan SKU produk pembelian secara terpisah pada katalog atau pesanan, misalnya `affiliate_academy_pro` dan `affiliate_academy_pro_plus`.
- Memetakan kedua SKU berbayar ke entitlement produk Academy yang sama, dengan tingkat akses yang benar.
- Melakukan migrasi data lama secara aman sebelum kode baru mengandalkan nilai tier baru.
- Menyediakan rollback atau rencana pemulihan jika migrasi gagal.

Jangan membuat dua entitlement aktif yang saling bertentangan untuk satu pengguna dan produk Academy. Jika pengguna yang sudah memiliki Pro membeli upgrade Pro Plus, entitlement efektif harus dinaikkan menjadi `pro_plus` secara atomik setelah pembayaran terverifikasi.

### 8.3 Urutan transaksi dan upgrade

1. Backend mengambil produk dan harga yang berlaku dari katalog tepercaya.
2. Pesanan mencatat SKU, harga final, diskon, pengguna, dan referensi pembayaran.
3. Pembayaran diverifikasi melalui mekanisme yang ditetapkan Master v2.0.
4. Setelah pembayaran berhasil diverifikasi, backend memperbarui atau menerbitkan entitlement secara idempoten.
5. Pengguna menerima akses sesuai tier yang dibeli.
6. Tindakan penting dicatat di audit log.
7. Kegagalan pada salah satu tahap tidak boleh menghasilkan entitlement ganda atau akses yang lebih tinggi dari yang dibayar.

Pesanan Pro Plus tidak boleh dipenuhi hanya karena frontend mengirim `access_level = pro_plus`.

### 8.4 Aturan akses bonus

Buat pemeriksaan akses terpusat untuk bonus Pro Plus. Akses diberikan jika entitlement Academy aktif memiliki tingkat `pro_plus`.

Pemeriksaan ini harus diterapkan pada:

- Halaman dan route bonus.
- Permintaan data bonus ke backend.
- Unduhan atau ekspor bonus jika tersedia.
- Endpoint yang menyajikan isi bonus.
- Tampilan dashboard dan navigasi pengguna.

Konten bonus yang bersifat eksklusif tidak boleh ikut dikirim ke pengguna Free atau Pro hanya karena elemen tampilannya disembunyikan.

### 8.5 Pembatalan, refund, dan pencabutan akses

- Refund atau pembatalan yang memenuhi kebijakan produk harus memicu evaluasi entitlement.
- Jika upgrade Pro Plus dibatalkan atau direfund, sistem harus menerapkan kebijakan akses yang jelas dan konsisten dengan riwayat pembelian pengguna.
- Jangan otomatis menghapus akses Pro yang dibeli secara terpisah jika kebijakan refund dan riwayat transaksi tidak membenarkannya.
- Perubahan entitlement harus idempoten dan tercatat pada audit log.
- Kebijakan downgrade, refund, dan pembelian ulang harus ditetapkan sebelum peluncuran tier baru.

---

## 9. PROGRAM AFFILIATE INTERNAL

Addendum ini tidak mengubah ketentuan dasar program affiliate pada Master v2.0.

- Pengguna Free, Pro, dan Pro Plus dapat mengikuti program affiliate.
- Tarif komisi tetap 10% sesuai aturan komisi yang berlaku.
- Atribusi, masa cookie, validasi transaksi, anti-fraud, dan payout mengikuti spesifikasi program affiliate yang sudah ditetapkan.
- Sistem komisi harus menggunakan nilai transaksi yang memenuhi definisi transaksi bersih dalam Master v2.0.
- Penjualan Pro dan Pro Plus harus tercatat sebagai SKU yang benar agar laporan penjualan dan komisi dapat dibedakan.
- Harga produk, diskon, refund, dan komisi harus dihitung di backend secara konsisten.
- Pengguna yang login melalui Google harus mengikuti aturan affiliate yang sama dengan pengguna yang login melalui email dan password.

Jangan mengubah aturan affiliate hanya karena jumlah tier atau metode login bertambah.

---

## 10. DESAIN HALAMAN HARGA DAN PRINSIP DECOY

### 10.1 Hierarki pilihan

Halaman pricing menampilkan ketiga paket secara jelas:

- **Free:** mulai belajar dan mencoba workspace.
- **Pro:** paket utama untuk memperoleh seluruh materi dan tools inti.
- **Pro Plus:** seluruh Pro ditambah paket implementasi dan studi kasus lanjutan.

Pro dapat diberi penekanan visual sebagai paket yang direkomendasikan, tetapi label seperti “Paling populer” hanya boleh digunakan jika didukung data penggunaan atau penjualan nyata.

### 10.2 Transparansi perbandingan

- Tampilkan harga aktual dan harga promo dengan jelas.
- Bedakan fitur inti dan bonus Pro Plus.
- Jangan menampilkan bonus yang sama pada dua paket sebagai nilai tambahan eksklusif.
- Jangan menggunakan harga pembanding palsu, kelangkaan palsu, atau testimoni yang tidak terverifikasi.
- Jangan menyatakan Pro Plus pasti lebih menguntungkan bagi semua pengguna.

Tujuan strategi decoy adalah membuat nilai tiap pilihan lebih mudah dibandingkan, bukan membuat paket yang sengaja tidak berguna.

---

## 11. TARGET DAN PENGUKURAN

Pro merupakan sasaran pilihan utama. Pro Plus menjadi opsi peningkatan nilai transaksi. Free berfungsi sebagai pintu masuk akuisisi pengguna.

Distribusi pembelian berbayar awal dapat diuji dengan hipotesis kerja:

- Pro: 60–70% dari pembelian berbayar.
- Pro Plus: 30–40% dari pembelian berbayar.

Angka tersebut bukan jaminan dan bukan kriteria yang harus dipaksakan. Evaluasi berdasarkan data aktual.

Metrik yang harus dipantau:

1. Pengunjung halaman pricing.
2. Rasio pengunjung yang mendaftar.
3. Rasio pengguna Free yang menjadi pembeli.
4. Konversi checkout ke pembayaran berhasil.
5. Distribusi pembelian Pro dan Pro Plus.
6. Pendapatan per pengunjung halaman pricing.
7. Nilai transaksi rata-rata.
8. Refund dan sengketa pembayaran.
9. Aktivasi serta penggunaan bonus Pro Plus.
10. Komisi affiliate dan biaya pemrosesan pembayaran.
11. Jumlah registrasi dan login menggunakan Google.
12. Rasio keberhasilan dan kegagalan login Google.
13. Rasio pengguna baru yang menyelesaikan onboarding setelah login.
14. Insiden akun duplikat atau masalah pengaitan identitas.

Pengukuran autentikasi harus meminimalkan pencatatan data pribadi yang tidak diperlukan. Jangan mencatat token OAuth, password, atau kredensial rahasia ke log aplikasi.

Keputusan perubahan harga harus mempertimbangkan pendapatan dan konversi secara bersamaan. Persentase pembelian Pro Plus yang tinggi belum tentu berarti strategi berhasil jika total pembelian turun tajam.

---

## 12. ACCEPTANCE CRITERIA DAN PENGUJIAN

### A. Pricing dan katalog

- Halaman menampilkan Free, Pro, dan Pro Plus.
- Harga promo dan reguler sesuai konfigurasi backend.
- SKU Pro dan Pro Plus berbeda.
- Harga tidak dapat dimanipulasi melalui input frontend.
- Perbandingan fitur tidak mengandung klaim bonus duplikat.

### B. Hak akses

- Pengguna Free hanya dapat mengakses konten yang diizinkan.
- Pengguna Pro memperoleh seluruh fitur inti premium.
- Pengguna Pro tidak dapat mengambil konten bonus Pro Plus melalui endpoint langsung.
- Pengguna Pro Plus memperoleh semua fitur Pro dan ketiga bonus eksklusif.
- Konten premium dan bonus tidak bocor melalui payload frontend, API, atau unduhan tanpa otorisasi.
- Migrasi entitlement lama tidak menghilangkan hak akses pengguna yang sah.

### C. Pembayaran dan upgrade

- Pembayaran gagal tidak menerbitkan akses berbayar.
- Pembayaran berhasil menerbitkan tingkat akses yang benar.
- Webhook duplikat tidak menerbitkan entitlement ganda.
- Pembelian Pro Plus oleh pemilik Pro meningkatkan akses secara konsisten.
- Refund dan pencabutan akses mengikuti kebijakan yang telah ditentukan.
- Perubahan hak akses tercatat di audit log.

### D. Bonus

- Affiliate Campaign-in-a-Box selesai dan dapat diterapkan.
- Minimal dua Affiliate Case Study lengkap tersedia.
- Content Angle & Objection Playbook selesai.
- Data simulasi diberi label dengan jelas.
- Bonus tidak mengulang fungsi workspace inti.
- Bonus dapat digunakan tanpa API AI berbayar.
- Konten diperiksa dari sisi akurasi, konsistensi, dan klaim yang menyesatkan.

### E. Program affiliate

- Ketiga tier dapat mengikuti program affiliate.
- SKU Pro dan Pro Plus teridentifikasi benar pada pesanan.
- Komisi mengikuti aturan 10% yang berlaku.
- Refund dan pembatalan memicu penyesuaian komisi sesuai kebijakan.

### F. Google Login dan autentikasi

- Google OAuth berhasil digunakan pada lingkungan pengembangan dan produksi.
- Login email dan password tetap berfungsi.
- Registrasi Google menghasilkan profil yang benar dan tidak duplikat.
- Login ulang tidak membuat profil atau entitlement baru secara tidak sengaja.
- Kasus akun dengan email yang sama ditangani dengan aman.
- Callback, redirect, logout, dan sesi diuji.
- Pengguna yang membatalkan OAuth tidak menerima sesi atau akses yang tidak sah.
- Login Google tidak memberikan Pro atau Pro Plus secara otomatis.
- Kredensial OAuth rahasia tidak terekspos.
- RLS tetap membatasi akses data setiap pengguna.
- Pengujian dilakukan pada desktop dan mobile.

### G. Regresi dan keamanan

- Fitur yang sudah ada pada Master v2.0 tetap berjalan.
- Row Level Security dan validasi backend tetap diterapkan.
- Tidak ada akses bonus melalui perubahan URL atau manipulasi state frontend.
- Pengujian dilakukan pada akun Free, Pro, Pro Plus, dan Admin.
- Alur login Google dan email/password diuji pada berbagai status akun.
- Seluruh kriteria kritis lulus sebelum peluncuran.

---

## 13. URUTAN IMPLEMENTASI

Urutan pekerjaan di bawah merupakan tambahan pada roadmap Master v2.0. Lakukan audit kode lebih dahulu agar fitur yang sudah selesai tidak dibangun ulang.

### Tahap 1 — Audit dan persiapan

- Cocokkan kode berjalan dengan Master v2.0.
- Periksa skema produk, orders, entitlements, RLS, dan proses pembayaran.
- Audit alur autentikasi dan profil pengguna yang sudah ada.
- Inventarisasi materi dan aset bonus yang benar-benar sudah tersedia.
- Tetapkan kebijakan upgrade, refund, dan pembelian ulang.
- Periksa konfigurasi Supabase Auth dan domain aplikasi.

### Tahap 2 — Katalog dan entitlement

- Tambahkan SKU Pro dan Pro Plus.
- Perluas model tingkat akses dengan migrasi kompatibel.
- Implementasikan pemeriksaan akses terpusat.
- Uji alur pembayaran, upgrade, refund, dan idempotensi.

### Tahap 3 — Google OAuth

- Siapkan konfigurasi Google Cloud OAuth.
- Aktifkan Google provider pada Supabase Auth.
- Konfigurasikan callback dan redirect URL.
- Tambahkan tombol Google Login ke halaman autentikasi.
- Integrasikan penanganan sesi, callback, logout, dan pesan kesalahan.
- Pastikan sinkronisasi profil bersifat idempoten.
- Uji kasus akun lama, akun baru, dan pengaitan identitas.
- Pastikan entitlement tidak berubah hanya karena metode login.

### Tahap 4 — Produksi bonus

- Buat dan periksa ketiga kelompok bonus.
- Pastikan setiap bonus berbeda dari fitur inti.
- Masukkan konten ke penyimpanan yang sesuai dengan model akses privat.

### Tahap 5 — Pricing dan dashboard

- Terapkan tiga paket pada halaman harga.
- Tampilkan fitur dan bonus sesuai tier.
- Integrasikan SKU dengan checkout dan status pembayaran.
- Pastikan halaman akun menunjukkan paket dan hak akses yang benar.
- Pastikan pengguna yang login dengan Google mendapatkan pengalaman dashboard yang sama dengan pengguna metode login lainnya.

### Tahap 6 — QA dan peluncuran

- Jalankan seluruh acceptance criteria.
- Uji keamanan konten privat dan RLS.
- Uji skenario pembayaran, upgrade, refund, dan affiliate.
- Uji Google Login pada desktop dan mobile.
- Uji alur akun lama, sesi, logout, dan callback.
- Aktifkan Pro Plus hanya setelah seluruh persyaratan peluncuran lulus.
- Rilis Google Login setelah konfigurasi produksi dan pengujian keamanan dinyatakan lulus.

Urutan ini bukan pengganti roadmap delapan fase pada Master v2.0. Tahap implementasi harus disesuaikan dengan hasil audit kode yang sudah ada agar tidak membangun ulang fitur yang telah selesai.

---

## 14. KEPUTUSAN FINAL ADDENDUM

1. Pro adalah paket sasaran utama.
2. Pro Plus merupakan upgrade yang mencakup semua hak akses Pro.
3. Harga yang diusulkan: Pro Rp99.000 promo/Rp149.000 reguler; Pro Plus Rp199.000 promo/Rp249.000 reguler.
4. Bonus Pro Plus terdiri atas Affiliate Campaign-in-a-Box, Affiliate Case Study Lab, dan Content Angle & Objection Playbook.
5. Bonus tidak boleh menduplikasi enam workspace atau delapan proyek praktik.
6. Penggunaan bonus tidak memerlukan API AI berbayar secara berkala.
7. Model entitlement dan validasi backend wajib mendukung tiga tingkat akses.
8. Program affiliate 10% tetap berlaku bagi pengguna Free dan kedua tier berbayar sesuai ketentuan yang telah ada.
9. Peluncuran Pro Plus menunggu bonus selesai dan seluruh pengujian kritis lulus.
10. Harga dan distribusi pembelian harus dievaluasi menggunakan data aktual setelah peluncuran.
11. Google Login ditambahkan melalui Google OAuth dan Supabase Auth tanpa mengganti stack teknologi yang sudah ditetapkan.
12. Login email dan password tetap dipertahankan sebagai metode alternatif.
13. Login Google tidak otomatis memberikan akses Pro atau Pro Plus.
14. Profil pengguna, data, sesi, dan entitlement harus tetap aman serta konsisten di semua metode login.
15. Google Login baru diaktifkan pada produksi setelah konfigurasi OAuth, penanganan akun lama, RLS, callback, dan seluruh pengujian kritis lulus.

**Hubungan dokumen:** Addendum v2.1 melengkapi Master Development v2.0. Jika terjadi konflik, spesifikasi yang diubah oleh addendum ini berlaku untuk tier, harga, bonus, akses terkait, dan autentikasi Google. Bagian Master v2.0 lainnya tetap berlaku.

**Akhir Addendum v2.1.**
