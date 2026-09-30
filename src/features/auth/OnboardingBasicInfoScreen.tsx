import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../design-system/tokens';

/** 01C_Basic_Info flow boundary placeholder — profile UI arrives in a later Issue. */
export function OnboardingBasicInfoScreen() {
  return (
    <View style={styles.root} testID="flow-boundary-OnboardingBasicInfo">
      <Text style={styles.title}>OnboardingBasicInfo</Text>
      <Text style={styles.body}>
        Basic Info / first-run boundary placeholder after development local sign-in.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
