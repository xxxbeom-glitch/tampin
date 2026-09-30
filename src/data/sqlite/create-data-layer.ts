import type { RoutineRepository } from '../contracts/repositories/routine-repository';
import type { SyncOutboxRepository } from '../contracts/repositories/sync-outbox-repository';
import type { WorkoutRepository } from '../contracts/repositories/workout-repository';
import type { SqliteConnection } from './connection';
import { SqliteRoutineRepository } from './repositories/sqlite-routine-repository';
import { SqliteSyncOutboxRepository } from './repositories/sqlite-sync-outbox-repository';
import { SqliteWorkoutRepository } from './repositories/sqlite-workout-repository';

export type TampinDataLayer = {
  routineRepository: RoutineRepository;
  workoutRepository: WorkoutRepository;
  syncOutboxRepository: SyncOutboxRepository;
};

export function createDataLayer(connection: SqliteConnection): TampinDataLayer {
  return {
    routineRepository: new SqliteRoutineRepository(connection),
    workoutRepository: new SqliteWorkoutRepository(connection),
    syncOutboxRepository: new SqliteSyncOutboxRepository(connection),
  };
}
