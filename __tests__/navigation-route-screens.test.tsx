import { act, fireEvent, render } from '@testing-library/react-native';
import { BootstrapRouteScreen } from '../src/app/navigation/screens/BootstrapRouteScreen';
import { UiCatalogRouteScreen } from '../src/app/navigation/screens/UiCatalogRouteScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoBack,
    }),
  };
});

describe('DEV-003 route screen navigation wiring', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockGoBack.mockClear();
  });

  it('BootstrapRouteScreen navigates to UiCatalog from the dev catalog entry', async () => {
    const { getByTestId } = await render(<BootstrapRouteScreen />);

    await act(async () => {
      fireEvent.press(getByTestId('open-ui-catalog'));
    });

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('UiCatalog');
  });

  it('UiCatalogRouteScreen calls navigation.goBack when the in-app back action is pressed', async () => {
    const { getByText } = await render(<UiCatalogRouteScreen />);

    await act(async () => {
      fireEvent.press(getByText('← Back to bootstrap'));
    });

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
