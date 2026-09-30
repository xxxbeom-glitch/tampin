import { fireEvent, render } from '@testing-library/react-native';
import { RoutineDetailRouteScreen } from '../src/app/navigation/screens/RoutineDetailRouteScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoBack,
    }),
    useRoute: () => ({
      params: { routineId: 'push-day' },
    }),
  };
});

describe('DEV-011 RoutineDetailRouteScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockGoBack.mockClear();
  });

  it('renders fixture detail for the route routineId', async () => {
    const { getByText } = await render(<RoutineDetailRouteScreen />);

    expect(getByText('Push Day')).toBeTruthy();
  });

  it('returns to RoutineHome via goBack', async () => {
    const { getByTestId } = await render(<RoutineDetailRouteScreen />);

    await fireEvent.press(getByTestId('routine-detail-back'));

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('navigates to ActiveWorkout from the start CTA', async () => {
    const { getByTestId } = await render(<RoutineDetailRouteScreen />);

    await fireEvent.press(getByTestId('routine-detail-start-workout'));

    expect(mockNavigate).toHaveBeenCalledWith('ActiveWorkout');
  });
});
