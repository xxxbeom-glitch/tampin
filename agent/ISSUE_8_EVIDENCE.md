# Issue #8 / DEV-003 — Cursor Evidence (paste to GitHub if integration blocked)

**Status:** `status:review`
**Next Owner:** ChatGPT
**Branch:** `cursor/dev-003-typed-navigation-368a`
**Commit:** (see latest push)

---

## Result

| AC | Status | Evidence |
|---|---|---|
| One typed navigation mechanism; no ad-hoc route state | PASS | Removed `RootShell` useState switch; `RootNavigator` + `RootStackParamList` |
| Root navigation deterministic at component level | PASS (Logic) | Component test: UI Catalog in-app back → `navigation.goBack()` → Bootstrap |
| Route contracts cover MVP flow boundaries | PASS | 10 product routes + dev-only `UiCatalog` in `types.ts` / `rootStackConfig.ts` |
| Bootstrap shell initial product route | PASS | `initialRouteName='Bootstrap'`; `BootstrapHomeScreen` unchanged |
| UI Catalog __DEV__ reachable, excluded from release nav | PASS | `getRegisteredRootStackScreens(false)` omits `UiCatalog`; dev button navigates to catalog |
| No product-screen/persistence/backend work | PASS | Placeholder screens only; no SQLite/Supabase/Auth |
| typecheck/lint/tests/expo config/prebuild/assembleDebug | PARTIAL | Logic PASS; assembleDebug NOT VERIFIED (no SDK) |
| Docs + Issue evidence | PASS | CURRENT / TASK_CONTRACT / SESSION_HANDOFF updated |
| Next Owner = ChatGPT | PASS | Recorded |

**Preserved (not modified):**
- DEV-002 `eas.json` development profile
- DEV-002 NOT VERIFIED: EAS login, project link, device smoke
- Figma version2 redesign checkpoint / preserve rules in SESSION_HANDOFF

---

## Test

**Logic PASS**
- `npm run typecheck` — PASS
- `npm run lint` — PASS
- `npm test` — PASS
- `npx expo config --type public` — PASS (`com.lumian.tampin`)

**Navigation tests (component level only)**
- `__tests__/root-stack-config.test.ts` — route contracts + dev/release catalog registration
- `__tests__/navigation-catalog-goback.test.tsx` — UI Catalog `← Back to bootstrap` triggers `goBack()` and restores Bootstrap

**Expo Doctor — PARTIAL (pre-existing DEV-001 drift)**
- 19/21 passed; `newArchEnabled` schema + dependency version mismatch (unchanged baseline)

**Android compile — NOT VERIFIED**
- `npx expo prebuild --platform android --no-install` — PASS
- `./gradlew assembleDebug` — FAIL: `SDK location not found` (no ANDROID_HOME)

**Runtime/Device — NOT VERIFIED**
- No emulator/device; navigation not verified on hardware
- Android hardware-back behavior on device/emulator not verified (component goBack only)

---

## Commit

See latest commit on branch `cursor/dev-003-typed-navigation-368a`.

**Key files**
- `src/app/navigation/` — types, RootNavigator, placeholders, route screens
- `jest.setup.ts` — jest-only native stack / safe area mocks for component tests
- `package.json` — React Navigation deps + testing-library devDep

---

## Risk

- Low product risk (placeholders only). Navigation pop verified via in-app Catalog back action at component-test level; device QA remains for ChatGPT/PO.
- Parallel Figma redesign may later remap Routine-as-main IA; route names are boundary contracts, not final screen IDs.

---

## Not Verified (carryover + new)

- EAS login / project link (DEV-002 carryover — untouched)
- Expo Doctor full PASS
- Android assembleDebug
- Android device/emulator navigation smoke
- Android hardware-back on device/emulator
