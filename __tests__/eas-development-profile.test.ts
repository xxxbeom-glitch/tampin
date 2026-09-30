import easConfig from '../eas.json';

describe('DEV-002 EAS development profile', () => {
  it('defines an Android-only development build profile with dev client enabled', () => {
    expect(easConfig.build.development.developmentClient).toBe(true);
    expect(easConfig.build.development.distribution).toBe('internal');
    expect(easConfig.build.development.android?.buildType).toBe('apk');
  });
});
