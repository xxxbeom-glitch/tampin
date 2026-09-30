import {
  AuthBypassUnavailableError,
} from '../src/auth/contracts/auth-service';
import { createDevelopmentLocalAuthAdapter } from '../src/auth/adapters/developmentLocalAuthAdapter';
import { createUnavailableAuthAdapter } from '../src/auth/adapters/unavailableAuthAdapter';
import { resolvePostSignInRoute } from '../src/auth/resolvePostSignInRoute';

describe('DEV-006 development auth adapter', () => {
  it('creates the same local account for Google and Kakao provider parity', () => {
    const service = createDevelopmentLocalAuthAdapter();

    const googleResult = service.signInWithProvider('google');
    expect(googleResult.session.accountId).toBe('dev-local-account');
    expect(googleResult.nextRoute).toBe('OnboardingBasicInfo');

    service.signOut();

    const kakaoResult = service.signInWithProvider('kakao');
    expect(kakaoResult.session.accountId).toBe('dev-local-account');
    expect(kakaoResult.nextRoute).toBe('OnboardingBasicInfo');
  });

  it('routes first-run sessions to OnboardingBasicInfo and completed profiles to RoutineHome', () => {
    const service = createDevelopmentLocalAuthAdapter();

    const firstRun = service.signInWithProvider('google');
    expect(firstRun.nextRoute).toBe('OnboardingBasicInfo');
    expect(resolvePostSignInRoute(firstRun.session)).toBe('OnboardingBasicInfo');

    service.markProfileComplete();
    const completed = service.signInWithProvider('kakao');
    expect(completed.nextRoute).toBe('RoutineHome');
    expect(resolvePostSignInRoute(completed.session)).toBe('RoutineHome');
  });

  it('resets the in-memory development session on signOut', () => {
    const service = createDevelopmentLocalAuthAdapter();

    service.signInWithProvider('google');
    expect(service.getSession()).not.toBeNull();

    service.signOut();
    expect(service.getSession()).toBeNull();
  });

  it('fail-closes in release configuration and never creates a session', () => {
    const originalDev = (global as { __DEV__?: boolean }).__DEV__;

    try {
      (global as { __DEV__?: boolean }).__DEV__ = false;

      jest.isolateModules(() => {
        const { createAuthService: createReleaseAuthService } =
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          require('../src/auth/createAuthService') as typeof import('../src/auth/createAuthService');
        const service = createReleaseAuthService();

        expect(service.isDevelopmentBypassAvailable()).toBe(false);
        expect(() => service.signInWithProvider('google')).toThrow(
          'Development auth bypass is unavailable in this build.',
        );
        expect(service.getSession()).toBeNull();
      });
    } finally {
      (global as { __DEV__?: boolean }).__DEV__ = originalDev;
    }
  });

  it('uses the unavailable adapter when bypass is disabled', () => {
    const service = createUnavailableAuthAdapter();
    expect(service.isDevelopmentBypassAvailable()).toBe(false);
    expect(() => service.signInWithProvider('kakao')).toThrow(AuthBypassUnavailableError);
  });
});
