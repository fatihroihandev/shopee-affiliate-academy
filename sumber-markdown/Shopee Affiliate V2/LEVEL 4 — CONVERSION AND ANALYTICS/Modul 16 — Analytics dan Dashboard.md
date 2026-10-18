# Modul 16 — Analytics dan Dashboard

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
