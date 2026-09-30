import type { RecordingType } from '../exercise';
import { DEFAULT_TIMER_SEC } from './copy';
import type {
  WorkoutExercise,
  WorkoutMuscleTag,
  WorkoutOverlay,
  WorkoutReplaceCandidate,
  WorkoutSession,
  WorkoutSet,
} from './types';

export const chestTag: WorkoutMuscleTag = {
  label: '가슴',
  backgroundColor: '#E7F8F0',
  textColor: '#16845F',
};

export const shoulderTag: WorkoutMuscleTag = {
  label: '어깨',
  backgroundColor: '#FFF0E5',
  textColor: '#D56B1F',
};

export const tricepTag: WorkoutMuscleTag = {
  label: '삼두',
  backgroundColor: '#E7F7FA',
  textColor: '#0E8FA3',
};

function set(
  id: string,
  weight: string,
  reps: string,
  completed = false,
): WorkoutSet {
  return {
    id,
    weight,
    reps,
    duration: '00:00',
    assisted: '0',
    completed,
  };
}

function exercise(
  id: string,
  name: string,
  tag: WorkoutMuscleTag,
  sets: WorkoutSet[],
  extras?: Partial<WorkoutExercise>,
): WorkoutExercise {
  return {
    id,
    name,
    tag,
    recordingType: 'weight_reps' as RecordingType,
    attachment: extras?.attachment ?? null,
    thumbnailKey: extras?.thumbnailKey ?? 'smithBenchPress',
    sets,
    ...extras,
  };
}

const chestPressSets = [
  set('chest-1', '40', '12', true),
  set('chest-2', '80', '12'),
  set('chest-3', '80', '10'),
  set('chest-4', '70', '12'),
  set('chest-5', '70', '10'),
];

const shoulderSets = [
  set('shoulder-1', '40', '12', true),
  set('shoulder-2', '80', '12'),
  set('shoulder-3', '80', '10'),
  set('shoulder-4', '70', '12'),
  set('shoulder-5', '70', '10'),
];

const pushdownSets = [
  set('pushdown-1', '40', '12', true),
  set('pushdown-2', '80', '12'),
  set('pushdown-3', '80', '10'),
  set('pushdown-4', '70', '12'),
  set('pushdown-5', '70', '10'),
];

export const workoutExercisesFixture: WorkoutExercise[] = [
  exercise('chest-press-machine', '체스트 프레스 머신', chestTag, chestPressSets, {
    attachment: '뉴트럴 그립 · 미디엄',
    thumbnailKey: 'smithBenchPress',
  }),
  exercise('shoulder-press', '숄더 프레스', shoulderTag, shoulderSets, {
    thumbnailKey: 'lateralRaise',
  }),
  exercise('cable-pushdown', '케이블 푸시다운', tricepTag, pushdownSets, {
    attachment: '뉴트럴 그립 · 미디엄',
    thumbnailKey: 'romanianDeadlift',
  }),
];

export const replaceCandidateBatches: WorkoutReplaceCandidate[][] = [
  [
    { id: 'incline-bench', name: '인클라인 벤치프레스', tag: chestTag },
    { id: 'incline-dumbbell', name: '인클라인 덤벨프레스', tag: chestTag },
    { id: 'cable-fly', name: '케이블 플라이', tag: chestTag },
  ],
  [
    { id: 'pec-deck', name: '펙덱 플라이', tag: chestTag },
    { id: 'push-up', name: '푸시업', tag: chestTag },
    { id: 'dip', name: '딥스', tag: chestTag },
  ],
];

export const replaceLookup = replaceCandidateBatches.flat();

export function createWorkoutSession(partial?: Partial<WorkoutSession>): WorkoutSession {
  return {
    id: 'workout-05a',
    title: '상체 루틴 A',
    sourceRoutineId: 'push-day',
    startedAtMs: 1_000,
    elapsedPaused: false,
    displayElapsed: '00:32:16',
    exercises: workoutExercisesFixture.map((item) => ({
      ...item,
      sets: item.sets.map((row) => ({ ...row })),
    })),
    overlay: 'none',
    menuExerciseId: null,
    rest: null,
    manual: null,
    replaceExerciseId: null,
    replaceBatch: 0,
    replaceSelectedId: null,
    routineChanged: false,
    pendingOtherRoutineId: null,
    outcome: 'active',
    ...partial,
  };
}

export function createBlankWorkoutSession(): WorkoutSession {
  return createWorkoutSession({
    id: 'workout-blank',
    title: '빈 운동',
    sourceRoutineId: null,
    displayElapsed: '00:00:00',
    exercises: [],
  });
}

export function sessionWithOverlay(
  overlay: WorkoutOverlay,
  extras?: Partial<WorkoutSession>,
): WorkoutSession {
  const base = createWorkoutSession(extras);
  if (overlay === 'rest') {
    return {
      ...base,
      overlay,
      rest: { remainingSec: 89, durationSec: DEFAULT_TIMER_SEC },
      ...extras,
    };
  }
  if (overlay === 'manualIdle') {
    return {
      ...base,
      overlay,
      manual: { remainingSec: DEFAULT_TIMER_SEC, durationSec: DEFAULT_TIMER_SEC },
      ...extras,
    };
  }
  if (overlay === 'manualRunning' || overlay === 'manualPaused') {
    return {
      ...base,
      overlay,
      manual: { remainingSec: 72, durationSec: DEFAULT_TIMER_SEC },
      ...extras,
    };
  }
  if (overlay === 'exerciseMenu' || overlay === 'replace' || overlay === 'replaceConfirm') {
    return {
      ...base,
      overlay,
      menuExerciseId: 'chest-press-machine',
      replaceExerciseId: 'chest-press-machine',
      replaceSelectedId: overlay === 'replace' ? null : 'incline-bench',
      ...extras,
    };
  }
  if (overlay === 'otherIncomplete' || overlay === 'otherComplete') {
    return {
      ...base,
      overlay,
      pendingOtherRoutineId: 'other-routine',
      ...extras,
    };
  }
  return { ...base, overlay, ...extras };
}

export function fullyCompletedSession(): WorkoutSession {
  return createWorkoutSession({
    exercises: workoutExercisesFixture.map((exerciseItem) => ({
      ...exerciseItem,
      sets: exerciseItem.sets.map((row) => ({ ...row, completed: true })),
    })),
  });
}

export function pausedElapsedSession(): WorkoutSession {
  return createWorkoutSession({ elapsedPaused: true, displayElapsed: '00:32:16' });
}
