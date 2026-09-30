# CURRENT — Tampin

**Updated:** 2026-09-30

Canonical GitHub repository: `xxxbeom-glitch/tampin`

## Cursor execution harness — prepared 2026-09-22 · Development reactivated 2026-09-30

Product Owner paused Development on 2026-09-22 for a major Design/Figma revision, then **explicitly reactivated Development on 2026-09-30** (Issue #6 Reactivation comment). DEV-001 bootstrap and DEV-002 EAS development profile remain PASS and merged to `main`. **Active development Issue: #8 / DEV-003 — typed navigation + development UI Catalog foundation.** Design/Figma redesign on detached `version2` continues in parallel; canonical `MVP_전체_와이어프레임` remains authoritative until explicit PO promotion. DEV-002 EAS login/project link and Runtime/Device launch remain NOT VERIFIED until PO local smoke completes.

Prepared in GitHub:
- `.cursor/rules/`
- `.cursor/skills/`
- `agent/TASK_CONTRACT.md`
- `agent/SESSION_HANDOFF.md`
- `agent/ERROR_LEDGER.md`
- `agent/FIGMA_SCREEN_MAP.md` — canonical 96 rows
- `agent/specs/DEBUG_SCREEN_CATALOG_GUIDE.md`
- `.github/ISSUE_TEMPLATE/tampin-task.md`
- `docs/implementation/CURSOR_BOOTSTRAP.md`
- `scripts/verify-ui.ps1`

Implementation staging:
- first development phase may implement UI / navigation / deterministic mock-flow before production DB/media hookup
- core workout persistence is not faked with AsyncStorage/file JSON
- SQLite, Supabase/Auth/Storage/Sync remain separate later Issues
- persistence/recovery claims remain NOT VERIFIED until their real architecture layer is connected

NEXT (development): execute / complete Issue #8 / DEV-003 typed navigation foundation; preserve DEV-002 NOT VERIFIED EAS/device records without reopening them.

NEXT (design, parallel): continue Design/Figma work from the detached `version2` page (`2237:7614`) using `docs/ux-decisions/2026-09-22-version2-detached-redesign-workspace.md`; keep `MVP_전체_와이어프레임` canonical and untouched until explicit PO promotion approval.

---

## Current mode

`DEVELOPMENT ACTIVE · ISSUE #8 / DEV-003 · DEV-001/DEV-002 PASS/MERGED · DESIGN/FIGMA REDESIGN CONTINUES IN PARALLEL ON version2 · PLATFORM/STACK/ARCHITECTURE LOCKS REMAIN · PACKAGE = com.lumian.tampin · ANDROID COMPILE PASS · EAS LOGIN/DEVICE SMOKE NOT VERIFIED · NEXT DEV = DEV-003 · NEXT DESIGN = version2 REDESIGN`

## Active development + parallel design revision

- Completed: Issue #5 / DEV-001 — **PASS · merged to main**
- Completed: Issue #6 / DEV-002 — **PASS · merged to main** (EAS profile committed; login/device smoke NOT VERIFIED)
- Active: Issue #8 / DEV-003 — **typed navigation + UI Catalog foundation**
- Parallel: **DESIGN / FIGMA** on detached `version2` — not canonical until PO promotion
- Reason for 2026-09-22 pause: Product Owner requested a substantial redesign before broader development
- Reason for 2026-09-30 resume: Product Owner explicitly reactivated Development for DEV-002 only (Issue #6 Reactivation comment supersedes pause for that Issue)
- Existing DEV-001 runtime scaffold remains accepted and is not rolled back
- Do not start canonical-screen or out-of-scope implementation beyond the current scoped GitHub Issue
- Design next action: continue the broad visual redesign on detached Figma page `version2` / `2237:7614`; preserve the canonical `MVP_전체_와이어프레임` baseline until explicit PO promotion approval, then reconcile only approved affected scope and re-run focused design QA

---

## Resume rule

`PROJECT_INSTRUCTIONS → CURRENT → latest active checkpoint → directly relevant Decision/Spec → NEXT OPEN ITEM`

이미 PO 승인 또는 QA PASS된 범위는 새 변경·충돌·regression 가능성·명시 재검토 요청이 없으면 다시 처음부터 검토하지 않는다.

---

## Canonical Figma

Current editing surface:
- file `W3lZurXCXbThP67rF2xk2b`
- page `MVP_전체_와이어프레임` — `34:1076`
- shared component page `Common_Component`
- current top-level independent screen frames: `96`
- current Light roots: `96 / 96`
- group wrapper frames: `0`

Whole-MVP component linkage read-back after the latest maintenance:
- instance nodes: `1,844`
- missing main-component links: `0`
- live MVP instances whose source page is not `Common_Component`: `0`

### Detached redesign workspace — active 2026-09-22

- page: `version2` — `2237:7614`
- cloned from the full `MVP_전체_와이어프레임` page for PO direct visual editing
- contains the same 96 MVP screens plus existing page helper/label layers
- all cloned component/style/variable/prototype linkages were removed
- final version2 audit: Instances `0`, Components `0`, Style links `0`, Variable bindings `0`, Explicit modes `0`, Prototype reactions `0`, Flow starting points `0`
- canonical source page remains unchanged and authoritative until explicit PO promotion
- checkpoint: `docs/ux-decisions/2026-09-22-version2-detached-redesign-workspace.md`

The previous `98` count became `94` after the 2026-09-19 recommended-routine removal, then `95` after the PO-approved `07C_Workout_History` full history list was added on 2026-09-20. The current canonical count is now `96` after the PO-approved `08B1A_Profile_Photo_Crop` screen was added and focused-QA PASSed on 2026-09-22.

---

## Latest active checkpoints


### Active detached redesign workspace — 2026-09-22
- `docs/ux-decisions/2026-09-22-version2-detached-redesign-workspace.md`
- current PO direct-edit Figma page: `version2` — `2237:7614`
- full canonical MVP page was cloned; all clone-side component/style/variable/prototype linkages were removed
- `version2` is **not canonical** and must not update implementation contracts until explicit PO promotion
- canonical `MVP_전체_와이어프레임` remains 96 screens and unchanged
- Development remains paused; DEV-002 Issue #6 must not execute


### Active redesign checkpoint — 2026-09-22
- `docs/ux-decisions/2026-09-22-routine-main-replaces-home-redesign-checkpoint.md`
- PO decision: standalone Home is no longer the intended default/main entry; Routine becomes the default/main entry for the active redesign
- active ideation Figma: `IDEA_Routine_Main_Jomo_01` — `2168:7614`
- current ideation state includes quick actions `루틴 없이 시작` / `새 루틴 만들기`, routine folders/groups, compact Jomo-like routine cards, and PO manual overrides recorded in the checkpoint
- this redesign is NOT yet promoted to canonical `MVP_전체_와이어프레임`; canonical independent-screen count remains 96 until promotion/remapping + focused QA
- historical Group 02 Home decisions remain provenance/reference and are superseded for current IA only where this active checkpoint explicitly says so
- Development remains paused; DEV-002 Issue #6 must not execute


### MVP design freeze / implementation handoff preparation
- latest Group 08 profile-photo amendment: `docs/ux-decisions/2026-09-22-profile-photo-crop-screen.md`
- `docs/ux-decisions/2026-09-20-mvp-screen-design-freeze.md`
- Group 06–07 sequential QA: `docs/ux-decisions/2026-09-20-group06-07-sequential-handoff-qa.md`
- Group 08 sequential QA: `docs/ux-decisions/2026-09-20-group08-sequential-handoff-qa.md`
- Android-only platform scope: `docs/ux-decisions/2026-09-20-android-only-platform-scope.md`
- current architecture checkpoint: `docs/ux-decisions/2026-09-20-platform-app-stack-architecture-gate.md`
- `docs/implementation/README.md`
- `docs/implementation/MVP_IMPLEMENTATION_HANDOFF.md`
- `docs/implementation/MVP_SCREEN_INVENTORY.md`
- `docs/implementation/MVP_SCREEN_BEHAVIOR_MATRIX.md`
- `docs/implementation/MVP_HANDOFF_QA.md`

### Current active asset-prep checkpoint
- `docs/ux-decisions/2026-09-18-exercise-thumbnail-production-crop-prep.md`
- current source-catalog supersession: `docs/ux-decisions/2026-09-20-gym-visual-source-catalog-supersession.md`

## Current exercise source catalog

PO-approved current direction:
- purchased Gym Visual / Gym Animations library is the source catalog
- old 195/211 target-count plan is superseded and historical only
- latest curated media inventory = FEMALE 3,011 video+thumbnail pairs / MALE 4,186 video+thumbnail pairs
- total source media pairs = 7,197
- source media count is not the final unique exercise count
- final canonical exercise count is derived by normalization of the purchased source pool
- Gym Visual auto-normalization v1 generated from the 7,197-pair inventory
- current filename-derived conservative exercise candidates = **5,854**
- exact normalized male/female 1:1 groups = **1,108**
- multi-variant exact groups = **76**
- duplicate/version review groups = **117** → **117 / 117 identity QA PASS**
- version-deduplicated identity candidates = **5,729** (5,854 → 5,729; 125 candidate identities merged)
- cross-gender near-match QA = **PASS**
  - high-confidence merge clusters = **73**
  - additional candidate identity reduction = **75**
  - held near-match resolution = **45 / 45 COMPLETE**
    - additional merges = **6**
    - keep separate = **39**
  - current working identities = **5,648**
- semantic normalization v6 = **GENERATED / MANUAL QA REMAINS**
  - current MVP resistance/strength candidates = **3,722**
  - excluded non-MVP = **1,476**
  - excluded added-weight bodyweight/apparatus = **8**
  - excluded reserved-recording UI = **17**
  - general semantic review = **274**
  - home/context review = **151**
  - Korean naming drafts = **1,096**
  - AUTO_DRAFT_COMPLETE = **1,047**
  - MANUAL_QA_REQUIRED = **3,100**
  - active MVP body/muscle conflict QA = **148 / 148 PASS**
  - recording prepass: reps **2,225** / weight_reps **1,641** / duration **158** / assisted_weight_reps **5** / unresolved **1,601**
  - Resistance Band / Rings / Suspension recording semantics = **LOCKED FOR MVP**
  - Bodyweight relevance audit = **COMPLETE / NON-DESTRUCTIVE**
    - Bodyweight active candidates audited = **1,588**
    - default-search candidates = **546**
    - extended variant review = **139**
    - home/context variant review = **71**
    - other/noise review = **832**
    - no catalog-status change or source deletion applied
- all source media/provenance is preserved; identity merges/exclusions do not delete alternate media
- raw purchased filename/path map is not committed to the public repo; only normalized derivative catalog data is committed
- current data checkpoints: `docs/exercise-db/2026-09-20-gym-visual-auto-normalization-v1.md`, `docs/exercise-db/2026-09-20-gym-visual-duplicate-version-qa.md`, `docs/exercise-db/2026-09-20-gym-visual-cross-gender-near-match-qa.md`, `docs/exercise-db/2026-09-21-gym-visual-held-near-match-resolution.md`, `docs/exercise-db/2026-09-21-gym-visual-semantic-normalization-v6.md`, `docs/exercise-db/2026-09-21-gym-visual-bodyweight-relevance-audit-v1.md`
- next data/media task = remaining semantic naming/metadata QA → app-facing catalog exposure decision using bodyweight relevance audit → final semantic row lock → default media selection → Cloudflare MP4 + in-app WebP manifest

### Current consolidated maintenance
- `docs/ux-decisions/2026-09-18-mvp-figma-maintenance-checkpoint.md`
- previous baseline: `docs/ux-decisions/2026-09-17-mvp-component-binding-settings-maintenance-checkpoint.md`

### Light color system / MVP rollout
- `docs/ux-decisions/2026-09-17-light-color-system-po-approval.md`
- `docs/ux-decisions/2026-09-17-light-color-system-session-handoff.md`
- `docs/ux-decisions/2026-09-17-mvp-light-theme-rollout-preview.md`
- `docs/ux-decisions/2026-09-17-mvp-light-theme-color-acceptance.md`

### Shared design-system maintenance
- `docs/ux-decisions/2026-09-20-bottom-app-bar-light-component-foundation.md`
- `docs/ux-decisions/2026-09-20-bottom-app-bar-root-placement.md`
- `docs/ux-decisions/2026-09-17-shared-tabs-consolidation-checkpoint.md`
- `docs/ux-decisions/2026-09-17-shared-tabs-option-list-maintenance.md`
- `docs/ux-decisions/2026-09-17-light-radius-exploration-checkpoint.md`

### Historical group closures / current product-policy references
- Group 00–01 first-run closure: `docs/ux-decisions/2026-09-20-group00-01-first-run-closure.md`
- Group 03 final closure: `docs/ux-decisions/2026-09-20-group03-routine-final-closure.md`
- AppLogo primary color update: `docs/ux-decisions/2026-09-19-app-logo-primary-color.md`
- Cross-group dialog copy simplification: `docs/ux-decisions/2026-09-19-dialog-copy-simplification.md`
- Group 02 Home component/binding maintenance: `docs/ux-decisions/2026-09-19-group02-home-component-binding-maintenance.md`
- Group 02 compact Home direction: `docs/ux-decisions/2026-09-18-group02-home-routine-selected-compact-direction.md`
- Recommended-routine feature removal / Group 03 Routine simplification: `docs/ux-decisions/2026-09-19-recommended-routine-feature-removal.md`
- Group 03 routine-name amendment: `docs/ux-decisions/2026-09-18-group03-routine-name-auto-default-policy.md`
- Group 04: `docs/ux-decisions/2026-09-15-group04-final-closure-qa.md`
- Group 04 custom-exercise field policy: `docs/ux-decisions/2026-09-15-group04-custom-exercise-selection-flow.md` — amended 2026-09-18
- Group 04 custom-exercise save action/destination: `docs/ux-decisions/2026-09-15-group04-custom-exercise-save-destination.md` — amended 2026-09-18 / Figma reflected
- Group 05 current sequential QA: `docs/ux-decisions/2026-09-20-group05-active-workout-sequential-qa.md`
- Group 05 prior closure: `docs/ux-decisions/2026-09-16-group05-manual-timer-final-closure-qa.md`
- Group 06: `docs/ux-decisions/2026-09-16-group06-final-closure-qa.md`
- Group 07: `docs/ux-decisions/2026-09-16-group07-final-closure-qa.md`
- Group 07 policy: `docs/ux-decisions/2026-09-14-group07-final-policy-lock.md`
- Group 07 body-map Production visual asset application: `docs/ux-decisions/2026-09-18-analysis-bodymap-production-visual-asset-application.md`
- Group 07 prior body-map asset defer baseline: `docs/ux-decisions/2026-09-15-analysis-bodymap-asset-mapping-deferred.md`
- Group 08 historical closure: `docs/ux-decisions/2026-09-16-group08-final-closure-qa.md`

The 2026-09-17 consolidated maintenance checkpoint supersedes older closure documents only where it explicitly records a later PO-approved amendment.

---

# CURRENT DESIGN-SYSTEM STATE

## Light baseline — accepted

Current approved Light values relevant to the live MVP:
- Primary / Brand `#218F8A`
- Primary Action / CTA `#1A7E79`
- Primary Soft `#DCEFED`
- Canvas `#F6F7F7`
- Surface `#FFFFFF`
- Subtle Surface `#EFF2F2`
- Border / Subtle `#EAEEED`
- Border / Default Control `#E7EBEA`
- Border / Strong CTA `#D7DCDA`
- Text Primary `#242927`
- Text Secondary `#626866`
- Text Tertiary `#929A98`
- Success `#4F8A61`
- Danger `#C85A64`

Latest amendments:
- Light `text/primary`: `#242927`
- Light `border/default`: `#E7EBEA`
- Secondary CTA outline contrast: semantic `border/strong` = Light `#D7DCDA`, Dark `#343635`; `CTA Button / Secondary` Default + Pressed use `border/strong`, Disabled remains `border/default`
- other previously accepted Dark token values remain unchanged.

Surface rule remains:
- content/grouped cards: no outer border + subtle `0 2px 8px` shadow at ~5%
- controls may retain semantic default border
- standard D surfaces use no background blur
- Workout LiveBar keeps its accepted local light treatment

## Shared Tabs

Page-level Exercise Detail / Analysis period tabs reuse shared `Tabs`:
- full width `360 × 54`
- equal-width items
- selected label `brand/primary`
- active bottom underline `2px brand/primary`

## Selection indicator rule

- immediate/applied selection → shared `OptionItem` + right check
- pending selection committed by explicit confirmation CTA → RadioButton

Group 05 replacement-exercise flow remains the intentional RadioButton exception.

## Grouped-card / list divider rule

Current approved rule:
- row content may retain its normal horizontal inset
- row divider spans the full grouped-card/list container width
- standard 320px cards/lists therefore use a 320px divider
- no divider after the final row

This is applied through shared components where available, including `SettingCard` and `PageOptionList`.

## Radius boundary

The size-aware radius exploration remains **preview-only**.

Do not propagate the radius experiment across the MVP or shared component system until the Product Owner explicitly approves it.

---

# COMPONENT / BINDING MAINTENANCE STATUS

The corrected component QA standard is:

`repeated UI → Common_Component master → production Instance → nested shared UI remains linked → variable/type/style bindings preserved`

Latest maintenance result:
- App shell: local `BottomAppBar` component set `2078:2401`; Light bindings + 4 IA variants + seven approved root-screen placements QA PASS; non-root BottomAppBar count = 0
- Group 01: no additional repeated-UI component gap found
- Group 02 Home: remaining local Home cards componentized; shared `HomeQuickAction` + `HomeRoutineTile` added, existing `HomeRoutineFocusCard` / `HomeStartChoiceCard` reused and rebound
- Group 03: repeated routine-name / attachment-overlay / bottom-CTA patterns componentized
- Group 04: custom-exercise/search/attachment/history/growth/selection/footer repeated patterns componentized
- Group 05: workout attachment overlay reuse + replacement footer + timer quick-adjust shared patterns
- Group 06: completion header/summary/footer/status/PR/session-summary shared structure
- Group 07: workout session/summary/body-distribution/body-area-detail shared patterns
- Group 08: settings rows/cards, option lists, headers, and screen-content patterns consolidated into shared components

Latest whole-MVP linkage verification:
- `1,844 / 1,844` instances resolve to a main component
- all current MVP component sources resolve through `Common_Component`
- detached/missing main-component instances: `0`

---

# LATEST CROSS-GROUP VISUAL MAINTENANCE — 2026-09-18

Approved and reflected in canonical Figma:
- final `00_Splash` added: `360 × 780`, `brand/primary` background, centered white Tampin wordmark `139 × 28`, no loading indicator/copy
- rejected Light/Dark splash exploration candidates removed
- shared `AppLogo` remains `139 × 28`; default artwork now renders with existing `brand/primary` (`#218F8A`) through the existing wordmark mask
- current live default AppLogo instances: Login + Home states (4 total)
- Splash remains the explicit exception and keeps its separate white Tampin wordmark
- `02A` `StartChoiceSection` local wrapper uses `Clip content = OFF` so card shadows are not cut; actual Home scroll viewport clipping remains unchanged
- PO-supplied `Common_Component > thumbs` contains 3 real thumbnail source samples
- current exercise-thumbnail visual preview is applied to `93` instances across `19` screens
- shared exercise thumbnails use `1px INSIDE border/subtle` to separate very-light imagery from white/light surfaces
- current thumbnail image assignment is a visual preview only; exact Production exercise-to-media mapping remains deferred
- Production thumbnail crop/framing prep began with Adobe MCP sample work; generated crop output was valid, but saving generated outputs back into the target Creative Cloud folder repeatedly failed with HTTP `500`
- that Adobe cloud-save problem is no longer the production blocker: a local Photoshop UXP auto-crop route is now technically validated
- the decisive Photoshop script fix was top-level Global Await (`await main();`) so folder/file operations remain alive after the picker returns
- current local crop baseline: `512 × 512`, detected non-white athlete/equipment bounds, target content span about `400px`, per-image square crop, originals preserved
- 5-image real crop test: PASS / PO feedback positive enough to expand testing
- 50-image logged batch: execution confirmed working
- prepared overnight candidate: `tools/photoshop/tampin_auto_crop_v05_overnight.psjs`
- overnight safeguards: 100 images per batch, 60s pause, checkpoint logging, existing-output skip/resume, per-file failure continuation
- full ~3,000-image overnight run and post-run visual exception QA are still pending; Production crop convention is not yet fully locked
- canonical prep record: `docs/ux-decisions/2026-09-18-exercise-thumbnail-production-crop-prep.md`
- focused read-back: `93 / 93` thumbnails have the subtle outline; old placeholder remains in current exercise-thumbnail instances = `0`
- latest whole-MVP linkage: `1,855 / 1,855` instances resolve; missing main-component links = `0`; non-`Common_Component` sources = `0`

Canonical record:
- `docs/ux-decisions/2026-09-18-mvp-figma-maintenance-checkpoint.md`

---

# CROSS-GROUP DIALOG COPY — 2026-09-19

The Product Owner approved a copy simplification pass across all live MVP dialogs.

Scope:
- copy only: title / body / button labels
- behavior, branching, component structure, and action order unchanged
- live `DialogCard` count = `18`
- system-like wording reduced where possible
- active-workout dialogs shortened for faster scanning
- destructive actions use explicit action labels

Focused Figma QA:
- text overflow = `0`
- button-label overflow = `0`
- visible dialog text font family = SUIT
- missing main-component links inside dialog structures = `0`
- representative long-copy visual QA PASS

Canonical record:
- `docs/ux-decisions/2026-09-19-dialog-copy-simplification.md`

---

# GROUP 02 — HOME TARGETED REFINEMENT

The Product Owner explicitly reopened only the Home start/access presentation around blank workouts and the routine-selected Home state.

## 02A no-routine state — approved

Current locked 02A primary actions:
- `빈 운동 시작`
- `내 루틴 만들기`

The previous `추천 루틴 받기` Home action is removed.

`빈 운동 시작`:
- starts an active workout without a saved routine
- begins with zero exercises
- uses the existing exercise-add flow during the session
- does not automatically create a saved routine

`추천 루틴` 기능 자체는 2026-09-19 PO 결정으로 현재 MVP에서 제거되었다. Home과 Routine 영역 모두 추천 루틴 진입점을 두지 않는다.

Decision:
- `docs/ux-decisions/2026-09-18-group02-home-blank-workout-entry.md`

Figma reflected:
- `02A_Home_NoRoutine` `1346:686`
- shared `HomeStartChoiceCard / Type=BlankWorkout` `1719:1042`
- Home scroll top padding / section rhythm aligned to `24px`
- one-off start prompt replaced by shared `SectionHeader / Trailing=None` with title `빠른 시작`
- existing `StartChoiceCard / BlankWorkout` and `BuildOwn` masters are now `320 × 80`
- both use the approved Home quick-action language: `36 × 36` `brand/soft` circle + `action/primary` `chevron-right`
- current card copy: `빈 운동 / 루틴 없이 바로 기록`, `내 루틴 만들기 / 운동과 세트를 직접 구성`
- Home recent-workout section removed by PO decision

## 02B with-routine state — simplified Home structure approved / canonical reflected

Canonical screen:
- `02B_Home_WithRoutine` — `1329:593`

Approved direction:
- Quick Start is intentionally identical to 02A
- Quick Start cards = `빈 운동` + `내 루틴 만들기`
- no saved routine is promoted into Quick Start
- no weekday / today-next / hidden selected-routine semantics
- both Quick Start cards use the approved `36 × 36` circular action with existing `Common_Component` `chevron-right`
- action treatment = `brand/soft` circle + `action/primary` chevron
- Quick Start shared `SectionHeader` uses `Trailing=None`
- `내 루틴` section is persistent: header copy = `내 루틴 (n)` using current saved-routine count; 02A = `내 루틴 (0)` + full-width empty card, 02B = compact 2 × n grid; My Routine header = `Trailing=None`
- `내 루틴` uses a `2 × n` grid when routines exist
- grid width = `320`, gap = `8px`
- current routine tiles = `156 × 88`
- current examples: `Pull Day`, `Leg Day`
- routine tile content = routine name + workout count/time
- right-side chevrons are intentionally omitted from My Routine tiles
- custom plus/chevron header overlays are not used
- 02A zero-routine body = `MyRoutineEmptyCard` `320 × 164`
- 02A empty card reuses existing `EmptyState / Action=Compact`
- copy = `아직 루틴이 없어요` / `자주 하는 운동을 루틴으로 만들어보세요`
- CTA = `루틴 만들기` → routine create
- card uses existing Home card surface/radius/shadow treatment

Canonical promotion / cleanup:
- approved B-grid direction promoted into existing canonical `1329:593`
- all temporary 02B Home exploration frames deleted after promotion
- only one top-level `02B_Home*` frame remains

Focused QA:
- canonical viewport `360 × 780`
- My Routine section `320 × 124`
- two current tiles `156 × 88`
- My Routine tile chevrons = `0`
- visible text overflow = `0`
- visible text font family = SUIT
- missing main-component links inside canonical 02B = `0`
- focused QA PASS

Decision / exploration history:
- `docs/ux-decisions/2026-09-18-group02-home-routine-selected-compact-direction.md`

Do not begin Cursor implementation.

## 02D active Home state — compact direction aligned / canonical reflected

Canonical screen:
- `02D_Home_Active` — `1346:710`

Current reflected direction:
- Home scroll top padding / section rhythm aligned to `24px`
- shared `SectionHeader / Trailing=None` remains `진행 중인 운동`
- existing shared `RoutineFocusCard / State=Active` master `1719:1036` is compacted from the prior 198px hero to `320 × 80`
- old target-muscle tag row removed from the Active Home card
- old large `운동 계속하기` CTA removed from the Active Home card
- card now uses routine title + active progress meta + the approved `36 × 36` soft circular chevron action
- title/meta typography matches the approved 02B quick-start card
- Home recent-workout section removed by PO decision

Shared Home-state QA:
- 02A StartChoice cards = `320 × 80` × 2
- 02D Active card = `320 × 80`
- 02A / 02D visible text overflow = `0`
- visible text font family = SUIT
- missing main-component links = `0`
- whole-MVP instances after this maintenance = `1,855 / 1,855`
- whole-MVP instance sources outside `Common_Component` = `0`
- focused QA PASS

Decision / canonical records:
- `docs/ux-decisions/2026-09-18-group02-home-routine-selected-compact-direction.md`
- `docs/ux-decisions/2026-09-19-group02-home-component-binding-maintenance.md`

Home component/binding state:
- shared `HomeQuickAction` — `2038:1951`
- shared `HomeRoutineTile` — `2039:1953`
- `HomeRoutineFocusCard / Ready / Active` = `320 × 80`
- `HomeStartChoiceCard / BlankWorkout / BuildOwn` = `320 × 80`
- 02B BlankWorkout / BuildOwn / Pull Day / Leg Day cards are all Common_Component instances
- repeated manual Home-card frame count in canonical 02B = `0`
- `HomeRoutineTile` exposes `RoutineName / RoutineMeta` TEXT properties
- Home scroll / section / grid spacing values are bound to existing spacing tokens
- no new spacing/radius/color variables were created
- latest focused component/binding QA PASS

Screen-freeze interpretation:
- no additional zero-exercise top-level Figma frame is required
- `빈 운동` reuses the approved Group 05 Active Workout shell with an empty ExerciseList and existing `운동 추가` flow
- implementation contract: `docs/ux-decisions/2026-09-20-mvp-screen-design-freeze.md`

---

# GROUP 03 — ROUTINE CLOSED / RECOMMENDED ROUTINES REMOVED / ROUTINE-NAME POLICY AMENDED

Group 03 remains Product/UX closed after the explicit 2026-09-19 recommended-routine removal and the 2026-09-18 routine-name amendment.

Current Routine scope:
- user-created saved routines only
- `03A_Routine_List` — `34:1401` — no My/Recommended tabs
- `03B_Routine_Empty` — `34:1438` — no tabs / no recommendation preview
- `03A_Routine_List_Recommended` removed
- `03C_추천루틴상세` removed
- recommendation questionnaire / matching / acceptance / save flows are not part of the current MVP

Superseding decision:
- `docs/ux-decisions/2026-09-19-recommended-routine-feature-removal.md`


Current locked routine-name rule:
- user-entered routine name is optional
- blank name does not block save by itself
- when the routine otherwise satisfies existing save-validity rules, blank name is saved as `나의 루틴 YYMMDD`
- additional automatically named routines on the same local date use `(2)`, `(3)` ... suffixes
- user-entered names are preserved
- auto-generated names can be edited later and are not regenerated by later exercise edits

Decision:
- `docs/ux-decisions/2026-09-18-group03-routine-name-auto-default-policy.md`

Post-closure component maintenance is recorded in the latest 2026-09-17 consolidated maintenance checkpoint.

Screen-freeze interpretation:
- no extra 03E/03E2 top-level Figma state is required solely to prove optional naming
- current 03E Save Disabled state represents an otherwise-invalid empty routine, not a name requirement
- once other save-validity requirements are met, blank name is allowed and receives the approved automatic name at first save

Do not reopen unrelated Group 03 behavior without a concrete conflict/regression or explicit PO request.

---

# GROUP 04 — EXERCISE LIBRARY / DETAIL CLOSED

Group 04 remains Product/UX closed.

Current locked direction remains:
- exercise search/detail/custom-exercise flows closed except explicit 2026-09-18 custom-create required-field amendment
- shared full-width Tabs
- immediate selection lists use `OptionItem` + check
- recording/attachment policies unchanged

Custom exercise create required-field policy:
- required: `운동명`, `주 타겟 근육`, `기록 방식`
- optional: `장비`, `보조 타겟 근육`
- optional fields do not block Save
- `주 타겟 근육` remains required for analysis/filter attribution
- decision authority: `docs/ux-decisions/2026-09-15-group04-custom-exercise-selection-flow.md` (2026-09-18 amendment)

Custom exercise save-action policy:
- primary save commit is the bottom Primary CTA `저장`
- Create header right = none
- Edit header right = Trash
- Edit base states keep Save Disabled until a valid change exists
- old header Save and bottom `운동 삭제 / 확인` DualCTA are not used
- shared Figma `CustomExerciseSaveFooter` uses `State=Default / Disabled`
- decision authority: `docs/ux-decisions/2026-09-15-group04-custom-exercise-save-destination.md` (2026-09-18 amendment / Figma reflected)

Custom exercise history-lock presentation:
- completed history exists → `기록 방식` is `ValueOnly` read-only
- do not open selector and do not show a Toast on tap
- persistently show neutral inline hint: `기록이 있는 운동은 기록 방식을 변경할 수 없어요.`
- shared `icon/hint` now has `State=Error / Info`; existing Group 01 validation remains Error
- shared `InlineHint` component is used in `04F_Custom_Edit_HistoryLocked`
- decision authority: `docs/ux-decisions/2026-09-15-group04-custom-exercise-selection-flow.md` (2026-09-18 amendment / Figma reflected)

Deferred data/runtime work remains:
- final Production Exercise DB normalization/deduplication from purchased Gym Animations source
- exact Production attachment allowlists / canonical attachment IDs/names / media mapping
- Cursor implementation only after explicit handoff

Do not reopen QA-passed behavior without a concrete conflict/regression or explicit PO request.

---

# GROUP 05 — ACTIVE WORKOUT CLOSED

Locked:
- WorkoutLiveBar / pinned content scroll
- automatic RestLiveBar
- separate Manual Timer popup
- end/discard/update flow
- replacement-exercise selection remains RadioButton + explicit `선택 완료`
- shared Common_Component structure

Post-closure component/binding maintenance is recorded in the latest consolidated checkpoint.

2026-09-18 targeted visual maintenance:
- shared `ExerciseReplaceItem` uses standalone-card surface: white surface / no outer stroke / 12px radius / subtle 0 2px 8px shadow
- `05H_Exercise_Replace_Selected` reflects the card treatment; shared inheritance also aligns 05G / 05G2
- Secondary CTA Default/Pressed outline uses `border/strong`; Disabled remains `border/default`
- shared `ActionRows` background uses `bg/surface` instead of `bg/default`; existing outer border and vertical Divider styling are preserved
- `05I_Workout_Menu` representative QA PASS

**GROUP 05 CLOSED.**

---

# GROUP 06 — WORKOUT COMPLETION CLOSED / VISUAL AMENDMENTS APPLIED

Core completion flow remains closed.

Current Figma amendments recorded 2026-09-17:
- shared `CompletionHeader / CompletionSummary / CompletionFooter`
- shared `CompletionPRStatusIcon`
- plain shared `07D/PersonalRecordCard` treatment with standalone trophy/status visual in the completion header area
- current Default / PR-none / Volume-N/A completion states remain linked to the shared completion structure

2026-09-19 recommended-routine removal amendment:
- `FINAL_06_RECOMMENDED_ROUTINE_DIALOGS` removed
- `FINAL_06_RECOMMENDED_ROUTINE_MODIFIED_SAVE_DIALOG` removed
- generic shared `DialogCard / DialogButtons` remain because they are not recommendation-specific
- normal workout-completion behavior remains unchanged

Decision:
- `docs/ux-decisions/2026-09-19-recommended-routine-feature-removal.md`

Do not reopen completion behavior without a concrete conflict/regression or explicit PO request.

---

# GROUP 07 — ANALYSIS / WORKOUT HISTORY CLOSED

Group 07 remains Product/UX closed.

Latest design-system maintenance:
- Analysis recent-change / recent-workout grouped-card dividers span full card width
- Body Area contributor-list dividers span full card width
- Workout History performed-exercise table dividers span full card width
- `07D_Workout_History_Detail_DeleteConfirm` is normalized to a standard `360 × 780` full-screen dialog overlay state
- shared component/binding cleanup is recorded in the current consolidated checkpoint

PO-prepared Production front/back body-map visual assets are now applied through the existing shared Group 07 components.

Current reflected Figma:
- source: `Common_Component > bodymap` — `1979:11119`
- `BodyDistributionCard / Context=Analysis` BodyMapPreview — `1868:8169`
- `BodyDistributionCard / Context=Session` BodyMapPreview — `1868:8241`
- `BodyAreaDetailCard / State=Data` BodyMapPreview — `1868:8398`
- neutral front/back base layers added; all existing muscle layers now use the PO-prepared source images
- existing visibility/opacity semantics are preserved
- focused master/instance read-back QA PASS

Canonical record:
- `docs/ux-decisions/2026-09-18-analysis-bodymap-production-visual-asset-application.md`

This resolves the prior missing-production-asset Figma deferral. Runtime binding/implementation remains outside the current Design/Figma mode.

**GROUP 07 CLOSED.**

---

# GROUP 08 — SETTINGS / ACCOUNT CLOSED / MVP SCOPE AMENDED

The historical Group 08 closure remains valid except where superseded by the explicit 2026-09-17 amendment below.

## FAQ removed from MVP

By explicit PO decision:
- `08F_FAQ` removed
- `08F1_FAQ_Expanded` removed
- Settings Home `자주 묻는 질문` row removed

Current Group 08 live screen count: `18`.

FAQ is not part of the current MVP scope.

## Settings Home grouping

Current approved grouping:

**내 정보**
- 프로필
- 구독 관리

**설정**
- 운동 설정
- 단위 설정
- 알림
- 언어

**정보**
- 이용약관
- 개인정보처리방침
- 버전
- 문의하기

`구독 관리` remains a future-facing stub with `준비 중인 기능이에요.` feedback and no management destination screen.

## Profile logout

`08B_Profile` current rule:
- no grouped account card for Logout
- `로그아웃` is a plain centered text action
- it sits directly above the Save CTA
- gap to Save CTA: `16px`
- implementation is in shared `ProfileContent`

## Settings lists

- `SettingCard` row content keeps its inset while row dividers span full 320px card width
- `PageOptionList` `Items=2/3` uses full 320px between-row dividers with no trailing divider
- `08D2_Timer_End_Sound` and `08H_Language_Settings` remain immediate-selection `OptionItem` + check screens

## Default rest-time wheel picker

`08D1_Default_Rest_Time_Sheet` current approved picker presentation:
- shared `WheelPicker/SingleColumn` uses `bg/default`
- radius = 12 using the existing radius token
- width/height remain `320 × 200`
- existing wheel rows and selected-row guide lines remain unchanged
- no additional stroke or shadow
- treatment aligns the picker with the internal-box hierarchy used by other Group 08 bottom sheets
- focused read-back QA PASS

Shared nodes:
- `WheelPicker/SingleColumn` `1169:1105`
- `WheelPicker_RestTime` `1170:697`
- `08D1_Default_Rest_Time_Sheet` `1163:676`

## Support inquiry attachment remove affordance

`08G_Support_Inquiry` current approved attached-image presentation:
- shared `AttachmentSlot / Filled` includes a circular remove badge overlapping the slot top-right
- badge: `20 × 20`, position `x=56 / y=-2`
- badge fill = `neutral/900`
- badge outline = 1px `neutral/100`
- existing subtle shadow + `radius/full` retained
- PO-provided `close 1` SVG glyph is used at `6 × 6`, centered in the badge
- Filled slot and parent `AttachmentSlots` allow overflow so the badge is not clipped
- representative 08G state shows slot 1 Filled and slots 2–3 Empty
- focused screenshot/read-back QA PASS

Shared nodes:
- `AttachmentSlot` set `1255:1161`
- Filled `1255:1150`
- `RemoveBadge` `1928:8903`
- `SupportInquiryContent` `1882:9310`

## Profile photo crop — PO approved 2026-09-22

- `08B1_Profile_Photo_Sheet`의 사진 선택 → `08B1A_Profile_Photo_Crop`
- crop target = fixed `1:1` square
- selected photo can be repositioned and pinch-zoomed
- Back cancels the current crop/edit
- Save applies the crop and returns to the profile-photo/profile flow
- persisted/uploaded profile-photo output is square; circular avatar is presentation-only masking
- rotation / filters / general photo retouching are outside the current MVP
- canonical Figma node = `2144:8195`
- focused Figma QA = PASS

Canonical:
- `docs/ux-decisions/2026-09-22-profile-photo-crop-screen.md`

## Existing Group 08 behavior retained

Unchanged:
- profile photo / nickname / provider presentation
- account deletion/destructive flow
- unit settings
- workout settings
- notification scope
- support inquiry category / submit / failure behavior outside the approved attachment-remove visual amendment
- Terms / Privacy external-document entry behavior
- language supports `한국어 / English` and applies immediately
- theme remains hidden for MVP

Release follow-ups that are not Figma blockers:
- actual public Terms / Privacy URLs
- exact inquiry record/image retention period and disclosure
- external account-deletion request URL
- final timer sound assets / labels

**GROUP 08 CLOSED.**

---

# NEXT OPEN ITEM

**Sequential handoff QA proceeds one block at a time. Do not advance beyond the current block without Product Owner approval.**

Completed:
- Group 00–01 Splash / Authentication / First Run — PASS
- Group 02 Home — PASS
- Group 03 Routine — PASS
- Group 04 Exercise Library / Custom Exercise — PASS

## Closed Group 04 revalidation

Baseline:
- `docs/ux-decisions/2026-09-15-group04-final-closure-qa.md`
- later 2026-09-18 custom-exercise field/save/history-lock amendments remain authoritative

Current verification:
- canonical Group 04 frames = `29 / 29`
- Group 04 instance links checked = `544`
- missing main-component links = `0`
- Group 04 sources outside `Common_Component` = `0`
- no dependency on the Group 03 shared `ExerciseCard` modified in the prior block
- custom Create/Edit/HistoryLocked/selector/delete contracts remain aligned
- exactly four active recording types exposed in custom recording-type selection
- no new Group 04 Product/UX blocker found

## Closed Group 05 sequential revalidation

Current verification:
- canonical Group 05 top-level frames = `18`
- behavior-matrix Group 05 entries = `18`
- Figma ↔ matrix names = `18 / 18` exact match
- no Group 05 screen omission found
- Rest Timer overlap/restart behavior locked
- app-owned timer-end sound source locked
- duration Active Workout interaction locked
- ongoing Active Workout system notification/activity UX locked
- Rest Timer zero system alert locked
- remaining Group 05 Product/UX blocker = `0`

Verdict: **PASS — Group 05 Active Workout sequential handoff QA closed.**

## Closed Group 06–07 sequential revalidation

Current verification:
- Group 06 Figma ↔ behavior matrix = `3 / 3` exact match
- Group 07 Figma ↔ behavior matrix = `6 / 6` exact match
- `07C_Workout_History` created at `2121:8457`, `360 × 780`
- 07A `전체 기록` → 07C full saved-workout history list
- 07C rows → matching 07D saved-session detail
- completed + saved-partial sessions with persisted work are included; discard/no-work sessions excluded
- partial sample visibly distinguished as `하체 B · 부분 기록`
- `최근 기록 변화` = latest completed performance vs immediately previous comparable performance; improved only; newest first; max 3; recording-type-native comparison
- 07C instance links = `29`, missing main-component links = `0`
- whole-MVP top-level frames at the 2026-09-20 Group 06–07 closure = `95` (current canonical = `96` after the 2026-09-22 Group 08 profile-photo crop amendment)
- whole-MVP instances at that closure = `1,849`
- whole-MVP missing main-component links = `0`
- whole-MVP instance sources outside `Common_Component` = `0`

Verdict: **PASS — Group 06–07 Completion / History / Analysis sequential handoff QA closed.**

Product Owner approved continuing to Group 08 on 2026-09-20.

## Closed Group 08 sequential revalidation

Current verification:
- Figma Group 08 frames = `18`
- behavior-matrix Group 08 rows = `18`
- Figma ↔ matrix names = `18 / 18`
- app-owned timer-end sound policy aligned with `기본 / 차임 / 벨`
- `08E_Notification_Settings > 휴식 타이머 알림` aligned with the approved Rest Timer zero system alert
- PO decision: remove app-level `타이머 종료 진동` setting
- shared `WorkoutSettingsContent` now keeps only `기본 휴식 시간 / 타이머 종료음` under Rest Timer
- Rest Timer vibration follows platform/user notification/device settings
- `08D_Workout_Settings` and `08D1_Default_Rest_Time_Sheet` focused Figma QA PASS
- `08B1A_Profile_Photo_Crop` = PO approved / focused Figma QA PASS
- Group 08 current instance links = `244`
- Group 08 missing main-component links = `0`
- Group 08 sources outside `Common_Component` = `0`
- whole-MVP current instance links = `1,844`
- whole-MVP missing main-component links = `0`
- whole-MVP sources outside `Common_Component` = `0`

Verdict: **PASS — Group 08 Settings / Account / Support sequential handoff QA closed.**

**STOP. Sequential Product/UX screen QA is complete. Do not begin architecture/development work until Product Owner explicitly approves the next phase.**

## Current architecture gate

Locked:
- current product/platform scope = Android only
- Android runtime/device QA and production release
- React Native + Expo + TypeScript
- Expo Development Builds for production development
- no current iOS compatibility / iPhone QA / App Store / Live Activity requirement

Locked:
- active workout / workout edits are local-first
- local save is authoritative for immediate workout interaction
- weak/offline network must not block recording
- server synchronization happens afterward under a separate sync policy
- sync failure must not roll back locally saved workout data

Locked:
- local database = SQLite via `expo-sqlite`
- SQLite is durable local application storage, not a temporary cache
- active-session recovery reads from SQLite
- large media binaries stay outside SQLite

Locked:
- backend provider = Supabase
- canonical server database = Supabase Postgres
- local SQLite remains the immediate source of truth for workout interaction

Locked:
- authentication = Supabase Auth
- current MVP providers = Google + Kakao
- auth/session secrets use secure platform storage, not plain SQLite

Locked:
- media/profile-image storage = Supabase Storage
- profile photos and support inquiry attachments use Supabase Storage
- SQLite keeps local/remote references and upload state rather than large binaries
- user-owned media is private/scoped by default

Locked:
- synchronization policy = durable outbox / dirty-state model
- no per-keystroke or per-set remote request
- active-workout changes coalesce; while dirty/foreground remote attempts are capped around once per 5 minutes
- workout completion and explicit low-frequency Save actions trigger immediate best-effort sync
- app resume / connectivity restoration trigger pending sync
- failed sync uses exponential backoff with jitter and never rolls back SQLite
- stable IDs + idempotent mutation IDs prevent duplicate retries
- optimistic server versions detect conflicts
- active workout has a single write-owner device until completion/discard
- media uploads are independent from core workout-data sync

Canonical:
- `docs/ux-decisions/2026-09-20-local-first-sync-policy.md`

Locked:
- workout elapsed time continues across device reboot
- powered-off/reboot time is included
- restore uses the persisted absolute workout start timestamp

Locked:
- Android reboot restores the ongoing workout notification for an unfinished Active Workout
- tapping the restored notification resumes the same persisted session
- the notification is reconstructed after boot from SQLite; it does not literally survive reboot
- elapsed workout time continues through reboot using the persisted absolute start timestamp

Locked:
- dismissing the Android ongoing workout notification does not affect the Active Workout
- notification visibility is presentation-only; SQLite session state remains authoritative
- only explicit in-app end/discard actions terminate the workout

Locked:
- Android Rest Timer alert remains expected through screen-off, ordinary backgrounding, another foreground app, and recent-apps removal
- normal reboot restores a future rest deadline; a deadline already passed during downtime is not replayed as a stale late alert
- Android user Force stop is the explicit delivery exception until relaunch
- exact Rest Timer scheduling uses `SCHEDULE_EXACT_ALARM` when access is granted; do not use restricted `USE_EXACT_ALARM`
- exact-alarm access is requested contextually when precise Rest Timer delivery is first needed
- if access is denied/revoked, workout logging continues and alert timing falls back to best effort
- rest-alert delivery never owns or mutates the persisted workout state

Locked:
- Active Workout uses a normal Android ongoing notification
- current MVP does not use a Foreground Service solely to keep workout elapsed time/notification alive
- elapsed notification time uses Android's system chronometer/time display backed by the persisted absolute workout start timestamp
- React Native/JavaScript does not need to tick elapsed time every second in background
- SQLite remains authoritative; Rest Timer completion remains a separate exact-alarm concern
- future continuous sensor/location/health tracking requires a separate Foreground Service re-evaluation

Locked:
- Android 13+ `POST_NOTIFICATIONS` is requested contextually on the user's first Active Workout
- the Active Workout is persisted locally before the permission flow
- do not request notification permission at install/login/onboarding/Home
- use the existing Dialog pattern for a one-time rationale; denial/dismissal never blocks or rolls back the workout
- do not automatically re-prompt every workout
- `08E_Notification_Settings` respects Android system permission and can request/route to system settings when needed
- notification permission is independent from exact-alarm permission and may be revoked later

Canonical:
- `docs/ux-decisions/2026-09-20-android-notification-permission-policy.md`

Locked:
- current MVP notification categories = `운동 진행` + `휴식 타이머` only
- `운동 진행` uses LOW importance with no sound/vibration for ongoing status
- `휴식 타이머` uses a separate time-sensitive alert category
- updates/notices/marketing/promotional notifications are outside the current MVP; no production channel or speculative remote-push stack
- `08E_Notification_Settings` Product scope is now `휴식 타이머 알림` only
- previous `업데이트/공지` row is superseded; focused Figma row removal remains a visual-maintenance follow-up
- `휴식 타이머` channel does not own selectable app sounds; Tampin separately plays bundled `기본 / 차임 / 벨` at completion
- background/screen-off timer sound uses the smallest compliant native mechanism; add a short-lived Foreground Service only if Development Build/device QA proves it is required
- this does not change the no-continuous-Foreground-Service rule for the Active Workout
- changing timer sound does not recreate notification channels

Canonical:
- `docs/ux-decisions/2026-09-20-android-notification-channel-scope.md`

Canonical:
- `docs/ux-decisions/2026-09-20-android-rest-timer-sound-runtime.md`

Locked:
- crash/error reporting = Sentry
- Sentry is diagnostics only; product-usage analytics is a separate decision
- Session Replay is off
- local development reporting is off by default
- internal/preview vs production environments are separated
- matching source maps/release IDs are required
- sensitive/profile/workout-entered data is excluded; only minimal opaque diagnostic context is allowed
- Sentry failure never blocks app/workout/persistence/sync
- pre-release observability QA requires one intentional test error with readable stack information

Canonical:
- `docs/ux-decisions/2026-09-20-sentry-crash-error-reporting.md`

Locked:
- product-usage analytics = PostHog
- explicit named events only; no Session Replay, broad autocapture, form/input capture, or advertising attribution
- initial event taxonomy = 24 explicit events across onboarding/permissions, routine, workout, timer, analysis/history, custom exercise/support/account
- primary funnel = onboarding completed → workout started → first set completed → workout completed → later workout return/start
- do not send profile demographics, email/nickname, routine/exercise names, exact workout values, support content, secrets, or raw DB rows
- identity = opaque internal app user ID only; reset on logout/account change
- local development analytics off by default; preview vs production distinguishable
- analytics failure never blocks app/workout/persistence/sync

Canonical:
- `docs/ux-decisions/2026-09-20-posthog-product-analytics.md`

## Pre-release architecture re-audit — COMPLETE

Product Owner explicitly requested a full architecture re-audit before Android deployment / Google Play release-pipeline design.

Canonical checkpoint:
- `docs/checkpoints/2026-09-20-pre-release-architecture-reaudit.md`

Rules:
- proceed from the beginning, one block at a time
- compare with verified OnTalk release/QA history where relevant
- use current official platform evidence for time-sensitive Android/Google Play facts
- do not begin release-pipeline design until this re-audit is complete

Completed:
- Block 01 — Platform scope / Android only: **PASS**
- Block 02 — Application stack / React Native + Expo + TypeScript + narrow native Android boundary: **PASS**
- Block 03 — Local-first persistence scope / server-confirmed action boundary: **PASS**
- Block 04 — SQLite local database / migrations / transactions / account-scoped ownership: **PASS**
- Block 05 — Supabase Postgres / RLS / server correctness boundary: **PASS**
- Block 06 — Supabase Auth / Google + Kakao / secure session / auth-restore state: **PASS**
- Block 07 — Supabase Storage / private user media / canonical object reference: **PASS**
- Block 08 — Sync / conflict / multi-device / idempotent retry: **PASS**
- Block 09 — Active Workout Android runtime / process-death + reboot recovery boundary: **PASS**
- Block 10 — Notification permission / channels / exact alarm / Rest Timer sound: **PASS**
- Block 11 — Sentry crash/error reporting / privacy + source-map QA: **PASS**
- Block 12 — PostHog product analytics / 24-event explicit taxonomy: **PASS**
- Block 13 — Google Play submission source-data / Tampin Play profile readiness: **PASS**
- Block 14 — Android package / EAS Build / Play App Signing / artifact-lineage release pipeline: **PASS**

Re-audit result:
- **PASS — Blocks 01–14 complete**
- Android package name: `com.lumian.tampin`
- Canonical release pipeline: `docs/ux-decisions/2026-09-20-android-release-pipeline.md`

NEXT OPEN ITEM:
- Product Owner explicit Development-mode authorization before first scoped production implementation Issue

## Other already-known open decisions

- no architecture decision remains open from the 01–14 re-audit
- implementation-specific runtime details are validated during Development/Release QA

## Active non-blocking side tracks

- Production exercise-thumbnail full crop/mapping QA
- final app-owned timer-end sound assets/labels
- public Terms/Privacy URLs and inquiry-retention disclosure before release

## Development authorization

Do not begin production implementation yet.
After sequential Product/UX QA decisions and architecture gates are resolved, Product Owner must explicitly authorize development before the first scoped implementation Issue is created.

# Development boundary

Cursor-facing documents exist, but **production implementation is not authorized yet**.

Current handoff verdict:
- `READY FOR PO DEVELOPMENT AUTHORIZATION`

Before development:
- explicit Product Owner development authorization

After resolution, create the first scoped Issue and switch to Development mode.
