import Database from 'better-sqlite3';
import type { SqliteConnection } from '../connection';

/** Jest/Node test adapter — not used in production runtime. */
export function createBetterSqliteConnection(
  databasePath = ':memory:',
): SqliteConnection {
  const db = new Database(databasePath);

  return {
    exec(sql: string) {
      db.exec(sql);
    },
    run(sql: string, params: readonly unknown[] = []) {
      const result = db.prepare(sql).run(...params);
      return {
        changes: result.changes,
        lastInsertRowId: Number(result.lastInsertRowid),
      };
    },
    getFirst<T>(sql: string, params: readonly unknown[] = []) {
      const row = db.prepare(sql).get(...params) as T | undefined;
      return row ?? null;
    },
    getAll<T>(sql: string, params: readonly unknown[] = []) {
      return db.prepare(sql).all(...params) as T[];
    },
    withTransaction(task: () => void) {
      db.transaction(task)();
    },
    close() {
      db.close();
    },
  };
}
