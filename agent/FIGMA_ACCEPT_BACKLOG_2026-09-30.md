# FIGMA ACCEPT backlog — Group 00–02 (2026-09-30)

**Issue:** #30 / DEV-014  
**Rule:** ACCEPT rows in `FIGMA_RUNTIME_GAP_AUDIT_2026-09-30.md` are **not** automatically done. This file separates unverified and unimplemented product-linked items from the FIX 10 pass.

Canvas `#F6F7F7` vs Figma `#F7F8FA` stays **unresolved** (PO lock). Not in this backlog as a fix candidate.

| ID | Kind | Screen | Notes |
|----|------|--------|-------|
| A1 | 미검증 | 01A / 01C `StatusArea_Spacer` 62 vs code 48 | Recorded in ISSUE_16 / ISSUE_18. Not re-measured on device this pass. |
| A3 | 미구현 | 01C Terms check | Figma Iconly 18×18; code still `✓` glyph. `icon-check` exists for Group 04 OptionItem, not wired here. |
| A4 | 미구현 | 01C1 hint | Figma `icon/hint` 16×16; code still `!` circle. `icon-hint.png` is used on 04F, not 01C. |
| A5 | 기획 연결 미구현 | 02A/02B `RoutineIcon_Placeholder` | Manifest `notExported`. Gray rounded square only. |
| A6 | 의도적 대체 | 02A/02B collapsed folder chevron | Rotated expanded asset (ISSUE_26). Pixel match NOT VERIFIED. |
| A7 | 미검증 | 02A/02B dashed quick-start border | Android may paint solid (ISSUE_22). No device. |
| A8 | 기획 연결 미구현 | 02A/02B collapsed folder headers | Visual-only, no toggle (ISSUE_22). |
| A9 | lock | 02A/02D headings `#09090a` | `colors.textPrimary` `#242927` CURRENT lock. |
| A10 | 의도적 | 02E save | Disabled; add-exercise wired in DEV-014. |
| A11 | 기획 연결 미구현 | Folder-entry | No standalone Figma frame (ISSUE_28). |
| A12 | 의도적 | 02D edit | Disabled visual-only (ISSUE_24). |

A2 (canvas) is unresolved PO lock, not a backlog implementation item.
