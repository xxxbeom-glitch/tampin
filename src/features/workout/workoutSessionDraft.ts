import type { ExerciseCatalogItem } from '../exercise';
import { resolveRoutineDetailFixture } from '../routine';
import { chestTag, createBlankWorkoutSession, createWorkoutSession } from './workoutFixtures';
import type { WorkoutExercise, WorkoutSession } from './types';

let active: WorkoutSession | null = null;
let selectionPurpose: 'routineCreate' | 'workoutAdd' = 'routineCreate';

export function getActiveWorkoutSession(): WorkoutSession | null {
  return active;
}

export function setActiveWorkoutSession(session: WorkoutSession | null): void {
  active = session;
}

export function clearActiveWorkoutSession(): void {
  active = null;
}

export function getExerciseSelectionPurpose(): 'routineCreate' | 'workoutAdd' {
  return selectionPurpose;
}

export function setExerciseSelectionPurpose(purpose: 'routineCreate' | 'workoutAdd'): void {
  selectionPurpose = purpose;
}

export function startWorkoutFromRoutine(routineId: string): WorkoutSession {
  const detail = resolveRoutineDetailFixture(routineId);
  const session = detail
    ? createWorkoutSession({
        id: `workout-${routineId}`,
        title: detail.title,
        sourceRoutineId: routineId,
        exercises: detail.exercises.map((item) => ({
          id: item.id,
          name: item.name,
          tag: item.tag,
          recordingType: 'weight_reps' as const,
          attachment: null,
          thumbnailKey: item.id,
          sets: item.sets.map((row, index) => ({
            id: `${item.id}-${index + 1}`,
            weight: row.kg,
            reps: row.reps,
            duration: '00:00',
            assisted: '0',
            completed: false,
          })),
        })),
        displayElapsed: '00:00:00',
      })
    : createWorkoutSession({ sourceRoutineId: routineId, displayElapsed: '00:00:00' });
  active = session;
  return session;
}

export function startBlankWorkout(): WorkoutSession {
  const session = createBlankWorkoutSession();
  active = session;
  return session;
}

export function catalogItemToWorkoutExercise(item: ExerciseCatalogItem, attachment: string | null): WorkoutExercise {
  return {
    id: item.id,
    name: item.name,
    tag: {
      label: item.bodyPart,
      backgroundColor: chestTag.backgroundColor,
      textColor: chestTag.textColor,
    },
    recordingType: item.recordingType,
    attachment,
    thumbnailKey: item.thumbnailKey,
    sets: [
      {
        id: `${item.id}-1`,
        weight: '0',
        reps: '0',
        duration: '00:00',
        assisted: '0',
        completed: false,
      },
    ],
  };
}

export function appendWorkoutExercises(exercises: WorkoutExercise[]): WorkoutSession | null {
  if (!active) {
    return null;
  }
  active = {
    ...active,
    routineChanged: active.sourceRoutineId !== null || active.exercises.length > 0,
    exercises: [...active.exercises, ...exercises],
  };
  return active;
}
