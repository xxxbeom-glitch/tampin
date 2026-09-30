import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../../design-system/tokens';
import {
  ROUTINE_DETAIL_COPY,
  ROUTINE_DETAIL_LAYOUT,
} from './routineDetailContent';
import type {
  RoutineDetailExercise,
  RoutineDetailModel,
  RoutineDetailScreenProps,
  RoutineDetailSetRow,
} from './routineDetailTypes';

function BackIcon() {
  return (
    <Text accessibilityElementsHidden importantForAccessibility="no" style={styles.headerIcon}>
      ‹
    </Text>
  );
}

function EditIcon() {
  return (
    <Text accessibilityElementsHidden importantForAccessibility="no" style={styles.headerIcon}>
      ✎
    </Text>
  );
}

function SummaryColumn({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryColumn}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

function MuscleTag({
  label,
  backgroundColor,
  textColor,
}: {
  label: string;
  backgroundColor: string;
  textColor: string;
}) {
  return (
    <View style={[styles.muscleTag, { backgroundColor }]}>
      <Text style={[styles.muscleTagLabel, { color: textColor }]}>{label}</Text>
    </View>
  );
}

function SetTableRow({ row }: { row: RoutineDetailSetRow }) {
  return (
    <View style={styles.setRow}>
      <View style={styles.setNumberCell}>
        <Text style={styles.setNumberText}>{row.setNumber}</Text>
      </View>
      <View style={styles.setValueColumns}>
        <View style={styles.setValueCell}>
          <Text style={styles.setValueText}>{row.kg}</Text>
        </View>
        <View style={styles.setValueCell}>
          <Text style={styles.setValueText}>{row.reps}</Text>
        </View>
      </View>
    </View>
  );
}

function ExerciseCard({ exercise }: { exercise: RoutineDetailExercise }) {
  return (
    <View style={styles.exerciseCard} testID={`routine-detail-exercise-${exercise.id}`}>
      <View style={styles.exerciseHeader}>
        <View style={styles.thumbnailPlaceholder} />
        <View style={styles.exerciseInfo}>
          <MuscleTag
            backgroundColor={exercise.tag.backgroundColor}
            label={exercise.tag.label}
            textColor={exercise.tag.textColor}
          />
          <Text style={styles.exerciseName}>{exercise.name}</Text>
        </View>
      </View>

      <View style={styles.setTable}>
        <View style={styles.setTableHeader}>
          <View style={styles.setNumberCell}>
            <Text style={styles.setTableHeaderText}>{ROUTINE_DETAIL_COPY.setTableSet}</Text>
          </View>
          <View style={styles.setValueColumns}>
            <View style={styles.setValueCell}>
              <Text style={styles.setTableHeaderText}>{ROUTINE_DETAIL_COPY.setTableKg}</Text>
            </View>
            <View style={styles.setValueCell}>
              <Text style={styles.setTableHeaderText}>{ROUTINE_DETAIL_COPY.setTableReps}</Text>
            </View>
          </View>
        </View>

        {exercise.sets.map((row) => (
          <SetTableRow key={`${exercise.id}-set-${row.setNumber}`} row={row} />
        ))}
      </View>
    </View>
  );
}

function RoutineDetailHeader({
  title,
  interactive,
  onBack,
}: {
  title: string;
  interactive: boolean;
  onBack?: () => void;
}) {
  return (
    <View style={styles.header} testID="routine-detail-header">
      <Pressable
        accessibilityLabel="Back"
        accessibilityRole="button"
        accessibilityState={{ disabled: !interactive }}
        disabled={!interactive}
        hitSlop={8}
        onPress={onBack}
        style={styles.headerSideButton}
        testID="routine-detail-back"
      >
        <BackIcon />
      </Pressable>

      <Text accessibilityRole="header" numberOfLines={1} style={styles.headerTitle}>
        {title}
      </Text>

      <View
        accessibilityLabel="Edit routine"
        accessibilityRole="button"
        accessibilityState={{ disabled: true }}
        style={styles.headerSideButton}
        testID="routine-detail-edit-affordance"
      >
        <EditIcon />
      </View>
    </View>
  );
}

function RoutineDetailSummary({ summary }: { summary: RoutineDetailModel['summary'] }) {
  return (
    <View style={styles.summaryStrip} testID="routine-detail-summary">
      <SummaryColumn
        label={ROUTINE_DETAIL_COPY.summaryExerciseCount}
        value={summary.exerciseCountLabel}
      />
      <SummaryColumn
        label={ROUTINE_DETAIL_COPY.summaryEstimatedTime}
        value={summary.estimatedTimeLabel}
      />
      <SummaryColumn
        label={ROUTINE_DETAIL_COPY.summaryTotalSets}
        value={summary.totalSetsLabel}
      />
    </View>
  );
}

export function RoutineDetailScreen({
  detail,
  onBack,
  onStartWorkout,
  readOnly = false,
}: RoutineDetailScreenProps) {
  const interactive = !readOnly;

  return (
    <View style={styles.root} testID="routine-detail-screen">
      <View style={styles.statusSpacer} />
      <RoutineDetailHeader
        interactive={interactive}
        onBack={onBack}
        title={detail.title}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="routine-detail-scroll"
      >
        <RoutineDetailSummary summary={detail.summary} />

        <View style={styles.exerciseList} testID="routine-detail-content">
          {detail.exercises.map((exercise) => (
            <ExerciseCard exercise={exercise} key={exercise.id} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomCtaWrap}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !interactive }}
          disabled={!interactive}
          onPress={onStartWorkout}
          style={styles.startWorkoutButton}
          testID="routine-detail-start-workout"
        >
          <Text style={styles.startWorkoutLabel}>{ROUTINE_DETAIL_COPY.startWorkout}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const cardShadow = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  statusSpacer: {
    height: 62,
  },
  header: {
    height: 56,
    paddingHorizontal: ROUTINE_DETAIL_LAYOUT.horizontalInset,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSideButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 24,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  summaryStrip: {
    backgroundColor: colors.surface,
    paddingVertical: 24,
    flexDirection: 'row',
    width: '100%',
  },
  summaryColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: '#979DA9',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: colors.textPrimary,
  },
  exerciseList: {
    width: '100%',
    maxWidth: ROUTINE_DETAIL_LAYOUT.canonicalViewportWidth,
    alignSelf: 'center',
    paddingHorizontal: ROUTINE_DETAIL_LAYOUT.horizontalInset,
    paddingTop: 20,
    paddingBottom: 20,
    gap: 16,
  },
  exerciseCard: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: colors.surface,
    padding: 20,
    gap: 24,
    ...cardShadow,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  thumbnailPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.subtleSurface,
  },
  exerciseInfo: {
    flex: 1,
    gap: 4,
    justifyContent: 'center',
  },
  muscleTag: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  muscleTagLabel: {
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 14,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: colors.textPrimary,
  },
  setTable: {
    gap: 8,
  },
  setTableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  setTableHeaderText: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    color: '#979DA9',
    textAlign: 'center',
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  setNumberCell: {
    width: 54,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setNumberText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    color: colors.textPrimary,
  },
  setValueColumns: {
    flexDirection: 'row',
    gap: 8,
  },
  setValueCell: {
    width: 85,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setValueText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  bottomCtaWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 98,
    paddingHorizontal: ROUTINE_DETAIL_LAYOUT.horizontalInset,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: colors.canvas,
    justifyContent: 'center',
  },
  startWorkoutButton: {
    width: '100%',
    maxWidth: ROUTINE_DETAIL_LAYOUT.canonicalViewportWidth,
    alignSelf: 'center',
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.brandAction,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startWorkoutLabel: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: colors.textOnBrand,
    textAlign: 'center',
  },
});
