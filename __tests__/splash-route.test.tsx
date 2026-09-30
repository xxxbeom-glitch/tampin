import { render, waitFor } from '@testing-library/react-native';
import { SplashRouteScreen } from '../src/app/navigation/screens/SplashRouteScreen';
import { SPLASH_PRESENTATION_DELAY_MS } from '../src/features/startup/splashTiming';

const mockReplace = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      replace: mockReplace,
    }),
  };
});

describe('DEV-009 SplashRouteScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockReplace.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('replaces to Auth exactly once after the documented presentation delay', async () => {
    await render(<SplashRouteScreen />);

    expect(mockReplace).not.toHaveBeenCalled();

    jest.advanceTimersByTime(SPLASH_PRESENTATION_DELAY_MS - 1);
    expect(mockReplace).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledTimes(1);
      expect(mockReplace).toHaveBeenCalledWith('Auth');
    });
  });

  it('cancels the scheduled transition on unmount', async () => {
    const view = await render(<SplashRouteScreen />);

    await view.unmount();
    jest.advanceTimersByTime(SPLASH_PRESENTATION_DELAY_MS);

    expect(mockReplace).not.toHaveBeenCalled();
  });
});
