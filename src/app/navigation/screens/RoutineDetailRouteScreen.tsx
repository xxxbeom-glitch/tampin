import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { colors } from '../../../design-system/tokens';
import {
  RoutineDetailScreen,
  resolveRoutineDetailFixture,
} from '../../../features/routine';
import type { RootStackParamList } from '../types';

type RoutineDetailNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'RoutineDetail'
>;

type RoutineDetailRoute = RouteProp<RootStackParamList, 'RoutineDetail'>;

export function RoutineDetailRouteScreen() {
  const navigation = useNavigation<RoutineDetailNavigation>();
  const route = useRoute<RoutineDetailRoute>();
  const detail = resolveRoutineDetailFixture(route.params.routineId);

  if (!detail) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.canvas,
          paddingHorizontal: 24,
        }}
        testID="routine-detail-missing-fixture"
      >
        <Text style={{ color: colors.textSecondary }}>
          Routine detail fixture not found for {route.params.routineId}
        </Text>
      </View>
    );
  }

  return (
    <RoutineDetailScreen
      detail={detail}
      onBack={() => {
        navigation.goBack();
      }}
      onStartWorkout={() => {
        navigation.navigate('ActiveWorkout');
      }}
    />
  );
}
