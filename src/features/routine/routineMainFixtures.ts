import type { RoutineMainFixture } from './routineMainTypes';

const chestTag = {
  label: '가슴',
  backgroundColor: '#E7F8F0',
  textColor: '#16845F',
} as const;

const shoulderTagOrange = {
  label: '어깨',
  backgroundColor: '#FFF0E5',
  textColor: '#D56B1F',
} as const;

const backTag = {
  label: '등',
  backgroundColor: '#F2EFFF',
  textColor: '#7254D6',
} as const;

const shoulderTagBlue = {
  label: '어깨',
  backgroundColor: '#EAF2FF',
  textColor: '#4476B8',
} as const;

const legsTag = {
  label: '하체',
  backgroundColor: '#FCEAF4',
  textColor: '#B54F83',
} as const;

const coreTag = {
  label: '코어',
  backgroundColor: '#FFF6DF',
  textColor: '#9A6B0A',
} as const;

/** Deterministic WithRoutines fixture aligned to Figma 02A_Routine_Main (`2483:8317`). */
export const routineMainWithRoutinesFixture: RoutineMainFixture = {
  state: 'WithRoutines',
  folders: [
    {
      id: 'ppl-routine',
      label: 'PPL Routine',
      collapsed: false,
      routines: [
        {
          id: 'push-day',
          title: 'Push Day',
          durationLabel: '45분',
          tags: [chestTag, shoulderTagOrange],
        },
        {
          id: 'pull-day',
          title: 'Pull Day',
          durationLabel: '45분',
          tags: [backTag, shoulderTagBlue],
        },
        {
          id: 'leg-day',
          title: 'Leg Day',
          durationLabel: '50분',
          tags: [legsTag, coreTag],
        },
      ],
    },
    {
      id: 'three-day-split',
      label: '3분할 루틴',
      collapsed: true,
      routines: [],
    },
  ],
};

/** Deterministic Empty fixture aligned to Figma 02B_Routine_Main_Empty (`2483:8418`). */
export const routineMainEmptyFixture: RoutineMainFixture = {
  state: 'Empty',
  folders: [],
};
