import {
  createWorkoutSession,
  fullyCompletedSession,
  sessionWithOverlay,
  type WorkoutSession,
} from '../../../features/workout';

export const workoutCatalogPresets = {
  '05a-workout-weight': sessionWithOverlay('none'),
  '05a-workout-scrolled': sessionWithOverlay('none'),
  '05i-workout-menu': sessionWithOverlay('headerMenu'),
  '05j-reorder': sessionWithOverlay('reorder'),
  '05k-end-incomplete': sessionWithOverlay('endIncomplete'),
  '05l-end-complete': sessionWithOverlay('endComplete', fullyCompletedSession()),
  '05m-discard': sessionWithOverlay('discard'),
  '05o-update-routine': sessionWithOverlay('updateRoutine', { routineChanged: true }),
  '05h-replace-selected': sessionWithOverlay('replace', { replaceSelectedId: 'incline-bench' }),
  '05g-replace-suggest': sessionWithOverlay('replace'),
  '05n-other-incomplete': sessionWithOverlay('otherIncomplete'),
  '05n-other-complete': sessionWithOverlay('otherComplete', fullyCompletedSession()),
  '05g2-replace-second': sessionWithOverlay('replace', { replaceBatch: 1 }),
  '05p-replace-delete': sessionWithOverlay('replaceConfirm'),
  '05f-rest-timer': sessionWithOverlay('rest'),
  '05q-manual-idle': sessionWithOverlay('manualIdle'),
  '05q-manual-running': sessionWithOverlay('manualRunning'),
  '05q-manual-paused': sessionWithOverlay('manualPaused'),
} as const satisfies Record<string, WorkoutSession>;

export type WorkoutCatalogEntryId = keyof typeof workoutCatalogPresets;

export function isWorkoutCatalogEntryId(id: string): id is WorkoutCatalogEntryId {
  return id in workoutCatalogPresets;
}

export function workoutCatalogSession(id: WorkoutCatalogEntryId): WorkoutSession {
  return workoutCatalogPresets[id] ?? createWorkoutSession();
}
