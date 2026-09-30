import { routineDetailCatalogFixture } from '../../../features/routine/routineDetailFixtures';
import type { RoutineDetailModel } from '../../../features/routine/routineDetailTypes';

export type RoutineDetailCatalogPreset = {
  fixture: RoutineDetailModel;
};

export const routineDetailCatalogPresets: Record<string, RoutineDetailCatalogPreset> =
  {
    '02d-routine-detail-default': {
      fixture: routineDetailCatalogFixture,
    },
  };
