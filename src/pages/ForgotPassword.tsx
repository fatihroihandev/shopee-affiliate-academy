import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Sparkle, StickerBadge } from '@/components/common/Doodles';
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal mengirim instruksi pemulihan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="brutalist-card p-8 bg-surface w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <StickerBadge variant="coral">PEMULIHAN KATA SANDI</StickerBadge>
          <h1 className="text-2xl font-extrabold text-ink flex items-center justify-center gap-1.5">
            Lupa Kata Sandi?
            <Sparkle className="w-5 h-5 text-brand-orange" />
          </h1>
          <p className="text-xs text-warm-gray font-medium">
            Masukkan email terdaftar Anda untuk menerima tautan pemulihan akses.
          </p>
        </div>

        {success ? (
          <div className="p-4 bg-acid-lime/30 border-2 border-ink rounded-md space-y-3 text-center">
            <CheckCircle2 className="w-8 h-8 text-brand-orange mx-auto" />
            <p className="text-xs font-bold text-ink leading-relaxed">
              Tautan pemulihan telah dikirim ke <span className="underline">{email}</span>. Silakan periksa folder Inbox atau Spam email Anda.
            </p>
            <Link to="/login" className="brutalist-btn bg-surface text-ink px-4 py-2 text-xs w-full">
              Kembali ke Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-soft-coral/30 border-2 border-ink rounded-md flex items-start gap-2 text-xs font-bold text-ink">
                <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-ink" htmlFor="email">
                Email Akun
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

            <button
              type="submit"
              disabled={loading}
              className="brutalist-btn bg-brand-orange text-white w-full py-3 text-sm gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mengirim Email...</span>
                </>
              ) : (
                <span>Kirim Tautan Pemulihan</span>
              )}
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t-2 border-ink/10">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-ink hover:text-brand-orange">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Halaman Masuk</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
