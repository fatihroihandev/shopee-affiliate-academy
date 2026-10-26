# Database Notion yang Wajib Dibangun

Database adalah "buku catatan terstruktur" bisnismu. Dengan database, kamu bisa menjawab pertanyaan penting: produk mana yang dipromosikan, konten mana yang menghasilkan klik, dan berapa komisi yang sudah dibayarkan.

Ada **enam database**. Kamu tidak perlu membangun semuanya sekaligus. Bangun bertahap, sesuai modul.

## Gambaran besar

| Database | Dibangun di | Fungsi |
| --- | --- | --- |
| Database Produk Affiliate | Modul 03 (kolom tambahan di Modul 06) | Menyimpan riset dan status produk |
| Database Konten Affiliate | Modul 03 (kolom tambahan di Modul 16) | Mencatat konten dan performanya |
| Database Komisi Affiliate | Modul 03 (kolom tambahan di Modul 16) | Mencatat komisi, biaya, dan pembayaran per periode |
| Database Link Affiliate | Modul 14 | Mengarsipkan link dan memeriksa kondisinya |
| Database Eksperimen | Modul 17 | Mendokumentasikan hipotesis dan keputusan |
| Database SOP dan Pengetahuan | Modul 20 dan 23 | Menyimpan prosedur kerja |

## Aturan umum

- Pakai nama kolom persis seperti di halaman ini, supaya formula di Modul 16 dan 23 langsung bekerja.
- Status komisi selalu empat tahap: Estimasi, Pending, Disetujui, Dibayarkan.
- Catat tanggal setiap kali memeriksa harga, komisi, atau aturan, karena semuanya bisa berubah.
- Kalau datanya belum ada, kosongkan atau tulis "belum diketahui". Jangan diisi perkiraan tanpa label.
- Jangan menyimpan kata sandi atau kode OTP di database mana pun.
- Backup database secara berkala dan pastikan hasil backup bisa dibuka (Modul 03 dan 23).

## Urutan membangun

1. **Modul 03:** buat Database Produk, Konten, dan Komisi dengan kolom awal.
2. **Modul 06:** tambahkan kolom evaluasi produk.
3. **Modul 14:** buat Database Link, lalu ganti kolom "Affiliate Link" di Konten dengan relasi.
4. **Modul 16:** tambahkan kolom performa dan formula metrik.
5. **Modul 17:** buat Database Eksperimen.
6. **Modul 20 dan 23:** buat Database SOP dan Pengetahuan, template, dan backup.

---

## 1. Database Produk Affiliate

**Fungsi:** satu tempat untuk semua produk yang kamu riset dan promosikan.

| Kolom | Tipe |
| --- | --- |
| Nama Produk | Title |
| ID Produk (mis. P001) | Text |
| Kategori | Select |
| Link Produk | URL |
| Harga Saat Dicek | Number |
| Tarif Komisi (tarif + sumber verifikasi) | Text |
| Rating | Number |
| Jumlah Ulasan | Number |
| Kualitas Penjual | Select |
| Potensi Konten | Select |
| Kelayakan Program | Select |
| Skor Produk | Number |
| Status (Riset / Siap Dipromosikan / Dihentikan) | Select |
| Tanggal Pemeriksaan | Date |
| Catatan | Text |

**Versi awal (Modul 03):** Nama Produk, ID Produk, Kategori, Link Produk, Harga Saat Dicek, Tarif Komisi, Status, Tanggal Pemeriksaan, Catatan. Kolom lainnya ditambah di Modul 06.

**Contoh isi (simulasi):**

| Nama Produk | ID Produk | Harga Saat Dicek | Status | Tanggal Pemeriksaan |
| --- | --- | --- | --- | --- |
| Stand laptop lipat | P001 | Rp85.000 | Siap Dipromosikan | 10 Okt 2026 |
| Organizer kabel | P002 | Rp25.000 | Riset | 10 Okt 2026 |

## 2. Database Konten Affiliate

**Fungsi:** mencatat setiap konten dan hasilnya, supaya kamu tahu konten mana yang bekerja.

| Kolom | Tipe |
| --- | --- |
| Judul Konten | Title |
| ID Konten (mis. C001) | Text |
| Produk | Relation → Database Produk Affiliate |
| Link | Relation → Database Link Affiliate |
| Kanal | Select |
| Format | Select |
| Pilar Konten | Select |
| Hook | Text |
| Tanggal Publikasi | Date |
| URL Konten | URL |
| Views | Number |
| Klik | Number |
| Pesanan | Number |
| Komisi Estimasi | Number |
| Komisi Disetujui | Number |
| Komisi Dibayarkan | Number |
| Status Konten | Select |
| Catatan Evaluasi | Text |

**Pilihan Status Konten:** Ide, Riset, Skrip, Produksi, Pemeriksaan, Siap Publikasi, Terbit, Evaluasi, Selesai.

Di Modul 03, kolom Link masih berupa URL biasa bernama "Affiliate Link". Di Modul 14, kolom itu diganti dengan relasi ke Database Link Affiliate.

**Formula Notion (Modul 16):**

```
CTR  = if(prop("Views") > 0, prop("Klik") / prop("Views"), 0)
CVR  = if(prop("Klik") > 0, prop("Pesanan") / prop("Klik"), 0)
EPC  = if(prop("Klik") > 0, prop("Komisi Disetujui") / prop("Klik"), 0)
```

Atur format CTR dan CVR menjadi persentase.

## 3. Database Komisi Affiliate

**Fungsi:** mencatat komisi dan biaya per periode. Dua istilah lain di modul, yaitu "performa" (Modul 16) dan "keuangan" (Modul 23), adalah database yang sama.

| Kolom | Tipe |
| --- | --- |
| Periode | Title |
| Tanggal Mulai | Date |
| Tanggal Akhir | Date |
| Produk (opsional) | Relation → Database Produk Affiliate |
| Klik | Number |
| Pesanan | Number |
| Pesanan Dibatalkan | Number |
| Komisi Estimasi | Number |
| Komisi Pending | Number |
| Komisi Disetujui | Number |
| Komisi Dibayarkan | Number |
| Biaya Usaha | Number |
| Jam Kerja | Number |
| Status Pembayaran | Select |
| Bukti Pembayaran | URL atau Files |
| Catatan Rekonsiliasi | Text |

**Versi awal (Modul 03):** Periode, Komisi Estimasi, Komisi Pending, Komisi Disetujui, Komisi Dibayarkan, Biaya Usaha, Bukti Pembayaran, Catatan. Kolom lainnya ditambah di Modul 16.

**Cara mengisi dengan benar:**

- Kalau satu nominal pindah status (misalnya dari Pending ke Disetujui), catat sebagai perpindahan status. Jangan dihitung sebagai pendapatan baru.
- Jangan menjumlahkan empat status komisi. Angkanya bisa saling beririsan.
- Jangan menjumlahkan laporan mingguan yang periodenya tumpang tindih.

**Contoh isi (simulasi, bukan laporan nyata):**

| Periode | Komisi Estimasi | Komisi Pending | Komisi Disetujui | Komisi Dibayarkan |
| --- | --- | --- | --- | --- |
| Minggu 1 | Rp25.000 | Rp0 | Rp15.000 | Rp10.000 |

## 4. Database Link Affiliate

**Fungsi:** mengarsipkan semua affiliate link supaya tidak tertukar dan mudah diperiksa.

| Kolom | Tipe |
| --- | --- |
| ID Link (mis. L001) | Title |
| Produk | Relation → Database Produk Affiliate |
| Nama Toko | Text |
| Affiliate Link | URL |
| Tanggal Dibuat | Date |
| Platform | Select |
| Status Link (Aktif / Perlu Diperiksa / Tidak Digunakan) | Select |
| Tanggal Pemeriksaan | Date |
| Catatan | Text |

Satu link bisa dipakai beberapa konten. Karena itu relasi link ke konten dicatat di Database Konten Affiliate.

Jangan menghapus catatan link lama saat mengganti link. Ubah statusnya menjadi "Tidak Digunakan" supaya riwayatnya tetap ada.

## 5. Database Eksperimen

**Fungsi:** mendokumentasikan setiap pengujian supaya keputusanmu punya alasan dan bukti.

| Kolom | Tipe |
| --- | --- |
| Nama Eksperimen | Title |
| ID Eksperimen (mis. EXP001) | Text |
| Tujuan | Text |
| Hipotesis | Text |
| Variabel Utama | Select |
| Metrik Utama | Select |
| Baseline | Number |
| Hasil | Number |
| Tanggal Mulai | Date |
| Tanggal Akhir | Date |
| Ukuran Sampel | Number |
| Keterbatasan | Text |
| Keputusan (Lanjutkan / Optimalkan / Uji ulang / Kurangi prioritas / Hentikan) | Select |
| Alasan Keputusan | Text |
| Pelajaran | Text |

Catat juga eksperimen yang hasilnya negatif. Hasil seperti itu tetap berguna untuk menyingkirkan hipotesis yang lemah.

## 6. Database SOP dan Pengetahuan

**Fungsi:** menyimpan prosedur kerja supaya bisa diulang tanpa mengandalkan ingatan.

| Kolom | Tipe |
| --- | --- |
| Nama Proses | Title |
| Bagian | Select |
| Status SOP | Select |
| Terakhir Diperbarui | Date |
| Sumber | URL |
| Prosedur | Text |
| Catatan Tinjauan | Text |

**Contoh SOP yang perlu dibuat (Modul 24):** riset produk, pemeriksaan kualitas produk, pembuatan konten, pemeriksaan kepatuhan, pembuatan dan pengujian link, publikasi, pencatatan performa, evaluasi mingguan, rekonsiliasi komisi, backup data, penanganan risiko, dan evaluasi bulanan.

---

## Hubungan antardatabase

Kolom bertipe `Relation` menghubungkan database seperti ini:

- `Database Konten Affiliate.Produk` → Database Produk Affiliate
- `Database Konten Affiliate.Link` → Database Link Affiliate
- `Database Link Affiliate.Produk` → Database Produk Affiliate
- `Database Komisi Affiliate.Produk` (opsional) → Database Produk Affiliate

Database Eksperimen dan Database SOP dan Pengetahuan berdiri sendiri. Kamu boleh menambahkan relasi, misalnya dari Eksperimen ke Konten.

## Hubungan dengan 8 Project Praktik

| Project | Database yang diisi |
| --- | --- |
| 01 Niche Research | Catatan riset (halaman bebas) |
| 02 Product Research | Database Produk Affiliate |
| 03 Competitor Research | Catatan kompetitor (halaman bebas) |
| 04 Content Production | Database Konten Affiliate |
| 05 First Conversion | Database Link Affiliate dan Konten Affiliate |
| 06 Analytics Dashboard | Database Konten dan Komisi Affiliate |
| 07 Optimization Sprint | Database Eksperimen |
| 08 Business Growth Plan | Database Komisi Affiliate dan SOP dan Pengetahuan |

## Kesalahan umum

| Kesalahan | Cara menghindari |
| --- | --- |
| Membuat semua database sekaligus di hari pertama | Bangun bertahap sesuai modul |
| Mengganti nama kolom sesuka hati | Pakai nama kolom baku agar formula bekerja |
| Menjumlahkan komisi dari status yang beririsan | Catat perpindahan status, bukan pendapatan baru |
| Mengisi data kosong dengan perkiraan | Kosongkan atau tulis "belum diketahui" |
| Lupa mencatat tanggal pemeriksaan | Isi tanggal setiap kali mengecek harga atau komisi |
| Menyimpan kata sandi atau OTP | Jangan pernah simpan di database |
| Tidak pernah backup | Backup berkala dan uji apakah file bisa dibuka |

## Checklist akhir

- [ ]  Database Produk, Konten, dan Komisi sudah dibuat (Modul 03).
- [ ]  Kolom evaluasi produk sudah ditambahkan (Modul 06).
- [ ]  Database Link sudah dibuat dan terhubung ke Konten (Modul 14).
- [ ]  Kolom performa dan formula CTR, CVR, EPC sudah berjalan (Modul 16).
- [ ]  Database Eksperimen sudah dibuat dan terisi (Modul 17).
- [ ]  Database SOP dan Pengetahuan sudah dibuat (Modul 20 dan 23).
- [ ]  Backup sudah dibuat dan bisa dibuka.
