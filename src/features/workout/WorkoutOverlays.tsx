import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ConfirmDialogOverlay } from '../exercise';
import { colors, fontFamily } from '../../design-system/tokens';
import {
  DISCARD_COPY,
  END_COMPLETE_COPY,
  END_INCOMPLETE_COPY,
  OTHER_COMPLETE_COPY,
  OTHER_INCOMPLETE_COPY,
  REPLACE_DELETE_COPY,
  TIMER_STEP_SEC,
  UPDATE_ROUTINE_COPY,
  WORKOUT_COPY,
} from './copy';
import { formatTimer } from './formatTime';
import type { WorkoutSession } from './types';

const RING_TRACK = '#E8EEFC';

type OverlayHandlers = {
  readOnly?: boolean;
  onCloseOverlay?: () => void;
  onRequestEnd?: () => void;
  onConfirmEnd?: () => void;
  onConfirmDiscard?: () => void;
  onAddExercise?: () => void;
  onOpenManual?: () => void;
  onStartManual?: () => void;
  onPauseManual?: () => void;
  onResumeManual?: () => void;
  onResetManual?: () => void;
  onDismissManual?: () => void;
  onAdjustManual?: (deltaSec: number) => void;
  onAdjustRest?: (deltaSec: number) => void;
  onSkipRest?: () => void;
  onDeleteExercise?: () => void;
  onOpenReplace?: () => void;
  onOpenReorder?: () => void;
  onConfirmReplaceDelete?: () => void;
  onConfirmUpdateRoutine?: () => void;
  onApplyTodayOnly?: () => void;
  onContinueCurrentWorkout?: () => void;
  onEndThenStartOther?: () => void;
};

export function WorkoutHeaderMenu({
  readOnly,
  onRequestEnd,
  onAddExercise,
  onOpenManual,
  manualDisabled,
}: OverlayHandlers & { manualDisabled?: boolean }) {
  const interactive = !readOnly;
  return (
    <View pointerEvents="box-none" style={styles.menuLayer} testID="workout-header-menu">
      <View style={styles.headerMenu}>
        <MenuRow
          disabled={!interactive}
          label={WORKOUT_COPY.endWorkout}
          onPress={onRequestEnd}
          testID="workout-menu-end"
        />
        <View style={styles.menuDivider} />
        <MenuRow
          disabled={!interactive}
          label={WORKOUT_COPY.addExercise}
          onPress={onAddExercise}
          testID="workout-menu-add-exercise"
        />
        <View style={styles.menuDivider} />
        <MenuRow
          disabled={!interactive || Boolean(manualDisabled)}
          label={WORKOUT_COPY.timer}
          onPress={onOpenManual}
          testID="workout-menu-timer"
        />
      </View>
    </View>
  );
}

export function WorkoutExerciseMenu({
  readOnly,
  onOpenReplace,
  onOpenReorder,
  onDeleteExercise,
}: OverlayHandlers) {
  const interactive = !readOnly;
  return (
    <View pointerEvents="box-none" style={styles.menuLayer} testID="workout-exercise-menu">
      <View style={[styles.headerMenu, styles.exerciseMenu]}>
        <MenuRow
          disabled={!interactive}
          label={WORKOUT_COPY.replace}
          onPress={onOpenReplace}
          testID="workout-exercise-menu-replace"
        />
        <View style={styles.menuDivider} />
        <MenuRow
          disabled={!interactive}
          label={WORKOUT_COPY.reorder}
          onPress={onOpenReorder}
          testID="workout-exercise-menu-reorder"
        />
        <View style={styles.menuDivider} />
        <MenuRow
          disabled={!interactive}
          label={WORKOUT_COPY.delete}
          onPress={onDeleteExercise}
          testID="workout-exercise-menu-delete"
        />
      </View>
    </View>
  );
}

function MenuRow({
  label,
  onPress,
  disabled,
  testID,
}: {
  label: string;
  onPress?: () => void;
  disabled: boolean;
  testID: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={styles.menuRow}
      testID={testID}
    >
      <Text style={[styles.menuLabel, disabled ? styles.menuDisabled : null]}>{label}</Text>
    </Pressable>
  );
}

export function WorkoutTimerSheet({
  session,
  readOnly,
  onSkipRest,
  onDismissManual,
  onAdjustRest,
  onAdjustManual,
  onStartManual,
  onPauseManual,
  onResumeManual,
  onResetManual,
}: OverlayHandlers & { session: WorkoutSession }) {
  const rest = session.overlay === 'rest';
  const remaining = rest ? session.rest?.remainingSec ?? 0 : session.manual?.remainingSec ?? 0;
  const duration = rest ? session.rest?.durationSec ?? 90 : session.manual?.durationSec ?? 90;
  const progress = duration <= 0 ? 0 : remaining / duration;
  const overlayPress = rest ? onSkipRest : onDismissManual;
  const adjust = rest ? onAdjustRest : onAdjustManual;

  return (
    <View style={styles.sheetRoot} testID={rest ? 'workout-rest-sheet' : 'workout-manual-sheet'}>
      <Pressable
        accessibilityRole="button"
        disabled={!!readOnly}
        onPress={overlayPress}
        style={styles.sheetOverlay}
        testID={rest ? 'workout-rest-overlay' : 'workout-manual-overlay'}
      />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.ringWrap}>
          <View style={styles.ringTrack} />
          <View
            style={[
              styles.ringProgress,
              { opacity: Math.max(0.25, progress) },
            ]}
          />
          <View style={styles.ringInner}>
            <Text style={styles.timerValue} testID="workout-timer-remaining">
              {formatTimer(remaining)}
            </Text>
            <View style={styles.adjustRow}>
              <Pressable
                accessibilityRole="button"
                disabled={!!readOnly}
                onPress={() => adjust?.(-TIMER_STEP_SEC)}
                style={styles.adjustHit}
                testID={rest ? 'workout-rest-minus' : 'workout-manual-minus'}
              >
                <Text style={styles.adjustGlyph}>−</Text>
              </Pressable>
              <Text style={styles.adjustLabel}>{WORKOUT_COPY.adjust15}</Text>
              <Pressable
                accessibilityRole="button"
                disabled={!!readOnly}
                onPress={() => adjust?.(TIMER_STEP_SEC)}
                style={styles.adjustHit}
                testID={rest ? 'workout-rest-plus' : 'workout-manual-plus'}
              >
                <Text style={styles.adjustGlyph}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.sheetCtaGap}>
          {rest ? (
            <Pressable
              accessibilityRole="button"
              disabled={!!readOnly}
              onPress={onSkipRest}
              style={styles.secondaryCta}
              testID="workout-rest-skip"
            >
              <Text style={styles.secondaryCtaLabel}>{WORKOUT_COPY.restSkip}</Text>
            </Pressable>
          ) : null}
          {session.overlay === 'manualIdle' ? (
            <Pressable
              accessibilityRole="button"
              disabled={!!readOnly}
              onPress={onStartManual}
              style={styles.primaryCta}
              testID="workout-manual-start"
            >
              <Text style={styles.primaryCtaLabel}>{WORKOUT_COPY.manualStart}</Text>
            </Pressable>
          ) : null}
          {session.overlay === 'manualRunning' ? (
            <Pressable
              accessibilityRole="button"
              disabled={!!readOnly}
              onPress={onPauseManual}
              style={styles.secondaryCta}
              testID="workout-manual-pause"
            >
              <Text style={styles.secondaryCtaLabel}>{WORKOUT_COPY.manualPause}</Text>
            </Pressable>
          ) : null}
          {session.overlay === 'manualPaused' ? (
            <View style={styles.pausedRow}>
              <Pressable
                accessibilityRole="button"
                disabled={!!readOnly}
                onPress={onResetManual}
                style={styles.pausedSecondary}
                testID="workout-manual-reset"
              >
                <Text style={styles.secondaryCtaLabel}>{WORKOUT_COPY.manualReset}</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                disabled={!!readOnly}
                onPress={onResumeManual}
                style={styles.pausedPrimary}
                testID="workout-manual-resume"
              >
                <Text style={styles.primaryCtaLabel}>{WORKOUT_COPY.manualResume}</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

export function WorkoutDialogs({
  session,
  readOnly,
  onContinueCurrentWorkout,
  onConfirmEnd,
  onConfirmDiscard,
  onApplyTodayOnly,
  onConfirmUpdateRoutine,
  onEndThenStartOther,
  onConfirmReplaceDelete,
}: OverlayHandlers & { session: WorkoutSession }) {
  if (session.overlay === 'endIncomplete') {
    return (
      <ConfirmDialogOverlay
        copy={END_INCOMPLETE_COPY}
        onPrimary={onConfirmEnd}
        onSecondary={onContinueCurrentWorkout}
        readOnly={readOnly}
        testID="workout-end-incomplete"
      />
    );
  }
  if (session.overlay === 'endComplete') {
    return (
      <ConfirmDialogOverlay
        copy={END_COMPLETE_COPY}
        onPrimary={onConfirmEnd}
        onSecondary={onContinueCurrentWorkout}
        readOnly={readOnly}
        testID="workout-end-complete"
      />
    );
  }
  if (session.overlay === 'discard') {
    return (
      <ConfirmDialogOverlay
        copy={DISCARD_COPY}
        onPrimary={onConfirmDiscard}
        onSecondary={onContinueCurrentWorkout}
        readOnly={readOnly}
        testID="workout-discard"
      />
    );
  }
  if (session.overlay === 'updateRoutine') {
    return (
      <ConfirmDialogOverlay
        copy={UPDATE_ROUTINE_COPY}
        onPrimary={onConfirmUpdateRoutine}
        onSecondary={onApplyTodayOnly}
        readOnly={readOnly}
        testID="workout-update-routine"
      />
    );
  }
  if (session.overlay === 'otherIncomplete') {
    return (
      <ConfirmDialogOverlay
        copy={OTHER_INCOMPLETE_COPY}
        onPrimary={onEndThenStartOther}
        onSecondary={onContinueCurrentWorkout}
        readOnly={readOnly}
        testID="workout-other-incomplete"
      />
    );
  }
  if (session.overlay === 'otherComplete') {
    return (
      <ConfirmDialogOverlay
        copy={OTHER_COMPLETE_COPY}
        onPrimary={onEndThenStartOther}
        onSecondary={onContinueCurrentWorkout}
        readOnly={readOnly}
        testID="workout-other-complete"
      />
    );
  }
  if (session.overlay === 'replaceConfirm') {
    return (
      <ConfirmDialogOverlay
        copy={REPLACE_DELETE_COPY}
        onPrimary={onConfirmReplaceDelete}
        onSecondary={onContinueCurrentWorkout}
        readOnly={readOnly}
        testID="workout-replace-delete"
      />
    );
  }
  return null;
}

const styles = StyleSheet.create({
  menuLayer: {
    ...StyleSheet.absoluteFill,
  },
  headerMenu: {
    position: 'absolute',
    top: 100,
    right: 28,
    width: 92,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 4,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  exerciseMenu: {
    top: 196,
    right: 20,
    width: 92,
  },
  menuRow: {
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  menuLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textPrimary,
  },
  menuDisabled: {
    opacity: 0.3,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.subtleSurface,
  },
  sheetRoot: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
  },
  sheetOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.52)',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 24,
    alignItems: 'center',
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.borderDefault,
    marginTop: 8,
    marginBottom: 16,
  },
  ringWrap: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringTrack: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 10,
    borderColor: RING_TRACK,
  },
  ringProgress: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 10,
    borderColor: colors.brandPrimary,
  },
  ringInner: {
    alignItems: 'center',
    gap: 8,
  },
  timerValue: {
    fontFamily: fontFamily.bold,
    fontSize: 36,
    lineHeight: 44,
    color: colors.textPrimary,
  },
  adjustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  adjustHit: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adjustGlyph: {
    fontFamily: fontFamily.medium,
    fontSize: 18,
    color: colors.textSecondary,
  },
  adjustLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.textSecondary,
  },
  sheetCtaGap: {
    marginTop: 16,
    width: '100%',
  },
  secondaryCta: {
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.subtleSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryCtaLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  primaryCta: {
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryCtaLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textOnBrand,
  },
  pausedRow: {
    flexDirection: 'row',
    gap: 12,
  },
  pausedSecondary: {
    flex: 1,
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.subtleSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pausedPrimary: {
    flex: 1,
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
