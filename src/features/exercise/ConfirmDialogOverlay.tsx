import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily } from '../../design-system/tokens';
import type { ConfirmDialogCopy } from './types';

export const UNSAVED_CONFIRM_COPY: ConfirmDialogCopy = {
  title: '저장하지 않고 나갈까요?',
  body: '변경한 내용은 사라져요.',
  secondary: '나가기',
  primary: '계속 편집',
};

export const DELETE_CONFIRM_COPY: ConfirmDialogCopy = {
  title: '운동을 삭제할까요?',
  body: '운동 목록과 루틴에서 삭제돼요.\n이전 운동 기록은 그대로 남아요.',
  secondary: '취소',
  primary: '삭제',
};

export type ConfirmDialogOverlayProps = {
  copy: ConfirmDialogCopy;
  onSecondary?: () => void;
  onPrimary?: () => void;
  readOnly?: boolean;
  testID?: string;
};

export function ConfirmDialogOverlay({
  copy,
  onSecondary,
  onPrimary,
  readOnly = false,
  testID = 'exercise-confirm-dialog',
}: ConfirmDialogOverlayProps) {
  const interactive = !readOnly;

  return (
    <View pointerEvents={interactive ? 'auto' : 'none'} style={styles.overlay} testID={testID}>
      <View style={styles.card}>
        <View style={styles.textGroup}>
          <Text style={styles.title}>{copy.title}</Text>
          <Text style={styles.body}>{copy.body}</Text>
        </View>
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            disabled={!interactive}
            onPress={onSecondary}
            style={[styles.action, styles.actionDivider]}
            testID={`${testID}-secondary`}
          >
            <Text style={styles.secondary}>{copy.secondary}</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            disabled={!interactive}
            onPress={onPrimary}
            style={styles.action}
            testID={`${testID}-primary`}
          >
            <Text style={styles.primary}>{copy.primary}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.52)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: 294,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    overflow: 'hidden',
    paddingTop: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  textGroup: {
    paddingHorizontal: 24,
    gap: 12,
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    lineHeight: 24,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  body: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  actions: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    flexDirection: 'row',
  },
  action: {
    flex: 1,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionDivider: {
    borderRightWidth: 1,
    borderRightColor: colors.borderSubtle,
  },
  secondary: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: colors.textPrimary,
  },
  primary: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.brandAction,
  },
});
