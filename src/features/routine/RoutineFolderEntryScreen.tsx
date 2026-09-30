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

export type RoutineFolderOption = {
  id: string;
  label: string;
};

export type RoutineFolderEntryScreenProps = {
  folders: RoutineFolderOption[];
  selectedFolderId: string | null;
  newFolderName: string;
  onBack?: () => void;
  onSelectFolder?: (folderId: string) => void;
  onNewFolderNameChange?: (name: string) => void;
  onContinue?: () => void;
  readOnly?: boolean;
};

export function RoutineFolderEntryScreen({
  folders,
  selectedFolderId,
  newFolderName,
  onBack,
  onSelectFolder,
  onNewFolderNameChange,
  onContinue,
  readOnly = false,
}: RoutineFolderEntryScreenProps) {
  const canContinue =
    selectedFolderId !== null || newFolderName.trim().length > 0;
  const interactive = !readOnly;

  return (
    <View style={styles.root} testID="routine-folder-entry-screen">
      <View style={styles.statusSpacer} />
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="뒤로"
          accessibilityRole="button"
          disabled={!interactive}
          onPress={onBack}
          style={styles.headerSide}
          testID="routine-folder-entry-back"
        >
          <FigmaImage
            height={24}
            source={figmaAssets.icons.arrowLeft}
            width={24}
          />
        </Pressable>
        <Text accessibilityRole="header" style={styles.headerTitle}>
          폴더 선택
        </Text>
        <View style={styles.headerSide} />
      </View>

      <View style={styles.content}>
        <Text style={styles.intro}>루틴을 만들 폴더를 먼저 선택하세요.</Text>

        {folders.length > 0 ? (
          <View style={styles.folderList} testID="routine-folder-entry-options">
            {folders.map((folder) => {
              const selected = selectedFolderId === folder.id;
              return (
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selected, disabled: !interactive }}
                  disabled={!interactive}
                  key={folder.id}
                  onPress={() => onSelectFolder?.(folder.id)}
                  style={[
                    styles.folderOption,
                    selected && styles.folderOptionSelected,
                  ]}
                  testID={`routine-folder-option-${folder.id}`}
                >
                  <Text
                    style={[
                      styles.folderOptionLabel,
                      selected && styles.folderOptionLabelSelected,
                    ]}
                  >
                    {folder.label}
                  </Text>
                  <View
                    style={[
                      styles.radio,
                      selected && styles.radioSelected,
                    ]}
                  />
                </Pressable>
              );
            })}
          </View>
        ) : null}

        {folders.length > 0 ? <Text style={styles.orLabel}>또는</Text> : null}

        <View style={styles.inputSection}>
          <Text style={styles.label}>새 폴더 이름</Text>
          <TextInput
            editable={interactive}
            onChangeText={onNewFolderNameChange}
            placeholder="예: PPL 루틴"
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
            testID="routine-folder-entry-new-name"
            value={newFolderName}
          />
        </View>

        <View style={styles.flexSpacer} />

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !interactive || !canContinue }}
          disabled={!interactive || !canContinue}
          onPress={onContinue}
          style={[
            styles.continueButton,
            (!interactive || !canContinue) && styles.continueButtonDisabled,
          ]}
          testID="routine-folder-entry-continue"
        >
          <Text style={styles.continueLabel}>다음</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  intro: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.textPrimary,
    marginBottom: 20,
  },
  folderList: {
    gap: 8,
  },
  folderOption: {
    height: 52,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderDefault,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  folderOptionSelected: {
    borderColor: colors.brandPrimary,
  },
  folderOptionLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  folderOptionLabelSelected: {
    fontFamily: fontFamily.bold,
    color: colors.brandPrimary,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.borderDefault,
  },
  radioSelected: {
    borderWidth: 5,
    borderColor: colors.brandPrimary,
  },
  orLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginVertical: 16,
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
  flexSpacer: {
    flex: 1,
  },
  continueButton: {
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.brandAction,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.3,
  },
  continueLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textOnBrand,
  },
});
