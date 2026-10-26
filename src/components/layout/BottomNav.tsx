import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Wrench, Share2, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BottomNav: React.FC = () => {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex flex-col items-center justify-center py-2 px-1 text-[10px] font-bold transition-colors",
      isActive ? "text-brand-orange" : "text-warm-gray hover:text-ink"
    );

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-surface border-t-2 border-ink lg:hidden flex items-center justify-around h-14 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
      <NavLink to="/dashboard" className={navItemClass}>
        <LayoutDashboard className="w-5 h-5 mb-0.5" />
        <span>Dasbor</span>
      </NavLink>
      <NavLink to="/learn" className={navItemClass}>
        <BookOpen className="w-5 h-5 mb-0.5" />
        <span>Belajar</span>
      </NavLink>
      <NavLink to="/tools/products" className={navItemClass}>
        <Wrench className="w-5 h-5 mb-0.5" />
        <span>Workspace</span>
      </NavLink>
      <NavLink to="/projects" className={navItemClass}>
        <Award className="w-5 h-5 mb-0.5" />
        <span>Proyek</span>
      </NavLink>
      <NavLink to="/affiliate" className={navItemClass}>
        <Share2 className="w-5 h-5 mb-0.5" />
        <span>Affiliate</span>
      </NavLink>
    </nav>
  );
};
