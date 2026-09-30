# Group 05 inventory — current Figma vs code (2026-09-30)

Base: `b949c89` · File `W3lZurXCXbThP67rF2xk2b` · Page `MVP_전체_와이어프레임`

## Screen / state list (18)

| ID | Node | Route vs overlay | Reuse |
|----|------|------------------|-------|
| `05A_Workout_Weight` | `148:1979` | `ActiveWorkout` screen | New workout shell. Card/table pattern from 02D. |
| `05A_…_Scrolled_3rdExercise` | `1495:2408` | Same screen, scroll state | Not a route. |
| `05I_Workout_Menu` | `148:3392` | Overlay on 05A | Current Figma name `05I_Workout_Menu_PanelOverlay`. Header more menu. |
| `05F_Workout_RestTimer` | `1498:2769` | Overlay sheet on 05A | Attachment-sheet overlay family. **Not** RestLiveBar. |
| `05Q_ManualTimer_Idle` | `1519:2581` | Overlay sheet on 05A | Same timer chrome as 05F. |
| `05Q_ManualTimer_Running` | `1525:4014` | Overlay sheet | |
| `05Q_ManualTimer_Paused` | `1547:3691` | Overlay sheet | |
| `05J_Reorder` | `36:3609` | In-flow screen (not stack route) | New. |
| `05G_Exercise_Replace_Suggest` | `713:14539` | In-flow screen | New. Radio exception (CURRENT). |
| `05H_Exercise_Replace_Selected` | `713:14526` | Same replace screen | |
| `05G2_…_SecondBatch` | `731:3906` | Same replace screen, batch 1 | |
| `05P_…_DeleteConfirm` | `734:3883` | Dialog overlay | Reuse `ConfirmDialogOverlay` chrome. |
| `05K_End_Incomplete` | `36:3620` | Dialog | Reuse dialog chrome. |
| `05L_End_Complete` | `36:3623` | Dialog | |
| `05M_Discard` | `36:3626` | Dialog | No 05I row in current Figma. Catalog + reducer action. |
| `05O_Workout_UpdateRoutine` | `148:3730` | Dialog | |
| `05N_…_Incomplete` | `727:3622` | Dialog | Shown when 02D/빈 운동 starts while a mock session exists. |
| `05N_…_Complete` | `727:3842` | Dialog | |

## Connections

- 02D `운동 시작` / 02A `빈 운동` → `ActiveWorkout` (already typed). This task seeds the mock session.
- 05I `운동 추가` / 05A CTA → Group 04 `ExerciseSelection` with workout-add purpose (in-memory only).
- 05I `타이머` → 05Q. Disabled while 05F rest is active.
- Card `⋮` → compact menu `대체 운동 / 순서 변경 / 삭제` (2026-09-10 lock). **No current standalone Figma frame** among the 18. Same 05I chrome, different rows.
- End → 05K / 05L → optional 05O → leave session. Group 06 **not** implemented.
- Completing a set → 05F rest (replace if already running). Overlay / `휴식 건너뛰기` skips.

## Existing code

| Area | Status |
|------|--------|
| `src/features/workout/index.ts` | Empty barrel |
| `ActiveWorkout` / `RestTimer` stack routes | Placeholder |
| 02D start → `ActiveWorkout` | Navigate only |
| ExerciseCard workout mode | Not implemented (02D is routine-detail card) |
| SQLite workout repository | Exists; **out of scope** |

## Confirmed product locks (this task + current Figma)

- Header opaque canvas; elapsed is Nav Header **center title** (Figma). User wording “진행시간 좌측” recorded as wording/Figma geometry conflict — implemented Figma.
- No header pause/play. Paused elapsed opacity 50% (presentation flag; no current Figma pause control).
- 05I: `운동 종료` / `운동 추가` / `타이머`, 92×118, no icons.
- Rest: bottom sheet, ring + time, ±15, no pause, overlay tap = skip, 16px above `휴식 건너뛰기`.
- 05Q: default `01:30`; Idle `타이머 시작`; Running `일시정지`; Paused `초기화` / `계속 진행`. Overlay dismiss/terminate. Reopen = Idle `01:30`.

## Doc drift (unresolved, not silently rewritten)

- Matrix 05F: RestLiveBar, no ±15, CTA `휴식 종료`.
- Current Figma 05F + this task: sheet, ±15, `휴식 건너뛰기`.
- Older 05Q docs: `계속하기` + circular X. Current Figma: `계속 진행`, no X on the sheet.

## Not started as done

- 04 custom-edit access / delete from Home / 02D / 05
- Group 06 completion
- Android notification / exact-alarm / POST_NOTIFICATIONS
- SQLite persistence of the session
