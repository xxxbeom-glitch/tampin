import { type ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type AppProvidersProps = {
  children: ReactNode;
};

/** Bootstrap providers shell — no auth/data SDKs in DEV-001. */
export function AppProviders({ children }: AppProvidersProps) {
  return <SafeAreaProvider>{children}</SafeAreaProvider>;
}
