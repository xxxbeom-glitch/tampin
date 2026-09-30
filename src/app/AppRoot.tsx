import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useSuitFonts } from '../design-system/fonts';
import { colors } from '../design-system/tokens';
import { AppProviders } from './providers';
import { RootNavigator } from './navigation';

export function AppRoot() {
  const fontsLoaded = useSuitFonts();

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.brandPrimary }} />;
  }

  return (
    <AppProviders>
      <StatusBar style="dark" />
      <RootNavigator />
    </AppProviders>
  );
}
