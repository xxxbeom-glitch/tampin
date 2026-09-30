# Active Task Contract

## Task / Issue
- Issue #26 / DEV-012 — Bundle SUIT and replace implemented-screen Figma assets
- Branch: `cursor/dev-012-suit-assets-368a`

## Goal
Replace temporary system-font/text-glyph/gray-placeholder treatment in implemented 00–02 runtime screens with source-controlled SUIT font and Figma-derived local assets.

## Required
- Official SUIT TTF (OFL-1.1) + license attribution; Expo font load before UI
- Typography tokens/styles applied to Splash, Login, BasicInfo, RoutineMain, RoutineDetail
- Figma asset manifest with node/name metadata; replace glyphs/thumbnails only where exported
- Tests for manifest existence and no runtime network font dependency
- typecheck / lint / full jest / expo config / prebuild / diff-check

## Allowed Scope
- `assets/fonts`, `assets/figma`, `assets/licenses`
- `src/design-system/{tokens,fonts,assets,components}`
- Implemented 00–02 screen files and related tests/evidence

## Forbidden
- Bulk Gym Visual catalog, R2, persistence, unimplemented Group 03–08 screens, third-party icon libraries, runtime network fonts

## Figma refs
- File `W3lZurXCXbThP67rF2xk2b` — 00 Splash, 01A Login, 01C Basic Info, 02A/02B Routine Main, 02D Routine Detail

## Verification
1. typecheck 2. lint 3. full jest 4. expo config/prebuild 5. diff-check 6. production-readiness (bundled assets/licensing)

## Done When
- AC satisfied; NOT EXPORTED blockers documented; commit pushed; no PR per user request
