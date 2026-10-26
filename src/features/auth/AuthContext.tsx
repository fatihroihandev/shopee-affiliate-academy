import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { Profile, UserRole } from '@/types/database';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: UserRole;
  isAdmin: boolean;
  isPremium: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  loginAsDemo: (demoRole: 'student' | 'admin', isPro?: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<UserRole>('student');
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserData = async (currentUser: User) => {
    try {
      // 1. Fetch Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();
      if (profileData) setProfile(profileData);

      // 2. Fetch Role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', currentUser.id)
        .single();
      const currentRole = (roleData?.role as UserRole) || 'student';
      setRole(currentRole);

      // 3. Fetch Entitlement (Admin always has full access)
      if (currentRole === 'admin' || currentRole === 'super_admin') {
        setIsPremium(true);
      } else {
        const { data: entitlementData } = await supabase
          .from('entitlements')
          .select('status')
          .eq('user_id', currentUser.id)
          .eq('product_code', 'affiliate_academy')
          .eq('status', 'active')
          .maybeSingle();

        setIsPremium(!!entitlementData);
      }
    } catch (err) {
      console.warn('Error fetching user profile data:', err);
    }
  };

  useEffect(() => {
    // 1. Check if demo session exists in localStorage
    const savedDemo = localStorage.getItem('shopee_academy_demo_session');
    if (savedDemo) {
      try {
        const parsed = JSON.parse(savedDemo);
        setUser(parsed.user);
        setProfile(parsed.profile);
        setRole(parsed.role);
        setIsPremium(parsed.isPremium);
        setLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem('shopee_academy_demo_session');
      }
    }

    // 2. Real Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Don't override if in demo session
      if (localStorage.getItem('shopee_academy_demo_session')) return;

      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user).finally(() => setLoading(false));
      } else {
        setProfile(null);
        setRole('student');
        setIsPremium(false);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginAsDemo = (demoRole: 'student' | 'admin', isPro = true) => {
    const isAdm = demoRole === 'admin';
    const mockUser = {
      id: isAdm ? '00000000-0000-0000-0000-admin0000001' : '00000000-0000-0000-0000-student000001',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      email: isAdm ? 'admin@affiliate-academy.id' : 'siswa.demo@affiliate-academy.id',
    } as User;

    const mockProfile: Profile = {
      id: mockUser.id,
      display_name: isAdm ? 'Admin Utama Akademi' : 'Fatih Siswa Pro',
      avatar_url: null,
      phone_number: '081234567890',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const demoData = {
      user: mockUser,
      profile: mockProfile,
      role: demoRole,
      isPremium: isAdm ? true : isPro,
    };

    localStorage.setItem('shopee_academy_demo_session', JSON.stringify(demoData));
    setUser(mockUser);
    setProfile(mockProfile);
    setRole(demoRole);
    setIsPremium(demoData.isPremium);
  };

  const refreshProfile = async () => {
    if (user && !localStorage.getItem('shopee_academy_demo_session')) {
      await fetchUserData(user);
    }
  };

  const signOut = async () => {
    localStorage.removeItem('shopee_academy_demo_session');
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // ignore network errors if offline
    }
    setUser(null);
    setSession(null);
    setProfile(null);
    setRole('student');
    setIsPremium(false);
  };

  const isAdmin = role === 'admin' || role === 'super_admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        role,
        isAdmin,
        isPremium,
        loading,
        signOut,
        refreshProfile,
        loginAsDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
