import { render } from '@testing-library/react-native';
import { catalogEntries } from '../src/debug/ui-catalog/registry/catalogEntries';
import { RoutineDetailCatalogDetail } from '../src/debug/ui-catalog/components/RoutineDetailCatalogDetail';

describe('DEV-011 Routine Detail catalog preset', () => {
  it('registers the canonical Routine Detail catalog entry', () => {
    expect(
      catalogEntries.some((entry) => entry.id === '02d-routine-detail-default'),
    ).toBe(true);
  });

  it('renders deterministic catalog state for 02d-routine-detail-default', async () => {
    const entry = catalogEntries.find((item) => item.id === '02d-routine-detail-default');
    expect(entry).toBeDefined();

    const { getByTestId, getByText } = await render(
      <RoutineDetailCatalogDetail
        entryId="02d-routine-detail-default"
        frameName={entry!.frameName}
        stateLabel={entry!.stateLabel}
      />,
    );

    expect(getByTestId('catalog-routine-detail-02d-routine-detail-default')).toBeTruthy();
    expect(getByTestId('routine-detail-screen')).toBeTruthy();
    expect(getByText('상체 루틴 A')).toBeTruthy();
  });
});
