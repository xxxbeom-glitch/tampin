import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { DevCatalogEntryAffordance } from '../../../debug/ui-catalog/DevCatalogEntryAffordance';
import { LoginScreen } from '../../../features/auth';
import type { RootStackParamList } from '../types';

type AuthNavigation = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

export function AuthRouteScreen() {
  const navigation = useNavigation<AuthNavigation>();

  return (
    <View style={{ flex: 1 }}>
      <LoginScreen
        onSignedIn={(nextRoute) => {
          navigation.navigate(nextRoute);
        }}
      />
      {__DEV__ ? (
        <DevCatalogEntryAffordance
          onPress={() => {
            navigation.navigate('UiCatalog');
          }}
        />
      ) : null}
    </View>
  );
}
