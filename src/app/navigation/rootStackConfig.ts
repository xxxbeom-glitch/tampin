import { resolveInitialRootRouteName } from './devInitialRoute';
import type { RootStackParamList, RootStackRouteName } from './types';

type StackScreenConfig = {
  name: RootStackRouteName;
  title: string;
};

const PRODUCT_FLOW_SCREENS: StackScreenConfig[] = [
  { name: 'Splash', title: 'Splash' },
  { name: 'Auth', title: 'Auth' },
  { name: 'OnboardingBasicInfo', title: 'Basic Info' },
  { name: 'RoutineHome', title: 'Routine Home' },
  { name: 'RoutineEditor', title: 'Routine Editor' },
  { name: 'ExerciseSelection', title: 'Exercise Selection' },
  { name: 'ActiveWorkout', title: 'Active Workout' },
  { name: 'RestTimer', title: 'Rest Timer' },
  { name: 'Completion', title: 'Completion' },
  { name: 'Analysis', title: 'Analysis' },
  { name: 'Settings', title: 'Settings' },
];

const UI_CATALOG_SCREEN: StackScreenConfig = {
  name: 'UiCatalog',
  title: 'UI Catalog',
};

/** Resolves which root stack routes are registered for the current build mode. */
export function getRegisteredRootStackScreens(
  isDev: boolean = __DEV__,
): StackScreenConfig[] {
  if (isDev) {
    return [...PRODUCT_FLOW_SCREENS, UI_CATALOG_SCREEN];
  }

  return PRODUCT_FLOW_SCREENS;
}

export function isUiCatalogRoute(
  routeName: RootStackRouteName,
): routeName is 'UiCatalog' {
  return routeName === 'UiCatalog';
}

export function getInitialRootRouteName(): keyof RootStackParamList {
  return resolveInitialRootRouteName();
}
