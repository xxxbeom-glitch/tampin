import type { TampinDatabase } from '../../../data/sqlite/client';
import type { RoutineRepository } from '../../../data/contracts/repositories/routine-repository';
import type { SyncOutboxRepository } from '../../../data/contracts/repositories/sync-outbox-repository';
import type { WorkoutRepository } from '../../../data/contracts/repositories/workout-repository';

export type OpenTampinDatabaseForProvider = () => TampinDatabase;

export type TampinRepositories = {
  routineRepository: RoutineRepository;
  workoutRepository: WorkoutRepository;
  syncOutboxRepository: SyncOutboxRepository;
};

export type DataLayerReadyState = {
  status: 'ready';
  schemaVersion: number;
  repositories: TampinRepositories;
};

export type DataLayerState =
  | { status: 'initializing' }
  | DataLayerReadyState
  | { status: 'error'; error: Error };
