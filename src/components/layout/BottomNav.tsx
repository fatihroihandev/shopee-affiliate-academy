import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Wrench, Share2, Menu } from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';
import { cn } from '@/lib/utils';

export const BottomNav: React.FC = () => {
  const { pathname } = useLocation();
  const { openSidebar, isOpen } = useSidebar();

  const navItemClass = (isActive: boolean) =>
    cn(
      'flex flex-col items-center justify-center gap-0.5 px-2 py-2 flex-1 transition-all relative',
      isActive ? 'text-brand-orange' : 'text-warm-gray hover:text-ink'
    );

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-surface border-t-2 border-ink lg:hidden flex items-stretch justify-around h-16 shadow-[0_-3px_0px_#171717]">
      {/* 1. Dasbor */}
      <NavLink to="/dashboard" className={({ isActive }) => navItemClass(isActive)}>
        {({ isActive }) => (
          <>
            {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-orange rounded-b-full" />}
            <LayoutDashboard className={cn('w-5 h-5 transition-transform', isActive ? 'scale-110' : 'scale-100')} strokeWidth={isActive ? 2.5 : 1.75} />
            <span className={cn('text-[10px] font-bold leading-none', isActive ? 'text-brand-orange' : 'text-warm-gray')}>Dasbor</span>
          </>
        )}
      </NavLink>

      {/* 2. Belajar */}
      <NavLink to="/learn" className={({ isActive }) => navItemClass(isActive || pathname.startsWith('/learn'))}>
        {({ isActive }) => (
          <>
            {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-orange rounded-b-full" />}
            <BookOpen className={cn('w-5 h-5 transition-transform', isActive ? 'scale-110' : 'scale-100')} strokeWidth={isActive ? 2.5 : 1.75} />
            <span className={cn('text-[10px] font-bold leading-none', isActive ? 'text-brand-orange' : 'text-warm-gray')}>Belajar</span>
          </>
        )}
      </NavLink>

      {/* 3. Workspace */}
      <NavLink to="/tools/products" className={() => navItemClass(pathname.startsWith('/tools'))}>
        {() => {
          const isActive = pathname.startsWith('/tools');
          return (
            <>
              {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-orange rounded-b-full" />}
              <Wrench className={cn('w-5 h-5 transition-transform', isActive ? 'scale-110' : 'scale-100')} strokeWidth={isActive ? 2.5 : 1.75} />
              <span className={cn('text-[10px] font-bold leading-none', isActive ? 'text-brand-orange' : 'text-warm-gray')}>Workspace</span>
            </>
          );
        }}
      </NavLink>

      {/* 4. Affiliate */}
      <NavLink to="/affiliate" className={({ isActive }) => navItemClass(isActive)}>
        {({ isActive }) => (
          <>
            {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-orange rounded-b-full" />}
            <Share2 className={cn('w-5 h-5 transition-transform', isActive ? 'scale-110' : 'scale-100')} strokeWidth={isActive ? 2.5 : 1.75} />
            <span className={cn('text-[10px] font-bold leading-none', isActive ? 'text-brand-orange' : 'text-warm-gray')}>Affiliate</span>
          </>
        )}
      </NavLink>

      {/* 5. Menu Sidebar Drawer Toggle */}
      <button
        onClick={openSidebar}
        className={navItemClass(isOpen)}
        aria-label="Buka Menu Sidebar Lengkap"
      >
        {isOpen && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-orange rounded-b-full" />}
        <Menu className={cn('w-5 h-5 transition-transform', isOpen ? 'scale-110 text-brand-orange' : 'scale-100')} strokeWidth={isOpen ? 2.5 : 1.75} />
        <span className={cn('text-[10px] font-bold leading-none', isOpen ? 'text-brand-orange' : 'text-warm-gray')}>Sidebar</span>
      </button>
    </nav>
  );
};
