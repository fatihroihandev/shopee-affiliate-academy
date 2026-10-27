import React, { useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { useSidebar } from '@/context/SidebarContext';
import { AcademyLogo } from '@/components/common/AcademyLogo';
import {
  LayoutDashboard,
  BookOpen,
  Award,
  ShoppingBag,
  FileText,
  Video,
  Calendar,
  Link2,
  BarChart2,
  FlaskConical,
  BookCheck,
  Share2,
  Shield,
  Zap,
  Sparkles,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const { profile, tier, isPremium, isAdmin, user } = useAuth();
  const { isOpen, closeSidebar } = useSidebar();
  const drawerRef = useRef<HTMLDivElement>(null);

  // When mobile drawer opens, ensure its content is scrolled to top
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'Siswa';

  const handleNavClick = (isMobile: boolean) => {
    if (isMobile) {
      closeSidebar();
    }
    // Instantly scroll page to top so user never starts scrolled down
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  };

  // Render item sidebar terpadu untuk desktop dan mobile dengan kontras tinggi (Anti Orange-on-Orange)
  const renderSidebarItem = (
    to: string,
    Icon: React.ElementType,
    label: string,
    badge?: React.ReactNode,
    isMobile: boolean = false
  ) => (
    <NavLink
      key={to}
      to={to}
      onClick={() => handleNavClick(isMobile)}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-2.5 px-3 py-2 rounded-md font-bold text-xs transition-all border-2",
          isActive
            ? "bg-ink text-white border-ink shadow-[2px_2px_0px_#FF7A24] translate-x-1"
            : "text-ink border-transparent hover:bg-paper hover:border-ink/20"
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={cn(
              "w-4 h-4 shrink-0 transition-colors",
              isActive ? "text-brand-orange" : "text-ink/80 group-hover:text-brand-orange"
            )}
          />
          <span className="flex items-center justify-between flex-1 gap-1.5 min-w-0">
            <span className="truncate">{label}</span>
            {badge}
          </span>
        </>
      )}
    </NavLink>
  );

  // Common Nav Content shared between Desktop & Mobile
  const renderNavContent = (isMobile: boolean = false) => (
    <div className="space-y-6">
      {/* Mobile Drawer Header with Close Button */}
      {isMobile && (
        <div className="flex items-center justify-between pb-3 border-b-2 border-ink">
          <Link to={user ? "/dashboard" : "/"} onClick={() => handleNavClick(true)}>
            <AcademyLogo size="sm" showText={true} />
          </Link>
          <button
            onClick={closeSidebar}
            className="p-1.5 border-2 border-ink bg-paper rounded-lg shadow-[2px_2px_0px_#171717] hover:bg-soft-coral/30 active:translate-x-0.5 active:translate-y-0.5"
            aria-label="Tutup menu sidebar"
          >
            <X className="w-4 h-4 text-ink" />
          </button>
        </div>
      )}

      {/* Mobile User Profile Pill */}
      {isMobile && user && (
        <div className="p-3 bg-paper border-2 border-ink rounded-lg shadow-[2px_2px_0px_#171717] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-brand-orange text-white font-mono font-bold text-xs flex items-center justify-center">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-extrabold text-ink truncate max-w-[140px]">
                {displayName}
              </span>
              <span className="text-[10px] text-warm-gray font-bold">
                {tier === 'pro_plus' ? 'Siswa Pro Plus' : isPremium ? 'Siswa Pro' : 'Akun Gratis'}
              </span>
            </div>
          </div>
          {tier === 'pro_plus' ? (
            <span className="bg-soft-coral text-ink text-[9px] font-black uppercase px-2 py-0.5 rounded border border-ink shadow-[1px_1px_0px_#171717]">
              PRO+
            </span>
          ) : isPremium ? (
            <span className="bg-brand-orange text-white text-[9px] font-black uppercase px-2 py-0.5 rounded border border-ink shadow-[1px_1px_0px_#171717]">
              PRO
            </span>
          ) : (
            <span className="bg-acid-lime text-ink text-[9px] font-black uppercase px-2 py-0.5 rounded border border-ink">
              FREE
            </span>
          )}
        </div>
      )}

      {/* 1. LMS NAVIGATION */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-warm-gray px-3 block">
          Pembelajaran
        </span>
        <nav className="space-y-1">
          {renderSidebarItem('/dashboard', LayoutDashboard, 'Dasbor Siswa', undefined, isMobile)}
          {renderSidebarItem('/learn', BookOpen, 'Modul Belajar (M00–M06)', undefined, isMobile)}
          {renderSidebarItem('/projects', Award, '8 Proyek Praktik', undefined, isMobile)}
          {renderSidebarItem(
            '/pro-plus-bonus',
            Sparkles,
            'Bonus Pro Plus',
            <span className="bg-soft-coral text-ink text-[9px] font-black uppercase px-1.5 py-0.5 rounded border border-ink shrink-0">
              PRO+
            </span>,
            isMobile
          )}
        </nav>
      </div>

      {/* 2. 8 WORKSPACES */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-warm-gray">
            8 Workspace Praktik
          </span>
          <span className="text-[9px] bg-acid-lime text-ink border border-ink px-1.5 py-0.2 rounded font-extrabold">
            Alur Kerja
          </span>
        </div>
        <nav className="space-y-1">
          {renderSidebarItem('/tools/products', ShoppingBag, '1. Product Research', undefined, isMobile)}
          {renderSidebarItem('/tools/research-notes', FileText, '2. Research Notes', undefined, isMobile)}
          {renderSidebarItem('/tools/content', Video, '3. Content Studio', undefined, isMobile)}
          {renderSidebarItem('/tools/planner', Calendar, '4. Content Planner', undefined, isMobile)}
          {renderSidebarItem('/tools/links', Link2, '5. Link Archive', undefined, isMobile)}
          {renderSidebarItem('/tools/tracker', BarChart2, '6. Performance Tracker', undefined, isMobile)}
          {renderSidebarItem('/tools/experiments', FlaskConical, '7. Experiment Tracker', undefined, isMobile)}
          {renderSidebarItem('/tools/sop', BookCheck, '8. SOP & Knowledge Hub', undefined, isMobile)}
        </nav>
      </div>

      {/* 3. AFFILIATE PROGRAM */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-warm-gray px-3 block">
          Program Kemitraan
        </span>
        <nav className="space-y-1">
          {renderSidebarItem(
            '/affiliate',
            Share2,
            'Affiliate Dashboard',
            <span className="bg-acid-lime text-ink text-[9px] font-black px-1.5 py-0.2 rounded border border-ink shrink-0">
              10%
            </span>,
            isMobile
          )}
        </nav>
      </div>

      {/* 4. ADMIN COMMAND CENTER */}
      {isAdmin && (
        <div className="space-y-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-warm-gray px-3 block">
            Administrasi
          </span>
          <nav className="space-y-1">
            {renderSidebarItem(
              '/admin',
              Shield,
              'Admin Command Center',
              <span className="bg-brand-orange text-white text-[9px] font-black uppercase px-1.5 py-0.2 rounded border border-ink shrink-0">
                ADMIN
              </span>,
              isMobile
            )}
          </nav>
        </div>
      )}
    </div>
  );

  const renderUpgradeTeaser = (isMobile: boolean = false) =>
    !isPremium && (
      <div className="p-3.5 bg-paper border-2 border-ink rounded-lg shadow-[2px_2px_0px_#171717] space-y-2 mt-6 shrink-0">
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-brand-orange" />
          <span className="font-extrabold text-xs text-ink">Buka Seluruh Akses</span>
        </div>
        <p className="text-[11px] text-warm-gray leading-tight">
          Akses 24 modul materi & 6 workspace tanpa batasan seharga <strong className="text-brand-orange">Rp99.000</strong>.
        </p>
        <Link
          to="/pricing"
          onClick={() => handleNavClick(isMobile)}
          className="brutalist-btn bg-brand-orange text-white text-[11px] py-2 w-full block text-center font-extrabold shadow-[2px_2px_0px_#171717] hover:bg-orange-600 active:translate-x-0.5 active:translate-y-0.5"
        >
          Upgrade Sekarang
        </Link>
      </div>
    );

  return (
    <>
      {/* ── DESKTOP SIDEBAR (Sticky, pinned on scroll, internal scroll only) ── */}
      <aside className="w-64 bg-surface border-r-2 border-ink sticky top-16 h-[calc(100vh-4rem)] p-4 flex-col justify-between hidden lg:flex shrink-0 overflow-y-auto overscroll-contain">
        {renderNavContent(false)}
        {renderUpgradeTeaser(false)}
      </aside>

      {/* ── MOBILE DRAWER SIDEBAR (Slide-in sheet on phone/tablet) ── */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop blur overlay */}
          <div
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
            onClick={closeSidebar}
            aria-hidden="true"
          />

          {/* Drawer container with ref for scroll-reset */}
          <div
            ref={drawerRef}
            className="relative w-80 max-w-[85vw] bg-surface border-r-2 border-ink h-full p-4 flex flex-col justify-between overflow-y-auto overscroll-contain shadow-2xl z-10 animate-in slide-in-from-left duration-200"
          >
            {renderNavContent(true)}
            {renderUpgradeTeaser(true)}
          </div>
        </div>
      )}
    </>
  );
};
