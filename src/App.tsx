import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/features/auth/AuthContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AppRoutes } from '@/routes/AppRoutes';
import { captureReferralParam } from '@/features/affiliate/affiliateStorage';

export const App: React.FC = () => {
  useEffect(() => {
    captureReferralParam();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-paper">
            <Navbar />
            <main className="flex-1">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
