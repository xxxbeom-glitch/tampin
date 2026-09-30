import type { ConfirmDialogCopy } from '../exercise';

export const WORKOUT_COPY = {
  addSet: '세트 추가',
  deleteSet: '세트 삭제',
  addExercise: '운동 추가',
  endWorkout: '운동 종료',
  timer: '타이머',
  replace: '대체 운동',
  reorder: '순서 변경',
  delete: '삭제',
  colSet: '세트',
  colWeight: '중량',
  colReps: '횟수',
  colDuration: '시간',
  colAssisted: '보조중량',
  colDone: '완료',
  restSkip: '휴식 건너뛰기',
  adjust15: '15초',
  manualStart: '타이머 시작',
  manualPause: '일시정지',
  manualReset: '초기화',
  manualResume: '계속 진행',
  replaceTitle: '대체 운동 선택',
  replaceOther: '다른 운동 보기',
  replaceConfirm: '선택 완료',
  reorderTitle: '운동 순서 변경',
  reorderDone: '완료',
} as const;

export const END_INCOMPLETE_COPY: ConfirmDialogCopy = {
  title: '운동을 종료할까요?',
  body: '아직 끝내지 않은 운동이 있어요.\n완료한 세트까지만 기록돼요.',
  secondary: '계속 운동',
  primary: '종료하고 저장',
};

export const END_COMPLETE_COPY: ConfirmDialogCopy = {
  title: '운동을 종료할까요?',
  body: '모든 세트를 완료했어요.',
  secondary: '계속 운동',
  primary: '운동 종료',
};

export const DISCARD_COPY: ConfirmDialogCopy = {
  title: '이번 운동을 삭제할까요?',
  body: '지금까지 입력한 기록이 모두 삭제돼요.',
  secondary: '계속 운동',
  primary: '기록 삭제',
};

export const UPDATE_ROUTINE_COPY: ConfirmDialogCopy = {
  title: '바꾼 내용을 루틴에도 저장할까요?',
  body: '운동 추가 2개 · 삭제 1개 · 세트 추가 1개',
  secondary: '오늘만 적용',
  primary: '루틴에 저장',
};

export const OTHER_INCOMPLETE_COPY: ConfirmDialogCopy = {
  title: '현재 운동을 종료할까요?',
  body: '아직 완료하지 않은 운동이 있습니다.\n완료한 세트까지만 기록하고 새 루틴을 시작합니다.',
  secondary: '계속 운동',
  primary: '종료 후 시작',
};

export const OTHER_COMPLETE_COPY: ConfirmDialogCopy = {
  title: '현재 운동을 종료할까요?',
  body: '모든 세트를 완료했습니다.\n현재 운동을 저장하고 새 루틴을 시작합니다.',
  secondary: '계속 운동',
  primary: '종료 후 시작',
};

export const REPLACE_DELETE_COPY: ConfirmDialogCopy = {
  title: '완료한 세트 기록을 삭제할까요?',
  body: '대체 운동으로 변경하면 이 운동에서 완료한 세트 기록이 삭제됩니다.',
  secondary: '취소',
  primary: '삭제하고 변경',
};

export const DEFAULT_TIMER_SEC = 90;
export const TIMER_STEP_SEC = 15;

export function replaceHelper(exerciseName: string): string {
  return `${exerciseName}와 유사한 운동을 추천했어요`;
}
