import type {
  AccountId,
  CompletedWorkoutId,
  ExerciseId,
  RoutineId,
  SessionExerciseId,
  SetRecordId,
  WorkoutSessionId,
} from './ids';
import type { ActiveRecordingType } from './recording-type';
import type { SyncState } from './sync-metadata';

export type WorkoutSessionStatus = 'active' | 'completed' | 'discarded';

export type WorkoutSessionRecord = {
  id: WorkoutSessionId;
  accountId: AccountId;
  status: WorkoutSessionStatus;
  sourceRoutineId: RoutineId | null;
  startedAt: string;
  endedAt: string | null;
  createdAt: string;
  updatedAt: string;
  syncState: SyncState;
  serverVersion: number | null;
  deletedAt: string | null;
};

export type SessionExerciseRecord = {
  id: SessionExerciseId;
  accountId: AccountId;
  sessionId: WorkoutSessionId;
  exerciseId: ExerciseId;
  sortOrder: number;
  exerciseNameSnapshot: string;
  recordingTypeSnapshot: ActiveRecordingType;
  createdAt: string;
  updatedAt: string;
  syncState: SyncState;
  serverVersion: number | null;
  deletedAt: string | null;
};

export type SetRecordRow = {
  id: SetRecordId;
  accountId: AccountId;
  sessionExerciseId: SessionExerciseId;
  setIndex: number;
  weightKg: number | null;
  reps: number | null;
  durationSeconds: number | null;
  assistedWeightKg: number | null;
  isCompleted: boolean;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  syncState: SyncState;
  serverVersion: number | null;
  deletedAt: string | null;
};

export type CompletedWorkoutRecord = {
  id: CompletedWorkoutId;
  accountId: AccountId;
  sessionId: WorkoutSessionId;
  completedAt: string;
  titleSnapshot: string | null;
  sourceRoutineIdSnapshot: RoutineId | null;
  sourceRoutineNameSnapshot: string | null;
  createdAt: string;
  updatedAt: string;
  syncState: SyncState;
  serverVersion: number | null;
  deletedAt: string | null;
};

export type StartWorkoutSessionInput = {
  accountId: AccountId;
  startedAt: string;
  sourceRoutineId?: RoutineId | null;
};

export type AddSessionExerciseInput = {
  accountId: AccountId;
  sessionId: WorkoutSessionId;
  exerciseId: ExerciseId;
  exerciseNameSnapshot: string;
  recordingTypeSnapshot: ActiveRecordingType;
  sortOrder: number;
};

export type UpsertSetRecordInput = {
  accountId: AccountId;
  sessionExerciseId: SessionExerciseId;
  setIndex: number;
  weightKg?: number | null;
  reps?: number | null;
  durationSeconds?: number | null;
  assistedWeightKg?: number | null;
  isCompleted?: boolean;
  note?: string | null;
};

export type CompleteWorkoutInput = {
  accountId: AccountId;
  sessionId: WorkoutSessionId;
  completedAt: string;
  titleSnapshot?: string | null;
  sourceRoutineIdSnapshot?: RoutineId | null;
  sourceRoutineNameSnapshot?: string | null;
};
