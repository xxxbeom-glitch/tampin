import type { DevelopmentLocalAuthSession, PostSignInRouteName } from './contracts/types';

export function resolvePostSignInRoute(
  session: DevelopmentLocalAuthSession,
): PostSignInRouteName {
  return session.profileComplete ? 'RoutineHome' : 'OnboardingBasicInfo';
}
