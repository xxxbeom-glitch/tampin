import { fireEvent, render } from '@testing-library/react-native';
import { ActiveWorkoutScreen } from '../src/features/workout/ActiveWorkoutScreen';
import {
  createWorkoutSession,
  pausedElapsedSession,
  replaceCandidateBatches,
  sessionWithOverlay,
} from '../src/features/workout';

const noopThumb = () => undefined;

function renderWorkout(session = createWorkoutSession(), extras?: Partial<Parameters<typeof ActiveWorkoutScreen>[0]>) {
  return render(
    <ActiveWorkoutScreen
      displayElapsed="00:32:16"
      replaceCandidates={replaceCandidateBatches}
      session={session}
      thumbnailFor={noopThumb}
      {...extras}
    />,
  );
}

describe('Group 05 ActiveWorkoutScreen', () => {
  it('renders 05A header elapsed without pause/play and with horizontal more', async () => {
    const { getByTestId, queryByText } = await renderWorkout();

    expect(getByTestId('active-workout-elapsed').props.children).toBe('00:32:16');
    expect(getByTestId('active-workout-more')).toBeTruthy();
    expect(queryByText('일시정지')).toBeNull();
    expect(queryByText('재생')).toBeNull();
  });

  it('applies 50% opacity when elapsed is paused', async () => {
    const { getByTestId } = await renderWorkout(pausedElapsedSession());

    expect(getByTestId('active-workout-elapsed').props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ opacity: 0.5 })]),
    );
  });

  it('calls onOpenHeaderMenu from the right more action', async () => {
    const onOpenHeaderMenu = jest.fn();
    const { getByTestId } = await renderWorkout(createWorkoutSession(), { onOpenHeaderMenu });

    await fireEvent.press(getByTestId('active-workout-more'));
    expect(onOpenHeaderMenu).toHaveBeenCalled();
  });

  it('renders 05I header menu rows from a preloaded overlay', async () => {
    const { getByTestId } = await renderWorkout(sessionWithOverlay('headerMenu'));

    expect(getByTestId('workout-menu-end')).toBeTruthy();
    expect(getByTestId('workout-menu-add-exercise')).toBeTruthy();
    expect(getByTestId('workout-menu-timer')).toBeTruthy();
  });

  it('shows rest sheet skip / ±15 and no rest pause', async () => {
    const onSkip = jest.fn();
    const { getByText, getByTestId, queryByText } = await renderWorkout(
      sessionWithOverlay('rest'),
      { onSkipRest: onSkip },
    );

    expect(getByText('휴식 건너뛰기')).toBeTruthy();
    expect(getByTestId('workout-rest-minus')).toBeTruthy();
    expect(queryByText('일시정지')).toBeNull();
    await fireEvent.press(getByTestId('workout-rest-overlay'));
    expect(onSkip).toHaveBeenCalled();
  });

  it('renders 05Q idle CTA', async () => {
    const { getByText } = await renderWorkout(sessionWithOverlay('manualIdle'));
    expect(getByText('타이머 시작')).toBeTruthy();
  });

  it('renders 05Q running CTA', async () => {
    const { getByText } = await renderWorkout(sessionWithOverlay('manualRunning'));
    expect(getByText('일시정지')).toBeTruthy();
  });

  it('renders 05Q paused reset / resume CTAs', async () => {
    const { getByText } = await renderWorkout(sessionWithOverlay('manualPaused'));
    expect(getByText('초기화')).toBeTruthy();
    expect(getByText('계속 진행')).toBeTruthy();
  });

  it('renders 05K incomplete end copy', async () => {
    const { getByText } = await renderWorkout(sessionWithOverlay('endIncomplete'));
    expect(getByText('종료하고 저장')).toBeTruthy();
  });

  it('renders 05M discard copy', async () => {
    const { getByText } = await renderWorkout(sessionWithOverlay('discard'));
    expect(getByText('기록 삭제')).toBeTruthy();
  });

  it('renders 05G replace copy', async () => {
    const { getByText } = await renderWorkout(sessionWithOverlay('replace'));
    expect(getByText('대체 운동 선택')).toBeTruthy();
    expect(getByText('다른 운동 보기')).toBeTruthy();
  });
});
