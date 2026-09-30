# Issue #28 / DEV-013 Evidence

## Result
- Branch: `cursor/dev-013-folder-first-368a`
- Status: Logic PASS
- Runtime/Device: NOT VERIFIED

## Implemented flow
1. Routine Main `새 루틴 만들기` opens the implemented `RoutineEditor` route.
2. Folder entry requires either an existing folder selection or a nonblank new
   folder name.
3. `다음` immediately renders the routine-create state with the resolved folder
   name.
4. Back from routine create returns to folder entry; Back from initial folder
   entry leaves the route.

All state is route-local deterministic mock state. No SQLite/repository,
auth/sync/backend, exercise selection, set editing, save, or folder CRUD code is
called.

## Current Figma read-back
File: `W3lZurXCXbThP67rF2xk2b`

Inspected with `get_design_context`:
- `34:1457` — current `02E_Routine_Create`
- `34:1477` — current `03F_Routine_Edit`
- `352:896` — current `03E2_Routine_Create_WithExercises`
- `706:5023` — current `03A_Routine_List_Menu`
- `706:5087` — current `03F_Routine_Exercise_Menu`
- `1380:1995` — current `03EF_Routine_Unsaved_Confirm`
- `1380:7170` — current `03F_Routine_Delete_Confirm`

The current canonical page names node `34:1457` as `02E_Routine_Create`; the
historical inventory/map name `03E_Routine_Create` is stale. Only this
implemented Screen Map row was corrected and marked implemented.

## Catalog states
- `DEV_Routine_Folder_Entry / ExistingFolderSelected`
- `DEV_Routine_Folder_Entry / NewFolderNamed`
- `02E_Routine_Create / FolderPrefilled`

## Intentional Figma differences
- No standalone folder-selection frame exists in the current canonical Figma.
  The folder entry screen is the smallest deterministic product-required bridge
  for selecting an existing folder or naming a new one before `02E`.
- `02E` receives a prefilled, non-editable folder field. Existing-folder rename
  semantics are outside DEV-013; Back returns to folder selection.
- `운동 추가` is visually present but disabled because exercise selection is
  explicitly out of scope.
- `저장` remains disabled exactly as the empty current Figma state; no
  persistence or save semantics are implemented.

## Verification
- `npm run typecheck` — PASS
- `npm run lint` — PASS
- Focused Jest (5 suites / 15 tests) — PASS
- Full Jest (36 suites / 114 tests) — PASS
- `npx expo config --type public` — PASS
- `npx expo prebuild --platform android --no-install` — PASS
- `git diff --check` — PASS

## Known unverified evidence
- Android runtime/device navigation and visual comparison — NOT VERIFIED
- Keyboard behavior and narrow-device visual QA — NOT VERIFIED
