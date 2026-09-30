import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  RoutineMainScreen,
  routineMainWithRoutinesFixture,
} from '../../../features/routine';
import type { RootStackParamList } from '../types';

type RoutineHomeNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'RoutineHome'
>;

export function RoutineHomeRouteScreen() {
  const navigation = useNavigation<RoutineHomeNavigation>();
  const { folders } = routineMainWithRoutinesFixture;

  return (
    <RoutineMainScreen
      folders={folders}
      onCreateRoutine={() => {
        navigation.navigate('RoutineEditor');
      }}
      onOpenAnalysis={() => {
        navigation.navigate('Analysis');
      }}
      onOpenSettings={() => {
        navigation.navigate('Settings');
      }}
      onQuickStartWithoutRoutine={() => {
        navigation.navigate('ActiveWorkout');
      }}
      state="WithRoutines"
    />
  );
}
