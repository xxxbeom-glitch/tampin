import { fireEvent, render } from '@testing-library/react-native';
import { AuthProvider } from '../src/app/providers/auth/AuthProvider';
import { createDevelopmentLocalAuthAdapter } from '../src/auth/adapters/developmentLocalAuthAdapter';
import { createUnavailableAuthAdapter } from '../src/auth/adapters/unavailableAuthAdapter';
import { LoginScreen } from '../src/features/auth/LoginScreen';

async function renderLoginScreen(
  authService: ReturnType<
    typeof createDevelopmentLocalAuthAdapter | typeof createUnavailableAuthAdapter
  >,
  onSignedIn = jest.fn(),
) {
  const view = await render(
    <AuthProvider authService={authService}>
      <LoginScreen onSignedIn={onSignedIn} />
    </AuthProvider>,
  );

  return { onSignedIn, ...view };
}

describe('DEV-008 LoginScreen', () => {
  it('renders the canonical 01A hierarchy with stacked provider CTAs', async () => {
    const authService = createDevelopmentLocalAuthAdapter();
    const { getByTestId, getByText } = await renderLoginScreen(authService);

    expect(getByTestId('login-screen')).toBeTruthy();
    expect(getByTestId('login-form-screen')).toBeTruthy();
    expect(getByText(/오늘의 운동을 기록하고/)).toBeTruthy();
    expect(getByText('운동 기록을 가장 빠르게 남기는 방법')).toBeTruthy();
    expect(getByText('Google로 계속하기')).toBeTruthy();
    expect(getByText('Kakao로 계속하기')).toBeTruthy();
    expect(getByTestId('login-inquiry-affordance')).toBeTruthy();
    expect(getByTestId('login-legal-affordance')).toBeTruthy();
  });

  it('enters a development local session from both provider buttons on first run', async () => {
    const googleSignedIn = jest.fn();
    const googleAuth = createDevelopmentLocalAuthAdapter();
    const googleView = await renderLoginScreen(googleAuth, googleSignedIn);

    await fireEvent.press(googleView.getByTestId('login-provider-google'));
    expect(googleSignedIn).toHaveBeenCalledWith('OnboardingBasicInfo');
    await googleView.unmount();

    const kakaoSignedIn = jest.fn();
    const kakaoAuth = createDevelopmentLocalAuthAdapter();
    const kakaoView = await renderLoginScreen(kakaoAuth, kakaoSignedIn);

    await fireEvent.press(kakaoView.getByTestId('login-provider-kakao'));
    expect(kakaoSignedIn).toHaveBeenCalledWith('OnboardingBasicInfo');
  });

  it('routes completed local profiles to RoutineHome', async () => {
    const onSignedIn = jest.fn();
    const authService = createDevelopmentLocalAuthAdapter();
    authService.signInWithProvider('google');
    authService.markProfileComplete();

    const { getByTestId } = await renderLoginScreen(authService, onSignedIn);

    await fireEvent.press(getByTestId('login-provider-google'));
    expect(onSignedIn).toHaveBeenCalledWith('RoutineHome');
  });

  it('fail-closes provider buttons in release configuration', async () => {
    const onSignedIn = jest.fn();
    const authService = createUnavailableAuthAdapter();
    const { getByTestId } = await renderLoginScreen(authService, onSignedIn);

    expect(getByTestId('login-provider-google').props.accessibilityState.disabled).toBe(
      true,
    );
    expect(getByTestId('login-provider-kakao').props.accessibilityState.disabled).toBe(
      true,
    );

    await fireEvent.press(getByTestId('login-provider-google'));
    await fireEvent.press(getByTestId('login-provider-kakao'));

    expect(onSignedIn).not.toHaveBeenCalled();
    expect(authService.getSession()).toBeNull();
  });

  it('ignores rapid double press while sign-in is in progress', async () => {
    const onSignedIn = jest.fn();
    const authService = createDevelopmentLocalAuthAdapter();
    const { getByTestId } = await renderLoginScreen(authService, onSignedIn);

    const googleButton = getByTestId('login-provider-google');
    await fireEvent.press(googleButton);
    await fireEvent.press(googleButton);

    expect(onSignedIn).toHaveBeenCalledTimes(1);
  });
});
