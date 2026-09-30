/** Testable synchronous SQLite execution boundary. */
export type SqliteRunResult = {
  changes: number;
  lastInsertRowId: number;
};

export interface SqliteConnection {
  exec(sql: string): void;
  run(sql: string, params?: readonly unknown[]): SqliteRunResult;
  getFirst<T>(sql: string, params?: readonly unknown[]): T | null;
  getAll<T>(sql: string, params?: readonly unknown[]): T[];
  withTransaction(task: () => void): void;
  close(): void;
}
