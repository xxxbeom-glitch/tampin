# Active Task Contract

이 문서는 현재 Cursor 구현 작업 한 건만 유지한다.
새 Issue를 시작할 때 이전 내용을 교체한다.

## Task / Issue
- Issue #20 / DEV-009 — Canonical Splash launch and Login transition
- Branch: `cursor/dev-009-splash-launch-368a`

## Goal
Replace DEV bootstrap landing with canonical 00 Splash and connect cold launch flow `Splash → Auth (Login)`.

## Required
- Visual only: brand-primary blue `#2563D6` + white Tampin wordmark; no spinner/loading/debug/CTA/tab bar
- Deterministic presentation delay (document chosen ms); timer clears on unmount; exactly one `replace` to Auth
- No session restore invented; UI Catalog remains registered in dev infrastructure without Splash debug controls
- Catalog splash state; tests for visual, one transition, unmount cancellation
- type/lint/test/expo config/prebuild/diff-check; Screen Map 00 row only

## Allowed Scope
- `src/features/startup/SplashScreen.tsx`, `splashTiming.ts`
- `src/app/navigation/screens/SplashRouteScreen.tsx`, root stack Bootstrap→Splash
- `src/debug/ui-catalog/*` splash entry
- Remove user-facing Bootstrap landing route/screen
- `__tests__/splash-*`, navigation/root-stack/ui-catalog test updates

## Forbidden / Do Not Change
- Auth/OAuth/persistence/SQLite/Supabase/session restore
- Animation assets, device QA claims
- Unrelated screens/colors/tokens beyond splash usage

## Figma refs
- `00_Splash` — `1961:8909`

## Risk
- Duplicate navigation if timer not guarded/cleared
- Accidental dev controls on Splash

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
