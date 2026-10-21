import * as React from "react";
import { actions, useCurrentUser } from "@/lib/api/queries";
import type { User } from "@/lib/api/types";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (name: string, email: string, password: string) => Promise<User>;
  signOut: () => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useCurrentUser();
  // Mock membaca localStorage secara sinkron; loading hanya untuk menjaga bentuk
  // kontrak yang sama dengan API nanti (token restore).
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      signIn: async (email, password) => actions.signIn(email, password),
      signUp: async (name, email, password) => actions.signUp(name, email, password),
      signOut: () => actions.signOut(),
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam AuthProvider");
  return ctx;
}
