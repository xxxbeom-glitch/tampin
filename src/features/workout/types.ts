import type { ImageSourcePropType } from 'react-native';
import type { RecordingType } from '../exercise';

export type WorkoutMuscleTag = {
  label: string;
  backgroundColor: string;
  textColor: string;
};

export type WorkoutSet = {
  id: string;
  weight: string;
  reps: string;
  duration: string;
  assisted: string;
  completed: boolean;
};

export type WorkoutExercise = {
  id: string;
  name: string;
  tag: WorkoutMuscleTag;
  recordingType: RecordingType;
  attachment: string | null;
  thumbnailKey: string | null;
  sets: WorkoutSet[];
};

export type WorkoutOverlay =
  | 'none'
  | 'headerMenu'
  | 'exerciseMenu'
  | 'rest'
  | 'manualIdle'
  | 'manualRunning'
  | 'manualPaused'
  | 'endIncomplete'
  | 'endComplete'
  | 'discard'
  | 'updateRoutine'
  | 'otherIncomplete'
  | 'otherComplete'
  | 'replace'
  | 'replaceConfirm'
  | 'reorder';

export type WorkoutReplaceCandidate = {
  id: string;
  name: string;
  tag: WorkoutMuscleTag;
};

export type WorkoutSession = {
  id: string;
  title: string;
  sourceRoutineId: string | null;
  startedAtMs: number;
  elapsedPaused: boolean;
  displayElapsed: string | null;
  exercises: WorkoutExercise[];
  overlay: WorkoutOverlay;
  menuExerciseId: string | null;
  rest: { remainingSec: number; durationSec: number } | null;
  manual: { remainingSec: number; durationSec: number } | null;
  replaceExerciseId: string | null;
  replaceBatch: 0 | 1;
  replaceSelectedId: string | null;
  routineChanged: boolean;
  pendingOtherRoutineId: string | null;
  outcome: 'active' | 'saved' | 'discarded';
};

export type WorkoutSessionAction =
  | { type: 'openHeaderMenu' }
  | { type: 'openExerciseMenu'; exerciseId: string }
  | { type: 'closeOverlay' }
  | { type: 'requestEnd' }
  | { type: 'confirmEnd' }
  | { type: 'openDiscard' }
  | { type: 'confirmDiscard' }
  | { type: 'openManual' }
  | { type: 'startManual' }
  | { type: 'pauseManual' }
  | { type: 'resumeManual' }
  | { type: 'resetManual' }
  | { type: 'dismissManual' }
  | { type: 'adjustManual'; deltaSec: number }
  | { type: 'adjustRest'; deltaSec: number }
  | { type: 'skipRest' }
  | { type: 'tickRest' }
  | { type: 'tickManual' }
  | { type: 'toggleSet'; exerciseId: string; setId: string }
  | { type: 'changeSetField'; exerciseId: string; setId: string; field: 'weight' | 'reps'; value: string }
  | { type: 'addSet'; exerciseId: string }
  | { type: 'deleteSet'; exerciseId: string }
  | { type: 'deleteExercise' }
  | { type: 'openReplace' }
  | { type: 'selectReplace'; candidateId: string }
  | { type: 'cycleReplaceBatch' }
  | { type: 'confirmReplace' }
  | { type: 'confirmReplaceDelete' }
  | { type: 'openReorder' }
  | { type: 'moveExerciseDown'; exerciseId: string }
  | { type: 'confirmReorder' }
  | { type: 'addExercises'; exercises: WorkoutExercise[] }
  | { type: 'confirmUpdateRoutine' }
  | { type: 'applyTodayOnly' }
  | { type: 'continueCurrentWorkout' }
  | { type: 'endThenStartOther' };

export type ActiveWorkoutScreenProps = {
  session: WorkoutSession;
  replaceCandidates: readonly WorkoutReplaceCandidate[][];
  thumbnailFor: (key: string | null) => ImageSourcePropType | undefined;
  displayElapsed: string;
  readOnly?: boolean;
  scrolled?: boolean;
  onBack?: () => void;
  onOpenHeaderMenu?: () => void;
  onOpenExerciseMenu?: (exerciseId: string) => void;
  onCloseOverlay?: () => void;
  onRequestEnd?: () => void;
  onConfirmEnd?: () => void;
  onOpenDiscard?: () => void;
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
  onToggleSet?: (exerciseId: string, setId: string) => void;
  onChangeSetField?: (
    exerciseId: string,
    setId: string,
    field: 'weight' | 'reps',
    value: string,
  ) => void;
  onAddSet?: (exerciseId: string) => void;
  onDeleteSet?: (exerciseId: string) => void;
  onDeleteExercise?: () => void;
  onOpenReplace?: () => void;
  onSelectReplace?: (candidateId: string) => void;
  onCycleReplaceBatch?: () => void;
  onConfirmReplace?: () => void;
  onConfirmReplaceDelete?: () => void;
  onOpenReorder?: () => void;
  onMoveExerciseDown?: (exerciseId: string) => void;
  onConfirmReorder?: () => void;
  onConfirmUpdateRoutine?: () => void;
  onApplyTodayOnly?: () => void;
  onContinueCurrentWorkout?: () => void;
  onEndThenStartOther?: () => void;
};
