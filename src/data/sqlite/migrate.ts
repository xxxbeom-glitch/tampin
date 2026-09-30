import type { SqliteConnection } from './connection';
import { CURRENT_SCHEMA_VERSION, MIGRATIONS } from './migrations/registry';
import { nowIso } from './time';

type MigrationRow = {
  version: number;
};

export function assertForeignKeysEnabled(connection: SqliteConnection): void {
  const row = connection.getFirst<{ foreign_keys: number }>(
    'PRAGMA foreign_keys;',
  );
  if (row?.foreign_keys !== 1) {
    throw new Error('SQLite foreign keys are not enabled on this connection.');
  }
}

export function runMigrations(connection: SqliteConnection): number {
  connection.exec('PRAGMA foreign_keys = ON;');
  assertForeignKeysEnabled(connection);

  const ledgerExists = connection.getFirst<{ name: string }>(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'schema_migrations'",
  );

  const appliedVersions = new Set(
    ledgerExists
      ? connection
          .getAll<MigrationRow>(
            'SELECT version FROM schema_migrations ORDER BY version ASC',
          )
          .map((row) => row.version)
      : [],
  );

  let appliedCount = 0;

  for (const migration of MIGRATIONS) {
    if (appliedVersions.has(migration.version)) {
      continue;
    }

    connection.withTransaction(() => {
      connection.exec(migration.sql);
      connection.run(
        'INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?)',
        [migration.version, nowIso()],
      );
    });

    appliedCount += 1;
  }

  const currentVersion = connection.getFirst<{ version: number }>(
    'SELECT MAX(version) AS version FROM schema_migrations',
  )?.version;

  if (currentVersion !== CURRENT_SCHEMA_VERSION) {
    throw new Error(
      `Schema migration incomplete: expected version ${CURRENT_SCHEMA_VERSION}, got ${currentVersion ?? 'none'}.`,
    );
  }

  return appliedCount;
}
