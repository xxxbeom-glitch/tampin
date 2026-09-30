# Active Task Contract

이 문서는 현재 Cursor 구현 작업 한 건만 유지한다.
새 Issue를 시작할 때 이전 내용을 교체한다.

## Task / Issue
- Issue #10 / DEV-004 — Local-first SQLite schema and repository foundation
- Branch: `cursor/dev-004-sqlite-foundation-368a`

## Goal
Routine/Workout UI가 real records를 persist하기 전에 필요한 local-first SQLite data layer foundation을 구현한다. 화면 구현이 아닌 schema/repository/transaction/migration 기반이다.

## Required
- `expo-sqlite` dependency + Expo plugin registration
- Single database-open entry point (`openTampinDatabase`)
- Explicit ordered add-only migrations + durable `schema_migrations` ledger
- Foreign-key enforcement on every opened connection
- Account-scoped, client-ID-first schema:
  - routines / routine_exercises / routine_set_templates
  - workout_sessions / session_exercises / set_records
  - completed_workouts / completed_workout_exercises / completed_set_snapshots (immutable history)
  - sync_outbox metadata (no transport worker)
- Historical exercise labels/snapshots independent from mutable routine names
- Narrow typed repository interfaces + transaction boundaries (no UI raw SQL)
- Testable adapter (`sql.js` WASM in Jest, under `__tests__/`) + deterministic migration/repository tests
- type/lint/test + expo config + prebuild + diff-check; Android compile when SDK available
- Production-readiness review in handoff/evidence
- docs/CURRENT + TASK_CONTRACT + SESSION_HANDOFF update (Figma + DEV-002 NOT VERIFIED preserved)
- commit/push + Issue #10 evidence

## Allowed Scope
- `src/data/contracts/` typed domain + repository interfaces
- `src/data/sqlite/` connection adapters, migrations, repositories, factory
- `__tests__/sqlite-*.test.ts`, `__tests__/helpers/sqlite-test-harness.ts`
- `package.json` / `app.json` (`expo-sqlite` only)
- agent/docs handoff updates for DEV-004

## Forbidden / Do Not Change
- Product screen visual implementation / Figma transcription
- UI wiring to SQLite (AppRoot/navigation/screens unchanged)
- Supabase / Auth / sync transport / media / analytics / notifications / EAS
- Exercise catalog seeding/import
- Background sync execution / conflict UI / logout wipe behavior
- DEV-002 `eas.json` / EAS NOT VERIFIED records
- Figma detached redesign checkpoint deletion or canonical relationship changes
- Destructive migrations or local-data clearing

## Figma refs
- N/A (data foundation only; parallel version2 redesign unchanged)

## Risk
- Migration ledger edge case on first open (handled: ledger table existence check)
- `sql.js` is dev/test-only under `__tests__/`; production uses expo-sqlite adapter only
- Expo Doctor / Android SDK blockers may remain NOT VERIFIED in cloud agent

## Affected invariants / regression packs
- Local-first: SQLite durable storage, not cache
- Stable client IDs + account scope on user-owned records
- Completed workout snapshot immutability vs mutable routine labels
- Multi-row writes in transaction boundaries
- Sync outbox metadata preserved for future transport
- `com.lumian.tampin` package identity
- DEV-001/DEV-002/DEV-003 foundations unchanged

## Verification
1. `npm run typecheck`
2. `npm run lint`
3. `npm test -- --runInBand`
4. `npx expo-doctor`
5. `npx expo config --type public`
6. `npx expo prebuild --platform android --no-install`
7. `./gradlew assembleDebug` when SDK available
8. `git diff --check`

## Done When
- AC satisfied or blockers recorded NOT VERIFIED
- commit/push complete
- Issue #10 Result/Test/Commit/Risk/Not Verified recorded
- Next Owner = ChatGPT
