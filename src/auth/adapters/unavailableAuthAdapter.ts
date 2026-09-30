import {
  AuthBypassUnavailableError,
  type AuthService,
} from '../contracts/auth-service';
import type { AuthProviderId } from '../contracts/types';

/** Fail-closed adapter for release/non-dev builds. Never creates a session. */
export function createUnavailableAuthAdapter(): AuthService {
  return {
    isDevelopmentBypassAvailable() {
      return false;
    },
    signInWithProvider(_provider: AuthProviderId): never {
      throw new AuthBypassUnavailableError();
    },
    getSession() {
      return null;
    },
    signOut() {
      // no-op
    },
    markProfileComplete() {
      // no-op
    },
  };
}
