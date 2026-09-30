import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { AuthProviderId } from '../../auth/contracts/types';
import { figmaAssets } from '../../design-system/assets';
import { FigmaImage } from '../../design-system/components/FigmaImage';
import { colors, fontFamily } from '../../design-system/tokens';
import {
  LOGIN_ERROR_DIALOG_COPY,
  LOGIN_PROVIDER_LABELS,
  type LoginErrorDialogCase,
} from './loginFormContent';

export type LoginProviderState = 'ready' | 'unavailable' | 'busy';

export type { LoginErrorDialogCase };

export type LoginFormScreenProps = {
  providerState: LoginProviderState;
  errorDialogCase?: LoginErrorDialogCase | null;
  onProviderPress?: (provider: AuthProviderId) => void;
  readOnly?: boolean;
};

function ProviderCta({
  label,
  provider,
  disabled,
  busy,
  onPress,
}: {
  label: string;
  provider: AuthProviderId;
  disabled: boolean;
  busy: boolean;
  onPress?: (provider: AuthProviderId) => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || busy, busy }}
      disabled={disabled}
      onPress={() => onPress?.(provider)}
      style={[styles.providerButton, disabled && styles.providerButtonDisabled]}
      testID={`login-provider-${provider}`}
    >
      <Text style={styles.providerButtonLabel}>{label}</Text>
    </Pressable>
  );
}

function LoginErrorDialog({ dialogCase }: { dialogCase: LoginErrorDialogCase }) {
  const copy = LOGIN_ERROR_DIALOG_COPY[dialogCase];

  return (
    <View pointerEvents="none" style={styles.errorOverlay} testID="login-error-dialog">
      <View style={styles.errorDialogCard}>
        <View style={styles.errorDialogTextGroup}>
          <Text style={styles.errorDialogTitle}>{copy.title}</Text>
          <Text style={styles.errorDialogBody}>{copy.body}</Text>
        </View>
        <View style={styles.errorDialogActions}>
          <View style={styles.errorDialogAction}>
            <Text style={styles.errorDialogSecondaryAction}>닫기</Text>
          </View>
          <View style={[styles.errorDialogAction, styles.errorDialogActionDivider]}>
            <Text style={styles.errorDialogPrimaryAction}>다시 시도</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export function LoginFormScreen({
  providerState,
  errorDialogCase = null,
  onProviderPress,
  readOnly = false,
}: LoginFormScreenProps) {
  const interactive = !readOnly;
  const providersDisabled =
    !interactive || providerState === 'unavailable' || providerState === 'busy';

  return (
    <View style={styles.root} testID="login-form-screen">
      <View style={styles.statusSpacer} />

      <View style={styles.content}>
        <View style={styles.hero}>
          <FigmaImage
            accessibilityLabel="Tampin"
            decorative={false}
            height={28}
            source={figmaAssets.logos.tampinPrimary}
            style={styles.wordmark}
            testID="login-wordmark"
            width={120}
          />
          <Text style={styles.headline}>오늘의 운동을 기록하고{'\n'}내 변화를 확인하세요.</Text>
          <Text style={styles.subtitle}>운동 기록을 가장 빠르게 남기는 방법</Text>
        </View>

        <View style={styles.flexSpacer} />

        <View style={styles.actions}>
          <View style={styles.providerActions}>
            <ProviderCta
              label={LOGIN_PROVIDER_LABELS.google}
              provider="google"
              busy={providerState === 'busy'}
              disabled={providersDisabled}
              onPress={onProviderPress}
            />
            <ProviderCta
              label={LOGIN_PROVIDER_LABELS.kakao}
              provider="kakao"
              busy={providerState === 'busy'}
              disabled={providersDisabled}
              onPress={onProviderPress}
            />
          </View>

          <View style={styles.footerMeta}>
            <View style={styles.inquiryRow} testID="login-inquiry-affordance">
              <Text style={styles.inquiryPrompt}>로그인에 문제가 있나요?</Text>
              <Text accessibilityRole="link" style={styles.inquiryLink}>
                문의하기
              </Text>
            </View>

            <View style={styles.legalNotice} testID="login-legal-affordance">
              <View style={styles.legalLinks}>
                <Text accessibilityRole="link" style={styles.legalLink}>
                  서비스 이용약관
                </Text>
                <Text style={styles.legalSeparator}>·</Text>
                <Text accessibilityRole="link" style={styles.legalLink}>
                  개인정보처리방침
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {errorDialogCase ? <LoginErrorDialog dialogCase={errorDialogCase} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  statusSpacer: {
    height: 48,
  },
  content: {
    flex: 1,
    paddingTop: 32,
  },
  hero: {
    gap: 12,
    maxWidth: 320,
  },
  wordmark: {
    alignSelf: 'flex-start',
  },
  headline: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    lineHeight: 28,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  flexSpacer: {
    flex: 1,
    minHeight: 24,
  },
  actions: {
    gap: 32,
    maxWidth: 320,
    width: '100%',
    alignSelf: 'center',
  },
  providerActions: {
    gap: 14,
  },
  providerButton: {
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.brandAction,
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerButtonDisabled: {
    opacity: 0.3,
  },
  providerButtonLabel: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    lineHeight: 24,
    color: colors.textOnBrand,
    textAlign: 'center',
  },
  footerMeta: {
    gap: 16,
    alignItems: 'center',
  },
  inquiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  inquiryPrompt: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    lineHeight: 14,
    color: colors.textSecondary,
  },
  inquiryLink: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    lineHeight: 14,
    color: colors.textPrimary,
    textDecorationLine: 'underline',
  },
  legalNotice: {
    alignItems: 'center',
    width: '100%',
  },
  legalLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legalLink: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    lineHeight: 14,
    color: colors.textSecondary,
    textDecorationLine: 'underline',
  },
  legalSeparator: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    lineHeight: 14,
    color: colors.textSecondary,
  },
  errorOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.52)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 33,
  },
  errorDialogCard: {
    width: '100%',
    maxWidth: 294,
    backgroundColor: colors.surface,
    borderColor: colors.borderSubtle,
    borderWidth: 1,
    borderRadius: 20,
    paddingTop: 24,
    overflow: 'hidden',
  },
  errorDialogTextGroup: {
    gap: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  errorDialogTitle: {
    fontSize: 17,
    fontFamily: fontFamily.semiBold,
    lineHeight: 24,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  errorDialogBody: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  errorDialogActions: {
    flexDirection: 'row',
    borderTopColor: colors.borderSubtle,
    borderTopWidth: 1,
  },
  errorDialogAction: {
    flex: 1,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorDialogActionDivider: {
    borderLeftColor: colors.borderSubtle,
    borderLeftWidth: 1,
  },
  errorDialogSecondaryAction: {
    fontSize: 15,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
  },
  errorDialogPrimaryAction: {
    fontSize: 15,
    fontFamily: fontFamily.bold,
    color: colors.brandAction,
  },
});
