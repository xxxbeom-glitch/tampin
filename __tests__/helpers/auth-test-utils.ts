import { createDevelopmentLocalAuthAdapter } from '../../src/auth/adapters/developmentLocalAuthAdapter';

export function createTestAuthService() {
  return createDevelopmentLocalAuthAdapter();
}
