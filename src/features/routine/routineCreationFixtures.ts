import { routineMainWithRoutinesFixture } from './routineMainFixtures';
import type { RoutineFolderOption } from './RoutineFolderEntryScreen';

export type RoutineFolderEntryFixture = {
  folders: RoutineFolderOption[];
  selectedFolderId: string | null;
  newFolderName: string;
};

export type RoutineCreateFixture = {
  folderName: string;
  routineName: string;
};

export const routineFolderEntryDefaultFixture: RoutineFolderEntryFixture = {
  folders: routineMainWithRoutinesFixture.folders.map(({ id, label }) => ({
    id,
    label,
  })),
  selectedFolderId: null,
  newFolderName: '',
};

export const routineFolderEntrySelectedFixture: RoutineFolderEntryFixture = {
  ...routineFolderEntryDefaultFixture,
  selectedFolderId: 'ppl-routine',
};

export const routineFolderEntryNewNameFixture: RoutineFolderEntryFixture = {
  ...routineFolderEntryDefaultFixture,
  newFolderName: '새 폴더',
};

export const routineCreateFolderPrefilledFixture: RoutineCreateFixture = {
  folderName: 'PPL Routine',
  routineName: '',
};
