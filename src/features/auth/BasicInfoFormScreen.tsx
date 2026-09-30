import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { figmaAssets } from '../../design-system/assets';
import { FigmaImage } from '../../design-system/components/FigmaImage';
import { colors, fontFamily } from '../../design-system/tokens';
import {
  DOB_PLACEHOLDER,
  type BasicInfoSex,
  isBasicInfoSubmitEnabled,
} from './basicInfoValidation';

export type BasicInfoFormValues = {
  sex: BasicInfoSex | null;
  dob: string;
  termsAgreed: boolean;
};

export type BasicInfoFormPresentation = {
  dobFocused: boolean;
  dobInputDisabled: boolean;
  dobErrorMessage: string | null;
};

export type BasicInfoFormScreenProps = {
  values: BasicInfoFormValues;
  presentation?: Partial<BasicInfoFormPresentation>;
  onBack?: () => void;
  onSexSelect?: (sex: BasicInfoSex) => void;
  onDobChange?: (dob: string) => void;
  onDobFocus?: () => void;
  onDobBlur?: () => void;
  onTermsToggle?: () => void;
  onSubmit?: () => void;
  readOnly?: boolean;
};

const defaultPresentation: BasicInfoFormPresentation = {
  dobFocused: false,
  dobInputDisabled: false,
  dobErrorMessage: null,
};

function SexOption({
  label,
  selected,
  disabled,
  onPress,
  testID,
}: {
  label: string;
  selected: boolean;
  disabled: boolean;
  onPress?: () => void;
  testID: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.sexOption,
        selected ? styles.sexOptionSelected : styles.sexOptionDefault,
        disabled && styles.sexOptionDisabled,
      ]}
      testID={testID}
    >
      <Text
        style={[
          styles.sexOptionLabel,
          selected ? styles.sexOptionLabelSelected : styles.sexOptionLabelDefault,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function BasicInfoFormScreen({
  values,
  presentation,
  onBack,
  onSexSelect,
  onDobChange,
  onDobFocus,
  onDobBlur,
  onTermsToggle,
  onSubmit,
  readOnly = false,
}: BasicInfoFormScreenProps) {
  const resolvedPresentation = { ...defaultPresentation, ...presentation };
  const interactive = !readOnly;
  const submitEnabled = isBasicInfoSubmitEnabled(values);
  const showDobError = resolvedPresentation.dobErrorMessage !== null;
  const dobDisplayValue = values.dob.length > 0 ? values.dob : '';

  return (
    <View style={styles.root} testID="basic-info-form-screen">
      <View style={styles.statusSpacer} />
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="뒤로"
          disabled={!interactive || !onBack}
          onPress={onBack}
          style={styles.headerSide}
          testID="basic-info-back"
        >
          <FigmaImage
            height={24}
            source={figmaAssets.icons.arrowLeft}
            testID="basic-info-back-icon"
            width={24}
          />
        </Pressable>
        <Text style={styles.headerTitle}>기본정보</Text>
        <View style={styles.headerSide} />
      </View>

      <View style={styles.content}>
        <Text style={styles.introTitle}>기본정보를 알려주세요</Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>성별</Text>
          <View style={styles.sexRow}>
            <SexOption
              label="남성"
              selected={values.sex === 'male'}
              disabled={!interactive}
              onPress={() => onSexSelect?.('male')}
              testID="basic-info-sex-male"
            />
            <SexOption
              label="여성"
              selected={values.sex === 'female'}
              disabled={!interactive}
              onPress={() => onSexSelect?.('female')}
              testID="basic-info-sex-female"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>생년월일</Text>
          <View style={styles.dobField}>
            <TextInput
              accessibilityLabel="생년월일"
              editable={interactive && !resolvedPresentation.dobInputDisabled}
              keyboardType="number-pad"
              maxLength={8}
              onBlur={onDobBlur}
              onChangeText={onDobChange}
              onFocus={onDobFocus}
              placeholder={DOB_PLACEHOLDER}
              placeholderTextColor={colors.textSecondary}
              style={[
                styles.dobInput,
                resolvedPresentation.dobFocused && styles.dobInputFocused,
                showDobError && styles.dobInputError,
                resolvedPresentation.dobInputDisabled && styles.dobInputDisabled,
              ]}
              testID="basic-info-dob-input"
              value={dobDisplayValue}
            />
            {showDobError ? (
              <View style={styles.errorRow} testID="basic-info-dob-error">
                <Text style={styles.errorIcon}>!</Text>
                <Text style={styles.errorText} testID="basic-info-dob-error-text">
                  {resolvedPresentation.dobErrorMessage}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: values.termsAgreed, disabled: !interactive }}
          disabled={!interactive}
          onPress={onTermsToggle}
          style={styles.termsRow}
          testID="basic-info-terms-row"
        >
          <View
            style={[
              styles.termsControl,
              values.termsAgreed && styles.termsControlAgreed,
            ]}
          >
            <Text
              style={[
                styles.termsCheckmark,
                values.termsAgreed && styles.termsCheckmarkAgreed,
              ]}
            >
              ✓
            </Text>
          </View>
          <Text style={styles.termsLabel}>서비스 이용약관 동의 (필수)</Text>
        </Pressable>

        <View style={styles.flexSpacer} />

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !interactive || !submitEnabled }}
          disabled={!interactive || !submitEnabled}
          onPress={onSubmit}
          style={[
            styles.submitButton,
            !submitEnabled && styles.submitButtonDisabled,
          ]}
          testID="basic-info-submit"
        >
          <Text style={styles.submitButtonLabel}>시작하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  statusSpacer: {
    height: 48,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerSide: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: fontFamily.bold,
    lineHeight: 24,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 24,
  },
  introTitle: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    lineHeight: 28,
    color: colors.textPrimary,
  },
  section: {
    gap: 12,
  },
  sectionLabel: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  sexRow: {
    flexDirection: 'row',
    gap: 12,
  },
  sexOption: {
    flex: 1,
    height: 52,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sexOptionDefault: {
    backgroundColor: colors.surface,
  },
  sexOptionSelected: {
    backgroundColor: colors.brandPrimary,
  },
  sexOptionDisabled: {
    opacity: 0.3,
  },
  sexOptionLabel: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    lineHeight: 20,
  },
  sexOptionLabelDefault: {
    color: colors.textPrimary,
  },
  sexOptionLabelSelected: {
    color: colors.textOnBrand,
  },
  dobField: {
    gap: 4,
  },
  dobInput: {
    height: 52,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: fontFamily.medium,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  dobInputFocused: {
    borderColor: colors.brandPrimary,
  },
  dobInputError: {
    borderColor: colors.danger,
  },
  dobInputDisabled: {
    opacity: 0.3,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  errorIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.danger,
    color: colors.danger,
    fontSize: 11,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    lineHeight: 14,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    fontFamily: fontFamily.medium,
    lineHeight: 18,
    color: colors.danger,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 44,
  },
  termsControl: {
    width: 26,
    height: 26,
    borderRadius: 999,
    backgroundColor: colors.subtleSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsControlAgreed: {
    backgroundColor: colors.brandPrimary,
  },
  termsCheckmark: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.textSecondary,
  },
  termsCheckmarkAgreed: {
    color: colors.textOnBrand,
  },
  termsLabel: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  flexSpacer: {
    flex: 1,
  },
  submitButton: {
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.brandAction,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.3,
  },
  submitButtonLabel: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    lineHeight: 24,
    color: colors.textOnBrand,
  },
});
