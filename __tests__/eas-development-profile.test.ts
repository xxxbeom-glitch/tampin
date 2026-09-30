import appConfig from '../app.json';
import easConfig from '../eas.json';
import { ANDROID_PACKAGE_ID } from '../src/platform/identity';

describe('DEV-002 EAS Android development profile', () => {
  it('keeps a minimum Android-only development profile', () => {
    expect(easConfig.cli.appVersionSource).toBe('local');
    expect(easConfig.build.development.developmentClient).toBe(true);
    expect(easConfig.build.development.distribution).toBe('internal');
    expect(easConfig.build.development.android.buildType).toBe('apk');
    expect(easConfig.build.development).not.toHaveProperty('ios');
    expect(easConfig.build).not.toHaveProperty('preview');
    expect(easConfig.build).not.toHaveProperty('production');
    expect(easConfig).not.toHaveProperty('submit');
  });

  it('does not invent an EAS project id before account link', () => {
    const expoConfig = appConfig.expo as {
      extra?: { eas?: { projectId?: string } };
      android: { package: string };
    };

    expect(expoConfig.extra?.eas?.projectId).toBeUndefined();
    expect(expoConfig.android.package).toBe(ANDROID_PACKAGE_ID);
    expect(ANDROID_PACKAGE_ID).toBe('com.lumian.tampin');
  });
});
