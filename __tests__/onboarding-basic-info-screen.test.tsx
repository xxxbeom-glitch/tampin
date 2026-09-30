import { act, fireEvent, render } from '@testing-library/react-native';
import { OnboardingBasicInfoScreen } from '../src/features/auth/OnboardingBasicInfoScreen';
import { DOB_ERROR_MESSAGE } from '../src/features/auth/basicInfoValidation';

describe('DEV-007 OnboardingBasicInfoScreen', () => {
  it('keeps 시작하기 disabled until sex, valid DOB, and Terms are all satisfied', async () => {
    const onComplete = jest.fn();
    const { getByTestId } = await render(
      <OnboardingBasicInfoScreen onBack={jest.fn()} onComplete={onComplete} />,
    );

    const submit = getByTestId('basic-info-submit');
    expect(submit.props.accessibilityState.disabled).toBe(true);

    await act(async () => {
      fireEvent.press(getByTestId('basic-info-sex-male'));
    });
    expect(submit.props.accessibilityState.disabled).toBe(true);

    await act(async () => {
      fireEvent.changeText(getByTestId('basic-info-dob-input'), '19880101');
    });
    expect(submit.props.accessibilityState.disabled).toBe(true);

    await act(async () => {
      fireEvent.press(getByTestId('basic-info-terms-row'));
    });
    expect(submit.props.accessibilityState.disabled).toBe(false);
  });

  it('shows the exact invalid DOB error and keeps CTA disabled', async () => {
    const { getByTestId, queryByTestId } = await render(
      <OnboardingBasicInfoScreen onBack={jest.fn()} onComplete={jest.fn()} />,
    );

    await act(async () => {
      fireEvent.changeText(getByTestId('basic-info-dob-input'), '19881340');
    });

    expect(queryByTestId('basic-info-dob-error')).toBeTruthy();
    expect(getByTestId('basic-info-dob-error-text')).toHaveTextContent(
      DOB_ERROR_MESSAGE,
    );
    expect(getByTestId('basic-info-submit').props.accessibilityState.disabled).toBe(
      true,
    );
  });

  it('calls onComplete only when the form is fully valid', async () => {
    const onComplete = jest.fn();
    const { getByTestId } = await render(
      <OnboardingBasicInfoScreen onBack={jest.fn()} onComplete={onComplete} />,
    );

    await act(async () => {
      fireEvent.press(getByTestId('basic-info-sex-female'));
    });
    await act(async () => {
      fireEvent.changeText(getByTestId('basic-info-dob-input'), '19880101');
    });
    await act(async () => {
      fireEvent.press(getByTestId('basic-info-terms-row'));
    });
    expect(getByTestId('basic-info-submit').props.accessibilityState.disabled).toBe(
      false,
    );
    await act(async () => {
      fireEvent.press(getByTestId('basic-info-submit'));
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('returns to Login through onBack without completing the profile', async () => {
    const onBack = jest.fn();
    const onComplete = jest.fn();
    const { getByTestId } = await render(
      <OnboardingBasicInfoScreen onBack={onBack} onComplete={onComplete} />,
    );

    await act(async () => {
      fireEvent.press(getByTestId('basic-info-sex-male'));
      fireEvent.press(getByTestId('basic-info-back'));
    });

    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onComplete).not.toHaveBeenCalled();
  });
});
