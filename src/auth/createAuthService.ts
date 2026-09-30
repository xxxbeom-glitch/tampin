import { createDevelopmentLocalAuthAdapter } from './adapters/developmentLocalAuthAdapter';
import { createUnavailableAuthAdapter } from './adapters/unavailableAuthAdapter';
import type { AuthService } from './contracts/auth-service';
import { isDevelopmentAuthBypassEnabled } from './developmentAuthGate';

export function createAuthService(): AuthService {
  if (isDevelopmentAuthBypassEnabled()) {
    return createDevelopmentLocalAuthAdapter();
  }
  return createUnavailableAuthAdapter();
}
