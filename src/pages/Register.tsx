import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Sparkle, StickerBadge } from '@/components/common/Doodles';
import { ArrowRight, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

export const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
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

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="brutalist-card p-8 bg-surface w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <StickerBadge variant="lime">PENDAFTARAN SISWA BARU</StickerBadge>
          <h1 className="text-2xl font-extrabold text-ink flex items-center justify-center gap-1.5">
            Mulai Belajar Gratis
            <Sparkle className="w-5 h-5 text-brand-orange" />
          </h1>
          <p className="text-xs text-warm-gray font-medium">
            Dapatkan akses instan ke 4 pelajaran orientasi M00 dan preview Modul 01.
          </p>
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
              disabled={loading}
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
  );
};
