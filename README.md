# Shopee Affiliate Academy Platform (v2.0 + Addendum v2.1)

> **PROPRIETARY & CONFIDENTIAL SOFTWARE**  
> Hak cipta terpelihara © 2026 Shopee Affiliate Academy.  
> Seluruh kode sumber, arsitektur, aset desain, dan materi kurikulum di dalam repositori ini dilindungi oleh undang-undang hak cipta. Dilarang keras menyalin, mengunduh ulang, membagikan, menerbitkan kembali, atau mendistribusikan sistem ini kepada pihak ketiga tanpa izin tertulis dari pemilik hak cipta.

---

## 📌 Ringkasan Sistem
Shopee Affiliate Academy adalah platform edukasi interaktif dan ekosistem workspace lengkap untuk praktisi affiliate marketing Indonesia:
- **Kurikulum 24 Modul** (M00 s/d M06) mencakup Fundamental, Riset Produk, Content Engineering, Ads, hingga Scale-up.
- **8 Proyek Praktik Nyata** (P01 s/d P08) dengan lembar kerja terstruktur dan ekspor PDF.
- **3 Bonus Eksklusif Pro Plus**: *Campaign-in-a-Box*, *Case Study Lab*, dan *Content Angle Playbook*.
- **8 Interactive Workspaces**: Product Research Lab, Research Notes, Content Studio, Content Planner, Link Archive, Performance Tracker, Experiment Tracker, SOP Hub.
- **Multi-Role & 3-Tier Access**: Free, Pro (Rp99k), dan Pro Plus (Rp199k) + Dual Admin (Utama & Backup) dengan kemampuan grant akses VIP (Rp0).
- **SEO & Production Ready**: Schema.org JSON-LD, OpenGraph, Canonical domain `https://affiliateacademy.site`, dan Cloudflare Pages redirects.

---

## 🚀 Setup Pengembangan Lokal

### 1. Prasyarat
- Node.js (v18 atau lebih tinggi)
- npm / yarn / pnpm

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Lingkungan (`.env`)
Salin file `.env.example` menjadi `.env` lalu sesuaikan kredensial Supabase Anda:
```bash
cp .env.example .env
```
Isi konfigurasi dalam `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_APP_NAME="Shopee Affiliate Academy"
VITE_APP_URL="http://localhost:3000"
```

### 4. Jalankan Server Development
```bash
npm run dev
```

### 5. Build Produksi
```bash
npm run build
```
Hasil build siap di-deploy ke Cloudflare Pages atau hosting statis dari direktori `dist/`.

---

## 🔒 Lisensi & Ketentuan
Sistem ini berlisensi **UNLICENSED (Proprietary)**. Lihat berkas [`LICENSE`](./LICENSE) untuk rincian legal lengkap.
