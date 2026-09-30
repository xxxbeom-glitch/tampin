import {
  beginRoutineCreateSession,
  clearRoutineCreateDraftExercises,
  endRoutineCreateSession,
  getRoutineCreateDraftExercises,
  getRoutineCreateSessionCatalog,
  mergeRoutineCreateCatalog,
  setRoutineCreateDraftExercises,
  toRoutineCreateDraftExercise,
  upsertRoutineCreateSessionCatalog,
} from '../src/features/routine';
import { exerciseCatalogFixture } from '../src/features/exercise';

const bench = exerciseCatalogFixture.find((item) => item.id === 'bench-press');

if (!bench) {
  throw new Error('expected bench-press fixture');
}

describe('DEV-014 RoutineCreate mock draft', () => {
  beforeEach(() => {
    clearRoutineCreateDraftExercises();
  });

  it('holds confirmed exercises and attachments in memory only', () => {
    setRoutineCreateDraftExercises([
      toRoutineCreateDraftExercise(bench, null),
    ]);

    expect(getRoutineCreateDraftExercises()).toEqual([
      toRoutineCreateDraftExercise(bench, null),
    ]);

    clearRoutineCreateDraftExercises();
    expect(getRoutineCreateDraftExercises()).toEqual([]);
    expect(getRoutineCreateSessionCatalog()).toEqual([]);
  });

  it('clears selected exercises and session catalog on session begin/end', () => {
    const custom = {
      ...bench,
      id: 'custom-케이블 풀다운 (커스텀)',
      name: '케이블 풀다운 (커스텀)',
    };
    upsertRoutineCreateSessionCatalog([custom]);
    setRoutineCreateDraftExercises([toRoutineCreateDraftExercise(custom, 'V바')]);

    beginRoutineCreateSession();
    expect(getRoutineCreateDraftExercises()).toEqual([]);
    expect(getRoutineCreateSessionCatalog()).toEqual([]);

    upsertRoutineCreateSessionCatalog([custom]);
    endRoutineCreateSession();
    expect(getRoutineCreateSessionCatalog()).toEqual([]);
  });

  it('merges session catalog extras ahead of the base fixture', () => {
    const custom = {
      ...bench,
      id: 'custom-케이블 풀다운 (커스텀)',
      name: '케이블 풀다운 (커스텀)',
    };

    const merged = mergeRoutineCreateCatalog(exerciseCatalogFixture, [custom, custom]);
    expect(merged[0]).toEqual(custom);
    expect(merged.filter((item) => item.id === custom.id)).toHaveLength(1);
  });
});
