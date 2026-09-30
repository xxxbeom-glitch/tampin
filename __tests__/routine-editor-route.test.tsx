import { act, cleanup, fireEvent, render } from '@testing-library/react-native';
import { RoutineEditorRouteScreen } from '../src/app/navigation/screens/RoutineEditorRouteScreen';
import { exerciseCatalogFixture } from '../src/features/exercise';
import {
  clearRoutineCreateDraftExercises,
  getRoutineCreateDraftExercises,
  setRoutineCreateDraftExercises,
  toRoutineCreateDraftExercise,
} from '../src/features/routine';

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
const listeners: Partial<Record<string, () => void>> = {};
const mockAddListener = jest.fn((event: string, callback: () => void) => {
  listeners[event] = callback;
  return () => {
    if (listeners[event] === callback) {
      delete listeners[event];
    }
  };
});
const mockNavigation = {
  goBack: mockGoBack,
  navigate: mockNavigate,
  addListener: mockAddListener,
};

const bench = exerciseCatalogFixture.find((item) => item.id === 'bench-press');

if (!bench) {
  throw new Error('expected bench-press fixture');
}

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => mockNavigation,
  };
});

async function enterCreate(view: Awaited<ReturnType<typeof render>>) {
  await fireEvent.press(view.getByTestId('routine-folder-option-ppl-routine'));
  await fireEvent.press(view.getByTestId('routine-folder-entry-continue'));
}

describe('DEV-013 RoutineEditorRouteScreen', () => {
  beforeEach(() => {
    mockGoBack.mockClear();
    mockNavigate.mockClear();
    mockAddListener.mockClear();
    Object.keys(listeners).forEach((key) => {
      delete listeners[key];
    });
    clearRoutineCreateDraftExercises();
    cleanup();
  });

  afterEach(() => {
    cleanup();
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

  it('enters the Group 04 selection flow from routine-create 운동 추가', async () => {
    const view = await render(<RoutineEditorRouteScreen />);
    await enterCreate(view);
    await fireEvent.press(view.getByTestId('routine-create-add-exercise'));

    expect(mockNavigate).toHaveBeenCalledWith('ExerciseSelection');
  });

  it('does not leak a leftover global draft into a newly started create session', async () => {
    setRoutineCreateDraftExercises([toRoutineCreateDraftExercise(bench)]);

    const view = await render(<RoutineEditorRouteScreen />);
    await enterCreate(view);

    expect(view.queryByTestId('routine-create-draft-exercises')).toBeNull();
    expect(getRoutineCreateDraftExercises()).toEqual([]);
  });

  it('restores confirmed selections only when the real focus listener runs', async () => {
    const view = await render(<RoutineEditorRouteScreen />);
    await enterCreate(view);

    expect(view.queryByTestId('routine-create-draft-exercises')).toBeNull();

    setRoutineCreateDraftExercises([toRoutineCreateDraftExercise(bench)]);
    await act(async () => {
      listeners.focus?.();
    });

    expect(view.getByTestId('routine-create-draft-exercises')).toBeTruthy();
    expect(view.getByText('선택한 운동 (1개)')).toBeTruthy();
    expect(view.getByText('벤치프레스')).toBeTruthy();
  });

  it('clears the mock session when the create flow is removed, then starts empty', async () => {
    const first = await render(<RoutineEditorRouteScreen />);
    await enterCreate(first);
    setRoutineCreateDraftExercises([toRoutineCreateDraftExercise(bench)]);
    await act(async () => {
      listeners.focus?.();
    });
    expect(first.getByText('벤치프레스')).toBeTruthy();

    await fireEvent.press(first.getByTestId('routine-create-back'));
    await fireEvent.press(first.getByTestId('routine-folder-entry-back'));
    listeners.beforeRemove?.();

    expect(getRoutineCreateDraftExercises()).toEqual([]);
    expect(first.queryByText('벤치프레스')).toBeNull();
  });

  it('keeps the mock draft when create Back stays inside the same session', async () => {
    const view = await render(<RoutineEditorRouteScreen />);
    await enterCreate(view);
    setRoutineCreateDraftExercises([toRoutineCreateDraftExercise(bench)]);
    await act(async () => {
      listeners.focus?.();
    });
    expect(view.getByText('벤치프레스')).toBeTruthy();

    await fireEvent.press(view.getByTestId('routine-create-back'));
    expect(view.getByTestId('routine-folder-entry-screen')).toBeTruthy();
    expect(getRoutineCreateDraftExercises()).toHaveLength(1);

    await enterCreate(view);
    expect(view.getByText('벤치프레스')).toBeTruthy();
  });
});
