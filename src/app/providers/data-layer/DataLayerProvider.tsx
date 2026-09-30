import { type ReactNode, useEffect, useState } from 'react';
import { DataLayerContext } from './DataLayerContext';
import {
  getProcessDataLayerSnapshot,
  initializeProcessDataLayer,
} from './dataLayerProcessController';
import type { DataLayerState, OpenTampinDatabaseForProvider } from './types';

export type { OpenTampinDatabaseForProvider };

type DataLayerProviderProps = {
  children: ReactNode;
  openDatabase?: OpenTampinDatabaseForProvider;
};

export function DataLayerProvider({
  children,
  openDatabase,
}: DataLayerProviderProps) {
  const [state, setState] = useState<DataLayerState>(
    () => getProcessDataLayerSnapshot() ?? { status: 'initializing' },
  );

  useEffect(() => {
    setState(initializeProcessDataLayer(openDatabase));
  }, [openDatabase]);

  return (
    <DataLayerContext.Provider value={state}>{children}</DataLayerContext.Provider>
  );
}
