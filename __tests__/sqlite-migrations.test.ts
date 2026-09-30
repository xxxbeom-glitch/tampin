import { CURRENT_SCHEMA_VERSION } from '../src/data/sqlite/migrations/registry';
import { assertForeignKeysEnabled, runMigrations } from '../src/data/sqlite/migrate';
import { createBetterSqliteConnection } from '../src/data/sqlite/adapters/better-sqlite-connection';

describe('DEV-004 SQLite migrations', () => {
  it('applies the current schema version deterministically on a fresh database', () => {
    const connection = createBetterSqliteConnection(':memory:');

    const appliedCount = runMigrations(connection);
    assertForeignKeysEnabled(connection);

    expect(appliedCount).toBe(CURRENT_SCHEMA_VERSION);
    expect(
      connection.getFirst<{ version: number }>(
        'SELECT MAX(version) AS version FROM schema_migrations',
      )?.version,
    ).toBe(CURRENT_SCHEMA_VERSION);
  });

  it('records each migration exactly once on re-open/upgrade', () => {
    const connection = createBetterSqliteConnection(':memory:');

    expect(runMigrations(connection)).toBe(CURRENT_SCHEMA_VERSION);
    expect(runMigrations(connection)).toBe(0);

    const rows = connection.getAll<{ version: number }>(
      'SELECT version FROM schema_migrations ORDER BY version ASC',
    );
    expect(rows.map((row) => row.version)).toEqual(
      Array.from({ length: CURRENT_SCHEMA_VERSION }, (_, index) => index + 1),
    );
  });

  it('enforces foreign keys on every opened connection', () => {
    const connection = createBetterSqliteConnection(':memory:');
    runMigrations(connection);

    expect(() => {
      connection.run(
        `INSERT INTO routine_exercises (
          id, account_id, routine_id, exercise_id, sort_order,
          exercise_name_snapshot, recording_type, created_at, updated_at, sync_state
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'dirty')`,
        [
          'missing-parent',
          'acct-1',
          'non-existent-routine',
          'exercise-1',
          0,
          'Bench Press',
          'weight_reps',
          '2026-09-30T00:00:00.000Z',
          '2026-09-30T00:00:00.000Z',
        ],
      );
    }).toThrow();
  });
});
