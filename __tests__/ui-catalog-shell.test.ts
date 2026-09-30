import { catalogEntries } from '../src/debug/ui-catalog/registry/catalogEntries';

describe('DEV-001 debug UI catalog shell', () => {
  it('exposes bootstrap, data-layer health, and registered 01C Basic Info entries', () => {
    expect(catalogEntries).toHaveLength(15);
    expect(catalogEntries[0]?.id).toBe('bootstrap-shell');
    expect(catalogEntries.some((entry) => entry.id === 'data-layer-health')).toBe(true);
    expect(
      catalogEntries.filter((entry) => entry.group === '01 로그인'),
    ).toHaveLength(9);
    expect(
      catalogEntries.filter((entry) => entry.group === '02 루틴'),
    ).toHaveLength(3);
  });
});
