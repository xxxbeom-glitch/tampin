export type CatalogEntry = {
  id: string;
  group: string;
  frameName: string;
  stateLabel: string;
  description: string;
};

/** DEV-001 registers only the bootstrap placeholder row. Canonical MVP rows land with UI Issues. */
export const catalogEntries: CatalogEntry[] = [
  {
    id: 'bootstrap-shell',
    group: '00 시작',
    frameName: 'DEV_Bootstrap_Shell',
    stateLabel: 'Content',
    description:
      'Non-canonical bootstrap placeholder proving catalog shell rendering without auth/DB.',
  },
  {
    id: 'data-layer-health',
    group: '00 시작',
    frameName: 'DEV_Data_Layer_Health',
    stateLabel: 'ReadOnly',
    description:
      'Read-only SQLite initialization status and schema version observability.',
  },
];
