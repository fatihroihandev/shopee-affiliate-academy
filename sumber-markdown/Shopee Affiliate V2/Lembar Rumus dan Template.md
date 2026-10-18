# Lembar Rumus dan Template

Halaman ini merangkum semua rumus dan template penting di satu tempat. Semua angka contoh adalah simulasi untuk latihan. Itu bukan tarif resmi Shopee dan bukan janji hasil.

---

# BAGIAN A — RUMUS

## Rumus performa konten

| Metrik | Rumus | Contoh | Modul |
| --- | --- | --- | --- |
| Komisi | Dasar komisi × Tarif komisi | Rp100.000 × 5% = Rp5.000 | 01 |
| CTR | Klik ÷ Tayangan × 100% | 200 ÷ 10.000 = 2% | 01, 16 |
| CVR | Pesanan ÷ Klik × 100% | 10 ÷ 200 = 5% | 01, 16 |
| CVR valid | Pesanan memenuhi syarat ÷ Klik × 100% | 15 ÷ 400 = 3,75% | 16 |
| EPC | Komisi ÷ Klik | Rp250.000 ÷ 500 = Rp500 | 16, 18 |
| Komisi per 1.000 views | Komisi ÷ Views × 1.000 | Rp500.000 ÷ 50.000 × 1.000 = Rp10.000 | 16, 18 |
| AOV | Total nilai pesanan ÷ Jumlah pesanan | Rp2.000.000 ÷ 40 = Rp50.000 | 16 |
| Rasio pembatalan | Pesanan dibatalkan ÷ Total pesanan × 100% | 10 ÷ 100 = 10% | 16 |
| Komisi rata-rata per pesanan | Total komisi ÷ Jumlah pesanan yang sesuai | Rp2.000.000 ÷ 200 = Rp10.000 | 19 |

Catatan penting:

- **Tayangan** bisa berarti views atau impresi. Selalu sebutkan dasar yang kamu pakai.
- Pakai komisi dengan status yang sama dan periode yang sama di pembilang dan penyebut.
- EPC paling aman dihitung dengan komisi disetujui.

## Rumus keuangan

| Hal | Rumus | Contoh | Modul |
| --- | --- | --- | --- |
| Hasil setelah biaya (basis kas) | Komisi dibayarkan − Biaya usaha | Rp6 juta − Rp1 juta = Rp5 juta | 01, 19 |
| Hasil setelah biaya (basis kinerja) | Komisi disetujui − Biaya usaha | Rp8 juta − Rp1 juta = Rp7 juta | 19, 24 |
| Komisi per jam kerja | Komisi yang dipilih ÷ Total jam kerja | Rp3.000.000 ÷ 100 jam = Rp30.000 | 19 |
| Saldo akhir | Saldo awal + Kas masuk − Kas keluar | Rp500.000 + Rp1.500.000 − Rp400.000 = Rp1.600.000 | 19 |
| Rasio komisi disetujui | Komisi disetujui ÷ Komisi estimasi × 100% | Gunakan hanya untuk transaksi dan periode yang sebanding | 18 |
| Kontribusi produk | Komisi produk ÷ Total komisi × 100% | Rp3.500.000 ÷ Rp5.000.000 = 70% | 18 |

Istilah "profit bersih" hanya dipakai setelah pajak dan kewajiban lain dihitung.

## Rumus perencanaan target (hitung mundur)

| Langkah | Rumus | Contoh (target Rp30 juta) |
| --- | --- | --- |
| 1. Kebutuhan pesanan | Target komisi ÷ Komisi rata-rata per pesanan (bulatkan ke atas) | Rp30.000.000 ÷ Rp10.000 = 3.000 pesanan |
| 2. Kebutuhan klik | Kebutuhan pesanan ÷ CVR (desimal) | 3.000 ÷ 0,03 = 100.000 klik |
| 3. Kebutuhan views | Kebutuhan klik ÷ CTR (desimal) | 100.000 ÷ 0,02 = 5.000.000 views |

Arah maju: Pesanan = Views × CTR × CVR, lalu Komisi = Pesanan × Komisi rata-rata. Contoh: 1.000.000 × 2% × 3% = 600 pesanan.

Rp30 juta hanya contoh latihan. Pakai target dan data aktualmu sendiri.

## Rumus riset produk

**Skor produk berbobot:**

```
Skor total = jumlah dari (Skor faktor ÷ 5 × Bobot)
```

| Faktor | Bobot |
| --- | --- |
| Kesesuaian dengan kebutuhan audiens | 25% |
| Kualitas dan reputasi | 20% |
| Harga dan nilai guna | 15% |
| Komisi dan potensi pendapatan | 15% |
| Persaingan | 10% |
| Potensi demonstrasi konten | 10% |
| Ketersediaan | 5% |

Hasil 80–100: kandidat prioritas. 65–79: perlu diperiksa lebih lanjut. Di bawah 65: banyak kelemahan, evaluasi kembali.

## Rumus Notion

```
CTR = if(prop("Views") > 0, prop("Klik") / prop("Views"), 0)
CVR = if(prop("Klik") > 0, prop("Pesanan") / prop("Klik"), 0)
EPC = if(prop("Klik") > 0, prop("Komisi Disetujui") / prop("Klik"), 0)
```

## Rumus spreadsheet (kolom A nama konten, B views, C klik, D pesanan, E komisi disetujui)

```
CTR                   =IFERROR(C2/B2,0)
CVR                   =IFERROR(D2/C2,0)
EPC                   =IFERROR(E2/C2,0)
Komisi per 1.000 views =IFERROR(E2/B2*1000,0)
```

Format CTR dan CVR sebagai persentase.

---

# BAGIAN B — TEMPLATE

## Template 1 — Catatan riset peluang (Modul 04)

- Nama peluang:
- Masalah calon pembeli:
- Audiens yang mungkin membutuhkan:
- Bukti dari sumber pertama / kedua / ketiga:
- Sinyal niat beli:
- Keterbatasan data:
- Hipotesis yang ingin diuji:
- Langkah validasi berikutnya:

## Template 2 — Buyer persona (Modul 05)

- Nama persona:
- Situasi atau latar belakang:
- Masalah yang ingin diselesaikan:
- Motivasi pembelian:
- Batas anggaran atau sensitivitas harga:
- Hal yang dikhawatirkan:
- Pertanyaan sebelum membeli:
- Jenis konten yang dibutuhkan:
- Produk yang mungkin relevan:
- Bukti yang mendukung persona:
- Asumsi yang belum terverifikasi:

## Template 3 — Positioning (Modul 05)

> Saya membantu [audiens utama] menyelesaikan [masalah utama] melalui [pendekatan konten] agar mereka dapat [hasil yang diinginkan].

## Template 4 — Analisis akun kompetitor (Modul 07)

| Aspek | Catatan |
| --- | --- |
| Nama atau identitas akun |  |
| Niche dan audiens utama |  |
| Positioning |  |
| Format konten |  |
| Pola hook |  |
| Cara menjawab keberatan |  |
| CTA |  |
| Kekuatan dan kelemahan yang teramati |  |
| Peluang diferensiasi |  |

Catat sumber dan tanggal pengamatan. Kalau datanya tidak ada, tulis "tidak diketahui".

## Template 5 — Ide konten (Modul 09)

- Judul:
- Audiens:
- Masalah:
- Pilar:
- Angle:
- Format:
- CTA:
- Bukti yang diperlukan:

## Template 6 — Skrip video (Modul 10)

- Nama konten:
- Audiens dan masalah:
- **Hook:**
- **Konteks:**
- **Isi atau demonstrasi:**
- **Bukti:**
- **Batasan:**
- **CTA:**
- **Pengungkapan affiliate:** "Link ini adalah affiliate link. Saya dapat menerima komisi jika kamu membeli lewat link ini dan transaksinya memenuhi ketentuan program."
- Sumber informasi:

Rumus manfaat produk: Fitur → Fungsi → Manfaat potensial → Batasan.

## Template 7 — Checklist sebelum publikasi (Modul 11 dan 21)

- [ ]  Produk terlihat jelas.
- [ ]  Audio dapat dipahami.
- [ ]  Hook sesuai dengan isi.
- [ ]  Demonstrasi akurat.
- [ ]  Subtitle tidak ada kesalahan.
- [ ]  Tidak ada klaim tanpa bukti.
- [ ]  Materi visual dan musik dipakai secara sah.
- [ ]  CTA relevan dan tidak memakai urgensi palsu.
- [ ]  Pengungkapan affiliate tersedia.
- [ ]  Link dan penempatannya sesuai aturan.
- [ ]  Harga dan stok tidak menyesatkan.

## Template 8 — Catatan eksperimen (Modul 17)

- ID Eksperimen:
- Tanggal mulai dan tanggal evaluasi:
- Tujuan:
- Hipotesis: Jika saya melakukan ..., maka metrik ... akan berubah karena ...
- Variabel utama dan faktor lain yang perlu diperhatikan:
- Baseline (isi hanya metrik yang datanya ada):
- Hasil pengujian:
- Keterbatasan data:
- Kesimpulan: hipotesis didukung, belum cukup bukti, atau tidak didukung?
- Keputusan: Lanjutkan / Optimalkan / Uji ulang / Kurangi prioritas / Hentikan
- Alasan dan langkah berikutnya:

## Template 9 — Laporan mingguan (Modul 23)

**Ringkasan:** jumlah konten terbit, total views, total klik, total pesanan, komisi estimasi, komisi pending, komisi disetujui, komisi dibayarkan.

**Analisis:** konten dengan kontribusi komisi terbesar, produk dengan EPC tertinggi, konten dengan CTR rendah, produk yang menurun, masalah tracking, perubahan komisi atau ketersediaan.

**Tindakan berikutnya:** konten yang dikembangkan, produk yang diuji, masalah yang diperbaiki, eksperimen berikutnya.

## Template 10 — Lembar perhitungan target (Modul 19)

- Target komisi bulanan:
- Komisi rata-rata aktual per pesanan:
- Kebutuhan pesanan:
- CVR aktual:
- Kebutuhan klik:
- CTR aktual:
- Kebutuhan views:
- Komisi estimasi / pending / disetujui / dibayarkan:
- Biaya operasional:
- Hasil setelah biaya (sebut basisnya):
- Skenario konservatif, dasar, dan optimistis:

Tandai mana yang asumsi dan mana yang data nyata.

## Template 11 — Rekonsiliasi komisi (Modul 14 dan 19)

1. Pastikan kedua laporan memakai periode yang sama.
2. Pastikan jenis komisinya sama (estimasi, disetujui, atau dibayarkan).
3. Periksa pembatalan dan penyesuaian.
4. Periksa apakah semua transaksi sudah selesai diproses.
5. Periksa apakah ada transaksi yang belum masuk laporan terbaru.
6. Cocokkan jumlah yang dibayarkan dengan bukti penerimaan.
7. Selisih yang belum bisa dijelaskan: tandai dan tanyakan lewat kanal resmi.

## Template 12 — Laporan performa 30 hari (Modul 24)

1. Periode, platform utama, niche, jumlah konten.
2. Hasil utama: views, klik, pesanan, komisi (4 status), biaya, hasil setelah biaya, jam kerja.
3. Performa funnel: CTR, CVR, EPC, komisi per 1.000 views, tahap paling lemah.
4. Analisis produk dan konten.
5. Evaluasi eksperimen.
6. Tiga prioritas berikutnya.
7. Rencana 30 hari ke depan.
