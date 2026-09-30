import { fireEvent, render } from '@testing-library/react-native';
import type { ComponentProps } from 'react';
import { OnboardingBasicInfoScreen } from '../src/features/auth/OnboardingBasicInfoScreen';
import { DOB_ERROR_MESSAGE } from '../src/features/auth/basicInfoValidation';

type BasicInfoScreenProps = ComponentProps<typeof OnboardingBasicInfoScreen>;

async function renderBasicInfoScreen(overrides: Partial<BasicInfoScreenProps> = {}) {
  const onBack = overrides.onBack ?? jest.fn();
  const onComplete = overrides.onComplete ?? jest.fn();

  const view = await render(
    <OnboardingBasicInfoScreen onBack={onBack} onComplete={onComplete} />,
  );

  return { onBack, onComplete, ...view };
}

describe('DEV-007 OnboardingBasicInfoScreen', () => {
  it('keeps 시작하기 disabled until sex, valid DOB, and Terms are all satisfied', async () => {
    const { getByTestId } = await renderBasicInfoScreen();

    expect(getByTestId('basic-info-submit').props.accessibilityState.disabled).toBe(
      true,
    );

    await fireEvent.press(getByTestId('basic-info-sex-male'));
    expect(getByTestId('basic-info-submit').props.accessibilityState.disabled).toBe(
      true,
    );

    await fireEvent.changeText(getByTestId('basic-info-dob-input'), '19880101');
    expect(getByTestId('basic-info-submit').props.accessibilityState.disabled).toBe(
      true,
    );

    await fireEvent.press(getByTestId('basic-info-terms-row'));
    expect(getByTestId('basic-info-submit').props.accessibilityState.disabled).toBe(
      false,
    );
  });

  it('shows the exact invalid DOB error and keeps CTA disabled', async () => {
    const { getByTestId, queryByTestId } = await renderBasicInfoScreen();

    await fireEvent.changeText(getByTestId('basic-info-dob-input'), '19881340');

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
    const { getByTestId } = await renderBasicInfoScreen({ onComplete });

    await fireEvent.press(getByTestId('basic-info-sex-female'));
    await fireEvent.changeText(getByTestId('basic-info-dob-input'), '19880101');
    await fireEvent.press(getByTestId('basic-info-terms-row'));
    expect(getByTestId('basic-info-submit').props.accessibilityState.disabled).toBe(
      false,
    );
    await fireEvent.press(getByTestId('basic-info-submit'));

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('returns to Login through onBack without completing the profile', async () => {
    const onBack = jest.fn();
    const onComplete = jest.fn();
    const { getByTestId } = await renderBasicInfoScreen({ onBack, onComplete });

    await fireEvent.press(getByTestId('basic-info-sex-male'));
    await fireEvent.press(getByTestId('basic-info-back'));

    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onComplete).not.toHaveBeenCalled();
  });
});
