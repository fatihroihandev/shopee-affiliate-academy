import React from 'react';
import { Card } from '@/components/ui/Card';
import { StickerBadge } from '@/components/common/Doodles';
import { FileText, Shield, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '@/hooks/usePageTitle';

export const TermsPage: React.FC = () => {
  usePageTitle('Syarat & Ketentuan Layanan', 'Syarat dan ketentuan resmi penggunaan platform, hak akses materi kurikulum, kebijakan refund, dan komitmen Shopee Affiliate Academy.');
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
            <FileText className="w-5 h-5" />
          </span>
          <StickerBadge variant="paper" rotate="-rotate-1">DOKUMEN HUKUM RESMI</StickerBadge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink font-serif">
          Ketentuan Layanan & Hak Akses
        </h1>
        <p className="text-sm text-warm-gray">
          Terakhir diperbarui: 26 Oktober 2026 • Berlaku efektif untuk seluruh pengguna Shopee Affiliate Academy.
        </p>
      </div>

      {/* Content Body */}
      <Card className="p-6 sm:p-10 border-2 border-ink bg-surface shadow-[4px_4px_0px_#171717] space-y-8 text-ink text-sm leading-relaxed">
        {/* Pasal 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center text-xs font-mono">1</span>
            Definisi & Ruang Lingkup Layanan
          </h2>
          <p className="text-xs text-warm-gray">
            Shopee Affiliate Academy (&quot;Platform&quot;, &quot;Kami&quot;) adalah portal edukasi digital, perangkat kerja (workspace), dan kurikulum pelatihan mandiri yang dirancang untuk memandu kreator konten dan pemasar afiliasi memahami metodologi promosi produk di ekosistem Shopee secara etis, kepatuhan kebijakan, dan terukur.
          </p>
          <p className="text-xs text-warm-gray">
            Dengan mendaftarkan akun, mengakses materi gratis, atau membeli Paket Akses Premium, Anda (&quot;Pengguna&quot;, &quot;Siswa&quot;) menyetujui untuk terikat secara hukum pada seluruh syarat dan ketentuan yang tercantum dalam dokumen ini.
          </p>
        </section>

        {/* Pasal 2 */}
        <section className="space-y-3 pt-4 border-t border-ink/10">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center text-xs font-mono">2</span>
            Ketentuan Hak Akses & Pembayaran (Entitlement)
          </h2>
          <ul className="text-xs text-warm-gray space-y-2 list-disc list-inside">
            <li>
              <strong>Akses Gratis (Free Preview):</strong> Memberikan hak membaca Modul Orientasi M00 dan Modul Dasar 01, serta preview umum fitur platform.
            </li>
            <li>
              <strong>Paket Premium (Sekali Bayar Rp99.000):</strong> Memberikan hak akses jangka panjang seumur hidup (*lifetime access*) ke seluruh 24 modul materi kanonis, 8 lembar kerja proyek praktik, 6 workspace terpadu, dan Hook Bank.
            </li>
            <li>
              Tidak ada tagihan biaya langganan berulang (*no recurring subscriptions*). Seluruh pembaruan kurikulum dan perbaikan sistem di masa depan termasuk dalam hak akses yang telah dibeli.
            </li>
          </ul>
        </section>

        {/* Pasal 3 */}
        <section className="space-y-3 pt-4 border-t border-ink/10">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center text-xs font-mono">3</span>
            Perlindungan Hak Cipta & Larangan Pembajakan
          </h2>
          <div className="p-4 bg-paper border border-ink space-y-2 text-xs">
            <div className="font-bold text-ink flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-brand-orange" />
              <span>Hak Kekayaan Intelektual Terlindungi:</span>
            </div>
            <p className="text-warm-gray">
              Seluruh teks materi, kurikulum, formula scoring 7 faktor, bank naskah, doodle ilustrasi, dan kode antarmuka adalah hak cipta eksklusif Shopee Affiliate Academy.
            </p>
            <p className="text-red-700 font-bold">
              Dilarang keras menyalin, mendistribusikan ulang, menjual kembali (*reselling/odong-odong*), membocorkan teks naskah ke forum publik, atau membagikan akun kepada pihak ketiga. Pelanggaran akan mengakibatkan pemblokiran akun permanen tanpa pengembalian dana dan dapat ditindaklanjuti secara hukum.
            </p>
          </div>
        </section>

        {/* Pasal 4 */}
        <section className="space-y-3 pt-4 border-t border-ink/10">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center text-xs font-mono">4</span>
            Kebijakan Pengembalian Dana (Refund Policy)
          </h2>
          <div className="space-y-2 text-xs text-warm-gray">
            <p>
              Mengingat sifat produk digital yang langsung dapat diakses dan dikonsumsi seketika setelah pembayaran terverifikasi, <strong>Kami memberlakukan kebijakan NO-REFUND (Tidak Ada Pengembalian Dana)</strong> setelah materi premium terbuka.
            </p>
            <p>
              Pengembalian dana hanya dapat diproses dalam kondisi khusus:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Terjadi pembayaran ganda (*double charge*) yang terbukti valid oleh mutasi bank.</li>
              <li>Sistem mengalami kegagalan teknis permanen yang menyebabkan akses tidak dapat dibuka lebih dari 3x24 jam sejak konfirmasi.</li>
            </ul>
          </div>
        </section>

        {/* Pasal 5 */}
        <section className="space-y-3 pt-4 border-t border-ink/10">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center text-xs font-mono">5</span>
            Regulasi Program Affiliate Internal (Member-Get-Member)
          </h2>
          <div className="space-y-2 text-xs text-warm-gray">
            <p>
              Setiap member berhak mengikuti program referral dengan komisi 10% (Rp9.900 per transaksi berhasil). Ketentuan mutlak meliputi:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong>Masa Berlaku Cookie:</strong> 30 hari kalender sejak klik tautan pertama.</li>
              <li><strong>Larangan Self-Purchase:</strong> Dilarang membeli akun sendiri menggunakan link affiliate pribadi.</li>
              <li><strong>Larangan Spamming:</strong> Dilarang menyebarkan tautan promosi secara agresif, spam grup chat, atau pesan langsung tanpa izin.</li>
              <li><strong>Pencairan Komisi (Payout):</strong> Minimal penarikan saldo adalah Rp50.000, diajukan melalui dashboard dan diproses ke rekening bank / e-wallet resmi.</li>
            </ul>
          </div>
        </section>

        {/* Pasal 6 */}
        <section className="space-y-3 pt-4 border-t border-ink/10">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center text-xs font-mono">6</span>
            Batasan Tanggung Jawab & Penyangkalan Hasil (Disclaimer)
          </h2>
          <div className="p-4 bg-surface border border-ink space-y-2 text-xs text-warm-gray">
            <div className="font-bold text-ink flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Penyangkalan Hasil Finansial:</span>
            </div>
            <p>
              Shopee Affiliate Academy adalah lembaga penyedia materi pembelajaran dan perkakas produktivitas. Kami <strong>tidak pernah menjamin</strong> besaran angka pendapatan tertentu, omzet cepat, atau hasil instan.
            </p>
            <p>
              Keberhasilan komisi afiliasi sangat ditentukan oleh konsistensi eksekusi, kualitas produksi konten, kejelian riset pasar, kepatuhan algoritma platform Shopee yang dinamis, dan faktor variabel individu masing-masing peserta.
            </p>
          </div>
        </section>
      </Card>
    </div>
  );
};
