import type {
  AccountId,
  ExerciseId,
  RoutineExerciseId,
  RoutineId,
  RoutineSetTemplateId,
} from './ids';
import type { ActiveRecordingType } from './recording-type';
import type { SyncState } from './sync-metadata';

export type RoutineRecord = {
  id: RoutineId;
  accountId: AccountId;
  name: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  syncState: SyncState;
  serverVersion: number | null;
  deletedAt: string | null;
};

export type RoutineExerciseRecord = {
  id: RoutineExerciseId;
  accountId: AccountId;
  routineId: RoutineId;
  exerciseId: ExerciseId;
  sortOrder: number;
  exerciseNameSnapshot: string;
  recordingType: ActiveRecordingType;
  createdAt: string;
  updatedAt: string;
  syncState: SyncState;
  serverVersion: number | null;
  deletedAt: string | null;
};

export type RoutineSetTemplateRecord = {
  id: RoutineSetTemplateId;
  accountId: AccountId;
  routineExerciseId: RoutineExerciseId;
  setIndex: number;
  targetWeightKg: number | null;
  targetReps: number | null;
  targetDurationSeconds: number | null;
  targetAssistedWeightKg: number | null;
  createdAt: string;
  updatedAt: string;
  syncState: SyncState;
  serverVersion: number | null;
  deletedAt: string | null;
};

export type CreateRoutineInput = {
  accountId: AccountId;
  name: string;
  sortOrder?: number;
};

export type AddRoutineExerciseInput = {
  accountId: AccountId;
  routineId: RoutineId;
  exerciseId: ExerciseId;
  exerciseNameSnapshot: string;
  recordingType: ActiveRecordingType;
  sortOrder: number;
};

export type AddRoutineSetTemplateInput = {
  accountId: AccountId;
  routineExerciseId: RoutineExerciseId;
  setIndex: number;
  targetWeightKg?: number | null;
  targetReps?: number | null;
  targetDurationSeconds?: number | null;
  targetAssistedWeightKg?: number | null;
};
