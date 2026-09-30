# Issue #30 / DEV-014 Evidence — FIX 10

## Result
- Branch: `cursor/dev-014-group04-figma-parity`
- Base: `3b7882e`
- Status: Logic PASS · Visual **NOT VERIFIED** (no device/pixel compare; visual PASS 금지)
- Runtime/Device: NOT VERIFIED · device install not run
- Next Owner: ChatGPT
- PR / merge / Group 05: **대기**

## FIX 10 — before → after (reconfirmed Figma 2026-09-30)

| # | Location | Before | Figma now | After |
|---|----------|--------|-----------|-------|
| 1 | `SplashScreen` wordmark | 120×28 | `1961:8910` 139×28 | 139×28 |
| 2 | `LoginFormScreen` wordmark | 120×28 | `43:3053` 139×28 | 139×28 |
| 3 | login `errorDialogCard` | border only | `1296:667` Elevation/Card 0/0/8/`#0000000d` | same mapping as `ConfirmDialogOverlay` |
| 4 | 01C disabled DOB | `opacity: 0.3` on `TextInput` | `1314:708` InputBox whole-field `opacity-30` | wrapper `basic-info-dob-field` opacity 0.3 |
| 5 | plus | 18×18 | 16×16 in 36 circle | 16×16 |
| 6 | chevron-right | 18×18 | 16×16 | 16×16 |
| 7 | folder chevron | 14×14 | 16×16 | 16×16 |
| 8 | bottom-tab | one PNG + `tintColor` | Active=루틴/분석/설정 baked colors `#2563D6` / `#626866` | state rasters, no tint |
| 9 | 02A `cardShadow` | radius 4 / elev 2 | Elevation/Card radius **8**; MCP CSS also showed `drop-shadow` 4px | radius 8 / elev 2 |
| 10 | 02D `cardShadow` | radius 4 / elev 2 | same Elevation/Card radius 8 | radius 8 / elev 2 |

## Shadow platform mapping (not equated)

Figma `Elevation/Card` on DialogCard / RoutineCompactCard / ExerciseCard / BottomAppBar:

- Effect: `DROP_SHADOW` offset `(0, 0)` radius `8` spread `0` color `effect/card-shadow` = `#0000000d` (~5% black)
- `get_variable_defs` `1296:667` confirmed `#0000000d`
- MCP Tailwind sometimes emitted `drop-shadow-[0px_0px_4px_…]` for the same nodes. That is a CSS translation, not a second Figma effect. Source of truth = Elevation/Card radius 8.

RN mapping used (same as existing `ConfirmDialogOverlay`):

- iOS: `shadowOffset {0,0}` + `shadowOpacity 0.05` + `shadowRadius: 8`. `shadowRadius` is UIKit blur, **not** guaranteed equal to Figma/CSS blur.
- Android: `elevation: 2` is Material Z-depth, **not** a blur radius. Not a 1:1 of Figma 8.
- Pixel identity of the shadow halo is **NOT VERIFIED**.

## Bottom-tab assets

Kept existing 48×48 rasters (Active=루틴 bake):

- `bottom-tab-routine.png` `2078:2189` active `#2563D6`
- `bottom-tab-analysis.png` `2078:2197` inactive `#626866`
- `bottom-tab-settings.png` `2078:2204` inactive `#626866`

Added 48×48 @2x:

- `bottom-tab-routine-inactive.png` `2078:2285`
- `bottom-tab-analysis-active.png` `2078:2293`
- `bottom-tab-settings-active.png` `2078:2396`

Runtime tint removed.

## ACCEPT / canvas

- ACCEPT rows were not auto-closed. Backlog: `agent/FIGMA_ACCEPT_BACKLOG_2026-09-30.md`
- Canvas `#F6F7F7` vs `#F7F8FA` unresolved. Docs: `docs/CURRENT.md`, `docs/ux-decisions/2026-09-17-light-color-system-po-approval.md`

## Screenshot compare

**Not possible in this environment.** RNTL/Jest does not emit pixels. No Android SDK / emulator. User forbade device install. Figma `get_design_context` screenshots were used to reconfirm numbers only — not a runtime overlay. Visual PASS not claimed.

## Verification
- `npm run typecheck` — PASS
- `npm run lint` — PASS
- Related Jest — PASS (`splash-screen`, `splash-catalog`, `login-form-screen`, `login-catalog`, `basic-info-catalog`, `routine-main-screen`, `routine-detail-screen`, `bundled-assets-fonts`)
- `git diff --check` — PASS

---

# RETRY 2 record (historical, `3b7882e`)

## Result
- Branch: `cursor/dev-014-group04-figma-parity`
- Commit: `2ee9ad9d3726b7b06e0e729a0f0f2d79ff2f915b`
- Base reviewed: `92c6b76`
- Status: Logic PASS · Visual **NOT VERIFIED** (no device/pixel compare; visual PASS 금지)
- Runtime/Device: NOT VERIFIED
- Next Owner: ChatGPT
- PR / merge / Group 05: **대기**

## RETRY 2 scope
Confirmed bugs after independent review of `92c6b76`:

1. **Session leak** — `clearRoutineCreateDraftExercises` was exported and unused. `RoutineEditor` hydrated from a process-global draft, so leaving create and starting again leaked prior exercises.
2. **Custom catalog drop** — `ExerciseSelection` remounted `catalog` from `exerciseCatalogFixture` while `selectedIds` came from draft. Confirm `filter(Boolean)` dropped custom ids missing from fixture.
3. **Focus tests were fake** — editor tests injected draft before mount and never fired the real `focus` listener.
4. **Attachment discard** — preset / direct-input values were not written onto the mock draft.

## Fixes
- Session API: `beginRoutineCreateSession` / `endRoutineCreateSession` clear exercises **and** session catalog.
- `RoutineEditor` `begin()` on mount only. `focus` hydrates display from draft (id + attachment compare). `beforeRemove` + folder Back `end()` the session. Create Back (`setStep('folder')`) stays in the same session. Focus never clears.
- Session catalog extras + each draft row `catalogItem` merge ahead of `exerciseCatalogFixture`. Confirm writes `toRoutineCreateDraftExercise(item, attachments[id])` and upserts selected `custom-*` items.
- Attachment preset / trimmed direct-input stored on the draft. Create screen reuses the existing meta `Text` (`근육 · 장비 · 손잡이`). No new chip / UI.
- Tests fire the real `focus` listener via the registered navigation callback. Cover leftover-before-mount empty, focus restore, exit/end then empty, same-session create Back preserve, custom confirm + fresh-mount restore, preset/direct attachment persist.

## Attachment policy (no new UI)
- `docs/implementation/MVP_SCREEN_BEHAVIOR_MATRIX.md` `04H` — attachment/grip is independent of base exercise identity; preset or direct-input path.
- `docs/ux-decisions/2026-09-03-cable-attachment-active-workout.md` — attachment text does not rewrite exercise identity.
- Mock draft stores `attachment: string | null` only.

## Canvas unresolved (not visual PASS)
PO lock stays `#F6F7F7`. Current Figma `--fitness-colors-bg-default` is `#F7F8FA`. Approval locations:

- `docs/CURRENT.md` — Light baseline, Canvas `#F6F7F7`
- `docs/ux-decisions/2026-09-17-light-color-system-po-approval.md` — Canvas `#F6F7F7`

Unresolved. Not claimed PASS.

## Out of scope (unchanged)
- SQLite / backend
- 01–03 FIX 10
- Group 05+
- PR / merge

## Verification
- `npm run typecheck` — PASS
- `npm run lint` — PASS
- Related Jest — PASS 4 suites / 25 tests (`exercise-selection-route`, `routine-editor-route`, `routine-create-draft`, `routine-create-screen`)
- `git diff --check` — PASS
- Dual `render()` in one test poisons the RNTL host (`Cannot access .container on unmounted test renderer`). Re-entry is covered by session inject + single fresh mount, plus real `focus` / `beforeRemove` callbacks. Not claimed as a dual-renderer host PASS.
- Visual vs Figma — **NOT VERIFIED / not claimed PASS**
- Runtime/Device — NOT VERIFIED

## Known unverified
- Android device / pixel QA
- Keyboard, chip-strip overflow, attachment-sheet gesture
- 01–03 FIX 10
- Canvas `#F6F7F7` vs Figma `#F7F8FA` remains unresolved

---

# RETRY 1 record (historical, `92c6b76`)

## Result
- Branch: `cursor/dev-014-group04-figma-parity`
- Commit: `f8862f2c412e1401eeec79b5d9050d6c9dd7dab0` / evidence `92c6b76`
- Status: Logic PASS · Visual **NOT VERIFIED**
- Next Owner: ChatGPT
- PR / merge / next group: **대기**

## RETRY 1 scope
1. Remaining Group 04 states inspected with `get_design_context` + screenshot. Growth is a trend line chart + personal-best table, not a PR card. History Duration/Assisted fixtures now match the inspected Figma samples. Attachment input copy/layout matches `552:3356`.
2. search / check / close / hint / trash / selected-add-toggle use Figma-exported PNGs.
3. Confirming `N개 운동 추가` writes an in-memory RoutineCreate mock draft and the create screen shows those rows. No SQLite.
4. 01–03 FIX 10 remain follow-up in `agent/FIGMA_RUNTIME_GAP_AUDIT_2026-09-30.md`.

## Confirmed Figma nodes (RETRY 1)

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
