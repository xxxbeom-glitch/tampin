# Active Task Contract

이 문서는 현재 Cursor 구현 작업 한 건만 유지한다.
새 Issue를 시작할 때 이전 내용을 교체한다.

## Task / Issue
- Issue #12 / DEV-005 — Initialize SQLite data layer in the app lifecycle
- Branch: `cursor/dev-005-data-layer-wiring-368a`

## Goal
Merged DEV-004 SQLite foundation을 Expo app lifecycle에 안전하게 wiring한다. Future product screens는 initialized typed data layer만 사용한다.

## Required
- App-level `DataLayerProvider`: process당 DB 1회 open/migrate, typed repositories hook 노출
- Dependency injection (`openDatabase` prop) for tests; no DB open on module import
- Feature UI must not import `expo-sqlite`, `openTampinDatabase`, raw connection types
- Dev-only UI Catalog read-only data-layer health entry (init status + schema version only)
- Provider lifecycle, DI, import boundary, catalog health tests
- Documented physical-device runtime smoke procedure (NOT VERIFIED until run)
- type/lint/test + expo config + prebuild + diff-check; Android compile when SDK available
- Production-readiness review + docs/handoff/evidence
- commit/push + Issue #12 evidence

## Allowed Scope
- `src/app/providers/data-layer/*`, `AppProviders.tsx`
- `src/debug/ui-catalog/` health entry only
- `__tests__/data-layer-*.test.*`, catalog test updates
- agent/docs handoff for DEV-005

## Forbidden / Do Not Change
- Product screen visual implementation / Figma transcription
- Routine/workout UI, auth, Supabase/sync transport, media, EAS
- Database seed/reset/delete in catalog or provider
- DEV-002 NOT VERIFIED records, Figma version2 context
- SQLite schema/migration changes (DEV-004 scope)

## Figma refs
- N/A (lifecycle wiring only)

## Risk
- Provider init failure must surface without silent DB wipe
- Jest must not load expo-sqlite via provider default path (lazy require + DI)
- Expo Doctor / Android SDK blockers may remain NOT VERIFIED

## Affected invariants / regression packs
- One initialized data layer per process; repositories only to consumers
- Debug catalog dev-only; release stack excludes UiCatalog
- Local-first migration before repository exposure
- DEV-004 schema/repository contracts unchanged

## Verification
1. `npm ci`
2. `npm run typecheck`
3. `npm run lint`
4. `npm test -- --runInBand`
5. `npx expo-doctor`
6. `npx expo config --type public`
7. `npx expo prebuild --platform android --no-install`
8. `./gradlew assembleDebug` when SDK available
9. `git diff --check`

## Done When
- AC satisfied or blockers recorded NOT VERIFIED
- commit/push complete
- Issue #12 Result/Test/Commit/Risk/Not Verified recorded
- Next Owner = ChatGPT
