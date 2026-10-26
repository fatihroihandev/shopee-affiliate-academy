import React from 'react';
import { Card } from '@/components/ui/Card';
import { StickerBadge } from '@/components/common/Doodles';
import { Shield, Lock, Eye, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-warm-gray hover:text-ink transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
      </Link>

      {/* Header */}
      <div className="border-b-2 border-ink pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-brand-orange text-white border-2 border-ink shadow-[2px_2px_0px_#171717]">
            <Shield className="w-5 h-5" />
          </span>
          <StickerBadge variant="lime" rotate="-rotate-1">KEBIJAKAN PRIVASI DATA</StickerBadge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink font-serif">
          Kebijakan Privasi Pengguna
        </h1>
        <p className="text-sm text-warm-gray">
          Komitmen kami terhadap transparansi, perlindungan kerahasiaan informasi akun, dan kepatuhan hukum privasi digital.
        </p>
      </div>

      {/* Content Body */}
      <Card className="p-6 sm:p-10 border-2 border-ink bg-surface shadow-[4px_4px_0px_#171717] space-y-8 text-ink text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2">
            <Eye className="w-5 h-5 text-brand-orange" />
            1. Informasi yang Kami Kumpulkan
          </h2>
          <p className="text-xs text-warm-gray">
            Kami hanya mengumpulkan informasi pribadi yang esensial untuk penyelenggaraan layanan edukasi dan administrasi akun:
          </p>
          <ul className="text-xs text-warm-gray space-y-1.5 list-disc list-inside pl-2">
            <li><strong>Data Identitas & Akun:</strong> Alamat email, nama tampilan (*display name*), dan kata sandi terenkripsi secara aman melalui penyedia otentikasi.</li>
            <li><strong>Data Transaksi Pembelian:</strong> Nomor pesanan, nominal pembayaran, bukti transfer, dan metode pembayaran yang digunakan.</li>
            <li><strong>Data Rekening Kemitraan:</strong> Nama bank, nomor rekening/e-wallet, dan nama pemilik rekening khusus untuk keperluan transfer komisi affiliate.</li>
            <li><strong>Data Perangkat & Log Akses:</strong> Alamat IP tersamar (*hashed IP*), jenis peramban (*user-agent*), dan timestamp untuk keperluan keamanan sistem dan pencegahan penipuan transaksi (*anti-fraud*).</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-4 border-t border-ink/10">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2">
            <Lock className="w-5 h-5 text-brand-orange" />
            2. Penggunaan Cookie & Tracking Referral (30 Hari)
          </h2>
          <p className="text-xs text-warm-gray">
            Platform kami menggunakan cookie dan local storage fungsional untuk:
          </p>
          <ul className="text-xs text-warm-gray space-y-1.5 list-disc list-inside pl-2">
            <li>Menyimpan sesi login aktif agar Anda tidak perlu login berulang saat berpindah modul atau workspace.</li>
            <li>Mencatat atribusi kode referral affiliate selama periode 30 hari kalender guna memastikan komisi mitra tercatat dengan adil saat terjadi pembelian.</li>
            <li>Menyimpan preferensi tampilan (seperti checklist progres tugas dan draf catatan riset).</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-4 border-t border-ink/10">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-orange" />
            3. Keamanan Data & Isolasi Row Level Security (RLS)
          </h2>
          <div className="p-4 bg-paper border border-ink space-y-2 text-xs">
            <p className="text-ink font-bold">
              Prinsip Privasi Multi-Tenant Terisolasi:
            </p>
            <p className="text-warm-gray">
              Seluruh catatan riset produk, naskah konten, link affiliate, dan histori transaksi Anda diproteksi oleh kebijakan PostgreSQL Row Level Security (RLS). Pengguna lain tidak memiliki akses teknis untuk mengintip, membaca, atau menduplikasi data workspace pribadi Anda.
            </p>
            <p className="text-warm-gray">
              Kami <strong>tidak pernah menjual, menyewakan, atau membagikan</strong> data pribadi Anda kepada pihak pengiklan pihak ketiga untuk tujuan komersialisasi eksternal.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-4 border-t border-ink/10">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2">
            4. Hak Pengguna atas Data Pribadi
          </h2>
          <p className="text-xs text-warm-gray">
            Anda berhak untuk:
          </p>
          <ul className="text-xs text-warm-gray space-y-1.5 list-disc list-inside pl-2">
            <li>Mengakses dan memperbarui profil serta data rekening pencairan dana sewaktu-waktu melalui dashboard.</li>
            <li>Meminta ekspor catatan riset kerja yang telah Anda susun di workspace.</li>
            <li>Meminta penghapusan akun (*account deletion*) dan pembersihan histori data personal dengan menghubungi tim pengelola platform.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-4 border-t border-ink/10">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2">
            5. Kontak Dukungan & Pertanyaan Privasi
          </h2>
          <p className="text-xs text-warm-gray">
            Jika Anda memiliki pertanyaan, klarifikasi, atau kekhawatiran terkait kebijakan privasi ini, silakan hubungi tim kami melalui email: <strong className="text-ink">support@shopee-affiliate-academy.id</strong>.
          </p>
        </section>
      </Card>
    </div>
  );
};
