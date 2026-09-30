import fs from 'node:fs';
import path from 'node:path';

const PRODUCTION_SQLITE_ROOT = path.join(process.cwd(), 'src/data/sqlite');
const FORBIDDEN_PRODUCTION_IMPORTS = ['better-sqlite3', 'sql.js'];

function collectTypeScriptFiles(directory: string): string[] {
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

describe('DEV-004 SQLite bundle boundary', () => {
  it('does not export Jest-only adapters from the production sqlite index', () => {
    const productionIndex = fs.readFileSync(
      path.join(PRODUCTION_SQLITE_ROOT, 'index.ts'),
      'utf8',
    );

    expect(productionIndex).not.toMatch(/better-sqlite|sql\.js|sqljs/i);
    expect(productionIndex).not.toMatch(/adapters\/better-sqlite/);
  });

  it('keeps test-only sqlite engines out of src/data/sqlite', () => {
    const files = collectTypeScriptFiles(PRODUCTION_SQLITE_ROOT);

    for (const filePath of files) {
      const source = fs.readFileSync(filePath, 'utf8');
      for (const forbidden of FORBIDDEN_PRODUCTION_IMPORTS) {
        expect(source).not.toContain(`from '${forbidden}'`);
        expect(source).not.toContain(`from "${forbidden}"`);
        expect(source).not.toContain(`require('${forbidden}')`);
      }
    }
  });

  it('limits expo-sqlite usage to the production adapter module', () => {
    const files = collectTypeScriptFiles(PRODUCTION_SQLITE_ROOT);
    const expoSqliteImporter = files.filter((filePath) => {
      const source = fs.readFileSync(filePath, 'utf8');
      return source.includes("from 'expo-sqlite'") || source.includes('from "expo-sqlite"');
    });

    expect(expoSqliteImporter).toEqual([
      path.join(PRODUCTION_SQLITE_ROOT, 'adapters/expo-sqlite-connection.ts'),
    ]);
  });
});
