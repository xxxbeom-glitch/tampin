# Issue #10 / DEV-004 — Cursor Evidence (paste to GitHub if integration blocked)

**Status:** `status:review`
**Next Owner:** ChatGPT
**Branch:** `cursor/dev-004-sqlite-foundation-368a`
**Commit:** `9881b4f`

---

## Result

| AC | Status | Evidence |
|---|---|---|
| Fresh DB reaches current schema version deterministically | PASS | `__tests__/sqlite-migrations.test.ts` — migration 001 applies once; version = `CURRENT_SCHEMA_VERSION` |
| Re-open/upgrade records migrations exactly once; FK enabled | PASS | Re-run migration returns 0; `assertForeignKeysEnabled`; FK violation test on orphan insert |
| Account-scoped client-ID schema (routines/workouts/outbox) | PASS | `001_initial_schema.ts` + repository tests |
| Completed-workout snapshot preserved vs mutable labels | PASS | Repository test: routine rename after complete does not alter snapshot exercise name/set values |
| Sync outbox metadata only (no transport) | PASS | `sync_outbox` table + `SqliteSyncOutboxRepository`; enqueue/markSent test |
| Repository contracts hide raw screen-level SQL | PASS | UI/navigation do not import SQLite; typed interfaces in `src/data/contracts/repositories/` |
| No product screen / Figma / backend work | PASS | No AppRoot wiring; no Supabase/Auth/EAS changes |
| typecheck/lint/test/expo config/prebuild/diff-check | PARTIAL | Logic PASS; assembleDebug NOT VERIFIED (no SDK) |
| Production-readiness review documented | PASS | See SESSION_HANDOFF DEV-004 section |
| Docs + Issue evidence | PASS | CURRENT / TASK_CONTRACT / SESSION_HANDOFF updated |
| Next Owner = ChatGPT | PASS | Recorded |

**Preserved (not modified):**
- DEV-002 `eas.json` development profile
- DEV-002 NOT VERIFIED: EAS login, project link, device smoke
- DEV-003 navigation foundation (no regression in test suite)
- Figma version2 redesign checkpoint / preserve rules in SESSION_HANDOFF

---

## Test

**Logic PASS**
- `npm run typecheck` — PASS
- `npm run lint` — PASS
- `npm test -- --runInBand` — PASS (8 suites, 15 tests)
- `npx expo config --type public` — PASS (`com.lumian.tampin`, `expo-sqlite` plugin)
- `git diff --check` — PASS

**SQLite-specific tests**
- `__tests__/sqlite-migrations.test.ts` — deterministic migration, idempotent re-open, FK enforcement
- `__tests__/sqlite-schema-integrity.test.ts` — required tables/indexes present after migration
- `__tests__/sqlite-repositories.test.ts` — routines, workout complete+snapshot, sync outbox metadata

**Expo Doctor — PARTIAL (pre-existing DEV-001 drift)**
- 19/21 passed; `newArchEnabled` schema + dependency version mismatch (unchanged baseline)

**Android compile — NOT VERIFIED**
- `npx expo prebuild --platform android --no-install` — PASS
- `./gradlew assembleDebug` — FAIL: `SDK location not found` (no ANDROID_HOME)

**Runtime/Device — NOT VERIFIED**
- No emulator/device; expo-sqlite runtime on hardware not verified
- EAS login / project link (DEV-002 carryover — untouched)

---

## Commit

See latest commit on branch `cursor/dev-004-sqlite-foundation-368a`.

**Key files**
- `src/data/contracts/` — IDs, domain types, repository interfaces
- `src/data/sqlite/` — connection adapters, migrations, repositories, `openTampinDatabase`, `createDataLayer`
- `__tests__/sqlite-*.test.ts`, `__tests__/helpers/sqlite-test-harness.ts`
- `package.json` / `app.json` — `expo-sqlite` + dev `better-sqlite3`

---

## Production Readiness Review

- **Scope:** SQLite schema v1, migration ledger, typed repositories, sync outbox metadata schema only
- **Risk:** Low for product UI (not wired); medium for future migration discipline (add-only policy must continue)
- **Invariants:** Local-first durable storage; stable client IDs; account scope; completed-workout snapshots; no destructive migration
- **Regression Packs:** Historical integrity (snapshot test); local-first authority (transaction on completeWorkout)
- **Security:** No secrets in schema; no auth/session in SQLite; test DB in-memory only
- **Privacy:** No analytics/logging of workout values; repository layer only
- **Local Data:** FK enforced; migrations transactional; soft-delete columns present for future sync
- **Network/Auth/Sync:** Out of scope — outbox schema only, no transport
- **Android Runtime:** Not in scope; expo-sqlite plugin registered for future dev build
- **Dependencies:** `expo-sqlite` production; `better-sqlite3` dev/test only (not exported from public sqlite index)
- **Tests:** Logic PASS — migrations, FK, repositories deterministic via better-sqlite3 adapter
- **Runtime Evidence:** NOT VERIFIED — no device expo-sqlite smoke
- **Known Risks:** First production migration path must stay add-only; UI wiring deferred to future Issues
- **Result:** PASS (foundation scope) · Runtime/Device NOT VERIFIED

---

## Risk

- Low immediate product risk (no UI wiring). Future Issues must consume repository interfaces, not raw SQL.
- `completeWorkout` transaction creates snapshot rows; discard/partial flows deferred to workout UI Issues.
- Parallel Figma redesign does not affect this data layer.

---

## Not Verified (carryover + new)

- EAS login / project link (DEV-002 carryover — untouched)
- Expo Doctor full PASS
- Android assembleDebug
- Android device/emulator expo-sqlite runtime smoke
- expo-sqlite on physical device (adapter tested via better-sqlite3 in Jest only)
