import { render } from '@testing-library/react-native';
import { SplashScreen } from '../src/features/startup/SplashScreen';
import { colors } from '../src/design-system/tokens';

describe('DEV-009 SplashScreen', () => {
  it('renders only brand-primary background and white Tampin wordmark', async () => {
    const { getByTestId, queryByRole } = await render(<SplashScreen />);

    const root = getByTestId('splash-screen');
    expect(root.props.style).toMatchObject({
      backgroundColor: colors.brandPrimary,
    });

    const wordmark = getByTestId('splash-wordmark');
    expect(wordmark.props.children).toBe('TAMPIN');
    expect(wordmark.props.style).toMatchObject({
      color: colors.textOnBrand,
    });

    expect(queryByRole('button')).toBeNull();
    expect(queryByRole('progressbar')).toBeNull();
  });
});
