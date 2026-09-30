import {
  DOB_ERROR_MESSAGE,
  getDobErrorMessage,
  isBasicInfoSubmitEnabled,
  isValidDobInput,
  sanitizeDobInput,
} from '../src/features/auth/basicInfoValidation';

describe('DEV-007 basic info validation', () => {
  it('sanitizes DOB input to numeric YYYYMMDD up to 8 digits', () => {
    expect(sanitizeDobInput('1988-01-01')).toBe('19880101');
    expect(sanitizeDobInput('19ab88cd0101')).toBe('19880101');
    expect(sanitizeDobInput('1988010112345')).toBe('19880101');
  });

  it('accepts only real calendar dates with 8 digits', () => {
    expect(isValidDobInput('19880101')).toBe(true);
    expect(isValidDobInput('20240229')).toBe(true);
    expect(isValidDobInput('19881340')).toBe(false);
    expect(isValidDobInput('19880230')).toBe(false);
    expect(isValidDobInput('1988010')).toBe(false);
    expect(isValidDobInput('abcdefgh')).toBe(false);
  });

  it('returns the exact invalid DOB error copy when validation should surface', () => {
    expect(getDobErrorMessage('19881340', { dobTouched: false })).toBe(
      DOB_ERROR_MESSAGE,
    );
    expect(getDobErrorMessage('1988', { dobTouched: true })).toBe(
      DOB_ERROR_MESSAGE,
    );
    expect(getDobErrorMessage('', { dobTouched: true })).toBeNull();
    expect(getDobErrorMessage('19880101', { dobTouched: true })).toBeNull();
  });

  it('requires sex, valid DOB, and Terms agreement before submit eligibility', () => {
    expect(
      isBasicInfoSubmitEnabled({
        sex: 'male',
        dob: '19880101',
        termsAgreed: true,
      }),
    ).toBe(true);

    expect(
      isBasicInfoSubmitEnabled({
        sex: null,
        dob: '19880101',
        termsAgreed: true,
      }),
    ).toBe(false);

    expect(
      isBasicInfoSubmitEnabled({
        sex: 'female',
        dob: '19881340',
        termsAgreed: true,
      }),
    ).toBe(false);

    expect(
      isBasicInfoSubmitEnabled({
        sex: 'female',
        dob: '19880101',
        termsAgreed: false,
      }),
    ).toBe(false);
  });
});
