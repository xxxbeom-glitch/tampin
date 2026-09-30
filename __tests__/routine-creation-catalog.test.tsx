import { render } from '@testing-library/react-native';
import { RoutineCreationCatalogDetail } from '../src/debug/ui-catalog/components/RoutineCreationCatalogDetail';
import {
  isRoutineCreationCatalogEntryId,
  type RoutineCreationCatalogEntryId,
} from '../src/debug/ui-catalog/fake/routineCreationFake';
import { catalogEntries } from '../src/debug/ui-catalog/registry/catalogEntries';

const entryIds: RoutineCreationCatalogEntryId[] = [
  '02e-folder-entry-selected',
  '02e-folder-entry-new-name',
  '02e-routine-create-folder-prefilled',
];

describe('DEV-013 routine creation catalog', () => {
  it('registers every deterministic folder-first state', () => {
    for (const id of entryIds) {
      expect(catalogEntries.some((entry) => entry.id === id)).toBe(true);
      expect(isRoutineCreationCatalogEntryId(id)).toBe(true);
    }
  });

  it.each(entryIds)('renders catalog state %s', async (entryId) => {
    const entry = catalogEntries.find((item) => item.id === entryId);
    expect(entry).toBeDefined();

    const { getByTestId } = await render(
      <RoutineCreationCatalogDetail
        entryId={entryId}
        frameName={entry!.frameName}
        stateLabel={entry!.stateLabel}
      />,
    );

    expect(
      getByTestId(`catalog-routine-creation-${entryId}`),
    ).toBeTruthy();
  });
});
