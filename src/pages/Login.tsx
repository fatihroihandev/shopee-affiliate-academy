import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/features/auth/AuthContext';
import { Sparkle, StickerBadge } from '@/components/common/Doodles';
import { ArrowRight, AlertCircle, Loader2, UserCheck, ShieldCheck, Zap } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();

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
          ? 'Koneksi ke Supabase belum terhubung. Anda bisa gunakan tombol "Login Cepat Demo" di bawah.'
          : err.message || 'Gagal masuk. Periksa email dan kata sandi Anda.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role: 'student' | 'admin', isPro = true) => {
    loginAsDemo(role, isPro);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="brutalist-card p-6 sm:p-8 bg-surface w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <StickerBadge variant="orange">MASUK AKUN</StickerBadge>
          <h1 className="text-2xl font-extrabold text-ink flex items-center justify-center gap-1.5">
            Selamat Datang Kembali
            <Sparkle className="w-5 h-5 text-brand-orange" />
          </h1>
          <p className="text-xs text-warm-gray font-medium">
            Masuk untuk mengakses materi kurikulum dan 6 workspace affiliate.
          </p>
        </div>

        {/* QUICK DEMO LOGIN BOX */}
        <div className="p-4 bg-paper border-2 border-ink rounded-lg shadow-[2px_2px_0px_#171717] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" />
              Akses Cepat Mode Demo:
            </span>
            <span className="text-[10px] bg-acid-lime border border-ink px-1.5 py-0.2 rounded font-extrabold">Instant</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('student', true)}
              className="brutalist-btn bg-surface hover:bg-acid-lime text-ink py-2 text-xs font-bold gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-brand-orange" />
              <span>Siswa Pro</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin', true)}
              className="brutalist-btn bg-surface hover:bg-soft-coral text-ink py-2 text-xs font-bold gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
              <span>Akun Admin</span>
            </button>
          </div>
          <p className="text-[10px] text-warm-gray text-center italic">
            *Langsung masuk dashboard tanpa perlu setup database.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <hr className="flex-1 border-ink/20" />
          <span className="text-[11px] font-bold text-warm-gray uppercase">Atau Login Akun</span>
          <hr className="flex-1 border-ink/20" />
        </div>

        {errorMsg && (
          <div className="p-3 bg-soft-coral/30 border-2 border-ink rounded-md flex items-start gap-2 text-xs font-bold text-ink">
            <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

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
            disabled={loading}
            className="brutalist-btn bg-brand-orange text-white w-full py-3 text-sm gap-2 mt-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memproses Masuk...</span>
              </>
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t-2 border-ink/10 text-xs font-medium text-warm-gray">
          Belum punya akun?{' '}
          <Link to="/register" className="font-bold text-ink hover:text-brand-orange underline">
            Daftar Gratis di sini
          </Link>
        </div>
      </div>
    </div>
  );
};
