import { fireEvent, render } from '@testing-library/react-native';
import { RoutineEditorRouteScreen } from '../src/app/navigation/screens/RoutineEditorRouteScreen';

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

describe('DEV-013 RoutineEditorRouteScreen', () => {
  beforeEach(() => {
    mockGoBack.mockClear();
  });

  it('moves from an existing folder selection directly into routine create', async () => {
    const { getByTestId, queryByTestId } = await render(
      <RoutineEditorRouteScreen />,
    );

    expect(getByTestId('routine-folder-entry-screen')).toBeTruthy();
    await fireEvent.press(getByTestId('routine-folder-option-ppl-routine'));
    await fireEvent.press(getByTestId('routine-folder-entry-continue'));

    expect(queryByTestId('routine-folder-entry-screen')).toBeNull();
    expect(getByTestId('routine-create-screen')).toBeTruthy();
    expect(getByTestId('routine-create-folder-name').props.value).toBe(
      'PPL Routine',
    );
  });

  it('uses a trimmed new folder name and returns to folder entry on create Back', async () => {
    const { getByTestId } = await render(<RoutineEditorRouteScreen />);

    await fireEvent.changeText(
      getByTestId('routine-folder-entry-new-name'),
      '  새 폴더  ',
    );
    await fireEvent.press(getByTestId('routine-folder-entry-continue'));

    expect(getByTestId('routine-create-folder-name').props.value).toBe('새 폴더');
    await fireEvent.press(getByTestId('routine-create-back'));
    expect(getByTestId('routine-folder-entry-screen')).toBeTruthy();
    expect(mockGoBack).not.toHaveBeenCalled();
  });

  it('leaves the flow from the initial folder-entry Back action', async () => {
    const { getByTestId } = await render(<RoutineEditorRouteScreen />);

    await fireEvent.press(getByTestId('routine-folder-entry-back'));

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
