# Issue #22 / DEV-010 — Cursor Evidence

**Status:** `status:review`
**Next Owner:** ChatGPT
**Branch:** `cursor/dev-010-routine-main-368a`
**Commit:** _(pending)_

---

## Result

| AC | Status | Evidence |
|---|---|---|
| Reusable presentational Routine Main WithRoutines/Empty | PASS | `RoutineMainScreen.tsx` + fixtures |
| Quick actions + optional folder/cards + floating bottom bar | PASS | screen + routine-main-screen test |
| Identical QuickAction placement; Empty removes routine content only | PASS | Empty catalog + screen test |
| Routes: quickstart→ActiveWorkout, create→RoutineEditor, tabs→Analysis/Settings | PASS | `RoutineHomeRouteScreen` + route test |
| No routine-card detail routing | PASS | cards are non-pressable views |
| Catalog WithRoutines/Empty deterministic | PASS | catalog entries + routine-main-catalog test |
| Screen map 02A/02B rows updated to current Figma nodes | PASS | `agent/FIGMA_SCREEN_MAP.md` |

**Intentional Figma differences**
- SUIT font not bundled; system sans-serif used
- Bottom bar / quick-action / chevron icons use text placeholders instead of Iconly Pro SVG assets
- Routine card icon placeholders are flat gray squares (no thumbnail media)
- Canvas uses existing token `#F6F7F7` vs Figma `#F7F8FA`
- Android dashed quick-action borders may render solid (RN platform limitation)
- Collapsed folder headers are visual-only (no expand/collapse interaction in this Issue)

---

## Test

**Logic PASS**
- `npm run typecheck` — PASS
- `npm run lint` — PASS
- `npm test -- --runInBand` — PASS
- `npx expo config --type public` — PASS
- `npx expo prebuild --platform android --no-install` — PASS
- `git diff --check` — PASS

**DEV-010 tests**
- `__tests__/routine-main-screen.test.tsx`
- `__tests__/routine-home-route.test.tsx`
- `__tests__/routine-main-catalog.test.tsx`

**NOT VERIFIED**
- Device visual QA / Figma pixel comparison
- Real routine persistence / folder expand-collapse / card detail navigation
- Thumbnail/media networking

---

## Production Readiness Review

- **Scope:** Presentational Routine Main + mock routing only
- **Risk:** Low; no persistence/auth/network
- **Security:** No secrets/network
- **Result:** PASS (routine main mock scope)
