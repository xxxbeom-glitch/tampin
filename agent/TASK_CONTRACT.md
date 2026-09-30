# Active Task Contract

## Task / Issue
- Issue #30 / DEV-014 — Figma parity audit and Group 04 exercise flow
- Branch: `cursor/dev-014-group04-figma-parity`
- Review: RETRY (first delivery `a60a537`)

## Goal
Keep the 01–03 FIX 10 audit as follow-up, then close the RETRY gaps:
Growth chart/sparkline, Figma icon export/reuse, and RoutineCreate mock
draft display of confirmed selection.

## Required
- Inspect remaining Group 04 states with `get_design_context` + screenshot
- Implement Growth graph/sparkline to current Figma (no PR-card substitute)
- Replace search/check/hint/trash/close/add-toggle stand-ins with Figma exports
- Pass confirmed selected exercises into RoutineCreate mock draft (no SQLite)
- Record per-screen token mapping, confirmed nodes, diffs, unverified
- Keep 01–03 FIX 10 as follow-up only
- Focused + full Jest, typecheck, lint, Expo config/prebuild, diff-check

## Allowed Scope
- `src/features/exercise/` presentation, fixtures, types
- `src/features/routine/` create draft display + in-memory mock holder
- ExerciseSelection / RoutineEditor route orchestration
- Dev-only Catalog descriptions/presets
- `assets/figma/` exported icons + manifest
- Implemented Screen Map rows, Issue evidence, TASK_CONTRACT

## Forbidden
- SQLite writes/persistence
- Real Supabase/Auth/sync/storage/network/uploads/notifications
- New global design-system tokens
- Implementing the 01–03 FIX 10 audit items
- Group 05+ implementation
- PR / merge / next group

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
6. Figma screenshot vs implementation structure — no visual PASS without evidence

## Done When
- RETRY items 1–4 recorded honestly
- Commit pushed; no PR created
- Next Owner = ChatGPT
