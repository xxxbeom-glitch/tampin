/**
 * Typed root stack contracts for MVP flow boundaries.
 * Screens are placeholders until scoped product Issues implement them.
 */
export type RootStackParamList = {
  /** Group 00 — cold launch splash */
  Splash: undefined;
  /** Group 01 — auth / first-run boundary */
  Auth: undefined;
  /** Group 01 — basic info / onboarding boundary */
  OnboardingBasicInfo: undefined;
  /** Group 02 — routine list / home boundary */
  RoutineHome: undefined;
  /** Group 02 — routine create/edit boundary */
  RoutineEditor: undefined;
  /** Group 04 — exercise library / selection boundary */
  ExerciseSelection: undefined;
  /** Group 05 — active workout boundary */
  ActiveWorkout: undefined;
  /** Group 05 — rest timer boundary */
  RestTimer: undefined;
  /** Group 06 — workout completion boundary */
  Completion: undefined;
  /** Group 07 — analysis / history boundary */
  Analysis: undefined;
  /** Group 08 — settings / account boundary */
  Settings: undefined;
  /** Development-only UI Catalog — registered only when __DEV__ */
  UiCatalog: undefined;
};

/** Product flow boundaries excluding the dev-only catalog route. */
export type ProductFlowRouteName = Exclude<keyof RootStackParamList, 'UiCatalog'>;

export const PRODUCT_FLOW_ROUTE_NAMES = [
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
] as const satisfies readonly ProductFlowRouteName[];

export type RootStackRouteName = keyof RootStackParamList;

declare global {
  namespace ReactNavigation {
    // Enables typed useNavigation()/useRoute() against RootStackParamList.
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- RN Navigation module augmentation
    interface RootParamList extends RootStackParamList {}
  }
}
