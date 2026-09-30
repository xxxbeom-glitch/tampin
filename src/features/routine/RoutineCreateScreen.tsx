import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { figmaAssets } from '../../design-system/assets';
import { FigmaImage } from '../../design-system/components/FigmaImage';
import { colors, fontFamily } from '../../design-system/tokens';
import type { RoutineCreateDraftExercise } from './routineCreateDraft';

export type RoutineCreateScreenProps = {
  folderName: string;
  routineName: string;
  exercises?: readonly RoutineCreateDraftExercise[];
  onBack?: () => void;
  onRoutineNameChange?: (name: string) => void;
  onAddExercise?: () => void;
  readOnly?: boolean;
};

export function RoutineCreateScreen({
  folderName,
  routineName,
  exercises = [],
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

      <ScrollView contentContainerStyle={styles.form} style={styles.formScroll}>
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

        {exercises.length > 0 ? (
          <View style={styles.draftList} testID="routine-create-draft-exercises">
            <Text style={styles.draftLabel}>선택한 운동 ({exercises.length}개)</Text>
            {exercises.map((item) => (
              <View key={item.id} style={styles.draftRow} testID={`routine-create-draft-${item.id}`}>
                <FigmaImage
                  height={52}
                  source={figmaAssets.thumbnails[item.thumbnailKey]}
                  style={styles.draftThumbnail}
                  width={52}
                />
                <View style={styles.draftCopy}>
                  <Text numberOfLines={1} style={styles.draftTitle}>
                    {item.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.draftMeta}>
                    {item.attachment
                      ? `${item.primaryMuscle} · ${item.equipment} · ${item.attachment}`
                      : `${item.primaryMuscle} · ${item.equipment}`}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>

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
  formScroll: {
    flex: 1,
  },
  form: {
    padding: 20,
    paddingBottom: 120,
    gap: 24,
  },
  draftList: {
    gap: 8,
  },
  draftLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: '#929A98',
  },
  draftRow: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  draftThumbnail: {
    width: 52,
    height: 52,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  draftCopy: {
    flex: 1,
    gap: 4,
  },
  draftTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  draftMeta: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    lineHeight: 14,
    color: colors.textSecondary,
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
