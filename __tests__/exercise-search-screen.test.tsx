import { fireEvent, render } from '@testing-library/react-native';
import {
  ExerciseSearchScreen,
  exerciseCatalogFixture,
  filterExerciseCatalog,
} from '../src/features/exercise';

describe('DEV-014 ExerciseSearchScreen', () => {
  it('renders recent and all sections from the stable catalog fixture', async () => {
    const { getByText, getByTestId } = await render(
      <ExerciseSearchScreen
        bodyPartFilter="전체"
        catalog={exerciseCatalogFixture}
        equipmentFilter="전체"
        query=""
        selectedIds={[]}
      />,
    );

    expect(getByText('운동 추가')).toBeTruthy();
    expect(getByText('최근 운동')).toBeTruthy();
    expect(getByText('전체 운동')).toBeTruthy();
    expect(getByText('벤치프레스')).toBeTruthy();
    expect(getByText('덤벨 레터럴 레이즈')).toBeTruthy();
    expect(getByTestId('exercise-search-query')).toBeTruthy();
  });

  it('shows selected chips and footer when ids are selected', async () => {
    const { getByText, getByTestId } = await render(
      <ExerciseSearchScreen
        bodyPartFilter="전체"
        catalog={exerciseCatalogFixture}
        equipmentFilter="전체"
        query=""
        selectedIds={['bench-press', 'lat-pulldown']}
      />,
    );

    expect(getByText('선택한 운동 (2개)')).toBeTruthy();
    expect(getByTestId('exercise-search-confirm')).toBeTruthy();
    expect(getByText('2개 운동 추가')).toBeTruthy();
  });

  it('renders the empty-search state without fake matches', async () => {
    const { getByText, queryByText, getByTestId } = await render(
      <ExerciseSearchScreen
        bodyPartFilter="전체"
        catalog={exerciseCatalogFixture}
        equipmentFilter="전체"
        query="레그프레쓰"
        selectedIds={[]}
      />,
    );

    expect(getByTestId('exercise-search-empty')).toBeTruthy();
    expect(getByText('검색 결과가 없어요')).toBeTruthy();
    expect(queryByText('벤치프레스')).toBeNull();
  });

  it('filters by equipment without inventing extra catalog rows', () => {
    const visible = filterExerciseCatalog(
      exerciseCatalogFixture,
      '',
      '케이블',
      '전체',
    );

    expect(visible.map((item) => item.id)).toEqual(['lat-pulldown']);
  });

  it('forwards toggle and create actions', async () => {
    const onToggleExercise = jest.fn();
    const onCreate = jest.fn();
    const { getByTestId } = await render(
      <ExerciseSearchScreen
        bodyPartFilter="전체"
        catalog={exerciseCatalogFixture}
        equipmentFilter="전체"
        onCreate={onCreate}
        onToggleExercise={onToggleExercise}
        query=""
        selectedIds={[]}
      />,
    );

    await fireEvent.press(getByTestId('exercise-row-toggle-bench-press'));
    await fireEvent.press(getByTestId('exercise-search-create'));

    expect(onToggleExercise).toHaveBeenCalledWith('bench-press');
    expect(onCreate).toHaveBeenCalledTimes(1);
  });
});
