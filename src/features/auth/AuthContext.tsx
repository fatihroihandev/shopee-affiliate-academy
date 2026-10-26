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

  const refreshProfile = async () => {
    if (user) {
      await fetchUserData(user);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
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
