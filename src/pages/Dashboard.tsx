import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { StickerBadge } from '@/components/common/Doodles';
import {
  BookOpen, Wrench, Share2, Award, ArrowRight, Check, Copy,
  Zap, Flame, ExternalLink, TrendingUp, Target, Clock, ChevronRight,
} from 'lucide-react';
import { useLessonProgress } from '@/features/learning/useLessonProgress';
import { getOrCreateAffiliateProfile, getStoredReferralConversions } from '@/features/affiliate/affiliateStorage';
import { LESSONS, MODULES } from '@/data/curriculumData';
import { usePageTitle } from '@/hooks/usePageTitle';

// Workspace config
const WORKSPACES = [
  {
    to: '/tools/products',
    num: '01',
    title: 'Product Research Lab',
    badge: 'Skor 7 Faktor',
    badgeColor: 'bg-acid-lime',
    desc: 'Evaluasi bobot produk 0–100 dan kelompokkan status riset hingga siap promosi.',
  },
  {
    to: '/tools/research-notes',
    num: '02',
    title: 'Research Notes',
    badge: 'P01 & P03',
    badgeColor: 'bg-paper',
    desc: 'Catat 10 masalah nyata audiens dan bedah kompetitor untuk menemukan celah konten.',
  },
  {
    to: '/tools/content',
    num: '03',
    title: 'Content Studio',
    badge: '30+ Hook',
    badgeColor: 'bg-soft-coral',
    desc: 'Susun naskah video dengan Hook Bank bawaan dan validasi 11 butir checklist QC.',
  },
  {
    to: '/tools/planner',
    num: '04',
    title: 'Content Planner',
    badge: 'Sprint 14 Hari',
    badgeColor: 'bg-paper',
    desc: 'Kalender jadwal tayang terstruktur dengan alur 9 tahapan kerja produksi konten.',
  },
  {
    to: '/tools/links',
    num: '05',
    title: 'Link Archive',
    badge: 'Anti-Link Mati',
    badgeColor: 'bg-paper',
    desc: 'Arsipkan tautan affiliate per produk dan pantau tanggal verifikasi keaktifan toko.',
  },
  {
    to: '/tools/tracker',
    num: '06',
    title: 'Performance Tracker',
    badge: 'Metrik Baku',
    badgeColor: 'bg-brand-orange text-white',
    desc: 'Hitung CTR, CVR, EPC, evaluasi 4 status komisi, dan catat hasil eksperimen A/B.',
  },
];

export const Dashboard: React.FC = () => {
  usePageTitle('Dasbor Siswa', 'Dasbor progres belajar, pelacakan proyek praktik, dan status paket Shopee Affiliate Academy.');
  const { profile, tier, isPremium, isProPlus, user } = useAuth();
  const [copied, setCopied] = useState(false);
  const { completedLessonIds, loading: progressLoading } = useLessonProgress();

  // --- Dynamic progress calculation ---
  const totalLessons = useMemo(() => LESSONS.filter((l) => l.is_published).length, []);
  const completedCount = completedLessonIds.length;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Current module level
  const currentModule = useMemo(() => {
    if (completedCount === 0) return MODULES[0];
    const lastCompletedId = completedLessonIds[completedLessonIds.length - 1];
    const lastLesson = LESSONS.find((l) => l.id === lastCompletedId);
    if (!lastLesson) return MODULES[0];
    const mod = MODULES.find((m) => m.id === lastLesson.module_id);
    return mod || MODULES[0];
  }, [completedLessonIds]);

  // Next lesson to study
  const nextLesson = useMemo(() => {
    return LESSONS.find((l) => l.is_published && !completedLessonIds.includes(l.id));
  }, [completedLessonIds]);

  // --- Affiliate data ---
  const userId = user?.id || 'demo-user';
  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'Member';
  const [affiliateProfile, setAffiliateProfile] = useState(() =>
    getOrCreateAffiliateProfile(userId, displayName)
  );

  useEffect(() => {
    const fresh = getOrCreateAffiliateProfile(userId, displayName);
    setAffiliateProfile(fresh);
  }, [userId, displayName]);

  const referralCode = affiliateProfile.referral_code;
  const referralLink = `${window.location.origin}/?ref=${referralCode}`;

  // Affiliate earnings summary
  const conversions = useMemo(() => {
    const all = getStoredReferralConversions();
    return all.filter((c) => c.affiliate_id === affiliateProfile.id);
  }, [affiliateProfile.id]);

  const approvedEarnings = useMemo(
    () => conversions.filter((c) => c.status === 'approved').reduce((sum, c) => sum + c.commission_amount, 0),
    [conversions]
  );
  const pendingEarnings = useMemo(
    () => conversions.filter((c) => c.status === 'pending').reduce((sum, c) => sum + c.commission_amount, 0),
    [conversions]
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatRupiah = (n: number) =>
    'Rp' + n.toLocaleString('id-ID');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-20 lg:pb-8">

      {/* ── 1. WELCOME HEADER ── */}
      <div className="brutalist-card p-5 sm:p-7 bg-surface flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-warm-gray uppercase tracking-widest">Pusat Komando</span>
            {tier === 'pro_plus' ? (
              <StickerBadge variant="coral">PRO PLUS MEMBER ⚡</StickerBadge>
            ) : isPremium ? (
              <StickerBadge variant="orange">PRO MEMBER</StickerBadge>
            ) : (
              <StickerBadge variant="lime">FREE ACCOUNT</StickerBadge>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">
            Halo, {displayName}! 👋
          </h1>
          <p className="text-sm text-warm-gray font-medium max-w-lg leading-relaxed">
            Lanjutkan belajar, pantau progres, dan gunakan 6 workspace digital untuk memaksimalkan komisi Shopee-mu.
          </p>
        </div>

        <div className="flex flex-row sm:flex-col items-start sm:items-end gap-3">
          <Link
            to="/learn"
            className="brutalist-btn bg-brand-orange text-white px-5 py-2.5 text-sm gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Lanjutkan Belajar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          {!isProPlus && (
            <Link
              to="/pricing"
              className="brutalist-btn bg-acid-lime text-ink px-4 py-2.5 text-sm gap-1.5"
            >
              <Zap className="w-4 h-4 text-brand-orange fill-brand-orange" />
              <span>{isPremium ? 'Upgrade ke Pro Plus' : 'Upgrade Rp99.000'}</span>
            </Link>
          )}
        </div>
      </div>

      {/* ── 2. STATS ROW ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Progress */}
        <div className="brutalist-card p-4 bg-surface col-span-2 lg:col-span-1 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-warm-gray uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Progress Belajar
          </div>
          <div className="text-3xl font-extrabold text-ink">
            {progressLoading ? '—' : `${progressPct}%`}
          </div>
          <div className="text-xs text-warm-gray">
            {completedCount} / {totalLessons} pelajaran selesai
          </div>
          <div className="w-full h-2 bg-paper border border-ink rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-brand-orange rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Module level */}
        <div className="brutalist-card p-4 bg-surface space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-warm-gray uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            Modul Aktif
          </div>
          <div className="text-xl font-extrabold text-ink leading-tight">{currentModule.code}</div>
          <div className="text-xs text-warm-gray leading-snug line-clamp-2">{currentModule.title}</div>
        </div>

        {/* Approved earnings */}
        <div className="brutalist-card p-4 bg-surface space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-warm-gray uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            Komisi Disetujui
          </div>
          <div className="text-xl font-extrabold text-ink">{formatRupiah(approvedEarnings)}</div>
          {pendingEarnings > 0 && (
            <div className="text-xs text-warm-gray">+{formatRupiah(pendingEarnings)} pending</div>
          )}
        </div>

        {/* Referral conversions */}
        <div className="brutalist-card p-4 bg-surface space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-warm-gray uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Total Konversi
          </div>
          <div className="text-xl font-extrabold text-ink">{conversions.length}</div>
          <div className="text-xs text-warm-gray">
            {conversions.filter((c) => c.status === 'pending').length} menunggu verifikasi
          </div>
        </div>
      </div>

      {/* ── 3. PROGRESS + AFFILIATE CARDS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Curriculum progress detail */}
        <div className="brutalist-card p-5 bg-surface space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-base flex items-center gap-2">
              <Flame className="w-5 h-5 text-brand-orange" />
              Progres Kurikulum
            </h3>
            <span className="text-xs font-bold bg-paper px-2 py-0.5 rounded border border-ink">
              {currentModule.code}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span>Pelajaran Selesai</span>
              <span className="text-brand-orange">{completedCount} / {totalLessons} Pelajaran</span>
            </div>
            <div className="w-full h-3 bg-paper border-2 border-ink rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-brand-orange rounded-full transition-all duration-700"
                style={{ width: `${Math.max(progressPct, 1)}%` }}
              />
            </div>
          </div>

          {nextLesson ? (
            <div className="p-3 bg-paper border-2 border-ink rounded-md text-xs font-medium space-y-1">
              <div className="font-bold text-ink flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-orange" />
                Pelajaran Berikutnya:
              </div>
              <p className="text-warm-gray leading-relaxed line-clamp-2">{nextLesson.title}</p>
              <p className="text-warm-gray">Est. {nextLesson.estimated_minutes || 10} menit</p>
            </div>
          ) : (
            <div className="p-3 bg-acid-lime border-2 border-ink rounded-md text-xs font-bold text-ink">
              🎉 Semua pelajaran selesai! Mantap!
            </div>
          )}

          <Link to="/learn" className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1">
            <span>Buka Indeks Pelajaran</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Affiliate quick card */}
        <div className="brutalist-card p-5 bg-surface space-y-4 lg:col-span-2">
          <div className="flex justify-between items-start">
            <h3 className="font-extrabold text-base flex items-center gap-2">
              <Share2 className="w-5 h-5 text-brand-orange" />
              Program Affiliat Akademi
            </h3>
            <span className={`text-xs font-bold px-2 py-0.5 rounded border border-ink ${affiliateProfile.is_active ? 'bg-acid-lime text-ink' : 'bg-paper text-warm-gray'}`}>
              {affiliateProfile.is_active ? 'AKTIF' : 'NONAKTIF'}
            </span>
          </div>

          {/* Kode Referral */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-warm-gray uppercase tracking-wider">Kode Referral Unikmu</span>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-paper border-2 border-ink rounded-md px-3 py-2 font-mono font-extrabold text-base tracking-widest text-ink">
                {referralCode}
              </div>
              <button
                onClick={handleCopyLink}
                className="brutalist-btn bg-surface text-ink px-3 py-2 text-xs gap-1.5 whitespace-nowrap"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Tersalin!' : 'Salin Link'}
              </button>
            </div>
            <p className="text-xs text-warm-gray font-mono truncate">{referralLink}</p>
          </div>

          {/* Earnings breakdown */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-paper border-2 border-ink rounded-md p-3 text-center space-y-0.5">
              <div className="text-xs font-bold text-warm-gray">Disetujui</div>
              <div className="text-base font-extrabold text-ink">{formatRupiah(approvedEarnings)}</div>
            </div>
            <div className="bg-paper border-2 border-ink rounded-md p-3 text-center space-y-0.5">
              <div className="text-xs font-bold text-warm-gray">Pending</div>
              <div className="text-base font-extrabold text-ink">{formatRupiah(pendingEarnings)}</div>
            </div>
            <div className="bg-paper border-2 border-ink rounded-md p-3 text-center space-y-0.5">
              <div className="text-xs font-bold text-warm-gray">Konversi</div>
              <div className="text-base font-extrabold text-ink">{conversions.length}x</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t-2 border-dashed border-ink/20">
            <span className="text-xs font-medium text-warm-gray">
              Min. cairkan: <strong className="text-ink">Rp50.000</strong>
            </span>
            <Link to="/affiliate" className="font-bold text-xs text-brand-orange hover:underline flex items-center gap-1">
              <span>Buka Dasbor Affiliate</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── 4. ENAM WORKSPACE ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-ink flex items-center gap-2">
            <Wrench className="w-5 h-5 text-brand-orange" />
            6 Workspace Digital Anda
          </h2>
          <span className="text-xs font-bold text-warm-gray hidden sm:inline-block">Tersinkronisasi Otomatis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WORKSPACES.map((ws) => (
            <Link
              key={ws.to}
              to={ws.to}
              className="brutalist-card p-5 bg-surface hover:bg-paper transition-colors space-y-2 group flex flex-col"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs font-bold text-warm-gray">{ws.num}</span>
                  <span className="font-extrabold text-sm group-hover:text-brand-orange transition-colors">
                    {ws.title}
                  </span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded border border-ink shrink-0 ${ws.badgeColor}`}>
                  {ws.badge}
                </span>
              </div>
              <p className="text-xs text-warm-gray leading-relaxed flex-1">{ws.desc}</p>
              <div className="flex items-center gap-1 text-xs font-bold text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Buka Workspace</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
