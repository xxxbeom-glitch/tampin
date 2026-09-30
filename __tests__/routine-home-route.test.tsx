import { fireEvent, render } from '@testing-library/react-native';
import { RoutineHomeRouteScreen } from '../src/app/navigation/screens/RoutineHomeRouteScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('DEV-010 RoutineHomeRouteScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('navigates to ActiveWorkout from quick start without routine', async () => {
    const { getByTestId } = await render(<RoutineHomeRouteScreen />);

    await fireEvent.press(getByTestId('routine-quickstart-without-routine'));

    expect(mockNavigate).toHaveBeenCalledWith('ActiveWorkout');
  });

  it('navigates to RoutineEditor from create routine quick action', async () => {
    const { getByTestId } = await render(<RoutineHomeRouteScreen />);

    await fireEvent.press(getByTestId('routine-quickstart-create-routine'));

    expect(mockNavigate).toHaveBeenCalledWith('RoutineEditor');
  });

  it('navigates to Analysis and Settings from bottom app bar tabs', async () => {
    const { getByTestId } = await render(<RoutineHomeRouteScreen />);

    await fireEvent.press(getByTestId('routine-main-tab-analysis'));
    await fireEvent.press(getByTestId('routine-main-tab-settings'));

    expect(mockNavigate).toHaveBeenCalledWith('Analysis');
    expect(mockNavigate).toHaveBeenCalledWith('Settings');
  });
});
