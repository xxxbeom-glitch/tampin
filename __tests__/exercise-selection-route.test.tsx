import { fireEvent, render } from '@testing-library/react-native';
import { ExerciseSelectionRouteScreen } from '../src/app/navigation/screens/ExerciseSelectionRouteScreen';

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

  it('confirms selection by leaving the ExerciseSelection flow', async () => {
    const { getByTestId } = await render(<ExerciseSelectionRouteScreen />);

    await fireEvent.press(getByTestId('exercise-row-toggle-bench-press'));
    await fireEvent.press(getByTestId('exercise-search-confirm'));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
