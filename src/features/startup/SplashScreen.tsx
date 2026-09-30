import { StyleSheet, View } from 'react-native';
import { figmaAssets } from '../../design-system/assets';
import { FigmaImage } from '../../design-system/components/FigmaImage';
import { colors } from '../../design-system/tokens';

export function SplashScreen() {
  return (
    <View style={styles.root} testID="splash-screen">
      <FigmaImage
        accessibilityLabel="Tampin"
        decorative={false}
        height={28}
        source={figmaAssets.logos.tampinWhite}
        testID="splash-wordmark"
        width={120}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
