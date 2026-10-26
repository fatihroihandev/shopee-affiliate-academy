import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkle, CurvedArrow, WavyUnderline, StickerBadge } from '@/components/common/Doodles';
import { BookOpen, CheckCircle2, ArrowRight, ShieldCheck, Flame, BarChart3, Wrench, Share2, Award } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          {/* Top Badge */}
          <div className="flex items-center justify-center gap-2">
            <StickerBadge variant="lime" rotate="-rotate-2">
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-brand-orange" />
                KURIKULUM SHOPEE AFFILIATE V2.0
              </span>
            </StickerBadge>
            <StickerBadge variant="coral" rotate="rotate-2">SIAP PUBLIKASI</StickerBadge>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] text-ink">
            Bangun Bisnis Shopee Affiliate{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10 text-brand-orange">Berdasarkan Data,</span>
              <WavyUnderline className="absolute -bottom-2 left-0 text-brand-orange w-full" />
            </span>{' '}
            Bukan Sekadar Tebakan.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-warm-gray font-medium max-w-2xl mx-auto leading-relaxed">
            Platform belajar mandiri terlengkap dengan <strong className="text-ink">24 modul materi</strong>, <strong className="text-ink">6 workspace kerja digital</strong> terintegrasi, dan <strong className="text-ink">8 proyek praktik wajib</strong>.
          </p>

          {/* CTA Group */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="brutalist-btn bg-brand-orange text-white text-base px-8 py-3.5 gap-2 w-full sm:w-auto"
            >
              <span>Mulai Belajar Gratis</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/learn"
              className="brutalist-btn bg-surface text-ink text-base px-6 py-3.5 gap-2 w-full sm:w-auto hover:bg-paper"
            >
              <BookOpen className="w-5 h-5 text-brand-orange" />
              <span>Lihat Kurikulum</span>
            </Link>
          </div>

          {/* Subtle Annotations */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-bold text-warm-gray">
            <CurvedArrow className="w-8 h-4 rotate-12 text-brand-orange hidden sm:inline-block" />
            <span>Tanpa modal stok barang • Akses modul orientasi M00 gratis • Garansi materi teruji</span>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION: 4 PILAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="brutalist-card p-6 bg-surface space-y-3">
            <div className="w-12 h-12 bg-acid-lime border-2 border-ink rounded-lg flex items-center justify-center shadow-[2px_2px_0px_#171717]">
              <BookOpen className="w-6 h-6 text-ink" />
            </div>
            <h3 className="font-extrabold text-lg">24 Modul Sistematis</h3>
            <p className="text-sm text-warm-gray leading-relaxed">
              Jalur belajar 5 level dari fundamental akun, riset produk, produksi konten, hingga strategi scaling multi-channel.
            </p>
          </div>

          <div className="brutalist-card p-6 bg-surface space-y-3">
            <div className="w-12 h-12 bg-brand-orange border-2 border-ink rounded-lg flex items-center justify-center shadow-[2px_2px_0px_#171717]">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-extrabold text-lg">6 Workspace Digital</h3>
            <p className="text-sm text-warm-gray leading-relaxed">
              Tidak butuh template Notion yang rumit. Riset produk, bank hook, kalender 30 hari, dan link archive langsung di satu web.
            </p>
          </div>

          <div className="brutalist-card p-6 bg-surface space-y-3">
            <div className="w-12 h-12 bg-soft-coral border-2 border-ink rounded-lg flex items-center justify-center shadow-[2px_2px_0px_#171717]">
              <Award className="w-6 h-6 text-ink" />
            </div>
            <h3 className="font-extrabold text-lg">8 Proyek Praktik Wajib</h3>
            <p className="text-sm text-warm-gray leading-relaxed">
              Buktikan pemahamanmu lewat bukti nyata: riset niche, audit 10 kompetitor, naskah konten, hingga eksperimen A/B valid.
            </p>
          </div>

          <div className="brutalist-card p-6 bg-surface space-y-3">
            <div className="w-12 h-12 bg-acid-lime border-2 border-ink rounded-lg flex items-center justify-center shadow-[2px_2px_0px_#171717]">
              <Share2 className="w-6 h-6 text-ink" />
            </div>
            <h3 className="font-extrabold text-lg">Program Affiliate 10%</h3>
            <p className="text-sm text-warm-gray leading-relaxed">
              Ajak teman belajar di platform ini dan dapatkan komisi 10% per penjualan terverifikasi. Terbuka untuk akun Free & Pro.
            </p>
          </div>
        </div>
      </section>

      {/* 3. WORKSPACE TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="brutalist-card p-8 sm:p-12 bg-surface">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <StickerBadge variant="orange">ALL-IN-ONE WORKSPACE</StickerBadge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
                Tinggalkan Spreadsheet Berantakan. Beralih ke Workspace Terpadu.
              </h2>
              <p className="text-warm-gray font-medium leading-relaxed">
                Semua data kerjamu saling terhubung otomatis: produk terpilih di Lab Riset langsung muncul saat menulis skrip di Content Studio, tautan affiliate terhubung ke kalender planner, dan performa harian dievaluasi dengan formula CTR, CVR, dan EPC.
              </p>
              <div className="space-y-2 text-sm font-bold text-ink">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                  <span>Kalkulator Riset Produk 7 Faktor (Skor 0–100 Berbobot)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                  <span>Hook Bank 30+ Formula & Generator Kerangka Skrip</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                  <span>Performance Tracker dengan 4 Status Komisi Terpisah</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  to="/tools/products"
                  className="brutalist-btn bg-acid-lime text-ink px-6 py-3 text-sm gap-2"
                >
                  <span>Jelajahi 6 Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-paper border-2 border-ink rounded-lg p-6 shadow-[4px_4px_0px_#171717] space-y-4">
              <div className="flex items-center justify-between border-b-2 border-ink pb-3">
                <span className="font-extrabold text-sm uppercase flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-brand-orange" />
                  Live Preview: Performance Tracker
                </span>
                <span className="text-xs bg-brand-orange text-white font-bold px-2 py-0.5 rounded">STANDAR RESMI</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-surface border-2 border-ink rounded-md">
                  <div className="text-xs text-warm-gray font-semibold">CTR Rata-rata</div>
                  <div className="text-lg font-extrabold text-ink">4.8%</div>
                </div>
                <div className="p-3 bg-surface border-2 border-ink rounded-md">
                  <div className="text-xs text-warm-gray font-semibold">CVR Pesanan</div>
                  <div className="text-lg font-extrabold text-ink">3.2%</div>
                </div>
                <div className="p-3 bg-surface border-2 border-ink rounded-md">
                  <div className="text-xs text-warm-gray font-semibold">EPC Bersih</div>
                  <div className="text-lg font-extrabold text-brand-orange">Rp420</div>
                </div>
                <div className="p-3 bg-surface border-2 border-ink rounded-md">
                  <div className="text-xs text-warm-gray font-semibold">Komisi Valid</div>
                  <div className="text-lg font-extrabold text-acid-lime bg-ink px-1 rounded">Disetujui</div>
                </div>
              </div>
              <div className="text-xs text-warm-gray bg-surface p-3 rounded border border-ink/30 italic">
                *Empat status komisi (Estimasi, Pending, Disetujui, Dibayarkan) dicatat terpisah dan tidak pernah dijumlahkan sembarangan.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICING SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center" id="pricing">
        <div className="space-y-3">
          <StickerBadge variant="coral">PILIHAN AKSES</StickerBadge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-ink">
            Biaya Transparan. Sekali Bayar.
          </h2>
          <p className="text-warm-gray font-medium max-w-xl mx-auto">
            Mulai eksplorasi gratis hari ini, upgrade ke Premium saat kamu siap membangun sistem bisnis affiliate jangka panjang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left pt-4">
          {/* Paket Free */}
          <div className="brutalist-card p-8 bg-surface space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-xl">Paket Free</span>
                <span className="text-xs font-bold uppercase bg-paper border border-ink px-2.5 py-1 rounded">Dasar</span>
              </div>
              <div className="text-4xl font-extrabold text-ink">Rp0</div>
              <p className="text-sm text-warm-gray">Cocok untuk memahami gambaran awal Shopee Affiliate sebelum berinvestasi.</p>
              <hr className="border-ink/20" />
              <ul className="space-y-2.5 text-sm font-semibold text-ink">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-acid-lime fill-ink" />
                  <span>4 Pelajaran M00 — Start Here (Lengkap)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-acid-lime fill-ink" />
                  <span>Preview Lengkap Modul 01 (Dasar Affiliate)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-acid-lime fill-ink" />
                  <span>Preview Terbatas 6 Workspace (3 Item)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-acid-lime fill-ink" />
                  <span>Hak Menjadi Affiliate Platform (Komisi 10%)</span>
                </li>
              </ul>
            </div>
            <Link
              to="/register"
              className="brutalist-btn bg-paper text-ink w-full py-3 text-sm hover:bg-surface"
            >
              Daftar Gratis
            </Link>
          </div>

          {/* Paket Premium */}
          <div className="brutalist-card p-8 bg-surface space-y-6 flex flex-col justify-between relative border-brand-orange border-4">
            <div className="absolute -top-3.5 right-6">
              <StickerBadge variant="orange">PROMO PELUNCURAN</StickerBadge>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-xl flex items-center gap-1.5">
                  Paket Premium
                  <Sparkle className="w-4 h-4 text-brand-orange" />
                </span>
                <span className="text-xs font-bold text-warm-gray line-through">Rp149.000</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-brand-orange">Rp99.000</span>
                <span className="text-xs font-bold text-warm-gray uppercase">/ Sekali Bayar</span>
              </div>
              <p className="text-sm text-warm-gray">Akses jangka panjang ke seluruh materi premium, 6 workspace penuh, dan 8 proyek praktik.</p>
              <hr className="border-ink/20" />
              <ul className="space-y-2.5 text-sm font-semibold text-ink">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange fill-brand-orange text-white" />
                  <span>Seluruh 24 Modul Materi Kurikulum V2.0</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange fill-brand-orange text-white" />
                  <span>8 Proyek Praktik Wajib & Pelacak Kelulusan</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange fill-brand-orange text-white" />
                  <span>Akses Penuh 6 Workspace Tanpa Batasan Item</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange fill-brand-orange text-white" />
                  <span>Hook Bank 30+ Formula & Template Skrip Konten</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange fill-brand-orange text-white" />
                  <span>Pembaruan Materi & Akses Komunitas Siswa</span>
                </li>
              </ul>
            </div>
            <Link
              to="/register"
              className="brutalist-btn bg-brand-orange text-white w-full py-3.5 text-sm font-extrabold"
            >
              Beli Akses Premium Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FIVE GOLDEN RULES */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 bg-paper border-2 border-ink rounded-lg shadow-[4px_4px_0px_#171717] space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-orange" />
            <h3 className="font-extrabold text-lg text-ink">Komitmen & 5 Aturan Emas Kami</h3>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-sm text-warm-gray font-medium leading-relaxed">
            <li><strong className="text-ink">Aturan resmi dulu:</strong> Kami selalu merujuk pada aturan program Shopee resmi.</li>
            <li><strong className="text-ink">Jujur dan orisinal:</strong> Jangan pernah review barang yang belum pernah kamu coba. Wajib sertakan disclosure link affiliate.</li>
            <li><strong className="text-ink">Data sebelum keputusan:</strong> Jangan menyimpulkan hasil hanya dari 1 video atau 1 hari sepi.</li>
            <li><strong className="text-ink">Satu hal sekaligus:</strong> Kuasai 1 channel utama dan uji 1 variabel per eksperimen.</li>
            <li><strong className="text-ink">Anti-klaim instan:</strong> Kami tidak pernah menjanjikan hasil pasti kaya atau omzet tertentu. Hasil bergantung pada konsistensi dan eksekusimu.</li>
          </ol>
        </div>
      </section>
    </div>
  );
};
