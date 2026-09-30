import { render } from '@testing-library/react-native';
import { catalogEntries } from '../src/debug/ui-catalog/registry/catalogEntries';
import { LoginCatalogDetail } from '../src/debug/ui-catalog/components/LoginCatalogDetail';

const loginEntryIds = [
  '01a-login-ready',
  '01a-login-unavailable',
  '01a-login-busy',
  '01a1-login-error-dialog-reference',
] as const;

describe('DEV-008 Login catalog presets', () => {
  it('registers all four canonical Login catalog entries', () => {
    for (const id of loginEntryIds) {
      expect(catalogEntries.some((entry) => entry.id === id)).toBe(true);
    }
  });

  it.each(loginEntryIds)(
    'renders deterministic catalog state for %s',
    async (entryId) => {
      const entry = catalogEntries.find((item) => item.id === entryId);
      expect(entry).toBeDefined();

      const { getByTestId } = await render(
        <LoginCatalogDetail
          entryId={entryId}
          frameName={entry!.frameName}
          stateLabel={entry!.stateLabel}
        />,
      );

      expect(getByTestId(`catalog-login-${entryId}`)).toBeTruthy();
      expect(getByTestId('login-form-screen')).toBeTruthy();
    },
  );

  it('shows the error dialog reference overlay without navigation behavior', async () => {
    const entry = catalogEntries.find(
      (item) => item.id === '01a1-login-error-dialog-reference',
    );

    const { getByTestId, getByText } = await render(
      <LoginCatalogDetail
        entryId="01a1-login-error-dialog-reference"
        frameName={entry!.frameName}
        stateLabel={entry!.stateLabel}
      />,
    );

    expect(getByTestId('login-error-dialog')).toBeTruthy();
    expect(getByText('로그인에 실패했어요')).toBeTruthy();
    expect(getByText('잠시 후 다시 시도해 주세요.')).toBeTruthy();
  });
});
