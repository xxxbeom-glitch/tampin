import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../design-system/tokens';
import { APP_DISPLAY_NAME } from '../../platform';

export function SplashScreen() {
  return (
    <View style={styles.root} testID="splash-screen">
      <Text accessibilityRole="header" style={styles.wordmark} testID="splash-wordmark">
        {APP_DISPLAY_NAME.toUpperCase()}
      </Text>
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
  wordmark: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: 0.5,
    color: colors.textOnBrand,
  },
});
