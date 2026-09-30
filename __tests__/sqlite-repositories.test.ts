import {
  createTestAccountId,
  createTestDataLayer,
} from './helpers/sqlite-test-harness';
import { createId, type ExerciseId, type RoutineId } from '../src/data/contracts/ids';

describe('DEV-004 SQLite repositories', () => {
  it('persists account-scoped routines with exercises and set templates', async () => {
    const accountId = createTestAccountId();
    const { routineRepository } = createTestDataLayer();

    const routine = await routineRepository.createRoutine({
      accountId,
      name: 'Pull Day',
    });

    const exercise = await routineRepository.addRoutineExercise({
      accountId,
      routineId: routine.id,
      exerciseId: createId<ExerciseId>('exercise-bench'),
      exerciseNameSnapshot: 'Bench Press',
      recordingType: 'weight_reps',
      sortOrder: 0,
    });

    const template = await routineRepository.addRoutineSetTemplate({
      accountId,
      routineExerciseId: exercise.id,
      setIndex: 1,
      targetWeightKg: 60,
      targetReps: 8,
    });

    const listed = await routineRepository.listRoutines(accountId);
    expect(listed).toHaveLength(1);
    expect(listed[0]?.id).toBe(routine.id);
    expect(template.targetReps).toBe(8);
  });

  it('completes a workout inside a transaction and preserves immutable snapshots', async () => {
    const accountId = createTestAccountId();
    const { connection, routineRepository, workoutRepository } =
      createTestDataLayer();

    const routine = await routineRepository.createRoutine({
      accountId,
      name: 'Leg Day',
    });

    const session = await workoutRepository.startSession({
      accountId,
      startedAt: '2026-09-30T10:00:00.000Z',
      sourceRoutineId: routine.id,
    });

    const sessionExercise = await workoutRepository.addSessionExercise({
      accountId,
      sessionId: session.id,
      exerciseId: createId<ExerciseId>('exercise-squat'),
      exerciseNameSnapshot: 'Back Squat',
      recordingTypeSnapshot: 'weight_reps',
      sortOrder: 0,
    });

    await workoutRepository.upsertSetRecord({
      accountId,
      sessionExerciseId: sessionExercise.id,
      setIndex: 1,
      weightKg: 100,
      reps: 5,
      isCompleted: true,
    });

    const completed = await workoutRepository.completeWorkout({
      accountId,
      sessionId: session.id,
      completedAt: '2026-09-30T11:00:00.000Z',
      sourceRoutineNameSnapshot: 'Leg Day',
    });

    expect(completed.sourceRoutineNameSnapshot).toBe('Leg Day');

    connection.run(
      `UPDATE routines SET name = ?, updated_at = ?, sync_state = 'dirty' WHERE id = ?`,
      ['Leg Day Renamed', '2026-09-30T12:00:00.000Z', routine.id],
    );

    const snapshotExercise = connection.getFirst<{ exercise_name_snapshot: string }>(
      `SELECT exercise_name_snapshot FROM completed_workout_exercises
       WHERE completed_workout_id = ?`,
      [completed.id],
    );
    expect(snapshotExercise?.exercise_name_snapshot).toBe('Back Squat');

    const snapshotSet = connection.getFirst<{ weight_kg: number; reps: number }>(
      `SELECT weight_kg, reps FROM completed_set_snapshots
       WHERE completed_workout_exercise_id IN (
         SELECT id FROM completed_workout_exercises WHERE completed_workout_id = ?
       )`,
      [completed.id],
    );
    expect(snapshotSet).toEqual({ weight_kg: 100, reps: 5 });

    const active = await workoutRepository.getActiveSession(accountId);
    expect(active).toBeNull();
  });

  it('rejects starting a second active workout for the same account', async () => {
    const accountId = createTestAccountId();
    const { workoutRepository } = createTestDataLayer();

    await workoutRepository.startSession({
      accountId,
      startedAt: '2026-09-30T10:00:00.000Z',
    });

    await expect(
      workoutRepository.startSession({
        accountId,
        startedAt: '2026-09-30T10:05:00.000Z',
      }),
    ).rejects.toThrow('An active workout session already exists for this account.');
  });

  it('stores durable sync outbox metadata without executing transport', async () => {
    const accountId = createTestAccountId();
    const { syncOutboxRepository } = createTestDataLayer();

    const entry = await syncOutboxRepository.enqueue({
      accountId,
      entityType: 'routine',
      entityId: createId<RoutineId>('routine-1'),
      operation: 'upsert',
      payload: { name: 'Push Day' },
    });

    const pending = await syncOutboxRepository.listPending(accountId);
    expect(pending).toHaveLength(1);
    expect(pending[0]?.mutationId).toBe(entry.mutationId);

    await syncOutboxRepository.markSent(entry.mutationId as never);
    expect(await syncOutboxRepository.listPending(accountId)).toHaveLength(0);
  });
});
