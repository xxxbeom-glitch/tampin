export type LoginErrorDialogCase = 'general' | 'network' | 'service';

export const LOGIN_ERROR_DIALOG_COPY: Record<
  LoginErrorDialogCase,
  { title: string; body: string }
> = {
  general: {
    title: '로그인에 실패했어요',
    body: '잠시 후 다시 시도해 주세요.',
  },
  network: {
    title: '인터넷에 연결되지 않았어요',
    body: '연결을 확인한 뒤 다시 시도해 주세요.',
  },
  service: {
    title: '지금은 로그인할 수 없어요',
    body: '잠시 후 다시 시도해 주세요.',
  },
};

export const LOGIN_PROVIDER_LABELS = {
  google: 'Google로 계속하기',
  kakao: 'Kakao로 계속하기',
} as const;
