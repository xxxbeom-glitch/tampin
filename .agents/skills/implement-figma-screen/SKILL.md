---
name: implement-figma-screen
description: Implements one canonical Tampin Figma screen/state in React Native + Expo with deterministic state, shared design-system reuse, and Debug UI Catalog registration.
---

# Implement Figma Screen

## Required inputs
- current GitHub Issue
- `agent/TASK_CONTRACT.md`
- `docs/implementation/MVP_SCREEN_INVENTORY.md`
- `docs/implementation/MVP_SCREEN_BEHAVIOR_MATRIX.md`
- `agent/FIGMA_SCREEN_MAP.md`
- relevant Decision/Policy
- canonical Figma frame/node
- existing design-system implementation

## Procedure
1. Confirm Issue Goal / AC / Out of Scope.
2. Find the exact Figma frame/node in the Screen Map.
3. Read only the relevant behavior/decision rules.
4. Search existing code for reusable token/component/pattern.
5. Define the minimum UI state/actions needed for the canonical screen/state.
6. Keep Screen rendering separate from Route/data/navigation orchestration.
7. In mock phase, provide deterministic fake state without SQLite/Supabase dependency.
8. Implement large structure first, then typography/color/shape/spacing, then detail interactions.
9. Register the screen/state in Debug UI Catalog.
10. Run relevant verification.
11. Compare with Figma and record intentional differences.
12. Update `agent/FIGMA_SCREEN_MAP.md` for only the implemented rows.

## Rules
- Figma top-level frames are implementation states, not automatically separate navigation routes.
- Do not invent hidden behavior from the picture; use GitHub behavior matrix/decisions.
- Do not create a new global token/component when an existing one fits.
- Do not wire real DB/auth/backend unless the current Issue includes it.
- Do not mark persistence/runtime behavior PASS from mock state.

## Output
Status: PASS | RETRY | BLOCKED | STOP
Issue:
Implemented screens/states:
Debug Catalog:
Changed files:
Verification:
Figma differences:
Not Verified:
Commit:
Next Owner:
