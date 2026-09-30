import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { DataLayerProvider } from '../src/app/providers/data-layer/DataLayerProvider';
import { UiCatalogScreen } from '../src/debug/ui-catalog/UiCatalogScreen';
import { CURRENT_SCHEMA_VERSION } from '../src/data/sqlite/migrations/registry';
import { resetDataLayerProcessForTests } from './helpers/data-layer-process-test-utils';
import { createTestSqliteConnection } from './helpers/sqlite-test-harness';

describe('DEV-005 UI Catalog data-layer health entry', () => {
  beforeEach(() => {
    resetDataLayerProcessForTests();
  });

  it('shows read-only initialization status and schema version in development catalog', async () => {
    const openDatabase = jest.fn(() => {
      const connection = createTestSqliteConnection();
      return {
        connection,
        schemaVersion:
          connection.getFirst<{ version: number }>(
            'SELECT MAX(version) AS version FROM schema_migrations',
          )?.version ?? CURRENT_SCHEMA_VERSION,
      };
    });

    const { getByTestId, getByText } = await render(
      <DataLayerProvider openDatabase={openDatabase}>
        <UiCatalogScreen onBack={jest.fn()} />
      </DataLayerProvider>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('catalog-entry-data-layer-health'));
    });

    await waitFor(() => {
      expect(getByTestId('data-layer-health-detail')).toBeTruthy();
    });

    expect(getByTestId('data-layer-health-status')).toHaveTextContent('ready');
    expect(getByTestId('data-layer-health-schema-version')).toHaveTextContent('1');
    expect(
      getByText('Read-only health entry. User records are not read, seeded, or mutated.'),
    ).toBeTruthy();
  });
});
