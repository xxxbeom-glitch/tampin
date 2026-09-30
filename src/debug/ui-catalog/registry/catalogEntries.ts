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
    id: '00-splash-default',
    group: '00 시작',
    frameName: '00_Splash',
    stateLabel: 'Default',
    description:
      'Canonical splash: brand-primary background and centered white Tampin wordmark only.',
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
    id: '01a-login-ready',
    group: '01 로그인',
    frameName: '01A_Login',
    stateLabel: 'Ready',
    description:
      'Canonical Login with stacked provider CTAs ready for development bypass sign-in.',
  },
  {
    id: '01a-login-unavailable',
    group: '01 로그인',
    frameName: '01A_Login',
    stateLabel: 'Unavailable',
    description:
      'Release/non-dev provider CTAs visibly unavailable and fail closed.',
  },
  {
    id: '01a-login-busy',
    group: '01 로그인',
    frameName: '01A_Login',
    stateLabel: 'Busy',
    description:
      'Provider CTAs disabled while sign-in is in progress to prevent double press.',
  },
  {
    id: '01a1-login-error-dialog-reference',
    group: '01 로그인',
    frameName: '01A1_Login_Error_Overlay_Cases',
    stateLabel: 'ErrorDialogReference',
    description:
      'Component-state reference overlay; not a navigation route. General failure dialog shown.',
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
  {
    id: '02a-routine-main-with-routines',
    group: '02 루틴',
    frameName: '02A_Routine_Main',
    stateLabel: 'WithRoutines',
    description:
      'Routine main with quick actions, PPL folder/cards, and floating bottom app bar.',
  },
  {
    id: '02b-routine-main-empty',
    group: '02 루틴',
    frameName: '02B_Routine_Main_Empty',
    stateLabel: 'Empty',
    description:
      'Routine main empty state: identical quick actions with no routine folders.',
  },
  {
    id: '02d-routine-detail-default',
    group: '02 루틴',
    frameName: '02D_Routine_Detail',
    stateLabel: 'Default',
    description:
      'Scrollable routine detail with summary strip, four exercise set cards, and start CTA.',
  },
  {
    id: '02e-folder-entry-selected',
    group: '02 루틴',
    frameName: 'DEV_Routine_Folder_Entry',
    stateLabel: 'ExistingFolderSelected',
    description:
      'Mock-phase folder-first entry with an existing folder selected before routine creation.',
  },
  {
    id: '02e-folder-entry-new-name',
    group: '02 루틴',
    frameName: 'DEV_Routine_Folder_Entry',
    stateLabel: 'NewFolderNamed',
    description:
      'Mock-phase folder-first entry with a deterministic new folder name.',
  },
  {
    id: '02e-routine-create-folder-prefilled',
    group: '02 루틴',
    frameName: '02E_Routine_Create',
    stateLabel: 'FolderPrefilled',
    description:
      'Current Figma routine-create state reached immediately after folder selection.',
  },
];
