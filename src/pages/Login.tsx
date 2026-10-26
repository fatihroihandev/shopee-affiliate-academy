import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Sparkle, StickerBadge } from '@/components/common/Doodles';
import { ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
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
      setErrorMsg(err.message || 'Gagal masuk. Periksa email dan kata sandi Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="brutalist-card p-8 bg-surface w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <StickerBadge variant="orange">MASUK AKUN</StickerBadge>
          <h1 className="text-2xl font-extrabold text-ink flex items-center justify-center gap-1.5">
            Selamat Datang Kembali
            <Sparkle className="w-5 h-5 text-brand-orange" />
          </h1>
          <p className="text-xs text-warm-gray font-medium">
            Masuk untuk melanjutkan belajar dan mengelola workspace affiliate Anda.
          </p>
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
