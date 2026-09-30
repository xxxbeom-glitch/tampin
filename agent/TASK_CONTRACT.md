# Active Task Contract

이 문서는 현재 Cursor 구현 작업 한 건만 유지한다.
새 Issue를 시작할 때 이전 내용을 교체한다.

## Task / Issue
- Issue #8 / DEV-003 — Typed navigation + development UI Catalog foundation
- Branch: `cursor/dev-003-typed-navigation-368a`

## Goal
DEV-001 local state switch를 제거하고, MVP flow boundary typed React Navigation foundation + __DEV__ UI Catalog reachability를 확보한다.

## Required
- React Navigation native stack + NavigationContainer
- Typed `RootStackParamList` for MVP flow boundaries
- Bootstrap initial route preserved
- UI Catalog __DEV__ only, excluded from release stack registration
- Android back handling tests (component level)
- type/lint/test + expo config verification
- Android prebuild/assembleDebug or blocker record
- docs/CURRENT + handoff update (Figma parallel context preserved)
- commit/push + Issue #8 evidence

## Allowed Scope
- `@react-navigation/*`, `react-native-screens`, `react-native-safe-area-context`
- navigation modules, placeholder boundary screens, jest setup for nav tests
- `@testing-library/react-native` dev dependency
- TASK_CONTRACT / SESSION_HANDOFF / CURRENT updates

## Forbidden / Do Not Change
- canonical Figma screens / design-token transcription
- SQLite / Supabase / Auth / Sync / media / analytics / notifications
- DEV-002 `eas.json` / EAS NOT VERIFIED records
- Figma redesign checkpoint deletion or canonical/detached relationship changes
- cloud EAS build / production release / iOS

## Figma refs
- N/A (navigation foundation only; parallel version2 redesign unchanged)

## Risk
- Native stack jest mocking required for component tests
- Expo Doctor / Android SDK blockers may remain NOT VERIFIED in cloud agent

## Affected invariants / regression packs
- `com.lumian.tampin` package identity
- DEV-001 bootstrap shell + UI Catalog dev-only semantics
- DEV-002 eas.json development profile

## Verification
1. `npm run typecheck`
2. `npm run lint`
3. `npm test`
4. `npx expo-doctor`
5. `npx expo config --type public`
6. `npx expo prebuild --platform android --no-install`
7. `./gradlew assembleDebug` when SDK available

## Done When
- AC satisfied or blockers recorded NOT VERIFIED
- commit/push complete
- Issue #8 Result/Test/Commit/Risk/Not Verified recorded
- Next Owner = ChatGPT
