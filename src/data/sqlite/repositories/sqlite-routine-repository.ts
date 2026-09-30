import type { RoutineRepository } from '../../contracts/repositories/routine-repository';
import type {
  AddRoutineExerciseInput,
  AddRoutineSetTemplateInput,
  CreateRoutineInput,
  RoutineExerciseRecord,
  RoutineRecord,
  RoutineSetTemplateRecord,
} from '../../contracts/routine';
import {
  createId,
  type AccountId,
  type RoutineExerciseId,
  type RoutineId,
  type RoutineSetTemplateId,
} from '../../contracts/ids';
import type { SqliteConnection } from '../connection';
import { nowIso } from '../time';

type RoutineRow = {
  id: string;
  account_id: string;
  name: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  sync_state: string;
  server_version: number | null;
  deleted_at: string | null;
};

type RoutineExerciseRow = {
  id: string;
  account_id: string;
  routine_id: string;
  exercise_id: string;
  sort_order: number;
  exercise_name_snapshot: string;
  recording_type: string;
  created_at: string;
  updated_at: string;
  sync_state: string;
  server_version: number | null;
  deleted_at: string | null;
};

type RoutineSetTemplateRow = {
  id: string;
  account_id: string;
  routine_exercise_id: string;
  set_index: number;
  target_weight_kg: number | null;
  target_reps: number | null;
  target_duration_seconds: number | null;
  target_assisted_weight_kg: number | null;
  created_at: string;
  updated_at: string;
  sync_state: string;
  server_version: number | null;
  deleted_at: string | null;
};

function mapRoutine(row: RoutineRow): RoutineRecord {
  return {
    id: row.id as RoutineId,
    accountId: row.account_id as AccountId,
    name: row.name,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    syncState: row.sync_state as RoutineRecord['syncState'],
    serverVersion: row.server_version,
    deletedAt: row.deleted_at,
  };
}

function mapRoutineExercise(row: RoutineExerciseRow): RoutineExerciseRecord {
  return {
    id: row.id as RoutineExerciseId,
    accountId: row.account_id as AccountId,
    routineId: row.routine_id as RoutineId,
    exerciseId: row.exercise_id as RoutineExerciseRecord['exerciseId'],
    sortOrder: row.sort_order,
    exerciseNameSnapshot: row.exercise_name_snapshot,
    recordingType: row.recording_type as RoutineExerciseRecord['recordingType'],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    syncState: row.sync_state as RoutineExerciseRecord['syncState'],
    serverVersion: row.server_version,
    deletedAt: row.deleted_at,
  };
}

function mapRoutineSetTemplate(row: RoutineSetTemplateRow): RoutineSetTemplateRecord {
  return {
    id: row.id as RoutineSetTemplateId,
    accountId: row.account_id as AccountId,
    routineExerciseId: row.routine_exercise_id as RoutineExerciseId,
    setIndex: row.set_index,
    targetWeightKg: row.target_weight_kg,
    targetReps: row.target_reps,
    targetDurationSeconds: row.target_duration_seconds,
    targetAssistedWeightKg: row.target_assisted_weight_kg,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    syncState: row.sync_state as RoutineSetTemplateRecord['syncState'],
    serverVersion: row.server_version,
    deletedAt: row.deleted_at,
  };
}

export class SqliteRoutineRepository implements RoutineRepository {
  constructor(private readonly connection: SqliteConnection) {}

  async createRoutine(input: CreateRoutineInput): Promise<RoutineRecord> {
    const id = createId<RoutineId>();
    const timestamp = nowIso();

    this.connection.run(
      `INSERT INTO routines (
        id, account_id, name, sort_order, created_at, updated_at, sync_state
      ) VALUES (?, ?, ?, ?, ?, ?, 'dirty')`,
      [
        id,
        input.accountId,
        input.name,
        input.sortOrder ?? 0,
        timestamp,
        timestamp,
      ],
    );

    const created = await this.getRoutine(input.accountId, id);
    if (!created) {
      throw new Error('Failed to create routine.');
    }
    return created;
  }

  async getRoutine(
    accountId: AccountId,
    routineId: RoutineId,
  ): Promise<RoutineRecord | null> {
    const row = this.connection.getFirst<RoutineRow>(
      `SELECT * FROM routines
       WHERE account_id = ? AND id = ? AND deleted_at IS NULL`,
      [accountId, routineId],
    );
    return row ? mapRoutine(row) : null;
  }

  async listRoutines(accountId: AccountId): Promise<RoutineRecord[]> {
    return this.connection
      .getAll<RoutineRow>(
        `SELECT * FROM routines
         WHERE account_id = ? AND deleted_at IS NULL
         ORDER BY sort_order ASC, created_at ASC`,
        [accountId],
      )
      .map(mapRoutine);
  }

  async addRoutineExercise(
    input: AddRoutineExerciseInput,
  ): Promise<RoutineExerciseRecord> {
    const id = createId<RoutineExerciseId>();
    const timestamp = nowIso();

    this.connection.run(
      `INSERT INTO routine_exercises (
        id, account_id, routine_id, exercise_id, sort_order,
        exercise_name_snapshot, recording_type, created_at, updated_at, sync_state
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'dirty')`,
      [
        id,
        input.accountId,
        input.routineId,
        input.exerciseId,
        input.sortOrder,
        input.exerciseNameSnapshot,
        input.recordingType,
        timestamp,
        timestamp,
      ],
    );

    const row = this.connection.getFirst<RoutineExerciseRow>(
      'SELECT * FROM routine_exercises WHERE id = ?',
      [id],
    );
    if (!row) {
      throw new Error('Failed to add routine exercise.');
    }
    return mapRoutineExercise(row);
  }

  async addRoutineSetTemplate(
    input: AddRoutineSetTemplateInput,
  ): Promise<RoutineSetTemplateRecord> {
    const id = createId<RoutineSetTemplateId>();
    const timestamp = nowIso();

    this.connection.run(
      `INSERT INTO routine_set_templates (
        id, account_id, routine_exercise_id, set_index,
        target_weight_kg, target_reps, target_duration_seconds,
        target_assisted_weight_kg, created_at, updated_at, sync_state
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'dirty')`,
      [
        id,
        input.accountId,
        input.routineExerciseId,
        input.setIndex,
        input.targetWeightKg ?? null,
        input.targetReps ?? null,
        input.targetDurationSeconds ?? null,
        input.targetAssistedWeightKg ?? null,
        timestamp,
        timestamp,
      ],
    );

    const row = this.connection.getFirst<RoutineSetTemplateRow>(
      'SELECT * FROM routine_set_templates WHERE id = ?',
      [id],
    );
    if (!row) {
      throw new Error('Failed to add routine set template.');
    }
    return mapRoutineSetTemplate(row);
  }
}
