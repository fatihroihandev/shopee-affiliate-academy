import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/features/auth/AuthContext';
import { StickerBadge } from '@/components/common/Doodles';
import { AcademyLogo } from '@/components/common/AcademyLogo';
import { ArrowRight, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { usePageTitle } from '@/hooks/usePageTitle';

export const Register: React.FC = () => {
  usePageTitle('Daftar Akun Baru', 'Daftar akun gratis Shopee Affiliate Academy untuk mulai mempelajari modul dasar dan menjelajahi fitur kurikulum V2.0.');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { signInWithGoogle } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if referral code exists in URL (?ref=CODE)
    const ref = searchParams.get('ref');
    if (ref) {
      setReferralCode(ref.toUpperCase());
      localStorage.setItem('shopee_academy_ref', ref.toUpperCase());
    } else {
      const storedRef = localStorage.getItem('shopee_academy_ref');
      if (storedRef) setReferralCode(storedRef);
    }
  }, [searchParams]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    if (password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            referred_by: referralCode || null,
          },
        },
      });

      if (error) {
        throw error;
      }

      navigate('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal mendaftar. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setGoogleLoading(true);
    setErrorMsg(null);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        throw error;
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal mendaftar dengan Google. Coba beberapa saat lagi.');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-4">

        {/* ── BRAND HEADER ── */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-block group" title="Kembali ke Beranda">
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute inset-0 bg-acid-lime/30 rounded-2xl blur-xl group-hover:bg-acid-lime/50 transition-all" />
              <div className="relative p-2.5 bg-surface border-2 border-ink rounded-2xl shadow-[3px_3px_0px_#171717] group-hover:-translate-y-1 group-hover:shadow-[5px_5px_0px_#C6F36A] transition-all">
                <AcademyLogo size="xl" imgClassName="group-hover:scale-105" />
              </div>
            </div>
          </Link>
          <div>
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <StickerBadge variant="lime">AKUN GRATIS</StickerBadge>
              <span className="text-[11px] font-bold text-warm-gray">Edisi Lengkap 2026</span>
            </div>
            <h1 className="text-2xl font-extrabold text-ink tracking-tight">Mulai Belajar Sekarang</h1>
            <p className="text-xs text-warm-gray font-medium mt-1 max-w-sm mx-auto">
              Akses instan modul orientasi M00, preview Modul 01, dan coba 6 workspace digital.
            </p>
          </div>
        </div>

        {/* ── CARD FORM ── */}
        <div className="brutalist-card p-6 sm:p-7 bg-surface space-y-5">
          <div className="flex items-center justify-between">
            <StickerBadge variant="lime">PENDAFTARAN SISWA</StickerBadge>
            <span className="text-[10px] text-warm-gray font-bold">100% Gratis Awal</span>
          </div>

          {/* GOOGLE SIGN UP BUTTON */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-surface hover:bg-paper border-2 border-ink rounded-lg font-extrabold text-xs text-ink shadow-[3px_3px_0px_#171717] hover:shadow-[4px_4px_0px_#C6F36A] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
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
            <span>{googleLoading ? 'Menghubungkan ke Google...' : 'Daftar Cepat dengan Google'}</span>
          </button>

          {/* VISUAL SEPARATOR */}
          <div className="relative flex items-center justify-center my-1">
            <div className="border-t-2 border-dashed border-ink/20 w-full" />
            <span className="bg-surface px-3 text-[10px] font-extrabold uppercase tracking-wider text-warm-gray absolute">
              atau daftar dengan email
            </span>
          </div>

          {errorMsg && (
            <div className="p-3 bg-soft-coral/30 border-2 border-ink rounded-md flex items-start gap-2 text-xs font-bold text-ink">
              <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-ink" htmlFor="fullName">
                Nama Lengkap
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Fatih Roihan"
                className="brutalist-input w-full px-3.5 py-2.5 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-ink" htmlFor="email">
                Email Aktif
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
              <label className="text-xs font-bold uppercase tracking-wider text-ink" htmlFor="password">
                Kata Sandi (Min. 6 Karakter)
              </label>
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

            {referralCode && (
              <div className="p-2.5 bg-acid-lime/20 border-2 border-ink rounded-md flex items-center justify-between text-xs font-bold text-ink">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                  Referral Terdeteksi: <span className="font-extrabold text-brand-orange">{referralCode}</span>
                </span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="brutalist-btn bg-brand-orange text-white w-full py-3 text-sm gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mendaftarkan Akun...</span>
                  </>
                ) : (
                  <>
                    <span>Buat Akun Gratis</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="text-center pt-2 border-t-2 border-ink/10 text-xs font-medium text-warm-gray">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-bold text-ink hover:text-brand-orange underline">
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
