import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { StickerBadge } from '@/components/common/Doodles';
import { AcademyLogo } from '@/components/common/AcademyLogo';
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
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-4">

        {/* ── BRAND HEADER ── */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-block group" title="Kembali ke Beranda">
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute inset-0 bg-soft-coral/30 rounded-2xl blur-xl group-hover:bg-soft-coral/50 transition-all" />
              <div className="relative p-2.5 bg-surface border-2 border-ink rounded-2xl shadow-[3px_3px_0px_#171717] group-hover:-translate-y-1 group-hover:shadow-[5px_5px_0px_#FF9278] transition-all">
                <AcademyLogo size="xl" imgClassName="group-hover:scale-105" />
              </div>
            </div>
          </Link>
          <div>
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <StickerBadge variant="coral">BANTUAN AKSES</StickerBadge>
              <span className="text-[11px] font-bold text-warm-gray">Reset Akun</span>
            </div>
            <h1 className="text-2xl font-extrabold text-ink tracking-tight">Lupa Kata Sandi?</h1>
            <p className="text-xs text-warm-gray font-medium mt-1 max-w-sm mx-auto">
              Masukkan email terdaftar Anda untuk menerima tautan pemulihan akses.
            </p>
          </div>
        </div>

        {/* ── CARD FORM ── */}
        <div className="brutalist-card p-6 sm:p-7 bg-surface space-y-5">

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
    </div>
  );
};
