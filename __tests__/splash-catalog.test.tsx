import { render } from '@testing-library/react-native';
import { catalogEntries } from '../src/debug/ui-catalog/registry/catalogEntries';
import { SplashCatalogDetail } from '../src/debug/ui-catalog/components/SplashCatalogDetail';

describe('DEV-009 Splash catalog preset', () => {
  it('registers the canonical 00_Splash catalog entry', () => {
    expect(catalogEntries.some((entry) => entry.id === '00-splash-default')).toBe(
      true,
    );
  });

  it('renders deterministic splash catalog state', async () => {
    const entry = catalogEntries.find((item) => item.id === '00-splash-default');
    expect(entry).toBeDefined();

    const { getByTestId } = await render(
      <SplashCatalogDetail
        entryId="00-splash-default"
        frameName={entry!.frameName}
        stateLabel={entry!.stateLabel}
      />,
    );

    expect(getByTestId('catalog-splash-00-splash-default')).toBeTruthy();
    expect(getByTestId('splash-screen')).toBeTruthy();
    expect(getByTestId('splash-wordmark')).toBeTruthy();
  });
});
