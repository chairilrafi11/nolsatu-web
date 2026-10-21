import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";

import { router } from "@/app/router";
import { AuthProvider, useAuth } from "@/features/auth/context/AuthProvider";
import { ThemeProvider } from "@/lib/theme/theme";
import { ToastProvider } from "@/shared/ui/Toast";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, refetchOnWindowFocus: false } },
});

function RouterBridge() {
  const { user, loading } = useAuth();
  React.useLayoutEffect(() => {
    router.update({
      context: {
        authLoading: loading,
        isAuthenticated: Boolean(user),
        role: user?.role ?? null,
      },
    });
    void router.invalidate();
  }, [user, loading]);
  return null;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AuthProvider>
            <RouterBridge />
            {children}
          </AuthProvider>
        </ToastProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
