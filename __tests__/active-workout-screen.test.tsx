import { fireEvent, render } from '@testing-library/react-native';
import { ActiveWorkoutScreen } from '../src/features/workout/ActiveWorkoutScreen';
import {
  createWorkoutSession,
  pausedElapsedSession,
  replaceCandidateBatches,
  sessionWithOverlay,
} from '../src/features/workout';

const noopThumb = () => undefined;

function renderWorkout(session = createWorkoutSession(), extras?: Partial<Parameters<typeof ActiveWorkoutScreen>[0]>) {
  return render(
    <ActiveWorkoutScreen
      displayElapsed="00:32:16"
      replaceCandidates={replaceCandidateBatches}
      session={session}
      thumbnailFor={noopThumb}
      {...extras}
    />,
  );
}

describe('Group 05 ActiveWorkoutScreen', () => {
  it('renders 05A header elapsed without pause/play and with horizontal more', async () => {
    const { getByTestId, queryByText } = await renderWorkout();

    expect(getByTestId('active-workout-elapsed').props.children).toBe('00:32:16');
    expect(getByTestId('active-workout-more')).toBeTruthy();
    expect(queryByText('일시정지')).toBeNull();
    expect(queryByText('재생')).toBeNull();
  });

  it('applies 50% opacity when elapsed is paused', async () => {
    const { getByTestId } = await renderWorkout(pausedElapsedSession());

    expect(getByTestId('active-workout-elapsed').props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ opacity: 0.5 })]),
    );
  });

  it('calls onOpenHeaderMenu from the right more action', async () => {
    const onOpenHeaderMenu = jest.fn();
    const { getByTestId } = await renderWorkout(createWorkoutSession(), { onOpenHeaderMenu });

    await fireEvent.press(getByTestId('active-workout-more'));
    expect(onOpenHeaderMenu).toHaveBeenCalled();
  });

  it('renders 05I header menu rows from a preloaded overlay', async () => {
    const { getByTestId } = await renderWorkout(sessionWithOverlay('headerMenu'));

    expect(getByTestId('workout-menu-end')).toBeTruthy();
    expect(getByTestId('workout-menu-add-exercise')).toBeTruthy();
    expect(getByTestId('workout-menu-timer')).toBeTruthy();
  });

  it('shows rest sheet skip / ±15 and no rest pause', async () => {
    const onSkip = jest.fn();
    const onAdjustRest = jest.fn();
    const { getByText, getByTestId, queryByText } = await renderWorkout(
      sessionWithOverlay('rest'),
      { onAdjustRest, onSkipRest: onSkip },
    );

    expect(getByTestId('workout-timer-remaining').props.children).toBe('01:29');
    expect(getByText('휴식 건너뛰기')).toBeTruthy();
    expect(getByTestId('workout-rest-minus')).toBeTruthy();
    expect(queryByText('일시정지')).toBeNull();
    await fireEvent.press(getByTestId('workout-rest-minus'));
    await fireEvent.press(getByTestId('workout-rest-plus'));
    await fireEvent.press(getByTestId('workout-rest-skip'));
    await fireEvent.press(getByTestId('workout-rest-overlay'));
    expect(onAdjustRest).toHaveBeenNthCalledWith(1, -15);
    expect(onAdjustRest).toHaveBeenNthCalledWith(2, 15);
    expect(onSkip).toHaveBeenCalledTimes(2);
  });

  it('renders 05Q idle CTA and frozen 01:30', async () => {
    const onStartManual = jest.fn();
    const onAdjustManual = jest.fn();
    const { getByText, getByTestId } = await renderWorkout(sessionWithOverlay('manualIdle'), {
      onAdjustManual,
      onStartManual,
    });
    expect(getByTestId('workout-timer-remaining').props.children).toBe('01:30');
    expect(getByText('타이머 시작')).toBeTruthy();
    await fireEvent.press(getByTestId('workout-manual-start'));
    await fireEvent.press(getByTestId('workout-manual-minus'));
    expect(onStartManual).toHaveBeenCalled();
    expect(onAdjustManual).toHaveBeenCalledWith(-15);
  });

  it('renders 05Q running CTA and frozen 01:12', async () => {
    const onPauseManual = jest.fn();
    const { getByText, getByTestId } = await renderWorkout(sessionWithOverlay('manualRunning'), {
      onPauseManual,
    });
    expect(getByTestId('workout-timer-remaining').props.children).toBe('01:12');
    expect(getByText('일시정지')).toBeTruthy();
    await fireEvent.press(getByTestId('workout-manual-pause'));
    expect(onPauseManual).toHaveBeenCalled();
  });

  it('renders 05Q paused reset / resume CTAs', async () => {
    const onResetManual = jest.fn();
    const onResumeManual = jest.fn();
    const onDismissManual = jest.fn();
    const { getByText, getByTestId } = await renderWorkout(sessionWithOverlay('manualPaused'), {
      onDismissManual,
      onResetManual,
      onResumeManual,
    });
    expect(getByTestId('workout-timer-remaining').props.children).toBe('01:12');
    expect(getByText('초기화')).toBeTruthy();
    expect(getByText('계속 진행')).toBeTruthy();
    await fireEvent.press(getByTestId('workout-manual-reset'));
    await fireEvent.press(getByTestId('workout-manual-resume'));
    await fireEvent.press(getByTestId('workout-manual-overlay'));
    expect(onResetManual).toHaveBeenCalled();
    expect(onResumeManual).toHaveBeenCalled();
    expect(onDismissManual).toHaveBeenCalled();
  });

  it('maps 05A card buttons to mock handlers', async () => {
    const onToggleSet = jest.fn();
    const onAddSet = jest.fn();
    const onDeleteSet = jest.fn();
    const onOpenExerciseMenu = jest.fn();
    const { getByTestId } = await renderWorkout(createWorkoutSession(), {
      onAddSet,
      onDeleteSet,
      onOpenExerciseMenu,
      onToggleSet,
    });
    await fireEvent.press(getByTestId('workout-set-done-chest-2'));
    await fireEvent.press(getByTestId('workout-add-set-chest-press-machine'));
    await fireEvent.press(getByTestId('workout-delete-set-chest-press-machine'));
    await fireEvent.press(getByTestId('workout-exercise-more-chest-press-machine'));
    expect(onToggleSet).toHaveBeenCalledWith('chest-press-machine', 'chest-2');
    expect(onAddSet).toHaveBeenCalledWith('chest-press-machine');
    expect(onDeleteSet).toHaveBeenCalledWith('chest-press-machine');
    expect(onOpenExerciseMenu).toHaveBeenCalledWith('chest-press-machine');
  });

  it('maps 05I rows to mock handlers', async () => {
    const onRequestEnd = jest.fn();
    const onAddExercise = jest.fn();
    const onOpenManual = jest.fn();
    const { getByTestId } = await renderWorkout(sessionWithOverlay('headerMenu'), {
      onAddExercise,
      onOpenManual,
      onRequestEnd,
    });
    await fireEvent.press(getByTestId('workout-menu-end'));
    await fireEvent.press(getByTestId('workout-menu-add-exercise'));
    await fireEvent.press(getByTestId('workout-menu-timer'));
    expect(onRequestEnd).toHaveBeenCalled();
    expect(onAddExercise).toHaveBeenCalled();
    expect(onOpenManual).toHaveBeenCalled();
  });

  it('maps card menu rows to mock handlers', async () => {
    const onOpenReplace = jest.fn();
    const onOpenReorder = jest.fn();
    const onDeleteExercise = jest.fn();
    const { getByTestId } = await renderWorkout(sessionWithOverlay('exerciseMenu'), {
      onDeleteExercise,
      onOpenReorder,
      onOpenReplace,
    });
    await fireEvent.press(getByTestId('workout-exercise-menu-replace'));
    await fireEvent.press(getByTestId('workout-exercise-menu-reorder'));
    await fireEvent.press(getByTestId('workout-exercise-menu-delete'));
    expect(onOpenReplace).toHaveBeenCalled();
    expect(onOpenReorder).toHaveBeenCalled();
    expect(onDeleteExercise).toHaveBeenCalled();
  });

  it('maps 05K dialog buttons', async () => {
    const onConfirmEnd = jest.fn();
    const onContinueCurrentWorkout = jest.fn();
    const { getByTestId } = await renderWorkout(sessionWithOverlay('endIncomplete'), {
      onConfirmEnd,
      onContinueCurrentWorkout,
    });
    await fireEvent.press(getByTestId('workout-end-incomplete-primary'));
    await fireEvent.press(getByTestId('workout-end-incomplete-secondary'));
    expect(onConfirmEnd).toHaveBeenCalled();
    expect(onContinueCurrentWorkout).toHaveBeenCalled();
  });

  it('maps 05O dialog buttons', async () => {
    const onConfirmUpdateRoutine = jest.fn();
    const onApplyTodayOnly = jest.fn();
    const { getByTestId } = await renderWorkout(sessionWithOverlay('updateRoutine'), {
      onApplyTodayOnly,
      onConfirmUpdateRoutine,
    });
    await fireEvent.press(getByTestId('workout-update-routine-primary'));
    await fireEvent.press(getByTestId('workout-update-routine-secondary'));
    expect(onConfirmUpdateRoutine).toHaveBeenCalled();
    expect(onApplyTodayOnly).toHaveBeenCalled();
  });

  it('maps 05L confirm', async () => {
    const onConfirmEnd = jest.fn();
    const { getByTestId } = await renderWorkout(sessionWithOverlay('endComplete'), { onConfirmEnd });
    await fireEvent.press(getByTestId('workout-end-complete-primary'));
    expect(onConfirmEnd).toHaveBeenCalled();
  });

  it('maps 05M confirm', async () => {
    const onConfirmDiscard = jest.fn();
    const { getByTestId } = await renderWorkout(sessionWithOverlay('discard'), { onConfirmDiscard });
    await fireEvent.press(getByTestId('workout-discard-primary'));
    expect(onConfirmDiscard).toHaveBeenCalled();
  });

  it('maps 05N confirm', async () => {
    const onEndThenStartOther = jest.fn();
    const { getByTestId } = await renderWorkout(sessionWithOverlay('otherIncomplete'), {
      onEndThenStartOther,
    });
    await fireEvent.press(getByTestId('workout-other-incomplete-primary'));
    expect(onEndThenStartOther).toHaveBeenCalled();
  });

  it('maps 05P confirm', async () => {
    const onConfirmReplaceDelete = jest.fn();
    const { getByTestId } = await renderWorkout(sessionWithOverlay('replaceConfirm'), {
      onConfirmReplaceDelete,
    });
    await fireEvent.press(getByTestId('workout-replace-delete-primary'));
    expect(onConfirmReplaceDelete).toHaveBeenCalled();
  });

  it('maps 05G/H replace buttons', async () => {
    const onSelectReplace = jest.fn();
    const onCycleReplaceBatch = jest.fn();
    const onConfirmReplace = jest.fn();
    const { getByTestId } = await renderWorkout(
      sessionWithOverlay('replace', { replaceSelectedId: 'incline-bench' }),
      { onConfirmReplace, onCycleReplaceBatch, onSelectReplace },
    );
    await fireEvent.press(getByTestId('workout-replace-item-incline-bench'));
    await fireEvent.press(getByTestId('workout-replace-other'));
    await fireEvent.press(getByTestId('workout-replace-confirm'));
    expect(onSelectReplace).toHaveBeenCalledWith('incline-bench');
    expect(onCycleReplaceBatch).toHaveBeenCalled();
    expect(onConfirmReplace).toHaveBeenCalled();
  });

  it('maps 05J reorder handle and 완료', async () => {
    const onMoveExerciseDown = jest.fn();
    const onConfirmReorder = jest.fn();
    const { getByTestId } = await renderWorkout(sessionWithOverlay('reorder'), {
      onConfirmReorder,
      onMoveExerciseDown,
    });
    await fireEvent.press(getByTestId('workout-reorder-handle-chest-press-machine'));
    await fireEvent.press(getByTestId('workout-reorder-done'));
    expect(onMoveExerciseDown).toHaveBeenCalledWith('chest-press-machine');
    expect(onConfirmReorder).toHaveBeenCalled();
  });

  it('renders 05K incomplete end copy', async () => {
    const { getByText } = await renderWorkout(sessionWithOverlay('endIncomplete'));
    expect(getByText('종료하고 저장')).toBeTruthy();
  });

  it('renders 05M discard copy', async () => {
    const { getByText } = await renderWorkout(sessionWithOverlay('discard'));
    expect(getByText('기록 삭제')).toBeTruthy();
  });

  it('renders 05G replace copy', async () => {
    const { getByText } = await renderWorkout(sessionWithOverlay('replace'));
    expect(getByText('대체 운동 선택')).toBeTruthy();
    expect(getByText('다른 운동 보기')).toBeTruthy();
  });
});
