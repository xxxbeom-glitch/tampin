# Active Task Contract

이 문서는 현재 Cursor 구현 작업 한 건만 유지한다.
새 Issue를 시작할 때 이전 내용을 교체한다.

## Task / Issue
- Issue #14 / DEV-006 — Development-only Google/Kakao login bypass
- Branch: `cursor/dev-006-dev-auth-bypass-368a`

## Goal
Google/Kakao credentials 없이 development를 계속하기 위해, __DEV__에서 두 Login provider 버튼이 동일한 local development session으로 진입하고 first-run/complete profile에 따라 deterministic routing 한다.

## Required
- Typed auth contract + development-only in-memory adapter (no OAuth/keys/tokens/network/persistence)
- Google/Kakao parity → same local account session
- First-run → OnboardingBasicInfo boundary; completed profile → RoutineHome boundary
- Release fail-closed gating (bypass unavailable, no silent auth)
- Minimal Login UI wiring only (01A boundary); dev Bootstrap entry to Auth
- Tests: provider parity, routing, reset, release gating
- docs/handoff/evidence + production readiness review
- type/lint/test/expo config/prebuild/diff-check; commit/push

## Allowed Scope
- `src/auth/*`, `src/app/providers/auth/*`
- `src/features/auth/LoginScreen`, `OnboardingBasicInfoScreen`
- navigation route wiring for Auth + OnboardingBasicInfo
- Bootstrap dev-only Login entry
- `__tests__/development-auth-*`, `login-screen.test.tsx`

## Forbidden / Do Not Change
- Real Google/Kakao OAuth, SDKs, credentials, Supabase Auth, tokens, persistence
- Figma visual redesign beyond attaching provider button behavior
- SQLite schema, EAS, sync/media, routine/workout product UI
- DEV-002 NOT VERIFIED records, Figma version2 context

## Figma refs
- `01A_Login` — minimal boundary wiring only (not full transcription)
- `01C_Basic_Info` — placeholder boundary screen

## Risk
- Release gating must never create session on provider tap
- In-memory session must not be mistaken for production auth

## Verification
1. `npm ci`
2. `npm run typecheck`
3. `npm run lint`
4. `npm test -- --runInBand`
5. `npx expo config --type public`
6. `npx expo prebuild --platform android --no-install`
7. `git diff --check`

## Done When
- AC satisfied; real provider integration NOT VERIFIED/deferred
- Issue #14 evidence recorded; Next Owner = ChatGPT
