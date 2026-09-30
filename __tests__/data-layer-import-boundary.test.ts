import fs from 'node:fs';
import path from 'node:path';

const FORBIDDEN_IMPORTS = [
  'expo-sqlite',
  'openTampinDatabase',
  'createExpoSqliteConnection',
  'SqliteConnection',
];

const FEATURE_ROOTS = [
  path.join(process.cwd(), 'src/features'),
  path.join(process.cwd(), 'src/app/navigation'),
  path.join(process.cwd(), 'src/debug'),
];

const ALLOWED_DEBUG_IMPORTS = ['useTampinDataLayer', 'useTampinRepositories', 'useTampinDataLayerHealth'];

function collectTypeScriptFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectTypeScriptFiles(fullPath));
      continue;
    }
    if (entry.isFile() && /\.tsx?$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function hasForbiddenImport(source: string, forbidden: string): boolean {
  return (
    source.includes(`from '${forbidden}'`) ||
    source.includes(`from "${forbidden}"`) ||
    source.includes(`require('${forbidden}')`) ||
    source.includes(`require("${forbidden}")`)
  );
}

describe('DEV-005 feature data-layer import boundary', () => {
  it('keeps raw sqlite APIs out of feature, navigation, and debug UI modules', () => {
    for (const root of FEATURE_ROOTS) {
      for (const filePath of collectTypeScriptFiles(root)) {
        const source = fs.readFileSync(filePath, 'utf8');

        for (const forbidden of FORBIDDEN_IMPORTS) {
          if (forbidden === 'SqliteConnection' && filePath.includes('providers')) {
            continue;
          }
          expect(source).not.toContain(`from '${forbidden}'`);
          expect(source).not.toContain(`from "${forbidden}"`);
        }
      }
    }
  });

  it('allows debug catalog to consume provider hooks only', () => {
    const healthDetailPath = path.join(
      process.cwd(),
      'src/debug/ui-catalog/components/DataLayerHealthDetail.tsx',
    );
    const source = fs.readFileSync(healthDetailPath, 'utf8');

    expect(source).toContain('useTampinDataLayerHealth');
    expect(source).toContain('app/providers/data-layer/useTampinDataLayer');
    expect(ALLOWED_DEBUG_IMPORTS.some((identifier) => source.includes(identifier))).toBe(true);
    for (const forbidden of FORBIDDEN_IMPORTS) {
      expect(hasForbiddenImport(source, forbidden)).toBe(false);
    }
  });
});
