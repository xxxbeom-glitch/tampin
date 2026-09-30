import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SplashScreen } from '../../../features/startup';
import { SPLASH_PRESENTATION_DELAY_MS } from '../../../features/startup/splashTiming';
import type { RootStackParamList } from '../types';

type SplashNavigation = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export function SplashRouteScreen() {
  const navigation = useNavigation<SplashNavigation>();
  const hasTransitionedRef = useRef(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (hasTransitionedRef.current) {
        return;
      }

      hasTransitionedRef.current = true;
      navigation.replace('Auth');
    }, SPLASH_PRESENTATION_DELAY_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigation]);

  return <SplashScreen />;
}
