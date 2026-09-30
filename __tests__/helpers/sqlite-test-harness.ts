import { createId, type AccountId } from '../../src/data/contracts/ids';
import { createDataLayer } from '../../src/data/sqlite/create-data-layer';
import type { SqliteConnection } from '../../src/data/sqlite/connection';
import { runMigrations } from '../../src/data/sqlite/migrate';
import { createSqlJsSqliteConnection } from '../adapters/sqljs-sqlite-connection';

export function createTestAccountId(label = 'test-account'): AccountId {
  return createId<AccountId>(`${label}-${crypto.randomUUID()}`);
}

export function createTestSqliteConnection(): SqliteConnection {
  const connection = createSqlJsSqliteConnection();
  runMigrations(connection);
  return connection;
}

export function createTestDataLayer() {
  const connection = createTestSqliteConnection();
  return {
    connection,
    ...createDataLayer(connection),
  };
}
