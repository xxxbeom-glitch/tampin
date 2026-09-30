import { MIGRATION_001_SQL } from './001_initial_schema';

export type MigrationDefinition = {
  version: number;
  sql: string;
};

export const MIGRATIONS: readonly MigrationDefinition[] = [
  { version: 1, sql: MIGRATION_001_SQL },
];

export const CURRENT_SCHEMA_VERSION =
  MIGRATIONS[MIGRATIONS.length - 1]?.version ?? 0;
