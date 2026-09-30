import { openDatabaseSync, type SQLiteDatabase } from 'expo-sqlite';
import type { SqliteConnection } from '../connection';

export const TAMPIN_DATABASE_NAME = 'tampin.db';

export function createExpoSqliteConnection(
  databaseName: string = TAMPIN_DATABASE_NAME,
): SqliteConnection {
  const db: SQLiteDatabase = openDatabaseSync(databaseName);

  return {
    exec(sql: string) {
      db.execSync(sql);
    },
    run(sql: string, params: readonly unknown[] = []) {
      return db.runSync(sql, ...(params as never[]));
    },
    getFirst<T>(sql: string, params: readonly unknown[] = []) {
      return db.getFirstSync<T>(sql, ...(params as never[]));
    },
    getAll<T>(sql: string, params: readonly unknown[] = []) {
      return db.getAllSync<T>(sql, ...(params as never[]));
    },
    withTransaction(task: () => void) {
      db.withTransactionSync(task);
    },
    close() {
      db.closeSync();
    },
  };
}
