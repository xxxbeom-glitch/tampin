---
name: register-debug-screen
description: Registers a Tampin screen/state in the development-only UI Catalog using deterministic fake state and no real DB/auth/backend dependency.
---

# Register Debug Screen

## Goal
Canonical screens/states must be directly inspectable during development without traversing login, navigation, SQLite, Supabase, or live user data.

## Procedure
1. Confirm Screen component can render from explicit props/state.
2. Prepare deterministic fake state for only the representative states that actually exist.
3. Add an entry using the exact canonical Screen ID/name from `agent/FIGMA_SCREEN_MAP.md`.
4. Keep UI Catalog implementation under `src/debug/ui-catalog/`.
5. Gate developer entry points behind development-only conditions.
6. Production/release navigation must not expose the catalog.
7. Never read real user SQLite/Supabase data from the catalog.
8. Run the relevant Android development build and open the registered entry when runtime verification is available.
9. Update Screen Map:
   - Catalog = REGISTERED
   - QA = appropriate evidence level

## Minimum catalog capability
- category/group list
- screen name + state name
- direct render
- back
- optional simple search when list becomes large

Do not add advanced catalog tooling until there is a concrete need.

## Completion
- exact canonical entry is discoverable
- screen opens without production navigation/data dependencies
- representative state renders deterministically
- catalog is not user-facing in production
- result is recorded in Screen Map
