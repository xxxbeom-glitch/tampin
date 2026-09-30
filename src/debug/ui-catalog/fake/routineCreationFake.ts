import {
  routineCreateFolderPrefilledFixture,
  routineFolderEntryNewNameFixture,
  routineFolderEntrySelectedFixture,
} from '../../../features/routine';

export const routineCreationCatalogPresets = {
  '02e-folder-entry-selected': {
    kind: 'folder' as const,
    fixture: routineFolderEntrySelectedFixture,
  },
  '02e-folder-entry-new-name': {
    kind: 'folder' as const,
    fixture: routineFolderEntryNewNameFixture,
  },
  '02e-routine-create-folder-prefilled': {
    kind: 'create' as const,
    fixture: routineCreateFolderPrefilledFixture,
  },
};

export type RoutineCreationCatalogEntryId =
  keyof typeof routineCreationCatalogPresets;

export function isRoutineCreationCatalogEntryId(
  entryId: string,
): entryId is RoutineCreationCatalogEntryId {
  return entryId in routineCreationCatalogPresets;
}
