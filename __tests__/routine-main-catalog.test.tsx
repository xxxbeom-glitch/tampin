import { render } from '@testing-library/react-native';
import { catalogEntries } from '../src/debug/ui-catalog/registry/catalogEntries';
import { RoutineMainCatalogDetail } from '../src/debug/ui-catalog/components/RoutineMainCatalogDetail';

const routineMainEntryIds = [
  '02a-routine-main-with-routines',
  '02b-routine-main-empty',
] as const;

describe('DEV-010 Routine Main catalog presets', () => {
  it('registers both canonical Routine Main catalog entries', () => {
    for (const id of routineMainEntryIds) {
      expect(catalogEntries.some((entry) => entry.id === id)).toBe(true);
    }
  });

  it.each(routineMainEntryIds)(
    'renders deterministic catalog state for %s',
    async (entryId) => {
      const entry = catalogEntries.find((item) => item.id === entryId);
      expect(entry).toBeDefined();

      const { getByTestId } = await render(
        <RoutineMainCatalogDetail
          entryId={entryId}
          frameName={entry!.frameName}
          stateLabel={entry!.stateLabel}
        />,
      );

      expect(getByTestId(`catalog-routine-main-${entryId}`)).toBeTruthy();
      expect(getByTestId('routine-main-screen')).toBeTruthy();
    },
  );

  it('renders routine cards only in WithRoutines catalog preset', async () => {
    const withRoutines = await render(
      <RoutineMainCatalogDetail
        entryId="02a-routine-main-with-routines"
        frameName="02A_Routine_Main"
        stateLabel="WithRoutines"
      />,
    );

    expect(withRoutines.getByTestId('routine-card-push-day')).toBeTruthy();

    const empty = await render(
      <RoutineMainCatalogDetail
        entryId="02b-routine-main-empty"
        frameName="02B_Routine_Main_Empty"
        stateLabel="Empty"
      />,
    );

    expect(empty.queryByTestId('routine-card-push-day')).toBeNull();
  });
});
