import { act, fireEvent, render } from '@testing-library/react-native';
import { AuthProvider } from '../src/app/providers/auth/AuthProvider';
import { AuthRouteScreen } from '../src/app/navigation/screens/AuthRouteScreen';
import { UiCatalogRouteScreen } from '../src/app/navigation/screens/UiCatalogRouteScreen';
import { createDevelopmentLocalAuthAdapter } from '../src/auth/adapters/developmentLocalAuthAdapter';

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

  it('AuthRouteScreen navigates to UiCatalog from the dev catalog entry after Splash → Auth', async () => {
    const authService = createDevelopmentLocalAuthAdapter();
    const { getByTestId } = await render(
      <AuthProvider authService={authService}>
        <AuthRouteScreen />
      </AuthProvider>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('open-ui-catalog'));
    });

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('UiCatalog');
  });

  it('UiCatalogRouteScreen calls navigation.goBack when the in-app back action is pressed', async () => {
    const { getByText } = await render(<UiCatalogRouteScreen />);

    await fireEvent.press(getByText('← Back'));

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
