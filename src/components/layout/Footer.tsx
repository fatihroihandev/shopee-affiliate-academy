import React from 'react';
import { Link } from 'react-router-dom';
import { AcademyLogo } from '@/components/common/AcademyLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t-2 border-ink mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <AcademyLogo size="md" />
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-ink flex items-center gap-1.5">
                  Shopee Affiliate <span className="text-brand-orange">Academy</span>
                  <span className="bg-acid-lime text-ink text-[9px] font-black uppercase px-1.5 py-0.2 rounded border border-ink shadow-[1px_1px_0px_#171717]">
                    V2.0
                  </span>
                </span>
                <span className="text-[10px] font-bold text-warm-gray uppercase tracking-wider">
                  Platform Belajar & Workspace Terpadu
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-warm-gray leading-relaxed max-w-md">
              Kurikulum terstruktur dan perangkat kerja digital untuk membangun aset promosi Shopee Affiliate secara objektif, berbasis data transaksi, dan mematuhi kebijakan resmi.
            </p>
            <div className="p-3 bg-paper border-2 border-ink text-xs text-warm-gray leading-relaxed">
              <strong className="text-ink">Pemberitahuan Kepatuhan:</strong> Platform ini diselenggarakan secara mandiri sebagai sarana pelatihan edukasi dan otomasi alur kerja, dan BUKAN merupakan aplikasi atau afiliasi formal yang dimiliki oleh PT Shopee International Indonesia.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-ink border-b-2 border-ink/10 pb-1">
              Kurikulum & Workspace
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-warm-gray">
              <li>
                <Link to="/learn" className="hover:text-brand-orange transition-colors">
                  7 Tahap Belajar (M00–M06)
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-brand-orange transition-colors">
                  8 Proyek Praktik Wajib
                </Link>
              </li>
              <li>
                <Link to="/tools/products" className="hover:text-brand-orange transition-colors">
                  Product Research Lab
                </Link>
              </li>
              <li>
                <Link to="/tools/content" className="hover:text-brand-orange transition-colors">
                  Content Studio & Hook Bank
                </Link>
              </li>
              <li>
                <Link to="/tools/tracker" className="hover:text-brand-orange transition-colors">
                  Performance Tracker
                </Link>
              </li>
              <li>
                <Link to="/tools/experiments" className="hover:text-brand-orange transition-colors">
                  Experiment Sprint (A/B)
                </Link>
              </li>
            </ul>
          </div>

          {/* Program & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-ink border-b-2 border-ink/10 pb-1">
              Kemitraan & Legalitas
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-warm-gray">
              <li>
                <Link to="/affiliate" className="hover:text-brand-orange transition-colors flex items-center justify-between">
                  <span>Program Kemitraan (10%)</span>
                  <span className="bg-acid-lime text-ink text-[10px] px-1 rounded border border-ink font-bold">Mitra</span>
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-brand-orange transition-colors">
                  Biaya & Paket Seumur Hidup
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-brand-orange transition-colors">
                  Ketentuan Layanan & Hak Akses
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-brand-orange transition-colors">
                  Kebijakan Privasi Data Siswa
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@shopeeaffiliateacademy.site"
                  className="hover:text-brand-orange transition-colors text-ink font-mono"
                >
                  support@shopeeaffiliateacademy.site
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Clean production copyright */}
        <div className="border-t-2 border-ink/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-warm-gray font-medium gap-3">
          <p>© {new Date().getFullYear()} Shopee Affiliate Academy Indonesia. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-4 text-xs font-bold text-ink">
            <Link to="/terms" className="hover:underline">Ketentuan</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:underline">Privasi</Link>
            <span>•</span>
            <span className="font-mono text-warm-gray">Edisi 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
