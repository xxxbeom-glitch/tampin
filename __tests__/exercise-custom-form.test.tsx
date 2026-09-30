import { fireEvent, render } from '@testing-library/react-native';
import {
  CustomExerciseFormScreen,
  emptyCustomDraftFixture,
  validCustomDraftFixture,
} from '../src/features/exercise';

describe('DEV-014 CustomExerciseFormScreen', () => {
  it('keeps save disabled until name and primary muscle are present', async () => {
    const { getByTestId } = await render(
      <CustomExerciseFormScreen draft={emptyCustomDraftFixture} mode="create" />,
    );

    expect(getByTestId('custom-exercise-save').props.accessibilityState).toMatchObject({
      disabled: true,
    });
  });

  it('enables save on a valid create draft', async () => {
    const onSave = jest.fn();
    const { getByTestId, getByText } = await render(
      <CustomExerciseFormScreen
        draft={validCustomDraftFixture}
        mode="create"
        onSave={onSave}
      />,
    );

    expect(getByText('직접 운동 만들기')).toBeTruthy();
    expect(getByTestId('custom-exercise-save').props.accessibilityState).toMatchObject({
      disabled: false,
    });
    await fireEvent.press(getByTestId('custom-exercise-save'));
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('locks recording type and shows the persistent hint when history exists', async () => {
    const onOpenRecordingType = jest.fn();
    const { getByTestId, getByText } = await render(
      <CustomExerciseFormScreen
        draft={validCustomDraftFixture}
        historyLocked
        mode="edit"
        onOpenRecordingType={onOpenRecordingType}
      />,
    );

    expect(getByText('운동 수정')).toBeTruthy();
    expect(getByTestId('custom-exercise-history-lock-hint')).toBeTruthy();
    expect(getByText('기록이 있는 운동은 기록 방식을 변경할 수 없어요.')).toBeTruthy();
    await fireEvent.press(getByTestId('custom-exercise-recording-type'));
    expect(onOpenRecordingType).not.toHaveBeenCalled();
  });
});
