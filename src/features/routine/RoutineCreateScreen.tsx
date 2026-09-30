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

export type RoutineCreateScreenProps = {
  folderName: string;
  routineName: string;
  onBack?: () => void;
  onRoutineNameChange?: (name: string) => void;
  onAddExercise?: () => void;
  readOnly?: boolean;
};

export function RoutineCreateScreen({
  folderName,
  routineName,
  onBack,
  onRoutineNameChange,
  onAddExercise,
  readOnly = false,
}: RoutineCreateScreenProps) {
  const interactive = !readOnly;

  return (
    <View style={styles.root} testID="routine-create-screen">
      <View style={styles.statusSpacer} />
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="뒤로"
          accessibilityRole="button"
          disabled={!interactive}
          onPress={onBack}
          style={styles.headerSide}
          testID="routine-create-back"
        >
          <FigmaImage
            height={24}
            source={figmaAssets.icons.arrowLeft}
            width={24}
          />
        </Pressable>
        <Text accessibilityRole="header" style={styles.headerTitle}>
          루틴 만들기
        </Text>
        <View style={styles.headerSide} />
      </View>

      <View style={styles.form}>
        <View style={styles.inputSection}>
          <Text style={styles.label}>폴더 이름</Text>
          <TextInput
            accessibilityLabel="폴더 이름"
            editable={false}
            style={styles.input}
            testID="routine-create-folder-name"
            value={folderName}
          />
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>루틴 이름</Text>
          <TextInput
            accessibilityLabel="루틴 이름"
            editable={interactive}
            onChangeText={onRoutineNameChange}
            placeholder="예: 상체 루틴"
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
            testID="routine-create-routine-name"
            value={routineName}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !interactive || !onAddExercise }}
          disabled={!interactive || !onAddExercise}
          onPress={onAddExercise}
          style={styles.addExerciseButton}
          testID="routine-create-add-exercise"
        >
          <Text style={styles.addExerciseLabel}>운동 추가</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <View
          accessibilityRole="button"
          accessibilityState={{ disabled: true }}
          style={[styles.saveButton, styles.saveButtonDisabled]}
          testID="routine-create-save"
        >
          <Text style={styles.saveLabel}>저장</Text>
        </View>
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
    height: 62,
  },
  header: {
    height: 56,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSide: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  form: {
    height: 564,
    padding: 20,
    gap: 24,
  },
  inputSection: {
    gap: 8,
  },
  label: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  input: {
    width: '100%',
    height: 52,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  addExerciseButton: {
    width: '100%',
    height: 58,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D7DCDA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addExerciseLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
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
