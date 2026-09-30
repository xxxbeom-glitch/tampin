import { StyleSheet, Text, View } from 'react-native';
import { BasicInfoFormScreen } from '../../../features/auth/BasicInfoFormScreen';
import { colors } from '../../../design-system/tokens';
import {
  basicInfoCatalogPresets,
  type BasicInfoCatalogPreset,
} from '../fake/basicInfoFake';

type BasicInfoCatalogDetailProps = {
  entryId: string;
  frameName: string;
  stateLabel: string;
};

function resolvePreset(entryId: string): BasicInfoCatalogPreset | null {
  return basicInfoCatalogPresets[entryId] ?? null;
}

export function BasicInfoCatalogDetail({
  entryId,
  frameName,
  stateLabel,
}: BasicInfoCatalogDetailProps) {
  const preset = resolvePreset(entryId);

  if (!preset) {
    return (
      <Text style={styles.missing}>Missing catalog preset for {entryId}</Text>
    );
  }

  return (
    <View style={styles.root} testID={`catalog-basic-info-${entryId}`}>
      <Text style={styles.meta}>
        {frameName} / {stateLabel}
      </Text>
      <BasicInfoFormScreen
        presentation={preset.presentation}
        readOnly
        values={preset.values}
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
