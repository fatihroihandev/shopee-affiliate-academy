import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { useSidebar } from '@/context/SidebarContext';
import { AcademyLogo } from '@/components/common/AcademyLogo';
import {
  LogOut,
  LayoutDashboard,
  BookOpen,
  Wrench,
  Share2,
  Shield,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const { user, profile, tier, isPremium, isAdmin, signOut } = useAuth();
  const { isOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path: string) =>
    cn(
      'px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 border-2',
      isActive(path)
        ? 'bg-ink text-white border-ink shadow-[2px_2px_0px_#FF7A24]'
        : 'text-ink border-transparent hover:bg-paper hover:border-ink/20'
    );

  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'Siswa';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Mobile Sidebar Trigger (Hanya tampil saat sudah login) */}
        <div className="flex items-center gap-2">
          {user && (
            <button
              onClick={toggleSidebar}
              className="p-1.5 border-2 border-ink bg-surface rounded-md shadow-[2px_2px_0px_#171717] hover:bg-paper active:translate-x-0.5 active:translate-y-0.5 lg:hidden flex items-center justify-center text-ink"
              aria-label={isOpen ? 'Tutup Menu Sidebar' : 'Buka Menu Sidebar'}
            >
              {isOpen ? <X className="w-5 h-5 text-brand-orange" /> : <Menu className="w-5 h-5 text-ink" />}
            </button>
          )}

          <Link to={user ? "/dashboard" : "/"} className="flex items-center group py-1">
            <AcademyLogo
              size="md"
              showText={true}
              imgClassName="group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link to="/learn" className={navLinkClass('/learn')}>
            <BookOpen className="w-4 h-4 text-brand-orange" />
            <span>Belajar</span>
          </Link>
          <Link to="/tools/products" className={navLinkClass('/tools')}>
            <Wrench className="w-4 h-4 text-brand-orange" />
            <span>Workspace</span>
          </Link>
          <Link to="/affiliate" className={navLinkClass('/affiliate')}>
            <Share2 className="w-4 h-4 text-brand-orange" />
            <span>Affiliate</span>
            <span className="bg-acid-lime text-ink text-[10px] px-1 rounded border border-ink font-extrabold">
              10%
            </span>
          </Link>
          <Link to="/pricing" className={navLinkClass('/pricing')}>
            <span>Biaya & Akses</span>
          </Link>
          {isAdmin && (
            <Link to="/admin" className={navLinkClass('/admin')}>
              <Shield className="w-4 h-4 text-brand-orange" />
              <span>Admin Hub</span>
            </Link>
          )}
        </nav>

        {/* Auth CTA & User State */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="brutalist-btn bg-acid-lime text-ink px-3 py-1.5 text-xs gap-1.5 font-extrabold"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
                {tier === 'pro_plus' ? (
                  <span className="bg-soft-coral text-ink text-[9px] px-1.5 py-0.5 rounded font-black border border-ink shadow-[1px_1px_0px_#171717]">
                    PRO+
                  </span>
                ) : isPremium ? (
                  <span className="bg-brand-orange text-white text-[9px] px-1.5 py-0.5 rounded font-black border border-ink shadow-[1px_1px_0px_#171717]">
                    PRO
                  </span>
                ) : (
                  <span className="bg-paper text-ink text-[9px] px-1.5 py-0.5 rounded border border-ink font-bold">
                    FREE
                  </span>
                )}
              </Link>

              {/* User Profile Pill */}
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-surface border-2 border-ink rounded-md shadow-[1px_1px_0px_#171717]">
                <div className="w-5 h-5 rounded bg-brand-orange text-white font-mono font-bold text-[10px] flex items-center justify-center">
                  {initial}
                </div>
                <span className="text-xs font-bold text-ink max-w-[100px] truncate">
                  {displayName}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={async () => {
                  await signOut();
                  navigate('/');
                }}
                className="p-1.5 border-2 border-ink bg-surface rounded-md hover:bg-soft-coral/20 transition-all text-ink"
                title="Keluar dari akun"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs sm:text-sm font-bold px-3 py-1.5 hover:text-brand-orange transition-colors"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="brutalist-btn bg-brand-orange text-white px-3.5 py-2 text-xs sm:text-sm font-extrabold"
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
