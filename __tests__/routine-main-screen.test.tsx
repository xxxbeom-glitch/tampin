import { fireEvent, render } from '@testing-library/react-native';
import {
  RoutineMainScreen,
  routineMainEmptyFixture,
  routineMainWithRoutinesFixture,
} from '../src/features/routine';

describe('DEV-010 RoutineMainScreen', () => {
  it('renders WithRoutines state with title, quick actions, folders, and bottom bar', async () => {
    const { getByRole, getByTestId, getByText } = await render(
      <RoutineMainScreen
        folders={routineMainWithRoutinesFixture.folders}
        readOnly
        state="WithRoutines"
      />,
    );

    expect(getByTestId('routine-main-screen')).toBeTruthy();
    expect(getByRole('header')).toHaveTextContent('루틴');
    expect(getByTestId('routine-quickstart-without-routine')).toBeTruthy();
    expect(getByTestId('routine-quickstart-create-routine')).toBeTruthy();
    expect(getByText('루틴 없이 시작')).toBeTruthy();
    expect(getByText('새 루틴 만들기')).toBeTruthy();
    expect(getByTestId('routine-folder-ppl-routine')).toBeTruthy();
    expect(getByTestId('routine-card-push-day')).toBeTruthy();
    expect(getByTestId('routine-card-pull-day')).toBeTruthy();
    expect(getByTestId('routine-card-leg-day')).toBeTruthy();
    expect(getByTestId('routine-folder-three-day-split')).toBeTruthy();
    expect(getByTestId('routine-main-bottom-app-bar')).toBeTruthy();
    expect(getByTestId('routine-main-tab-routine')).toBeTruthy();
    expect(getByTestId('routine-main-tab-analysis')).toBeTruthy();
    expect(getByTestId('routine-main-tab-settings')).toBeTruthy();
  });

  it('renders Empty state with identical quick actions and no routine folders', async () => {
    const { getByTestId, queryByTestId } = await render(
      <RoutineMainScreen
        folders={routineMainEmptyFixture.folders}
        readOnly
        state="Empty"
      />,
    );

    expect(getByTestId('routine-quickstart-without-routine')).toBeTruthy();
    expect(getByTestId('routine-quickstart-create-routine')).toBeTruthy();
    expect(queryByTestId('routine-folder-ppl-routine')).toBeNull();
    expect(queryByTestId('routine-card-push-day')).toBeNull();
  });

  it('exposes accessibility roles for quick actions and bottom tabs', async () => {
    const { getByTestId } = await render(
      <RoutineMainScreen
        folders={routineMainEmptyFixture.folders}
        onCreateRoutine={jest.fn()}
        onOpenAnalysis={jest.fn()}
        onOpenSettings={jest.fn()}
        onQuickStartWithoutRoutine={jest.fn()}
        state="Empty"
      />,
    );

    expect(getByTestId('routine-quickstart-without-routine').props.accessibilityRole).toBe(
      'button',
    );
    expect(getByTestId('routine-main-tab-analysis').props.accessibilityRole).toBe(
      'button',
    );
    expect(getByTestId('routine-main-tab-routine').props.accessibilityState.selected).toBe(
      true,
    );
  });

  it('invokes route callbacks for quick actions and bottom tabs', async () => {
    const onQuickStartWithoutRoutine = jest.fn();
    const onCreateRoutine = jest.fn();
    const onOpenAnalysis = jest.fn();
    const onOpenSettings = jest.fn();

    const { getByTestId } = await render(
      <RoutineMainScreen
        folders={routineMainEmptyFixture.folders}
        onCreateRoutine={onCreateRoutine}
        onOpenAnalysis={onOpenAnalysis}
        onOpenSettings={onOpenSettings}
        onQuickStartWithoutRoutine={onQuickStartWithoutRoutine}
        state="Empty"
      />,
    );

    await fireEvent.press(getByTestId('routine-quickstart-without-routine'));
    await fireEvent.press(getByTestId('routine-quickstart-create-routine'));
    await fireEvent.press(getByTestId('routine-main-tab-analysis'));
    await fireEvent.press(getByTestId('routine-main-tab-settings'));

    expect(onQuickStartWithoutRoutine).toHaveBeenCalledTimes(1);
    expect(onCreateRoutine).toHaveBeenCalledTimes(1);
    expect(onOpenAnalysis).toHaveBeenCalledTimes(1);
    expect(onOpenSettings).toHaveBeenCalledTimes(1);
  });

  it('does not invoke callbacks when readOnly', async () => {
    const onQuickStartWithoutRoutine = jest.fn();

    const { getByTestId } = await render(
      <RoutineMainScreen
        folders={routineMainEmptyFixture.folders}
        onQuickStartWithoutRoutine={onQuickStartWithoutRoutine}
        readOnly
        state="Empty"
      />,
    );

    await fireEvent.press(getByTestId('routine-quickstart-without-routine'));
    expect(onQuickStartWithoutRoutine).not.toHaveBeenCalled();
    expect(
      getByTestId('routine-quickstart-without-routine').props.accessibilityState.disabled,
    ).toBe(true);
  });
});
