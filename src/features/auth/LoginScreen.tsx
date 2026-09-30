import { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { useAuth } from '../../app/providers/auth';
import type { AuthProviderId } from '../../auth/contracts/types';
import {
  LoginFormScreen,
  type LoginProviderState,
} from './LoginFormScreen';

type LoginScreenProps = {
  onSignedIn: (nextRoute: 'OnboardingBasicInfo' | 'RoutineHome') => void;
};

export function LoginScreen({ onSignedIn }: LoginScreenProps) {
  const { isBypassAvailable, signInWithProvider } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const isSigningInRef = useRef(false);

  const providerState: LoginProviderState = !isBypassAvailable
    ? 'unavailable'
    : isSigningIn
      ? 'busy'
      : 'ready';

  const handleProviderPress = useCallback(
    (provider: AuthProviderId) => {
      if (!isBypassAvailable || isSigningInRef.current) {
        return;
      }

      isSigningInRef.current = true;
      setIsSigningIn(true);

      try {
        const result = signInWithProvider(provider);
        onSignedIn(result.nextRoute);
      } catch {
        isSigningInRef.current = false;
        setIsSigningIn(false);
      }
    },
    [isBypassAvailable, onSignedIn, signInWithProvider],
  );

  return (
    <View style={{ flex: 1 }} testID="login-screen">
      <LoginFormScreen
        onProviderPress={handleProviderPress}
        providerState={providerState}
      />
    </View>
  );
}
