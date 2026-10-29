import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/features/auth/AuthContext';
import { StickerBadge } from '@/components/common/Doodles';
import { AcademyLogo } from '@/components/common/AcademyLogo';
import { ProductTier } from '@/types/database';
import { usePageTitle } from '@/hooks/usePageTitle';
import { ArrowRight, AlertCircle, Loader2, UserCheck, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const Login: React.FC = () => {
  usePageTitle('Masuk Akun Siswa & Admin', 'Masuk ke akun Shopee Affiliate Academy Anda untuk melanjutkan materi belajar kurikulum dan mengelola workspace.');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { loginAsDemo, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Mode demo hanya aktif di local development environment demi keamanan produksi
  const showDemoBox = Boolean(import.meta.env.DEV);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      navigate('/dashboard');
    } catch (err: any) {
      setErrorMsg(
        err.message?.includes('fetch')
          ? (showDemoBox
              ? 'Koneksi ke Supabase belum terhubung. Anda bisa gunakan tombol "Login Cepat Demo" di bawah.'
              : 'Gagal menghubungi server otentikasi. Silakan periksa koneksi internet Anda atau coba beberapa saat lagi.')
          : err.message || 'Gagal masuk. Periksa email dan kata sandi Anda.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrorMsg(null);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        throw error;
      }
      // Note: Supabase will redirect the browser to Google OAuth consent screen
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal memulai login dengan Google. Coba beberapa saat lagi.');
      setGoogleLoading(false);
    }
  };

  const handleDemoLogin = (
    role: 'student' | 'admin',
    tier: ProductTier = 'pro',
    adminType: 'utama' | 'backup' = 'utama'
  ) => {
    loginAsDemo(role, tier, adminType);
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-4">

        {/* ── BRAND HEADER ── */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-block group" title="Kembali ke Beranda">
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute inset-0 bg-brand-orange/20 rounded-2xl blur-xl group-hover:bg-brand-orange/35 transition-all" />
              <div className="relative p-2.5 bg-surface border-2 border-ink rounded-2xl shadow-[3px_3px_0px_#171717] group-hover:-translate-y-1 group-hover:shadow-[5px_5px_0px_#FF7A24] transition-all">
                <AcademyLogo size="xl" imgClassName="group-hover:scale-105" />
              </div>
            </div>
          </Link>
          <div>
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <StickerBadge variant="orange">MASUK SISWA</StickerBadge>
              <span className="text-[11px] font-bold text-warm-gray">Edisi Lengkap 2026</span>
            </div>
            <h1 className="text-2xl font-extrabold text-ink tracking-tight">Selamat Datang Kembali</h1>
            <p className="text-xs text-warm-gray font-medium mt-1 max-w-sm mx-auto">
              Lanjutkan kurikulum 24 modul materi dan kelola 6 workspace digital affiliate Anda.
            </p>
          </div>
        </div>

        {/* ── CARD FORM ── */}
        <div className="brutalist-card p-6 sm:p-7 bg-surface space-y-5">
          <div className="flex items-center justify-between">
            <StickerBadge variant="orange">MASUK AKUN SISWA</StickerBadge>
            <span className="text-[10px] text-warm-gray font-bold">Supabase Auth V2.1</span>
          </div>

          {/* GOOGLE LOGIN BUTTON (Addendum v2.1 Section 7.4) */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-surface hover:bg-paper border-2 border-ink rounded-lg font-extrabold text-xs text-ink shadow-[3px_3px_0px_#171717] hover:shadow-[4px_4px_0px_#FF7A24] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-brand-orange" />
            ) : (
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>{googleLoading ? 'Menghubungkan ke Google...' : 'Lanjutkan dengan Google'}</span>
          </button>

          {/* VISUAL SEPARATOR */}
          <div className="relative flex items-center justify-center my-1">
            <div className="border-t-2 border-dashed border-ink/20 w-full" />
            <span className="bg-surface px-3 text-[10px] font-extrabold uppercase tracking-wider text-warm-gray absolute">
              atau masuk dengan email
            </span>
          </div>

          {errorMsg && (
            <div className="p-3 bg-soft-coral/30 border-2 border-ink rounded-md flex items-start gap-2 text-xs font-bold text-ink">
              <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* EMAIL & PASSWORD FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-ink" htmlFor="email">
                Email Terdaftar
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="brutalist-input w-full px-3.5 py-2.5 text-sm"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-ink" htmlFor="password">
                  Kata Sandi
                </label>
                <Link to="/forgot-password" className="text-xs text-warm-gray hover:text-brand-orange font-semibold">
                  Lupa kata sandi?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="brutalist-input w-full px-3.5 py-2.5 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="brutalist-btn bg-brand-orange text-white w-full py-3 text-sm gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memproses Masuk...</span>
                </>
              ) : (
                <>
                  <span>Masuk dengan Email</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* QUICK DEMO LOGIN BOX (Siswa Pro/Pro+ & 2 Admin: Utama & Backup) - Opsi 1 */}
          {showDemoBox && (
            <div className="p-3.5 bg-paper border-2 border-ink rounded-lg shadow-[2px_2px_0px_#171717] space-y-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" />
                  Akses Cepat Mode Demo:
                </span>
                <span className="text-[9px] bg-acid-lime border border-ink px-1.5 py-0.2 rounded font-extrabold">Instant</span>
              </div>

              {/* Siswa Demo */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-warm-gray uppercase">Akun Siswa:</div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('student', 'pro')}
                    className="brutalist-btn bg-surface hover:bg-brand-orange/15 text-ink py-1.5 text-[11px] font-bold gap-1 justify-center"
                    title="Masuk sebagai Siswa Paket Pro"
                  >
                    <UserCheck className="w-3 h-3 text-brand-orange" />
                    <span>Siswa Pro</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('student', 'pro_plus')}
                    className="brutalist-btn bg-surface hover:bg-soft-coral/30 text-ink py-1.5 text-[11px] font-bold gap-1 justify-center"
                    title="Masuk sebagai Siswa Paket Pro Plus (3 Bonus)"
                  >
                    <Sparkles className="w-3 h-3 text-brand-orange" />
                    <span>Siswa Pro Plus</span>
                  </button>
                </div>
              </div>

              {/* 2 Akun Admin: Utama & Backup */}
              <div className="space-y-1 pt-1 border-t border-ink/20">
                <div className="text-[10px] font-bold text-warm-gray uppercase">Akun Admin Platform:</div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('admin', 'pro_plus', 'utama')}
                    className="brutalist-btn bg-surface hover:bg-acid-lime text-ink py-1.5 text-[11px] font-bold gap-1 justify-center"
                    title="Masuk sebagai Admin Utama (Super Admin)"
                  >
                    <ShieldCheck className="w-3 h-3 text-brand-orange" />
                    <span>Admin Utama</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('admin', 'pro_plus', 'backup')}
                    className="brutalist-btn bg-surface hover:bg-paper text-ink py-1.5 text-[11px] font-bold gap-1 justify-center"
                    title="Masuk sebagai Admin Cadangan (Backup Admin)"
                  >
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                    <span>Admin Backup</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="text-center pt-2 border-t-2 border-ink/10 text-xs font-medium text-warm-gray">
            Belum punya akun?{' '}
            <Link to="/register" className="font-bold text-ink hover:text-brand-orange underline">
              Daftar Gratis di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
