import type { AuthService } from '../contracts/auth-service';
import type { AuthProviderId, DevelopmentLocalAuthSession } from '../contracts/types';
import { isDevelopmentAuthBypassEnabled } from '../developmentAuthGate';
import { resolvePostSignInRoute } from '../resolvePostSignInRoute';

const DEV_LOCAL_ACCOUNT_ID = 'dev-local-account';

export function createDevelopmentLocalAuthAdapter(
  initialSession: DevelopmentLocalAuthSession | null = null,
): AuthService {
  let session = initialSession;

  return {
    isDevelopmentBypassAvailable() {
      return isDevelopmentAuthBypassEnabled();
    },
    signInWithProvider(provider: AuthProviderId) {
      if (!isDevelopmentAuthBypassEnabled()) {
        throw new Error('Development auth bypass is unavailable in this build.');
      }

      session = {
        kind: 'development_local',
        accountId: DEV_LOCAL_ACCOUNT_ID,
        signedInWith: provider,
        profileComplete: session?.profileComplete ?? false,
      };

      return {
        session,
        nextRoute: resolvePostSignInRoute(session),
      };
    },
    getSession() {
      return session;
    },
    signOut() {
      session = null;
    },
    markProfileComplete() {
      if (!session) {
        return;
      }
      session = {
        ...session,
        profileComplete: true,
      };
    },
  };
}
