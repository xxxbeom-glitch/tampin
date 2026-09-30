import { render } from '@testing-library/react-native';
import { catalogEntries } from '../src/debug/ui-catalog/registry/catalogEntries';
import { BasicInfoCatalogDetail } from '../src/debug/ui-catalog/components/BasicInfoCatalogDetail';

const basicInfoEntryIds = [
  '01c-basic-info-default',
  '01c1-basic-info-error',
  '01c2-basic-info-focused',
  '01c3-basic-info-filled',
  '01c4-basic-info-disabled',
] as const;

describe('DEV-007 Basic Info catalog presets', () => {
  it('registers all five canonical 01C catalog entries', () => {
    for (const id of basicInfoEntryIds) {
      expect(catalogEntries.some((entry) => entry.id === id)).toBe(true);
    }
  });

  it.each(basicInfoEntryIds)(
    'renders deterministic catalog state for %s',
    async (entryId) => {
      const entry = catalogEntries.find((item) => item.id === entryId);
      expect(entry).toBeDefined();

      const { getByTestId } = await render(
        <BasicInfoCatalogDetail
          entryId={entryId}
          frameName={entry!.frameName}
          stateLabel={entry!.stateLabel}
        />,
      );

      expect(getByTestId(`catalog-basic-info-${entryId}`)).toBeTruthy();
      expect(getByTestId('basic-info-form-screen')).toBeTruthy();
    },
  );
});
