import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { ForgotPassword } from '@/pages/ForgotPassword';
import { Dashboard } from '@/pages/Dashboard';
import { ModulesIndex } from '@/pages/learning/ModulesIndex';
import { ModuleDetail } from '@/pages/learning/ModuleDetail';
import { LessonReader } from '@/pages/learning/LessonReader';
import { ProjectsIndex } from '@/pages/learning/ProjectsIndex';
import { ProjectDetail } from '@/pages/learning/ProjectDetail';
import { ProductResearchLab } from '@/pages/workspaces/ProductResearchLab';
import { ResearchNotes } from '@/pages/workspaces/ResearchNotes';
import { ContentStudio } from '@/pages/workspaces/ContentStudio';
import { ContentPlanner } from '@/pages/workspaces/ContentPlanner';
import { LinkArchive } from '@/pages/workspaces/LinkArchive';
import { PerformanceTracker } from '@/pages/workspaces/PerformanceTracker';
import { ExperimentTracker } from '@/pages/workspaces/ExperimentTracker';
import { SopDocuments } from '@/pages/workspaces/SopDocuments';
import { AffiliateDashboard } from '@/pages/affiliate/AffiliateDashboard';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
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

      {/* Protected Student LMS Routes */}
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
            <ModulesIndex />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learn/:moduleSlug"
        element={
          <ProtectedRoute>
            <ModuleDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learn/:moduleSlug/:lessonSlug"
        element={
          <ProtectedRoute>
            <LessonReader />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <ProjectsIndex />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:projectCode"
        element={
          <ProtectedRoute>
            <ProjectDetail />
          </ProtectedRoute>
        }
      />

      {/* 6 Workspace Routes (Fase 4) */}
      <Route
        path="/tools/products"
        element={
          <ProtectedRoute>
            <ProductResearchLab />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/research-notes"
        element={
          <ProtectedRoute>
            <ResearchNotes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/content"
        element={
          <ProtectedRoute>
            <ContentStudio />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/planner"
        element={
          <ProtectedRoute>
            <ContentPlanner />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/links"
        element={
          <ProtectedRoute>
            <LinkArchive />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/tracker"
        element={
          <ProtectedRoute>
            <PerformanceTracker />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/experiments"
        element={
          <ProtectedRoute>
            <ExperimentTracker />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tools/sop"
        element={
          <ProtectedRoute>
            <SopDocuments />
          </ProtectedRoute>
        }
      />

      {/* Program Affiliate Internal (Fase 5) */}
      <Route
        path="/affiliate/*"
        element={
          <ProtectedRoute>
            <AffiliateDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Route (Fase 6) */}
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
