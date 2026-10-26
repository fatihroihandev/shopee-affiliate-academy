import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkle } from '@/components/common/Doodles';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t-2 border-ink mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-orange border-2 border-ink rounded-lg flex items-center justify-center shadow-[2px_2px_0px_#171717]">
                <Sparkle className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight">Affiliate Academy</span>
            </div>
            <p className="text-sm text-warm-gray leading-relaxed max-w-md">
              Platform pembelajaran mandiri dan workspace terpadu Shopee Affiliate di Indonesia. Belajar riset produk, produksi konten, dan baca data secara objektif.
            </p>
            <div className="p-3 bg-paper border-2 border-ink rounded-lg text-xs text-warm-gray font-medium">
              <span className="font-bold text-ink">Pemberitahuan Resmi:</span> Platform ini adalah materi edukasi dan workspace independen dan BUKAN merupakan aplikasi resmi dari PT Shopee Indonesia. Semua merek dagang adalah milik pemiliknya masing-masing.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-ink uppercase tracking-wider">Kurikulum & Tools</h4>
            <ul className="space-y-2 text-sm font-medium text-warm-gray">
              <li><Link to="/learn" className="hover:text-brand-orange transition-colors">7 Tahap Belajar (M00–M06)</Link></li>
              <li><Link to="/tools/products" className="hover:text-brand-orange transition-colors">Product Research Lab</Link></li>
              <li><Link to="/tools/content" className="hover:text-brand-orange transition-colors">Content Creation Studio</Link></li>
              <li><Link to="/tools/planner" className="hover:text-brand-orange transition-colors">Planner & Kalender 30 Hari</Link></li>
              <li><Link to="/tools/tracker" className="hover:text-brand-orange transition-colors">Performance Tracker</Link></li>
            </ul>
          </div>

          {/* Program & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-ink uppercase tracking-wider">Kemitraan & Legal</h4>
            <ul className="space-y-2 text-sm font-medium text-warm-gray">
              <li><Link to="/affiliate" className="hover:text-brand-orange transition-colors">Program Affiliate (Komisi 10%)</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-orange transition-colors">Paket & Harga</Link></li>
              <li><Link to="/terms" className="hover:text-brand-orange transition-colors">Ketentuan Layanan</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-orange transition-colors">Kebijakan Privasi</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-ink/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-warm-gray font-medium gap-4">
          <p>© {new Date().getFullYear()} Shopee Affiliate Academy. Seluruh hak cipta dilindungi.</p>
          <p className="flex items-center gap-2">
            <span>Didesain dengan gaya Playful Editorial Doodle</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
