import { StyleSheet, Text, View } from 'react-native';
import { RoutineMainScreen } from '../../../features/routine';
import { colors } from '../../../design-system/tokens';
import {
  routineMainCatalogPresets,
  type RoutineMainCatalogPreset,
} from '../fake/routineMainFake';

type RoutineMainCatalogDetailProps = {
  entryId: string;
  frameName: string;
  stateLabel: string;
};

function resolvePreset(entryId: string): RoutineMainCatalogPreset | null {
  return routineMainCatalogPresets[entryId] ?? null;
}

export function RoutineMainCatalogDetail({
  entryId,
  frameName,
  stateLabel,
}: RoutineMainCatalogDetailProps) {
  const preset = resolvePreset(entryId);

  if (!preset) {
    return (
      <Text style={styles.missing}>Missing catalog preset for {entryId}</Text>
    );
  }

  const { fixture } = preset;

  return (
    <View style={styles.root} testID={`catalog-routine-main-${entryId}`}>
      <Text style={styles.meta}>
        {frameName} / {stateLabel}
      </Text>
      <RoutineMainScreen
        folders={fixture.folders}
        readOnly
        state={fixture.state}
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
