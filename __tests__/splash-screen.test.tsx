import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { SplashScreen } from '../src/features/startup/SplashScreen';
import { colors } from '../src/design-system/tokens';

describe('DEV-009 SplashScreen', () => {
  it('renders brand-primary background and bundled white Tampin wordmark image', async () => {
    const { getByTestId, queryByRole } = await render(<SplashScreen />);

    const root = getByTestId('splash-screen');
    expect(root.props.style).toMatchObject({
      backgroundColor: colors.brandPrimary,
    });

    const wordmark = getByTestId('splash-wordmark');
    expect(wordmark.props.source).toBeTruthy();
    expect(wordmark.props.children).toBeUndefined();
    expect(StyleSheet.flatten(wordmark.props.style)).toMatchObject({
      width: 139,
      height: 28,
    });

    expect(queryByRole('button')).toBeNull();
    expect(queryByRole('progressbar')).toBeNull();
  });
});
