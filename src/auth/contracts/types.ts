export type AuthProviderId = 'google' | 'kakao';

export type DevelopmentLocalAuthSession = {
  kind: 'development_local';
  accountId: string;
  signedInWith: AuthProviderId;
  profileComplete: boolean;
};

export type PostSignInRouteName = 'OnboardingBasicInfo' | 'RoutineHome';
