import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { ForgotPassword } from '@/pages/ForgotPassword';
import { Dashboard } from '@/pages/Dashboard';
import { AppLayout } from '@/components/layout/AppLayout';
import { Loader2 } from 'lucide-react';

// Protected Route Component (Wraps with AppLayout for student dashboard & workspaces)
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <AppLayout>{children}</AppLayout>;
};

// Admin Route Component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <AppLayout>{children}</AppLayout>;
};

// Placeholder page for upcoming phase routes
const ComingSoonPage: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
    <div className="brutalist-card p-12 bg-surface space-y-4">
      <h2 className="text-2xl font-extrabold text-ink">{title}</h2>
      <p className="text-sm text-warm-gray max-w-md mx-auto">{desc}</p>
      <div className="pt-2">
        <a href="/dashboard" className="brutalist-btn bg-brand-orange text-white px-5 py-2.5 text-xs">
          Kembali ke Dashboard
        </a>
      </div>
    </div>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/pricing" element={<Home />} />
      <Route
        path="/terms"
        element={<ComingSoonPage title="Ketentuan Layanan" desc="Ketentuan akses jangka panjang dan regulasi operasional." />}
      />
      <Route
        path="/privacy"
        element={<ComingSoonPage title="Kebijakan Privasi" desc="Perlindungan dan kepatuhan privasi data pengguna." />}
      />

      {/* Protected Student Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learn"
        element={
          <ProtectedRoute>
            <ComingSoonPage title="Ruang Belajar (M00 - M06)" desc="Akan diaktifkan pada Fase 3 dengan 30 pelajaran lengkap." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learn/:moduleSlug"
        element={
          <ProtectedRoute>
            <ComingSoonPage title="Daftar Pelajaran Modul" desc="Modul kurikulum pembelajaran Shopee Affiliate V2." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learn/:moduleSlug/:lessonSlug"
        element={
          <ProtectedRoute>
            <ComingSoonPage title="Lesson Reader" desc="Halaman materi pembelajaran Markdown interaktif." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <ComingSoonPage title="8 Proyek Praktik Wajib" desc="Pusat pengerjaan dan pelacak kelulusan 8 proyek." />
          </ProtectedRoute>
        }
      />

      {/* 6 Workspace Routes */}
      <Route
        path="/tools/products"
        element={
          <ProtectedRoute>
            <ComingSoonPage title="Product Research Lab" desc="Workspace riset produk dengan skor 7 faktor berbobot (Fase 4)." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/research-notes"
        element={
          <ProtectedRoute>
            <ComingSoonPage title="Research Notes" desc="Pusat catatan riset niche dan kompetitor (Fase 4)." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/content"
        element={
          <ProtectedRoute>
            <ComingSoonPage title="Content Creation Studio" desc="Studio perancangan naskah, hook bank, dan QC checklist (Fase 4)." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/planner"
        element={
          <ProtectedRoute>
            <ComingSoonPage title="Content Planner" desc="Kalender jadwal publikasi 30 hari (Fase 4)." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/links"
        element={
          <ProtectedRoute>
            <ComingSoonPage title="Link Archive" desc="Manajemen tautan Shopee Affiliate terorganisir (Fase 4)." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/tracker"
        element={
          <ProtectedRoute>
            <ComingSoonPage title="Performance Tracker" desc="Pencatatan metrik CTR, CVR, EPC harian dan rekap periode (Fase 4)." />
          </ProtectedRoute>
        }
      />

      {/* Program Affiliate Internal */}
      <Route
        path="/affiliate"
        element={
          <ProtectedRoute>
            <ComingSoonPage title="Dashboard Affiliate" desc="Dasbor analitik link referral dan permohonan pencairan komisi (Fase 5)." />
          </ProtectedRoute>
        }
      />

      {/* Admin Route */}
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <ComingSoonPage title="Admin Command Center" desc="Dasbor admin pengelolaan order, entitlement, dan audit log (Fase 6)." />
          </AdminRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
