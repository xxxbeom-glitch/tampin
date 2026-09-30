# FIGMA_RUNTIME_GAP_AUDIT — Group 01–03 (2026-09-30)

**Issue:** #30 / DEV-014  
**Source:** Figma `W3lZurXCXbThP67rF2xk2b` · page `MVP_전체_와이어프레임` (`34:1076`)  
**Scope:** Already-implemented Group 00–02 runtime screens vs current named Figma frames  
**Method:** Code read + Figma `get_design_context` / variable defs. No device capture.  
**Rule:** Actionable findings only. No speculative UI was added in this audit.

**RETRY 2026-09-30:** The 10 FIX rows below remain **follow-up only**. Issue #30 RETRY did not implement them.

---

## FIX — later visual/runtime work

| # | Screen | Figma node / name | Code location | Exact mismatch | Judgment |
|---|--------|-------------------|---------------|----------------|----------|
| 1 | 00 Splash | `1961:8909` / `00_Splash` · `1961:8910` `TampinLogo_White` | `src/features/startup/SplashScreen.tsx` · `FigmaImage` (`width={120}` `height={28}`) | Wordmark rendered **120×28**; Figma asset slot **139×28** | **FIX** |
| 2 | 01A Login | `40:2075` / `01A_Login` · `43:3053` `AppLogo` | `src/features/auth/LoginFormScreen.tsx` · `styles.wordmark` + `FigmaImage` (`120×28`) | Primary wordmark rendered **120×28**; Figma **139×28** | **FIX** |
| 3 | 01A Login (error overlay) | `1296:643` / `01A1_Login_Error_Overlay_Cases` · dialog card | `src/features/auth/LoginFormScreen.tsx` · `styles.errorDialogCard` | Figma card elevation `0 0 8px rgba(0,0,0,0.05)`; code card is border-only | **FIX** |
| 4 | 01C Basic Info (disabled DOB) | `1314:695` / `01C4_Basic_Info_Disabled` · `InputBox` | `src/features/auth/BasicInfoFormScreen.tsx` · `styles.dobInputDisabled` | Figma applies opacity 0.3 to the whole 52px field; code applies 0.3 to input text only | **FIX** |
| 5 | 02A/02B Routine Main | `2483:8317` · `2483:8336` `icon/plus` | `src/features/routine/RoutineMainScreen.tsx` · `PlusIcon` (`18×18`) | Plus icon **18×18**; Figma **16×16** inside 36px circle | **FIX** |
| 6 | 02A/02B Routine Main | `2483:8317` · `2483:8368` `icon/chevron-right` | `src/features/routine/RoutineMainScreen.tsx` · `ChevronRightIcon` (`18×18`) | Chevron **18×18**; Figma **16×16** | **FIX** |
| 7 | 02A/02B Routine Main | `2483:8317` · `2333:7701` `icon/folder-chevron-expanded` | `src/features/routine/RoutineMainScreen.tsx` · `FolderChevron` (`14×14`) | Folder chevron **14×14**; Figma **16×16** | **FIX** |
| 8 | 02A/02B Routine Main | `2483:8317` · `2078:2401` `BottomAppBar` | `src/features/routine/RoutineMainScreen.tsx` · `bottomTabIconActive` / `Inactive` | Full-color Iconly PNGs are re-tinted at runtime; active/inactive color fidelity is unverified | **FIX** |
| 9 | 02A/02B Routine Main | `2483:8317` · routine cards | `src/features/routine/RoutineMainScreen.tsx` · `cardShadow` | Code shadow offset `(0,0)` blur 4 / 5%; Figma elevation radius **8** | **FIX** |
| 10 | 02D Routine Detail | `2333:7821` · exercise cards | `src/features/routine/RoutineDetailScreen.tsx` · `cardShadow` | Same card elevation mismatch as #9 | **FIX** |

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
