import { catalogEntries } from '../src/debug/ui-catalog/registry/catalogEntries';

describe('DEV-001 debug UI catalog shell', () => {
  it('exposes bootstrap and read-only data-layer health entries without MVP screens', () => {
    expect(catalogEntries).toHaveLength(2);
    expect(catalogEntries[0]?.id).toBe('bootstrap-shell');
    expect(catalogEntries.some((entry) => entry.id === 'data-layer-health')).toBe(true);
    expect(catalogEntries.some((entry) => entry.frameName.startsWith('0'))).toBe(
      false,
    );
  });
});
