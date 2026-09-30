import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { AppRoot } from '../src/app/AppRoot';

function invokeHardwareBack(): boolean {
  const nativeStack = jest.requireMock('@react-navigation/native-stack') as {
    __invokeHardwareBackForTests: () => boolean;
  };
  return nativeStack.__invokeHardwareBackForTests();
}

describe('DEV-003 Android back handling', () => {
  beforeEach(() => {
    const nativeStack = jest.requireMock('@react-navigation/native-stack') as {
      __resetMockStackForTests: () => void;
    };
    nativeStack.__resetMockStackForTests();
  });

  it('returns from UI Catalog to bootstrap via in-app back action', async () => {
    const { getByTestId, getByText, queryByTestId } = await render(<AppRoot />);

    expect(getByTestId('bootstrap-home')).toBeTruthy();

    fireEvent.press(getByTestId('open-ui-catalog'));
    await waitFor(() => {
      expect(getByTestId('ui-catalog')).toBeTruthy();
    });

    fireEvent.press(getByText('← Back to bootstrap'));

    await waitFor(() => {
      expect(getByTestId('bootstrap-home')).toBeTruthy();
    });
    expect(queryByTestId('ui-catalog')).toBeNull();
  });

  it('returns from UI Catalog to bootstrap on hardware back', async () => {
    const { getByTestId, queryByTestId } = await render(<AppRoot />);

    fireEvent.press(getByTestId('open-ui-catalog'));
    await waitFor(() => {
      expect(getByTestId('ui-catalog')).toBeTruthy();
    });

    expect(invokeHardwareBack()).toBe(true);

    await waitFor(() => {
      expect(getByTestId('bootstrap-home')).toBeTruthy();
    });
    expect(queryByTestId('ui-catalog')).toBeNull();
  });

  it('does not exit the app from the root bootstrap route on hardware back', async () => {
    const { getByTestId } = await render(<AppRoot />);

    expect(getByTestId('bootstrap-home')).toBeTruthy();
    expect(invokeHardwareBack()).toBe(false);
    expect(getByTestId('bootstrap-home')).toBeTruthy();
  });
});
