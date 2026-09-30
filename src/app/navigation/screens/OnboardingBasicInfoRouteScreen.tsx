import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../providers/auth';
import { OnboardingBasicInfoScreen } from '../../../features/auth';
import type { RootStackParamList } from '../types';

type OnboardingBasicInfoNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'OnboardingBasicInfo'
>;

export function OnboardingBasicInfoRouteScreen() {
  const navigation = useNavigation<OnboardingBasicInfoNavigation>();
  const { markProfileComplete } = useAuth();

  return (
    <OnboardingBasicInfoScreen
      onBack={() => {
        navigation.navigate('Auth');
      }}
      onComplete={() => {
        markProfileComplete();
        navigation.replace('RoutineHome');
      }}
    />
  );
}
