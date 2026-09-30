# Issue #20 / DEV-009 — Cursor Evidence

**Status:** `status:review`
**Next Owner:** ChatGPT
**Branch:** `cursor/dev-009-splash-launch-368a`
**Commit:** `ad002f5`

---

## Result

| AC | Status | Evidence |
|---|---|---|
| Canonical visual only (blue bg + white wordmark) | PASS | `SplashScreen.tsx` |
| No spinner/loading/debug/CTA/tab bar | PASS | splash-screen test |
| Cold launch Splash → Auth once | PASS | `SplashRouteScreen` + splash-route test |
| Deterministic delay documented | PASS | `SPLASH_PRESENTATION_DELAY_MS = 600` in `splashTiming.ts` |
| Timer clears on unmount | PASS | splash-route test |
| No session restore invented | PASS | no auth/persistence wiring |
| Dev UI Catalog preserved without Splash debug controls | PASS | `UiCatalog` route + `00-splash-default` catalog entry |
| Screen Map 00 row updated | PASS | `agent/FIGMA_SCREEN_MAP.md` |

**Presentation delay decision**
- Figma `00_Splash` (`1961:8909`) specifies no duration.
- Chosen: **600ms** — smallest deliberate delay so the first frame is perceptible before `replace('Auth')`.
- Source: `src/features/startup/splashTiming.ts`

**Intentional Figma differences**
- White wordmark uses uppercase `TAMPIN` text instead of Figma SVG asset (`139×28`)
- SUIT font not bundled; system sans-serif used

---

## Test

**Logic PASS**
- `npm run typecheck` — PASS
- `npm run lint` — PASS
- `npm test -- --runInBand` — PASS
- `npx expo config --type public` — PASS
- `npx expo prebuild --platform android --no-install` — PASS
- `git diff --check` — PASS

**DEV-009 tests**
- `__tests__/splash-screen.test.tsx`
- `__tests__/splash-route.test.tsx`
- `__tests__/splash-catalog.test.tsx`

**NOT VERIFIED**
- Device visual QA / Figma pixel comparison
- Session restoration / real auth routing beyond Splash → Login

---

## Production Readiness Review

- **Scope:** Splash presentation + single navigation to Login only
- **Risk:** Low; no persistence/auth expansion
- **Security:** No secrets/network
- **Result:** PASS (splash scope)
