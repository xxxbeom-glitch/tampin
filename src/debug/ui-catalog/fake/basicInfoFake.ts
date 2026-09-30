import type {
  BasicInfoFormPresentation,
  BasicInfoFormValues,
} from '../../../features/auth/BasicInfoFormScreen';
import { DOB_ERROR_MESSAGE } from '../../../features/auth/basicInfoValidation';

export type BasicInfoCatalogPreset = {
  values: BasicInfoFormValues;
  presentation: BasicInfoFormPresentation;
};

export const basicInfoCatalogPresets: Record<string, BasicInfoCatalogPreset> = {
  '01c-basic-info-default': {
    values: {
      sex: null,
      dob: '',
      termsAgreed: false,
    },
    presentation: {
      dobFocused: false,
      dobInputDisabled: false,
      dobErrorMessage: null,
    },
  },
  '01c1-basic-info-error': {
    values: {
      sex: 'male',
      dob: '19881340',
      termsAgreed: false,
    },
    presentation: {
      dobFocused: false,
      dobInputDisabled: false,
      dobErrorMessage: DOB_ERROR_MESSAGE,
    },
  },
  '01c2-basic-info-focused': {
    values: {
      sex: null,
      dob: '19880101',
      termsAgreed: false,
    },
    presentation: {
      dobFocused: true,
      dobInputDisabled: false,
      dobErrorMessage: null,
    },
  },
  '01c3-basic-info-filled': {
    values: {
      sex: null,
      dob: '19880101',
      termsAgreed: false,
    },
    presentation: {
      dobFocused: false,
      dobInputDisabled: false,
      dobErrorMessage: null,
    },
  },
  '01c4-basic-info-disabled': {
    values: {
      sex: null,
      dob: '',
      termsAgreed: false,
    },
    presentation: {
      dobFocused: false,
      dobInputDisabled: true,
      dobErrorMessage: null,
    },
  },
};
