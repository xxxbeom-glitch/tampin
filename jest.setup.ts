// Jest-only navigation/native mocks for component tests.
// @ts-nocheck

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaView: View,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

jest.mock('react-native-screens', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    enableScreens: jest.fn(),
    enableFreeze: jest.fn(),
    screensEnabled: jest.fn(() => false),
    Screen: View,
    ScreenContainer: View,
    ScreenStack: View,
    ScreenStackHeaderConfig: View,
    ScreenContentWrapper: View,
    FullWindowOverlay: View,
  };
});

jest.mock('@react-navigation/native-stack', () => {
  const React = require('react');
  const {
    NavigationContext,
    NavigationRouteContext,
  } = require('@react-navigation/native');

  const screenComponents = new Map<string, React.ComponentType<any>>();
  let routeStack: string[] = [];
  let initialRouteName = 'Bootstrap';
  const subscribers = new Set<() => void>();
  let hardwareBackHandler: (() => boolean) | null = null;

  const notify = () => {
    subscribers.forEach((listener) => listener());
  };

  const registerScreens = (children: React.ReactNode) => {
    screenComponents.clear();
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) {
        return;
      }
      const { name, component } = child.props as {
        name: string;
        component: React.ComponentType<any>;
      };
      screenComponents.set(name, component);
    });
  };

  const getNavigation = () => ({
    navigate: (name: string) => {
      routeStack = [...routeStack, name];
      notify();
    },
    goBack: () => {
      if (routeStack.length <= 1) {
        return false;
      }
      routeStack = routeStack.slice(0, -1);
      notify();
      return true;
    },
    canGoBack: () => routeStack.length > 1,
  });

  return {
    createNativeStackNavigator: () => {
      const Navigator = ({
        children,
        initialRouteName: nextInitialRouteName,
      }: {
        children: React.ReactNode;
        initialRouteName: string;
      }) => {
        registerScreens(children);
        initialRouteName = nextInitialRouteName;
        if (routeStack.length === 0) {
          routeStack = [initialRouteName];
        }

        const [, setRevision] = React.useState(0);
        React.useEffect(() => {
          const listener = () => setRevision((value) => value + 1);
          subscribers.add(listener);
          return () => {
            subscribers.delete(listener);
          };
        }, []);

        React.useEffect(() => {
          hardwareBackHandler = () => {
            if (routeStack.length <= 1) {
              return false;
            }
            routeStack = routeStack.slice(0, -1);
            notify();
            return true;
          };

          const { BackHandler } = require('react-native');
          const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            hardwareBackHandler,
          );
          return () => {
            subscription.remove();
            hardwareBackHandler = null;
          };
        }, []);

        const activeRoute = routeStack[routeStack.length - 1];
        const ActiveComponent = activeRoute
          ? screenComponents.get(activeRoute)
          : undefined;
        const navigation = getNavigation();

        if (!ActiveComponent || !activeRoute) {
          return null;
        }

        return React.createElement(
          NavigationContext.Provider,
          { value: navigation },
          React.createElement(
            NavigationRouteContext.Provider,
            {
              value: {
                key: activeRoute,
                name: activeRoute,
                params: undefined,
              },
            },
            React.createElement(ActiveComponent, {
              navigation,
              route: {
                key: activeRoute,
                name: activeRoute,
                params: undefined,
              },
            }),
          ),
        );
      };

      const Screen = () => null;

      return { Navigator, Screen };
    },
    __resetMockStackForTests: () => {
      routeStack = [];
      screenComponents.clear();
      subscribers.clear();
      initialRouteName = 'Bootstrap';
      hardwareBackHandler = null;
    },
    __getMockStackForTests: () => [...routeStack],
    __invokeHardwareBackForTests: () => hardwareBackHandler?.() ?? false,
  };
});
