# Active Task Contract

이 문서는 현재 Cursor 구현 작업 한 건만 유지한다.
새 Issue를 시작할 때 이전 내용을 교체한다.

## Task / Issue
- Issue #16 / DEV-007 — Canonical Basic Info onboarding form
- Branch: `cursor/dev-007-onboarding-basic-info-368a`

## Goal
Replace the `OnboardingBasicInfo` placeholder with the canonical Figma 01C Basic Info form so the DEV-006 development-only auth bypass has a complete first-run path.

## Required
- Sex selection, numeric YYYYMMDD DOB with true calendar-date validation
- Exact invalid DOB error: `올바른 생년월일 8자리를 입력해주세요.`
- Explicit Terms agreement row; `시작하기` disabled until sex + valid DOB + Terms all valid
- Back → Login retaining incomplete dev session; valid submit → mark in-memory profile complete → RoutineHome
- Screen rendering separated from auth/session/navigation orchestration
- Register default/error/focused/filled/disabled catalog states
- Focused unit tests; type/lint/test/expo config/prebuild/diff-check; commit/push

## Allowed Scope
- `src/features/auth/*` Basic Info screen/form/validation
- `src/app/navigation/screens/OnboardingBasicInfoRouteScreen.tsx`
- `src/debug/ui-catalog/*` for 01C catalog entries
- `src/design-system/tokens/colors.ts` (minimal canonical token additions only)
- `__tests__/basic-info-*`, `onboarding-basic-info-*`
- `agent/FIGMA_SCREEN_MAP.md` 01C rows only

## Forbidden / Do Not Change
- Real OAuth/SDK/keys/network/Supabase/SQLite persistence/legal URL hosting
- Expanding DEV-006 production bypass or release auth behavior
- Unrelated screens, EAS, sync, routine/workout UI
- Global design-system components unless no existing fit

## Figma refs
- `01C_Basic_Info` — `40:2138`
- `01C1_Basic_Info_Error` — `1292:1183`
- `01C2_Basic_Info_Focused` — `1314:645`
- `01C3_Basic_Info_Filled` — `1314:670`
- `01C4_Basic_Info_Disabled` — `1314:695`

## Risk
- Form validity must not enable CTA on partial/invalid state
- Back must not mark profile complete or destroy incomplete dev session
- Release auth must remain fail-closed (no bypass expansion)

## Verification
1. `npm run typecheck`
2. `npm run lint`
3. `npm test -- --runInBand`
4. `npx expo config --type public`
5. `npx expo prebuild --platform android --no-install`
6. `git diff --check`

## Done When
- AC satisfied; device visual QA NOT VERIFIED unless run
- Evidence recorded; Next Owner = ChatGPT
