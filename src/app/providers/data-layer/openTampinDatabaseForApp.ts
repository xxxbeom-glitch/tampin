import { openTampinDatabase, type TampinDatabase } from '../../../data/sqlite';

/** Lazy production opener — call only from DataLayerProvider lifecycle. */
export function openTampinDatabaseForApp(): TampinDatabase {
  return openTampinDatabase();
}
