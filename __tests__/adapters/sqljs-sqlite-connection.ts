import type { Database } from 'sql.js';
import type { SqliteConnection, SqliteRunResult } from '../../src/data/sqlite/connection';
import { getSqlJs } from '../helpers/jest-sqljs-setup';

/** Jest-only in-memory SQLite adapter (sql.js WASM). Not used in Expo runtime. */
export function createSqlJsSqliteConnection(): SqliteConnection {
  const SQL = getSqlJs();
  const db: Database = new SQL.Database();

  return {
    exec(sql: string) {
      db.exec(sql);
    },
    run(sql: string, params: readonly unknown[] = []): SqliteRunResult {
      db.run(sql, params as (string | number | null | Uint8Array)[]);
      const changes = db.getRowsModified();
      const lastInsertRowId = getLastInsertRowId(db);
      return { changes, lastInsertRowId };
    },
    getFirst<T>(sql: string, params: readonly unknown[] = []): T | null {
      const stmt = db.prepare(sql);
      try {
        stmt.bind(params as (string | number | null | Uint8Array)[]);
        if (!stmt.step()) {
          return null;
        }
        return stmt.getAsObject() as T;
      } finally {
        stmt.free();
      }
    },
    getAll<T>(sql: string, params: readonly unknown[] = []): T[] {
      const stmt = db.prepare(sql);
      try {
        stmt.bind(params as (string | number | null | Uint8Array)[]);
        const rows: T[] = [];
        while (stmt.step()) {
          rows.push(stmt.getAsObject() as T);
        }
        return rows;
      } finally {
        stmt.free();
      }
    },
    withTransaction(task: () => void) {
      db.run('BEGIN IMMEDIATE');
      try {
        task();
        db.run('COMMIT');
      } catch (error) {
        db.run('ROLLBACK');
        throw error;
      }
    },
    close() {
      db.close();
    },
  };
}

function getLastInsertRowId(db: Database): number {
  const row = db.exec('SELECT last_insert_rowid() AS id');
  const value = row[0]?.values[0]?.[0];
  return typeof value === 'number' ? value : Number(value ?? 0);
}
