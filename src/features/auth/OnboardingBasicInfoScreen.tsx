import { useCallback, useState } from 'react';
import { View } from 'react-native';
import {
  BasicInfoFormScreen,
  type BasicInfoFormValues,
} from './BasicInfoFormScreen';
import {
  getDobErrorMessage,
  isBasicInfoSubmitEnabled,
  sanitizeDobInput,
  type BasicInfoSex,
} from './basicInfoValidation';

export type OnboardingBasicInfoScreenProps = {
  onBack: () => void;
  onComplete: () => void;
};

const initialValues: BasicInfoFormValues = {
  sex: null,
  dob: '',
  termsAgreed: false,
};

export function OnboardingBasicInfoScreen({
  onBack,
  onComplete,
}: OnboardingBasicInfoScreenProps) {
  const [values, setValues] = useState<BasicInfoFormValues>(initialValues);
  const [dobFocused, setDobFocused] = useState(false);
  const [dobTouched, setDobTouched] = useState(false);

  const handleSexSelect = useCallback((sex: BasicInfoSex) => {
    setValues((current) => ({ ...current, sex }));
  }, []);

  const handleDobChange = useCallback((nextValue: string) => {
    setValues((current) => ({
      ...current,
      dob: sanitizeDobInput(nextValue),
    }));
  }, []);

  const handleDobFocus = useCallback(() => {
    setDobFocused(true);
  }, []);

  const handleDobBlur = useCallback(() => {
    setDobFocused(false);
    setDobTouched(true);
  }, []);

  const handleTermsToggle = useCallback(() => {
    setValues((current) => ({
      ...current,
      termsAgreed: !current.termsAgreed,
    }));
  }, []);

  const dobErrorMessage = getDobErrorMessage(values.dob, { dobTouched });

  const handleSubmit = useCallback(() => {
    if (!isBasicInfoSubmitEnabled(values)) {
      return;
    }

    onComplete();
  }, [onComplete, values]);

  return (
    <View style={{ flex: 1 }} testID="flow-boundary-OnboardingBasicInfo">
      <BasicInfoFormScreen
        onBack={onBack}
        onDobBlur={handleDobBlur}
        onDobChange={handleDobChange}
        onDobFocus={handleDobFocus}
        onSexSelect={handleSexSelect}
        onSubmit={handleSubmit}
        onTermsToggle={handleTermsToggle}
        presentation={{
          dobFocused,
          dobErrorMessage,
        }}
        values={values}
      />
    </View>
  );
}
