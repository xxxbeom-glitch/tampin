import { StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';
import { colors } from '../../../design-system/tokens';
import type { RootStackParamList } from '../types';

type PlaceholderRouteName = Exclude<
  keyof RootStackParamList,
  'Bootstrap' | 'Auth' | 'OnboardingBasicInfo' | 'UiCatalog'
>;

export function FlowBoundaryPlaceholderScreen() {
  const route =
    useRoute<RouteProp<RootStackParamList, PlaceholderRouteName>>();

  return (
    <View style={styles.root} testID={`flow-boundary-${route.name}`}>
      <Text style={styles.title}>{route.name}</Text>
      <Text style={styles.body}>
        MVP flow boundary placeholder — product screen arrives in a later Issue.
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
