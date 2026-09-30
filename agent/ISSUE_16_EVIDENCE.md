# Issue #16 / DEV-007 — Cursor Evidence

**Status:** `status:review`
**Next Owner:** ChatGPT
**Branch:** `cursor/dev-007-onboarding-basic-info-368a`
**Commit:** `a24f47f`

---

## Result

| AC | Status | Evidence |
|---|---|---|
| 01C Basic Info form from existing tokens/primitives | PASS | `BasicInfoFormScreen.tsx` |
| Sex + YYYYMMDD DOB + explicit Terms agreement | PASS | form + validation tests |
| `시작하기` disabled until all three valid | PASS | `isBasicInfoSubmitEnabled` + screen tests |
| Invalid DOB exact error copy | PASS | `DOB_ERROR_MESSAGE` constant + tests |
| Back → Login, incomplete dev session retained | PASS | route test; no `signOut` on back |
| Valid submit → profile complete → RoutineHome | PASS | `markProfileComplete` + `navigation.replace` |
| Screen vs auth/navigation separation | PASS | `BasicInfoFormScreen` / `OnboardingBasicInfoScreen` / route |
| Catalog default/error/focused/filled/disabled | PASS | 5 catalog entries + preset tests |
| No OAuth/persistence/network expansion | PASS | in-memory `markProfileComplete` only |
| Release auth fail-closed unchanged | PASS | no auth adapter changes |

**Intentional Figma differences**
- SUIT font not bundled; system sans-serif used
- Back arrow, Terms checkmark, error hint use text glyphs instead of Figma SVG assets
- Status spacer uses fixed 48px vs dynamic safe-area inset
- CTA/selected tiles use Tampin canonical tokens (`brandAction` / `brandPrimary`) rather than Figma export blue

---

## Test

**Logic PASS**
- `npm run typecheck` — PASS
- `npm run lint` — PASS
- `npm test -- --runInBand` — PASS
- `npx expo config --type public` — PASS
- `npx expo prebuild --platform android --no-install` — PASS
- `git diff --check` — PASS

**DEV-007 tests**
- `__tests__/basic-info-validation.test.ts`
- `__tests__/onboarding-basic-info-screen.test.tsx`
- `__tests__/onboarding-basic-info-route.test.tsx`
- `__tests__/basic-info-catalog.test.tsx`

**NOT VERIFIED**
- Device visual QA / Figma pixel comparison
- Real OAuth / SQLite profile persistence

---

## Production Readiness Review

- **Scope:** First-run Basic Info UI + dev in-memory profile completion only
- **Risk:** Low; no production auth/persistence expansion
- **Security:** No secrets/network; release bypass unchanged
- **Privacy:** DOB collected in component state only; not persisted
- **Local Data:** No SQLite/AsyncStorage writes
- **Network/Auth/Sync:** None added
- **Result:** PASS (UI + dev flow scope)

---

## Changed files (summary)

- `src/features/auth/basicInfoValidation.ts`
- `src/features/auth/BasicInfoFormScreen.tsx`
- `src/features/auth/OnboardingBasicInfoScreen.tsx`
- `src/app/navigation/screens/OnboardingBasicInfoRouteScreen.tsx`
- `src/debug/ui-catalog/*` (5 catalog entries)
- `src/design-system/tokens/colors.ts` (minimal additions)
- Tests + Screen Map + TASK_CONTRACT
