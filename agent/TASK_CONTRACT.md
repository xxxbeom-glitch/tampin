# Active Task Contract

## Task / Issue
- Issue #24 / DEV-011 — Current Routine Detail and routine-card flow
- Branch: `cursor/dev-011-routine-detail-368a`

## Goal
Implement scrollable 02D Routine Detail and wire Routine Main card → detail → ActiveWorkout with local fixtures.

## Required
- Presentational RoutineDetailScreen matching Figma `2333:7821`
- Typed RoutineDetail route; cards → detail; back → RoutineHome; CTA → ActiveWorkout
- Header edit visual-only; catalog + tests; preserve DEV-010 Routine Main layout geometry

## Allowed Scope
- `src/features/routine/*` detail files
- Navigation route wiring, catalog, tests, screen map 02D row, evidence

## Forbidden
- Edit behavior, persistence, set mutation, real thumbnails/media, routine params

## Figma refs
- `02D_Routine_Detail` — `2333:7821`

## Verification
1. typecheck 2. lint 3. full jest 4. expo config/prebuild 5. diff-check
