import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { Profile, UserRole, ProductTier } from '@/types/database';
import { getUserEntitlement } from '@/features/commerce/orderStorage';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: UserRole;
  tier: ProductTier;
  isAdmin: boolean;
  isPremium: boolean; // Kept for 100% backward compatibility (true if Pro or Pro Plus)
  isPro: boolean;
  isProPlus: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  loginAsDemo: (
    demoRole: 'student' | 'admin',
    demoTier?: ProductTier | boolean,
    adminType?: 'utama' | 'backup'
  ) => void;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  setTier: (tier: ProductTier) => void;
  setIsPremium: (isPremium: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<UserRole>('student');
  const [tier, setTier] = useState<ProductTier>('free');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserData = async (currentUser: User) => {
    try {
      // 1. Fetch Profile or create idempotently if first Google OAuth login
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
      } else {
        // Idempotent auto-profile creation for Google OAuth users
        const meta = currentUser.user_metadata || {};
        const fallbackName = meta.full_name || meta.name || currentUser.email?.split('@')[0] || 'Siswa Baru';
        const fallbackAvatar = meta.avatar_url || meta.picture || null;

        const { data: newProfile } = await supabase
          .from('profiles')
          .upsert({
            id: currentUser.id,
            display_name: fallbackName,
            avatar_url: fallbackAvatar,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select('*')
          .maybeSingle();

        if (newProfile) setProfile(newProfile);
      }

      // 2. Fetch Role & Check Dual Admin accounts (Admin Utama & Admin Backup)
      const userEmail = (currentUser.email || '').toLowerCase().trim();
      let currentRole: UserRole = 'student';

      if (
        userEmail === 'admin@affiliateacademy.site' ||
        userEmail === 'admin.utama@affiliateacademy.site' ||
        userEmail === 'admin@affiliate-academy.id' ||
        userEmail === 'admin.utama@affiliate-academy.id'
      ) {
        currentRole = 'super_admin';
      } else if (
        userEmail === 'admin.backup@affiliateacademy.site' ||
        userEmail === 'admin.backup@affiliate-academy.id'
      ) {
        currentRole = 'admin';
      } else {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', currentUser.id)
          .maybeSingle();
        currentRole = (roleData?.role as UserRole) || 'student';
      }
      setRole(currentRole);

      // 3. Fetch Entitlement (Admin always has full pro_plus access)
      if (currentRole === 'admin' || currentRole === 'super_admin') {
        setTier('pro_plus');
      } else {
        // First check database entitlements
        const { data: entitlementData } = await supabase
          .from('entitlements')
          .select('status, access_level')
          .eq('user_id', currentUser.id)
          .eq('product_code', 'affiliate_academy')
          .eq('status', 'active')
          .maybeSingle();

        let resolvedTier: ProductTier = 'free';
        if (entitlementData) {
          const rawLevel = entitlementData.access_level;
          if (rawLevel === 'pro_plus') {
            resolvedTier = 'pro_plus';
          } else if (rawLevel === 'pro' || rawLevel === 'premium') {
            resolvedTier = 'pro';
          }
        } else {
          // Fallback check: Look up manual/comped VIP grants in local order storage
          const localEnt = getUserEntitlement(userEmail || currentUser.id);
          if (localEnt && localEnt.status === 'active') {
            resolvedTier = localEnt.access_level === 'pro_plus' ? 'pro_plus' : 'pro';
          }
        }
        setTier(resolvedTier);
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
        setTier(parsed.tier || (parsed.isPremium ? 'pro' : 'free'));
        setLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem('shopee_academy_demo_session');
      }
    }

    // 2. Real Supabase session (including Google OAuth callback)
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
        setTier('free');
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginAsDemo = (
    demoRole: 'student' | 'admin',
    demoTierOrPro: ProductTier | boolean = 'pro',
    adminType: 'utama' | 'backup' = 'utama'
  ) => {
    const isAdm = demoRole === 'admin';
    let resolvedTier: ProductTier = 'pro';
    if (typeof demoTierOrPro === 'boolean') {
      resolvedTier = demoTierOrPro ? 'pro' : 'free';
    } else if (demoTierOrPro) {
      resolvedTier = demoTierOrPro;
    }
    if (isAdm) resolvedTier = 'pro_plus';

    const assignedRole: UserRole = isAdm
      ? adminType === 'utama'
        ? 'super_admin'
        : 'admin'
      : 'student';

    const adminId =
      adminType === 'backup'
        ? '00000000-0000-0000-0000-admin0000002'
        : '00000000-0000-0000-0000-admin0000001';

    const adminEmail =
      adminType === 'backup'
        ? 'admin.backup@affiliateacademy.site'
        : 'admin.utama@affiliateacademy.site';

    const adminName =
      adminType === 'backup'
        ? 'Admin Cadangan (Backup Admin)'
        : 'Admin Utama (Super Admin)';

    const mockUser = {
      id: isAdm ? adminId : `00000000-0000-0000-0000-student-${resolvedTier}`,
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      email: isAdm ? adminEmail : `siswa.${resolvedTier}@affiliateacademy.site`,
    } as User;

    const mockProfile: Profile = {
      id: mockUser.id,
      display_name: isAdm
        ? adminName
        : resolvedTier === 'pro_plus'
        ? 'Fatih Siswa Pro Plus'
        : resolvedTier === 'pro'
        ? 'Fatih Siswa Pro'
        : 'Fatih Siswa Free',
      avatar_url: null,
      phone_number: '081234567890',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const demoData = {
      user: mockUser,
      profile: mockProfile,
      role: assignedRole,
      tier: resolvedTier,
      isPremium: resolvedTier !== 'free',
    };

    localStorage.setItem('shopee_academy_demo_session', JSON.stringify(demoData));
    setUser(mockUser);
    setProfile(mockProfile);
    setRole(assignedRole);
    setTier(resolvedTier);
  };

  const handleSetTier = (newTier: ProductTier) => {
    setTier(newTier);
    const savedDemo = localStorage.getItem('shopee_academy_demo_session');
    if (savedDemo) {
      try {
        const parsed = JSON.parse(savedDemo);
        parsed.tier = newTier;
        parsed.isPremium = newTier !== 'free';
        localStorage.setItem('shopee_academy_demo_session', JSON.stringify(parsed));
      } catch (e) {
        // ignore
      }
    }
  };

  const handleSetIsPremium = (val: boolean) => {
    handleSetTier(val ? 'pro' : 'free');
  };

  const signInWithGoogle = async (): Promise<{ error: Error | null }> => {
    try {
      const redirectUrl = `${window.location.origin}/dashboard`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });
      return { error: error ? new Error(error.message) : null };
    } catch (err: any) {
      return { error: err || new Error('Gagal menginisiasi Google OAuth') };
    }
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
    setTier('free');
  };

  const isAdmin = role === 'admin' || role === 'super_admin';
  const isPro = tier === 'pro' || tier === 'pro_plus' || isAdmin;
  const isProPlus = tier === 'pro_plus' || isAdmin;
  const isPremium = isPro;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        role,
        tier,
        isAdmin,
        isPremium,
        isPro,
        isProPlus,
        loading,
        signOut,
        refreshProfile,
        loginAsDemo,
        signInWithGoogle,
        setTier: handleSetTier,
        setIsPremium: handleSetIsPremium,
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
