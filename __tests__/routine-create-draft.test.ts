import {
  clearRoutineCreateDraftExercises,
  getRoutineCreateDraftExercises,
  setRoutineCreateDraftExercises,
} from '../src/features/routine';

describe('DEV-014 RoutineCreate mock draft', () => {
  beforeEach(() => {
    clearRoutineCreateDraftExercises();
  });

  it('holds confirmed exercises in memory only', () => {
    setRoutineCreateDraftExercises([
      {
        id: 'bench-press',
        name: '벤치프레스',
        equipment: '바벨',
        primaryMuscle: '대흉근',
        thumbnailKey: 'smithBenchPress',
      },
    ]);

    expect(getRoutineCreateDraftExercises()).toEqual([
      {
        id: 'bench-press',
        name: '벤치프레스',
        equipment: '바벨',
        primaryMuscle: '대흉근',
        thumbnailKey: 'smithBenchPress',
      },
    ]);

    clearRoutineCreateDraftExercises();
    expect(getRoutineCreateDraftExercises()).toEqual([]);
  });
});
