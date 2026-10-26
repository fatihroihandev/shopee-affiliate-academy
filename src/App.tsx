import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/features/auth/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AppRoutes } from '@/routes/AppRoutes';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-paper">
          <Navbar />
          <main className="flex-1">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
