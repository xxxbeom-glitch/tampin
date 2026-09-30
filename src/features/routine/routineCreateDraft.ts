import type { ExerciseCatalogItem } from '../exercise/types';

export type RoutineCreateDraftExercise = {
  id: string;
  name: string;
  equipment: string;
  primaryMuscle: string;
  thumbnailKey: ExerciseCatalogItem['thumbnailKey'];
  attachment: string | null;
  catalogItem: ExerciseCatalogItem;
};

let draftExercises: RoutineCreateDraftExercise[] = [];
let sessionCatalog: ExerciseCatalogItem[] = [];

export function toRoutineCreateDraftExercise(
  item: ExerciseCatalogItem,
  attachment: string | null = null,
): RoutineCreateDraftExercise {
  return {
    id: item.id,
    name: item.name,
    equipment: item.equipment,
    primaryMuscle: item.primaryMuscle,
    thumbnailKey: item.thumbnailKey,
    attachment,
    catalogItem: item,
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

export function upsertRoutineCreateSessionCatalog(
  items: readonly ExerciseCatalogItem[],
): void {
  const next = new Map(sessionCatalog.map((item) => [item.id, item]));
  for (const item of items) {
    next.set(item.id, item);
  }
  sessionCatalog = [...next.values()];
}

export function getRoutineCreateSessionCatalog(): ExerciseCatalogItem[] {
  return [...sessionCatalog];
}

export function mergeRoutineCreateCatalog(
  base: readonly ExerciseCatalogItem[],
  extras: readonly ExerciseCatalogItem[],
): ExerciseCatalogItem[] {
  const seen = new Set<string>();
  const uniqueExtras: ExerciseCatalogItem[] = [];
  for (const item of extras) {
    if (seen.has(item.id)) {
      continue;
    }
    seen.add(item.id);
    uniqueExtras.push(item);
  }
  return [...uniqueExtras, ...base.filter((item) => !seen.has(item.id))];
}

export function clearRoutineCreateDraftExercises(): void {
  draftExercises = [];
  sessionCatalog = [];
}

export function beginRoutineCreateSession(): void {
  clearRoutineCreateDraftExercises();
}

export function endRoutineCreateSession(): void {
  clearRoutineCreateDraftExercises();
}
