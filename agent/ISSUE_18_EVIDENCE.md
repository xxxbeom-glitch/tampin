# Issue #18 / DEV-008 — Cursor Evidence

**Status:** `status:review`
**Next Owner:** ChatGPT
**Branch:** `cursor/dev-008-login-screen-368a`
**Commit:** `4aa5ff0`

---

## Result

| AC | Status | Evidence |
|---|---|---|
| 01A hierarchy (wordmark, headline, CTAs, inquiry, Terms/Privacy) | PASS | `LoginFormScreen.tsx` |
| __DEV__ Google/Kakao parity + routing | PASS | `login-screen.test.tsx` |
| Busy/disabled double-press guard | PASS | ref guard + `login-screen.test.tsx` |
| Release fail-closed unavailable CTAs | PASS | `login-screen.test.tsx` + unchanged auth adapters |
| Terms/Privacy visual-only (no URLs) | PASS | static underlined text, no handlers |
| Inquiry visual-only (deferred navigation) | PASS | static affordance, no submit/navigation |
| UI Catalog ready/unavailable/busy/error-reference | PASS | 4 catalog entries + tests |
| Rendering vs auth/navigation separation | PASS | `LoginFormScreen` / `LoginScreen` / `AuthRouteScreen` |
| No OAuth/persistence/network expansion | PASS | dev bypass only |

**Intentional Figma differences**
- SUIT font not bundled; system sans-serif used
- AppLogo uses uppercase `TAMPIN` text wordmark instead of masked SVG asset
- Status spacer fixed 48px vs Figma 62px
- Error reference board shows general dialog only in catalog (not full 1160px triptych)
- Terms/Privacy/inquiry are non-interactive visual affordances until URL/support ownership Issues

**Deferred (explicit)**
- Public Terms/Privacy URL opening
- Inquiry/support navigation and submission

**Post–design-QA token alignment (pre-merge)**
- Source: Figma `01A_Login` `40:2075` variable defs — `--fitness-colors-brand-primary` / `action/primary`
- Source: Figma `01C_Basic_Info` `40:2138` variable defs — `action/primary` (selected tile uses `brand/primary` on same blue in frame read-back)
- Updated existing tokens only (no new tokens):
  - `brandPrimary`: `#218F8A` → `#2563D6`
  - `brandAction`: `#1A7E79` → `#2563D6`
- Applies to DEV-007 Basic Info selected/CTA and DEV-008 Login wordmark/CTA via shared `colors.ts`

---

## Test

**Logic PASS**
- `npm run typecheck` — PASS
- `npm run lint` — PASS
- `npm test -- --runInBand` — PASS
- `npx expo config --type public` — PASS
- `npx expo prebuild --platform android --no-install` — PASS
- `git diff --check` — PASS

**DEV-008 tests**
- `__tests__/login-screen.test.tsx`
- `__tests__/login-form-screen.test.tsx`
- `__tests__/login-catalog.test.tsx`

**NOT VERIFIED**
- Device visual QA / Figma pixel comparison
- Real OAuth / legal URLs / inquiry backend

---

## Production Readiness Review

- **Scope:** Canonical Login UI + preserved dev bypass only
- **Risk:** Low; release remains unavailable/fail-closed
- **Security:** No secrets/network/tokens added
- **Privacy:** No new data collection
- **Local Data:** No persistence
- **Network/Auth/Sync:** None added
- **Result:** PASS (UI + dev flow scope)
