import { fireEvent, render } from '@testing-library/react-native';
import { exerciseCatalogFixture } from '../src/features/exercise';
import { RoutineCreateScreen, toRoutineCreateDraftExercise } from '../src/features/routine';

const bench = exerciseCatalogFixture.find((item) => item.id === 'bench-press');
const latPulldown = exerciseCatalogFixture.find((item) => item.id === 'lat-pulldown');

if (!bench || !latPulldown) {
  throw new Error('expected catalog fixtures');
}

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
        exercises={[toRoutineCreateDraftExercise(bench)]}
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

  it('reuses the existing draft meta line for a stored attachment', async () => {
    const { getByText } = await render(
      <RoutineCreateScreen
        exercises={[toRoutineCreateDraftExercise(latPulldown, '스트레이트 바')]}
        folderName="PPL Routine"
        routineName=""
      />,
    );

    expect(getByText('광배근 · 케이블 · 스트레이트 바')).toBeTruthy();
  });
});
