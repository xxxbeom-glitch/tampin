import { resolveInitialRootRouteName } from '../src/app/navigation/devInitialRoute';

describe('DEV-009 dev initial route infrastructure', () => {
  const originalEnv = process.env.EXPO_PUBLIC_DEV_INITIAL_ROUTE;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.EXPO_PUBLIC_DEV_INITIAL_ROUTE;
    } else {
      process.env.EXPO_PUBLIC_DEV_INITIAL_ROUTE = originalEnv;
    }
  });

  it('reads EXPO_PUBLIC_DEV_INITIAL_ROUTE in development builds', () => {
    process.env.EXPO_PUBLIC_DEV_INITIAL_ROUTE = 'UiCatalog';

    expect(resolveInitialRootRouteName({ isDev: true })).toBe('UiCatalog');
  });

  it('keeps product cold launch at Splash when no dev override is set', () => {
    delete process.env.EXPO_PUBLIC_DEV_INITIAL_ROUTE;

    expect(resolveInitialRootRouteName({ isDev: true })).toBe('Splash');
    expect(resolveInitialRootRouteName({ isDev: false })).toBe('Splash');
  });
});
