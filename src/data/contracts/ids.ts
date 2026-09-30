/** Opaque stable client-generated identifiers for user-owned records. */
export type AccountId = string & { readonly __brand: 'AccountId' };
export type RoutineId = string & { readonly __brand: 'RoutineId' };
export type RoutineExerciseId = string & { readonly __brand: 'RoutineExerciseId' };
export type RoutineSetTemplateId = string & { readonly __brand: 'RoutineSetTemplateId' };
export type WorkoutSessionId = string & { readonly __brand: 'WorkoutSessionId' };
export type SessionExerciseId = string & { readonly __brand: 'SessionExerciseId' };
export type SetRecordId = string & { readonly __brand: 'SetRecordId' };
export type CompletedWorkoutId = string & { readonly __brand: 'CompletedWorkoutId' };
export type ExerciseId = string & { readonly __brand: 'ExerciseId' };
export type MutationId = string & { readonly __brand: 'MutationId' };

export function createId<T extends string>(value: string = crypto.randomUUID()): T {
  return value as T;
}
