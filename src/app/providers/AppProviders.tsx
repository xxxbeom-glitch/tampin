import { type ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './auth';
import { DataLayerProvider } from './data-layer';

type AppProvidersProps = {
  children: ReactNode;
};

/** App-level providers — DEV-005 wires SQLite lifecycle behind typed repositories. */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SafeAreaProvider>
      <DataLayerProvider>
        <AuthProvider>{children}</AuthProvider>
      </DataLayerProvider>
    </SafeAreaProvider>
  );
}
