import { act, fireEvent, render } from '@testing-library/react-native';
import { AuthProvider } from '../src/app/providers/auth/AuthProvider';
import { createDevelopmentLocalAuthAdapter } from '../src/auth/adapters/developmentLocalAuthAdapter';
import { createUnavailableAuthAdapter } from '../src/auth/adapters/unavailableAuthAdapter';
import { LoginScreen } from '../src/features/auth/LoginScreen';

describe('DEV-006 LoginScreen provider wiring', () => {
  it('enters a development local session from both provider buttons on first run', async () => {
    const onSignedIn = jest.fn();
    const authService = createDevelopmentLocalAuthAdapter();

    const { getByTestId } = await render(
      <AuthProvider authService={authService}>
        <LoginScreen onSignedIn={onSignedIn} />
      </AuthProvider>,
    );

    expect(getByTestId('login-dev-banner')).toBeTruthy();

    await act(async () => {
      fireEvent.press(getByTestId('login-provider-google'));
    });
    expect(onSignedIn).toHaveBeenLastCalledWith('OnboardingBasicInfo');

    authService.signOut();
    onSignedIn.mockClear();

    await act(async () => {
      fireEvent.press(getByTestId('login-provider-kakao'));
    });
    expect(onSignedIn).toHaveBeenLastCalledWith('OnboardingBasicInfo');
  });

  it('routes completed local profiles to RoutineHome', async () => {
    const onSignedIn = jest.fn();
    const authService = createDevelopmentLocalAuthAdapter();
    authService.signInWithProvider('google');
    authService.markProfileComplete();

    const { getByTestId } = await render(
      <AuthProvider authService={authService}>
        <LoginScreen onSignedIn={onSignedIn} />
      </AuthProvider>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('login-provider-google'));
    });

    expect(onSignedIn).toHaveBeenCalledWith('RoutineHome');
  });

  it('fail-closes provider buttons in release configuration', async () => {
    const onSignedIn = jest.fn();
    const authService = createUnavailableAuthAdapter();

    const { getByTestId } = await render(
      <AuthProvider authService={authService}>
        <LoginScreen onSignedIn={onSignedIn} />
      </AuthProvider>,
    );

    expect(getByTestId('login-unavailable-banner')).toBeTruthy();

    await act(async () => {
      fireEvent.press(getByTestId('login-provider-google'));
      fireEvent.press(getByTestId('login-provider-kakao'));
    });

    expect(onSignedIn).not.toHaveBeenCalled();
    expect(authService.getSession()).toBeNull();
  });
});
