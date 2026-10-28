# DEVELOPMENT GUIDE & CODEBASE STANDARDS
## SHOPEE AFFILIATE ACADEMY PLATFORM

Panduan ini ditujukan bagi pengembang (*software engineers*) yang akan memelihara, memperluas, dan mengembangkan platform Shopee Affiliate Academy.

---

## 1. PRASYARAT LINGKUNGAN PENGEMBANGAN (PREREQUISITES)

Pastikan lingkungan kerja lokal Anda telah terpasang perangkat lunak berikut:
- **Node.js:** Versi `>= 18.18.0` (Direkomendasikan Node.js 20 LTS).
- **Package Manager:** `npm` versi `>= 9.0.0` (bawaan Node.js).
- **Git:** Versi `>= 2.30.0`.
- **Supabase CLI (Opsional untuk migrasi lokal):** `supabase` v1.100+.
- **IDE:** Visual Studio Code (dengan ekstensi *Tailwind CSS IntelliSense*, *ESLint*, dan *Pretty TypeScript Errors*).

---

## 2. PANDUAN MEMULAI CEPAT (QUICK START)

### Langkah 1: Kloning Repositori
```bash
git clone <URL_REPOSITORI_ANDA>
cd shopee-affiliate-academy
```

### Langkah 2: Pemasangan Dependensi
```bash
npm install
```

### Langkah 3: Konfigurasi Environment Variables
Salin berkas `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

Isi variabel lingkungan berikut di `.env`:
```env
# URL Instance Supabase
VITE_SUPABASE_URL=https://your-project-id.supabase.co

# Kunci Anonim Publik Supabase (Aman digunakan di Frontend via RLS)
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...

# URL Callback Aplikasi Lokal
VITE_SITE_URL=http://localhost:5173
```

### Langkah 4: Menjalankan Server Pengembangan Lokal
```bash
npm run dev
```
Aplikasi akan aktif di `http://localhost:5173`.

---

## 3. SKRIP PROYEK (NPM SCRIPTS)

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server pengembangan Vite dengan Hot Module Replacement (HMR). |
| `npm run build` | Melakukan type-check TypeScript (`tsc -b`) dan kompilasi build produksi ke folder `dist/`. |
| `npm run preview` | Menjalankan preview lokal dari berkas build produksi di folder `dist/`. |

---

## 4. KONVENSI PENULISAN KODE (CODING STANDARDS)

### 4.1 TypeScript Strictness & Type Safety
1. Seluruh kode baru wajib ditulis dalam TypeScript (`.ts` atau `.tsx`).
2. Hindari penggunaan tipe `any`. Gunakan tipe spesifik, generik, atau union types.
3. Seluruh skema tabel database wajib mereferensikan tipe di `src/types/database.ts`.
4. Komponen fungsional React dideklarasikan dengan tipe `React.FC<Props>` atau fungsi bertipe parameter eksplisit.

```typescript
// CONTOH YANG BENAR:
interface ProductCardProps {
  product: AffiliateProduct;
  onSelect: (productId: string) => void;
  isCompact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, isCompact = false }) => {
  // Implementasi komponen...
};
```

### 4.2 Tailwind CSS & Komponen Brutalist Doodle
Platform ini menggunakan estetika *Playful Editorial Brutalist*. Ikuti panduan kelas Tailwind berikut:
- **Border Tegas:** Gunakan `border-2 border-ink` atau `border-3 border-ink` (`#171717`).
- **Hard Shadow:** Gunakan utility bayangan tanpa blur: `shadow-[4px_4px_0px_#171717]` atau `shadow-[6px_6px_0px_#FF5722]`.
- **Card Styling:** Manfaatkan kelas helper `.brutalist-card` atau susunan `bg-surface border-2 border-ink rounded-lg shadow-[4px_4px_0px_#171717]`.
- **Badge Doodles:** Selalu gunakan komponen pembungkus `<StickerBadge>` atau `<Sparkle>` dari `@/components/common/Doodles` untuk konsistensi visual.

### 4.3 Struktur Ekspor & Aliasing Path
Vite dikonfigurasi dengan path alias `@/*` yang merujuk langsung ke direktori `src/*`:
```typescript
// Selalu gunakan import berbasis alias:
import { useAuth } from '@/features/auth/AuthContext';
import { Button } from '@/components/ui/Button';
import { AffiliateProduct } from '@/types/database';

// HINDARI import relatif berjenjang:
// import { Button } from '../../../components/ui/Button'; // JANGAN
```

---

## 5. POLA MANAJEMEN STATE & DUAL-LAYER STORAGE

Aplikasi menerapkan pola **Optimistic UI + Fallback Storage**:
1. **Pembaruan State Cepat:** Ketika pengguna menambah/mengedit data (misal di *Product Research Lab*), update `React State` secara instan dan simpan ke `localStorage` via modul `workspaceStorage.ts`.
2. **Sinkronisasi Supabase:** Jika pengguna terotentikasi, trigger pengiriman query mutasi asinkron ke Supabase via RLS.
3. **Penanganan Offline:** Jika query Supabase gagal akibat koneksi internet terputus, data tetap aman di `localStorage` dan aplikasi tidak menampilkan layar putih (*crash*).

```typescript
// Pola penggunaan di komponen Workspace:
const [products, setProducts] = useState<AffiliateProduct[]>(getStoredProducts());

const handleAddProduct = (newProduct: AffiliateProduct) => {
  // 1. Update State Lokal
  setProducts(prev => [newProduct, ...prev]);
  // 2. Simpan ke Cache Lokal (Optimistic)
  saveStoredProduct(newProduct);
  // 3. Sinkronisasi ke Database Cloud jika login
  if (user) {
    supabase.from('affiliate_products').insert(newProduct).catch(err => {
      console.warn('Gagal sync ke cloud, data tersimpan lokal:', err);
    });
  }
};
```

---

## 6. PANDUAN PENGEMBANGAN DATABASE & MIGRASI (SUPABASE)

Seluruh perubahan struktur skema database harus melalui berkas migrasi SQL pada folder `supabase/migrations/`:
1. Format penamaan berkas: `YYYYMMDDHHMMSS_nama_deskriptif.sql`.
2. Setiap tabel baru **WAJIB** menyertakan:
   - Kolom `created_at` dan `updated_at` bertipe `TIMESTAMPTZ`.
   - Primary Key `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`.
   - Foreign Key berelasi dengan `ON DELETE CASCADE` atau `ON DELETE SET NULL`.
   - Perintah `ALTER TABLE public.nama_tabel ENABLE ROW LEVEL SECURITY;`.
   - Kebijakan RLS eksplisit untuk `SELECT`, `INSERT`, `UPDATE`, dan `DELETE`.

Untuk menerapkan migrasi lokal via Supabase CLI:
```bash
supabase db reset    # Me-reset database lokal dan mengeksekusi semua migrasi
supabase db push     # Mendorong migrasi ke remote Supabase instance
```

---

## 7. ALUR KERJA GIT & PULL REQUEST

1. **Branching Model:**
   - `main`: Branch produksi yang selalu siap dideploy ke Cloudflare Pages.
   - `staging`: Branch integrasi pengujian pra-rilis.
   - `feature/<nama-fitur>`: Branch fitur baru dari developer.
   - `fix/<nama-bug>`: Branch perbaikan masalah.
2. **Konvensi Pesan Commit (Conventional Commits):**
   - `feat: tambah filter kategori di product research lab`
   - `fix: perbaiki validasi form checkout qr code`
   - `docs: perbarui panduan instalasi di development guide`
   - `refactor: optimasi bundle splitting di vite config`
3. **Checklist Sebelum Membuat Pull Request:**
   - [ ] Jalankan `npm run build` dan pastikan tidak ada error kompilasi TypeScript.
   - [ ] Periksa bahwa seluruh link internal dan routing berjalan mulus.
   - [ ] Pastikan tidak ada credential sensitif (API secret key) yang ter-commit ke git.
