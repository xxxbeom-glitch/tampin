import type { RoutineDetailExercise, RoutineDetailModel } from './routineDetailTypes';

const chestTag = {
  label: '가슴',
  backgroundColor: '#E7F8F0',
  textColor: '#16845F',
} as const;

const legsTag = {
  label: '하체',
  backgroundColor: '#FCEAF4',
  textColor: '#B54F83',
} as const;

const shoulderTag = {
  label: '어깨',
  backgroundColor: '#FFF0E5',
  textColor: '#D56B1F',
} as const;

function createDefaultSets() {
  return [
    { setNumber: 1, kg: '80', reps: '35' },
    { setNumber: 2, kg: '80', reps: '35' },
    { setNumber: 3, kg: '80', reps: '35' },
  ];
}

/** Four exercise cards aligned to Figma 02D_Routine_Detail (`2333:7821`). */
const canonicalExercises: RoutineDetailExercise[] = [
  {
    id: 'smith-bench-press',
    name: '스미스 머신 벤치프레스',
    tag: chestTag,
    sets: createDefaultSets(),
  },
  {
    id: 'barbell-rdl',
    name: '바벨 루마니안 데드리프트',
    tag: legsTag,
    sets: createDefaultSets(),
  },
  {
    id: 'seated-calf-raise',
    name: '시티드 카프 레이즈 머신',
    tag: legsTag,
    sets: createDefaultSets(),
  },
  {
    id: 'dumbbell-lateral-raise',
    name: '덤벨 레터럴 레이즈',
    tag: shoulderTag,
    sets: createDefaultSets(),
  },
];

const canonicalSummary = {
  exerciseCountLabel: '4개',
  estimatedTimeLabel: '45분',
  totalSetsLabel: '12세트',
} as const;

/** Catalog/default fixture matching Figma title and content exactly. */
export const routineDetailCatalogFixture: RoutineDetailModel = {
  routineId: 'upper-body-a',
  title: '상체 루틴 A',
  summary: canonicalSummary,
  exercises: canonicalExercises,
};

function createCardDetailFixture(
  routineId: string,
  title: string,
): RoutineDetailModel {
  return {
    routineId,
    title,
    summary: canonicalSummary,
    exercises: canonicalExercises,
  };
}

export const routineDetailFixturesById: Record<string, RoutineDetailModel> = {
  'upper-body-a': routineDetailCatalogFixture,
  'push-day': createCardDetailFixture('push-day', 'Push Day'),
  'pull-day': createCardDetailFixture('pull-day', 'Pull Day'),
  'leg-day': createCardDetailFixture('leg-day', 'Leg Day'),
};

export function resolveRoutineDetailFixture(
  routineId: string,
): RoutineDetailModel | null {
  return routineDetailFixturesById[routineId] ?? null;
}
