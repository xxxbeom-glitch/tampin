# Active Task Contract

## Task / Issue
- Issue #28 / DEV-013 — Folder-first routine creation entry
- Branch: `cursor/dev-013-folder-first-368a`

## Goal
Replace the Routine Main `새 루틴 만들기` stop state with deterministic
folder-first selection/naming followed immediately by the current routine-create
state.

## Required
- Inspect current named Group 03 Figma frames; historical IDs are not authority
- Keep render screens, route orchestration, and fixtures separate
- Existing-folder selection and new-folder naming precede routine create
- Register each deterministic state in the dev-only Catalog
- Add focused route/state tests and document intentional Figma differences

## Allowed Scope
- Routine creation screens, local fixtures, and `RoutineEditor` route orchestration
- Dev-only Catalog entries/presets
- Focused tests, implemented Screen Map row, Issue evidence

## Forbidden
- SQLite writes/persistence
- Exercise selection, set editing, save behavior, folder CRUD semantics
- Auth/sync/backend
- New global design-system primitives

## Figma refs
- File `W3lZurXCXbThP67rF2xk2b`
- Current `02E_Routine_Create` — `34:1457`
- Current Group 03 editing/reference frames inspected via Figma design context

## Verification
1. typecheck 2. lint 3. focused/full Jest 4. Expo config/prebuild
5. diff-check

## Done When
- Folder-first route ordering is explicit and tested
- All implemented deterministic states are Catalog-accessible
- Only implemented Screen Map rows change
- Commit pushed; no PR created
