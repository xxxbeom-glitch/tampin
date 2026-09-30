import { fireEvent, render } from '@testing-library/react-native';
import {
  RoutineFolderEntryScreen,
  routineFolderEntryDefaultFixture,
} from '../src/features/routine';

describe('DEV-013 RoutineFolderEntryScreen', () => {
  it('requires folder selection or a nonblank new folder name', async () => {
    const { getByTestId } = await render(
      <RoutineFolderEntryScreen
        {...routineFolderEntryDefaultFixture}
      />,
    );

    expect(
      getByTestId('routine-folder-entry-continue').props.accessibilityState,
    ).toMatchObject({ disabled: true });
  });

  it('emits existing selection, new name, and continue separately', async () => {
    const onSelectFolder = jest.fn();
    const onNewFolderNameChange = jest.fn();
    const onContinue = jest.fn();
    const { getByTestId } = await render(
      <RoutineFolderEntryScreen
        {...routineFolderEntryDefaultFixture}
        onContinue={onContinue}
        onNewFolderNameChange={onNewFolderNameChange}
        onSelectFolder={onSelectFolder}
        selectedFolderId="ppl-routine"
      />,
    );

    await fireEvent.press(getByTestId('routine-folder-option-three-day-split'));
    await fireEvent.changeText(
      getByTestId('routine-folder-entry-new-name'),
      '새 폴더',
    );
    await fireEvent.press(getByTestId('routine-folder-entry-continue'));

    expect(onSelectFolder).toHaveBeenCalledWith('three-day-split');
    expect(onNewFolderNameChange).toHaveBeenCalledWith('새 폴더');
    expect(onContinue).toHaveBeenCalledTimes(1);
  });
});
