import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  exerciseThumbnailById,
  figmaAssets,
} from '../../design-system/assets';
import { FigmaImage } from '../../design-system/components/FigmaImage';
import { colors, fontFamily } from '../../design-system/tokens';
import { WORKOUT_COPY } from './copy';
import {
  WorkoutDialogs,
  WorkoutExerciseMenu,
  WorkoutHeaderMenu,
  WorkoutTimerSheet,
} from './WorkoutOverlays';
import { WorkoutReorderScreen } from './WorkoutReorderScreen';
import { WorkoutReplaceScreen } from './WorkoutReplaceScreen';
import type {
  ActiveWorkoutScreenProps,
  WorkoutExercise,
  WorkoutSet,
} from './types';

const TEXT_TERTIARY = '#929A98';

function secondaryColumnLabel(exercise: WorkoutExercise): string {
  if (exercise.recordingType === 'duration') {
    return WORKOUT_COPY.colDuration;
  }
  if (exercise.recordingType === 'assisted') {
    return WORKOUT_COPY.colAssisted;
  }
  return WORKOUT_COPY.colReps;
}

function secondaryValue(exercise: WorkoutExercise, set: WorkoutSet): string {
  if (exercise.recordingType === 'duration') {
    return set.duration;
  }
  if (exercise.recordingType === 'assisted') {
    return set.assisted;
  }
  return set.reps;
}

function WorkoutExerciseCard({
  exercise,
  readOnly,
  onOpenMenu,
  onToggleSet,
  onChangeSetField,
  onAddSet,
  onDeleteSet,
}: {
  exercise: WorkoutExercise;
  readOnly?: boolean;
  onOpenMenu?: (exerciseId: string) => void;
  onToggleSet?: (exerciseId: string, setId: string) => void;
  onChangeSetField?: ActiveWorkoutScreenProps['onChangeSetField'];
  onAddSet?: (exerciseId: string) => void;
  onDeleteSet?: (exerciseId: string) => void;
}) {
  const thumbnail =
    (exercise.thumbnailKey && exerciseThumbnailById[exercise.thumbnailKey]) ||
    (exercise.thumbnailKey === 'smithBenchPress' ? figmaAssets.thumbnails.smithBenchPress : undefined) ||
    (exercise.thumbnailKey === 'lateralRaise' ? figmaAssets.thumbnails.lateralRaise : undefined) ||
    (exercise.thumbnailKey === 'romanianDeadlift' ? figmaAssets.thumbnails.romanianDeadlift : undefined);

  return (
    <View style={styles.card} testID={`workout-exercise-card-${exercise.id}`}>
      <View style={styles.cardHeader}>
        {thumbnail ? (
          <FigmaImage height={64} source={thumbnail} style={styles.thumb} width={64} />
        ) : (
          <View style={styles.thumb} />
        )}
        <View style={styles.cardInfo}>
          <View style={[styles.tag, { backgroundColor: exercise.tag.backgroundColor }]}>
            <Text style={[styles.tagLabel, { color: exercise.tag.textColor }]}>
              {exercise.tag.label}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.exerciseName}>
            {exercise.name}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          disabled={!!readOnly}
          onPress={() => onOpenMenu?.(exercise.id)}
          style={styles.cardMore}
          testID={`workout-exercise-more-${exercise.id}`}
        >
          <FigmaImage height={24} source={figmaAssets.icons.moreVertical} width={24} />
        </Pressable>
      </View>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.colLabel, styles.colSet]}>{WORKOUT_COPY.colSet}</Text>
          <Text style={[styles.colLabel, styles.colValue]}>
            {exercise.recordingType === 'reps' ? WORKOUT_COPY.colReps : WORKOUT_COPY.colWeight}
          </Text>
          <Text style={[styles.colLabel, styles.colValue]}>{secondaryColumnLabel(exercise)}</Text>
          <Text style={[styles.colLabel, styles.colDone]}>{WORKOUT_COPY.colDone}</Text>
        </View>
        {exercise.sets.map((row, index) => (
          <View key={row.id} style={styles.setRow} testID={`workout-set-${row.id}`}>
            <View style={styles.colSet}>
              <Text style={styles.setIndex}>{index + 1}</Text>
            </View>
            <TextInput
              editable={!readOnly && exercise.recordingType !== 'reps'}
              onChangeText={(value) => onChangeSetField?.(exercise.id, row.id, 'weight', value)}
              style={styles.valueField}
              testID={`workout-set-weight-${row.id}`}
              value={exercise.recordingType === 'reps' ? '' : row.weight}
            />
            <TextInput
              editable={!readOnly}
              onChangeText={(value) => onChangeSetField?.(exercise.id, row.id, 'reps', value)}
              style={styles.valueField}
              testID={`workout-set-reps-${row.id}`}
              value={secondaryValue(exercise, row)}
            />
            <Pressable
              accessibilityRole="button"
              disabled={!!readOnly}
              onPress={() => onToggleSet?.(exercise.id, row.id)}
              style={[styles.check, row.completed ? styles.checkOn : styles.checkOff]}
              testID={`workout-set-done-${row.id}`}
            >
              <FigmaImage height={18} source={figmaAssets.icons.check} width={18} />
            </Pressable>
          </View>
        ))}
      </View>
      <View style={styles.setActions}>
        <Pressable
          accessibilityRole="button"
          disabled={!!readOnly}
          onPress={() => onAddSet?.(exercise.id)}
          style={styles.addSet}
          testID={`workout-add-set-${exercise.id}`}
        >
          <Text style={styles.addSetLabel}>{WORKOUT_COPY.addSet}</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          disabled={!!readOnly}
          onPress={() => onDeleteSet?.(exercise.id)}
          style={styles.deleteSet}
          testID={`workout-delete-set-${exercise.id}`}
        >
          <Text style={styles.deleteSetLabel}>{WORKOUT_COPY.deleteSet}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function ActiveWorkoutScreen({
  session,
  replaceCandidates,
  displayElapsed,
  readOnly = false,
  scrolled = false,
  onBack,
  onOpenHeaderMenu,
  onOpenExerciseMenu,
  onCloseOverlay,
  onRequestEnd,
  onConfirmEnd,
  onConfirmDiscard,
  onAddExercise,
  onOpenManual,
  onStartManual,
  onPauseManual,
  onResumeManual,
  onResetManual,
  onDismissManual,
  onAdjustManual,
  onAdjustRest,
  onSkipRest,
  onToggleSet,
  onChangeSetField,
  onAddSet,
  onDeleteSet,
  onDeleteExercise,
  onOpenReplace,
  onSelectReplace,
  onCycleReplaceBatch,
  onConfirmReplace,
  onConfirmReplaceDelete,
  onOpenReorder,
  onMoveExerciseDown,
  onConfirmReorder,
  onConfirmUpdateRoutine,
  onApplyTodayOnly,
  onContinueCurrentWorkout,
  onEndThenStartOther,
}: ActiveWorkoutScreenProps) {
  if (session.overlay === 'replace') {
    return (
      <WorkoutReplaceScreen
        batches={replaceCandidates}
        onBack={onCloseOverlay}
        onConfirm={onConfirmReplace}
        onCycleBatch={onCycleReplaceBatch}
        onSelect={onSelectReplace}
        readOnly={readOnly}
        session={session}
      />
    );
  }

  if (session.overlay === 'reorder') {
    return (
      <WorkoutReorderScreen
        exercises={session.exercises}
        onBack={onCloseOverlay}
        onConfirm={onConfirmReorder}
        onMoveDown={onMoveExerciseDown}
        readOnly={readOnly}
      />
    );
  }

  return (
    <View style={styles.root} testID="active-workout-screen">
      <View style={styles.status} />
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          disabled={readOnly}
          onPress={onBack}
          style={styles.side}
          testID="active-workout-back"
        >
          <FigmaImage height={24} source={figmaAssets.icons.arrowLeft} width={24} />
        </Pressable>
        <Text
          style={[styles.elapsed, session.elapsedPaused ? styles.elapsedPaused : null]}
          testID="active-workout-elapsed"
        >
          {displayElapsed}
        </Text>
        <Pressable
          accessibilityRole="button"
          disabled={readOnly}
          onPress={onOpenHeaderMenu}
          style={styles.side}
          testID="active-workout-more"
        >
          <FigmaImage height={24} source={figmaAssets.icons.moreHorizontal} width={24} />
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        contentOffset={scrolled ? { x: 0, y: 520 } : undefined}
        testID="active-workout-scroll"
      >
        <View style={styles.list}>
          {session.exercises.map((exercise) => (
            <WorkoutExerciseCard
              exercise={exercise}
              key={exercise.id}
              onAddSet={onAddSet}
              onChangeSetField={onChangeSetField}
              onDeleteSet={onDeleteSet}
              onOpenMenu={onOpenExerciseMenu}
              onToggleSet={onToggleSet}
              readOnly={readOnly}
            />
          ))}
        </View>
        <Pressable
          accessibilityRole="button"
          disabled={readOnly}
          onPress={onAddExercise}
          style={styles.addExercise}
          testID="active-workout-add-exercise"
        >
          <Text style={styles.addExerciseLabel}>{WORKOUT_COPY.addExercise}</Text>
        </Pressable>
      </ScrollView>
      {session.overlay === 'headerMenu' ? (
        <Pressable
          onPress={onCloseOverlay}
          style={StyleSheet.absoluteFill}
          testID="workout-header-menu-dismiss"
        >
          <WorkoutHeaderMenu
            manualDisabled={Boolean(session.rest)}
            onAddExercise={onAddExercise}
            onOpenManual={onOpenManual}
            onRequestEnd={onRequestEnd}
            readOnly={readOnly}
          />
        </Pressable>
      ) : null}
      {session.overlay === 'exerciseMenu' ? (
        <Pressable
          onPress={onCloseOverlay}
          style={StyleSheet.absoluteFill}
          testID="workout-exercise-menu-dismiss"
        >
          <WorkoutExerciseMenu
            onDeleteExercise={onDeleteExercise}
            onOpenReorder={onOpenReorder}
            onOpenReplace={onOpenReplace}
            readOnly={readOnly}
          />
        </Pressable>
      ) : null}
      {session.overlay === 'rest' || session.overlay.startsWith('manual') ? (
        <WorkoutTimerSheet
          onAdjustManual={onAdjustManual}
          onAdjustRest={onAdjustRest}
          onDismissManual={onDismissManual}
          onPauseManual={onPauseManual}
          onResetManual={onResetManual}
          onResumeManual={onResumeManual}
          onSkipRest={onSkipRest}
          onStartManual={onStartManual}
          readOnly={readOnly}
          session={session}
        />
      ) : null}
      <WorkoutDialogs
        onApplyTodayOnly={onApplyTodayOnly}
        onConfirmDiscard={onConfirmDiscard}
        onConfirmEnd={onConfirmEnd}
        onConfirmReplaceDelete={onConfirmReplaceDelete}
        onConfirmUpdateRoutine={onConfirmUpdateRoutine}
        onContinueCurrentWorkout={onContinueCurrentWorkout}
        onEndThenStartOther={onEndThenStartOther}
        readOnly={readOnly}
        session={session}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
  status: { height: 62, backgroundColor: colors.canvas },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.canvas,
  },
  side: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  elapsed: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  elapsedPaused: { opacity: 0.5 },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24, gap: 24 },
  list: { gap: 12 },
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    gap: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.subtleSurface,
  },
  cardInfo: { flex: 1, gap: 4 },
  tag: { alignSelf: 'flex-start', borderRadius: 6, padding: 6 },
  tagLabel: { fontFamily: fontFamily.semiBold, fontSize: 11, lineHeight: 14 },
  exerciseName: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  cardMore: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  table: { gap: 8 },
  tableHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  colLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    lineHeight: 16,
    color: TEXT_TERTIARY,
    textAlign: 'center',
  },
  colSet: { width: 32, alignItems: 'center' },
  colValue: { flex: 1 },
  colDone: { width: 26 },
  setRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  setIndex: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  valueField: {
    flex: 1,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    backgroundColor: colors.subtleSurface,
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.textPrimary,
    padding: 0,
  },
  check: {
    width: 26,
    height: 26,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOn: { backgroundColor: colors.brandPrimary },
  checkOff: { backgroundColor: colors.subtleSurface },
  setActions: { alignItems: 'center', gap: 6 },
  addSet: {
    height: 42,
    borderRadius: 999,
    backgroundColor: colors.subtleSurface,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  addSetLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  deleteSet: { height: 42, alignItems: 'center', justifyContent: 'center' },
  deleteSetLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: TEXT_TERTIARY,
  },
  addExercise: {
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addExerciseLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    color: '#F7F8FA',
  },
});
