import { type ReactNode, useEffect, useRef, useState } from 'react';
import { createDataLayer } from '../../../data/sqlite/create-data-layer';
import type { TampinDatabase } from '../../../data/sqlite/client';
import { DataLayerContext } from './DataLayerContext';
import type { DataLayerState } from './types';

export type OpenTampinDatabaseForProvider = () => TampinDatabase;

type DataLayerProviderProps = {
  children: ReactNode;
  openDatabase?: OpenTampinDatabaseForProvider;
};

export function DataLayerProvider({
  children,
  openDatabase,
}: DataLayerProviderProps) {
  const [state, setState] = useState<DataLayerState>({ status: 'initializing' });
  const cachedStateRef = useRef<DataLayerState | null>(null);
  const openDatabaseRef = useRef(openDatabase);

  openDatabaseRef.current = openDatabase;

  useEffect(() => {
    if (cachedStateRef.current) {
      setState(cachedStateRef.current);
      return;
    }

    try {
      const database = openDatabaseRef.current
        ? openDatabaseRef.current()
        : (
            // Lazy require keeps expo-sqlite out of Jest module graphs that inject openDatabase.
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            require('./openTampinDatabaseForApp') as typeof import('./openTampinDatabaseForApp')
          ).openTampinDatabaseForApp();
      const repositories = createDataLayer(database.connection);
      const readyState: DataLayerState = {
        status: 'ready',
        schemaVersion: database.schemaVersion,
        repositories: {
          routineRepository: repositories.routineRepository,
          workoutRepository: repositories.workoutRepository,
          syncOutboxRepository: repositories.syncOutboxRepository,
        },
      };
      cachedStateRef.current = readyState;
      setState(readyState);
    } catch (unknownError) {
      const error =
        unknownError instanceof Error
          ? unknownError
          : new Error('Failed to initialize the local data layer.');
      const errorState: DataLayerState = { status: 'error', error };
      cachedStateRef.current = errorState;
      setState(errorState);
    }
  }, []);

  return (
    <DataLayerContext.Provider value={state}>{children}</DataLayerContext.Provider>
  );
}
