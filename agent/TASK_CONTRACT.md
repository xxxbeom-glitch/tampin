# Active Task Contract

## Task / Issue
- Issue #30 / DEV-014 — Figma parity audit and Group 04 exercise flow
- Branch: `cursor/dev-014-group04-figma-parity`

## Goal
Record a focused 01–03 Figma/runtime parity audit, then implement every
canonical Group 04 top-level state as deterministic Android mock screens.

## Required
- Inspect current named Group 04 Figma frames; historical IDs are not authority
- Audit 01–03 for tokens/font/color/radius/shadow/spacing/icon/copy/extra UI
- Record only actionable findings in `agent/FIGMA_RUNTIME_GAP_AUDIT_2026-09-30.md`
- Implement search, filters, selected/empty add, detail tabs, custom
  create/edit/history-lock, attachment overlays, and confirm dialogs
- Keep render screens, route orchestration, and fixtures separate
- Register each implemented state in the dev-only Catalog
- Wire Routine-create → ExerciseSelection → return
- Focused + full Jest, typecheck, lint, Expo config/prebuild, diff-check

## Allowed Scope
- `src/features/exercise/` presentation, fixtures, and types
- `ExerciseSelection` route orchestration and Routine-create entry
- Dev-only Catalog entries/presets
- Implemented Screen Map rows, Issue evidence, TASK_CONTRACT
- 01–03 audit document only (no speculative 01–03 UI edits)

## Forbidden
- SQLite writes/persistence
- Real Supabase/Auth/sync/storage/network/uploads/notifications
- New global design-system tokens or invented visual primitives
- Group 05+ implementation
- Guessing UI not present in current Figma

## Figma refs
- File `W3lZurXCXbThP67rF2xk2b`
- Page `MVP_전체_와이어프레임` — `34:1076`
- Current Group 04 frames listed in `agent/FIGMA_SCREEN_MAP.md`

## Affected invariants / regression packs
- Canonical Figma is visual authority
- Deterministic mock data; no backend from screens
- Navigation routes, UI Catalog, Group 02 routine-create path

## Verification
1. typecheck 2. lint 3. focused/full Jest 4. Expo config/prebuild
5. diff-check

## Done When
- 01–03 audit committed with actionable findings only
- All 29 Group 04 top-level states render in Catalog
- Routine-create can enter and return from Group 04
- Intentional Figma differences documented
- Commit pushed; no PR created
