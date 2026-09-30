/** Active MVP recording types exposed in custom-exercise flows. */
export type ActiveRecordingType =
  | 'weight_reps'
  | 'reps'
  | 'duration'
  | 'assisted_weight_reps';

export const ACTIVE_RECORDING_TYPES = [
  'weight_reps',
  'reps',
  'duration',
  'assisted_weight_reps',
] as const satisfies readonly ActiveRecordingType[];
