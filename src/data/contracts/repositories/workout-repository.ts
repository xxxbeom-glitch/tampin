import type { AccountId, WorkoutSessionId } from '../ids';
import type {
  AddSessionExerciseInput,
  CompleteWorkoutInput,
  CompletedWorkoutRecord,
  SessionExerciseRecord,
  SetRecordRow,
  StartWorkoutSessionInput,
  UpsertSetRecordInput,
  WorkoutSessionRecord,
} from '../workout';

export interface WorkoutRepository {
  startSession(input: StartWorkoutSessionInput): Promise<WorkoutSessionRecord>;
  getActiveSession(accountId: AccountId): Promise<WorkoutSessionRecord | null>;
  addSessionExercise(input: AddSessionExerciseInput): Promise<SessionExerciseRecord>;
  upsertSetRecord(input: UpsertSetRecordInput): Promise<SetRecordRow>;
  completeWorkout(input: CompleteWorkoutInput): Promise<CompletedWorkoutRecord>;
  getCompletedWorkoutBySession(
    accountId: AccountId,
    sessionId: WorkoutSessionId,
  ): Promise<CompletedWorkoutRecord | null>;
}
