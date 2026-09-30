import { StatusBar } from 'expo-status-bar';
import { AppProviders } from './providers';
import { RootNavigator } from './navigation';

export function AppRoot() {
  return (
    <AppProviders>
      <StatusBar style="dark" />
      <RootNavigator />
    </AppProviders>
  );
}
