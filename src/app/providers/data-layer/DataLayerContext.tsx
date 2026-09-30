import { createContext } from 'react';
import type { DataLayerState } from './types';

export const DataLayerContext = createContext<DataLayerState>({
  status: 'initializing',
});
