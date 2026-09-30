# Active Task Contract

## Task / Issue
- **No new GitHub Issue number.** User-approved follow-up after Issue #30 FIX 10.
- Prerequisite: Issue #30 / DEV-014 commit `b949c89` (FIX 10 source). Visual/device PASS and merge for #30 are **not** granted.
- Branch: `cursor/group05-figma-parity` (from `b949c89`)
- Scope: Group 05 Active Workout Figma parity (mock / deterministic UI)

## Goal
Implement current canonical Group 05 (18 frames) as screen / route / fixture-separated mock UI, wired from 02D `운동 시작`, registered in Debug UI Catalog. Do not invent styles or start Group 06.

## Required
- Read current Figma Group 05 nodes + `docs/implementation/MVP_SCREEN_BEHAVIOR_MATRIX.md` before coding
- Header: opaque canvas (`colors.canvas`); elapsed in Nav Header title slot; **no pause/play**; paused elapsed opacity **0.5**
- Header right action = `icon/more-horizontal`; 05I = icon-free compact anchored menu (`운동 종료` / `운동 추가` / `타이머`)
- Automatic rest: existing bottom-sheet pattern; circular progress + time; `(-) 15초 (+)`; **no rest pause**; overlay tap = `휴식 건너뛰기`; 16px gap above CTA
- 05Q Manual Timer: Idle `타이머 시작` → Running `일시정지` → Paused `초기화` / `계속 진행` against current Figma + 05Q docs
- Figma assets / tokens / Korean copy only; report missing exports
- Deterministic mock + Catalog for every Group 05 frame
- 02D `운동 시작` → Active Workout
- Every button has a defined mock state transition and a test
- 04 custom-edit access/delete and other unconnected product links stay in backlog (not marked done)
- Canvas `#F6F7F7` vs Figma `#F7F8FA` stays unresolved
- type / lint / related Jest; commit / push; **no PR / no merge / no Group 06**

## Allowed Scope
- `src/features/workout/`
- ActiveWorkout route + ExerciseSelection purpose flag for in-workout add
- Catalog / tests / TASK_CONTRACT / Group 05 evidence / screen-map 05 rows / backlog
- Already-exported Figma assets + newly downloaded Group 05 icons (more-horizontal / more-vertical / drag-handle)

## Forbidden
- New GitHub Issue number
- SQLite / real backend / Auth / OAuth / device install
- New global design-system tokens
- Canvas color change
- Invented UI / copy
- Treating matrix RestLiveBar / WorkoutLiveBar as current visual when current Figma + this task lock differ
- PR / merge / Group 06
- Marking 04 customEdit access/delete as connected

## Figma refs
- File `W3lZurXCXbThP67rF2xk2b`
- 18 canonical frames listed in `agent/FIGMA_SCREEN_MAP.md` Group 05

## Dependency / conflict notes
- #30 `b949c89` is the base. Do not rewrite FIX 10.
- Current Figma 05A/05F/05I/05Q supersede older WorkoutLiveBar / RestLiveBar visuals for this mock.
- Behavior-matrix 05F still says RestLiveBar + no ±15. This task + current Figma lock the bottom-sheet + ±15 rest. Record as unresolved doc drift (not silently “fixed” in the matrix).

## Verification
1. typecheck 2. lint 3. related Jest
4. No visual / device PASS
5. Runtime notifications / exact-alarm / persistence = NOT VERIFIED

## Done When
- 18 Group 05 frames have screen/state + Catalog + defined transitions
- 02D start → 05
- Backlog lists unconnected 04 customEdit and other gaps
- Commit pushed; no PR
- Next Owner = ChatGPT
