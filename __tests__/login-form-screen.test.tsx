import { fireEvent, render } from '@testing-library/react-native';
import { LoginFormScreen } from '../src/features/auth/LoginFormScreen';

describe('DEV-008 LoginFormScreen presentation', () => {
  it('keeps provider CTAs disabled in unavailable and busy states', async () => {
    const unavailable = await render(
      <LoginFormScreen providerState="unavailable" readOnly />,
    );
    expect(
      unavailable.getByTestId('login-provider-google').props.accessibilityState.disabled,
    ).toBe(true);

    const busy = await render(<LoginFormScreen providerState="busy" readOnly />);
    expect(
      busy.getByTestId('login-provider-google').props.accessibilityState.busy,
    ).toBe(true);
    expect(
      busy.getByTestId('login-provider-google').props.accessibilityState.disabled,
    ).toBe(true);
  });

  it('invokes onProviderPress only when ready and interactive', async () => {
    const onProviderPress = jest.fn();
    const { getByTestId } = await render(
      <LoginFormScreen
        onProviderPress={onProviderPress}
        providerState="ready"
      />,
    );

    await fireEvent.press(getByTestId('login-provider-kakao'));
    expect(onProviderPress).toHaveBeenCalledWith('kakao');
  });
});
