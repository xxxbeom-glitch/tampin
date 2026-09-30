import { fireEvent, render } from '@testing-library/react-native';
import { UiCatalogRouteScreen } from '../src/app/navigation/screens/UiCatalogRouteScreen';

const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  };
});

describe('DEV-003 route screen navigation wiring', () => {
  beforeEach(() => {
    mockGoBack.mockClear();
  });

  it('UiCatalogRouteScreen calls navigation.goBack when the in-app back action is pressed', async () => {
    const { getByText } = await render(<UiCatalogRouteScreen />);

    await fireEvent.press(getByText('← Back'));

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
