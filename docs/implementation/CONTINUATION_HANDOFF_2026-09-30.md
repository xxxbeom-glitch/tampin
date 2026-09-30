# Tampin — Continuation Handoff

**Purpose:** This is the required starting point for a new ChatGPT/Codex/Cursor conversation working on Tampin. It records Product Owner decisions that are not safe to infer from the code alone.

## Read order

1. This document
2. `agent/SESSION_HANDOFF.md` and `agent/FIGMA_SCREEN_MAP.md`
3. `docs/implementation/MVP_SCREEN_BEHAVIOR_MATRIX.md`
4. The GitHub issue currently being implemented
5. The exact current Figma node named by that issue

Never treat an old node in a historical document as authoritative when the current Figma component has a newer named state.

## Product and design decisions

- Product name: **Tampin** (not Liftly). Figma file currently remains named `LIFTLY_최종`.
- Platform: Android-only React Native + Expo app.
- Primary/action color: **`#2563D6` blue**. Do not restore the historical green values.
- Light canvas: `#F6F7F7`; cards are white with a subtle, non-clipped shadow. Shared card shadow uses zero X/Y offset and low opacity.
- Reuse existing Figma components/tokens where possible. Do not create global design-system primitives for one-off screens.
- App bottom bar is a rounded floating bar on the current routine screens; do not convert it to a full-width fixed bar unless the Figma state specifically says so.
- Existing Figma components use SUIT; runtime currently uses the system fallback until the font is bundled. Record this as a Figma difference rather than silently claiming pixel parity.

## First-run flow (implemented mock phase)

`Splash → Login → Basic Info → Routine Main`

- Splash is blue with a white TAMPIN wordmark only, then transitions to Login after 600 ms.
- Google/Kakao are development-only in-memory bypasses until real keys are available. Both providers share the same local session.
- First use goes to Basic Info; completed mock profile goes to Routine Main.
- Basic Info requires sex, a real `YYYYMMDD` birth date, and explicit Terms agreement. Invalid DOB copy: `올바른 생년월일 8자리를 입력해주세요.`
- Do **not** add real OAuth, keys, network calls, Supabase auth, token storage, or fake persistence without a separately scoped issue.

## Routine flow (implemented mock phase)

`Routine Main card → Routine Detail → Active Workout boundary`

- Current Figma Routine Main: `02A_Routine_Main` `2483:8317` (WithRoutines) and `02B_Routine_Main_Empty` `2483:8418` (Empty). They are variants of the same component.
- Quick actions remain in the same position in both states.
- `루틴 없이 시작` routes to Active Workout; `새 루틴 만들기` routes to the folder-first routine-edit boundary.
- Routine Main canonical mobile geometry: 360 px viewport, 16 px horizontal inset, 328 px content width. Do not reintroduce the prior 280 px card-width bug.
- Current Figma Routine Detail: `02D_Routine_Detail` `2333:7821`; card press opens it and `운동 시작` enters the Active Workout boundary.
- Routine Detail edit is visual-only until the edit flow is scoped. Real routine persistence, media thumbnails, folder collapse, set editing, and workout session creation are not implemented yet.

## Analysis and workout design decisions to preserve

- Analysis is monthly-first. The activity calendar has previous/next month chevrons with the month title centered.
- Selecting a completed calendar date opens that session detail; multiple sessions on one day use the selection/list state before detail.
- Rest Timer is a bottom sheet with a large circular progress timer. Overlay tap means skip rest and returns to active workout; there is no pause state for Rest Timer.
- Active Workout header has no pause/resume icon. When workout is paused, elapsed-time text uses 50% opacity.
- Header surfaces must be opaque, never transparent over scrolling content.

## Implementation process

- One narrowly scoped GitHub Issue per implementation unit.
- Before coding a Figma screen, read `.agents/skills/implement-figma-screen/SKILL.md` and use the exact named Figma frame.
- Use deterministic fixtures and register every implemented state in the development UI Catalog.
- Keep presentation, route/navigation, and data orchestration separate.
- Run typecheck, lint, focused tests, full Jest, Expo config/prebuild, and diff check. Device visual QA, OAuth, persistence, and external services must remain `NOT VERIFIED` until actually tested.
- Independently review Cursor output before creating/merging a PR. Do not merge solely because Cursor reports success.

## Durable external state

- Canonical repository: `https://github.com/xxxbeom-glitch/tampin`
- Exercise MP4 and thumbnail assets are in private Cloudflare R2 bucket `tampin-media-prod`, versioned beneath `v1/gym-visual/`.
- Local project path on this computer: `D:\project\tampin`.
- Avoid overwriting unrelated local uncommitted files. Work from `origin/main` or a dedicated worktree for review.

## Recently merged implementation sequence

- DEV-006 / PR #15: development-only Google/Kakao bypass.
- DEV-007 / PR #17: Basic Info screen and state variants.
- DEV-008 / PR #19: Login screen and Figma blue token alignment.
- DEV-009 / PR #21: Splash launch and development Catalog access.
- DEV-010 / PR #23: Routine Main WithRoutines/Empty states.
- DEV-011 / PR #25: Routine Detail and card-to-detail-to-workout-boundary flow.

## Next safe implementation work

Prioritize one of these only after checking the current Figma node and behavior matrix:

1. Folder-first routine creation/edit flow (Group 03), then connect `새 루틴 만들기` beyond its current boundary.
2. Active Workout implementation (Group 05) with local-first SQLite session ownership; do not fake it with AsyncStorage.
3. Exercise selection/custom exercise flow (Group 04) as the prerequisite for adding workouts/exercises.

Do not begin real OAuth, Supabase synchronization, user-media upload, release setup, or notification permissions just because a screen renders. Those need their own production-readiness-scoped issue.
