# Issue #30 / DEV-014 Evidence — RETRY

## Result
- Branch: `cursor/dev-014-group04-figma-parity`
- Commit: `f8862f2c412e1401eeec79b5d9050d6c9dd7dab0`
- Status: Logic PASS · Visual **NOT VERIFIED** (no device/pixel compare)
- Runtime/Device: NOT VERIFIED
- Next Owner: ChatGPT
- PR / merge / next group: **대기**

## RETRY scope
1. Remaining Group 04 states inspected with `get_design_context` + screenshot. Growth is a trend line chart + personal-best table, not a PR card. History Duration/Assisted fixtures now match the inspected Figma samples. Attachment input copy/layout matches `552:3356`.
2. search / check / close / hint / trash / selected-add-toggle use Figma-exported PNGs.
3. Confirming `N개 운동 추가` writes an in-memory RoutineCreate mock draft and the create screen shows those rows. No SQLite.
4. 01–03 FIX 10 remain follow-up in `agent/FIGMA_RUNTIME_GAP_AUDIT_2026-09-30.md`.

## Confirmed Figma nodes (RETRY pass)

File: `W3lZurXCXbThP67rF2xk2b` · page `MVP_전체_와이어프레임` (`34:1076`)

| Frame | Node | Method |
|-------|------|--------|
| `04D_Exercise_Detail_Growth` | `1000:1519` | design context + screenshot |
| `04D_Exercise_Detail_Growth_Reps` | `1391:1707` | design context + screenshot |
| `04D_Exercise_Detail_Growth_Duration` | `1391:1867` | design context + screenshot |
| `04D_Exercise_Detail_Growth_Assisted` | `1391:2027` | design context + screenshot |
| `04D_Exercise_Detail_Growth_Empty` | `1391:2190` | design context + screenshot |
| `04D_Exercise_Detail_Growth_Insufficient` | `1391:2265` | design context + screenshot |
| `04A_Search` | `207:1238` | design context + screenshot |
| `04B_Search_Selected` | `515:1140` | design context + screenshot |
| `04F_Custom_Edit_HistoryLocked` | `1396:8393` | design context + screenshot |
| `04D_Exercise_Detail_History_Reps` | `1391:1619` | design context + screenshot |
| `04D_Exercise_Detail_History_Duration` | `1391:1779` | design context + screenshot |
| `04D_Exercise_Detail_History_Assisted` | `1391:1939` | design context + screenshot |
| `04I_Custom_Equipment_Select` | `1396:2298` | design context + screenshot |
| `04K_Custom_SecondaryMuscle_Select` | `1396:8179` | design context + screenshot |
| `04E_Custom_Create_Valid` | `1401:1890` | design context + screenshot |
| `04F_Custom_Edit` | `34:1692` | design context + screenshot |
| `04H_Custom_Attachment_Input` | `552:3356` | design context + screenshot |
| Previously inspected (first delivery) | `515:3327` `515:3514` `40:2325` `34:1714` `1391:2099` `34:1672` `1396:8091` `1396:8271` `170:2174` `1401:7683` `1429:1751` | design context |

## Source token → runtime mapping

| Figma token / style | Source value | Runtime |
|---------------------|--------------|---------|
| `--fitness-colors-bg-default` | `#F7F8FA` | `colors.canvas` `#F6F7F7` (PO lock) |
| `--fitness-colors-bg-surface` | `#FFFFFF` | `colors.surface` |
| `--fitness-colors-text-primary` | `#242927` | `colors.textPrimary` |
| `--fitness-colors-text-secondary` | `#626866` | `colors.textSecondary` |
| `--fitness-colors-text-tertiary` | `#929A98` | local `#929A98` (no global token) |
| `--fitness-colors-border-subtle` | `#EAEEED` | `colors.borderSubtle` |
| `--fitness-colors-border-default` | `#E7EBEA` | `colors.borderDefault` |
| `--fitness-colors-brand-primary` | `#2563D6` | `colors.brandPrimary` `#2563D6` |
| `--brand/soft` | `#EAF0FF` | local `#EAF0FF` on Growth period (no new global token) |
| `--fitness-colors-bg-elevated` | `#EFF2F2` | `colors.subtleSurface` (add-toggle idle) |
| `--fitness-colors-bg-overlay` | `rgba(0,0,0,0.52)` | attachment overlay |
| `--fitness-radius-radius-3xl` | 32 | attachment sheet top radius |
| heading/01 | SUIT Bold 16/24 | `fontFamily.bold` 16/24 |
| heading/02 | SUIT Bold 14/20 | `fontFamily.bold` 14/20 |
| display/01 | SUIT Bold 20/28 | empty/insufficient titles |
| body/01 | SUIT Medium 14/20 | body / personal-best values |
| body/02 | SUIT Medium 13/18 | personal-best meta |
| label/01 | SUIT Bold 12/16 | custom form / attachment field labels |
| label/02 | SUIT Medium 12/16 | period segments / chips / attachment input body |
| caption/01 | SUIT Medium 11/14 | chart axis |
| caption/02 | SUIT Medium 10/12 | chart unit |
| Elevation/Card | 0 0 8px rgba(0,0,0,0.05) | `shadowRadius: 8` / opacity 0.05 |
| StatusArea_Spacer | 62 | 62 |
| Tabs | 54, selected underline 2px brand | existing tab styles |
| Growth chart card | 320×176 r20 | `ExerciseGrowthChart` |
| Period control | 144×32 r12, selected 26 r8 | `ExerciseGrowthChart` |
| Plot | left 52 top 40, 252×88, 4 buckets | data-driven points + line segments |
| History Duration sample | 플랭크 7/12·10·7 `60초`…`30초` | `exerciseDetailById.plank` |
| History Assisted sample | 어시스트 풀업 25–40kg + 횟수 | `exerciseDetailById['assisted-pull-up']` |
| icon/search `638:3295` | 20×20 in SearchField | `figmaAssets.icons.search` 20×20 |
| icon/check `636:895` | OptionItem 24×24 | `figmaAssets.icons.check` 24×24 |
| Icon/Close `569:1337` | 16×16 chip | `figmaAssets.icons.close` 16×16 |
| icon/hint Info `1916:8897` | 16×16 | `figmaAssets.icons.hint` 16×16 |
| icon/trash `706:959` | 24×24 header | `figmaAssets.icons.trash` 24×24 |
| ExerciseAddToggle Selected `2513:8871` | 26×26 | `figmaAssets.icons.addToggleSelected` |

## Icon export record
- PASS: `638:3295` search, `636:895` check, `569:1337` close, `1916:8897` hint Info, `706:959` trash, `2513:8871` selected add-toggle.
- FAIL (reported, recovered, not treated as complete from the instance): `660:1582` search instance `download_assets` returned `export: null`. Recovered via Common_Component `638:3295`.
- FAIL (reported, recovered, not treated as complete from the instance): `263:899` TrashIcon instance `export: null`. Recovered via `706:959`.
- Component-set `1916:8900` exported as 288×48 strip; replaced by Info state `1916:8897` (48×48 @3x = 16).

## Intentional / remaining differences
- Canvas `#F6F7F7` vs Figma `#F7F8FA` — PO lock.
- Growth period 3개월/1년 are visual-only; fixture data is the Figma 4주 sample.
- Line segments are RN Views matching Figma plot geometry; not the raw TrendPath SVG image.
- Selected-search 10-item chip sample remains the catalog fixture.
- Routine-create `저장` remains disabled. Draft is process-memory only.
- 01–03 FIX 10 unchanged / follow-up.
- Filter chevrons reuse existing `icon-chevron-right` rotated; Figma uses ChevronDown rotated 90°. Pixel match NOT VERIFIED.
- Attachment select sheet body still uses `{exerciseName}에서 사용할 손잡이를 선택하세요.` from the first-delivery select frame.

## Verification
- `npm run typecheck` — PASS
- `npm run lint` — PASS
- Focused Jest — PASS (`exercise-detail`, `exercise-selection-route`, `routine-create-*`, `routine-editor-route`)
- Full Jest — 42/42 suites PASS when run **one file per process**. Single-process `npx jest --runInBand` hit heap OOM (exit 134) and is **not** claimed as a single-process PASS.
- `npx expo config --type public` — PASS (`Tampin`, `com.lumian.tampin`)
- `npx expo prebuild --platform android --no-install` — PASS (`android/` gitignored)
- `git diff --check` — PASS
- Visual vs Figma screenshots — **NOT VERIFIED / not claimed PASS**. Compared Figma design-context + screenshot to implementation structure/copy/fixtures only. No device or runtime screenshot overlay.

## Known unverified
- Android device / pixel QA
- Keyboard, chip-strip overflow, attachment-sheet gesture
- Growth line antialiasing vs Figma SVG path
- Filter chevron glyph vs Figma ChevronDown
- 01–03 FIX 10
