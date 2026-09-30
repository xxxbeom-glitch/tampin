# FIGMA_RUNTIME_GAP_AUDIT — Group 01–03 (2026-09-30)

**Issue:** #30 / DEV-014  
**Source:** Figma `W3lZurXCXbThP67rF2xk2b` · page `MVP_전체_와이어프레임` (`34:1076`)  
**Scope:** Already-implemented Group 00–02 runtime screens vs current named Figma frames  
**Method:** Code read + Figma `get_design_context` / variable defs. No device capture.  
**Rule:** Actionable findings only. No speculative UI was added in this audit.

**FIX pass 2026-09-30 (after RETRY 2 `3b7882e`):** The 10 FIX rows below were implemented in source. Visual/device PASS is **not** claimed. ACCEPT rows were **not** auto-closed; see `agent/FIGMA_ACCEPT_BACKLOG_2026-09-30.md`.

---

## FIX — later visual/runtime work

| # | Screen | Figma node / name | Code location | Exact mismatch | Judgment |
|---|--------|-------------------|---------------|----------------|----------|
| 1 | 00 Splash | `1961:8909` / `00_Splash` · `1961:8910` `TampinLogo_White` | `src/features/startup/SplashScreen.tsx` · `FigmaImage` (`width={139}` `height={28}`) | Wordmark was **120×28**; Figma **139×28**. Source updated. Visual NOT VERIFIED | **FIXED in source** |
| 2 | 01A Login | `40:2075` / `01A_Login` · `43:3053` `AppLogo` | `src/features/auth/LoginFormScreen.tsx` · `FigmaImage` (`139×28`) | Wordmark was **120×28**. Source updated. Visual NOT VERIFIED | **FIXED in source** |
| 3 | 01A Login (error overlay) | `1296:643` / `01A1` · DialogCard `1296:667` | `src/features/auth/LoginFormScreen.tsx` · `styles.errorDialogCard` | Elevation/Card mapped; Figma blur ≠ RN shadowRadius. Visual NOT VERIFIED | **FIXED in source** |
| 4 | 01C Basic Info (disabled DOB) | `1314:695` / `01C4` · InputBox `1314:708` | `src/features/auth/BasicInfoFormScreen.tsx` · `dobFieldDisabled` | Whole 52px field wrapper opacity 0.3. Visual NOT VERIFIED | **FIXED in source** |
| 5 | 02A/02B Routine Main | `2483:8317` · plus 16×16 | `RoutineMainScreen.tsx` · `PlusIcon` (`16×16`) | Was 18×18. Source updated. Visual NOT VERIFIED | **FIXED in source** |
| 6 | 02A/02B Routine Main | `2483:8317` · chevron 16×16 | `RoutineMainScreen.tsx` · `ChevronRightIcon` (`16×16`) | Was 18×18. Source updated. Visual NOT VERIFIED | **FIXED in source** |
| 7 | 02A/02B Routine Main | `2483:8317` · folder chevron 16×16 | `RoutineMainScreen.tsx` · `FolderChevron` (`16×16`) | Was 14×14. Source updated. Visual NOT VERIFIED | **FIXED in source** |
| 8 | 02A/02B Routine Main | `2078:2208` BottomAppBar | `RoutineMainScreen.tsx` · state rasters, no tint | Active/inactive PNGs from Figma variants. Visual NOT VERIFIED | **FIXED in source** |
| 9 | 02A/02B Routine Main | `2483:8317` · routine cards | `RoutineMainScreen.tsx` · `cardShadow` radius 8 | Was radius 4. Mapping documented. Visual NOT VERIFIED | **FIXED in source** |
| 10 | 02D Routine Detail | `2333:7846` · exercise cards | `RoutineDetailScreen.tsx` · `cardShadow` radius 8 | Was radius 4. Mapping documented. Visual NOT VERIFIED | **FIXED in source** |

---

## ACCEPT — documented / intentional / Figma-blocked

These are not new product gaps for DEV-014. They stay as already-recorded intentional differences.

| # | Screen | Figma node / name | Code location | Notes |
|---|--------|-------------------|---------------|-------|
| A1 | 01A / 01C | `40:2075` / `40:2138` · `StatusArea_Spacer` 62px | `statusSpacer` height 48 | Recorded in ISSUE_16 / ISSUE_18 evidence |
| A2 | Canvas screens | `--fitness-colors-bg-default` `#F7F8FA` | `colors.canvas` `#F6F7F7` | PO/CURRENT locked canvas |
| A3 | 01C Terms check | Iconly 18×18 | `✓` glyph | ISSUE_16 |
| A4 | 01C1 hint | `icon/hint` 16×16 | `!` circle | ISSUE_16 |
| A5 | 02A/02B | `RoutineIcon_Placeholder` | gray rounded square | `assets/figma/manifest.json` `notExported` |
| A6 | 02A/02B | collapsed folder chevron | rotated expanded asset | ISSUE_26 |
| A7 | 02A/02B | dashed quick-start border | Android may paint solid | ISSUE_22 |
| A8 | 02A/02B | collapsed folder headers | visual-only, no toggle | ISSUE_22 |
| A9 | 02A/02D headings | frame hardcode `#09090a` | `colors.textPrimary` `#242927` | CURRENT locked text primary |
| A10 | 02E | `34:1457` | save disabled; add-exercise now wired in DEV-014 | save remains disabled (DEV-013 / this Issue) |
| A11 | Folder-entry | no standalone Figma frame | `RoutineFolderEntryScreen.tsx` | ISSUE_28 |
| A12 | 02D edit affordance | `2333:7821` | disabled visual-only | ISSUE_24 |

---

## Not a gap this pass

- 01A / 01C / 02A / 02B / 02D / 02E copy and section order match current Figma.
- Bundled SUIT faces are referenced via `fontFamily`.
- 02D thumbnails / back / edit icons use exported PNGs at Figma sizes.

No Group 01–03 production UI was changed in this audit.
