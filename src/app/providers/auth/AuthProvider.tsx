import { type ReactNode, useCallback, useMemo, useState } from 'react';
import type { AuthService } from '../../../auth/contracts/auth-service';
import type { AuthProviderId } from '../../../auth/contracts/types';
import { createAuthService } from '../../../auth/createAuthService';
import { AuthContext, type AuthContextValue } from './AuthContext';

type AuthProviderProps = {
  children: ReactNode;
  authService?: AuthService;
};

export function AuthProvider({ children, authService }: AuthProviderProps) {
  const [service] = useState(() => authService ?? createAuthService());
  const [session, setSession] = useState(service.getSession());

  const refreshSession = useCallback(() => {
    setSession(service.getSession());
  }, [service]);

  const signInWithProvider = useCallback(
    (provider: AuthProviderId) => {
      const result = service.signInWithProvider(provider);
      setSession(result.session);
      return result;
    },
    [service],
  );

  const signOut = useCallback(() => {
    service.signOut();
    refreshSession();
  }, [service, refreshSession]);

  const markProfileComplete = useCallback(() => {
    service.markProfileComplete();
    refreshSession();
  }, [service, refreshSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isBypassAvailable: service.isDevelopmentBypassAvailable(),
      signInWithProvider,
      signOut,
      markProfileComplete,
    }),
    [session, service, signInWithProvider, signOut, markProfileComplete],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
