# Issue #30 / DEV-014 Evidence

## Result
- Branch: `cursor/dev-014-group04-figma-parity`
- Status: Logic PASS
- Runtime/Device: NOT VERIFIED
- Next Owner: ChatGPT

## Implemented
1. 01–03 Figma/runtime audit recorded in `agent/FIGMA_RUNTIME_GAP_AUDIT_2026-09-30.md` (actionable FIX items only; no speculative 01–03 UI added).
2. All 29 current Group 04 top-level Figma states render as deterministic mock screens in the Debug UI Catalog.
3. `RoutineEditor` 운동 추가 navigates to `ExerciseSelection` and can return via back/confirm.
4. Screens, route orchestration, and fixtures are separated. No SQLite writes, auth, sync, or network.

## Current Figma read-back
File: `W3lZurXCXbThP67rF2xk2b` · page `MVP_전체_와이어프레임` (`34:1076`)

Inspected with `get_design_context` before implementation:
- `207:1238` `04A_Search`
- `515:1140` `04B_Search_Selected`
- `539:1050` `04C_Search_Empty`
- `515:3327` `04A_Filter_Equipment_Page`
- `515:3514` `04A_Filter_BodyPart_Page`
- `40:2325` `04D_Exercise_Detail_Info`
- `34:1714` `04D_Exercise_Detail_History`
- `1391:2099` `04D_Exercise_Detail_History_Empty`
- `34:1672` `04E_Custom_Create`
- `1396:8393` `04F_Custom_Edit_HistoryLocked`
- `1396:8091` `04J_Custom_PrimaryMuscle_Select`
- `1396:8271` `04L_Custom_RecordingType_Select`
- `170:2174` `04H_Exercise_Attachment_Selection`
- `1401:7683` `04EF_Custom_Unsaved_Confirm`
- `1429:1751` `04F_Custom_Delete_Confirm`

Remaining Group 04 frames were implemented from live page metadata + behavior matrix as states of the same screens (detail recording-type variants, growth empty/insufficient, custom pickers, attachment input).

## Catalog states (29)
- `04A_Search` Default
- `04A_Filter_Equipment_Page` AllSelected
- `04A_Filter_BodyPart_Page` AllSelected
- `04B_Search_Selected` Selected
- `04C_Search_Empty` Empty
- `04D_Exercise_Detail_Info` Info
- `04D_Exercise_Detail_History` HistoryWeightReps
- `04D_Exercise_Detail_Growth` GrowthWeightReps
- `04D_Exercise_Detail_History_Reps` HistoryReps
- `04D_Exercise_Detail_Growth_Reps` GrowthReps
- `04D_Exercise_Detail_History_Duration` HistoryDuration
- `04D_Exercise_Detail_Growth_Duration` GrowthDuration
- `04D_Exercise_Detail_History_Assisted` HistoryAssisted
- `04D_Exercise_Detail_Growth_Assisted` GrowthAssisted
- `04D_Exercise_Detail_History_Empty` HistoryEmpty
- `04D_Exercise_Detail_Growth_Empty` GrowthEmpty
- `04D_Exercise_Detail_Growth_Insufficient` GrowthInsufficient
- `04E_Custom_Create` Invalid
- `04E_Custom_Create_Valid` Valid
- `04F_Custom_Edit` Unlocked
- `04F_Custom_Edit_HistoryLocked` HistoryLocked
- `04H_Exercise_Attachment_Selection` Sheet
- `04H_Custom_Attachment_Input` DirectInput
- `04I_Custom_Equipment_Select` CableSelected
- `04J_Custom_PrimaryMuscle_Select` BackSelected
- `04K_Custom_SecondaryMuscle_Select` NoneSelected
- `04L_Custom_RecordingType_Select` WeightRepsSelected
- `04EF_Custom_Unsaved_Confirm` UnsavedDialog
- `04F_Custom_Delete_Confirm` DeleteDialog

## Intentional Figma differences
- Canvas remains locked `colors.canvas` `#F6F7F7` vs Figma `#F7F8FA`.
- Status spacer is 62px (current Group 04 Figma). Search/filter/check icons that are not in `assets/figma/manifest.json` are drawn locally to match Figma geometry rather than adding new global tokens or unexported PNG assets.
- Selected add-toggle uses a text checkmark on the brand circle; Figma uses Iconly check SVG (not exported).
- Custom-edit trash is a local 20×22 geometry stand-in; Figma `TrashIcon` is not exported.
- History-lock hint uses `ⓘ` text; Figma `icon/hint` SVG is not exported (same class of ACCEPT as 01C).
- Growth tab uses a PR card + copy for empty/insufficient/trend. A full Figma chart/sparkline was not newly invented; device visual comparison of growth frames remains NOT VERIFIED.
- Selected-search 10-item chip sample uses the deterministic catalog fixture, not a duplicated Figma-only stress list.
- Custom create/edit in the product route is local mock state only. Save does not persist to SQLite.
- Routine-create `저장` remains disabled. Selected exercises are not written back into the create form in this mock phase; the AC is enter/return from Group 04.

## Verification
- `npm run typecheck` — PASS
- `npm run lint` — PASS
- Focused Jest — PASS
- Full Jest — 41 suites / 162 tests PASS
- `npx expo config --type public` — PASS (`com.lumian.tampin`)
- `npx expo prebuild --platform android --no-install` — PASS
- `git diff --check` — PASS

## Known unverified evidence
- Android device/runtime visual QA vs Figma — NOT VERIFIED
- Keyboard, chip-strip overflow, and attachment-sheet gesture — NOT VERIFIED
- 01–03 FIX items in the audit were recorded only; not implemented here
- Growth-tab pixel match to Figma chart/layout — NOT VERIFIED
