import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../design-system/tokens';

type DevCatalogEntryAffordanceProps = {
  onPress: () => void;
};

/** Dev-only entry to open the UI Catalog without adding controls to product screens. */
export function DevCatalogEntryAffordance({
  onPress,
}: DevCatalogEntryAffordanceProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Open UI Catalog"
      onPress={onPress}
      style={styles.entry}
      testID="open-ui-catalog"
    >
      <Text style={styles.label}>UI Catalog</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  entry: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderColor: colors.borderSubtle,
    borderWidth: 1,
    opacity: 0.92,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
