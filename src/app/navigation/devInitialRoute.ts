import type { RootStackParamList } from './types';

/** Expo public env key for dev-only cold-start route injection (ignored in release). */
export const DEV_INITIAL_ROUTE_ENV_KEY = 'EXPO_PUBLIC_DEV_INITIAL_ROUTE';

const DEV_INJECTABLE_INITIAL_ROUTES = ['UiCatalog'] as const;

export type DevInjectableInitialRouteName =
  (typeof DEV_INJECTABLE_INITIAL_ROUTES)[number];

export function isDevInjectableInitialRouteName(
  routeName: string,
): routeName is DevInjectableInitialRouteName {
  return (DEV_INJECTABLE_INITIAL_ROUTES as readonly string[]).includes(routeName);
}

type ResolveInitialRootRouteNameOptions = {
  isDev?: boolean;
  devInitialRouteOverride?: string | null | undefined;
};

/**
 * Resolves the root stack initial route for the current build mode.
 * Release builds always cold-start at Splash regardless of env overrides.
 */
export function resolveInitialRootRouteName(
  options: ResolveInitialRootRouteNameOptions = {},
): keyof RootStackParamList {
  const isDev = options.isDev ?? __DEV__;

  if (!isDev) {
    return 'Splash';
  }

  const override =
    options.devInitialRouteOverride ?? process.env[DEV_INITIAL_ROUTE_ENV_KEY];

  if (override && isDevInjectableInitialRouteName(override)) {
    return override;
  }

  return 'Splash';
}
