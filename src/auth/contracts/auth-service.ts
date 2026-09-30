import type {
  AuthProviderId,
  DevelopmentLocalAuthSession,
  PostSignInRouteName,
} from './types';

export class AuthBypassUnavailableError extends Error {
  constructor(message = 'Development auth bypass is unavailable in this build.') {
    super(message);
    this.name = 'AuthBypassUnavailableError';
  }
}

export interface AuthService {
  isDevelopmentBypassAvailable(): boolean;
  signInWithProvider(provider: AuthProviderId): {
    session: DevelopmentLocalAuthSession;
    nextRoute: PostSignInRouteName;
  };
  getSession(): DevelopmentLocalAuthSession | null;
  signOut(): void;
  markProfileComplete(): void;
}
