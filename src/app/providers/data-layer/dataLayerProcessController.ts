import { createDataLayer } from '../../../data/sqlite/create-data-layer';
import type { DataLayerState, OpenTampinDatabaseForProvider } from './types';

let processSnapshot: DataLayerState | null = null;

function resolveProductionOpenDatabase(): OpenTampinDatabaseForProvider {
  const { openTampinDatabaseForApp } =
    // Lazy require keeps expo-sqlite out of Jest module graphs that inject openDatabase.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('./openTampinDatabaseForApp') as typeof import('./openTampinDatabaseForApp');
  return openTampinDatabaseForApp;
}

function buildReadyState(database: ReturnType<OpenTampinDatabaseForProvider>): DataLayerState {
  const repositories = createDataLayer(database.connection);
  return {
    status: 'ready',
    schemaVersion: database.schemaVersion,
    repositories: {
      routineRepository: repositories.routineRepository,
      workoutRepository: repositories.workoutRepository,
      syncOutboxRepository: repositories.syncOutboxRepository,
    },
  };
}

/**
 * Returns the cached process snapshot when initialization already ran.
 * Does not open the database at import time; the first call performs open/migrate once.
 */
export function getProcessDataLayerSnapshot(): DataLayerState | null {
  return processSnapshot;
}

/**
 * Initializes the process-scoped data layer once. Later calls reuse the same ready/error
 * snapshot without re-opening the database or retrying a failed initialization.
 */
export function initializeProcessDataLayer(
  openDatabase?: OpenTampinDatabaseForProvider,
): DataLayerState {
  if (processSnapshot) {
    return processSnapshot;
  }

  try {
    const opener = openDatabase ?? resolveProductionOpenDatabase();
    processSnapshot = buildReadyState(opener());
  } catch (unknownError) {
    const error =
      unknownError instanceof Error
        ? unknownError
        : new Error('Failed to initialize the local data layer.');
    processSnapshot = { status: 'error', error };
  }

  return processSnapshot;
}

/** Test-only reset so injected openDatabase factories do not leak across Jest cases. */
export function resetProcessDataLayerControllerForTests(): void {
  processSnapshot = null;
}
