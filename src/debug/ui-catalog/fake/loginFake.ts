import type {
  LoginErrorDialogCase,
  LoginProviderState,
} from '../../../features/auth/LoginFormScreen';

export type LoginCatalogPreset = {
  providerState: LoginProviderState;
  errorDialogCase?: LoginErrorDialogCase | null;
};

export const loginCatalogPresets: Record<string, LoginCatalogPreset> = {
  '01a-login-ready': {
    providerState: 'ready',
    errorDialogCase: null,
  },
  '01a-login-unavailable': {
    providerState: 'unavailable',
    errorDialogCase: null,
  },
  '01a-login-busy': {
    providerState: 'busy',
    errorDialogCase: null,
  },
  '01a1-login-error-dialog-reference': {
    providerState: 'ready',
    errorDialogCase: 'general',
  },
};
