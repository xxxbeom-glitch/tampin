import { render } from '@testing-library/react-native';
import { ExerciseCatalogDetail } from '../src/debug/ui-catalog/components/ExerciseCatalogDetail';
import {
  exerciseCatalogPresets,
  isExerciseCatalogEntryId,
  type ExerciseCatalogEntryId,
} from '../src/debug/ui-catalog/fake/exerciseFake';
import { catalogEntries } from '../src/debug/ui-catalog/registry/catalogEntries';

const entryIds = Object.keys(exerciseCatalogPresets) as ExerciseCatalogEntryId[];

describe('DEV-014 exercise catalog', () => {
  it('registers every Group 04 top-level state', () => {
    expect(entryIds).toHaveLength(29);
    for (const id of entryIds) {
      expect(catalogEntries.some((entry) => entry.id === id)).toBe(true);
      expect(isExerciseCatalogEntryId(id)).toBe(true);
    }
  });

  it.each(entryIds)('renders catalog state %s', async (entryId) => {
    const entry = catalogEntries.find((item) => item.id === entryId);
    expect(entry).toBeDefined();

    const { getByTestId } = await render(
      <ExerciseCatalogDetail
        entryId={entryId}
        frameName={entry!.frameName}
        stateLabel={entry!.stateLabel}
      />,
    );

    expect(getByTestId(`catalog-exercise-${entryId}`)).toBeTruthy();
  });
});
