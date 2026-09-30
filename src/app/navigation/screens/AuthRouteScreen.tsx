import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginScreen } from '../../../features/auth';
import type { RootStackParamList } from '../types';

type AuthNavigation = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

export function AuthRouteScreen() {
  const navigation = useNavigation<AuthNavigation>();

  return (
    <LoginScreen
      onSignedIn={(nextRoute) => {
        navigation.navigate(nextRoute);
      }}
    />
  );
}
