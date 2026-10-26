import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
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
  Sparkle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const { isPremium, isAdmin } = useAuth();

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center gap-2.5 px-3 py-2 rounded-md font-bold text-xs transition-all border-2",
      isActive
        ? "bg-brand-orange text-white border-ink shadow-[2px_2px_0px_#171717] translate-x-1"
        : "text-ink border-transparent hover:bg-paper hover:border-ink/20"
    );

  return (
    <aside className="w-64 bg-surface border-r-2 border-ink min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden lg:flex shrink-0">
      <div className="space-y-6">
        {/* LMS NAVIGATION */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-warm-gray px-3 block">
            Pembelajaran
          </span>
          <nav className="space-y-1">
            <NavLink to="/dashboard" className={navItemClass}>
              <LayoutDashboard className="w-4 h-4" />
              <span>Dasbor Siswa</span>
            </NavLink>
            <NavLink to="/learn" className={navItemClass}>
              <BookOpen className="w-4 h-4" />
              <span>Modul Belajar (M00–M06)</span>
            </NavLink>
            <NavLink to="/projects" className={navItemClass}>
              <Award className="w-4 h-4" />
              <span>8 Proyek Praktik</span>
            </NavLink>
          </nav>
        </div>

        {/* 6 WORKSPACES */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-warm-gray">
              6 Workspace Praktik
            </span>
            <span className="text-[9px] bg-acid-lime border border-ink px-1 rounded font-extrabold">Alur Kerja</span>
          </div>
          <nav className="space-y-1">
            <NavLink to="/tools/products" className={navItemClass}>
              <ShoppingBag className="w-4 h-4" />
              <span>1. Product Research</span>
            </NavLink>
            <NavLink to="/tools/research-notes" className={navItemClass}>
              <FileText className="w-4 h-4" />
              <span>2. Research Notes</span>
            </NavLink>
            <NavLink to="/tools/content" className={navItemClass}>
              <Video className="w-4 h-4" />
              <span>3. Content Studio</span>
            </NavLink>
            <NavLink to="/tools/planner" className={navItemClass}>
              <Calendar className="w-4 h-4" />
              <span>4. Content Planner</span>
            </NavLink>
            <NavLink to="/tools/links" className={navItemClass}>
              <Link2 className="w-4 h-4" />
              <span>5. Link Archive</span>
            </NavLink>
            <NavLink to="/tools/tracker" className={navItemClass}>
              <BarChart2 className="w-4 h-4" />
              <span>6. Performance Tracker</span>
            </NavLink>
            <NavLink to="/tools/experiments" className={navItemClass}>
              <FlaskConical className="w-4 h-4" />
              <span>7. Experiment Tracker</span>
            </NavLink>
            <NavLink to="/tools/sop" className={navItemClass}>
              <BookCheck className="w-4 h-4" />
              <span>8. SOP & Knowledge Hub</span>
            </NavLink>
          </nav>
        </div>

        {/* AFFILIATE PROGRAM */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-warm-gray px-3 block">
            Program Kemitraan
          </span>
          <nav className="space-y-1">
            <NavLink to="/affiliate" className={navItemClass}>
              <Share2 className="w-4 h-4 text-brand-orange" />
              <span className="flex items-center justify-between flex-1">
                <span>Affiliate Dashboard</span>
                <span className="bg-acid-lime text-ink text-[10px] px-1 py-0.2 rounded border border-ink">10%</span>
              </span>
            </NavLink>
          </nav>
        </div>

        {/* ADMIN COMMAND CENTER */}
        {isAdmin && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-warm-gray px-3 block">
              Administrasi
            </span>
            <nav className="space-y-1">
              <NavLink to="/admin" className={navItemClass}>
                <Shield className="w-4 h-4 text-brand-orange" />
                <span>Admin Command Center</span>
              </NavLink>
            </nav>
          </div>
        )}
      </div>

      {/* UPGRADE TEASER FOR FREE USERS */}
      {!isPremium && (
        <div className="p-3.5 bg-paper border-2 border-ink rounded-lg shadow-[2px_2px_0px_#171717] space-y-2 mt-4">
          <div className="flex items-center gap-1.5">
            <Sparkle className="w-4 h-4 text-brand-orange" />
            <span className="font-extrabold text-xs text-ink">Buka Seluruh Akses</span>
          </div>
          <p className="text-[11px] text-warm-gray leading-tight">
            Akses 24 modul materi & 6 workspace tanpa batasan seharga <strong className="text-brand-orange">Rp99.000</strong>.
          </p>
          <a
            href="/pricing"
            className="brutalist-btn bg-brand-orange text-white text-[11px] py-1.5 w-full block text-center"
          >
            Upgrade Sekarang
          </a>
        </div>
      )}
    </aside>
  );
};
