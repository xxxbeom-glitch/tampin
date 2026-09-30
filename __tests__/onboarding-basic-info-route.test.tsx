import { act, fireEvent, render } from '@testing-library/react-native';
import { AuthProvider } from '../src/app/providers/auth/AuthProvider';
import { OnboardingBasicInfoRouteScreen } from '../src/app/navigation/screens/OnboardingBasicInfoRouteScreen';
import { createDevelopmentLocalAuthAdapter } from '../src/auth/adapters/developmentLocalAuthAdapter';

const mockNavigate = jest.fn();
const mockReplace = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      navigate: mockNavigate,
      replace: mockReplace,
    }),
  };
});

describe('DEV-007 OnboardingBasicInfoRouteScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockReplace.mockClear();
  });

  it('navigates back to Auth without marking the profile complete', async () => {
    const authService = createDevelopmentLocalAuthAdapter();
    authService.signInWithProvider('google');

    const { getByTestId } = await render(
      <AuthProvider authService={authService}>
        <OnboardingBasicInfoRouteScreen />
      </AuthProvider>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('basic-info-back'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('Auth');
    expect(authService.getSession()?.profileComplete).toBe(false);
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('marks the in-memory dev profile complete and replaces to RoutineHome on valid submit', async () => {
    const authService = createDevelopmentLocalAuthAdapter();
    authService.signInWithProvider('google');

    const { getByTestId } = await render(
      <AuthProvider authService={authService}>
        <OnboardingBasicInfoRouteScreen />
      </AuthProvider>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('basic-info-sex-male'));
    });
    await act(async () => {
      fireEvent.changeText(getByTestId('basic-info-dob-input'), '19880101');
    });
    await act(async () => {
      fireEvent.press(getByTestId('basic-info-terms-row'));
    });
    await act(async () => {
      fireEvent.press(getByTestId('basic-info-submit'));
    });

    expect(authService.getSession()?.profileComplete).toBe(true);
    expect(mockReplace).toHaveBeenCalledWith('RoutineHome');
  });
});
