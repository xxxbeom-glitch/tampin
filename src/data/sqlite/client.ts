import { createExpoSqliteConnection } from './adapters/expo-sqlite-connection';
import type { SqliteConnection } from './connection';
import { assertForeignKeysEnabled, runMigrations } from './migrate';

export type OpenTampinDatabaseOptions = {
  connection?: SqliteConnection;
  databaseName?: string;
};

export type TampinDatabase = {
  connection: SqliteConnection;
  schemaVersion: number;
};

export function openTampinDatabase(
  options: OpenTampinDatabaseOptions = {},
): TampinDatabase {
  const connection =
    options.connection ??
    createExpoSqliteConnection(options.databaseName);

  runMigrations(connection);
  assertForeignKeysEnabled(connection);

  const schemaVersion =
    connection.getFirst<{ version: number }>(
      'SELECT MAX(version) AS version FROM schema_migrations',
    )?.version ?? 0;

  return { connection, schemaVersion };
}
