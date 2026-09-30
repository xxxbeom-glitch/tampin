import { fireEvent, render } from '@testing-library/react-native';
import { ExerciseDetailScreen, resolveExerciseDetail } from '../src/features/exercise';

describe('DEV-014 ExerciseDetailScreen', () => {
  it('renders the info tab copy for bench press', async () => {
    const { getByText } = await render(
      <ExerciseDetailScreen model={resolveExerciseDetail('bench-press')} tab="info" />,
    );

    expect(getByText('벤치프레스')).toBeTruthy();
    expect(getByText('운동 정보')).toBeTruthy();
    expect(getByText('대흉근')).toBeTruthy();
    expect(getByText('운동 방법')).toBeTruthy();
    expect(getByText('1. 견갑을 벤치에 고정합니다.')).toBeTruthy();
  });

  it('renders native weight+reps history without inventing extra units', async () => {
    const { getByText } = await render(
      <ExerciseDetailScreen model={resolveExerciseDetail('bench-press')} tab="history" />,
    );

    expect(getByText('7월 12일')).toBeTruthy();
    expect(getByText('70kg')).toBeTruthy();
    expect(getByText('중량')).toBeTruthy();
    expect(getByText('횟수')).toBeTruthy();
  });

  it('renders empty history and insufficient growth states', async () => {
    const empty = await render(
      <ExerciseDetailScreen model={resolveExerciseDetail('hack-squat')} tab="history" />,
    );
    expect(empty.getByTestId('exercise-detail-history-empty')).toBeTruthy();

    const insufficient = await render(
      <ExerciseDetailScreen model={resolveExerciseDetail('push-up')} tab="growth" />,
    );
    expect(insufficient.getByTestId('exercise-detail-growth-pr')).toBeTruthy();
    expect(insufficient.getByTestId('exercise-detail-growth-insufficient')).toBeTruthy();
  });

  it('switches tabs through the rendering contract', async () => {
    const onTabChange = jest.fn();
    const { getByTestId } = await render(
      <ExerciseDetailScreen
        model={resolveExerciseDetail('bench-press')}
        onTabChange={onTabChange}
        tab="info"
      />,
    );

    await fireEvent.press(getByTestId('exercise-detail-tab-history'));
    expect(onTabChange).toHaveBeenCalledWith('history');
  });
});
