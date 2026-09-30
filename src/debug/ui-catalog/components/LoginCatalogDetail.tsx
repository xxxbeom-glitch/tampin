import { StyleSheet, Text, View } from 'react-native';
import { LoginFormScreen } from '../../../features/auth/LoginFormScreen';
import { colors } from '../../../design-system/tokens';
import { loginCatalogPresets, type LoginCatalogPreset } from '../fake/loginFake';

type LoginCatalogDetailProps = {
  entryId: string;
  frameName: string;
  stateLabel: string;
};

function resolvePreset(entryId: string): LoginCatalogPreset | null {
  return loginCatalogPresets[entryId] ?? null;
}

export function LoginCatalogDetail({
  entryId,
  frameName,
  stateLabel,
}: LoginCatalogDetailProps) {
  const preset = resolvePreset(entryId);

  if (!preset) {
    return (
      <Text style={styles.missing}>Missing catalog preset for {entryId}</Text>
    );
  }

  return (
    <View style={styles.root} testID={`catalog-login-${entryId}`}>
      <Text style={styles.meta}>
        {frameName} / {stateLabel}
      </Text>
      <LoginFormScreen
        errorDialogCase={preset.errorDialogCase ?? null}
        providerState={preset.providerState}
        readOnly
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  meta: {
    fontSize: 13,
    color: colors.textSecondary,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  missing: {
    paddingHorizontal: 16,
    color: colors.danger,
  },
});
