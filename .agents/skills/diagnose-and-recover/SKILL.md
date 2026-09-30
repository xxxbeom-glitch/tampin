---
name: diagnose-and-recover
description: Diagnoses TypeScript, Metro, Expo, Android build, lint, or test failures with minimal changes and bounded retries.
---

# Diagnose and Recover

## Procedure
1. Record the exact failed command and exit/result.
2. Reproduce once when practical.
3. Identify the earliest/root error, not downstream noise.
4. Search `agent/ERROR_LEDGER.md` for the fingerprint.
5. Classify:
   - TypeScript/type
   - Metro/module resolution
   - Expo config/plugin
   - Android native/build
   - resource/asset
   - state/lifecycle
   - test environment
   - dependency/version
   - external permission/runtime
6. Make the smallest directly related change.
7. Re-run the exact failed command first.
8. Run the parent verification only after it passes.

## Retry rule
- first failure: minimal fix
- second same failure: record hypothesis/evidence, change approach
- third same root cause: STOP or BLOCKED

## Forbidden recovery
- deleting tests to get green
- broad type/lint suppression
- disabling SSL/security checks
- destructive DB reset/migration
- unrelated dependency churn
- sweeping refactor to avoid understanding the root cause

## Record
Repeated/reusable failures only:
- Fingerprint
- Status
- Command
- Root cause
- Fix
- Verification
- Occurrences
