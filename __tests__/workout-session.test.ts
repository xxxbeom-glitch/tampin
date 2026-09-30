import {
  createWorkoutSession,
  fullyCompletedSession,
  reduceWorkoutSession,
  replaceLookup,
  sessionWithOverlay,
} from '../src/features/workout';

describe('Group 05 workout session transitions', () => {
  it('opens the header more menu and routes incomplete end', () => {
    let session = reduceWorkoutSession(createWorkoutSession(), { type: 'openHeaderMenu' });
    expect(session.overlay).toBe('headerMenu');
    session = reduceWorkoutSession(session, { type: 'requestEnd' });
    expect(session.overlay).toBe('endIncomplete');
    session = reduceWorkoutSession(session, { type: 'confirmEnd' });
    expect(session.outcome).toBe('saved');
  });

  it('routes complete end through 05L then 05O when the routine changed', () => {
    let session = fullyCompletedSession();
    session = { ...session, routineChanged: true };
    session = reduceWorkoutSession(session, { type: 'requestEnd' });
    expect(session.overlay).toBe('endComplete');
    session = reduceWorkoutSession(session, { type: 'confirmEnd' });
    expect(session.overlay).toBe('updateRoutine');
    session = reduceWorkoutSession(session, { type: 'applyTodayOnly' });
    expect(session.outcome).toBe('saved');
  });

  it('discards the current session only', () => {
    let session = reduceWorkoutSession(createWorkoutSession(), { type: 'openDiscard' });
    expect(session.overlay).toBe('discard');
    session = reduceWorkoutSession(session, { type: 'confirmDiscard' });
    expect(session.outcome).toBe('discarded');
  });

  it('starts rest on set complete, replaces rest, and skips on overlay', () => {
    let session = createWorkoutSession();
    session = reduceWorkoutSession(session, {
      type: 'toggleSet',
      exerciseId: 'chest-press-machine',
      setId: 'chest-2',
    });
    expect(session.overlay).toBe('rest');
    expect(session.rest?.remainingSec).toBe(90);
    session = reduceWorkoutSession(session, { type: 'adjustRest', deltaSec: -15 });
    expect(session.rest?.remainingSec).toBe(75);
    session = reduceWorkoutSession(session, {
      type: 'toggleSet',
      exerciseId: 'chest-press-machine',
      setId: 'chest-3',
    });
    expect(session.rest?.remainingSec).toBe(90);
    session = reduceWorkoutSession(session, { type: 'skipRest' });
    expect(session.overlay).toBe('none');
    expect(session.rest).toBeNull();
  });

  it('runs 05Q idle → running → paused → reset / resume', () => {
    let session = reduceWorkoutSession(createWorkoutSession(), { type: 'openManual' });
    expect(session.overlay).toBe('manualIdle');
    expect(session.manual?.remainingSec).toBe(90);
    session = reduceWorkoutSession(session, { type: 'startManual' });
    expect(session.overlay).toBe('manualRunning');
    session = reduceWorkoutSession(session, { type: 'adjustManual', deltaSec: -15 });
    expect(session.manual?.remainingSec).toBe(75);
    session = reduceWorkoutSession(session, { type: 'pauseManual' });
    expect(session.overlay).toBe('manualPaused');
    session = reduceWorkoutSession(session, { type: 'resumeManual' });
    expect(session.overlay).toBe('manualRunning');
    session = reduceWorkoutSession(session, { type: 'pauseManual' });
    session = reduceWorkoutSession(session, { type: 'resetManual' });
    expect(session.overlay).toBe('manualIdle');
    expect(session.manual?.remainingSec).toBe(90);
    session = reduceWorkoutSession(session, { type: 'dismissManual' });
    expect(session.manual).toBeNull();
  });

  it('blocks manual timer while rest is active', () => {
    const resting = sessionWithOverlay('rest');
    const next = reduceWorkoutSession(resting, { type: 'openManual' });
    expect(next.overlay).toBe('rest');
    expect(next.manual).toBeNull();
  });

  it('replaces without 05P when no completed sets, and with 05P when completed sets exist', () => {
    let clean = createWorkoutSession({
      exercises: createWorkoutSession().exercises.map((exercise) => ({
        ...exercise,
        sets: exercise.sets.map((set) => ({ ...set, completed: false })),
      })),
    });
    clean = reduceWorkoutSession(clean, { type: 'openExerciseMenu', exerciseId: 'chest-press-machine' });
    clean = reduceWorkoutSession(clean, { type: 'openReplace' });
    clean = reduceWorkoutSession(clean, { type: 'selectReplace', candidateId: 'incline-bench' });
    clean = reduceWorkoutSession(clean, { type: 'confirmReplace' }, replaceLookup);
    expect(clean.exercises[0]?.name).toBe('인클라인 벤치프레스');
    expect(clean.overlay).toBe('none');

    let dirty = createWorkoutSession();
    dirty = reduceWorkoutSession(dirty, { type: 'openExerciseMenu', exerciseId: 'chest-press-machine' });
    dirty = reduceWorkoutSession(dirty, { type: 'openReplace' });
    dirty = reduceWorkoutSession(dirty, { type: 'cycleReplaceBatch' });
    expect(dirty.replaceBatch).toBe(1);
    dirty = reduceWorkoutSession(dirty, { type: 'selectReplace', candidateId: 'pec-deck' });
    dirty = reduceWorkoutSession(dirty, { type: 'confirmReplace' }, replaceLookup);
    expect(dirty.overlay).toBe('replaceConfirm');
    dirty = reduceWorkoutSession(dirty, { type: 'confirmReplaceDelete' }, replaceLookup);
    expect(dirty.exercises[0]?.name).toBe('펙덱 플라이');
    expect(dirty.exercises[0]?.sets.every((set) => !set.completed)).toBe(true);
  });

  it('moves an exercise down on reorder handle and keeps identity', () => {
    let session = reduceWorkoutSession(createWorkoutSession(), { type: 'openReorder' });
    const first = session.exercises[0]?.id;
    session = reduceWorkoutSession(session, {
      type: 'moveExerciseDown',
      exerciseId: 'chest-press-machine',
    });
    expect(session.exercises[1]?.id).toBe(first);
    session = reduceWorkoutSession(session, { type: 'confirmReorder' });
    expect(session.overlay).toBe('none');
    expect(session.routineChanged).toBe(true);
  });
});
