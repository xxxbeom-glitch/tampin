import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BootstrapHomeScreen } from '../../../features/startup';
import type { RootStackParamList } from '../types';

type BootstrapNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'Bootstrap'
>;

export function BootstrapRouteScreen() {
  const navigation = useNavigation<BootstrapNavigation>();

  return (
    <BootstrapHomeScreen
      onOpenCatalog={
        __DEV__
          ? () => {
              navigation.navigate('UiCatalog');
            }
          : undefined
      }
    />
  );
}
