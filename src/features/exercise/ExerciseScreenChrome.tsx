import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { figmaAssets } from '../../design-system/assets';
import { FigmaImage } from '../../design-system/components/FigmaImage';
import { colors, fontFamily } from '../../design-system/tokens';

export function ExerciseScreenChrome({
  title,
  onBack,
  right,
  children,
  testID,
  readOnly = false,
}: {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
  children: ReactNode;
  testID: string;
  readOnly?: boolean;
}) {
  return (
    <View style={styles.root} testID={testID}>
      <View style={styles.statusSpacer} />
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="뒤로"
          accessibilityRole="button"
          disabled={readOnly || !onBack}
          onPress={onBack}
          style={styles.headerSide}
          testID={`${testID}-back`}
        >
          <FigmaImage height={24} source={figmaAssets.icons.arrowLeft} width={24} />
        </Pressable>
        <Text accessibilityRole="header" style={styles.headerTitle}>
          {title}
        </Text>
        <View style={styles.headerSide}>{right}</View>
      </View>
      {children}
    </View>
  );
}

export function AddToggle({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <FigmaImage
        height={26}
        source={figmaAssets.icons.addToggleSelected}
        width={26}
      />
    );
  }

  return (
    <View style={[styles.toggle, styles.toggleIdle]}>
      <View style={styles.plusHorizontal} />
      <View style={styles.plusVertical} />
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
  toggle: {
    width: 26,
    height: 26,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleIdle: {
    backgroundColor: colors.subtleSurface,
  },
  plusHorizontal: {
    position: 'absolute',
    width: 12,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.brandPrimary,
  },
  plusVertical: {
    position: 'absolute',
    width: 2,
    height: 12,
    borderRadius: 1,
    backgroundColor: colors.brandPrimary,
  },
});
