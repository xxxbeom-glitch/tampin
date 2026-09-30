import {
  advanceTimerMock,
  formatTimer,
  reduceWorkoutSession,
  sessionWithOverlay,
} from '../src/features/workout';

describe('Group 05 rest / manual timer mock elapsed', () => {
  it('formats frozen remainingSec without a live clock', () => {
    expect(formatTimer(90)).toBe('01:30');
    expect(formatTimer(89)).toBe('01:29');
    expect(formatTimer(72)).toBe('01:12');
    expect(formatTimer(0)).toBe('00:00');
  });

  it('advances rest one mock second at a time and skips at 0', () => {
    const started = sessionWithOverlay('rest', {
      rest: { remainingSec: 90, durationSec: 90 },
    });
    const afterOne = advanceTimerMock(started, 1);
    expect(afterOne.overlay).toBe('rest');
    expect(afterOne.rest?.remainingSec).toBe(89);
    expect(formatTimer(afterOne.rest?.remainingSec ?? -1)).toBe('01:29');

    const lastSecond = advanceTimerMock(
      sessionWithOverlay('rest', { rest: { remainingSec: 1, durationSec: 90 } }),
      1,
    );
    expect(lastSecond.overlay).toBe('none');
    expect(lastSecond.rest).toBeNull();
  });

  it('does not tick rest when overlay is gone', () => {
    const idle = sessionWithOverlay('none');
    expect(advanceTimerMock(idle, 5)).toBe(idle);
    expect(reduceWorkoutSession(idle, { type: 'tickRest' }).rest).toBeNull();
  });

  it('adjusts rest ±15 and clamps remaining at 0', () => {
    let session = sessionWithOverlay('rest', {
      rest: { remainingSec: 90, durationSec: 90 },
    });
    session = reduceWorkoutSession(session, { type: 'adjustRest', deltaSec: 15 });
    expect(session.rest?.remainingSec).toBe(105);
    session = reduceWorkoutSession(session, { type: 'adjustRest', deltaSec: -15 });
    expect(session.rest?.remainingSec).toBe(90);
    session = reduceWorkoutSession(session, {
      type: 'adjustRest',
      deltaSec: -200,
    });
    expect(session.rest?.remainingSec).toBe(0);
    session = reduceWorkoutSession(session, { type: 'tickRest' });
    expect(session.overlay).toBe('none');
  });

  it('ticks manual only while running and holds 00:00', () => {
    const running = sessionWithOverlay('manualRunning', {
      manual: { remainingSec: 72, durationSec: 90 },
    });
    const afterTwo = advanceTimerMock(running, 2);
    expect(afterTwo.overlay).toBe('manualRunning');
    expect(afterTwo.manual?.remainingSec).toBe(70);
    expect(formatTimer(afterTwo.manual?.remainingSec ?? -1)).toBe('01:10');

    const paused = sessionWithOverlay('manualPaused', {
      manual: { remainingSec: 72, durationSec: 90 },
    });
    expect(advanceTimerMock(paused, 5).manual?.remainingSec).toBe(72);
    expect(reduceWorkoutSession(paused, { type: 'tickManual' }).manual?.remainingSec).toBe(72);

    const held = advanceTimerMock(
      sessionWithOverlay('manualRunning', { manual: { remainingSec: 1, durationSec: 90 } }),
      3,
    );
    expect(held.overlay).toBe('manualRunning');
    expect(held.manual?.remainingSec).toBe(0);
  });

  it('adjusts manual ±15 from idle remaining without starting a clock', () => {
    let session = sessionWithOverlay('manualIdle');
    session = reduceWorkoutSession(session, { type: 'adjustManual', deltaSec: 15 });
    expect(session.overlay).toBe('manualIdle');
    expect(session.manual?.remainingSec).toBe(105);
    session = reduceWorkoutSession(session, { type: 'adjustManual', deltaSec: -15 });
    expect(session.manual?.remainingSec).toBe(90);
  });
});
