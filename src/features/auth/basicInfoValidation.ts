export type BasicInfoSex = 'male' | 'female';

export const DOB_PLACEHOLDER = '19880101';

export const DOB_ERROR_MESSAGE = '올바른 생년월일 8자리를 입력해주세요.';

export function sanitizeDobInput(value: string): string {
  return value.replace(/\D/g, '').slice(0, 8);
}

export function isValidDobInput(value: string): boolean {
  if (!/^\d{8}$/.test(value)) {
    return false;
  }

  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(4, 6));
  const day = Number(value.slice(6, 8));

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function getDobErrorMessage(
  dob: string,
  options: { dobTouched: boolean },
): string | null {
  if (dob.length === 0) {
    return null;
  }

  if (isValidDobInput(dob)) {
    return null;
  }

  if (dob.length === 8 || options.dobTouched) {
    return DOB_ERROR_MESSAGE;
  }

  return null;
}

export function isBasicInfoSubmitEnabled(input: {
  sex: BasicInfoSex | null;
  dob: string;
  termsAgreed: boolean;
}): boolean {
  return (
    input.sex !== null &&
    isValidDobInput(input.dob) &&
    input.termsAgreed
  );
}
