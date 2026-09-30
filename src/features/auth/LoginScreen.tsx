import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../app/providers/auth';
import type { AuthProviderId } from '../../auth/contracts/types';
import { colors } from '../../design-system/tokens';
import { APP_DISPLAY_NAME } from '../../platform';

type LoginScreenProps = {
  onSignedIn: (nextRoute: 'OnboardingBasicInfo' | 'RoutineHome') => void;
};

function ProviderButton({
  label,
  provider,
  disabled,
  onPress,
}: {
  label: string;
  provider: AuthProviderId;
  disabled: boolean;
  onPress: (provider: AuthProviderId) => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={() => onPress(provider)}
      style={[styles.providerButton, disabled && styles.providerButtonDisabled]}
      testID={`login-provider-${provider}`}
    >
      <Text style={styles.providerButtonLabel}>{label}</Text>
    </Pressable>
  );
}

export function LoginScreen({ onSignedIn }: LoginScreenProps) {
  const { isBypassAvailable, signInWithProvider } = useAuth();

  const handleProviderPress = (provider: AuthProviderId) => {
    if (!isBypassAvailable) {
      return;
    }

    const result = signInWithProvider(provider);
    onSignedIn(result.nextRoute);
  };

  return (
    <View style={styles.root} testID="login-screen">
      <Text style={styles.brand}>{APP_DISPLAY_NAME}</Text>
      <Text style={styles.subtitle}>01A_Login boundary</Text>

      {isBypassAvailable ? (
        <Text style={styles.devBanner} testID="login-dev-banner">
          Development-only local session. No OAuth, credentials, or network calls.
        </Text>
      ) : (
        <Text style={styles.unavailableBanner} testID="login-unavailable-banner">
          Provider sign-in is unavailable until real Google/Kakao integration is configured.
        </Text>
      )}

      <ProviderButton
        label="Google로 계속"
        provider="google"
        disabled={!isBypassAvailable}
        onPress={handleProviderPress}
      />
      <ProviderButton
        label="Kakao로 계속"
        provider="kakao"
        disabled={!isBypassAvailable}
        onPress={handleProviderPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  brand: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.brandPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  devBanner: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  unavailableBanner: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  providerButton: {
    backgroundColor: colors.surface,
    borderColor: colors.borderSubtle,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  providerButtonDisabled: {
    opacity: 0.5,
  },
  providerButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
