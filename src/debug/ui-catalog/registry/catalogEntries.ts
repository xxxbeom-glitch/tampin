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
  {
    id: '01c-basic-info-default',
    group: '01 로그인',
    frameName: '01C_Basic_Info',
    stateLabel: 'Default',
    description:
      'First-run Basic Info default: no sex, empty DOB placeholder, Terms unchecked, disabled CTA.',
  },
  {
    id: '01c1-basic-info-error',
    group: '01 로그인',
    frameName: '01C1_Basic_Info_Error',
    stateLabel: 'Error',
    description:
      'Invalid DOB inline error with disabled CTA until all required fields are valid.',
  },
  {
    id: '01c2-basic-info-focused',
    group: '01 로그인',
    frameName: '01C2_Basic_Info_Focused',
    stateLabel: 'Focused',
    description: 'DOB field focused with filled value; other requirements still incomplete.',
  },
  {
    id: '01c3-basic-info-filled',
    group: '01 로그인',
    frameName: '01C3_Basic_Info_Filled',
    stateLabel: 'Filled',
    description:
      'Filled valid DOB without sex/Terms; CTA remains disabled until all requirements pass.',
  },
  {
    id: '01c4-basic-info-disabled',
    group: '01 로그인',
    frameName: '01C4_Basic_Info_Disabled',
    stateLabel: 'Disabled',
    description: 'DOB input disabled representative state at 30% opacity.',
  },
];
