import { cleanup, fireEvent, render } from '@testing-library/react-native';
import { ExerciseSelectionRouteScreen } from '../src/app/navigation/screens/ExerciseSelectionRouteScreen';
import { exerciseCatalogFixture } from '../src/features/exercise';
import {
  clearRoutineCreateDraftExercises,
  getRoutineCreateDraftExercises,
  getRoutineCreateSessionCatalog,
  setRoutineCreateDraftExercises,
  toRoutineCreateDraftExercise,
  upsertRoutineCreateSessionCatalog,
} from '../src/features/routine';

const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  };
});

describe('DEV-014 ExerciseSelectionRouteScreen', () => {
  beforeEach(() => {
    mockGoBack.mockClear();
    cleanup();
    clearRoutineCreateDraftExercises();
  });

  afterEach(() => {
    cleanup();
  });

  it('opens equipment filter and returns with the selected value applied', async () => {
    const { getByTestId, getByText } = await render(<ExerciseSelectionRouteScreen />);

    expect(getByTestId('flow-boundary-ExerciseSelection')).toBeTruthy();
    await fireEvent.press(getByTestId('exercise-search-equipment-filter'));
    expect(getByText('장비 선택')).toBeTruthy();
    await fireEvent.press(getByTestId('exercise-equipment-filter-option-덤벨'));
    expect(getByTestId('exercise-search-equipment-filter')).toBeTruthy();
    expect(getByText('덤벨')).toBeTruthy();
  });

  it('opens custom create from header plus and keeps save disabled until required fields exist', async () => {
    const { getByTestId, getByText } = await render(<ExerciseSelectionRouteScreen />);

    await fireEvent.press(getByTestId('exercise-search-create'));
    expect(getByText('직접 운동 만들기')).toBeTruthy();
    expect(getByTestId('custom-exercise-save').props.accessibilityState).toMatchObject({
      disabled: true,
    });
  });

  it('saves a valid custom exercise back into the selected search state', async () => {
    const { getByTestId, getByText } = await render(<ExerciseSelectionRouteScreen />);

    await fireEvent.press(getByTestId('exercise-search-create'));
    await fireEvent.changeText(getByTestId('custom-exercise-name'), '케이블 풀다운 (커스텀)');
    await fireEvent.press(getByTestId('custom-exercise-primary-muscle'));
    await fireEvent.press(getByTestId('custom-primary-muscle-select-option-등'));
    await fireEvent.press(getByTestId('custom-exercise-save'));

    expect(getByTestId('exercise-search-selected-chips')).toBeTruthy();
    expect(getByText('선택한 운동 (1개)')).toBeTruthy();
    expect(getByText('1개 운동 추가')).toBeTruthy();
  });

  it('opens the attachment overlay for lat pulldown and returns to selected search', async () => {
    const { getByTestId, getByText } = await render(<ExerciseSelectionRouteScreen />);

    await fireEvent.press(getByTestId('exercise-row-toggle-lat-pulldown'));
    expect(getByTestId('exercise-attachment-sheet')).toBeTruthy();
    expect(getByText('손잡이 선택')).toBeTruthy();
    await fireEvent.press(getByTestId('exercise-attachment-option-스트레이트 바'));
    expect(getByText('1개 운동 추가')).toBeTruthy();
  });

  it('renders Figma attachment-input copy when 직접 입력 is chosen', async () => {
    const { getByTestId, getByText } = await render(<ExerciseSelectionRouteScreen />);

    await fireEvent.press(getByTestId('exercise-row-toggle-lat-pulldown'));
    await fireEvent.press(getByTestId('exercise-attachment-option-직접 입력'));

    expect(getByText('손잡이 직접 입력')).toBeTruthy();
    expect(getByText('목록에 없는 손잡이 이름을 입력하세요.')).toBeTruthy();
    expect(getByText('사용하기')).toBeTruthy();
    expect(getByTestId('exercise-attachment-input').props.placeholder).toBe(
      '예: 뉴트럴 그립 바',
    );
  });

  it('confirms selection into the RoutineCreate mock draft and leaves the flow', async () => {
    const { getByTestId } = await render(<ExerciseSelectionRouteScreen />);

    await fireEvent.press(getByTestId('exercise-row-toggle-bench-press'));
    await fireEvent.press(getByTestId('exercise-search-confirm'));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
    expect(getRoutineCreateDraftExercises().map((item) => item.id)).toEqual([
      'bench-press',
    ]);
  });

  it('writes the full custom catalog item into the mock session on confirm', async () => {
    const { getByTestId } = await render(<ExerciseSelectionRouteScreen />);

    await fireEvent.press(getByTestId('exercise-search-create'));
    await fireEvent.changeText(getByTestId('custom-exercise-name'), '케이블 풀다운 (커스텀)');
    await fireEvent.press(getByTestId('custom-exercise-primary-muscle'));
    await fireEvent.press(getByTestId('custom-primary-muscle-select-option-등'));
    await fireEvent.press(getByTestId('custom-exercise-save'));
    await fireEvent.press(getByTestId('exercise-search-confirm'));

    const customId = 'custom-케이블 풀다운 (커스텀)';
    expect(getRoutineCreateDraftExercises().map((item) => item.id)).toEqual([customId]);
    expect(getRoutineCreateSessionCatalog().map((item) => item.id)).toEqual([customId]);
    expect(getRoutineCreateDraftExercises()[0]?.catalogItem).toMatchObject({
      id: customId,
      name: '케이블 풀다운 (커스텀)',
      primaryMuscle: '등',
    });
  });

  it('restores a session custom catalog item on a fresh ExerciseSelection mount', async () => {
    const latPulldown = exerciseCatalogFixture.find((item) => item.id === 'lat-pulldown');
    if (!latPulldown) {
      throw new Error('expected lat-pulldown fixture');
    }
    const custom = {
      ...latPulldown,
      id: 'custom-케이블 풀다운 (커스텀)',
      name: '케이블 풀다운 (커스텀)',
      needsAttachment: false,
    };
    upsertRoutineCreateSessionCatalog([custom]);
    setRoutineCreateDraftExercises([toRoutineCreateDraftExercise(custom)]);

    const { getByText, getAllByText, getByTestId } = await render(
      <ExerciseSelectionRouteScreen />,
    );
    expect(getByText('선택한 운동 (1개)')).toBeTruthy();
    expect(getAllByText('케이블 풀다운 (커스텀)').length).toBeGreaterThan(0);
    await fireEvent.press(getByTestId('exercise-search-confirm'));
    expect(getRoutineCreateDraftExercises()[0]?.catalogItem).toMatchObject({
      id: custom.id,
      name: custom.name,
    });
  });

  it('stores a preset attachment on the mock draft', async () => {
    const { getByTestId } = await render(<ExerciseSelectionRouteScreen />);
    await fireEvent.press(getByTestId('exercise-row-toggle-lat-pulldown'));
    await fireEvent.press(getByTestId('exercise-attachment-option-스트레이트 바'));
    await fireEvent.press(getByTestId('exercise-search-confirm'));
    expect(getRoutineCreateDraftExercises()[0]).toMatchObject({
      id: 'lat-pulldown',
      attachment: '스트레이트 바',
    });
  });

  it('stores a direct-input attachment on the mock draft', async () => {
    const { getByTestId } = await render(<ExerciseSelectionRouteScreen />);
    await fireEvent.press(getByTestId('exercise-row-toggle-lat-pulldown'));
    await fireEvent.press(getByTestId('exercise-attachment-option-직접 입력'));
    await fireEvent.changeText(getByTestId('exercise-attachment-input'), '뉴트럴 그립 바');
    await fireEvent.press(getByTestId('exercise-attachment-input-confirm'));
    await fireEvent.press(getByTestId('exercise-search-confirm'));
    expect(getRoutineCreateDraftExercises()[0]).toMatchObject({
      id: 'lat-pulldown',
      attachment: '뉴트럴 그립 바',
    });
  });
});
