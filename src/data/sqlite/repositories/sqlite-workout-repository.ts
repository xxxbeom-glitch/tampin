import type { WorkoutRepository } from '../../contracts/repositories/workout-repository';
import type {
  AddSessionExerciseInput,
  CompleteWorkoutInput,
  CompletedWorkoutRecord,
  SessionExerciseRecord,
  SetRecordRow,
  StartWorkoutSessionInput,
  UpsertSetRecordInput,
  WorkoutSessionRecord,
} from '../../contracts/workout';
import {
  createId,
  type AccountId,
  type CompletedWorkoutId,
  type SessionExerciseId,
  type SetRecordId,
  type WorkoutSessionId,
} from '../../contracts/ids';
import type { SqliteConnection } from '../connection';
import { nowIso } from '../time';

type WorkoutSessionRow = {
  id: string;
  account_id: string;
  status: string;
  source_routine_id: string | null;
  started_at: string;
  ended_at: string | null;
  created_at: string;
  updated_at: string;
  sync_state: string;
  server_version: number | null;
  deleted_at: string | null;
};

type SessionExerciseRow = {
  id: string;
  account_id: string;
  session_id: string;
  exercise_id: string;
  sort_order: number;
  exercise_name_snapshot: string;
  recording_type_snapshot: string;
  created_at: string;
  updated_at: string;
  sync_state: string;
  server_version: number | null;
  deleted_at: string | null;
};

type SetRecordDbRow = {
  id: string;
  account_id: string;
  session_exercise_id: string;
  set_index: number;
  weight_kg: number | null;
  reps: number | null;
  duration_seconds: number | null;
  assisted_weight_kg: number | null;
  is_completed: number;
  note: string | null;
  created_at: string;
  updated_at: string;
  sync_state: string;
  server_version: number | null;
  deleted_at: string | null;
};

type CompletedWorkoutRow = {
  id: string;
  account_id: string;
  session_id: string;
  completed_at: string;
  title_snapshot: string | null;
  source_routine_id_snapshot: string | null;
  source_routine_name_snapshot: string | null;
  created_at: string;
  updated_at: string;
  sync_state: string;
  server_version: number | null;
  deleted_at: string | null;
};

function mapSession(row: WorkoutSessionRow): WorkoutSessionRecord {
  return {
    id: row.id as WorkoutSessionId,
    accountId: row.account_id as AccountId,
    status: row.status as WorkoutSessionRecord['status'],
    sourceRoutineId: row.source_routine_id as WorkoutSessionRecord['sourceRoutineId'],
    startedAt: row.started_at,
    endedAt: row.ended_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    syncState: row.sync_state as WorkoutSessionRecord['syncState'],
    serverVersion: row.server_version,
    deletedAt: row.deleted_at,
  };
}

function mapSessionExercise(row: SessionExerciseRow): SessionExerciseRecord {
  return {
    id: row.id as SessionExerciseId,
    accountId: row.account_id as AccountId,
    sessionId: row.session_id as WorkoutSessionId,
    exerciseId: row.exercise_id as SessionExerciseRecord['exerciseId'],
    sortOrder: row.sort_order,
    exerciseNameSnapshot: row.exercise_name_snapshot,
    recordingTypeSnapshot:
      row.recording_type_snapshot as SessionExerciseRecord['recordingTypeSnapshot'],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    syncState: row.sync_state as SessionExerciseRecord['syncState'],
    serverVersion: row.server_version,
    deletedAt: row.deleted_at,
  };
}

function mapSetRecord(row: SetRecordDbRow): SetRecordRow {
  return {
    id: row.id as SetRecordId,
    accountId: row.account_id as AccountId,
    sessionExerciseId: row.session_exercise_id as SessionExerciseId,
    setIndex: row.set_index,
    weightKg: row.weight_kg,
    reps: row.reps,
    durationSeconds: row.duration_seconds,
    assistedWeightKg: row.assisted_weight_kg,
    isCompleted: row.is_completed === 1,
    note: row.note,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    syncState: row.sync_state as SetRecordRow['syncState'],
    serverVersion: row.server_version,
    deletedAt: row.deleted_at,
  };
}

function mapCompletedWorkout(row: CompletedWorkoutRow): CompletedWorkoutRecord {
  return {
    id: row.id as CompletedWorkoutId,
    accountId: row.account_id as AccountId,
    sessionId: row.session_id as WorkoutSessionId,
    completedAt: row.completed_at,
    titleSnapshot: row.title_snapshot,
    sourceRoutineIdSnapshot:
      row.source_routine_id_snapshot as CompletedWorkoutRecord['sourceRoutineIdSnapshot'],
    sourceRoutineNameSnapshot: row.source_routine_name_snapshot,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    syncState: row.sync_state as CompletedWorkoutRecord['syncState'],
    serverVersion: row.server_version,
    deletedAt: row.deleted_at,
  };
}

export class SqliteWorkoutRepository implements WorkoutRepository {
  constructor(private readonly connection: SqliteConnection) {}

  async startSession(input: StartWorkoutSessionInput): Promise<WorkoutSessionRecord> {
    const existingActive = await this.getActiveSession(input.accountId);
    if (existingActive) {
      throw new Error('An active workout session already exists for this account.');
    }

    const id = createId<WorkoutSessionId>();
    const timestamp = nowIso();

    this.connection.run(
      `INSERT INTO workout_sessions (
        id, account_id, status, source_routine_id, started_at,
        created_at, updated_at, sync_state
      ) VALUES (?, ?, 'active', ?, ?, ?, ?, 'dirty')`,
      [
        id,
        input.accountId,
        input.sourceRoutineId ?? null,
        input.startedAt,
        timestamp,
        timestamp,
      ],
    );

    const row = this.connection.getFirst<WorkoutSessionRow>(
      'SELECT * FROM workout_sessions WHERE id = ?',
      [id],
    );
    if (!row) {
      throw new Error('Failed to start workout session.');
    }
    return mapSession(row);
  }

  async getActiveSession(accountId: AccountId): Promise<WorkoutSessionRecord | null> {
    const row = this.connection.getFirst<WorkoutSessionRow>(
      `SELECT * FROM workout_sessions
       WHERE account_id = ? AND status = 'active' AND deleted_at IS NULL
       ORDER BY started_at DESC
       LIMIT 1`,
      [accountId],
    );
    return row ? mapSession(row) : null;
  }

  async addSessionExercise(
    input: AddSessionExerciseInput,
  ): Promise<SessionExerciseRecord> {
    const id = createId<SessionExerciseId>();
    const timestamp = nowIso();

    this.connection.run(
      `INSERT INTO session_exercises (
        id, account_id, session_id, exercise_id, sort_order,
        exercise_name_snapshot, recording_type_snapshot,
        created_at, updated_at, sync_state
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'dirty')`,
      [
        id,
        input.accountId,
        input.sessionId,
        input.exerciseId,
        input.sortOrder,
        input.exerciseNameSnapshot,
        input.recordingTypeSnapshot,
        timestamp,
        timestamp,
      ],
    );

    const row = this.connection.getFirst<SessionExerciseRow>(
      'SELECT * FROM session_exercises WHERE id = ?',
      [id],
    );
    if (!row) {
      throw new Error('Failed to add session exercise.');
    }
    return mapSessionExercise(row);
  }

  async upsertSetRecord(input: UpsertSetRecordInput): Promise<SetRecordRow> {
    const existing = this.connection.getFirst<SetRecordDbRow>(
      `SELECT * FROM set_records
       WHERE session_exercise_id = ? AND set_index = ? AND deleted_at IS NULL`,
      [input.sessionExerciseId, input.setIndex],
    );

    const timestamp = nowIso();

    if (existing) {
      this.connection.run(
        `UPDATE set_records SET
          weight_kg = ?, reps = ?, duration_seconds = ?, assisted_weight_kg = ?,
          is_completed = ?, note = ?, updated_at = ?, sync_state = 'dirty'
         WHERE id = ?`,
        [
          input.weightKg ?? existing.weight_kg,
          input.reps ?? existing.reps,
          input.durationSeconds ?? existing.duration_seconds,
          input.assistedWeightKg ?? existing.assisted_weight_kg,
          input.isCompleted === undefined
            ? existing.is_completed
            : input.isCompleted
              ? 1
              : 0,
          input.note ?? existing.note,
          timestamp,
          existing.id,
        ],
      );

      const updated = this.connection.getFirst<SetRecordDbRow>(
        'SELECT * FROM set_records WHERE id = ?',
        [existing.id],
      );
      if (!updated) {
        throw new Error('Failed to update set record.');
      }
      return mapSetRecord(updated);
    }

    const id = createId<SetRecordId>();
    this.connection.run(
      `INSERT INTO set_records (
        id, account_id, session_exercise_id, set_index,
        weight_kg, reps, duration_seconds, assisted_weight_kg,
        is_completed, note, created_at, updated_at, sync_state
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'dirty')`,
      [
        id,
        input.accountId,
        input.sessionExerciseId,
        input.setIndex,
        input.weightKg ?? null,
        input.reps ?? null,
        input.durationSeconds ?? null,
        input.assistedWeightKg ?? null,
        input.isCompleted ? 1 : 0,
        input.note ?? null,
        timestamp,
        timestamp,
      ],
    );

    const inserted = this.connection.getFirst<SetRecordDbRow>(
      'SELECT * FROM set_records WHERE id = ?',
      [id],
    );
    if (!inserted) {
      throw new Error('Failed to insert set record.');
    }
    return mapSetRecord(inserted);
  }

  async completeWorkout(input: CompleteWorkoutInput): Promise<CompletedWorkoutRecord> {
    const completedId = createId<CompletedWorkoutId>();
    const timestamp = nowIso();

    this.connection.withTransaction(() => {
      const session = this.connection.getFirst<WorkoutSessionRow>(
        `SELECT * FROM workout_sessions
         WHERE id = ? AND account_id = ? AND status = 'active' AND deleted_at IS NULL`,
        [input.sessionId, input.accountId],
      );
      if (!session) {
        throw new Error('Active workout session not found.');
      }

      this.connection.run(
        `UPDATE workout_sessions
         SET status = 'completed', ended_at = ?, updated_at = ?, sync_state = 'dirty'
         WHERE id = ?`,
        [input.completedAt, timestamp, input.sessionId],
      );

      this.connection.run(
        `INSERT INTO completed_workouts (
          id, account_id, session_id, completed_at,
          title_snapshot, source_routine_id_snapshot, source_routine_name_snapshot,
          created_at, updated_at, sync_state
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'dirty')`,
        [
          completedId,
          input.accountId,
          input.sessionId,
          input.completedAt,
          input.titleSnapshot ?? null,
          input.sourceRoutineIdSnapshot ?? null,
          input.sourceRoutineNameSnapshot ?? null,
          timestamp,
          timestamp,
        ],
      );

      const sessionExercises = this.connection.getAll<SessionExerciseRow>(
        `SELECT * FROM session_exercises
         WHERE session_id = ? AND deleted_at IS NULL
         ORDER BY sort_order ASC`,
        [input.sessionId],
      );

      for (const exercise of sessionExercises) {
        const completedExerciseId = createId<string>();

        this.connection.run(
          `INSERT INTO completed_workout_exercises (
            id, account_id, completed_workout_id, session_exercise_id,
            exercise_id, exercise_name_snapshot, recording_type_snapshot,
            sort_order, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            completedExerciseId,
            input.accountId,
            completedId,
            exercise.id,
            exercise.exercise_id,
            exercise.exercise_name_snapshot,
            exercise.recording_type_snapshot,
            exercise.sort_order,
            timestamp,
          ],
        );

        const sets = this.connection.getAll<SetRecordDbRow>(
          `SELECT * FROM set_records
           WHERE session_exercise_id = ? AND deleted_at IS NULL
           ORDER BY set_index ASC`,
          [exercise.id],
        );

        for (const set of sets) {
          const snapshotId = createId<string>();
          this.connection.run(
            `INSERT INTO completed_set_snapshots (
              id, account_id, completed_workout_exercise_id, set_record_id,
              set_index, weight_kg, reps, duration_seconds, assisted_weight_kg,
              is_completed, note, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              snapshotId,
              input.accountId,
              completedExerciseId,
              set.id,
              set.set_index,
              set.weight_kg,
              set.reps,
              set.duration_seconds,
              set.assisted_weight_kg,
              set.is_completed,
              set.note,
              timestamp,
            ],
          );
        }
      }
    });

    const completed = await this.getCompletedWorkoutBySession(
      input.accountId,
      input.sessionId,
    );
    if (!completed) {
      throw new Error('Failed to persist completed workout snapshot.');
    }
    return completed;
  }

  async getCompletedWorkoutBySession(
    accountId: AccountId,
    sessionId: WorkoutSessionId,
  ): Promise<CompletedWorkoutRecord | null> {
    const row = this.connection.getFirst<CompletedWorkoutRow>(
      `SELECT * FROM completed_workouts
       WHERE account_id = ? AND session_id = ? AND deleted_at IS NULL`,
      [accountId, sessionId],
    );
    return row ? mapCompletedWorkout(row) : null;
  }
}
