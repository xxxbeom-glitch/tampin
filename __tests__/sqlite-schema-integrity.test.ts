import { createTestSqliteConnection } from './helpers/sqlite-test-harness';

const EXPECTED_TABLES = [
  'schema_migrations',
  'routines',
  'routine_exercises',
  'routine_set_templates',
  'workout_sessions',
  'session_exercises',
  'set_records',
  'completed_workouts',
  'completed_workout_exercises',
  'completed_set_snapshots',
  'sync_outbox',
];

describe('DEV-004 SQLite schema integrity', () => {
  it('creates all foundation tables for routines, workouts, snapshots, and outbox', () => {
    const connection = createTestSqliteConnection();

    const tables = connection
      .getAll<{ name: string }>(
        "SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name ASC",
      )
      .map((row) => row.name);

    for (const tableName of EXPECTED_TABLES) {
      expect(tables).toContain(tableName);
    }
  });
});
