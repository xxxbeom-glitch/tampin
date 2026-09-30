import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { AppRoot } from '../src/app/AppRoot';

describe('DEV-003 UI Catalog navigation goBack', () => {
  it('returns from UI Catalog to bootstrap when the in-app back action calls navigation.goBack()', async () => {
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
});
