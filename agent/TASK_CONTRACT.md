# Active Task Contract

## Task / Issue
- Issue #30 / DEV-014 — Figma parity audit and Group 04 exercise flow
- Branch: `cursor/dev-014-group04-figma-parity`
- Review: RETRY 2 (after `92c6b76`)

## Goal
Fix confirmed mock-session bugs: creation-session draft isolation,
custom-exercise catalog restore, real focus/re-entry tests, and
attachment value preservation on the in-memory draft.

## Required
- Clear draft on create-session start/end only — not on every focus
- Preserve ExerciseSelection round-trip inside the same session
- Restore full custom-exercise catalog data for the same mock session
- Persist selected/direct-input attachment on the mock draft
- Regression tests: focus return, exit then new create, custom re-select
- Keep 01–03 FIX 10 as follow-up
- Canvas `#F6F7F7` vs Figma `#F7F8FA` stays unresolved (PO lock)
- No visual PASS without device/pixel evidence
- typecheck, lint, related Jest; commit/push; no PR

## Allowed Scope
- `src/features/routine/routineCreateDraft.ts` and create-screen display
- ExerciseSelection / RoutineEditor route orchestration
- Related unit/route tests and Issue evidence / TASK_CONTRACT

## Forbidden
- SQLite / real backend
- New global design-system tokens
- Inventing new UI beyond existing draft-row copy
- Implementing 01–03 FIX 10
- Group 05+ / PR / merge

## Figma refs
- File `W3lZurXCXbThP67rF2xk2b`
- Attachment: `04H` + `docs/implementation/MVP_SCREEN_BEHAVIOR_MATRIX.md`
- Attachment policy: `docs/ux-decisions/2026-09-03-cable-attachment-active-workout.md`

## Verification
1. typecheck 2. lint 3. related Jest
4. No visual PASS

## Done When
- RETRY 2 bugs 1–3 + attachment persist recorded honestly
- Commit pushed; no PR created
- Next Owner = ChatGPT
