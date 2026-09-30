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
    const { getByText, getAllByText } = await render(
      <ExerciseDetailScreen model={resolveExerciseDetail('bench-press')} tab="history" />,
    );

    expect(getByText('7월 12일')).toBeTruthy();
    expect(getByText('70kg')).toBeTruthy();
    expect(getAllByText('중량').length).toBeGreaterThan(0);
    expect(getAllByText('횟수').length).toBeGreaterThan(0);
  });

  it('renders empty history and insufficient growth states', async () => {
    const empty = await render(
      <ExerciseDetailScreen model={resolveExerciseDetail('hack-squat')} tab="history" />,
    );
    expect(empty.getByTestId('exercise-detail-history-empty')).toBeTruthy();

    const insufficient = await render(
      <ExerciseDetailScreen
        model={resolveExerciseDetail('bench-press-insufficient')}
        tab="growth"
      />,
    );
    expect(insufficient.getByTestId('exercise-detail-growth-chart')).toBeTruthy();
    expect(insufficient.getByTestId('exercise-detail-growth-insufficient')).toBeTruthy();
    expect(insufficient.getByText('기록이 더 필요해요')).toBeTruthy();
    expect(insufficient.getByTestId('exercise-detail-growth-pr')).toBeTruthy();
    expect(insufficient.getByText('70kg × 8회')).toBeTruthy();
  });

  it('renders the Figma weight growth chart instead of a PR-card substitute', async () => {
    const { getByText, getByTestId } = await render(
      <ExerciseDetailScreen model={resolveExerciseDetail('bench-press')} tab="growth" />,
    );

    expect(getByTestId('exercise-detail-growth-chart')).toBeTruthy();
    expect(getByText('중량 변화')).toBeTruthy();
    expect(getByText('82.5')).toBeTruthy();
    expect(getByText('이번주')).toBeTruthy();
    expect(getByText('개인 최고 기록')).toBeTruthy();
    expect(getByText('80kg × 10회')).toBeTruthy();
    expect(getByTestId('exercise-detail-growth-point-3')).toBeTruthy();
  });

  it('renders Figma duration history as seconds, not invented clock values', async () => {
    const { getByText, getAllByText } = await render(
      <ExerciseDetailScreen model={resolveExerciseDetail('plank')} tab="history" />,
    );

    expect(getByText('플랭크')).toBeTruthy();
    expect(getAllByText('시간').length).toBeGreaterThan(0);
    expect(getByText('60초')).toBeTruthy();
    expect(getByText('30초')).toBeTruthy();
  });

  it('renders Figma assisted history as assistance kg plus reps', async () => {
    const { getByText, getAllByText } = await render(
      <ExerciseDetailScreen model={resolveExerciseDetail('assisted-pull-up')} tab="history" />,
    );

    expect(getByText('어시스트 풀업')).toBeTruthy();
    expect(getAllByText('보조중량').length).toBeGreaterThan(0);
    expect(getAllByText('25kg').length).toBeGreaterThan(0);
    expect(getAllByText('40kg').length).toBeGreaterThan(0);
  });

  it('uses the canonical empty-growth copy', async () => {
    const { getByText, getByTestId } = await render(
      <ExerciseDetailScreen model={resolveExerciseDetail('hack-squat')} tab="growth" />,
    );

    expect(getByTestId('exercise-detail-growth-empty')).toBeTruthy();
    expect(getByText('아직 성장 기록이 없어요')).toBeTruthy();
    expect(getByText('운동을 완료하면 변화 추이가 여기에 표시돼요.')).toBeTruthy();
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
