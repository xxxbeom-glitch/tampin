import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { figmaAssets } from '../../design-system/assets';
import { FigmaImage } from '../../design-system/components/FigmaImage';
import { colors, fontFamily } from '../../design-system/tokens';
import { WORKOUT_COPY, replaceHelper } from './copy';
import type { WorkoutReplaceCandidate, WorkoutSession } from './types';

type WorkoutReplaceScreenProps = {
  session: WorkoutSession;
  batches: readonly WorkoutReplaceCandidate[][];
  readOnly?: boolean;
  onBack?: () => void;
  onSelect?: (candidateId: string) => void;
  onCycleBatch?: () => void;
  onConfirm?: () => void;
};

export function WorkoutReplaceScreen({
  session,
  batches,
  readOnly,
  onBack,
  onSelect,
  onCycleBatch,
  onConfirm,
}: WorkoutReplaceScreenProps) {
  const source =
    session.exercises.find((item) => item.id === session.replaceExerciseId)?.name ?? '벤치프레스';
  const items = batches[session.replaceBatch] ?? [];
  const canConfirm = Boolean(session.replaceSelectedId);

  return (
    <View style={styles.root} testID="workout-replace-screen">
      <View style={styles.status} />
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          disabled={!!readOnly}
          onPress={onBack}
          style={styles.side}
          testID="workout-replace-back"
        >
          <FigmaImage height={24} source={figmaAssets.icons.arrowLeft} width={24} />
        </Pressable>
        <Text style={styles.title}>{WORKOUT_COPY.replaceTitle}</Text>
        <View style={styles.side} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.helper}>{replaceHelper(source)}</Text>
        <View style={styles.list}>
          {items.map((item) => {
            const selected = session.replaceSelectedId === item.id;
            return (
              <Pressable
                accessibilityRole="button"
                disabled={!!readOnly}
                key={item.id}
                onPress={() => onSelect?.(item.id)}
                style={styles.card}
                testID={`workout-replace-item-${item.id}`}
              >
                <View style={styles.cardMain}>
                  <View style={styles.thumb} />
                  <View style={styles.info}>
                    <View style={[styles.tag, { backgroundColor: item.tag.backgroundColor }]}>
                      <Text style={[styles.tagLabel, { color: item.tag.textColor }]}>
                        {item.tag.label}
                      </Text>
                    </View>
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                </View>
                <View
                  style={[styles.radio, selected ? styles.radioOn : null]}
                  testID={`workout-replace-radio-${item.id}`}
                >
                  {selected ? <View style={styles.radioDot} /> : null}
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          disabled={!!readOnly}
          onPress={onCycleBatch}
          style={styles.other}
          testID="workout-replace-other"
        >
          <Text style={styles.otherLabel}>{WORKOUT_COPY.replaceOther}</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          disabled={!!readOnly || !canConfirm}
          onPress={onConfirm}
          style={[styles.confirm, !canConfirm ? styles.confirmDisabled : null]}
          testID="workout-replace-confirm"
        >
          <Text style={styles.confirmLabel}>{WORKOUT_COPY.replaceConfirm}</Text>
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
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24, gap: 16 },
  helper: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  list: { gap: 12 },
  card: {
    height: 96,
    borderRadius: 20,
    backgroundColor: colors.surface,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardMain: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.subtleSurface,
  },
  info: { gap: 4, flex: 1 },
  tag: { alignSelf: 'flex-start', borderRadius: 6, padding: 6 },
  tagLabel: { fontFamily: fontFamily.semiBold, fontSize: 11, lineHeight: 14 },
  name: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: colors.borderDefault,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { borderColor: colors.brandPrimary },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.brandPrimary,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: colors.canvas,
  },
  other: {
    flex: 1,
    height: 58,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D7DCDA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otherLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  confirm: {
    flex: 1,
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmDisabled: { opacity: 0.3 },
  confirmLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.textOnBrand,
  },
});
