import type { CustomExerciseDraft, ExerciseCatalogItem, RecordingType } from './types';

export const EQUIPMENT_FILTER_OPTIONS = [
  '전체',
  '바벨',
  '덤벨',
  '머신',
  '케이블',
  '스미스 머신',
  'EZ바',
  '케틀벨',
  '맨몸',
  '기타',
] as const;

export const BODY_PART_FILTER_OPTIONS = [
  '전체',
  '가슴',
  '등',
  '어깨',
  '팔',
  '하체',
  '코어',
  '전신',
  '기타',
] as const;

export const CUSTOM_EQUIPMENT_OPTIONS = EQUIPMENT_FILTER_OPTIONS.filter(
  (option) => option !== '전체',
);

export const CUSTOM_MUSCLE_OPTIONS = [
  '가슴',
  '등',
  '어깨',
  '이두',
  '삼두',
  '전완',
  '대퇴사두',
  '햄스트링',
  '둔근',
  '종아리',
  '코어',
  '기타',
] as const;

export const SECONDARY_MUSCLE_OPTIONS = ['선택 안 함', ...CUSTOM_MUSCLE_OPTIONS] as const;

export const RECORDING_TYPE_OPTIONS: { id: RecordingType; label: string }[] = [
  { id: 'weight_reps', label: '중량 + 횟수' },
  { id: 'reps', label: '횟수' },
  { id: 'duration', label: '시간' },
  { id: 'assisted', label: '보조중량 + 횟수' },
];

export const ATTACHMENT_OPTIONS = [
  '스트레이트 바',
  '와이드 랫바',
  '뉴트럴 그립 · 클로즈',
  '뉴트럴 그립 · 미디엄',
  '뉴트럴 그립 · 와이드',
  'V바',
  '직접 입력',
] as const;

export function recordingTypeLabel(type: RecordingType): string {
  return RECORDING_TYPE_OPTIONS.find((option) => option.id === type)?.label ?? '중량 + 횟수';
}

export function isCustomExerciseValid(draft: CustomExerciseDraft): boolean {
  return (
    draft.name.trim().length > 0 &&
    draft.primaryMuscle.trim().length > 0 &&
    draft.recordingType !== undefined
  );
}

export function filterExerciseCatalog(
  catalog: readonly ExerciseCatalogItem[],
  query: string,
  equipment: string,
  bodyPart: string,
): ExerciseCatalogItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  return catalog.filter((item) => {
    const matchesQuery =
      normalizedQuery.length === 0 || item.name.toLowerCase().includes(normalizedQuery);
    const matchesEquipment = equipment === '전체' || item.equipment === equipment;
    const matchesBodyPart = bodyPart === '전체' || item.bodyPart === bodyPart;
    return matchesQuery && matchesEquipment && matchesBodyPart;
  });
}
