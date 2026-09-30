import type { ExerciseCatalogItem } from '../exercise/types';

export type RoutineCreateDraftExercise = {
  id: string;
  name: string;
  equipment: string;
  primaryMuscle: string;
  thumbnailKey: ExerciseCatalogItem['thumbnailKey'];
};

let draftExercises: RoutineCreateDraftExercise[] = [];

export function toRoutineCreateDraftExercise(
  item: ExerciseCatalogItem,
): RoutineCreateDraftExercise {
  return {
    id: item.id,
    name: item.name,
    equipment: item.equipment,
    primaryMuscle: item.primaryMuscle,
    thumbnailKey: item.thumbnailKey,
  };
}

export function setRoutineCreateDraftExercises(
  items: readonly RoutineCreateDraftExercise[],
): void {
  draftExercises = [...items];
}

export function getRoutineCreateDraftExercises(): RoutineCreateDraftExercise[] {
  return [...draftExercises];
}

export function clearRoutineCreateDraftExercises(): void {
  draftExercises = [];
}
