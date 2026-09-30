# Active Task Contract

이 문서는 현재 Cursor 구현 작업 한 건만 유지한다.
새 Issue를 시작할 때 이전 내용을 교체한다.

## Task / Issue
- Issue #18 / DEV-008 — Canonical Login screen with dev auth behavior
- Branch: `cursor/dev-008-login-screen-368a`

## Goal
Replace Login placeholder with canonical Figma 01A Login hierarchy while preserving DEV-006 development-only Google/Kakao bypass behavior.

## Required
- 01A hierarchy: wordmark, headline/subtitle, stacked Google/Kakao CTAs, inquiry, Terms/Privacy affordances
- __DEV__ provider parity: first-run → OnboardingBasicInfo; complete → RoutineHome; busy/disabled double-press guard
- Release fail-closed: unavailable CTAs, no OAuth/SDK/keys/network/persistence
- Terms/Privacy visual-only; inquiry visual-only (deferred navigation)
- UI Catalog: ready/unavailable/busy/error-dialog-reference states
- Screen rendering separate from auth/navigation; tests + Screen Map + verification

## Allowed Scope
- `src/features/auth/LoginFormScreen.tsx`, `LoginScreen.tsx`, `loginFormContent.ts`
- `src/debug/ui-catalog/*` login entries
- `__tests__/login-*`, `ui-catalog-shell.test.ts`
- `agent/FIGMA_SCREEN_MAP.md` 01A rows only

## Forbidden / Do Not Change
- Real OAuth/SDK/keys/network/token persistence/Supabase/SQLite
- Expanding production auth bypass
- Legal URL hosting, inquiry backend/navigation
- Unrelated screens/EAS/sync/workout UI

## Figma refs
- `01A_Login` — `40:2075`
- `01A1_Login_Error_Overlay_Cases` — `1296:643` (component state, not route)

## Risk
- Double-press during dev sign-in must not duplicate session/navigation
- Release must remain visually unavailable + fail closed

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
