import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../design-system/tokens';
import { ActiveWorkoutScreen, replaceCandidateBatches } from '../../../features/workout';
import {
  isWorkoutCatalogEntryId,
  workoutCatalogSession,
  type WorkoutCatalogEntryId,
} from '../fake/workoutFake';

type WorkoutCatalogDetailProps = {
  entryId: WorkoutCatalogEntryId;
  frameName: string;
  stateLabel: string;
};

export function WorkoutCatalogDetail({
  entryId,
  frameName,
  stateLabel,
}: WorkoutCatalogDetailProps) {
  if (!isWorkoutCatalogEntryId(entryId)) {
    return null;
  }
  const session = workoutCatalogSession(entryId);

  return (
    <View style={styles.root} testID={`catalog-workout-${entryId}`}>
      <Text style={styles.meta}>
        {frameName} / {stateLabel}
      </Text>
      <ActiveWorkoutScreen
        displayElapsed={session.displayElapsed ?? '00:32:16'}
        readOnly
        replaceCandidates={replaceCandidateBatches}
        scrolled={entryId === '05a-workout-scrolled'}
        session={session}
        thumbnailFor={() => undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
  meta: {
    fontSize: 13,
    color: colors.textSecondary,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});
