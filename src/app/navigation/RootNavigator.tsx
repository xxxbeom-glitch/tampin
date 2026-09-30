import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  getInitialRootRouteName,
  getRegisteredRootStackScreens,
  isUiCatalogRoute,
} from './rootStackConfig';
import { AuthRouteScreen } from './screens/AuthRouteScreen';
import { SplashRouteScreen } from './screens/SplashRouteScreen';
import { FlowBoundaryPlaceholderScreen } from './screens/FlowBoundaryPlaceholderScreen';
import { OnboardingBasicInfoRouteScreen } from './screens/OnboardingBasicInfoRouteScreen';
import { RoutineDetailRouteScreen } from './screens/RoutineDetailRouteScreen';
import { ExerciseSelectionRouteScreen } from './screens/ExerciseSelectionRouteScreen';
import { RoutineEditorRouteScreen } from './screens/RoutineEditorRouteScreen';
import { RoutineHomeRouteScreen } from './screens/RoutineHomeRouteScreen';
import { UiCatalogRouteScreen } from './screens/UiCatalogRouteScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function renderRootScreen(name: keyof RootStackParamList) {
  if (name === 'Splash') {
    return SplashRouteScreen;
  }

  if (name === 'Auth') {
    return AuthRouteScreen;
  }

  if (name === 'OnboardingBasicInfo') {
    return OnboardingBasicInfoRouteScreen;
  }

  if (name === 'RoutineHome') {
    return RoutineHomeRouteScreen;
  }

  if (name === 'RoutineDetail') {
    return RoutineDetailRouteScreen;
  }

  if (name === 'RoutineEditor') {
    return RoutineEditorRouteScreen;
  }

  if (name === 'ExerciseSelection') {
    return ExerciseSelectionRouteScreen;
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
              ...(name === 'Splash' ? { animation: 'none' } : {}),
              ...(isUiCatalogRoute(name) ? { animation: 'slide_from_right' } : {}),
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
