export type RecordingType = 'weight_reps' | 'reps' | 'duration' | 'assisted';

export type ExerciseDetailTab = 'info' | 'history' | 'growth';

export type ExerciseCatalogItem = {
  id: string;
  name: string;
  equipment: string;
  bodyPart: string;
  primaryMuscle: string;
  secondaryMuscles: string;
  recordingType: RecordingType;
  recent: boolean;
  needsAttachment: boolean;
  thumbnailKey: 'smithBenchPress' | 'romanianDeadlift' | 'standingCalfRaise' | 'lateralRaise';
};

export type HistorySet = {
  set: number;
  primary: string;
  secondary: string;
};

export type HistorySession = {
  dateLabel: string;
  sets: HistorySet[];
};

export type ExerciseDetailModel = {
  id: string;
  name: string;
  equipment: string;
  primaryMuscle: string;
  secondaryMuscles: string;
  recordingType: RecordingType;
  method: string[];
  checkpoints: string[];
  history: HistorySession[];
  growth: {
    prLabel: string;
    prValue: string;
    trend: string | null;
    insufficient: boolean;
  };
};

export type CustomExerciseDraft = {
  name: string;
  equipment: string;
  primaryMuscle: string;
  secondaryMuscle: string;
  recordingType: RecordingType;
};

export type ConfirmDialogCopy = {
  title: string;
  body: string;
  secondary: string;
  primary: string;
};
