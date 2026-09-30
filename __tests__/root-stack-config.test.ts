import {
  DEV_INITIAL_ROUTE_ENV_KEY,
  resolveInitialRootRouteName,
} from '../src/app/navigation/devInitialRoute';
import {
  getInitialRootRouteName,
  getRegisteredRootStackScreens,
} from '../src/app/navigation/rootStackConfig';
import { PRODUCT_FLOW_ROUTE_NAMES } from '../src/app/navigation/types';

describe('DEV-003 root stack configuration', () => {
  it('covers all MVP product flow boundaries in typed route contracts', () => {
    expect(PRODUCT_FLOW_ROUTE_NAMES).toEqual([
      'Splash',
      'Auth',
      'OnboardingBasicInfo',
      'RoutineHome',
      'RoutineEditor',
      'ExerciseSelection',
      'ActiveWorkout',
      'RestTimer',
      'Completion',
      'Analysis',
      'Settings',
    ]);
  });

  it('uses Splash as the initial product route', () => {
    expect(getInitialRootRouteName()).toBe('Splash');
  });

  it('allows dev-only initial route injection at the root navigator level', () => {
    expect(resolveInitialRootRouteName({ isDev: true, devInitialRouteOverride: 'UiCatalog' })).toBe(
      'UiCatalog',
    );
    expect(resolveInitialRootRouteName({ isDev: true, devInitialRouteOverride: 'Auth' })).toBe(
      'Splash',
    );
    expect(resolveInitialRootRouteName({ isDev: true, devInitialRouteOverride: null })).toBe(
      'Splash',
    );
  });

  it('ignores dev initial route injection in release builds', () => {
    expect(
      resolveInitialRootRouteName({
        isDev: false,
        devInitialRouteOverride: 'UiCatalog',
      }),
    ).toBe('Splash');
  });

  it('documents the dev initial route env key for intentional cold-start catalog access', () => {
    expect(DEV_INITIAL_ROUTE_ENV_KEY).toBe('EXPO_PUBLIC_DEV_INITIAL_ROUTE');
  });

  it('registers UiCatalog only in development builds', () => {
    const devRoutes = getRegisteredRootStackScreens(true).map((screen) => screen.name);
    const releaseRoutes = getRegisteredRootStackScreens(false).map(
      (screen) => screen.name,
    );

    expect(devRoutes).toContain('UiCatalog');
    expect(releaseRoutes).not.toContain('UiCatalog');
    expect(releaseRoutes).toEqual([...PRODUCT_FLOW_ROUTE_NAMES]);
  });
});
