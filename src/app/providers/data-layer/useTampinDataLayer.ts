import { useContext } from 'react';
import { DataLayerContext } from './DataLayerContext';
import type { DataLayerState, TampinRepositories } from './types';

export function useTampinDataLayer(): DataLayerState {
  return useContext(DataLayerContext);
}

export function useTampinRepositories(): TampinRepositories {
  const state = useTampinDataLayer();
  if (state.status !== 'ready') {
    throw new Error(
      `Tampin repositories are unavailable while data layer status is "${state.status}".`,
    );
  }
  return state.repositories;
}

export type DataLayerHealthSnapshot =
  | { status: 'initializing' }
  | { status: 'ready'; schemaVersion: number }
  | { status: 'error'; message: string };

export function useTampinDataLayerHealth(): DataLayerHealthSnapshot {
  const state = useTampinDataLayer();
  if (state.status === 'ready') {
    return { status: state.status, schemaVersion: state.schemaVersion };
  }
  if (state.status === 'error') {
    return { status: state.status, message: state.error.message };
  }
  return { status: state.status };
}
