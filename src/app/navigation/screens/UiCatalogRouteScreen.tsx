import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UiCatalogScreen } from '../../../debug/ui-catalog';
import type { RootStackParamList } from '../types';

type UiCatalogNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'UiCatalog'
>;

export function UiCatalogRouteScreen() {
  const navigation = useNavigation<UiCatalogNavigation>();

  return <UiCatalogScreen onBack={() => navigation.goBack()} />;
}
