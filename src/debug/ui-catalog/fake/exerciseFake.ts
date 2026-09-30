import {
  BODY_PART_FILTER_OPTIONS,
  CUSTOM_EQUIPMENT_OPTIONS,
  CUSTOM_MUSCLE_OPTIONS,
  EQUIPMENT_FILTER_OPTIONS,
  RECORDING_TYPE_OPTIONS,
  SECONDARY_MUSCLE_OPTIONS,
  editCustomDraftFixture,
  emptyCustomDraftFixture,
  exerciseCatalogFixture,
  resolveExerciseDetail,
  selectedSearchIdsFixture,
  validCustomDraftFixture,
} from '../../../features/exercise';

export const exerciseCatalogPresets = {
  '04a-search-default': {
    kind: 'search' as const,
    query: '',
    equipmentFilter: '전체',
    bodyPartFilter: '전체',
    selectedIds: [] as string[],
    catalog: exerciseCatalogFixture,
  },
  '04b-search-selected': {
    kind: 'search' as const,
    query: '',
    equipmentFilter: '전체',
    bodyPartFilter: '전체',
    selectedIds: [...selectedSearchIdsFixture],
    catalog: exerciseCatalogFixture,
  },
  '04c-search-empty': {
    kind: 'search' as const,
    query: '레그프레쓰',
    equipmentFilter: '전체',
    bodyPartFilter: '전체',
    selectedIds: [] as string[],
    catalog: exerciseCatalogFixture,
  },
  '04a-filter-equipment': {
    kind: 'filter' as const,
    title: '장비 선택',
    options: EQUIPMENT_FILTER_OPTIONS,
    selected: '전체',
    testID: 'catalog-equipment-filter',
  },
  '04a-filter-body-part': {
    kind: 'filter' as const,
    title: '부위 선택',
    options: BODY_PART_FILTER_OPTIONS,
    selected: '전체',
    testID: 'catalog-body-part-filter',
  },
  '04i-custom-equipment': {
    kind: 'filter' as const,
    title: '장비 선택',
    options: CUSTOM_EQUIPMENT_OPTIONS,
    selected: '케이블',
    testID: 'catalog-custom-equipment',
  },
  '04j-custom-primary-muscle': {
    kind: 'filter' as const,
    title: '주 타겟 근육 선택',
    options: CUSTOM_MUSCLE_OPTIONS,
    selected: '등',
    testID: 'catalog-custom-primary',
  },
  '04k-custom-secondary-muscle': {
    kind: 'filter' as const,
    title: '보조 타겟 근육 선택',
    options: SECONDARY_MUSCLE_OPTIONS,
    selected: '이두',
    testID: 'catalog-custom-secondary',
  },
  '04l-custom-recording-type': {
    kind: 'filter' as const,
    title: '기록 방식 선택',
    options: RECORDING_TYPE_OPTIONS.map((option) => option.label),
    selected: '중량 + 횟수',
    testID: 'catalog-custom-recording',
  },
  '04d-detail-info': {
    kind: 'detail' as const,
    tab: 'info' as const,
    model: resolveExerciseDetail('bench-press'),
  },
  '04d-detail-history': {
    kind: 'detail' as const,
    tab: 'history' as const,
    model: resolveExerciseDetail('bench-press'),
  },
  '04d-detail-growth': {
    kind: 'detail' as const,
    tab: 'growth' as const,
    model: resolveExerciseDetail('bench-press'),
  },
  '04d-detail-history-reps': {
    kind: 'detail' as const,
    tab: 'history' as const,
    model: resolveExerciseDetail('crunch'),
  },
  '04d-detail-growth-reps': {
    kind: 'detail' as const,
    tab: 'growth' as const,
    model: resolveExerciseDetail('crunch'),
  },
  '04d-detail-history-duration': {
    kind: 'detail' as const,
    tab: 'history' as const,
    model: resolveExerciseDetail('plank'),
  },
  '04d-detail-growth-duration': {
    kind: 'detail' as const,
    tab: 'growth' as const,
    model: resolveExerciseDetail('plank'),
  },
  '04d-detail-history-assisted': {
    kind: 'detail' as const,
    tab: 'history' as const,
    model: resolveExerciseDetail('assisted-pull-up'),
  },
  '04d-detail-growth-assisted': {
    kind: 'detail' as const,
    tab: 'growth' as const,
    model: resolveExerciseDetail('assisted-pull-up'),
  },
  '04d-detail-history-empty': {
    kind: 'detail' as const,
    tab: 'history' as const,
    model: resolveExerciseDetail('hack-squat'),
  },
  '04d-detail-growth-empty': {
    kind: 'detail' as const,
    tab: 'growth' as const,
    model: resolveExerciseDetail('hack-squat'),
  },
  '04d-detail-growth-insufficient': {
    kind: 'detail' as const,
    tab: 'growth' as const,
    model: resolveExerciseDetail('bench-press-insufficient'),
  },
  '04e-custom-create': {
    kind: 'custom' as const,
    mode: 'create' as const,
    draft: emptyCustomDraftFixture,
    historyLocked: false,
    dirty: false,
    dialog: null,
  },
  '04e-custom-create-valid': {
    kind: 'custom' as const,
    mode: 'create' as const,
    draft: validCustomDraftFixture,
    historyLocked: false,
    dirty: true,
    dialog: null,
  },
  '04f-custom-edit': {
    kind: 'custom' as const,
    mode: 'edit' as const,
    draft: editCustomDraftFixture,
    historyLocked: false,
    dirty: false,
    dialog: null,
  },
  '04f-custom-edit-history-locked': {
    kind: 'custom' as const,
    mode: 'edit' as const,
    draft: editCustomDraftFixture,
    historyLocked: true,
    dirty: false,
    dialog: null,
  },
  '04ef-unsaved-confirm': {
    kind: 'custom' as const,
    mode: 'create' as const,
    draft: validCustomDraftFixture,
    historyLocked: false,
    dirty: true,
    dialog: 'unsaved' as const,
  },
  '04f-delete-confirm': {
    kind: 'custom' as const,
    mode: 'edit' as const,
    draft: editCustomDraftFixture,
    historyLocked: false,
    dirty: false,
    dialog: 'delete' as const,
  },
  '04h-attachment-selection': {
    kind: 'attachment' as const,
    mode: 'select' as const,
    customAttachment: '',
  },
  '04h-attachment-input': {
    kind: 'attachment' as const,
    mode: 'input' as const,
    customAttachment: '',
  },
};

export type ExerciseCatalogEntryId = keyof typeof exerciseCatalogPresets;

export function isExerciseCatalogEntryId(
  entryId: string,
): entryId is ExerciseCatalogEntryId {
  return entryId in exerciseCatalogPresets;
}
