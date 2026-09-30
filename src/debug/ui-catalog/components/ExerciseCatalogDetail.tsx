import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../design-system/tokens';
import {
  ConfirmDialogOverlay,
  CustomExerciseFormScreen,
  DELETE_CONFIRM_COPY,
  ExerciseAttachmentSheet,
  ExerciseDetailScreen,
  ExerciseFilterPageScreen,
  ExerciseSearchScreen,
  UNSAVED_CONFIRM_COPY,
  exerciseCatalogFixture,
} from '../../../features/exercise';
import {
  exerciseCatalogPresets,
  type ExerciseCatalogEntryId,
} from '../fake/exerciseFake';

type ExerciseCatalogDetailProps = {
  entryId: ExerciseCatalogEntryId;
  frameName: string;
  stateLabel: string;
};

export function ExerciseCatalogDetail({
  entryId,
  frameName,
  stateLabel,
}: ExerciseCatalogDetailProps) {
  const preset = exerciseCatalogPresets[entryId];

  return (
    <View style={styles.root} testID={`catalog-exercise-${entryId}`}>
      <Text style={styles.meta}>
        {frameName} / {stateLabel}
      </Text>
      {preset.kind === 'search' ? (
        <ExerciseSearchScreen
          bodyPartFilter={preset.bodyPartFilter}
          catalog={preset.catalog}
          equipmentFilter={preset.equipmentFilter}
          query={preset.query}
          readOnly
          selectedIds={preset.selectedIds}
        />
      ) : null}
      {preset.kind === 'filter' ? (
        <ExerciseFilterPageScreen
          options={preset.options}
          readOnly
          selected={preset.selected}
          testID={preset.testID}
          title={preset.title}
        />
      ) : null}
      {preset.kind === 'detail' ? (
        <ExerciseDetailScreen model={preset.model} readOnly tab={preset.tab} />
      ) : null}
      {preset.kind === 'custom' ? (
        <View style={styles.overlayHost}>
          <CustomExerciseFormScreen
            dirty={preset.dirty}
            draft={preset.draft}
            historyLocked={preset.historyLocked}
            mode={preset.mode}
            readOnly
          />
          {preset.dialog === 'unsaved' ? (
            <ConfirmDialogOverlay copy={UNSAVED_CONFIRM_COPY} readOnly testID="catalog-unsaved-confirm" />
          ) : null}
          {preset.dialog === 'delete' ? (
            <ConfirmDialogOverlay copy={DELETE_CONFIRM_COPY} readOnly testID="catalog-delete-confirm" />
          ) : null}
        </View>
      ) : null}
      {preset.kind === 'attachment' ? (
        <ExerciseAttachmentSheet
          bodyPartFilter="전체"
          catalog={exerciseCatalogFixture}
          customAttachment={preset.customAttachment}
          equipmentFilter="전체"
          exerciseName="랫풀다운"
          mode={preset.mode}
          query=""
          readOnly
          selectedIds={[]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  overlayHost: {
    flex: 1,
  },
  meta: {
    fontSize: 13,
    color: colors.textSecondary,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
});
