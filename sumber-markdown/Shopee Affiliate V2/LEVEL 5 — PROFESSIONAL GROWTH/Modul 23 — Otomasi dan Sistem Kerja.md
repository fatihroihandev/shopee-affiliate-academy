# Modul 23 — Otomasi dan Sistem Kerja

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
