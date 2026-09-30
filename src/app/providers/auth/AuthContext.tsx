import { createContext } from 'react';
import type { AuthService } from '../../../auth/contracts/auth-service';
import type { DevelopmentLocalAuthSession } from '../../../auth/contracts/types';

export type AuthContextValue = {
  session: DevelopmentLocalAuthSession | null;
  isBypassAvailable: boolean;
  signInWithProvider: AuthService['signInWithProvider'];
  signOut: AuthService['signOut'];
  markProfileComplete: AuthService['markProfileComplete'];
};

export const AuthContext = createContext<AuthContextValue | null>(null);
