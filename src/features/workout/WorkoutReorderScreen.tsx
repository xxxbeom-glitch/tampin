import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { figmaAssets } from '../../design-system/assets';
import { FigmaImage } from '../../design-system/components/FigmaImage';
import { colors, fontFamily } from '../../design-system/tokens';
import { WORKOUT_COPY } from './copy';
import type { WorkoutExercise } from './types';

type WorkoutReorderScreenProps = {
  exercises: readonly WorkoutExercise[];
  readOnly?: boolean;
  onBack?: () => void;
  onMoveDown?: (exerciseId: string) => void;
  onConfirm?: () => void;
};

export function WorkoutReorderScreen({
  exercises,
  readOnly,
  onBack,
  onMoveDown,
  onConfirm,
}: WorkoutReorderScreenProps) {
  return (
    <View style={styles.root} testID="workout-reorder-screen">
      <View style={styles.status} />
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          disabled={!!readOnly}
          onPress={onBack}
          style={styles.side}
          testID="workout-reorder-back"
        >
          <FigmaImage height={24} source={figmaAssets.icons.arrowLeft} width={24} />
        </Pressable>
        <Text style={styles.title}>{WORKOUT_COPY.reorderTitle}</Text>
        <View style={styles.side} />
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {exercises.map((exercise) => (
          <View key={exercise.id} style={styles.row} testID={`workout-reorder-row-${exercise.id}`}>
            <Text style={styles.name}>{exercise.name}</Text>
            <Pressable
              accessibilityRole="button"
              disabled={!!readOnly}
              onPress={() => onMoveDown?.(exercise.id)}
              style={styles.handle}
              testID={`workout-reorder-handle-${exercise.id}`}
            >
              <FigmaImage height={24} source={figmaAssets.icons.dragHandle} width={24} />
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          disabled={!!readOnly}
          onPress={onConfirm}
          style={styles.cta}
          testID="workout-reorder-done"
        >
          <Text style={styles.ctaLabel}>{WORKOUT_COPY.reorderDone}</Text>
        </Pressable>
      </View>
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
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  list: { padding: 20, gap: 12 },
  row: {
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  handle: { width: 24, height: 24 },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: colors.canvas,
  },
  cta: {
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.textOnBrand,
  },
});
