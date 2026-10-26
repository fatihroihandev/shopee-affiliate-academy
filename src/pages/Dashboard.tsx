import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { Sparkle, StickerBadge } from '@/components/common/Doodles';
import { BookOpen, Wrench, Share2, Award, ArrowRight, Check, Copy, Zap, Flame, ExternalLink } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { profile, isPremium, user } = useAuth();
  const [copied, setCopied] = useState(false);

  // Generate or fallback referral code
  const referralCode = profile?.display_name
    ? profile.display_name.replace(/\s+/g, '').toUpperCase().slice(0, 8) + 'AFF'
    : 'MYREF10';
  const referralLink = `${window.location.origin}/?ref=${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. WELCOME HEADER */}
      <div className="brutalist-card p-6 sm:p-8 bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-warm-gray uppercase tracking-wider">Ruang Belajar Siswa</span>
            {isPremium ? (
              <StickerBadge variant="orange">PREMIUM MEMBER</StickerBadge>
            ) : (
              <StickerBadge variant="lime">FREE ACCOUNT</StickerBadge>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2">
            Halo, {profile?.display_name || user?.email?.split('@')[0] || 'Sahabat Affiliate'}!
            <Sparkle className="w-5 h-5 text-brand-orange" />
          </h1>
          <p className="text-sm text-warm-gray font-medium max-w-xl">
            Selamat datang di pusat komando belajarmu. Lanjutkan modul pembelajaran atau catat riset di 6 workspace praktismu.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            to="/learn"
            className="brutalist-btn bg-brand-orange text-white px-5 py-3 text-sm gap-2 w-full sm:w-auto"
          >
            <BookOpen className="w-4 h-4" />
            <span>Lanjutkan Belajar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          {!isPremium && (
            <Link
              to="/pricing"
              className="brutalist-btn bg-acid-lime text-ink px-4 py-3 text-sm gap-1.5 w-full sm:w-auto"
            >
              <Zap className="w-4 h-4 text-brand-orange fill-brand-orange" />
              <span>Upgrade Rp99.000</span>
            </Link>
          )}
        </div>
      </div>

      {/* 2. PROGRESS & AFFILIATE BANNER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Milestone */}
        <div className="brutalist-card p-6 bg-surface space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-orange" />
              Progres Kurikulum
            </h3>
            <span className="text-xs font-bold bg-paper px-2 py-0.5 rounded border border-ink">Level 1</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span>Modul Selesai</span>
              <span className="text-brand-orange">1 / 24 Modul</span>
            </div>
            <div className="w-full h-3 bg-paper border-2 border-ink rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-brand-orange rounded-full w-[4%] transition-all"></div>
            </div>
          </div>

          <div className="p-3 bg-paper border-2 border-ink rounded-md text-xs font-medium space-y-1">
            <div className="font-bold text-ink flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-brand-orange" />
              Modul Berikutnya:
            </div>
            <p className="text-warm-gray">M00 Pelajaran 02 — Peta Belajar & 5 Aturan Emas Shopee Affiliate</p>
          </div>

          <Link to="/learn" className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1">
            <span>Buka Indeks Pelajaran</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Affiliate Quick Card */}
        <div className="brutalist-card p-6 bg-surface space-y-4 lg:col-span-2">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-base flex items-center gap-2">
              <Share2 className="w-5 h-5 text-brand-orange" />
              Program Kemitraan Affiliate (Komisi 10%)
            </h3>
            <StickerBadge variant="lime">KOMISI AKTIF</StickerBadge>
          </div>

          <p className="text-xs text-warm-gray leading-relaxed">
            Dapatkan komisi flat 10% setiap kali ada yang membeli paket Premium melalui link referral pribadimu. Berlaku untuk akun Free dan Premium!
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="brutalist-input w-full px-3 py-2 text-xs font-mono bg-paper text-ink"
            />
            <button
              onClick={handleCopyLink}
              className="brutalist-btn bg-acid-lime text-ink px-4 py-2 text-xs font-bold gap-1.5 shrink-0 w-full sm:w-auto"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-ink" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-ink" />
                  <span>Salin Link</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="font-medium text-warm-gray">Saldo Tersedia: <strong className="text-ink">Rp0</strong> (Min. cair Rp50.000)</span>
            <Link to="/affiliate" className="font-bold text-brand-orange hover:underline flex items-center gap-1">
              <span>Buka Dasbor Affiliate</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. ENAM WORKSPACE PRAKTIK */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-ink flex items-center gap-2">
            <Wrench className="w-5 h-5 text-brand-orange" />
            Enam Workspace Digital Anda
          </h2>
          <span className="text-xs font-bold text-warm-gray hidden sm:inline-block">Tersinkronisasi Otomatis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/tools/products" className="brutalist-card p-5 bg-surface hover:bg-paper space-y-2 group">
            <div className="flex justify-between items-start">
              <span className="font-extrabold text-base group-hover:text-brand-orange transition-colors">1. Product Research Lab</span>
              <span className="text-xs font-bold bg-acid-lime px-2 py-0.5 rounded border border-ink">Skor 7 Faktor</span>
            </div>
            <p className="text-xs text-warm-gray leading-relaxed">
              Catat calon produk, evaluasi bobot 0–100, dan kelompokkan status riset hingga siap promosi.
            </p>
          </Link>

          <Link to="/tools/research-notes" className="brutalist-card p-5 bg-surface hover:bg-paper space-y-2 group">
            <div className="flex justify-between items-start">
              <span className="font-extrabold text-base group-hover:text-brand-orange transition-colors">2. Research Notes</span>
              <span className="text-xs font-bold bg-paper px-2 py-0.5 rounded border border-ink">P01 & P03</span>
            </div>
            <p className="text-xs text-warm-gray leading-relaxed">
              Catat 10 masalah nyata audiens dan bedah 10 kompetitor untuk menemukan celah konten pembeda.
            </p>
          </Link>

          <Link to="/tools/content" className="brutalist-card p-5 bg-surface hover:bg-paper space-y-2 group">
            <div className="flex justify-between items-start">
              <span className="font-extrabold text-base group-hover:text-brand-orange transition-colors">3. Content Studio</span>
              <span className="text-xs font-bold bg-soft-coral px-2 py-0.5 rounded border border-ink">30+ Hook</span>
            </div>
            <p className="text-xs text-warm-gray leading-relaxed">
              Susun naskah video dengan Hook Bank bawaan dan validasi 11 butir checklist QC publikasi.
            </p>
          </Link>

          <Link to="/tools/planner" className="brutalist-card p-5 bg-surface hover:bg-paper space-y-2 group">
            <div className="flex justify-between items-start">
              <span className="font-extrabold text-base group-hover:text-brand-orange transition-colors">4. Content Planner</span>
              <span className="text-xs font-bold bg-paper px-2 py-0.5 rounded border border-ink">Sprint 14 Hari</span>
            </div>
            <p className="text-xs text-warm-gray leading-relaxed">
              Kalender jadwal tayang terstruktur dengan alur 9 tahapan kerja produksi konten.
            </p>
          </Link>

          <Link to="/tools/links" className="brutalist-card p-5 bg-surface hover:bg-paper space-y-2 group">
            <div className="flex justify-between items-start">
              <span className="font-extrabold text-base group-hover:text-brand-orange transition-colors">5. Link Archive</span>
              <span className="text-xs font-bold bg-paper px-2 py-0.5 rounded border border-ink">Anti-Link Mati</span>
            </div>
            <p className="text-xs text-warm-gray leading-relaxed">
              Arsipkan tautan affiliate per produk dan pantau tanggal verifikasi keaktifan toko.
            </p>
          </Link>

          <Link to="/tools/tracker" className="brutalist-card p-5 bg-surface hover:bg-paper space-y-2 group">
            <div className="flex justify-between items-start">
              <span className="font-extrabold text-base group-hover:text-brand-orange transition-colors">6. Performance Tracker</span>
              <span className="text-xs font-bold bg-brand-orange text-white px-2 py-0.5 rounded border border-ink">Metrik Baku</span>
            </div>
            <p className="text-xs text-warm-gray leading-relaxed">
              Hitung CTR, CVR, EPC, evaluasi 4 status komisi, dan catat hasil eksperimen A/B.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
