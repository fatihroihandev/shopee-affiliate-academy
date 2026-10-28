# TEST PLAN & QUALITY ASSURANCE SPECIFICATION
## SHOPEE AFFILIATE ACADEMY PLATFORM

Dokumen ini mendefinisikan strategi pengujian, rencana kasus uji (*test cases*), matriks batas hak akses (*access tier boundary matrix*), serta kriteria penerimaan mutu (*acceptance criteria*) untuk Shopee Affiliate Academy.

---

## 1. STRATEGI & RUANG LINGKUP PENGUJIAN

Pengujian dilakukan secara komprehensif mencakup 5 lapisan pengujian:
1. **Unit Testing:** Menguji fungsi utilitas logika, kalkulasi komposit skor 7 faktor, format mata uang, serta parsing markdown.
2. **Component Testing:** Menguji perilaku komponen UI independen (*Doodles, Modal, Button, Brutalist Card, StickerBadge*).
3. **Integration Testing:** Menguji interaksi antara antarmuka frontend dengan lapisan penyimpanan lokal (*localStorage*) dan Supabase API via RLS.
4. **End-to-End (E2E) & Flow Testing:** Menguji skenario perjalanan pengguna lengkap (Registrasi $\rightarrow$ Belajar $\rightarrow$ Mengisi Workspace $\rightarrow$ Checkout $\rightarrow$ Upgrade Tier $\rightarrow$ Program Affiliate).
5. **Security & Boundary Testing:** Menguji kebocoran hak akses antara tier Free, Pro, dan Pro Plus.

---

## 2. MATRIKS UJI BATAS TIER AKSES (ACCESS BOUNDARY TEST MATRIX)

Matriks ini wajib diuji secara manual maupun terotomatisasi sebelum peluncuran untuk memastikan tidak ada kebocoran konten berbayar:

| Komponen / Halaman | Pengguna Tamu (Guest) | Pengguna FREE | Pengguna PRO | Pengguna PRO PLUS | Administrator |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Halaman Landing (`/`)** | Terbuka | Terbuka | Terbuka | Terbuka | Terbuka |
| **M00 Pelajaran 01–04** | Redirect ke Login | **Terbuka Penuh** | **Terbuka Penuh** | **Terbuka Penuh** | **Terbuka Penuh** |
| **M01 Pelajaran 05 (Free Preview)**| Redirect ke Login | **Terbuka Penuh** | **Terbuka Penuh** | **Terbuka Penuh** | **Terbuka Penuh** |
| **M01.06 s/d M06 (Pelajaran 06–30)**| Redirect ke Login | **Paywall Modal** | **Terbuka Penuh** | **Terbuka Penuh** | **Terbuka Penuh** |
| **8 Proyek Praktik (P01–P08)** | Redirect ke Login | Mode Baca (No Save) | **Akses Penuh (Save Progres)** | **Akses Penuh (Save Progres)** | **Akses Penuh** |
| **Product Research Lab** | Redirect ke Login | Maksimal 3 Produk | **Tanpa Batas** | **Tanpa Batas** | **Tanpa Batas** |
| **Content Creation Studio** | Redirect ke Login | Maksimal 3 Draft | **Tanpa Batas** | **Tanpa Batas** | **Tanpa Batas** |
| **Performance Tracker** | Redirect ke Login | 1 Periode | **Tanpa Batas** | **Tanpa Batas** | **Tanpa Batas** |
| **Area Bonus Pro Plus (`/pro-plus`)**| Redirect ke Login | Terkunci | Terkunci | **Terbuka Penuh** | **Terbuka Penuh** |
| **Dashboard Affiliate (`/affiliate`)**| Redirect ke Login | **Terbuka (Komisi 10%)** | **Terbuka (Komisi 10%)** | **Terbuka (Komisi 10%)** | **Terbuka** |
| **Panel Admin (`/admin`)** | Redirect ke 404/Login | Akses Ditolak (403) | Akses Ditolak (403) | Akses Ditolak (403) | **Akses Penuh** |

---

## 3. SKENARIO KASUS UJI UTAMA (CORE TEST SCENARIOS)

### Skenario 1: Autentikasi Pengguna & Integrasi Google OAuth
- **TC-AUTH-01 (Email Sign Up):** Pengguna mendaftar dengan email baru & sandi valid $\rightarrow$ Akun terbuat di `profiles`, role bernilai `student`, tier default `free`, dialihkan ke dashboard.
- **TC-AUTH-02 (Google OAuth Login):** Pengguna mengklik "Lanjutkan dengan Google" $\rightarrow$ Muncul pop-up otorisasi Google $\rightarrow$ Setelah disetujui, sesi aktif tersimpan, data nama & foto avatar terisi di profil.
- **TC-AUTH-03 (Proteksi Sesi Kedaluwarsa):** Pengguna dengan token kedaluwarsa mengakses rute privat $\rightarrow$ Diarahkan ke `/login` tanpa mengalami crash layar putih.

### Skenario 2: Kurikulum LMS & Penyelesaian Progres
- **TC-LMS-01 (Membaca Materi Free):** Pengguna Free membuka Pelajaran 01 $\rightarrow$ Markdown ter-render sempurna dengan tabel, checklist, dan format tebal.
- **TC-LMS-02 (Tandai Selesai Pelajaran):** Pengguna mengklik tombol "Tandai Selesai & Lanjut" $\rightarrow$ Checkbox pelajaran tercentang hijau, persentase progres modul bertambah di dashboard, navigasi otomatis berpindah ke pelajaran berikutnya.
- **TC-LMS-03 (Paywall Gate Pelajaran Berbayar):** Pengguna Free mengklik Pelajaran 06 $\rightarrow$ Muncul pesan terkunci dan tombol CTA menuju Checkout Modal.

### Skenario 3: Pengerjaan Delapan Proyek Praktik Wajib (P01–P08)
- **TC-PRJ-01 (Input Checklist & Refleksi):** Pengguna Pro membuka P02 (Database 20 Produk), mencentang 4 butir checklist, menulis teks refleksi temuan, dan memasukkan tautan Google Sheets bukti riset $\rightarrow$ Klik "Simpan Progres" $\rightarrow$ Data tersimpan di Supabase/LocalStorage dan status berubah menjadi `in_progress`.
- **TC-PRJ-02 (Kelulusan Proyek):** Semua butir checklist dicentang $\rightarrow$ Status proyek otomatis berubah menjadi `completed`, ikon badge terverifikasi aktif di dashboard.

### Skenario 4: Enam Workspace Operasional
- **TC-WS-01 (Kalkulasi Skor 7 Faktor):** Pengguna memasukkan data produk baru di *Product Research Lab* dengan nilai: Fit=5, Quality=4, Price=4, Commission=5, Competition=3, Demo=5, Avail=4 $\rightarrow$ Sistem menghitung skor komposit otomatis: `4.29 / 5.00` dan label status menjadi `ready`.
- **TC-WS-02 (Integrasi Hook Bank ke Content Studio):** Pengguna membuka *Content Creation Studio*, mengklik "Pilih dari Hook Bank", memilih hook kategori "Masalah" $\rightarrow$ Teks hook otomatis mengisi kolom naskah tanpa perlu mengetik ulang.
- **TC-WS-03 (11-Point QC Checklist):** Pengguna di *Content Planner* memverifikasi 11 butir sebelum posting $\rightarrow$ Jika disclosure dicentang, badge hijau "Aman dari Banned" menyala.
- **TC-WS-04 (Performance Tracker CVR/EPC):** Pengguna menginput: 1.000 Klik, 40 Pesanan, Komisi Rp200.000 $\rightarrow$ Sistem menghitung otomatis: CVR = `4.00%`, EPC = `Rp200 / klik`.

### Skenario 5: Alur Checkout, Pembayaran & Entitlement
- **TC-PAY-01 (Pemilihan Tier Pro Rp99.000):** Pengguna membuka modal checkout, memilih paket Pro $\rightarrow$ Invoice diterbitkan dengan nominal Rp99.000, menampilkan instruksi QRIS/Lynk.id.
- **TC-PAY-02 (Aktivasi Entitlement):** Transaksi terbayar lunas $\rightarrow$ Baris `entitlements` aktif, status akun berubah seketika menjadi Pro tanpa perlu relogin, seluruh 24 modul terbuka.
- **TC-PAY-03 (Akses Paket Pro Plus Rp199.000):** Pengguna membeli Pro Plus $\rightarrow$ Halaman `/pro-plus` terbuka penuh menampilkan 3 paket bonus implementasi (Campaign-in-a-Box, Case Study Lab, Objection Playbook).

### Skenario 6: Kemitraan Affiliate Internal & Anti-Fraud
- **TC-AFF-01 (Tracking Cookie 30 Hari):** Pengunjung membuka `https://domain.com/?ref=TESTCODE` $\rightarrow$ Cookie `sa_ref=TESTCODE` tersimpan di browser selama 30 hari.
- **TC-AFF-02 (Pencegahan Self-Referral):** Pengguna dengan kode referral `TESTCODE` mencoba membeli paket Pro menggunakan link miliknya sendiri $\rightarrow$ Sistem mendeteksi `user_id` sama, transaksi berhasil diproses namun **tidak menghasilkan komisi**.
- **TC-AFF-03 (Penarikan Komisi / Payout):** Saldo approved Rp120.000 $\rightarrow$ Pengguna mengajukan payout Rp100.000 ke rekening BCA $\rightarrow$ Status payout menjadi `requested`, saldo terpotong, muncul di antrean admin panel.

### Skenario 7: Panel Admin & Audit Log
- **TC-ADM-01 (Manual Comped Grant):** Admin memberikan hak akses Pro Plus secara cuma-cuma kepada reviewer VIP $\rightarrow$ Hak akses aktif seketika, aksi terekam di tabel `admin_audit_logs` beserta alasan tertulis.
- **TC-ADM-02 (Persetujuan Payout):** Admin mengunggah bukti transfer perbankan dan mengubah status payout menjadi `completed` $\rightarrow$ Status terupdate di dashboard affiliate siswa.

---

## 4. PENGUJIAN RESPONSIFITAS & PERANGKAT (DEVICE MATRIX)

| Tipe Perangkat | Resolusi Layar | Target Peramban | Aspek Verifikasi |
| :--- | :--- | :--- | :--- |
| **Mobile (Small)** | 360 x 640 px | Chrome Mobile, Safari iOS | Drawer navigasi mobile (BottomNav), keterbacaan font reader, tombol modal pas layar. |
| **Mobile (Standard)**| 390 x 844 px (iPhone) | Safari iOS, Chrome Android | Card brutalist tidak meluap (*no horizontal scroll overflow*), padding pas. |
| **Tablet** | 768 x 1024 px (iPad) | Safari, Chrome Tablet | Layout grid workspace beralih dari 1 kolom ke 2 kolom secara harmonis. |
| **Desktop / Laptop** | 1366 x 768 px | Chrome, Edge, Firefox | Tampilan Sidebar permanen, tabel performance tracker tabular rapi. |
| **Wide Desktop** | 1920 x 1080 px (FHD)| Chrome, Brave, Edge | Konten terpusat dengan container max-w-7xl, jarak doodle proporsional. |

---

## 5. PENGUJIAN KETAHANAN KONEKSI & RESILIENSI OFFLINE

- **TC-OFF-01 (Simulasi Jaringan Terputus / Airplane Mode):** Pengguna sedang mengetik naskah di *Content Studio*, koneksi internet dimatikan $\rightarrow$ Notifikasi toast lokal memberitahukan data disimpan di perangkat $\rightarrow$ Tidak ada teks yang hilang saat halaman di-refresh.
- **TC-OFF-02 (Sinkronisasi Kembali):** Koneksi internet dinyalakan kembali $\rightarrow$ Aplikasi mendeteksi status online dan mengirimkan update data ke Supabase tanpa konflik.

---

## 6. KRITERIA KELULUSAN PENGUJIAN (SIGN-OFF CRITERIA)

Aplikasi dinyatakan layak rilis ke publik (*Production Ready*) apabila:
1. **Zero Blocker / Critical Bugs:** Tidak ada bug fungsional pada alur login, akses materi berbayar, checkout, dan pencatatan komisi.
2. **Kesesuaian Hak Akses 100%:** Pengguna Free terbukti tidak dapat mengakses teks Modul 02–24 atau bonus Pro Plus melalui inspect element / API query langsung.
3. **Build Lolos:** Perintah `npm run build` sukses 0 error TypeScript dan 0 warning kritis.
4. **Performa:** Skor Lighthouse Performance $\ge 90$, Accessibility $\ge 95$, Best Practices $\ge 95$, SEO $\ge 95$.
