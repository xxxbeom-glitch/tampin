import { StyleSheet, Text, View } from 'react-native';
import { RoutineDetailScreen } from '../../../features/routine';
import { colors } from '../../../design-system/tokens';
import {
  routineDetailCatalogPresets,
  type RoutineDetailCatalogPreset,
} from '../fake/routineDetailFake';

type RoutineDetailCatalogDetailProps = {
  entryId: string;
  frameName: string;
  stateLabel: string;
};

function resolvePreset(entryId: string): RoutineDetailCatalogPreset | null {
  return routineDetailCatalogPresets[entryId] ?? null;
}

export function RoutineDetailCatalogDetail({
  entryId,
  frameName,
  stateLabel,
}: RoutineDetailCatalogDetailProps) {
  const preset = resolvePreset(entryId);

  if (!preset) {
    return (
      <Text style={styles.missing}>Missing catalog preset for {entryId}</Text>
    );
  }

  return (
    <View style={styles.root} testID={`catalog-routine-detail-${entryId}`}>
      <Text style={styles.meta}>
        {frameName} / {stateLabel}
      </Text>
      <RoutineDetailScreen detail={preset.fixture} readOnly />
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
