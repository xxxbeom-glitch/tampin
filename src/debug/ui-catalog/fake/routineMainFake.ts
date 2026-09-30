import {
  routineMainEmptyFixture,
  routineMainWithRoutinesFixture,
} from '../../../features/routine/routineMainFixtures';
import type { RoutineMainFixture } from '../../../features/routine/routineMainTypes';

export type RoutineMainCatalogPreset = {
  fixture: RoutineMainFixture;
};

export const routineMainCatalogPresets: Record<string, RoutineMainCatalogPreset> =
  {
    '02a-routine-main-with-routines': {
      fixture: routineMainWithRoutinesFixture,
    },
    '02b-routine-main-empty': {
      fixture: routineMainEmptyFixture,
    },
  };
