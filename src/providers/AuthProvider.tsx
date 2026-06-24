'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/shared/lib/supabase/client';
import { Role } from '@/shared/types/roles';

interface AuthContextType {
  user: User | null;
  role: Role | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch role from user_roles table
          const { data, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();
            
          if (roleError && roleError.code !== 'PGRST116') {
            // PGRST116 is the "no rows returned" error, which we can ignore
            console.error("Error fetching user role:", roleError);
          } else if (data) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setRole((data as any).role as Role);
          }
        }
      } catch (error) {
        console.error("Failed to fetch session in AuthProvider:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: any, session: any) => {
      try {
        setUser(session?.user ?? null);
        if (session?.user) {
          const { data, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();
            
          if (roleError && roleError.code !== 'PGRST116') {
             console.error("Error fetching user role on state change:", roleError);
          } else if (data) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setRole((data as any).role as Role);
          }
        } else {
          setRole(null);
        }
      } catch (error) {
         console.error("Failed to handle auth state change in AuthProvider:", error);
      } finally {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user, role, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
