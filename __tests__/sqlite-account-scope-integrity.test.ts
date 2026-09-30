import { createTestSqliteConnection } from './helpers/sqlite-test-harness';

const TIMESTAMP = '2026-09-30T00:00:00.000Z';

type AccountFixture = {
  accountId: string;
  routineId: string;
  routineExerciseId: string;
  routineSetTemplateId: string;
  sessionId: string;
  sessionExerciseId: string;
  setRecordId: string;
  completedWorkoutId: string;
  completedWorkoutExerciseId: string;
  completedSetSnapshotId: string;
};

function insertAccountFixture(
  connection: ReturnType<typeof createTestSqliteConnection>,
  accountId: string,
  suffix: string,
): AccountFixture {
  const routineId = `routine-${suffix}`;
  const routineExerciseId = `routine-exercise-${suffix}`;
  const routineSetTemplateId = `routine-set-template-${suffix}`;
  const sessionId = `session-${suffix}`;
  const sessionExerciseId = `session-exercise-${suffix}`;
  const setRecordId = `set-record-${suffix}`;
  const completedWorkoutId = `completed-workout-${suffix}`;
  const completedWorkoutExerciseId = `completed-workout-exercise-${suffix}`;
  const completedSetSnapshotId = `completed-set-snapshot-${suffix}`;

  connection.run(
    `INSERT INTO routines (
      id, account_id, name, sort_order, created_at, updated_at, sync_state
    ) VALUES (?, ?, ?, 0, ?, ?, 'dirty')`,
    [routineId, accountId, `Routine ${suffix}`, TIMESTAMP, TIMESTAMP],
  );

  connection.run(
    `INSERT INTO routine_exercises (
      id, account_id, routine_id, exercise_id, sort_order,
      exercise_name_snapshot, recording_type, created_at, updated_at, sync_state
    ) VALUES (?, ?, ?, ?, 0, ?, 'weight_reps', ?, ?, 'dirty')`,
    [
      routineExerciseId,
      accountId,
      routineId,
      `exercise-${suffix}`,
      'Bench Press',
      TIMESTAMP,
      TIMESTAMP,
    ],
  );

  connection.run(
    `INSERT INTO routine_set_templates (
      id, account_id, routine_exercise_id, set_index,
      target_weight_kg, target_reps, created_at, updated_at, sync_state
    ) VALUES (?, ?, ?, 1, 60, 8, ?, ?, 'dirty')`,
    [routineSetTemplateId, accountId, routineExerciseId, TIMESTAMP, TIMESTAMP],
  );

  connection.run(
    `INSERT INTO workout_sessions (
      id, account_id, status, source_routine_id, started_at,
      created_at, updated_at, sync_state
    ) VALUES (?, ?, 'completed', ?, ?, ?, ?, 'dirty')`,
    [sessionId, accountId, routineId, TIMESTAMP, TIMESTAMP, TIMESTAMP],
  );

  connection.run(
    `INSERT INTO session_exercises (
      id, account_id, session_id, exercise_id, sort_order,
      exercise_name_snapshot, recording_type_snapshot,
      created_at, updated_at, sync_state
    ) VALUES (?, ?, ?, ?, 0, ?, 'weight_reps', ?, ?, 'dirty')`,
    [
      sessionExerciseId,
      accountId,
      sessionId,
      `exercise-${suffix}`,
      'Back Squat',
      TIMESTAMP,
      TIMESTAMP,
    ],
  );

  connection.run(
    `INSERT INTO set_records (
      id, account_id, session_exercise_id, set_index,
      weight_kg, reps, is_completed, created_at, updated_at, sync_state
    ) VALUES (?, ?, ?, 1, 100, 5, 1, ?, ?, 'dirty')`,
    [setRecordId, accountId, sessionExerciseId, TIMESTAMP, TIMESTAMP],
  );

  connection.run(
    `INSERT INTO completed_workouts (
      id, account_id, session_id, completed_at, created_at, updated_at, sync_state
    ) VALUES (?, ?, ?, ?, ?, ?, 'dirty')`,
    [completedWorkoutId, accountId, sessionId, TIMESTAMP, TIMESTAMP, TIMESTAMP],
  );

  connection.run(
    `INSERT INTO completed_workout_exercises (
      id, account_id, completed_workout_id, session_exercise_id,
      exercise_id, exercise_name_snapshot, recording_type_snapshot,
      sort_order, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, 'weight_reps', 0, ?)`,
    [
      completedWorkoutExerciseId,
      accountId,
      completedWorkoutId,
      sessionExerciseId,
      `exercise-${suffix}`,
      'Back Squat',
      TIMESTAMP,
    ],
  );

  connection.run(
    `INSERT INTO completed_set_snapshots (
      id, account_id, completed_workout_exercise_id, set_record_id,
      set_index, weight_kg, reps, is_completed, created_at
    ) VALUES (?, ?, ?, ?, 1, 100, 5, 1, ?)`,
    [
      completedSetSnapshotId,
      accountId,
      completedWorkoutExerciseId,
      setRecordId,
      TIMESTAMP,
    ],
  );

  return {
    accountId,
    routineId,
    routineExerciseId,
    routineSetTemplateId,
    sessionId,
    sessionExerciseId,
    setRecordId,
    completedWorkoutId,
    completedWorkoutExerciseId,
    completedSetSnapshotId,
  };
}

function expectCrossAccountInsertRejected(
  connection: ReturnType<typeof createTestSqliteConnection>,
  runInsert: () => void,
) {
  expect(runInsert).toThrow();
}

describe('DEV-004 SQLite account-scope integrity', () => {
  it('rejects cross-account child inserts for all parent/child relationships', () => {
    const connection = createTestSqliteConnection();
    const accountA = 'account-a';
    const accountB = 'account-b';
    const fixtureA = insertAccountFixture(connection, accountA, 'a');

    expectCrossAccountInsertRejected(connection, () => {
      connection.run(
        `INSERT INTO routine_exercises (
          id, account_id, routine_id, exercise_id, sort_order,
          exercise_name_snapshot, recording_type, created_at, updated_at, sync_state
        ) VALUES (?, ?, ?, ?, 0, ?, 'weight_reps', ?, ?, 'dirty')`,
        [
          'cross-routine-exercise',
          accountB,
          fixtureA.routineId,
          'exercise-cross',
          'Cross Account Exercise',
          TIMESTAMP,
          TIMESTAMP,
        ],
      );
    });

    expectCrossAccountInsertRejected(connection, () => {
      connection.run(
        `INSERT INTO routine_set_templates (
          id, account_id, routine_exercise_id, set_index,
          target_weight_kg, target_reps, created_at, updated_at, sync_state
        ) VALUES (?, ?, ?, 1, 60, 8, ?, ?, 'dirty')`,
        [
          'cross-routine-set-template',
          accountB,
          fixtureA.routineExerciseId,
          TIMESTAMP,
          TIMESTAMP,
        ],
      );
    });

    expectCrossAccountInsertRejected(connection, () => {
      connection.run(
        `INSERT INTO workout_sessions (
          id, account_id, status, source_routine_id, started_at,
          created_at, updated_at, sync_state
        ) VALUES (?, ?, 'completed', ?, ?, ?, ?, 'dirty')`,
        [
          'cross-session-with-source',
          accountB,
          fixtureA.routineId,
          TIMESTAMP,
          TIMESTAMP,
          TIMESTAMP,
        ],
      );
    });

    expectCrossAccountInsertRejected(connection, () => {
      connection.run(
        `INSERT INTO session_exercises (
          id, account_id, session_id, exercise_id, sort_order,
          exercise_name_snapshot, recording_type_snapshot,
          created_at, updated_at, sync_state
        ) VALUES (?, ?, ?, ?, 0, ?, 'weight_reps', ?, ?, 'dirty')`,
        [
          'cross-session-exercise',
          accountB,
          fixtureA.sessionId,
          'exercise-cross',
          'Cross Session Exercise',
          TIMESTAMP,
          TIMESTAMP,
        ],
      );
    });

    expectCrossAccountInsertRejected(connection, () => {
      connection.run(
        `INSERT INTO set_records (
          id, account_id, session_exercise_id, set_index,
          weight_kg, reps, is_completed, created_at, updated_at, sync_state
        ) VALUES (?, ?, ?, 1, 100, 5, 1, ?, ?, 'dirty')`,
        [
          'cross-set-record',
          accountB,
          fixtureA.sessionExerciseId,
          TIMESTAMP,
          TIMESTAMP,
        ],
      );
    });

    expectCrossAccountInsertRejected(connection, () => {
      connection.run(
        `INSERT INTO completed_workouts (
          id, account_id, session_id, completed_at, created_at, updated_at, sync_state
        ) VALUES (?, ?, ?, ?, ?, ?, 'dirty')`,
        [
          'cross-completed-workout',
          accountB,
          fixtureA.sessionId,
          TIMESTAMP,
          TIMESTAMP,
          TIMESTAMP,
        ],
      );
    });

    expectCrossAccountInsertRejected(connection, () => {
      connection.run(
        `INSERT INTO completed_workout_exercises (
          id, account_id, completed_workout_id, session_exercise_id,
          exercise_id, exercise_name_snapshot, recording_type_snapshot,
          sort_order, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, 'weight_reps', 0, ?)`,
        [
          'cross-completed-workout-exercise-by-workout',
          accountB,
          fixtureA.completedWorkoutId,
          'orphan-session-exercise',
          'exercise-cross',
          'Cross Completed Exercise',
          TIMESTAMP,
        ],
      );
    });

    expectCrossAccountInsertRejected(connection, () => {
      connection.run(
        `INSERT INTO completed_workout_exercises (
          id, account_id, completed_workout_id, session_exercise_id,
          exercise_id, exercise_name_snapshot, recording_type_snapshot,
          sort_order, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, 'weight_reps', 0, ?)`,
        [
          'cross-completed-workout-exercise-by-session-exercise',
          accountB,
          'orphan-completed-workout',
          fixtureA.sessionExerciseId,
          'exercise-cross',
          'Cross Completed Exercise',
          TIMESTAMP,
        ],
      );
    });

    expectCrossAccountInsertRejected(connection, () => {
      connection.run(
        `INSERT INTO completed_set_snapshots (
          id, account_id, completed_workout_exercise_id, set_record_id,
          set_index, weight_kg, reps, is_completed, created_at
        ) VALUES (?, ?, ?, ?, 1, 100, 5, 1, ?)`,
        [
          'cross-completed-set-by-exercise',
          accountB,
          fixtureA.completedWorkoutExerciseId,
          'orphan-set-record',
          TIMESTAMP,
        ],
      );
    });

    expectCrossAccountInsertRejected(connection, () => {
      connection.run(
        `INSERT INTO completed_set_snapshots (
          id, account_id, completed_workout_exercise_id, set_record_id,
          set_index, weight_kg, reps, is_completed, created_at
        ) VALUES (?, ?, ?, ?, 1, 100, 5, 1, ?)`,
        [
          'cross-completed-set-by-set-record',
          accountB,
          'orphan-completed-workout-exercise',
          fixtureA.setRecordId,
          TIMESTAMP,
        ],
      );
    });
  });

  it('enforces one active workout per account at the database layer', () => {
    const connection = createTestSqliteConnection();
    const accountId = 'account-active';

    connection.run(
      `INSERT INTO workout_sessions (
        id, account_id, status, started_at, created_at, updated_at, sync_state
      ) VALUES ('active-1', ?, 'active', ?, ?, ?, 'dirty')`,
      [accountId, TIMESTAMP, TIMESTAMP, TIMESTAMP],
    );

    expect(() => {
      connection.run(
        `INSERT INTO workout_sessions (
          id, account_id, status, started_at, created_at, updated_at, sync_state
        ) VALUES ('active-2', ?, 'active', ?, ?, ?, 'dirty')`,
        [accountId, TIMESTAMP, TIMESTAMP, TIMESTAMP],
      );
    }).toThrow();
  });

  it('rejects duplicate active set_index rows for the same session exercise', () => {
    const connection = createTestSqliteConnection();
    const accountId = 'account-set-index';
    const fixture = insertAccountFixture(connection, accountId, 'set-index');

    expect(() => {
      connection.run(
        `INSERT INTO set_records (
          id, account_id, session_exercise_id, set_index,
          weight_kg, reps, is_completed, created_at, updated_at, sync_state
        ) VALUES (?, ?, ?, 1, 80, 8, 1, ?, ?, 'dirty')`,
        [
          'duplicate-set-index',
          accountId,
          fixture.sessionExerciseId,
          TIMESTAMP,
          TIMESTAMP,
        ],
      );
    }).toThrow();
  });

  it('rejects duplicate active set_index rows for the same routine exercise', () => {
    const connection = createTestSqliteConnection();
    const accountId = 'account-routine-set-index';
    const fixture = insertAccountFixture(connection, accountId, 'routine-set-index');

    expect(() => {
      connection.run(
        `INSERT INTO routine_set_templates (
          id, account_id, routine_exercise_id, set_index,
          target_weight_kg, target_reps, created_at, updated_at, sync_state
        ) VALUES (?, ?, ?, 1, 70, 10, ?, ?, 'dirty')`,
        [
          'duplicate-routine-set-index',
          accountId,
          fixture.routineExerciseId,
          TIMESTAMP,
          TIMESTAMP,
        ],
      );
    }).toThrow();
  });
});
