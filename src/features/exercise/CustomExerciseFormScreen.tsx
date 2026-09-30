import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { figmaAssets } from '../../design-system/assets';
import { FigmaImage } from '../../design-system/components/FigmaImage';
import { colors, fontFamily } from '../../design-system/tokens';
import { recordingTypeLabel } from './exerciseCatalog';
import { ExerciseScreenChrome } from './ExerciseScreenChrome';
import type { CustomExerciseDraft } from './types';

export type CustomExerciseFormMode = 'create' | 'edit';

export type CustomExerciseFormScreenProps = {
  mode: CustomExerciseFormMode;
  draft: CustomExerciseDraft;
  historyLocked?: boolean;
  dirty?: boolean;
  onBack?: () => void;
  onNameChange?: (name: string) => void;
  onOpenEquipment?: () => void;
  onOpenPrimaryMuscle?: () => void;
  onOpenSecondaryMuscle?: () => void;
  onOpenRecordingType?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  readOnly?: boolean;
};

export function isCustomDraftValid(draft: CustomExerciseDraft): boolean {
  return draft.name.trim().length > 0 && draft.primaryMuscle.trim().length > 0;
}

export function CustomExerciseFormScreen({
  mode,
  draft,
  historyLocked = false,
  dirty = false,
  onBack,
  onNameChange,
  onOpenEquipment,
  onOpenPrimaryMuscle,
  onOpenSecondaryMuscle,
  onOpenRecordingType,
  onSave,
  onDelete,
  readOnly = false,
}: CustomExerciseFormScreenProps) {
  const interactive = !readOnly;
  const canSave = mode === 'create' ? isCustomDraftValid(draft) : dirty && isCustomDraftValid(draft);
  const title = mode === 'create' ? '직접 운동 만들기' : '운동 수정';

  return (
    <ExerciseScreenChrome
      onBack={onBack}
      readOnly={readOnly}
      right={
        mode === 'edit' ? (
          <Pressable
            accessibilityLabel="운동 삭제"
            accessibilityRole="button"
            disabled={!interactive}
            onPress={onDelete}
            testID="custom-exercise-delete"
          >
            <FigmaImage height={24} source={figmaAssets.icons.trash} width={24} />
          </Pressable>
        ) : null
      }
      testID="custom-exercise-form"
      title={title}
    >
      <ScrollView contentContainerStyle={styles.form} style={styles.scroll}>
        <View style={styles.thumbnailWrap}>
          <View style={styles.thumbnail}>
            <FigmaImage height={26} source={figmaAssets.icons.plus} width={26} />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>운동명</Text>
          <TextInput
            accessibilityLabel="운동명"
            editable={interactive}
            onChangeText={onNameChange}
            placeholder="예: 케이블 풀다운"
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
            testID="custom-exercise-name"
            value={draft.name}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>운동 설정</Text>
          <View style={styles.settingsCard}>
            <SettingsRow
              interactive={interactive}
              label="장비"
              onPress={onOpenEquipment}
              testID="custom-exercise-equipment"
              value={draft.equipment || '선택'}
            />
            <View style={styles.rowDivider} />
            <SettingsRow
              interactive={interactive}
              label="주 타겟 근육"
              onPress={onOpenPrimaryMuscle}
              testID="custom-exercise-primary-muscle"
              value={draft.primaryMuscle || '선택'}
            />
            <View style={styles.rowDivider} />
            <SettingsRow
              interactive={interactive}
              label="보조 타겟 근육"
              onPress={onOpenSecondaryMuscle}
              testID="custom-exercise-secondary-muscle"
              value={draft.secondaryMuscle || '선택 안 함'}
            />
            <View style={styles.rowDivider} />
            <SettingsRow
              hideChevron={historyLocked}
              interactive={interactive && !historyLocked}
              label="기록 방식"
              onPress={historyLocked ? undefined : onOpenRecordingType}
              testID="custom-exercise-recording-type"
              value={recordingTypeLabel(draft.recordingType)}
            />
          </View>
          {historyLocked ? (
            <View style={styles.hint} testID="custom-exercise-history-lock-hint">
              <FigmaImage height={16} source={figmaAssets.icons.hint} width={16} />
              <Text style={styles.hintText}>
                기록이 있는 운동은 기록 방식을 변경할 수 없어요.
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !canSave }}
          disabled={!interactive || !canSave}
          onPress={onSave}
          style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
          testID="custom-exercise-save"
        >
          <Text style={styles.saveLabel}>저장</Text>
        </Pressable>
      </View>
    </ExerciseScreenChrome>
  );
}

function SettingsRow({
  label,
  value,
  onPress,
  interactive,
  hideChevron = false,
  testID,
}: {
  label: string;
  value: string;
  onPress?: () => void;
  interactive: boolean;
  hideChevron?: boolean;
  testID: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={!interactive || !onPress}
      onPress={onPress}
      style={styles.settingsRow}
      testID={testID}
    >
      <Text style={styles.settingsLabel}>{label}</Text>
      <View style={styles.settingsValue}>
        <Text style={styles.settingsValueText}>{value}</Text>
        {hideChevron ? null : (
          <FigmaImage height={16} source={figmaAssets.icons.chevronRight} width={16} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  form: {
    padding: 20,
    gap: 24,
    paddingBottom: 120,
  },
  thumbnailWrap: {
    alignItems: 'center',
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    gap: 8,
  },
  label: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  input: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  settingsCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingsRow: {
    minHeight: 56,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingsLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  settingsValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  settingsValueText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  rowDivider: {
    height: 1,
    backgroundColor: colors.borderDefault,
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minHeight: 18,
  },
  hintText: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 98,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  saveButton: {
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.brandAction,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.3,
  },
  saveLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textOnBrand,
  },
});
