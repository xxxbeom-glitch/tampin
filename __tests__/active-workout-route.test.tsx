import { fireEvent, render } from '@testing-library/react-native';
import { ActiveWorkoutRouteScreen } from '../src/app/navigation/screens/ActiveWorkoutRouteScreen';
import { RoutineDetailRouteScreen } from '../src/app/navigation/screens/RoutineDetailRouteScreen';
import {
  clearActiveWorkoutSession,
  createWorkoutSession,
  getActiveWorkoutSession,
  setActiveWorkoutSession,
  setExerciseSelectionPurpose,
  startWorkoutFromRoutine,
} from '../src/features/workout';

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
    useFocusEffect: () => {
      // Real focus runs after navigation, not during render. Do not setState here.
    },
  };
});

describe('Group 05 ActiveWorkout routes', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockGoBack.mockClear();
    clearActiveWorkoutSession();
    setExerciseSelectionPurpose('routineCreate');
  });

  it('navigates to ActiveWorkout from 02D 운동 시작', async () => {
    const { getByTestId } = await render(<RoutineDetailRouteScreen />);
    await fireEvent.press(getByTestId('routine-detail-start-workout'));
    expect(mockNavigate).toHaveBeenCalledWith('ActiveWorkout');
  });

  it('renders the seeded routine session on ActiveWorkout', async () => {
    startWorkoutFromRoutine('push-day');
    const { getByTestId, getByText } = await render(<ActiveWorkoutRouteScreen />);
    expect(getByTestId('active-workout-screen')).toBeTruthy();
    expect(getByText('스미스 머신 벤치프레스')).toBeTruthy();
  });

  it('opens 05I then 05Q from the header timer row', async () => {
    setActiveWorkoutSession(createWorkoutSession());
    const { getByTestId, getByText } = await render(<ActiveWorkoutRouteScreen />);

    await fireEvent.press(getByTestId('active-workout-more'));
    await fireEvent.press(getByTestId('workout-menu-timer'));
    expect(getByText('타이머 시작')).toBeTruthy();
    expect(getByTestId('workout-timer-remaining').props.children).toBe('01:30');
    await fireEvent.press(getByTestId('workout-manual-start'));
    expect(getByText('일시정지')).toBeTruthy();
    expect(getByTestId('workout-timer-remaining').props.children).toBe('01:30');
  });

  it('starts rest at 01:30 and does not auto-tick remainingSec', async () => {
    setActiveWorkoutSession(createWorkoutSession());
    const { getByTestId } = await render(<ActiveWorkoutRouteScreen />);
    await fireEvent.press(getByTestId('workout-set-done-chest-2'));
    expect(getByTestId('workout-rest-sheet')).toBeTruthy();
    expect(getByTestId('workout-timer-remaining').props.children).toBe('01:30');
    expect(getActiveWorkoutSession()?.rest?.remainingSec).toBe(90);
  });

  it('navigates to ExerciseSelection for in-workout add', async () => {
    setActiveWorkoutSession(createWorkoutSession());
    const { getByTestId } = await render(<ActiveWorkoutRouteScreen />);
    await fireEvent.press(getByTestId('active-workout-add-exercise'));
    expect(mockNavigate).toHaveBeenCalledWith('ExerciseSelection');
  });

  it('marks 05N on 02D start when a mock session is already active', async () => {
    setActiveWorkoutSession(createWorkoutSession());
    const { getByTestId } = await render(<RoutineDetailRouteScreen />);
    await fireEvent.press(getByTestId('routine-detail-start-workout'));
    expect(getActiveWorkoutSession()?.overlay).toBe('otherIncomplete');
    expect(mockNavigate).toHaveBeenCalledWith('ActiveWorkout');
  });

  it('shows 05N when a session is already marked other-incomplete', async () => {
    setActiveWorkoutSession({
      ...createWorkoutSession(),
      overlay: 'otherIncomplete',
      pendingOtherRoutineId: 'pull-day',
    });
    const { getByTestId } = await render(<ActiveWorkoutRouteScreen />);
    expect(getByTestId('workout-other-incomplete')).toBeTruthy();
  });
});
