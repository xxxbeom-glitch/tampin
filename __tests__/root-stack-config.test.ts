import {
  getInitialRootRouteName,
  getRegisteredRootStackScreens,
} from '../src/app/navigation/rootStackConfig';
import { PRODUCT_FLOW_ROUTE_NAMES } from '../src/app/navigation/types';

describe('DEV-003 root stack configuration', () => {
  it('covers all MVP product flow boundaries in typed route contracts', () => {
    expect(PRODUCT_FLOW_ROUTE_NAMES).toEqual([
      'Bootstrap',
      'Auth',
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

  it('uses Bootstrap as the initial product route', () => {
    expect(getInitialRootRouteName()).toBe('Bootstrap');
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
