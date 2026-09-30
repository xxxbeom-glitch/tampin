import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  getInitialRootRouteName,
  getRegisteredRootStackScreens,
  isUiCatalogRoute,
} from './rootStackConfig';
import { BootstrapRouteScreen } from './screens/BootstrapRouteScreen';
import { FlowBoundaryPlaceholderScreen } from './screens/FlowBoundaryPlaceholderScreen';
import { UiCatalogRouteScreen } from './screens/UiCatalogRouteScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function renderRootScreen(name: keyof RootStackParamList) {
  if (name === 'Bootstrap') {
    return BootstrapRouteScreen;
  }

  if (name === 'UiCatalog') {
    return UiCatalogRouteScreen;
  }

  return FlowBoundaryPlaceholderScreen;
}

export function RootNavigator() {
  const screens = getRegisteredRootStackScreens();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={getInitialRootRouteName()}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {screens.map(({ name, title }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={renderRootScreen(name)}
            options={{
              title,
              ...(isUiCatalogRoute(name) ? { animation: 'slide_from_right' } : {}),
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
