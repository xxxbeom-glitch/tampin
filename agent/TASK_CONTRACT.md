# Active Task Contract

이 문서는 현재 Cursor 구현 작업 한 건만 유지한다.
새 Issue를 시작할 때 이전 내용을 교체한다.

## Task / Issue
- Issue #22 / DEV-010 — Current Routine Main component states
- Branch: `cursor/dev-010-routine-main-368a`

## Goal
Replace RoutineHome placeholder with canonical Routine Main WithRoutines/Empty states and wire non-ambiguous first actions.

## Required
- Presentational RoutineMainScreen with deterministic WithRoutines/Empty matching Figma `2483:8317` / `2483:8418`
- Quick actions: `루틴 없이 시작` → ActiveWorkout; `새 루틴 만들기` → RoutineEditor; bottom Analysis/Settings → existing boundaries
- Routine cards visual only; no 02D detail routing
- Local fixtures only; catalog WithRoutines/Empty; tests for rendering/routes/catalog/a11y
- type/lint/full jest/expo config/prebuild/diff-check; update relevant 02 rows in Screen Map + evidence

## Allowed Scope
- `src/features/routine/*`
- `RoutineHomeRouteScreen`, RootNavigator wiring
- `src/debug/ui-catalog/*` routine entries
- `__tests__/routine-*`, `agent/FIGMA_SCREEN_MAP.md` 02 rows, `agent/ISSUE_22_EVIDENCE.md`

## Forbidden / Do Not Change
- SQLite/Supabase/persistence/media/network
- Routine detail 02D routing, active workout implementation, folder creation form
- Unrelated screens/tokens/global DS components

## Figma refs
- `02A_Routine_Main` — `2483:8317` (WithRoutines)
- `02B_Routine_Main_Empty` — `2483:8418` (Empty)

## Risk
- Android dashed border rendering differs from Figma
- Bottom bar icon placeholders vs Iconly Pro assets

## Verification
1. `npm run typecheck`
2. `npm run lint`
3. `npm test -- --runInBand`
4. `npx expo config --type public`
5. `npx expo prebuild --platform android --no-install`
6. `git diff --check`

## Done When
- AC satisfied; device visual QA NOT VERIFIED unless run
- Evidence recorded; Next Owner = ChatGPT
