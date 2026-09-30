import type { ImageSourcePropType } from 'react-native';

/** Bundled Figma-derived assets; paths mirror assets/figma/manifest.json. */
export const figmaAssets = {
  logos: {
    tampinWhite: require('../../../assets/figma/logos/tampin-logo-white.png'),
    tampinPrimary: require('../../../assets/figma/logos/tampin-logo-primary.png'),
  },
  icons: {
    plus: require('../../../assets/figma/icons/icon-plus.png'),
    chevronRight: require('../../../assets/figma/icons/icon-chevron-right.png'),
    folderChevronExpanded: require('../../../assets/figma/icons/icon-folder-chevron-expanded.png'),
    arrowLeft: require('../../../assets/figma/icons/icon-arrow-left.png'),
    edit: require('../../../assets/figma/icons/icon-edit.png'),
    bottomTabRoutine: require('../../../assets/figma/icons/bottom-tab-routine.png'),
    bottomTabAnalysis: require('../../../assets/figma/icons/bottom-tab-analysis.png'),
    bottomTabSettings: require('../../../assets/figma/icons/bottom-tab-settings.png'),
  },
  thumbnails: {
    smithBenchPress: require('../../../assets/figma/thumbnails/exercise-smith-bench-press.png'),
    romanianDeadlift: require('../../../assets/figma/thumbnails/exercise-romanian-deadlift.png'),
    standingCalfRaise: require('../../../assets/figma/thumbnails/exercise-standing-calf-raise.png'),
    lateralRaise: require('../../../assets/figma/thumbnails/exercise-lateral-raise.png'),
  },
} as const;

/** Maps routine-detail fixture exercise ids to exported Figma thumbnails. */
export const exerciseThumbnailById: Record<string, ImageSourcePropType> = {
  'smith-bench-press': figmaAssets.thumbnails.smithBenchPress,
  'barbell-rdl': figmaAssets.thumbnails.romanianDeadlift,
  'seated-calf-raise': figmaAssets.thumbnails.standingCalfRaise,
  'dumbbell-lateral-raise': figmaAssets.thumbnails.lateralRaise,
};
