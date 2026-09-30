import type { RoutineMainMuscleTag } from './routineMainTypes';

export type RoutineDetailSetRow = {
  setNumber: number;
  kg: string;
  reps: string;
};

export type RoutineDetailExercise = {
  id: string;
  name: string;
  tag: RoutineMainMuscleTag;
  sets: RoutineDetailSetRow[];
};

export type RoutineDetailSummary = {
  exerciseCountLabel: string;
  estimatedTimeLabel: string;
  totalSetsLabel: string;
};

export type RoutineDetailModel = {
  routineId: string;
  title: string;
  summary: RoutineDetailSummary;
  exercises: RoutineDetailExercise[];
};

export type RoutineDetailScreenProps = {
  detail: RoutineDetailModel;
  onBack?: () => void;
  onStartWorkout?: () => void;
  readOnly?: boolean;
};
