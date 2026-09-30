# Group 05 / leftover product-link backlog (2026-09-30)

Rule: unconnected or unverified items are **not** done.

## 04 leftovers (still unconnected)

| ID | Item | Notes |
|----|------|--------|
| B04-1 | Custom edit access from Home / 02D / 05 | `04F` exists in Catalog and inside Group 04 `ExerciseSelection` only. No product entry from routine detail, home, or active workout. |
| B04-2 | Custom delete | `04F_Custom_Delete_Confirm` is Catalog + selection-flow dialog only. Does not delete catalog/routines in SQLite. |
| B04-3 | 02D Edit | Still disabled visual-only (ACCEPT A12). |

## Group 05 product gaps

| ID | Item | Notes |
|----|------|--------|
| B05-1 | 05M discard entry | Current 05I rows are `운동 종료 / 운동 추가 / 타이머` only. Discard is Catalog + reducer `openDiscard`. No Figma header-menu row. |
| B05-2 | Card `⋮` menu frame | `대체 운동 / 순서 변경 / 삭제` uses 05I chrome. No standalone frame among the 18. |
| B05-3 | Native drag reorder | 05J handle press moves the row down (mock). No native drag library. |
| B05-4 | RestLiveBar / WorkoutLiveBar | Superseded visually by current Figma + this task. Matrix 05F text not rewritten. |
| B05-5 | 05Q circular X | Older 05Q docs. Current Figma sheet has no X; overlay tap dismisses/terminates. |
| B05-6 | Group 06 | End/save leaves the stack. Completion screens not implemented. |
| B05-7 | Notifications / exact-alarm / POST_NOTIFICATIONS | Out of scope. NOT VERIFIED. |
| B05-8 | SQLite session persistence | In-memory mock only. |
| B05-9 | Duration / assisted / reps-only cards | Shell supports labels; 05A fixture is weight+reps only. |
| B05-10 | Header elapsed “좌측” vs Figma center title | Implemented Figma Nav Header title slot. |
| B05-11 | Rest / manual / header live clocks | Mock remainingSec + `displayElapsed` only. `tickRest`/`tickManual` are test/reducer actions. No interval, exact-alarm, or device runtime. NOT VERIFIED. |

## Unresolved token

- Canvas `#F6F7F7` (PO lock) vs Figma `#F7F8FA`. Not changed.
