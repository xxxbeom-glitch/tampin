import fs from 'node:fs';
import path from 'node:path';
import {
  exportedAssetPaths,
  figmaAssetManifest,
} from '../src/design-system/assets/figmaAssetManifest';
import { suitFontSources } from '../src/design-system/fonts/suitFonts';

const repoRoot = path.resolve(__dirname, '..');

describe('DEV-012 bundled fonts and Figma assets', () => {
  it('lists every exported manifest asset on disk', () => {
    for (const assetPath of exportedAssetPaths) {
      const absolutePath = path.join(repoRoot, assetPath);
      expect(fs.existsSync(absolutePath)).toBe(true);
    }
    expect(figmaAssetManifest.exported.length).toBeGreaterThan(0);
  });

  it('bundles SUIT font files locally with OFL attribution', () => {
    const licensePath = path.join(repoRoot, 'assets/licenses/SUIT-OFL.txt');
    expect(fs.existsSync(licensePath)).toBe(true);
    expect(fs.readFileSync(licensePath, 'utf8')).toContain('SIL OPEN FONT LICENSE');

    for (const fontPath of Object.values(suitFontSources)) {
      expect(typeof fontPath).toBe('number');
    }

    for (const face of ['SUIT-Regular.ttf', 'SUIT-Medium.ttf', 'SUIT-SemiBold.ttf', 'SUIT-Bold.ttf']) {
      expect(fs.existsSync(path.join(repoRoot, 'assets/fonts', face))).toBe(true);
    }
  });

  it('does not reference runtime network font or image URLs in font map', () => {
    const serialized = JSON.stringify(suitFontSources);
    expect(serialized).not.toMatch(/https?:\/\//);
  });

  it('records NOT EXPORTED blockers explicitly in manifest', () => {
    expect(figmaAssetManifest.notExported.length).toBeGreaterThan(0);
    for (const entry of figmaAssetManifest.notExported) {
      expect(entry.figmaNodeId).toMatch(/^\d+:\d+$/);
      expect(entry.figmaName.length).toBeGreaterThan(0);
      expect(entry.reason.length).toBeGreaterThan(0);
    }
  });
});
