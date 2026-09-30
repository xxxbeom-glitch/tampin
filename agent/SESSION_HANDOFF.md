# Session Handoff

## Current state

- Current mode: **DEVELOPMENT ACTIVE** (Issue #6 / DEV-002 reactivated 2026-09-30) · **DESIGN / FIGMA redesign continues in parallel**
- DEV-001: PASS · merged to main
- DEV-002 Issue #6: Cursor implementation complete → **status:review**
- Branch: `cursor/dev-002-eas-android-smoke-368a`
- Latest commit: see DEV-002 section below
- Next Owner: ChatGPT

## DEV-002 — Issue #6 latest development handoff (2026-09-30)

Reactivation comment on Issue #6 is authoritative for DEV-002 execution scope.

In-scope completed:
- `eas.json` Android-only `development` profile (`developmentClient: true`, `distribution: internal`, `buildType: apk`)
- Unit test `__tests__/eas-development-profile.test.ts` (development profile presence only)
- `agent/TASK_CONTRACT.md` updated
- Logic verification PASS: typecheck / lint / test / `expo config --type public`

NOT VERIFIED (cloud agent blockers — per Reactivation instruction):
- EAS login (`eas whoami` → Not logged in; no EXPO_TOKEN)
- EAS project link + identity read-back
- Expo Doctor full PASS (19/21; pre-existing DEV-001 drift)
- Android Gradle assembleDebug (no ANDROID_HOME / SDK)
- Android device/emulator install+launch
- Bootstrap shell + UI Catalog runtime visual verification

PO follow-up to close NOT VERIFIED:
1. `eas login` locally (or provide EXPO_TOKEN)
2. `eas init` / link project; read back project ID
3. Local Android dev build smoke: bootstrap shell + Debug UI Catalog entry

Issue comment pending:
- GitHub integration could not post Issue #6 comment (`Resource not accessible by integration`).
- ChatGPT should paste Result/Test/Commit into Issue #6 and set review state.

## Active detached redesign workspace

- checkpoint: `docs/ux-decisions/2026-09-22-version2-detached-redesign-workspace.md`
- current PO direct-edit page: `version2` — `2237:7614`
- source canonical page: `MVP_전체_와이어프레임` — `34:1076`
- full source page was cloned: 104 top-level nodes / 96 MVP screen frames
- clone-side links removed: Instances 0 / Components 0 / Style links 0 / Variable bindings 0 / Explicit modes 0 / Prototype reactions 0 / Flow starting points 0
- version2 top-level FRAME count is 97 only because the former top-level `chevron-right` instance became a normal frame; MVP screen count remains 96
- original canonical source was re-read after the operation and remains 104 top-level nodes / 96 screen frames / 1,845 instances
- `version2` is not canonical; do not update inventory/behavior/implementation solely from PO exploration there

## Active redesign checkpoint

- `docs/ux-decisions/2026-09-22-routine-main-replaces-home-redesign-checkpoint.md`
- Figma ideation screens:
  - `IDEA_Routine_Main_Jomo_01` — `2168:7614`
  - `IDEA_Routine_Detail_Jomo_01` — `2229:7652`
- PO decision: remove standalone Home as the intended default/main entry and make Routine the default/main entry
- current ideation values must be read from Figma; PO manual overrides supersede prior assistant-entered numbers
- redesign is not yet promoted to canonical `MVP_전체_와이어프레임`; canonical screen count remains 96 until promotion/remapping + focused QA

## Current visual state to preserve

- no `바로 시작` section header
- quick actions: `루틴 없이 시작` / `새 루틴 만들기`
- quick-action cards: 320×72, vertical padding 14, transparent fill, 1px dashed #BBC0C9, radius 20, gray 36×36 plus action
- expanded `PPL Routine` + collapsed `3분할 루틴`
- folder header: SUIT Bold 14px / line-height 26 / #979DA9 / left chevron
- routine cards: 320×108, radius 20, white surface, 0/2/8 ~7% shadow, compact outlined time chip, muscle chips, no exercise-count text, no exercise-name preview row
- internal card-holder clipping remains OFF so shadows are not cut

## Routine detail ideation state to preserve

- routine-card tap direction now has an ideation companion screen: `IDEA_Routine_Detail_Jomo_01` — `2229:7652`
- composition follows the PO's `image 7` clarification: image-led hero upper area + concise lower information + strong bottom `운동 시작` CTA
- shared `Nav Header / LeftAction=Back, RightAction=Edit` — `360:2215` is reused; do not reintroduce custom back/edit controls
- root uses existing `Colors / Light` mode
- lower content reuses `Routine Summary` (`637:3524`), muscle `Tag` components, Compact Secondary Button (`636:828`), and Primary CTA (`635:794`)
- lower typography uses existing `heading/02` and `body/01`
- lower spacing bindings: section `24`, heading/content `8`, preview/button `16`, tag gap `6`; horizontal inset `20`
- current hero bitmap is only a temporary zoomed crop of the image-7 reference for layout validation; it is not a final/approved Tampin hero asset
- this detail screen remains ideation-only and has not replaced canonical `03D_Routine_Detail`

## Preserve

- DEV-001 Expo/RN/TS bootstrap
- Android package `com.lumian.tampin`
- current architecture decisions unless redesign creates a real conflict
- existing GitHub/Cursor collaboration loop

## Do not do now

- do not start canonical-screen implementation beyond the current scoped GitHub Issue
- do not assume historical Group 02 Home remains the final IA
- do not reset PO-adjusted Figma values to older assistant values
- do not update canonical screen count before redesign promotion/remapping QA
- do not re-bind or normalize PO's exploratory `version2` edits unless explicitly requested
- do not modify `MVP_전체_와이어프레임` as a side effect of version2 exploration

## Next

Development track:
- ChatGPT independent QA on branch `cursor/dev-002-eas-android-smoke-368a`
- If PO completes EAS login + local Android smoke, record supplemental evidence on Issue #6

Design/Figma track — resume from:
`PROJECT_INSTRUCTIONS.md → docs/CURRENT.md → docs/ux-decisions/2026-09-22-version2-detached-redesign-workspace.md → Figma version2 2237:7614 → NEXT OPEN ITEM`

Next design step:
1. continue from PO edits on detached `version2`
2. inspect/refine only the screens or patterns the PO asks to work on
3. preserve canonical `MVP_전체_와이어프레임` until explicit PO promotion approval
4. reconcile Home → Routine IA and other affected contracts only after the visual direction is sufficiently closed
5. promote approved affected scope to canonical Figma
6. run focused affected-scope QA
7. refresh implementation handoff for any promoted scope before dependent development Issues
