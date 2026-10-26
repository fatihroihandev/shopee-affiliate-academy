import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { Sparkle, StickerBadge } from '@/components/common/Doodles';
import { LogOut, LayoutDashboard, BookOpen, Wrench, Share2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isPremium, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-orange border-2 border-ink rounded-lg flex items-center justify-center shadow-[2px_2px_0px_#171717] group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-all">
            <Sparkle className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg leading-tight tracking-tight flex items-center gap-1.5">
              Affiliate Academy
              <StickerBadge variant="orange" className="text-[10px] py-0 px-1.5 hidden sm:inline-block">V2.0</StickerBadge>
            </span>
            <span className="text-[10px] font-semibold text-warm-gray uppercase tracking-wider">Shopee Learning Hub</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
          <Link to="/learn" className="hover:text-brand-orange transition-colors flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> Belajar
          </Link>
          <Link to="/tools/products" className="hover:text-brand-orange transition-colors flex items-center gap-1.5">
            <Wrench className="w-4 h-4" /> 6 Workspace
          </Link>
          <Link to="/affiliate" className="hover:text-brand-orange transition-colors flex items-center gap-1.5">
            <Share2 className="w-4 h-4" /> Program Affiliate
            <span className="bg-acid-lime text-ink text-[10px] px-1.5 py-0.5 rounded border border-ink font-extrabold">10%</span>
          </Link>
          <Link to="/pricing" className="hover:text-brand-orange transition-colors">
            Biaya & Akses
          </Link>
        </nav>

        {/* Auth CTA */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="brutalist-btn bg-acid-lime text-ink px-3.5 py-2 text-xs sm:text-sm gap-1.5"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
                {isPremium && (
                  <span className="bg-brand-orange text-white text-[10px] px-1.5 py-0.2 rounded font-bold">PRO</span>
                )}
              </Link>
              <button
                onClick={async () => {
                  await signOut();
                  navigate('/');
                }}
                className="p-2 border-2 border-ink rounded-md hover:bg-soft-coral/20 transition-colors"
                title="Keluar"
              >
                <LogOut className="w-4 h-4 text-ink" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="text-xs sm:text-sm font-bold px-3 py-2 hover:text-brand-orange transition-colors"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="brutalist-btn bg-brand-orange text-white px-3.5 py-2 text-xs sm:text-sm"
              >
                Mulai Gratis
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
