# Shopee Affiliate Academy

Situs materi pelatihan Shopee Affiliate (5 level, 24 modul) dalam HTML dan CSS statis. Tidak butuh server khusus, database, atau framework.

> Materi pembelajaran, bukan nasihat hukum atau pajak. Aturan Shopee Affiliate bisa berubah, jadi selalu cek sumber resmi. Situs ini bukan situs resmi Shopee.

## Isi

- 5 halaman level dan 24 modul
- 8 Project Praktik Wajib dan panduan Database Notion
- Rangkuman Master, Kamus Istilah, Lembar Rumus dan Template, Studi Kasus, dan Panduan Pelatih

## Fitur

**Nyaman dibaca lama**
- Panel "Pengaturan baca" (tombol Aa): ukuran teks, jarak baris, huruf sans atau serif, lebar teks, dan tema Terang, Sepia, Gelap, atau Auto
- Mode fokus di desktop (menyembunyikan menu) dan bar "sedang membaca" yang menunjukkan bagian aktif dan persentase
- Header dan navigasi bawah menyembunyikan diri saat menggulir ke bawah, muncul lagi saat menggulir ke atas
- Tombol "Lanjutkan membaca" di beranda, perkiraan waktu baca, dan pengingat istirahat tiap 25 menit (bisa dimatikan)
- Konten dibagi menjadi kartu bagian dengan animasi muncul. Semua animasi mengikuti pengaturan "kurangi gerakan" di perangkat

**Belajar interaktif**
- Kunci jawaban tersembunyi dan terbuka saat diketuk, plus tombol "Buka semua jawaban"
- Checklist yang bisa dicentang dengan bar progres per daftar
- Tombol "Tandai modul selesai" dengan konfeti, progres per level di menu, dan kartu progres di beranda. Semua tersimpan di browser (localStorage)
- Tombol "Salin" pada blok rumus

**Navigasi**
- Menu samping per level, daftar isi per halaman, tombol sebelumnya dan berikutnya
- Pencarian materi (tekan `/` untuk fokus ke kolom pencarian). Di ponsel, pencarian tampil layar penuh
- Navigasi bawah dan geser dari tepi kiri untuk membuka menu di ponsel
- Responsif dan siap dicetak

## Melihat secara lokal

Dengan XAMPP: letakkan folder ini di `C:\xampp\htdocs\shopee-affiliate-academy`, jalankan Apache, lalu buka `http://localhost/shopee-affiliate-academy/`.

Tanpa XAMPP, cukup buka `index.html` di browser.

## Menayangkan di GitHub Pages

1. Buat repository baru di GitHub, lalu unggah seluruh isi folder ini.
2. Buka **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**. Pilih branch `main` dan folder `/ (root)`, lalu **Save**.
4. Tunggu beberapa menit. Alamatnya akan berbentuk `https://NAMA-AKUN.github.io/NAMA-REPO/`.

Semua link di situs ini relatif, jadi tetap jalan di alamat subfolder seperti di atas. File `.nojekyll` memastikan GitHub tidak memproses ulang file.

## Mengubah isi materi

Sumber materi ada di folder `sumber-markdown/` (format Markdown). Setelah mengedit, bangun ulang halaman HTML:

```
pip install markdown
python build.py
```

Skrip `build.py` menulis ulang semua file `.html` dan indeks pencarian di `assets/search-index.js`. Jangan mengedit file `.html` langsung, karena akan tertimpa saat build berikutnya.

## Struktur folder

```
index.html            Beranda dan pengantar
master.html           Rangkuman Master
level-1.html … 5      Halaman level
modul/                24 halaman modul
proyek-praktik.html   8 Project Praktik Wajib
database-notion.html  Panduan database Notion
kamus-istilah.html    Kamus Istilah
rumus-template.html   Lembar Rumus dan Template
studi-kasus.html      Studi Kasus Simulasi
panduan-pelatih.html  Panduan Pelatih dan Penilaian
assets/               style.css, app.js, search-index.js, favicon.svg
sumber-markdown/      Sumber materi (Markdown)
build.py              Skrip pembangun situs
```
