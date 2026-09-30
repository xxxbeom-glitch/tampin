import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fontFamily } from '../../design-system/tokens';
import { ATTACHMENT_OPTIONS } from './exerciseCatalog';
import { ExerciseSearchScreen, type ExerciseSearchScreenProps } from './ExerciseSearchScreen';

export type ExerciseAttachmentSheetProps = ExerciseSearchScreenProps & {
  exerciseName: string;
  mode: 'select' | 'input';
  customAttachment: string;
  onSelectAttachment?: (value: string) => void;
  onCustomAttachmentChange?: (value: string) => void;
  onConfirmCustomAttachment?: () => void;
};

export function ExerciseAttachmentSheet({
  exerciseName,
  mode,
  customAttachment,
  onSelectAttachment,
  onCustomAttachmentChange,
  onConfirmCustomAttachment,
  ...searchProps
}: ExerciseAttachmentSheetProps) {
  const interactive = !searchProps.readOnly;

  return (
    <View style={styles.root} testID="exercise-attachment-sheet">
      <ExerciseSearchScreen {...searchProps} />
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          {mode === 'select' ? (
            <>
              <Text style={styles.title}>손잡이 선택</Text>
              <Text style={styles.body}>{exerciseName}에서 사용할 손잡이를 선택하세요.</Text>
              <View style={styles.list}>
                {ATTACHMENT_OPTIONS.map((option, index) => (
                  <View key={option}>
                    <Pressable
                      accessibilityRole="button"
                      disabled={!interactive}
                      onPress={() => onSelectAttachment?.(option)}
                      style={styles.row}
                      testID={`exercise-attachment-option-${option}`}
                    >
                      <Text style={styles.rowLabel}>{option}</Text>
                    </Pressable>
                    {index < ATTACHMENT_OPTIONS.length - 1 ? (
                      <View style={styles.divider} />
                    ) : null}
                  </View>
                ))}
              </View>
            </>
          ) : (
            <>
              <Text style={styles.title}>손잡이 직접 입력</Text>
              <TextInput
                accessibilityLabel="손잡이 이름"
                editable={interactive}
                onChangeText={onCustomAttachmentChange}
                placeholder="손잡이 이름"
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                testID="exercise-attachment-input"
                value={customAttachment}
              />
              <Pressable
                accessibilityRole="button"
                disabled={!interactive || customAttachment.trim().length === 0}
                onPress={onConfirmCustomAttachment}
                style={styles.confirm}
                testID="exercise-attachment-input-confirm"
              >
                <Text style={styles.confirmLabel}>확인</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.52)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.borderDefault,
    marginBottom: 16,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  body: {
    marginTop: 4,
    marginBottom: 16,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  list: {
    overflow: 'hidden',
  },
  row: {
    minHeight: 52,
    justifyContent: 'center',
  },
  rowLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderDefault,
  },
  input: {
    marginTop: 16,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    backgroundColor: colors.canvas,
    paddingHorizontal: 16,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.textPrimary,
  },
  confirm: {
    marginTop: 16,
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.brandAction,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.textOnBrand,
  },
});
