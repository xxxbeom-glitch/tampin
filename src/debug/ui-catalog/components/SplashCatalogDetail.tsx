import { StyleSheet, Text, View } from 'react-native';
import { SplashScreen } from '../../../features/startup';
import { colors } from '../../../design-system/tokens';

type SplashCatalogDetailProps = {
  entryId: string;
  frameName: string;
  stateLabel: string;
};

export function SplashCatalogDetail({
  entryId,
  frameName,
  stateLabel,
}: SplashCatalogDetailProps) {
  return (
    <View style={styles.root} testID={`catalog-splash-${entryId}`}>
      <Text style={styles.meta}>
        {frameName} / {stateLabel}
      </Text>
      <SplashScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  meta: {
    fontSize: 13,
    color: colors.textSecondary,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
});
