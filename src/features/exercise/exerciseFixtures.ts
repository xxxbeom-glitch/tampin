import type {
  CustomExerciseDraft,
  ExerciseCatalogItem,
  ExerciseDetailModel,
} from './types';

export const exerciseCatalogFixture: ExerciseCatalogItem[] = [
  {
    id: 'bench-press',
    name: '벤치프레스',
    equipment: '바벨',
    bodyPart: '가슴',
    primaryMuscle: '대흉근',
    secondaryMuscles: '삼두근 · 전면 삼각근',
    recordingType: 'weight_reps',
    recent: true,
    needsAttachment: false,
    thumbnailKey: 'smithBenchPress',
  },
  {
    id: 'lat-pulldown',
    name: '랫풀다운',
    equipment: '케이블',
    bodyPart: '등',
    primaryMuscle: '광배근',
    secondaryMuscles: '이두근',
    recordingType: 'weight_reps',
    recent: true,
    needsAttachment: true,
    thumbnailKey: 'romanianDeadlift',
  },
  {
    id: 'dumbbell-curl',
    name: '덤벨 컬',
    equipment: '덤벨',
    bodyPart: '팔',
    primaryMuscle: '이두근',
    secondaryMuscles: '',
    recordingType: 'weight_reps',
    recent: true,
    needsAttachment: false,
    thumbnailKey: 'standingCalfRaise',
  },
  {
    id: 'dumbbell-lateral-raise',
    name: '덤벨 레터럴 레이즈',
    equipment: '덤벨',
    bodyPart: '어깨',
    primaryMuscle: '측면 삼각근',
    secondaryMuscles: '',
    recordingType: 'weight_reps',
    recent: false,
    needsAttachment: false,
    thumbnailKey: 'lateralRaise',
  },
  {
    id: 'leg-extension',
    name: '레그 익스텐션 머신',
    equipment: '머신',
    bodyPart: '하체',
    primaryMuscle: '대퇴사두근',
    secondaryMuscles: '',
    recordingType: 'weight_reps',
    recent: false,
    needsAttachment: false,
    thumbnailKey: 'standingCalfRaise',
  },
  {
    id: 'crunch',
    name: '크런치',
    equipment: '맨몸',
    bodyPart: '코어',
    primaryMuscle: '복직근',
    secondaryMuscles: '',
    recordingType: 'reps',
    recent: false,
    needsAttachment: false,
    thumbnailKey: 'lateralRaise',
  },
  {
    id: 'hack-squat',
    name: '핵 스쿼트 머신',
    equipment: '머신',
    bodyPart: '하체',
    primaryMuscle: '대퇴사두근',
    secondaryMuscles: '둔근',
    recordingType: 'weight_reps',
    recent: false,
    needsAttachment: false,
    thumbnailKey: 'romanianDeadlift',
  },
  {
    id: 'plank',
    name: '플랭크',
    equipment: '맨몸',
    bodyPart: '코어',
    primaryMuscle: '코어',
    secondaryMuscles: '',
    recordingType: 'duration',
    recent: false,
    needsAttachment: false,
    thumbnailKey: 'lateralRaise',
  },
  {
    id: 'assisted-pull-up',
    name: '어시스트 풀업',
    equipment: '머신',
    bodyPart: '등',
    primaryMuscle: '광배근',
    secondaryMuscles: '이두근',
    recordingType: 'assisted',
    recent: false,
    needsAttachment: false,
    thumbnailKey: 'romanianDeadlift',
  },
  {
    id: 'push-up',
    name: '푸시업',
    equipment: '맨몸',
    bodyPart: '가슴',
    primaryMuscle: '대흉근',
    secondaryMuscles: '삼두근',
    recordingType: 'reps',
    recent: false,
    needsAttachment: false,
    thumbnailKey: 'smithBenchPress',
  },
];

export const selectedSearchIdsFixture = [
  'dumbbell-lateral-raise',
  'dumbbell-curl',
  'lat-pulldown',
  'bench-press',
  'leg-extension',
  'crunch',
  'hack-squat',
  'plank',
  'assisted-pull-up',
  'push-up',
] as const;

const weightRepsHistory: ExerciseDetailModel['history'] = [
  {
    dateLabel: '7월 12일',
    sets: [
      { set: 1, primary: '70kg', secondary: '8' },
      { set: 2, primary: '65kg', secondary: '8' },
      { set: 3, primary: '65kg', secondary: '6' },
      { set: 4, primary: '60kg', secondary: '6' },
    ],
  },
  {
    dateLabel: '7월 10일',
    sets: [
      { set: 1, primary: '67.5kg', secondary: '8' },
      { set: 2, primary: '65kg', secondary: '8' },
      { set: 3, primary: '62.5kg', secondary: '7' },
      { set: 4, primary: '60kg', secondary: '5' },
    ],
  },
  {
    dateLabel: '7월 7일',
    sets: [
      { set: 1, primary: '65kg', secondary: '10' },
      { set: 2, primary: '65kg', secondary: '8' },
      { set: 3, primary: '60kg', secondary: '6' },
      { set: 4, primary: '60kg', secondary: '6' },
    ],
  },
];

export const exerciseDetailById: Record<string, ExerciseDetailModel> = {
  'bench-press': {
    id: 'bench-press',
    name: '벤치프레스',
    equipment: '바벨',
    primaryMuscle: '대흉근',
    secondaryMuscles: '삼두근 · 전면 삼각근',
    recordingType: 'weight_reps',
    method: [
      '1. 견갑을 벤치에 고정합니다.',
      '2. 가슴 중앙으로 바를 내립니다.',
      '3. 팔꿈치를 과도하게 벌리지 않습니다.',
      '4. 바를 밀어 시작 자세로 돌아옵니다.',
    ],
    checkpoints: [
      '1. 견갑을 벤치에 고정한 상태를 유지합니다.',
      '2. 팔꿈치를 과도하게 벌리지 않습니다.',
    ],
    history: weightRepsHistory,
    growth: {
      prLabel: '최고 중량',
      prValue: '70kg',
      trend: '7월 7일 65kg → 7월 12일 70kg',
      insufficient: false,
    },
  },
  crunch: {
    id: 'crunch',
    name: '크런치',
    equipment: '맨몸',
    primaryMuscle: '복직근',
    secondaryMuscles: '',
    recordingType: 'reps',
    method: ['1. 무릎을 세우고 눕습니다.', '2. 상체를 말아 올립니다.'],
    checkpoints: ['1. 목을 당기지 않습니다.'],
    history: [
      {
        dateLabel: '7월 12일',
        sets: [
          { set: 1, primary: '15', secondary: '' },
          { set: 2, primary: '12', secondary: '' },
        ],
      },
    ],
    growth: {
      prLabel: '최고 횟수',
      prValue: '15회',
      trend: '최근 최고 15회',
      insufficient: false,
    },
  },
  plank: {
    id: 'plank',
    name: '플랭크',
    equipment: '맨몸',
    primaryMuscle: '코어',
    secondaryMuscles: '',
    recordingType: 'duration',
    method: ['1. 팔꿈치와 발끝으로 몸을 지탱합니다.'],
    checkpoints: ['1. 허리가 처지지 않게 유지합니다.'],
    history: [
      {
        dateLabel: '7월 12일',
        sets: [
          { set: 1, primary: '00:45', secondary: '' },
          { set: 2, primary: '00:40', secondary: '' },
        ],
      },
    ],
    growth: {
      prLabel: '최장 시간',
      prValue: '00:45',
      trend: '최근 최장 00:45',
      insufficient: false,
    },
  },
  'assisted-pull-up': {
    id: 'assisted-pull-up',
    name: '어시스트 풀업',
    equipment: '머신',
    primaryMuscle: '광배근',
    secondaryMuscles: '이두근',
    recordingType: 'assisted',
    method: ['1. 보조 패드에 무릎을 올립니다.', '2. 가슴을 바에 가깝게 당깁니다.'],
    checkpoints: ['1. 보조중량이 낮을수록 더 어렵습니다.'],
    history: [
      {
        dateLabel: '7월 12일',
        sets: [
          { set: 1, primary: '20kg', secondary: '8' },
          { set: 2, primary: '25kg', secondary: '8' },
        ],
      },
    ],
    growth: {
      prLabel: '최저 보조중량',
      prValue: '20kg',
      trend: '보조중량이 낮을수록 더 어려운 기록입니다.',
      insufficient: false,
    },
  },
  'hack-squat': {
    id: 'hack-squat',
    name: '핵 스쿼트 머신',
    equipment: '머신',
    primaryMuscle: '대퇴사두근',
    secondaryMuscles: '둔근',
    recordingType: 'weight_reps',
    method: ['1. 어깨 패드에 밀착합니다.', '2. 무릎을 발끝 방향으로 굽힙니다.'],
    checkpoints: ['1. 무릎이 안쪽으로 모이지 않게 합니다.'],
    history: [],
    growth: {
      prLabel: '최고 중량',
      prValue: '-',
      trend: null,
      insufficient: false,
    },
  },
  'push-up': {
    id: 'push-up',
    name: '푸시업',
    equipment: '맨몸',
    primaryMuscle: '대흉근',
    secondaryMuscles: '삼두근',
    recordingType: 'reps',
    method: ['1. 손과 발끝으로 몸을 지탱합니다.'],
    checkpoints: ['1. 몸통을 일직선으로 유지합니다.'],
    history: [
      {
        dateLabel: '7월 12일',
        sets: [{ set: 1, primary: '12', secondary: '' }],
      },
    ],
    growth: {
      prLabel: '최고 횟수',
      prValue: '12회',
      trend: null,
      insufficient: true,
    },
  },
};

export const emptyCustomDraftFixture: CustomExerciseDraft = {
  name: '',
  equipment: '',
  primaryMuscle: '',
  secondaryMuscle: '',
  recordingType: 'weight_reps',
};

export const validCustomDraftFixture: CustomExerciseDraft = {
  name: '케이블 풀다운 (커스텀)',
  equipment: '케이블',
  primaryMuscle: '등',
  secondaryMuscle: '',
  recordingType: 'weight_reps',
};

export const editCustomDraftFixture: CustomExerciseDraft = {
  name: '케이블 풀다운 (커스텀)',
  equipment: '케이블',
  primaryMuscle: '등',
  secondaryMuscle: '이두',
  recordingType: 'weight_reps',
};

export function resolveExerciseDetail(id: string): ExerciseDetailModel {
  const catalog = exerciseCatalogFixture.find((item) => item.id === id);
  const detail = exerciseDetailById[id];

  if (detail) {
    return detail;
  }

  return {
    id,
    name: catalog?.name ?? id,
    equipment: catalog?.equipment ?? '',
    primaryMuscle: catalog?.primaryMuscle ?? '',
    secondaryMuscles: catalog?.secondaryMuscles ?? '',
    recordingType: catalog?.recordingType ?? 'weight_reps',
    method: [],
    checkpoints: [],
    history: [],
    growth: {
      prLabel: '최고 기록',
      prValue: '-',
      trend: null,
      insufficient: false,
    },
  };
}
