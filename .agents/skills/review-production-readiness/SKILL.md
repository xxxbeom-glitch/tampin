---
name: review-production-readiness
description: Reviews Tampin changes touching persistence, auth, sync, user media, Android permissions/runtime, personal data, migrations, dependencies, or release configuration.
---

# Review Production Readiness

Run for changes involving:
- SQLite / expo-sqlite / migrations
- Supabase Postgres/Auth/Storage
- sync/outbox/conflict logic
- notifications/exact alarms/boot handling/permissions
- profile/support uploads
- Sentry/PostHog
- Android Manifest/native config
- release/EAS/Play configuration
- personal workout/account data

## Review
- Scope and changed files
- affected Global Invariants
- required Regression Packs
- local-first authority
- historical integrity
- stable exercise/record identity
- migration/existing-state safety
- secret/privacy/logging safety
- server authorization/runtime deployment state
- lifecycle/duplicate action safety
- dependency necessity/compatibility
- debug vs production separation
- test evidence levels
- Android runtime/device evidence required

## Result
Production Readiness Review

- Scope:
- Risk:
- Invariants:
- Regression Packs:
- Security:
- Privacy:
- Local Data:
- Network/Auth/Sync:
- Android Runtime:
- Dependencies:
- Tests:
- Runtime Evidence:
- Known Risks:
- Result: PASS | BLOCKED | STOP | NOT VERIFIED
