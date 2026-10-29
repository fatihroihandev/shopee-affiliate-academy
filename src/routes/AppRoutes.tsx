import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { ForgotPassword } from '@/pages/ForgotPassword';
import { TermsPage } from '@/pages/legal/TermsPage';
import { PrivacyPage } from '@/pages/legal/PrivacyPage';
import { Dashboard } from '@/pages/Dashboard';
import { ModulesIndex } from '@/pages/learning/ModulesIndex';
import { ModuleDetail } from '@/pages/learning/ModuleDetail';
import { LessonReader } from '@/pages/learning/LessonReader';
import { ProjectsIndex } from '@/pages/learning/ProjectsIndex';
import { ProjectDetail } from '@/pages/learning/ProjectDetail';
import { ProPlusBonusViewer } from '@/pages/learning/ProPlusBonusViewer';
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

// Guest Only Route: Logged-in users cannot access landing/auth pages and are redirected to /dashboard
const GuestOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes - Landing page & Pricing accessible to both guests & registered users */}
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Home />} />
      <Route
        path="/login"
        element={
          <GuestOnlyRoute>
            <Login />
          </GuestOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestOnlyRoute>
            <Register />
          </GuestOnlyRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <GuestOnlyRoute>
            <ForgotPassword />
          </GuestOnlyRoute>
        }
      />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />

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
      <Route
        path="/pro-plus-bonus"
        element={
          <ProtectedRoute>
            <ProPlusBonusViewer />
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
