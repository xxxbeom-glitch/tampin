import { fireEvent, render } from '@testing-library/react-native';
import { RoutineCreateScreen } from '../src/features/routine';

describe('DEV-013 RoutineCreateScreen', () => {
  it('renders the current Figma folder-first field order and disabled save', async () => {
    const { getByTestId, getByText } = await render(
      <RoutineCreateScreen folderName="PPL Routine" routineName="" />,
    );

    expect(getByText('폴더 이름')).toBeTruthy();
    expect(getByTestId('routine-create-folder-name').props.value).toBe(
      'PPL Routine',
    );
    expect(getByTestId('routine-create-folder-name').props.editable).toBe(false);
    expect(getByTestId('routine-create-routine-name')).toBeTruthy();
    expect(getByText('운동 추가')).toBeTruthy();
    expect(getByTestId('routine-create-save').props.accessibilityState).toMatchObject({
      disabled: true,
    });
  });

  it('keeps routine-name input local to the rendering contract', async () => {
    const onRoutineNameChange = jest.fn();
    const { getByTestId } = await render(
      <RoutineCreateScreen
        folderName="PPL Routine"
        onRoutineNameChange={onRoutineNameChange}
        routineName=""
      />,
    );

    await fireEvent.changeText(
      getByTestId('routine-create-routine-name'),
      '상체 루틴',
    );

    expect(onRoutineNameChange).toHaveBeenCalledWith('상체 루틴');
  });

  it('shows confirmed mock draft exercises without claiming persistence', async () => {
    const { getByTestId, getByText } = await render(
      <RoutineCreateScreen
        exercises={[
          {
            id: 'bench-press',
            name: '벤치프레스',
            equipment: '바벨',
            primaryMuscle: '대흉근',
            thumbnailKey: 'smithBenchPress',
          },
        ]}
        folderName="PPL Routine"
        routineName=""
      />,
    );

    expect(getByTestId('routine-create-draft-exercises')).toBeTruthy();
    expect(getByText('선택한 운동 (1개)')).toBeTruthy();
    expect(getByTestId('routine-create-draft-bench-press')).toBeTruthy();
    expect(getByText('대흉근 · 바벨')).toBeTruthy();
    expect(getByTestId('routine-create-save').props.accessibilityState).toMatchObject({
      disabled: true,
    });
  });
});
