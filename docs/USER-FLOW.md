# USER FLOW & JOURNEY SPECIFICATION
## SHOPEE AFFILIATE ACADEMY PLATFORM

Dokumen ini memetakan seluruh perjalanan pengguna (*user journeys*), diagram alir (*flowcharts*), serta mesin status (*state machines*) di dalam aplikasi Shopee Affiliate Academy.

---

## 1. PETA PERJALANAN PENGGUNA (HIGH-LEVEL USER JOURNEY)

```mermaid
flowchart TD
    A["Pengunjung Baru (Landing / Referral Link)"] --> B{"Tindakan Pengunjung"}
    B -->|"Daftar Gratis"| C["Registrasi Akun (Email/Pass / Google OAuth)"]
    B -->|"Langsung Beli"| D["Halaman Harga & Checkout Modal"]
    
    C --> E["Dashboard Siswa (Akses Tier FREE)"]
    E --> F["Mempelajari M00 (4 Pelajaran Orientasi)"]
    E --> G["Mencoba Workspace (Batas Kuota Free)"]
    E --> H["Membuka Dashboard Affiliate Internal"]
    
    F --> I{"Buka Modul Berbayar (M01-M06)"}
    I -->|"Klik Materi Terkunci"| D
    
    D --> J["Pilih Tier: PRO (Rp99k) atau PRO PLUS (Rp199k)"]
    J --> K["Selesaikan Pembayaran (QRIS / Lynk.id / Gateway)"]
    K --> L["Konfirmasi Otomatis & Entitlement Aktif"]
    
    L --> M["Dashboard Siswa Diperbarui (PRO / PRO PLUS)"]
    M --> N["Penyelesaian 24 Modul & 8 Proyek Praktik"]
    M --> O["Eksekusi Penuh di 6 Workspace"]
    
    subgraph ProPlusArea["Khusus Akun Pro Plus"]
        M --> P["Area Bonus Eksklusif: Campaign, Case Studies, Playbook"]
    end
    
    E --> Q["Salin Link Referral Internal (?ref=KODE)"]
    Q --> R["Bagikan Link ke Media Sosial"]
    R --> S["Pengunjung Lain Membeli"]
    S --> T["Dapatkan Komisi 10% (Cair min. Rp50.000)"]
```

---

## 2. ALUR AUTENTIKASI & ONBOARDING

### 2.1 Pendaftaran & Masuk (Email & Google OAuth)

```mermaid
sequenceDiagram
    autonumber
    actor User as Pengguna
    participant UI as Antarmuka Frontend
    participant SupabaseAuth as Supabase Auth
    participant DB as Database (Profiles & Roles)

    User->>UI: Klik "Daftar Akun" / "Masuk"
    alt Opsi Google OAuth
        User->>UI: Klik "Lanjutkan dengan Google"
        UI->>SupabaseAuth: signInWithOAuth({ provider: 'google' })
        SupabaseAuth-->>User: Tampilkan Layar Izin Akun Google
        User->>SupabaseAuth: Izinkan Akses Profil & Email
        SupabaseAuth->>DB: Trigger handle_new_user() (Buat Profile & Role Student)
        SupabaseAuth-->>UI: Kembalikan Sesi Pengguna (Session & JWT)
    else Opsi Email & Password
        User->>UI: Masukkan Email & Password
        UI->>SupabaseAuth: signUp() / signInWithPassword()
        SupabaseAuth->>DB: Trigger handle_new_user()
        SupabaseAuth-->>UI: Kembalikan Sesi Pengguna
    end
    UI->>DB: Periksa Entitlements Pengguna
    DB-->>UI: Kembalikan Tier Akses (free, pro, atau pro_plus)
    UI-->>User: Redirect ke /dashboard
```

### 2.2 Aturan State Autentikasi
1. Jika pengguna belum login dan mengakses rute publik (`/`, `/modules`, `/pricing`, `/terms`, `/privacy`), halaman dapat diakses langsung.
2. Jika pengguna belum login dan mengakses rute privat (`/dashboard`, `/projects/*`, `/workspaces/*`, `/affiliate/dashboard`), pengguna diarahkan ke `/login` dengan menyimpan rute tujuan (*redirect query parameter*).
3. Saat registrasi berhasil, akun secara otomatis memperoleh `role = 'student'` dan `access_level = 'free'`.

---

## 3. ALUR BELAJAR & PENYELESAIAN PROYEK (LMS FLOW)

### 3.1 Navigasi Modul & Kontrol Akses (Paywall Gate)

```mermaid
flowchart TD
    A["Buka Halaman Modul (/modules)"] --> B["Pilih Pelajaran"]
    B --> C{"Apakah Pelajaran Free?"}
    
    C -->|"Ya (M00 / M01 Pelajaran 05)"| D["Buka Halaman LessonReader"]
    C -->|"Tidak (M01.06 - M06)"| E{"Periksa Entitlement"}
    
    E -->|"Akun Pro / Pro Plus / Admin"| D
    E -->|"Akun Free"| F["Tampilkan Modal Upgrade / Paywall Card"]
    
    F --> G["Klik 'Buka Akses Pro Sekarang'"]
    G --> H["Buka Checkout Modal"]
    
    D --> I["Membaca Konten & Interaksi"]
    I --> J["Klik 'Tandai Selesai & Lanjut'"]
    J --> K["Update lesson_progress di DB / LocalStorage"]
    K --> L["Perbarui Persentase Progres di Dashboard"]
    L --> M["Arahkan ke Pelajaran Berikutnya"]
```

### 3.2 Alur Proyek Praktik Wajib (P01–P08)

```mermaid
flowchart TD
    P_Start["Pilih Proyek (misal: P02 Database 20 Produk)"] --> P_Check{"Akses Pengguna"}
    
    P_Check -->|"Free"| P_Read["Mode Baca Saja (Petunjuk & Template)"]
    P_Check -->|"Pro / Pro Plus"| P_Active["Mode Pengerjaan Aktif"]
    
    P_Active --> P_Steps["Lakukan Checklist Langkah Praktik"]
    P_Steps --> P_Notes["Tulis Refleksi & Temuan Lapangan"]
    P_Notes --> P_Proof["Cantumkan URL Bukti (Shopee / GDrive / Sheet)"]
    P_Proof --> P_Save["Klik 'Simpan Progres Proyek'"]
    P_Save --> P_Status{"Semua Checklist Centang?"}
    
    P_Status -->|"Belum"| P_InProgress["Status: in_progress"]
    P_Status -->|"Lengkap"| P_Complete["Status: completed & Badge Terbuka"]
```

---

## 4. ALUR ENAM WORKSPACE OPERASIONAL

Setiap workspace dirancang untuk saling terhubung dalam siklus kerja harian affiliate:

```mermaid
flowchart LR
    subgraph W1["1. Riset Produk"]
        A["Product Research Lab"] -->|"Skor 7 Faktor & Status Ready"| B["Koleksi Produk Pilihan"]
    end
    
    subgraph W2["2. Riset Niche & Kompetitor"]
        C["Research Notes"] -->|"Catat Celah Konten"| B
    end
    
    subgraph W3["3. Kreasi Naskah Konten"]
        B --> D["Content Creation Studio"]
        E["Hook Bank"] --> D
        D -->|"Draft Naskah & Tautan Link"| F["Content Items"]
    end
    
    subgraph W4["4. Perencanaan & QC"]
        F --> G["Content Planner"]
        G -->|"Jadwal & 11-QC Checklist"| H["Status: Terbit"]
    end
    
    subgraph W5["5. Tracking Komisi & Metrik"]
        H --> I["Performance Tracker"]
        I -->|"Catat Klik, Pesanan, Komisi"| J["Analisis CVR & EPC"]
    end
    
    subgraph W6["6. Eksperimen Saintifik"]
        J -->|"Identifikasi Masalah"| K["Experiment Tracker"]
        K -->|"Uji 1 Variabel (14 Hari)"| L["Keputusan: Skala / Stop"]
        L -->|"Update Pola Kerja"| M["SOP Documents"]
    end
```

### Detail Interaksi Workspace:
1. **Product Research Lab:** Pengguna memasukkan data produk Shopee, memberikan skor 1-5 pada 7 faktor penilaian. Sistem mengkalkulasi skor komposit numerik dan menyarankan status (*Research, Ready, Testing, Dropped*).
2. **Content Studio:** Menarik produk dari *Product Research Lab*, memilih formula hook dari *Hook Bank*, menyusun naskah dan CTA, lalu menyimpan draft item konten.
3. **Content Planner:** Mengatur tanggal publikasi, memvalidasi 11 butir Quality Control sebelum unggah, dan menandai konten terbit.
4. **Performance Tracker:** Menginput data berkala dari laporan performa Shopee untuk menghitung rasio konversi dan memantau status komisi valid.
5. **Experiment Tracker:** Menjalankan eksperimen terisolasi (misal: pengujian durasi video, perubahan format hook) dengan baseline dan hasil terukur.

---

## 5. ALUR CHECKOUT, PEMBAYARAN & AKTIVASI ENTITLEMENT

```mermaid
sequenceDiagram
    autonumber
    actor User as Pengguna
    participant UI as Checkout Modal
    participant Store as Order & Payment Service
    participant Gateway as Payment Provider (Lynk/QRIS/Gateway)
    participant DB as PostgreSQL Database
    actor Admin as Admin Platform

    User->>UI: Buka Checkout Modal (Pilih PRO atau PRO PLUS)
    UI->>Store: createOrder({ tier, amount, provider })
    Store->>DB: Simpan order dengan status 'pending'
    
    alt Pembayaran Terintegrasi / Gateway
        Store->>Gateway: Buat Invoice / Tagihan QRIS
        Gateway-->>UI: Tampilkan Kode QRIS / Redirect Link
        User->>Gateway: Melakukan Pembayaran
        Gateway->>Store: Kirim Webhook Status 'paid'
        Store->>DB: Perbarui order status = 'paid'
        Store->>DB: Buat/Update entitlements (access_level = 'pro'/'pro_plus', status = 'active')
        Store->>DB: Catat referral conversion jika ada ref cookie
    else Pembayaran Manual / Konfirmasi Chat
        User->>Gateway: Transfer manual ke QRIS DANA Bisnis
        User->>UI: Kirim Bukti Transfer ke Admin
        Admin->>DB: Validasi & Klik "Approve & Grant Entitlement" di Admin Panel
        DB-->>Store: entitlements diaktifkan
        DB-->>Store: admin_audit_logs dicatat
    end
    
    Store-->>UI: Notifikasi Pembayaran Berhasil
    UI-->>User: Akses Terbuka! Selamat Datang di Pro/Pro Plus
```

---

## 6. ALUR PROGRAM AFFILIATE INTERNAL & PENCAIRAN KOMISI

```mermaid
flowchart TD
    Aff_Start["Pengguna Mendaftar / Masuk Dashboard Affiliate"] --> Aff_Code["Sistem Generate Kode Unik (misal: 'BUDI99')"]
    Aff_Code --> Aff_Link["Link Referral Dibuat: https://academy.com/?ref=BUDI99"]
    
    Aff_Link --> Aff_Share["Affiliate Membagikan Link & Materi Promosi"]
    Aff_Share --> Visitor["Calon Siswa Mengklik Link"]
    
    Visitor --> Cookie["Browser Calon Siswa Menyimpan Cookie 'sa_ref=BUDI99' (30 Hari)"]
    Visitor --> Buy{"Calon Siswa Membeli Pro / Pro Plus?"}
    
    Buy -->|"Tidak"| Expire["Cookie Kedaluwarsa Setelah 30 Hari"]
    Buy -->|"Ya"| OrderSuccess["Pesanan Sukses Lunas"]
    
    OrderSuccess --> CheckFraud{"Pemeriksaan Anti-Fraud"}
    CheckFraud -->|"Self-referral / Fraud"| Rejected["Komisi Ditolak / Tidak Dibuat"]
    CheckFraud -->|"Valid"| CommRecord["Catat referral_conversions (Komisi 10%, Status: 'pending')"]
    
    CommRecord --> HoldingPeriod["Masa Validasi Transaksi (7-14 Hari)"]
    HoldingPeriod --> CommApproved["Status Komisi: 'approved'"]
    
    CommApproved --> CheckThreshold{"Total Saldo Approved >= Rp50.000?"}
    CheckThreshold -->|"Belum"| KeepAccumulating["Akumulasi Terus di Dashboard"]
    CheckThreshold -->|"Sudah"| ReqPayout["Pengguna Mengajukan Payout (Nomor Rekening & Nama Bank)"]
    
    ReqPayout --> AdminReview["Admin Memeriksa Permohonan di Admin Panel"]
    AdminReview --> AdminTransfer["Admin Transfer Bank & Unggah Bukti Transfer"]
    AdminTransfer --> PayoutDone["Status Payout: 'completed', Saldo Dicairkan"]
```

---

## 7. ALUR MANAJEMEN PANEL ADMIN

```mermaid
flowchart TD
    Admin_Login["Admin Masuk (Verifikasi Role 'admin' / 'super_admin')"] --> Admin_Dash["Dashboard Admin (/admin)"]
    
    Admin_Dash --> Tab1["Manajemen Pesanan & Transaksi"]
    Admin_Dash --> Tab2["Pemberian Hak Akses (Manual Grant / Comped)"]
    Admin_Dash --> Tab3["Persetujuan Payout Affiliate"]
    Admin_Dash --> Tab4["Audit Log Aktivitas Admin"]
    
    Tab1 --> Action1["Cari Pesanan, Periksa Status Pembayaran, Verifikasi"]
    
    Tab2 --> Action2["Pilih Siswa -> Pilih Tier -> Masukkan Alasan -> Grant Access"]
    Action2 --> Log2["Sistem Mencatat ke admin_audit_logs"]
    
    Tab3 --> Action3["Tinjau Permohonan -> Validasi Rekening -> Unggah Bukti -> Set 'completed'"]
    Action3 --> Log3["Sistem Mengurangi Saldo Affiliate & Mencatat Log"]
    
    Tab4 --> Action4["Inspeksi Riwayat Seluruh Tindakan Admin untuk Mencegah Fraud Internal"]
```

---

## 8. MATRIX PENANGANAN ERROR & RECOVERY FLOW

| Skenario Error | Penanganan Sistem | Aksi Pengguna |
| :--- | :--- | :--- |
| **Koneksi Internet Putus Saat Mengisi Workspace** | Data disimpan seketika di peramban via `localStorage` (Optimistic UI). Notifikasi "Menyimpan di perangkat". | Tetap bekerja tanpa takut data hilang; data akan disinkronkan saat terhubung kembali. |
| **Gagal Login dengan Google** | Tangkap error callback Supabase, tampilkan toast pesan jelas (misal: popup diblokir / izin ditolak). | Coba kembali atau gunakan opsi login email & password. |
| **Pembayaran Tertunda / Pending Timeout** | Status order tetap `pending`. Batas waktu pembayaran 24 jam. | Tampilkan nomor invoice dan tombol "Cek Status Pembayaran" atau hubungi admin. |
| **Upaya Self-Referral Terdeteksi** | Sistem memeriksa kecocokan `user_id` pembeli dengan `affiliate_id` rujukan. Jika identik, referral diabaikan. | Pembelian tetap diproses normal, namun tidak ada komisi yang dihasilkan untuk akun sendiri. |
