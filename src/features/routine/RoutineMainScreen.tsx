import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { figmaAssets } from '../../design-system/assets';
import { FigmaImage } from '../../design-system/components/FigmaImage';
import { colors, fontFamily } from '../../design-system/tokens';
import {
  ROUTINE_MAIN_BOTTOM_TABS,
  ROUTINE_MAIN_LAYOUT,
  ROUTINE_MAIN_TITLE,
  ROUTINE_QUICK_START_COPY,
} from './routineMainContent';
import type {
  RoutineMainCardModel,
  RoutineMainFolderModel,
  RoutineMainScreenProps,
} from './routineMainTypes';

function PlusIcon() {
  return (
    <FigmaImage
      height={16}
      source={figmaAssets.icons.plus}
      testID="routine-main-plus-icon"
      width={16}
    />
  );
}

function ChevronRightIcon() {
  return (
    <FigmaImage
      height={16}
      source={figmaAssets.icons.chevronRight}
      testID="routine-main-chevron-icon"
      width={16}
    />
  );
}

function FolderChevron({ collapsed }: { collapsed: boolean }) {
  return (
    <FigmaImage
      height={16}
      source={figmaAssets.icons.folderChevronExpanded}
      style={collapsed ? styles.folderChevronCollapsed : undefined}
      testID="routine-main-folder-chevron"
      width={16}
    />
  );
}

function QuickStartCard({
  label,
  disabled,
  onPress,
  testID,
}: {
  label: string;
  disabled: boolean;
  onPress?: () => void;
  testID: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={styles.quickStartCard}
      testID={testID}
    >
      <Text style={styles.quickStartLabel}>{label}</Text>
      <View style={styles.quickActionCircle}>
        <PlusIcon />
      </View>
    </Pressable>
  );
}

function MuscleTag({
  label,
  backgroundColor,
  textColor,
}: {
  label: string;
  backgroundColor: string;
  textColor: string;
}) {
  return (
    <View style={[styles.muscleTag, { backgroundColor }]}>
      <Text style={[styles.muscleTagLabel, { color: textColor }]}>{label}</Text>
    </View>
  );
}

function RoutineCompactCard({
  routine,
  disabled,
  onPress,
}: {
  routine: RoutineMainCardModel;
  disabled: boolean;
  onPress?: (routineId: string) => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={() => onPress?.(routine.id)}
      style={styles.routineCard}
      testID={`routine-card-${routine.id}`}
    >
      <View style={styles.routineCardTopRow}>
        <View style={styles.routineTitleGroup}>
          <View style={styles.routineIconPlaceholder} />
          <Text style={styles.routineCardTitle}>{routine.title}</Text>
        </View>
        <View style={styles.routineCardTopRight}>
          <View style={styles.timeChip}>
            <Text style={styles.timeChipLabel}>{routine.durationLabel}</Text>
          </View>
          <ChevronRightIcon />
        </View>
      </View>
      <View style={styles.routineTagRow}>
        {routine.tags.map((tag) => (
          <MuscleTag
            key={`${routine.id}-${tag.label}-${tag.textColor}`}
            backgroundColor={tag.backgroundColor}
            label={tag.label}
            textColor={tag.textColor}
          />
        ))}
      </View>
    </Pressable>
  );
}

function RoutineFolderSection({
  folder,
  cardsDisabled,
  onOpenRoutineDetail,
}: {
  folder: RoutineMainFolderModel;
  cardsDisabled: boolean;
  onOpenRoutineDetail?: (routineId: string) => void;
}) {
  return (
    <View style={styles.folderSection} testID={`routine-folder-${folder.id}`}>
      <View style={styles.folderHeader}>
        <FolderChevron collapsed={folder.collapsed} />
        <Text style={styles.folderHeaderLabel}>{folder.label}</Text>
      </View>
      {!folder.collapsed
        ? folder.routines.map((routine) => (
            <RoutineCompactCard
              disabled={cardsDisabled}
              key={routine.id}
              onPress={onOpenRoutineDetail}
              routine={routine}
            />
          ))
        : null}
    </View>
  );
}

function bottomTabIconSource(label: string, active: boolean) {
  if (label === ROUTINE_MAIN_BOTTOM_TABS.routine) {
    return active
      ? figmaAssets.icons.bottomTabRoutineActive
      : figmaAssets.icons.bottomTabRoutineInactive;
  }
  if (label === ROUTINE_MAIN_BOTTOM_TABS.analysis) {
    return active
      ? figmaAssets.icons.bottomTabAnalysisActive
      : figmaAssets.icons.bottomTabAnalysisInactive;
  }
  return active
    ? figmaAssets.icons.bottomTabSettingsActive
    : figmaAssets.icons.bottomTabSettingsInactive;
}

function BottomTab({
  label,
  active,
  disabled,
  onPress,
  testID,
}: {
  label: string;
  active: boolean;
  disabled: boolean;
  onPress?: () => void;
  testID: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled, selected: active }}
      disabled={disabled}
      onPress={onPress}
      style={styles.bottomTab}
      testID={testID}
    >
      <View style={styles.bottomTabIconWrap}>
        <FigmaImage
          height={24}
          source={bottomTabIconSource(label, active)}
          testID={`routine-main-tab-icon-${label}`}
          width={24}
        />
      </View>
      <Text
        style={[
          styles.bottomTabLabel,
          active ? styles.bottomTabLabelActive : styles.bottomTabLabelInactive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function RoutineMainBottomAppBar({
  interactive,
  onOpenAnalysis,
  onOpenSettings,
}: {
  interactive: boolean;
  onOpenAnalysis?: () => void;
  onOpenSettings?: () => void;
}) {
  return (
    <View pointerEvents="box-none" style={styles.bottomBarWrap}>
      <View style={styles.bottomBarContainer} testID="routine-main-bottom-app-bar">
        <BottomTab
          active
          disabled
          label={ROUTINE_MAIN_BOTTOM_TABS.routine}
          testID="routine-main-tab-routine"
        />
        <BottomTab
          active={false}
          disabled={!interactive}
          label={ROUTINE_MAIN_BOTTOM_TABS.analysis}
          onPress={onOpenAnalysis}
          testID="routine-main-tab-analysis"
        />
        <BottomTab
          active={false}
          disabled={!interactive}
          label={ROUTINE_MAIN_BOTTOM_TABS.settings}
          onPress={onOpenSettings}
          testID="routine-main-tab-settings"
        />
      </View>
    </View>
  );
}

export function RoutineMainScreen({
  state,
  folders = [],
  onQuickStartWithoutRoutine,
  onCreateRoutine,
  onOpenRoutineDetail,
  onOpenAnalysis,
  onOpenSettings,
  readOnly = false,
}: RoutineMainScreenProps) {
  const interactive = !readOnly;

  return (
    <View style={styles.root} testID="routine-main-screen">
      <View style={styles.statusSpacer} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="routine-main-scroll"
      >
        <View style={styles.content} testID="routine-main-content">
          <Text accessibilityRole="header" style={styles.title}>
            {ROUTINE_MAIN_TITLE}
          </Text>

          <View style={styles.quickStartSection}>
            <QuickStartCard
              disabled={!interactive}
              label={ROUTINE_QUICK_START_COPY.withoutRoutine}
              onPress={onQuickStartWithoutRoutine}
              testID="routine-quickstart-without-routine"
            />
            <QuickStartCard
              disabled={!interactive}
              label={ROUTINE_QUICK_START_COPY.createRoutine}
              onPress={onCreateRoutine}
              testID="routine-quickstart-create-routine"
            />
          </View>

          {state === 'WithRoutines'
            ? folders.map((folder) => (
                <RoutineFolderSection
                  cardsDisabled={!interactive}
                  folder={folder}
                  key={folder.id}
                  onOpenRoutineDetail={onOpenRoutineDetail}
                />
              ))
            : null}
        </View>
      </ScrollView>

      <RoutineMainBottomAppBar
        interactive={interactive}
        onOpenAnalysis={onOpenAnalysis}
        onOpenSettings={onOpenSettings}
      />
    </View>
  );
}

// Figma Elevation/Card: DROP_SHADOW offset (0,0) radius 8 spread 0 color #0000000d.
// MCP CSS sometimes emits drop-shadow 4px for the same effect; the Figma effect radius is 8.
// RN shadowRadius is not the same blur as Figma/CSS. Android elevation is Material Z.
const cardShadow = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 2,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  statusSpacer: {
    height: 62,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  content: {
    width: '100%',
    maxWidth: ROUTINE_MAIN_LAYOUT.canonicalViewportWidth,
    alignSelf: 'center',
    paddingHorizontal: ROUTINE_MAIN_LAYOUT.horizontalInset,
    gap: 32,
  },
  title: {
    fontSize: 27,
    fontFamily: fontFamily.bold,
    lineHeight: 32,
    color: colors.textPrimary,
  },
  quickStartSection: {
    gap: 12,
  },
  quickStartCard: {
    width: '100%',
    minHeight: 72,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#BBC0C9',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quickStartLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: fontFamily.bold,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  quickActionCircle: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: colors.subtleSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  folderSection: {
    gap: 12,
  },
  folderHeader: {
    height: 26,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  folderChevronCollapsed: {
    transform: [{ rotate: '-90deg' }],
  },
  folderHeaderLabel: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    lineHeight: 26,
    color: '#979DA9',
  },
  routineCard: {
    width: '100%',
    minHeight: 108,
    borderRadius: 20,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 10,
    ...cardShadow,
  },
  routineCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  routineTitleGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  routineIconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.subtleSurface,
  },
  routineCardTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  routineCardTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeChip: {
    minWidth: 38,
    height: 20,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#F2D3BC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  timeChipLabel: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    lineHeight: 14,
    color: '#F05A1F',
  },
  routineTagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  muscleTag: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  muscleTagLabel: {
    fontSize: 11,
    fontFamily: fontFamily.semiBold,
    lineHeight: 14,
  },
  bottomBarWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 2,
    alignItems: 'center',
  },
  bottomBarContainer: {
    width: 280,
    borderRadius: 999,
    backgroundColor: colors.surface,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...cardShadow,
  },
  bottomTab: {
    width: 81,
    alignItems: 'center',
    gap: 2,
  },
  bottomTabIconWrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTabLabel: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    lineHeight: 14,
    textAlign: 'center',
  },
  bottomTabLabelActive: {
    color: colors.brandPrimary,
  },
  bottomTabLabelInactive: {
    color: colors.textSecondary,
  },
});
