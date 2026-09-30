import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ActiveWorkoutScreen,
  clearActiveWorkoutSession,
  createWorkoutSession,
  getActiveWorkoutSession,
  plannedSetsComplete,
  reduceWorkoutSession,
  replaceCandidateBatches,
  replaceLookup,
  setActiveWorkoutSession,
  setExerciseSelectionPurpose,
  startBlankWorkout,
  startWorkoutFromRoutine,
  type WorkoutSession,
  type WorkoutSessionAction,
} from '../../../features/workout';
import { formatClock, elapsedSeconds } from '../../../features/workout';
import type { RootStackParamList } from '../types';

type Navigation = NativeStackNavigationProp<RootStackParamList, 'ActiveWorkout'>;

function persist(next: WorkoutSession) {
  if (next.outcome === 'active') {
    setActiveWorkoutSession(next);
  } else {
    clearActiveWorkoutSession();
  }
}

export function ActiveWorkoutRouteScreen() {
  const navigation = useNavigation<Navigation>();
  const [session, setSession] = useState<WorkoutSession>(
    () => getActiveWorkoutSession() ?? createWorkoutSession(),
  );

  useFocusEffect(
    useCallback(() => {
      const latest = getActiveWorkoutSession();
      if (latest) {
        setSession((current) => (current === latest ? current : latest));
      }
    }, []),
  );

  const dispatch = (action: WorkoutSessionAction) => {
    setSession((current) => {
      if (action.type === 'endThenStartOther' && current.pendingOtherRoutineId) {
        const started =
          current.pendingOtherRoutineId === 'blank'
            ? startBlankWorkout()
            : startWorkoutFromRoutine(current.pendingOtherRoutineId);
        return started;
      }
      const next = reduceWorkoutSession(current, action, replaceLookup);
      persist(next);
      if (next.outcome !== 'active') {
        navigation.goBack();
      }
      return next;
    });
  };

  const displayElapsed =
    session.displayElapsed ?? formatClock(elapsedSeconds(session.startedAtMs, Date.now()));

  return (
    <ActiveWorkoutScreen
      displayElapsed={displayElapsed}
      onAddExercise={() => {
        setActiveWorkoutSession(session);
        setExerciseSelectionPurpose('workoutAdd');
        navigation.navigate('ExerciseSelection');
      }}
      onAddSet={(exerciseId) => dispatch({ type: 'addSet', exerciseId })}
      onAdjustManual={(deltaSec) => dispatch({ type: 'adjustManual', deltaSec })}
      onAdjustRest={(deltaSec) => dispatch({ type: 'adjustRest', deltaSec })}
      onApplyTodayOnly={() => dispatch({ type: 'applyTodayOnly' })}
      onBack={() => navigation.goBack()}
      onChangeSetField={(exerciseId, setId, field, value) =>
        dispatch({ type: 'changeSetField', exerciseId, setId, field, value })
      }
      onCloseOverlay={() => dispatch({ type: 'closeOverlay' })}
      onConfirmDiscard={() => dispatch({ type: 'confirmDiscard' })}
      onConfirmEnd={() => dispatch({ type: 'confirmEnd' })}
      onConfirmReorder={() => dispatch({ type: 'confirmReorder' })}
      onConfirmReplace={() => dispatch({ type: 'confirmReplace' })}
      onConfirmReplaceDelete={() => dispatch({ type: 'confirmReplaceDelete' })}
      onConfirmUpdateRoutine={() => dispatch({ type: 'confirmUpdateRoutine' })}
      onContinueCurrentWorkout={() => dispatch({ type: 'continueCurrentWorkout' })}
      onCycleReplaceBatch={() => dispatch({ type: 'cycleReplaceBatch' })}
      onDeleteExercise={() => dispatch({ type: 'deleteExercise' })}
      onDeleteSet={(exerciseId) => dispatch({ type: 'deleteSet', exerciseId })}
      onDismissManual={() => dispatch({ type: 'dismissManual' })}
      onEndThenStartOther={() => dispatch({ type: 'endThenStartOther' })}
      onMoveExerciseDown={(exerciseId) => dispatch({ type: 'moveExerciseDown', exerciseId })}
      onOpenExerciseMenu={(exerciseId) => dispatch({ type: 'openExerciseMenu', exerciseId })}
      onOpenHeaderMenu={() => dispatch({ type: 'openHeaderMenu' })}
      onOpenManual={() => dispatch({ type: 'openManual' })}
      onOpenReorder={() => dispatch({ type: 'openReorder' })}
      onOpenReplace={() => dispatch({ type: 'openReplace' })}
      onPauseManual={() => dispatch({ type: 'pauseManual' })}
      onRequestEnd={() => dispatch({ type: 'requestEnd' })}
      onResetManual={() => dispatch({ type: 'resetManual' })}
      onResumeManual={() => dispatch({ type: 'resumeManual' })}
      onSelectReplace={(candidateId) => dispatch({ type: 'selectReplace', candidateId })}
      onSkipRest={() => dispatch({ type: 'skipRest' })}
      onStartManual={() => dispatch({ type: 'startManual' })}
      onToggleSet={(exerciseId, setId) => dispatch({ type: 'toggleSet', exerciseId, setId })}
      replaceCandidates={replaceCandidateBatches}
      session={session}
      thumbnailFor={() => undefined}
    />
  );
}

export function prepareOtherRoutineHandoff(nextRoutineId: string): boolean {
  const current = getActiveWorkoutSession();
  if (!current || current.outcome !== 'active') {
    return false;
  }
  const overlay = plannedSetsComplete(current) ? 'otherComplete' : 'otherIncomplete';
  setActiveWorkoutSession({
    ...current,
    overlay,
    pendingOtherRoutineId: nextRoutineId,
  });
  return true;
}
