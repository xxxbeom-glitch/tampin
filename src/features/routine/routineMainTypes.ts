export type RoutineMainScreenState = 'WithRoutines' | 'Empty';

export type RoutineMainMuscleTag = {
  label: string;
  backgroundColor: string;
  textColor: string;
};

export type RoutineMainCardModel = {
  id: string;
  title: string;
  durationLabel: string;
  tags: RoutineMainMuscleTag[];
};

export type RoutineMainFolderModel = {
  id: string;
  label: string;
  collapsed: boolean;
  routines: RoutineMainCardModel[];
};

export type RoutineMainFixture = {
  state: RoutineMainScreenState;
  folders: RoutineMainFolderModel[];
};

export type RoutineMainScreenProps = {
  state: RoutineMainScreenState;
  folders?: RoutineMainFolderModel[];
  onQuickStartWithoutRoutine?: () => void;
  onCreateRoutine?: () => void;
  onOpenRoutineDetail?: (routineId: string) => void;
  onOpenAnalysis?: () => void;
  onOpenSettings?: () => void;
  readOnly?: boolean;
};
