import { StyleSheet, Text, View } from 'react-native';
import {
  RoutineCreateScreen,
  RoutineFolderEntryScreen,
} from '../../../features/routine';
import { colors } from '../../../design-system/tokens';
import {
  routineCreationCatalogPresets,
  type RoutineCreationCatalogEntryId,
} from '../fake/routineCreationFake';

type RoutineCreationCatalogDetailProps = {
  entryId: RoutineCreationCatalogEntryId;
  frameName: string;
  stateLabel: string;
};

export function RoutineCreationCatalogDetail({
  entryId,
  frameName,
  stateLabel,
}: RoutineCreationCatalogDetailProps) {
  const preset = routineCreationCatalogPresets[entryId];

  return (
    <View style={styles.root} testID={`catalog-routine-creation-${entryId}`}>
      <Text style={styles.meta}>
        {frameName} / {stateLabel}
      </Text>
      {preset.kind === 'folder' ? (
        <RoutineFolderEntryScreen
          folders={preset.fixture.folders}
          newFolderName={preset.fixture.newFolderName}
          readOnly
          selectedFolderId={preset.fixture.selectedFolderId}
        />
      ) : (
        <RoutineCreateScreen
          folderName={preset.fixture.folderName}
          readOnly
          routineName={preset.fixture.routineName}
        />
      )}
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
});
