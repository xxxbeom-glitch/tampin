# Active Task Contract

## Task / Issue
- Issue #30 / DEV-014 — Figma parity audit and Group 04 exercise flow
- Branch: `cursor/dev-014-group04-figma-parity`
- Review: FIX 10 implementation (after RETRY 2 `3b7882e`)

## Goal
Implement the 10 FIX rows in `agent/FIGMA_RUNTIME_GAP_AUDIT_2026-09-30.md`
against current canonical Figma. Do not treat ACCEPT rows as done.

## Required
- Reconfirm then fix:
  1–2. 00/01 wordmark **139×28**
  3. 01A login error card Elevation/Card
  4. 01C disabled DOB whole-field opacity 0.3
  5–7. 02 plus / chevron / folder-chevron **16×16**
  8. bottom-tab original active/inactive asset colors (no runtime tint)
  9–10. 02A/02D card shadow vs current Figma Elevation/Card
- Record Figma blur ≠ RN `shadowRadius` platform mapping (do not equate)
- Reuse existing shared tokens/components and already-exported assets
- Character icons stay out of this FIX set; do not invent UI
- ACCEPT / unverified / unimplemented product links → separate backlog
- Canvas `#F6F7F7` vs Figma `#F7F8FA` stays unresolved (PO lock)
- No visual PASS without device/pixel evidence
- No device install
- typecheck, lint, related Jest; commit/push; no PR

## Allowed Scope
- Splash / Login / Basic Info / Routine Main / Routine Detail presentation
- `figmaAssets` + `assets/figma` for bottom-tab state rasters already in Figma
- Related tests, TASK_CONTRACT, audit/backlog/evidence

## Forbidden
- SQLite / real backend
- New global design-system tokens
- Canvas color change
- Implementing ACCEPT rows as if they were FIX
- Group 05+ / PR / merge / device install

## Figma refs
- File `W3lZurXCXbThP67rF2xk2b`
- `00_Splash` `1961:8909` · `TampinLogo_White` `1961:8910`
- `01A_Login` `40:2075` · `AppLogo` `43:3053`
- `01A1` DialogCard `1296:667`
- `01C4` InputBox `1314:708`
- `02A` `2483:8317` · plus / chevron / folder chevron / BottomAppBar `2078:2208`
- `02D` ExerciseCard `2333:7846`
- Elevation/Card: DROP_SHADOW offset (0,0) radius 8 spread 0 color `#0000000d`

## Verification
1. typecheck 2. lint 3. related Jest
4. Render screenshot compare if possible; else record the constraint
5. No visual PASS

## Done When
- FIX 1–10 source values match the reconfirmed Figma numbers above
- Shadow mapping documented
- ACCEPT backlog separated
- Commit pushed; no PR created
- Next Owner = ChatGPT
