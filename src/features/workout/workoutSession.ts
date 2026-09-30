import { DEFAULT_TIMER_SEC } from './copy';
import { clampTimer } from './formatTime';
import type {
  WorkoutExercise,
  WorkoutSession,
  WorkoutSessionAction,
  WorkoutSet,
} from './types';

export function plannedSetsComplete(session: WorkoutSession): boolean {
  return (
    session.exercises.length > 0 &&
    session.exercises.every((exercise) =>
      exercise.sets.length > 0 && exercise.sets.every((set) => set.completed),
    )
  );
}

export function completedSetCount(session: WorkoutSession): number {
  return session.exercises.reduce(
    (sum, exercise) => sum + exercise.sets.filter((set) => set.completed).length,
    0,
  );
}

function nextSetId(exercise: WorkoutExercise): string {
  return `${exercise.id}-set-${exercise.sets.length + 1}`;
}

function emptySet(id: string): WorkoutSet {
  return {
    id,
    weight: '0',
    reps: '0',
    duration: '00:00',
    assisted: '0',
    completed: false,
  };
}

function closeTransient(session: WorkoutSession): WorkoutSession {
  return {
    ...session,
    overlay: 'none',
    menuExerciseId: session.overlay === 'exerciseMenu' ? null : session.menuExerciseId,
  };
}

function withRest(session: WorkoutSession, remainingSec: number): WorkoutSession {
  return {
    ...session,
    overlay: 'rest',
    rest: { remainingSec: clampTimer(remainingSec), durationSec: DEFAULT_TIMER_SEC },
    manual: null,
  };
}

function menuExercise(session: WorkoutSession): WorkoutExercise | undefined {
  return session.exercises.find((exercise) => exercise.id === session.menuExerciseId);
}

function applyReplace(
  session: WorkoutSession,
  candidate: { id: string; name: string },
): WorkoutSession {
  const targetId = session.replaceExerciseId ?? session.menuExerciseId;
  return {
    ...session,
    overlay: 'none',
    menuExerciseId: null,
    replaceExerciseId: null,
    replaceSelectedId: null,
    replaceBatch: 0,
    routineChanged: true,
    exercises: session.exercises.map((exercise) =>
      exercise.id === targetId
        ? {
            ...exercise,
            id: candidate.id,
            name: candidate.name,
            sets: exercise.sets.map((set) => ({ ...set, completed: false })),
          }
        : exercise,
    ),
  };
}

export function reduceWorkoutSession(
  session: WorkoutSession,
  action: WorkoutSessionAction,
  replaceLookup?: readonly { id: string; name: string }[],
): WorkoutSession {
  switch (action.type) {
    case 'openHeaderMenu':
      return { ...session, overlay: 'headerMenu' };
    case 'openExerciseMenu':
      return { ...session, overlay: 'exerciseMenu', menuExerciseId: action.exerciseId };
    case 'closeOverlay':
      if (session.overlay === 'rest' || session.overlay.startsWith('manual')) {
        return session;
      }
      return closeTransient(session);
    case 'requestEnd':
      return {
        ...session,
        overlay: plannedSetsComplete(session) ? 'endComplete' : 'endIncomplete',
      };
    case 'confirmEnd':
      if (session.routineChanged) {
        return { ...session, overlay: 'updateRoutine' };
      }
      return { ...session, overlay: 'none', outcome: 'saved', rest: null, manual: null };
    case 'openDiscard':
      return { ...session, overlay: 'discard' };
    case 'confirmDiscard':
      return { ...session, overlay: 'none', outcome: 'discarded', rest: null, manual: null };
    case 'openManual':
      if (session.rest) {
        return session;
      }
      return {
        ...session,
        overlay: 'manualIdle',
        manual: { remainingSec: DEFAULT_TIMER_SEC, durationSec: DEFAULT_TIMER_SEC },
      };
    case 'startManual':
      if (!session.manual) {
        return session;
      }
      return { ...session, overlay: 'manualRunning' };
    case 'pauseManual':
      if (!session.manual) {
        return session;
      }
      return { ...session, overlay: 'manualPaused' };
    case 'resumeManual':
      if (!session.manual) {
        return session;
      }
      return { ...session, overlay: 'manualRunning' };
    case 'resetManual':
      return {
        ...session,
        overlay: 'manualIdle',
        manual: { remainingSec: DEFAULT_TIMER_SEC, durationSec: DEFAULT_TIMER_SEC },
      };
    case 'dismissManual':
      return { ...session, overlay: 'none', manual: null };
    case 'adjustManual': {
      if (!session.manual) {
        return session;
      }
      const remainingSec = clampTimer(session.manual.remainingSec + action.deltaSec);
      return {
        ...session,
        manual: {
          remainingSec,
          durationSec: Math.max(session.manual.durationSec, remainingSec, DEFAULT_TIMER_SEC),
        },
      };
    }
    case 'adjustRest': {
      if (!session.rest) {
        return session;
      }
      const remainingSec = clampTimer(session.rest.remainingSec + action.deltaSec);
      return {
        ...session,
        rest: {
          remainingSec,
          durationSec: Math.max(session.rest.durationSec, remainingSec, DEFAULT_TIMER_SEC),
        },
      };
    }
    case 'skipRest':
      return { ...session, overlay: 'none', rest: null };
    case 'tickRest': {
      if (!session.rest) {
        return session;
      }
      const remainingSec = clampTimer(session.rest.remainingSec - 1);
      if (remainingSec === 0) {
        return { ...session, overlay: 'none', rest: null };
      }
      return { ...session, rest: { ...session.rest, remainingSec } };
    }
    case 'tickManual': {
      if (!session.manual || session.overlay !== 'manualRunning') {
        return session;
      }
      const remainingSec = clampTimer(session.manual.remainingSec - 1);
      return { ...session, manual: { ...session.manual, remainingSec } };
    }
    case 'toggleSet': {
      const exercises = session.exercises.map((exercise) => {
        if (exercise.id !== action.exerciseId) {
          return exercise;
        }
        return {
          ...exercise,
          sets: exercise.sets.map((set) =>
            set.id === action.setId ? { ...set, completed: !set.completed } : set,
          ),
        };
      });
      const next = { ...session, exercises };
      const completedNow = exercises
        .find((exercise) => exercise.id === action.exerciseId)
        ?.sets.find((set) => set.id === action.setId)?.completed;
      if (completedNow) {
        return withRest(next, DEFAULT_TIMER_SEC);
      }
      return next;
    }
    case 'changeSetField':
      return {
        ...session,
        exercises: session.exercises.map((exercise) =>
          exercise.id === action.exerciseId
            ? {
                ...exercise,
                sets: exercise.sets.map((set) =>
                  set.id === action.setId ? { ...set, [action.field]: action.value } : set,
                ),
              }
            : exercise,
        ),
      };
    case 'addSet':
      return {
        ...session,
        routineChanged: true,
        exercises: session.exercises.map((exercise) =>
          exercise.id === action.exerciseId
            ? { ...exercise, sets: [...exercise.sets, emptySet(nextSetId(exercise))] }
            : exercise,
        ),
      };
    case 'deleteSet':
      return {
        ...session,
        routineChanged: true,
        exercises: session.exercises.map((exercise) => {
          if (exercise.id !== action.exerciseId || exercise.sets.length === 0) {
            return exercise;
          }
          return { ...exercise, sets: exercise.sets.slice(0, -1) };
        }),
      };
    case 'deleteExercise': {
      const targetId = session.menuExerciseId;
      if (!targetId) {
        return closeTransient(session);
      }
      return {
        ...session,
        overlay: 'none',
        menuExerciseId: null,
        routineChanged: true,
        exercises: session.exercises.filter((exercise) => exercise.id !== targetId),
      };
    }
    case 'openReplace':
      return {
        ...session,
        overlay: 'replace',
        replaceExerciseId: session.menuExerciseId,
        replaceBatch: 0,
        replaceSelectedId: null,
        menuExerciseId: session.menuExerciseId,
      };
    case 'selectReplace':
      return { ...session, replaceSelectedId: action.candidateId };
    case 'cycleReplaceBatch':
      return { ...session, replaceBatch: session.replaceBatch === 0 ? 1 : 0, replaceSelectedId: null };
    case 'confirmReplace': {
      if (!session.replaceSelectedId) {
        return session;
      }
      const target = menuExercise(session) ?? session.exercises.find((item) => item.id === session.replaceExerciseId);
      const completed = target?.sets.some((set) => set.completed) ?? false;
      if (completed) {
        return { ...session, overlay: 'replaceConfirm' };
      }
      const candidate = replaceLookup?.find((item) => item.id === session.replaceSelectedId);
      if (!candidate) {
        return session;
      }
      return applyReplace(session, candidate);
    }
    case 'confirmReplaceDelete': {
      const candidate = replaceLookup?.find((item) => item.id === session.replaceSelectedId);
      if (!candidate) {
        return { ...session, overlay: 'replace' };
      }
      return applyReplace(session, candidate);
    }
    case 'openReorder':
      return { ...session, overlay: 'reorder', menuExerciseId: null };
    case 'moveExerciseDown': {
      const index = session.exercises.findIndex((exercise) => exercise.id === action.exerciseId);
      if (index < 0 || index >= session.exercises.length - 1) {
        return session;
      }
      const exercises = session.exercises.slice();
      const [row] = exercises.splice(index, 1);
      exercises.splice(index + 1, 0, row);
      return { ...session, exercises, routineChanged: true };
    }
    case 'confirmReorder':
      return { ...session, overlay: 'none' };
    case 'addExercises':
      return {
        ...session,
        routineChanged: session.exercises.length > 0 || session.sourceRoutineId !== null,
        exercises: [...session.exercises, ...action.exercises],
      };
    case 'confirmUpdateRoutine':
    case 'applyTodayOnly':
      return { ...session, overlay: 'none', outcome: 'saved', rest: null, manual: null };
    case 'continueCurrentWorkout':
      if (session.overlay === 'replaceConfirm') {
        return { ...session, overlay: 'replace' };
      }
      return { ...session, overlay: 'none', pendingOtherRoutineId: null };
    case 'endThenStartOther':
      return { ...session, overlay: 'none', outcome: 'saved', rest: null, manual: null };
    default:
      return session;
  }
}

