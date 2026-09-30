import { act, render, screen, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import { CURRENT_SCHEMA_VERSION } from '../src/data/sqlite/migrations/registry';
import { resetDataLayerProcessForTests } from './helpers/data-layer-process-test-utils';
import { createTestSqliteConnection } from './helpers/sqlite-test-harness';
import { DataLayerProvider } from '../src/app/providers/data-layer/DataLayerProvider';
import { useTampinDataLayer } from '../src/app/providers/data-layer/useTampinDataLayer';

function DataLayerProbe() {
  const state = useTampinDataLayer();

  if (state.status === 'initializing') {
    return <Text testID="data-layer-status">initializing</Text>;
  }

  if (state.status === 'error') {
    return <Text testID="data-layer-status">error:{state.error.message}</Text>;
  }

  return (
    <Text testID="data-layer-status">
      ready:{state.schemaVersion}
    </Text>
  );
}

function RepositoryProbe() {
  const state = useTampinDataLayer();
  if (state.status !== 'ready') {
    return <Text testID="repository-probe">pending</Text>;
  }

  return (
    <Text testID="repository-probe">
      {typeof state.repositories.routineRepository.createRoutine === 'function'
        ? 'repositories-ready'
        : 'missing'}
    </Text>
  );
}

function createOpenedTestDatabase() {
  const connection = createTestSqliteConnection();
  return {
    connection,
    schemaVersion:
      connection.getFirst<{ version: number }>(
        'SELECT MAX(version) AS version FROM schema_migrations',
      )?.version ?? CURRENT_SCHEMA_VERSION,
  };
}

describe('DEV-005 DataLayerProvider', () => {
  beforeEach(() => {
    resetDataLayerProcessForTests();
  });

  it('opens and migrates the database once, then exposes typed repositories', async () => {
    const openDatabase = jest.fn(createOpenedTestDatabase);

    await render(
      <DataLayerProvider openDatabase={openDatabase}>
        <DataLayerProbe />
        <RepositoryProbe />
      </DataLayerProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('data-layer-status')).toHaveTextContent('ready:1');
      expect(screen.getByTestId('repository-probe')).toHaveTextContent('repositories-ready');
    });

    expect(openDatabase).toHaveBeenCalledTimes(1);
  });

  it('reuses the process snapshot after provider unmount and remount', async () => {
    const openDatabase = jest.fn(createOpenedTestDatabase);

    const { unmount } = await render(
      <DataLayerProvider openDatabase={openDatabase}>
        <DataLayerProbe />
      </DataLayerProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('data-layer-status')).toHaveTextContent('ready:1');
    });

    await act(async () => {
      unmount();
    });

    await render(
      <DataLayerProvider openDatabase={openDatabase}>
        <DataLayerProbe />
      </DataLayerProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('data-layer-status')).toHaveTextContent('ready:1');
    });

    expect(openDatabase).toHaveBeenCalledTimes(1);
  });

  it('surfaces initialization failures without replacing the database', async () => {
    const openDatabase = jest.fn(() => {
      throw new Error('migration failed');
    });

    await render(
      <DataLayerProvider openDatabase={openDatabase}>
        <DataLayerProbe />
      </DataLayerProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('data-layer-status')).toHaveTextContent(
        'error:migration failed',
      );
    });

    expect(openDatabase).toHaveBeenCalledTimes(1);
  });

  it('reuses cached init errors on remount without retrying openDatabase', async () => {
    const openDatabase = jest.fn(() => {
      throw new Error('migration failed');
    });

    const { unmount } = await render(
      <DataLayerProvider openDatabase={openDatabase}>
        <DataLayerProbe />
      </DataLayerProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('data-layer-status')).toHaveTextContent(
        'error:migration failed',
      );
    });

    await act(async () => {
      unmount();
    });

    await render(
      <DataLayerProvider openDatabase={openDatabase}>
        <DataLayerProbe />
      </DataLayerProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('data-layer-status')).toHaveTextContent(
        'error:migration failed',
      );
    });

    expect(openDatabase).toHaveBeenCalledTimes(1);
  });
});
